import React, { useState } from 'react';
import { Article, AdBanner as AdBannerType } from '../types';
import { AdBanner } from './AdBanner';
import { 
  TrendingUp, 
  Clock, 
  Eye, 
  ChevronRight, 
  Flame, 
  CheckCircle2, 
  Sparkles, 
  MapPin,
  MessageSquare,
  HelpCircle,
  Users,
  FileText,
  Search,
  Award
} from 'lucide-react';

interface NewsGridProps {
  articles: Article[];
  onSelectArticle: (article: Article) => void;
  ads: AdBannerType[];
  selectedProvince: string;
  onSelectProvince: (prov: string) => void;
}

export const NewsGrid: React.FC<NewsGridProps> = ({
  articles,
  onSelectArticle,
  ads,
  selectedProvince,
  onSelectProvince,
}) => {
  const featuredHero = articles.find(a => a.isFeatured) || articles[0];
  const sideFeaturedList = articles.filter(a => a.id !== featuredHero?.id).slice(0, 4);
  const trendingList = articles.filter(a => a.isTrending || a.viewsCount > 10000).slice(0, 5);

  const purnabiramArticles = articles.filter(a => a.category === 'पूर्णविराम पछिको प्रश्नवाचक');
  const janaChautariArticles = articles.filter(a => a.category === 'जन चौतारी');
  const nagarikReportArticles = articles.filter(a => a.category === 'नागरिक रिपोर्ट');
  const khojiHamroArticles = articles.filter(a => a.category === 'खोजी हाम्रो, उत्तर तपाईंको');

  const politicsArticles = articles.filter(a => a.category === 'राजनीति').slice(0, 4);
  const economyArticles = articles.filter(a => a.category === 'अर्थतन्त्र').slice(0, 4);
  const societyArticles = articles.filter(a => a.category === 'समाज').slice(0, 4);
  const techArticles = articles.filter(a => a.category === 'प्रविधि').slice(0, 3);
  const opinionArticles = articles.filter(a => a.category === 'विचार/ब्लग').slice(0, 3);

  // Ad Slots (Filter Arrays for Scrollable Carousels)
  const midFeedAds = ads.filter(a => a.placementSlot === 'MID_FEED_WIDE' && a.isActive);
  const sidebar1Ads = ads.filter(a => a.placementSlot === 'RIGHT_SIDEBAR_1' && a.isActive);
  const sidebar2Ads = ads.filter(a => a.placementSlot === 'RIGHT_SIDEBAR_2' && a.isActive);
  const preFooterAds = ads.filter(a => a.placementSlot === 'PRE_FOOTER_SPONSOR' && a.isActive);

  const PROVINCES = [
    'सबै प्रदेश', 'कोशी प्रदेश', 'मधेस प्रदेश', 'बागमती प्रदेश', 
    'गण्डकी प्रदेश', 'लुम्बिनी प्रदेश', 'कर्णाली प्रदेश', 'सुदूरपश्चिम प्रदेश'
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
      
      {/* 1. FRONT PAGE / MAIN HERO NEWS SECTION */}
      {featuredHero && (
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Main Large Hero Article (Col 8) */}
          <div 
            onClick={() => onSelectArticle(featuredHero)}
            className="lg:col-span-8 bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div className="relative overflow-hidden aspect-16/9 max-h-[440px]">
              <img
                src={featuredHero.imageUrl}
                alt={featuredHero.title}
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4 bg-[#DC2626] text-white font-bold text-xs px-3 py-1 rounded-md uppercase tracking-wider shadow-md">
                {featuredHero.category}
              </div>
            </div>

            <div className="p-5 sm:p-7 space-y-3">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight font-serif group-hover:text-[#1E3A8A] transition-colors">
                {featuredHero.title}
              </h1>

              <p className="text-sm sm:text-base text-slate-600 line-clamp-3 leading-relaxed font-serif">
                {featuredHero.summary}
              </p>

              <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
                <span className="font-bold text-slate-800">{featuredHero.authorName}</span>
                <div className="flex items-center gap-3">
                  <span>{featuredHero.publishedAtBikramSambat}</span>
                  <span>•</span>
                  <span>{featuredHero.viewsCount.toLocaleString('ne-NP')} पटक हेरिएको</span>
                </div>
              </div>
            </div>
          </div>

          {/* Side Main Headlines Column (Col 4) */}
          <div className="lg:col-span-4 bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-4">
            <h2 className="text-lg font-bold text-slate-900 border-l-4 border-[#DC2626] pl-3 flex items-center justify-between font-serif">
              <span>ताजा तथा मुख्य समाचार</span>
              <Flame className="w-4 h-4 text-[#DC2626]" />
            </h2>

            <div className="divide-y divide-slate-200">
              {sideFeaturedList.map((art) => (
                <div
                  key={art.id}
                  onClick={() => onSelectArticle(art)}
                  className="py-3 first:pt-0 last:pb-0 cursor-pointer group space-y-1.5"
                >
                  <span className="text-[10px] font-bold text-[#DC2626] uppercase tracking-wider">
                    {art.category}
                  </span>
                  <h3 className="text-sm font-bold text-slate-800 group-hover:text-blue-700 leading-snug line-clamp-2">
                    {art.title}
                  </h3>
                  <div className="text-[11px] text-slate-400 flex items-center gap-2">
                    <span>{art.publishedAtBikramSambat}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </section>
      )}

      {/* 2. MID FEED WIDE BANNER AD (AD SLOT 3) */}
      <div className="w-full">
        <AdBanner ads={midFeedAds} slotName="Mid Feed Wide Banner (970x150)" layout="landscape" />
      </div>

      {/* 3. MAIN CONTENT LAYOUT WITH RIGHT SIDEBAR ADS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left 8 Columns: Categorized News Blocks */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* SPECIAL PRIORITY CATEGORIES SECTION */}
          <section className="space-y-5 bg-gradient-to-br from-slate-900 via-[#002266] to-[#1E3A8A] p-5 sm:p-6 rounded-2xl text-white shadow-md">
            <div className="flex items-center justify-between border-b border-white/20 pb-3">
              <h2 className="text-xl sm:text-2xl font-black border-l-4 border-[#DC2626] pl-3 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />
                विशेष प्राथमिकता स्तम्भहरू (Priority Columns)
              </h2>
              <span className="text-xs text-amber-300 font-bold bg-white/10 px-3 py-1 rounded-full border border-amber-400/30">
                यथार्थ विशेष
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* 1. पूर्णविराम पछिको प्रश्नवाचक */}
              {purnabiramArticles.map((art) => (
                <div
                  key={art.id}
                  onClick={() => onSelectArticle(art)}
                  className="group cursor-pointer bg-white/10 hover:bg-white/15 backdrop-blur-md p-4 rounded-xl border border-white/15 transition-all space-y-3"
                >
                  <div className="flex items-center justify-between text-xs text-amber-300 font-bold">
                    <span className="flex items-center gap-1.5 bg-[#DC2626] text-white px-2.5 py-0.5 rounded-md text-[11px]">
                      <HelpCircle className="w-3.5 h-3.5" /> पूर्णविराम पछिको प्रश्नवाचक
                    </span>
                    <span className="text-slate-300">{art.publishedAtBikramSambat}</span>
                  </div>
                  <div className="aspect-16/9 overflow-hidden rounded-lg">
                    <img src={art.imageUrl} alt={art.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <h3 className="text-base font-bold text-white group-hover:text-amber-300 leading-snug line-clamp-2">
                    {art.title}
                  </h3>
                  <p className="text-xs text-slate-200 line-clamp-2 opacity-90">{art.summary}</p>
                </div>
              ))}

              {/* 2. जन चौतारी */}
              {janaChautariArticles.map((art) => (
                <div
                  key={art.id}
                  onClick={() => onSelectArticle(art)}
                  className="group cursor-pointer bg-white/10 hover:bg-white/15 backdrop-blur-md p-4 rounded-xl border border-white/15 transition-all space-y-3"
                >
                  <div className="flex items-center justify-between text-xs text-amber-300 font-bold">
                    <span className="flex items-center gap-1.5 bg-[#003399] text-white px-2.5 py-0.5 rounded-md text-[11px]">
                      <Users className="w-3.5 h-3.5" /> जन चौतारी
                    </span>
                    <span className="text-slate-300">{art.publishedAtBikramSambat}</span>
                  </div>
                  <div className="aspect-16/9 overflow-hidden rounded-lg">
                    <img src={art.imageUrl} alt={art.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <h3 className="text-base font-bold text-white group-hover:text-amber-300 leading-snug line-clamp-2">
                    {art.title}
                  </h3>
                  <p className="text-xs text-slate-200 line-clamp-2 opacity-90">{art.summary}</p>
                </div>
              ))}

              {/* 3. नागरिक रिपोर्ट */}
              {nagarikReportArticles.map((art) => (
                <div
                  key={art.id}
                  onClick={() => onSelectArticle(art)}
                  className="group cursor-pointer bg-white/10 hover:bg-white/15 backdrop-blur-md p-4 rounded-xl border border-white/15 transition-all space-y-3"
                >
                  <div className="flex items-center justify-between text-xs text-amber-300 font-bold">
                    <span className="flex items-center gap-1.5 bg-emerald-700 text-white px-2.5 py-0.5 rounded-md text-[11px]">
                      <FileText className="w-3.5 h-3.5" /> नागरिक रिपोर्ट
                    </span>
                    <span className="text-slate-300">{art.publishedAtBikramSambat}</span>
                  </div>
                  <div className="aspect-16/9 overflow-hidden rounded-lg">
                    <img src={art.imageUrl} alt={art.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <h3 className="text-base font-bold text-white group-hover:text-amber-300 leading-snug line-clamp-2">
                    {art.title}
                  </h3>
                  <p className="text-xs text-slate-200 line-clamp-2 opacity-90">{art.summary}</p>
                </div>
              ))}

              {/* 4. खोजी हाम्रो, उत्तर तपाईंको */}
              {khojiHamroArticles.map((art) => (
                <div
                  key={art.id}
                  onClick={() => onSelectArticle(art)}
                  className="group cursor-pointer bg-white/10 hover:bg-white/15 backdrop-blur-md p-4 rounded-xl border border-white/15 transition-all space-y-3"
                >
                  <div className="flex items-center justify-between text-xs text-amber-300 font-bold">
                    <span className="flex items-center gap-1.5 bg-purple-700 text-white px-2.5 py-0.5 rounded-md text-[11px]">
                      <Search className="w-3.5 h-3.5" /> खोजी हाम्रो, उत्तर तपाईंको
                    </span>
                    <span className="text-slate-300">{art.publishedAtBikramSambat}</span>
                  </div>
                  <div className="aspect-16/9 overflow-hidden rounded-lg">
                    <img src={art.imageUrl} alt={art.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <h3 className="text-base font-bold text-white group-hover:text-amber-300 leading-snug line-clamp-2">
                    {art.title}
                  </h3>
                  <p className="text-xs text-slate-200 line-clamp-2 opacity-90">{art.summary}</p>
                </div>
              ))}
            </div>
          </section>

          {/* POLITICS BLOCK */}
          {politicsArticles.length > 0 && (
            <section className="space-y-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <h2 className="text-xl font-bold text-slate-900 border-l-4 border-[#1E3A8A] pl-3 font-serif">
                  राजनीति (Politics)
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {politicsArticles.map((art) => (
                  <div
                    key={art.id}
                    onClick={() => onSelectArticle(art)}
                    className="group cursor-pointer space-y-2 bg-slate-50 p-3 rounded-xl border border-slate-100 hover:shadow-sm transition-all"
                  >
                    <div className="aspect-16/10 overflow-hidden rounded-lg">
                      <img src={art.imageUrl} alt={art.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    </div>
                    <h3 className="text-sm font-bold text-slate-800 group-hover:text-[#1E3A8A] leading-snug line-clamp-2 font-serif">
                      {art.title}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2">{art.summary}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* REGIONAL / PROVINCE NEWS WITH FILTER */}
          <section className="space-y-4 bg-slate-50 p-5 rounded-2xl border border-slate-200">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
              <h2 className="text-xl font-bold text-slate-900 border-l-4 border-[#DC2626] pl-3 font-serif flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#DC2626]" /> प्रदेश/स्थानीय समाचार
              </h2>

              <select
                value={selectedProvince}
                onChange={(e) => onSelectProvince(e.target.value)}
                className="bg-white border border-slate-300 text-slate-800 text-xs font-bold rounded-lg px-3 py-1.5 outline-none"
              >
                {PROVINCES.map(p => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {societyArticles.map((art) => (
                <div
                  key={art.id}
                  onClick={() => onSelectArticle(art)}
                  className="bg-white p-3.5 rounded-xl border border-slate-200 cursor-pointer group hover:shadow-sm space-y-1.5"
                >
                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-500">
                    <span className="text-[#DC2626]">{art.province || 'प्रदेश समाचार'}</span>
                    <span>{art.location}</span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#1E3A8A] line-clamp-2 font-serif">
                    {art.title}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2">{art.summary}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ECONOMY & MARKET BLOCK */}
          {economyArticles.length > 0 && (
            <section className="space-y-4 bg-white p-5 rounded-2xl border border-slate-200">
              <h2 className="text-xl font-bold text-slate-900 border-l-4 border-[#1E3A8A] pl-3 font-serif">
                अर्थतन्त्र र वैदेशिक व्यापार (Economy)
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {economyArticles.map((art) => (
                  <div
                    key={art.id}
                    onClick={() => onSelectArticle(art)}
                    className="group cursor-pointer space-y-2 bg-slate-50 p-3 rounded-xl border border-slate-100 hover:shadow-sm"
                  >
                    <div className="aspect-16/10 overflow-hidden rounded-lg">
                      <img src={art.imageUrl} alt={art.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    </div>
                    <h3 className="text-sm font-bold text-slate-800 group-hover:text-blue-700 line-clamp-2 font-serif">
                      {art.title}
                    </h3>
                  </div>
                ))}
              </div>
            </section>
          )}

        </div>

        {/* Right 4 Columns: Sidebar Ads & Trending Section */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* RIGHT SIDEBAR AD SLOT 1 (300x250) */}
          <AdBanner ads={sidebar1Ads} slotName="Right Sidebar Ad 1 (300x250)" layout="rectangle" />

          {/* TRENDING ARTICLES (चर्चामा) */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-4">
            <h3 className="text-lg font-bold text-slate-900 border-l-4 border-[#DC2626] pl-3 flex items-center gap-2 font-serif">
              <TrendingUp className="w-5 h-5 text-[#DC2626]" />
              चर्चामा (Trending Stories)
            </h3>

            <div className="space-y-3">
              {trendingList.map((art, index) => (
                <div
                  key={art.id}
                  onClick={() => onSelectArticle(art)}
                  className="flex items-start gap-3 cursor-pointer group pb-3 border-b border-slate-100 last:border-0 last:pb-0"
                >
                  <span className="text-2xl font-black text-[#1E3A8A] font-serif shrink-0 w-6">
                    #{index + 1}
                  </span>
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-slate-800 group-hover:text-[#DC2626] leading-snug line-clamp-2">
                      {art.title}
                    </h4>
                    <span className="text-[10px] text-slate-400">
                      {art.viewsCount.toLocaleString('ne-NP')} पटक पढिएको
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT SIDEBAR AD SLOT 2 (TALL SKYSCRAPER 300x600) */}
          <AdBanner ads={sidebar2Ads} slotName="Right Sidebar Ad 2 Skyscraper (300x600)" layout="skyscraper" />

        </div>

      </div>

      {/* 4. PRE-FOOTER SPONSORSHIP BANNER (AD SLOT 8) */}
      <div className="w-full pt-4">
        <AdBanner ads={preFooterAds} slotName="Pre-Footer Sponsorship (1200x140)" layout="landscape" />
      </div>

    </div>
  );
};
