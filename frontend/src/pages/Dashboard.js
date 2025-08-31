import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Placeholder dashboard components
const DashboardHome = () => (
  <div className="p-6">
    <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div className="card p-6 text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Artworks</h3>
        <p className="text-3xl font-bold text-primary-600">0</p>
      </div>
      <div className="card p-6 text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Commissions</h3>
        <p className="text-3xl font-bold text-yellow-600">0</p>
      </div>
      <div className="card p-6 text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Revenue</h3>
        <p className="text-3xl font-bold text-green-600">$0</p>
      </div>
      <div className="card p-6 text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Pending</h3>
        <p className="text-3xl font-bold text-red-600">0</p>
      </div>
    </div>
    <div className="card p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
      <div className="space-y-2">
        <p className="text-gray-600">• Manage your artworks and commissions</p>
        <p className="text-gray-600">• Update pricing settings</p>
        <p className="text-gray-600">• View analytics and reports</p>
      </div>
    </div>
  </div>
);

const DashboardArtworks = () => (
  <div className="p-6">
    <h1 className="text-3xl font-bold text-gray-900 mb-6">Artworks</h1>
    <div className="card p-6 text-center">
      <p className="text-gray-600">Artwork management interface would go here</p>
    </div>
  </div>
);

const DashboardCommissions = () => (
  <div className="p-6">
    <h1 className="text-3xl font-bold text-gray-900 mb-6">Commissions</h1>
    <div className="card p-6 text-center">
      <p className="text-gray-600">Commission management interface would go here</p>
    </div>
  </div>
);

const DashboardSettings = () => (
  <div className="p-6">
    <h1 className="text-3xl font-bold text-gray-900 mb-6">Settings</h1>
    <div className="card p-6 text-center">
      <p className="text-gray-600">Settings interface would go here</p>
    </div>
  </div>
);

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dashboard Navigation */}
      <div className="bg-white shadow-sm border-b">
        <div className="container-max">
          <nav className="flex space-x-8 py-4">
            <a href="/dashboard" className="text-primary-600 border-b-2 border-primary-600 py-2">
              Overview
            </a>
            <a href="/dashboard/artworks" className="text-gray-500 hover:text-gray-700 py-2">
              Artworks
            </a>
            <a href="/dashboard/commissions" className="text-gray-500 hover:text-gray-700 py-2">
              Commissions
            </a>
            <a href="/dashboard/settings" className="text-gray-500 hover:text-gray-700 py-2">
              Settings
            </a>
          </nav>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="container-max">
        <Routes>
          <Route index element={<DashboardHome />} />
          <Route path="artworks" element={<DashboardArtworks />} />
          <Route path="commissions" element={<DashboardCommissions />} />
          <Route path="settings" element={<DashboardSettings />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
