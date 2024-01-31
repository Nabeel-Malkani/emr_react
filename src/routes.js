// routes.js
import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './Views/Dashboard';
import Login from './Views/Login';
import NodeandTree from './Component/Organization/NodeandTree';

const AppRoutes = () => (
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/admin/*" element={<Dashboard />} />
    <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
    <Route path="Organization/AddNode" element={<NodeandTree />} />
  </Routes>
);

export default AppRoutes;
