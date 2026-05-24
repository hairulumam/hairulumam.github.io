// ═══════════════════════════════════════════════════════════════════════
// HAIRUL UMAM PORTFOLIO — Main Script
// ═══════════════════════════════════════════════════════════════════════
// Bagian ini berisi logic untuk:
//   1. Load semua data dari file JSON di folder /data
//   2. Render konten dinamis (profile, publications, courses, journey, dll)
//   3. Interaktivitas (loading screen, hero spiral, dropdown, dll)
//
// Untuk edit konten teks/data, JANGAN edit file ini.
// Edit langsung file JSON di folder data/.
// ═══════════════════════════════════════════════════════════════════════

(function(){
  'use strict';

  // ─── COVERS: Ilustrasi SVG untuk kartu hero spiral ──────────────────
  const COVERS = {
    profil: { tint:'#ede8f7', accent:'#3d1d8c', svg:`<svg viewBox="0 0 220 140" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" style="width:100%;height:100%;display:block;">
      <defs><linearGradient id="bg-profil" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ede8f7"/><stop offset="100%" stop-color="#d4c8ee"/></linearGradient></defs>
      <rect width="220" height="140" fill="url(#bg-profil)"/>
      <path d="M 110 35 Q 95 35, 93 55 Q 93 70, 104 73 L 104 80 Q 85 84, 80 100 L 140 100 Q 135 84, 116 80 L 116 73 Q 127 70, 127 55 Q 125 35, 110 35 Z" fill="#3d1d8c" opacity="0.85"/>
      <circle cx="110" cy="38" r="17" fill="none" stroke="#3d1d8c" stroke-width="0.9" opacity="0.5"/>
    </svg>`},
    pengajaran: { tint:'#faf3e8', accent:'#b8915a', svg:`<svg viewBox="0 0 220 140" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" style="width:100%;height:100%;display:block;">
      <defs><linearGradient id="bg-pen" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#faf3e8"/><stop offset="100%" stop-color="#ecd9b8"/></linearGradient></defs>
      <rect width="220" height="140" fill="url(#bg-pen)"/>
      <text x="45" y="55" font-family="Georgia, serif" font-size="13" fill="#8a6a3f" font-style="italic">f(x) = ax² + b</text>
      <text x="45" y="78" font-family="Georgia, serif" font-size="13" fill="#b8915a" font-style="italic">∫ y dx</text>
      <text x="45" y="100" font-family="Georgia, serif" font-size="11" fill="#8a6a3f" opacity="0.75">→ algoritma</text>
    </svg>`},
    publikasi: { tint:'#f0e8f5', accent:'#7a3d8c', svg:`<svg viewBox="0 0 220 140" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" style="width:100%;height:100%;display:block;">
      <defs><linearGradient id="bg-pub" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#f0e8f5"/><stop offset="100%" stop-color="#d6bce0"/></linearGradient></defs>
      <rect width="220" height="140" fill="url(#bg-pub)"/>
      <rect x="55" y="100" width="110" height="11" fill="#7a3d8c" opacity="0.85"/>
      <rect x="60" y="85" width="100" height="11" fill="#9a5dac" opacity="0.75"/>
      <rect x="52" y="70" width="115" height="11" fill="#b87dc8" opacity="0.65"/>
    </svg>`},
    educator: { tint:'#fce8e8', accent:'#c93838', svg:`<svg viewBox="0 0 220 140" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" style="width:100%;height:100%;display:block;">
      <defs><linearGradient id="bg-edu" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#fce8e8"/><stop offset="100%" stop-color="#e8b8b8"/></linearGradient></defs>
      <rect width="220" height="140" fill="url(#bg-edu)"/>
      <rect x="70" y="40" width="80" height="56" rx="8" fill="#c93838" opacity="0.85"/>
      <polygon points="100,60 100,82 122,71" fill="white"/>
    </svg>`},
    riwayat: { tint:'#eef0e6', accent:'#6b7a4a', svg:`<svg viewBox="0 0 220 140" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" style="width:100%;height:100%;display:block;">
      <defs><linearGradient id="bg-riw" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#eef0e6"/><stop offset="100%" stop-color="#c9d1b4"/></linearGradient></defs>
      <rect width="220" height="140" fill="url(#bg-riw)"/>
      <line x1="42" y1="78" x2="178" y2="78" stroke="#6b7a4a" stroke-width="1.2" opacity="0.5"/>
      <circle cx="50" cy="78" r="6" fill="#6b7a4a"/>
      <circle cx="110" cy="78" r="6" fill="#6b7a4a"/>
      <circle cx="170" cy="78" r="6" fill="#6b7a4a"/>
      <text x="50" y="60" font-family="Georgia, serif" font-size="11" fill="#4f5b36" text-anchor="middle" font-style="italic">2017</text>
      <text x="110" y="60" font-family="Georgia, serif" font-size="11" fill="#4f5b36" text-anchor="middle" font-style="italic">2021</text>
      <text x="170" y="60" font-family="Georgia, serif" font-size="11" fill="#4f5b36" text-anchor="middle" font-style="italic">2026</text>
      <text x="50" y="98" font-family="'Plus Jakarta Sans', sans-serif" font-size="7.5" fill="#6b7a4a" text-anchor="middle" letter-spacing="1.5">UGM</text>
      <text x="110" y="98" font-family="'Plus Jakarta Sans', sans-serif" font-size="7.5" fill="#6b7a4a" text-anchor="middle" letter-spacing="1.5">ITB</text>
      <text x="170" y="98" font-family="'Plus Jakarta Sans', sans-serif" font-size="7.5" fill="#6b7a4a" text-anchor="middle" letter-spacing="1.2">TAZKIA</text>
    </svg>`},
  };

  const CARDS = [
    { menu:'Profil',     target:'#about',    data:COVERS.profil },
    { menu:'Pengajaran', target:'#courses',  data:COVERS.pengajaran },
    { menu:'Penelitian', target:'#research', data:COVERS.publikasi },
    { menu:'Pengabdian', target:'#service',  data:COVERS.educator },
    { menu:'Riwayat',    target:'#journey',  data:COVERS.riwayat },
  ];

  // ─── HELPERS ────────────────────────────────────────────────────────
  function $(sel){ return document.querySelector(sel); }
  function esc(str){
    if (str === null || str === undefined) return '';
    return String(str).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  }
  function linkOrText(name, url){
    if (!url) return esc(name);
    return `<a href="${esc(url)}" target="_blank" rel="noopener" class="inst-link">${esc(name)}</a>`;
  }
  // Inject overlay link absolut yang menutupi seluruh kartu (kalau proof_url ada)
  // Kartu tetap div biasa, <a> di-overlay di atasnya. Hindari issue
  // <a> tidak boleh membungkus elemen block-level (browser auto-correct ke pecahan)
  function proofOverlay(proofUrl){
    if (!proofUrl) return '';
    return `<a href="${esc(proofUrl)}" target="_blank" rel="noopener" class="proof-overlay" title="Lihat bukti dokumen" aria-label="Lihat bukti dokumen"></a>`;
  }
  // Class tambahan untuk kartu yang punya bukti — supaya CSS bisa apply accent emas
  function hasProofClass(proofUrl){
    return proofUrl ? ' has-proof' : '';
  }

  // ═══════════════════════════════════════════════════════════════════
  // ─── DATA LOADER: fetch semua JSON sekaligus ───
  // ═══════════════════════════════════════════════════════════════════
  async function loadData(){
    const files = ['profile', 'theses', 'publications', 'haki', 'services', 'courses', 'journey', 'achievements'];
    const results = await Promise.all(
      files.map(f => fetch(`data/${f}.json`).then(r => {
        if (!r.ok) throw new Error(`Gagal memuat data/${f}.json (status ${r.status})`);
        return r.json();
      }))
    );
    const data = {};
    files.forEach((f, i) => data[f] = results[i]);
    return data;
  }

  // ═══════════════════════════════════════════════════════════════════
  // ─── RENDERERS: setiap section punya fungsi render-nya ───
  // ═══════════════════════════════════════════════════════════════════

  function renderProfile(profile){
    // Signature di hero
    const heroSig = $('#heroSig');
    if (heroSig) {
      heroSig.innerHTML = `${esc(profile.name.split(' ')[0])} <em>${esc(profile.name.split(' ').slice(1).join(' '))}</em>`;
    }
    const heroTagline = $('#heroTagline');
    if (heroTagline) {
      heroTagline.textContent = `${profile.title} — ${profile.tagline_keywords.join(' · ')}`;
    }

    // Photo
    const photo = $('#aboutPhoto');
    if (photo) {
      photo.src = profile.photo;
      photo.alt = profile.name;
    }

    // Meta box di About
    const metaBox = $('#aboutMeta');
    if (metaBox) {
      metaBox.innerHTML = profile.meta.map(m => `
        <div class="item">
          <span class="label">${esc(m.label)}</span>
          <span class="value">${linkOrText(m.value, m.url)}</span>
        </div>
      `).join('');
    }

    // Intro paragraphs (mengandung HTML inline, jadi tidak di-escape)
    const introBox = $('#aboutIntro');
    if (introBox) {
      introBox.innerHTML = profile.intro.map(p => `<p>${p}</p>`).join('');
    }

    // Signature & role di About
    $('#aboutSignature').textContent = `— ${profile.name}`;
    $('#aboutSignatureRole').textContent = `${profile.title} · ${profile.role}`;

    // Identity pillars
    const pillarsBox = $('#identityPillars');
    if (pillarsBox) {
      pillarsBox.innerHTML = profile.pillars.map(p => `
        <a href="${esc(p.url)}" target="_blank" rel="noopener" class="pillar">
          <span class="pillar-icon">${p.icon}</span>
          <div class="pillar-title">${esc(p.title)}</div>
          <div class="pillar-desc">${esc(p.desc)}</div>
        </a>
      `).join('');
    }

    // Metrics
    const metricsBox = $('#metricsGrid');
    if (metricsBox) {
      metricsBox.innerHTML = profile.metrics.map(m => `
        <div class="metric">
          <div class="metric-num" data-target="${m.value}" data-suffix="${esc(m.suffix || '')}">0</div>
          <div class="metric-label">${esc(m.label)}</div>
          <div class="metric-source">${linkOrText(m.source, m.url)}</div>
        </div>
      `).join('');
    }

    // Contact
    const contactBox = $('#contactInfo');
    if (contactBox) {
      contactBox.innerHTML = `
        <div class="contact-item">
          <div class="label">Surel Resmi</div>
          <div class="value"><a href="mailto:${esc(profile.contact.email)}" class="inst-link">${esc(profile.contact.email)}</a></div>
        </div>
        <div class="contact-item">
          <div class="label">Institusi</div>
          <div class="value">${linkOrText(profile.contact.institution.name, profile.contact.institution.url)}</div>
        </div>
        <div class="contact-item">
          <div class="label">Program Studi</div>
          <div class="value">${linkOrText(profile.contact.program.name, profile.contact.program.url)}</div>
        </div>
      `;
    }
    const emailBtn = $('#contactEmailBtn');
    if (emailBtn) emailBtn.href = `mailto:${profile.contact.email}`;

    // Footer socials
    const footerSocials = $('#footerSocials');
    if (footerSocials && profile.socials) {
      const items = [];
      if (profile.socials.scholar)  items.push(`<a href="${esc(profile.socials.scholar)}" target="_blank">Scholar</a>`);
      if (profile.socials.linkedin) items.push(`<a href="${esc(profile.socials.linkedin)}" target="_blank">LinkedIn</a>`);
      if (profile.socials.youtube)  items.push(`<a href="${esc(profile.socials.youtube)}" target="_blank">YouTube</a>`);
      if (profile.socials.telegram) items.push(`<a href="${esc(profile.socials.telegram)}" target="_blank">Telegram</a>`);
      footerSocials.innerHTML = items.join('');
    }
  }

  function renderTheses(theses){
    const box = $('#thesesList');
    if (!box) return;
    box.innerHTML = theses.map(t => `
      <div class="thesis-item">
        <div class="thesis-meta">
          <span class="thesis-type">${esc(t.type)}</span>
          <span>·</span>
          <span class="thesis-univ">${esc(t.university)}</span>
          <span class="thesis-year">${esc(t.year)}</span>
        </div>
        <a href="${esc(t.url)}" target="_blank" rel="noopener" class="thesis-title">"${esc(t.title)}"</a>
        <div class="thesis-supervisor">Pembimbing: <strong>${esc(t.supervisor)}</strong> · ${linkOrText(t.department, t.department_url)}</div>
      </div>
    `).join('');
  }

  function renderPublications(pubs){
    const box = $('#pubList');
    if (!box) return;
    box.innerHTML = pubs.map(p => `
      <div class="pub-item${hasProofClass(p.proof_url)}">
        ${proofOverlay(p.proof_url)}
        <div class="pub-year">${esc(p.year)}</div>
        <div class="pub-content">
          <h4>${esc(p.title)}</h4>
          <div class="pub-journal">${esc(p.journal)}${p.journal_em ? ' · <em>' + esc(p.journal_em) + '</em>' : ''}</div>
          <div class="pub-authors">${esc(p.authors)}</div>
        </div>
      </div>
    `).join('');
  }

  function renderHaki(items){
    const box = $('#hakiList');
    if (!box) return;
    box.innerHTML = items.map(h => `
      <div class="haki-item${hasProofClass(h.proof_url)}">
        ${proofOverlay(h.proof_url)}
        <div class="haki-badge">${esc(h.badge).replace(' ', '<br>')}</div>
        <div class="haki-content">
          <h4>"${esc(h.title)}"</h4>
          <div class="haki-meta">Jenis: <em>${esc(h.type)}</em> · No. Pencatatan: <em>${esc(h.reg_number)}</em></div>
          <div class="haki-authors">Pencipta: ${esc(h.authors)} · Pemegang Hak: ${esc(h.holder)}</div>
        </div>
        <div class="haki-tag">${esc(h.year)}</div>
      </div>
    `).join('');
  }

  function renderServices(services){
    $('#serviceIntro').textContent = services.intro;
    const grid = $('#serviceGrid');
    if (grid) {
      grid.innerHTML = services.cards.map(c => {
        const statsHtml = c.stats.map(s => `
          <div class="service-stat">
            <div class="num">${esc(s.num)}</div>
            <div class="lbl">${esc(s.lbl)}</div>
          </div>
        `).join('');
        const linkHtml = c.link ? `<a href="${esc(c.link)}" target="_blank" class="service-card-link">${esc(c.link_label || 'Kunjungi →')}</a>` : '';
        const proofHtml = c.proof_url ? `<a href="${esc(c.proof_url)}" target="_blank" rel="noopener" class="service-card-proof" title="Lihat bukti dokumen">📄 Bukti dokumen <span class="ar">↗</span></a>` : '';
        return `
          <div class="service-card ${esc(c.type)}">
            <div class="service-card-icon">${c.icon}</div>
            <div class="service-card-tag">${esc(c.tag)}</div>
            <h3 class="service-card-title">${esc(c.title)}</h3>
            <p class="service-card-desc">${esc(c.desc)}</p>
            <div class="service-card-stats">${statsHtml}</div>
            ${linkHtml}
            ${proofHtml}
          </div>
        `;
      }).join('');
    }
    const disclaimer = $('#serviceDisclaimer');
    if (disclaimer) disclaimer.innerHTML = services.disclaimer;
  }

  let SEMESTERS_DATA = []; // Disimpan untuk referensi dropdown
  function renderCoursesSection(semesters){
    SEMESTERS_DATA = semesters;
    if (semesters.length === 0) return;

    const trigger = $('#dropdownTrigger');
    const label = $('#dropdownLabel');
    const menu = $('#dropdownMenu');
    const grid = $('#coursesGrid');
    if (!trigger || !menu) return;

    let currentId = semesters[0].id; // default: paling baru
    label.textContent = semesters[0].label;

    // Build dropdown
    menu.innerHTML = '';
    semesters.forEach(sem => {
      const item = document.createElement('div');
      item.className = 'dropdown-item' + (sem.id === currentId ? ' active' : '');
      item.dataset.id = sem.id;
      item.innerHTML = `
        <span>${esc(sem.label)}</span>
        ${sem.active ? '<span class="badge">Aktif</span>' : ''}
      `;
      item.addEventListener('click', () => {
        currentId = sem.id;
        label.textContent = sem.label;
        menu.classList.remove('open');
        trigger.classList.remove('open');
        menu.querySelectorAll('.dropdown-item').forEach(it => it.classList.remove('active'));
        item.classList.add('active');
        renderCoursesGrid(sem.id);
      });
      menu.appendChild(item);
    });

    // Toggle dropdown
    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      menu.classList.toggle('open');
      trigger.classList.toggle('open');
    });
    document.addEventListener('click', () => {
      menu.classList.remove('open');
      trigger.classList.remove('open');
    });

    renderCoursesGrid(currentId);
  }

  function renderCoursesGrid(semId) {
    const grid = $('#coursesGrid');
    if (!grid) return;
    const sem = SEMESTERS_DATA.find(s => s.id === semId);
    grid.classList.add('fading');
    setTimeout(() => {
      grid.innerHTML = '';
      if (!sem || sem.mataKuliah.length === 0) {
        grid.innerHTML = '<div class="courses-empty">Belum ada data mata kuliah untuk periode ini.</div>';
      } else {
        sem.mataKuliah.forEach((mk, i) => {
          const card = document.createElement('div');
          card.className = 'course-card';
          card.style.animationDelay = (i * 0.08) + 's';
          card.innerHTML = `
            <div class="course-header">
              <div class="course-code">${esc(mk.kode)} · S1</div>
              <div class="course-sks">${esc(mk.sks)} SKS</div>
            </div>
            <h3 class="course-title">${esc(mk.nama)}</h3>
          `;
          grid.appendChild(card);
        });
      }
      grid.classList.remove('fading');
    }, 200);
  }

  function renderJourney(items){
    const box = $('#timeline');
    if (!box) return;
    box.innerHTML = items.map(j => {
      let tagClass = 'tl-tag';
      let yearClass = 'tl-year';
      let dotClass = 'tl-dot';
      if (j.kind === 'education') {
        tagClass = 'tl-tag edu';
        yearClass = 'tl-year education';
        dotClass = 'tl-dot education';
      } else if (j.kind === 'structural') {
        tagClass = 'tl-tag struct';
        yearClass = 'tl-year structural';
        dotClass = 'tl-dot structural';
      }
      const institutionHtml = j.department
        ? `${linkOrText(j.institution, j.institution_url)} · ${esc(j.department)}`
        : linkOrText(j.institution, j.institution_url);
      const content = `
        <div class="tl-content${hasProofClass(j.proof_url)}">
          ${proofOverlay(j.proof_url)}
          <div class="${tagClass}">${esc(j.tag)}</div>
          <p class="${yearClass}">${esc(j.year)}</p>
          <h3 class="tl-role">${esc(j.role)}</h3>
          <p class="tl-institution">${institutionHtml}</p>
          <p class="tl-desc">${esc(j.desc)}</p>
        </div>
      `;
      if (j.side === 'left') {
        return `<div class="timeline-item">${content}<div class="${dotClass}"></div><div class="tl-empty"></div></div>`;
      } else {
        return `<div class="timeline-item"><div class="tl-empty"></div><div class="${dotClass}"></div>${content}</div>`;
      }
    }).join('');
  }

  function renderAchievements(items){
    const box = $('#achievementList');
    if (!box) return;
    box.innerHTML = items.map(a => {
      const sep = a.separator || '';
      const instHtml = a.institutions.map(i => linkOrText(i.name, i.url)).join(sep);
      return `
        <div class="achievement-item${hasProofClass(a.proof_url)}">
          ${proofOverlay(a.proof_url)}
          <div class="ach-icon">${a.icon}</div>
          <div class="ach-content">
            <h4>${esc(a.title)}</h4>
            <p>${instHtml}</p>
          </div>
          <div class="ach-year">${esc(a.year)}</div>
        </div>
      `;
    }).join('');
  }

  // ═══════════════════════════════════════════════════════════════════
  // ─── LOADING SCREEN: FIBONACCI / GOLDEN RATIO SPIRAL ───
  // ═══════════════════════════════════════════════════════════════════
  function startLoadingScreen(){
    const loadCanvas = document.getElementById('loadCanvas');
    const loadCtx = loadCanvas.getContext('2d');
    const loadingScreen = document.getElementById('loadingScreen');
    const loadProgress = document.getElementById('loadProgress');
    const loadProgressBar = document.getElementById('loadProgressBar');

    const DPR = window.devicePixelRatio || 1;
    function resizeLoad(){
      loadCanvas.width = window.innerWidth * DPR;
      loadCanvas.height = window.innerHeight * DPR;
      loadCanvas.style.width = window.innerWidth + 'px';
      loadCanvas.style.height = window.innerHeight + 'px';
      loadCtx.setTransform(DPR, 0, 0, DPR, 0, 0);
    }
    resizeLoad();
    window.addEventListener('resize', resizeLoad);

    const loadStart = performance.now();
    const LOAD_DURATION = 3.8;
    let loadDone = false;
    const FIB = [1, 1, 2, 3, 5, 8, 13, 21];

    function buildBoxes(unit){
      const boxes = [];
      boxes.push({ x: 0, y: 0, size: FIB[0]*unit });
      boxes.push({ x: FIB[0]*unit, y: 0, size: FIB[1]*unit });
      for (let i = 2; i < FIB.length; i++){
        const size = FIB[i] * unit;
        let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
        boxes.forEach(b => {
          if (b.x < minX) minX = b.x;
          if (b.y < minY) minY = b.y;
          if (b.x + b.size > maxX) maxX = b.x + b.size;
          if (b.y + b.size > maxY) maxY = b.y + b.size;
        });
        const side = (i - 2) % 4;
        let nx, ny;
        if (side === 0){ nx = minX;        ny = maxY;           }
        else if (side === 1){ nx = minX - size; ny = minY;       }
        else if (side === 2){ nx = minX;        ny = minY - size; }
        else { nx = maxX;        ny = minY;       }
        boxes.push({ x: nx, y: ny, size });
      }
      return boxes;
    }
    function arcCenterCorner(i){
      if (i === 0) return 'BR';
      if (i === 1) return 'BL';
      const side = (i - 2) % 4;
      return ['TL', 'TR', 'BR', 'BL'][side];
    }
    function arcAngles(corner){
      const map = {
        'TL': [0, Math.PI/2],
        'TR': [Math.PI/2, Math.PI],
        'BR': [Math.PI, 3*Math.PI/2],
        'BL': [3*Math.PI/2, 2*Math.PI],
      };
      return map[corner];
    }
    function cornerXY(box, corner){
      const { x, y, size } = box;
      if (corner === 'TL') return [x, y];
      if (corner === 'TR') return [x + size, y];
      if (corner === 'BL') return [x, y + size];
      if (corner === 'BR') return [x + size, y + size];
    }
    function drawFibonacci(ctx, cx, cy, unit, revealRatio, rotation){
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(rotation);
      const boxes = buildBoxes(unit);
      let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
      boxes.forEach(b => {
        if (b.x < minX) minX = b.x;
        if (b.y < minY) minY = b.y;
        if (b.x + b.size > maxX) maxX = b.x + b.size;
        if (b.y + b.size > maxY) maxY = b.y + b.size;
      });
      const offX = -(minX + maxX) / 2;
      const offY = -(minY + maxY) / 2;
      ctx.lineCap = 'round';
      boxes.forEach((b, i) => {
        const opacity = Math.min(1, Math.max(0, revealRatio * FIB.length - i));
        if (opacity < 0.02) return;
        const px = b.x + offX;
        const py = b.y + offY;
        ctx.globalAlpha = opacity * 0.10;
        ctx.fillStyle = i % 2 ? '#3d1d8c' : '#b8915a';
        ctx.fillRect(px, py, b.size, b.size);
        ctx.globalAlpha = opacity * 0.40;
        ctx.strokeStyle = '#3d1d8c';
        ctx.lineWidth = 0.8;
        ctx.strokeRect(px, py, b.size, b.size);
        if (b.size > 22){
          ctx.globalAlpha = opacity * 0.45;
          ctx.fillStyle = i % 2 ? '#3d1d8c' : '#8a6a3f';
          const fontSize = Math.min(b.size * 0.22, 18);
          ctx.font = `italic ${fontSize}px 'Cormorant Garamond', serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(FIB[i], px + b.size/2, py + b.size/2);
        }
      });
      boxes.forEach((b, i) => {
        const opacity = Math.min(1, Math.max(0, revealRatio * FIB.length - i));
        if (opacity < 0.05) return;
        const corner = arcCenterCorner(i);
        const [acx, acy] = cornerXY(b, corner);
        const cx2 = acx + offX;
        const cy2 = acy + offY;
        const [a1, a2] = arcAngles(corner);
        ctx.globalAlpha = opacity * 0.20;
        ctx.strokeStyle = '#3d1d8c';
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.arc(cx2, cy2, b.size, a1, a2);
        ctx.stroke();
        ctx.globalAlpha = opacity * 1.0;
        ctx.strokeStyle = '#b8915a';
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.arc(cx2, cy2, b.size, a1, a2);
        ctx.stroke();
      });
      ctx.restore();
    }
    function loadLoop(){
      const now = performance.now();
      const elapsed = (now - loadStart) / 1000;
      const W = window.innerWidth, H = window.innerHeight;
      loadCtx.clearRect(0, 0, W, H);
      if (elapsed > 1.4 && loadProgress.style.opacity !== '1'){
        loadProgress.style.opacity = '1';
      }
      const progressRatio = Math.min(elapsed / LOAD_DURATION, 1);
      loadProgressBar.style.width = (progressRatio * 100) + '%';
      if (elapsed > LOAD_DURATION && !loadDone){
        loadDone = true;
        loadingScreen.style.opacity = '0';
        document.getElementById('navbar').classList.add('ready');
        setTimeout(() => { loadingScreen.style.visibility = 'hidden'; }, 900);
      }
      const cx = W / 2;
      const cy = H * 0.50;
      const maxByW = (W * 0.6) / 34;
      const maxByH = (H * 0.6) / 21;
      const unit = Math.min(maxByW, maxByH, 14);
      const revealRatio = Math.min(1, elapsed / 2.5);
      const rotation = elapsed > 2.5 ? (elapsed - 2.5) * 0.03 : 0;
      drawFibonacci(loadCtx, cx, cy, unit, revealRatio, rotation);
      if (!loadDone || elapsed < LOAD_DURATION + 1.2){
        requestAnimationFrame(loadLoop);
      }
    }
    loadLoop();
  }

  // ═══════════════════════════════════════════════════════════════════
  // ─── CUSTOM CURSOR ───
  // ═══════════════════════════════════════════════════════════════════
  function startCustomCursor(){
    const cursor = document.getElementById('cursor');
    const cursorRing = document.getElementById('cursor-ring');
    if (!cursor || !cursorRing) return;
    let mx=0, my=0, rx=0, ry=0;
    let cursorVisible = false;
    cursor.style.opacity = 0;
    cursorRing.style.opacity = 0;
    cursor.style.transition = 'opacity 0.3s ease, width 0.3s ease, height 0.3s ease';
    cursorRing.style.transition = 'opacity 0.3s ease, left 0.15s ease, top 0.15s ease, width 0.3s ease, height 0.3s ease, border-color 0.3s ease';
    document.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      cursor.style.left = mx+'px';
      cursor.style.top = my+'px';
      if(!cursorVisible){
        cursor.style.opacity = 1;
        cursorRing.style.opacity = 1;
        cursorVisible = true;
      }
    });
    function animRing(){
      rx += (mx-rx)*0.14;
      ry += (my-ry)*0.14;
      cursorRing.style.left = rx+'px';
      cursorRing.style.top = ry+'px';
      requestAnimationFrame(animRing);
    }
    animRing();
  }

  // ═══════════════════════════════════════════════════════════════════
  // ─── HERO SPIRAL 3D ───
  // ═══════════════════════════════════════════════════════════════════
  function startHeroSpiral(){
    const spiral = document.getElementById('spiral');
    if (!spiral || spiral.dataset.initialized) return;
    spiral.dataset.initialized = 'true';
    const cardEls = [];
    let paused = false;
    let hoverPause = false;

    CARDS.forEach((c, i) => {
      const el = document.createElement('div');
      el.className = 'card';
      el.style.border = `1.5px solid ${c.data.accent}33`;
      el.innerHTML = `
        <div class="card-cover">${c.data.svg}</div>
        <div class="card-label">
          <div class="card-label-text">${c.menu}</div>
          <div style="width:14px; height:1.5px; background:${c.data.accent};"></div>
        </div>
      `;
      el.addEventListener('mouseenter', () => {
        el.style.borderColor = c.data.accent;
        el.style.boxShadow = `0 14px 40px ${c.data.accent}44`;
        document.body.classList.add('cursor-hover');
      });
      el.addEventListener('mouseleave', () => {
        el.style.borderColor = c.data.accent + '33';
        el.style.boxShadow = '0 8px 32px rgba(61, 29, 140, 0.08)';
        document.body.classList.remove('cursor-hover');
      });
      el.addEventListener('click', () => scrollToSection(i, el));
      spiral.appendChild(el);
      cardEls.push(el);
    });

    function scrollToSection(i, cardEl){
      const c = CARDS[i];
      cardEl.style.transition = 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.4s ease';
      cardEl.style.boxShadow = `0 20px 60px ${c.data.accent}88`;
      const target = document.querySelector(c.target);
      if (target) {
        paused = true;
        const navHeight = 80;
        const targetTop = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
        window.scrollTo({ top: targetTop, behavior: 'smooth' });
        setTimeout(() => {
          paused = false;
          cardEl.style.boxShadow = '';
        }, 800);
      }
    }

    let rotation = 0;
    const N = CARDS.length;
    const RADIUS = 260;
    const VERTICAL_SPAN = 180;
    let lastTs = performance.now();

    spiral.addEventListener('mouseenter', () => { hoverPause = true; }, true);
    spiral.addEventListener('mouseleave', () => { hoverPause = false; }, true);

    function tick(ts){
      const dt = (ts - lastTs) / 1000;
      lastTs = ts;
      if (!paused && !hoverPause){ rotation += dt * 0.2; }
      for (let i = 0; i < N; i++){
        const t = i / N;
        const angle = rotation + t * Math.PI * 2;
        const y = Math.sin(rotation * 0.35 + t * Math.PI * 2) * (VERTICAL_SPAN / 2);
        const x = Math.cos(angle) * RADIUS;
        const z = Math.sin(angle) * RADIUS;
        const tiltY = Math.cos(angle) * 10;
        const el = cardEls[i];
        el.style.transform = `translate3d(${x}px, ${y}px, ${z}px) rotateY(${-tiltY}deg)`;
        const depth = (z + RADIUS) / (RADIUS * 2);
        el.style.opacity = (0.55 + depth * 0.45).toFixed(3);
        el.style.zIndex = Math.round(depth * 100);
      }
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  // ═══════════════════════════════════════════════════════════════════
  // ─── INTERACTIVITY GLOBAL ───
  // ═══════════════════════════════════════════════════════════════════
  function startGlobalInteractivity(){
    // Navbar scroll state
    window.addEventListener('scroll', ()=>{
      document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 60);
    });

    // Custom cursor hover state
    document.querySelectorAll('a, button, .pillar, .tridharma-pillar, .pub-item, .haki-item, .service-card, .course-card, .tl-content, .contact-item, .achievement-item, .dropdown-trigger, .dropdown-item, .research-tab').forEach(el => {
      el.addEventListener('mouseenter', ()=> document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', ()=> document.body.classList.remove('cursor-hover'));
    });

    // Scroll reveal
    const revealObserver = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{
        if(e.isIntersecting){ e.target.classList.add('visible'); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });
    document.querySelectorAll('.pub-item, .haki-item, .service-card, .timeline-item, .metric').forEach(el=>revealObserver.observe(el));
    document.querySelectorAll('.pub-item').forEach((el,i)=> el.style.transitionDelay = (i*0.1)+'s');
    document.querySelectorAll('.haki-item').forEach((el,i)=> el.style.transitionDelay = (i*0.1)+'s');
    document.querySelectorAll('.service-card').forEach((el,i)=> el.style.transitionDelay = (i*0.1)+'s');
    document.querySelectorAll('.timeline-item').forEach((el,i)=> el.style.transitionDelay = (i*0.12)+'s');
    document.querySelectorAll('.metric').forEach((el,i)=> el.style.transitionDelay = (i*0.12)+'s');

    // Smooth scroll anchor nav
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href === '#' || href.length < 2) return;
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          const navHeight = 80;
          const targetTop = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
          window.scrollTo({ top: targetTop, behavior: 'smooth' });
        }
      });
    });

    // Research tabs (Publikasi ↔ HAKI)
    document.querySelectorAll('.research-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        const target = tab.dataset.target;
        document.querySelectorAll('.research-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.research-content').forEach(c => c.classList.remove('active'));
        tab.classList.add('active');
        document.getElementById(target).classList.add('active');
      });
    });

    // Counter animation
    const counterObserver = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{
        if(e.isIntersecting && !e.target.dataset.counted){
          e.target.dataset.counted = true;
          const target = +e.target.dataset.target;
          const suffix = e.target.dataset.suffix || '';
          const duration = 2200;
          const start = performance.now();
          function update(now){
            const elapsed = now - start;
            const progress = Math.min(elapsed/duration,1);
            const eased = 1-Math.pow(1-progress, 3);
            const val = Math.floor(eased*target);
            e.target.innerHTML = val.toString() + (suffix ? `<span class="metric-suffix">${suffix}</span>` : '');
            if(progress < 1) requestAnimationFrame(update);
            else e.target.innerHTML = target.toString() + (suffix ? `<span class="metric-suffix">${suffix}</span>` : '');
          }
          requestAnimationFrame(update);
        }
      });
    }, { threshold: 0.5 });
    document.querySelectorAll('.metric-num').forEach(el=>counterObserver.observe(el));
  }

  // ═══════════════════════════════════════════════════════════════════
  // ─── INIT: rangkai semuanya ───
  // ═══════════════════════════════════════════════════════════════════
  async function init(){
    // Loading screen + custom cursor + hero spiral mulai duluan (tidak butuh data)
    startLoadingScreen();
    startCustomCursor();
    startHeroSpiral();

    // Load semua data, lalu render
    try {
      const data = await loadData();
      renderProfile(data.profile);
      renderTheses(data.theses);
      renderPublications(data.publications);
      renderHaki(data.haki);
      renderServices(data.services);
      renderCoursesSection(data.courses);
      renderJourney(data.journey);
      renderAchievements(data.achievements);

      // Interactivity setelah konten ada
      startGlobalInteractivity();
    } catch (err) {
      console.error('❌ Gagal memuat data:', err);
      const banner = document.createElement('div');
      banner.style.cssText = 'position:fixed;bottom:20px;right:20px;background:#c93838;color:white;padding:16px 22px;border-radius:8px;font-family:sans-serif;font-size:14px;z-index:99999;max-width:380px;box-shadow:0 10px 30px rgba(0,0,0,0.2);';
      banner.innerHTML = `<strong>Gagal memuat data:</strong><br>${err.message}<br><br><small>Pastikan file dibuka via server lokal (Live Server di VS Code) atau di-host (GitHub Pages), bukan dengan double-click file HTML.</small>`;
      document.body.appendChild(banner);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
