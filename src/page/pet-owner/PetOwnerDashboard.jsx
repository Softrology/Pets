import React from "react";
import { FiUser,  FiCalendar, FiBell, FiDroplet, FiActivity } from "react-icons/fi";
import { FaDog, FaCat, FaClinicMedical, FaWikipediaW } from "react-icons/fa";
import { Line, Bar, Pie } from "react-chartjs-2";
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
} from "chart.js";

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

const PetOwnerDashboard = () => {

  const user = JSON.parse(localStorage.getItem("user"));

  const {
  _id,
  firstName,
  lastName,
  emailAddress,
  role,
  profilePicture,
  phoneNumber,
  dateOfBirth,
  gender,
  city,
  country,
  isEmailVerified,
  isActivated,
  isApproved,
  createdAt,
  updatedAt
} = user;


  // Static pet data
  const pets = [
    {
      id: 1,
      name: "Buddy",
      type: "Dog",
      breed: "Golden Retriever",
      age: 3,
      weight: 25.4,
      lastVetVisit: "2023-05-15",
      nextAppointment: "2023-11-20",
      vaccinations: ["Rabies", "Distemper", "Parvovirus"],
    },
    {
      id: 2,
      name: "Whiskers",
      type: "Cat",
      breed: "Siamese",
      age: 5,
      weight: 4.2,
      lastVetVisit: "2023-06-10",
      nextAppointment: "2023-12-05",
      vaccinations: ["Rabies", "Feline Leukemia"],
    },
  ];

  // Chart data
  const weightData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Buddy's Weight (kg)",
        data: [24.5, 24.8, 25.1, 25.3, 25.6, 25.4],
        borderColor: "rgb(79, 70, 229)",
        backgroundColor: "rgba(79, 70, 229, 0.1)",
        tension: 0.3,
        fill: true,
      },
    ],
  };

  const activityData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Active Minutes",
        data: [45, 60, 30, 50, 55, 70, 40],
        backgroundColor: "rgba(79, 70, 229, 0.7)",
      },
    ],
  };

  const vaccinationData = {
    labels: ["Rabies", "Distemper", "Parvovirus", "Bordetella"],
    datasets: [
      {
        data: [100, 100, 100, 0],
        backgroundColor: [
          "rgba(79, 70, 229, 0.7)",
          "rgba(16, 185, 129, 0.7)",
          "rgba(245, 158, 11, 0.7)",
          "rgba(239, 68, 68, 0.7)",
        ],
      },
    ],
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Header */}
    

      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl p-6 text-white mb-6">
        <h1 className="text-2xl font-bold mb-2">{`Welcome ${firstName} ${lastName}!`}</h1>
        <p className="opacity-90">You have 1 upcoming appointment and 2 vaccination reminders</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Total Pets</p>
              <h3 className="text-2xl font-bold">{pets.length}</h3>
            </div>
            <div className="p-3 rounded-full bg-indigo-100 text-indigo-600">
              <FaWikipediaW className="text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Upcoming Appointments</p>
              <h3 className="text-2xl font-bold">1</h3>
            </div>
            <div className="p-3 rounded-full bg-green-100 text-green-600">
              <FiCalendar className="text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Vaccination Due</p>
              <h3 className="text-2xl font-bold">2</h3>
            </div>
            <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
              <FaClinicMedical className="text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Medication Reminders</p>
              <h3 className="text-2xl font-bold">3</h3>
            </div>
            <div className="p-3 rounded-full bg-red-100 text-red-600">
              <FiDroplet className="text-xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Weight Chart */}
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="font-semibold text-lg mb-4">Weight Tracking</h3>
          <div className="h-64">
            <Line data={weightData} options={chartOptions} />
          </div>
        </div>

        {/* Activity Chart */}
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="font-semibold text-lg mb-4">Activity Level</h3>
          <div className="h-64">
            <Bar data={activityData} options={chartOptions} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Vaccination Chart */}
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="font-semibold text-lg mb-4">Vaccination Status</h3>
          <div className="h-64">
            <Pie data={vaccinationData} options={chartOptions} />
          </div>
        </div>

        {/* Pets Summary */}
        <div className="bg-white rounded-lg shadow p-4 lg:col-span-2">
          <h3 className="font-semibold text-lg mb-4">My Pets</h3>
          <div className="space-y-4">
            {pets.map((pet) => (
              <div key={pet.id} className="flex items-center p-4 border rounded-lg">
                <div className="mr-4 p-3 rounded-full bg-indigo-100 text-indigo-600">
                  {pet.type === "Dog" ? <FaDog className="text-2xl" /> : <FaCat className="text-2xl" />}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-lg">{pet.name}</h4>
                      <p className="text-sm text-gray-500">
                        {pet.breed} • {pet.age} years old • {pet.weight} kg
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <FiActivity className="text-indigo-600" />
                      <FiDroplet className="text-green-600" />
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Last vet visit:</span>
                      <span>{new Date(pet.lastVetVisit).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between text-sm mt-1">
                      <span className="text-gray-500">Next appointment:</span>
                      <span className="font-medium text-indigo-600">
                        {new Date(pet.nextAppointment).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetOwnerDashboard;