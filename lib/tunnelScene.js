// ============================================================
// "ADS Dimensions" — a scroll-driven flight through a white gallery space.
// Photo frames line both sides; square portals mark each division.
// createTunnelScene(THREE, container, { items, chapters, mobile, reduced })
// items: [{ tex, chapter }]   chapters: [{ start }]  (start = item index)
// ============================================================
const PAPER = 0xf4f3f0;

export function createTunnelScene(THREE, container, opts) {
  const { items, chapters = [], mobile = false, reduced = false } = opts;
  const SP = mobile ? 3.4 : 4.0; // spacing along z
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, mobile ? 1.5 : 2));
  renderer.setClearColor(PAPER, 1);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(PAPER, 7, mobile ? 20 : 26);
  const camera = new THREE.PerspectiveCamera(mobile ? 62 : 50, 1, 0.1, 80);

  const loader = new THREE.TextureLoader();
  loader.setCrossOrigin("anonymous");
  const geo = new THREE.PlaneGeometry(1, 1);
  const edge = new THREE.EdgesGeometry(geo);
  const lineMat = new THREE.LineBasicMaterial({ color: 0x111111, transparent: true, opacity: 0.85, fog: true });
  const frames = [];
  const H = mobile ? 1.9 : 2.5;

  items.forEach((it, i) => {
    const side = i % 2 ? 1 : -1;
    const g = new THREE.Group();
    const mat = new THREE.MeshBasicMaterial({ color: 0xdedbd4, fog: true });
    const plane = new THREE.Mesh(geo, mat);
    const frame = new THREE.LineSegments(edge, lineMat);
    frame.scale.set(1.035, 1.035, 1);
    plane.add(frame);
    g.add(plane);
    // drop shadow card
    const sh = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.08, fog: true }));
    sh.position.set(0.08, -0.08, -0.02);
    plane.add(sh);
    const setSize = (a) => { const w = Math.min(H * a, mobile ? 2.4 : 3.9); plane.scale.set(w, w / a, 1); };
    setSize(it.aspect || 1.5);
    loader.load(it.tex, (t) => {
      t.colorSpace = THREE.SRGBColorSpace;
      t.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
      mat.map = t; mat.color.set(0xffffff); mat.needsUpdate = true;
      setSize(t.image.width / t.image.height);
    });
    const x = side * (mobile ? 1.15 : 2.75);
    g.position.set(x, ((i * 37) % 5 - 2) * 0.16, -i * SP);
    g.rotation.y = -side * (mobile ? 0.3 : 0.42);
    g.userData = { y0: g.position.y, i };
    frames.push(g);
    scene.add(g);
  });

  // portals at the start of each chapter
  const portals = [];
  chapters.forEach((c, k) => {
    const pg = new THREE.Group();
    const sq = new THREE.LineSegments(edge, new THREE.LineBasicMaterial({ color: 0x111111, transparent: true, opacity: 0.6, fog: true }));
    sq.scale.set(mobile ? 4.2 : 8.4, mobile ? 6.2 : 5.4, 1);
    pg.add(sq);
    const inner = sq.clone(); inner.scale.multiplyScalar(0.94); pg.add(inner);
    pg.position.set(0, 0.2, -c.start * SP + SP * 0.6);
    pg.userData = { k };
    portals.push(pg);
    scene.add(pg);
  });

  // floor + ceiling survey lines for depth
  const len = items.length * SP + 30;
  const floor = new THREE.GridHelper(len, Math.round(len / 1.2), 0xbdb9b1, 0xd5d2cb);
  floor.position.set(0, -2.3, -len / 2 + 15);
  scene.add(floor);
  const ceil = floor.clone(); ceil.position.y = 3.2;
  scene.add(ceil);

  // floating dust (crisp points, no blur)
  const N = mobile ? 300 : 700;
  const pos = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) { pos[i * 3] = (Math.random() - 0.5) * 12; pos[i * 3 + 1] = (Math.random() - 0.5) * 6; pos[i * 3 + 2] = -Math.random() * len + 10; }
  const dg = new THREE.BufferGeometry(); dg.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  const dust = new THREE.Points(dg, new THREE.PointsMaterial({ color: 0x222222, size: mobile ? 0.025 : 0.02, transparent: true, opacity: 0.5, fog: true }));
  scene.add(dust);

  let progress = 0, sp = 0, raf = 0, running = true;
  const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
  const t0 = performance.now();
  const endZ = -(items.length - 1) * SP;

  function resize() {
    const w = container.clientWidth || innerWidth, h = container.clientHeight || innerHeight;
    renderer.setSize(w, h, false);
    renderer.domElement.style.width = "100%"; renderer.domElement.style.height = "100%";
    camera.aspect = w / h; camera.updateProjectionMatrix();
  }
  resize();
  addEventListener("resize", resize);

  function frame(now) {
    raf = requestAnimationFrame(frame);
    if (!running) return;
    const t = (now - t0) / 1000;
    sp += (progress - sp) * (reduced ? 1 : 0.08);
    pointer.x += (pointer.tx - pointer.x) * 0.06; pointer.y += (pointer.ty - pointer.y) * 0.06;
    const z = 6 + sp * (endZ - 6 - 2);
    const sway = reduced ? 0 : Math.sin(sp * Math.PI * 4) * 0.35;
    camera.position.set(sway + pointer.x * 0.4, 0.2 + pointer.y * 0.25, z);
    camera.lookAt(sway * 0.4 + pointer.x * 1.2, 0.1 - pointer.y * 0.4, z - 10);
    camera.rotation.z = reduced ? 0 : -sway * 0.03;
    frames.forEach((g) => {
      g.position.y = g.userData.y0 + (reduced ? 0 : Math.sin(t * 0.6 + g.userData.i) * 0.05);
      // frames turn to face you as you approach
      const d = g.position.z - z;
      const k = Math.max(0, Math.min(1, (d + 7) / 6));
      const side = g.position.x > 0 ? 1 : -1;
      g.rotation.y = -side * (mobile ? 0.3 : 0.42) * k + -side * 0.05;
    });
    portals.forEach((p) => { p.rotation.z = reduced ? 0 : Math.sin(t * 0.3 + p.userData.k) * 0.03; });
    renderer.render(scene, camera);
  }
  raf = requestAnimationFrame(frame);

  return {
    setProgress(p) { progress = Math.max(0, Math.min(1, p)); },
    setPointer(x, y) { pointer.tx = x; pointer.ty = y; },
    setActive(a) { running = a; },
    destroy() {
      cancelAnimationFrame(raf); removeEventListener("resize", resize);
      scene.traverse((o) => { if (o.material) { if (o.material.map) o.material.map.dispose(); o.material.dispose(); } });
      geo.dispose(); edge.dispose(); dg.dispose(); renderer.dispose(); renderer.domElement.remove();
    },
  };
}
