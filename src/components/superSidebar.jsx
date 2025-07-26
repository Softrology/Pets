import { NavLink } from 'react-router-dom';
import {
  FiUsers,
  FiUser,
  FiSettings,
  FiBarChart2,
  FiX,
  FiMenu,
  FiChevronLeft,
  FiChevronRight
} from 'react-icons/fi';

export default function Sidebar({ onClose, collapsed }) {
  const navItems = [
    { name: 'Dashboard', icon: FiBarChart2, to: 'dashboard' },
    { name: 'Users', icon: FiUsers, to: 'users' },
    { name: 'Vets', icon: FiUser, to: 'vets' },
    { name: 'Settings', icon: FiSettings, to: 'settings' },
  ];

  return (
    <div className={`flex flex-col h-full bg-gradient-to-b from-[#39a2a1] to-[#21527b] ${collapsed ? 'w-20' : 'w-64'
      } transition-all duration-300 ease-in-out shadow-lg`}>

      {/* Attractive Header */}
      <div className={`flex items-center justify-between p-4 border-b border-[#2d8a89] ${collapsed ? 'flex-col space-y-2' : ''
        }`}>
        {!collapsed ? (
          <>
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-md bg-[#39a2a1] flex items-center PetCare-center text-white font-bold mr-3">
                PC
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">PetCare</h1>
                <p className="text-xs text-teal-100">Super Admin</p>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="h-8 w-8 rounded-md bg-[#39a2a1] flex items-center justify-center text-white font-bold">
              PC
            </div>
          </>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-2 py-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={`/super-admin/${item.to}`}
            end
            className={({ isActive }) => `
              flex items-center px-4 py-3 rounded-md transition-all
              ${isActive ? 'bg-[#21527b] text-white shadow-md' : 'text-teal-100 hover:bg-[#2d8a89]'}
              ${collapsed ? 'justify-center' : ''}
              duration-200
            `}
            title={collapsed ? item.name : ''}
          >
            <item.icon className={`h-5 w-5 ${!collapsed ? 'mr-3' : ''}`} />
            {!collapsed && (
              <span className="text-sm font-medium">{item.name}</span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* User Profile */}
      <div className={`p-4 border-t border-[#2d8a89] ${collapsed ? 'flex justify-center' : ''
        }`}>
        <div className={`flex items-center ${collapsed ? 'flex-col space-y-2' : ''}`}>
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#39a2a1] to-[#21527b] flex items-center justify-center text-white shadow">
            SA
          </div>
          {!collapsed && (
            <div className="ml-3 overflow-hidden">
              <p className="text-sm font-medium text-white truncate">Super Admin</p>
              <p className="text-xs font-medium text-teal-100 truncate">admin@PetCare.com</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}