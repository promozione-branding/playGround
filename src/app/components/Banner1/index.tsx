import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const EducationalBanner: React.FC = () => {
  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-[#4179CD] via-[#8358AE] to-[#A1317B] overflow-hidden font-sans text-white flex items-center">
      {/* Embedded CSS for custom floating animations */}
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-15px) rotate(3deg); }
          }
          @keyframes float-reverse {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(15px) rotate(-3deg); }
          }
          @keyframes pulse-slow {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }
          .animate-float { animation: float 6s ease-in-out infinite; }
          .animate-float-delayed { animation: float 7s ease-in-out infinite 2s; }
          .animate-float-reverse { animation: float-reverse 8s ease-in-out infinite 1s; }
          .animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }
        `}
      </style>

      {/* --- DECORATIVE SVGS (Matching Gradient Palette: #08B7AC, #00A7C4, #0093D3, #4179CD, #8358AE, #A1317B) --- */}
      
      {/* Top Left Teal Green Corner Blob */}
      <svg className="absolute top-0 left-0 w-44 h-52 text-[#08B7AC] z-0 pointer-events-none" viewBox="0 0 100 100" fill="currentColor">
        <path d="M0,0 L100,0 C85,25 75,55 45,75 C20,90 0,65 0,100 Z" />
      </svg>

      {/* Top Left Cyan Blue Squiggle */}
      <svg className="absolute top-[10%] left-[8%] w-28 h-14 text-[#00A7C4] animate-float z-0 pointer-events-none" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round">
        <path d="M10,40 Q20,10 30,30 T50,20 T70,30 T90,10 T110,35" />
      </svg>

      {/* Top Middle Deep Sky Blue Star */}
      <svg className="absolute top-[12%] left-[28%] w-10 h-10 text-[#0093D3] animate-pulse-slow z-0 pointer-events-none" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
        <path d="M4 4 L6 6 M20 4 L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>

      {/* Top Middle-Right Purple Cloud */}
      <svg className="absolute top-[10%] right-[38%] w-20 h-14 text-[#8358AE] animate-float-delayed z-0 pointer-events-none" viewBox="0 0 24 24" fill="currentColor">
        <path d="M6.5 17.5C4.5 17.5 3 16 3 14C3 12.1 4.4 10.6 6.2 10.5C6.7 7.9 8.9 6 11.5 6C14.3 6 16.7 8 17.3 10.7C19.4 11 21 12.8 21 15C21 17.2 19.2 19 17 19H6.5V17.5Z" />
      </svg>

      {/* Top Right Magenta Sun */}
      <svg className="absolute top-[8%] right-[8%] w-20 h-20 text-[#A1317B] animate-float z-0 pointer-events-none" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round">
        <circle cx="50" cy="50" r="15" fill="#A1317B" />
        <path d="M50 15 L50 25 M50 75 L50 85 M15 50 L25 50 M75 50 L85 50 M25 25 L32 32 M68 68 L75 75 M25 75 L32 68 M68 25 L75 32" />
      </svg>

      {/* Top Right Curve Line */}
      <svg className="absolute top-[18%] right-2 w-14 h-44 text-[#08B7AC] animate-pulse-slow z-0 pointer-events-none" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
        <path d="M40,0 C15,40 15,90 40,140" />
      </svg>

      {/* Bottom Left Rainbow (#08B7AC, #0093D3, #A1317B) */}
      <svg className="absolute bottom-[3%] left-[3%] w-28 h-20 animate-float-reverse z-0 pointer-events-none" viewBox="0 0 100 80" fill="none" strokeWidth="7" strokeLinecap="round">
        <path d="M10,75 A40,40 0 0,1 90,75" stroke="#08B7AC" />
        <path d="M22,75 A28,28 0 0,1 78,75" stroke="#0093D3" />
        <path d="M34,75 A16,16 0 0,1 66,75" stroke="#A1317B" />
      </svg>

      {/* Bottom Left Stars & Dash Trail */}
      <div className="absolute bottom-[10%] left-[20%] animate-float z-0 flex items-center gap-2 pointer-events-none">
        <svg className="w-6 h-6 text-[#00A7C4]" viewBox="0 0 24 24" fill="currentColor">
           <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
        </svg>
        <svg className="w-4 h-4 text-[#00A7C4] ml-[-8px] mt-[15px]" viewBox="0 0 24 24" fill="currentColor">
           <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
        </svg>
        <svg className="w-32 h-16 text-white/50 ml-4" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" strokeLinecap="round">
          <path d="M0,20 Q20,-10 40,20 T80,10 T120,0" />
        </svg>
      </div>

      {/* Bottom Middle Dashed Pattern */}
      <div className="absolute bottom-[10%] right-[44%] flex flex-col gap-2 animate-pulse-slow z-0 text-[#00A7C4] pointer-events-none">
        <div className="flex gap-2"><span className="w-6 h-2 bg-current rounded-full" /><span className="w-4 h-2 bg-current rounded-full" /><span className="w-8 h-2 bg-current rounded-full" /></div>
        <div className="flex gap-2 ml-4"><span className="w-8 h-2 bg-current rounded-full" /><span className="w-6 h-2 bg-current rounded-full" /></div>
        <div className="flex gap-2"><span className="w-4 h-2 bg-current rounded-full" /><span className="w-10 h-2 bg-current rounded-full" /><span className="w-4 h-2 bg-current rounded-full" /></div>
      </div>

      {/* Bottom Right Magenta Red Corner Blob */}
      <svg className="absolute bottom-0 right-0 w-56 h-40 text-[#A1317B] z-0 pointer-events-none" viewBox="0 0 100 100" fill="currentColor">
        <path d="M100,100 L0,100 C15,75 35,55 65,65 C82,70 92,35 100,25 Z" />
      </svg>
      
      {/* Decorative Teal Arc on bottom right blob */}
      <svg className="absolute bottom-[14%] right-[3%] w-20 h-20 text-[#08B7AC] z-0 pointer-events-none" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round">
         <path d="M10,50 A40,40 0 0,1 90,50" />
      </svg>

      {/* --- MAIN LAYOUT --- */}
      <div className="container mx-auto px-8 md:px-16 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[600px] py-12">
        
        {/* Left Column (Text Content) */}
        <div className="flex flex-col items-start gap-6">
          <h4 className="text-[#08B7AC] font-black tracking-widest text-sm md:text-base uppercase bg-white/10 px-3.5 py-1 rounded-full border border-white/20">
            Educational Programs
          </h4>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight">
            Our Best Features and Learn From anywhere
          </h1>
          <p className="text-white/90 text-lg max-w-md mb-4 leading-relaxed font-normal">
            Vestibulum ut sodales quam. Ut in vestibulum augue. Orci ac auctor augue mauris augue neque.
          </p>
          <button className="bg-[#A1317B] hover:bg-[#8e296b] text-white px-8 py-3.5 rounded-full font-black text-sm uppercase tracking-wider shadow-[4px_4px_0_0_#08B7AC] hover:shadow-[2px_2px_0_0_#08B7AC] hover:translate-x-[2px] hover:translate-y-[2px] active:translate-y-[4px] active:shadow-none transition-all duration-200 cursor-pointer border-2 border-white/30">
            SHOP NOW
          </button>
        </div>

        {/* Right Column (Child with Toys Image & Floating Toy Icons) */}
        <div className="relative w-full flex flex-col items-center justify-center -translate-y-4 lg:-translate-y-8">
          
          {/* Floating Toy Icon - Car (Left) */}
          <div className="absolute -left-4 sm:-left-8 lg:-left-12 top-[25%] z-20 animate-float pointer-events-none">
            <img 
              src="/assets/car_icon.svg" 
              alt="Car Icon" 
              className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.25)]" 
            />
          </div>

          {/* Floating Toy Icon - Helicopter (Right) */}
          <div className="absolute -right-4 sm:-right-8 lg:-right-10 top-[18%] z-20 animate-float-delayed pointer-events-none">
            <img 
              src="/assets/helicopter_icon.svg" 
              alt="Helicopter Icon" 
              className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.25)]" 
            />
          </div>

          {/* Child with Toys Illustration */}
          <div className="relative w-full max-w-[480px] z-10 flex justify-center">
            <img 
              src="/assets/child_withtoys.png" 
              alt="Child with Toys" 
              className="w-full h-auto object-contain drop-shadow-2xl" 
            />
          </div>

          {/* Navigation Arrows */}
          <div className="absolute -bottom-36 right-[20%] sm:right-[26%] lg:right-[30%] z-20 flex flex-col gap-3">
            
            <div className="flex items-center gap-3 cursor-pointer group">
              <div className="w-11 h-11 rounded-full bg-[#08B7AC] text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-md border-2 border-white/40">
                <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
              </div>
              <span className="font-bold text-base text-white">Previous</span>
            </div>

            <div className="flex items-center gap-3 cursor-pointer group justify-end">
              <span className="font-bold text-base text-white">Next</span>
              <div className="w-11 h-11 rounded-full bg-[#08B7AC] text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-md border-2 border-white/40">
                <ArrowRight className="w-5 h-5 stroke-[2.5]" />
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationalBanner;