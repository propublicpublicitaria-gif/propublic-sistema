"use client";
import { FormEvent, useEffect, useState } from "react";
import Shell from "@/components/Shell";
import { createClient } from "@/lib/supabase/client";

type Field={name:string;label:string;type?:string;required?:boolean;step?:string};
type Config={table:string;title:string;description:string;fields:Field[];columns:string[];format?:(row:any,key:string)=>string};

export default function CrudPage({config}:{config:Config}){
 const supabase=createClient(); const [rows,setRows]=useState<any[]>([]); const [form,setForm]=useState<Record<string,string>>({}); const [loading,setLoading]=useState(true); const [saving,setSaving]=useState(false); const [error,setError]=useState(""); const [editing,setEditing]=useState<string|null>(null); const [open,setOpen]=useState(false);
 async function load(){setLoading(true);const {data,error}=await supabase.from(config.table).select("*").order("created_at",{ascending:false});if(error)setError(error.message);else setRows(data||[]);setLoading(false)}
 useEffect(()=>{load()},[]);
 function reset(){setForm({});setEditing(null);setOpen(false);setError("")}
 async function save(e:FormEvent){e.preventDefault();setSaving(true);setError("");const payload:any={};for(const f of config.fields) payload[f.name]=form[f.name]||null;let result;if(editing) result=await supabase.from(config.table).update(payload).eq("id",editing);else result=await supabase.from(config.table).insert(payload);if(result.error)setError(result.error.message);else{reset();await load()}setSaving(false)}
 async function remove(id:string){if(!confirm("¿Eliminar este registro?"))return;const {error}=await supabase.from(config.table).delete().eq("id",id);if(error)setError(error.message);else load()}
 function edit(r:any){const f:any={};config.fields.forEach(x=>f[x.name]=r[x.name]??"");setForm(f);setEditing(r.id);setOpen(true)}
 return <Shell title={config.title}><h1 className="title">{config.title}</h1><p className="muted">{config.description}</p><div className="actions"><button className="btn" onClick={()=>{reset();setOpen(true)}}>+ Nuevo</button><button className="btn secondary" onClick={load}>Actualizar</button></div>
 {error&&<div className="error">{error}</div>}
 {open&&<div className="panel"><h2>{editing?"Editar":"Nuevo"} registro</h2><form onSubmit={save}><div className="formgrid">{config.fields.map(f=><label className="field" key={f.name}>{f.label}<input type={f.type||"text"} step={f.step} value={form[f.name]||""} onChange={e=>setForm({...form,[f.name]:e.target.value})} required={f.required}/></label>)}</div><div className="actions"><button className="btn" disabled={saving}>{saving?"Guardando...":"Guardar"}</button><button type="button" className="btn secondary" onClick={reset}>Cancelar</button></div></form></div>}
 <div className="panel"><table className="table"><thead><tr>{config.columns.map(c=><th key={c}>{c}</th>)}<th>Acciones</th></tr></thead><tbody>{loading?<tr><td colSpan={config.columns.length+1}>Cargando...</td></tr>:rows.length===0?<tr><td colSpan={config.columns.length+1}>No hay registros todavía.</td></tr>:rows.map(r=><tr key={r.id}>{config.columns.map(c=>{const key=c.toLowerCase().replaceAll(" ","_");return <td key={c}>{config.format?config.format(r,key):(r[key]??"—")}</td>})}<td><button className="btn secondary" onClick={()=>edit(r)}>Editar</button> <button className="btn secondary" onClick={()=>remove(r.id)}>Eliminar</button></td></tr>)}</tbody></table></div></Shell>
}