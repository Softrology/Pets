import React from "react";
import { PlusCircle } from "lucide-react";

const MedicalRecordHeader = ({ selectedPet, selectedPetId, onAddRecord }) => {
  return (
    <div className="bg-gradient-to-r from-teal-500 to-teal-700 rounded-lg shadow-sm p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Medical Records
            {selectedPetId !== "all" && selectedPet && (
              <span className="text-teal-100 text-lg ml-2">
                - {selectedPet.name}
              </span>
            )}
          </h1>
          <p className="text-teal-100">
            {selectedPetId !== "all"
              ? `View and manage ${
                  selectedPet?.name || "selected pet"
                }'s medical history`
              : "Manage pet medical records, track health history, and maintain veterinary information"}
          </p>
        </div>
        <button
          onClick={onAddRecord}
          className="mt-4 md:mt-0 bg-white text-teal-600 px-4 py-2 rounded-lg font-medium hover:bg-teal-50 transition-colors flex items-center"
        >
          <PlusCircle className="h-5 w-5 mr-2" />
          Add New Record
        </button>
      </div>
    </div>
  );
};

export default MedicalRecordHeader;
