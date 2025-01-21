"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { FileSpreadsheetIcon, FileText } from "lucide-react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { stringify } from "csv-stringify/sync";
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
interface Client {
  serialNo: number;
  clientName: string;
  contactPerson: string;
  designation: string;
  emailId: string;
  cellNumber: string;
  contactAddress: string;
  date: string;
  _id: string;
  __v: number;
  createdAt: string;
  updatedAt: string;
}

declare module "jspdf" {
  interface jsPDF {
    autoTable: (options: unknown) => jsPDF;
  }
}

export default function Page() {
  const [data, setData] = useState<Client[] | null>(null);
  const [pdfLoading, setPdfLoading] = useState<boolean>(false);
  const [csvLoading, setCsvLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/clientlist`);
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await res.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const downloadPDF = async () => {
    if (!data) return;

    setPdfLoading(true);
    try {
      const doc = new jsPDF();

      // Set smaller font size for the title
      doc.setFontSize(14);
      const currentMonthYear = `${
        monthNames[new Date().getMonth()]
      } ${new Date().getFullYear()}`;
      doc.text(`Client List - ${currentMonthYear}`, 14, 15);

      const tableColumn = [
        "S.No",
        "Client Name",
        "Contact",
        "Designation",
        "Email",
        "Cell",
        "Address",
        "Date",
      ];

      const tableRows = data.map((client) => [
        client.serialNo,
        client.clientName,
        client.contactPerson,
        client.designation,
        client.emailId,
        client.cellNumber,
        client.contactAddress,
        new Date(client.date).toLocaleDateString(),
      ]);

      doc.autoTable({
        head: [tableColumn],
        body: tableRows,
        startY: 20,
        styles: { fontSize: 7 }, // Reduced font size from 8 to 7
        columnStyles: {
          0: { cellWidth: 10 }, // S.No (reduced from 10)
          1: { cellWidth: 25 }, // Client Name (reduced from 30)
          2: { cellWidth: 22 }, // Contact (slightly reduced)
          3: { cellWidth: 22 }, // Designation (slightly reduced)
          4: { cellWidth: 32 }, // Email (slightly reduced)
          5: { cellWidth: 18 }, // Cell (slightly reduced)
          6: { cellWidth: "auto" }, // Address (will take remaining space)
          7: { cellWidth: 18 }, // Date (slightly reduced)
        },
        headStyles: {
          fillColor: [66, 66, 66],
          fontSize: 8, // Slightly larger font for header
        },
      });

      doc.save("client-list.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setPdfLoading(false);
    }
  };

  const downloadCSV = async () => {
    if (!data) return;

    setCsvLoading(true);
    try {
      const csvContent = stringify(
        data.map((client) => ({
          "Serial No": client.serialNo,
          "Client Name": client.clientName,
          "Contact Person": client.contactPerson,
          Designation: client.designation,
          Email: client.emailId,
          "Cell Number": client.cellNumber,
          Address: client.contactAddress,
          Date: new Date(client.date).toLocaleDateString(),
        })),
        {
          header: true,
        }
      );

      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", "client-list.csv");
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error generating CSV:", error);
    } finally {
      setCsvLoading(false);
    }
  };

  return (
    <div className="min-h-full flex flex-col justify-center items-center space-y-6 bg-background">
      <h1 className="text-3xl font-bold">Client List Download</h1>
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <Button
          onClick={downloadPDF}
          disabled={pdfLoading || !data}
          className="w-48"
        >
          <FileText className="h-4 w-4 mr-2" />
          {pdfLoading ? "Generating PDF..." : "Download PDF"}
        </Button>
        <Button
          onClick={downloadCSV}
          disabled={csvLoading || !data}
          className="w-48"
        >
          <FileSpreadsheetIcon className="h-4 w-4 mr-2" />
          {csvLoading ? "Generating CSV..." : "Download CSV"}
        </Button>
      </div>
    </div>
  );
}
