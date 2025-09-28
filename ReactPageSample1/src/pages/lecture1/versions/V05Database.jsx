import React from 'react';
import VersionShell from '../../../layout/VersionShell.jsx';

export default function V05Database() {
  return (
    <VersionShell version="0.5" title="Database Integration" focus="Database">
      <p style={{fontSize:'.85rem'}}>This prototype stage replaces static arrays with a real database (e.g. SQLite / Postgres). Here we just show conceptual schema:</p>
      <pre style={{background:'#0f172a', color:'#f1f5f9', padding:'1rem', fontSize:'.65rem', borderRadius:'8px', overflowX:'auto'}}>{`Table products (
  id integer primary key,
  name text not null,
  price numeric not null,
  image_url text,
  created_at timestamptz default now()
);

Table users (
  id serial primary key,
  username text unique not null,
  password_hash text not null,
  created_at timestamptz default now()
);

Table orders (
  id serial primary key,
  user_id integer references users(id),
  total numeric not null,
  status text default 'pending',
  created_at timestamptz default now()
);

Table order_items (
  id serial primary key,
  order_id integer references orders(id),
  product_id integer references products(id),
  quantity integer not null,
  unit_price numeric not null
);`}</pre>
      <p style={{marginTop:'1rem'}}><code>git commit -m "v0.5 database integration"</code></p>
    </VersionShell>
  );
}
