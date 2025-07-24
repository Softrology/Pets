import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/superSidebar';
import SuperHeader from '../components/superHeader';

export default function SuperAdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-75 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 transform lg:hidden ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-in-out`}>
        <Sidebar 
          onClose={() => setSidebarOpen(false)}
          collapsed={false} // Always expanded on mobile
        />
      </div>

      {/* Desktop Sidebar */}
      <div className={`hidden lg:block lg:fixed lg:inset-y-0 ${
        sidebarCollapsed ? 'lg:w-20' : 'lg:w-64'
      } transition-all duration-300 ease-in-out`}>
        <Sidebar 
          onClose={() => setSidebarCollapsed(!sidebarCollapsed)}
          collapsed={sidebarCollapsed}
        />
      </div>

      {/* Main Content Area */}
      <div className={`flex-1 min-w-0 ${
        sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'
      } transition-all duration-300 ease-in-out`}>
        <SuperHeader 
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
          sidebarCollapsed={sidebarCollapsed}
        />
        
        <main className="flex-1 overflow-auto p-4 sm:p-6">
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}