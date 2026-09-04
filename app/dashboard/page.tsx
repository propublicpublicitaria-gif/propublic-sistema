import Shell from "@/components/Shell";
import {createClient} from "@/lib/supabase/server";
import {redirect} from "next/navigation";

const money=(n:number)=>`Gs. ${new Intl.NumberFormat("es-PY").format(Math.round(Number(n)||0))}`;
const Metric=({title,value}:{title:string;value:string})=><div className="card"><div className="kicker">{title}</div><div className="metric">{value}</div></div>;

export default async function Page(){
  const sb=await createClient();
  const {data:{user}}=await sb.auth.getUser();
  if(!user) redirect("/login");
  const {data:profile}=await sb.from("profiles").select("full_name,role_id,roles(name)").eq("id",user.id).single();
  const roleRow=(profile as any)?.roles;
  const role=Array.isArray(roleRow)?roleRow[0]?.name||"":roleRow?.name||"";

  const [clients,quotes,sales,payments,orders,design,production,deliveries]=await Promise.all([
    sb.from("clients").select("id",{count:"exact",head:true}),
    sb.from("quotes").select("id,status,created_by",{count:"exact",head:false}),
    sb.from("sales").select("id,total,balance,created_by,salesperson_id",{count:"exact",head:false}),
    sb.from("payments").select("amount,created_by"),
    sb.from("orders").select("id,status,created_by,salesperson_id"),
    sb.from("design_jobs").select("id,status,assigned_to"),
    sb.from("production_jobs").select("id,status,assigned_to"),
    sb.from("deliveries").select("id,status,created_by")
  ]);

  const rows=(x:any)=>x.data||[];
  const allSales=rows(sales);
  const allQuotes=rows(quotes);
  const allOrders=rows(orders);
  const allDesign=rows(design);
  const allProduction=rows(production);
  const allDeliveries=rows(deliveries);
  const allPayments=rows(payments);
  const own=(r:any)=>r.created_by===user.id||r.salesperson_id===user.id;

  return <Shell title="Dashboard"><div className="pagehead"><div><h1 className="title">Dashboard</h1><p className="muted">Panel operativo de ProPublic{role?` · ${role}`:""}</p></div></div>
    {role==="administrador"&&<div className="grid">
      <Metric title="Ventas del período" value={money(allSales.reduce((n:number,r:any)=>n+Number(r.total||0),0))}/>
      <Metric title="Presupuestos" value={String(allQuotes.length)}/>
      <Metric title="Presupuestos pendientes" value={String(allQuotes.filter((r:any)=>["borrador","enviado","modificacion"].includes(r.status)).length)}/>
      <Metric title="Ventas con saldo" value={String(allSales.filter((r:any)=>Number(r.balance||0)>0).length)}/>
      <Metric title="Pedidos pendientes" value={String(allOrders.filter((r:any)=>!['entregado','cancelado'].includes(r.status)).length)}/>
      <Metric title="Diseños pendientes" value={String(allDesign.filter((r:any)=>r.status!=="aprobado").length)}/>
      <Metric title="Producción pendiente" value={String(allProduction.filter((r:any)=>!['completado','entregado'].includes(r.status)).length)}/>
      <Metric title="Entregas pendientes" value={String(allDeliveries.filter((r:any)=>r.status!=="entregado").length)}/>
    </div>}
    {role==="vendedor"&&<div className="grid">
      <Metric title="Mis clientes" value={String((await sb.from("clients").select("id",{count:"exact",head:true}).eq("created_by",user.id)).count||0)}/>
      <Metric title="Mis presupuestos" value={String(allQuotes.filter((r:any)=>r.created_by===user.id).length)}/>
      <Metric title="Mis ventas" value={String(allSales.filter(own).length)}/>
      <Metric title="Saldo por cobrar" value={money(allSales.filter(own).reduce((n:number,r:any)=>n+Number(r.balance||0),0))}/>
      <Metric title="Mis pedidos" value={String(allOrders.filter(own).length)}/>
    </div>}
    {role==="disenador"&&<div className="grid">
      <Metric title="Pendientes" value={String(allDesign.filter((r:any)=>r.assigned_to===user.id&&r.status==="pendiente").length)}/>
      <Metric title="En diseño" value={String(allDesign.filter((r:any)=>r.assigned_to===user.id&&r.status==="en_diseno").length)}/>
      <Metric title="Correcciones" value={String(allDesign.filter((r:any)=>r.assigned_to===user.id&&r.status==="correccion_solicitada").length)}/>
      <Metric title="Aprobados" value={String(allDesign.filter((r:any)=>r.assigned_to===user.id&&r.status==="aprobado").length)}/>
    </div>}
    {role==="produccion"&&<div className="grid">
      <Metric title="Pendientes" value={String(allProduction.filter((r:any)=>r.assigned_to===user.id&&r.status==="pendiente").length)}/>
      <Metric title="Urgentes" value={String(allProduction.filter((r:any)=>r.assigned_to===user.id&&r.priority==="urgente").length)}/>
      <Metric title="En producción" value={String(allProduction.filter((r:any)=>r.assigned_to===user.id&&r.status==="en_produccion").length)}/>
      <Metric title="Problemas" value={String(allProduction.filter((r:any)=>r.assigned_to===user.id&&r.status==="problema").length)}/>
    </div>}
  </Shell>;
}
