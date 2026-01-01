"use client";

import { useState, useEffect, createContext, useContext, ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface CookieContextType {
  openSettings: () => void;
}

const CookieContext = createContext<CookieContextType | undefined>(undefined);

export const useCookieSettings = () => {
  const context = useContext(CookieContext);
  if (!context) {
    throw new Error("useCookieSettings must be used within a CookieProvider");
  }
  return context;
};

export function CookieProvider({ children }: { children: ReactNode }) {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  
  // Cookie states
  const [preferences, setPreferences] = useState({
    essential: true,
    statistical: false,
    marketing: false
  });

  useEffect(() => {
    // Check if consent is already saved
    const savedConsent = localStorage.getItem("cookie-consent");
    if (!savedConsent) {
      // Small delay to show banner elegantly
      const timer = setTimeout(() => setShowBanner(true), 1000);
      return () => clearTimeout(timer);
    } else {
      try {
        setPreferences(JSON.parse(savedConsent));
      } catch (e) {
        console.error("Failed to parse cookie preferences");
      }
    }
  }, []);

  const savePreferences = (newPrefs: typeof preferences) => {
    localStorage.setItem("cookie-consent", JSON.stringify(newPrefs));
    setPreferences(newPrefs);
    setShowBanner(false);
    setShowSettings(false);
    // Here you would typically initialize/destroy scripts based on preferences
  };

  const acceptAll = () => {
    const allEnabled = { essential: true, statistical: true, marketing: true };
    savePreferences(allEnabled);
  };

  return (
    <CookieContext.Provider value={{ openSettings: () => setShowSettings(true) }}>
      {children}

      {/* Banner */}
      <AnimatePresence>
        {showBanner && !showSettings && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-0 left-0 right-0 bg-black text-white p-6 z-[60] flex flex-col md:flex-row items-center justify-between gap-4 shadow-lg"
          >
            <div className="text-sm font-light max-w-3xl text-center md:text-left">
              <p>
                Používame cookies na zlepšenie vášho zážitku. Pokračovaním v prehliadaní súhlasíte s ich používaním.
              </p>
            </div>
            <div className="flex gap-4 text-sm font-medium uppercase tracking-widest shrink-0">
              <button 
                onClick={() => setShowSettings(true)}
                className="hover:text-gray-300 transition-colors"
              >
                Nastavenia
              </button>
              <button 
                onClick={acceptAll}
                className="bg-white text-black px-6 py-2 hover:bg-gray-200 transition-colors"
              >
                Prijať všetko
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Settings Modal */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[70] flex items-center justify-center p-4"
            onClick={() => setShowSettings(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white w-full max-w-md p-8 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-bold uppercase tracking-widest mb-6">Nastavenia Cookies</h2>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium">Nevyhnutné</h3>
                    <p className="text-xs text-gray-500 mt-1">Potrebné pre fungovanie stránky.</p>
                  </div>
                  <input type="checkbox" checked disabled className="w-5 h-5 accent-black" />
                </div>

                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium">Štatistické</h3>
                    <p className="text-xs text-gray-500 mt-1">Pomáhajú nám zlepšovať web.</p>
                  </div>
                  <input 
                    type="checkbox" 
                    checked={preferences.statistical} 
                    onChange={(e) => setPreferences({...preferences, statistical: e.target.checked})}
                    className="w-5 h-5 accent-black" 
                  />
                </div>

                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium">Marketingové</h3>
                    <p className="text-xs text-gray-500 mt-1">Pre relevantnú reklamu.</p>
                  </div>
                  <input 
                    type="checkbox" 
                    checked={preferences.marketing} 
                    onChange={(e) => setPreferences({...preferences, marketing: e.target.checked})}
                    className="w-5 h-5 accent-black" 
                  />
                </div>
              </div>

              <div className="flex justify-end gap-4 text-sm font-medium uppercase tracking-widest">
                 <button 
                  onClick={() => setShowSettings(false)}
                  className="text-gray-500 hover:text-black transition-colors"
                >
                  Zrušiť
                </button>
                <button 
                  onClick={() => savePreferences(preferences)}
                  className="bg-black text-white px-6 py-2 hover:bg-gray-800 transition-colors"
                >
                  Uložiť
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </CookieContext.Provider>
  );
}
