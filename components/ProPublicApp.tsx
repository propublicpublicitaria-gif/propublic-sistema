"use client";
import {Clients,Products,Discounts} from "@/components/CoreModules";
import {Quotes,Sales,Payments,Orders} from "@/components/CommerceModules";
import {Design,Production,Deliveries,Cash} from "@/components/OperationsModules";
import {Reports,QrReader,Users,Settings,Audit} from "@/components/AdminModules";
export default function ProPublicApp({module}:{module:string}){switch(module){case"clientes":return <Clients/>;case"productos":return <Products/>;case"descuentos":return <Discounts/>;case"presupuestos":return <Quotes/>;case"ventas":return <Sales/>;case"pagos":return <Payments/>;case"pedidos":return <Orders/>;case"diseno":return <Design/>;case"produccion":return <Production/>;case"entregas":return <Deliveries/>;case"caja":return <Cash/>;case"reportes":return <Reports/>;case"lector-qr":return <QrReader/>;case"usuarios":return <Users/>;case"configuracion":return <Settings/>;case"auditoria":return <Audit/>;default:return null}}
