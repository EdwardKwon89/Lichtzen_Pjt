import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex bg-[#0A0C10] min-h-screen text-slate-300">
      <AdminSidebar />
      <main className="flex-1 p-10 overflow-auto">
        {children}
      </main>
    </div>
  );
}
