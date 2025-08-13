import React from "react";
import { FileText, Stethoscope, Activity, Heart } from "lucide-react";
import { LuTestTubeDiagonal } from "react-icons/lu";
import { GoZap } from "react-icons/go";

const MedicalRecordAnalytics = ({ analytics }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center">
          <div className="p-2 bg-teal-100 rounded-lg">
            <FileText className="h-6 w-6 text-teal-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Total Records</p>
            <p className="text-2xl font-bold text-gray-900">
              {analytics.total}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Stethoscope className="h-6 w-6 text-blue-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Consultations</p>
            <p className="text-2xl font-bold text-gray-900">
              {analytics.consultations}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center">
          <div className="p-2 bg-green-100 rounded-lg">
            <Activity className="h-6 w-6 text-green-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Vaccinations</p>
            <p className="text-2xl font-bold text-gray-900">
              {analytics.vaccinations}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center">
          <div className="p-2 bg-red-100 rounded-lg">
            <LuTestTubeDiagonal className="h-6 w-6 text-red-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Blood Tests</p>
            <p className="text-2xl font-bold text-gray-900">
              {analytics.bloodTests}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center">
          <div className="p-2 bg-purple-100 rounded-lg">
            <GoZap className="h-6 w-6 text-purple-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">X-Rays</p>
            <p className="text-2xl font-bold text-gray-900">
              {analytics.xrays}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center">
          <div className="p-2 bg-orange-100 rounded-lg">
            <Heart className="h-6 w-6 text-orange-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Others</p>
            <p className="text-2xl font-bold text-gray-900">
              {analytics.others}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalRecordAnalytics;
