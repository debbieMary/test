import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import Appointments from './pages/Appointments';
import AppointmentForm from './pages/AppointmentForm';
import Results from './pages/Results';
import Prescriptions from './pages/Prescriptions';
import AppLayout from './layouts/AppLayout';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public route without layout */}
        <Route path="/login" element={<Login />} />

        {/* Protected routes with common layout */}
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="appointments/new" element={<AppointmentForm />} />
          <Route path="appointments/edit/:id" element={<AppointmentForm />} />
          <Route path="results" element={<Results />} />
          <Route path="prescriptions" element={<Prescriptions />} />
        </Route>

        {/* 404 - also within layout */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}