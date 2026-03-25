/* ==========================================================
   CORTX v4 — JS
   Maximum animations, Framer-modern feel
   Inter, Lenis, GSAP + ScrollTrigger
   ========================================================== */

(function () {
  "use strict";

  const ease = "power3.out";
  const ease2 = "power4.out";

  /* ========================================
     LENIS SMOOTH SCROLL
     ======================================== */
  let lenis;
  try {
    lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    gsap.ticker.add((t) => lenis.raf(t * 1000));
  } catch(e) { console.warn("Lenis not loaded:", e); }
  gsap.ticker.lagSmoothing(0);
  gsap.registerPlugin(ScrollTrigger);

  /* ========================================
     NO LOADER — just kick off animations directly
     ======================================== */
  initAll();

  /* ========================================
     INIT — everything after loader
     ======================================== */
  function initAll() {
    animateHero();
    initScrollAnimations();
    initMarquee();
    initNav();
    initCursor();
    initPricingTabs();
    initMobileMenu();
    initSmoothLinks();
    initForm();

    // Case study page animations
    if (document.body.classList.contains("case-study")) {
      initCaseStudyAnimations();
    }
  }

  /* ========================================
     HERO
     ======================================== */
  function animateHero() {
    // Split hero h into words
    const heroH = document.getElementById("hero-h");
    if (!heroH) return;
    const text = heroH.textContent.trim();
    heroH.innerHTML = text.split(/\s+/).map((w) => `<span class="word">${w}</span>`).join(" ");

    const heroWords = heroH.querySelectorAll(".word");
    const tl = gsap.timeline({ defaults: { ease: ease2 }, delay: 0.15 });

    // Nav slides down
    tl.from("#nav", { y: -30, opacity: 0, duration: 0.8 })
    // Badge
    .to(".hero-badge", { opacity: 1, y: 0, duration: 0.7 }, "-=0.3")
    // Words cascade in
    .to(heroWords, {
      opacity: 1,
      y: 0,
      duration: 1.1,
      stagger: 0.05,
    }, "-=0.4")
    // Buttons
    .to(".hero-actions", { opacity: 1, y: 0, duration: 0.7 }, "-=0.5")
    // Scroll indicator
    .to(".hero-scroll-indicator", { opacity: 1, duration: 0.6 }, "-=0.3");
  }

  /* ========================================
     SCROLL ANIMATIONS
     ======================================== */
  function initScrollAnimations() {

    /* --- Section heading reveals --- */
    document.querySelectorAll(".reveal-text").forEach((el) => {
      const text = el.textContent.trim();
      el.innerHTML = text.split(/\s+/).map((w) => `<span class="word">${w}</span>`).join(" ");
      const wds = el.querySelectorAll(".word");
      gsap.to(wds, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        stagger: 0.05,
        ease: ease2,
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
      });
    });

    /* --- Service cards --- */
    gsap.utils.toArray(".svc-card").forEach((card, i) => {
      gsap.to(card, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        delay: i * 0.08,
        ease,
        scrollTrigger: { trigger: card, start: "top 88%", once: true },
      });
    });

    /* --- Process cards --- */
    gsap.utils.toArray(".proc-card").forEach((card, i) => {
      gsap.to(card, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        delay: i * 0.07,
        ease,
        scrollTrigger: { trigger: card, start: "top 88%", once: true },
      });
    });

    /* --- Work cards --- */
    gsap.utils.toArray(".work-card").forEach((card, i) => {
      gsap.from(card, {
        opacity: 0,
        x: 60,
        duration: 0.8,
        delay: i * 0.1,
        ease,
        scrollTrigger: { trigger: ".work-scroll", start: "top 80%", once: true },
      });
    });

    /* --- Pricing rows --- */
    gsap.utils.toArray(".price-row").forEach((row, i) => {
      gsap.to(row, {
        opacity: 1,
        x: 0,
        duration: 0.5,
        delay: i * 0.04,
        ease,
        scrollTrigger: { trigger: row, start: "top 90%", once: true },
      });
    });

    /* --- Retainer cards --- */
    gsap.utils.toArray(".ret-card").forEach((card, i) => {
      gsap.to(card, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        delay: i * 0.1,
        ease,
        scrollTrigger: { trigger: card, start: "top 88%", once: true },
      });
    });

    /* --- Why cards --- */
    gsap.utils.toArray(".why-card").forEach((card, i) => {
      gsap.to(card, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        delay: i * 0.08,
        ease,
        scrollTrigger: { trigger: card, start: "top 88%", once: true },
      });
    });

    /* --- Contact form slide in --- */
    gsap.from(".form", {
      opacity: 0,
      y: 50,
      duration: 0.9,
      ease,
      scrollTrigger: { trigger: ".form", start: "top 85%", once: true },
    });

    /* --- Always box --- */
    gsap.from(".always-box", {
      opacity: 0,
      y: 30,
      duration: 0.7,
      ease,
      scrollTrigger: { trigger: ".always-box", start: "top 90%", once: true },
    });

    /* --- Section intros --- */
    gsap.utils.toArray(".section-intro").forEach((el) => {
      gsap.from(el, {
        opacity: 0,
        y: 20,
        duration: 0.7,
        ease,
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
      });
    });

    /* --- Parallax on work images --- */
    gsap.utils.toArray(".work-img").forEach((img) => {
      gsap.to(img, {
        y: -20,
        ease: "none",
        scrollTrigger: {
          trigger: img,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });
    });
  }

  /* ========================================
     MARQUEE
     ======================================== */
  function initMarquee() {
    const track = document.querySelector(".marquee-track");
    if (!track) return;
    const first = track.querySelector("span");
    const w = first.offsetWidth;
    gsap.to(track, { x: -w, duration: 28, ease: "none", repeat: -1 });
  }

  /* ========================================
     NAV — scrolled state
     ======================================== */
  function initNav() {
    const nav = document.getElementById("nav");
    // On case study page, nav always has scrolled (glass) style
    if (document.body.classList.contains("case-study")) return;
    ScrollTrigger.create({
      start: 80,
      onUpdate(self) {
        nav.classList.toggle("scrolled", self.progress > 0);
      },
    });
  }

  /* ========================================
     CUSTOM CURSOR
     ======================================== */
  function initCursor() {
    const cur = document.getElementById("cursor");
    if (!cur || !window.matchMedia("(pointer:fine)").matches) return;

    let mx = -100, my = -100;
    let cx = -100, cy = -100;

    document.addEventListener("mousemove", (e) => {
      mx = e.clientX;
      my = e.clientY;
    });

    // Smooth follow
    gsap.ticker.add(() => {
      cx += (mx - cx) * 0.15;
      cy += (my - cy) * 0.15;
      gsap.set(cur, { x: cx, y: cy });
    });

    // Hover states
    const interactives = document.querySelectorAll("a, button, .work-card, .svc-card, .proc-card, .why-card, .ret-card, input, select, textarea");
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", () => cur.classList.add("hover"));
      el.addEventListener("mouseleave", () => cur.classList.remove("hover"));
    });
  }

  /* ========================================
     PRICING TABS
     ======================================== */
  function initPricingTabs() {
    const tabs = document.querySelectorAll(".ptab");
    const panels = document.querySelectorAll(".price-panel");
    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        tabs.forEach((t) => t.classList.remove("active"));
        panels.forEach((p) => p.classList.remove("active"));
        tab.classList.add("active");
        const panel = document.getElementById("panel-" + tab.dataset.tab);
        panel.classList.add("active");

        // Re-animate rows in the new panel
        const rows = panel.querySelectorAll(".price-row");
        rows.forEach((r, i) => {
          gsap.fromTo(r,
            { opacity: 0, x: -20 },
            { opacity: 1, x: 0, duration: 0.45, delay: i * 0.04, ease }
          );
        });
        const retCards = panel.querySelectorAll(".ret-card");
        retCards.forEach((c, i) => {
          gsap.fromTo(c,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.6, delay: i * 0.1, ease }
          );
        });

        ScrollTrigger.refresh();
      });
    });
  }

  /* ========================================
     MOBILE MENU
     ======================================== */
  function initMobileMenu() {
    const burger = document.getElementById("nav-burger");
    const menu = document.getElementById("mob-menu");
    if (!burger || !menu) return;
    let open = false;

    burger.addEventListener("click", () => {
      open = !open;
      burger.classList.toggle("open", open);
      menu.classList.toggle("open", open);
      if (open && lenis) lenis.stop(); else if (lenis) lenis.start();
    });

    menu.querySelectorAll(".mob-link").forEach((link) => {
      link.addEventListener("click", () => {
        open = false;
        burger.classList.remove("open");
        menu.classList.remove("open");
        lenis && lenis.start();
      });
    });
  }

  /* ========================================
     SMOOTH ANCHOR LINKS
     ======================================== */
  function initSmoothLinks() {
    document.querySelectorAll('a[href^="#"]').forEach((a) => {
      a.addEventListener("click", (e) => {
        const target = document.querySelector(a.getAttribute("href"));
        if (target) {
          e.preventDefault();
          if (lenis) lenis.scrollTo(target, { offset: -60 });
          else target.scrollIntoView({ behavior: "smooth" });
        }
      });
    });
  }

  /* ========================================
     FORM
     ======================================== */
  function initForm() {
    const form = document.getElementById("contact-form");
    if (!form) return;
    form.addEventListener("submit", () => {
      const btn = form.querySelector("button[type=submit]");
      btn.innerHTML = "Sending…";
      btn.style.pointerEvents = "none";
      btn.style.opacity = ".6";
    });
  }

  /* ========================================
     CASE STUDY PAGE ANIMATIONS
     ======================================== */
  function initCaseStudyAnimations() {

    /* --- HERO ENTRANCE TIMELINE --- */
    const tl = gsap.timeline({ defaults: { ease: ease2 } });

    // Nav fade in
    gsap.set("#nav", { opacity: 0, y: -30 });
    tl.to("#nav", { y: 0, opacity: 1, duration: 0.7 });

    // Back button
    const back = document.querySelector(".cs-back");
    if (back) {
      gsap.set(back, { opacity: 0, x: -20 });
      tl.to(back, { opacity: 1, x: 0, duration: 0.6 }, "-=0.2");
    }

    // Case tag (pill badge)
    const caseTag = document.querySelector(".case-tag");
    if (caseTag) {
      gsap.set(caseTag, { opacity: 0, y: 20 });
      tl.to(caseTag, { opacity: 1, y: 0, duration: 0.6 }, "-=0.3");
    }

    // Case title — word cascade
    const caseTitle = document.querySelector(".case-title");
    if (caseTitle) {
      const html = caseTitle.innerHTML;
      const parts = html.split(/<br\s*\/?>/i);
      let newHTML = "";
      parts.forEach((part, pi) => {
        const words = part.trim().split(/\s+/).filter(w => w.length > 0);
        words.forEach(w => {
          newHTML += `<span class="cs-word">${w}</span> `;
        });
        if (pi < parts.length - 1) newHTML += "<br/>";
      });
      caseTitle.innerHTML = newHTML;
      const titleWords = caseTitle.querySelectorAll(".cs-word");
      gsap.set(titleWords, { opacity: 0, y: 50, display: "inline-block" });
      tl.to(titleWords, { opacity: 1, y: 0, duration: 1, stagger: 0.05 }, "-=0.2");
    }

    // Case lead
    const caseLead = document.querySelector(".case-lead");
    if (caseLead) {
      gsap.set(caseLead, { opacity: 0, y: 20 });
      tl.to(caseLead, { opacity: 1, y: 0, duration: 0.7 }, "-=0.6");
    }

    // Meta items stagger
    const metaItems = document.querySelectorAll(".meta-item");
    if (metaItems.length) {
      gsap.set(metaItems, { opacity: 0, y: 15 });
      tl.to(metaItems, { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 }, "-=0.4");
    }

    /* --- SCROLL ANIMATIONS --- */

    // Cover video/image — clip reveal
    const coverInner = document.querySelector(".case-cover-inner");
    if (coverInner) {
      gsap.set(coverInner, { clipPath: "inset(8% 4% 8% 4%)", opacity: 0 });
      gsap.to(coverInner, {
        clipPath: "inset(0% 0% 0% 0%)",
        opacity: 1,
        duration: 1.4,
        ease: "power3.out",
        scrollTrigger: { trigger: coverInner, start: "top 92%", once: true },
      });
    }

    // Helper: animate element in on scroll
    function scrollIn(selector, fromProps, start) {
      document.querySelectorAll(selector).forEach(el => {
        gsap.set(el, fromProps);
        const toProps = { duration: 0.7, ease };
        Object.keys(fromProps).forEach(k => {
          toProps[k] = k === "opacity" ? 1 : 0;
        });
        toProps.scrollTrigger = { trigger: el, start: start || "top 88%", once: true };
        gsap.to(el, toProps);
      });
    }

    // Block tags
    scrollIn(".cb-tag, .cb-tag-dark", { opacity: 0, y: 15 });

    // Block titles — word split reveal
    document.querySelectorAll(".cb-title, .cb-title-dark").forEach(el => {
      const html = el.innerHTML;
      const parts = html.split(/<br\s*\/?>/i);
      let newHTML = "";
      parts.forEach((part, pi) => {
        part.trim().split(/\s+/).filter(w => w.length > 0).forEach(w => {
          newHTML += `<span class="cs-word">${w}</span> `;
        });
        if (pi < parts.length - 1) newHTML += "<br/>";
      });
      el.innerHTML = newHTML;
      const wds = el.querySelectorAll(".cs-word");
      gsap.set(wds, { opacity: 0, y: 35, display: "inline-block" });
      gsap.to(wds, {
        opacity: 1, y: 0, duration: 0.9, stagger: 0.05, ease: ease2,
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
      });
    });

    // Block paragraphs
    scrollIn(".cb-p, .cb-p-dark, .cb-p-muted, .cs-learned-body", { opacity: 0, y: 20 }, "top 90%");

    // Problem point cards — stagger up
    document.querySelectorAll(".cp-card").forEach((el, i) => {
      gsap.set(el, { opacity: 0, y: 40 });
      gsap.to(el, {
        opacity: 1, y: 0, duration: 0.7, delay: i * 0.1, ease,
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
      });
    });

    // Pull quote — scale up
    const pullquote = document.querySelector(".cs-pullquote");
    if (pullquote) {
      gsap.set(pullquote, { opacity: 0, scale: 0.9, y: 40 });
      gsap.to(pullquote, {
        opacity: 1, scale: 1, y: 0, duration: 1.2, ease: ease2,
        scrollTrigger: { trigger: pullquote, start: "top 82%", once: true },
      });
    }

    // Approach items with line draw
    document.querySelectorAll(".as-item").forEach((el, i) => {
      const line = el.querySelector(".as-line");
      gsap.set(el, { opacity: 0, y: 30 });
      gsap.to(el, {
        opacity: 1, y: 0, duration: 0.7, delay: i * 0.12, ease,
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
      });
      if (line) {
        gsap.set(line, { scaleX: 0, transformOrigin: "left center" });
        gsap.to(line, {
          scaleX: 1, duration: 0.9, delay: i * 0.12 + 0.3, ease: ease2,
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      }
    });

    // Feature rows — slide in from left
    document.querySelectorAll(".fr-row").forEach((el, i) => {
      gsap.set(el, { opacity: 0, x: -40 });
      gsap.to(el, {
        opacity: 1, x: 0, duration: 0.7, delay: i * 0.1, ease,
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
      });
    });

    // Outcome cards — count up numbers
    document.querySelectorAll(".oc-card").forEach((el, i) => {
      gsap.set(el, { opacity: 0, y: 40 });
      gsap.to(el, {
        opacity: 1, y: 0, duration: 0.7, delay: i * 0.12, ease,
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
      });

      const numEl = el.querySelector(".oc-number");
      if (numEl) {
        const target = parseInt(numEl.dataset.count);
        if (!isNaN(target)) {
          numEl.textContent = "0%";
          const counter = { val: 0 };
          gsap.to(counter, {
            val: target,
            duration: 2,
            ease: "power2.out",
            scrollTrigger: { trigger: numEl, start: "top 90%", once: true },
            onUpdate() {
              numEl.textContent = Math.round(counter.val) + "%";
            },
          });
        }
      }
    });

    // Outcome note
    const ocNote = document.querySelector(".oc-note");
    if (ocNote) {
      gsap.set(ocNote, { opacity: 0, y: 20 });
      gsap.to(ocNote, {
        opacity: 1, y: 0, duration: 0.7, ease,
        scrollTrigger: { trigger: ocNote, start: "top 90%", once: true },
      });
    }

    // CTA section title — word cascade
    const ctaTag = document.querySelector(".cs-cta .cb-tag");
    if (ctaTag) {
      gsap.set(ctaTag, { opacity: 0, y: 15 });
      gsap.to(ctaTag, {
        opacity: 1, y: 0, duration: 0.6, ease,
        scrollTrigger: { trigger: ctaTag, start: "top 88%", once: true },
      });
    }

    const ctaTitle = document.querySelector(".cs-cta-title");
    if (ctaTitle) {
      const html = ctaTitle.innerHTML;
      const parts = html.split(/<br\s*\/?>/i);
      let newHTML = "";
      parts.forEach((part, pi) => {
        part.trim().split(/\s+/).filter(w => w.length > 0).forEach(w => {
          newHTML += `<span class="cs-word">${w}</span> `;
        });
        if (pi < parts.length - 1) newHTML += "<br/>";
      });
      ctaTitle.innerHTML = newHTML;
      const wds = ctaTitle.querySelectorAll(".cs-word");
      gsap.set(wds, { opacity: 0, y: 40, display: "inline-block" });
      gsap.to(wds, {
        opacity: 1, y: 0, duration: 1, stagger: 0.06, ease: ease2,
        scrollTrigger: { trigger: ctaTitle, start: "top 85%", once: true },
      });
    }

    const ctaActions = document.querySelector(".cs-cta-actions");
    if (ctaActions) {
      gsap.set(ctaActions, { opacity: 0, y: 20 });
      gsap.to(ctaActions, {
        opacity: 1, y: 0, duration: 0.7, ease,
        scrollTrigger: { trigger: ctaActions, start: "top 90%", once: true },
      });
    }

    // Footer
    const footer = document.querySelector(".footer");
    if (footer) {
      gsap.set(footer, { opacity: 0 });
      gsap.to(footer, {
        opacity: 1, duration: 0.8, ease,
        scrollTrigger: { trigger: footer, start: "top 95%", once: true },
      });
    }
  }

})();
