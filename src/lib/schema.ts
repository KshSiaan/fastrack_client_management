import * as z from "zod";

export const clientSchema = z.object({
  serialNo: z.string().min(1, "Serial No. is required"),
  clientName: z.string().min(1, "Client Name is required"),
  contactPerson: z.string().min(1, "Contact Person is required"),
  designation: z.string().min(1, "Designation is required"),
  cellNumber: z.string().min(10, "Cell Number must be at least 10 digits"),
  emailId: z.string().email("Invalid email address"),
  date: z.string().min(1, "Date is required"),
  contactAddress: z.string().min(1, "Contact Address is required"),
});
