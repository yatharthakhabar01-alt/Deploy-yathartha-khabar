import React, { useState } from 'react';
import { Article } from '../types';
import { AdBanner } from './AdBanner';
import { AdBanner as AdBannerType } from '../types';
import { 
  X, 
  Clock, 
  Eye, 
  Share2, 
  Volume2, 
  VolumeX, 
  Play, 
  Pause, 
  ThumbsUp, 
  Heart, 
  Frown, 
  Lightbulb, 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  ShieldCheck, 
  UserCheck, 
  Bookmark, 
  Sparkles,
  Type,
  MapPin,
  Calendar
} from 'lucide-react';

interface NewsDetailModalProps {
  article: Article | null;
  onClose: () => void;
  ads: AdBannerType[];
  onSelectRelatedArticle: (art: Article) => void;
  allArticles: Article[];
}

export const NewsDetailModal: React.FC<NewsDetailModalProps> = ({
  article,
  onClose,
  ads,
  onSelectRelatedArticle,
  allArticles,
}) => {
  if (!article) return null;

  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [userReactions, setUserReactions] = useState(article.reactions);
  const [hasReacted, setHasReacted] = useState<string | null>(null);
  
  // Comment Form state
  const [commentsList, setCommentsList] = useState(article.comments || []);
  const [commentName, setCommentName] = useState('');
  const [commentText, setCommentText] = useState('');
  const [commentSubmittedMsg, setCommentSubmittedMsg] = useState(false);

  const inArticleAds = ads.filter(a => a.placementSlot === 'IN_ARTICLE_MID' && a.isActive);

  const fontSizeClasses = {
    normal: 'text-base sm:text-lg leading-relaxed',
    large: 'text-lg sm:text-xl leading-relaxed',
    xlarge: 'text-xl sm:text-2xl leading-loose',
  }[fontSize];

  // Reaction Handler
  const handleReaction = async (type: 'likes' | 'respect' | 'sad' | 'informative') => {
    if (hasReacted === type) return;
    setUserReactions(prev => ({ ...prev, [type]: prev[type] + 1 }));
    setHasReacted(type);

    try {
      await fetch(`/api/news/${article.id}/reaction`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type }),
      });
    } catch (e) {
      console.error('Reaction failed:', e);
    }
  };

  // Submit Comment Handler
  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const newComment = {
      id: `c-${Date.now()}`,
      authorName: commentName.trim() || 'पाठक',
      content: commentText.trim(),
      createdAt: 'अहिले',
      likes: 0
    };

    setCommentsList([newComment, ...commentsList]);
    setCommentText('');
    setCommentSubmittedMsg(true);
    setTimeout(() => setCommentSubmittedMsg(false), 4000);

    try {
      await fetch(`/api/news/${article.id}/comment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ authorName: commentName, content: commentText }),
      });
    } catch (e) {
      console.error('Comment submit error:', e);
    }
  };

  // Nepali Audio Reader Toggle
  const toggleAudioSpeech = () => {
    if (isPlayingAudio) {
      window.speechSynthesis?.cancel();
      setIsPlayingAudio(false);
    } else {
      if ('speechSynthesis' in window) {
        const textToRead = `${article.title}. ${article.summary}. ${article.content}`;
        const utterance = new SpeechSynthesisUtterance(textToRead);
        utterance.lang = 'ne-NP';
        utterance.rate = 0.9;
        utterance.onend = () => setIsPlayingAudio(false);
        utterance.onerror = () => setIsPlayingAudio(false);
        window.speechSynthesis.speak(utterance);
        setIsPlayingAudio(true);
      } else {
        alert('तपाईंको ब्राउजरमा आवाज सुन्ने प्रविधि उपलब्ध छैन।');
      }
    }
  };

  // Related articles
  const relatedArticles = allArticles
    .filter(a => a.id !== article.id && a.category === article.category)
    .slice(0, 3);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div className="bg-white text-slate-900 w-full max-w-5xl rounded-2xl shadow-2xl overflow-hidden flex flex-col my-auto relative max-h-[92vh]">
        
        {/* Modal Top Bar */}
        <div className="bg-[#1E3A8A] text-white px-4 py-3 flex items-center justify-between sticky top-0 z-20 border-b border-blue-900">
          <div className="flex items-center gap-2">
            <span className="bg-[#DC2626] text-white text-xs font-bold px-2.5 py-1 rounded">
              {article.category}
            </span>
            {article.submittedByCitizen && (
              <span className="bg-emerald-600 text-white text-xs font-medium px-2 py-0.5 rounded flex items-center gap-1">
                <UserCheck className="w-3.5 h-3.5" /> नागरिक समाचार
              </span>
            )}
            {article.aiAuditReport && (
              <span className="bg-purple-700 text-white text-xs font-medium px-2 py-0.5 rounded flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-300" /> AI द्वारा प्रमाणित
              </span>
            )}
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/20 text-white transition-colors"
            title="बन्द गर्नुहोस्"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable Article Body */}
        <div className="overflow-y-auto p-4 sm:p-6 md:p-8 space-y-6">
          
          {/* Article Header & Title */}
          <div className="space-y-4 border-b border-slate-200 pb-5">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight font-serif">
              {article.title}
            </h1>

            {article.summary && (
              <p className="text-lg sm:text-xl font-medium text-slate-700 leading-relaxed border-l-4 border-[#DC2626] pl-4 italic bg-slate-50 py-2 rounded-r-lg">
                {article.summary}
              </p>
            )}

            {/* Author Meta Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-2 text-xs sm:text-sm text-slate-600">
              <div className="flex items-center gap-3">
                <img
                  src={article.authorAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop'}
                  alt={article.authorName}
                  className="w-10 h-10 rounded-full object-cover border-2 border-[#1E3A8A]"
                />
                <div>
                  <div className="font-bold text-slate-900 flex items-center gap-1">
                    {article.authorName}
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                  </div>
                  <div className="text-xs text-slate-500">{article.authorRole}</div>
                </div>
              </div>

              <div className="flex items-center gap-4 flex-wrap text-slate-500 text-xs">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#DC2626]" />
                  <span>{article.publishedAtBikramSambat}</span>
                </div>
                {article.location && (
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-blue-600" />
                    <span>{article.location}</span>
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{article.readTimeMinutes} मिनेट पढाइ</span>
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5" />
                  <span>{article.viewsCount.toLocaleString('ne-NP')} पटक हेरिएको</span>
                </div>
              </div>
            </div>

            {/* Controls Bar: Audio Reader & Font Size Adjuster */}
            <div className="bg-slate-100 rounded-xl p-3 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
              
              {/* Text-To-Speech Audio Reader */}
              <button
                onClick={toggleAudioSpeech}
                className={`flex items-center gap-2 font-semibold px-4 py-2 rounded-lg transition-all shadow-xs ${
                  isPlayingAudio 
                    ? 'bg-amber-500 text-slate-900 animate-pulse' 
                    : 'bg-[#1E3A8A] text-white hover:bg-blue-900'
                }`}
              >
                {isPlayingAudio ? (
                  <>
                    <Pause className="w-4 h-4 fill-current" />
                    <span>आवाज रोक्नुहोस् (पढ्दैछ...)</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-4 h-4" />
                    <span>नेपाली आवाजमा समाचार सुन्नुहोस् (AI Reader)</span>
                  </>
                )}
              </button>

              {/* Font Size Adjuster */}
              <div className="flex items-center gap-1 bg-white border border-slate-300 rounded-lg p-1">
                <span className="text-xs font-bold text-slate-500 px-2 flex items-center gap-1">
                  <Type className="w-3.5 h-3.5" /> आकार:
                </span>
                <button
                  onClick={() => setFontSize('normal')}
                  className={`px-2.5 py-1 rounded text-xs font-bold ${fontSize === 'normal' ? 'bg-[#DC2626] text-white' : 'hover:bg-slate-100'}`}
                >
                  अ
                </button>
                <button
                  onClick={() => setFontSize('large')}
                  className={`px-2.5 py-1 rounded text-sm font-bold ${fontSize === 'large' ? 'bg-[#DC2626] text-white' : 'hover:bg-slate-100'}`}
                >
                  अ+
                </button>
                <button
                  onClick={() => setFontSize('xlarge')}
                  className={`px-2.5 py-1 rounded text-base font-bold ${fontSize === 'xlarge' ? 'bg-[#DC2626] text-white' : 'hover:bg-slate-100'}`}
                >
                  अ++
                </button>
              </div>

            </div>

          </div>

          {/* Featured High-Res Image */}
          {article.imageUrl && (
            <div className="space-y-2">
              <div className="rounded-2xl overflow-hidden shadow-md max-h-[420px]">
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>
              {article.imageCaption && (
                <p className="text-xs text-slate-500 italic text-center">
                  {article.imageCaption}
                </p>
              )}
            </div>
          )}

          {/* Article Main Text Content */}
          <div className={`text-slate-800 ${fontSizeClasses} whitespace-pre-line font-serif space-y-4`}>
            {article.content}
          </div>

          {/* In-Article Mid Ad Placement (Ad Slot 6) */}
          <div className="my-6">
            <AdBanner ads={inArticleAds} slotName="In-Article Mid Banner (728x120)" layout="landscape" />
          </div>

          {/* Interactive Reactions Bar */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-6 space-y-3">
            <h3 className="font-bold text-sm text-slate-700 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              यो समाचारप्रति तपाईंको प्रतिक्रिया के छ?
            </h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <button
                onClick={() => handleReaction('likes')}
                className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-bold text-sm border transition-all ${
                  hasReacted === 'likes' ? 'bg-blue-600 text-white border-blue-600 shadow-md' : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                }`}
              >
                <ThumbsUp className="w-4 h-4" />
                <span>राम्रो छ ({userReactions.likes})</span>
              </button>

              <button
                onClick={() => handleReaction('respect')}
                className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-bold text-sm border transition-all ${
                  hasReacted === 'respect' ? 'bg-emerald-600 text-white border-emerald-600 shadow-md' : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                }`}
              >
                <Heart className="w-4 h-4" />
                <span>सराहनीय ({userReactions.respect})</span>
              </button>

              <button
                onClick={() => handleReaction('informative')}
                className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-bold text-sm border transition-all ${
                  hasReacted === 'informative' ? 'bg-amber-500 text-slate-900 border-amber-500 shadow-md' : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                }`}
              >
                <Lightbulb className="w-4 h-4" />
                <span>नेपाल बुझ्ने ({userReactions.informative})</span>
              </button>

              <button
                onClick={() => handleReaction('sad')}
                className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-bold text-sm border transition-all ${
                  hasReacted === 'sad' ? 'bg-red-600 text-white border-red-600 shadow-md' : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                }`}
              >
                <Frown className="w-4 h-4" />
                <span>दुःखद ({userReactions.sad})</span>
              </button>
            </div>
          </div>

          {/* Interactive Comments Section */}
          <div className="space-y-6 pt-4 border-t border-slate-200">
            <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2 font-serif">
              <MessageSquare className="w-5 h-5 text-[#DC2626]" />
              प्रतिक्रिया तथा टिप्पणी ({commentsList.length})
            </h3>

            {/* Comment Form */}
            <form onSubmit={handleCommentSubmit} className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
              {commentSubmittedMsg && (
                <div className="bg-emerald-100 text-emerald-800 text-xs font-bold p-2.5 rounded-lg flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  तपाईंको प्रतिक्रिया सफलतापूर्वक प्रकाशित भयो!
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="तपाईंको नाम (वैकल्पिक)"
                  value={commentName}
                  onChange={(e) => setCommentName(e.target.value)}
                  className="bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#1E3A8A]"
                />
              </div>

              <textarea
                placeholder="यस समाचार सम्बन्धी आफ्नो विचार लेख्नुहोस्..."
                rows={3}
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-lg p-3 text-sm outline-none focus:border-[#1E3A8A]"
                required
              />

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-[#1E3A8A] hover:bg-blue-900 text-white font-bold text-xs px-5 py-2.5 rounded-lg flex items-center gap-2 shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  प्रतिक्रिया पठाउनुहोस्
                </button>
              </div>
            </form>

            {/* Comments List */}
            <div className="space-y-3">
              {commentsList.map((c) => (
                <div key={c.id} className="bg-white border border-slate-200 rounded-xl p-3.5 space-y-1.5 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-[#1E3A8A]">{c.authorName}</span>
                    <span className="text-[11px] text-slate-400">{c.createdAt}</span>
                  </div>
                  <p className="text-sm text-slate-700">{c.content}</p>
                </div>
              ))}
            </div>

          </div>

          {/* Related Articles Grid */}
          {relatedArticles.length > 0 && (
            <div className="pt-6 border-t border-slate-200 space-y-4">
              <h3 className="text-lg font-bold text-slate-900 border-l-4 border-[#DC2626] pl-3">
                यो श्रेणीका अन्य महत्वपूर्ण समाचार
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedArticles.map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => onSelectRelatedArticle(rel)}
                    className="group bg-slate-50 border border-slate-200 rounded-xl overflow-hidden cursor-pointer hover:shadow-md transition-all"
                  >
                    <div className="h-32 overflow-hidden">
                      <img src={rel.imageUrl} alt={rel.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    </div>
                    <div className="p-3 space-y-1">
                      <span className="text-[10px] font-bold text-[#DC2626] uppercase">{rel.category}</span>
                      <h4 className="text-xs font-bold text-slate-800 line-clamp-2 group-hover:text-blue-700">
                        {rel.title}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
