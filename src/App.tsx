import React, { useState, useEffect } from 'react';
import { testFirestoreConnection } from './lib/firebase';
import { Header } from './components/Header';
import { BreakingNewsTicker } from './components/BreakingNewsTicker';
import { NewsGrid } from './components/NewsGrid';
import { NewsDetailModal } from './components/NewsDetailModal';
import { CitizenReporterModal } from './components/CitizenReporterModal';
import { AdminPanel } from './components/AdminPanel';
import { TeamPage } from './components/TeamPage';
import { Footer } from './components/Footer';
import { AdBanner } from './components/AdBanner';
import { 
  Article, 
  AdBanner as AdBannerType, 
  TeamMember, 
  CategoryItem, 
  CategoryType, 
  CitizenReporter,
  LogoSettings
} from './types';

export default function App() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [ads, setAds] = useState<AdBannerType[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [logoSettings, setLogoSettings] = useState<LogoSettings | undefined>(undefined);

  const [selectedCategory, setSelectedCategory] = useState<string>('मुख्य समाचार');
  const [selectedProvince, setSelectedProvince] = useState<string>('सबै प्रदेश');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals state
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);
  const [citizenModalOpen, setCitizenModalOpen] = useState<boolean>(false);
  const [adminPanelOpen, setAdminPanelOpen] = useState<boolean>(false);

  // Fetch Data from Server
  const loadPortalData = async () => {
    try {
      const [newsRes, adsRes, teamRes, categoriesRes, logoRes] = await Promise.all([
        fetch('/api/news'),
        fetch('/api/ads'),
        fetch('/api/team'),
        fetch('/api/categories'),
        fetch('/api/settings/logo')
      ]);

      const newsData = await newsRes.json();
      const adsData = await adsRes.json();
      const teamData = await teamRes.json();
      const categoriesData = await categoriesRes.json();
      const logoData = await logoRes.json();

      if (newsData.success) setArticles(newsData.data);
      if (adsData.success) setAds(adsData.data);
      if (teamData.success) setTeamMembers(teamData.data);
      if (categoriesData.success) setCategories(categoriesData.data);
      if (logoData.success) setLogoSettings(logoData.data);
    } catch (e) {
      console.error('Failed to load portal data:', e);
    }
  };

  useEffect(() => {
    testFirestoreConnection();
    loadPortalData();
  }, []);

  // Filter Articles according to Category, Search, Province
  const filteredArticles = articles.filter((art) => {
    if (selectedCategory !== 'मुख्य समाचार' && selectedCategory !== 'हाम्रो टोली') {
      if (art.category !== selectedCategory) return false;
    }

    if (selectedProvince !== 'सबै प्रदेश') {
      if (art.province !== selectedProvince) return false;
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = art.title.toLowerCase().includes(q);
      const matchSummary = art.summary.toLowerCase().includes(q);
      const matchContent = art.content.toLowerCase().includes(q);
      if (!matchTitle && !matchSummary && !matchContent) return false;
    }

    return true;
  });

  const breakingArticles = articles.filter(a => a.isBreaking);
  const floatingBottomAds = ads.filter(a => a.placementSlot === 'BOTTOM_STICKY_FLOATING' && a.isActive);

  // CMS Admin Handlers
  const handleUpdateArticleStatus = async (id: string, status: Article['status']) => {
    try {
      await fetch(`/api/news/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      loadPortalData();
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteArticle = async (id: string) => {
    try {
      await fetch(`/api/news/${id}`, { method: 'DELETE' });
      loadPortalData();
    } catch (e) {
      console.error(e);
    }
  };

  const handleSaveNewArticle = async (newArt: Partial<Article>) => {
    try {
      await fetch('/api/news', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newArt),
      });
      loadPortalData();
    } catch (e) {
      console.error(e);
    }
  };

  const handleUpdateAdSlot = async (updatedAd: AdBannerType) => {
    try {
      await fetch(`/api/ads/${updatedAd.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedAd),
      });
      loadPortalData();
    } catch (e) {
      console.error(e);
    }
  };

  const handleSaveTeamMember = async (newMember: Partial<TeamMember>) => {
    try {
      await fetch('/api/team', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMember),
      });
      loadPortalData();
    } catch (e) {
      console.error(e);
    }
  };

  const handleSaveCategory = async (newCat: Partial<CategoryItem>) => {
    try {
      await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCat),
      });
      loadPortalData();
    } catch (e) {
      console.error(e);
    }
  };

  const handleUpdateCategory = async (updatedCat: CategoryItem) => {
    try {
      await fetch(`/api/categories/${updatedCat.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedCat),
      });
      loadPortalData();
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteCategory = async (id: string) => {
    try {
      await fetch(`/api/categories/${id}`, { method: 'DELETE' });
      loadPortalData();
    } catch (e) {
      console.error(e);
    }
  };

  const handleReorderCategories = async (categoryIds: string[]) => {
    try {
      await fetch('/api/categories/reorder', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ categoryIds }),
      });
      loadPortalData();
    } catch (e) {
      console.error(e);
    }
  };

  const handleUpdateLogoSettings = async (newSettings: LogoSettings) => {
    try {
      const res = await fetch('/api/settings/logo', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSettings),
      });
      const data = await res.json();
      if (data.success) {
        setLogoSettings(data.data);
      }
    } catch (e) {
      console.error('Failed to update logo settings:', e);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans flex flex-col selection:bg-red-200 selection:text-red-900">
      
      {/* Top Header & Navigation Bar */}
      <Header
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          setSearchQuery('');
        }}
        onOpenCitizenPortal={() => setCitizenModalOpen(true)}
        onOpenAdminPanel={() => setAdminPanelOpen(true)}
        onSearch={(query) => setSearchQuery(query)}
        ads={ads}
        logoSettings={logoSettings}
      />

      {/* Real-Time Breaking News Ticker Bar */}
      {breakingArticles.length > 0 && (
        <BreakingNewsTicker
          breakingArticles={breakingArticles}
          onSelectArticle={(art) => setActiveArticle(art)}
        />
      )}

      {/* Main Body View */}
      <main className="flex-1 pb-16">
        {selectedCategory === 'हाम्रो टोली' ? (
          <TeamPage teamMembers={teamMembers} />
        ) : (
          <NewsGrid
            articles={filteredArticles}
            onSelectArticle={(art) => setActiveArticle(art)}
            ads={ads}
            selectedProvince={selectedProvince}
            onSelectProvince={(prov) => setSelectedProvince(prov)}
          />
        )}
      </main>

      {/* Bottom Sticky Floating Banner Ad (Ad Slot 7) */}
      <AdBanner ads={floatingBottomAds} slotName="Bottom Sticky Floating" layout="floating" />

      {/* Footer */}
      <Footer
        categories={categories}
        onSelectCategory={(cat) => setSelectedCategory(cat)}
        onOpenCitizenPortal={() => setCitizenModalOpen(true)}
        onOpenAdminPanel={() => setAdminPanelOpen(true)}
        logoSettings={logoSettings}
      />

      {/* Professional News Detail Modal View */}
      <NewsDetailModal
        article={activeArticle}
        onClose={() => setActiveArticle(null)}
        ads={ads}
        onSelectRelatedArticle={(art) => setActiveArticle(art)}
        allArticles={articles}
      />

      {/* Citizen Reporter Registration & News Submission Portal */}
      <CitizenReporterModal
        isOpen={citizenModalOpen}
        onClose={() => setCitizenModalOpen(false)}
        onReporterRegistered={(rep) => {
          loadPortalData();
        }}
        onArticleSubmitted={() => {
          loadPortalData();
        }}
      />

      {/* Custom CMS Admin Panel & Gemini AI Verifier */}
      <AdminPanel
        isOpen={adminPanelOpen}
        onClose={() => setAdminPanelOpen(false)}
        articles={articles}
        ads={ads}
        teamMembers={teamMembers}
        categories={categories}
        reporters={[]}
        logoSettings={logoSettings}
        onUpdateLogoSettings={handleUpdateLogoSettings}
        onUpdateArticleStatus={handleUpdateArticleStatus}
        onDeleteArticle={handleDeleteArticle}
        onSaveNewArticle={handleSaveNewArticle}
        onUpdateAdSlot={handleUpdateAdSlot}
        onSaveTeamMember={handleSaveTeamMember}
        onSaveCategory={handleSaveCategory}
        onUpdateCategory={handleUpdateCategory}
        onDeleteCategory={handleDeleteCategory}
        onReorderCategories={handleReorderCategories}
        onRefreshData={loadPortalData}
      />

    </div>
  );
}
