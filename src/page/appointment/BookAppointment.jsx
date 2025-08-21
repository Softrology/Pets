// components/BookAppointment.jsx
import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  X,
  Calendar,
  Clock,
  Video,
  DollarSign,
  User,
  AlertCircle,
  Check,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { get, post } from "../../services/apiService";
import { GET_ALL_PETS, REQUEST_APPOINTMENT } from "../../services/apiRoutes";
import { getUserToken } from "../../utitlities/Globals";
import AlertDialog from "../../utitlities/Alert";

const BookAppointment = ({ vet, isOpen, onClose }) => {
  const [step, setStep] = useState(1); // 1: Select Pets, 2: Select Date & Time
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedPets, setSelectedPets] = useState([]);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [currentWeekOffset, setCurrentWeekOffset] = useState(0);

  // Reset form when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setSelectedDate("");
      setSelectedPets([]);
      setSelectedTimeSlots([]);
      setAvailableSlots([]);
      setCurrentWeekOffset(0);
    }
  }, [isOpen]);

  const useGetPets = (token) => {
    return useQuery({
      queryKey: ["pets"],
      queryFn: async () => {
        try {
          const response = await get(GET_ALL_PETS, token);
          return response.data || [];
        } catch (error) {
          console.error("Fetch error:", error);
          throw error;
        }
      },
      onError: (error) => {
        AlertDialog("Error", error.message, "error");
      },
    });
  };

  const { data: userPets } = useGetPets(getUserToken());

  // Generate dates for current week view (7 days)
  const getWeekDates = () => {
    const dates = [];
    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(today.getDate() + currentWeekOffset * 7 + 1); // Start from tomorrow

    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  // Check if vet is available on specific day
  const isVetAvailable = (date) => {
    const dayName = [
      "SUNDAY",
      "MONDAY",
      "TUESDAY",
      "WEDNESDAY",
      "THURSDAY",
      "FRIDAY",
      "SATURDAY",
    ][date.getDay()];

    return vet.availability?.some((avail) => avail.day === dayName);
  };

  // Generate time slots for selected date
  const generateTimeSlots = (selectedDateString) => {
    if (!selectedDateString) return [];

    const selectedDate = new Date(selectedDateString);
    const dayName = [
      "SUNDAY",
      "MONDAY",
      "TUESDAY",
      "WEDNESDAY",
      "THURSDAY",
      "FRIDAY",
      "SATURDAY",
    ][selectedDate.getDay()];

    const availability = vet.availability?.find(
      (avail) => avail.day === dayName
    );
    if (!availability) return [];

    const slots = [];
    const [startHour, startMin] = availability.startTime.split(":").map(Number);
    const [endHour, endMin] = availability.endTime.split(":").map(Number);

    // Generate 15-minute slots
    for (
      let hour = startHour;
      hour < endHour || (hour === endHour && startMin < endMin);
      hour++
    ) {
      for (let min = 0; min < 60; min += 15) {
        if (hour === endHour && min >= endMin) break;
        if (hour === startHour && min < startMin) continue;

        const startTime = new Date(selectedDate);
        startTime.setHours(hour, min, 0, 0);

        const endTime = new Date(startTime);
        endTime.setMinutes(endTime.getMinutes() + 15);

        slots.push({
          id: `${hour}-${min}`,
          startTime: startTime.toISOString(),
          endTime: endTime.toISOString(),
          displayTime: `${hour.toString().padStart(2, "0")}:${min
            .toString()
            .padStart(2, "0")}`,
        });
      }
    }

    return slots;
  };

  // Handle date selection
  const handleDateSelect = (dateString) => {
    setSelectedDate(dateString);
    setSelectedTimeSlots([]);
    const slots = generateTimeSlots(dateString);
    setAvailableSlots(slots);
  };

  // Handle time slot selection (max 3)
  const handleTimeSlotToggle = (slot) => {
    setSelectedTimeSlots((prev) => {
      const isSelected = prev.some((s) => s.id === slot.id);

      if (isSelected) {
        return prev.filter((s) => s.id !== slot.id);
      } else if (prev.length < 3) {
        return [...prev, slot].sort(
          (a, b) => new Date(a.startTime) - new Date(b.startTime)
        );
      }
      return prev;
    });
  };

  // Handle pet selection
  const handlePetToggle = (petId) => {
    setSelectedPets((prev) => {
      const isSelected = prev.includes(petId);
      if (isSelected) {
        return prev.filter((id) => id !== petId);
      } else {
        return [...prev, petId];
      }
    });
  };

  // API mutation
  const useRequestAppointment = () => {
    return useMutation({
      mutationFn: async (appointmentData) => {
        const requestBody = {
          vet: appointmentData.vet,
          pets: appointmentData.pets,
          appointmentRequestsDates: appointmentData.appointmentRequestsDates,
        };

        const response = await post(
          REQUEST_APPOINTMENT,
          requestBody,
          getUserToken(),
          {
            "Content-Type": "application/json",
          }
        );

        return response;
      },
      onSuccess: (data) => {
        AlertDialog(
          "",
          data.message || "Appointment request sent successfully",
          "success",
          1500
        );
        onClose();
      },
      onError: (error) => {
        console.error("Request appointment error:", error);
        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          "Failed to request appointment";
        AlertDialog("Error", errorMessage, "error", 3000);
      },
    });
  };

  const { mutate: requestAppointment, isLoading } = useRequestAppointment();

  // Handle form submission
  const handleSubmit = () => {
    if (selectedPets.length === 0) {
      AlertDialog("Error", "Please select at least one pet", "error", 2000);
      return;
    }

    if (selectedTimeSlots.length === 0) {
      AlertDialog(
        "Error",
        "Please select at least one time slot",
        "error",
        2000
      );
      return;
    }

    const appointmentData = {
      vet: vet._id,
      pets: selectedPets,
      appointmentRequestsDates: selectedTimeSlots.map((slot) => ({
        startTime: slot.startTime,
        endtime: slot.endTime, // API expects 'endtime'
      })),
    };

    requestAppointment(appointmentData);
  };

  if (!isOpen) return null;

  const weekDates = getWeekDates();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center space-x-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Book Online Consultation
            </h2>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                  step >= 1 ? "bg-teal-600 text-white" : "bg-gray-200"
                }`}
              >
                1
              </div>
              <div className="w-8 h-px bg-gray-300"></div>
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                  step >= 2 ? "bg-teal-600 text-white" : "bg-gray-200"
                }`}
              >
                2
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            disabled={isLoading}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          {/* Step 1: Select Pets */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Select Your Pets for Consultation
                </h3>
                <p className="text-gray-600">
                  Choose which pets you'd like to discuss with Dr.{" "}
                  {vet.firstName}
                </p>
              </div>

              {userPets?.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h4 className="text-lg font-medium text-gray-900 mb-2">
                    No pets found
                  </h4>
                  <p className="text-gray-600">
                    Please add pets to your profile first
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {userPets?.map((pet) => (
                    <div
                      key={pet._id}
                      onClick={() => handlePetToggle(pet._id)}
                      className={`p-6 border-2 rounded-xl cursor-pointer transition-all hover:shadow-md ${
                        selectedPets.includes(pet._id)
                          ? "border-teal-500 bg-teal-50 shadow-md"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          {pet.profilePicture ? (
                            <img
                              src={pet.profilePicture}
                              alt={pet.name}
                              className="w-16 h-16 rounded-full object-cover"
                            />
                          ) : (
                            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                              <User className="w-8 h-8 text-gray-500" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 text-lg">
                            {pet.name}
                          </h4>
                          <p className="text-gray-600">
                            {pet.species} • {pet.breed}
                          </p>
                          {pet.age && (
                            <p className="text-sm text-gray-500">
                              {pet.age} old
                            </p>
                          )}
                        </div>
                        {selectedPets.includes(pet._id) && (
                          <Check className="w-6 h-6 text-teal-600" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex justify-between pt-6">
                <button
                  onClick={onClose}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setStep(2)}
                  disabled={selectedPets.length === 0}
                  className="px-6 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue to Date & Time
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Select Date & Time */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Choose Your Preferred Date & Time
                </h3>
                <p className="text-gray-600">
                  Select up to 3 time slots for your online consultation
                </p>
              </div>

              {/* Week Navigation */}
              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={() =>
                    setCurrentWeekOffset(Math.max(0, currentWeekOffset - 1))
                  }
                  disabled={currentWeekOffset === 0}
                  className="p-2 rounded-lg border hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <div className="text-center">
                  <h4 className="font-medium text-gray-900">
                    {weekDates[0].toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric",
                    })}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {weekDates[0].toLocaleDateString()} -{" "}
                    {weekDates[6].toLocaleDateString()}
                  </p>
                </div>

                <button
                  onClick={() => setCurrentWeekOffset(currentWeekOffset + 1)}
                  disabled={currentWeekOffset >= 8} // Limit to 2 months ahead
                  className="p-2 rounded-lg border hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Date Selection */}
              <div className="grid grid-cols-7 gap-2 mb-6">
                {weekDates.map((date, index) => {
                  const isAvailable = isVetAvailable(date);
                  const isSelected =
                    selectedDate === date.toISOString().split("T")[0];
                  const isPast = date < new Date().setHours(0, 0, 0, 0);

                  return (
                    <button
                      key={index}
                      onClick={() =>
                        isAvailable &&
                        !isPast &&
                        handleDateSelect(date.toISOString().split("T")[0])
                      }
                      disabled={!isAvailable || isPast}
                      className={`p-3 rounded-lg text-center transition-colors ${
                        isSelected
                          ? "bg-teal-600 text-white"
                          : isAvailable && !isPast
                          ? "border hover:bg-gray-50"
                          : "bg-gray-100 text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      <div className="text-xs font-medium mb-1">
                        {date.toLocaleDateString("en-US", { weekday: "short" })}
                      </div>
                      <div className="text-lg font-semibold">
                        {date.getDate()}
                      </div>
                      {!isAvailable && !isPast && (
                        <div className="text-xs mt-1">Not Available</div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Time Slot Selection */}
              {selectedDate && availableSlots.length > 0 && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">
                    Available Time Slots
                  </h4>
                  <div className="grid grid-cols-4 md:grid-cols-6 gap-3 mb-4">
                    {availableSlots.map((slot) => (
                      <button
                        key={slot.id}
                        type="button"
                        onClick={() => handleTimeSlotToggle(slot)}
                        disabled={isLoading}
                        className={`p-3 text-sm border rounded-lg transition-colors ${
                          selectedTimeSlots.some((s) => s.id === slot.id)
                            ? "border-teal-500 bg-teal-50 text-teal-700"
                            : selectedTimeSlots.length >= 3
                            ? "border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed"
                            : "border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        <Clock className="w-4 h-4 mx-auto mb-1" />
                        {slot.displayTime}
                      </button>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500">
                    Selected: {selectedTimeSlots.length}/3 time slots
                  </p>
                </div>
              )}

              {selectedDate && availableSlots.length === 0 && (
                <div className="text-center py-8 bg-yellow-50 rounded-lg border border-yellow-200">
                  <AlertCircle className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
                  <p className="text-yellow-800 font-medium">
                    No time slots available
                  </p>
                  <p className="text-sm text-yellow-700 mt-2">
                    Please choose a different date
                  </p>
                </div>
              )}

              {/* Consultation Summary */}
              {selectedDate && selectedTimeSlots.length > 0 && (
                <div className="bg-teal-50 p-6 rounded-xl border border-teal-200">
                  <h4 className="font-medium text-teal-900 mb-4 flex items-center">
                    <Video className="w-5 h-5 mr-2" />
                    Online Consultation Summary
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-teal-800">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>
                        Date:{" "}
                        {new Date(selectedDate).toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>
                        Times:{" "}
                        {selectedTimeSlots
                          .map((slot) => slot.displayTime)
                          .join(", ")}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-2" />
                      <span>Pets: {selectedPets.length} selected</span>
                    </div>
                    <div className="flex items-center">
                      <DollarSign className="w-4 h-4 mr-2" />
                      <span>Fee: ${vet.consultationFee}</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-between pt-6">
                <button
                  onClick={() => setStep(1)}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Back to Pets
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={
                    isLoading || !selectedDate || selectedTimeSlots.length === 0
                  }
                  className="px-6 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Requesting...
                    </>
                  ) : (
                    "Request Consultation"
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookAppointment;
