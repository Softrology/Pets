export default function SuperAdminDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { name: 'Total Users', value: '1,234', change: '+12%' },
          { name: 'Active Vets', value: '56', change: '+5%' },
          { name: 'Pending Approvals', value: '8', change: '-2%' },
          { name: 'Revenue', value: '$8,345', change: '+24%' },
        ].map((stat) => (
          <div key={stat.name} className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3 text-white">
                  {/* Replace with your icon component */}
                  <div className="h-6 w-6"></div>
                </div>
                <div className="ml-5 flex-1">
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    {stat.name}
                  </dt>
                  <dd className="mt-1 flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {stat.value}
                    </div>
                    <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                      stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.change}
                    </div>
                  </dd>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity Section */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Recent Activity
          </h3>
        </div>
        <div className="px-4 py-5 sm:p-6">
          {/* Replace with your activity component */}
          <div className="h-64 flex items-center justify-center text-gray-400">
            Activity feed will appear here
          </div>
        </div>
      </div>
    </div>
  );
}