import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mi Control Financiero",
  description: "Administra tus finanzas personales desde un único lugar.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <div className="flex h-screen bg-gray-100">
          {/* Sidebar placeholder */}
          <aside className="w-64 bg-white border-r hidden md:block">
            <div className="p-6">
              <h1 className="text-xl font-bold text-blue-600">Mi Control</h1>
            </div>
            <nav className="mt-6">
              <a href="/" className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-50">
                Dashboard
              </a>
              <a href="/cuentas" className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-50">
                Cuentas
              </a>
              <a href="/categorias" className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-50">
                Categorías
              </a>
              <a href="/movimientos/nuevo" className="flex items-center justify-center px-6 py-3 mt-4 mx-4 text-white bg-blue-600 rounded hover:bg-blue-700 font-semibold shadow-sm">
                + Registrar
              </a>
            </nav>
          </aside>

          {/* Main Content */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Header */}
            <header className="bg-white border-b h-16 flex items-center justify-between px-6">
              <div className="md:hidden">
                <h1 className="text-xl font-bold text-blue-600">Mi Control</h1>
              </div>
              <div className="flex items-center ml-auto">
                <span className="text-sm text-gray-600 mr-4">Usuario de Prueba</span>
                <div className="h-8 w-8 bg-blue-600 rounded-full text-white flex items-center justify-center">
                  U
                </div>
              </div>
            </header>

            {/* Page Content */}
            <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
