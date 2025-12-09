import { useState } from 'react';
import { WebLogin } from './components/web/WebLogin';
import { WebDashboard } from './components/web/WebDashboard';
import { WebRequests } from './components/web/WebRequests';
import { WebRequestDetail } from './components/web/WebRequestDetail';
import { WebRoutes } from './components/web/WebRoutes';
import { WebVehicles } from './components/web/WebVehicles';
import { WebReports } from './components/web/WebReports';
import { MobileLogin } from './components/mobile/MobileLogin';
import { MobileHome } from './components/mobile/MobileHome';
import { MobileCreateRequest } from './components/mobile/MobileCreateRequest';
import { MobileTracking } from './components/mobile/MobileTracking';
import { MobileHistory } from './components/mobile/MobileHistory';
import { ViewSelector } from './components/shared/ViewSelector';

type WebView = 'login' | 'dashboard' | 'requests' | 'request-detail' | 'routes' | 'vehicles' | 'reports';
type MobileView = 'login' | 'home' | 'create-request' | 'tracking' | 'history';

export default function App() {
  const [platform, setPlatform] = useState<'web' | 'mobile'>('web');
  const [webView, setWebView] = useState<WebView>('login');
  const [mobileView, setMobileView] = useState<MobileView>('login');
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(null);
  const [isWebAuthenticated, setIsWebAuthenticated] = useState(false);
  const [isMobileAuthenticated, setIsMobileAuthenticated] = useState(false);

  const handleWebLogin = () => {
    setIsWebAuthenticated(true);
    setWebView('dashboard');
  };

  const handleMobileLogin = () => {
    setIsMobileAuthenticated(true);
    setMobileView('home');
  };

  const handleViewRequestDetail = (requestId: string) => {
    setSelectedRequestId(requestId);
    setWebView('request-detail');
  };

  const renderWebContent = () => {
    if (!isWebAuthenticated && webView !== 'login') {
      return <WebLogin onLogin={handleWebLogin} />;
    }

    switch (webView) {
      case 'login':
        return <WebLogin onLogin={handleWebLogin} />;
      case 'dashboard':
        return <WebDashboard onNavigate={setWebView} />;
      case 'requests':
        return <WebRequests onNavigate={setWebView} onViewDetail={handleViewRequestDetail} />;
      case 'request-detail':
        return <WebRequestDetail requestId={selectedRequestId} onNavigate={setWebView} />;
      case 'routes':
        return <WebRoutes onNavigate={setWebView} />;
      case 'vehicles':
        return <WebVehicles onNavigate={setWebView} />;
      case 'reports':
        return <WebReports onNavigate={setWebView} />;
      default:
        return <WebDashboard onNavigate={setWebView} />;
    }
  };

  const renderMobileContent = () => {
    if (!isMobileAuthenticated && mobileView !== 'login') {
      return <MobileLogin onLogin={handleMobileLogin} />;
    }

    switch (mobileView) {
      case 'login':
        return <MobileLogin onLogin={handleMobileLogin} />;
      case 'home':
        return <MobileHome onNavigate={setMobileView} />;
      case 'create-request':
        return <MobileCreateRequest onNavigate={setMobileView} />;
      case 'tracking':
        return <MobileTracking onNavigate={setMobileView} />;
      case 'history':
        return <MobileHistory onNavigate={setMobileView} />;
      default:
        return <MobileHome onNavigate={setMobileView} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ViewSelector 
        platform={platform} 
        onPlatformChange={setPlatform}
        webView={webView}
        mobileView={mobileView}
        onWebViewChange={setWebView}
        onMobileViewChange={setMobileView}
        isWebAuthenticated={isWebAuthenticated}
        isMobileAuthenticated={isMobileAuthenticated}
      />
      
      {platform === 'web' ? renderWebContent() : renderMobileContent()}
    </div>
  );
}
