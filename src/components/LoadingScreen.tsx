import { useEffect, useState } from 'react';
import './LoadingScreen.css';

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div className="loading-screen">
      <div className="loading-screen__content">
        <div className="loading-screen__logo">
          <span className="loading-screen__icon">🛋️</span>
          <h1 className="loading-screen__title">
            Gujrat Furniture
            <span className="loading-screen__subtitle">Gulyana</span>
          </h1>
        </div>
        <div className="loading-screen__spinner">
          <div className="loading-screen__spinner-ring"></div>
          <div className="loading-screen__spinner-ring"></div>
          <div className="loading-screen__spinner-ring"></div>
        </div>
        <p className="loading-screen__text">Loading Premium Furniture...</p>
      </div>
    </div>
  );
}
