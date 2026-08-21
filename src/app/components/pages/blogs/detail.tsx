"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Clock, User, Calendar, Tag } from "lucide-react";
import { journalEntries } from "./index";

export default function BlogDetailContent() {
  const params = useParams();
  const id = params?.id as string;

  const entry = journalEntries.find((item) => item.id === id) || journalEntries[0];

  return (
    <div className="bg-[#f0f8fa] text-[#0c2333] min-h-screen font-quicksand antialiased pt-10 pb-20 px-6 md:px-12 selection:bg-[#0284c7] selection:text-white">
      <div className="max-w-6xl mx-auto">
        
        {/* Back Link */}
        <Link 
          href="/blogs" 
          className="inline-flex items-center gap-2 text-sm font-bold text-[#0284c7] hover:text-[#0a192f] transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to All Journals</span>
        </Link>

        {/* Category & Metadata */}
        <div className="flex flex-wrap items-center gap-4 text-xs font-bold uppercase tracking-wider text-[#0284c7] mb-4">
          <span className="bg-[#e0f2fe] text-[#0284c7] px-3 py-1 rounded-full flex items-center gap-1.5">
            <Tag className="w-3.5 h-3.5" />
            {entry.category}
          </span>
          <span className="text-[#3b596d] flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            {entry.date}
          </span>
          <span className="text-[#3b596d] flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {entry.readTime}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight text-[#0a192f] mb-6 uppercase whitespace-pre-line">
          {entry.title}
        </h1>

        {/* Author info */}
        <div className="flex items-center justify-between border-y border-cyan-900/10 py-4 mb-8 text-sm font-semibold text-[#3b596d]">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-[#0284c7]" />
            <span>Written by <strong className="text-[#0a192f]">ToyPark Team</strong></span>
          </div>
        </div>

        {/* Main Image */}
        <div className="relative w-full aspect-[16/10] md:aspect-[16/9] rounded-3xl overflow-hidden shadow-xl mb-12">
          <Image 
            src={entry.image} 
            alt={entry.title} 
            fill
            priority
            className="object-cover object-center" 
          />
        </div>

        {/* Summary Banner */}
        <div className="bg-[#e3f2f7] border-l-4 border-[#0284c7] p-6 rounded-r-2xl mb-10 text-lg md:text-xl font-semibold leading-relaxed text-[#0a192f]">
          "{entry.summary}"
        </div>

        {/* Content Paragraphs */}
        <div className="space-y-6 text-base md:text-lg font-medium leading-relaxed text-[#3b596d] mb-16">
          {entry.content.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>

        {/* Related Next Articles */}
        <div className="border-t border-cyan-900/10 pt-12">
          <h3 className="text-2xl font-bold text-[#0a192f] mb-8">More Stories from ToyPark</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {journalEntries
              .filter((item) => item.id !== entry.id)
              .map((item) => (
                <Link key={item.id} href={`/blogs/${item.id}`} className="group bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow flex gap-4 items-center">
                  <div className="relative w-24 h-24 rounded-xl overflow-hidden shrink-0">
                    <Image src={item.image} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#0284c7] block mb-1">{item.category}</span>
                    <h4 className="text-sm font-bold text-[#0a192f] group-hover:text-[#0284c7] transition-colors line-clamp-2 uppercase">
                      {item.title}
                    </h4>
                  </div>
                </Link>
              ))}
          </div>
        </div>

      </div>
    </div>
  );
}
