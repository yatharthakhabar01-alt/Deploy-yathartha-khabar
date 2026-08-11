export type CategoryType = 
  | 'मुख्य समाचार'
  | 'पूर्णविराम पछिको प्रश्नवाचक'
  | 'जन चौतारी'
  | 'नागरिक रिपोर्ट'
  | 'खोजी हाम्रो, उत्तर तपाईंको'
  | 'राजनीति'
  | 'अर्थतन्त्र'
  | 'समाज'
  | 'विचार/ब्लग'
  | 'विश्व'
  | 'खेलकुद'
  | 'प्रविधि'
  | 'मनोरञ्जन'
  | 'हाम्रो टोली';

export interface Comment {
  id: string;
  authorName: string;
  authorAvatar?: string;
  content: string;
  createdAt: string;
  likes: number;
  replies?: Comment[];
}

export interface Reactions {
  likes: number;
  respect: number;
  sad: number;
  informative: number;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  category: CategoryType;
  subCategory?: string;
  summary: string;
  content: string;
  imageUrl: string;
  imageCaption?: string;
  authorName: string;
  authorRole: string;
  authorAvatar?: string;
  publishedAtBikramSambat: string;
  publishedAtIso: string;
  readTimeMinutes: number;
  viewsCount: number;
  isBreaking?: boolean;
  isFeatured?: boolean;
  isTrending?: boolean;
  location?: string;
  province?: string;
  status: 'PENDING_AI_VERIFICATION' | 'AI_VERIFIED' | 'PUBLISHED' | 'REJECTED';
  submittedByCitizen?: boolean;
  reporterPhone?: string;
  reporterIdDocumentUrl?: string;
  reactions: Reactions;
  comments: Comment[];
  aiAuditReport?: AIAuditReport;
}

export interface AIAuditReport {
  aiGeneratedProbability: number; // e.g., 12 (means 12% AI probability)
  authenticityScore: number; // 0-100
  factCheckStatus: 'VERIFIED' | 'NEEDS_ATTENTION' | 'UNVERIFIED';
  contentSafety: 'SAFE' | 'SENSITIVE' | 'FLAGGED';
  imageAuthenticityScore: number; // 0-100
  keyHighlights: string[];
  grammarSuggestions: string[];
  suggestedTags: string[];
  sentiment: 'POSITIVE' | 'NEUTRAL' | 'CRITICAL' | 'URGENT';
  reviewedAt: string;
}

export interface CitizenReporter {
  id: string;
  fullName: string;
  phone: string;
  isVerifiedPhone: boolean;
  idDocumentType: 'CITIZENSHIP' | 'NATIONAL_ID' | 'PRESS_CARD';
  idDocumentNumber: string;
  idDocumentUrl: string;
  address: string;
  status: 'PENDING' | 'VERIFIED' | 'REJECTED';
  registeredAt: string;
  articlesSubmittedCount: number;
}

export interface AdBanner {
  id: string;
  placementSlot: 
    | 'TOP_HEADER_LANDSCAPE' 
    | 'BELOW_CATEGORY_LANDSCAPE' 
    | 'MID_FEED_WIDE' 
    | 'RIGHT_SIDEBAR_1' 
    | 'RIGHT_SIDEBAR_2' 
    | 'IN_ARTICLE_MID' 
    | 'BOTTOM_STICKY_FLOATING'
    | 'PRE_FOOTER_SPONSOR';
  title: string;
  advertiserName: string;
  imageUrl: string;
  targetUrl: string;
  isActive: boolean;
  impressions: number;
  clicks: number;
  dimensions: string;
}

export interface TeamMember {
  id: string;
  nameNepali: string;
  nameEnglish: string;
  designation: string;
  department: string;
  photoUrl: string;
  email: string;
  phone?: string;
  bio: string;
  pressCardNo?: string;
  displayOrder: number;
}

export interface CategoryItem {
  id: string;
  nameNepali: CategoryType;
  slug: string;
  isActive: boolean;
  displayOrder: number;
}

export interface LogoSettings {
  logoType: 'VECTOR' | 'IMAGE';
  logoImageUrl: string;
  primaryText: string;
  secondaryText: string;
  sloganText: string;
  primaryColor: string;
  secondaryColor: string;
  logoHeightPx: number;
  showSlogan: boolean;
  borderStyle: 'NONE' | 'ROUNDED' | 'CIRCLE' | 'SHADOW';
  customCssClass?: string;
}
