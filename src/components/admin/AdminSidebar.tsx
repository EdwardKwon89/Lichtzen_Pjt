"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Mail, Settings, Users, ArrowLeft, LogOut, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  topic: string;
  status: "unread" | "responded" | "waiting";
  messages: any[];
  createdAt: any;
  userId?: string;
  message?: string;
}

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin", color: "text-brand-cyan" },
  { icon: Mail, label: "Inquiries", href: "/admin/inquiries", color: "text-brand-violet" },
  { icon: Users, label: "Users", href: "/admin/users", color: "text-brand-cyan" },
  { icon: Settings, label: "Settings", href: "/admin/settings", color: "text-brand-violet" },
];

interface AdminSidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
}

export default function AdminSidebar({ collapsed, onToggle }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <div className={cn(
      "bg-[#0A0C10] border-r border-white/5 flex flex-col h-screen sticky top-0 z-50 transition-all duration-300",
      collapsed ? "w-20" : "w-64"
    )}>
      <div className={cn("p-8 pt-10 relative transition-all duration-300", collapsed && "p-4 flex flex-col items-center")}>
        <button 
          onClick={onToggle}
          className="absolute -right-3 top-10 bg-slate-800 border border-white/10 rounded-full p-1 text-slate-400 hover:text-white transition-colors z-[60]"
        >
          {collapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
        </button>

        {!collapsed && (
          <Link 
            href="/" 
            className="flex items-center gap-3 group text-slate-500 hover:text-white transition-all mb-12"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.3em]">Back to Website</span>
          </Link>
        )}
        
        <div className={cn("relative transition-all duration-300", collapsed && "mb-8")}>
          {collapsed ? (
            <div className="w-10 h-10 bg-brand-cyan/20 rounded-xl flex items-center justify-center font-bold text-brand-cyan text-xl">L</div>
          ) : (
            <>
              <h1 className="text-2xl font-heading font-bold text-white tracking-tighter">
                Lichtzen <span className="text-brand-cyan">Admin</span>
              </h1>
              <div className="w-8 h-1 bg-brand-cyan/30 mt-2 rounded-full" />
            </>
          )}
        </div>
      </div>

      <nav className={cn("flex-1 px-4 space-y-1 transition-all duration-300", collapsed && "px-2")}>
        {menuItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              title={collapsed ? item.label : ""}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all group",
                collapsed && "justify-center px-0",
                isActive 
                  ? "bg-white/5 text-white ring-1 ring-white/10" 
                  : "text-slate-500 hover:text-white hover:bg-white/5"
              )}
            >
              <item.icon className={cn("w-5 h-5 transition-all", isActive ? item.color : "group-hover:text-white")} />
              {!collapsed && <span className="text-sm font-medium animate-in fade-in duration-300">{item.label}</span>}
              {isActive && !collapsed && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-brand-cyan shadow-[0_0_8px_rgba(34,211,238,0.6)]" />
              )}
            </Link>
          );
        })}
      </nav>

      <div className={cn("p-4 border-t border-white/5 transition-all duration-300", collapsed && "p-2")}>
        <button className={cn(
          "flex items-center gap-3 w-full px-4 py-3 text-slate-500 hover:text-red-400 hover:bg-red-400/5 rounded-xl transition-all group",
          collapsed && "justify-center px-0"
        )}>
          <LogOut className="w-5 h-5" />
          {!collapsed && <span className="text-sm font-medium">{"Logout"}</span>}
        </button>
      </div>
    </div>
  );
}
