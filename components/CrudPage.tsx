"use client";
import { FormEvent, useEffect, useMemo, useState } from "react";
import Shell from "@/components/Shell";
import { createClient } from "@/lib/supabase/client";

type Field={name:string;label:string;type?:string;required?:boolean;step?:string;options?:{value:string;label:string}[]};
type Config={table:string;title:string;description:string;fields:Field[];columns:string[];format?:(row:any,key:string)=>string};

const money=(v:any)=>v==null||v===""?"—":`Gs. ${Number(v).toLocaleString("es-PY")}`;

export default function CrudPage({config}:{config:Config}){
 const supabase=createClient();
 const [rows,setRows]=useState<any[]>([]); const [form,setForm]=useState<Record<string,string>>({});
 const [loading,setLoading]=useState(true); const [saving,setSaving]=useState(false); const [error,setError]=useState(""); const [editing,setEditing]=useState<string|null>(null); const [open,setOpen]=useState(false); const [search,setSearch]=useState(""); const [clients,setClients]=useState<any[]>([]);
 async function load(){setLoading(true);setError("");const {data,error}=await supabase.from(config.table).select("*").order("created_at",{ascending:false});if(error)setError(error.message);else setRows(data||[]);setLoading(false)}
 useEffect(()=>{load(); supabase.from("clients").select("id,name").order("name").then(({data})=>setClients(data||[]))},[]);
 const visible=useMemo(()=>{const q=search.trim().toLowerCase();if(!q)return rows;return rows.filter(r=>Object.values(r).some(v=>String(v??"").toLowerCase().includes(q)))},[rows,search]);
 function reset(){setForm({});setEditing(null);setOpen(false);setError("")}
 async function save(e:FormEvent){e.preventDefault();setSaving(true);setError("");const payload:any={};for(const f of config.fields){const v=form[f.name];if(v!==undefined&&v!==""){payload[f.name]=f.type==="number"?Number(v):v}else payload[f.name]=null}let result:any;if(editing)result=await supabase.from(config.table).update(payload).eq("id",editing);else result=await supabase.from(config.table).insert(payload);if(result.error)setError(result.error.message);else{reset();await load()}setSaving(false)}
 async function remove(id:string){if(!confirm("¿Eliminar este registro? Esta acción no se puede deshacer."))return;const {error}=await supabase.from(config.table).delete().eq("id",id);if(error)setError(error.message);else load()}
 function edit(r:any){const f:any={};config.fields.forEach(x=>f[x.name]=r[x.name]??"");setForm(f);setEditing(r.id);setOpen(true)}
 function field(f:Field){if(f.options)return <select value={form[f.name]||""} onChange={e=>setForm({...form,[f.name]:e.target.value})} required={f.required}><option value="">Seleccionar...</option>{f.options.map(o=><option key={o.value} value={o.value}>{o.label}</option>)}</select>;
 if(f.name==="client_id")return <select value={form[f.name]||""} onChange={e=>setForm({...form,[f.name]:e.target.value})} required={f.required}><option value="">Seleccionar cliente...</option>{clients.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}</select>;
 return <input type={f.type||"text"} step={f.step} value={form[f.name]||""} onChange={e=>setForm({...form,[f.name]:e.target.value})} required={f.required}/>}
 return <Shell title={config.title}><h1 className="title">{config.title}</h1><p className="muted">{config.description}</p><div className="actions"><button className="btn" onClick={()=>{reset();setOpen(true)}}>+ Nuevo</button><button className="btn secondary" onClick={load}>Actualizar</button></div>{error&&<div className="error">{error}</div>}
 {open&&<div className="panel"><h2>{editing?"Editar":"Nuevo"} registro</h2><form onSubmit={save}><div className="formgrid">{config.fields.map(f=><label className="field" key={f.name}>{f.label}{field(f)}</label>)}</div><div className="actions"><button className="btn" disabled={saving}>{saving?"Guardando...":"Guardar"}</button><button type="button" className="btn secondary" onClick={reset}>Cancelar</button></div></form></div>}
 <div className="panel"><div className="actions"><input placeholder="Buscar en registros..." value={search} onChange={e=>setSearch(e.target.value)} style={{flex:1,padding:11,border:"1px solid #d0d5dd",borderRadius:8}}/></div><table className="table"><thead><tr>{config.columns.map(c=><th key={c}>{c}</th>)}<th>Acciones</th></tr></thead><tbody>{loading?<tr><td colSpan={config.columns.length+1}>Cargando...</td></tr>:visible.length===0?<tr><td colSpan={config.columns.length+1}>No hay registros.</td></tr>:visible.map(r=><tr key={r.id}>{config.columns.map(c=><td key={c}>{config.format?config.format(r,c):((c==="price"||c==="total"||c==="subtotal"||c==="discount"||c==="amount")?money(r[c]):(r[c]??"—"))}</td>)}<td><button className="btn secondary" onClick={()=>edit(r)}>Editar</button> <button className="btn secondary" onClick={()=>remove(r.id)}>Eliminar</button></td></tr>)}</tbody></table></div></Shell>
}