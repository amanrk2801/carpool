import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Calendar, Clock, IndianRupee, Car, Minus, Plus, Info } from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";

function OfferRide() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    from: "", to: "", departureDate: "", departureTime: "", passengers: 1, pricePerSeat: "",
    carModel: "", carNumber: "", additionalInfo: ""
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    userData ? setUser(JSON.parse(userData)) : navigate("/signin");
  }, [navigate]);

  const handleInputChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData(prev => ({ ...prev, [name]: newValue }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
  }, [errors]);

  const handlePassengerChange = (increment) => {
    const newPassengerCount = Math.max(1, Math.min(8, formData.passengers + increment));
    setFormData(prev => ({ ...prev, passengers: newPassengerCount }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.from.trim()) newErrors.from = "Starting location is required";
    if (!formData.to.trim()) newErrors.to = "Destination is required";
    if (!formData.departureDate) newErrors.departureDate = "Departure date is required";
    if (!formData.departureTime) newErrors.departureTime = "Departure time is required";
    if (!formData.pricePerSeat || formData.pricePerSeat <= 0) newErrors.pricePerSeat = "Please enter a valid price per seat";
    if (!formData.carModel.trim()) newErrors.carModel = "Car model is required";
    if (!formData.carNumber.trim()) newErrors.carNumber = "Car number is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert("Ride offered successfully! Passengers will be able to book your ride.");
    } catch (error) {
      console.error("Submit error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getMinDate = () => new Date().toISOString().split("T")[0];

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-2">Offer a Ride</h1>
          <p className="text-sm sm:text-base text-gray-600 px-4">Share your journey with fellow travelers and earn money.</p>
          {user && (
            <div className="mt-4 inline-block bg-blue-100 text-blue-800 p-2 sm:p-3 rounded-lg text-sm sm:text-base">
              Welcome back, <strong>{user.name}</strong>!
            </div>
          )}
        </div>

        <div className="max-w-3xl mx-auto bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">{/* Route & Date/Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="relative">
                <MapPin className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                <input
                  type="text" name="from" value={formData.from} onChange={handleInputChange}
                  placeholder="From" 
                  className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm sm:text-base ${errors.from ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.from && <p className="text-xs sm:text-sm text-red-600 mt-1">{errors.from}</p>}
              </div>
              <div className="relative">
                <MapPin className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                <input
                  type="text" name="to" value={formData.to} onChange={handleInputChange}
                  placeholder="To" 
                  className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm sm:text-base ${errors.to ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.to && <p className="text-xs sm:text-sm text-red-600 mt-1">{errors.to}</p>}
              </div>
              <div className="relative">
                <Calendar className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                <input
                  type="date" name="departureDate" value={formData.departureDate} onChange={handleInputChange}
                  min={getMinDate()}
                  className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm sm:text-base ${errors.departureDate ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.departureDate && <p className="text-xs sm:text-sm text-red-600 mt-1">{errors.departureDate}</p>}
              </div>
              <div className="relative">
                <Clock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                <input
                  type="time" name="departureTime" value={formData.departureTime} onChange={handleInputChange}
                  className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm sm:text-base ${errors.departureTime ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.departureTime && <p className="text-xs sm:text-sm text-red-600 mt-1">{errors.departureTime}</p>}
              </div>
            </div>

            {/* Passengers & Price */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Available Seats</label>
                <div className="flex items-center justify-center sm:justify-start gap-3">
                  <button type="button" onClick={() => handlePassengerChange(-1)} disabled={formData.passengers <= 1}
                    className="p-2 sm:p-3 border rounded-full hover:bg-gray-100 disabled:opacity-50 touch-manipulation">
                    <Minus size={16} />
                  </button>
                  <span className="text-lg sm:text-xl font-bold min-w-[2rem] text-center">{formData.passengers}</span>
                  <button type="button" onClick={() => handlePassengerChange(1)} disabled={formData.passengers >= 8}
                    className="p-2 sm:p-3 border rounded-full hover:bg-gray-100 disabled:opacity-50 touch-manipulation">
                    <Plus size={16} />
                  </button>
                </div>
              </div>
              <div>
                <div className="relative">
                  <IndianRupee className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                  <input
                    type="number" name="pricePerSeat" value={formData.pricePerSeat} onChange={handleInputChange}
                    placeholder="Price per seat (₹)" min="1"
                    className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm sm:text-base ${errors.pricePerSeat ? "border-red-500" : "border-gray-300"}`}
                  />
                  {errors.pricePerSeat && <p className="text-xs sm:text-sm text-red-600 mt-1">{errors.pricePerSeat}</p>}
                </div>
                {formData.pricePerSeat > 0 && (
                  <p className="text-xs text-green-600 mt-1">Total Earning: ₹{(formData.pricePerSeat * formData.passengers).toLocaleString()}</p>
                )}
              </div>
            </div>

            {/* Car Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="relative">
                <Car className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                <input
                  type="text" name="carModel" value={formData.carModel} onChange={handleInputChange}
                  placeholder="Car Model (e.g., Maruti Swift)" 
                  className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm sm:text-base ${errors.carModel ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.carModel && <p className="text-xs sm:text-sm text-red-600 mt-1">{errors.carModel}</p>}
              </div>
              <div className="relative">
                <Car className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                <input
                  type="text" name="carNumber" value={formData.carNumber} onChange={handleInputChange}
                  placeholder="Car Number (e.g., MH 12 AB 1234)" 
                  className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm sm:text-base ${errors.carNumber ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.carNumber && <p className="text-xs sm:text-sm text-red-600 mt-1">{errors.carNumber}</p>}
              </div>
            </div>

            {/* Additional Info */}
            <div className="relative">
              <Info className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
              <textarea name="additionalInfo" value={formData.additionalInfo} onChange={handleInputChange} rows={3}
                placeholder="Any other details about your ride..." 
                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm sm:text-base resize-none" />
            </div>

            <button type="submit" disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg touch-manipulation">
              {isLoading ? "Publishing Ride..." : "Offer Ride"}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default OfferRide;
