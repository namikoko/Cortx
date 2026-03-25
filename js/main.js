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
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const btn = form.querySelector("button[type=submit]");
      const originalHTML = btn.innerHTML;

      // Loading state
      btn.innerHTML = "Sending…";
      btn.style.pointerEvents = "none";
      btn.style.opacity = ".6";

      const params = {
        name:     form.querySelector('[name="name"]').value,
        email:    form.querySelector('[name="email"]').value,
        company:  form.querySelector('[name="company"]').value || "—",
        help:     form.querySelector('[name="help"]').value,
        budget:   form.querySelector('[name="budget"]').value,
        timeline: form.querySelector('[name="timeline"]').value,
        notes:    form.querySelector('[name="notes"]').value || "—",
      };

      // Send via Web3Forms
      const formData = new FormData();
      formData.append("access_key", "58d7f244-1455-4e92-94d1-15c749e190fc");
      formData.append("subject", "New Project Inquiry – Atelier Cortx");
      formData.append("from_name", "Atelier Cortx");
      formData.append("replyto", params.email);
      formData.append("name", params.name);
      formData.append("email", params.email);
      formData.append("company", params.company);
      formData.append("service", params.help);
      formData.append("budget", params.budget);
      formData.append("timeline", params.timeline);
      formData.append("notes", params.notes);

      const confirmationHTML = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Atelier Cortx — We received your message</title>
  <style type="text/css">
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { border: 0; outline: none; text-decoration: none; display: block; }
    body { margin: 0 !important; padding: 0 !important; background-color: #f5f3ef; width: 100% !important; }
    @media only screen and (max-width: 600px) {
      .email-container { width: 100% !important; }
      .pad { padding-left: 24px !important; padding-right: 24px !important; }
      .h1 { font-size: 36px !important; line-height: 42px !important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;background-color:#f5f3ef;">
<div style="display:none;font-size:1px;color:#f5f3ef;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">We received your project brief — someone will be in touch within 24 hours.</div>
<table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color:#f5f3ef;">
<tr><td align="center" style="padding:40px 16px;">
<table class="email-container" border="0" cellpadding="0" cellspacing="0" width="580" style="background-color:#f5f3ef;">
<tr>
  <td class="pad" style="padding:36px 48px 32px;border-bottom:1px solid #e0ddd7;">
    <table border="0" cellpadding="0" cellspacing="0" width="100%">
      <tr>
        <td valign="middle">
          <a href="https://ateliercortx.com" style="text-decoration:none;">
            <img src="https://file.garden/acKYLyin6QSBKcBZ/Logos/Main%20Logo%20transparent.png" alt="Atelier Cortx" height="52" style="height:52px;width:auto;" />
          </a>
        </td>
        <td valign="middle" align="right">
          <table border="0" cellpadding="0" cellspacing="0"><tr>
            <td style="background-color:#eceae6;border:1px solid #d8d5d0;border-radius:100px;padding:7px 14px 7px 10px;">
              <table border="0" cellpadding="0" cellspacing="0"><tr>
                <td width="8" height="8" valign="middle" style="width:8px;height:8px;min-width:8px;line-height:0;font-size:0;">
                  <div style="width:8px;height:8px;background-color:#7ccc8e;border-radius:50%;font-size:0;line-height:0;"></div>
                </td>
                <td valign="middle" style="padding-left:7px;font-family:Arial,Helvetica,sans-serif;font-size:11px;color:#6a6a65;letter-spacing:0.03em;white-space:nowrap;">Message received</td>
              </tr></table>
            </td>
          </tr></table>
        </td>
      </tr>
    </table>
  </td>
</tr>
<tr>
  <td class="pad" style="padding:48px 48px 44px;border-bottom:1px solid #e0ddd7;">
    <p style="margin:0 0 26px;font-family:Arial,Helvetica,sans-serif;font-size:10px;letter-spacing:0.18em;text-transform:uppercase;color:#999993;">(New inquiry)</p>
    <table border="0" cellpadding="0" cellspacing="0" style="margin-bottom:32px;"><tr>
      <td width="44" height="44" align="center" valign="middle" style="width:44px;height:44px;border:1px solid #d5d3ce;border-radius:50%;">
        <div style="width:6px;height:6px;background-color:#999993;border-radius:50%;margin:0 auto;font-size:0;line-height:0;"></div>
      </td>
    </tr></table>
    <p class="h1" style="margin:0 0 22px;font-family:Georgia,'Times New Roman',Times,serif;font-size:50px;line-height:54px;font-weight:normal;color:#0c0c0c;">We got your<br /><span style="font-style:italic;color:#c2bfb8;">message.</span></p>
    <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:26px;color:#606060;">Thanks for reaching out! We've received your project brief and someone from our team will be in touch within 24 hours to confirm your free call.</p>
  </td>
</tr>
<tr>
  <td class="pad" style="padding:36px 48px;border-bottom:1px solid #e0ddd7;">
    <p style="margin:0 0 22px;font-family:Arial,Helvetica,sans-serif;font-size:10px;letter-spacing:0.18em;text-transform:uppercase;color:#999993;">Your submission</p>
    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:18px;"><tr>
      <td valign="top" width="50%" style="padding-right:20px;">
        <p style="margin:0 0 4px;font-family:Arial,Helvetica,sans-serif;font-size:9px;font-weight:bold;letter-spacing:0.16em;text-transform:uppercase;color:#b0ada8;">Name</p>
        <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#0c0c0c;">${params.name}</p>
      </td>
      <td valign="top" width="50%">
        <p style="margin:0 0 4px;font-family:Arial,Helvetica,sans-serif;font-size:9px;font-weight:bold;letter-spacing:0.16em;text-transform:uppercase;color:#b0ada8;">Email</p>
        <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#0c0c0c;">${params.email}</p>
      </td>
    </tr></table>
    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:18px;"><tr>
      <td valign="top" width="50%" style="padding-right:20px;">
        <p style="margin:0 0 4px;font-family:Arial,Helvetica,sans-serif;font-size:9px;font-weight:bold;letter-spacing:0.16em;text-transform:uppercase;color:#b0ada8;">Company</p>
        <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#0c0c0c;">${params.company}</p>
      </td>
      <td valign="top" width="50%">
        <p style="margin:0 0 4px;font-family:Arial,Helvetica,sans-serif;font-size:9px;font-weight:bold;letter-spacing:0.16em;text-transform:uppercase;color:#b0ada8;">Service</p>
        <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#0c0c0c;">${params.help}</p>
      </td>
    </tr></table>
    <table border="0" cellpadding="0" cellspacing="0" width="100%"><tr>
      <td valign="top" width="50%" style="padding-right:20px;">
        <p style="margin:0 0 4px;font-family:Arial,Helvetica,sans-serif;font-size:9px;font-weight:bold;letter-spacing:0.16em;text-transform:uppercase;color:#b0ada8;">Budget</p>
        <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#0c0c0c;">${params.budget}</p>
      </td>
      <td valign="top" width="50%">
        <p style="margin:0 0 4px;font-family:Arial,Helvetica,sans-serif;font-size:9px;font-weight:bold;letter-spacing:0.16em;text-transform:uppercase;color:#b0ada8;">Timeline</p>
        <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#0c0c0c;">${params.timeline}</p>
      </td>
    </tr></table>
  </td>
</tr>
<tr>
  <td class="pad" style="padding:36px 48px;border-bottom:1px solid #e0ddd7;">
    <p style="margin:0 0 28px;font-family:Arial,Helvetica,sans-serif;font-size:10px;letter-spacing:0.18em;text-transform:uppercase;color:#999993;">What happens next</p>
    <table border="0" cellpadding="0" cellspacing="0" width="100%"><tr>
      <td width="44" valign="top" style="width:44px;padding-right:16px;">
        <table border="0" cellpadding="0" cellspacing="0" width="28">
          <tr><td width="28" height="28" align="center" valign="middle" style="width:28px;height:28px;background-color:#0c0c0c;border-radius:50%;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#f5f3ef;font-weight:bold;text-align:center;line-height:28px;">&#10003;</td></tr>
          <tr><td align="center" height="30" style="height:30px;padding-top:2px;"><table border="0" cellpadding="0" cellspacing="0" align="center" width="1"><tr><td width="1" height="26" bgcolor="#d5d3ce" style="width:1px;height:26px;font-size:0;line-height:0;"></td></tr></table></td></tr>
        </table>
      </td>
      <td valign="top" style="padding-bottom:24px;">
        <p style="margin:0 0 4px;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:bold;color:#0c0c0c;">Brief received</p>
        <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#8a8a85;line-height:1.55;">We have everything we need from you.</p>
      </td>
    </tr></table>
    <table border="0" cellpadding="0" cellspacing="0" width="100%"><tr>
      <td width="44" valign="top" style="width:44px;padding-right:16px;">
        <table border="0" cellpadding="0" cellspacing="0" width="28">
          <tr><td width="28" height="28" align="center" valign="middle" style="width:28px;height:28px;border:1px solid #d5d3ce;border-radius:50%;background-color:#eeece8;font-family:Arial,Helvetica,sans-serif;font-size:10px;color:#aaa9a4;text-align:center;line-height:28px;">02</td></tr>
          <tr><td align="center" height="30" style="height:30px;padding-top:2px;"><table border="0" cellpadding="0" cellspacing="0" align="center" width="1"><tr><td width="1" height="26" bgcolor="#d5d3ce" style="width:1px;height:26px;font-size:0;line-height:0;"></td></tr></table></td></tr>
        </table>
      </td>
      <td valign="top" style="padding-bottom:24px;">
        <p style="margin:0 0 4px;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:normal;color:#aaa9a4;">Call confirmation</p>
        <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#8a8a85;line-height:1.55;">Expect an email within 24h with a calendar link to lock in your free 30-min call.</p>
      </td>
    </tr></table>
    <table border="0" cellpadding="0" cellspacing="0" width="100%"><tr>
      <td width="44" valign="top" style="width:44px;padding-right:16px;">
        <table border="0" cellpadding="0" cellspacing="0" width="28">
          <tr><td width="28" height="28" align="center" valign="middle" style="width:28px;height:28px;border:1px solid #d5d3ce;border-radius:50%;background-color:#eeece8;font-family:Arial,Helvetica,sans-serif;font-size:10px;color:#aaa9a4;text-align:center;line-height:28px;">03</td></tr>
          <tr><td align="center" height="30" style="height:30px;padding-top:2px;"><table border="0" cellpadding="0" cellspacing="0" align="center" width="1"><tr><td width="1" height="26" bgcolor="#d5d3ce" style="width:1px;height:26px;font-size:0;line-height:0;"></td></tr></table></td></tr>
        </table>
      </td>
      <td valign="top" style="padding-bottom:24px;">
        <p style="margin:0 0 4px;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:normal;color:#aaa9a4;">Strategy session</p>
        <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#8a8a85;line-height:1.55;">No pitch, no commitment. We'll map out exactly what your project needs.</p>
      </td>
    </tr></table>
    <table border="0" cellpadding="0" cellspacing="0" width="100%"><tr>
      <td width="44" valign="top" style="width:44px;padding-right:16px;">
        <table border="0" cellpadding="0" cellspacing="0" width="28">
          <tr><td width="28" height="28" align="center" valign="middle" style="width:28px;height:28px;border:1px solid #d5d3ce;border-radius:50%;background-color:#eeece8;font-family:Arial,Helvetica,sans-serif;font-size:10px;color:#aaa9a4;text-align:center;line-height:28px;">04</td></tr>
        </table>
      </td>
      <td valign="top">
        <p style="margin:0 0 4px;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:normal;color:#aaa9a4;">Proposal &amp; kickoff</p>
        <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#8a8a85;line-height:1.55;">If it's a fit, we'll send a tailored proposal and get to work.</p>
      </td>
    </tr></table>
  </td>
</tr>
<tr>
  <td class="pad" style="padding:36px 48px;border-bottom:1px solid #e0ddd7;">
    <p style="margin:0 0 26px;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:24px;color:#737370;">In the meantime, have a look at some of our recent work, or reach us directly if anything is urgent.</p>
    <table border="0" cellpadding="0" cellspacing="0"><tr>
      <td align="center" bgcolor="#0c0c0c" style="border-radius:100px;">
        <a href="https://ateliercortx.com/work" style="display:inline-block;padding:15px 32px;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#f5f3ef;text-decoration:none;font-weight:bold;white-space:nowrap;">See our work &#8599;</a>
      </td>
    </tr></table>
  </td>
</tr>
<tr>
  <td class="pad" style="padding:32px 48px 48px;">
    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:20px;"><tr>
      <td valign="middle"><span style="font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:bold;letter-spacing:0.12em;text-transform:uppercase;color:#c0beba;">Atelier Cortx</span></td>
      <td valign="middle" align="right">
        <a href="https://ateliercortx.com" style="font-family:Arial,Helvetica,sans-serif;font-size:11px;color:#aaa9a4;text-decoration:none;">Website</a>
        <span style="font-family:Arial,Helvetica,sans-serif;font-size:11px;color:#d5d3ce;">&nbsp;&nbsp;|&nbsp;&nbsp;</span>
        <a href="https://ateliercortx.com/work" style="font-family:Arial,Helvetica,sans-serif;font-size:11px;color:#aaa9a4;text-decoration:none;">Work</a>
        <span style="font-family:Arial,Helvetica,sans-serif;font-size:11px;color:#d5d3ce;">&nbsp;&nbsp;|&nbsp;&nbsp;</span>
        <a href="mailto:design@ateliercortx.com" style="font-family:Arial,Helvetica,sans-serif;font-size:11px;color:#aaa9a4;text-decoration:none;">Email</a>
      </td>
    </tr></table>
    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:20px;"><tr><td height="1" bgcolor="#e0ddd7" style="height:1px;font-size:0;line-height:0;"></td></tr></table>
    <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:11px;color:#b5b2ac;line-height:1.7;">
      You're receiving this because you submitted a project inquiry at ateliercortx.com.<br />
      Questions? Reply directly or write to <a href="mailto:design@ateliercortx.com" style="color:#8a8a85;text-decoration:none;">design@ateliercortx.com</a>
    </p>
  </td>
</tr>
</table></td></tr></table>
</body></html>`;

      // Send notification to you via Web3Forms
      fetch("https://api.web3forms.com/submit", { method: "POST", body: formData })
        .then(res => res.json())
        .then(data => { if (!data.success) throw new Error(data.message); })
        .catch(err => console.error("Web3Forms error:", err));

      // Send custom HTML confirmation to user via Resend
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer re_DDVtAWhc_81q9aHmU5du9G6jNNW8tfmTH"
        },
        body: JSON.stringify({
          from: "Atelier Cortx <onboarding@resend.dev>",
          to: params.email,
          bcc: "design@ateliercortx.com",
          subject: "We've received your message — Atelier Cortx",
          html: confirmationHTML
        })
      })
        .then(res => res.json())
        .then(data => {
          if (data.id) {
            btn.innerHTML = "Sent ✓";
            btn.style.opacity = "1";
            form.reset();
          } else {
            throw new Error(data.message);
          }
        })
        .catch((err) => {
          console.error("Resend error:", err);
          btn.innerHTML = originalHTML;
          btn.style.pointerEvents = "auto";
          btn.style.opacity = "1";
          alert("Something went wrong. Please email us directly at design@ateliercortx.com");
        });
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
