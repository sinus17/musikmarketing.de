import { onCLS, onFCP, onLCP, onTTFB, onINP } from 'web-vitals';
import type { Metric } from 'web-vitals';
import ReactGA from 'react-ga4';

const sendToAnalytics = (metric: Metric) => {
  const { name, value, id, rating } = metric;
  
  ReactGA.event({
    category: 'Web Vitals',
    action: name,
    value: Math.round(name === 'CLS' ? value * 1000 : value),
    label: id,
    nonInteraction: true,
  });

  console.log(`[Web Vitals] ${name}: ${value} (${rating})`);
};

export const reportWebVitals = () => {
  onCLS(sendToAnalytics);
  onFCP(sendToAnalytics);
  onLCP(sendToAnalytics);
  onTTFB(sendToAnalytics);
  onINP(sendToAnalytics);
};
