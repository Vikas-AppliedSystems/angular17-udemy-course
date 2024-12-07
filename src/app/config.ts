import { InjectionToken } from '@angular/core';

export interface AppConfig {
  apiUrl: string;
  courseCacheSize: number;
}

export const appConfig: AppConfig = {
  apiUrl: 'http://localhost:9000',
  courseCacheSize: 10,
};

export const CONFIG_TOKEN = new InjectionToken<AppConfig>('CONFIG_TOKEN');
