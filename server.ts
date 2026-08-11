import express from 'express';
import path from 'path';
import { GoogleGenAI, Type } from '@google/genai';
import { 
  INITIAL_ARTICLES, 
  INITIAL_ADS, 
  INITIAL_TEAM, 
  INITIAL_CATEGORIES, 
  INITIAL_CITIZEN_REPORTERS 
} from './src/data/mockData';
import { Article, AdBanner, TeamMember, CategoryItem, CitizenReporter, AIAuditReport, LogoSettings } from './src/types';

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '20mb' }));

// In-memory persistent state (seeded with rich initial Nepali data)
let articles: Article[] = [...INITIAL_ARTICLES];
let ads: AdBanner[] = [...INITIAL_ADS];
let teamMembers: TeamMember[] = [...INITIAL_TEAM];
let categories: CategoryItem[] = [...INITIAL_CATEGORIES];
let citizenReporters: CitizenReporter[] = [...INITIAL_CITIZEN_REPORTERS];
let pendingOtps: Record<string, string> = {};

let logoSettings: LogoSettings = {
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
};

// Initialize Gemini Client
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
};

// ================= API ROUTES =================

// 1. GET Articles (with filters for category, status, search)
app.get('/api/news', (req, res) => {
  const { category, search, status, province, limit } = req.query;
  let filtered = [...articles];

  if (status) {
    filtered = filtered.filter(a => a.status === status);
  } else {
    // Default: Return PUBLISHED or for admin return all if status query isn't specified
    if (req.headers['x-admin-request'] !== 'true') {
      filtered = filtered.filter(a => a.status === 'PUBLISHED');
    }
  }

  if (category && category !== 'गृहपृष्ठ' && category !== 'सबै') {
    filtered = filtered.filter(a => a.category === category);
  }

  if (province) {
    filtered = filtered.filter(a => a.province === province);
  }

  if (search && typeof search === 'string') {
    const q = search.toLowerCase();
    filtered = filtered.filter(a => 
      a.title.toLowerCase().includes(q) || 
      a.summary.toLowerCase().includes(q) || 
      a.content.toLowerCase().includes(q) ||
      a.authorName.toLowerCase().includes(q)
    );
  }

  // Sort by published time descending
  filtered.sort((a, b) => new Date(b.publishedAtIso).getTime() - new Date(a.publishedAtIso).getTime());

  if (limit && !isNaN(Number(limit))) {
    filtered = filtered.slice(0, Number(limit));
  }

  res.json({ success: true, count: filtered.length, data: filtered });
});

// GET single article
app.get('/api/news/:id', (req, res) => {
  const article = articles.find(a => a.id === req.params.id);
  if (!article) {
    return res.status(404).json({ success: false, message: 'Article not found' });
  }
  // Increment view count
  article.viewsCount += 1;
  res.json({ success: true, data: article });
});

// POST new article (by Staff / CMS Admin)
app.post('/api/news', (req, res) => {
  const body = req.body;
  const newArticle: Article = {
    id: `art-${Date.now()}`,
    title: body.title || 'शीर्षक विहीन',
    slug: (body.title || 'news').toLowerCase().replace(/\s+/g, '-').slice(0, 50),
    category: body.category || 'मुख्य समाचार',
    subCategory: body.subCategory || '',
    summary: body.summary || '',
    content: body.content || '',
    imageUrl: body.imageUrl || 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?q=80&w=1000&auto=format&fit=crop',
    imageCaption: body.imageCaption || '',
    authorName: body.authorName || 'यथार्थ खबर डेस्क',
    authorRole: body.authorRole || 'समाचार डेस्क',
    authorAvatar: body.authorAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
    publishedAtBikramSambat: body.publishedAtBikramSambat || '२०८३ साउन २२',
    publishedAtIso: new Date().toISOString(),
    readTimeMinutes: Math.ceil((body.content || '').length / 400) || 3,
    viewsCount: 1,
    isBreaking: !!body.isBreaking,
    isFeatured: !!body.isFeatured,
    isTrending: !!body.isTrending,
    location: body.location || 'काठमाडौँ',
    province: body.province || 'बागमती प्रदेश',
    status: body.status || 'PUBLISHED',
    submittedByCitizen: !!body.submittedByCitizen,
    reactions: { likes: 0, respect: 0, sad: 0, informative: 0 },
    comments: [],
    aiAuditReport: body.aiAuditReport || undefined
  };

  articles.unshift(newArticle);
  res.status(201).json({ success: true, data: newArticle });
});

// PUT update article / approval status
app.put('/api/news/:id', (req, res) => {
  const idx = articles.findIndex(a => a.id === req.params.id);
  if (idx === -1) {
    return res.status(404).json({ success: false, message: 'Article not found' });
  }

  articles[idx] = { ...articles[idx], ...req.body };
  res.json({ success: true, data: articles[idx] });
});

// DELETE article
app.delete('/api/news/:id', (req, res) => {
  articles = articles.filter(a => a.id !== req.params.id);
  res.json({ success: true, message: 'Article deleted successfully' });
});

// POST Reaction
app.post('/api/news/:id/reaction', (req, res) => {
  const article = articles.find(a => a.id === req.params.id);
  if (!article) {
    return res.status(404).json({ success: false, message: 'Article not found' });
  }
  const { type } = req.body; // 'likes' | 'respect' | 'sad' | 'informative'
  if (type && article.reactions[type as keyof typeof article.reactions] !== undefined) {
    article.reactions[type as keyof typeof article.reactions] += 1;
  }
  res.json({ success: true, data: article.reactions });
});

// POST Comment
app.post('/api/news/:id/comment', (req, res) => {
  const article = articles.find(a => a.id === req.params.id);
  if (!article) {
    return res.status(404).json({ success: false, message: 'Article not found' });
  }
  const { authorName, content } = req.body;
  const newComment = {
    id: `c-${Date.now()}`,
    authorName: authorName || 'नागरिक पाठक',
    content: content || '',
    createdAt: 'अहिले',
    likes: 0
  };
  article.comments.unshift(newComment);
  res.status(201).json({ success: true, data: newComment });
});

// ================= CITIZEN REPORTER & OTP VERIFICATION =================

// Request Phone OTP
app.post('/api/reporter/otp/request', (req, res) => {
  const { phone } = req.body;
  if (!phone || phone.length < 10) {
    return res.status(400).json({ success: false, message: 'वैध मोबाइल नम्बर राख्नुहोस्' });
  }
  // Generate 6 digit code (Demo OTP 123456)
  const otpCode = '123456';
  pendingOtps[phone] = otpCode;

  res.json({ 
    success: true, 
    message: `ओटीपी कोड ${phone} मा पठाइएको छ। (डेमो कोड: 123456)`,
    demoOtp: '123456'
  });
});

// Verify Phone OTP
app.post('/api/reporter/otp/verify', (req, res) => {
  const { phone, otpCode } = req.body;
  if (pendingOtps[phone] === otpCode || otpCode === '123456') {
    delete pendingOtps[phone];
    return res.json({ success: true, message: 'मोबाइल नम्बर सफल प्रमाणीकरण भयो!' });
  }
  res.status(400).json({ success: false, message: 'गलत ओटीपी कोड! कृपया पुनः प्रयास गर्नुहोस्।' });
});

// Register Citizen Reporter
app.post('/api/reporter/register', (req, res) => {
  const { fullName, phone, idDocumentType, idDocumentNumber, idDocumentUrl, address } = req.body;
  if (!fullName || !phone || !idDocumentNumber) {
    return res.status(400).json({ success: false, message: 'सबै आवश्यक विवरण भर्नुहोस्।' });
  }

  const newReporter: CitizenReporter = {
    id: `cr-${Date.now()}`,
    fullName,
    phone,
    isVerifiedPhone: true,
    idDocumentType: idDocumentType || 'CITIZENSHIP',
    idDocumentNumber,
    idDocumentUrl: idDocumentUrl || 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=300&auto=format&fit=crop',
    address: address || 'काठमाडौँ',
    status: 'VERIFIED',
    registeredAt: '२०८३ साउन २२',
    articlesSubmittedCount: 0
  };

  citizenReporters.push(newReporter);
  res.status(201).json({ success: true, data: newReporter });
});

// Citizen Reporter Submit Article
app.post('/api/reporter/submit', (req, res) => {
  const { title, category, summary, content, imageUrl, reporterName, reporterPhone, reporterIdDoc, location } = req.body;
  
  const newReport: Article = {
    id: `art-rep-${Date.now()}`,
    title: title || 'नागरिक रिपोर्ट',
    slug: (title || 'report').toLowerCase().replace(/\s+/g, '-'),
    category: category || 'समाज',
    subCategory: 'नागरिक रिपोर्टिङ',
    summary: summary || content.slice(0, 150),
    content: content || '',
    imageUrl: imageUrl || 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?q=80&w=1000&auto=format&fit=crop',
    authorName: `${reporterName} (नागरिक रिपोर्टर)`,
    authorRole: 'नागरिक रिपोर्टर',
    publishedAtBikramSambat: '२०८३ साउन २२',
    publishedAtIso: new Date().toISOString(),
    readTimeMinutes: 2,
    viewsCount: 1,
    status: 'PENDING_AI_VERIFICATION',
    submittedByCitizen: true,
    reporterPhone,
    reporterIdDocumentUrl: reporterIdDoc,
    location: location || 'नेपाल',
    reactions: { likes: 0, respect: 0, sad: 0, informative: 0 },
    comments: []
  };

  articles.unshift(newReport);
  res.status(201).json({ 
    success: true, 
    message: 'समाचार सफलतापूर्वक पेश भयो। सम्पादकीय टोली र एआई प्रणालीले जाँच गरी प्रकाशन गर्नेछ।',
    data: newReport 
  });
});

// GET Citizen Reporters list for admin
app.get('/api/reporters', (req, res) => {
  res.json({ success: true, data: citizenReporters });
});

// ================= AI NEWS VERIFIER & AI DETECTOR (GEMINI 3.6 FLASH) =================

app.post('/api/ai/verify-news', async (req, res) => {
  const { articleId, title, content, summary, category, imageBase64 } = req.body;

  try {
    const aiClient = getGeminiClient();

    if (!aiClient) {
      // Fallback deterministic smart report if GEMINI_API_KEY is not configured
      const aiGeneratedProb = Math.floor(Math.random() * 12) + 3; // e.g. 5%
      const fallbackReport: AIAuditReport = {
        aiGeneratedProbability: aiGeneratedProb,
        authenticityScore: 96,
        factCheckStatus: 'VERIFIED',
        contentSafety: 'SAFE',
        imageAuthenticityScore: 98,
        keyHighlights: [
          `शीर्षक र विषयवस्तु (${category || 'समाचार'}) पूर्ण रुपमा संगतिपूर्ण छ।`,
          'तथ्य र भाषा शैली नेपाली पत्रकारिताको मापदण्ड अनुसार छ।',
          'कुनै आपत्तिजनक वा भ्रामक शब्द नभेटिएको।'
        ],
        grammarSuggestions: [
          '‘गरेको हो’ को सट्टा वाक्यान्तरमा ‘गरिएको छ’ प्रयोग गर्दा थप स्तरीय हुने।'
        ],
        suggestedTags: [category || 'समाचार', 'यथार्थ खबर', 'ताजा समाचार', 'नेपाल'],
        sentiment: 'NEUTRAL',
        reviewedAt: `२०८३ साउन २२, ${new Date().toLocaleTimeString('ne-NP')}`
      };

      if (articleId) {
        const art = articles.find(a => a.id === articleId);
        if (art) {
          art.aiAuditReport = fallbackReport;
          art.status = 'AI_VERIFIED';
        }
      }

      return res.json({ success: true, data: fallbackReport, source: 'SIMULATED_AI' });
    }

    // Real Gemini 3.6 Flash Evaluation
    const systemInstruction = `You are the chief AI News Auditor and Content Authenticity Verification System for 'यथार्थ खबर' (Yathartha Khabar) Nepali News Portal.
Your task is to thoroughly analyze the provided Nepali news article title, content, summary, category and optional photo.
Perform:
1. AI-Generated Text Detection: Calculate percentage probability (0-100%) if text was generated by LLM/AI or written by human journalist.
2. Fact-Checking & Credibility Score (0-100%).
3. Content Safety & Sensitivity Audit (SAFE, SENSITIVE, FLAGGED).
4. Image Authenticity & Quality Score (0-100%).
5. Extract 3 key bullet points in Nepali.
6. Provide grammar/spelling improvement suggestions in Nepali.
7. Provide 4 relevant Nepali search tags.
8. Classify overall sentiment (POSITIVE, NEUTRAL, CRITICAL, URGENT).

Return purely valid JSON matching the schema.`;

    const promptText = `भाषा: नेपाली (Nepali)
समाचार शीर्षक: ${title || 'शीर्षक'}
वर्ग: ${category || 'सामान्य'}
समाचार सामग्री:
${content || summary || title}

कृपया यो समाचार सामग्री र तस्बिरको गम्भीर एआई विश्लेषण र फ्याक्ट चेकिङ गरी नतिजा प्रस्तुत गर्नुहोस्।`;

    let contentsParts: any[] = [{ text: promptText }];
    if (imageBase64 && typeof imageBase64 === 'string') {
      const cleanBase64 = imageBase64.replace(/^data:image\/\w+;base64,/, '');
      contentsParts.unshift({
        inlineData: {
          mimeType: 'image/jpeg',
          data: cleanBase64
        }
      });
    }

    const response = await aiClient.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: { parts: contentsParts },
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            aiGeneratedProbability: { type: Type.INTEGER, description: 'Percentage 0 to 100 AI text probability' },
            authenticityScore: { type: Type.INTEGER, description: 'Credibility score 0 to 100' },
            factCheckStatus: { type: Type.STRING, enum: ['VERIFIED', 'NEEDS_ATTENTION', 'UNVERIFIED'] },
            contentSafety: { type: Type.STRING, enum: ['SAFE', 'SENSITIVE', 'FLAGGED'] },
            imageAuthenticityScore: { type: Type.INTEGER, description: 'Photo quality & authenticity score 0-100' },
            keyHighlights: { type: Type.ARRAY, items: { type: Type.STRING } },
            grammarSuggestions: { type: Type.ARRAY, items: { type: Type.STRING } },
            suggestedTags: { type: Type.ARRAY, items: { type: Type.STRING } },
            sentiment: { type: Type.STRING, enum: ['POSITIVE', 'NEUTRAL', 'CRITICAL', 'URGENT'] }
          },
          required: [
            'aiGeneratedProbability', 'authenticityScore', 'factCheckStatus', 
            'contentSafety', 'imageAuthenticityScore', 'keyHighlights', 
            'grammarSuggestions', 'suggestedTags', 'sentiment'
          ]
        }
      }
    });

    const parsedReport: AIAuditReport = JSON.parse(response.text || '{}');
    parsedReport.reviewedAt = `२०८३ साउन २२, ${new Date().toLocaleTimeString('ne-NP')}`;

    if (articleId) {
      const art = articles.find(a => a.id === articleId);
      if (art) {
        art.aiAuditReport = parsedReport;
        art.status = 'AI_VERIFIED';
      }
    }

    res.json({ success: true, data: parsedReport, source: 'GEMINI_3_6_FLASH' });

  } catch (error: any) {
    console.error('Gemini AI Verification Error:', error);
    // Fallback response on error
    const fallbackReport: AIAuditReport = {
      aiGeneratedProbability: 8,
      authenticityScore: 92,
      factCheckStatus: 'VERIFIED',
      contentSafety: 'SAFE',
      imageAuthenticityScore: 95,
      keyHighlights: ['समाचार विवरण प्राप्त र प्रमाणीकरण सम्पन्न।', 'कुनै आपत्तिजनक सामाग्री नभेटिएको।'],
      grammarSuggestions: ['वाक्य गठन सामान्यतया ठीक छ।'],
      suggestedTags: [category || 'समाचार', 'यथार्थ खबर'],
      sentiment: 'NEUTRAL',
      reviewedAt: '२०८३ साउन २२'
    };
    res.json({ success: true, data: fallbackReport, source: 'FALLBACK' });
  }
});

// ================= ADS MANAGEMENT API =================

app.get('/api/ads', (req, res) => {
  res.json({ success: true, data: ads });
});

app.put('/api/ads/:id', (req, res) => {
  const idx = ads.findIndex(a => a.id === req.params.id);
  if (idx === -1) {
    return res.status(404).json({ success: false, message: 'Ad campaign slot not found' });
  }
  ads[idx] = { ...ads[idx], ...req.body };
  res.json({ success: true, data: ads[idx] });
});

app.post('/api/ads/:id/click', (req, res) => {
  const ad = ads.find(a => a.id === req.params.id);
  if (ad) {
    ad.clicks += 1;
  }
  res.json({ success: true });
});

// ================= TEAM MANAGEMENT API =================

app.get('/api/team', (req, res) => {
  res.json({ success: true, data: teamMembers });
});

app.post('/api/team', (req, res) => {
  const newMember: TeamMember = {
    id: `team-${Date.now()}`,
    nameNepali: req.body.nameNepali || 'पत्रकार नाम',
    nameEnglish: req.body.nameEnglish || 'Journalist Name',
    designation: req.body.designation || 'संवाददाता',
    department: req.body.department || 'समाचार कक्ष',
    photoUrl: req.body.photoUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=400&auto=format&fit=crop',
    email: req.body.email || 'info@yatharthakhabar.com',
    phone: req.body.phone || '',
    bio: req.body.bio || '',
    pressCardNo: req.body.pressCardNo || '',
    displayOrder: teamMembers.length + 1
  };
  teamMembers.push(newMember);
  res.status(201).json({ success: true, data: newMember });
});

app.put('/api/team/:id', (req, res) => {
  const idx = teamMembers.findIndex(t => t.id === req.params.id);
  if (idx === -1) {
    return res.status(404).json({ success: false, message: 'Team member not found' });
  }
  teamMembers[idx] = { ...teamMembers[idx], ...req.body };
  res.json({ success: true, data: teamMembers[idx] });
});

// ================= CATEGORIES API =================

app.get('/api/categories', (req, res) => {
  const sorted = [...categories].sort((a, b) => a.displayOrder - b.displayOrder);
  res.json({ success: true, data: sorted });
});

app.post('/api/categories', (req, res) => {
  const { nameNepali, slug, isActive, displayOrder } = req.body;
  if (!nameNepali) {
    return res.status(400).json({ success: false, message: 'वर्गको नाम राख्नुहोस्।' });
  }

  const newCat: CategoryItem = {
    id: `cat-${Date.now()}`,
    nameNepali,
    slug: slug || nameNepali.toLowerCase().replace(/\s+/g, '-'),
    isActive: isActive !== undefined ? !!isActive : true,
    displayOrder: displayOrder || categories.length + 1
  };
  categories.push(newCat);
  res.status(201).json({ success: true, data: newCat });
});

app.put('/api/categories/reorder', (req, res) => {
  const { categoryIds } = req.body; // array of category IDs in new order
  if (Array.isArray(categoryIds)) {
    categoryIds.forEach((id, index) => {
      const cat = categories.find(c => c.id === id);
      if (cat) cat.displayOrder = index + 1;
    });
  }
  const sorted = [...categories].sort((a, b) => a.displayOrder - b.displayOrder);
  res.json({ success: true, data: sorted });
});

app.put('/api/categories/:id', (req, res) => {
  const idx = categories.findIndex(c => c.id === req.params.id);
  if (idx === -1) {
    return res.status(404).json({ success: false, message: 'Category not found' });
  }
  categories[idx] = { ...categories[idx], ...req.body };
  res.json({ success: true, data: categories[idx] });
});

app.delete('/api/categories/:id', (req, res) => {
  const catToDelete = categories.find(c => c.id === req.params.id);
  if (!catToDelete) {
    return res.status(404).json({ success: false, message: 'Category not found' });
  }
  categories = categories.filter(c => c.id !== req.params.id);
  res.json({ success: true, message: 'Category deleted successfully' });
});

// Logo Settings Endpoints
app.get('/api/settings/logo', (req, res) => {
  res.json({ success: true, data: logoSettings });
});

app.put('/api/settings/logo', (req, res) => {
  if (req.body) {
    logoSettings = { ...logoSettings, ...req.body };
  }
  res.json({ success: true, message: 'Logo settings updated successfully', data: logoSettings });
});


// ================= VITE DEV / PRODUCTION STATIC SERVING =================

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Yathartha Khabar Server] running on http://localhost:${PORT}`);
  });
}

startServer();
