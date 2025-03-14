import { useState } from "react";
import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <h1>HI</h1>
        {/* <Header /> */}
        <Routes>
          {/* Warehouses Routes */}
          {/* <Route path="/warehouse" element={<Warehouses />} />
          <Route path="/warehouse/:id" element={<WarehouseDetail />} />
          <Route path="/warehouse/add" element={<AddWarehouse />} />
          <Route path="/warehouse/:id/edit" element={<EditWarehouse />} /> */}

          {/* Inventory Routes */}
          {/* <Route path="/inventory" element={<Inventories />} />
          <Route path="/inventory/:id" element={<InventoryDetail />} />
          <Route path="/inventory/add" element={<AddInventory />} />
          <Route path="/inventory/:id/edit" element={<EditInventory />} /> */}

          {/* Default Route */}
          {/* <Route path="/" element={<Navigate to="/warehouse" />} /> */}
        </Routes>
        {/* <Footer /> */}
      </div>
    </BrowserRouter>
  );
}

export default App;
