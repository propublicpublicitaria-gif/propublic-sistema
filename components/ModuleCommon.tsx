"use client";
import {ReactNode,useEffect,useState} from "react";
import {createClient} from "@/lib/supabase/client";
export const sb=createClient();
export const money=(n:any)=>`Gs. ${new Intl.NumberFormat("es-PY").format(Math.round(Number(n)||0))}`;
export const datePY=(v:any)=>v?new Date(v).toLocaleDateString("es-PY"):"—";
export const human=(v:any)=>String(v??"").replaceAll("_"," ");
export function Btn({children,secondary=false,disabled=false,...p}:any){return <button className={secondary?"btn secondary":"btn"} disabled={disabled} {...p}>{children}</button>}
export function Field({label,children,wide=false}:{label:string;children:ReactNode;wide?:boolean}){return <label className={wide?"field full":"field"}><span>{label}</span>{children}</label>}
export function Modal({title,onClose,children,wide=false}:{title:string;onClose:()=>void;children:ReactNode;wide?:boolean}){return <div className="overlay"><div className={wide?"modal wide":"modal"}><div className="modalhead"><h2>{title}</h2><button className="iconbtn" onClick={onClose}>×</button></div>{children}</div></div>}
export function Head({title,description,onNew,onRefresh}:{title:string;description:string;onNew?:()=>void;onRefresh?:()=>void}){return <div className="pagehead"><div><h1 className="title">{title}</h1><p className="muted">{description}</p></div><div className="actions">{onRefresh&&<Btn secondary onClick={onRefresh}>Actualizar</Btn>}{onNew&&<Btn onClick={onNew}>+ Nuevo</Btn>}</div></div>}
export function Status({children}:{children:any}){return <span className="badge">{human(children)}</span>}
export function useProfile(){const [profile,setProfile]=useState<any>(null);const [loading,setLoading]=useState(true);const [error,setError]=useState("");useEffect(()=>{(async()=>{const {data:{user}}=await sb.auth.getUser();if(!user){location.href="/login";return}const {data,error}=await sb.from("profiles").select("id,full_name,email,phone,status,role_id,roles(name)").eq("id",user.id).single();if(error){setError("No se pudo cargar el perfil.");setLoading(false);return}const r:any=(data as any)?.roles;const role=Array.isArray(r)?r[0]?.name:r?.name;setProfile({...data,role});setLoading(false)})()},[]);return {profile,loading,error}}
export async function audit(action:string,entity:string,entity_id?:string,metadata?:any){const {data:{user}}=await sb.auth.getUser();if(user) await sb.from("audit_logs").insert({user_id:user.id,action,entity,entity_id:entity_id||null,metadata:metadata||{}})}
export function ErrorBox({message}:{message:string}){return message?<div className="error">{message}</div>:null}
export function Protected({children,roles}:{children:ReactNode;roles:string[]}){const {profile,loading,error}=useProfile();if(loading)return <div className="center"><div className="spinner"/></div>;if(error||!profile)return <div className="center"><div className="panel"><h2>Acceso no disponible</h2><p>{error}</p></div></div>;if(!roles.includes(profile.role))return <div className="center"><div className="panel"><h2>Acceso restringido</h2><p>No tienes permisos para este módulo.</p></div></div>;return <>{children}</>}
