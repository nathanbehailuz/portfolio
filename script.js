/* Portfolio motion: split text, scroll reveal, timeline, accordions, filters. */
(function () {
    'use strict';

    var root = document.documentElement;
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    function $(sel, ctx) { return (ctx || document).querySelector(sel); }
    function $$(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }

    /* ---------------------------------------------------------------
       Split text into words and letters (letters rise from a mask)
       --------------------------------------------------------------- */
    function splitText(host) {
        var label = host.getAttribute('aria-label') || host.textContent.trim();
        host.setAttribute('aria-label', label);
        var n = 0;

        (function walk(node) {
            Array.prototype.slice.call(node.childNodes).forEach(function (child) {
                if (child.nodeType === 3) {
                    var frag = document.createDocumentFragment();
                    child.textContent.split(/(\s+)/).forEach(function (token) {
                        if (!token) return;
                        if (/^\s+$/.test(token)) {
                            frag.appendChild(document.createTextNode(' '));
                            return;
                        }
                        var word = document.createElement('span');
                        word.className = 'w';
                        word.setAttribute('aria-hidden', 'true');
                        Array.prototype.forEach.call(token, function (letter) {
                            var ch = document.createElement('span');
                            ch.className = 'ch';
                            ch.style.setProperty('--i', n++);
                            ch.textContent = letter;
                            word.appendChild(ch);
                        });
                        frag.appendChild(word);
                    });
                    child.replaceWith(frag);
                } else if (child.nodeType === 1 && child.tagName !== 'BR') {
                    walk(child);
                }
            });
        })(host);

        host.style.setProperty('--base', (host.getAttribute('data-delay') || 0) + 'ms');
    }

    $$('[data-split]').forEach(splitText);

    /* Stagger delay for grouped reveals */
    $$('[data-stagger]').forEach(function (group) {
        $$('[data-reveal]', group).forEach(function (el, i) {
            el.style.setProperty('--i', i);
        });
    });

    /* Skills marquee: duplicate the set for a seamless loop */
    var track = $('.track');
    if (track && track.firstElementChild) {
        var clone = track.firstElementChild.cloneNode(true);
        clone.setAttribute('aria-hidden', 'true');
        track.appendChild(clone);
    }

    /* ---------------------------------------------------------------
       Scroll reveal
       --------------------------------------------------------------- */
    var io = null;
    if ('IntersectionObserver' in window) {
        io = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                var el = entry.target;
                el.classList.add(el.hasAttribute('data-split') ? 'split-in' : 'in');
                io.unobserve(el);
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    }

    function observeAll() {
        $$('[data-reveal], [data-split]').forEach(function (el) {
            if (io) io.observe(el);
            else el.classList.add(el.hasAttribute('data-split') ? 'split-in' : 'in');
        });
    }

    /* Replay the reveal inside a set of elements (used after filtering) */
    function replay(elements) {
        var targets = [];
        elements.forEach(function (root) {
            if (root.hasAttribute('data-reveal')) targets.push(root);
            $$('[data-reveal]', root).forEach(function (el) { targets.push(el); });
        });
        targets.forEach(function (el) { el.classList.remove('in'); });
        void document.body.offsetWidth;
        targets.forEach(function (el, i) { el.style.setProperty('--i', i); });
        requestAnimationFrame(function () {
            targets.forEach(function (el) { el.classList.add('in'); });
        });
    }

    /* ---------------------------------------------------------------
       Scroll progress + timelines
       --------------------------------------------------------------- */
    var progress = $('.progress');
    var timelines = $$('.timeline');

    function updateTimelines() {
        var vh = window.innerHeight;
        timelines.forEach(function (tl) {
            if (!tl.getClientRects().length) return;
            var rect = tl.getBoundingClientRect();
            var fillH = Math.max(0, Math.min(rect.height, vh * 0.62 - rect.top));
            var fill = $('.tl-fill', tl);
            if (fill) fill.style.height = fillH + 'px';
            $$('.dot', tl).forEach(function (dot) {
                var d = dot.getBoundingClientRect();
                dot.classList.toggle('reached', d.top + 4 - rect.top <= fillH);
            });
        });
    }

    function updateProgress() {
        if (!progress) return;
        var max = document.documentElement.scrollHeight - window.innerHeight;
        progress.style.setProperty('--p', max > 0 ? Math.min(1, window.scrollY / max) : 0);
    }

    var ticking = false;
    function onScroll() {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(function () {
            updateProgress();
            updateTimelines();
            ticking = false;
        });
    }

    /* Keep timelines in sync while accordions animate their height */
    function followLayout(ms) {
        var end = performance.now() + ms;
        (function frame() {
            updateTimelines();
            if (performance.now() < end) requestAnimationFrame(frame);
        })();
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    /* ---------------------------------------------------------------
       Accordions: hover (with intent delay) or click/tap/keyboard to pin
       --------------------------------------------------------------- */
    function setOpen(acc, open) {
        var head = $('.acc-head', acc);
        var panel = $('.acc-panel', acc);
        acc.classList.toggle('is-open', open);
        head.setAttribute('aria-expanded', open ? 'true' : 'false');
        panel.inert = !open;
        followLayout(900);
    }

    var accs = $$('.acc');
    accs.forEach(function (acc) {
        var head = $('.acc-head', acc);
        var panel = $('.acc-panel', acc);
        var timer = null;
        if (!head || !panel) return;

        panel.inert = true;

        head.addEventListener('click', function () {
            var pinned = acc.hasAttribute('data-pinned');
            if (pinned) {
                acc.removeAttribute('data-pinned');
                setOpen(acc, false);
            } else {
                acc.setAttribute('data-pinned', '');
                setOpen(acc, true);
            }
        });

        if (canHover) {
            acc.addEventListener('mouseenter', function () {
                clearTimeout(timer);
                timer = setTimeout(function () { setOpen(acc, true); }, 140);
            });
            acc.addEventListener('mouseleave', function () {
                clearTimeout(timer);
                timer = setTimeout(function () {
                    if (acc.hasAttribute('data-pinned')) return;
                    if (acc.contains(document.activeElement) && document.activeElement !== head) return;
                    setOpen(acc, false);
                }, 160);
            });
        }
    });

    /* Deep links such as projects.html#autovert */
    function openFromHash() {
        var id = decodeURIComponent(location.hash.slice(1));
        if (!id) return;
        var target = document.getElementById(id);
        if (!target || !target.classList.contains('acc')) return;
        target.hidden = false;
        target.classList.add('in');
        target.setAttribute('data-pinned', '');
        setOpen(target, true);
        target.classList.remove('flash');
        void target.offsetWidth;
        target.classList.add('flash');
        setTimeout(function () {
            target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
        }, 350);
    }
    window.addEventListener('hashchange', openFromHash);

    /* ---------------------------------------------------------------
       Filters
       --------------------------------------------------------------- */
    $$('[data-filters]').forEach(function (bar) {
        var items = $$('[data-tags]');
        bar.addEventListener('click', function (event) {
            var btn = event.target.closest('button[data-filter]');
            if (!btn) return;
            var filter = btn.getAttribute('data-filter');

            $$('button[data-filter]', bar).forEach(function (b) {
                b.setAttribute('aria-pressed', b === btn ? 'true' : 'false');
            });

            var shown = [];
            items.forEach(function (item) {
                var tags = item.getAttribute('data-tags').split(/\s+/);
                var show = filter === 'all' || tags.indexOf(filter) !== -1;
                item.hidden = !show;
                if (show) shown.push(item);
            });

            replay(shown);
            updateTimelines();
            setTimeout(updateTimelines, 60);
        });
    });

    /* ---------------------------------------------------------------
       Cursor glow (home only)
       --------------------------------------------------------------- */
    var glow = $('.glow');
    if (glow && canHover && !reduce) {
        var tx = window.innerWidth * 0.6, ty = window.innerHeight * 0.35;
        var gx = tx, gy = ty;
        window.addEventListener('pointermove', function (e) {
            tx = e.clientX;
            ty = e.clientY;
            glow.classList.add('on');
        }, { passive: true });
        (function loop() {
            gx += (tx - gx) * 0.08;
            gy += (ty - gy) * 0.08;
            glow.style.transform = 'translate3d(' + gx.toFixed(1) + 'px,' + gy.toFixed(1) + 'px,0)';
            requestAnimationFrame(loop);
        })();
    }

    /* ---------------------------------------------------------------
       Start once fonts are ready so letters animate on final metrics
       --------------------------------------------------------------- */
    var fontsReady = (document.fonts && document.fonts.ready) ? document.fonts.ready : Promise.resolve();
    var timeout = new Promise(function (resolve) { setTimeout(resolve, 1200); });

    Promise.race([fontsReady, timeout]).then(function () {
        requestAnimationFrame(function () {
            root.classList.add('is-loaded');
            observeAll();
            updateProgress();
            updateTimelines();
            openFromHash();
        });
    });
})();
