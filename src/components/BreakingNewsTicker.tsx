import React, { useState, useEffect } from 'react';
import { Article } from '../types';
import { Volume2, VolumeX, Bell, ChevronRight, Zap } from 'lucide-react';

interface BreakingNewsTickerProps {
  breakingArticles: Article[];
  onSelectArticle: (article: Article) => void;
}

export const BreakingNewsTicker: React.FC<BreakingNewsTickerProps> = ({ breakingArticles, onSelectArticle }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(false);

  useEffect(() => {
    if (breakingArticles.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % breakingArticles.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [breakingArticles.length]);

  if (!breakingArticles || breakingArticles.length === 0) return null;

  const activeArticle = breakingArticles[currentIndex] || breakingArticles[0];

  return (
    <div className="bg-gradient-to-r from-[#1E3A8A] via-[#1D4ED8] to-[#991B1B] text-white py-1.5 px-3 sm:px-6 shadow-md border-y border-red-700">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 text-xs sm:text-sm">
        
        {/* Flashing Red Breaking Badge */}
        <div className="flex items-center gap-2 shrink-0 bg-[#DC2626] font-bold px-3 py-1 rounded-full shadow-md animate-pulse">
          <Zap className="w-3.5 h-3.5 text-yellow-300 fill-yellow-300" />
          <span className="uppercase tracking-wider text-white text-xs">ब्रेकिङ्ग न्यूज</span>
        </div>

        {/* Ticker Headline Content */}
        <div 
          onClick={() => onSelectArticle(activeArticle)}
          className="flex-1 overflow-hidden cursor-pointer group flex items-center gap-2 font-medium hover:text-amber-300 transition-colors"
        >
          <span className="bg-white/20 text-white text-[10px] font-semibold px-2 py-0.5 rounded shrink-0">
            {activeArticle.category}
          </span>
          <p className="truncate text-slate-100 group-hover:underline">
            {activeArticle.title}
          </p>
          <ChevronRight className="w-4 h-4 opacity-70 group-hover:translate-x-1 transition-transform shrink-0" />
        </div>

        {/* Audio Toggle & Quick Alert Button */}
        <div className="flex items-center gap-2 shrink-0 border-l border-white/20 pl-3">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-1 rounded-full transition-colors ${soundEnabled ? 'bg-amber-400 text-slate-900' : 'hover:bg-white/10 text-white/80'}`}
            title={soundEnabled ? 'आवाज बन्द गर्नुहोस्' : 'ताजा सूचना आवाज अन गर्नुहोस्'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </div>

      </div>
    </div>
  );
};
