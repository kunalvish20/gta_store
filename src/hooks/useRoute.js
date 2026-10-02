import {useEffect, useState} from 'react';

const getRoute = () => location.hash.replace(/^#/, '') || '/';

export function go(path) {
  location.hash = path;
}

export function useRoute() {
  const [route, setRoute] = useState(getRoute);

  useEffect(() => {
    const handleRoute = () => {
      setRoute(getRoute());
      scrollTo({top: 0, behavior: 'smooth'});
    };

    addEventListener('hashchange', handleRoute);
    return () => removeEventListener('hashchange', handleRoute);
  }, []);

  return route;
}
