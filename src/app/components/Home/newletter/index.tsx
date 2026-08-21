'use client';

import React from 'react';

// Sample data to keep the component clean and DRY
const articles = [
  {
    id: 1,
    date: 'FEBRUARY 17, 2024',
    title: "The Latest Trends In Kids' Fashion For The Upcoming Summer Season",
    excerpt: 'Maecenas sed ornare lacus, in placerat ante. In hac habitasse platea dictumst. Donec vel euismod metus, auctor vehicula metus. Phasellus turpis sapien, elementum et est nec, ultrices lobortis est.',
    imageUrl: '/assets/newLetter/newletter2.jpg',
  },
  {
    id: 2,
    date: 'FEBRUARY 17, 2024',
    title: "Stylish And Comfortable: Kids' Clothing For Christmas & New Year",
    excerpt: 'Lacus vel facilisis volutpat est velit egestas. Enim blandit volutpat maecenas volutpat. Et netus et malesuada fames ac turpis turpis sapien, elementum et est nec, ultrices lobortis est.',
    imageUrl: '/assets/newLetter/newletter2.jpg',
  },
  {
    id: 3,
    date: 'MARCH 05, 2024',
    title: "Top 10 Educational Toys For Toddlers This Spring",
    excerpt: 'Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Nulla porttitor accumsan tincidunt.',
    imageUrl: '/assets/newLetter/newletter2.jpg',
  }
];

const KidsNewsSection: React.FC = () => {
  return (
    <section className="min-h-screen bg-white font-quicksand text-gray-900 flex flex-col w-full relative">
      
      {/* Header Area */}
      <header className="px-6 py-8 md:px-12 md:py-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 z-10 relative bg-white">
        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-gray-900">
          Kids News Articles
        </h1>
        <button className="bg-[#00C4B5] hover:bg-[#00A89B] text-white text-xs md:text-sm font-extrabold tracking-wider px-6 py-3 rounded-full uppercase shadow-md hover:shadow-lg hover:scale-105 transition-all whitespace-nowrap">
          Explore More Blogs
        </button>
      </header>

      {/* Main Content Grid with Borders */}
      <div className="border-t border-gray-200 flex flex-col lg:flex-row w-full flex-grow relative">
        
        {/* Left Sidebar (Poster / Image) - STICKY ON DESKTOP */}
        <aside className="w-full lg:w-[35%] border-b lg:border-b-0 lg:border-r border-gray-200 p-6 md:p-12 lg:sticky lg:top-0 lg:h-screen lg:self-start">
          <div className="relative w-full h-full min-h-[400px] lg:min-h-0 rounded-2xl overflow-hidden border border-gray-100 shadow-md">
            <img 
              src="/assets/newLetter/newletter1.jpg" 
              alt="Be a volunteer, join our events" 
              className="w-full h-full object-cover absolute inset-0"
            />
            <div className="absolute inset-0 bg-[#00C4B5]/10 mix-blend-multiply rounded-2xl"></div>
          </div>
        </aside>

        {/* Right Articles List (Scrollable area) */}
        <div className="w-full lg:w-[65%] flex flex-col relative">
          
          {articles.map((article, index) => (
            <article 
              key={article.id} 
              className={`p-6 md:p-12 flex flex-col xl:flex-row gap-8 ${
                index !== articles.length - 1 ? 'border-b border-gray-200' : ''
              }`}
            >
              {/* Article Image & Date Badge */}
              <div className="relative w-full xl:w-[45%] flex-shrink-0">
                <div className="absolute top-4 left-4 z-10 bg-[#FF6B6B] text-white text-xs font-black px-3.5 py-1.5 rounded-full shadow-md">
                  {article.date}
                </div>
                <img 
                  src={article.imageUrl} 
                  alt={article.title} 
                  className="w-full h-64 xl:h-full object-cover rounded-2xl shadow-sm"
                />
              </div>

              {/* Article Content */}
              <div className="flex flex-col justify-center w-full xl:w-[55%]">
                <h2 className="text-2xl md:text-3xl font-black leading-tight mb-4 text-gray-900 hover:text-[#00C4B5] transition-colors cursor-pointer">
                  {article.title}
                </h2>
                <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-6 font-semibold">
                  {article.excerpt}
                </p>
                <div>
                  <button className="bg-[#00C4B5] hover:bg-[#00A89B] text-white text-xs font-extrabold tracking-wider px-8 py-3 rounded-full uppercase shadow-md hover:shadow-lg hover:scale-105 transition-all">
                    Read More
                  </button>
                </div>
              </div>
            </article>
          ))}
          
        </div>
      </div>

    </section>
  );
};

export default KidsNewsSection;