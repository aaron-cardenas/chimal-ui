import { Injectable } from '@angular/core';

declare global {
  interface Window { dataLayer?: Array<Record<string, any>> }
}

@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  trackEvent(event: string, params?: Record<string, any>) {
    const payload = { event, ...(params ?? {}), ts: Date.now() };
    if (typeof window !== 'undefined') {
      if (Array.isArray(window.dataLayer)) {
        window.dataLayer.push(payload);
      } else {
        // Fallback simple
        // eslint-disable-next-line no-console
        console.debug('[analytics]', payload);
      }
    }
    return payload;
  }
}

