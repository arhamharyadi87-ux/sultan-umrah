// src/types.ts
export interface Package {
  id: number;
  title: string;
  price: string;
  duration: string;
  hotel: string;
  features: string[];
  color: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export enum LoadingState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  ERROR = 'ERROR',
  SUCCESS = 'SUCCESS'
}