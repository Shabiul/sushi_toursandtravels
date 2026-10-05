export const GA_TRACKING_ID = 'G-51P2C6Y9D7';
export const GOOGLE_ADS_ID = 'AW-18310323966';
export const GOOGLE_ADS_LEAD_CONVERSION = 'AW-18310323966/Bl07CJqJl48dEP69hZtE';

declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
  }
}

/**
 * Track Google Ads "Submit lead form" conversion event:
 * gtag('event', 'conversion', {
 *   'send_to': 'AW-18310323966/Bl07CJqJl48dEP69hZtE',
 *   'value': 1.0,
 *   'currency': 'INR'
 * });
 */
export const trackLeadFormConversion = (extraParams?: Record<string, any>) => {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', 'conversion', {
      send_to: GOOGLE_ADS_LEAD_CONVERSION,
      value: 1.0,
      currency: 'INR',
      ...extraParams,
    });
  }
};
