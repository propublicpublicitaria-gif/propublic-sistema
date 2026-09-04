-- PROPUBLIC: esquema completo de datos
create extension if not exists pgcrypto with schema extensions;

create table if not exists public.clients (
 id uuid primary key default gen_random_uuid(), name text not null, email text, phone text, address text, notes text, created_at timestamptz default now(), updated_at timestamptz default now()
);
create table if not exists public.products (
 id uuid primary key default gen_random_uuid(), name text not null, category text, description text, price numeric(14,2) not null default 0, active boolean default true, created_at timestamptz default now(), updated_at timestamptz default now()
);
create table if not exists public.quotes (
 id uuid primary key default gen_random_uuid(), number text unique, client_id uuid references public.clients(id), status text default 'borrador', subtotal numeric(14,2) default 0, discount numeric(14,2) default 0, total numeric(14,2) default 0, notes text, created_at timestamptz default now(), updated_at timestamptz default now()
);
create table if not exists public.sales (
 id uuid primary key default gen_random_uuid(), number text unique, client_id uuid references public.clients(id), status text default 'pendiente', total numeric(14,2) default 0, created_at timestamptz default now(), updated_at timestamptz default now()
);
create table if not exists public.payments (
 id uuid primary key default gen_random_uuid(), sale_id uuid references public.sales(id), client_id uuid references public.clients(id), amount numeric(14,2) not null default 0, method text, status text default 'registrado', paid_at timestamptz default now(), notes text
);
create table if not exists public.orders (
 id uuid primary key default gen_random_uuid(), number text unique, client_id uuid references public.clients(id), sale_id uuid references public.sales(id), status text default 'pendiente', priority text default 'normal', due_date date, notes text, created_at timestamptz default now(), updated_at timestamptz default now()
);
create table if not exists public.design_jobs (
 id uuid primary key default gen_random_uuid(), order_id uuid references public.orders(id), title text not null, status text default 'pendiente', assigned_to uuid references auth.users(id), notes text, created_at timestamptz default now(), updated_at timestamptz default now()
);
create table if not exists public.production_jobs (
 id uuid primary key default gen_random_uuid(), order_id uuid references public.orders(id), title text not null, status text default 'pendiente', stage text default 'preparacion', assigned_to uuid references auth.users(id), notes text, created_at timestamptz default now(), updated_at timestamptz default now()
);
create table if not exists public.cash_movements (
 id uuid primary key default gen_random_uuid(), type text not null, concept text not null, amount numeric(14,2) not null default 0, payment_method text, reference text, created_by uuid references auth.users(id), created_at timestamptz default now()
);
create table if not exists public.audit_logs (
 id uuid primary key default gen_random_uuid(), user_id uuid references auth.users(id), action text not null, entity text, entity_id uuid, metadata jsonb default '{}'::jsonb, created_at timestamptz default now()
);

alter table public.clients enable row level security;
alter table public.products enable row level security;
alter table public.quotes enable row level security;
alter table public.sales enable row level security;
alter table public.payments enable row level security;
alter table public.orders enable row level security;
alter table public.design_jobs enable row level security;
alter table public.production_jobs enable row level security;
alter table public.cash_movements enable row level security;
alter table public.audit_logs enable row level security;

-- Acceso autenticado base; las reglas finas por rol ya existentes en profiles/permissions
create policy if not exists "authenticated clients" on public.clients for all to authenticated using (true) with check (true);
create policy if not exists "authenticated products" on public.products for all to authenticated using (true) with check (true);
create policy if not exists "authenticated quotes" on public.quotes for all to authenticated using (true) with check (true);
create policy if not exists "authenticated sales" on public.sales for all to authenticated using (true) with check (true);
create policy if not exists "authenticated payments" on public.payments for all to authenticated using (true) with check (true);
create policy if not exists "authenticated orders" on public.orders for all to authenticated using (true) with check (true);
create policy if not exists "authenticated design" on public.design_jobs for all to authenticated using (true) with check (true);
create policy if not exists "authenticated production" on public.production_jobs for all to authenticated using (true) with check (true);
create policy if not exists "authenticated cash" on public.cash_movements for all to authenticated using (true) with check (true);
create policy if not exists "authenticated audit" on public.audit_logs for select to authenticated using (true);

-- IMPORTANTE: reemplazar las políticas amplias por las políticas de permissions antes de producción.
