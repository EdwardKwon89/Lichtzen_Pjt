"use client";

import { Link, useRouter, usePathname } from "@/i18n/routing";
import { LayoutDashboard, Mail, Settings, Users, ArrowLeft, LogOut, ChevronLeft, ChevronRight, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { logoutAdmin } from "@/app/actions/admin-auth";
import { useParams } from "next/navigation";

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
  title: string;
}

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin", color: "text-brand-cyan" },
  { icon: Mail, label: "Inquiries", href: "/admin/inquiries", color: "text-brand-violet" },
  // { icon: Users, label: "Users", href: "/admin/users", color: "text-brand-cyan" }, // 현재 페이지 없음으로 인해 임시 주석 처리
  { icon: Settings, label: "Settings", href: "/admin/settings", color: "text-brand-violet" },
];

interface AdminSidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
}

export default function AdminSidebar({ collapsed, onToggle }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();

  return (
    <div className={cn(
      "bg-[#0A0C10] border-r border-white/5 flex flex-col h-screen sticky top-0 z-50 transition-all duration-300",
      collapsed ? "w-20" : "w-64"
    )}>
      <div className={cn("p-8 pt-10 relative transition-all duration-300", collapsed && "p-4 flex flex-col items-center")}>

        {!collapsed && (
          <Link 
            href="/" 
            className="flex items-center gap-3 group text-slate-500 hover:text-white transition-all mb-12"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.3em]">Back to Website</span>
          </Link>
        )}
        
        <div className={cn("relative transition-all duration-300 flex items-center justify-between gap-2", collapsed && "mb-8")}>
          {collapsed ? (
            <div className="w-10 h-10 bg-brand-cyan/20 rounded-xl flex items-center justify-center font-bold text-brand-cyan text-xl">L</div>
          ) : (
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl font-heading font-bold text-white tracking-tighter truncate">
                Admin
              </h1>
              <div className="w-8 h-1 bg-brand-cyan/30 mt-1 rounded-full" />
            </div>
          )}
          
          <button 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onToggle?.();
            }}
            className={cn(
              "p-2 bg-white/5 border border-white/10 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-all shadow-lg",
              collapsed && "absolute -right-3 top-0 scale-75"
            )}
            title={collapsed ? "Expand" : "Collapse"}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
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
        <button 
          onClick={async () => {
            const res = await logoutAdmin();
            if (res.success) {
              // i18n/routing의 router.push는 로케일을 자동으로 처리하므로 
              // 직접 /ko/ 나 /en/ 을 붙이면 경로가 꼬여 404가 발생함
              router.push('/admin/login' as any);
              router.refresh();
            }
          }}
          className={cn(
            "flex items-center gap-3 w-full px-4 py-3 text-slate-500 hover:text-red-400 hover:bg-red-400/5 rounded-xl transition-all group",
            collapsed && "justify-center px-0"
          )}
        >
          <LogOut className="w-5 h-5" />
          {!collapsed && <span className="text-sm font-medium">Logout</span>}
        </button>
      </div>
    </div>
  );
}
