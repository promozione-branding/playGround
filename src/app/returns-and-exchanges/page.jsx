import React from "react";
import dynamic from "next/dynamic";
import PlayfulHeader from "../components/Navbar";
import Link from "next/link";

const Footer2 = dynamic(() => import("../components/Footer2"));

export default function Page() {
    const steps = [
        {
            number: "01",
            title: "Request a Return",
            text: "Contact our support team or use the return option available with your order.",
        },
        {
            number: "02",
            title: "Pack Your Item",
            text: "Securely pack the product with its original packaging, tags, and accessories.",
        },
        {
            number: "03",
            title: "Send It Back",
            text: "Follow the return instructions provided by our team and ship the package.",
        },
        {
            number: "04",
            title: "Receive Your Refund or Exchange",
            text: "Once the item passes inspection, we'll process your refund or arrange your exchange.",
        },
    ];

    const faqs = [
        {
            q: "How do I start a return?",
            a: "Contact our support team with your order details and we'll guide you through the return process.",
        },
        {
            q: "Can I exchange an item for another size?",
            a: "Yes, eligible items can be exchanged for another available size or variant.",
        },
        {
            q: "When will I receive my refund?",
            a: "Refunds are processed after your returned item has been received and inspected.",
        },
        {
            q: "What if I received a damaged or incorrect item?",
            a: "Please contact our support team as soon as possible with your order details so we can help resolve the issue.",
        },
    ];

    return (
        <div className="bg-white">
            <PlayfulHeader />

            <main className="min-h-screen">
                <section className="bg-[#BDECF0] px-6 py-20 sm:px-8 md:px-12 md:py-28 lg:px-20 lg:py-32">
                    <div className="mx-auto max-w-7xl">
                        <div className="max-w-4xl">
                            <p className="!mb-5 !text-sm !font-semibold !uppercase !tracking-[0.3em] !text-[#31585C]">
                                Customer Care
                            </p>

                            <h1 className="!m-0 !text-5xl !font-semibold !leading-[0.95] !tracking-[-0.04em] !text-[#17292B] sm:!text-6xl md:!text-7xl lg:!text-8xl">
                                Returns
                                <br />
                                & Exchanges
                            </h1>

                            <p className="!mt-7 !max-w-2xl !text-base !leading-7 !text-[#31585C] sm:!text-lg md:!text-xl md:!leading-8">
                                We want you to love every purchase. If something isn't quite
                                right, we're here to make the return or exchange process
                                simple and hassle-free.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="bg-white px-6 py-16 sm:px-8 md:px-12 md:py-24 lg:px-20">
                    <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[280px_1fr] lg:gap-20">
                        {/* SIDEBAR */}
                        <aside className="lg:self-start">
                            <div className="lg:sticky lg:top-8">
                                {/* Quick Guide */}
                                <div className="rounded-[28px] bg-[#BDECF0] p-7">
                                    <p className="!m-0 !text-xs !font-bold !uppercase !tracking-[0.2em] !text-[#31585C]">
                                        Quick Guide
                                    </p>

                                    <nav className="mt-5">
                                        <Link
                                            href="#return-policy"
                                            className="block !border-b !border-[#91CDD1] !py-4 !text-sm !font-semibold !text-[#17292B] no-underline transition-opacity hover:opacity-60"
                                        >
                                            Return Policy
                                        </Link>

                                        <Link
                                            href="#exchange"
                                            className="block !border-b !border-[#91CDD1] !py-4 !text-sm !font-semibold !text-[#17292B] no-underline transition-opacity hover:opacity-60"
                                        >
                                            Exchanges
                                        </Link>

                                        <Link
                                            href="#process"
                                            className="block !border-b !border-[#91CDD1] !py-4 !text-sm !font-semibold !text-[#17292B] no-underline transition-opacity hover:opacity-60"
                                        >
                                            How It Works
                                        </Link>

                                        <Link
                                            href="#conditions"
                                            className="block !py-4 !text-sm !font-semibold !text-[#17292B] no-underline transition-opacity hover:opacity-60"
                                        >
                                            Conditions
                                        </Link>
                                    </nav>
                                </div>

                                {/* Help */}
                                <div className="mt-5 rounded-[28px] border border-[#D9E8E9] bg-white p-7">
                                    <p className="!m-0 !text-xs !font-bold !uppercase !tracking-[0.2em] !text-[#6B7778]">
                                        Need Help?
                                    </p>

                                    <p className="!mt-3 !text-sm !leading-6 !text-[#4B5563] mb-4">
                                        Have a question about your return or exchange? Our support
                                        team is happy to help.
                                    </p>

                                    <Link href={"/contact"}
                                        className="mt-5! rounded-full !bg-[#17292B] !px-6 !py-3 !text-sm !font-medium !text-white transition hover:!bg-[#31585C]"
                                    >
                                        Contact Us
                                    </Link>
                                </div>
                            </div>
                        </aside>

                        {/* MAIN */}
                        <div className="space-y-20">
                            {/* =================================================
                  RETURN POLICY
              ================================================== */}
                            <section id="return-policy" className="scroll-mt-10">
                                <div className="flex gap-5">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#BDECF0]">
                                        <span className="!text-sm !font-bold !text-[#17292B]">
                                            01
                                        </span>
                                    </div>

                                    <div>
                                        <h2 className="!m-0 !text-3xl !font-semibold !tracking-tight !text-[#17292B] md:!text-4xl">
                                            Return Policy
                                        </h2>

                                        <p className="!mt-4 !text-base !leading-7 !text-[#4B5563]">
                                            If you're not completely satisfied with your purchase,
                                            you can request a return within the eligible return
                                            period from the date your order was delivered.
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                                    <div className="rounded-[24px] bg-[#F5FBFC] p-7">
                                        <h3 className="!m-0 !text-lg !font-semibold !text-[#17292B]">
                                            Return Window
                                        </h3>

                                        <p className="!mt-3 !text-sm !leading-6 !text-[#4B5563]">
                                            Items should be returned within the return period
                                            stated in your order or product information.
                                        </p>
                                    </div>

                                    <div className="rounded-[24px] bg-[#F5FBFC] p-7">
                                        <h3 className="!m-0 !text-lg !font-semibold !text-[#17292B]">
                                            Refund
                                        </h3>

                                        <p className="!mt-3 !text-sm !leading-6 !text-[#4B5563]">
                                            Once your return is received and approved, your refund
                                            will be processed to the original payment method.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            {/* =================================================
                  EXCHANGE
              ================================================== */}
                            <section
                                id="exchange"
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
                                            Exchanges
                                        </h2>

                                        <p className="!mt-4 !text-base !leading-7 !text-[#4B5563]">
                                            Need a different size, color, or variant? If the item is
                                            eligible, you can request an exchange instead of a
                                            refund.
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-8 rounded-[28px] bg-[#BDECF0] p-7 md:p-9">
                                    <h3 className="!m-0 !text-xl !font-semibold !text-[#17292B]">
                                        A few things to keep in mind
                                    </h3>

                                    <ul className="mt-6 space-y-4">
                                        <li className="flex gap-3 !text-sm !leading-6 !text-[#31585C]">
                                            <span className="!font-bold !text-[#17292B]">✓</span>
                                            <span>
                                                The replacement item must be available in stock.
                                            </span>
                                        </li>

                                        <li className="flex gap-3 !text-sm !leading-6 !text-[#31585C]">
                                            <span className="!font-bold !text-[#17292B]">✓</span>
                                            <span>
                                                Items should be unused and returned in their original
                                                condition.
                                            </span>
                                        </li>

                                        <li className="flex gap-3 !text-sm !leading-6 !text-[#31585C]">
                                            <span className="!font-bold !text-[#17292B]">✓</span>
                                            <span>
                                                Original tags, packaging, and accessories should be
                                                included where applicable.
                                            </span>
                                        </li>

                                        <li className="flex gap-3 !text-sm !leading-6 !text-[#31585C]">
                                            <span className="!font-bold !text-[#17292B]">✓</span>
                                            <span>
                                                Some products may not be eligible for exchange due to
                                                their nature.
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                            </section>

                            {/* =================================================
                  HOW IT WORKS
              ================================================== */}
                            <section
                                id="process"
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
                                            How It Works
                                        </h2>

                                        <p className="!mt-4 !text-base !leading-7 !text-[#4B5563]">
                                            We've kept the process straightforward. Follow these
                                            simple steps to initiate your return or exchange.
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-8 space-y-3">
                                    {steps.map((step) => (
                                        <div
                                            key={step.number}
                                            className="group flex gap-5 rounded-[22px] border border-[#E5E7EB] bg-white p-6 transition-all duration-300 hover:border-[#BDECF0] hover:bg-[#F8FCFC]"
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

                            {/* =================================================
                  CONDITIONS
              ================================================== */}
                            <section
                                id="conditions"
                                className="scroll-mt-10 border-t border-[#E5E7EB] pt-20"
                            >
                                <div className="flex gap-5">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#BDECF0]">
                                        <span className="!text-sm !font-bold !text-[#17292B]">
                                            04
                                        </span>
                                    </div>

                                    <div>
                                        <h2 className="!m-0 !text-3xl !font-semibold !tracking-tight !text-[#17292B] md:!text-4xl">
                                            Return Conditions
                                        </h2>

                                        <p className="!mt-4 !text-base !leading-7 !text-[#4B5563]">
                                            To make sure your return can be accepted, please ensure
                                            the following conditions are met.
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                                    {[
                                        {
                                            title: "Items must be unused",
                                            text: "Products should be in their original, unused condition.",
                                        },
                                        {
                                            title: "Original packaging",
                                            text: "Please include original packaging and product accessories where applicable.",
                                        },
                                        {
                                            title: "Tags attached",
                                            text: "Products should retain their original tags and labels.",
                                        },
                                        {
                                            title: "Proof of purchase",
                                            text: "Please keep your order details or proof of purchase available.",
                                        },
                                    ].map((item) => (
                                        <div
                                            key={item.title}
                                            className="rounded-[24px] border border-[#E5E7EB] p-7"
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

                            {/* =================================================
                  FAQ
              ================================================== */}
                            <section className="border-t border-[#E5E7EB] pt-20">
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

                <section className="bg-[#BDECF0] px-6 py-16 sm:px-8 md:px-12 md:py-20 lg:px-20">
                    <div className="mx-auto max-w-7xl">
                        <div className="rounded-[32px] bg-[#17292B] px-7 py-14 text-center sm:px-12 md:py-20">
                            <p className="!m-0 !text-xs !font-semibold !uppercase !tracking-[0.25em] !text-[#BDECF0]">
                                We're here to help
                            </p>

                            <h2 className="!mt-4 !text-3xl !font-semibold !tracking-tight !text-white sm:!text-4xl md:!text-5xl">
                                Something not quite right?
                            </h2>

                            <p className="mx-auto !mt-5 !max-w-xl !text-sm !leading-6 !text-gray-300 md:!text-base mb-8">
                                Reach out to our customer care team and we'll do our best to
                                make things right.
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