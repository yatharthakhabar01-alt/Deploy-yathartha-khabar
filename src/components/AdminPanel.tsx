import React, { useState, useEffect } from 'react';
import { Article, AdBanner, TeamMember, CategoryItem, AIAuditReport, CitizenReporter, LogoSettings } from '../types';
import { BrandLogo } from './BrandLogo';
import { 
  ShieldCheck, 
  Sparkles, 
  FileText, 
  CheckCircle2, 
  XCircle, 
  Plus, 
  Trash2, 
  Edit, 
  Layers, 
  Users, 
  TrendingUp, 
  BarChart3, 
  Search, 
  X, 
  Eye, 
  EyeOff,
  Bot, 
  AlertTriangle, 
  FileCheck2, 
  ShieldAlert,
  Settings,
  Image,
  RefreshCw,
  ExternalLink,
  ArrowUp,
  ArrowDown,
  FolderPlus,
  ToggleLeft,
  ToggleRight,
  Menu,
  Palette,
  Sliders,
  RotateCcw,
  Upload,
  Type,
  Check
} from 'lucide-react';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  articles: Article[];
  ads: AdBanner[];
  teamMembers: TeamMember[];
  categories: CategoryItem[];
  reporters: CitizenReporter[];
  logoSettings?: LogoSettings;
  onUpdateLogoSettings?: (settings: LogoSettings) => Promise<void>;
  onUpdateArticleStatus: (id: string, status: Article['status']) => void;
  onDeleteArticle: (id: string) => void;
  onSaveNewArticle: (art: Partial<Article>) => void;
  onUpdateAdSlot: (ad: AdBanner) => void;
  onSaveTeamMember: (member: Partial<TeamMember>) => void;
  onSaveCategory: (cat: Partial<CategoryItem>) => void;
  onUpdateCategory: (cat: CategoryItem) => void;
  onDeleteCategory: (id: string) => void;
  onReorderCategories: (categoryIds: string[]) => void;
  onRefreshData: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  isOpen,
  onClose,
  articles,
  ads,
  teamMembers,
  categories,
  reporters,
  logoSettings,
  onUpdateLogoSettings,
  onUpdateArticleStatus,
  onDeleteArticle,
  onSaveNewArticle,
  onUpdateAdSlot,
  onSaveTeamMember,
  onSaveCategory,
  onUpdateCategory,
  onDeleteCategory,
  onReorderCategories,
  onRefreshData,
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'APPROVAL' | 'AI_DETECTOR' | 'CMS_NEW' | 'CATEGORIES_MANAGER' | 'ADS_MANAGER' | 'TEAM_MANAGER' | 'LOGO_MANAGER' | 'STATS'>('APPROVAL');
  const [adminSidebarOpen, setAdminSidebarOpen] = useState(false);

  // Logo Control System Form State
  const [logoForm, setLogoForm] = useState<LogoSettings>({
    logoType: logoSettings?.logoType || 'IMAGE',
    logoImageUrl: logoSettings?.logoImageUrl || '/logo.svg',
    primaryText: logoSettings?.primaryText || 'यथार्थ',
    secondaryText: logoSettings?.secondaryText || 'खबर',
    sloganText: logoSettings?.sloganText || '',
    primaryColor: logoSettings?.primaryColor || '#003399',
    secondaryColor: logoSettings?.secondaryColor || '#C8102E',
    logoHeightPx: logoSettings?.logoHeightPx || 56,
    showSlogan: logoSettings?.showSlogan === true,
    borderStyle: logoSettings?.borderStyle || 'NONE'
  });

  useEffect(() => {
    if (logoSettings) {
      setLogoForm(logoSettings);
    }
  }, [logoSettings]);

  const [savingLogo, setSavingLogo] = useState(false);
  const [logoSuccessMsg, setLogoSuccessMsg] = useState('');

  const handleLogoImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoForm(prev => ({
          ...prev,
          logoType: 'IMAGE',
          logoImageUrl: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveLogoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingLogo(true);
    setLogoSuccessMsg('');
    try {
      if (onUpdateLogoSettings) {
        await onUpdateLogoSettings(logoForm);
      } else {
        await fetch('/api/settings/logo', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(logoForm)
        });
        if (onRefreshData) onRefreshData();
      }
      setLogoSuccessMsg('पोर्टलको लोगो र ब्रान्डिङ सफलतापूर्वक अद्यावधिक भयो!');
      setTimeout(() => setLogoSuccessMsg(''), 4000);
    } catch (err) {
      console.error('Failed to save logo settings:', err);
    } finally {
      setSavingLogo(false);
    }
  };
  
  // Selected Article for AI Verification Modal / Drawer
  const [inspectArticle, setInspectArticle] = useState<Article | null>(null);
  const [aiAnalyzing, setAiAnalyzing] = useState(false);
  const [aiReportData, setAiReportData] = useState<AIAuditReport | null>(null);

  // New Article Form
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<any>('राजनीति');
  const [newSummary, setNewSummary] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newImage, setNewImage] = useState('https://images.unsplash.com/photo-1541872703-74c5e44368f9?q=80&w=1000&auto=format&fit=crop');
  const [newAuthor, setNewAuthor] = useState('सुनिता श्रेष्ठ (प्रधान सम्पादक)');
  const [isBreaking, setIsBreaking] = useState(false);
  const [isFeatured, setIsFeatured] = useState(true);

  // Edit Ad Form
  const [editingAd, setEditingAd] = useState<AdBanner | null>(null);

  // New Team Member Form
  const [newTeamName, setNewTeamName] = useState('');
  const [newTeamDesignation, setNewTeamDesignation] = useState('');
  const [newTeamDept, setNewTeamDept] = useState('सम्पादकीय मण्डल');
  const [newTeamPhoto, setNewTeamPhoto] = useState('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop');

  // Category Control System State
  const [newCatNameNepali, setNewCatNameNepali] = useState('');
  const [newCatSlug, setNewCatSlug] = useState('');
  const [newCatIsActive, setNewCatIsActive] = useState(true);
  const [editingCat, setEditingCat] = useState<CategoryItem | null>(null);

  // Trigger Gemini AI News Verification & AI Detector Endpoint
  const handleRunAiAudit = async (article: Article) => {
    setInspectArticle(article);
    setAiAnalyzing(true);
    setAiReportData(null);

    try {
      const res = await fetch('/api/ai/verify-news', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          articleId: article.id,
          title: article.title,
          content: article.content,
          summary: article.summary,
          category: article.category,
          imageBase64: null
        }),
      });

      const data = await res.json();
      if (data.success) {
        setAiReportData(data.data);
        onRefreshData();
      }
    } catch (e) {
      console.error('AI audit call failed:', e);
    } finally {
      setAiAnalyzing(false);
    }
  };

  // Submit New CMS Article
  const handleCreateArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newContent) return;

    onSaveNewArticle({
      title: newTitle,
      category: newCategory,
      summary: newSummary || newContent.slice(0, 150),
      content: newContent,
      imageUrl: newImage,
      authorName: newAuthor,
      isBreaking,
      isFeatured,
      status: 'PUBLISHED'
    });

    setNewTitle('');
    setNewSummary('');
    setNewContent('');
    setActiveTab('APPROVAL');
  };

  const handleUpdateAdSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingAd) {
      onUpdateAdSlot(editingAd);
      setEditingAd(null);
    }
  };

  const handleCreateTeamSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTeamName || !newTeamDesignation) return;
    onSaveTeamMember({
      nameNepali: newTeamName,
      nameEnglish: 'Journalist',
      designation: newTeamDesignation,
      department: newTeamDept,
      photoUrl: newTeamPhoto,
      email: 'team@yatharthakhabar.com',
      bio: 'यथार्थ खबर सम्पादकीय मण्डल सदस्य।'
    });
    setNewTeamName('');
    setNewTeamDesignation('');
  };

  // Create Category Handler
  const handleCreateCategorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatNameNepali.trim()) return;

    onSaveCategory({
      nameNepali: newCatNameNepali.trim() as any,
      slug: newCatSlug.trim() || newCatNameNepali.trim().toLowerCase().replace(/\s+/g, '-'),
      isActive: newCatIsActive,
      displayOrder: categories.length + 1
    });

    setNewCatNameNepali('');
    setNewCatSlug('');
    setNewCatIsActive(true);
  };

  // Move Category Up / Down in Order
  const handleMoveCategory = (index: number, direction: 'UP' | 'DOWN') => {
    const targetIndex = direction === 'UP' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= categories.length) return;

    const newCats = [...categories];
    const temp = newCats[index];
    newCats[index] = newCats[targetIndex];
    newCats[targetIndex] = temp;

    const reorderedIds = newCats.map(c => c.id);
    onReorderCategories(reorderedIds);
  };

  // Published & Pending Stats
  const publishedCount = articles.filter(a => a.status === 'PUBLISHED').length;
  const pendingCount = articles.filter(a => a.status === 'PENDING_AI_VERIFICATION').length;
  const totalViews = articles.reduce((acc, curr) => acc + (curr.viewsCount || 0), 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/85 backdrop-blur-xs flex justify-center items-center p-2 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-slate-900 text-slate-100 w-full max-w-7xl rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[92vh] border border-slate-700">
        
        {/* Admin Header Bar */}
        <div className="bg-slate-950 px-4 sm:px-6 py-3 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            {/* Mobile Sidebar Toggle Button */}
            <button
              onClick={() => setAdminSidebarOpen(!adminSidebarOpen)}
              className="lg:hidden p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200"
              title="एडमिन मेनू (Toggle Sidebar)"
            >
              <Menu className="w-5 h-5 text-amber-400" />
            </button>

            <div className="bg-[#DC2626] p-2 rounded-xl text-white shadow-md shrink-0">
              <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <h2 className="text-base sm:text-xl font-bold text-white font-serif flex items-center gap-2">
                यथार्थ खबर CMS & AI सम्पादक प्यानल
              </h2>
              <p className="text-[11px] sm:text-xs text-slate-400 hidden sm:block">
                Custom Content Management System, AI Verifier & Multi-Slot Ad Manager
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onRefreshData}
              className="hidden sm:flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs px-3 py-1.5 rounded-lg border border-slate-700"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>डाटा रिफ्रेस</span>
            </button>
            <button onClick={onClose} className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Outer Flex Container for Sidebar + Main Area */}
        <div className="flex flex-1 overflow-hidden relative">
          
          {/* Mobile Overlay Backdrop */}
          {adminSidebarOpen && (
            <div 
              className="fixed inset-0 bg-black/70 z-40 lg:hidden backdrop-blur-xs"
              onClick={() => setAdminSidebarOpen(false)}
            />
          )}

          {/* LEFT ADMIN SIDEBAR MENU */}
          <aside
            className={`
              absolute lg:relative inset-y-0 left-0 z-50 w-72 bg-slate-950 border-r border-slate-800 flex flex-col shrink-0 transition-transform duration-300 ease-in-out
              ${adminSidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full lg:translate-x-0'}
            `}
          >
            {/* Admin User Profile Card */}
            <div className="p-4 border-b border-slate-800/80 bg-slate-900/60 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-red-600 text-white font-bold flex items-center justify-center border-2 border-red-400 shadow-sm text-sm">
                  सु
                </div>
                <div>
                  <div className="font-bold text-xs text-white">सुनिता श्रेष्ठ</div>
                  <div className="text-[10px] text-amber-400 font-medium">प्रधान सम्पादक (Chief Editor)</div>
                </div>
              </div>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" title="System Active" />
            </div>

            {/* Navigation Menu Links */}
            <div className="flex-1 overflow-y-auto p-3 space-y-1 text-xs font-bold">
              <div className="text-[10px] uppercase tracking-wider text-slate-500 px-3 pt-2 pb-1 font-mono">
                मुख्य सम्पादकीय मेनु
              </div>

              <button
                onClick={() => { setActiveTab('APPROVAL'); setAdminSidebarOpen(false); }}
                className={`w-full p-2.5 rounded-xl transition-all flex items-center justify-between ${
                  activeTab === 'APPROVAL'
                    ? 'bg-[#DC2626] text-white shadow-md font-bold'
                    : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <FileCheck2 className={`w-4 h-4 ${activeTab === 'APPROVAL' ? 'text-white' : 'text-emerald-400'}`} />
                  <span>समाचार स्वीकृति & सूची</span>
                </div>
                <span className="bg-slate-900/80 text-white text-[10px] px-2 py-0.5 rounded-full border border-slate-700">
                  {articles.length}
                </span>
              </button>

              <button
                onClick={() => { setActiveTab('AI_DETECTOR'); setAdminSidebarOpen(false); }}
                className={`w-full p-2.5 rounded-xl transition-all flex items-center justify-between ${
                  activeTab === 'AI_DETECTOR'
                    ? 'bg-[#DC2626] text-white shadow-md font-bold'
                    : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Bot className={`w-4 h-4 ${activeTab === 'AI_DETECTOR' ? 'text-white' : 'text-purple-400 animate-pulse'}`} />
                  <span>एआई फ्याक्ट चेकर</span>
                </div>
                {pendingCount > 0 && (
                  <span className="bg-amber-500 text-black font-extrabold text-[10px] px-2 py-0.5 rounded-full">
                    {pendingCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => { setActiveTab('CMS_NEW'); setAdminSidebarOpen(false); }}
                className={`w-full p-2.5 rounded-xl transition-all flex items-center justify-between ${
                  activeTab === 'CMS_NEW'
                    ? 'bg-[#DC2626] text-white shadow-md font-bold'
                    : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Plus className={`w-4 h-4 ${activeTab === 'CMS_NEW' ? 'text-white' : 'text-amber-400'}`} />
                  <span>नयाँ समाचार पोस्ट गर्नुहोस्</span>
                </div>
              </button>

              <div className="text-[10px] uppercase tracking-wider text-slate-500 px-3 pt-4 pb-1 font-mono">
                पोर्टल व्यवस्थापन (Management)
              </div>

              <button
                onClick={() => { setActiveTab('CATEGORIES_MANAGER'); setAdminSidebarOpen(false); }}
                className={`w-full p-2.5 rounded-xl transition-all flex items-center justify-between ${
                  activeTab === 'CATEGORIES_MANAGER'
                    ? 'bg-[#DC2626] text-white shadow-md font-bold'
                    : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Layers className={`w-4 h-4 ${activeTab === 'CATEGORIES_MANAGER' ? 'text-white' : 'text-emerald-400'}`} />
                  <span>वर्ग व्यवस्थापन (Categories)</span>
                </div>
                <span className="bg-slate-900/80 text-emerald-400 text-[10px] px-2 py-0.5 rounded-full border border-slate-700 font-bold">
                  {categories.filter(c => c.isActive).length}
                </span>
              </button>

              <button
                onClick={() => { setActiveTab('ADS_MANAGER'); setAdminSidebarOpen(false); }}
                className={`w-full p-2.5 rounded-xl transition-all flex items-center justify-between ${
                  activeTab === 'ADS_MANAGER'
                    ? 'bg-[#DC2626] text-white shadow-md font-bold'
                    : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <BarChart3 className={`w-4 h-4 ${activeTab === 'ADS_MANAGER' ? 'text-white' : 'text-sky-400'}`} />
                  <span>विज्ञापन व्यवस्थापन (7 Slots)</span>
                </div>
                <span className="bg-slate-900/80 text-sky-300 text-[10px] px-2 py-0.5 rounded-full border border-slate-700">
                  {ads.length}
                </span>
              </button>

              <button
                onClick={() => { setActiveTab('TEAM_MANAGER'); setAdminSidebarOpen(false); }}
                className={`w-full p-2.5 rounded-xl transition-all flex items-center justify-between ${
                  activeTab === 'TEAM_MANAGER'
                    ? 'bg-[#DC2626] text-white shadow-md font-bold'
                    : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Users className={`w-4 h-4 ${activeTab === 'TEAM_MANAGER' ? 'text-white' : 'text-pink-400'}`} />
                  <span>सम्पादकीय टोली (Team)</span>
                </div>
                <span className="bg-slate-900/80 text-pink-300 text-[10px] px-2 py-0.5 rounded-full border border-slate-700">
                  {teamMembers.length}
                </span>
              </button>

              <button
                onClick={() => { setActiveTab('LOGO_MANAGER'); setAdminSidebarOpen(false); }}
                className={`w-full p-2.5 rounded-xl transition-all flex items-center justify-between ${
                  activeTab === 'LOGO_MANAGER'
                    ? 'bg-[#DC2626] text-white shadow-md font-bold'
                    : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Palette className={`w-4 h-4 ${activeTab === 'LOGO_MANAGER' ? 'text-white' : 'text-amber-400'}`} />
                  <span>लोगो नियन्त्रण (Logo Control)</span>
                </div>
                <span className="bg-amber-500/20 text-amber-300 text-[10px] px-2 py-0.5 rounded-full border border-amber-500/30 font-mono">
                  {logoForm.logoType}
                </span>
              </button>

              <button
                onClick={() => { setActiveTab('STATS'); setAdminSidebarOpen(false); }}
                className={`w-full p-2.5 rounded-xl transition-all flex items-center justify-between ${
                  activeTab === 'STATS'
                    ? 'bg-[#DC2626] text-white shadow-md font-bold'
                    : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <TrendingUp className={`w-4 h-4 ${activeTab === 'STATS' ? 'text-white' : 'text-amber-400'}`} />
                  <span>पोर्टल विश्लेषिकी (Analytics)</span>
                </div>
              </button>

            </div>

            {/* Sidebar Bottom Footer Info */}
            <div className="p-3 border-t border-slate-800 bg-slate-900/40 text-[11px] text-slate-400 flex items-center justify-between">
              <span className="flex items-center gap-1 text-slate-300 font-mono">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                CMS v2.4 Safe
              </span>
              <button onClick={onClose} className="text-red-400 hover:underline">
                निष्क्रमण
              </button>
            </div>
          </aside>

          {/* MAIN CONTENT AREA */}
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 bg-slate-900">
            
            {/* Top Metrics Row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700 flex items-center gap-3">
                <FileText className="w-7 h-7 text-blue-400 shrink-0" />
                <div>
                  <div className="text-slate-400 text-[11px]">प्रकाशित समाचार</div>
                  <div className="text-lg font-black text-white">{publishedCount} वटा</div>
                </div>
              </div>

              <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700 flex items-center gap-3">
                <Bot className="w-7 h-7 text-amber-400 shrink-0" />
                <div>
                  <div className="text-slate-400 text-[11px]">एआई समीक्षणाधिन</div>
                  <div className="text-lg font-black text-amber-400">{pendingCount} वटा</div>
                </div>
              </div>

              <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700 flex items-center gap-3">
                <Eye className="w-7 h-7 text-emerald-400 shrink-0" />
                <div>
                  <div className="text-slate-400 text-[11px]">कुल पाठक / रिडर्स</div>
                  <div className="text-lg font-black text-white">{totalViews.toLocaleString('ne-NP')}</div>
                </div>
              </div>

              <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700 flex items-center gap-3">
                <BarChart3 className="w-7 h-7 text-purple-400 shrink-0" />
                <div>
                  <div className="text-slate-400 text-[11px]">विज्ञापन स्लटहरू</div>
                  <div className="text-lg font-black text-purple-300">{ads.length} स्लट</div>
                </div>
              </div>
            </div>
          
          {/* 1. APPROVAL & CMS LIST */}
          {activeTab === 'APPROVAL' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-400" />
                  सबै समाचार तथा नागरिक रिपोर्टिङ सूची
                </h3>
                <span className="text-xs text-slate-400">स्वीकृत गर्न 'प्रकाशित गर्नुहोस्' थिच्नुहोस्</span>
              </div>

              <div className="space-y-3">
                {articles.map((art) => (
                  <div 
                    key={art.id} 
                    className="bg-slate-800/80 border border-slate-700 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-start gap-3 flex-1 overflow-hidden">
                      <img src={art.imageUrl} alt={art.title} className="w-16 h-16 rounded-lg object-cover shrink-0 border border-slate-700" />
                      <div className="space-y-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="bg-[#DC2626] text-white text-[10px] font-bold px-2 py-0.5 rounded">
                            {art.category}
                          </span>
                          {art.submittedByCitizen && (
                            <span className="bg-amber-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                              नागरिक रिपोर्ट
                            </span>
                          )}
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                            art.status === 'PUBLISHED' ? 'bg-emerald-900/80 text-emerald-300' : 'bg-amber-900/80 text-amber-300'
                          }`}>
                            {art.status === 'PUBLISHED' ? 'प्रकाशित' : 'समीक्षा बाँकी'}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-white truncate">{art.title}</h4>
                        <p className="text-xs text-slate-400">{art.authorName} • {art.publishedAtBikramSambat}</p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2 shrink-0 flex-wrap w-full sm:w-auto justify-end">
                      <button
                        onClick={() => handleRunAiAudit(art)}
                        className="bg-purple-900/80 hover:bg-purple-800 text-purple-200 border border-purple-700 text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5"
                      >
                        <Bot className="w-4 h-4 text-purple-400" />
                        एआई जाँच
                      </button>

                      {art.status !== 'PUBLISHED' ? (
                        <button
                          onClick={() => onUpdateArticleStatus(art.id, 'PUBLISHED')}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          स्वीकृत गरी प्रकाशन
                        </button>
                      ) : (
                        <button
                          onClick={() => onUpdateArticleStatus(art.id, 'PENDING_AI_VERIFICATION')}
                          className="bg-slate-700 hover:bg-slate-600 text-slate-300 text-xs font-medium px-3 py-1.5 rounded-lg"
                        >
                          ड्राफ्टमा राख्नुहोस्
                        </button>
                      )}

                      <button
                        onClick={() => onDeleteArticle(art.id)}
                        className="p-1.5 bg-red-950 hover:bg-red-900 text-red-300 rounded-lg"
                        title="हटाउनुहोस्"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 2. AI DETECTOR & AI FACT CHECKING SYSTEM */}
          {activeTab === 'AI_DETECTOR' && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-purple-950 via-slate-900 to-slate-950 border border-purple-800/60 p-5 rounded-2xl space-y-3">
                <div className="flex items-center gap-3">
                  <Bot className="w-8 h-8 text-amber-400" />
                  <div>
                    <h3 className="text-lg font-bold text-white font-serif">
                      Gemini 3.6 Flash - AI News Detector & Fact Checker System
                    </h3>
                    <p className="text-xs text-purple-300">
                      सार्वजनिक पाठक तथा रिपोर्टरहरूले पठाएका सामग्रीको एआई टेक्स्ट डिटेक्शन (AI vs Human Probability), फोटो प्रामाणिकता, तथ्य जाँच र संवेदनशीलता समीक्षा।
                    </p>
                  </div>
                </div>
              </div>

              {/* Inspection Article Viewer */}
              {inspectArticle && (
                <div className="bg-slate-800 border border-purple-500/40 rounded-2xl p-5 space-y-4 shadow-xl">
                  <div className="flex items-center justify-between border-b border-slate-700 pb-3">
                    <span className="text-xs font-bold text-amber-400 flex items-center gap-1">
                      <Sparkles className="w-4 h-4" /> चयन गरिएको समाचारको एआई विश्लेषण:
                    </span>
                    <span className="text-xs text-slate-400">{inspectArticle.title}</span>
                  </div>

                  {aiAnalyzing ? (
                    <div className="py-12 text-center space-y-3">
                      <RefreshCw className="w-8 h-8 text-purple-400 animate-spin mx-auto" />
                      <p className="text-sm font-bold text-purple-200">
                        Gemini 3.6 Flash ले समाचारको शब्द, तस्बिर र तथ्यको गहन एआई विश्लेषण गर्दैछ...
                      </p>
                    </div>
                  ) : aiReportData ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                      
                      {/* AI Generated Probability Gauge */}
                      <div className="bg-slate-900 p-4 rounded-xl border border-slate-700 space-y-2">
                        <div className="text-slate-400 font-bold">AI Generated Text Detector</div>
                        <div className="text-3xl font-black text-amber-400">
                          {aiReportData.aiGeneratedProbability}% <span className="text-xs text-slate-400 font-normal">AI सम्भावना</span>
                        </div>
                        <p className="text-[11px] text-slate-300">
                          {aiReportData.aiGeneratedProbability < 20 ? '✅ पूर्ण रूपमा मानव पत्रकारले लेखेको सामाग्री।' : '⚠️ केही अंश एआई द्वारा सिर्जित हुन सक्ने।'}
                        </p>
                      </div>

                      {/* Fact Check Score */}
                      <div className="bg-slate-900 p-4 rounded-xl border border-slate-700 space-y-2">
                        <div className="text-slate-400 font-bold">Fact-Check Credibility</div>
                        <div className="text-3xl font-black text-emerald-400">
                          {aiReportData.authenticityScore}/100
                        </div>
                        <div className="text-[11px] text-emerald-300 font-bold">
                          स्थिति: {aiReportData.factCheckStatus}
                        </div>
                      </div>

                      {/* Content Safety & Image Score */}
                      <div className="bg-slate-900 p-4 rounded-xl border border-slate-700 space-y-2">
                        <div className="text-slate-400 font-bold">Content Safety & Photo Score</div>
                        <div className="text-3xl font-black text-sky-400">
                          {aiReportData.imageAuthenticityScore}% <span className="text-xs text-slate-400 font-normal">Photo Score</span>
                        </div>
                        <div className="text-[11px] text-sky-300 font-bold">
                          सुरक्षा स्थिति: {aiReportData.contentSafety}
                        </div>
                      </div>

                      {/* Bullet Highlights */}
                      <div className="md:col-span-3 bg-slate-900 p-4 rounded-xl border border-slate-700 space-y-2">
                        <h4 className="font-bold text-amber-300">एआई निष्कर्ष तथा मुख्य बुँदाहरू (Summary):</h4>
                        <ul className="list-disc list-inside space-y-1 text-slate-300">
                          {aiReportData.keyHighlights.map((h, i) => (
                            <li key={i}>{h}</li>
                          ))}
                        </ul>
                      </div>

                    </div>
                  ) : (
                    <div className="text-center py-6 text-slate-400">
                      'एआई जाँच सञ्चालन गर्नुहोस्' बटन थिचेर Gemini AI रिपोर्ट प्राप्त गर्नुहोस्।
                    </div>
                  )}

                </div>
              )}

              {/* List of articles to run AI inspection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {articles.map((art) => (
                  <div key={art.id} className="bg-slate-800 p-4 rounded-xl border border-slate-700 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold bg-[#DC2626] text-white px-2 py-0.5 rounded">{art.category}</span>
                      <span className="text-[10px] text-slate-400">{art.authorName}</span>
                    </div>
                    <h4 className="font-bold text-sm text-white line-clamp-1">{art.title}</h4>
                    <button
                      onClick={() => handleRunAiAudit(art)}
                      className="w-full bg-[#1E3A8A] hover:bg-blue-800 text-white text-xs font-bold py-2 rounded-lg flex items-center justify-center gap-2"
                    >
                      <Bot className="w-4 h-4 text-purple-300" />
                      यो समाचारको एआई फ्याक्ट चेकिङ गर्नुहोस्
                    </button>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* 3. NEW ARTICLE FORM (CMS EDITOR) */}
          {activeTab === 'CMS_NEW' && (
            <form onSubmit={handleCreateArticle} className="space-y-4 max-w-3xl mx-auto bg-slate-800/80 p-6 rounded-2xl border border-slate-700">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Plus className="w-5 h-5 text-amber-400" />
                नयाँ समाचार सिर्जना तथा प्रकाशन (CMS Editor)
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">समाचार वर्ग (Category)</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg p-2.5 text-sm outline-none"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.nameNepali}>{c.nameNepali}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">लेखक / पत्रकार नाम</label>
                  <input
                    type="text"
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg p-2.5 text-sm outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">समाचारको मुख्य शीर्षक (Headline in Nepali) *</label>
                <input
                  type="text"
                  placeholder="जस्तै: संसदको बजेट अधिवेशन आह्वान..."
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg p-2.5 text-sm outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">समाचारको सारांश (Summary)</label>
                <input
                  type="text"
                  placeholder="छोटो २ वाक्यको मुख्य सार..."
                  value={newSummary}
                  onChange={(e) => setNewSummary(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg p-2.5 text-sm outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">समाचारको पुरा विवरण (Content) *</label>
                <textarea
                  rows={6}
                  placeholder="समाचारको विस्तृत विवरण यहाँ लेख्नुहोस्..."
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg p-3 text-sm outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">तस्बिरको URL (Image Link)</label>
                <input
                  type="text"
                  value={newImage}
                  onChange={(e) => setNewImage(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg p-2.5 text-sm outline-none"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
                  <input
                    type="checkbox"
                    checked={isBreaking}
                    onChange={(e) => setIsBreaking(e.target.checked)}
                    className="w-4 h-4 text-red-600 rounded"
                  />
                  <span>ब्रेकिङ्ग न्यूज (Breaking News)</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
                  <input
                    type="checkbox"
                    checked={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded"
                  />
                  <span>मुख्य आकर्षण (Featured Homepage)</span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-[#DC2626] hover:bg-red-700 text-white font-bold text-sm py-3 rounded-xl shadow-md transition-colors"
              >
                समाचार तुरुन्त प्रकाशित गर्नुहोस्
              </button>

            </form>
          )}

          {/* CATEGORIES CONTROL SYSTEM PANEL */}
          {activeTab === 'CATEGORIES_MANAGER' && (
            <div className="space-y-6">
              
              {/* Top Banner & Stats */}
              <div className="bg-slate-800 p-5 rounded-2xl border border-slate-700 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <Layers className="w-5 h-5 text-emerald-400" />
                      वर्ग तथा क्याटगोरी म्यानेजमेन्ट (Category Control System)
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      वेबसाइटको मुख्य हेडर नेभिगेसन बार, फिल्टर, र CMS समाचार वर्गीकरणलाई यहाँबाट पूर्ण नियन्त्रण गर्नुहोस्।
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold">
                    <span className="bg-emerald-950 text-emerald-300 border border-emerald-800 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5" />
                      सक्रिय: {categories.filter(c => c.isActive).length}
                    </span>
                    <span className="bg-slate-900 text-slate-400 border border-slate-700 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                      <EyeOff className="w-3.5 h-3.5" />
                      निष्क्रिय: {categories.filter(c => !c.isActive).length}
                    </span>
                  </div>
                </div>

                {/* Form to Add New Category */}
                <form onSubmit={handleCreateCategorySubmit} className="bg-slate-900 p-4 rounded-xl border border-slate-700/80 space-y-3">
                  <h4 className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                    <FolderPlus className="w-4 h-4" />
                    नयाँ वर्ग सिर्जना गर्नुहोस् (Add New Category)
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                    <div className="sm:col-span-5">
                      <label className="block text-[11px] font-medium text-slate-300 mb-1">वर्गको नाम (नेपालीमा) *</label>
                      <input
                        type="text"
                        placeholder="उदा: स्वास्थ्य, अन्तर्राष्ट्रिय, कृषि, पर्यटन"
                        value={newCatNameNepali}
                        onChange={(e) => setNewCatNameNepali(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-700 text-white rounded-lg p-2 text-xs outline-none focus:border-emerald-500"
                        required
                      />
                    </div>
                    <div className="sm:col-span-4">
                      <label className="block text-[11px] font-medium text-slate-300 mb-1">URL Slug / Key</label>
                      <input
                        type="text"
                        placeholder="उदा: health, international, agriculture"
                        value={newCatSlug}
                        onChange={(e) => setNewCatSlug(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-700 text-white rounded-lg p-2 text-xs outline-none focus:border-emerald-500"
                      />
                    </div>
                    <div className="sm:col-span-3 flex items-end gap-2">
                      <button
                        type="submit"
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                        वर्ग थप्नुहोस्
                      </button>
                    </div>
                  </div>
                </form>
              </div>

              {/* Category Table List */}
              <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden">
                <div className="px-5 py-3 bg-slate-900 border-b border-slate-700 flex items-center justify-between text-xs font-bold text-slate-300">
                  <span>वर्गको नाम र अर्डर (Category Name & Display Order)</span>
                  <span>स्थिति / समाचार सङ्ख्या / एक्सन</span>
                </div>

                <div className="divide-y divide-slate-700/60 max-h-[420px] overflow-y-auto">
                  {categories.map((cat, idx) => {
                    const articleCount = articles.filter(a => a.category === cat.nameNepali).length;

                    return (
                      <div key={cat.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-750/50 transition-colors">
                        
                        {/* Left: Reorder buttons & Name */}
                        <div className="flex items-center gap-3">
                          <div className="flex flex-col gap-0.5">
                            <button
                              onClick={() => handleMoveCategory(idx, 'UP')}
                              disabled={idx === 0}
                              className="p-1 rounded bg-slate-900 hover:bg-slate-700 text-slate-300 disabled:opacity-30 disabled:hover:bg-slate-900 transition-colors"
                              title="माथि सार्नुहोस्"
                            >
                              <ArrowUp className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleMoveCategory(idx, 'DOWN')}
                              disabled={idx === categories.length - 1}
                              className="p-1 rounded bg-slate-900 hover:bg-slate-700 text-slate-300 disabled:opacity-30 disabled:hover:bg-slate-900 transition-colors"
                              title="तल सार्नुहोस्"
                            >
                              <ArrowDown className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-slate-900 border border-slate-700 text-amber-400 font-extrabold text-xs flex items-center justify-center shrink-0">
                              {cat.displayOrder || idx + 1}
                            </span>
                            <div>
                              <div className="font-bold text-sm text-white flex items-center gap-2">
                                <span>{cat.nameNepali}</span>
                                {cat.isActive ? (
                                  <span className="bg-emerald-950 text-emerald-400 text-[10px] px-2 py-0.5 rounded-full border border-emerald-800 font-medium">
                                    सक्रिय (Visible)
                                  </span>
                                ) : (
                                  <span className="bg-red-950 text-red-400 text-[10px] px-2 py-0.5 rounded-full border border-red-800 font-medium">
                                    लुकाइएको (Hidden)
                                  </span>
                                )}
                              </div>
                              <div className="text-[11px] text-slate-400 font-mono">slug: {cat.slug}</div>
                            </div>
                          </div>
                        </div>

                        {/* Right: Toggle Active / Count / Actions */}
                        <div className="flex items-center gap-3 self-end sm:self-auto">
                          
                          <span className="text-xs bg-slate-900 text-slate-300 px-2.5 py-1 rounded-lg border border-slate-700">
                            {articleCount} समाचार
                          </span>

                          <button
                            onClick={() => onUpdateCategory({ ...cat, isActive: !cat.isActive })}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                              cat.isActive
                                ? 'bg-emerald-900/60 hover:bg-emerald-800 text-emerald-200 border border-emerald-700'
                                : 'bg-slate-700 hover:bg-slate-600 text-slate-300 border border-slate-600'
                            }`}
                          >
                            {cat.isActive ? <ToggleRight className="w-4 h-4 text-emerald-400" /> : <ToggleLeft className="w-4 h-4 text-slate-400" />}
                            <span>{cat.isActive ? 'दृश्य' : 'अदृश्य'}</span>
                          </button>

                          <button
                            onClick={() => setEditingCat(cat)}
                            className="p-2 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-lg transition-colors"
                            title="वर्ग सम्पादन गर्नुहोस्"
                          >
                            <Edit className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => {
                              if (confirm(`के तपाईं '${cat.nameNepali}' वर्ग मेटाउन चाहनुहुन्छ?`)) {
                                onDeleteCategory(cat.id);
                              }
                            }}
                            className="p-2 bg-red-950/80 hover:bg-red-900 text-red-300 rounded-lg border border-red-800/80 transition-colors"
                            title="वर्ग मेटाउनुहोस्"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>

                        </div>

                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Modal to Edit Category */}
              {editingCat && (
                <div className="fixed inset-0 z-60 bg-black/75 flex items-center justify-center p-4">
                  <div className="bg-slate-900 border border-amber-500/60 rounded-2xl p-5 max-w-md w-full space-y-4 shadow-2xl">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <h4 className="font-bold text-sm text-amber-400 flex items-center gap-2">
                        <Edit className="w-4 h-4" />
                        वर्ग सम्पादन: {editingCat.nameNepali}
                      </h4>
                      <button onClick={() => setEditingCat(null)} className="text-slate-400 hover:text-white">
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="space-y-3 text-xs">
                      <div>
                        <label className="block text-slate-300 mb-1">वर्गको नाम (नेपालीमा)</label>
                        <input
                          type="text"
                          value={editingCat.nameNepali}
                          onChange={(e) => setEditingCat({ ...editingCat, nameNepali: e.target.value as any })}
                          className="w-full bg-slate-950 border border-slate-700 text-white rounded p-2 outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-300 mb-1">Slug</label>
                        <input
                          type="text"
                          value={editingCat.slug}
                          onChange={(e) => setEditingCat({ ...editingCat, slug: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-700 text-white rounded p-2 outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-300 mb-1">क्रम (Display Order)</label>
                        <input
                          type="number"
                          value={editingCat.displayOrder}
                          onChange={(e) => setEditingCat({ ...editingCat, displayOrder: parseInt(e.target.value) || 1 })}
                          className="w-full bg-slate-950 border border-slate-700 text-white rounded p-2 outline-none"
                        />
                      </div>

                      <div className="pt-2">
                        <label className="flex items-center gap-2 cursor-pointer text-slate-200 font-bold">
                          <input
                            type="checkbox"
                            checked={editingCat.isActive}
                            onChange={(e) => setEditingCat({ ...editingCat, isActive: e.target.checked })}
                            className="w-4 h-4 text-emerald-600 rounded"
                          />
                          <span>वेबसाइटमा सक्रिय (Show on Navigation Bar)</span>
                        </label>
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                      <button
                        type="button"
                        onClick={() => setEditingCat(null)}
                        className="px-3 py-1.5 bg-slate-800 text-slate-300 rounded text-xs hover:bg-slate-700"
                      >
                        रद्द गर्नुहोस्
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          onUpdateCategory(editingCat);
                          setEditingCat(null);
                        }}
                        className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded text-xs"
                      >
                        परिवर्तन सुरक्षित गर्नुहोस्
                      </button>
                    </div>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* 4. ADS MANAGER FOR ALL 7 PLACEMENTS */}
          {activeTab === 'ADS_MANAGER' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-sky-400" />
                  वेबसाइट भरिका ७ वटा विज्ञापन स्लट म्यानेजर (Ad Slot Settings)
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {ads.map((ad) => (
                  <div key={ad.id} className="bg-slate-800 p-4 rounded-xl border border-slate-700 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold bg-purple-900 text-purple-200 px-2 py-0.5 rounded">
                        {ad.placementSlot}
                      </span>
                      <span className="text-xs text-slate-400">{ad.dimensions}</span>
                    </div>

                    <div className="flex gap-3 items-center">
                      <img src={ad.imageUrl} alt={ad.title} className="w-20 h-14 object-cover rounded border border-slate-700" />
                      <div className="min-w-0 flex-1">
                        <h4 className="font-bold text-xs text-white truncate">{ad.title}</h4>
                        <p className="text-[11px] text-slate-400">{ad.advertiserName}</p>
                        <p className="text-[10px] text-emerald-400 mt-1">Impressions: {ad.impressions} • Clicks: {ad.clicks}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => setEditingAd(ad)}
                      className="w-full bg-slate-700 hover:bg-slate-600 text-white text-xs font-bold py-2 rounded-lg flex items-center justify-center gap-1.5"
                    >
                      <Settings className="w-3.5 h-3.5" />
                      यो विज्ञापन सम्पादन गर्नुहोस्
                    </button>
                  </div>
                ))}
              </div>

              {/* Edit Ad Modal Form */}
              {editingAd && (
                <form onSubmit={handleUpdateAdSubmit} className="bg-slate-800 p-5 rounded-xl border border-amber-500/50 space-y-3">
                  <h4 className="font-bold text-sm text-amber-400">विज्ञापन सम्पादन ({editingAd.placementSlot}):</h4>
                  <div>
                    <label className="block text-xs text-slate-300">विज्ञापनको शीर्षक (Title)</label>
                    <input
                      type="text"
                      value={editingAd.title}
                      onChange={(e) => setEditingAd({ ...editingAd, title: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 text-white text-xs rounded p-2"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-300">विज्ञापन ब्यानर Image URL</label>
                    <input
                      type="text"
                      value={editingAd.imageUrl}
                      onChange={(e) => setEditingAd({ ...editingAd, imageUrl: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 text-white text-xs rounded p-2"
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <button type="button" onClick={() => setEditingAd(null)} className="px-3 py-1.5 bg-slate-700 text-xs text-slate-300 rounded">रद्द</button>
                    <button type="submit" className="px-4 py-1.5 bg-emerald-600 text-xs text-white font-bold rounded">सुरक्षित गर्नुहोस्</button>
                  </div>
                </form>
              )}

            </div>
          )}

          {/* 5. TEAM MANAGEMENT */}
          {activeTab === 'TEAM_MANAGER' && (
            <div className="space-y-6">
              <form onSubmit={handleCreateTeamSubmit} className="bg-slate-800 p-5 rounded-2xl border border-slate-700 space-y-3 max-w-2xl">
                <h3 className="font-bold text-sm text-white flex items-center gap-2">
                  <Plus className="w-4 h-4 text-pink-400" />
                  नयाँ पत्रकार/सम्पादक थप्नुहोस् (Our Team Management)
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="पत्रकारको नाम (नेपालीमा)"
                    value={newTeamName}
                    onChange={(e) => setNewTeamName(e.target.value)}
                    className="bg-slate-900 border border-slate-700 text-white text-xs rounded p-2.5 outline-none"
                    required
                  />
                  <input
                    type="text"
                    placeholder="पद (Designation)"
                    value={newTeamDesignation}
                    onChange={(e) => setNewTeamDesignation(e.target.value)}
                    className="bg-slate-900 border border-slate-700 text-white text-xs rounded p-2.5 outline-none"
                    required
                  />
                </div>
                <button type="submit" className="bg-pink-600 hover:bg-pink-700 text-white text-xs font-bold px-4 py-2 rounded-lg">
                  टिम सदस्य सुरक्षित गर्नुहोस्
                </button>
              </form>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {teamMembers.map((member) => (
                  <div key={member.id} className="bg-slate-800 p-4 rounded-xl border border-slate-700 flex items-center gap-3">
                    <img src={member.photoUrl} alt={member.nameNepali} className="w-14 h-14 rounded-full object-cover border-2 border-pink-500" />
                    <div>
                      <h4 className="font-bold text-sm text-white">{member.nameNepali}</h4>
                      <p className="text-xs text-slate-300">{member.designation}</p>
                      <p className="text-[10px] text-slate-500">{member.department}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 6. LOGO CONTROL & BRANDING MANAGER */}
          {activeTab === 'LOGO_MANAGER' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              
              {/* Header Info Banner */}
              <div className="bg-slate-800/90 border border-slate-700 p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md">
                <div>
                  <h3 className="font-bold text-base text-white flex items-center gap-2">
                    <Palette className="w-5 h-5 text-amber-400" />
                    पोर्टल लोगो तथा ब्राण्डिङ नियन्त्रण प्रणाली (Logo Control Center)
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    यहाँबाट वेबसाइटको मुख्य लोगो, साइज, रङ्ग, स्लोगन तथा तस्विर लोगो बिना कुनै त्रुटि प्रत्यक्ष परिवर्तन गर्न सक्नुहुन्छ।
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono bg-slate-900 border border-slate-700 text-amber-300 px-3 py-1 rounded-full">
                    Type: {logoForm.logoType}
                  </span>
                  <span className="text-[11px] font-mono bg-slate-900 border border-slate-700 text-sky-300 px-3 py-1 rounded-full">
                    Height: {logoForm.logoHeightPx}px
                  </span>
                </div>
              </div>

              {/* Success Notification Banner */}
              {logoSuccessMsg && (
                <div className="bg-emerald-950/90 border border-emerald-500 text-emerald-200 p-4 rounded-xl flex items-center gap-3 animate-in slide-in-from-top duration-300 font-bold text-xs">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>{logoSuccessMsg}</span>
                </div>
              )}

              {/* Main 2-Column Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Left Column (Controls & Forms) - 7 cols */}
                <div className="lg:col-span-7 space-y-5">
                  
                  <form onSubmit={handleSaveLogoSubmit} className="space-y-5">
                    
                    {/* 1. Logo Mode Switcher */}
                    <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700 space-y-3">
                      <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                        १. लोगोको प्रकार छान्नुहोस् (Logo Type)
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => setLogoForm(prev => ({ ...prev, logoType: 'VECTOR' }))}
                          className={`p-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                            logoForm.logoType === 'VECTOR'
                              ? 'bg-red-600 border-red-500 text-white shadow-md'
                              : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-white'
                          }`}
                        >
                          <Palette className="w-4 h-4" />
                          <span>वेक्टर सिम्बल लोगो (SVG)</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setLogoForm(prev => ({ ...prev, logoType: 'IMAGE' }))}
                          className={`p-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                            logoForm.logoType === 'IMAGE'
                              ? 'bg-red-600 border-red-500 text-white shadow-md'
                              : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-white'
                          }`}
                        >
                          <Image className="w-4 h-4" />
                          <span>तस्विर / कस्टम लोगो (PNG/SVG)</span>
                        </button>
                      </div>
                    </div>

                    {/* 2. Custom Image Logo Controls (If IMAGE mode selected) */}
                    {logoForm.logoType === 'IMAGE' && (
                      <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700 space-y-4 animate-in fade-in duration-200">
                        <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block flex items-center gap-2">
                          <Image className="w-4 h-4 text-sky-400" />
                          २. तस्विर लोगो फाइल वा लिङ्क (Custom Image Upload & URL)
                        </label>

                        {/* File Upload Button */}
                        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
                          <label className="cursor-pointer bg-slate-900 hover:bg-slate-950 text-slate-200 hover:text-white border border-slate-700 hover:border-red-500 text-xs font-bold px-4 py-2.5 rounded-xl flex items-center justify-center gap-2 transition-colors">
                            <Upload className="w-4 h-4 text-amber-400" />
                            <span>कम्प्युटर/मोबाइलबाट तस्विर छानेर अपलोड गर्नुहोस्</span>
                            <input 
                              type="file" 
                              accept="image/*" 
                              onChange={handleLogoImageUpload} 
                              className="hidden" 
                            />
                          </label>
                        </div>

                        {/* Image URL Textbox */}
                        <div>
                          <label className="text-[11px] text-slate-400 mb-1 block font-medium">अथवा तस्विरको URL लिङ्क राख्नुहोस्:</label>
                          <input
                            type="text"
                            placeholder="https://example.com/logo.png"
                            value={logoForm.logoImageUrl}
                            onChange={(e) => setLogoForm(prev => ({ ...prev, logoImageUrl: e.target.value }))}
                            className="w-full bg-slate-900 border border-slate-700 text-white text-xs rounded-xl p-2.5 outline-none focus:border-red-500"
                          />
                        </div>

                        {/* Frame & Border Styles */}
                        <div>
                          <label className="text-[11px] font-bold text-slate-300 mb-2 block">लोगोको फ्रेम/बोर्डर स्टाइल:</label>
                          <div className="grid grid-cols-4 gap-2 text-xs">
                            {(['NONE', 'ROUNDED', 'CIRCLE', 'SHADOW'] as const).map((bStyle) => (
                              <button
                                key={bStyle}
                                type="button"
                                onClick={() => setLogoForm(prev => ({ ...prev, borderStyle: bStyle }))}
                                className={`py-2 px-2 rounded-lg border text-[11px] font-bold text-center transition-all ${
                                  logoForm.borderStyle === bStyle
                                    ? 'bg-sky-600 border-sky-400 text-white'
                                    : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-white'
                                }`}
                              >
                                {bStyle === 'NONE' && 'सादा (Plain)'}
                                {bStyle === 'ROUNDED' && 'गोलाकार बक्स'}
                                {bStyle === 'CIRCLE' && 'पूर्ण वृत्त (Circle)'}
                                {bStyle === 'SHADOW' && 'छायाँ सहित'}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* 3. Logo Height Dimension Slider */}
                    <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700 space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                          <Sliders className="w-4 h-4 text-emerald-400" />
                          ३. लोगोको उचाइ साइज मिलाउनुहोस् (Logo Height Scale)
                        </label>
                        <span className="text-xs font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-800 px-2.5 py-0.5 rounded-full">
                          {logoForm.logoHeightPx} px
                        </span>
                      </div>
                      
                      <input
                        type="range"
                        min="28"
                        max="110"
                        step="2"
                        value={logoForm.logoHeightPx}
                        onChange={(e) => setLogoForm(prev => ({ ...prev, logoHeightPx: Number(e.target.value) }))}
                        className="w-full accent-red-500 cursor-pointer h-2 bg-slate-900 rounded-lg"
                      />
                      <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                        <span>सानो (28px)</span>
                        <span>मध्यम (52px)</span>
                        <span>ठूलो (80px)</span>
                        <span>विशाल (110px)</span>
                      </div>
                    </div>

                    {/* 4. Typography & Colors Control */}
                    <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700 space-y-4">
                      <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block flex items-center gap-2">
                        <Type className="w-4 h-4 text-pink-400" />
                        ४. ब्रान्डको नाम, स्लोगन तथा रङ्गहरू (Text & Color Controls)
                      </label>

                      {/* Primary Brand Text & Color */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="text-[11px] text-slate-400 block mb-1">पहिलो शब्द (Primary Text):</label>
                          <input
                            type="text"
                            value={logoForm.primaryText}
                            onChange={(e) => setLogoForm(prev => ({ ...prev, primaryText: e.target.value }))}
                            className="w-full bg-slate-900 border border-slate-700 text-white text-xs rounded-xl p-2.5 outline-none font-bold"
                          />
                        </div>

                        <div>
                          <label className="text-[11px] text-slate-400 block mb-1">पहिलो शब्दको रङ्ग (Hex Color):</label>
                          <div className="flex items-center gap-2">
                            <input
                              type="color"
                              value={logoForm.primaryColor}
                              onChange={(e) => setLogoForm(prev => ({ ...prev, primaryColor: e.target.value }))}
                              className="w-9 h-9 rounded cursor-pointer bg-slate-900 border border-slate-700 p-0.5"
                            />
                            <input
                              type="text"
                              value={logoForm.primaryColor}
                              onChange={(e) => setLogoForm(prev => ({ ...prev, primaryColor: e.target.value }))}
                              className="flex-1 bg-slate-900 border border-slate-700 text-white text-xs font-mono rounded-xl p-2 outline-none"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Secondary Brand Text & Color */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="text-[11px] text-slate-400 block mb-1">दोस्रो शब्द (Secondary Text):</label>
                          <input
                            type="text"
                            value={logoForm.secondaryText}
                            onChange={(e) => setLogoForm(prev => ({ ...prev, secondaryText: e.target.value }))}
                            className="w-full bg-slate-900 border border-slate-700 text-white text-xs rounded-xl p-2.5 outline-none font-bold"
                          />
                        </div>

                        <div>
                          <label className="text-[11px] text-slate-400 block mb-1">दोस्रो शब्दको रङ्ग (Hex Color):</label>
                          <div className="flex items-center gap-2">
                            <input
                              type="color"
                              value={logoForm.secondaryColor}
                              onChange={(e) => setLogoForm(prev => ({ ...prev, secondaryColor: e.target.value }))}
                              className="w-9 h-9 rounded cursor-pointer bg-slate-900 border border-slate-700 p-0.5"
                            />
                            <input
                              type="text"
                              value={logoForm.secondaryColor}
                              onChange={(e) => setLogoForm(prev => ({ ...prev, secondaryColor: e.target.value }))}
                              className="flex-1 bg-slate-900 border border-slate-700 text-white text-xs font-mono rounded-xl p-2 outline-none"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Slogan Text & Toggle */}
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label className="text-[11px] text-slate-400 block">स्लोगन / ट्यागलाइन (Slogan Tagline):</label>
                          <label className="flex items-center gap-2 cursor-pointer text-xs text-amber-400 font-bold">
                            <input
                              type="checkbox"
                              checked={logoForm.showSlogan}
                              onChange={(e) => setLogoForm(prev => ({ ...prev, showSlogan: e.target.checked }))}
                              className="w-4 h-4 rounded accent-red-600 cursor-pointer"
                            />
                            <span>स्लोगन देखाउनुहोस्</span>
                          </label>
                        </div>
                        <input
                          type="text"
                          value={logoForm.sloganText}
                          onChange={(e) => setLogoForm(prev => ({ ...prev, sloganText: e.target.value }))}
                          className="w-full bg-slate-900 border border-slate-700 text-white text-xs rounded-xl p-2.5 outline-none"
                          placeholder="सत्य र निष्पक्ष समाचार"
                        />
                      </div>
                    </div>

                    {/* 5. Preset Color Themes */}
                    <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700 space-y-3">
                      <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                        ५. तयार थिम प्रिसेट (Quick Presets)
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        <button
                          type="button"
                          onClick={() => setLogoForm(prev => ({
                            ...prev,
                            primaryColor: '#003399',
                            secondaryColor: '#C8102E'
                          }))}
                          className="p-2 bg-slate-900 hover:bg-slate-950 border border-slate-700 rounded-xl text-[11px] font-bold text-left flex items-center gap-2 transition-colors"
                        >
                          <span className="w-3.5 h-3.5 rounded-full bg-[#003399] border border-white/40 shrink-0" />
                          <span className="text-slate-200">क्लासिक नीलो/रातो</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setLogoForm(prev => ({
                            ...prev,
                            primaryColor: '#D97706',
                            secondaryColor: '#111827'
                          }))}
                          className="p-2 bg-slate-900 hover:bg-slate-950 border border-slate-700 rounded-xl text-[11px] font-bold text-left flex items-center gap-2 transition-colors"
                        >
                          <span className="w-3.5 h-3.5 rounded-full bg-amber-500 border border-white/40 shrink-0" />
                          <span className="text-slate-200">गोल्डेन लक्स</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setLogoForm(prev => ({
                            ...prev,
                            primaryColor: '#059669',
                            secondaryColor: '#DC2626'
                          }))}
                          className="p-2 bg-slate-900 hover:bg-slate-950 border border-slate-700 rounded-xl text-[11px] font-bold text-left flex items-center gap-2 transition-colors"
                        >
                          <span className="w-3.5 h-3.5 rounded-full bg-emerald-600 border border-white/40 shrink-0" />
                          <span className="text-slate-200">नेपाल फ्रेश</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setLogoForm(prev => ({
                            ...prev,
                            primaryColor: '#7C3AED',
                            secondaryColor: '#EC4899'
                          }))}
                          className="p-2 bg-slate-900 hover:bg-slate-950 border border-slate-700 rounded-xl text-[11px] font-bold text-left flex items-center gap-2 transition-colors"
                        >
                          <span className="w-3.5 h-3.5 rounded-full bg-purple-600 border border-white/40 shrink-0" />
                          <span className="text-slate-200">डिजिटल पर्पल</span>
                        </button>
                      </div>
                    </div>

                    {/* Action Submit Buttons */}
                    <div className="flex items-center gap-3 pt-2">
                      <button
                        type="submit"
                        disabled={savingLogo}
                        className="flex-1 bg-[#DC2626] hover:bg-red-700 text-white font-black text-sm py-3.5 px-6 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                      >
                        {savingLogo ? (
                          <RefreshCw className="w-5 h-5 animate-spin" />
                        ) : (
                          <Check className="w-5 h-5" />
                        )}
                        <span>{savingLogo ? 'सेभ हुँदैछ...' : 'लोगो परिवर्तन सेभ गर्नुहोस् (Save Logo)'}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setLogoForm({
                          logoType: 'IMAGE',
                          logoImageUrl: '/logo.svg',
                          primaryText: 'यथार्थ',
                          secondaryText: 'खबर',
                          sloganText: '',
                          primaryColor: '#003399',
                          secondaryColor: '#C8102E',
                          logoHeightPx: 56,
                          showSlogan: false,
                          borderStyle: 'NONE'
                        })}
                        className="bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold px-4 py-3.5 rounded-xl border border-slate-700 transition-colors flex items-center gap-1.5"
                        title="पुनः सुरुवाती अवस्थामा ल्याउनुहोस्"
                      >
                        <RotateCcw className="w-4 h-4" />
                        <span>Reset</span>
                      </button>
                    </div>

                  </form>
                </div>

                {/* Right Column (Real-Time Live Previews) - 5 cols */}
                <div className="lg:col-span-5 space-y-4">
                  
                  <div className="sticky top-4 space-y-4">
                    
                    <div className="bg-slate-800/90 p-3 rounded-2xl border border-slate-700 flex items-center justify-between">
                      <h4 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-2">
                        <Eye className="w-4 h-4 text-amber-400" />
                        प्रत्यक्ष नमुना (Real-Time Live Preview)
                      </h4>
                      <span className="text-[10px] text-emerald-400 font-mono font-bold flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                        Live Sync Active
                      </span>
                    </div>

                    {/* Preview 1: Header Light Canvas View */}
                    <div className="bg-white p-6 rounded-2xl border-2 border-slate-200 shadow-md space-y-2">
                      <div className="text-[10px] uppercase font-mono font-bold text-slate-400 border-b pb-1">
                        १. मुख्य वेबसाइट हेडर (Header Light Mode)
                      </div>
                      <div className="pt-2 flex items-center justify-center">
                        <BrandLogo 
                          settings={logoForm} 
                          size="lg" 
                          showSlogan={logoForm.showSlogan} 
                        />
                      </div>
                    </div>

                    {/* Preview 2: Top Blue Nav Bar View */}
                    <div className="bg-[#0C3880] p-4 rounded-2xl border-2 border-blue-900 shadow-md space-y-2 text-white">
                      <div className="text-[10px] uppercase font-mono font-bold text-blue-200 border-b border-blue-800/80 pb-1">
                        २. टप नेभिगेसन बार (Top Blue Banner)
                      </div>
                      <div className="pt-2 flex items-center justify-center">
                        <BrandLogo 
                          settings={logoForm} 
                          size="sm" 
                          showSlogan={false} 
                        />
                      </div>
                    </div>

                    {/* Preview 3: Footer Dark Theme View */}
                    <div className="bg-[#0F172A] p-6 rounded-2xl border-2 border-slate-800 shadow-md space-y-2 text-slate-200">
                      <div className="text-[10px] uppercase font-mono font-bold text-slate-500 border-b border-slate-800 pb-1">
                        ३. वेबसाइट फुटर (Footer Dark Mode)
                      </div>
                      <div className="pt-3 flex items-center justify-start">
                        <div className="bg-white/95 p-3 rounded-xl inline-block shadow-lg">
                          <BrandLogo 
                            settings={logoForm} 
                            size="md" 
                            showSlogan={logoForm.showSlogan} 
                          />
                        </div>
                      </div>
                    </div>

                    {/* Specs Summary Card */}
                    <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800 space-y-2 text-xs font-mono text-slate-300">
                      <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
                        लोगो प्राविधिक विवरण (Technical Specs):
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                        <div>
                          <span className="text-slate-500">प्रकार:</span> {logoForm.logoType}
                        </div>
                        <div>
                          <span className="text-slate-500">उचाइ:</span> {logoForm.logoHeightPx}px
                        </div>
                        <div>
                          <span className="text-slate-500">पहिलो रङ्ग:</span> {logoForm.primaryColor}
                        </div>
                        <div>
                          <span className="text-slate-500">दोस्रो रङ्ग:</span> {logoForm.secondaryColor}
                        </div>
                      </div>
                    </div>

                  </div>

                </div>

              </div>

            </div>
          )}

        </main>

        </div>
      </div>
    </div>
  );
};
