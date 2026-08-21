"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    LayoutDashboard,
    Package,
    PlusSquare,
    Tags,
    LogOut,
    Menu,
    X,
    ExternalLink,
    FileText,
    MessageSquare,
    Handshake,
} from "lucide-react";
import toast from "react-hot-toast";

const navItems = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Categories", href: "/admin/categories", icon: Tags },
    { name: "Add Product", href: "/admin/add-product", icon: PlusSquare },
    { name: "All Products", href: "/admin/products", icon: Package },
    { name: "Contact Forms", href: "/admin/contact-forms", icon: MessageSquare },
    { name: "Partner Forms", href: "/admin/partner-forms", icon: Handshake },
    { name: "Blogs", href: "/admin/blogs", icon: FileText },
];

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const router = useRouter();
    const [mobileOpen, setMobileOpen] = useState(false);

    if (pathname === "/admin/login") {
        return <>{children}</>;
    }

    const handleLogout = () => {
        document.cookie =
            "admin-token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
        toast.success("Logged out successfully");
        router.push("/admin/login");
    };

    return (
        <div className="min-h-screen bg-slate-50 text-gray-800 flex">
            {/* MOBILE BACKDROP */}
            {mobileOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-40 lg:hidden backdrop-blur-sm"
                    onClick={() => setMobileOpen(false)}
                />
            )}

            {/* SIDEBAR */}
            <aside
                className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 flex flex-col justify-between transition-transform duration-300 ease-in-out ${
                    mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
                }`}
            >
                <div>
                    {/* HEADER */}
                    <div className="h-20 px-6 flex items-center justify-between border-b border-slate-100">
                        <Link href="/admin/dashboard" className="flex items-center gap-2">
                            <h1 className="text-2xl font-black bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent tracking-tight">
                                Admin Panel
                            </h1>
                        </Link>
                        <button
                            onClick={() => setMobileOpen(false)}
                            className="lg:hidden text-slate-500 hover:text-slate-700"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* NAV LINKS */}
                    <nav className="p-4 space-y-1.5">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive =
                                pathname === item.href ||
                                (item.href !== "/admin/dashboard" &&
                                    pathname.startsWith(item.href));

                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setMobileOpen(false)}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all duration-200 ${
                                        isActive
                                            ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-200"
                                            : "text-slate-600 hover:bg-indigo-50 hover:text-indigo-600"
                                    }`}
                                >
                                    <Icon size={18} />
                                    <span>{item.name}</span>
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                {/* FOOTER & LOGOUT */}
                <div className="p-4 border-t border-slate-100 space-y-2">
                    <Link
                        href="/"
                        target="_blank"
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 transition"
                    >
                        <ExternalLink size={16} />
                        <span>View Live Store</span>
                    </Link>

                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                    >
                        <LogOut size={16} />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* MAIN CONTENT */}
            <div className="flex-1 flex flex-col min-w-0">
                <div className="lg:hidden h-16 bg-white border-b border-slate-200 px-4 flex items-center justify-between sticky top-0 z-30">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setMobileOpen(true)}
                            className="p-2 text-slate-600 hover:text-slate-900"
                        >
                            <Menu size={22} />
                        </button>
                        <span className="font-bold text-indigo-600 text-lg">Admin Panel</span>
                    </div>
                </div>

                <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
