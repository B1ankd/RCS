(function () {
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Component styles (menu overlay, disc-detainer background, case-study drawer)
  var css = document.createElement('style');
  css.textContent = [
    '#menuOverlay{opacity:0;transition:opacity .35s ease;}',
    '#menuOverlay.open{opacity:1;}',
    '#menuOverlay .menu-panel{transform:translateY(-10px);transition:transform .45s cubic-bezier(.2,.7,.2,1);}',
    '#menuOverlay.open .menu-panel{transform:none;}',
    '.menu-link{font-family:Arial,"Helvetica Neue",Helvetica,sans-serif;font-weight:700;color:#fff;font-size:clamp(2rem,6vw,3.75rem);line-height:1.06;letter-spacing:-.02em;padding:.15rem 0;transition:color .2s ease,transform .3s cubic-bezier(.2,.7,.2,1);width:max-content;max-width:100%;}',
    '.menu-link:hover{color:#c1121f;transform:translateX(8px);}',
    '.menu-sublink{color:#94a3b8;font-size:1.05rem;padding:.4rem 0;transition:color .2s ease,transform .3s ease;width:max-content;}',
    '.menu-sublink:hover{color:#fff;transform:translateX(8px);}',
    '.mech-bg{position:fixed;inset:0;z-index:1;pointer-events:none;display:flex;align-items:center;justify-content:center;overflow:hidden;opacity:.12;mix-blend-mode:screen;}',
    '.mech-inner{position:relative;width:min(84vmin,680px);height:min(84vmin,680px);will-change:transform;transition:transform .25s cubic-bezier(.2,.7,.2,1);}',
    '.mech-inner svg{position:absolute;inset:0;width:100%;height:100%;overflow:visible;}',
    '.mech-disc{transition:transform .25s linear;}',
    '.mech-logo{position:absolute;top:50%;left:50%;width:9%;transform:translate(-50%,-50%);opacity:.55;transition:transform .25s linear;}',
    '@media (max-width:768px){.mech-bg{opacity:.08;}}',
    '#csDrawer{position:fixed;inset:0;z-index:70;}',
    '#csDrawer .cs-backdrop{position:absolute;inset:0;background:rgba(3,4,6,.72);opacity:0;transition:opacity .35s ease;backdrop-filter:blur(2px);}',
    '#csDrawer.open .cs-backdrop{opacity:1;}',
    '#csDrawer .cs-panel{position:absolute;top:0;right:0;height:100%;width:min(480px,92vw);background:#111318;border-left:1px solid rgba(255,255,255,.10);box-shadow:-30px 0 60px -30px rgba(0,0,0,.8);transform:translateX(100%);transition:transform .4s cubic-bezier(.2,.7,.2,1);overflow-y:auto;padding:2rem 1.75rem 2.5rem;}',
    '#csDrawer.open .cs-panel{transform:none;}',
    '.cs-card{cursor:pointer;}',
    reduce ? '.mech-disc,.mech-logo,.mech-inner{transition:none;} #menuOverlay,#menuOverlay .menu-panel,#csDrawer .cs-backdrop,#csDrawer .cs-panel{transition:none;}' : ''
  ].join('');
  document.head.appendChild(css);

  // Disc-detainer mechanism background: concentric discs with gate cuts + index ticks,
  // built around the actual logo as the spindle. Rotates and expands with scroll.
  var discs = [], mechInner = null, mechLogo = null;
  var DISCS = [
    { r: 66, dash: '3 13', w: 3, speed: 1.00 },
    { r: 100, dash: '2 20', w: 2.5, speed: -0.72 },
    { r: 134, dash: '5 17', w: 3, speed: 0.52 },
    { r: 168, dash: '2 26', w: 2.5, speed: -0.36 },
    { r: 192, dash: '2 12', w: 1.5, speed: 0.16 }
  ];
  var svg = '<svg viewBox="0 0 400 400" fill="none" stroke="#c1121f" stroke-linecap="round">';
  DISCS.forEach(function (d) {
    svg += '<g class="mech-disc" data-speed="' + d.speed + '">';
    svg += '<circle cx="200" cy="200" r="' + d.r + '" stroke-width="' + d.w + '" stroke-dasharray="' + d.dash + '"/>';
    // gate cut: a bold radial notch at the disc rim (the "true gate")
    svg += '<line x1="200" y1="' + (200 - d.r - 9) + '" x2="200" y2="' + (200 - d.r + 9) + '" stroke-width="' + (d.w + 1.5) + '"/>';
    svg += '</g>';
  });
  // fixed sighting crosshair + spindle
  svg += '<g stroke="#c1121f" stroke-width="1.5" opacity="0.9">' +
    '<circle cx="200" cy="200" r="30"/>' +
    '<line x1="200" y1="12" x2="200" y2="40"/><line x1="200" y1="360" x2="200" y2="388"/>' +
    '<line x1="12" y1="200" x2="40" y2="200"/><line x1="360" y1="200" x2="388" y2="200"/>' +
    '</g>';
  svg += '</svg>';

  var mech = document.createElement('div');
  mech.className = 'mech-bg';
  mech.setAttribute('aria-hidden', 'true');
  var logoSrc = '';
  var navImg = document.querySelector('#nav img');
  if (navImg) logoSrc = navImg.getAttribute('src');
  mech.innerHTML = '<div class="mech-inner">' + svg +
    (logoSrc ? '<img class="mech-logo" src="' + logoSrc + '" alt="">' : '') + '</div>';
  document.body.appendChild(mech);
  mechInner = mech.querySelector('.mech-inner');
  mechLogo = mech.querySelector('.mech-logo');
  discs = Array.prototype.slice.call(mech.querySelectorAll('.mech-disc'));

  function applyMech(p) {
    if (reduce) return;
    for (var i = 0; i < discs.length; i++) {
      var sp = parseFloat(discs[i].getAttribute('data-speed')) || 0;
      discs[i].setAttribute('transform', 'rotate(' + (sp * 360 * p).toFixed(2) + ' 200 200)');
    }
    if (mechInner) mechInner.style.transform = 'scale(' + (0.8 + 0.4 * p).toFixed(3) + ')';
    if (mechLogo) mechLogo.style.transform = 'translate(-50%,-50%) rotate(' + (-60 * p).toFixed(2) + 'deg)';
  }

  // Sticky nav background + scroll progress + mechanism
  var nav = document.getElementById('nav');
  var progress = document.getElementById('progress');
  function onScroll() {
    var st = window.scrollY;
    if (nav) { var s = st > 24; nav.classList.toggle('bg-ink/90', s); nav.classList.toggle('backdrop-blur', s); }
    var h = document.documentElement.scrollHeight - window.innerHeight;
    var p = h > 0 ? Math.min(1, Math.max(0, st / h)) : 0;
    if (progress) progress.style.width = (p * 100) + '%';
    applyMech(p);
  }

  // Menu overlay
  var menuBtn = document.getElementById('menuBtn');
  var menu = document.getElementById('menuOverlay');
  var menuClose = document.getElementById('menuClose');
  function openMenu() { if (!menu) return; menu.classList.remove('hidden'); requestAnimationFrame(function () { menu.classList.add('open'); }); document.body.style.overflow = 'hidden'; if (menuBtn) menuBtn.setAttribute('aria-expanded', 'true'); }
  function closeMenu() { if (!menu) return; menu.classList.remove('open'); document.body.style.overflow = ''; if (menuBtn) menuBtn.setAttribute('aria-expanded', 'false'); setTimeout(function () { menu.classList.add('hidden'); }, 400); }
  if (menuBtn) menuBtn.addEventListener('click', openMenu);
  if (menuClose) menuClose.addEventListener('click', closeMenu);
  if (menu) menu.addEventListener('click', function (e) { if (e.target === menu || e.target.classList.contains('menu-panel')) closeMenu(); });

  // Case-study drawer
  var drawer = null, drawerCat, drawerTitle, drawerContent, drawerLink;
  var cards = document.querySelectorAll('.cs-card');
  function closeDrawer() { if (!drawer) return; drawer.classList.remove('open'); document.body.style.overflow = ''; setTimeout(function () { drawer.classList.add('hidden'); }, 400); }
  if (cards.length) {
    drawer = document.createElement('div');
    drawer.id = 'csDrawer';
    drawer.className = 'hidden';
    drawer.innerHTML =
      '<div class="cs-backdrop"></div>' +
      '<aside class="cs-panel" role="dialog" aria-modal="true" aria-labelledby="csTitle">' +
      '<button class="cs-close text-slate-400 hover:text-white float-right" aria-label="Close"><svg width="26" height="26" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg></button>' +
      '<p class="cs-cat eyebrow text-[10px] text-crimson mb-3" style="font-family:Arial,sans-serif;letter-spacing:.28em;text-transform:uppercase;"></p>' +
      '<h3 id="csTitle" class="font-display font-bold text-white text-2xl tracking-tight leading-tight"></h3>' +
      '<div class="cs-content mt-5 text-slate-300 leading-relaxed space-y-4"></div>' +
      '<a class="cs-link btn mt-8 inline-flex items-center gap-2 rounded-sm bg-crimson px-6 py-3.5 text-white font-semibold hover:bg-crimson-deep"></a>' +
      '</aside>';
    document.body.appendChild(drawer);
    drawerCat = drawer.querySelector('.cs-cat');
    drawerTitle = drawer.querySelector('#csTitle');
    drawerContent = drawer.querySelector('.cs-content');
    drawerLink = drawer.querySelector('.cs-link');
    drawer.querySelector('.cs-backdrop').addEventListener('click', closeDrawer);
    drawer.querySelector('.cs-close').addEventListener('click', closeDrawer);

    var openFrom = function (card) {
      drawerCat.textContent = card.getAttribute('data-cs-cat') || '';
      drawerTitle.textContent = card.getAttribute('data-cs-title') || '';
      var body = card.querySelector('.cs-body');
      drawerContent.innerHTML = body ? body.innerHTML : '';
      drawerLink.setAttribute('href', card.getAttribute('data-cs-link') || '#');
      drawerLink.innerHTML = (card.getAttribute('data-cs-linklabel') || 'Learn more') +
        ' <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
      drawer.classList.remove('hidden');
      requestAnimationFrame(function () { drawer.classList.add('open'); });
      document.body.style.overflow = 'hidden';
    };
    cards.forEach(function (card) {
      card.addEventListener('click', function () { openFrom(card); });
      card.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openFrom(card); } });
    });
  }

  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { closeMenu(); closeDrawer(); } });

  // Scroll reveals
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('in'); });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();
  var yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();
})();
