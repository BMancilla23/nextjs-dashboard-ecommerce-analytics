import { Navbar } from "@/components/navigation/Navbar";
import { Sidebar } from "@/components/navigation/Sidebar";
import { auth } from "@/server/auth";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <>
      {/* Main ocupa todo el viewport */}
      <main className="flex flex-col h-screen">
        {/* Navbar incluido en el flujo del layout */}
        <Navbar session={session} />
        {/* El resto del contenido ajusta su tamaño restando el Navbar */}
        <div className="flex flex-1 overflow-hidden">
          {/* Aseguramos overflow oculto */}
          <Sidebar />

          <section className="flex-1 p-4 overflow-y-auto">{children}</section>
        </div>
      </main>
    </>
  );
}
