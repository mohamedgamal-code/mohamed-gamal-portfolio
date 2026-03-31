import React from "react";
import { cn } from "@/lib/utils";

interface LogoProps {
  locale: string;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ locale, className }) => {
  return (
    <div 
      className={cn(
        "relative flex items-center gap-3 sm:gap-4 flex-row p-0",
        locale === "ar" ? "-mr-2 sm:-mr-4" : "-ml-2 sm:-ml-4",
        className
      )}
    >
      <div className="relative flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 shrink-0">
        <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700 scale-150" />
        <div className="relative flex items-baseline">
          <span className="text-[28px] sm:text-[32px] md:text-[36px] font-black italic leading-none tracking-tighter transition-all duration-500 group-hover:scale-110 group-hover:rotate-[-8deg] bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-400 bg-clip-text text-transparent filter drop-shadow(0 0-10px rgba(59,130,246,0.2))">
           M
          </span>
          <div className="absolute -bottom-1 -left-[10%] h-[3px] md:h-[4px] w-[120%] bg-gradient-to-r from-blue-700 to-blue-400 dark:from-blue-500 dark:to-cyan-300 rounded-full shadow-[0_2px_10px_rgba(59,130,246,0.3)]" />
        </div>
        <div
          className={`absolute top-0 flex h-2.5 w-2.5 md:h-3 md:w-3 ${
            locale === "ar" ? "-left-0.5" : "-right-0.5"
          }`}
        >
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-40" />
          <span className="relative inline-flex rounded-full h-2 w-2 md:h-2.5 md:w-2.5 bg-blue-500 border-2 border-white dark:border-zinc-950 shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
        </div>
      </div>

      <div
        className={`flex flex-col leading-none gap-1 ${
          locale === "ar" ? "text-right" : "text-left"
        }`}
      >
        <div className="overflow-hidden">
          <span className="block font-black italic text-[15px] sm:text-[16px] md:text-[18px] tracking-tight text-zinc-900 dark:text-white whitespace-nowrap transition-transform duration-500 group-hover:-translate-y-px">
            Mohamed
            <span className="text-blue-600 dark:text-blue-500 mx-0.5 transition-colors duration-300 group-hover:text-cyan-500">
             Gamal
            </span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[9px] sm:text-[10px] tracking-[1.5px] sm:tracking-[2px] text-zinc-500 dark:text-zinc-400 uppercase font-bold italic whitespace-nowrap transition-colors duration-300 group-hover:text-zinc-900 dark:group-hover:text-zinc-200">
            Full Stack{" "}
            <span className="text-blue-600 dark:text-blue-500 font-black relative">
              Engineer
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-blue-500 transition-all duration-500 group-hover:w-full" />
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Logo;