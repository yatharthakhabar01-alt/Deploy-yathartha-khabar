import React, { useState, useEffect, useRef } from 'react';
import { AdBanner as AdBannerType } from '../types';
import { ExternalLink, X, ChevronLeft, ChevronRight, Pause, Play, Sparkles } from 'lucide-react';

interface AdBannerProps {
  ad?: AdBannerType;
  ads?: AdBannerType[];
  slotName?: string;
  className?: string;
  layout?: 'landscape' | 'rectangle' | 'skyscraper' | 'floating' | 'banner';
  autoPlayInterval?: number;
}

export const AdBanner: React.FC<AdBannerProps> = ({ 
  ad, 
  ads = [], 
  slotName, 
  className = '', 
  layout = 'landscape',
  autoPlayInterval = 4500
}) => {
  const [closed, setClosed] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Combine passed single 'ad' and 'ads' array, filtering active ads
  const activeAds = Array.from(
    new Map(
      [...(ad ? [ad] : []), ...ads]
        .filter(a => a && a.isActive !== false)
        .map(item => [item.id, item])
    ).values()
  );

  const totalAds = activeAds.length;

  // Auto-play timer effect
  useEffect(() => {
    if (totalAds <= 1 || isPaused || closed) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalAds);
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [totalAds, isPaused, closed, autoPlayInterval]);

  // Scroll container when index changes
  useEffect(() => {
    if (scrollContainerRef.current && totalAds > 1) {
      const container = scrollContainerRef.current;
      const targetChild = container.children[currentIndex] as HTMLElement;
      if (targetChild) {
        container.scrollTo({
          left: targetChild.offsetLeft,
          behavior: 'smooth'
        });
      }
    }
  }, [currentIndex, totalAds]);

  if (closed || totalAds === 0) {
    return (
      <div className={`bg-slate-50 border border-dashed border-slate-300 rounded-xl p-3 text-center text-slate-400 text-xs flex flex-col items-center justify-center min-h-[80px] ${className}`}>
        <span className="font-semibold text-slate-500 uppercase tracking-wider text-[10px] flex items-center gap-1.5">
          <Sparkles className="w-3 h-3 text-amber-500" />
          प्रायोजित विज्ञापन स्थान ({slotName || 'Ad Banner Space'})
        </span>
        <span className="text-[11px] mt-1 text-slate-500 font-medium">
          विज्ञापनका लागि सम्पर्क गर्नुहोस्: <a href="mailto:ad@yatharthakhabar.com" className="text-blue-600 underline hover:text-blue-800">ad@yatharthakhabar.com</a>
        </span>
      </div>
    );
  }

  const currentAd = activeAds[currentIndex] || activeAds[0];

  const handleAdClick = (adItem: AdBannerType) => {
    fetch(`/api/ads/${adItem.id}/click`, { method: 'POST' }).catch(() => {});
    if (adItem.targetUrl) {
      window.open(adItem.targetUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + totalAds) % totalAds);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % totalAds);
  };

  // FLOATING STICKY BOTTOM AD LAYOUT
  if (layout === 'floating') {
    return (
      <div 
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 text-white backdrop-blur-md shadow-2xl border-t-2 border-[#DC2626] px-3 sm:px-4 py-2 transition-all"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <div 
            className="flex items-center gap-3 cursor-pointer group flex-1 overflow-hidden" 
            onClick={() => handleAdClick(currentAd)}
          >
            <span className="bg-[#DC2626] text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase shrink-0 flex items-center gap-1">
              प्रायोजित
            </span>
            <div className="flex items-center gap-2 overflow-hidden">
              <span className="font-semibold text-xs sm:text-sm text-slate-100 truncate group-hover:text-amber-300 transition-colors">
                {currentAd.title}
              </span>
              <span className="text-xs text-slate-400 hidden sm:inline">— {currentAd.advertiserName}</span>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400 shrink-0 group-hover:text-white" />
          </div>

          {/* Controls for floating ad */}
          <div className="flex items-center gap-2 shrink-0">
            {totalAds > 1 && (
              <div className="flex items-center gap-1 bg-slate-800/80 px-2 py-0.5 rounded-full text-[10px] text-slate-300">
                <button onClick={handlePrev} className="p-0.5 hover:text-white"><ChevronLeft className="w-3 h-3" /></button>
                <span>{currentIndex + 1}/{totalAds}</span>
                <button onClick={handleNext} className="p-0.5 hover:text-white"><ChevronRight className="w-3 h-3" /></button>
              </div>
            )}

            <button 
              onClick={(e) => { e.stopPropagation(); setClosed(true); }}
              className="p-1 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white transition-colors"
              title="विज्ञापन हटाउनुहोस्"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // STANDARD LANDSCAPE / RECTANGLE / SKYSCRAPER SCROLLABLE AD CAROUSEL
  return (
    <div 
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className={`group relative bg-slate-950 rounded-2xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-md transition-all duration-200 ${className}`}
    >
      {/* Top Header Badge & Navigation Controls */}
      <div className="absolute top-2 left-2 right-2 z-20 flex items-center justify-between pointer-events-none">
        <div className="bg-black/75 backdrop-blur-md text-white text-[9px] font-extrabold px-2 py-0.5 rounded-md flex items-center gap-1 shadow-sm border border-white/10 pointer-events-auto">
          <span className="text-amber-400">विज्ञापन</span>
          {totalAds > 1 && (
            <span className="text-slate-300 border-l border-slate-600 pl-1 ml-0.5">
              ({currentIndex + 1}/{totalAds})
            </span>
          )}
        </div>

        {totalAds > 1 && (
          <div className="flex items-center gap-1 bg-black/75 backdrop-blur-md text-white px-1.5 py-0.5 rounded-md shadow-sm border border-white/10 pointer-events-auto">
            <button 
              onClick={handlePrev} 
              className="p-1 hover:bg-white/20 rounded transition-colors text-slate-200 hover:text-white"
              title="अघिल्लो विज्ञापन"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>

            <span className="text-[10px] text-slate-300 font-mono">
              {isPaused ? <Pause className="w-2.5 h-2.5 text-amber-400" /> : <Play className="w-2.5 h-2.5 text-emerald-400 animate-pulse" />}
            </span>

            <button 
              onClick={handleNext} 
              className="p-1 hover:bg-white/20 rounded transition-colors text-slate-200 hover:text-white"
              title="पछिल्लो विज्ञापन"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* Horizontal Scrollable Carousel Container */}
      <div 
        ref={scrollContainerRef}
        className="flex overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory w-full"
      >
        {activeAds.map((item, idx) => (
          <div
            key={item.id}
            onClick={() => handleAdClick(item)}
            className="w-full shrink-0 snap-center cursor-pointer relative group/item"
          >
            <div className={`relative w-full overflow-hidden bg-slate-900 flex items-center justify-center ${
              layout === 'skyscraper' ? 'min-h-[280px] max-h-[500px]' : 
              layout === 'rectangle' ? 'min-h-[180px] max-h-[250px]' : 
              'min-h-[90px] sm:min-h-[110px] max-h-[170px]'
            }`}>
              <img 
                src={item.imageUrl} 
                alt={item.title} 
                className="w-full h-full object-cover group-hover/item:scale-103 transition-transform duration-500"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />

              {/* Gradient Overlay for Readable Text */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

              {/* Ad Title & Advertiser Footer Overlay */}
              <div className="absolute bottom-2 left-3 right-3 text-white flex items-end justify-between gap-2">
                <div className="overflow-hidden">
                  <p className="text-xs sm:text-sm font-bold truncate drop-shadow-md text-amber-300 group-hover/item:text-white transition-colors">
                    {item.title}
                  </p>
                  <p className="text-[10px] text-slate-300 truncate opacity-90">
                    {item.advertiserName} • {item.dimensions}
                  </p>
                </div>
                <div className="shrink-0 bg-blue-600 hover:bg-blue-700 text-white p-1 rounded-md transition-colors shadow-xs">
                  <ExternalLink className="w-3 h-3" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dot Indicators for Multi-Ad Carousel */}
      {totalAds > 1 && (
        <div className="absolute bottom-1 right-3 z-20 flex items-center gap-1.5 bg-black/60 px-2 py-0.5 rounded-full backdrop-blur-xs">
          {activeAds.map((_, i) => (
            <button
              key={i}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex(i);
              }}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === currentIndex ? 'w-4 bg-amber-400' : 'w-1.5 bg-white/40 hover:bg-white'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

