"use client"
import React from "react";
import FormComponent from "./components/TaskForm";

const Page = () => {
  const handleFormSubmit = async (formData: any) => {
    const options = {
      method: "POST",
      headers: { accept: "application/json", "content-type": "application/json" },
      body: JSON.stringify(formData),
    };

    try {
      const response = await fetch("https://api2.gib.work/tasks/public/transaction", options);
      const data = await response.json();
      console.log("Response:", data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <FormComponent onSubmit={handleFormSubmit} />
    </div>
  );
};

export default Page;
