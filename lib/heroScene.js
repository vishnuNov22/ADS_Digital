// ============================================================
// ADS hero — chrome 3D ADS logo + particle field that morphs between
// three motifs: Events (light / fabric), Digitals (interface layers),
// Real Estate (architectural forms).
// createHeroScene({ THREE, RoomEnvironment }, container, opts)
// ============================================================
import { LOGO_SHAPES } from "./logoShapes";

const ease = (t) => 1 - Math.pow(1 - Math.min(Math.max(t, 0), 1), 4);

function rand(seed) {
  let s = seed >>> 0;
  return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
}

function buildFormations(N) {
  const r = rand(7);
  const E = new Float32Array(N * 3), D = new Float32Array(N * 3), R = new Float32Array(N * 3);
  const seed = new Float32Array(N), size = new Float32Array(N);

  // --- Events: draped light "fabric" + floating bokeh
  for (let i = 0; i < N; i++) {
    if (i % 3 !== 0) {
      const u = r(), v = r();
      E[i * 3] = (u - 0.5) * 16;
      E[i * 3 + 1] = (v - 0.5) * 8.5;
      E[i * 3 + 2] = -4.2 + Math.sin(u * 9.0) * 0.6 + Math.cos(v * 5.0) * 0.3;
    } else {
      const a = r() * Math.PI * 2, rad = 2.5 + r() * 6;
      E[i * 3] = Math.cos(a) * rad * 1.4;
      E[i * 3 + 1] = (r() - 0.5) * 7;
      E[i * 3 + 2] = -1.2 - r() * 6;
    }
    seed[i] = r();
    size[i] = i % 3 === 0 ? 1.2 + r() * 3.2 : 0.6 + r() * 0.8;
  }

  // --- Digitals: floating UI panels as dot-matrix layers
  const panels = [
    [-4.3, 1.6, -3.2, 3.0, 2.0], [4.4, 1.9, -3.8, 2.6, 1.8], [-3.6, -2.0, -2.6, 2.4, 1.5],
    [4.0, -1.8, -2.9, 3.0, 1.6], [0, 0.2, -6.0, 7.0, 4.2], [-6.6, -0.2, -5.0, 1.6, 3.0], [6.8, 0, -5.4, 1.6, 2.8],
  ];
  for (let i = 0; i < N; i++) {
    const p = panels[i % panels.length];
    const step = 0.12;
    let x = (r() - 0.5) * p[3], y = (r() - 0.5) * p[4];
    // half the dots sit on the panel border or on "text lines"
    const k = r();
    if (k < 0.3) {
      const e = Math.floor(r() * 4);
      if (e === 0) y = p[4] / 2; else if (e === 1) y = -p[4] / 2; else if (e === 2) x = p[3] / 2; else x = -p[3] / 2;
    } else if (k < 0.65) {
      y = (Math.floor(r() * 5) / 5 - 0.35) * p[4];
      x = (r() * 0.75 - 0.42) * p[3];
    }
    D[i * 3] = p[0] + Math.round(x / step) * step;
    D[i * 3 + 1] = p[1] + Math.round(y / step) * step;
    D[i * 3 + 2] = p[2];
  }

  // --- Real Estate: tower edges on a ground grid
  const boxes = [];
  for (let gx = -4; gx <= 4; gx++) {
    for (let gz = 0; gz < 3; gz++) {
      if (Math.abs(gx) < 2 && gz === 0) continue;
      const h = 0.8 + r() * (gz === 2 ? 4.5 : 2.6) * (1 - Math.abs(gx) * 0.06);
      boxes.push([gx * 1.55, -3.0, -3 - gz * 1.8, 0.95 + r() * 0.3, h, 0.95]);
    }
  }
  for (let i = 0; i < N; i++) {
    if (i % 6 === 0) {
      // ground grid lines
      const line = r() < 0.5;
      R[i * 3] = line ? Math.round((r() - 0.5) * 16) * 0.8 : (r() - 0.5) * 14;
      R[i * 3 + 1] = -3.0;
      R[i * 3 + 2] = line ? -1 - r() * 7 : -1 - Math.round(r() * 8) * 0.9;
      continue;
    }
    const b = boxes[i % boxes.length];
    const [bx, by, bz, w, h, d] = b;
    // pick one of 12 edges, or a "floor line" on the facade
    const e = Math.floor(r() * 14), t = r();
    let x, y, z;
    const sx = (s) => bx + (s ? w / 2 : -w / 2), sz = (s) => bz + (s ? d / 2 : -d / 2);
    if (e < 4) { x = sx(e & 1); z = sz(e >> 1); y = by + t * h; }
    else if (e < 8) { const q = e - 4; y = by + (q & 1 ? h : 0); z = sz(q >> 1); x = bx + (t - 0.5) * w; }
    else if (e < 12) { const q = e - 8; y = by + (q & 1 ? h : 0); x = sx(q >> 1); z = bz + (t - 0.5) * d; }
    else { y = by + Math.ceil(r() * h * 3) / 3; z = sz(1); x = bx + (t - 0.5) * w; if (y > by + h) y = by + h; }
    R[i * 3] = x; R[i * 3 + 1] = y; R[i * 3 + 2] = z;
  }
  return { E, D, R, seed, size };
}

export function createHeroScene({ THREE, RoomEnvironment }, container, opts = {}) {
  const mobile = !!opts.mobile;
  const reduced = !!opts.reduced;
  const onMode = opts.onMode || (() => {});

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, mobile ? 1.5 : 2));
  renderer.setClearColor(0x050505, 1);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x050505, 7, 16);
  const camera = new THREE.PerspectiveCamera(mobile ? 42 : 34, 1, 0.1, 60);
  camera.position.set(0, 0, 7);

  // Studio reflections for the chrome
  const pmrem = new THREE.PMREMGenerator(renderer);
  const envRT = pmrem.fromScene(new RoomEnvironment(), 0.035);
  scene.environment = envRT.texture;
  if (scene.environmentRotation) scene.environmentRotation.set(0, 0, 0);

  const key = new THREE.DirectionalLight(0xffffff, 2.2);
  key.position.set(3, 4, 5);
  scene.add(key);
  const rim = new THREE.PointLight(0xffffff, 18, 12);
  rim.position.set(-3, 1, 2);
  scene.add(rim);

  // ---------- Chrome logo ----------
  const logo = new THREE.Group();
  const mat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 1,
    roughness: 0.14,
    clearcoat: 1,
    clearcoatRoughness: 0.06,
    iridescence: 0.4,
    iridescenceIOR: 1.5,
    iridescenceThicknessRange: [180, 520],
    envMapIntensity: 1.25,
  });
  const pieces = [];
  LOGO_SHAPES.forEach((g, i) => {
    const shape = new THREE.Shape(g.outer.map(([x, y]) => new THREE.Vector2(x, y)));
    g.holes.forEach((h) => shape.holes.push(new THREE.Path(h.map(([x, y]) => new THREE.Vector2(x, y)))));
    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: 0.16, bevelEnabled: true, bevelThickness: 0.035, bevelSize: 0.018, bevelSegments: 5, curveSegments: 4,
    });
    geo.translate(0, 0, -0.08);
    geo.computeVertexNormals();
    const m = new THREE.Mesh(geo, mat);
    const r = rand(31 + i * 17);
    m.userData.from = {
      x: (r() - 0.5) * 3, y: (r() - 0.5) * 2.2, z: -3 - r() * 3,
      rx: (r() - 0.5) * 2.4, ry: (r() - 0.5) * 2.4, rz: (r() - 0.5) * 1.2,
    };
    m.userData.delay = i * 0.11;
    pieces.push(m);
    logo.add(m);
  });
  const baseScale = mobile ? 1.35 : 2.0;
  logo.scale.setScalar(baseScale);
  logo.position.y = mobile ? 1.1 : 0.45;
  scene.add(logo);

  // Soft studio glow behind the logo
  const glowMat = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false,
    uniforms: { uO: { value: 0.0 } },
    vertexShader: `varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }`,
    fragmentShader: `varying vec2 vUv; uniform float uO; void main(){ vec2 p=vUv-0.5; p.x*=1.6; float d=length(p); float a=smoothstep(0.5,0.0,d); gl_FragColor=vec4(vec3(1.0), a*a*0.11*uO); }`,
  });
  const glow = new THREE.Mesh(new THREE.PlaneGeometry(14, 8), glowMat);
  glow.position.z = -2.5;
  scene.add(glow);

  // ---------- Particles ----------
  const N = mobile ? 1500 : 3400;
  const F = buildFormations(N);
  const pg = new THREE.BufferGeometry();
  pg.setAttribute("position", new THREE.BufferAttribute(F.E.slice(), 3));
  pg.setAttribute("aE", new THREE.BufferAttribute(F.E, 3));
  pg.setAttribute("aD", new THREE.BufferAttribute(F.D, 3));
  pg.setAttribute("aR", new THREE.BufferAttribute(F.R, 3));
  pg.setAttribute("aSeed", new THREE.BufferAttribute(F.seed, 1));
  pg.setAttribute("aSize", new THREE.BufferAttribute(F.size, 1));
  const pUniforms = {
    uW: { value: new THREE.Vector3(1, 0, 0) },
    uT: { value: 0 },
    uPx: { value: renderer.getPixelRatio() },
    uIn: { value: reduced ? 1 : 0 },
  };
  const pMat = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    uniforms: pUniforms,
    vertexShader: `
      attribute vec3 aE; attribute vec3 aD; attribute vec3 aR; attribute float aSeed; attribute float aSize;
      uniform vec3 uW; uniform float uT; uniform float uPx; uniform float uIn;
      varying float vA;
      void main(){
        vec3 e = aE;
        e.z += sin(e.x*0.55 + uT*0.6)*0.45 + cos(e.y*0.7 + uT*0.4)*0.25;   // fabric wave
        e.y += sin(uT*0.25 + aSeed*30.0)*0.12;
        vec3 d = aD; d.z += sin(uT*0.5 + aD.x*0.2)*0.12;
        vec3 r = aR;
        // staggered morph: each particle travels on its own slight delay
        vec3 w = clamp((uW - aSeed*0.25)/0.75, 0.0, 1.0); float s = w.x+w.y+w.z; w = s>0.0 ? w/s : vec3(1.,0.,0.);
        vec3 p = e*w.x + d*w.y + r*w.z;
        // mid-flight swirl
        float mid = 1.0 - max(w.x, max(w.y, w.z));
        p += vec3(sin(aSeed*40.0+uT), cos(aSeed*30.0+uT), sin(aSeed*20.0)) * mid * 1.2;
        p *= mix(1.6, 1.0, uIn);
        vec4 mv = modelViewMatrix * vec4(p,1.0);
        gl_Position = projectionMatrix * mv;
        float sz = mix(aSize, 0.9, w.y) * mix(1.0, 0.75, w.z);
        gl_PointSize = sz * uPx * 13.0 / -mv.z;
        float tw = 0.65 + 0.35*sin(uT*1.4 + aSeed*60.0);
        vA = (0.25 + 0.55*aSeed) * tw * uIn * (w.x*0.85 + w.y + w.z*1.1);
      }`,
    fragmentShader: `
      varying float vA;
      void main(){ vec2 c=gl_PointCoord-0.5; float d=length(c); float a=smoothstep(0.5,0.05,d); gl_FragColor=vec4(vec3(1.0), a*vA); }`,
  });
  const points = new THREE.Points(pg, pMat);
  points.frustumCulled = false;
  scene.add(points);

  // ---------- State ----------
  let mode = 0, modeT = 0;
  const wTarget = new THREE.Vector3(1, 0, 0);
  const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
  let scroll = 0, auto = !reduced, raf = 0, running = true, t0 = performance.now(), last = t0, cycleAt = 7;

  function setMode(i, fromUser) {
    mode = ((i % 3) + 3) % 3;
    wTarget.set(mode === 0 ? 1 : 0, mode === 1 ? 1 : 0, mode === 2 ? 1 : 0);
    modeT = 0;
    if (fromUser) auto = false;
    onMode(mode);
  }

  function resize() {
    const w = container.clientWidth || window.innerWidth, h = container.clientHeight || window.innerHeight;
    renderer.setSize(w, h, false);
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    camera.aspect = w / h;
    // keep the logo framed on narrow screens
    camera.position.z = w / h < 0.8 ? 9.2 : 7;
    camera.updateProjectionMatrix();
  }
  resize();
  window.addEventListener("resize", resize);

  function frame(now) {
    raf = requestAnimationFrame(frame);
    if (!running) return;
    const dt = Math.min((now - last) / 1000, 0.05); last = now;
    const t = (now - t0) / 1000;
    pUniforms.uT.value = reduced ? 0 : t;

    // intro: pieces assemble
    const introT = reduced ? 10 : t - 0.25;
    pieces.forEach((m) => {
      const k = ease((introT - m.userData.delay) / 1.9);
      const f = m.userData.from;
      m.position.set(f.x * (1 - k), f.y * (1 - k), f.z * (1 - k));
      m.rotation.set(f.rx * (1 - k), f.ry * (1 - k), f.rz * (1 - k));
    });
    pUniforms.uIn.value = reduced ? 1 : ease((t - 0.6) / 2.2);
    glowMat.uniforms.uO.value = reduced ? 1 : ease((t - 0.4) / 2);

    // morph weights
    modeT += dt;
    pUniforms.uW.value.lerp(wTarget, 1 - Math.pow(0.0009, dt / 1.6));
    if (auto && t > cycleAt) { cycleAt = t + 7; setMode(mode + 1, false); }

    // pointer (limited range, smoothed)
    pointer.x += (pointer.tx - pointer.x) * Math.min(dt * 3.5, 1);
    pointer.y += (pointer.ty - pointer.y) * Math.min(dt * 3.5, 1);
    const idle = reduced ? 0 : Math.sin(t * 0.35) * 0.08;
    logo.rotation.y = pointer.x * 0.38 + idle - scroll * 0.6;
    logo.rotation.x = -pointer.y * 0.2 + scroll * 0.35;
    logo.position.y = (mobile ? 1.1 : 0.45) + (reduced ? 0 : Math.sin(t * 0.6) * 0.04) + scroll * 1.6;
    logo.position.z = -scroll * 2.5;
    points.rotation.y = pointer.x * 0.08;
    points.rotation.x = -pointer.y * 0.05;
    points.position.y = scroll * 2.2;
    if (scene.environmentRotation) scene.environmentRotation.y = t * 0.12 + pointer.x * 0.6;
    rim.position.x = Math.sin(t * 0.5) * 4;

    renderer.render(scene, camera);
  }
  raf = requestAnimationFrame(frame);

  return {
    setMode: (i) => setMode(i, true),
    getMode: () => mode,
    setPointer(x, y) { pointer.tx = Math.max(-1, Math.min(1, x)); pointer.ty = Math.max(-1, Math.min(1, y)); },
    setScroll(p) { scroll = Math.max(0, Math.min(1, p)); },
    setActive(a) { running = a; if (a) last = performance.now(); },
    destroy() {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      pg.dispose(); pMat.dispose(); mat.dispose(); glowMat.dispose();
      pieces.forEach((m) => m.geometry.dispose());
      envRT.dispose(); pmrem.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    },
  };
}
