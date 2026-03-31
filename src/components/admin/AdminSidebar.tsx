"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Mail, Settings, Users, ArrowLeft, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin", color: "text-brand-cyan" },
  { icon: Mail, label: "Inquiries", href: "/admin/inquiries", color: "text-brand-violet" },
  { icon: Users, label: "Users", href: "/admin/users", color: "text-brand-cyan" },
  { icon: Settings, label: "Settings", href: "/admin/settings", color: "text-brand-violet" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-[#0A0C10] border-r border-white/5 flex flex-col h-screen sticky top-0 z-50">
      <div className="p-8 pt-10">
        <Link 
          href="/" 
          className="flex items-center gap-3 group text-slate-500 hover:text-white transition-all mb-12"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-[10px] font-mono font-bold uppercase tracking-[0.3em]">Back to Website</span>
        </Link>
        
        <div className="relative">
          <h1 className="text-2xl font-heading font-bold text-white tracking-tighter">
            Lichtzen <span className="text-brand-cyan">Admin</span>
          </h1>
          <div className="w-8 h-1 bg-brand-cyan/30 mt-2 rounded-full" />
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all group",
                isActive 
                  ? "bg-white/5 text-white ring-1 ring-white/10" 
                  : "text-slate-500 hover:text-white hover:bg-white/5"
              )}
            >
              <item.icon className={cn("w-5 h-5", isActive ? item.color : "group-hover:text-white")} />
              <span className="text-sm font-medium">{item.label}</span>
              {isActive && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-brand-cyan shadow-[0_0_8px_rgba(34,211,238,0.6)]" />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/5">
        <button className="flex items-center gap-3 w-full px-4 py-3 text-slate-500 hover:text-red-400 hover:bg-red-400/5 rounded-xl transition-all group">
          <LogOut className="w-5 h-5" />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
}
