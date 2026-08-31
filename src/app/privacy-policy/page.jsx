import React from "react";
import dynamic from "next/dynamic";
import PlayfulHeader from "../components/Navbar";
import Link from "next/link";

const Footer2 = dynamic(() => import("../components/Footer2"));

export default function Page() {
    const sections = [
        {
            id: "information",
            number: "01",
            title: "Information We Collect",
        },
        {
            id: "usage",
            number: "02",
            title: "How We Use Your Information",
        },
        {
            id: "sharing",
            number: "03",
            title: "Information Sharing",
        },
        {
            id: "security",
            number: "04",
            title: "Data Security",
        },
        {
            id: "cookies",
            number: "05",
            title: "Cookies",
        },
        {
            id: "rights",
            number: "06",
            title: "Your Rights",
        },
        {
            id: "contact",
            number: "07",
            title: "Contact Us",
        },
    ];

    return (
        <div className="bg-white">
            <PlayfulHeader />

            <main className="min-h-screen">
                {/* HERO */}
                <section className="bg-[#BDECF0] px-6 py-20 sm:px-8 md:px-12 md:py-28 lg:px-20 lg:py-32">
                    <div className="mx-auto max-w-7xl">
                        <div className="max-w-4xl">
                            <p className="!m-0 !mb-5 !text-sm !font-semibold !uppercase !tracking-[0.3em] !text-[#31585C]">
                                Legal
                            </p>

                            <h1 className="!m-0 !text-5xl !font-semibold !leading-[0.95] !tracking-[-0.04em] !text-[#17292B] sm:!text-6xl md:!text-7xl lg:!text-8xl">
                                Privacy
                                <br />
                                Policy
                            </h1>

                            <p className="!mt-7 !max-w-2xl !text-base !leading-7 !text-[#31585C] sm:!text-lg md:!text-xl md:!leading-8">
                                Your privacy matters to us. This policy explains
                                what information we collect, how we use it, and
                                how we protect your personal information.
                            </p>

                            <p className="!mt-5 !text-sm !text-[#527477]">
                                Last updated: August 31, 2026
                            </p>
                        </div>
                    </div>
                </section>

                {/* CONTENT */}
                <section className="bg-white px-6 py-16 sm:px-8 md:px-12 md:py-24 lg:px-20">
                    <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[280px_1fr] lg:gap-20">
                        {/* SIDEBAR */}
                        <aside className="lg:self-start">
                            <div>
                                <div className="rounded-[28px] bg-[#BDECF0] p-7">
                                    <p className="!m-0 !text-xs !font-bold !uppercase !tracking-[0.2em] !text-[#31585C]">
                                        On This Page
                                    </p>

                                    <nav className="mt-5">
                                        {sections.map((section) => (
                                            <Link
                                                key={section.id}
                                                href={`#${section.id}`}
                                                className="block !border-b !border-[#91CDD1] !py-4 !text-sm !font-semibold !text-[#17292B] no-underline transition-opacity last:!border-0 hover:opacity-60"
                                            >
                                                {section.title}
                                            </Link>
                                        ))}
                                    </nav>
                                </div>

                                <div className="mt-5 rounded-[28px] border border-[#D9E8E9] bg-white p-7">
                                    <p className="!m-0 !text-xs !font-bold !uppercase !tracking-[0.2em] !text-[#6B7778]">
                                        Need Help?
                                    </p>

                                    <p className="!mt-3 !mb-4 !text-sm !leading-6 !text-[#4B5563]">
                                        If you have questions about your privacy
                                        or personal information, our team is
                                        here to help.
                                    </p>

                                    <Link
                                        href="/contact"
                                        className="inline-block rounded-full !bg-[#17292B] !px-6 !py-3 !text-sm !font-medium !text-white no-underline transition hover:!bg-[#31585C]"
                                    >
                                        Contact Us
                                    </Link>
                                </div>
                            </div>
                        </aside>

                        {/* MAIN CONTENT */}
                        <div className="space-y-20">
                            {/* INTRO */}
                            <section>
                                <p className="!m-0 !text-base !leading-8 !text-[#4B5563]">
                                    We respect your privacy and are committed to
                                    protecting the personal information you
                                    share with us. This Privacy Policy describes
                                    how we collect, use, store, and protect your
                                    information when you visit our website,
                                    purchase our products, or interact with our
                                    services.
                                </p>
                            </section>

                            {/* 01 */}
                            <section
                                id="information"
                                className="scroll-mt-10 border-t border-[#E5E7EB] pt-20"
                            >
                                <div className="flex gap-5">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#BDECF0]">
                                        <span className="!text-sm !font-bold !text-[#17292B]">
                                            01
                                        </span>
                                    </div>

                                    <div>
                                        <h2 className="!m-0 !text-3xl !font-semibold !tracking-tight !text-[#17292B] md:!text-4xl">
                                            Information We Collect
                                        </h2>

                                        <p className="!mt-4 !text-base !leading-7 !text-[#4B5563]">
                                            We may collect information that you
                                            provide directly to us when you
                                            create an account, place an order,
                                            contact us, or otherwise interact
                                            with our website.
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                                    {[
                                        {
                                            title: "Personal Details",
                                            text: "Such as your name, email address, phone number, and other contact details.",
                                        },
                                        {
                                            title: "Order Information",
                                            text: "Details about products you purchase, order history, delivery information, and related transactions.",
                                        },
                                        {
                                            title: "Account Information",
                                            text: "Information associated with your customer account, preferences, and settings.",
                                        },
                                        {
                                            title: "Communication",
                                            text: "Information you provide when contacting our support team or communicating with us.",
                                        },
                                    ].map((item) => (
                                        <div
                                            key={item.title}
                                            className="rounded-[24px] bg-[#F5FBFC] p-7"
                                        >
                                            <h3 className="!m-0 !text-lg !font-semibold !text-[#17292B]">
                                                {item.title}
                                            </h3>

                                            <p className="!mt-3 !text-sm !leading-6 !text-[#4B5563]">
                                                {item.text}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* 02 */}
                            <section
                                id="usage"
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
                                            How We Use Your Information
                                        </h2>

                                        <p className="!mt-4 !text-base !leading-7 !text-[#4B5563]">
                                            We use the information we collect to
                                            operate our business, provide our
                                            services, and improve your shopping
                                            experience.
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-8 rounded-[28px] bg-[#BDECF0] p-7 md:p-9">
                                    <div className="space-y-5">
                                        {[
                                            "Process and fulfill your orders.",
                                            "Provide customer support and respond to inquiries.",
                                            "Send important information about your orders or account.",
                                            "Improve our website, products, and services.",
                                            "Prevent fraud, abuse, and unauthorized activity.",
                                            "Comply with applicable legal and regulatory requirements.",
                                        ].map((item) => (
                                            <div
                                                key={item}
                                                className="flex gap-3"
                                            >
                                                <span className="!font-bold !text-[#17292B]">
                                                    ✓
                                                </span>

                                                <p className="!m-0 !text-sm !leading-6 !text-[#31585C]">
                                                    {item}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </section>

                            {/* 03 */}
                            <section
                                id="sharing"
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
                                            Information Sharing
                                        </h2>

                                        <p className="!mt-4 !text-base !leading-7 !text-[#4B5563]">
                                            We do not sell your personal
                                            information. We may share
                                            information with trusted service
                                            providers when necessary to operate
                                            our business and provide our
                                            services.
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-8 space-y-4">
                                    {[
                                        [
                                            "Payment Providers",
                                            "To securely process payments and transactions.",
                                        ],
                                        [
                                            "Delivery Partners",
                                            "To fulfill and deliver your orders.",
                                        ],
                                        [
                                            "Service Providers",
                                            "To help us operate our website, customer service, analytics, and other business functions.",
                                        ],
                                        [
                                            "Legal Requirements",
                                            "When disclosure is required by applicable law or necessary to protect our rights.",
                                        ],
                                    ].map(([title, text]) => (
                                        <div
                                            key={title}
                                            className="rounded-[22px] border border-[#E5E7EB] p-6"
                                        >
                                            <h3 className="!m-0 !text-base !font-semibold !text-[#17292B]">
                                                {title}
                                            </h3>

                                            <p className="!mt-2 !text-sm !leading-6 !text-[#4B5563]">
                                                {text}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* 04 */}
                            <section
                                id="security"
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
                                            Data Security
                                        </h2>

                                        <p className="!mt-4 !text-base !leading-7 !text-[#4B5563]">
                                            We take reasonable measures to help
                                            protect your personal information
                                            from unauthorized access, use,
                                            alteration, or disclosure.
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-8 rounded-[28px] border border-[#E5E7EB] p-7 md:p-9">
                                    <h3 className="!m-0 !text-xl !font-semibold !text-[#17292B]">
                                        Protecting your information
                                    </h3>

                                    <p className="!mt-4 !text-sm !leading-7 !text-[#4B5563]">
                                        While we work to protect your personal
                                        information using appropriate security
                                        practices, no method of transmission or
                                        electronic storage can be guaranteed to
                                        be completely secure.
                                    </p>
                                </div>
                            </section>

                            {/* 05 */}
                            <section
                                id="cookies"
                                className="scroll-mt-10 border-t border-[#E5E7EB] pt-20"
                            >
                                <div className="flex gap-5">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#BDECF0]">
                                        <span className="!text-sm !font-bold !text-[#17292B]">
                                            05
                                        </span>
                                    </div>

                                    <div>
                                        <h2 className="!m-0 !text-3xl !font-semibold !tracking-tight !text-[#17292B] md:!text-4xl">
                                            Cookies
                                        </h2>

                                        <p className="!mt-4 !text-base !leading-7 !text-[#4B5563]">
                                            Our website may use cookies and
                                            similar technologies to remember
                                            your preferences, understand how
                                            visitors use our website, and
                                            improve your experience.
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                                    <div className="rounded-[24px] bg-[#F5FBFC] p-7">
                                        <h3 className="!m-0 !text-lg !font-semibold !text-[#17292B]">
                                            Essential Cookies
                                        </h3>

                                        <p className="!mt-3 !text-sm !leading-6 !text-[#4B5563]">
                                            These may be necessary for core
                                            website functionality and services.
                                        </p>
                                    </div>

                                    <div className="rounded-[24px] bg-[#F5FBFC] p-7">
                                        <h3 className="!m-0 !text-lg !font-semibold !text-[#17292B]">
                                            Analytics
                                        </h3>

                                        <p className="!mt-3 !text-sm !leading-6 !text-[#4B5563]">
                                            These technologies may help us
                                            understand website usage and
                                            improve our services.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            {/* 06 */}
                            <section
                                id="rights"
                                className="scroll-mt-10 border-t border-[#E5E7EB] pt-20"
                            >
                                <div className="flex gap-5">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#BDECF0]">
                                        <span className="!text-sm !font-bold !text-[#17292B]">
                                            06
                                        </span>
                                    </div>

                                    <div>
                                        <h2 className="!m-0 !text-3xl !font-semibold !tracking-tight !text-[#17292B] md:!text-4xl">
                                            Your Rights
                                        </h2>

                                        <p className="!mt-4 !text-base !leading-7 !text-[#4B5563]">
                                            Depending on applicable law, you may
                                            have certain rights regarding your
                                            personal information.
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-8 rounded-[28px] bg-[#BDECF0] p-7 md:p-9">
                                    <ul className="space-y-4">
                                        {[
                                            "Request access to personal information we hold about you.",
                                            "Ask us to correct inaccurate or incomplete information.",
                                            "Request deletion of certain personal information.",
                                            "Withdraw consent where processing is based on consent.",
                                            "Object to or restrict certain types of processing where applicable.",
                                        ].map((item) => (
                                            <li
                                                key={item}
                                                className="flex gap-3 !text-sm !leading-6 !text-[#31585C]"
                                            >
                                                <span className="!font-bold !text-[#17292B]">
                                                    ✓
                                                </span>
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </section>

                            {/* 07 */}
                            <section
                                id="contact"
                                className="scroll-mt-10 border-t border-[#E5E7EB] pt-20"
                            >
                                <div className="flex gap-5">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#BDECF0]">
                                        <span className="!text-sm !font-bold !text-[#17292B]">
                                            07
                                        </span>
                                    </div>

                                    <div>
                                        <h2 className="!m-0 !text-3xl !font-semibold !tracking-tight !text-[#17292B] md:!text-4xl">
                                            Contact Us
                                        </h2>

                                        <p className="!mt-4 !text-base !leading-7 !text-[#4B5563]">
                                            If you have questions about this
                                            Privacy Policy or how we handle
                                            your personal information, please
                                            get in touch with our team.
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-8 rounded-[28px] bg-[#BDECF0] p-7 md:p-9">
                                    <h3 className="!m-0 !text-xl !font-semibold !text-[#17292B]">
                                        We're happy to help
                                    </h3>

                                    <p className="!mt-3 !text-sm !leading-6 !text-[#31585C]">
                                        For privacy-related questions or
                                        requests, please contact us through
                                        our contact page.
                                    </p>

                                    <Link
                                        href="/contact"
                                        className="mt-6 inline-block rounded-full !bg-[#17292B] !px-7 !py-3.5 !text-sm !font-semibold !text-white no-underline transition hover:!bg-[#31585C]"
                                    >
                                        Contact Us
                                    </Link>
                                </div>
                            </section>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="bg-[#BDECF0] px-6 py-16 sm:px-8 md:px-12 md:py-20 lg:px-20">
                    <div className="mx-auto max-w-7xl">
                        <div className="rounded-[32px] bg-[#17292B] px-7 py-14 text-center sm:px-12 md:py-20">
                            <p className="!m-0 !text-xs !font-semibold !uppercase !tracking-[0.25em] !text-[#BDECF0]">
                                Your Privacy Matters
                            </p>

                            <h2 className="!mt-4 !text-3xl !font-semibold !tracking-tight !text-white sm:!text-4xl md:!text-5xl">
                                Have a privacy question?
                            </h2>

                            <p className="mx-auto !mt-5 !max-w-xl !text-sm !leading-6 !text-gray-300 md:!text-base">
                                We're committed to being transparent about how
                                your information is handled.
                            </p>

                            <Link
                                href="/contact"
                                className="mt-8 inline-block rounded-full !bg-[#BDECF0] !px-8 !py-3.5 !text-sm !font-semibold !text-[#17292B] no-underline transition hover:!bg-white"
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