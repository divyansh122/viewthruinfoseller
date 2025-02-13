"use client";

import { useState } from "react";
import GSTForm from "./components/GSTForm";
import PANForm from "./components/PANForm";
import BusinessForm from "./components/BusinessForm";

export default function Home() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    gst: { gstNumber: "", isRegistered: true },
    pan: { panNumber: "", isRegistered: true },
    business: {
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
    },
  });

  const handleGSTSubmit = (gstData: { gstNumber: string; isRegistered: boolean }) => {
    setFormData((prev) => ({ ...prev, gst: gstData }));
    setStep(2);
  };

  const handlePANSubmit = (panData: { panNumber: string; isRegistered: boolean }) => {
    setFormData((prev) => ({ ...prev, pan: panData }));
    setStep(3);
  };

  const handleBusinessSubmit = (businessData: typeof formData.business) => {
    setFormData((prev) => ({ ...prev, business: businessData }));
    console.log("Final form data:", formData);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      {step === 1 && <GSTForm onNext={handleGSTSubmit} />}
      {step === 2 && (
        <PANForm onNext={handlePANSubmit} onBack={() => setStep(1)} />
      )}
      {step === 3 && (
        <BusinessForm
          onSubmit={handleBusinessSubmit}
          onBack={() => setStep(2)}
        />
      )}
    </div>
  );
}