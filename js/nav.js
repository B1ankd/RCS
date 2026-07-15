/* Shared navigation behavior: desktop mega menu (click toggles, dim overlay,
   Escape/outside-click close) and mobile full-screen menu with accordions.
   The legacy per-page nav script block was removed in favor of this file. */
(function () {
    'use strict';

    var menu = document.getElementById('rcsMenu');
    if (!menu) return;

    var items = Array.prototype.slice.call(menu.querySelectorAll('.rcs-menu-item'));
    var burger = document.getElementById('rcsBurger');
    var closeBtn = document.getElementById('rcsClose');
    var body = document.body;

    var overlay = document.createElement('div');
    overlay.className = 'rcs-overlay';
    overlay.hidden = true;
    body.appendChild(overlay);

    function isMobile() {
        return window.matchMedia('(max-width: 768px)').matches;
    }

    function closePanels(focusTarget) {
        items.forEach(function (li) {
            li.classList.remove('open');
            var t = li.querySelector('.rcs-toggle');
            if (t) t.setAttribute('aria-expanded', 'false');
        });
        overlay.hidden = true;
        body.classList.remove('rcs-menu-open');
        if (focusTarget) focusTarget.focus();
    }

    function closeMobileMenu() {
        body.classList.remove('rcs-mobile-open');
        body.style.overflow = '';
        if (burger) burger.setAttribute('aria-expanded', 'false');
        closePanels();
    }

    items.forEach(function (li) {
        var toggle = li.querySelector('.rcs-toggle');
        if (!toggle) return;
        toggle.addEventListener('click', function () {
            var wasOpen = li.classList.contains('open');
            closePanels();
            if (!wasOpen) {
                li.classList.add('open');
                toggle.setAttribute('aria-expanded', 'true');
                if (!isMobile()) {
                    overlay.hidden = false;
                    body.classList.add('rcs-menu-open');
                }
            }
        });
    });

    overlay.addEventListener('click', function () {
        closePanels();
    });

    document.addEventListener('keydown', function (e) {
        if (e.key !== 'Escape') return;
        var open = items.filter(function (li) { return li.classList.contains('open'); })[0];
        if (open) {
            closePanels(open.querySelector('.rcs-toggle'));
        } else if (body.classList.contains('rcs-mobile-open')) {
            closeMobileMenu();
        }
    });

    document.addEventListener('click', function (e) {
        if (isMobile()) return;
        if (!e.target.closest('.rcs-nav')) closePanels();
    });

    if (burger) {
        burger.addEventListener('click', function () {
            var open = body.classList.toggle('rcs-mobile-open');
            body.style.overflow = open ? 'hidden' : '';
            burger.setAttribute('aria-expanded', String(open));
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', closeMobileMenu);
    }

    menu.addEventListener('click', function (e) {
        if (isMobile() && e.target.closest('a')) closeMobileMenu();
    });

    window.addEventListener('resize', function () {
        if (!isMobile()) {
            body.classList.remove('rcs-mobile-open');
            body.style.overflow = '';
            closePanels();
        } else {
            closePanels();
        }
    });
})();
