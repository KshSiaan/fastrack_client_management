"use client";

import * as React from "react";
import { SquareTerminal, Moon, Sun } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "next-themes";

const data = {
  user: {
    name: "FasTrack",
    email: "FasTrack Eng. BD",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Client List",
      url: "/app",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Add new client",
          url: "/app/add",
        },
        {
          title: "Edit Client data",
          url: "/app/edit",
        },
        {
          title: "Export Client Data",
          url: "/app/export",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { theme, setTheme } = useTheme();

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="hover:bg-transparent"
              asChild
            >
              <Link href="/" className="font-la_belle">
                <Image
                  src="/logo.webp"
                  height="1588"
                  width="2112"
                  alt="logo"
                  className="w-[64px] select-none"
                />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        {mounted && (
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center space-x-2">
              {theme == "light" ? (
                <Sun
                  className="h-[1.2rem] w-[1.2rem]"
                  suppressHydrationWarning
                />
              ) : (
                <Moon
                  className="h-[1.2rem] w-[1.2rem]"
                  suppressHydrationWarning
                />
              )}
              <span className="text-sm font-medium">Toggle theme</span>
            </div>

            <Switch
              checked={theme === "dark"}
              onCheckedChange={() =>
                setTheme(theme === "dark" ? "light" : "dark")
              }
            />
          </div>
        )}
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
