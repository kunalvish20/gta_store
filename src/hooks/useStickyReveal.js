import {useEffect, useState} from 'react';

export function useStickyReveal(offset = 420) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        setVisible(window.scrollY > offset);
      });
    };

    update();
    window.addEventListener('scroll', update, {passive: true});
    window.addEventListener('resize', update);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [offset]);

  return visible;
}
