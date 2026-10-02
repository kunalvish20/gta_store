import {useState} from 'react';
import {CartDrawer} from './components/CartDrawer';
import {Footer} from './components/Footer';
import {Header} from './components/Header';
import {IntroLoader} from './components/IntroLoader';
import {StoreProvider} from './context/StoreContext';
import {PRODUCT_PATH} from './data/catalog';
import {useRoute} from './hooks/useRoute';
import {Cart} from './pages/Cart';
import {Checkout} from './pages/Checkout';
import {Home} from './pages/Home';
import {HomeSecondary} from './pages/HomeSecondary';
import {InfoPage} from './pages/InfoPage';
import {ProductPage} from './pages/ProductPage';

function RouteView() {
  const route = useRoute();

  if (route === '/' || route === '/home' || route === '/homepage-secondary' || route === '/home-secondary') return <HomeSecondary />;
  if (route === '/old-homepage' || route === '/old-home') return <Home />;
  if (route === PRODUCT_PATH || route.startsWith('/product/')) return <ProductPage />;
  if (route === '/cart') return <Cart />;
  if (route === '/checkout') return <Checkout />;
  if (['/shipping', '/returns', '/privacy', '/contact'].includes(route)) return <InfoPage type={route.slice(1)} />;

  return <ProductPage />;
}

export function App() {
  const [showContent, setShowContent] = useState(false);

  return (
    <>
      <IntroLoader onComplete={() => setShowContent(true)} />
      {showContent && (
        <StoreProvider>
          <Header />
          <RouteView />
          <Footer />
          <CartDrawer />
        </StoreProvider>
      )}
    </>
  );
}
