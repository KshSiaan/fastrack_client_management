"use client";

import type React from "react";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type * as z from "zod";

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

  async function getClientValue(x: string) {
    const call = await fetch(
      `${window.location.origin}/api/client?serialNo=${x}`
    );

    const res = await call.json();

    if (!call.ok) {
      toast({
        title: "No data found",
        description: "Client no." + x + " " + "not found",
      });
      setReady(false);
      return;
    }
    console.log(res);

    const client = res.client;

    try {
      // Assuming `form` is your form instance, set values as per the schema
      form.setValue("clientName", client.clientName || "");
      form.setValue("contactPerson", client.contactPerson || "");
      form.setValue("designation", client.designation || "");
      form.setValue("cellNumber", client.cellNumber || "");
      form.setValue("emailId", client.emailId || "");
      form.setValue("date", client.date || "");
      form.setValue("contactAddress", client.contactAddress || "");

      setReady(true);
    } catch {
      toast({
        title: "Error",
        description: "Something is wrong, try refreshing the page",
      });
    }
  }

  async function onSubmit(values: z.infer<typeof clientSchema>) {
    try {
      const response = await fetch(`${window.location.origin}/api/client`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const result = await response.json();
      if (response.ok) {
        console.log("Client data updated successfully");
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
      console.log("Error Updating client data:", error);
    }
  }

  return (
    <div className="container mx-auto p-4 md:p-8 overflow-y-auto">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Update Client Data
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
                    <FormItem className="col-span-2">
                      <FormLabel>Serial No.</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter Serial No."
                          {...field}
                          onChange={(
                            e: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            const value = e.target.value;
                            field.onChange(value);
                            if (value && !isNaN(Number.parseInt(value))) {
                              getClientValue(value);
                            } else {
                              form.reset();
                              setReady(false);
                            }
                          }}
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
                        <Input
                          placeholder="Enter Client Name"
                          {...field}
                          disabled={!ready}
                        />
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
                        <Input
                          placeholder="Enter Contact Person"
                          {...field}
                          disabled={!ready}
                        />
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
                        <Input
                          placeholder="Enter Designation"
                          {...field}
                          disabled={!ready}
                        />
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
                        <Input
                          placeholder="Enter Cell Number"
                          {...field}
                          disabled={!ready}
                        />
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
                          disabled={!ready}
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
                        <Input {...field} type="date" disabled={!ready} />
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
                      <Input
                        placeholder="Enter Contact Address"
                        {...field}
                        disabled={!ready}
                      />
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
