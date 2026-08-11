import React, { useState, useEffect } from 'react';
import { BrandLogo } from './BrandLogo';
import { AdBanner } from './AdBanner';
import { CategoryItem, AdBanner as AdBannerType, LogoSettings } from '../types';
import { 
  Search, 
  Calendar, 
  CloudSun, 
  UserCheck, 
  ShieldCheck, 
  Menu, 
  X, 
  TrendingUp, 
  Bell,
  CheckCircle2
} from 'lucide-react';

interface HeaderProps {
  categories: CategoryItem[];
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  onOpenCitizenPortal: () => void;
  onOpenAdminPanel: () => void;
  onSearch: (query: string) => void;
  ads: AdBannerType[];
  logoSettings?: LogoSettings;
}

export const Header: React.FC<HeaderProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  onOpenCitizenPortal,
  onOpenAdminPanel,
  onSearch,
  ads,
  logoSettings,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [webSidebarOpen, setWebSidebarOpen] = useState(false);
  const [nepaliDateStr, setNepaliDateStr] = useState('');

  useEffect(() => {
    // Current date formatted in Bikram Sambat Nepali
    setNepaliDateStr('२०८३ श्रावण २२, बिहीबार');
  }, []);

  const topHeaderAds = ads.filter(a => a.placementSlot === 'TOP_HEADER_LANDSCAPE' && a.isActive);
  const belowCategoryAds = ads.filter(a => a.placementSlot === 'BELOW_CATEGORY_LANDSCAPE' && a.isActive);
  
  const activeCategories = categories
    .filter(c => c.isActive !== false)
    .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <header className="w-full bg-white shadow-xs border-b border-slate-200 relative">
      
      {/* 1. Top Utility Ticker Bar (Weather, Date, Forex, Quick Portals) */}
      <div className="bg-[#0F172A] text-slate-300 text-xs py-1.5 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          
          {/* Left: Live Bikram Sambat Date & Weather */}
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-1.5 font-medium text-amber-400">
              <Calendar className="w-3.5 h-3.5" />
              <span>{nepaliDateStr}</span>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 text-slate-300 border-l border-slate-700 pl-3">
              <CloudSun className="w-3.5 h-3.5 text-sky-400" />
              <span>काठमाडौँ २८°C</span>
              <span className="text-slate-500">•</span>
              <span>पोखरा २६°C</span>
            </div>
            <div className="hidden md:flex items-center gap-1.5 text-slate-300 border-l border-slate-700 pl-3">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
              <span>नेप्से: २,७९५.६० ▲ ४५.२</span>
            </div>
          </div>

          {/* Right: Quick Portal Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenCitizenPortal}
              className="flex items-center gap-1.5 bg-[#DC2626] hover:bg-red-700 text-white font-semibold text-xs px-2.5 py-1 rounded-md shadow-xs transition-colors"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>नागरिक रिपोर्टर / खाता</span>
            </button>

            <button
              onClick={onOpenAdminPanel}
              className="flex items-center gap-1.5 bg-[#0C3880] hover:bg-blue-900 text-white font-semibold text-xs px-2.5 py-1 rounded-md shadow-xs transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-sky-300" />
              <span>सम्पादक / Admin CMS</span>
            </button>
          </div>

        </div>
      </div>

      {/* 2. Main Header: Brand Logo in Landscape Mode + Top Header Landscape Ad Banner */}
      <div className="max-w-7xl mx-auto px-4 py-3 sm:py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Logo in Landscape Mode */}
        <div className="flex items-center justify-between w-full md:w-auto shrink-0">
          <button onClick={() => onSelectCategory('मुख्य समाचार')} className="text-left focus:outline-none">
            <BrandLogo size="lg" settings={logoSettings} />
          </button>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Top Header Landscape Ad Banner Section (728x90) */}
        <div className="w-full md:max-w-[728px] shrink-1">
          <AdBanner ads={topHeaderAds} slotName="मुख्य हेडर विज्ञापन (Header Landscape Ad 728x90)" layout="landscape" />
        </div>

      </div>

      {/* 3. Search & Main Category Navigation Bar (Slim Sticky Bar at Top on Scroll) */}
      <div className="bg-[#0C3880] text-white shadow-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 flex items-center justify-between">
          
          {/* Web Sidebar Drawer Trigger Button */}
          <button
            onClick={() => setWebSidebarOpen(true)}
            className="flex items-center gap-1.5 bg-[#DC2626] hover:bg-red-700 text-white font-bold text-xs px-3 py-2 rounded-lg transition-colors shrink-0 mr-2 shadow-xs"
            title="मुख्य साइट साइडबार मेनू खोल्नुहोस्"
          >
            <Menu className="w-4 h-4" />
            <span className="hidden sm:inline">मुख्य मेनु</span>
          </button>

          {/* Scrollable Category Navigation List */}
          <nav className="flex items-center overflow-x-auto no-scrollbar py-1 gap-1 text-sm font-semibold flex-1">
            {activeCategories.map((cat) => {
              const catName = cat.nameNepali;
              const isSelected = selectedCategory === catName;
              const isPriority = [
                'पूर्णविराम पछिको प्रश्नवाचक',
                'जन चौतारी',
                'नागरिक रिपोर्ट',
                'खोजी हाम्रो, उत्तर तपाईंको'
              ].includes(catName);

              return (
                <button
                  key={cat.id || catName}
                  onClick={() => {
                    onSelectCategory(catName);
                    setMobileMenuOpen(false);
                  }}
                  className={`whitespace-nowrap px-3.5 py-2 rounded-lg transition-all duration-150 flex items-center gap-1.5 ${
                    isSelected 
                      ? 'bg-[#DC2626] text-white shadow-md font-bold' 
                      : isPriority
                      ? 'bg-amber-400/20 text-amber-200 border border-amber-400/40 hover:bg-amber-400/30 font-bold'
                      : 'hover:bg-white/10 text-slate-100 hover:text-white'
                  }`}
                >
                  {catName === 'मुख्य समाचार' && <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping mr-0.5" />}
                  {isPriority && !isSelected && <span className="text-amber-400 text-xs font-black">★</span>}
                  {catName}
                </button>
              );
            })}
          </nav>

          {/* Inline Search Bar */}
          <form onSubmit={handleSearchSubmit} className="hidden lg:flex items-center relative pl-3">
            <input
              type="text"
              placeholder="समाचार खोज्नुहोस्..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white/15 focus:bg-white focus:text-slate-900 text-white placeholder-slate-300 focus:placeholder-slate-400 text-xs rounded-full pl-8 pr-3 py-1.5 outline-none w-44 focus:w-60 transition-all border border-white/20"
            />
            <Search className="w-3.5 h-3.5 text-slate-300 absolute left-5 pointer-events-none" />
          </form>

        </div>
      </div>

      {/* WEB SIDEBAR NAVIGATION DRAWER (Full Responsive Left Side Bar for Big & Small Screens) */}
      {webSidebarOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
          
          {/* Dark Backdrop */}
          <div 
            className="fixed inset-0 bg-black/75 backdrop-blur-xs transition-opacity"
            onClick={() => setWebSidebarOpen(false)}
          />

          {/* Sliding Left Side Bar Drawer */}
          <div className="fixed inset-y-0 left-0 max-w-full flex">
            <div className="w-80 sm:w-80 max-w-[85vw] bg-[#0F172A] text-slate-100 shadow-2xl flex flex-col border-r border-slate-800 relative z-10 animate-in slide-in-from-left duration-300">
              
              {/* Drawer Header */}
              <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
                <div>
                  <BrandLogo size="sm" settings={logoSettings} />
                </div>
                <button
                  onClick={() => setWebSidebarOpen(false)}
                  className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Live Search */}
              <div className="p-4 bg-slate-900 border-b border-slate-800">
                <form onSubmit={(e) => { handleSearchSubmit(e); setWebSidebarOpen(false); }} className="relative">
                  <input
                    type="text"
                    placeholder="समाचार खोज्नुहोस्..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-950 text-white placeholder-slate-400 text-xs rounded-xl pl-9 pr-3 py-2.5 outline-none border border-slate-700 focus:border-red-500"
                  />
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                </form>
              </div>

              {/* Drawer Navigation List */}
              <div className="flex-1 overflow-y-auto p-4 space-y-5 text-xs font-bold">
                
                {/* Main News Categories */}
                <div>
                  <h4 className="text-[10px] uppercase font-mono tracking-wider text-slate-400 mb-2 px-1">
                    समाचार श्रेणीहरू (Categories)
                  </h4>
                  <div className="space-y-1">
                    {activeCategories.map((cat, idx) => {
                      const catName = cat.nameNepali;
                      const isSelected = selectedCategory === catName;
                      const isPriority = [
                        'पूर्णविराम पछिको प्रश्नवाचक',
                        'जन चौतारी',
                        'नागरिक रिपोर्ट',
                        'खोजी हाम्रो, उत्तर तपाईंको'
                      ].includes(catName);

                      return (
                        <button
                          key={cat.id || catName}
                          onClick={() => {
                            onSelectCategory(catName);
                            setWebSidebarOpen(false);
                          }}
                          className={`w-full text-left px-3 py-2.5 rounded-xl transition-all flex items-center justify-between ${
                            isSelected
                              ? 'bg-[#DC2626] text-white font-black shadow-md'
                              : isPriority
                              ? 'bg-amber-400/10 text-amber-300 border border-amber-500/30 hover:bg-amber-400/20'
                              : 'hover:bg-slate-800 text-slate-200'
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            <span className="text-[10px] text-slate-400 font-mono w-4">{idx + 1}.</span>
                            <span>{catName}</span>
                          </span>
                          {isPriority && <span className="text-amber-400 text-xs font-black">★</span>}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Special Action Portals */}
                <div className="pt-3 border-t border-slate-800 space-y-2">
                  <h4 className="text-[10px] uppercase font-mono tracking-wider text-slate-400 mb-1 px-1">
                    पोर्टल तथा विशेष सुविधाहरू
                  </h4>

                  <button
                    onClick={() => { onOpenCitizenPortal(); setWebSidebarOpen(false); }}
                    className="w-full bg-[#DC2626] hover:bg-red-700 text-white font-bold text-xs py-2.5 px-3 rounded-xl flex items-center justify-between transition-colors shadow-xs"
                  >
                    <span className="flex items-center gap-2">
                      <UserCheck className="w-4 h-4" />
                      नागरिक रिपोर्टर / एकाउन्ट
                    </span>
                    <span className="text-[10px] bg-red-900 text-red-200 px-2 py-0.5 rounded-full">Sign In</span>
                  </button>

                  <button
                    onClick={() => { onOpenAdminPanel(); setWebSidebarOpen(false); }}
                    className="w-full bg-[#0C3880] hover:bg-blue-900 text-white font-bold text-xs py-2.5 px-3 rounded-xl flex items-center justify-between transition-colors shadow-xs"
                  >
                    <span className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-sky-300" />
                      सम्पादक / Admin CMS Panel
                    </span>
                    <span className="text-[10px] bg-sky-950 text-sky-300 px-2 py-0.5 rounded-full border border-sky-800">Protected</span>
                  </button>
                </div>

                {/* Live Info Ticker */}
                <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400 space-y-1.5 font-medium">
                  <div className="flex items-center gap-2 text-amber-400 font-bold">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{nepaliDateStr}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <CloudSun className="w-3.5 h-3.5 text-sky-400" />
                    <span>काठमाडौँ २८°C • पोखरा २६°C</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                    <span>नेप्से: २,७९५.६० ▲ ४५.२</span>
                  </div>
                </div>

              </div>

              {/* Drawer Footer */}
              <div className="p-3 bg-slate-950 border-t border-slate-800 text-[11px] text-slate-500 text-center font-mono">
                © २०८३ यथार्थ खबर डटकम. सर्वाधिकार सुरक्षित।
              </div>

            </div>
          </div>
        </div>
      )}

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900 text-white p-4 border-t border-slate-800 space-y-3 relative z-40">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="समाचार खोज्नुहोस्..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-800 text-white placeholder-slate-400 text-sm rounded-lg pl-9 pr-4 py-2 outline-none border border-slate-700"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          </form>

          <div className="grid grid-cols-2 gap-2 pt-2">
            {activeCategories.map((cat) => (
              <button
                key={cat.id || cat.nameNepali}
                onClick={() => {
                  onSelectCategory(cat.nameNepali);
                  setMobileMenuOpen(false);
                }}
                className={`text-left px-3 py-2 rounded-md text-xs font-medium ${
                  selectedCategory === cat.nameNepali ? 'bg-[#DC2626] text-white font-bold' : 'hover:bg-slate-800 text-slate-300'
                }`}
              >
                {cat.nameNepali}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
            <button
              onClick={() => { onOpenCitizenPortal(); setMobileMenuOpen(false); }}
              className="w-full bg-[#DC2626] text-white font-semibold text-xs py-2 rounded-lg flex items-center justify-center gap-2"
            >
              <UserCheck className="w-4 h-4" />
              नागरिक रिपोर्टर / एकाउन्ट
            </button>

            <button
              onClick={() => { onOpenAdminPanel(); setMobileMenuOpen(false); }}
              className="w-full bg-[#0C3880] text-white font-semibold text-xs py-2 rounded-lg flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-sky-300" />
              सम्पादक / Admin CMS Panel
            </button>
          </div>
        </div>
      )}

      {/* 4. Landscape Ad Section Just Below Category Section (Ad Slot 2) - Scrolls naturally with page */}
      <div className="max-w-7xl mx-auto px-4 py-3">
        <AdBanner ads={belowCategoryAds} slotName="Category Bottom Leaderboard (1200x120)" layout="landscape" />
      </div>

    </header>
  );
};
