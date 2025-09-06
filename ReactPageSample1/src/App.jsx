import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Checkpoints from './Checkpoints.jsx';
import ECommerceRoadmap from './ECommerceRoadmap.jsx';
import Dashboard from './Dashboard.jsx';
import V01Initial from './versions/V01Initial.jsx';
import V02Catalog from './versions/V02Catalog.jsx';
import V03Cart from './versions/V03Cart.jsx';
import V04Accounts from './versions/V04Accounts.jsx';
import V05Database from './versions/V05Database.jsx';
import V06Checkout from './versions/V06Checkout.jsx';
import V07UI from './versions/V07UI.jsx';
import V08Payment from './versions/V08Payment.jsx';
import V10Release from './versions/V10Release.jsx';
import VersionsIndex from './versions/VersionsIndex.jsx';
import AllInOne from './versions/AllInOne.jsx';
import V11AccountMgmt from './versions/V11AccountMgmt.jsx';

function Home() {
  return (
    <main className="app-shell">
      <h1>ReactPageSample1</h1>
      <p>Starter React app. Replace this content with your components.</p>
      <nav style={{marginTop:'1.5rem', display:'flex', gap:'0.65rem', flexWrap:'wrap', fontSize:'.75rem'}}>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/roadmap">Roadmap</Link>
        <Link to="/versions">All Versions</Link>
  <Link to="/versions/v0.1">v0.1</Link>
        <Link to="/versions/v0.2">v0.2</Link>
        <Link to="/versions/v0.3">v0.3</Link>
        <Link to="/versions/v0.4">v0.4</Link>
        <Link to="/versions/v0.5">v0.5</Link>
        <Link to="/versions/v0.6">v0.6</Link>
        <Link to="/versions/v0.7">v0.7</Link>
        <Link to="/versions/v0.8">v0.8</Link>
  <Link to="/versions/v1.0">v1.0</Link>
  <Link to="/versions/v1.1">v1.1</Link>
  <Link to="/versions/all">All-In-One</Link>
      </nav>
    </main>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
  <Route path="/checkpoints" element={<Checkpoints />} />
  <Route path="/roadmap" element={<ECommerceRoadmap />} />
  <Route path="/dashboard" element={<Dashboard />} />
  <Route path="/versions" element={<VersionsIndex />} />
  <Route path="/versions/v0.1" element={<V01Initial />} />
  <Route path="/versions/v0.2" element={<V02Catalog />} />
  <Route path="/versions/v0.3" element={<V03Cart />} />
  <Route path="/versions/v0.4" element={<V04Accounts />} />
  <Route path="/versions/v0.5" element={<V05Database />} />
  <Route path="/versions/v0.6" element={<V06Checkout />} />
  <Route path="/versions/v0.7" element={<V07UI />} />
  <Route path="/versions/v0.8" element={<V08Payment />} />
  <Route path="/versions/v1.0" element={<V10Release />} />
  <Route path="/versions/v1.1" element={<V11AccountMgmt />} />
  <Route path="/versions/all" element={<AllInOne />} />
      </Routes>
    </BrowserRouter>
  );
}
