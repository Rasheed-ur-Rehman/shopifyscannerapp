
export enum AppView {
  LANDING = 'LANDING',
  SCANNING = 'SCANNING',
  DASHBOARD = 'DASHBOARD',
  PRICING = 'PRICING',
  HOW_IT_WORKS = 'HOW_IT_WORKS',
  AUTH = 'AUTH',
  SIGNUP = 'SIGNUP'
}

export interface ShopifyIssue {
  id: string;
  category: 'Product' | 'Checkout' | 'UX' | 'Trust' | 'Tracking' | 'SEO' | 'Performance';
  title: string;
  description: string;
  impact: 'High' | 'Medium' | 'Low';
  estimatedLoss: number;
  recommendation: string;
}

export interface TechnicalAudit {
  metaTitle: string;
  metaDescription: string;
  mobileOptimization: string;
  lcpScore: string;
  fcpScore: string;
}

export interface ScanResult {
  score: number;
  totalLoss: number;
  issues: ShopifyIssue[];
  storeName: string;
  summary: string;
  technicalAudit: TechnicalAudit;
}

export interface ModalContent {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}
