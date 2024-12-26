"use client"
import React from "react";
import FormComponent, { FormData } from "./components/TaskForm";
import { TaskResponse } from "./data";
import { VersionedTransaction } from "@solana/web3.js";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";

const Page = () => {

  const { connection } = useConnection();
  const { sendTransaction } = useWallet();

  const handleFormSubmit = async (formData: FormData) => {
    const options = {
      method: "POST",
      headers: { accept: "application/json", "content-type": "application/json" },
      body: JSON.stringify(formData),
    };

    try {
      const response = await fetch("https://api2.gib.work/tasks/public/transaction", options);
      const data:TaskResponse = await response.json();
      console.log("Response:", data);
      const tx = VersionedTransaction.deserialize(Buffer.from(data.serializedTransaction, "base64"))
      const blockhash = (await connection.getLatestBlockhash()).blockhash;
      tx.message.recentBlockhash = blockhash;
      const signature = await sendTransaction(tx, connection);
      console.log("Signature:", signature);
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
