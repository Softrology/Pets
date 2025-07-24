import { FiMenu, FiBell, FiSearch, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

export default function SuperHeader({ 
  onMenuClick, 
  onToggleSidebar, 
  sidebarCollapsed 
}) {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Left Section */}
          <div className="flex items-center">
            {/* Mobile menu button */}
            <button
              type="button"
              className="lg:hidden text-gray-500 hover:text-gray-600 mr-2"
              onClick={onMenuClick}
            >
              <FiMenu className="h-6 w-6" />
            </button>

            {/* Desktop sidebar toggle */}
            <button
              type="button"
              className="hidden lg:block text-gray-500 hover:text-gray-600 mr-2"
              onClick={onToggleSidebar}
            >
              {sidebarCollapsed ? (
                <FiChevronRight className="h-6 w-6" />
              ) : (
                <FiChevronLeft className="h-6 w-6" />
              )}
            </button>

            {/* Search bar */}
            <div className="flex-1 max-w-xs">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            <button className="p-1 rounded-full text-gray-400 hover:text-gray-500">
              <FiBell className="h-6 w-6" />
            </button>
            
            <div className="flex-shrink-0">
              <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-medium">
                SA
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}