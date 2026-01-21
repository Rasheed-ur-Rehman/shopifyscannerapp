
export enum AppView {
  LANDING = 'LANDING',
  SCANNING = 'SCANNING',
  DASHBOARD = 'DASHBOARD'
}

export interface ShopifyIssue {
  id: string;
  category: 'Product' | 'Checkout' | 'UX' | 'Trust' | 'Tracking';
  title: string;
  description: string;
  impact: 'High' | 'Medium' | 'Low';
  estimatedLoss: number;
  recommendation: string;
}

export interface ScanResult {
  score: number;
  totalLoss: number;
  issues: ShopifyIssue[];
  storeName: string;
  summary: string;
}

export interface ModalContent {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}
