"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { BookOpen, Sparkles, ArrowRight, Clock, Tag, Compass, Star, Smile, Heart } from "lucide-react";

export interface JournalEntry {
  id: string;
  title: string;
  category: string;
  date: string;
  author: string;
  readTime: string;
  summary: string;
  image: string;
  content: string[];
}

export const journalEntries: JournalEntry[] = [
  {
    id: "001",
    title: "CREATIVE PLAYROOMS:\nDESIGNING INSPIRING\nKIDS SPACES",
    category: "Playroom Design",
    date: "August 2026",
    author: "ToyPark Design Team",
    readTime: "4 min read",
    summary: "Discover how to blend ergonomic furniture, vibrant colors, and organized storage to create inspiring playrooms that nurture child development and boundless imagination.",
    image: "/assets/WHOWEARE/Empty_children_playroom_with_toys_202608081653.jpeg",
    content: [
      "Designing a children's playroom is about creating a sensory environment that balances active play with quiet focus. At ToyPark, we believe furniture shouldn't just fill space—it should inspire exploration.",
      "Start with zoning: designate clear areas for reading, building, and physical play. Low-height modular wooden shelves encourage independence by allowing kids to clean up and pick their own toys easily.",
      "Incorporate neutral wooden tones with pops of pastel colors to foster a calm yet stimulating visual environment. Every surface should feature smooth rounded edges to ensure absolute peace of mind during playtime."
    ]
  },
  {
    id: "002",
    title: "SUSTAINABLE MATERIALS:\nTHE ART OF SAFE\nWOODEN FURNITURE",
    category: "Sustainability",
    date: "July 2026",
    author: "Eco Craft Lab",
    readTime: "5 min read",
    summary: "An inside look at our eco-friendly craftsmanship—from sustainably harvested solid wood to non-toxic organic finishes that protect both your children and the planet.",
    image: "/assets/WHOWEARE/Brightly_lit_empty_playroom_toys_202608081652.jpeg",
    content: [
      "Children spend countless hours interacting closely with their furniture. That's why every piece of ToyPark furniture is crafted using FSC-certified solid wood and organic plant-based oils.",
      "Zero VOC finishes ensure pure indoor air quality for nursery and bedroom spaces. We prioritize durability so our heirloom-quality wooden play sets can be passed down through generations.",
      "Sustainable design means creating timeless, multi-functional furniture that adapts as your child grows from toddlerhood to early school years."
    ]
  },
  {
    id: "003",
    title: "MODULAR PLAY DESIGN:\nINDOOR CASTLES &\nEXPLORATION NOOKS",
    category: "Active Play",
    date: "June 2026",
    author: "Child Development Expert",
    readTime: "6 min read",
    summary: "Transform indoor play into an adventurous experience with modular castles, climbing frames, and cozy reading nooks designed for active, healthy kids.",
    image: "/assets/WHOWEARE/Playroom_with_castle_and_toys_202608081652.jpeg",
    content: [
      "Physical activity indoors is essential for developing motor skills and confidence. Our modular play structures turn living rooms and play spaces into safe adventure arenas.",
      "Combining climbing rungs, soft canvas tents, and sturdy wooden forts allows kids to invent endless imaginative stories while developing core strength.",
      "Modular components mean you can reconfigure the setup as your room layout changes or as your child's play preferences evolve."
    ]
  }
];

export default function BlogsPageContent() {
  return (
    <div className="bg-[#f0f8fa] text-[#0c2333] min-h-screen font-quicksand antialiased selection:bg-[#0284c7] selection:text-white pt-10 pb-24 px-6 md:px-16 relative overflow-hidden">
      
      {/* Dynamic Animated Background SVGs */}
      <div className="absolute top-1/4 right-12 text-red-300/60 pointer-events-none z-0 animate-[spin_12s_linear_infinite]">
        <Compass className="w-28 h-28 stroke-[1.5]" />
      </div>
      <div className="absolute bottom-20 left-10 text-[#0284c7]/30 pointer-events-none z-0 animate-bounce">
        <Smile className="w-24 h-24 stroke-[1.5]" />
      </div>
      <div className="absolute bottom-32 right-1/4 text-pink-300/60 pointer-events-none z-0 animate-pulse">
        <Heart className="w-20 h-20 fill-pink-300/40 stroke-[1.5]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* HEADER SECTION */}
        <div className="mb-16 max-w-4xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-red-500/10 text-red-600 px-4 py-1.5 rounded-full mb-4 border border-red-500/20 shadow-sm hover:scale-105 transition-transform cursor-pointer">
            <Sparkles className="w-4 h-4 text-red-500 fill-red-500 animate-spin" />
            <span className="text-xs font-black tracking-widest uppercase">TOY PARK JOURNALS & INSIGHTS</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-none tracking-tight mb-6 text-[#0a192f] flex flex-col md:flex-row md:items-center gap-3">
            <span className="text-red-500 font-extrabold tracking-tight">TOY PARK</span>
            <span className="flex items-center gap-3">
              „BLOGS“
              <BookOpen className="w-10 h-10 md:w-14 md:h-14 text-[#0284c7] inline-block stroke-[2.5] animate-bounce" />
            </span>
          </h1>

          <p className="text-base md:text-xl font-semibold text-[#3b596d] leading-relaxed max-w-3xl">
            Our ToyPark furniture designs emerge through playful experimentation, meticulous craftsmanship, and an unwavering commitment to child safety. Explore our articles, tips, and inspiration for kids' spaces.
          </p>
        </div>

        {/* BLOGS GRID SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {journalEntries.map((entry) => (
            <Link 
              key={entry.id} 
              href={`/blogs/${entry.id}`}
              className="bg-white rounded-3xl p-5 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group border border-cyan-900/5 hover:-translate-y-1.5"
            >
              {/* Image Container */}
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-5 bg-cyan-900/5">
                <Image 
                  src={entry.image} 
                  alt={entry.title} 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out" 
                />
                <div className="absolute top-3 right-3 bg-white/90 px-3 py-1 rounded-full text-[11px] font-bold text-[#0a192f] shadow-sm flex items-center gap-1">
                  <Tag className="w-3 h-3 text-[#0284c7]" />
                  {entry.category}
                </div>
              </div>

              {/* Metadata */}
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#0284c7]">
                  #{entry.id}
                </span>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#3b596d] flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#0284c7]" />
                  {entry.readTime}
                </span>
              </div>
              
              {/* Title */}
              <h3 className="text-lg md:text-xl font-bold leading-snug uppercase text-[#0a192f] group-hover:text-[#0284c7] transition-colors duration-300 mb-3 whitespace-pre-line">
                {entry.title}
              </h3>

              {/* Summary */}
              <p className="text-sm text-[#3b596d] font-medium leading-relaxed line-clamp-3 mb-6 flex-grow">
                {entry.summary}
              </p>

              {/* Read Article Link */}
              <div className="pt-3 border-t border-cyan-900/10 flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#3b596d]">
                  {entry.date}
                </span>
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#0284c7] group-hover:translate-x-1 transition-transform flex items-center gap-1.5">
                  Read Article
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}
