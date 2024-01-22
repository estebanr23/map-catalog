import React, { lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import './assets/css/leaflet.css'

// home pages  & dashboard
const Dashboard = lazy(() => import("./pages/dashboard"));
import Layout from "./layout/Layout";
import { InitialPage, EventPage, LayersPage } from "./pages";

function App() {
  return (
    <main className="App relative">
      <Routes>
        <Route path="/" element={<Navigate to="dashboard"/>} />
        
        <Route path="/*" element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="initial" element={<InitialPage />} />
          <Route path="event-map" element={<EventPage />} />
          <Route path="layers-map" element={<LayersPage />} />
        </Route>
      </Routes>
    </main>
  );
}

export default App;
