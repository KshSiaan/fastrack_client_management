"use client";

import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { clientSchema } from "@/lib/schema";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export default function Page() {
  const [ready, setReady] = useState<boolean>(false);
  const form = useForm<z.infer<typeof clientSchema>>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      // serialNo: "",
      // clientName: "John Doe Industries",
      // contactPerson: "John Doe",
      // designation: "CEO",
      // cellNumber: "1234567890",
      // emailId: "john.doe@example.com",
      // date: new Date().toISOString().split("T")[0], // Default to today's date
      // contactAddress: "1234 Elm Street, Springfield",
      serialNo: "",
      clientName: "",
      contactPerson: "",
      designation: "",
      cellNumber: "",
      emailId: "",
      date: new Date().toISOString().split("T")[0], // Default to today's date
      contactAddress: "",
    },
  });
  const navig = useRouter();

  async function onSubmit(values: z.infer<typeof clientSchema>) {
    try {
      const response = await fetch(`${window.location.origin}/api/clientlist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const result = await response.json();
      if (response.ok) {
        console.log("Client data submitted successfully");
        toast({
          title: "Success",
          description: result.message,
        });
        form.reset();
        navig.push("/app");
      } else {
        toast({
          title: "Unfortunately",
          description: result.error,
        });
      }
    } catch (error) {
      console.log("Error submitting client data:", error);
    }
  }

  useEffect(() => {
    async function findSerial() {
      const response = await fetch(`${window.location.origin}/api/clientcount`);
      if (!response.ok) {
        toast({
          title: "Something is wrong",
          description: "Can't connect with server",
        });
        return;
      }
      const result = await response.json();
      form.setValue("serialNo", (result.count + 1).toString());

      setReady(true);
    }
    // setReady(true);
    findSerial();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container mx-auto p-4 md:p-8 overflow-y-auto">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Add New Client Data
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="serialNo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Serial No.</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter Serial No."
                          {...field}
                          disabled
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="clientName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Client Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter Client Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="contactPerson"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Person</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter Contact Person" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="designation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Designation</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter Designation" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="cellNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cell Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter Cell Number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="emailId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>E-mail ID</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter E-mail ID"
                          {...field}
                          type="email"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date</FormLabel>
                      <FormControl>
                        <Input {...field} type="date" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="contactAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Contact Address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={!ready}>
                {ready ? "Submit" : "Preparing..."}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
