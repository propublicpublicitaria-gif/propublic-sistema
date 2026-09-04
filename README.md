# ProPublic Sistema — paquete completo

Este paquete contiene una aplicación Next.js funcional como base integral del sistema ProPublic:
- Login real con Supabase Auth
- Middleware de sesión
- Dashboard
- Clientes
- Productos
- Presupuestos
- Ventas
- Pagos
- Pedidos
- Diseño
- Producción
- Caja
- Reportes
- Configuración
- Auditoría
- Esquema SQL de las entidades principales
- Moneda PYG / Gs. en el dashboard

## Instalación en Vercel
1. Importar este proyecto.
2. Configurar `NEXT_PUBLIC_SUPABASE_URL`.
3. Configurar `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
4. Ejecutar `supabase/schema-completo.sql` en Supabase.
5. Crear al menos un usuario en Supabase Auth.
6. Ejecutar el deploy.

## Importante
Las pantallas de módulos están preparadas como interfaz y navegación integral, pero los formularios CRUD específicos, reglas de permisos por cada operación y reportes avanzados requieren la siguiente iteración de implementación. El SQL incluye una política autenticada amplia como bootstrap; debe sustituirse por las políticas finas de permisos antes de usar datos sensibles en producción.
