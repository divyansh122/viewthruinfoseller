"use client";

import { useState, useEffect } from "react";
import { statesData, type State } from "@/lib/india-data";

interface BusinessFormProps {
  onSubmit: (businessData: {
    storeName: string;
    category: string;
    address: {
      pincode: string;
      addressLine1: string;
      addressLine2: string;
      city: string;
      state: string;
      country: string;
    };
  }) => void;
  onBack: () => void;
}

export default function BusinessForm({ onSubmit, onBack }: BusinessFormProps) {
  const [formData, setFormData] = useState({
    storeName: "",
    category: "",
    address: {
      pincode: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      country: "INDIA",
    },
  });

  const [selectedState, setSelectedState] = useState<State | "">("");
  const [cities, setCities] = useState<string[]>([]);
  const [showCustomCity, setShowCustomCity] = useState(false);

  useEffect(() => {
    if (selectedState) {
      setCities(statesData[selectedState as State]);
      setShowCustomCity(false);
      setFormData(prev => ({
        ...prev,
        address: {
          ...prev.address,
          state: selectedState,
          city: ""
        }
      }));
    }
  }, [selectedState]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string,
    addressField?: string
  ) => {
    if (addressField) {
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: e.target.value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    }
  };

  const handleCitySelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === "other") {
      setShowCustomCity(true);
      setFormData(prev => ({
        ...prev,
        address: {
          ...prev.address,
          city: ""
        }
      }));
    } else {
      setShowCustomCity(false);
      setFormData(prev => ({
        ...prev,
        address: {
          ...prev.address,
          city: value
        }
      }));
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">ClothBuddy</h1>
          <button className="text-sm text-gray-600">My Account</button>
        </div>

        <h2 className="text-xl font-semibold">Tell Us about your Business</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="storeName" className="block text-sm font-medium text-gray-700">
                Enter your Store Name
              </label>
              <input
                id="storeName"
                value={formData.storeName}
                onChange={(e) => handleInputChange(e, "storeName")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                Select Product Category
              </label>
              <select
                id="category"
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Choose Primary Product</option>
                <option value="clothing">Clothing</option>
                <option value="accessories">Accessories</option>
                <option value="footwear">Footwear</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Enter your Address</label>
              <input
                placeholder="Pincode"
                value={formData.address.pincode}
                onChange={(e) => handleInputChange(e, "address", "pincode")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
              <input
                placeholder="Address Line 1"
                value={formData.address.addressLine1}
                onChange={(e) => handleInputChange(e, "address", "addressLine1")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
              <input
                placeholder="Address Line 2"
                value={formData.address.addressLine2}
                onChange={(e) => handleInputChange(e, "address", "addressLine2")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value as State)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select State</option>
                {Object.keys(statesData).map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>

              {selectedState && (
                <select
                  value={formData.address.city}
                  onChange={handleCitySelect}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select City</option>
                  {cities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                  <option value="other">Other City</option>
                </select>
              )}

              {showCustomCity && (
                <input
                  placeholder="Enter City Name"
                  value={formData.address.city}
                  onChange={(e) => handleInputChange(e, "address", "city")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              )}

              <input
                value={formData.address.country}
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={onBack}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Back
            </button>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}