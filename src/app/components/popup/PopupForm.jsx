"use client";

import React, { useEffect, useState } from "react";
import { X, Mail, MessageSquare, ArrowRight } from "lucide-react";

export default function PopupForm({
    isOpen,
    onClose,
    productName = "",
}) {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        product: productName,
        message: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    // Prevent background scrolling while popup is open

    useEffect(() => {
        if (!isOpen) return;

        const scrollY = window.scrollY;

        const body = document.body;
        const html = document.documentElement;

        // Lock page in place
        body.style.position = "fixed";
        body.style.top = `-${scrollY}px`;
        body.style.left = "0";
        body.style.right = "0";
        body.style.width = "100%";
        body.style.overflow = "hidden";

        html.style.overflow = "hidden";

        return () => {
            // Restore styles
            body.style.position = "";
            body.style.top = "";
            body.style.left = "";
            body.style.right = "";
            body.style.width = "";
            body.style.overflow = "";

            html.style.overflow = "";

            // Restore previous scroll position
            window.scrollTo(0, scrollY);
        };
    }, [isOpen]);



    // Close with ESC
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === "Escape") {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener("keydown", handleEscape);
        }

        return () => {
            document.removeEventListener("keydown", handleEscape);
        };
    }, [isOpen, onClose]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");

        const trimmedFullName = formData.fullName.trim();
        const trimmedEmail = formData.email.trim();
        const trimmedPhone = formData.phone.trim();
        const trimmedProduct = formData.product.trim();
        const trimmedMessage = formData.message.trim();

        if (!trimmedFullName) {
            setErrorMessage("Please enter your full name.");
            return;
        }

        if (!trimmedEmail) {
            setErrorMessage("Please enter your email address.");
            return;
        }

        if (trimmedPhone) {
            const cleanPhone = trimmedPhone.replace(/\D/g, "");

            if (cleanPhone.length !== 10) {
                setErrorMessage("Phone number must be exactly 10 digits.");
                return;
            }
        }

        if (!trimmedMessage) {
            setErrorMessage("Please enter your message.");
            return;
        }

        setIsSubmitting(true);

        try {
            const res = await fetch(
                "https://brandbnalo.com/api/form/add",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        platform: "Playground Popup form",
                        platformEmail: "info@toyparkindia.com",
                        name: trimmedFullName,
                        email: trimmedEmail,
                        company: "NA",
                        phone: trimmedPhone,
                        product: trimmedProduct,
                        place: "N/A",
                        message: trimmedMessage,
                    }),
                }
            );

            const data = await res.json();

            if (data.success) {
                setIsSubmitted(true);

                setFormData({
                    fullName: "",
                    email: "",
                    phone: "",
                    product: productName,
                    message: "",
                });
            } else {
                setErrorMessage(
                    data.message ||
                    "Failed to send your message. Please try again."
                );
            }
        } catch (error) {
            setErrorMessage(
                "Error connecting to server. Please try again."
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-[99999] flex items-center justify-center bg-[#17292B]/70 px-4 py-6 backdrop-blur-sm"
            onMouseDown={(e) => {
                if (e.target === e.currentTarget) {
                    onClose();
                }
            }}
        >
            <div className="relative max-h-[95vh] w-full max-w-2xl overflow-y-auto rounded-[2rem] border-4 border-[#17292B] bg-[#BDECF0] shadow-[10px_10px_0px_0px_#17292B]">

                {/* Close Button */}
                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close popup"
                    className="absolute right-4 top-4 z-20 flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#17292B] bg-white text-[#17292B] shadow-[3px_3px_0px_0px_#17292B] transition hover:-translate-y-0.5 hover:bg-[#17292B] hover:text-white"
                >
                    <X className="h-5 w-5" />
                </button>

                <div className="p-6 sm:p-8 md:p-10">

                    {/* Header */}
                    {!isSubmitted && (
                        <div className="mb-7 pr-10">
                            {/* <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#FF6B6B] px-4 py-2 text-xs font-black uppercase tracking-widest text-white">
                                <Mail className="h-4 w-4" />
                                Get In Touch
                            </div> */}

                            <h2 className="!m-0 !text-3xl !font-black !tracking-tight !text-[#17292B] sm:!text-4xl">
                                Have Questions?
                            </h2>

                            <p className="!mt-3 !text-sm !font-semibold !leading-6 !text-[#31585C]">
                                Send us a message and our ToyPark support team will
                                get back to you.
                            </p>
                        </div>
                    )}

                    {/* Success */}
                    {isSubmitted ? (
                        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-[1.5rem] border-2 border-[#17292B] bg-white p-8 text-center shadow-[5px_5px_0px_0px_#17292B]">
                            <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-[#17292B] bg-[#00C4B5] text-4xl font-black text-white shadow-[4px_4px_0px_0px_#17292B]">
                                ✓
                            </div>

                            <h3 className="!mt-6 !text-3xl !font-black !text-[#17292B]">
                                Thank You!
                            </h3>

                            <p className="!mt-3 !max-w-md !text-base !font-semibold !leading-7 !text-[#4B5563]">
                                Your inquiry has been submitted successfully.
                                Our support team will get back to you soon.
                            </p>

                            <button
                                type="button"
                                onClick={() => setIsSubmitted(false)}
                                className="mt-7 rounded-2xl border-2 border-[#17292B] bg-[#FF6B6B] px-6 py-3 text-xs font-black uppercase tracking-wider text-white shadow-[3px_3px_0px_0px_#17292B] transition hover:-translate-y-0.5"
                            >
                                Send Another Inquiry
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-5">

                            {/* Error */}
                            {errorMessage && (
                                <div className="rounded-2xl border-2 border-[#FF6B6B] bg-red-50 p-3.5 text-xs font-extrabold text-[#FF6B6B] shadow-[2px_2px_0px_0px_#FF6B6B]">
                                    ⚠️ {errorMessage}
                                </div>
                            )}

                            {/* Name + Email */}
                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                <div>
                                    <label className="mb-2 block text-xs font-black uppercase tracking-wider text-[#17292B]">
                                        Full Name *
                                    </label>

                                    <input
                                        type="text"
                                        required
                                        value={formData.fullName}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                fullName: e.target.value,
                                            })
                                        }
                                        placeholder="Your full name"
                                        className="w-full rounded-2xl border-2 border-[#17292B] bg-white px-4 py-3.5 text-sm font-bold text-[#17292B] placeholder:text-gray-400 shadow-[2px_2px_0px_0px_#17292B] outline-none transition focus:ring-2 focus:ring-[#00C4B5]"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-xs font-black uppercase tracking-wider text-[#17292B]">
                                        Email Address *
                                    </label>

                                    <input
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                email: e.target.value,
                                            })
                                        }
                                        placeholder="you@example.com"
                                        className="w-full rounded-2xl border-2 border-[#17292B] bg-white px-4 py-3.5 text-sm font-bold text-[#17292B] placeholder:text-gray-400 shadow-[2px_2px_0px_0px_#17292B] outline-none transition focus:ring-2 focus:ring-[#00C4B5]"
                                    />
                                </div>
                            </div>

                            {/* Phone + Product */}
                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                <div>
                                    <label className="mb-2 block text-xs font-black uppercase tracking-wider text-[#17292B]">
                                        Phone / WhatsApp
                                    </label>

                                    <input
                                        type="tel"
                                        maxLength={10}
                                        value={formData.phone}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                phone: e.target.value
                                                    .replace(/\D/g, "")
                                                    .slice(0, 10),
                                            })
                                        }
                                        placeholder="999999999"
                                        className="w-full rounded-2xl border-2 border-[#17292B] bg-white px-4 py-3.5 text-sm font-bold text-[#17292B] placeholder:text-gray-400 shadow-[2px_2px_0px_0px_#17292B] outline-none transition focus:ring-2 focus:ring-[#00C4B5]"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-xs font-black uppercase tracking-wider text-[#17292B]">
                                        Product
                                    </label>

                                    <input
                                        type="text"
                                        value={formData.product}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                product: e.target.value,
                                            })
                                        }
                                        placeholder="Product name"
                                        className="w-full rounded-2xl border-2 border-[#17292B] bg-white px-4 py-3.5 text-sm font-bold text-[#17292B] placeholder:text-gray-400 shadow-[2px_2px_0px_0px_#17292B] outline-none transition focus:ring-2 focus:ring-[#00C4B5]"
                                    />
                                </div>
                            </div>

                            {/* Message */}
                            <div>
                                <label className="mb-2 block text-xs font-black uppercase tracking-wider text-[#17292B]">
                                    Message *
                                </label>

                                <textarea
                                    required
                                    rows={4}
                                    value={formData.message}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            message: e.target.value,
                                        })
                                    }
                                    placeholder="How can we help you?"
                                    className="w-full resize-none rounded-2xl border-2 border-[#17292B] bg-white px-4 py-3.5 text-sm font-bold text-[#17292B] placeholder:text-gray-400 shadow-[2px_2px_0px_0px_#17292B] outline-none transition focus:ring-2 focus:ring-[#00C4B5]"
                                />
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-[#17292B] bg-[#FF6B6B] py-4 text-base font-black uppercase tracking-wider text-white shadow-[4px_4px_0px_0px_#17292B] transition-all hover:-translate-y-0.5 hover:bg-[#ff5252] disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <span>
                                    {isSubmitting
                                        ? "Sending..."
                                        : "Send Inquiry Now"}
                                </span>

                                {!isSubmitting && (
                                    <ArrowRight className="h-5 w-5 stroke-[3]" />
                                )}
                            </button>

                            <p className="text-center text-[11px] font-semibold text-[#527477]">
                                We respect your privacy and will only use your
                                information to respond to your inquiry.
                            </p>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}