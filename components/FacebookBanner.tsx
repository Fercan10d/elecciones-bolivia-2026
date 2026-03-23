"use client";

export default function FacebookBanner() {
  return (
    <>
      <style>{`
        .elpost-facebook-banner {
          background: #3B6BE3;
          border: none;
          border-radius: 12px;
          padding: 24px;
          max-width: 800px;
          margin: 30px auto;
          box-shadow: 0 4px 12px rgba(59, 107, 227, 0.25);
          transition: all 0.3s ease;
          font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          text-decoration: none;
          display: block;
          cursor: pointer;
        }
        .elpost-facebook-banner:hover {
          box-shadow: 0 6px 20px rgba(59, 107, 227, 0.35);
          transform: translateY(-2px);
          text-decoration: none;
        }
        .elpost-facebook-banner-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
        }
        .elpost-facebook-banner-left {
          display: flex;
          align-items: center;
          gap: 16px;
          flex: 1;
        }
        .elpost-facebook-icon-container {
          position: relative;
          flex-shrink: 0;
          width: 48px;
          height: 48px;
        }
        .elpost-facebook-icon {
          width: 48px;
          height: 48px;
          display: block;
          position: relative;
          z-index: 2;
        }
        .elpost-facebook-pulse-ring {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 48px;
          height: 48px;
          border: 3px solid #ffffff;
          border-radius: 50%;
          animation: elpost-facebook-pulse 2s ease-out infinite;
          z-index: 1;
        }
        @keyframes elpost-facebook-pulse {
          0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
          100% { transform: translate(-50%, -50%) scale(1.8); opacity: 0; }
        }
        .elpost-facebook-banner-text { flex: 1; }
        .elpost-facebook-banner-title {
          font-size: 18px;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 4px;
          line-height: 1.3;
        }
        .elpost-facebook-banner-subtitle {
          font-size: 14px;
          color: #ffffff;
          opacity: 0.95;
          line-height: 1.4;
        }
        .elpost-facebook-banner-cta { flex-shrink: 0; }
        .elpost-facebook-cta-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: linear-gradient(135deg, #1877F2 0%, #0C63D4 100%);
          color: #ffffff;
          padding: 12px 24px;
          border-radius: 8px;
          font-size: 15px;
          font-weight: 600;
          border: 2px solid #ffffff;
          pointer-events: none;
        }
        .elpost-facebook-badge-icon { width: 18px; height: 18px; }
        @media (max-width: 640px) {
          .elpost-facebook-banner { padding: 20px 16px; }
          .elpost-facebook-banner-content { flex-direction: column; text-align: center; }
          .elpost-facebook-banner-left { flex-direction: column; text-align: center; }
          .elpost-facebook-banner-title { font-size: 16px; }
          .elpost-facebook-banner-subtitle { font-size: 13px; }
          .elpost-facebook-cta-badge { width: 100%; justify-content: center; padding: 14px 24px; }
          .elpost-facebook-icon-container { width: 56px; height: 56px; }
          .elpost-facebook-icon { width: 56px; height: 56px; }
          .elpost-facebook-pulse-ring { width: 56px; height: 56px; }
        }
        @media (max-width: 400px) {
          .elpost-facebook-banner-title { font-size: 15px; }
          .elpost-facebook-banner-subtitle { font-size: 12px; }
        }
      `}</style>

      <a
        href="https://www.facebook.com/elpostbolivia"
        className="elpost-facebook-banner"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="elpost-facebook-banner-content">
          <div className="elpost-facebook-banner-left">
            <div className="elpost-facebook-icon-container">
              <svg className="elpost-facebook-icon" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <circle cx="24" cy="24" r="23" fill="#ffffff" stroke="#ffffff" strokeWidth="2"/>
                <path fill="#1877F2" d="M27.5 25.5h3.5l.5-4h-4V18c0-1.03 0-2 2-2h2V12.5c-.35-.05-1.54-.15-2.93-.15-2.99 0-5.07 1.83-5.07 5.15v3h-3.5v4h3.5v11h4V25.5z"/>
              </svg>
              <div className="elpost-facebook-pulse-ring"></div>
            </div>
            <div className="elpost-facebook-banner-text">
              <div className="elpost-facebook-banner-title">El Post → Página de Facebook</div>
              <div className="elpost-facebook-banner-subtitle">Lo esencial</div>
            </div>
          </div>
          <div className="elpost-facebook-banner-cta">
            <div className="elpost-facebook-cta-badge">
              <svg className="elpost-facebook-badge-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Síguenos
            </div>
          </div>
        </div>
      </a>
    </>
  );
}
