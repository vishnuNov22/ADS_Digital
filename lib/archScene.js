// ============================================================
// Real Estate hero — white architectural massing model rising from a dark
// ground plane, soft shadows, slow orbit. createArchScene(THREE, container, opts)
// ============================================================
const easeOut = (t) => 1 - Math.pow(1 - Math.min(Math.max(t, 0), 1), 3);

export function createArchScene(THREE, container, opts = {}) {
  const mobile = !!opts.mobile, reduced = !!opts.reduced;
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, mobile ? 1.5 : 2));
  renderer.setClearColor(0x050505, 1);
  renderer.shadowMap.enabled = !mobile;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x050505, 14, 34);
  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);

  scene.add(new THREE.HemisphereLight(0xffffff, 0x111111, 1.1));
  const sun = new THREE.DirectionalLight(0xffffff, 2.6);
  sun.position.set(-8, 14, 6);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  Object.assign(sun.shadow.camera, { left: -16, right: 16, top: 16, bottom: -16, near: 1, far: 40 });
  sun.shadow.bias = -0.0005;
  scene.add(sun);

  // ground with fine survey grid
  const groundMat = new THREE.ShaderMaterial({
    transparent: false,
    uniforms: { uFog: { value: new THREE.Color(0x050505) } },
    vertexShader: `varying vec3 vP; void main(){ vec4 w = modelMatrix*vec4(position,1.0); vP=w.xyz; gl_Position=projectionMatrix*viewMatrix*w; }`,
    fragmentShader: `varying vec3 vP; uniform vec3 uFog;
      float line(float x, float w){ float f=abs(fract(x-0.5)-0.5)/fwidth(x); return 1.0-min(f/w,1.0); }
      void main(){
        float g = max(line(vP.x*1.0,1.0), line(vP.z*1.0,1.0))*0.07 + max(line(vP.x*0.2,1.2), line(vP.z*0.2,1.2))*0.12;
        float d = length(vP.xz);
        vec3 c = vec3(0.045) + g;
        c = mix(c, uFog, smoothstep(8.0, 26.0, d));
        gl_FragColor = vec4(c,1.0);
      }`,
  });
  // ShaderMaterial can't receive shadows, so add a shadow catcher on top
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(80, 80), groundMat);
  ground.rotation.x = -Math.PI / 2;
  scene.add(ground);
  const catcher = new THREE.Mesh(new THREE.PlaneGeometry(80, 80), new THREE.ShadowMaterial({ opacity: 0.55 }));
  catcher.rotation.x = -Math.PI / 2; catcher.position.y = 0.002; catcher.receiveShadow = true;
  scene.add(catcher);

  // buildings
  let s = 11;
  const r = () => ((s = (s * 16807) % 2147483647) / 2147483647);
  const lots = [];
  for (let x = -6; x <= 6; x++) {
    for (let z = -6; z <= 4; z++) {
      if ((x % 3 === 0) || (z % 4 === 0)) continue; // streets
      if (r() < 0.18) continue; // open plots
      const dist = Math.hypot(x, z + 1);
      const h = (0.5 + r() * 1.2) * (dist < 3 ? 3.4 : dist < 5 ? 2 : 1.1);
      lots.push({ x: x * 1.25, z: z * 1.25, w: 0.9 + r() * 0.2, d: 0.9 + r() * 0.2, h, delay: dist * 0.09 + r() * 0.2 });
    }
  }
  const geo = new THREE.BoxGeometry(1, 1, 1);
  geo.translate(0, 0.5, 0);
  const mat = new THREE.MeshStandardMaterial({ color: 0xf1f0ed, roughness: 0.62, metalness: 0.0 });
  mat.onBeforeCompile = (sh) => {
    sh.vertexShader = sh.vertexShader
      .replace("#include <common>", "#include <common>\nvarying float vWY; varying vec3 vObjN;")
      .replace("#include <project_vertex>", `#include <project_vertex>
        vec4 wpA = modelMatrix * instanceMatrix * vec4(transformed, 1.0); vWY = wpA.y; vObjN = normal;`);
    sh.fragmentShader = sh.fragmentShader
      .replace("#include <common>", "#include <common>\nvarying float vWY; varying vec3 vObjN;")
      .replace("#include <dithering_fragment>", `#include <dithering_fragment>
        float side = 1.0 - abs(vObjN.y);
        float fl = smoothstep(0.035, 0.0, abs(fract(vWY * 2.6) - 0.5) - 0.46) * side;
        gl_FragColor.rgb *= 1.0 - fl * 0.35;`);
  };
  const city = new THREE.InstancedMesh(geo, mat, lots.length);
  city.castShadow = true; city.receiveShadow = true;
  scene.add(city);
  const m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), v = new THREE.Vector3(), sc = new THREE.Vector3();

  // edge lines for the tallest towers (architectural drawing feel)
  const edges = new THREE.Group();
  const eGeo = new THREE.EdgesGeometry(geo);
  const eMat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.0 });
  lots.filter((l) => l.h > 2.4).forEach((l) => {
    const ls = new THREE.LineSegments(eGeo, eMat);
    ls.position.set(l.x, 0, l.z); ls.userData.l = l;
    edges.add(ls);
  });
  scene.add(edges);

  const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
  let scroll = 0, running = true, raf = 0;
  const t0 = performance.now();

  function resize() {
    const w = container.clientWidth || window.innerWidth, h = container.clientHeight || window.innerHeight;
    renderer.setSize(w, h, false);
    renderer.domElement.style.width = "100%"; renderer.domElement.style.height = "100%";
    camera.aspect = w / h; camera.fov = w / h < 0.8 ? 48 : 32; camera.updateProjectionMatrix();
  }
  resize();
  window.addEventListener("resize", resize);

  function frame(now) {
    raf = requestAnimationFrame(frame);
    if (!running) return;
    const t = (now - t0) / 1000;
    const T = reduced ? 99 : t;
    lots.forEach((l, i) => {
      const k = easeOut((T - 0.2 - l.delay) / 1.6);
      v.set(l.x, 0, l.z); sc.set(l.w, Math.max(0.001, l.h * k), l.d);
      m4.compose(v, q, sc); city.setMatrixAt(i, m4);
    });
    city.instanceMatrix.needsUpdate = true;
    edges.children.forEach((e) => { const l = e.userData.l; const k = easeOut((T - 0.2 - l.delay) / 1.6); e.scale.set(l.w * 1.003, Math.max(0.001, l.h * k) * 1.003, l.d * 1.003); });
    eMat.opacity = 0.35 * easeOut((T - 1.6) / 1.5);

    pointer.x += (pointer.tx - pointer.x) * 0.05; pointer.y += (pointer.ty - pointer.y) * 0.05;
    const ang = (reduced ? 0.6 : 0.6 + t * 0.04) + pointer.x * 0.25;
    const rad = 21 - scroll * 6;
    camera.position.set(Math.sin(ang) * rad, 9.5 + pointer.y * 1.5 - scroll * 3, Math.cos(ang) * rad);
    camera.lookAt(0, 1.4 + scroll * 1.5, -1);
    renderer.render(scene, camera);
  }
  raf = requestAnimationFrame(frame);

  return {
    setPointer(x, y) { pointer.tx = Math.max(-1, Math.min(1, x)); pointer.ty = Math.max(-1, Math.min(1, y)); },
    setScroll(p) { scroll = Math.max(0, Math.min(1, p)); },
    setActive(a) { running = a; },
    destroy() {
      cancelAnimationFrame(raf); window.removeEventListener("resize", resize);
      geo.dispose(); mat.dispose(); eGeo.dispose(); eMat.dispose(); groundMat.dispose();
      renderer.dispose(); renderer.domElement.remove();
    },
  };
}
