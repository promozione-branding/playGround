
import React from "react";
import dynamic from "next/dynamic";
import PlayfulHeader from "../components/Navbar";
import Link from "next/link";

const Footer2 = dynamic(() => import("../components/Footer2"));

export default function Page() {
    const refundSteps = [
        {
            number: "01",
            title: "Submit Your Request",
            text: "Contact our customer support team with your order number and the reason for your refund request.",
        },
        {
            number: "02",
            title: "Return the Product",
            text: "If a product return is required, carefully pack the item and follow the return instructions provided by our team.",
        },
        {
            number: "03",
            title: "Quality Check",
            text: "Once we receive your item, our team will inspect it to make sure it meets the applicable return conditions.",
        },
        {
            number: "04",
            title: "Refund Processed",
            text: "After your return is approved, the refund will be initiated to your original payment method.",
        },
    ];

    const refundConditions = [
        {
            title: "Original Condition",
            text: "Products should be returned unused, unworn, and in their original condition.",
        },
        {
            title: "Original Packaging",
            text: "Please include the original packaging, tags, labels, and accessories where applicable.",
        },
        {
            title: "Order Details",
            text: "Keep your order number or proof of purchase available when requesting a refund.",
        },
        {
            title: "Eligible Items",
            text: "Certain products may not be eligible for refunds due to their nature or specific product conditions.",
        },
    ];

    const faqs = [
        {
            q: "How long does it take to receive my refund?",
            a: "Once your returned item has been received and approved, your refund will be initiated to the original payment method. The time it takes for the amount to appear in your account may vary depending on your payment provider.",
        },
        {
            q: "Where will my refund be credited?",
            a: "Refunds are generally credited to the original payment method used when placing the order.",
        },
        {
            q: "Can I request a refund without returning the product?",
            a: "This depends on the circumstances of your order. Please contact our customer support team and they will guide you through the available options.",
        },
        {
            q: "What if I received a damaged product?",
            a: "Please contact our support team as soon as possible with your order details and information about the issue so we can help resolve it.",
        },
    ];

    return (
        <div className="bg-white">
            <PlayfulHeader />

            <main className="min-h-screen">
                {/* =====================================================
            HERO
        ====================================================== */}
                <section className="bg-[#BDECF0] px-6 py-20 sm:px-8 md:px-12 md:py-28 lg:px-20 lg:py-32">
                    <div className="mx-auto max-w-7xl">
                        <div className="max-w-4xl">
                            <p className="!m-0 !mb-5 !text-sm !font-semibold !uppercase !tracking-[0.3em] !text-[#31585C]">
                                Customer Care
                            </p>

                            <h1 className="!m-0 !text-5xl !font-semibold !leading-[0.95] !tracking-[-0.04em] !text-[#17292B] sm:!text-6xl md:!text-7xl lg:!text-8xl">
                                Refund
                                <br />
                                & Returns
                            </h1>

                            <p className="!mt-7 !max-w-2xl !text-base !leading-7 !text-[#31585C] sm:!text-lg md:!text-xl md:!leading-8">
                                Your satisfaction matters to us. Learn about our refund and
                                return process, eligibility requirements, and what to expect
                                after submitting a request.
                            </p>
                        </div>
                    </div>
                </section>

                {/* =====================================================
            INTRO
        ====================================================== */}
                <section className="bg-white px-6 py-16 sm:px-8 md:px-12 md:py-24 lg:px-20">
                    <div className="mx-auto max-w-7xl">
                        <div className="grid gap-8 md:grid-cols-3">
                            <div className="rounded-[28px] bg-[#F5FBFC] p-7 md:p-8">
                                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#BDECF0]">
                                    <span className="!font-bold !text-[#17292B]">01</span>
                                </div>

                                <h3 className="!m-0 !text-xl !font-semibold !text-[#17292B]">
                                    Easy Requests
                                </h3>

                                <p className="!mt-3 !text-sm !leading-6 !text-[#4B5563]">
                                    Start your refund request by getting in touch with our
                                    customer care team.
                                </p>
                            </div>

                            <div className="rounded-[28px] bg-[#BDECF0] p-7 md:p-8">
                                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-white">
                                    <span className="!font-bold !text-[#17292B]">02</span>
                                </div>

                                <h3 className="!m-0 !text-xl !font-semibold !text-[#17292B]">
                                    Simple Returns
                                </h3>

                                <p className="!mt-3 !text-sm !leading-6 !text-[#31585C]">
                                    Follow our return instructions and send your eligible item
                                    back safely.
                                </p>
                            </div>

                            <div className="rounded-[28px] bg-[#F5FBFC] p-7 md:p-8">
                                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#BDECF0]">
                                    <span className="!font-bold !text-[#17292B]">03</span>
                                </div>

                                <h3 className="!m-0 !text-xl !font-semibold !text-[#17292B]">
                                    Secure Refunds
                                </h3>

                                <p className="!mt-3 !text-sm !leading-6 !text-[#4B5563]">
                                    Once approved, your refund will be initiated to the original
                                    payment method.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* =====================================================
            REFUND POLICY
        ====================================================== */}
                <section className="bg-[#FAFEFE] px-6 py-16 sm:px-8 md:px-12 md:py-24 lg:px-20">
                    <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[280px_1fr] lg:gap-20">
                        {/* SIDEBAR */}
                        <aside>
                            <div className="lg:sticky lg:top-8">
                                <div className="rounded-[28px] bg-[#BDECF0] p-7">
                                    <p className="!m-0 !text-xs !font-bold !uppercase !tracking-[0.2em] !text-[#31585C]">
                                        On This Page
                                    </p>

                                    <nav className="mt-5">
                                        <Link
                                            href="#refund-policy"
                                            className="block !border-b !border-[#91CDD1] !py-4 !text-sm !font-semibold !text-[#17292B] no-underline transition-opacity hover:opacity-60"
                                        >
                                            Refund Policy
                                        </Link>

                                        <Link
                                            href="#refund-process"
                                            className="block !border-b !border-[#91CDD1] !py-4 !text-sm !font-semibold !text-[#17292B] no-underline transition-opacity hover:opacity-60"
                                        >
                                            Refund Process
                                        </Link>

                                        <Link
                                            href="#conditions"
                                            className="block !border-b !border-[#91CDD1] !py-4 !text-sm !font-semibold !text-[#17292B] no-underline transition-opacity hover:opacity-60"
                                        >
                                            Conditions
                                        </Link>

                                        <Link
                                            href="#faq"
                                            className="block !py-4 !text-sm !font-semibold !text-[#17292B] no-underline transition-opacity hover:opacity-60"
                                        >
                                            FAQ
                                        </Link>
                                    </nav>
                                </div>

                                <div className="mt-5 rounded-[28px] border border-[#D9E8E9] bg-white p-7">
                                    <p className="!m-0 !text-xs !font-bold !uppercase !tracking-[0.2em] !text-[#6B7778]">
                                        Need Help?
                                    </p>

                                    <p className="!mt-3 !text-sm !leading-6 !text-[#4B5563] mb-5">
                                        Our customer care team is here to help with your refund or
                                        return.
                                    </p>

                                    <Link href={"/contact"}
                                        className="!mt-5 rounded-full !bg-[#17292B] !px-6 !py-3 !text-sm !font-medium !text-white transition hover:!bg-[#31585C]"
                                    >
                                        Contact Us
                                    </Link>
                                </div>
                            </div>
                        </aside>

                        {/* CONTENT */}
                        <div className="space-y-20">
                            {/* REFUND POLICY */}
                            <section id="refund-policy" className="scroll-mt-10">
                                <div className="flex gap-5">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#BDECF0]">
                                        <span className="!text-sm !font-bold !text-[#17292B]">
                                            01
                                        </span>
                                    </div>

                                    <div>
                                        <h2 className="!m-0 !text-3xl !font-semibold !tracking-tight !text-[#17292B] md:!text-4xl">
                                            Refund Policy
                                        </h2>

                                        <p className="!mt-4 !text-base !leading-7 !text-[#4B5563]">
                                            We aim to make the refund process as straightforward as
                                            possible. Eligible customers may request a refund for
                                            qualifying purchases within the applicable return
                                            period.
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-8 rounded-[28px] bg-[#BDECF0] p-7 md:p-9">
                                    <h3 className="!m-0 !text-xl !font-semibold !text-[#17292B]">
                                        Important Information
                                    </h3>

                                    <div className="mt-6 space-y-4">
                                        <div className="flex gap-3">
                                            <span className="!font-bold !text-[#17292B]">✓</span>

                                            <p className="!m-0 !text-sm !leading-6 !text-[#31585C]">
                                                Refund requests must be made within the applicable
                                                return period.
                                            </p>
                                        </div>

                                        <div className="flex gap-3">
                                            <span className="!font-bold !text-[#17292B]">✓</span>

                                            <p className="!m-0 !text-sm !leading-6 !text-[#31585C]">
                                                Returned products may need to pass an inspection
                                                before a refund is approved.
                                            </p>
                                        </div>

                                        <div className="flex gap-3">
                                            <span className="!font-bold !text-[#17292B]">✓</span>

                                            <p className="!m-0 !text-sm !leading-6 !text-[#31585C]">
                                                Approved refunds are generally sent to the original
                                                payment method.
                                            </p>
                                        </div>

                                        <div className="flex gap-3">
                                            <span className="!font-bold !text-[#17292B]">✓</span>

                                            <p className="!m-0 !text-sm !leading-6 !text-[#31585C]">
                                                Processing times may vary depending on your payment
                                                provider.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* REFUND PROCESS */}
                            <section
                                id="refund-process"
                                className="scroll-mt-10 border-t border-[#E5E7EB] pt-20"
                            >
                                <div className="flex gap-5">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#BDECF0]">
                                        <span className="!text-sm !font-bold !text-[#17292B]">
                                            02
                                        </span>
                                    </div>

                                    <div>
                                        <h2 className="!m-0 !text-3xl !font-semibold !tracking-tight !text-[#17292B] md:!text-4xl">
                                            Refund Process
                                        </h2>

                                        <p className="!mt-4 !text-base !leading-7 !text-[#4B5563]">
                                            From submitting your request to receiving your refund,
                                            here's what you can expect.
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-8 space-y-3">
                                    {refundSteps.map((step) => (
                                        <div
                                            key={step.number}
                                            className="flex gap-5 rounded-[22px] border border-[#E5E7EB] bg-white p-6 transition-all duration-300 hover:border-[#BDECF0] hover:bg-[#F8FCFC]"
                                        >
                                            <span className="!text-sm !font-bold !text-[#6B999D]">
                                                {step.number}
                                            </span>

                                            <div>
                                                <h3 className="!m-0 !text-base !font-semibold !text-[#17292B]">
                                                    {step.title}
                                                </h3>

                                                <p className="!mt-2 !text-sm !leading-6 !text-[#4B5563]">
                                                    {step.text}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* CONDITIONS */}
                            <section
                                id="conditions"
                                className="scroll-mt-10 border-t border-[#E5E7EB] pt-20"
                            >
                                <div className="flex gap-5">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#BDECF0]">
                                        <span className="!text-sm !font-bold !text-[#17292B]">
                                            03
                                        </span>
                                    </div>

                                    <div>
                                        <h2 className="!m-0 !text-3xl !font-semibold !tracking-tight !text-[#17292B] md:!text-4xl">
                                            Refund Conditions
                                        </h2>

                                        <p className="!mt-4 !text-base !leading-7 !text-[#4B5563]">
                                            Please make sure your product meets the applicable
                                            requirements before sending it back.
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                                    {refundConditions.map((item) => (
                                        <div
                                            key={item.title}
                                            className="rounded-[24px] border border-[#E5E7EB] bg-white p-7"
                                        >
                                            <h3 className="!m-0 !text-base !font-semibold !text-[#17292B]">
                                                {item.title}
                                            </h3>

                                            <p className="!mt-3 !text-sm !leading-6 !text-[#4B5563]">
                                                {item.text}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* FAQ */}
                            <section
                                id="faq"
                                className="scroll-mt-10 border-t border-[#E5E7EB] pt-20"
                            >
                                <h2 className="!m-0 !text-3xl !font-semibold !tracking-tight !text-[#17292B] md:!text-4xl">
                                    Frequently Asked Questions
                                </h2>

                                <div className="mt-8 divide-y divide-[#E5E7EB]">
                                    {faqs.map((faq) => (
                                        <details key={faq.q} className="group py-6">
                                            <summary className="flex cursor-pointer list-none items-center justify-between !text-base !font-semibold !text-[#17292B]">
                                                <span>{faq.q}</span>

                                                <span className="ml-5 !text-2xl !font-light !text-[#17292B] transition-transform duration-300 group-open:rotate-45">
                                                    +
                                                </span>
                                            </summary>

                                            <p className="!mt-4 !max-w-2xl !text-sm !leading-6 !text-[#4B5563]">
                                                {faq.a}
                                            </p>
                                        </details>
                                    ))}
                                </div>
                            </section>
                        </div>
                    </div>
                </section>

                {/* =====================================================
            BOTTOM CTA
        ====================================================== */}
                <section className="bg-[#BDECF0] px-6 py-16 sm:px-8 md:px-12 md:py-20 lg:px-20">
                    <div className="mx-auto max-w-7xl">
                        <div className="rounded-[32px] bg-[#17292B] px-7 py-14 text-center sm:px-12 md:py-20">
                            <p className="!m-0 !text-xs !font-semibold !uppercase !tracking-[0.25em] !text-[#BDECF0]">
                                We're here to help
                            </p>

                            <h2 className="!mt-4 !text-3xl !font-semibold !tracking-tight !text-white sm:!text-4xl md:!text-5xl">
                                Need help with a refund?
                            </h2>

                            <p className="mx-auto !mt-5 !max-w-xl !text-sm !leading-6 !text-gray-300 md:!text-base mb-8">
                                Our customer care team is ready to help you with your return,
                                refund, or any questions about your order.
                            </p>

                            <Link href={"/contact"}
                                className="!mt-8 rounded-full !bg-[#BDECF0] !px-8 !py-3.5 !text-sm !font-semibold !text-[#17292B] transition hover:!bg-white"
                            >
                                Contact Support
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

            <Footer2 />
        </div>
    );
}