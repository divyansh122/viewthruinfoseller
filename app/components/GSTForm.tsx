"use client";

import { useState } from "react";

interface GSTFormProps {
  onNext: (gstData: { gstNumber: string; isRegistered: boolean }) => void;
}

export default function GSTForm({ onNext }: GSTFormProps) {
  const [gstNumber, setGstNumber] = useState("");
  const [isRegistered, setIsRegistered] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({ gstNumber, isRegistered });
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">ClothBuddy</h1>
          <button className="text-sm text-gray-600">My Account</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <label htmlFor="gst" className="block text-sm font-medium text-gray-700">
              Enter your GST number
            </label>
            <input
              id="gst"
              type="text"
              value={gstNumber}
              onChange={(e) => setGstNumber(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="registered"
                checked={isRegistered}
                onChange={() => setIsRegistered(true)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <label htmlFor="registered" className="text-sm text-gray-700">
                I have a registered business
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="unregistered"
                checked={!isRegistered}
                onChange={() => setIsRegistered(false)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <label htmlFor="unregistered" className="text-sm text-gray-700">
                I don't have a registered business
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Next
          </button>
        </form>
      </div>
    </div>
  );
}