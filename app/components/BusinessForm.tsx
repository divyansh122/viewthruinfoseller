"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
      setCities([...statesData[selectedState as State]]);
      setShowCustomCity(false);
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          state: selectedState,
          city: "",
        },
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

  const handleCitySelect = (value: string) => {
    if (value === "other") {
      setShowCustomCity(true);
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          city: "",
        },
      }));
    } else {
      setShowCustomCity(false);
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          city: value,
        },
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
              <Label htmlFor="storeName">Enter your Store Name</Label>
              <Input
                id="storeName"
                value={formData.storeName}
                onChange={(e) => handleInputChange(e, "storeName")}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Select Product Category</Label>
              <Select
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, category: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose Primary Product" />
                </SelectTrigger>
                <SelectContent className="z-[999]">
                  <SelectItem value="clothing">Clothing</SelectItem>
                  <SelectItem value="accessories">Accessories</SelectItem>
                  <SelectItem value="footwear">Footwear</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Enter your Address</Label>
              <Input
                placeholder="Pincode"
                value={formData.address.pincode}
                onChange={(e) => handleInputChange(e, "address", "pincode")}
                required
              />
              <Input
                placeholder="Address Line 1"
                value={formData.address.addressLine1}
                onChange={(e) =>
                  handleInputChange(e, "address", "addressLine1")
                }
                required
              />
              <Input
                placeholder="Address Line 2"
                value={formData.address.addressLine2}
                onChange={(e) =>
                  handleInputChange(e, "address", "addressLine2")
                }
              />

              <Select
                value={selectedState}
                onValueChange={(value: State) => setSelectedState(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select State" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(statesData).map((state) => (
                    <SelectItem key={state} value={state}>
                      {state}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {selectedState && (
                <Select
                  value={formData.address.city}
                  onValueChange={handleCitySelect}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select City" />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                    <SelectItem value="other">Other City</SelectItem>
                  </SelectContent>
                </Select>
              )}

              {showCustomCity && (
                <Input
                  placeholder="Enter City Name"
                  value={formData.address.city}
                  onChange={(e) => handleInputChange(e, "address", "city")}
                  required
                />
              )}

              <Input
                value={formData.address.country}
                disabled
                className="bg-gray-100"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <Button type="button" onClick={onBack} className="w-full">
              Back
            </Button>
            <Button type="submit" className="w-full text-white bg-black">
              Continue
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
