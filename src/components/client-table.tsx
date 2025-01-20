"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader2Icon } from "lucide-react";

export interface ClientType {
  _id: string;
  serialNo: string;
  clientName: string;
  contactPerson: string;
  designation: string;
  cellNumber: string;
  emailId: string;
  date: string;
  contactAddress: string;
  createdAt: string;
  updatedAt: string;
  _v: string;
}

export default function ClientTable({ reverse }: { reverse: boolean }) {
  const [clientData, setClientData] = useState<ClientType[]>([]); // State to store client data
  const [loading, setLoading] = useState(true); // Loading state for data fetching
  const [error, setError] = useState<string | null>(null); // Error state

  useEffect(() => {
    const fetchClientData = async () => {
      try {
        const response = await fetch(
          `${window.location.origin}/api/clientlist`
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.statusText}`);
        }
        const data = await response.json();
        console.log("API Response:", data); // Log the entire response

        if (Array.isArray(data.client)) {
          setClientData(data.client);
        } else if (Array.isArray(data)) {
          setClientData(data);
        } else {
          throw new Error("Received data is not in the expected format");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error instanceof Error ? error.message : String(error));
      } finally {
        setLoading(false);
      }
    };

    fetchClientData();
  }, []);

  // Derived array for rendering
  const displayedData = reverse ? [...clientData].reverse() : clientData;

  if (loading) {
    return (
      <div className="w-full h-[100px] flex flex-row justify-center items-center">
        <Loader2Icon className="animate-spin" />
      </div>
    );
  }

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }

  if (clientData.length === 0) {
    return <div className="p-4">No client data available.</div>;
  }

  return (
    <div className="w-full overflow-auto">
      


      <Table className="min-w-[1000px]">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Serial No.</TableHead>
            <TableHead>Client Name</TableHead>
            <TableHead>Contact Person</TableHead>
            <TableHead>Designation</TableHead>
            <TableHead>Cell Number</TableHead>
            <TableHead>E-mail ID</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Contact Address</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {displayedData.map((client) => (
            <TableRow key={client.serialNo}>
              <TableCell className="font-medium">{client.serialNo}</TableCell>
              <TableCell>{client.clientName}</TableCell>
              <TableCell>{client.contactPerson}</TableCell>
              <TableCell>{client.designation}</TableCell>
              <TableCell>{client.cellNumber}</TableCell>
              <TableCell>{client.emailId}</TableCell>
              <TableCell>{client.date.split("T")[0]}</TableCell>
              <TableCell>{client.contactAddress}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
