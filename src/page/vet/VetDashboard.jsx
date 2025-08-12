import React from 'react';
import { 
  FiCalendar, 
  FiDollarSign, 
  FiClipboard, 
  FiUser, 
  FiClock,
  FiActivity,
  FiPieChart,
  FiBarChart2,
  FiTrendingUp
} from 'react-icons/fi';
import { 
  FaDog, 
  FaCat, 
  FaClinicMedical, 
  FaProcedures,
  FaRegCalendarCheck,
  FaNotesMedical
} from 'react-icons/fa';
import { Line, Bar, Pie, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const VetDashboard = () => {

  const user = JSON.parse(localStorage.getItem("user"))

  const {
    firstName,
    lastName,
    profilePicture
  }= user
  // Sample data - replace with your actual data
  const stats = {
    totalAppointments: 42,
    pendingAppointments: 5,
    monthlyEarnings: 4850,
    activePatients: 28
  };

  const appointments = [
    {
      id: 1,
      petName: "Buddy",
      owner: "John Smith",
      type: "Dog",
      date: new Date(Date.now() + 86400000), // Tomorrow
      status: "confirmed",
      service: "Annual Checkup",
      duration: 30,
    },
    {
      id: 2,
      petName: "Whiskers",
      owner: "Sarah Johnson",
      type: "Cat",
      date: new Date(Date.now() + 172800000), // 2 days from now
      status: "pending",
      service: "Vaccination",
      duration: 20,
    },
    {
      id: 3,
      petName: "Max",
      owner: "Michael Brown",
      type: "Dog",
      date: new Date(Date.now() + 259200000), // 3 days from now
      status: "confirmed",
      service: "Dental Cleaning",
      duration: 45,
    },
  ];

  // Chart data
  const earningsData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Earnings ($)',
        data: [3200, 2900, 3500, 4200, 3800, 4850, 4100],
        borderColor: 'rgba(99, 102, 241, 1)',
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        tension: 0.4,
        fill: true
      }
    ]
  };

  const servicesData = {
    labels: ['Checkups', 'Vaccinations', 'Surgeries', 'Dental', 'Emergency'],
    datasets: [
      {
        data: [35, 25, 15, 15, 10],
        backgroundColor: [
          'rgba(99, 102, 241, 0.7)',
          'rgba(16, 185, 129, 0.7)',
          'rgba(245, 158, 11, 0.7)',
          'rgba(236, 72, 153, 0.7)',
          'rgba(239, 68, 68, 0.7)'
        ],
        borderWidth: 1
      }
    ]
  };

  const appointmentsTrendData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    datasets: [
      {
        label: 'Daily Appointments',
        data: [8, 5, 6, 7, 4, 2],
        backgroundColor: 'rgba(99, 102, 241, 0.7)',
      }
    ]
  };

  const patientTypesData = {
    labels: ['Dogs', 'Cats', 'Other'],
    datasets: [
      {
        data: [65, 30, 5],
        backgroundColor: [
          'rgba(99, 102, 241, 0.7)',
          'rgba(236, 72, 153, 0.7)',
          'rgba(16, 185, 129, 0.7)'
        ]
      }
    ]
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          drawBorder: false
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    }
  };

  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
      }
    },
    cutout: '70%'
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl p-6 text-white mb-6 items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold ">Veterinarian Dashboard</h1>
          <p className="">{`Welcome back, ${firstName} ${lastName}`}</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <FiCalendar className="text-xl " />
            <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500"></span>
          </div>
          <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
            <span className="text-indigo-700 font-medium">DS</span>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Appointments Card */}
        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Appointments</p>
              <h3 className="text-2xl font-bold mt-1">{stats.totalAppointments}</h3>
              <p className="text-xs text-green-600 mt-1 flex items-center">
                <FiTrendingUp className="mr-1" /> 12% from last month
              </p>
            </div>
            <div className="p-3 rounded-lg bg-indigo-50 text-indigo-600">
              <FaRegCalendarCheck className="text-xl" />
            </div>
          </div>
        </div>

        {/* Pending Card */}
        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Pending Approvals</p>
              <h3 className="text-2xl font-bold mt-1">{stats.pendingAppointments}</h3>
              <p className="text-xs text-yellow-600 mt-1">Requires attention</p>
            </div>
            <div className="p-3 rounded-lg bg-yellow-50 text-yellow-600">
              <FiClock className="text-xl" />
            </div>
          </div>
        </div>

        {/* Earnings Card */}
        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Monthly Earnings</p>
              <h3 className="text-2xl font-bold mt-1">${stats.monthlyEarnings.toLocaleString()}</h3>
              <p className="text-xs text-green-600 mt-1 flex items-center">
                <FiTrendingUp className="mr-1" /> 8% from last month
              </p>
            </div>
            <div className="p-3 rounded-lg bg-green-50 text-green-600">
              <FiDollarSign className="text-xl" />
            </div>
          </div>
        </div>

        {/* Patients Card */}
        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Active Patients</p>
              <h3 className="text-2xl font-bold mt-1">{stats.activePatients}</h3>
              <p className="text-xs text-gray-500 mt-1">In your care</p>
            </div>
            <div className="p-3 rounded-lg bg-blue-50 text-blue-600">
              <FaDog className="text-xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Earnings Chart */}
        <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100 lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-lg">Monthly Earnings</h3>
            <div className="flex items-center space-x-2">
              <FiBarChart2 className="text-indigo-600" />
              <span className="text-sm text-gray-500">Last 7 months</span>
            </div>
          </div>
          <div className="h-80">
            <Line 
              data={earningsData} 
              options={{
                ...chartOptions,
                plugins: {
                  legend: {
                    display: false
                  }
                }
              }} 
            />
          </div>
        </div>

        {/* Services Chart */}
        <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-lg">Services Breakdown</h3>
            <div className="flex items-center space-x-2">
              <FiPieChart className="text-indigo-600" />
              <span className="text-sm text-gray-500">This month</span>
            </div>
          </div>
          <div className="h-80">
            <Doughnut data={servicesData} options={pieChartOptions} />
          </div>
        </div>
      </div>

      {/* Secondary Charts and Data */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Appointments Trend */}
        <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-lg">Appointments Trend</h3>
            <div className="flex items-center space-x-2">
              <FiActivity className="text-indigo-600" />
              <span className="text-sm text-gray-500">This week</span>
            </div>
          </div>
          <div className="h-64">
            <Bar 
              data={appointmentsTrendData} 
              options={{
                ...chartOptions,
                plugins: {
                  legend: {
                    display: false
                  }
                }
              }} 
            />
          </div>
        </div>

        {/* Patient Types */}
        <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-lg">Patient Types</h3>
            <div className="flex items-center space-x-2">
              <FaClinicMedical className="text-indigo-600" />
              <span className="text-sm text-gray-500">Distribution</span>
            </div>
          </div>
          <div className="h-64">
            <Pie data={patientTypesData} options={pieChartOptions} />
          </div>
        </div>

        {/* Upcoming Appointments */}
        <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-lg">Upcoming Appointments</h3>
            <div className="flex items-center space-x-2">
              <FiCalendar className="text-indigo-600" />
              <span className="text-sm text-gray-500">Next 3 days</span>
            </div>
          </div>
          <div className="space-y-4">
            {appointments.map((appointment) => (
              <div key={appointment.id} className="flex items-start p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="mr-3">
                  <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                    {appointment.type === "Dog" ? (
                      <FaDog className="text-lg text-indigo-600" />
                    ) : (
                      <FaCat className="text-lg text-indigo-600" />
                    )}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{appointment.petName}</h4>
                      <p className="text-sm text-gray-500">{appointment.service}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      appointment.status === "confirmed"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {appointment.status}
                    </span>
                  </div>
                  <div className="mt-2 flex justify-between items-center text-sm">
                    <span className="text-gray-500">
                      {appointment.owner}
                    </span>
                    <span className="font-medium">
                      {appointment.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Records */}
      <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-lg">Recent Health Records</h3>
          <div className="flex items-center space-x-2">
            <FaNotesMedical className="text-indigo-600" />
            <span className="text-sm text-gray-500">Last updated</span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pet</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Owner</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Visit</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[
                { id: 1, petName: 'Buddy', owner: 'John Smith', lastVisit: '2023-11-15', service: 'Annual Checkup', status: 'Healthy' },
                { id: 2, petName: 'Whiskers', owner: 'Sarah Johnson', lastVisit: '2023-11-10', service: 'Vaccination', status: 'Vaccinated' },
                { id: 3, petName: 'Max', owner: 'Michael Brown', lastVisit: '2023-11-08', service: 'Dental Cleaning', status: 'Follow-up needed' },
                { id: 4, petName: 'Luna', owner: 'Emily Davis', lastVisit: '2023-11-05', service: 'Spay Surgery', status: 'Recovering' },
              ].map((record) => (
                <tr key={record.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                        {record.petName === 'Whiskers' ? (
                          <FaCat className="text-lg text-indigo-600" />
                        ) : (
                          <FaDog className="text-lg text-indigo-600" />
                        )}
                      </div>
                      <div>
                        <div className="font-medium">{record.petName}</div>
                        <div className="text-sm text-gray-500">{record.petName === 'Whiskers' ? 'Cat' : 'Dog'}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {record.owner}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(record.lastVisit).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {record.service}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      record.status === 'Healthy' || record.status === 'Vaccinated'
                        ? 'bg-green-100 text-green-800'
                        : record.status === 'Recovering'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {record.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default VetDashboard;