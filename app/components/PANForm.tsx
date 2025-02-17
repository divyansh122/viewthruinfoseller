"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface PANFormProps {
  onNext: (panData: { panNumber: string; isRegistered: boolean }) => void;
  onBack: () => void;
}

export default function PANForm({ onNext, onBack }: PANFormProps) {
  const [panNumber, setPanNumber] = useState("");
  const [isRegistered, setIsRegistered] = useState(true);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // PAN number validation
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    if (!panRegex.test(panNumber)) {
      setError("Please enter a valid PAN number.");
      return;
    }

    setError("");
    onNext({ panNumber, isRegistered });
  };

  const handlePanNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "");
    setPanNumber(value);
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
            <Label htmlFor="pan">Enter your PAN number</Label>
            <Input
              id="pan"
              type="text"
              value={panNumber}
              onChange={handlePanNumberChange}
              className="w-full"
              required
              maxLength={10} // PAN numbers are exactly 10 characters long
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>

          <div className="flex gap-4">
            <Button type="button" onClick={onBack} className="w-full border">
              Back
            </Button>
            <Button type="submit" className="w-full bg-black text-white">
              Next
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
