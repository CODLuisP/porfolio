import { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';

// Three.js animated scenes — one per card: data transfer, GitHub, networks,
// servers/Linux and databases.
type SceneType = 'datatransfer' | 'github' | 'network' | 'servers' | 'database';

const CARD_SCENES: { type: SceneType; accent: string; label: string; cmd: string }[] = [
  { type: 'datatransfer', accent: '#00D1FF', label: 'data transfer', cmd: 'rsync -avz ./ host:/' },
  { type: 'github', accent: '#A371F7', label: 'github', cmd: 'git push origin main' },
  { type: 'network', accent: '#34C759', label: 'redes', cmd: 'ping 8.8.8.8' },
  { type: 'servers', accent: '#E95420', label: 'linux · servers', cmd: 'sudo systemctl restart' },
  { type: 'database', accent: '#7AA2F7', label: 'bases de datos', cmd: 'SELECT * FROM users;' },
];

// A self-contained WebGL canvas that fills its parent and renders an
// abstract animation for the given theme. Cleans up fully on unmount.
function CardScene({ type, accent }: { type: SceneType; accent: string }) {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let width = mount.clientWidth || 320;
    let height = mount.clientHeight || 200;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 100);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
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
    } else if (type === 'github') {
      // A branching commit graph: trunk + a branch that merges back, nodes pulse.
      type N = { p: THREE.Vector3 };
      const nodes: N[] = [];
      const trunkY = -0.4, branchY = 0.9;
      const xs = [-2.4, -1.4, -0.4, 0.6, 1.6, 2.5];
      xs.forEach((x) => nodes.push({ p: new THREE.Vector3(x, trunkY, 0) }));
      // branch nodes above the middle of the trunk
      const bxs = [-0.9, 0.1, 1.1];
      bxs.forEach((x) => nodes.push({ p: new THREE.Vector3(x, branchY, 0) }));

      const nodeGeo = new THREE.SphereGeometry(0.15, 18, 18);
      const nodeMat = new THREE.MeshStandardMaterial({
        color, emissive: color, emissiveIntensity: 0.7, metalness: 0.4, roughness: 0.3,
      });
      geometries.push(nodeGeo); materials.push(nodeMat);
      const meshes: THREE.Mesh[] = [];
      nodes.forEach((n) => {
        const m = new THREE.Mesh(nodeGeo, nodeMat);
        m.position.copy(n.p);
        group.add(m);
        meshes.push(m);
      });

      const edges: [number, number][] = [
        [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], // trunk
        [1, 6], [6, 7], [7, 8], [8, 4],          // branch off node1 ... merge into node4
      ];
      const edgePts: number[] = [];
      edges.forEach(([a, b]) => {
        edgePts.push(nodes[a].p.x, nodes[a].p.y, 0, nodes[b].p.x, nodes[b].p.y, 0);
      });
      const lineGeo = new THREE.BufferGeometry();
      lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(edgePts, 3));
      const lineMat = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.6 });
      group.add(new THREE.LineSegments(lineGeo, lineMat));
      geometries.push(lineGeo); materials.push(lineMat);

      update = (t) => {
        group.rotation.y = Math.sin(t * 0.45) * 0.5;
        group.rotation.x = Math.cos(t * 0.3) * 0.14;
        meshes.forEach((m, idx) => {
          const s = 1 + Math.max(0, Math.sin(t * 2 - idx * 0.5)) * 0.6;
          m.scale.setScalar(s);
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

    const clock = new THREE.Clock();
    let raf = 0;
    const animate = () => {
      update(clock.getElapsedTime());
      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    animate();

    const ro = new ResizeObserver(() => {
      width = mount.clientWidth || width;
      height = mount.clientHeight || height;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    });
    ro.observe(mount);

    return () => {
      cancelAnimationFrame(raf);
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

// Nine beautiful premium solid colors to clearly track the cards
const CARD_COLORS = [
  '#FF3B30', // Apple Red
  '#FF9500', // Apple Orange
  '#FFCC00', // Apple Yellow
  '#34C759', // Apple Green
  '#007AFF', // Apple Blue
  '#5856D6', // Apple Purple
  '#FF2D55', // Apple Pink
  '#AF52DE', // Apple Violet
  '#00C7BE', // Apple Teal
];
void CARD_COLORS;

// Back-face content: terminal commands / code lines themed to each card's scene.
const CARD_BACK = [
  {
    title: '~/data-transfer',
    lines: ['$ curl -X POST api/sync', '> streaming 1.2GB ████░ 84%', '200 OK · 14ms · gzip'],
  },
  {
    title: '~/repo (main)',
    lines: ['$ git add -A && git commit', '$ git push origin main', '✓ 3 files changed, 2 insertions'],
  },
  {
    title: '~/net',
    lines: ['$ ping 10.0.0.1', '64 bytes · time=2.1ms ttl=64', '$ netstat -tunlp'],
  },
  {
    title: 'root@server',
    lines: ['$ ssh root@10.0.0.4', '$ systemctl status nginx', '● active (running) · uptime 42d'],
  },
  {
    title: '~/db (psql)',
    lines: ['$ psql -U admin app', 'SELECT * FROM users LIMIT 10;', '10 rows · 3ms'],
  },
];

export default function CardStack() {
  const cardCount = 5;
  const cardsRefs = useRef<(HTMLDivElement | null)[]>([]);
  const frameId = useRef<number>(0);

  // Continuous scroll progress
  const progress = useRef<number>(0);

  // Track mouse coordinates for interactive 3D parallax tilt with inertia damping
  const mouse = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  // Responsive state containing card dimensions
  const [metrics, setMetrics] = useState({
    cardW: 336,
    cardH: 211, // 1.59 standard credit card ratio
  });

  // Typography metrics to prevent collisions beautifully across all viewports
  const [fontMetrics, setFontMetrics] = useState({
    titleFontSize: '1.5rem',
    sigFontSize: '2.5rem',
    descFontSize: '14px',
    titleGap: '40px',
    pl: '0px'
  });
  void fontMetrics;

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Screen-space cursor offset relative to window center, clamped to [-1.0, 1.0] range
      const rx = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
      const ry = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
      mouse.current.targetX = Math.max(-1, Math.min(1, rx));
      mouse.current.targetY = Math.max(-1, Math.min(1, ry));
    };

    const handleMouseLeave = () => {
      // Return gently to center orientation when mouse focus is lost or moves away
      mouse.current.targetX = 0;
      mouse.current.targetY = 0;
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

      // 1. Calculate Card Metrics (shrink cards if height is small to save vertical space)
      let cardW = Math.round(w * 0.16 + 130);

      const heightFactor = Math.min(1.0, Math.max(0.65, h / 850));
      cardW = Math.round(cardW * heightFactor);

      cardW = Math.min(336, Math.max(150, cardW));
      const cardH = Math.round(cardW / 1.5925); // Standard credit card ratio

      setMetrics({ cardW, cardH });

      // 2. Calculate Typography Metrics (shrink font sizes aggressively if height or width is small)
      const isMobile = w < 640;

      let titleSize = '';
      let sigSize = '';
      let descSize = '';
      let titleGap = '40px';
      let plVal = '0px';

      if (isMobile) {
        // Mobile style: centered, text size increased by 30% for high legibility
        titleSize = 'clamp(1.8rem, 5.2vw + 0.4rem, 2.2rem)';
        sigSize = 'clamp(2.86rem, 7.8vw + 0.6rem, 3.5rem)';
        descSize = 'clamp(0.72rem, 1.4vw + 0.35rem, 0.95rem)';
        titleGap = '24px';
        plVal = '0px';
      } else {
        // Desktop / Tablet style: aligned bottom-left
        // Scale factor depends on width and height to shrink before hitting cards
        const scale = Math.min(1.0, Math.max(0.48, (w * 0.45 + h * 0.55) / 1300));

        titleSize = `${Math.max(1.15, 3.5 * scale).toFixed(3)}rem`;
        sigSize = `${Math.max(1.5, 4.5 * scale).toFixed(3)}rem`;
        descSize = `${Math.max(11, 16 * scale).toFixed(1)}px`;
        titleGap = `${Math.max(16, Math.round(40 * scale))}px`;
        plVal = `${Math.min(6, Math.max(2.8, 3.5 * scale + 2.2)).toFixed(2)}rem`;
      }

      setFontMetrics({
        titleFontSize: titleSize,
        sigFontSize: sigSize,
        descFontSize: descSize,
        titleGap,
        pl: plVal
      });
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Compute positions, rotations, and visual rules at 60fps
  const renderLoop = () => {
    // Upward flow speed of continuous transition - decreased speed by more than half for slower, premium, and calmer transitions
    progress.current += 0.0016;

    // Smoothly interpolate current mouse variables towards their target positions (damping/inertia logic)
    mouse.current.x += (mouse.current.targetX - mouse.current.x) * 0.08;
    mouse.current.y += (mouse.current.targetY - mouse.current.y) * 0.08;

    const cards = cardsRefs.current;
    const h = window.innerHeight;
    const { cardH } = metrics;

    const continuousProgress = progress.current;
    const roundedIndex = Math.round(continuousProgress);
    const diffFromRound = continuousProgress - roundedIndex; // ranges between [-0.5, 0.5]

    // Custom non-linear magnetic step logic
    // It creates a gorgeous brief "dwell/pause" at front center before accelerating to the next card
    const easedDiff = Math.sign(diffFromRound) * Math.pow(Math.abs(diffFromRound) * 2, 4.2) / 2;
    const virtualActiveIndex = roundedIndex + easedDiff;

    for (let i = 0; i < cardCount; i++) {
      const card = cards[i];
      if (!card) continue;

      // Solve circular wrapping to get closest representation in [-cardCount/2, cardCount/2]
      let offset = i - virtualActiveIndex;
      const halfCount = cardCount / 2;
      while (offset > halfCount) offset -= cardCount;
      while (offset < -halfCount) offset += cardCount;

      const absOffset = Math.abs(offset);
      const sign = Math.sign(offset);

      // Allow cards to render completely off-screen smoothly up to offset 3.0. This prevents any clipping or sudden pop-outs.
      if (absOffset > 3.0) {
        card.style.visibility = 'hidden';
        continue;
      } else {
        card.style.visibility = 'visible';
      }

      // Spacing gap between center card and adjacent cards
      const gap = 36;
      const peekAmount = -55; // Push the card's edge 55px past the screen boundary to hide a premium portion of it!
      const D = 1350; // Perspective distance

      let y = 0;
      let z = 0;
      let rot = 0;

      if (absOffset <= 1) {
        // Smoothstep interpolation from 0 to 1 (Center card to first adjacent card)
        const t = absOffset;
        const easedT = t * t * (3 - 2 * t);

        // Y moves from 0 to (cardH + gap)
        const targetY = cardH + gap;
        y = -sign * (easedT * targetY);

        // Z moves from 400 (center) to 220 (adjacent)
        z = 400 + easedT * (220 - 400);

        // Rotation moves from 0 to 132 degrees (beautiful tilted back face)
        rot = easedT * 132;
      } else if (absOffset <= 2) {
        // Smoothstep interpolation from 1 to 2 (Adjacent card to peeking screen-edge card)
        const t = absOffset - 1;
        const easedT = t * t * (3 - 2 * t);

        const yStart = cardH + gap;
        const zStart = 220;
        const rotStart = 132;

        const zEnd = -60;
        const rotEnd = 175;

        // Perspective-aware formula for exact edge alignment at the screen boundary (peekAmount = 26px inside)
        const sEnd = D / (D - zEnd);
        const yEnd = (h / 2 - peekAmount) / sEnd - (cardH / 2);

        const currentY = yStart + easedT * (yEnd - yStart);
        y = -sign * currentY;

        z = zStart + easedT * (zEnd - zStart);
        rot = rotStart + easedT * (rotEnd - rotStart);
      } else {
        // Smoothstep interpolation from 2 to 3 (Peeking card to completely off-screen card)
        const t = Math.min(absOffset - 2, 1);
        const easedT = t * t * (3 - 2 * t);

        const zStart = -60;
        const rotStart = 175;

        const zEnd3 = -250;
        const rotEnd3 = 195;

        const sEnd2 = D / (D - zStart);
        const yEnd2 = (h / 2 - peekAmount) / sEnd2 - (cardH / 2);

        // Calculate yEnd3 dynamically so that the card's edge is completely 100px past the screen boundary
        const sEnd3 = D / (D - zEnd3);
        const yEnd3 = (h / 2 + 100) / sEnd3 + (cardH / 2);

        const currentY = yEnd2 + easedT * (yEnd3 - yEnd2);
        y = -sign * currentY;

        z = zStart + easedT * (zEnd3 - zStart);
        rot = rotStart + easedT * (rotEnd3 - rotStart);
      }

      const localCardRotation = -sign * rot;

      // Determine how close this card is to the exact center (1.0 = center, 0.0 = adjacent/offscreen)
      const centerFactor = Math.max(0, 1 - absOffset);

      // Vertical tilt (around X-axis) and horizontal tilt (around Y-axis) driven by mouse coordinates
      const maxTiltY = 15; // Max angle tilt left-to-right (degrees)
      const maxTiltX = 12; // Max angle tilt up-and-down (degrees)

      const activeTiltX = -mouse.current.y * maxTiltX * centerFactor;
      const activeTiltY = mouse.current.x * maxTiltY * centerFactor;

      const totalRotX = localCardRotation + activeTiltX;
      const totalRotY = activeTiltY;

      // Depth z-index layer
      card.style.zIndex = Math.round(z).toString();
      card.style.opacity = '1';

      // Inject translation matrix with the premium -3deg tilt combined with dynamic mouse-interactive 3D tilt
      card.style.transform = `translateY(${y.toFixed(2)}px) translateZ(${z.toFixed(2)}px) rotateX(${totalRotX.toFixed(2)}deg) rotateY(${totalRotY.toFixed(2)}deg) rotateZ(-3deg)`;
    }
  };

  useEffect(() => {
    const tick = () => {
      renderLoop();
      frameId.current = requestAnimationFrame(tick);
    };

    frameId.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [metrics]);

  // Slices for 3D volumetric depth with 30% reduced thickness
  // Span from -1.47px to 1.47px creates an extremely premium real 3D volume feel
  const thicknessLayers = [-1.47, -0.73, 0, 0.73, 1.47];

  return (
    <div className="absolute inset-0 text-white flex items-center justify-center overflow-hidden select-none">

      {/* 3D perspective camera space */}
      <div
        className="relative w-full h-full flex items-center justify-center pointer-events-none"
        style={{
          perspective: '1350px',
        }}
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
          {Array.from({ length: cardCount }).map((_, i) => (
            <div
              key={i}
              ref={(el) => { cardsRefs.current[i] = el; }}
              className="absolute inset-0"
              style={{
                width: `${metrics.cardW}px`,
                height: `${metrics.cardH}px`,
                transformStyle: 'preserve-3d',
                backfaceVisibility: 'visible',
              }}
            >
              {/* Build physical 3D volumetric thickness by dense parallel layering */}
              {thicknessLayers.map((zOffset, layerIdx) => {
                const isFrontFace = layerIdx === thicknessLayers.length - 1;
                const isBackFace = layerIdx === 0;

                const sceneCfg = CARD_SCENES[i % CARD_SCENES.length];
                const baseBgColor = '#0f0f0f';

                // Middle structural slice
                if (!isFrontFace && !isBackFace) {
                  return (
                    <div
                      key={layerIdx}
                      className="absolute inset-0 rounded-[16px] pointer-events-none overflow-hidden"
                      style={{
                        backgroundColor: '#808080',
                        transform: `translateZ(${zOffset}px)`,
                      }}
                    />
                  );
                }

                // Front face slice
                if (isFrontFace) {
                  const frontBorderStyle = "";
                  return (
                    <div
                      key={layerIdx}
                      className={`absolute inset-0 rounded-[16px] ${frontBorderStyle} pointer-events-none overflow-hidden`}
                      style={{
                        backgroundColor: baseBgColor,
                        transform: `translateZ(${zOffset}px)`,
                        backfaceVisibility: 'hidden',
                        boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.15)',
                        // 1px border in the card's own dark tone: invisible as a "border"
                        // but its outer edge is antialiased against the black background.
                        border: '1px solid #07090f',
                      }}
                    >
                      {/* Dark backdrop + accent glow behind the transparent WebGL canvas */}
                      <div
                        className="absolute inset-0 rounded-[16px]"
                        style={{
                          background: `radial-gradient(130% 90% at 75% 10%, ${sceneCfg.accent}26 0%, #06080f 60%, #05060a 100%)`,
                        }}
                      />
                      <CardScene type={sceneCfg.type} accent={sceneCfg.accent} />

                      <div className="absolute inset-0 p-5 sm:p-6 text-white h-full w-full font-sans z-10 bg-black/15">
                        {/* Scene theme label (git / code / tech ...) bottom-left */}
                        <div
                          className="absolute left-5 sm:left-6 bottom-5 sm:bottom-6 font-mono text-[9px] sm:text-[11px] tracking-[0.25em] uppercase"
                          style={{ color: sceneCfg.accent, textShadow: '0 0 8px rgba(0,0,0,0.6)' }}
                        >
                          {sceneCfg.label}
                        </div>
                        {/* Themed command - positioned top-left, no background */}
                        <div className="absolute left-5 sm:left-6 top-5 sm:top-6 flex items-center gap-1">
                          <span className="font-mono text-[7px] sm:text-[8px]" style={{ color: sceneCfg.accent }}>$</span>
                          <span
                            className="font-mono text-[7px] sm:text-[8px] text-white/85 tracking-tight whitespace-nowrap"
                            style={{ fontFamily: '"JetBrains Mono", monospace', textShadow: '0 1px 4px rgba(0,0,0,0.7)' }}
                          >
                            {sceneCfg.cmd}
                          </span>
                        </div>

                        {/* Owen Brand wordmark - positioned at top-right */}
                    

                        {/* Code glyph </> - bottom right corner */}
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
                  );
                }

                // Back face slice
                if (isBackFace) {
                  const backBorderStyle = "";
                  const back = CARD_BACK[i % CARD_BACK.length];
                  return (
                    <div
                      key={layerIdx}
                      className={`absolute inset-0 rounded-[16px] ${backBorderStyle} pointer-events-none overflow-hidden`}
                      style={{
                        backgroundColor: baseBgColor,
                        transform: `translateZ(${zOffset}px) rotateX(180deg)`,
                        backfaceVisibility: 'hidden',
                        boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.15)',
                        border: '1px solid #07090f',
                      }}
                    >
                      {/* Soft blurred accent backdrop matching this card's scene theme */}
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          background: `radial-gradient(120% 90% at 30% 90%, ${sceneCfg.accent}40 0%, #0a0e16 55%, #06080f 100%)`,
                          filter: 'blur(16px)',
                          transform: 'scale(1.15)',
                        }}
                      />

                      {/* Magnetic stripe styled as a terminal title bar */}
                      <div className="absolute left-0 right-0 top-4 sm:top-5 h-7 sm:h-9 bg-black/85 backdrop-blur-md z-10 flex items-center px-4 gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FF5F56]" />
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FFBD2E]" />
                        <span className="w-1.5 h-1.5 rounded-full bg-[#27C93F]" />
                        <span
                          className="ml-2 font-mono text-[7px] sm:text-[9px] text-white/55 tracking-wide truncate"
                          style={{ fontFamily: '"JetBrains Mono", monospace' }}
                        >
                          {back.title}
                        </span>
                      </div>

                      {/* Terminal-style command output on the bottom-left */}
                      <div
                        className="absolute left-4 sm:left-6 right-4 sm:right-6 bottom-4 sm:bottom-5 z-20 flex flex-col gap-0.5 sm:gap-1 text-left"
                        style={{ fontFamily: '"JetBrains Mono", monospace' }}
                      >
                        {back.lines.map((line, li) => (
                          <div
                            key={li}
                            className="font-mono text-[7px] sm:text-[10px] font-medium tracking-tight select-none whitespace-nowrap overflow-hidden text-ellipsis"
                            style={{ color: line.startsWith('$') ? '#ffffff' : sceneCfg.accent }}
                          >
                            {line}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                }

                return null;
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
