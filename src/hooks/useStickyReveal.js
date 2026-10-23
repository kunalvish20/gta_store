import {useEffect, useState} from 'react';

export function useStickyReveal(offset = 420, hideWhenVisibleSelector = null) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const hideTarget = hideWhenVisibleSelector && document.querySelector(hideWhenVisibleSelector);
        const targetInView = hideTarget && hideTarget.getBoundingClientRect().top < window.innerHeight;
        setVisible(window.scrollY > offset && !targetInView);
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
  }, [offset, hideWhenVisibleSelector]);

  return visible;
}
