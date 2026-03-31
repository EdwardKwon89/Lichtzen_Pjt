"use client";

import { useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { cn } from "@/lib/utils";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="flex bg-[#0A0C10] min-h-screen text-slate-300">
      <AdminSidebar collapsed={isSidebarCollapsed} onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)} />
      <main className={cn(
        "flex-1 p-10 overflow-auto transition-all duration-300",
        isSidebarCollapsed ? "pl-20" : "pl-64"
      )}>
        {children}
      </main>
    </div>
  );
}
