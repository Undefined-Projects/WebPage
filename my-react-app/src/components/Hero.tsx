import React, { useRef, useEffect, useState, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText as GSAPSplitText } from 'gsap/SplitText';
import PrimaryButton from './UI/PrimaryButton/Button';
import '../Shuffle.css';

gsap.registerPlugin(ScrollTrigger, GSAPSplitText);

type ShuffleProps = {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  shuffleDirection?: 'right' | 'left' | 'up' | 'down';
  duration?: number;
  maxDelay?: number;
  ease?: string;
  threshold?: number;
  rootMargin?: string;
  tag?: keyof JSX.IntrinsicElements;
  textAlign?: string;
  onShuffleComplete?: () => void;
  shuffleTimes?: number;
  animationMode?: string;
  loop?: boolean;
  loopDelay?: number;
  stagger?: number;
  scrambleCharset?: string;
  colorFrom?: string;
  colorTo?: string;
  triggerOnce?: boolean;
  respectReducedMotion?: boolean;
  triggerOnHover?: boolean;
};

const Shuffle = ({
  text,
  className = '',
  style = {},
  shuffleDirection = 'right',
  duration = 0.35,
  maxDelay = 0,
  ease = 'power3.out',
  threshold = 0.1,
  rootMargin = '-100px',
  tag = 'p',
  textAlign = 'center',
  onShuffleComplete,
  shuffleTimes = 1,
  animationMode = 'evenodd',
  loop = false,
  loopDelay = 0,
  stagger = 0.03,
  scrambleCharset = '',
  colorFrom,
  colorTo,
  triggerOnce = true,
  respectReducedMotion = true,
  triggerOnHover = true,
}: ShuffleProps) => {
  const ref = useRef<HTMLElement>(null);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [ready, setReady] = useState(false);

  const splitRef = useRef<InstanceType<typeof GSAPSplitText> | null>(null);
  const wrappersRef = useRef<HTMLElement[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const playingRef = useRef(false);
  const hoverHandlerRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if ('fonts' in document) {
      if (document.fonts.status === 'loaded') setFontsLoaded(true);
      else document.fonts.ready.then(() => setFontsLoaded(true));
    } else {
      setFontsLoaded(true);
    }
  }, []);

  const scrollTriggerStart = useMemo(() => {
    const startPct = (1 - threshold) * 100;
    const mm = /^(-?\d+(?:\.\d+)?)(px|em|rem|%)?$/.exec(rootMargin || '');
    const mv = mm ? parseFloat(mm[1]) : 0;
    const mu = mm ? mm[2] || 'px' : 'px';
    const sign = mv === 0 ? '' : mv < 0 ? `-=${Math.abs(mv)}${mu}` : `+=${mv}${mu}`;
    return `top ${startPct}%${sign}`;
  }, [threshold, rootMargin]);

  useEffect(() => {
    if (!ref.current || !text || !fontsLoaded) return;

    if (
      respectReducedMotion &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setReady(true);
      onShuffleComplete?.();
      return;
    }

    const el = ref.current;

    const removeHover = () => {
      if (hoverHandlerRef.current && ref.current) {
        ref.current.removeEventListener('mouseenter', hoverHandlerRef.current);
        hoverHandlerRef.current = null;
      }
    };

    const teardown = () => {
      if (tlRef.current) {
        tlRef.current.kill();
        tlRef.current = null;
      }
      if (wrappersRef.current.length) {
        wrappersRef.current.forEach(wrap => {
          const inner = wrap.firstElementChild;
          const orig = inner?.querySelector('[data-orig="1"]');
          if (orig && wrap.parentNode) wrap.parentNode.replaceChild(orig, wrap);
        });
        wrappersRef.current = [];
      }
      try {
        splitRef.current?.revert();
      } catch {
        /* noop */
      }
      splitRef.current = null;
      playingRef.current = false;
    };

    const build = () => {
      teardown();

      splitRef.current = new GSAPSplitText(el, {
        type: 'chars',
        charsClass: 'shuffle-char',
        wordsClass: 'shuffle-word',
        linesClass: 'shuffle-line',
        smartWrap: true,
        reduceWhiteSpace: false,
      });

      const chars = splitRef.current.chars || [];
      wrappersRef.current = [];

      const rolls = Math.max(1, Math.floor(shuffleTimes));
      const rand = (set: string) => set.charAt(Math.floor(Math.random() * set.length)) || '';

      chars.forEach(ch => {
        const parent = ch.parentElement;
        if (!parent) return;

        const w = ch.getBoundingClientRect().width;
        const h = ch.getBoundingClientRect().height;
        if (!w) return;

        const wrap = document.createElement('span');
        Object.assign(wrap.style, {
          display: 'inline-block',
          overflow: 'hidden',
          width: w + 'px',
          height: shuffleDirection === 'up' || shuffleDirection === 'down' ? h + 'px' : 'auto',
          verticalAlign: 'bottom',
        });

        const inner = document.createElement('span');
        Object.assign(inner.style, {
          display: 'inline-block',
          whiteSpace: shuffleDirection === 'up' || shuffleDirection === 'down' ? 'normal' : 'nowrap',
          willChange: 'transform',
        });

        parent.insertBefore(wrap, ch);
        wrap.appendChild(inner);

        const firstOrig = ch.cloneNode(true) as HTMLElement;
        Object.assign(firstOrig.style, {
          display: shuffleDirection === 'up' || shuffleDirection === 'down' ? 'block' : 'inline-block',
          width: w + 'px',
          textAlign: 'center',
        });

        ch.setAttribute('data-orig', '1');
        Object.assign(ch.style, {
          display: shuffleDirection === 'up' || shuffleDirection === 'down' ? 'block' : 'inline-block',
          width: w + 'px',
          textAlign: 'center',
        });

        inner.appendChild(firstOrig);
        for (let k = 0; k < rolls; k++) {
          const c = ch.cloneNode(true) as HTMLElement;
          if (scrambleCharset) c.textContent = rand(scrambleCharset);
          Object.assign(c.style, {
            display: shuffleDirection === 'up' || shuffleDirection === 'down' ? 'block' : 'inline-block',
            width: w + 'px',
            textAlign: 'center',
          });
          inner.appendChild(c);
        }
        inner.appendChild(ch);

        const steps = rolls + 1;

        if (shuffleDirection === 'right' || shuffleDirection === 'down') {
          const firstCopy = inner.firstElementChild;
          const real = inner.lastElementChild;
          if (real) inner.insertBefore(real, inner.firstChild);
          if (firstCopy) inner.appendChild(firstCopy);
        }

        let startX = 0, finalX = 0, startY = 0, finalY = 0;

        if (shuffleDirection === 'right') {
          startX = -steps * w;
          finalX = 0;
        } else if (shuffleDirection === 'left') {
          startX = 0;
          finalX = -steps * w;
        } else if (shuffleDirection === 'down') {
          startY = -steps * h;
          finalY = 0;
        } else if (shuffleDirection === 'up') {
          startY = 0;
          finalY = -steps * h;
        }

        if (shuffleDirection === 'left' || shuffleDirection === 'right') {
          gsap.set(inner, { x: startX, y: 0, force3D: true });
          inner.setAttribute('data-start-x', String(startX));
          inner.setAttribute('data-final-x', String(finalX));
        } else {
          gsap.set(inner, { x: 0, y: startY, force3D: true });
          inner.setAttribute('data-start-y', String(startY));
          inner.setAttribute('data-final-y', String(finalY));
        }

        if (colorFrom) inner.style.color = colorFrom;
        wrappersRef.current.push(wrap);
      });
    };

    const inners = () => wrappersRef.current.map(w => w.firstElementChild as HTMLElement);

    const randomizeScrambles = () => {
      if (!scrambleCharset) return;
      wrappersRef.current.forEach(w => {
        const strip = w.firstElementChild;
        if (!strip) return;
        const kids = Array.from(strip.children);
        for (let i = 1; i < kids.length - 1; i++) {
          kids[i].textContent = scrambleCharset.charAt(Math.floor(Math.random() * scrambleCharset.length));
        }
      });
    };

    const cleanupToStill = () => {
      wrappersRef.current.forEach(w => {
        const strip = w.firstElementChild as HTMLElement;
        if (!strip) return;
        const real = strip.querySelector('[data-orig="1"]');
        if (!real) return;
        strip.replaceChildren(real);
        strip.style.transform = 'none';
        strip.style.willChange = 'auto';
      });
    };

    // Define armHover before play so it can be referenced inside play's onComplete
    const armHover = () => {
      if (!triggerOnHover || !ref.current) return;
      removeHover();
      const handler = () => {
        if (playingRef.current) return;
        build();
        if (scrambleCharset) randomizeScrambles();
        play();
      };
      hoverHandlerRef.current = handler;
      ref.current.addEventListener('mouseenter', handler);
    };

    const play = () => {
      const strips = inners();
      if (!strips.length) return;

      playingRef.current = true;
      const isVertical = shuffleDirection === 'up' || shuffleDirection === 'down';

      const tl = gsap.timeline({
        smoothChildTiming: true,
        repeat: loop ? -1 : 0,
        repeatDelay: loop ? loopDelay : 0,
        onRepeat: () => {
          if (scrambleCharset) randomizeScrambles();
          if (isVertical) {
            gsap.set(strips, { y: (i, t) => parseFloat(t.getAttribute('data-start-y') || '0') });
          } else {
            gsap.set(strips, { x: (i, t) => parseFloat(t.getAttribute('data-start-x') || '0') });
          }
          onShuffleComplete?.();
        },
        onComplete: () => {
          playingRef.current = false;
          if (!loop) {
            cleanupToStill();
            if (colorTo) gsap.set(strips, { color: colorTo });
            onShuffleComplete?.();
            armHover();
          }
        },
      });

      const addTween = (targets: HTMLElement[], at: number) => {
        const vars: gsap.TweenVars = {
          duration,
          ease,
          force3D: true,
          stagger: animationMode === 'evenodd' ? stagger : 0,
        };
        if (isVertical) {
          vars.y = (i: number, t: HTMLElement) => parseFloat(t.getAttribute('data-final-y') || '0');
        } else {
          vars.x = (i: number, t: HTMLElement) => parseFloat(t.getAttribute('data-final-x') || '0');
        }
        tl.to(targets, vars, at);
        if (colorFrom && colorTo) {
          tl.to(targets, { color: colorTo, duration, ease }, at);
        }
      };

      if (animationMode === 'evenodd') {
        const odd = strips.filter((_, i) => i % 2 === 1);
        const even = strips.filter((_, i) => i % 2 === 0);
        const oddTotal = duration + Math.max(0, odd.length - 1) * stagger;
        const evenStart = odd.length ? oddTotal * 0.7 : 0;
        if (odd.length) addTween(odd, 0);
        if (even.length) addTween(even, evenStart);
      } else {
        strips.forEach(strip => {
          const d = Math.random() * maxDelay;
          const vars: gsap.TweenVars = { duration, ease, force3D: true };
          if (isVertical) {
            vars.y = parseFloat(strip.getAttribute('data-final-y') || '0');
          } else {
            vars.x = parseFloat(strip.getAttribute('data-final-x') || '0');
          }
          tl.to(strip, vars, d);
          if (colorFrom && colorTo) {
            tl.fromTo(strip, { color: colorFrom }, { color: colorTo, duration, ease }, d);
          }
        });
      }

      tlRef.current = tl;
    };

    // armHover is only called from play's onComplete — not here
    const create = () => {
      build();
      if (scrambleCharset) randomizeScrambles();
      play();
      setReady(true);
    };

    const st = ScrollTrigger.create({
      trigger: el,
      start: scrollTriggerStart,
      once: triggerOnce,
      onEnter: create,
    });

    return () => {
      st.kill();
      removeHover();
      teardown();
      setReady(false);
    };
  },
    [
      text,
      duration,
      maxDelay,
      ease,
      scrollTriggerStart,
      fontsLoaded,
      shuffleDirection,
      shuffleTimes,
      animationMode,
      loop,
      loopDelay,
      stagger,
      scrambleCharset,
      colorFrom,
      colorTo,
      triggerOnce,
      respectReducedMotion,
      triggerOnHover,
      onShuffleComplete,
    ]
  );

  const commonStyle = useMemo(() => ({ textAlign, ...style }), [textAlign, style]);
  const classes = useMemo(
    () => `shuffle-parent ${ready ? 'is-ready' : ''} ${className}`.trim(),
    [ready, className]
  );

  return React.createElement(tag, { ref, className: classes, style: commonStyle }, text);
};

// ---------------------------------------------------------------------------

type HeroProps = {};

const Hero = (_props: HeroProps) => {
  return (
    <div className="hero">
      <div className="heroBackgroundContainer">
        {/* Empty alt marks this as decorative for screen readers */}
        <img src="banner.png" className="heroBackgroundImg" alt="" />
      </div>
      <div className="heroTextContainer">
        {/* Use h1 for correct semantic hierarchy */}
        <Shuffle text="Undefined Club" tag="h1" className='heroTitle'/>
        <p className="heroParagraph">Define your undefined.</p>
        <div className="heroCTAContainer">
          <button className="heroCTA">
            <svg
              width="21"
              height="21"
              viewBox="0 0 21 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="heroCTAIcon"
              aria-hidden="true"
            >
              <path
                d="M18.7434 9.5567C18.9001 9.48759 19.033 9.37406 19.1257 9.23015C19.2185 9.08624 19.267 8.91829 19.2652 8.74709C19.2634 8.5759 19.2115 8.40898 19.1158 8.26702C19.0201 8.12506 18.8848 8.0143 18.7268 7.94845L11.2272 4.53245C10.9992 4.42845 10.7515 4.37463 10.5009 4.37463C10.2503 4.37463 10.0027 4.42845 9.77467 4.53245L2.27592 7.94495C2.12014 8.01317 1.98762 8.12531 1.89457 8.26766C1.80151 8.41 1.75195 8.57638 1.75195 8.74645C1.75195 8.91651 1.80151 9.08289 1.89457 9.22523C1.98762 9.36758 2.12014 9.47972 2.27592 9.54795L9.77467 12.9674C10.0027 13.0714 10.2503 13.1253 10.5009 13.1253C10.7515 13.1253 10.9992 13.0714 11.2272 12.9674L18.7434 9.5567Z"
                stroke="#333AA6"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path d="M19.25 8.75V14" stroke="#333AA6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path
                d="M5.25 10.9375V14C5.25 14.6962 5.80312 15.3639 6.78769 15.8562C7.77226 16.3484 9.10761 16.625 10.5 16.625C11.8924 16.625 13.2277 16.3484 14.2123 15.8562C15.1969 15.3639 15.75 14.6962 15.75 14V10.9375"
                stroke="#333AA6"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Aprende
          </button>
          <PrimaryButton className='heroSecondaryCTA'>Nosotros</PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default Hero;