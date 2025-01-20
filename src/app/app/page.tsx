"use client";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CirclePlusIcon, PencilIcon } from "lucide-react";
// import { ScrollArea } from "@/components/ui/scroll-area";
import ClientTable from "@/components/client-table";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const [arrangement, setArrangement] = useState<boolean>(true);
  const navig = useRouter();

  return (
    <>
      <div className="flex flex-col h-full">
        <div className="flex flex-col space-y-4 p-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0">
            <Select
              onValueChange={(value) => {
                if (value === "early") {
                  setArrangement(false);
                } else if (value === "recent") {
                  setArrangement(true);
                }
              }}
            >
              <SelectTrigger className="w-full mb-2 sm:mb-0 sm:w-[180px]">
                <SelectValue placeholder="Arrangement" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Latest dataset</SelectItem>
                <SelectItem value="early">Earliest dataset</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-end space-x-4">
            <TooltipProvider>
              <Tooltip delayDuration={300}>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      navig.push("/app/edit");
                    }}
                  >
                    <PencilIcon className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Edit</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip delayDuration={300}>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      navig.push("/app/add");
                    }}
                  >
                    <CirclePlusIcon className="h-4 w-4" />
                    <span className="sr-only">Add</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Add</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        <div className="flex-1 p-4 min-h-0">
          <div className="h-full rounded-md border overflow-auto">
            <div className="p-4">
              <ClientTable reverse={arrangement} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
