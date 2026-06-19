import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';

// Three.js animated scenes — one per card: data transfer, GitHub, networks,
// servers/Linux and databases.
type SceneType = 'datatransfer' | 'architecture' | 'network' | 'servers' | 'database';

const CARD_SCENES: { type: SceneType; accent: string; label: string; cmd: string }[] = [
  { type: 'datatransfer', accent: '#2B7FFF', label: 'Estructuras & Algoritmos', cmd: 'O(log n) // binary search' },
  { type: 'architecture', accent: '#A371F7', label: 'Arquitectura de Software', cmd: 'GET /api/v1/users HTTP/2'  },
  { type: 'network',      accent: '#34C759', label: 'Redes & Dist. Systems',    cmd: 'curl -I https://api.dev'   },
  { type: 'servers',      accent: '#E95420', label: 'Linux / CLI',              cmd: 'sudo systemctl restart'    },
  { type: 'database',     accent: '#7AA2F7', label: 'Bases de Datos',           cmd: 'SELECT * FROM users;'      },
];

// A self-contained WebGL canvas that fills its parent and renders an
// abstract animation for the given theme. Cleans up fully on unmount.
function CardScene({ type, accent, onRegister }: { type: SceneType; accent: string; onRegister: (tick: ((t: number) => void) | null) => void }) {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let width = mount.clientWidth || 320;
    let height = mount.clientHeight || 200;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 100);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
    renderer.setPixelRatio(1);
    renderer.setSize(width, height);
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    mount.appendChild(renderer.domElement);

    const color = new THREE.Color(accent);
    const group = new THREE.Group();
    scene.add(group);

    scene.add(new THREE.AmbientLight(0xffffff, 0.6));
    const key = new THREE.PointLight(0xffffff, 60);
    key.position.set(4, 5, 6);
    scene.add(key);
    const fill = new THREE.PointLight(color.getHex(), 45);
    fill.position.set(-5, -3, 4);
    scene.add(fill);

    const geometries: THREE.BufferGeometry[] = [];
    const materials: THREE.Material[] = [];
    let update: (t: number) => void = () => {};

    if (type === 'datatransfer') {
      // Two endpoints exchanging glowing data packets across parallel lanes.
      const laneYs = [0.8, 0, -0.8];
      const epGeo = new THREE.BoxGeometry(0.5, 2.1, 0.5);
      const epMat = new THREE.MeshStandardMaterial({
        color, emissive: color, emissiveIntensity: 0.35, metalness: 0.6, roughness: 0.3,
      });
      const left = new THREE.Mesh(epGeo, epMat); left.position.x = -2.4; group.add(left);
      const right = new THREE.Mesh(epGeo, epMat); right.position.x = 2.4; group.add(right);
      geometries.push(epGeo); materials.push(epMat);

      const linePts: number[] = [];
      laneYs.forEach((y) => linePts.push(-2.4, y, 0, 2.4, y, 0));
      const lineGeo = new THREE.BufferGeometry();
      lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePts, 3));
      const lineMat = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.35 });
      group.add(new THREE.LineSegments(lineGeo, lineMat));
      geometries.push(lineGeo); materials.push(lineMat);

      const pkgGeo = new THREE.BoxGeometry(0.17, 0.17, 0.17);
      const pkgMat = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: color, emissiveIntensity: 1.0 });
      geometries.push(pkgGeo); materials.push(pkgMat);
      const packets: { m: THREE.Mesh; y: number; p: number; dir: number; speed: number }[] = [];
      laneYs.forEach((y, li) => {
        for (let k = 0; k < 4; k++) {
          const m = new THREE.Mesh(pkgGeo, pkgMat);
          group.add(m);
          packets.push({ m, y, p: k / 4, dir: li % 2 === 0 ? 1 : -1, speed: 0.22 + 0.06 * li });
        }
      });
      update = (t) => {
        packets.forEach((pk) => {
          pk.p += pk.speed * 0.016 * pk.dir;
          if (pk.p > 1) pk.p -= 1;
          if (pk.p < 0) pk.p += 1;
          pk.m.position.set(-2.4 + pk.p * 4.8, pk.y, 0);
        });
        group.rotation.y = Math.sin(t * 0.25) * 0.18;
      };
    } else if (type === 'architecture') {
      // Blueprint component diagram: wireframe boxes (EdgesGeometry) arranged in
      // three layers (API → services → stores) connected by dependency lines with
      // travelling signal dots. The wireframe look is instantly "architecture", not "database".
      const boxGeo = new THREE.BoxGeometry(0.72, 0.33, 0.26);
      const edgesGeo = new THREE.EdgesGeometry(boxGeo);
      const wireMat = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.88 });
      geometries.push(boxGeo, edgesGeo); materials.push(wireMat);

      const positions: THREE.Vector3[] = [
        new THREE.Vector3( 0,     1.25, 0),  // API gateway  (top)
        new THREE.Vector3(-1.35,  0.1,  0),  // service A
        new THREE.Vector3( 0,     0.1,  0),  // service B
        new THREE.Vector3( 1.35,  0.1,  0),  // service C
        new THREE.Vector3(-0.67, -1.1,  0),  // data store A (bottom)
        new THREE.Vector3( 0.67, -1.1,  0),  // data store B
      ];

      positions.forEach((p) => {
        const wire = new THREE.LineSegments(edgesGeo, wireMat);
        wire.position.copy(p);
        group.add(wire);
      });

      const connPairs: [number, number][] = [
        [0, 1], [0, 2], [0, 3],
        [1, 4], [2, 4], [2, 5], [3, 5],
      ];
      const connPts: number[] = [];
      connPairs.forEach(([a, b]) => {
        connPts.push(...positions[a].toArray(), ...positions[b].toArray());
      });
      const connGeo = new THREE.BufferGeometry();
      connGeo.setAttribute('position', new THREE.Float32BufferAttribute(connPts, 3));
      const connMat = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.38 });
      group.add(new THREE.LineSegments(connGeo, connMat));
      geometries.push(connGeo); materials.push(connMat);

      const dotGeo = new THREE.SphereGeometry(0.065, 8, 8);
      const dotMat = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: color, emissiveIntensity: 1.0 });
      geometries.push(dotGeo); materials.push(dotMat);
      const signals = connPairs.map(([a, b], idx) => {
        const m = new THREE.Mesh(dotGeo, dotMat);
        group.add(m);
        return { m, a, b, p: idx / connPairs.length, speed: 0.30 + 0.08 * (idx % 3) };
      });

      group.scale.setScalar(0.86);
      update = (t) => {
        group.rotation.y = Math.sin(t * 0.28) * 0.38;
        group.rotation.x = Math.cos(t * 0.18) * 0.07;
        signals.forEach((sig) => {
          sig.p = (sig.p + sig.speed * 0.016) % 1;
          sig.m.position.lerpVectors(positions[sig.a], positions[sig.b], sig.p);
        });
      };
    } else if (type === 'network') {
      // A 3D mesh of nodes connected to their near neighbours, slowly rotating.
      const count = 42;
      const verts: THREE.Vector3[] = [];
      for (let i = 0; i < count; i++) {
        verts.push(new THREE.Vector3(
          (Math.random() - 0.5) * 4.2,
          (Math.random() - 0.5) * 3.4,
          (Math.random() - 0.5) * 3
        ));
      }
      const posArr = new Float32Array(count * 3);
      verts.forEach((v, i) => { posArr[i * 3] = v.x; posArr[i * 3 + 1] = v.y; posArr[i * 3 + 2] = v.z; });
      const nodeGeo = new THREE.BufferGeometry();
      nodeGeo.setAttribute('position', new THREE.BufferAttribute(posArr, 3));
      const nodeMat = new THREE.PointsMaterial({ color, size: 0.14 });
      group.add(new THREE.Points(nodeGeo, nodeMat));
      geometries.push(nodeGeo); materials.push(nodeMat);

      const edgePts: number[] = [];
      const maxD = 1.55;
      for (let i = 0; i < count; i++) {
        for (let j = i + 1; j < count; j++) {
          if (verts[i].distanceTo(verts[j]) < maxD) {
            edgePts.push(verts[i].x, verts[i].y, verts[i].z, verts[j].x, verts[j].y, verts[j].z);
          }
        }
      }
      const edgeGeo = new THREE.BufferGeometry();
      edgeGeo.setAttribute('position', new THREE.Float32BufferAttribute(edgePts, 3));
      const edgeMat = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.3 });
      group.add(new THREE.LineSegments(edgeGeo, edgeMat));
      geometries.push(edgeGeo); materials.push(edgeMat);

      update = (t) => {
        group.rotation.y = t * 0.25;
        group.rotation.x = Math.sin(t * 0.3) * 0.2;
      };
    } else if (type === 'servers') {
      // A stack of server racks with blinking status LEDs.
      const rackGeo = new THREE.BoxGeometry(2.6, 0.5, 1.3);
      const rackMat = new THREE.MeshStandardMaterial({
        color: 0x171b26, metalness: 0.7, roughness: 0.4, emissive: color, emissiveIntensity: 0.04,
      });
      geometries.push(rackGeo); materials.push(rackMat);

      const ledGeo = new THREE.SphereGeometry(0.07, 10, 10);
      const ledMat = new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 1.0 });
      const greenMat = new THREE.MeshStandardMaterial({ color: 0x39d353, emissive: 0x39d353, emissiveIntensity: 1.0 });
      geometries.push(ledGeo); materials.push(ledMat, greenMat);

      const leds: { m: THREE.Mesh; phase: number }[] = [];
      const levels = 4;
      for (let l = 0; l < levels; l++) {
        const y = (l - (levels - 1) / 2) * 0.62;
        const rack = new THREE.Mesh(rackGeo, rackMat);
        rack.position.y = y;
        group.add(rack);
        for (let k = 0; k < 5; k++) {
          const m = new THREE.Mesh(ledGeo, k % 3 === 0 ? greenMat : ledMat);
          m.position.set(-0.95 + k * 0.36, y, 0.68);
          group.add(m);
          leds.push({ m, phase: Math.random() * Math.PI * 2 });
        }
      }
      group.scale.setScalar(0.9);
      update = (t) => {
        group.rotation.y = Math.sin(t * 0.35) * 0.6;
        group.rotation.x = -0.12;
        leds.forEach((led) => {
          const s = 0.55 + 0.45 * Math.sin(t * 4 + led.phase);
          led.m.scale.setScalar(0.7 + Math.max(0, s) * 0.8);
        });
      };
    } else {
      // 'database' — the classic stacked-disk DB icon with records orbiting around it.
      const R = 1.15;
      const diskH = 0.42;
      const gap = 0.52;
      const diskGeo = new THREE.CylinderGeometry(R, R, diskH, 48);
      const diskMat = new THREE.MeshStandardMaterial({
        color, emissive: color, emissiveIntensity: 0.25, metalness: 0.55, roughness: 0.35,
      });
      geometries.push(diskGeo); materials.push(diskMat);

      // wireframe top rings to read clearly as a database cylinder
      const ringGeo = new THREE.TorusGeometry(R, 0.018, 8, 60);
      const ringMat = new THREE.MeshStandardMaterial({
        color: 0xffffff, emissive: 0xffffff, emissiveIntensity: 0.6, transparent: true, opacity: 0.7,
      });
      geometries.push(ringGeo); materials.push(ringMat);

      const levels = [gap, 0, -gap];
      levels.forEach((y) => {
        const disk = new THREE.Mesh(diskGeo, diskMat);
        disk.position.y = y;
        group.add(disk);
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.position.y = y + diskH / 2;
        ring.rotation.x = Math.PI / 2;
        group.add(ring);
      });

      // orbiting data records (rows) circling the database
      const recGeo = new THREE.BoxGeometry(0.22, 0.16, 0.22);
      const recMat = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: color, emissiveIntensity: 0.9 });
      geometries.push(recGeo); materials.push(recMat);
      const records: { m: THREE.Mesh; r: number; y: number; speed: number; phase: number }[] = [];
      for (let k = 0; k < 8; k++) {
        const m = new THREE.Mesh(recGeo, recMat);
        group.add(m);
        records.push({
          m,
          r: 1.8 + (k % 2) * 0.35,
          y: (Math.random() - 0.5) * 1.4,
          speed: 0.6 + Math.random() * 0.5,
          phase: (k / 8) * Math.PI * 2,
        });
      }

      group.rotation.x = 0.18;
      update = (t) => {
        group.rotation.y = t * 0.4;
        records.forEach((rec) => {
          const a2 = t * rec.speed + rec.phase;
          rec.m.position.set(Math.cos(a2) * rec.r, rec.y, Math.sin(a2) * rec.r);
          rec.m.rotation.y = a2;
        });
      };
    }

    onRegister((t: number) => {
      update(t);
      renderer.render(scene, camera);
    });

    const ro = new ResizeObserver(() => {
      width = mount.clientWidth || width;
      height = mount.clientHeight || height;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    });
    ro.observe(mount);

    return () => {
      onRegister(null);
      ro.disconnect();
      geometries.forEach((g) => g.dispose());
      materials.forEach((m) => m.dispose());
      renderer.dispose();
      renderer.forceContextLoss();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, [type, accent]);

  return <div ref={mountRef} className="absolute inset-0" />;
}

export default function CardStack() {
  const cardCount = 5;
  const cardsRefs = useRef<(HTMLDivElement | null)[]>([]);
  const frontFaceRefs = useRef<(HTMLDivElement | null)[]>([]);
  const labelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const shineRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sceneTicksRef = useRef<((t: number) => void)[]>(Array(5).fill(() => {}));
  const frameId = useRef<number>(0);
  const lastTime = useRef<number>(-1);
  const progress = useRef<number>(0);
  const mouse = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, vx: 0, vy: 0, rawX: 0, rawY: 0 });

  // metricsRef lets renderLoop always read the latest values without stale closure
  const metricsRef = useRef({ cardW: 336, cardH: 211 });
  const [metrics, setMetrics] = useState({ cardW: 336, cardH: 211 });

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
      const cardH = Math.round(cardW / 1.5925);
      metricsRef.current = { cardW, cardH };
      setMetrics({ cardW, cardH });
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // renderLoopRef always holds the latest render function — RAF never restarts
  const renderLoopRef = useRef<(timestamp: number) => void>(() => {});
  renderLoopRef.current = (timestamp: number) => {
    if (lastTime.current < 0) lastTime.current = timestamp;
    const dt = Math.min((timestamp - lastTime.current) / 1000, 0.05);
    lastTime.current = timestamp;

    progress.current += dt * 0.34;

    const { cardW, cardH } = metricsRef.current;
    const mx = mouse.current;
    mx.targetX = Math.max(-1, Math.min(1, mx.rawX / (cardW / 2)));
    mx.targetY = Math.max(-1, Math.min(1, mx.rawY / (cardH / 2)));

    // Spring physics: k=38 stiffness, b=11 damping
    mx.vx += ((mx.targetX - mx.x) * 38 - mx.vx * 11) * dt;
    mx.vy += ((mx.targetY - mx.y) * 38 - mx.vy * 11) * dt;
    mx.x += mx.vx * dt;
    mx.y += mx.vy * dt;

    // Pre-compute offsets to know which scenes are visible before ticking them
    const offsets: number[] = [];
    const half = cardCount / 2;
    for (let i = 0; i < cardCount; i++) {
      let offset = i - (progress.current % cardCount);
      while (offset > half) offset -= cardCount;
      while (offset < -half) offset += cardCount;
      offsets.push(offset);
    }

    // Only tick Three.js scenes for cards that are actually visible — biggest GPU win
    const elapsed = performance.now() / 1000;
    for (let j = 0; j < cardCount; j++) {
      if (Math.abs(offsets[j]) < half - 0.05) sceneTicksRef.current[j]?.(elapsed);
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

      const ff = frontFaceRefs.current[i];
      if (ff) ff.style.visibility = 'visible';

      const lbl = labelRefs.current[i];
      if (lbl) {
        lbl.style.transform = `scale(${(1 / scale).toFixed(4)})`;
        lbl.style.transformOrigin = 'left bottom';
      }

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

  // RAF starts once and never restarts — no jank on resize
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
    <div className="absolute inset-0 text-white flex items-center justify-center overflow-hidden select-none">

      {/* 3D perspective camera space */}
      <div
        className="relative w-full h-full flex items-center justify-center pointer-events-none"
        style={{ perspective: '1200px' }}
      >
        {/* Dynamic 3D coordinate viewport */}
        <div
          className="absolute"
          style={{
            width: `${metrics.cardW}px`,
            height: `${metrics.cardH}px`,
            transformStyle: 'preserve-3d',
          }}
        >
          {Array.from({ length: cardCount }).map((_, i) => {
            const sceneCfg = CARD_SCENES[i % CARD_SCENES.length];
            return (
              <div
                key={i}
                ref={(el) => { cardsRefs.current[i] = el; }}
                className="absolute inset-0"
                style={{
                  width: `${metrics.cardW}px`,
                  height: `${metrics.cardH}px`,
                  transformStyle: 'flat',
                  willChange: 'transform, opacity',
                }}
              >
                {/* FRONT FACE */}
                <div
                  ref={(el) => { frontFaceRefs.current[i] = el; }}
                  className="absolute inset-0 rounded-2xl overflow-hidden"
                  style={{
                    backgroundColor: '#0f0f0f',
                    boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.15)',
                    border: '1px solid #07090f',
                  }}
                >
                  {/* Accent glow backdrop */}
                  <div
                    className="absolute inset-0 rounded-2xl"
                    style={{
                      background: `radial-gradient(130% 90% at 75% 10%, ${sceneCfg.accent}26 0%, #06080f 60%, #05060a 100%)`,
                    }}
                  />
                  <CardScene
                    type={sceneCfg.type}
                    accent={sceneCfg.accent}
                    onRegister={(fn) => { sceneTicksRef.current[i] = fn ?? (() => {}); }}
                  />

                  {/* Spotlight — pre-baked gradient moved via GPU transform, zero repaint */}
                  <div
                    ref={(el) => { shineRefs.current[i] = el; }}
                    className="absolute pointer-events-none"
                    style={{
                      inset: '-50%', width: '200%', height: '200%',
                      background: 'radial-gradient(ellipse 35% 30% at 50% 50%, rgba(255,255,255,0.13) 0%, transparent 100%)',
                      opacity: 0, zIndex: 5,
                    }}
                  />

                  <div className="absolute inset-0 p-5 sm:p-6 text-white h-full w-full font-sans z-10 bg-black/15" style={{ WebkitFontSmoothing: 'antialiased', MozOsxFontSmoothing: 'grayscale' } as React.CSSProperties}>
                    {/* Scene theme label — bottom-left */}
                    <div ref={(el) => { labelRefs.current[i] = el; }} className="absolute left-5 bottom-5">
                      <div
                        className="font-bold normal-case whitespace-nowrap leading-none"
                        style={{ fontSize: '13px', color: sceneCfg.accent, textShadow: '0 0 8px rgba(0,0,0,0.6)' }}
                      >
                        {sceneCfg.label}
                      </div>
                    </div>
                    {/* Themed command — top-left */}
                    <div className="absolute left-5 sm:left-6 top-5 sm:top-6 flex items-center gap-1">
                      <span className="font-mono text-[7px] sm:text-[8px]" style={{ color: sceneCfg.accent }}>$</span>
                      <span
                        className="font-mono text-[7px] sm:text-[8px] text-white/85 tracking-tight whitespace-nowrap"
                        style={{ fontFamily: '"JetBrains Mono", monospace', textShadow: '0 1px 4px rgba(0,0,0,0.7)' }}
                      >
                        {sceneCfg.cmd}
                      </span>
                    </div>
                    {/* Code glyph — bottom-right */}
                    <div className="absolute right-5 sm:right-6 bottom-5 sm:bottom-6 opacity-90">
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke={sceneCfg.accent}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ filter: 'drop-shadow(0 1px 4px rgba(0,0,0,0.6))' }}
                      >
                        <polyline points="8 6 2 12 8 18" />
                        <polyline points="16 6 22 12 16 18" />
                        <line x1="13.5" y1="4" x2="10.5" y2="20" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
