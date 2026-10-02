import {useRef, useState} from 'react';
import {useGSAP} from '@gsap/react';
import gsap from 'gsap';

gsap.registerPlugin(useGSAP);

export function IntroLoader({onComplete}) {
  const [visible, setVisible] = useState(true);
  const completedRef = useRef(false);
  const loaderRef = useRef(null);

  useGSAP(
    () => {
      gsap.set('.vi-mask-group', {
        svgOrigin: '400 300',
        transformOrigin: '50% 50%'
      });

      const finish = () => {
        if (completedRef.current) return;
        completedRef.current = true;
        setVisible(false);
        onComplete?.();
      };

      const tl = gsap.timeline({defaults: {transformOrigin: '50% 50%'}});

      tl.to('.vi-mask-group', {
        rotate: 10,
        duration: 2,
        ease: 'power4.inOut',
        svgOrigin: '400 300'
      }).to('.vi-mask-group', {
        scale: 10,
        duration: 2,
        delay: -1.8,
        ease: 'expo.inOut',
        svgOrigin: '400 300',
        opacity: 0,
        onUpdate() {
          if (this.progress() >= 0.9) {
            finish();
            this.kill();
          }
        }
      });
    },
    {scope: loaderRef}
  );

  if (!visible) return null;

  return (
    <div className="intro-loader" ref={loaderRef} aria-label="Loading D&D Store">
      <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" role="img" aria-hidden="true">
        <defs>
          <mask id="viMask">
            <rect width="100%" height="100%" fill="black" />
            <g className="vi-mask-group">
              <text
                x="400"
                y="300"
                fontSize="250"
                textAnchor="middle"
                fill="white"
                dominantBaseline="middle"
                fontFamily="Arial Black, Impact, sans-serif"
              >
                VI
              </text>
            </g>
          </mask>
        </defs>

        <image
          href="/bg.png"
          width="100%"
          height="100%"
          preserveAspectRatio="xMidYMid slice"
          mask="url(#viMask)"
        />
      </svg>
    </div>
  );
}
