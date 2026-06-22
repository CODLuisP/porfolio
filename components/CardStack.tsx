import React, { useState, useEffect, useRef } from 'react';

const CARDS = [
  '/card1.png',
  '/card2.png',
  '/card3.png',
  '/card4.png',
  '/card5.png',
];

const cardCount = CARDS.length;

export default function CardStack() {
  const cardsRefs = useRef<(HTMLDivElement | null)[]>([]);
  const shineRefs = useRef<(HTMLDivElement | null)[]>([]);
  const frameId = useRef<number>(0);
  const lastTime = useRef<number>(-1);
  const progress = useRef<number>(0);
  const mouse = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, vx: 0, vy: 0, rawX: 0, rawY: 0 });

  const metricsRef = useRef({ cardW: 336, cardH: 174 });
  const [metrics, setMetrics] = useState({ cardW: 336, cardH: 174 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.rawX = e.clientX - window.innerWidth / 2;
      mouse.current.rawY = e.clientY - window.innerHeight / 2;
    };
    const handleMouseLeave = () => {
      mouse.current.rawX = 0;
      mouse.current.rawY = 0;
    };
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      let cardW = Math.round(w * 0.16 + 130);
      const heightFactor = Math.min(1.0, Math.max(0.65, h / 850));
      cardW = Math.round(cardW * heightFactor);
      cardW = Math.min(336, Math.max(150, cardW));
      const cardH = Math.round(cardW / 1.93);
      metricsRef.current = { cardW, cardH };
      setMetrics({ cardW, cardH });
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const renderLoopRef = useRef<(timestamp: number) => void>(() => {});
  renderLoopRef.current = (timestamp: number) => {
    if (lastTime.current < 0) lastTime.current = timestamp;
    const dt = Math.min((timestamp - lastTime.current) / 1000, 0.05);
    lastTime.current = timestamp;

    progress.current += dt * 0.12;

    const { cardW, cardH } = metricsRef.current;
    const mx = mouse.current;
    mx.targetX = Math.max(-1, Math.min(1, mx.rawX / (cardW / 2)));
    mx.targetY = Math.max(-1, Math.min(1, mx.rawY / (cardH / 2)));

    mx.vx += ((mx.targetX - mx.x) * 38 - mx.vx * 11) * dt;
    mx.vy += ((mx.targetY - mx.y) * 38 - mx.vy * 11) * dt;
    mx.x += mx.vx * dt;
    mx.y += mx.vy * dt;

    const offsets: number[] = [];
    const half = cardCount / 2;
    for (let i = 0; i < cardCount; i++) {
      let offset = i - (progress.current % cardCount);
      while (offset > half) offset -= cardCount;
      while (offset < -half) offset += cardCount;
      offsets.push(offset);
    }

    for (let i = 0; i < cardCount; i++) {
      const card = cardsRefs.current[i];
      if (!card) continue;

      const offset = offsets[i];
      const absOffset = Math.abs(offset);

      if (absOffset >= half - 0.05) {
        card.style.opacity = '0';
        card.style.zIndex = '0';
        continue;
      }

      const sign = offset < 0 ? -1 : 1;

      let y: number;
      if (absOffset <= 1) {
        const e = absOffset * absOffset * (3 - 2 * absOffset);
        y = sign * e * cardH * 1.08;
      } else if (absOffset <= 2) {
        const t = absOffset - 1;
        const e = t * t * (3 - 2 * t);
        y = sign * (cardH * 1.08 + e * cardH * 0.60);
      } else {
        y = sign * (cardH * 1.68 + (absOffset - 2) * cardH * 0.55);
      }

      const z = 60 - Math.min(absOffset, 2) * 45;
      const scale = Math.max(0.80, 1 - Math.min(absOffset, 2) * 0.10);
      const opacity = Math.max(0, 1 - Math.max(0, absOffset - 0.7) * 0.78);
      const centerW = Math.max(0, 1 - absOffset * 1.8);
      const tiltX = -mx.y * 8 * centerW;
      const tiltY = mx.x * 14 * centerW;

      card.style.transform =
        `translateY(${y.toFixed(1)}px) translateZ(${z.toFixed(1)}px) ` +
        `scale(${scale.toFixed(4)}) ` +
        `rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg)`;
      card.style.opacity = Math.min(1, opacity).toFixed(3);
      card.style.zIndex = String(Math.round(200 - absOffset * 40));

      const shine = shineRefs.current[i];
      if (shine) {
        if (centerW > 0.01) {
          shine.style.transform = `translate(${(mx.x * cardW * 0.38).toFixed(1)}px, ${(mx.y * cardH * 0.30).toFixed(1)}px)`;
          shine.style.opacity = (centerW * 0.75).toFixed(3);
        } else {
          shine.style.opacity = '0';
        }
      }
    }
  };

  useEffect(() => {
    lastTime.current = -1;
    const tick = (ts: number) => {
      renderLoopRef.current(ts);
      frameId.current = requestAnimationFrame(tick);
    };
    frameId.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId.current);
  }, []);

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden select-none">
      <div
        className="relative w-full h-full flex items-center justify-center pointer-events-none"
        style={{ perspective: '1200px' }}
      >
        <div
          className="absolute"
          style={{
            width: `${metrics.cardW}px`,
            height: `${metrics.cardH}px`,
            transformStyle: 'preserve-3d',
          }}
        >
          {Array.from({ length: cardCount }).map((_, i) => (
            <div
              key={i}
              ref={(el) => { cardsRefs.current[i] = el; }}
              className="absolute inset-0"
              style={{
                width: `${metrics.cardW}px`,
                height: `${metrics.cardH}px`,
                transformStyle: 'flat',
                willChange: 'transform, opacity',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
              } as React.CSSProperties}
            >
              <div
                className="absolute inset-0 rounded-2xl overflow-hidden"
                style={{
                  boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                <img
                  src={CARDS[i % CARDS.length]}
                  alt=""
                  className="w-full h-full object-cover"
                  draggable={false}
                  style={{ imageRendering: 'auto', transform: 'translateZ(0)' }}
                />
                {/* Spotlight shine */}
                <div
                  ref={(el) => { shineRefs.current[i] = el; }}
                  className="absolute pointer-events-none"
                  style={{
                    inset: '-50%', width: '200%', height: '200%',
                    background: 'radial-gradient(ellipse 35% 30% at 50% 50%, rgba(255,255,255,0.13) 0%, transparent 100%)',
                    opacity: 0, zIndex: 5,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
