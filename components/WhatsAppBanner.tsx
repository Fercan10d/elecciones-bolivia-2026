"use client";

export default function WhatsAppBanner() {
  return (
    <>
      <style>{`
        .elpost-whatsapp-banner {
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
        .elpost-whatsapp-banner:hover {
          box-shadow: 0 6px 20px rgba(59, 107, 227, 0.35);
          transform: translateY(-2px);
          text-decoration: none;
        }
        .elpost-banner-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
        }
        .elpost-banner-left {
          display: flex;
          align-items: center;
          gap: 16px;
          flex: 1;
        }
        .elpost-whatsapp-icon-container {
          position: relative;
          flex-shrink: 0;
          width: 48px;
          height: 48px;
        }
        .elpost-whatsapp-icon {
          width: 48px;
          height: 48px;
          display: block;
          position: relative;
          z-index: 2;
        }
        .elpost-pulse-ring {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 48px;
          height: 48px;
          border: 3px solid #ffffff;
          border-radius: 50%;
          animation: elpost-pulse 2s ease-out infinite;
          z-index: 1;
        }
        @keyframes elpost-pulse {
          0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
          100% { transform: translate(-50%, -50%) scale(1.8); opacity: 0; }
        }
        .elpost-banner-text { flex: 1; }
        .elpost-banner-title {
          font-size: 18px;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 4px;
          line-height: 1.3;
        }
        .elpost-banner-subtitle {
          font-size: 14px;
          color: #ffffff;
          opacity: 0.95;
          line-height: 1.4;
        }
        .elpost-banner-cta { flex-shrink: 0; }
        .elpost-cta-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: linear-gradient(135deg, #25CA63 0%, #20b858 100%);
          color: #ffffff;
          padding: 12px 24px;
          border-radius: 8px;
          font-size: 15px;
          font-weight: 600;
          border: 2px solid #ffffff;
          pointer-events: none;
        }
        .elpost-badge-icon { width: 18px; height: 18px; }
        @media (max-width: 640px) {
          .elpost-whatsapp-banner { padding: 20px 16px; }
          .elpost-banner-content { flex-direction: column; text-align: center; }
          .elpost-banner-left { flex-direction: column; text-align: center; }
          .elpost-banner-title { font-size: 16px; }
          .elpost-banner-subtitle { font-size: 13px; }
          .elpost-cta-badge { width: 100%; justify-content: center; padding: 14px 24px; }
          .elpost-whatsapp-icon-container { width: 56px; height: 56px; }
          .elpost-whatsapp-icon { width: 56px; height: 56px; }
          .elpost-pulse-ring { width: 56px; height: 56px; }
        }
        @media (max-width: 400px) {
          .elpost-banner-title { font-size: 15px; }
          .elpost-banner-subtitle { font-size: 12px; }
        }
      `}</style>

      <a
        href="https://whatsapp.com/channel/0029Vb6kqFy9sBIHOoGW7d2u"
        className="elpost-whatsapp-banner"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="elpost-banner-content">
          <div className="elpost-banner-left">
            <div className="elpost-whatsapp-icon-container">
              <svg className="elpost-whatsapp-icon" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                <path fill="#ffffff" d="M16 0C7.163 0 0 7.163 0 16c0 2.826.737 5.477 2.031 7.777L0.195 31.24l7.644-2.006A15.96 15.96 0 0016 32c8.837 0 16-7.163 16-16S24.837 0 16 0z"/>
                <path fill="#25CA63" d="M16 3.2c-7.066 0-12.8 5.734-12.8 12.8 0 2.234.576 4.337 1.587 6.165l-1.039 3.789 3.883-1.019A12.747 12.747 0 0016 28.8c7.066 0 12.8-5.734 12.8-12.8S23.066 3.2 16 3.2zm7.505 18.253c-.309.869-1.533 1.593-2.509 1.799-.671.138-1.547.249-4.493-.96-3.771-1.548-6.197-5.413-6.384-5.664-.186-.251-1.525-2.027-1.525-3.867 0-1.84.965-2.743 1.307-3.115.342-.372.747-.465.997-.465.25 0 .498.002.717.013.23.012.539-.088.843.643.313.747 1.064 2.586 1.157 2.773.093.187.155.404.031.651-.125.248-.187.403-.374.621-.187.218-.393.486-.561.653-.187.187-.382.389-.164.763.218.373 1.157 1.907 2.485 3.088 1.709 1.52 3.148 1.992 3.593 2.217.445.224.704.187.963-.112.259-.3.744-.869.941-1.168.198-.3.395-.249.667-.15.272.1 1.728.815 2.024 1.08.297.187.495.28.567.435.072.156.072.9-.218 1.769z"/>
              </svg>
              <div className="elpost-pulse-ring"></div>
            </div>
            <div className="elpost-banner-text">
              <div className="elpost-banner-title">El Post → Canal de WhatsApp</div>
              <div className="elpost-banner-subtitle">Lo esencial</div>
            </div>
          </div>
          <div className="elpost-banner-cta">
            <div className="elpost-cta-badge">
              <svg className="elpost-badge-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              Síguenos
            </div>
          </div>
        </div>
      </a>
    </>
  );
}
