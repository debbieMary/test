import { ReactNode } from 'react';

export interface BadgeConfig {
  count: number;
  color: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
}

export interface MenuItem {
  text: string;
  icon: ReactNode;
  path: string;
  badge: BadgeConfig | null;
}

export type MenuItems = MenuItem[];