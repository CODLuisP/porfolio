import React, { useEffect, useRef } from "react";
import * as THREE from "three";

// Programming / tech symbols rendered as floating sprites.
const SYMBOLS = [
  "{ }",
  "</>",
  "=>",
  "[ ]",
  "( )",
  ";",
  "&&",
  "||",
  "#",
  "$",
  "0 1",
  "fn",
  "==",
  "!=",
  "++",
  "/*",
  "::",
  "<>",
  "~",
  "%",
  "sudo",
  "grep",
  "cd ~",
  "ls -la",
  "0",
  "1",
  "0",
  "1",
  "0",
  "1",
  "01",
  "10",
  "00",
  "11",
  "101",
  "010",
  "110",
  "001",
];

// Builds a transparent canvas texture for a single symbol.
const makeSymbolTexture = (text: string) => {
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  ctx.clearRect(0, 0, size, size);
  // Shrink the font for longer strings (e.g. Linux commands) so they fit.
  const fontSize = text.length <= 3 ? 90 : Math.floor(560 / text.length);
  ctx.font = `600 ${fontSize}px 'JetBrains Mono', monospace`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "#10b981"; // emerald-500
  ctx.fillText(text, size / 2, size / 2);
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
};

const CodeBackground: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth;
    const height = mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.z = 18;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // Reuse one texture per distinct symbol.
    const textures = SYMBOLS.map(makeSymbolTexture);

    const COUNT = 42;
    const sprites: THREE.Sprite[] = [];
    const speeds: number[] = [];

    for (let i = 0; i < COUNT; i++) {
      const texture = textures[i % textures.length];
      const material = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        opacity: 0.04 + Math.random() * 0.05,
        depthWrite: false,
      });
      const sprite = new THREE.Sprite(material);
      sprite.position.set(
        (Math.random() - 0.5) * 36,
        (Math.random() - 0.5) * 24,
        (Math.random() - 0.5) * 20
      );
      const scale = 0.7 + Math.random() * 1.3;
      sprite.scale.set(scale, scale, 1);
      scene.add(sprite);
      sprites.push(sprite);
      speeds.push(0.004 + Math.random() * 0.012);
    }

    // Subtle parallax driven by the cursor.
    const mouse = { x: 0, y: 0 };
    const handleMouse = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handleMouse);

    let frame = 0;
    let raf = 0;
    const animate = () => {
      frame += 0.01;
      sprites.forEach((sprite, i) => {
        // Drift upward and wrap around.
        sprite.position.y += speeds[i];
        if (sprite.position.y > 13) sprite.position.y = -13;
        sprite.position.x += Math.sin(frame + i) * 0.002;
      });
      camera.position.x += (mouse.x * 1.5 - camera.position.x) * 0.03;
      camera.position.y += (-mouse.y * 1.5 - camera.position.y) * 0.03;
      camera.lookAt(scene.position);
      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", handleMouse);
      window.removeEventListener("resize", handleResize);
      sprites.forEach((s) => s.material.dispose());
      textures.forEach((t) => t.dispose());
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 pointer-events-none"
      aria-hidden="true"
    />
  );
};

export default CodeBackground;
