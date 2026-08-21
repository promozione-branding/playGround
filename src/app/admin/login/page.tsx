"use client";

import React, { useState } from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Image from "next/image";

export default function Page() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPass, setShowPass] = useState(false);

    const router = useRouter();

    const handleLogin = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        // ACCEPT TOY PARK CREDENTIALS (.com or .in)
        const normalizedEmail = email.trim().toLowerCase();
        if (
            password === "toypark@1234" &&
            (normalizedEmail === "admin@toypark.com" || normalizedEmail === "admin@toypark.in")
        ) {
            document.cookie =
                "admin-token=toypark-secret123; path=/";

            toast.success("Login successful");

            router.push("/admin/dashboard");
        } else {
            toast.error("Invalid credentials!");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-100 via-white to-yellow-100 p-4 text-black">
            <div className="w-full max-w-md backdrop-blur-lg bg-white/80 border border-white/30 shadow-2xl rounded-3xl p-8">
                {/* LOGO */}
                <div className="flex flex-col items-center mb-4">
                    <h1 className="text-3xl font-bold mt-2 text-gray-800">
                        Welcome Back
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Login to continue to Toy Park
                    </p>
                </div>
                {/* FORM */}
                <form
                    onSubmit={handleLogin}
                    className="space-y-4"
                >
                    {/* EMAIL */}
                    <div className="relative">
                        <Mail
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                            size={20}
                        />
                        <input
                            type="email"
                            placeholder="Admin Email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 bg-white/70 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                            required
                        />
                    </div>
                    {/* PASSWORD */}
                    <div className="relative">
                        <Lock
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                            size={20}
                        />
                        <input
                            type={
                                showPass
                                    ? "text"
                                    : "password"
                            }
                            placeholder="Password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            className="w-full pl-12 pr-12 py-3 rounded-xl border border-gray-300 bg-white/70 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                            required
                        />
                        <button
                            type="button"
                            onClick={() =>
                                setShowPass(
                                    !showPass
                                )
                            }
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800 transition"
                        >
                            {showPass ? (
                                <EyeOff size={20} />
                            ) : (
                                <Eye size={20} />
                            )}
                        </button>

                    </div>
                    {/* REMEMBER ME */}
                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center gap-2 text-gray-600">
                            <input
                                type="checkbox"
                                className="accent-orange-600"
                            />
                            Remember me
                        </label>
                    </div>
                    {/* LOGIN */}
                    <button
                        type="submit"
                        className="w-full bg-orange-600 hover:bg-orange-700 active:scale-[0.98] transition-all duration-200 text-white py-3 rounded-xl font-semibold shadow-lg shadow-orange-200"
                    >
                        Login
                    </button>
                    {/* FOOTER */}
                    <p className="text-center text-sm text-gray-600">
                        © {new Date().getFullYear()} Toy Park
                    </p>
                </form>
            </div>
        </div>
    );
}