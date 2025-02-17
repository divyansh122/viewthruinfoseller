"use client";

import { useState } from "react";

interface GSTFormProps {
  onNext: (gstData: { gstNumber: string; isRegistered: boolean }) => void;
}

export default function GSTForm({ onNext }: GSTFormProps) {
  const [gstNumber, setGstNumber] = useState("");
  const [isRegistered, setIsRegistered] = useState(true);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Only validate GST if the user has a registered business
    if (isRegistered) {
      if (!gstNumber.trim()) {
        setError("GST number is required.");
        return;
      }
      if (gstNumber.length !== 15) {
        setError("GST number must be exactly 15 characters long.");
        return;
      }
      if (!/^[A-Z0-9]+$/.test(gstNumber)) {
        setError("GST number must contain only uppercase letters and numbers.");
        return;
      }
    }

    setError(""); // Clear any errors
    onNext({ gstNumber, isRegistered });
  };

  const handleGstNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "");
    setGstNumber(value);
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">ClothBuddy</h1>
          <button className="text-sm text-gray-600">My Account</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* GST Input */}
          <div className="space-y-4">
            <label
              htmlFor="gst"
              className="block text-sm font-medium text-gray-700"
            >
              Enter your GST number
            </label>
            <input
              id="gst"
              type="text"
              value={gstNumber}
              onChange={handleGstNumberChange}
              className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none 
                          ${
                            isRegistered
                              ? "focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              : "bg-gray-200 cursor-not-allowed"
                          }`}
              disabled={!isRegistered}
              required={isRegistered}
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>

          {/* Radio Buttons */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="registered"
                checked={isRegistered}
                onChange={() => setIsRegistered(true)}
                className="peer hidden"
              />
              <div className="h-4 w-4 border border-gray-300 rounded-full flex items-center justify-center peer-checked:border-black peer-checked:ring-2 peer-checked:ring-black">
                <div className="h-2 w-2 bg-black rounded-full peer-checked:block hidden"></div>
              </div>
              <label htmlFor="registered" className="text-sm text-gray-700">
                I have a registered business
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="unregistered"
                checked={!isRegistered}
                onChange={() => {
                  setIsRegistered(false);
                  setGstNumber(""); // Clear GST input when switching to unregistered
                  setError(""); // Clear error messages
                }}
                className="peer hidden"
              />
              <div className="h-4 w-4 border border-gray-300 rounded-full flex items-center justify-center peer-checked:border-black peer-checked:ring-2 peer-checked:ring-black">
                <div className="h-2 w-2 bg-black rounded-full peer-checked:block hidden"></div>
              </div>
              <label htmlFor="unregistered" className="text-sm tsext-gray-700">
                I don't have a registered business
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-black text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Next
          </button>
        </form>
      </div>
    </div>
  );
}
