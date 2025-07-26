import { 
  Users, 
  UserCircle2, 
  Clock, 
  DollarSign,
  Calendar,
  FileText,
  Settings,
  PlusCircle,
  PieChart
} from 'lucide-react';

export default function SuperAdminDashboard() {
  return (
    <div className="space-y-6 p-4 sm:p-6">
      <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { name: 'Total Users', value: '1,234', change: '+12%', icon: Users },
          { name: 'Active Vets', value: '56', change: '+5%', icon: UserCircle2 },
          { name: 'Pending Approvals', value: '8', change: '-2%', icon: Clock },
          { name: 'Revenue', value: '$8,345', change: '+24%', icon: DollarSign },
        ].map((stat) => (
          <div key={stat.name} className="bg-white overflow-hidden shadow rounded-lg border border-gray-100 hover:shadow-md transition-shadow duration-200">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-gradient-to-r from-[#39a2a1] to-[#21527b] rounded-md p-3 text-white">
                  <stat.icon className="h-5 w-5" />
                </div>
                <div className="ml-5 flex-1">
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    {stat.name}
                  </dt>
                  <dd className="mt-1 flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-800">
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
      <div className="bg-white shadow rounded-lg overflow-hidden border border-gray-100">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 className="text-lg font-medium leading-6 text-gray-800">
            Recent Activity
          </h3>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <div className="space-y-4">
            {[
              { action: 'New vet registration', time: '10 mins ago', user: 'Dr. Sarah Miller', icon: UserCircle2 },
              { action: 'Appointment booked', time: '25 mins ago', user: 'John Peterson', icon: Calendar },
              { action: 'Payment received', time: '1 hour ago', user: 'Lisa Wong', icon: DollarSign },
              { action: 'New user signup', time: '2 hours ago', user: 'Michael Chen', icon: Users },
            ].map((activity, index) => (
              <div key={index} className="flex items-start pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                <div className="flex-shrink-0 bg-teal-50 rounded-full p-2">
                  <activity.icon className="h-5 w-5 text-[#39a2a1]" />
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-gray-800">
                    {activity.action} <span className="text-gray-500">by {activity.user}</span>
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white shadow rounded-lg overflow-hidden border border-gray-100">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 className="text-lg font-medium leading-6 text-gray-800">
            Quick Actions
          </h3>
        </div>
        <div className="px-4 py-5 sm:p-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <button className="flex items-center justify-center gap-2 bg-teal-50 hover:bg-teal-100 text-[#39a2a1] px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200">
            <PlusCircle className="h-4 w-4" />
            Add New Vet
          </button>
          <button className="flex items-center justify-center gap-2 bg-teal-50 hover:bg-teal-100 text-[#39a2a1] px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200">
            <PieChart className="h-4 w-4" />
            View Reports
          </button>
          <button className="flex items-center justify-center gap-2 bg-teal-50 hover:bg-teal-100 text-[#39a2a1] px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200">
            <Users className="h-4 w-4" />
            Manage Users
          </button>
          <button className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#39a2a1] to-[#21527b] hover:from-[#2d8a89] hover:to-[#1a4062] text-white px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200">
            <Settings className="h-4 w-4" />
            System Settings
          </button>
        </div>
      </div>
    </div>
  );
}