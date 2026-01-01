"use client";

import { useCookieSettings } from "./CookieConsent";

export default function MobileFooter() {
  const { openSettings } = useCookieSettings();

  return (
    <footer className="md:hidden w-full bg-white border-t border-gray-100 px-4 py-6 mt-auto flex flex-col items-start gap-2">
       <div className="text-[10px] text-gray-400">
         <p>&copy; {new Date().getFullYear()} Ateliér Kusá</p>
         <a href="https://aebdigital.sk" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors block mt-0.5">
            Tvorba web - AEB Digital
          </a>
       </div>
       
       <button 
         onClick={openSettings}
         className="text-[10px] text-gray-400 hover:text-black transition-colors underline"
       >
         Nastavenia cookies
       </button>
    </footer>
  );
}
