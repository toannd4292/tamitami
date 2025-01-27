/*
* @license
* Broadcast Theme (c) Invisible Themes
*
* The contents of this file should not be modified.
* add any minor changes to assets/custom.js
*
*/
(function (scrollLock, themeAddresses, themeCurrency, Rellax, Flickity, FlickityFade, themeImages) {
  "use strict";
  function floatLabels(e) {
    e.querySelectorAll(".form-field").forEach((e) => {
      const t = e.querySelector("label"),
        s = e.querySelector("input, textarea");
      t &&
        s &&
        (s.addEventListener("keyup", (e) => {
          "" !== e.target.value ? t.classList.add("label--float") : t.classList.remove("label--float");
        }),
        s.value && s.value.length && t.classList.add("label--float"));
    });
  }
  (window.theme = window.theme || {}),
    (window.theme.subscribers = {}),
    (window.theme.sizes = { mobile: 480, small: 750, large: 990, widescreen: 1400 }),
    (window.theme.keyboardKeys = { TAB: "Tab", ENTER: "Enter", ESCAPE: "Escape", SPACE: "Space", LEFTARROW: "ArrowLeft", RIGHTARROW: "ArrowRight" }),
    (window.theme.focusable = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
  let screenOrientation = getScreenOrientation();
  function readHeights() {
    const e = {};
    return (
      (e.windowHeight = Math.min(window.screen.height, window.innerHeight)),
      (e.announcementHeight = getHeight('[data-section-type*="announcement"] [data-bar-top]')),
      (e.footerHeight = getHeight('[data-section-type*="footer"]')),
      (e.menuHeight = getHeight("[data-header-height]")),
      (e.headerHeight = e.menuHeight + e.announcementHeight),
      (e.collectionNavHeight = getHeight("[data-collection-nav]")),
      (e.logoHeight = getFooterLogoWithPadding()),
      e
    );
  }
  function setVarsOnResize() {
    document.addEventListener("theme:resize", resizeVars), setVars();
  }
  function setVars() {
    const { windowHeight: e, announcementHeight: t, headerHeight: s, logoHeight: i, menuHeight: o, footerHeight: r, collectionNavHeight: a } = readHeights();
    document.documentElement.style.setProperty("--full-screen", `${e}px`),
      document.documentElement.style.setProperty("--three-quarters", e * (3 / 4) + "px"),
      document.documentElement.style.setProperty("--two-thirds", e * (2 / 3) + "px"),
      document.documentElement.style.setProperty("--one-half", e / 2 + "px"),
      document.documentElement.style.setProperty("--one-third", e / 3 + "px"),
      document.documentElement.style.setProperty("--menu-height", `${o}px`),
      document.documentElement.style.setProperty("--announcement-height", `${t}px`),
      document.documentElement.style.setProperty("--header-height", `${s}px`),
      document.documentElement.style.setProperty("--collection-nav-height", `${a}px`),
      document.documentElement.style.setProperty("--footer-height", `${r}px`),
      document.documentElement.style.setProperty("--content-full", e - s - i / 2 + "px"),
      document.documentElement.style.setProperty("--content-min", e - s - r + "px"),
      document.querySelector("[data-tracking-consent].popup-cookies--bottom") && document.documentElement.style.setProperty("--cookie-bar-height", `${document.querySelector("[data-tracking-consent].popup-cookies--bottom").offsetHeight}px`),
      document.documentElement.style.setProperty("--scrollbar-width", `${getScrollbarWidth()}px`);
  }
  function resizeVars() {
    const { windowHeight: e, announcementHeight: t, headerHeight: s, logoHeight: i, menuHeight: o, footerHeight: r, collectionNavHeight: a } = readHeights(),
      n = getScreenOrientation();
    n !== screenOrientation &&
      (document.documentElement.style.setProperty("--full-screen", `${e}px`),
      document.documentElement.style.setProperty("--three-quarters", e * (3 / 4) + "px"),
      document.documentElement.style.setProperty("--two-thirds", e * (2 / 3) + "px"),
      document.documentElement.style.setProperty("--one-half", e / 2 + "px"),
      document.documentElement.style.setProperty("--one-third", e / 3 + "px"),
      (screenOrientation = n)),
      document.documentElement.style.setProperty("--menu-height", `${o}px`),
      document.documentElement.style.setProperty("--announcement-height", `${t}px`),
      document.documentElement.style.setProperty("--header-height", `${s}px`),
      document.documentElement.style.setProperty("--collection-nav-height", `${a}px`),
      document.documentElement.style.setProperty("--footer-height", `${r}px`),
      document.documentElement.style.setProperty("--content-full", e - s - i / 2 + "px"),
      document.documentElement.style.setProperty("--content-min", e - s - r + "px"),
      document.querySelector("[data-tracking-consent].popup-cookies--bottom") && document.documentElement.style.setProperty("--cookie-bar-height", `${document.querySelector("[data-tracking-consent].popup-cookies--bottom").offsetHeight}px`);
  }
  function getScreenOrientation() {
    return window.matchMedia("(orientation: portrait)").matches ? "portrait" : window.matchMedia("(orientation: landscape)").matches ? "landscape" : void 0;
  }
  function getHeight(e) {
    const t = document.querySelector(e);
    return t ? t.offsetHeight : 0;
  }
  function getFooterLogoWithPadding() {
    const e = getHeight("[data-footer-logo]");
    return e > 0 ? e + 20 : 0;
  }
  function getScrollbarWidth() {
    const e = document.createElement("div");
    (e.style.visibility = "hidden"), (e.style.overflow = "scroll"), (e.style.msOverflowStyle = "scrollbar"), document.body.appendChild(e);
    const t = document.createElement("div");
    e.appendChild(t);
    const s = e.offsetWidth - t.offsetWidth;
    return e.parentNode.removeChild(e), s;
  }
  window.initialWindowHeight = Math.min(window.screen.height, window.innerHeight);
  let isCompleted = !1,
    docComplete = !1;
  function preloadImages() {
    (document.onreadystatechange = () => {
      "complete" === document.readyState && ((docComplete = !0), initImagesPreloader());
    }),
      requestIdleCallback(initImagesPreloader);
  }
  function initImagesPreloader() {
    setTimeout(() => {
      if (isCompleted) return;
      if (!docComplete) return void initImagesPreloader();
      const e = document.querySelectorAll('img[loading="lazy"]');
      e.length &&
        e.forEach((e) => {
          e.setAttribute("loading", "eager");
        }),
        (isCompleted = !0);
    }, 3e3);
  }
  function debounce(e, t) {
    let s;
    return function () {
      if (e) {
        const i = () => e.apply(this, arguments);
        clearTimeout(s), (s = setTimeout(i, t));
      }
    };
  }
  function getWindowWidth() {
    return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  }
  function getWindowHeight() {
    return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  }
  function isDesktop() {
    return getWindowWidth() >= window.theme.sizes.small;
  }
  function isMobile() {
    return getWindowWidth() < window.theme.sizes.small;
  }
  let lastWindowWidth = getWindowWidth(),
    lastWindowHeight = getWindowHeight();
  function dispatch$1() {
    document.dispatchEvent(new CustomEvent("theme:resize", { bubbles: !0 })),
      lastWindowWidth !== getWindowWidth() && (document.dispatchEvent(new CustomEvent("theme:resize:width", { bubbles: !0 })), (lastWindowWidth = getWindowWidth())),
      lastWindowHeight !== getWindowHeight() && (document.dispatchEvent(new CustomEvent("theme:resize:height", { bubbles: !0 })), (lastWindowHeight = getWindowHeight()));
  }
  function resizeListener() {
    window.addEventListener(
      "resize",
      debounce(function () {
        dispatch$1();
      }, 50)
    );
  }
  let prev = window.pageYOffset,
    up = null,
    down = null,
    wasUp = null,
    wasDown = null,
    scrollLockTimer = 0;
  function dispatch() {
    const e = window.pageYOffset;
    e > prev ? ((down = !0), (up = !1)) : e < prev ? ((down = !1), (up = !0)) : ((up = null), (down = null)),
      (prev = e),
      document.dispatchEvent(new CustomEvent("theme:scroll", { detail: { up: up, down: down, position: e }, bubbles: !1 })),
      up && !wasUp && document.dispatchEvent(new CustomEvent("theme:scroll:up", { detail: { position: e }, bubbles: !1 })),
      down && !wasDown && document.dispatchEvent(new CustomEvent("theme:scroll:down", { detail: { position: e }, bubbles: !1 })),
      (wasDown = down),
      (wasUp = up);
  }
  function lock(e) {
    setTimeout(() => {
      scrollLockTimer && clearTimeout(scrollLockTimer), scrollLock.disablePageScroll(e.detail, { allowTouchMove: (e) => "TEXTAREA" === e.tagName }), document.documentElement.setAttribute("data-scroll-locked", "");
    });
  }
  function unlock(e) {
    const t = e.detail;
    t ? (scrollLockTimer = setTimeout(removeScrollLock, t)) : removeScrollLock();
  }
  function removeScrollLock() {
    scrollLock.clearQueueScrollLocks(), scrollLock.enablePageScroll(), document.documentElement.removeAttribute("data-scroll-locked");
  }
  function scrollListener() {
    let e;
    window.addEventListener(
      "scroll",
      function () {
        e && window.cancelAnimationFrame(e),
          (e = window.requestAnimationFrame(function () {
            dispatch();
          }));
      },
      { passive: !0 }
    ),
      window.addEventListener("theme:scroll:lock", lock),
      window.addEventListener("theme:scroll:unlock", unlock);
  }
  const wrap = (e, t = "", s) => {
    const i = s || document.createElement("div");
    return i.classList.add(t), e.parentNode.insertBefore(i, e), i.appendChild(e);
  };
  function wrapElements(e) {
    e.querySelectorAll(".rte table").forEach((e) => {
      wrap(e, "rte__table-wrapper");
    });
    e.querySelectorAll('.rte iframe[src*="youtube.com/embed"], .rte iframe[src*="player.vimeo"], .rte iframe#admin_bar_iframe').forEach((e) => {
      wrap(e, "rte__video-wrapper");
    });
  }
  function isTouchDevice() {
    return "ontouchstart" in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
  }
  function isTouch() {
    isTouchDevice() ? ((document.documentElement.className = document.documentElement.className.replace("no-touch", "supports-touch")), (window.theme.touch = !0)) : (window.theme.touch = !1);
  }
  function ariaToggle(e) {
    const t = e.querySelectorAll("[data-aria-toggle]");
    t.length &&
      t.forEach((e) => {
        e.addEventListener("click", function (e) {
          e.preventDefault();
          const t = e.currentTarget;
          t.setAttribute("aria-expanded", "false" == t.getAttribute("aria-expanded") ? "true" : "false");
          const s = t.getAttribute("aria-controls"),
            i = document.querySelector(`#${s}`),
            o = () => {
              i.classList.remove("expanding"), i.removeEventListener("transitionend", o);
            },
            r = () => {
              i.classList.add("expanding"), i.removeEventListener("transitionstart", r);
            };
          i.addEventListener("transitionstart", r), i.addEventListener("transitionend", o), i.classList.toggle("expanded");
        });
      });
  }
  function loading() {
    document.body.classList.add("is-loaded");
  }
  const classes$K = { loading: "is-loading" },
    selectors$_ = { img: "img.is-loading" };
  function loadedImagesEventHook() {
    document.addEventListener(
      "load",
      (e) => {
        "IMG" == e.target.tagName && e.target.classList.contains(classes$K.loading) && (e.target.classList.remove(classes$K.loading), e.target.parentNode.classList.remove(classes$K.loading));
      },
      !0
    );
  }
  function removeLoadingClassFromLoadedImages(e) {
    e.querySelectorAll(selectors$_.img).forEach((e) => {
      e.complete && (e.classList.remove(classes$K.loading), e.parentNode.classList.remove(classes$K.loading));
    });
  }
  function isVisible(e) {
    var t = window.getComputedStyle(e);
    return "none" !== t.display && "hidden" !== t.visibility;
  }
  function forceFocus(e, t) {
    t = t || {};
    var s = e.tabIndex;
    (e.tabIndex = -1),
      (e.dataset.tabIndex = s),
      e.focus(),
      void 0 !== t.className && e.classList.add(t.className),
      e.addEventListener("blur", function i(o) {
        o.target.removeEventListener(o.type, i), (e.tabIndex = s), delete e.dataset.tabIndex, void 0 !== t.className && e.classList.remove(t.className);
      });
  }
  function focusHash(e) {
    e = e || {};
    var t = window.location.hash,
      s = document.getElementById(t.slice(1));
    if (s && e.ignore && s.matches(e.ignore)) return !1;
    t && s && forceFocus(s, e);
  }
  function bindInPageLinks(e) {
    return (
      (e = e || {}),
      Array.prototype.slice.call(document.querySelectorAll('a[href^="#"]')).filter(function (t) {
        if ("#" === t.hash || "" === t.hash) return !1;
        if (e.ignore && t.matches(e.ignore)) return !1;
        if (((s = t.hash.substr(1)), null === document.getElementById(s))) return !1;
        var s,
          i = document.querySelector(t.hash);
        return (
          !!i &&
          (t.addEventListener("click", function () {
            forceFocus(i, e);
          }),
          !0)
        );
      })
    );
  }
  function focusable(e) {
    return Array.prototype.slice.call(e.querySelectorAll("[tabindex],[draggable],a[href],area,button:enabled,input:not([type=hidden]):enabled,object,select:enabled,textarea:enabled")).filter(function (e) {
      return !(!(e.offsetWidth || e.offsetHeight || e.getClientRects().length) || !isVisible(e));
    });
  }
  var trapFocusHandlers = {};
  function trapFocus(e, t) {
    t = t || {};
    var s = focusable(e),
      i = t.elementToFocus || e,
      o = s[0],
      r = s[s.length - 1];
    removeTrapFocus(),
      (trapFocusHandlers.focusin = function (t) {
        e !== t.target && !e.contains(t.target) && o && o === t.target && o.focus(), (t.target !== e && t.target !== r && t.target !== o) || document.addEventListener("keydown", trapFocusHandlers.keydown);
      }),
      (trapFocusHandlers.focusout = function () {
        document.removeEventListener("keydown", trapFocusHandlers.keydown);
      }),
      (trapFocusHandlers.keydown = function (t) {
        t.code === window.theme.keyboardKeys.TAB && (t.target !== r || t.shiftKey || (t.preventDefault(), o.focus()), (t.target !== e && t.target !== o) || !t.shiftKey || (t.preventDefault(), r.focus()));
      }),
      document.addEventListener("focusout", trapFocusHandlers.focusout),
      document.addEventListener("focusin", trapFocusHandlers.focusin),
      forceFocus(i, t);
  }
  function removeTrapFocus() {
    document.removeEventListener("focusin", trapFocusHandlers.focusin), document.removeEventListener("focusout", trapFocusHandlers.focusout), document.removeEventListener("keydown", trapFocusHandlers.keydown);
  }
  function accessibleLinks(e, t) {
    if ("string" != typeof e) throw new TypeError(e + " is not a String.");
    if (0 !== (e = document.querySelectorAll(e)).length) {
      (t = t || {}).messages = t.messages || {};
      var s,
        i,
        o,
        r = { newWindow: t.messages.newWindow || "Opens in a new window.", external: t.messages.external || "Opens external website.", newWindowExternal: t.messages.newWindowExternal || "Opens external website in a new window." },
        a = t.prefix || "a11y",
        n = { newWindow: a + "-new-window-message", external: a + "-external-message", newWindowExternal: a + "-new-window-external-message" };
      e.forEach(function (e) {
        var t = e.getAttribute("target"),
          s = e.getAttribute("rel"),
          i = (function (e) {
            return e.hostname !== window.location.hostname;
          })(e),
          o = "_blank" === t,
          r = null === s || -1 === s.indexOf("noopener");
        if (o && r) {
          var a = null === s ? "noopener" : s + " noopener";
          e.setAttribute("rel", a);
        }
        i && o ? e.setAttribute("aria-describedby", n.newWindowExternal) : i ? e.setAttribute("aria-describedby", n.external) : o && e.setAttribute("aria-describedby", n.newWindow);
      }),
        (s = r),
        (i = document.createElement("ul")),
        (o = Object.keys(s).reduce(function (e, t) {
          return e + "<li id=" + n[t] + ">" + s[t] + "</li>";
        }, "")),
        i.setAttribute("hidden", !0),
        (i.innerHTML = o),
        document.body.appendChild(i);
    }
  }
  var a11y = Object.freeze({ __proto__: null, forceFocus: forceFocus, focusHash: focusHash, bindInPageLinks: bindInPageLinks, focusable: focusable, trapFocus: trapFocus, removeTrapFocus: removeTrapFocus, accessibleLinks: accessibleLinks });
  const selectors$Z = { inputSearch: 'input[type="search"]', focusedElements: '[aria-selected="true"] a', resetButton: 'button[type="reset"]' },
    classes$J = { hidden: "hidden" };
  let HeaderSearchForm = class extends HTMLElement {
    toggleResetButton() {
      const e = this.resetButton.classList.contains(classes$J.hidden);
      this.input.value.length > 0 && e ? this.resetButton.classList.remove(classes$J.hidden) : 0 !== this.input.value.length || e || this.resetButton.classList.add(classes$J.hidden);
    }
    onChange() {
      this.toggleResetButton();
    }
    shouldResetForm() {
      return !document.querySelector(selectors$Z.focusedElements);
    }
    onFormReset(e) {
      e.preventDefault(), this.shouldResetForm() && ((this.input.value = ""), this.toggleResetButton(), e.target.querySelector(selectors$Z.inputSearch).focus());
    }
    constructor() {
      super(),
        (this.input = this.querySelector(selectors$Z.inputSearch)),
        (this.resetButton = this.querySelector(selectors$Z.resetButton)),
        this.input &&
          (this.input.form.addEventListener("reset", this.onFormReset.bind(this)),
          this.input.addEventListener(
            "input",
            debounce((e) => {
              this.onChange(e);
            }, 300).bind(this)
          ));
    }
  };
  customElements.define("header-search-form", HeaderSearchForm);
  const selectors$Y = {
    allVisibleElements: '[role="option"]',
    ariaSelected: '[aria-selected="true"]',
    header: "[data-header-height]",
    popularSearches: "[data-popular-searches]",
    predictiveSearch: "predictive-search",
    predictiveSearchResults: "[data-predictive-search-results]",
    predictiveSearchStatus: "[data-predictive-search-status]",
    searchInput: 'input[type="search"]',
    searchPopdown: "[data-popdown]",
    searchResultsLiveRegion: "[data-predictive-search-live-region-count-value]",
    searchResultsGroupsWrapper: "[data-search-results-groups-wrapper]",
    searchForText: "[data-predictive-search-search-for-text]",
    sectionPredictiveSearch: "#shopify-section-predictive-search",
    selectedLink: '[aria-selected="true"] a',
    selectedOption: '[aria-selected="true"] a, button[aria-selected="true"]',
  };
  let PredictiveSearch = class extends HeaderSearchForm {
    connectedCallback() {
      this.input.addEventListener("focus", this.onFocus.bind(this)),
        this.input.form.addEventListener("submit", this.onFormSubmit.bind(this)),
        this.addEventListener("focusout", this.onFocusOut.bind(this)),
        this.addEventListener("keyup", this.onKeyup.bind(this)),
        this.addEventListener("keydown", this.onKeydown.bind(this));
    }
    getQuery() {
      return this.input.value.trim();
    }
    onChange() {
      super.onChange();
      const e = this.getQuery();
      var t;
      (this.searchTerm && e.startsWith(this.searchTerm)) || null === (t = this.querySelector(selectors$Y.searchResultsGroupsWrapper)) || void 0 === t || t.remove();
      this.updateSearchForTerm(this.searchTerm, e), (this.searchTerm = e), this.searchTerm.length ? this.getSearchResults(this.searchTerm) : this.reset();
    }
    onFormSubmit(e) {
      (this.getQuery().length && !this.querySelector(selectors$Y.selectedLink)) || e.preventDefault();
    }
    onFormReset(e) {
      super.onFormReset(e), super.shouldResetForm() && ((this.searchTerm = ""), this.abortController.abort(), (this.abortController = new AbortController()), this.closeResults(!0));
    }
    shouldResetForm() {
      return !document.querySelector(selectors$Y.selectedLink);
    }
    onFocus() {
      const e = this.getQuery();
      e.length && (this.searchTerm !== e ? this.onChange() : "true" === this.getAttribute("results") ? this.open() : this.getSearchResults(this.searchTerm));
    }
    onFocusOut() {
      setTimeout(() => {
        this.contains(document.activeElement) || this.close();
      });
    }
    onKeyup(e) {
      switch ((this.getQuery().length || this.close(!0), e.preventDefault(), e.code)) {
        case "ArrowUp":
          this.switchOption("up");
          break;
        case "ArrowDown":
          this.switchOption("down");
          break;
        case "Enter":
          this.selectOption();
      }
    }
    onKeydown(e) {
      ("ArrowUp" !== e.code && "ArrowDown" !== e.code) || e.preventDefault();
    }
    updateSearchForTerm(e, t) {
      const s = this.querySelector(selectors$Y.searchForText),
        i = null == s ? void 0 : s.innerText;
      if (i) {
        var o;
        if ((null === (o = i.match(new RegExp(e, "g"))) || void 0 === o ? void 0 : o.length) > 1) return;
        const r = i.replace(e, t);
        s.innerText = r;
      }
    }
    switchOption(e) {
      if (!this.getAttribute("open")) return;
      const t = "up" === e,
        s = this.querySelector(selectors$Y.ariaSelected),
        i = Array.from(this.querySelectorAll(selectors$Y.allVisibleElements)).filter((e) => null !== e.offsetParent);
      let o = 0;
      if (t && !s) return;
      let r = -1,
        a = 0;
      for (; -1 === r && a <= i.length; ) i[a] === s && (r = a), a++;
      if (((this.statusElement.textContent = ""), !t && s ? (o = r === i.length - 1 ? 0 : r + 1) : t && (o = 0 === r ? i.length - 1 : r - 1), o === r)) return;
      const n = i[o];
      n.setAttribute("aria-selected", !0), s && s.setAttribute("aria-selected", !1), this.input.setAttribute("aria-activedescendant", n.id);
    }
    selectOption() {
      const e = this.querySelector(selectors$Y.selectedOption);
      e && e.click();
    }
    getSearchResults(e) {
      const t = e.replace(" ", "-").toLowerCase();
      this.setLiveRegionLoadingState(),
        this.cachedResults[t]
          ? this.renderSearchResults(this.cachedResults[t])
          : fetch(`${theme.routes.predictive_search_url}?q=${encodeURIComponent(e)}&section_id=predictive-search`, { signal: this.abortController.signal })
              .then((e) => {
                if (!e.ok) {
                  var t = new Error(e.status);
                  throw (this.close(), t);
                }
                return e.text();
              })
              .then((e) => {
                const s = new DOMParser().parseFromString(e, "text/html").querySelector(selectors$Y.sectionPredictiveSearch).innerHTML;
                this.allPredictiveSearchInstances.forEach((e) => {
                  e.cachedResults[t] = s;
                }),
                  this.renderSearchResults(s);
              })
              .catch((e) => {
                if (20 !== (null == e ? void 0 : e.code)) throw (this.close(), e);
              });
    }
    setLiveRegionLoadingState() {
      (this.statusElement = this.statusElement || this.querySelector(selectors$Y.predictiveSearchStatus)),
        (this.loadingText = this.loadingText || this.getAttribute("data-loading-text")),
        this.setLiveRegionText(this.loadingText),
        this.setAttribute("loading", !0);
    }
    setLiveRegionText(e) {
      this.statusElement.setAttribute("aria-hidden", "false"),
        (this.statusElement.textContent = e),
        setTimeout(() => {
          this.statusElement.setAttribute("aria-hidden", "true");
        }, 1e3);
    }
    renderSearchResults(e) {
      (this.predictiveSearchResults.innerHTML = e), this.setAttribute("results", !0), this.setLiveRegionResults(), this.open();
    }
    setLiveRegionResults() {
      this.removeAttribute("loading"), this.setLiveRegionText(this.querySelector(selectors$Y.searchResultsLiveRegion).textContent);
    }
    open() {
      this.setAttribute("open", !0), this.input.setAttribute("aria-expanded", !0), (this.isOpen = !0);
    }
    close(e = !1) {
      this.closeResults(e), (this.isOpen = !1);
    }
    closeResults(e = !1) {
      var t;
      e && ((this.input.value = ""), this.removeAttribute("results"));
      const s = this.querySelector(selectors$Y.ariaSelected);
      s && s.setAttribute("aria-selected", !1),
        this.input.setAttribute("aria-activedescendant", ""),
        this.removeAttribute("loading"),
        this.removeAttribute("open"),
        this.input.setAttribute("aria-expanded", !1),
        (this.resultsMaxHeight = !1),
        null === (t = this.predictiveSearchResults) || void 0 === t || t.removeAttribute("style");
    }
    reset() {
      (this.predictiveSearchResults.innerHTML = ""),
        (this.input.val = ""),
        this.a11y.removeTrapFocus(),
        this.popularSearches && (this.input.dispatchEvent(new Event("blur", { bubbles: !1 })), this.a11y.trapFocus(this.searchPopdown, { elementToFocus: this.input }));
    }
    constructor() {
      var e;
      super(),
        (this.a11y = a11y),
        (this.abortController = new AbortController()),
        (this.allPredictiveSearchInstances = document.querySelectorAll(selectors$Y.predictiveSearch)),
        (this.cachedResults = {}),
        (this.input = this.querySelector(selectors$Y.searchInput)),
        (this.isOpen = !1),
        (this.predictiveSearchResults = this.querySelector(selectors$Y.predictiveSearchResults)),
        (this.searchPopdown = this.closest(selectors$Y.searchPopdown)),
        (this.popularSearches = null === (e = this.searchPopdown) || void 0 === e ? void 0 : e.querySelector(selectors$Y.popularSearches)),
        (this.searchTerm = "");
    }
  };
  customElements.define("predictive-search", PredictiveSearch);
  const selectors$X = { aos: "[data-aos]:not(.aos-animate)", aosAnchor: "[data-aos-anchor]" },
    classes$I = { aosAnimate: "aos-animate" },
    observerConfig = { attributes: !1, childList: !0, subtree: !0 },
    mutationCallback = (e) => {
      for (const t of e)
        if ("childList" === t.type) {
          const e = t.target,
            s = e.querySelectorAll(selectors$X.aos),
            i = e.querySelectorAll(selectors$X.aosAnchor);
          s.length &&
            s.forEach((e) => {
              aosItemObserver.observe(e);
            }),
            i.length && initAnchorObservers(i);
        }
    },
    aosItemObserver = new IntersectionObserver(
      (e, t) => {
        e.forEach((e) => {
          e.isIntersecting && (e.target.classList.add(classes$I.aosAnimate), t.unobserve(e.target));
        });
      },
      { root: null, rootMargin: "0px", threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] }
    ),
    aosAnchorObserver = new IntersectionObserver(
      (e, t) => {
        e.forEach((e) => {
          if (e.intersectionRatio > 0.1) {
            const s = e.target.querySelectorAll(selectors$X.aos);
            s.length &&
              s.forEach((e) => {
                e.classList.add(classes$I.aosAnimate);
              }),
              t.unobserve(e.target);
          }
        });
      },
      { root: null, rootMargin: "0px", threshold: [0.1, 0.25, 0.5, 0.75, 1] }
    );
  function bodyMutationObserver() {
    new MutationObserver(mutationCallback).observe(document.body, observerConfig);
  }
  function elementsIntersectionObserver() {
    const e = document.querySelectorAll(selectors$X.aos);
    e.length &&
      e.forEach((e) => {
        aosItemObserver.observe(e);
      });
  }
  function anchorsIntersectionObserver() {
    const e = document.querySelectorAll(selectors$X.aosAnchor);
    e.length && initAnchorObservers(e);
  }
  function initAnchorObservers(e) {
    let t = [];
    e.length &&
      e.forEach((e) => {
        const s = e.dataset.aosAnchor;
        if (s && -1 === t.indexOf(s)) {
          const e = document.querySelector(s);
          e && (aosAnchorObserver.observe(e), t.push(s));
        }
      });
  }
  function initAnimations() {
    elementsIntersectionObserver(), anchorsIntersectionObserver(), bodyMutationObserver();
  }
  (window.requestIdleCallback =
    window.requestIdleCallback ||
    function (e) {
      var t = Date.now();
      return setTimeout(function () {
        e({
          didTimeout: !1,
          timeRemaining: function () {
            return Math.max(0, 50 - (Date.now() - t));
          },
        });
      }, 1);
    }),
    (window.cancelIdleCallback =
      window.cancelIdleCallback ||
      function (e) {
        clearTimeout(e);
      }),
    window.theme.settings.enableAnimations && initAnimations(),
    resizeListener(),
    scrollListener(),
    isTouch(),
    setVars(),
    loadedImagesEventHook(),
    window.addEventListener("DOMContentLoaded", () => {
      setVarsOnResize(), ariaToggle(document), floatLabels(document), wrapElements(document), removeLoadingClassFromLoadedImages(document), loading(), window.fastNetworkAndCPU && preloadImages();
    }),
    document.addEventListener("shopify:section:load", (e) => {
      const t = e.target;
      floatLabels(t), wrapElements(t), ariaToggle(document), setVarsOnResize();
    });
  const showElement = (e, t = !1, s = "block") => {
    e && (t ? e.style.removeProperty("display") : (e.style.display = s));
  };
  Shopify.Products = (function () {
    const e = { howManyToShow: 4, howManyToStoreInMemory: 10, wrapperId: "recently-viewed-products", section: null, onComplete: null };
    let t = [],
      s = null,
      i = null;
    const o = new Date(),
      r = new Date();
    r.setTime(o.getTime() + 7776e6);
    const a = {
        configuration: { expires: r.toGMTString(), path: "/", domain: window.location.hostname, sameSite: "none", secure: !0 },
        name: "shopify_recently_viewed",
        write: function (e) {
          const t = e.join(" ");
          document.cookie = `${this.name}=${t}; expires=${this.configuration.expires}; path=${this.configuration.path}; domain=${this.configuration.domain}; sameSite=${this.configuration.sameSite}; secure=${this.configuration.secure}`;
        },
        read: function () {
          let e = [],
            t = null;
          return (
            -1 !== document.cookie.indexOf("; ") &&
              document.cookie.split("; ").find((e) => e.startsWith(this.name)) &&
              (t = document.cookie
                .split("; ")
                .find((e) => e.startsWith(this.name))
                .split("=")[1]),
            null !== t && (e = t.split(" ")),
            e
          );
        },
        destroy: function () {
          document.cookie = `${this.name}=null; expires=${this.configuration.expires}; path=${this.configuration.path}; domain=${this.configuration.domain}`;
        },
        remove: function (e) {
          const t = this.read(),
            s = t.indexOf(e);
          -1 !== s && (t.splice(s, 1), this.write(t));
        },
      },
      n = (t, s, o, r) => {
        s.length && t < e.howManyToShow
          ? fetch(`${window.theme.routes.root}products/${s[0]}?section_id=api-product-grid-item`)
              .then((e) => e.text())
              .then((e) => {
                const i = 150 * t,
                  a = 100 * t + 800,
                  l = 50 * t + 800,
                  c = o.id ? `#${o.id}` : "",
                  d = document.createElement("div");
                let h = e.includes("||itemIndex||") ? e.replaceAll("||itemIndex||", t) : e;
                (h = h.includes("||itemAosDelay||") ? h.replaceAll("||itemAosDelay||", i) : h),
                  (h = h.includes("||itemAosImageDuration||") ? h.replaceAll("||itemAosImageDuration||", a) : h),
                  (h = h.includes("||itemAosTextDuration||") ? h.replaceAll("||itemAosTextDuration||", l) : h),
                  (h = h.includes("||itemAnimationAnchor||") ? h.replaceAll("||itemAnimationAnchor||", c) : h),
                  (d.innerHTML = h),
                  (o.innerHTML += d.querySelector("[data-api-content]").innerHTML),
                  s.shift(),
                  t++,
                  n(t, s, o, r);
              })
              .catch(() => {
                a.remove(s[0]), s.shift(), n(t, s, o, r);
              })
          : ((t, s) => {
              showElement(t, !0);
              const o = a.read().length;
              if (Shopify.recentlyViewed && i && o && o < i && t.children.length) {
                let e = [],
                  s = [],
                  i = 0;
                for (const t in Shopify.recentlyViewed) {
                  i += 1;
                  const o = Shopify.recentlyViewed[t].split(" "),
                    r = parseInt(t.split("_")[1]);
                  (e = [...e, ...o]), (a.read().length === r || (i === Object.keys(Shopify.recentlyViewed).length && !s.length)) && (s = [...s, ...o]);
                }
                for (let i = 0; i < t.children.length; i++) {
                  const o = t.children[i];
                  e.length && o.classList.remove(...e), s.length && o.classList.add(...s);
                }
              }
              if (e.onComplete)
                try {
                  e.onComplete(t, s);
                } catch (e) {
                  console.log(e);
                }
            })(o, r);
      };
    return {
      showRecentlyViewed: function (o) {
        const r = o || {};
        Object.assign(e, r), (t = a.read()), (s = document.querySelector(`#${e.wrapperId}`)), (i = e.howManyToShow), (e.howManyToShow = Math.min(t.length, e.howManyToShow)), e.howManyToShow && s && n(0, t, s, e.section);
      },
      getConfig: function () {
        return e;
      },
      clearList: function () {
        a.destroy();
      },
      recordRecentlyViewed: function (t) {
        const s = t || {};
        Object.assign(e, s);
        let i = a.read();
        if (-1 !== window.location.pathname.indexOf("/products/")) {
          let t = decodeURIComponent(window.location.pathname)
            .match(
              /\/products\/([a-z0-9\-]|[\u3000-\u303F]|[\u3040-\u309F]|[\u30A0-\u30FF]|[\uFF00-\uFFEF]|[\u4E00-\u9FAF]|[\u2605-\u2606]|[\u2190-\u2195]|[\u203B]|[\w\u0430-\u044f]|[\u0400-\u04FF]|[\u0900-\u097F]|[\u0590-\u05FF\u200f\u200e]|[\u0621-\u064A\u0660-\u0669 ])+/
            )[0]
            .split("/products/")[1];
          e.handle && (t = e.handle);
          const s = i.indexOf(t);
          -1 === s ? (i.unshift(t), (i = i.splice(0, e.howManyToStoreInMemory))) : (i.splice(s, 1), i.unshift(t)), a.write(i);
        }
      },
      hasProducts: a.read().length > 0,
    };
  })();
  const getUrlString = (e, t = [], s = !1) => {
      const i = Object.keys(e)
        .map((i) => {
          let o = e[i];
          if ("[object Object]" === Object.prototype.toString.call(o) || Array.isArray(o)) return Array.isArray(e) ? t.push("") : t.push(i), getUrlString(o, t, Array.isArray(o));
          {
            let e = i;
            if (t.length > 0) {
              e = (s ? t : [...t, i]).reduce((e, t) => ("" === e ? t : `${e}[${t}]`), "");
            }
            return s ? `${e}[]=${o}` : `${e}=${o}`;
          }
        })
        .join("&");
      return t.pop(), i;
    },
    hideElement = (e) => {
      e && (e.style.display = "none");
    },
    fadeIn = (e, t, s = null) => {
      (e.style.opacity = 0), (e.style.display = t || "block");
      let i = !0;
      !(function t() {
        let o = parseFloat(e.style.opacity);
        (o += 0.1) > 1 || ((e.style.opacity = o), requestAnimationFrame(t)), 1 === parseInt(o) && i && "function" == typeof s && ((i = !1), s());
      })();
    };
  function FetchError(e) {
    (this.status = e.status || null), (this.headers = e.headers || null), (this.json = e.json || null), (this.body = e.body || null);
  }
  function subscribe(e, t) {
    return (
      void 0 === window.theme.subscribers[e] && (window.theme.subscribers[e] = []),
      (window.theme.subscribers[e] = [...window.theme.subscribers[e], t]),
      function () {
        window.theme.subscribers[e] = window.theme.subscribers[e].filter((e) => e !== t);
      }
    );
  }
  function publish(e, t) {
    window.theme.subscribers[e] &&
      window.theme.subscribers[e].forEach((e) => {
        e(t);
      });
  }
  void 0 === Shopify.Cart && (Shopify.Cart = {}),
    (Shopify.Cart.ShippingCalculator = (function () {
      const _config = {
          submitButton: theme.strings.shippingCalcSubmitButton,
          submitButtonDisabled: theme.strings.shippingCalcSubmitButtonDisabled,
          templateId: "shipping-calculator-response-template",
          wrapperId: "wrapper-response",
          customerIsLoggedIn: !1,
        },
        _render = function (e) {
          const t = document.querySelector(`#${_config.templateId}`),
            s = document.querySelector(`#${_config.wrapperId}`);
          if (t && s) {
            s.innerHTML = "";
            let i = "",
              o = "",
              r = "error center",
              a = t.innerHTML;
            const n = /[^[\]]+(?=])/g;
            if (e.rates && e.rates.length) {
              let t = n.exec(a)[0];
              e.rates.forEach((e) => {
                let s = t;
                (s = s.replace(/\|\|rateName\|\|/, e.name)), (s = s.replace(/\|\|ratePrice\|\|/, Shopify.Cart.ShippingCalculator.formatRate(e.price))), (i += s);
              });
            }
            if (e.success) {
              r = "success center";
              const s = document.createElement("div");
              s.innerHTML = t.innerHTML;
              const i = s.querySelector("[data-template-no-shipping]");
              e.rates.length < 1 && i && (o = i.getAttribute("data-template-no-shipping"));
            } else o = e.errorFeedback;
            (a = a.replace(n, "").replace("[]", "")), (a = a.replace(/\|\|ratesList\|\|/g, i)), (a = a.replace(/\|\|successClass\|\|/g, r)), (a = a.replace(/\|\|ratesText\|\|/g, o)), (s.innerHTML += a);
          }
        },
        _enableButtons = function () {
          const e = document.querySelector(".get-rates");
          e.removeAttribute("disabled"), e.classList.remove("disabled"), (e.value = _config.submitButton);
        },
        _disableButtons = function () {
          const e = document.querySelector(".get-rates");
          e.setAttribute("disabled", "disabled"), e.classList.add("disabled"), (e.value = _config.submitButtonDisabled);
        },
        _getCartShippingRatesForDestination = function (e) {
          const t = encodeURI(getUrlString({ shipping_address: e })),
            s = `${theme.routes.cart_url}/shipping_rates.json?${t}`,
            i = new XMLHttpRequest();
          i.open("GET", s, !0),
            (i.onload = function () {
              if (this.status >= 200 && this.status < 400) {
                const t = JSON.parse(this.response).shipping_rates;
                _onCartShippingRatesUpdate(t, e);
              } else _onError(this);
            }),
            (i.onerror = function () {
              _onError(this);
            }),
            i.send();
        },
        _fullMessagesFromErrors = function (e) {
          const t = [];
          for (const s in e) for (const i of e[s]) t.push(s + " " + i);
          return t;
        },
        _onError = function (XMLHttpRequest) {
          hideElement(document.querySelector("#estimated-shipping"));
          const shippingChild = document.querySelector("#estimated-shipping em");
          if (shippingChild) for (; shippingChild.firstChild; ) shippingChild.removeChild(shippingChild.firstChild);
          _enableButtons();
          let feedback = "";
          const data = eval("(" + XMLHttpRequest.responseText + ")");
          (feedback = data.message ? data.message + "(" + data.status + "): " + data.description : "Error : " + _fullMessagesFromErrors(data).join("; ")),
            "Error : country is not supported." === feedback && (feedback = "We do not ship to this destination."),
            _render({ rates: [], errorFeedback: feedback, success: !1 }),
            showElement(document.querySelector(`#${_config.wrapperId}`));
        },
        _onCartShippingRatesUpdate = function (e, t) {
          _enableButtons();
          let s = "";
          t.zip && (s += t.zip + ", "), t.province && (s += t.province + ", "), (s += t.country);
          const i = document.querySelector("#estimated-shipping em");
          e.length && i && (i.textContent = "0.00" == e[0].price ? window.theme.strings.free : themeCurrency.formatMoney(e[0].price, theme.moneyFormat)), _render({ rates: e, address: s, success: !0 });
          const o = document.querySelectorAll(`#${_config.wrapperId}, #estimated-shipping`);
          o.length &&
            o.forEach((e) => {
              fadeIn(e);
            });
        },
        _init = function () {
          const e = document.querySelector(".get-rates"),
            t = document.querySelector("#address_container"),
            s = document.querySelector("#address_country"),
            i = document.querySelector("#address_province"),
            o = document.querySelector("html");
          let r = "en";
          if (
            (o.hasAttribute("lang") && "" !== o.getAttribute("lang") && (r = o.getAttribute("lang")),
            t && themeAddresses.AddressForm(t, r, { shippingCountriesOnly: !0 }),
            s &&
              s.hasAttribute("data-default") &&
              i &&
              i.hasAttribute("data-default") &&
              s.addEventListener("change", function () {
                s.removeAttribute("data-default"), i.removeAttribute("data-default");
              }),
            e &&
              (e.addEventListener("click", function (e) {
                _disableButtons();
                const t = document.querySelector(`#${_config.wrapperId}`);
                for (; t.firstChild; ) t.removeChild(t.firstChild);
                hideElement(t);
                const o = {};
                let r = s.value,
                  a = i.value;
                const n = s.getAttribute("data-default-fullname");
                "" === r && n && "" !== n && (r = n);
                const l = i.getAttribute("data-default-fullname");
                "" === a && l && "" !== l && (a = l), (o.zip = document.querySelector("#address_zip").value || ""), (o.country = r || ""), (o.province = a || ""), _getCartShippingRatesForDestination(o);
              }),
              _config.customerIsLoggedIn && e.classList.contains("get-rates--trigger")))
          ) {
            const t = document.querySelector("#address_zip");
            t && t.value && e.dispatchEvent(new Event("click"));
          }
        };
      return {
        show: function (e) {
          (e = e || {}),
            Object.assign(_config, e),
            document.addEventListener("DOMContentLoaded", function () {
              _init();
            });
        },
        getConfig: function () {
          return _config;
        },
        formatRate: function (e) {
          return "0.00" === e ? window.theme.strings.free : themeCurrency.formatMoney(e, theme.moneyFormat);
        },
      };
    })()),
    (FetchError.prototype = Error.prototype);
  const selectors$W = {
    quantityHolder: "[data-quantity-holder]",
    quantityField: "[data-quantity-field]",
    quantityButton: "[data-quantity-button]",
    quantityMinusButton: "[data-quantity-minus]",
    quantityPlusButton: "[data-quantity-plus]",
    quantityReadOnly: "read-only",
    isDisabled: "is-disabled",
  };
  let QuantityCounter = class {
    init() {
      (this.settings = selectors$W),
        (this.quantity = this.holder.querySelector(this.settings.quantityHolder)),
        this.quantity &&
          ((this.field = this.quantity.querySelector(this.settings.quantityField)),
          (this.buttons = this.quantity.querySelectorAll(this.settings.quantityButton)),
          (this.increaseButton = this.quantity.querySelector(this.settings.quantityPlusButton)),
          (this.quantityValue = Number(this.field.value || 0)),
          (this.cartItemID = this.field.getAttribute("data-id")),
          (this.maxValue = Number(this.field.getAttribute("max")) > 0 ? Number(this.field.getAttribute("max")) : null),
          (this.minValue = Number(this.field.getAttribute("min")) > 0 ? Number(this.field.getAttribute("min")) : 0),
          (this.disableIncrease = this.disableIncrease.bind(this)),
          (this.updateQuantity = this.updateQuantity.bind(this)),
          (this.decrease = this.decrease.bind(this)),
          (this.increase = this.increase.bind(this)),
          this.disableIncrease(),
          this.quantity.classList.contains(this.settings.quantityReadOnly) || (this.changeValueOnClick(), this.changeValueOnInput()));
    }
    changeValueOnClick() {
      const e = this;
      this.buttons.forEach((t) => {
        t.addEventListener("click", (t) => {
          t.preventDefault(), (this.quantityValue = Number(this.field.value || 0));
          const s = t.target,
            i = s.matches(e.settings.quantityMinusButton) || s.closest(e.settings.quantityMinusButton),
            o = s.matches(e.settings.quantityPlusButton) || s.closest(e.settings.quantityPlusButton);
          i && e.decrease(), o && e.increase(), e.updateQuantity();
        });
      });
    }
    changeValueOnInput() {
      this.field.addEventListener("change", () => {
        (this.quantityValue = this.field.value), this.updateQuantity();
      });
    }
    updateQuantity() {
      this.maxValue < this.quantityValue && null !== this.maxValue && (this.quantityValue = this.maxValue),
        this.minValue > this.quantityValue && (this.quantityValue = this.minValue),
        (this.field.value = this.quantityValue),
        this.disableIncrease(),
        this.quantityUpdateCart && this.updateCart();
    }
    decrease() {
      this.quantityValue > this.minValue ? this.quantityValue-- : (this.quantityValue = 0);
    }
    increase() {
      this.quantityValue++;
    }
    disableIncrease() {
      this.increaseButton.classList.toggle(this.settings.isDisabled, this.quantityValue >= this.maxValue && null !== this.maxValue);
    }
    updateCart() {
      if ("" === this.quantityValue) return;
      const e = new CustomEvent("theme:cart:update", { bubbles: !0, detail: { id: this.cartItemID, quantity: this.quantityValue } });
      this.holder.dispatchEvent(e);
    }
    constructor(e, t = !1) {
      (this.holder = e), (this.quantityUpdateCart = t);
    }
  };
  const events$2 = { cartUpdate: "cart-update", cartError: "cart-error" },
    classes$H = {
      animated: "is-animated",
      active: "is-active",
      added: "is-added",
      disabled: "is-disabled",
      error: "has-error",
      headerStuck: "js__header__stuck",
      hidden: "is-hidden",
      hiding: "is-hiding",
      loading: "is-loading",
      open: "is-open",
      removed: "is-removed",
      success: "is-success",
      visible: "is-visible",
      focused: "is-focused",
      expanded: "is-expanded",
      updated: "is-updated",
      variantSoldOut: "variant--soldout",
      variantUnavailable: "variant--unavailable",
    },
    selectors$V = {
      apiContent: "[data-api-content]",
      apiLineItems: "[data-api-line-items]",
      apiUpsellItems: "[data-api-upsell-items]",
      apiCartPrice: "[data-api-cart-price]",
      animation: "[data-animation]",
      additionalCheckoutButtons: ".additional-checkout-buttons",
      buttonHolder: "[data-foot-holder]",
      buttonSkipUpsellProduct: "[data-skip-upsell-product]",
      cartBarAdd: "[data-add-to-cart-bar]",
      cartCloseError: "[data-cart-error-close]",
      cartDrawer: "[data-cart-drawer]",
      cartDrawerClose: "[data-cart-drawer-close]",
      cartEmpty: "[data-cart-empty]",
      cartErrors: "[data-cart-errors]",
      cartItemRemove: "[data-item-remove]",
      cartPage: "[data-cart-page]",
      cartToggle: "[data-cart-toggle]",
      cartTotal: "[data-cart-total]",
      errorMessage: "[data-error-message]",
      formCloseError: "[data-close-error]",
      formErrorsContainer: "[data-cart-errors-container]",
      formWrapper: "[data-form-wrapper]",
      freeShipping: "[data-free-shipping]",
      freeShippingGraph: "[data-progress-graph]",
      freeShippingProgress: "[data-progress-bar]",
      headerWrapper: "[data-header-wrapper]",
      item: "[data-item]",
      itemsHolder: "[data-items-holder]",
      leftToSpend: "[data-left-to-spend]",
      navDrawer: "[data-drawer]",
      outerSection: "[data-section-id]",
      priceHolder: "[data-cart-price-holder]",
      quickAddHolder: "[data-quick-add-holder]",
      quickAddModal: "[data-quick-add-modal]",
      qtyInput: "[data-quantity-field]",
      upsellProductsHolder: "[data-upsell-products]",
      upsellWidget: "[data-upsell-widget]",
    },
    attributes$m = {
      cartToggle: "data-cart-toggle",
      cartTotal: "data-cart-total",
      disabled: "disabled",
      drawerUnderlay: "data-drawer-underlay",
      freeShipping: "data-free-shipping",
      freeShippingLimit: "data-free-shipping-limit",
      hideErrors: "data-hide-errors",
      item: "data-item",
      itemIndex: "data-item-index",
      itemTitle: "data-item-title",
      quickAddHolder: "data-quick-add-holder",
      quickAddVariant: "data-quick-add-variant",
    };
  let CartDrawer = class {
    init() {
      (this.cartPage = document.querySelector(selectors$V.cartPage)),
        (this.cartDrawer = document.querySelector(selectors$V.cartDrawer)),
        (this.cartDrawerClose = document.querySelector(selectors$V.cartDrawerClose)),
        (this.cartEmpty = document.querySelector(selectors$V.cartEmpty)),
        (this.buttonHolder = document.querySelector(selectors$V.buttonHolder)),
        (this.itemsHolder = document.querySelector(selectors$V.itemsHolder)),
        (this.priceHolder = document.querySelector(selectors$V.priceHolder)),
        (this.items = document.querySelectorAll(selectors$V.item)),
        (this.cartTotal = document.querySelector(selectors$V.cartTotal)),
        (this.freeShipping = document.querySelectorAll(selectors$V.freeShipping)),
        (this.cartErrorHolder = document.querySelector(selectors$V.cartErrors)),
        (this.cartCloseErrorMessage = document.querySelector(selectors$V.cartCloseError)),
        (this.headerWrapper = document.querySelector(selectors$V.headerWrapper)),
        (this.accessibility = a11y),
        (this.navDrawer = document.querySelector(selectors$V.navDrawer)),
        (this.upsellProductsHolder = document.querySelector(selectors$V.upsellProductsHolder)),
        (this.hideErrors = !1),
        (this.subtotal = window.theme.subtotal),
        (this.cart = this.cartDrawer || this.cartPage),
        (this.cartAddEvent = this.cartAddEvent.bind(this)),
        (this.addToCart = this.addToCart.bind(this)),
        (this.updateProgress = this.updateProgress.bind(this)),
        document.addEventListener("theme:cart:add", this.cartAddEvent),
        document.addEventListener("theme:announcement:init", this.updateProgress),
        (this.skipUpsellProductsArray = []),
        this.skipUpsellProductEvent(),
        this.checkSkippedUpsellProductsFromStorage(),
        this.toggleCartUpsellWidgetVisibility(),
        this.estimateShippingCalculator(),
        (this.circumference = 28 * Math.PI),
        (this.cartFreeShippingLimit = 0),
        this.freeShippingMessageHandle(this.subtotal),
        this.updateProgress(),
        this.cart &&
          ((this.build = this.build.bind(this)),
          (this.updateCart = this.updateCart.bind(this)),
          (this.productAddCallback = this.productAddCallback.bind(this)),
          (this.openCartDrawer = this.openCartDrawer.bind(this)),
          (this.closeCartDrawer = this.closeCartDrawer.bind(this)),
          (this.toggleCartDrawer = this.toggleCartDrawer.bind(this)),
          (this.openCartDrawerOnProductAdded = this.openCartDrawerOnProductAdded.bind(this)),
          (this.animateItems = this.animateItems.bind(this)),
          (this.showAnimatedItems = this.showAnimatedItems.bind(this)),
          this.cartPage && this.showAnimatedItems(),
          (this.hasItemsInCart = this.hasItemsInCart.bind(this)),
          (this.cartCount = this.getCartItemCount()),
          (this.toggleClassesOnContainers = this.toggleClassesOnContainers.bind(this)),
          (this.totalItems = this.items.length),
          (this.cartDrawerIsOpen = !1),
          (this.cartDrawerEnabled = theme.settings.cartDrawerEnabled),
          (this.cartUpdateFailed = !1),
          this.cartToggleEvents(),
          this.cartEvents(),
          this.initQuantity(),
          document.addEventListener("theme:cart:toggle", this.toggleCartDrawer),
          document.addEventListener("theme:quick-add:open", this.closeCartDrawer),
          document.addEventListener("theme:product:add", this.productAddCallback),
          document.addEventListener("theme:product:add-error", this.productAddCallback),
          document.addEventListener("theme:product:added", this.openCartDrawerOnProductAdded));
    }
    initQuantity() {
      (this.items = document.querySelectorAll(selectors$V.item)),
        this.items.forEach((e) => {
          new QuantityCounter(e, !0).init(), this.cartUpdateEvent(e);
        });
    }
    cartUpdateEvent(e) {
      e.addEventListener("theme:cart:update", (t) => {
        this.updateCart({ id: t.detail.id, quantity: t.detail.quantity }, e);
      });
    }
    cartEvents() {
      document.querySelectorAll(selectors$V.cartItemRemove).forEach((e) => {
        const t = e.closest(selectors$V.item);
        e.addEventListener("click", (s) => {
          s.preventDefault(), e.classList.contains(classes$H.disabled) || this.updateCart({ id: e.dataset.id, quantity: 0 }, t);
        });
      }),
        this.cartCloseErrorMessage &&
          this.cartCloseErrorMessage.addEventListener("click", (e) => {
            e.preventDefault(), this.cartErrorHolder.classList.remove(classes$H.expanded);
          });
    }
    cartAddEvent(e) {
      let t = "",
        s = e.detail.button;
      if (s.hasAttribute("disabled")) return;
      const i = s.closest("form");
      (this.hideErrors = "true" === (null == i ? void 0 : i.getAttribute(attributes$m.hideErrors))),
        i.checkValidity() ? ((t = new FormData(i)), (null !== i && i.querySelector('[type="file"]')) || (e.preventDefault(), this.addToCart(t, s))) : i.reportValidity();
    }
    formErrorsEvents(e) {
      const t = e.querySelector(selectors$V.formCloseError);
      null == t ||
        t.addEventListener("click", (t) => {
          t.preventDefault(), e && e.classList.remove(classes$H.visible);
        });
    }
    estimateShippingCalculator() {
      Shopify.Cart.ShippingCalculator.show({
        submitButton: theme.strings.shippingCalcSubmitButton,
        submitButtonDisabled: theme.strings.shippingCalcSubmitButtonDisabled,
        customerIsLoggedIn: theme.settings.customerLoggedIn,
        moneyFormat: theme.moneyWithCurrencyFormat,
      });
    }
    getCart() {
      fetch(theme.routes.cart_url + "?section_id=api-cart-items")
        .then(this.cartErrorsHandler)
        .then((e) => e.text())
        .then((e) => {
          const t = document.createElement("div");
          t.innerHTML = e;
          const s = t.querySelector(selectors$V.apiContent);
          this.build(s);
        })
        .catch((e) => console.log(e));
    }
    addToCart(e, t) {
      this.cart && this.cart.classList.add(classes$H.loading);
      const s = e.get("id"),
        i = null == t ? void 0 : t.closest(selectors$V.quickAddHolder);
      this.cartDrawerEnabled && (t && (t.classList.add(classes$H.loading), (t.disabled = !0)), i && i.classList.add(classes$H.visible)),
        fetch(theme.routes.cart_add_url, { method: "POST", headers: { "X-Requested-With": "XMLHttpRequest", Accept: "application/javascript" }, body: e })
          .then((e) => e.json())
          .then((e) => {
            let i = !1;
            if (e.status)
              return (
                publish(events$2.cartError, { source: "product-form", productVariantId: s, errors: e.description, message: e.message }),
                this.addToCartError(e, t),
                (i = !0),
                (this.hideErrors = !1),
                void (t && (t.classList.remove(classes$H.loading), (t.disabled = !1)))
              );
            i || publish(events$2.cartUpdate, { source: "product-form", productVariantId: s }),
              this.cartDrawerEnabled
                ? (t && (t.classList.remove(classes$H.loading), t.classList.add(classes$H.added), t.dispatchEvent(new CustomEvent("theme:product:add", { detail: { response: e, button: t }, bubbles: !0 }))), this.getCart())
                : (window.location = theme.routes.cart_url);
          })
          .catch((e) => {
            this.addToCartError(e, t), this.enableCartButtons();
          });
    }
    updateCart(e = {}, t = null) {
      this.cart.classList.add(classes$H.loading);
      let s = e.quantity;
      null !== t && (s ? t.classList.add(classes$H.loading) : t.classList.add(classes$H.removed)), this.disableCartButtons();
      const i = this.cart.querySelector(`[${attributes$m.item}="${e.id}"]`) || t,
        o = (null == i ? void 0 : i.hasAttribute(attributes$m.itemIndex)) ? parseInt(i.getAttribute(attributes$m.itemIndex)) : 0,
        r = (null == i ? void 0 : i.hasAttribute(attributes$m.itemTitle)) ? i.getAttribute(attributes$m.itemTitle) : null;
      if (0 === o) return;
      const a = { line: o, quantity: s };
      fetch(theme.routes.cart_change_url, { method: "post", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(a) })
        .then((e) => e.text())
        .then((e) => {
          if (JSON.parse(e).errors) return (this.cartUpdateFailed = !0), this.updateErrorText(r), this.toggleErrorMessage(), this.resetLineItem(t), void this.enableCartButtons();
          this.getCart();
        })
        .catch((e) => {
          console.log(e), this.enableCartButtons();
        });
    }
    resetLineItem(e) {
      const t = e.querySelector(selectors$V.qtyInput),
        s = t.getAttribute("value");
      (t.value = s), e.classList.remove(classes$H.loading);
    }
    disableCartButtons() {
      const e = this.cart.querySelectorAll("input"),
        t = this.cart.querySelectorAll(`button, ${selectors$V.cartItemRemove}`);
      e.length &&
        e.forEach((e) => {
          e.classList.add(classes$H.disabled), e.blur(), (e.disabled = !0);
        }),
        t.length &&
          t.forEach((e) => {
            e.setAttribute(attributes$m.disabled, !0);
          });
    }
    enableCartButtons() {
      const e = this.cart.querySelectorAll("input"),
        t = this.cart.querySelectorAll(`button, ${selectors$V.cartItemRemove}`);
      e.length &&
        e.forEach((e) => {
          e.classList.remove(classes$H.disabled), (e.disabled = !1);
        }),
        t.length &&
          t.forEach((e) => {
            e.removeAttribute(attributes$m.disabled);
          }),
        this.cart.classList.remove(classes$H.loading);
    }
    updateErrorText(e) {
      this.cartErrorHolder.querySelector(selectors$V.errorMessage).innerText = e;
    }
    toggleErrorMessage() {
      this.cartErrorHolder && (this.cartErrorHolder.classList.toggle(classes$H.expanded, this.cartUpdateFailed), (this.cartUpdateFailed = !1));
    }
    cartErrorsHandler(e) {
      return e.ok
        ? e
        : e.json().then(function (t) {
            throw new FetchError({ status: e.statusText, headers: e.headers, json: t });
          });
    }
    addToCartError(e, t) {
      var s;
      if (this.hideErrors) return;
      if ((this.cartDrawerEnabled && this.closeCartDrawer(), null !== t)) {
        const s = t.closest(selectors$V.outerSection) || t.closest(selectors$V.quickAddHolder) || t.closest(selectors$V.quickAddModal);
        let i = null == s ? void 0 : s.querySelector(selectors$V.formErrorsContainer);
        const o = t.closest(selectors$V.quickAddHolder);
        o && o.querySelector(selectors$V.formErrorsContainer) && (i = o.querySelector(selectors$V.formErrorsContainer)),
          i &&
            ((i.innerHTML = `<div class="errors">${e.message}: ${e.description}<button type="button" class="errors__close" data-close-error><svg aria-hidden="true" focusable="false" role="presentation" width="24px" height="24px" stroke-width="1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" class="icon icon-cancel"><path d="M6.758 17.243L12.001 12m5.243-5.243L12 12m0 0L6.758 6.757M12.001 12l5.243 5.243" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"></path></svg></button></div>`),
            i.classList.add(classes$H.visible),
            this.formErrorsEvents(i)),
          t.dispatchEvent(new CustomEvent("theme:product:add-error", { detail: { response: e, button: t }, bubbles: !0 }));
      }
      const i = null == t ? void 0 : t.closest(selectors$V.quickAddHolder);
      i && i.dispatchEvent(new CustomEvent("theme:cart:error", { bubbles: !0, detail: { message: e.message, description: e.description, holder: i } })), null === (s = this.cart) || void 0 === s || s.classList.remove(classes$H.loading);
    }
    productAddCallback(e) {
      let t = [],
        s = null;
      const i = "theme:product:add-error" == e.type,
        o = e.detail.button,
        r = document.querySelector(selectors$V.cartBarAdd);
      t.push(o),
        (s = o.closest(selectors$V.quickAddHolder)),
        r && t.push(r),
        t.forEach((e) => {
          e.classList.remove(classes$H.loading), i || e.classList.add(classes$H.added);
        }),
        setTimeout(() => {
          t.forEach((e) => {
            var t, s;
            e.classList.remove(classes$H.added);
            (null === (t = e.closest(selectors$V.formWrapper)) || void 0 === t ? void 0 : t.classList.contains(classes$H.variantSoldOut)) ||
              (null === (s = e.closest(selectors$V.formWrapper)) || void 0 === s ? void 0 : s.classList.contains(classes$H.variantUnavailable)) ||
              (e.disabled = !1);
          }),
            null == s || s.classList.remove(classes$H.visible);
        }, 1e3);
    }
    openCartDrawerOnProductAdded() {
      this.cartDrawerIsOpen ? this.showAnimatedItems() : this.openCartDrawer();
    }
    openCartDrawer() {
      this.cartDrawer &&
        ((this.cartDrawerIsOpen = !0),
        (this.onBodyClickEvent = this.onBodyClickEvent || this.onBodyClick.bind(this)),
        document.body.addEventListener("click", this.onBodyClickEvent),
        document.dispatchEvent(new CustomEvent("theme:cart:open", { bubbles: !0 })),
        document.dispatchEvent(new CustomEvent("theme:scroll:lock", { bubbles: !0 })),
        this.cartDrawer.classList.add(classes$H.open),
        this.observeAdditionalCheckoutButtons(),
        setTimeout(this.showAnimatedItems),
        this.accessibility.trapFocus(this.cartDrawer, { elementToFocus: this.cartDrawer.querySelector(selectors$V.cartDrawerClose) }));
    }
    closeCartDrawer() {
      this.cartDrawer &&
        this.cartDrawer.classList.contains(classes$H.open) &&
        ((this.cartDrawerIsOpen = !1),
        document.dispatchEvent(new CustomEvent("theme:cart:close", { bubbles: !0 })),
        this.resetAnimatedItems(),
        this.itemsHolder.classList.remove(classes$H.updated),
        this.cartEmpty.classList.remove(classes$H.updated),
        this.cartErrorHolder.classList.remove(classes$H.expanded),
        this.cartDrawer.querySelectorAll(selectors$V.animation).forEach((e) => {
          const t = () => {
            e.classList.remove(classes$H.hiding), e.removeEventListener("animationend", t);
          };
          e.classList.add(classes$H.hiding), e.addEventListener("animationend", t);
        }),
        this.cartDrawer.classList.remove(classes$H.open),
        this.accessibility.removeTrapFocus(),
        document.body.removeEventListener("click", this.onBodyClickEvent),
        document.dispatchEvent(new CustomEvent("theme:scroll:unlock", { bubbles: !0 })));
    }
    toggleCartDrawer() {
      this.cartDrawerIsOpen ? this.closeCartDrawer() : this.openCartDrawer();
    }
    cartToggleEvents() {
      this.cartDrawer &&
        (this.cartDrawerClose.addEventListener("click", (e) => {
          e.preventDefault(), this.closeCartDrawer();
        }),
        this.cartDrawer.addEventListener("keyup", (e) => {
          e.code === window.theme.keyboardKeys.ESCAPE && this.closeCartDrawer();
        }));
    }
    onBodyClick(e) {
      e.target.hasAttribute(attributes$m.drawerUnderlay) && this.closeCartDrawer();
    }
    toggleClassesOnContainers() {
      const e = this.hasItemsInCart();
      this.cartEmpty.classList.toggle(classes$H.hidden, e), this.buttonHolder.classList.toggle(classes$H.hidden, !e), this.itemsHolder.classList.toggle(classes$H.hidden, !e);
    }
    build(e) {
      const t = e.querySelector(selectors$V.apiLineItems),
        s = e.querySelector(selectors$V.apiUpsellItems),
        i = Boolean(null === t && null === s),
        o = e.querySelector(selectors$V.apiCartPrice),
        r = e.querySelector(selectors$V.cartTotal);
      this.priceHolder && o && (this.priceHolder.innerHTML = o.innerHTML),
        i
          ? ((this.itemsHolder.innerHTML = e), (this.upsellProductsHolder.innerHTML = ""))
          : ((this.itemsHolder.innerHTML = t.innerHTML), (this.upsellProductsHolder.innerHTML = s.innerHTML), this.skipUpsellProductEvent(), this.checkSkippedUpsellProductsFromStorage(), this.toggleCartUpsellWidgetVisibility()),
        (this.newTotalItems = t && t.querySelectorAll(selectors$V.item).length ? t.querySelectorAll(selectors$V.item).length : 0),
        (this.subtotal = r && r.hasAttribute(attributes$m.cartTotal) ? parseInt(r.getAttribute(attributes$m.cartTotal)) : 0),
        (this.cartCount = this.getCartItemCount()),
        document.dispatchEvent(new CustomEvent("theme:cart:change", { bubbles: !0, detail: { cartCount: this.cartCount } })),
        (this.cartTotal.innerHTML = 0 === this.subtotal ? window.theme.strings.free : themeCurrency.formatMoney(this.subtotal, theme.moneyWithCurrencyFormat)),
        this.cart.classList.remove(classes$H.loading),
        this.totalItems !== this.newTotalItems && ((this.totalItems = this.newTotalItems), this.toggleClassesOnContainers()),
        this.cartDrawerIsOpen && this.itemsHolder.classList.add(classes$H.updated),
        this.hasItemsInCart() ||
          this.cartEmpty.querySelectorAll(selectors$V.animation).forEach((e) => {
            e.classList.remove(classes$H.animated);
          }),
        this.freeShippingMessageHandle(this.subtotal),
        this.cartEvents(),
        this.initQuantity(),
        this.toggleErrorMessage(),
        this.enableCartButtons(),
        this.updateProgress(),
        document.dispatchEvent(new CustomEvent("theme:product:added", { bubbles: !0 })),
        this.cartDrawer || this.showAnimatedItems();
    }
    getCartItemCount() {
      return Array.from(this.cart.querySelectorAll(selectors$V.qtyInput)).reduce((e, t) => e + parseInt(t.value), 0);
    }
    hasItemsInCart() {
      return this.totalItems > 0;
    }
    freeShippingMessageHandle(e) {
      this.freeShipping.length &&
        ((this.cartFreeShippingLimit = 100 * Number(this.freeShipping[0].getAttribute(attributes$m.freeShippingLimit)) * window.Shopify.currency.rate),
        this.freeShipping.forEach((t) => {
          const s = t.hasAttribute(attributes$m.freeShipping) && "true" === t.getAttribute(attributes$m.freeShipping) && e >= 0;
          t.classList.toggle(classes$H.success, s && e >= this.cartFreeShippingLimit);
        }));
    }
    updateProgress() {
      if (((this.freeShipping = document.querySelectorAll(selectors$V.freeShipping)), !this.freeShipping.length)) return;
      const e = isNaN(this.subtotal / this.cartFreeShippingLimit) ? 100 : this.subtotal / this.cartFreeShippingLimit,
        t = Math.min(100 * e, 100),
        s = this.circumference - ((t / 100) * this.circumference) / 2,
        i = themeCurrency.formatMoney(this.cartFreeShippingLimit - this.subtotal, theme.moneyFormat);
      this.freeShipping.forEach((e) => {
        const o = e.querySelector(selectors$V.freeShippingProgress),
          r = e.querySelector(selectors$V.freeShippingGraph),
          a = e.querySelector(selectors$V.leftToSpend);
        a && (a.innerHTML = i.replace(".00", "").replace(",00", "")), o && (o.value = t), r && r.style.setProperty("--stroke-dashoffset", `${s}`);
      });
    }
    skipUpsellProductEvent() {
      if (null === this.upsellProductsHolder) return;
      const e = this.upsellProductsHolder.querySelectorAll(selectors$V.buttonSkipUpsellProduct);
      e.length &&
        e.forEach((e) => {
          e.addEventListener("click", (t) => {
            t.preventDefault();
            const s = e.closest(selectors$V.quickAddHolder).getAttribute(attributes$m.quickAddHolder);
            this.skipUpsellProductsArray.includes(s) || this.skipUpsellProductsArray.push(s),
              window.sessionStorage.setItem("skip_upsell_products", this.skipUpsellProductsArray),
              this.removeUpsellProduct(s),
              this.toggleCartUpsellWidgetVisibility();
          });
        });
    }
    checkSkippedUpsellProductsFromStorage() {
      const e = window.sessionStorage.getItem("skip_upsell_products");
      if (!e) return;
      e.split(",").forEach((e) => {
        this.skipUpsellProductsArray.includes(e) || this.skipUpsellProductsArray.push(e), this.removeUpsellProduct(e);
      });
    }
    removeUpsellProduct(e) {
      if (!this.upsellProductsHolder) return;
      const t = this.upsellProductsHolder.querySelector(`[${attributes$m.quickAddHolder}="${e}"]`);
      t && t.parentNode.remove();
    }
    toggleCartUpsellWidgetVisibility() {
      if (!this.upsellProductsHolder) return;
      const e = this.upsellProductsHolder.querySelectorAll(selectors$V.quickAddHolder),
        t = this.upsellProductsHolder.closest(selectors$V.upsellWidget);
      t && t.classList.toggle(classes$H.hidden, !e.length);
    }
    observeAdditionalCheckoutButtons() {
      const e = this.cartDrawer.querySelector(selectors$V.additionalCheckoutButtons);
      if (e) {
        const t = new MutationObserver(() => {
          this.accessibility.trapFocus(this.cartDrawer, { elementToFocus: this.cartDrawer.querySelector(selectors$V.cartDrawerClose) }), t.disconnect();
        });
        t.observe(e, { subtree: !0, childList: !0 });
      }
    }
    resetAnimatedItems() {
      this.cart.querySelectorAll(selectors$V.animation).forEach((e) => {
        e.classList.remove(classes$H.animated), e.classList.remove(classes$H.hiding);
      });
    }
    showAnimatedItems() {
      requestAnimationFrame(this.animateItems);
    }
    animateItems() {
      this.cart.querySelectorAll(selectors$V.animation).forEach((e) => {
        e.classList.add(classes$H.animated);
      });
    }
    constructor() {
      window.location.pathname.endsWith("/password") || this.init();
    }
  };
  window.cart = new CartDrawer();
  const classes$G = { focus: "is-focused" },
    selectors$U = { inPageLink: "[data-skip-content]", linkesWithOnlyHash: 'a[href="#"]' };
  let Accessibility = class {
    init() {
      (this.a11y = a11y),
        (this.html = document.documentElement),
        (this.body = document.body),
        (this.inPageLink = document.querySelector(selectors$U.inPageLink)),
        (this.linkesWithOnlyHash = document.querySelectorAll(selectors$U.linkesWithOnlyHash)),
        this.a11y.focusHash(),
        this.a11y.bindInPageLinks(),
        this.clickEvents(),
        this.focusEvents();
    }
    clickEvents() {
      this.inPageLink &&
        this.inPageLink.addEventListener("click", (e) => {
          e.preventDefault();
        }),
        this.linkesWithOnlyHash &&
          this.linkesWithOnlyHash.forEach((e) => {
            e.addEventListener("click", (e) => {
              e.preventDefault();
            });
          });
    }
    focusEvents() {
      document.addEventListener("mousedown", () => {
        this.body.classList.remove(classes$G.focus);
      }),
        document.addEventListener("keyup", (e) => {
          e.code === window.theme.keyboardKeys.TAB && this.body.classList.add(classes$G.focus);
        });
    }
    constructor() {
      this.init();
    }
  };
  window.accessibility = new Accessibility();
  const selectors$T = { inputSearch: 'input[type="search"]' };
  let MainSearch = class extends HeaderSearchForm {
    setupEventListeners() {
      let e = [];
      this.allSearchInputs.forEach((t) => e.push(t.form)),
        this.input.addEventListener("focus", this.onInputFocus.bind(this)),
        e.length < 2 || (e.forEach((e) => e.addEventListener("reset", this.onFormReset.bind(this))), this.allSearchInputs.forEach((e) => e.addEventListener("input", this.onInput.bind(this))));
    }
    onFormReset(e) {
      super.onFormReset(e), super.shouldResetForm() && this.keepInSync("", this.input);
    }
    onInput(e) {
      const t = e.target;
      this.keepInSync(t.value, t);
    }
    onInputFocus() {
      isDesktop() || this.scrollIntoView({ behavior: "smooth" });
    }
    keepInSync(e, t) {
      this.allSearchInputs.forEach((s) => {
        s !== t && (s.value = e);
      });
    }
    constructor() {
      super(), (this.allSearchInputs = document.querySelectorAll(selectors$T.inputSearch)), this.setupEventListeners();
    }
  };
  customElements.define("main-search", MainSearch);
  const selectors$S = { details: "details", popdown: "[data-popdown]", popdownClose: "[data-popdown-close]", popdownToggle: "[data-popdown-toggle]", input: 'input:not([type="hidden"])' },
    attributes$l = { popdownUnderlay: "data-popdown-underlay" };
  let SearchPopdown = class extends HTMLElement {
    connectedCallback() {
      this.popdownContainer.addEventListener("keyup", (e) => "ESCAPE" === e.code.toUpperCase() && this.close()),
        this.popdownClose.addEventListener("click", this.close.bind(this)),
        this.popdownToggle.addEventListener("click", this.onPopdownToggleClick.bind(this)),
        this.popdownToggle.setAttribute("role", "button"),
        this.popdown.addEventListener("transitionend", (e) => {
          "visibility" == e.propertyName && this.popdownContainer.hasAttribute("open") && "false" == this.popdownContainer.getAttribute("open") && this.popdownContainer.removeAttribute("open");
        });
    }
    onPopdownToggleClick(e) {
      e.preventDefault(), e.target.closest(selectors$S.details).hasAttribute("open") ? this.close() : this.open(e);
    }
    onBodyClick(e) {
      (this.contains(e.target) && !e.target.hasAttribute(attributes$l.popdownUnderlay)) || this.close();
    }
    open(e) {
      (this.onBodyClickEvent = this.onBodyClickEvent || this.onBodyClick.bind(this)),
        e.target.closest(selectors$S.details).setAttribute("open", ""),
        document.body.addEventListener("click", this.onBodyClickEvent),
        document.dispatchEvent(new CustomEvent("theme:scroll:lock", { bubbles: !0 })),
        requestAnimationFrame(() => {
          e.target.closest(selectors$S.details).setAttribute("open", "true"), this.a11y.trapFocus(this.popdown, { elementToFocus: this.popdown.querySelector(selectors$S.input) });
        });
    }
    close() {
      this.a11y.removeTrapFocus(), this.popdownContainer.setAttribute("open", "false"), document.body.removeEventListener("click", this.onBodyClickEvent), document.dispatchEvent(new CustomEvent("theme:scroll:unlock", { bubbles: !0 }));
    }
    constructor() {
      super(),
        (this.popdown = this.querySelector(selectors$S.popdown)),
        (this.popdownContainer = this.querySelector(selectors$S.details)),
        (this.popdownToggle = this.querySelector(selectors$S.popdownToggle)),
        (this.popdownClose = this.querySelector(selectors$S.popdownClose)),
        (this.a11y = a11y);
    }
  };
  customElements.define("header-search-popdown", SearchPopdown);
  const selectors$R = { collapsible: "[data-collapsible]", trigger: "[data-collapsible-trigger]", body: "[data-collapsible-body]", content: "[data-collapsible-content]" },
    attributes$k = { open: "open", single: "single" };
  let CollapsibleElements = class extends HTMLElement {
    connectedCallback() {
      this.collapsibles.forEach((e) => {
        const t = e.querySelector(selectors$R.trigger),
          s = e.querySelector(selectors$R.body);
        t.addEventListener("click", (e) => this.onCollapsibleClick(e)),
          s.addEventListener("transitionend", (t) => {
            t.target === s && ("true" == e.getAttribute(attributes$k.open) && this.setBodyHeight(s, "auto"), "false" == e.getAttribute(attributes$k.open) && (e.removeAttribute(attributes$k.open), this.setBodyHeight(s, "")));
          });
      });
    }
    open(e) {
      if ("true" == e.getAttribute("open")) return;
      const t = e.querySelector(selectors$R.body),
        s = e.querySelector(selectors$R.content);
      e.setAttribute("open", !0), this.setBodyHeight(t, s.offsetHeight);
    }
    close(e) {
      if (!e.hasAttribute("open")) return;
      const t = e.querySelector(selectors$R.body),
        s = e.querySelector(selectors$R.content);
      this.setBodyHeight(t, s.offsetHeight),
        e.setAttribute("open", !1),
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            this.setBodyHeight(t, 0);
          });
        });
    }
    setBodyHeight(e, t) {
      e.style.height = "auto" !== t && "" !== t ? `${t}px` : t;
    }
    onCollapsibleClick(e) {
      e.preventDefault();
      const t = (e.target.matches(selectors$R.trigger) ? e.target : e.target.closest(selectors$R.trigger)).closest(selectors$R.collapsible);
      this.single &&
        this.collapsibles.forEach((e) => {
          e.hasAttribute(attributes$k.open) &&
            e != t &&
            requestAnimationFrame(() => {
              this.close(e);
            });
        }),
        t.hasAttribute(attributes$k.open) ? this.close(t) : this.open(t),
        t.dispatchEvent(new CustomEvent("theme:form:sticky", { bubbles: !0, detail: { element: "accordion" } }));
    }
    constructor() {
      super(), (this.collapsibles = this.querySelectorAll(selectors$R.collapsible)), (this.single = this.hasAttribute(attributes$k.single));
    }
  };
  customElements.get("collapsible-elements") || customElements.define("collapsible-elements", CollapsibleElements),
    (theme.ProductModel = (function () {
      let e = {},
        t = {},
        s = {};
      const i = "[data-product-single-media-wrapper]",
        o = "[data-product-slideshow]",
        r = "[data-shopify-xr]",
        a = "data-media-id",
        n = "data-shopify-model3d-id",
        l = "#ModelJson-",
        c = "media--hidden",
        d = "[data-deferred-media]",
        h = "[data-deferred-media-button]",
        u = "is-loading";
      function p(e, i) {
        if (e.querySelector(d).getAttribute("loaded")) return;
        e.classList.add(u);
        const a = document.createElement("div");
        a.appendChild(e.querySelector("template").content.firstElementChild.cloneNode(!0));
        const n = a.querySelector("model-viewer"),
          l = e.querySelector(d);
        l.appendChild(n).focus(), l.setAttribute("loaded", !0);
        const c = e.dataset.mediaId,
          h = n.dataset.modelId,
          p = e.closest(o).parentElement.querySelector(r);
        (s[i] = { element: p, defaultId: h }),
          (t[c] = { modelId: h, mediaId: c, sectionId: i, container: e, element: n }),
          window.Shopify.loadFeatures([
            { name: "shopify-xr", version: "1.0", onLoad: m },
            { name: "model-viewer-ui", version: "1.0", onLoad: g },
          ]);
      }
      function m(t) {
        if (t) console.warn(t);
        else if (window.ShopifyXR) {
          for (const t in e)
            if (e.hasOwnProperty(t)) {
              const s = e[t];
              if (s.loaded) continue;
              const i = document.querySelector(`${l}${t}`);
              i && (window.ShopifyXR.addModels(JSON.parse(i.innerHTML)), (s.loaded = !0));
            }
          window.ShopifyXR.setupXRElements();
        } else
          document.addEventListener("shopify_xr_initialized", function () {
            m();
          });
      }
      function g(e) {
        if (e) console.warn(e);
        else
          for (const e in t)
            if (t.hasOwnProperty(e)) {
              const s = t[e];
              s.modelViewerUi || (s.modelViewerUi = new Shopify.ModelViewerUI(s.element)), b(s);
            }
      }
      function b(e) {
        const t = s[e.sectionId];
        e.container.addEventListener("theme:media:visible", function () {
          t.element.setAttribute(n, e.modelId), y(e.mediaId), window.theme.touch || e.modelViewerUi.play();
        }),
          e.container.addEventListener("theme:media:hidden", function () {
            e.modelViewerUi.pause();
          }),
          e.container.addEventListener("xrLaunch", function () {
            e.modelViewerUi.pause();
          }),
          e.element.addEventListener("load", () => {
            e.container.classList.remove(u), y(e.mediaId);
          }),
          e.element.addEventListener("shopify_model_viewer_ui_toggle_play", function () {
            y(e.mediaId);
          });
      }
      function y(e) {
        const t = `[${a}="${e}"]`,
          s = document.querySelector(`${i}${t}`),
          o = document.querySelectorAll(`${i}:not(${t})`);
        s.classList.remove(c),
          o.length &&
            o.forEach((e) => {
              e.dispatchEvent(new CustomEvent("theme:media:hidden")), e.classList.add(c);
            });
      }
      return {
        init: function (t, s) {
          e[s] = { loaded: !1 };
          const i = t.querySelector(h);
          i && i.addEventListener("click", p.bind(this, t, s));
        },
        loadContent: p,
        removeSectionModels: function (s) {
          for (const e in t)
            if (t.hasOwnProperty(e)) {
              t[e].sectionId === s && delete t[e];
            }
          delete e[s], delete theme.mediaInstances[s];
        },
      };
    })());
  const selectors$Q = {
      templateAddresses: ".template-addresses",
      addressNewForm: "#AddressNewForm",
      btnNew: ".address-new-toggle",
      btnEdit: ".address-edit-toggle",
      btnDelete: ".address-delete",
      dataFormId: "data-form-id",
      dataConfirmMessage: "data-confirm-message",
      editAddress: "#EditAddress",
      addressCountryNew: "AddressCountryNew",
      addressProvinceNew: "AddressProvinceNew",
      addressProvinceContainerNew: "AddressProvinceContainerNew",
      addressCountryOption: ".address-country-option",
      addressCountry: "AddressCountry",
      addressProvince: "AddressProvince",
      addressProvinceContainer: "AddressProvinceContainer",
    },
    classes$F = { hidden: "hidden" };
  let Addresses = class {
    init() {
      if (this.addressNewForm) {
        const e = this.section,
          t = this.addressNewForm;
        this.customerAddresses();
        const s = e.querySelectorAll(selectors$Q.btnNew);
        s.length &&
          s.forEach((e) => {
            e.addEventListener("click", function () {
              t.classList.toggle(classes$F.hidden);
            });
          });
        const i = e.querySelectorAll(selectors$Q.btnEdit);
        i.length &&
          i.forEach((t) => {
            t.addEventListener("click", function () {
              const t = this.getAttribute(selectors$Q.dataFormId);
              e.querySelector(`${selectors$Q.editAddress}_${t}`).classList.toggle(classes$F.hidden);
            });
          });
        const o = e.querySelectorAll(selectors$Q.btnDelete);
        o.length &&
          o.forEach((e) => {
            e.addEventListener("click", function () {
              const e = this.getAttribute(selectors$Q.dataFormId),
                t = this.getAttribute(selectors$Q.dataConfirmMessage);
              confirm(t) && Shopify.postLink(window.theme.routes.addresses_url + "/" + e, { parameters: { _method: "delete" } });
            });
          });
      }
    }
    customerAddresses() {
      Shopify.CountryProvinceSelector && new Shopify.CountryProvinceSelector(selectors$Q.addressCountryNew, selectors$Q.addressProvinceNew, { hideElement: selectors$Q.addressProvinceContainerNew });
      this.section.querySelectorAll(selectors$Q.addressCountryOption).forEach((e) => {
        const t = e.getAttribute(selectors$Q.dataFormId),
          s = `${selectors$Q.addressCountry}_${t}`,
          i = `${selectors$Q.addressProvince}_${t}`,
          o = `${selectors$Q.addressProvinceContainer}_${t}`;
        new Shopify.CountryProvinceSelector(s, i, { hideElement: o });
      });
    }
    constructor(e) {
      (this.section = e), (this.addressNewForm = this.section.querySelector(selectors$Q.addressNewForm)), this.init();
    }
  };
  const template$1 = document.querySelector(selectors$Q.templateAddresses);
  template$1 && new Addresses(template$1);
  const selectors$P = { accountTemplateLogged: ".customer-logged-in", account: ".account", accountSidebarMobile: ".account-sidebar--mobile" };
  let Account = class {
    init() {
      this.section.querySelector(selectors$P.account) && this.accountMobileSidebar();
    }
    accountMobileSidebar() {
      this.section.querySelector(selectors$P.accountSidebarMobile) &&
        this.section.querySelector(selectors$P.accountSidebarMobile).addEventListener("click", function () {
          const e = this.nextElementSibling;
          e && "UL" === e.tagName && e.classList.toggle("visible");
        });
    }
    constructor(e) {
      (this.section = e), this.init();
    }
  };
  const template = document.querySelector(selectors$P.accountTemplateLogged);
  template && new Account(template);
  const selectors$O = {
    form: "[data-account-form]",
    showReset: "[data-show-reset]",
    hideReset: "[data-hide-reset]",
    recover: "[data-recover-password]",
    recoverSuccess: "[data-recover-success]",
    login: "[data-login-form]",
    recoverHash: "#recover",
    hideClass: "is-hidden",
  };
  let Login = class {
    init() {
      window.location.hash == selectors$O.recoverHash || this.recoverSuccess ? this.showRecoverPasswordForm() : this.hideRecoverPasswordForm(),
        this.showButton.addEventListener(
          "click",
          function (e) {
            e.preventDefault(), this.showRecoverPasswordForm();
          }.bind(this),
          !1
        ),
        this.hideButton.addEventListener(
          "click",
          function (e) {
            e.preventDefault(), this.hideRecoverPasswordForm();
          }.bind(this),
          !1
        );
    }
    showRecoverPasswordForm() {
      return this.login.classList.add(selectors$O.hideClass), this.recover.classList.remove(selectors$O.hideClass), (window.location.hash = selectors$O.recoverHash), !1;
    }
    hideRecoverPasswordForm() {
      return this.recover.classList.add(selectors$O.hideClass), this.login.classList.remove(selectors$O.hideClass), (window.location.hash = ""), !1;
    }
    constructor(e) {
      (this.form = e),
        (this.showButton = e.querySelector(selectors$O.showReset)),
        (this.hideButton = e.querySelector(selectors$O.hideReset)),
        (this.recover = e.querySelector(selectors$O.recover)),
        (this.recoverSuccess = e.querySelector(selectors$O.recoverSuccess)),
        (this.login = e.querySelector(selectors$O.login)),
        this.init();
    }
  };
  const loginForm = document.querySelector(selectors$O.form);
  loginForm && new Login(loginForm),
    (window.Shopify = window.Shopify || {}),
    (window.Shopify.theme = window.Shopify.theme || {}),
    (window.Shopify.theme.sections = window.Shopify.theme.sections || {}),
    (window.Shopify.theme.sections.registered = window.Shopify.theme.sections.registered || {}),
    (window.Shopify.theme.sections.instances = window.Shopify.theme.sections.instances || []);
  const registered = window.Shopify.theme.sections.registered,
    instances = window.Shopify.theme.sections.instances,
    selectors$N = { id: "data-section-id", type: "data-section-type" };
  let Registration = class {
      getStack() {
        return this.callStack;
      }
      constructor(e = null, t = []) {
        (this.type = e),
          (this.components = validateComponentsArray(t)),
          (this.callStack = { onLoad: [], onUnload: [], onSelect: [], onDeselect: [], onBlockSelect: [], onBlockDeselect: [], onReorder: [] }),
          t.forEach((e) => {
            for (const [t, s] of Object.entries(e)) {
              const e = this.callStack[t];
              Array.isArray(e) && "function" == typeof s ? e.push(s) : (console.warn(`Unregisted function: '${t}' in component: '${this.type}'`), console.warn(s));
            }
          });
      }
    },
    Section = class {
      callFunctions(e, t = null) {
        this.callStack[e].forEach((e) => {
          const s = { id: this.id, type: this.type, container: this.container };
          t ? e.call(s, t) : e.call(s);
        });
      }
      onLoad() {
        this.callFunctions("onLoad");
      }
      onUnload() {
        this.callFunctions("onUnload");
      }
      onSelect(e) {
        this.callFunctions("onSelect", e);
      }
      onDeselect(e) {
        this.callFunctions("onDeselect", e);
      }
      onBlockSelect(e) {
        this.callFunctions("onBlockSelect", e);
      }
      onBlockDeselect(e) {
        this.callFunctions("onBlockDeselect", e);
      }
      onReorder(e) {
        this.callFunctions("onReorder", e);
      }
      constructor(e, t) {
        (this.container = validateContainerElement(e)), (this.id = e.getAttribute(selectors$N.id)), (this.type = t.type), (this.callStack = t.getStack());
        try {
          this.onLoad();
        } catch (e) {
          console.warn(`Error in section: ${this.id}`), console.warn(this), console.warn(e);
        }
      }
    };
  function validateContainerElement(e) {
    if (!(e instanceof Element)) throw new TypeError("Theme Sections: Attempted to load section. The section container provided is not a DOM element.");
    if (null === e.getAttribute(selectors$N.id)) throw new Error("Theme Sections: The section container provided does not have an id assigned to the " + selectors$N.id + " attribute.");
    return e;
  }
  function validateComponentsArray(e) {
    if ((void 0 !== e && "object" != typeof e) || null === e) throw new TypeError("Theme Sections: The components object provided is not a valid");
    return e;
  }
  function register(e, t) {
    if ("string" != typeof e) throw new TypeError("Theme Sections: The first argument for .register must be a string that specifies the type of the section being registered");
    if (void 0 !== registered[e]) throw new Error('Theme Sections: A section of type "' + e + '" has already been registered. You cannot register the same section type twice');
    Array.isArray(t) || (t = [t]);
    const s = new Registration(e, t);
    return (registered[e] = s), registered;
  }
  function load(e, t) {
    (e = normalizeType(e)),
      void 0 === t && (t = document.querySelectorAll("[" + selectors$N.type + "]")),
      (t = normalizeContainers(t)),
      e.forEach(function (e) {
        const s = registered[e];
        void 0 !== s &&
          (t = t.filter(function (t) {
            return !isInstance(t) && null !== t.getAttribute(selectors$N.type) && (t.getAttribute(selectors$N.type) !== e || (instances.push(new Section(t, s)), !1));
          }));
      });
  }
  function reorder(e) {
    getInstances(e).forEach(function (e) {
      e.onReorder();
    });
  }
  function unload(e) {
    getInstances(e).forEach(function (e) {
      var t = instances
        .map(function (e) {
          return e.id;
        })
        .indexOf(e.id);
      instances.splice(t, 1), e.onUnload();
    });
  }
  function getInstances(e) {
    var t = [];
    if (NodeList.prototype.isPrototypeOf(e) || Array.isArray(e)) var s = e[0];
    if (e instanceof Element || s instanceof Element)
      normalizeContainers(e).forEach(function (e) {
        t = t.concat(
          instances.filter(function (t) {
            return t.container === e;
          })
        );
      });
    else if ("string" == typeof e || "string" == typeof s) {
      normalizeType(e).forEach(function (e) {
        t = t.concat(
          instances.filter(function (t) {
            return t.type === e;
          })
        );
      });
    }
    return t;
  }
  function getInstanceById(e) {
    for (var t, s = 0; s < instances.length; s++)
      if (instances[s].id === e) {
        t = instances[s];
        break;
      }
    return t;
  }
  function isInstance(e) {
    return getInstances(e).length > 0;
  }
  function normalizeType(e) {
    return (
      "*" === e
        ? (e = Object.keys(registered))
        : "string" == typeof e
        ? (e = [e])
        : e.constructor === Section
        ? (e = [e.prototype.type])
        : Array.isArray(e) &&
          e[0].constructor === Section &&
          (e = e.map(function (e) {
            return e.type;
          })),
      (e = e.map(function (e) {
        return e.toLowerCase();
      }))
    );
  }
  function normalizeContainers(e) {
    return (
      NodeList.prototype.isPrototypeOf(e) && e.length > 0 ? (e = Array.prototype.slice.call(e)) : (NodeList.prototype.isPrototypeOf(e) && 0 === e.length) || null === e ? (e = []) : !Array.isArray(e) && e instanceof Element && (e = [e]), e
    );
  }
  window.Shopify.designMode &&
    (document.addEventListener("shopify:section:load", function (e) {
      var t = e.detail.sectionId,
        s = e.target.querySelector("[" + selectors$N.id + '="' + t + '"]');
      null !== s && load(s.getAttribute(selectors$N.type), s);
    }),
    document.addEventListener("shopify:section:reorder", function (e) {
      var t = e.detail.sectionId,
        s = e.target.querySelector("[" + selectors$N.id + '="' + t + '"]');
      "object" == typeof getInstances(s)[0] && reorder(s);
    }),
    document.addEventListener("shopify:section:unload", function (e) {
      var t = e.detail.sectionId,
        s = e.target.querySelector("[" + selectors$N.id + '="' + t + '"]');
      "object" == typeof getInstances(s)[0] && unload(s);
    }),
    document.addEventListener("shopify:section:select", function (e) {
      var t = getInstanceById(e.detail.sectionId);
      "object" == typeof t && t.onSelect(e);
    }),
    document.addEventListener("shopify:section:deselect", function (e) {
      var t = getInstanceById(e.detail.sectionId);
      "object" == typeof t && t.onDeselect(e);
    }),
    document.addEventListener("shopify:block:select", function (e) {
      var t = getInstanceById(e.detail.sectionId);
      "object" == typeof t && t.onBlockSelect(e);
    }),
    document.addEventListener("shopify:block:deselect", function (e) {
      var t = getInstanceById(e.detail.sectionId);
      "object" == typeof t && t.onBlockDeselect(e);
    }));
  const throttle = (e, t) => {
      let s, i;
      return function o(...r) {
        const a = Date.now();
        (i = clearTimeout(i)), !s || a - s >= t ? (e.apply(null, r), (s = a)) : (i = setTimeout(o.bind(null, ...r), t - (a - s)));
      };
    },
    selectors$M = { tooltip: "data-tooltip", tooltipStopMouseEnter: "data-tooltip-stop-mouseenter" },
    classes$E = { tooltipDefault: "tooltip-default", visible: "is-visible", hiding: "is-hiding" };
  let sections$r = {},
    Tooltip = class {
      init() {
        if (!document.querySelector(`.${this.class}`)) {
          const e = `<div class="${this.class}__arrow"></div><div class="${this.class}__inner"><div class="${this.class}__text"></div></div>`,
            t = document.createElement("div");
          (t.className = this.class), (t.innerHTML = e), document.body.appendChild(t);
        }
        this.tooltip.addEventListener("mouseenter", this.addPinMouseEvent),
          this.tooltip.addEventListener("mouseleave", this.removePinMouseEvent),
          this.tooltip.addEventListener("theme:tooltip:init", this.addPinEvent),
          document.addEventListener("theme:tooltip:close", this.removePinEvent);
      }
      addPin(e = !1) {
        const t = document.querySelector(`.${this.class}`);
        if (t && ((e && !this.tooltip.hasAttribute(selectors$M.tooltipStopMouseEnter)) || !e)) {
          const e = t.querySelector(`.${this.class}__arrow`),
            s = t.querySelector(`.${this.class}__inner`);
          t.querySelector(`.${this.class}__text`).textContent = this.label;
          const i = s.offsetWidth,
            o = this.tooltip.getBoundingClientRect(),
            r = o.top,
            a = o.width,
            n = r + o.height + window.scrollY;
          let l = o.left - i / 2 + a / 2;
          const c = l + i - getWindowWidth();
          c > 0 && (l -= c),
            l < 0 && (l = 0),
            (e.style.left = `${o.left + a / 2}px`),
            t.style.setProperty("--tooltip-top", `${n}px`),
            (s.style.transform = `translateX(${l}px)`),
            t.classList.remove(classes$E.hiding),
            t.classList.add(classes$E.visible),
            document.addEventListener("theme:scroll", this.removePinEvent);
        }
      }
      removePin(e, t = !1, s = !1) {
        const i = document.querySelector(`.${this.class}`),
          o = i.classList.contains(classes$E.visible);
        i &&
          ((t && !this.tooltip.hasAttribute(selectors$M.tooltipStopMouseEnter)) || !t) &&
          (o &&
            (s || e.detail.hideTransition) &&
            (i.classList.add(classes$E.hiding),
            this.hideTransitionTimeout && clearTimeout(this.hideTransitionTimeout),
            (this.hideTransitionTimeout = setTimeout(() => {
              i.classList.remove(classes$E.hiding);
            }, this.transitionSpeed))),
          i.classList.remove(classes$E.visible),
          document.removeEventListener("theme:scroll", this.removePinEvent));
      }
      unload() {
        this.tooltip.removeEventListener("mouseenter", this.addPinMouseEvent),
          this.tooltip.removeEventListener("mouseleave", this.removePinMouseEvent),
          this.tooltip.removeEventListener("theme:tooltip:init", this.addPinEvent),
          document.removeEventListener("theme:tooltip:close", this.removePinEvent),
          document.removeEventListener("theme:scroll", this.removePinEvent);
      }
      constructor(e, t = {}) {
        (this.tooltip = e),
          this.tooltip.hasAttribute(selectors$M.tooltip) &&
            ((this.label = this.tooltip.getAttribute(selectors$M.tooltip)),
            (this.class = t.class || classes$E.tooltipDefault),
            (this.transitionSpeed = t.transitionSpeed || 200),
            (this.hideTransitionTimeout = 0),
            (this.addPinEvent = () => this.addPin()),
            (this.addPinMouseEvent = () => this.addPin(!0)),
            (this.removePinEvent = (e) => throttle(this.removePin(e), 50)),
            (this.removePinMouseEvent = (e) => this.removePin(e, !0, !0)),
            this.init());
      }
    };
  const tooltipSection = {
    onLoad() {
      sections$r[this.id] = [];
      this.container.querySelectorAll(`[${selectors$M.tooltip}]`).forEach((e) => {
        sections$r[this.id].push(new Tooltip(e));
      });
    },
    onUnload: function () {
      sections$r[this.id].forEach((e) => {
        "function" == typeof e.unload && e.unload();
      });
    },
  };
  var sections$q = {};
  const parallaxHero = {
    onLoad() {
      sections$q[this.id] = [];
      this.container.querySelectorAll("[data-parallax-wrapper]").forEach((e) => {
        const t = e.querySelector("[data-parallax-img]");
        sections$q[this.id].push(new Rellax(t, { center: !0, round: !0, frame: e }));
      }),
        window.addEventListener("load", () => {
          sections$q[this.id].forEach((e) => {
            "function" == typeof e.refresh && e.refresh();
          });
        });
    },
    onUnload: function () {
      sections$q[this.id].forEach((e) => {
        "function" == typeof e.destroy && e.destroy();
      });
    },
  };
  register("article", [tooltipSection, parallaxHero]);
  const selectors$L = {
      aos: "[data-aos]",
      collectionImage: ".collection-item__image",
      columnImage: "[data-column-image]",
      flickityNextArrow: ".flickity-button.next",
      flickityPrevArrow: ".flickity-button.previous",
      link: "a:not(.btn)",
      nextArrow: "[data-next-arrow]",
      prevArrow: "[data-prev-arrow]",
      productItemImage: ".product-item__image",
      slide: "[data-slide]",
      slideValue: "data-slide",
      slider: "[data-slider]",
      sliderThumb: "[data-slider-thumb]",
    },
    attributes$j = { arrowPositionMiddle: "data-arrow-position-middle", equalizeHeight: "data-equalize-height", slideIndex: "data-slide-index", sliderOptions: "data-options", slideTextColor: "data-slide-text-color" },
    classes$D = {
      aosAnimate: "aos-animate",
      desktop: "desktop",
      focused: "is-focused",
      flickityResize: "flickity-resize",
      flickityResizing: "flickity-resizing",
      flickityEnabled: "flickity-enabled",
      heroContentTransparent: "hero__content--transparent",
      initialized: "is-initialized",
      isLoading: "is-loading",
      isSelected: "is-selected",
      mobile: "mobile",
      sliderInitialized: "js-slider--initialized",
    },
    sections$p = {};
  let Slider = class {
    init() {
      this.slideshow.classList.add(classes$D.isLoading),
        (this.sliderOptions = {
          contain: !0,
          wrapAround: !0,
          adaptiveHeight: !0,
          ...this.customOptions,
          on: {
            ready: () => {
              requestAnimationFrame(() => {
                this.slideshow.classList.add(classes$D.initialized),
                  this.slideshow.classList.remove(classes$D.isLoading),
                  this.slideshow.parentNode.dispatchEvent(new CustomEvent("theme:slider:loaded", { bubbles: !0, detail: { slider: this } }));
              }),
                this.slideActions(),
                this.sliderOptions.prevNextButtons && this.positionArrows();
            },
            change: (e) => {
              const t = this.slideshowSlides[e];
              if (!t || this.sliderOptions.groupCells) return;
              const s = t.querySelectorAll(selectors$L.aos);
              s.length &&
                s.forEach((e) => {
                  e.classList.remove(classes$D.aosAnimate),
                    requestAnimationFrame(() => {
                      e.classList.add(classes$D.aosAnimate);
                    });
                });
            },
            resize: () => {
              this.sliderOptions.prevNextButtons && this.positionArrows();
            },
          },
        }),
        this.sliderOptions.fade && (this.flkty = new FlickityFade(this.slideshow, this.sliderOptions)),
        this.sliderOptions.fade || (this.flkty = new Flickity(this.slideshow, this.sliderOptions)),
        this.isHeightEqualized && this.equalizeHeight(),
        this.sliderPrev &&
          this.sliderPrev.addEventListener("click", (e) => {
            e.preventDefault(), this.flkty.previous(!0);
          }),
        this.sliderNext &&
          this.sliderNext.addEventListener("click", (e) => {
            e.preventDefault(), this.flkty.next(!0);
          }),
        this.flkty.on("change", () => this.slideActions(!0)),
        this.addRemoveSlidesForDevices(),
        document.addEventListener("theme:resize", this.addRemoveSlidesForDevicesOnResize),
        this.multipleSlides && document.addEventListener("theme:resize", this.sliderCallbackEventOnResize),
        this.sliderThumbs.length &&
          this.sliderThumbs.forEach((e) => {
            e.addEventListener("click", (t) => {
              t.preventDefault();
              const s = [...e.parentElement.children].indexOf(e);
              this.flkty.select(s);
            });
          }),
        this.container.addEventListener("theme:tab:change", this.resetSliderEvent);
    }
    resetSlider() {
      this.slideshow && (this.flkty && this.flkty.isActive ? this.flkty.select(0, !1, !0) : this.slideshow.scrollTo({ left: 0, behavior: "auto" }));
    }
    addRemoveSlidesForDevices() {
      if (
        ((this.hasDiffSlidesForMobileDesktop =
          Array.prototype.filter.call(this.slideshowSlides, (e) => {
            if (e.classList.contains(classes$D.desktop) || e.classList.contains(classes$D.mobile)) return e;
          }).length > 0),
        !this.hasDiffSlidesForMobileDesktop)
      )
        return;
      let e = null;
      (e = isDesktop() ? `${selectors$L.slide}.${classes$D.desktop}, ${selectors$L.slide}:not(.${classes$D.mobile})` : `${selectors$L.slide}.${classes$D.mobile}, ${selectors$L.slide}:not(.${classes$D.desktop})`),
        (this.flkty.options.cellSelector = e),
        this.flkty.selectCell(0, !1, !0),
        this.flkty.reloadCells(),
        this.flkty.reposition(),
        this.flkty.resize(),
        this.slideActions();
    }
    sliderCallbackEvent() {
      this.multipleSlides && (this.flkty.resize(), this.slideshow.classList.contains(classes$D.sliderInitialized) || this.flkty.select(0));
    }
    slideActions(e = !1) {
      const t = this.slideshow.querySelector(`.${classes$D.isSelected}`),
        s = t.getAttribute(attributes$j.slideTextColor),
        i = t.querySelector(selectors$L.link),
        o = this.slideshow.querySelectorAll(`${selectors$L.slide} a, ${selectors$L.slide} button`);
      if (
        (document.body.classList.contains(classes$D.focused) && i && this.sliderOptions.groupCells && e && i.focus(),
        o.length &&
          o.forEach((e) => {
            const t = e.closest(selectors$L.slide);
            if (t) {
              const s = t.classList.contains(classes$D.isSelected) ? 0 : -1;
              e.setAttribute("tabindex", s);
            }
          }),
        "rgba(0,0,0,0)" !== s && "" !== s && this.slideshow.style.setProperty("--text", s),
        this.sliderThumbs.length && this.sliderThumbs.length === this.slideshowSlides.length && t.hasAttribute(attributes$j.slideIndex))
      ) {
        const e = parseInt(t.getAttribute(attributes$j.slideIndex)),
          s = this.container.querySelector(`${selectors$L.sliderThumb}.${classes$D.isSelected}`);
        s && s.classList.remove(classes$D.isSelected), this.sliderThumbs[e].classList.add(classes$D.isSelected);
      }
    }
    positionArrows() {
      if (this.slideshow.hasAttribute(attributes$j.arrowPositionMiddle) && this.sliderOptions.prevNextButtons) {
        const e = this.slideshow.querySelector(selectors$L.collectionImage) || this.slideshow.querySelector(selectors$L.productItemImage) || this.slideshow.querySelector(selectors$L.columnImage);
        if (!e) return;
        (this.slideshow.querySelector(selectors$L.flickityPrevArrow).style.top = e.clientHeight / 2 + "px"), (this.slideshow.querySelector(selectors$L.flickityNextArrow).style.top = e.clientHeight / 2 + "px");
      }
    }
    equalizeHeight() {
      (Flickity.prototype._createResizeClass = function () {
        requestAnimationFrame(() => {
          this.element.classList.add(classes$D.flickityResize);
        });
      }),
        this.flkty._createResizeClass();
      const e = Flickity.prototype.resize;
      Flickity.prototype.resize = function () {
        this.element.classList.remove(classes$D.flickityResize),
          this.element.classList.add(classes$D.flickityResizing),
          e.call(this),
          requestAnimationFrame(() => {
            this.element.classList.add(classes$D.flickityResize), this.element.classList.remove(classes$D.flickityResizing);
          });
      };
    }
    onUnload() {
      this.multipleSlides && document.removeEventListener("theme:resize", this.sliderCallbackEventOnResize),
        this.slideshow && this.flkty && ((this.flkty.options.watchCSS = !1), this.flkty.destroy()),
        this.container.removeEventListener("theme:tab:change", this.resetSliderEvent),
        document.removeEventListener("theme:resize", this.addRemoveSlidesForDevicesOnResize);
    }
    onBlockSelect(e) {
      if (!this.slideshow) return;
      const t = this.slideshow.querySelector(`[${selectors$L.slideValue}="${e.detail.blockId}"]`);
      if (!t) return;
      let s = parseInt(t.getAttribute(attributes$j.slideIndex));
      this.multipleSlides && !this.slideshow.classList.contains(classes$D.sliderInitialized) && (s = 0),
        this.slideshow.classList.add(classes$D.isSelected),
        this.flkty && this.slideshow.classList.contains(classes$D.flickityEnabled) && (this.flkty.selectCell(s), this.flkty.stopPlayer());
    }
    onBlockDeselect() {
      this.slideshow && (this.slideshow.classList.remove(classes$D.isSelected), this.flkty && this.sliderOptions.hasOwnProperty("autoPlay") && this.sliderOptions.autoPlay && this.flkty.playPlayer());
    }
    constructor(e, t = null) {
      (this.container = e),
        (this.slideshow = t || this.container.querySelector(selectors$L.slider)),
        this.slideshow &&
          ((this.slideshowSlides = this.slideshow.querySelectorAll(selectors$L.slide)),
          this.slideshowSlides.length <= 1 ||
            ((this.sliderPrev = this.container.querySelector(selectors$L.prevArrow)),
            (this.sliderNext = this.container.querySelector(selectors$L.nextArrow)),
            (this.sliderThumbs = this.container.querySelectorAll(selectors$L.sliderThumb)),
            (this.multipleSlides = this.slideshow.hasAttribute(attributes$j.slidesLargeDesktop)),
            (this.isHeightEqualized = "true" === this.slideshow.getAttribute(attributes$j.equalizeHeight)),
            (this.sliderCallbackEventOnResize = () => this.sliderCallbackEvent()),
            (this.addRemoveSlidesForDevicesOnResize = () => this.addRemoveSlidesForDevices()),
            (this.resetSliderEvent = () => this.resetSlider()),
            this.slideshow.hasAttribute(attributes$j.sliderOptions) && (this.customOptions = JSON.parse(decodeURIComponent(this.slideshow.getAttribute(attributes$j.sliderOptions)))),
            (this.flkty = null),
            this.init()));
    }
  };
  const slider = {
    onLoad() {
      sections$p[this.id] = [];
      this.container.querySelectorAll(selectors$L.slider).forEach((e) => {
        sections$p[this.id].push(new Slider(this.container, e));
      });
    },
    onUnload() {
      sections$p[this.id].forEach((e) => {
        "function" == typeof e.onUnload && e.onUnload();
      });
    },
    onBlockSelect(e) {
      sections$p[this.id].forEach((t) => {
        "function" == typeof t.onBlockSelect && t.onBlockSelect(e);
      });
    },
    onBlockDeselect(e) {
      sections$p[this.id].forEach((t) => {
        "function" == typeof t.onBlockDeselect && t.onBlockDeselect(e);
      });
    },
  };
  register("blog-section", [slider]), register("hero", parallaxHero), register("double", slider);
  const selectors$K = { headerSticky: "[data-header-sticky]", headerHeight: "[data-header-height]" },
    scrollTo = (e) => {
      const t = document.querySelector(selectors$K.headerSticky) && document.querySelector(selectors$K.headerHeight) ? document.querySelector(selectors$K.headerHeight).getBoundingClientRect().height : 0;
      window.scrollTo({ top: e + window.scrollY - t, left: 0, behavior: "smooth" });
    };
  let PopupCookie = class {
    write() {
      ((-1 !== document.cookie.indexOf("; ") && !document.cookie.split("; ").find((e) => e.startsWith(this.name))) || -1 === document.cookie.indexOf("; ")) &&
        (document.cookie = `${this.name}=${this.value}; expires=${this.configuration.expires}; path=${this.configuration.path}; domain=${this.configuration.domain}; sameSite=${this.configuration.sameSite}; secure=${this.configuration.secure}`);
    }
    read() {
      if (-1 !== document.cookie.indexOf("; ") && document.cookie.split("; ").find((e) => e.startsWith(this.name))) {
        return document.cookie
          .split("; ")
          .find((e) => e.startsWith(this.name))
          .split("=")[1];
      }
      return !1;
    }
    destroy() {
      document.cookie.split("; ").find((e) => e.startsWith(this.name)) && (document.cookie = `${this.name}=null; expires=${this.configuration.expires}; path=${this.configuration.path}; domain=${this.configuration.domain}`);
    }
    constructor(e, t, s = 7) {
      const i = new Date(),
        o = new Date();
      o.setTime(i.getTime() + 864e5 * s), (this.configuration = { expires: o.toGMTString(), path: "/", domain: window.location.hostname, sameSite: "none", secure: !0 }), (this.name = e), (this.value = t);
    }
  };
  const selectors$J = { newsletterForm: "[data-newsletter-form]", newsletterHeading: "[data-newsletter-heading]", newsletterPopup: "[data-newsletter]" },
    classes$C = { success: "has-success", error: "has-error", hidden: "hidden" },
    attributes$i = { cookieNameAttribute: "data-cookie-name" },
    sections$o = {};
  let NewsletterCheckForResult = class {
    init() {
      this.newsletter.addEventListener("submit", this.newsletterSubmit), this.showMessage();
    }
    newsletterSubmitEvent(e) {
      this.stopSubmit && (e.preventDefault(), e.stopImmediatePropagation(), this.removeStorage(), this.writeStorage(), (this.stopSubmit = !1), this.newsletter.submit());
    }
    checkForChallengePage() {
      this.isChallengePage = "/challenge" === window.location.pathname;
    }
    writeStorage() {
      void 0 !== this.sessionStorage && this.sessionStorage.setItem("newsletter_form_id", this.newsletter.id);
    }
    readStorage() {
      this.formID = this.sessionStorage.getItem("newsletter_form_id");
    }
    removeStorage() {
      this.sessionStorage.removeItem("newsletter_form_id");
    }
    showMessage() {
      if ((this.readStorage(), this.newsletter.id === this.formID)) {
        const e = document.getElementById(this.formID),
          t = e.parentElement.querySelector(selectors$J.newsletterHeading),
          s = -1 !== window.location.search.indexOf("?customer_posted=true"),
          i = -1 !== window.location.search.indexOf("accepts_marketing");
        s
          ? (e.classList.remove(classes$C.error), e.classList.add(classes$C.success), t && (t.classList.add(classes$C.hidden), e.classList.remove(classes$C.hidden)), this.popup && this.cookie.write())
          : i && (e.classList.remove(classes$C.success), e.classList.add(classes$C.error), t && (t.classList.add(classes$C.hidden), e.classList.remove(classes$C.hidden))),
          (s || i) &&
            window.addEventListener("load", () => {
              this.scrollToForm(e);
            });
      }
    }
    scrollToForm(e) {
      const t = e.getBoundingClientRect();
      (t.top >= 0 && t.left >= 0 && t.bottom <= getWindowHeight() && t.right <= getWindowWidth()) ||
        setTimeout(() => {
          scrollTo(e.getBoundingClientRect().top);
        }, 500);
    }
    unload() {
      this.newsletter.removeEventListener("submit", this.newsletterSubmit);
    }
    constructor(e) {
      (this.sessionStorage = window.sessionStorage),
        (this.newsletter = e),
        (this.popup = this.newsletter.closest(selectors$J.newsletterPopup)),
        this.popup && (this.cookie = new PopupCookie(this.popup.getAttribute(attributes$i.cookieNameAttribute), "user_has_closed", null)),
        (this.stopSubmit = !0),
        (this.isChallengePage = !1),
        (this.formID = null),
        this.checkForChallengePage(),
        (this.newsletterSubmit = (e) => this.newsletterSubmitEvent(e)),
        this.isChallengePage || this.init();
    }
  };
  const newsletterCheckForResultSection = {
    onLoad() {
      sections$o[this.id] = [];
      this.container.querySelectorAll(selectors$J.newsletterForm).forEach((e) => {
        sections$o[this.id].push(new NewsletterCheckForResult(e));
      });
    },
    onUnload() {
      sections$o[this.id].forEach((e) => {
        "function" == typeof e.unload && e.unload();
      });
    },
  };
  register("footer", [parallaxHero, newsletterCheckForResultSection]);
  const selectors$I = {
      popoutWrapper: "[data-popout]",
      popoutList: "[data-popout-list]",
      popoutToggle: "[data-popout-toggle]",
      popoutToggleText: "[data-popout-toggle-text]",
      popoutToggleTextValue: "data-popout-toggle-text",
      popoutInput: "[data-popout-input]",
      popoutOptions: "[data-popout-option]",
      popoutPrevent: "data-popout-prevent",
      popoutQuantity: "data-quantity-field",
      dataValue: "data-value",
      ariaExpanded: "aria-expanded",
      ariaCurrent: "aria-current",
      productGridImage: "[data-product-image]",
      productGrid: "[data-product-grid-item]",
    },
    classes$B = { listVisible: "popout-list--visible", visible: "is-visible", active: "is-active", selectPopoutTop: "select-popout--top" };
  let sections$n = {},
    Popout = class {
      popupToggleClick(e) {
        const t = "true" === e.currentTarget.getAttribute(selectors$I.ariaExpanded);
        if (this.productGrid) {
          const e = this.productGrid.querySelector(selectors$I.productGridImage);
          e && e.classList.toggle(classes$B.visible, !t), (this.popoutList.style.maxHeight = `${Math.abs(this.popoutToggle.getBoundingClientRect().bottom - this.productGrid.getBoundingClientRect().bottom)}px`);
        }
        e.currentTarget.setAttribute(selectors$I.ariaExpanded, !t), this.popoutList.classList.toggle(classes$B.listVisible), this.popupListMaxWidth(), this.toggleListPosition();
      }
      popupToggleFocusout(e) {
        this.container.contains(e.relatedTarget) || this._hideList();
      }
      popupListFocusout(e) {
        const t = e.currentTarget.contains(e.relatedTarget);
        this.popoutList.classList.contains(classes$B.listVisible) && !t && this._hideList();
      }
      toggleListPosition() {
        const e = this.popoutList.closest(selectors$I.popoutWrapper),
          t = "true" === e.querySelector(selectors$I.popoutToggle).getAttribute(selectors$I.ariaExpanded),
          s = window.innerHeight,
          i = this.popoutList.getBoundingClientRect().bottom,
          o = () => {
            e.classList.remove(classes$B.selectPopoutTop), this.popoutList.removeEventListener("transitionend", o);
          };
        t ? s < i && e.classList.add(classes$B.selectPopoutTop) : this.popoutList.addEventListener("transitionend", o);
      }
      popupListMaxWidth() {
        this.popoutList.style.maxWidth = `${parseInt(document.body.clientWidth - this.popoutList.getBoundingClientRect().left)}px`;
      }
      popupOptionsClick(e) {
        if ("#" === e.target.closest(selectors$I.popoutOptions).attributes.href.value) {
          e.preventDefault();
          let t = "";
          if ((e.currentTarget.getAttribute(selectors$I.dataValue) && (t = e.currentTarget.getAttribute(selectors$I.dataValue)), (this.popoutInput.value = t), this.popoutPrevent)) {
            const s = e.currentTarget.parentElement,
              i = this.popoutList.querySelector(`.${classes$B.active}`),
              o = this.popoutList.querySelector(`[${selectors$I.ariaCurrent}]`);
            this.popoutInput.dispatchEvent(new Event("change")),
              i && (i.classList.remove(classes$B.active), s.classList.add(classes$B.active)),
              this.popoutInput.hasAttribute(selectors$I.popoutQuantity) && !s.nextSibling && this.container.classList.add(classes$B.active),
              o && o.hasAttribute(`${selectors$I.ariaCurrent}`) && (o.removeAttribute(`${selectors$I.ariaCurrent}`), e.currentTarget.setAttribute(`${selectors$I.ariaCurrent}`, "true")),
              "" !== t &&
                ((this.popoutToggleText.textContent = t),
                this.popoutToggleText.hasAttribute(selectors$I.popoutToggleTextValue) &&
                  "" !== this.popoutToggleText.getAttribute(selectors$I.popoutToggleTextValue) &&
                  this.popoutToggleText.setAttribute(selectors$I.popoutToggleTextValue, t)),
              this.popupToggleFocusout(e),
              this.popupListFocusout(e);
          } else this._submitForm(t);
        }
      }
      containerKeyup(e) {
        e.code === window.theme.keyboardKeys.ESCAPE && (this._hideList(), this.popoutToggle.focus());
      }
      bodyClick(e) {
        const t = this.container.contains(e.target);
        this.popoutList.classList.contains(classes$B.listVisible) && !t && this._hideList();
      }
      unload() {
        document.body.removeEventListener("click", this.bodyClickEvent);
      }
      _connectToggle() {
        this.popoutToggle.addEventListener("click", this.popupToggleClickEvent);
      }
      _connectOptions() {
        this.popoutOptions.length &&
          this.popoutOptions.forEach((e) => {
            e.addEventListener("click", (e) => this.popupOptionsClick(e));
          });
      }
      _onFocusOut() {
        this.popoutToggle.addEventListener("focusout", this.popupToggleFocusoutEvent),
          this.popoutList.addEventListener("focusout", this.popupListFocusoutEvent),
          this.container.addEventListener("keyup", this.containerKeyupEvent),
          document.body.addEventListener("click", this.bodyClickEvent);
      }
      _submitForm() {
        const e = this.container.closest("form");
        e && e.submit();
      }
      _hideList() {
        this.popoutList.classList.remove(classes$B.listVisible), this.popoutToggle.setAttribute(selectors$I.ariaExpanded, !1), this.toggleListPosition();
      }
      constructor(e) {
        (this.container = e),
          (this.popoutList = this.container.querySelector(selectors$I.popoutList)),
          (this.popoutToggle = this.container.querySelector(selectors$I.popoutToggle)),
          (this.popoutToggleText = this.container.querySelector(selectors$I.popoutToggleText)),
          (this.popoutInput = this.container.querySelector(selectors$I.popoutInput)),
          (this.popoutOptions = this.container.querySelectorAll(selectors$I.popoutOptions)),
          (this.productGrid = this.popoutList.closest(selectors$I.productGrid)),
          (this.popoutPrevent = "true" === this.container.getAttribute(selectors$I.popoutPrevent)),
          (this.popupToggleFocusoutEvent = (e) => this.popupToggleFocusout(e)),
          (this.popupListFocusoutEvent = (e) => this.popupListFocusout(e)),
          (this.popupToggleClickEvent = (e) => this.popupToggleClick(e)),
          (this.containerKeyupEvent = (e) => this.containerKeyup(e)),
          (this.bodyClickEvent = (e) => this.bodyClick(e)),
          this._connectOptions(),
          this._connectToggle(),
          this._onFocusOut(),
          this.popupListMaxWidth();
      }
    };
  const popoutSection = {
    onLoad() {
      sections$n[this.id] = [];
      this.container.querySelectorAll(selectors$I.popoutWrapper).forEach((e) => {
        sections$n[this.id].push(new Popout(e));
      });
    },
    onUnload() {
      sections$n[this.id].forEach((e) => {
        "function" == typeof e.unload && e.unload();
      });
    },
  };
  function Listeners() {
    this.entries = [];
  }
  function getVariantFromSerializedArray(e, t) {
    return _validateProductStructure(e), getVariantFromOptionArray(e, _createOptionArrayFromOptionCollection(e, t));
  }
  function getVariantFromOptionArray(e, t) {
    return (
      _validateProductStructure(e),
      _validateOptionsArray(t),
      e.variants.filter(function (e) {
        return t.every(function (t, s) {
          return e.options[s] === t;
        });
      })[0] || null
    );
  }
  function _createOptionArrayFromOptionCollection(e, t) {
    _validateProductStructure(e), _validateSerializedArray(t);
    var s = [];
    return (
      t.forEach(function (t) {
        for (var i = 0; i < e.options.length; i++) {
          if ((e.options[i].name || e.options[i]).toLowerCase() === t.name.toLowerCase()) {
            s[i] = t.value;
            break;
          }
        }
      }),
      s
    );
  }
  function _validateProductStructure(e) {
    if ("object" != typeof e) throw new TypeError(e + " is not an object.");
    if (0 === Object.keys(e).length && e.constructor === Object) throw new Error(e + " is empty.");
  }
  function _validateSerializedArray(e) {
    if (!Array.isArray(e)) throw new TypeError(e + " is not an array.");
    if (0 === e.length) throw new Error(e + " is empty.");
    if (!e[0].hasOwnProperty("name")) throw new Error(e[0] + "does not contain name key.");
    if ("string" != typeof e[0].name) throw new TypeError("Invalid value type passed for name of option " + e[0].name + ". Value should be string.");
  }
  function _validateOptionsArray(e) {
    if (Array.isArray(e) && "object" == typeof e[0]) throw new Error(e + "is not a valid array of options.");
  }
  (Listeners.prototype.add = function (e, t, s) {
    this.entries.push({ element: e, event: t, fn: s }), e.addEventListener(t, s);
  }),
    (Listeners.prototype.removeAll = function () {
      this.entries = this.entries.filter(function (e) {
        return e.element.removeEventListener(e.event, e.fn), !1;
      });
    });
  var selectors$H = { idInput: '[name="id"]', planInput: '[name="selling_plan"]', optionInput: '[name^="options"]', quantityInput: '[name="quantity"]', propertyInput: '[name^="properties"]' };
  function getUrlWithVariant(e, t) {
    return /variant=/.test(e) ? e.replace(/(variant=)[^&]+/, "$1" + t) : /\?/.test(e) ? e.concat("&variant=").concat(t) : e.concat("?variant=").concat(t);
  }
  let ProductFormReader = class {
    destroy() {
      this._listeners.removeAll();
    }
    options() {
      return this._serializeInputValues(this.optionInputs, function (e) {
        return (e.name = /(?:^(options\[))(.*?)(?:\])/.exec(e.name)[2]), e;
      });
    }
    variant() {
      const e = this.options();
      return e.length ? getVariantFromSerializedArray(this.product, e) : this.product.variants[0];
    }
    plan(e) {
      let t = { allocation: null, group: null, detail: null };
      const s = this.element.querySelector(`${selectors$H.planInput}:checked`);
      if (!s) return null;
      const i = s.value,
        o = i && "" !== i ? i : null;
      return (
        o &&
          e &&
          (t.allocation = e.selling_plan_allocations.find(function (e) {
            return e.selling_plan_id.toString() === o.toString();
          })),
        t.allocation &&
          (t.group = this.product.selling_plan_groups.find(function (e) {
            return e.id.toString() === t.allocation.selling_plan_group_id.toString();
          })),
        t.group &&
          (t.detail = t.group.selling_plans.find(function (e) {
            return e.id.toString() === o.toString();
          })),
        t && t.allocation && t.detail && t.allocation ? t : null
      );
    }
    properties() {
      return this._serializeInputValues(this.propertyInputs, function (e) {
        return (e.name = /(?:^(properties\[))(.*?)(?:\])/.exec(e.name)[2]), e;
      });
    }
    quantity() {
      return this.quantityInputs[0] ? Number.parseInt(this.quantityInputs[0].value, 10) : 1;
    }
    getFormState() {
      const e = this.variant();
      return { options: this.options(), variant: e, properties: this.properties(), quantity: this.quantity(), plan: this.plan(e) };
    }
    _setIdInputValue(e) {
      e && e.id ? (this.variantElement.value = e.id.toString()) : (this.variantElement.value = ""), this.variantElement.dispatchEvent(new Event("change"));
    }
    _onSubmit(e, t) {
      (t.dataset = this.getFormState()), e.onFormSubmit && e.onFormSubmit(t);
    }
    _onOptionChange(e) {
      this._setIdInputValue(e.dataset.variant);
    }
    _onFormEvent(e) {
      return void 0 === e
        ? Function.prototype.bind()
        : function (t) {
            (t.dataset = this.getFormState()), this._setIdInputValue(t.dataset.variant), e(t);
          }.bind(this);
    }
    _initInputs(e, t) {
      return Array.prototype.slice.call(this.element.querySelectorAll(e)).map(
        function (e) {
          return this._listeners.add(e, "change", this._onFormEvent(t)), e;
        }.bind(this)
      );
    }
    _serializeInputValues(e, t) {
      return e.reduce(function (e, s) {
        return (s.checked || ("radio" !== s.type && "checkbox" !== s.type)) && e.push(t({ name: s.name, value: s.value })), e;
      }, []);
    }
    _validateProductObject(e) {
      if ("object" != typeof e) throw new TypeError(e + " is not an object.");
      if (void 0 === e.variants[0].options) throw new TypeError("Product object is invalid. Make sure you use the product object that is output from {{ product | json }} or from the http://[your-product-url].js route");
      return e;
    }
    constructor(e, t, s) {
      (this.element = e),
        (this.product = this._validateProductObject(t)),
        (this.variantElement = this.element.querySelector(selectors$H.idInput)),
        (s = s || {}),
        (this._listeners = new Listeners()),
        this._listeners.add(this.element, "submit", this._onSubmit.bind(this, s)),
        (this.optionInputs = this._initInputs(selectors$H.optionInput, s.onOptionChange)),
        (this.planInputs = this._initInputs(selectors$H.planInput, s.onPlanChange)),
        (this.quantityInputs = this._initInputs(selectors$H.quantityInput, s.onQuantityChange)),
        (this.propertyInputs = this._initInputs(selectors$H.propertyInput, s.onPropertyChange));
    }
  };
  function fetchProduct(e) {
    const t = `${window.theme.routes.root}products/${e}.js`;
    return window
      .fetch(t)
      .then((e) => e.json())
      .catch((e) => {
        console.error(e);
      });
  }
  function getScript(e, t, s) {
    let i = document.getElementsByTagName("head")[0],
      o = !1,
      r = document.createElement("script");
    (r.src = e),
      (r.onload = r.onreadystatechange = function () {
        o || (this.readyState && "loaded" != this.readyState && "complete" != this.readyState) ? s() : ((o = !0), t());
      }),
      i.appendChild(r);
  }
  const loaders = {};
  function loadScript(e = {}) {
    if ((e.type || (e.type = "json"), e.url)) return loaders[e.url] ? loaders[e.url] : getScriptWithPromise(e.url, e.type);
    if (e.json)
      return loaders[e.json]
        ? Promise.resolve(loaders[e.json])
        : window
            .fetch(e.json)
            .then((e) => e.json())
            .then((t) => ((loaders[e.json] = t), t));
    if (e.name) {
      const t = "".concat(e.name, e.version);
      return loaders[t] ? loaders[t] : loadShopifyWithPromise(e);
    }
    return Promise.reject();
  }
  function getScriptWithPromise(e, t) {
    const s = new Promise((s, i) => {
      "text" === t
        ? fetch(e)
            .then((e) => e.text())
            .then((e) => {
              s(e);
            })
            .catch((e) => {
              i(e);
            })
        : getScript(
            e,
            function () {
              s();
            },
            function () {
              i();
            }
          );
    });
    return (loaders[e] = s), s;
  }
  function loadShopifyWithPromise(e) {
    const t = "".concat(e.name, e.version),
      s = new Promise((t, s) => {
        try {
          window.Shopify.loadFeatures([
            {
              name: e.name,
              version: e.version,
              onLoad: (e) => {
                onLoadFromShopify(t, s, e);
              },
            },
          ]);
        } catch (e) {
          s(e);
        }
      });
    return (loaders[t] = s), s;
  }
  function onLoadFromShopify(e, t, s) {
    return s ? t(s) : e();
  }
  (window.isYoutubeAPILoaded = !1), (window.isVimeoAPILoaded = !1);
  const selectors$G = {
      scrollbarAttribute: "data-scrollbar",
      scrollbar: "data-scrollbar-slider",
      scrollbarSlideFullWidth: "data-scrollbar-slide-fullwidth",
      scrollbarArrowPrev: "[data-scrollbar-arrow-prev]",
      scrollbarArrowNext: "[data-scrollbar-arrow-next]",
    },
    classes$A = { hidden: "is-hidden" },
    settings$2 = { delay: 200 };
  let NativeScrollbar = class {
    init() {
      this.arrowNext && this.arrowPrev && (this.toggleNextArrow(), this.events());
    }
    resize() {
      document.addEventListener("theme:resize", () => {
        this.toggleNextArrow();
      });
    }
    events() {
      this.arrowNext.addEventListener("click", (e) => {
        e.preventDefault(), this.goToNext();
      }),
        this.arrowPrev.addEventListener("click", (e) => {
          e.preventDefault(), this.goToPrev();
        }),
        this.scrollbar.addEventListener("scroll", () => {
          this.togglePrevArrow(), this.toggleNextArrow();
        });
    }
    goToNext() {
      const e = (this.scrollbar.hasAttribute(selectors$G.scrollbarSlideFullWidth) ? this.scrollbar.getBoundingClientRect().width : this.scrollbar.getBoundingClientRect().width / 2) + this.scrollbar.scrollLeft;
      this.move(e), this.arrowPrev.classList.remove(classes$A.hidden), this.toggleNextArrow();
    }
    goToPrev() {
      const e = this.scrollbar.hasAttribute(selectors$G.scrollbarSlideFullWidth) ? this.scrollbar.getBoundingClientRect().width : this.scrollbar.getBoundingClientRect().width / 2,
        t = this.scrollbar.scrollLeft - e;
      this.move(t), this.arrowNext.classList.remove(classes$A.hidden), this.togglePrevArrow();
    }
    toggleNextArrow() {
      setTimeout(() => {
        this.arrowNext.classList.toggle(classes$A.hidden, Math.round(this.scrollbar.scrollLeft + this.scrollbar.getBoundingClientRect().width + 1) >= this.scrollbar.scrollWidth);
      }, settings$2.delay);
    }
    togglePrevArrow() {
      setTimeout(() => {
        this.arrowPrev.classList.toggle(classes$A.hidden, this.scrollbar.scrollLeft <= 0);
      }, settings$2.delay);
    }
    scrollToVisibleElement() {
      [].forEach.call(this.scrollbar.children, (e) => {
        e.addEventListener("click", (t) => {
          t.preventDefault(), this.move(e.offsetLeft - e.clientWidth);
        });
      });
    }
    move(e) {
      this.scrollbar.scrollTo({ top: 0, left: e, behavior: "smooth" });
    }
    constructor(e) {
      (this.scrollbar = e),
        (this.arrowNext = this.scrollbar.parentNode.querySelector(selectors$G.scrollbarArrowNext)),
        (this.arrowPrev = this.scrollbar.parentNode.querySelector(selectors$G.scrollbarArrowPrev)),
        this.scrollbar.hasAttribute(selectors$G.scrollbarAttribute) && (this.init(), this.resize()),
        this.scrollbar.hasAttribute(selectors$G.scrollbar) && this.scrollToVisibleElement();
    }
  };
  const defaults = { color: "ash" },
    selectors$F = {
      gridSwatchForm: "[data-grid-swatch-form]",
      swatch: "data-swatch",
      outerGrid: "[data-product-grid-item]",
      slide: "[data-product-image]",
      image: "data-swatch-image",
      sectionId: "[data-section-id]",
      productInfo: "[data-product-information]",
      variant: "data-swatch-variant",
      variantName: "data-swatch-variant-name",
      variantTitle: "data-variant-title",
      button: "[data-swatch-button]",
      swatchLink: "[data-swatch-link]",
      wrapper: "[data-grid-swatches]",
      template: "[data-swatch-template]",
      handle: "data-swatch-handle",
      label: "data-swatch-label",
      input: "[data-swatch-input]",
      tooltip: "data-tooltip",
      swatchCount: "data-swatch-count",
      scrollbar: "data-scrollbar",
    },
    classes$z = { visible: "is-visible", stopEvents: "no-events" };
  let ColorMatch = class {
      getColor() {
        return this.match;
      }
      init() {
        return loadScript({ json: window.theme.assets.swatches })
          .then((e) => this.matchColors(e, this.settings.color))
          .catch((e) => {
            console.log("failed to load swatch colors script"), console.log(e);
          });
      }
      matchColors(e, t) {
        let s = "#E5E5E5",
          i = null;
        const o = window.theme.assets.base || "/",
          r = t.toLowerCase().replace(/\s/g, ""),
          a = e.colors;
        if (a) {
          let e = null;
          if (
            a.filter((t, s) => {
              if (Object.keys(t).toString().toLowerCase().replace(/\s/g, "") === r) return (e = s), t;
            }).length &&
            null !== e
          ) {
            const t = Object.values(a[e])[0];
            (s = t), (t.includes(".jpg") || t.includes(".jpeg") || t.includes(".png") || t.includes(".svg")) && ((i = `${o}${t}`), (s = "#888888"));
          }
        }
        return { color: this.settings.color, path: i, hex: s };
      }
      constructor(e = {}) {
        (this.settings = { ...defaults, ...e }), (this.match = this.init());
      }
    },
    Swatch = class {
      init() {
        this.setStyles(), this.variant && this.handleEvents(), this.tooltip && new Tooltip(this.tooltip);
      }
      setStyles() {
        this.colorMatch.hex && this.element.style.setProperty("--swatch", `${this.colorMatch.hex}`),
          this.colorMatch.path &&
            (this.element.style.setProperty("background-image", `url(${this.colorMatch.path})`), this.element.style.setProperty("background-size", "cover"), this.element.style.setProperty("background-position", "center center"));
      }
      handleEvents() {
        (this.outer = this.element.closest(selectors$F.outerGrid)),
          this.outer &&
            ((this.slide = this.outer.querySelector(selectors$F.slide)),
            (this.button = this.element.closest(selectors$F.button)),
            (this.imagesHidden = this.outer.querySelectorAll(`[${selectors$F.variantTitle}][style*="display: none;"]`)),
            (this.outerHoverEvent = () => this.showHoverImages()),
            (this.outerLeaveEvent = () => this.hideHoverImages()),
            this.button.closest(selectors$F.gridSwatchForm) &&
              this.button.addEventListener(
                "mouseenter",
                function () {
                  this.changeImage();
                }.bind(this)
              ),
            this.imagesHidden.length && (this.outer.addEventListener("mouseenter", this.outerHoverEvent), this.outer.addEventListener("mouseleave", this.outerLeaveEvent)));
      }
      showHoverImages() {
        this.imagesHidden.forEach((e) => {
          e.style.removeProperty("display");
        }),
          this.outer.removeEventListener("mouseenter", this.outerHoverEvent);
      }
      hideHoverImages() {
        var e;
        null === (e = this.slide.querySelectorAll(`.${classes$z.visible}`)) ||
          void 0 === e ||
          e.forEach((e) => {
            e.classList.remove(classes$z.visible);
          });
      }
      changeImage() {
        if (this.image) {
          const e = this.variantName.replaceAll('"', "'"),
            t = this.slide.querySelector(`[${selectors$F.variantTitle}="${e}"]`);
          if (t) {
            const e = this.slide.querySelector(`[${selectors$F.variantTitle}].${classes$z.visible}`);
            e && e.classList.remove(classes$z.visible), t.classList.add(classes$z.visible);
          }
        }
      }
      constructor(e) {
        (this.element = e),
          (this.colorString = e.getAttribute(selectors$F.swatch)),
          (this.image = e.getAttribute(selectors$F.image)),
          (this.variant = e.getAttribute(selectors$F.variant)),
          (this.variantName = e.getAttribute(selectors$F.variantName)),
          (this.tooltip = this.element.closest(`[${selectors$F.tooltip}]`));
        new ColorMatch({ color: this.colorString }).getColor().then((e) => {
          (this.colorMatch = e), this.init();
        });
      }
    },
    GridSwatch = class {
      init() {
        (this.wrap.innerHTML = ""),
          (this.count = 0),
          this.swatches.forEach((e) => {
            let t = null,
              s = !1,
              i = "";
            for (const s of this.product.variants) {
              const o = s.options.includes(e);
              if ((!t && o && (t = s), o && s.featured_media)) {
                (i = s.featured_media.preview_image.src), (t = s);
                break;
              }
            }
            for (const t of this.product.variants) {
              if (t.options.includes(e) && t.available) {
                s = !0;
                break;
              }
            }
            if (t) {
              const o = document.createElement("div");
              o.innerHTML = this.template;
              const r = o.querySelector(selectors$F.button),
                a = o.querySelector(selectors$F.swatchLink),
                n = t.title.replaceAll('"', "'");
              (r.style = `--animation-delay: ${(100 * this.count) / 1e3}s`),
                (r.dataset.tooltip = e),
                (a.href = getUrlWithVariant(this.product.url, t.id)),
                (a.innerText = e),
                (a.dataset.swatch = e),
                (a.dataset.swatchVariant = t.id),
                (a.dataset.swatchVariantName = n),
                (a.dataset.swatchImage = i),
                (a.dataset.variant = t.id),
                (a.disabled = !s),
                (this.wrap.innerHTML += o.innerHTML),
                this.count++;
            }
          }),
          (this.swatchCount = this.productInfo.querySelector(`[${selectors$F.swatchCount}]`)),
          (this.swatchElements = this.wrap.querySelectorAll(selectors$F.swatchLink)),
          (this.swatchForm = this.productInfo.querySelector(selectors$F.gridSwatchForm)),
          (this.hideSwatchesTimer = 0),
          this.swatchCount.hasAttribute(selectors$F.swatchCount) &&
            ((this.swatchCount.innerText = `${this.count} ${this.count > 1 ? theme.strings.otherColor : theme.strings.oneColor}`),
            this.swatchCount.addEventListener("mouseenter", () => {
              this.hideSwatchesTimer && clearTimeout(this.hideSwatchesTimer), this.productInfo.classList.add(classes$z.stopEvents), this.swatchForm.classList.add(classes$z.visible);
            }),
            this.productInfo.addEventListener("mouseleave", () => {
              this.hideSwatchesTimer = setTimeout(() => {
                this.productInfo.classList.remove(classes$z.stopEvents), this.swatchForm.classList.remove(classes$z.visible);
              }, 100);
            })),
          this.wrap.hasAttribute(selectors$F.scrollbar) && new NativeScrollbar(this.wrap),
          this.swatchElements.forEach((e) => {
            new Swatch(e);
          });
      }
      constructor(e, t) {
        (this.container = t),
          (this.wrap = e),
          (this.outerGrid = e.closest(selectors$F.outerGrid)),
          (this.productInfo = e.closest(selectors$F.productInfo)),
          (this.template = document.querySelector(selectors$F.template).innerHTML),
          (this.handle = e.getAttribute(selectors$F.handle)),
          (this.sectionId = this.wrap.closest(selectors$F.sectionId).dataset.sectionId);
        const s = e.getAttribute(selectors$F.label).trim().toLowerCase();
        fetchProduct(this.handle).then((e) => {
          (this.product = e),
            (this.colorOption = e.options.find(function (e) {
              return e.name.toLowerCase() === s || null;
            })),
            this.colorOption && ((this.swatches = this.colorOption.values), this.init());
        });
      }
    };
  const makeGridSwatches = (e) => {
      e.container.querySelectorAll(selectors$F.wrapper).forEach((e) => {
        new GridSwatch(e, void 0);
      });
    },
    swatchSection = {
      onLoad() {
        this.swatches = [];
        this.container.querySelectorAll(`[${selectors$F.swatch}]`).forEach((e) => {
          this.swatches.push(new Swatch(e));
        });
      },
    },
    swatchGridSection = {
      onLoad() {
        makeGridSwatches(this);
      },
    },
    selectors$E = {
      productCutline: "[data-product-cutline]",
      productLink: "[data-product-link]",
      productGridItem: "[data-product-grid-item]",
      productInfo: "[data-product-information]",
      productImage: "[data-product-image-default]",
      productImageSibling: "[data-product-image-sibling]",
      productPrice: "[data-product-price]",
      siblingsInnerHolder: "[data-sibling-inner]",
      siblingCount: "[data-sibling-count]",
      siblingHolder: "[data-sibling-holder]",
      siblingFieldset: "[data-sibling-fieldset]",
      siblingLink: "[data-sibling-link]",
    },
    classes$y = { visible: "is-visible", fade: "is-fade", stopEvents: "no-events", active: "is-active" },
    attributes$h = {
      siblingAddedImage: "data-sibling-added-image",
      siblingCutline: "data-sibling-cutline",
      siblingImage: "data-sibling-image",
      siblingLink: "data-sibling-link",
      siblingPrice: "data-sibling-price",
      productLink: "data-product-link",
    };
  let SiblingSwatches = class {
      init() {
        this.cacheDefaultValues(),
          this.product.addEventListener("mouseleave", () => this.resetProductValues()),
          this.swatches.forEach((e) => {
            e.addEventListener("mouseenter", (e) => this.showSibling(e));
          }),
          this.productLinks.length &&
            this.swatches.forEach((e) => {
              e.addEventListener("click", () => {
                this.productLinks[0].click();
              });
            });
      }
      cacheDefaultValues() {
        (this.productLinkValue = this.productLinks[0].hasAttribute(attributes$h.productLink) ? this.productLinks[0].getAttribute(attributes$h.productLink) : ""),
          (this.productPriceValue = this.productPrice.innerHTML),
          this.productCutline && (this.productCutlineValue = this.productCutline.innerHTML);
      }
      resetProductValues() {
        this.product.classList.remove(classes$y.active),
          this.productLinkValue &&
            this.productLinks.forEach((e) => {
              e.href = this.productLinkValue;
            }),
          this.productPrice && (this.productPrice.innerHTML = this.productPriceValue),
          this.productCutline && this.productCutline && (this.productCutline.innerHTML = this.productCutlineValue),
          this.hideSiblingImage();
      }
      showSibling(e) {
        const t = e.target,
          s = t.hasAttribute(attributes$h.siblingLink) ? t.getAttribute(attributes$h.siblingLink) : "",
          i = t.hasAttribute(attributes$h.siblingPrice) ? t.getAttribute(attributes$h.siblingPrice) : "",
          o = t.hasAttribute(attributes$h.siblingCutline) ? t.getAttribute(attributes$h.siblingCutline) : "",
          r = t.hasAttribute(attributes$h.siblingImage) ? t.getAttribute(attributes$h.siblingImage) : "";
        s &&
          this.productLinks.forEach((e) => {
            e.href = s;
          }),
          i && (this.productPrice.innerHTML = i),
          (this.productCutline.innerHTML = o || ""),
          r && this.showSiblingImage(r);
      }
      showSiblingImage(e) {
        if (!this.productImageSibling) return;
        const t = window.devicePixelRatio || 1,
          s = this.productImage.offsetWidth * t,
          i = 180 * Math.ceil(s / 180),
          o = themeImages.getSizedImageUrl(e, `${i}x`),
          r = this.productImageSibling.querySelector(`[src="${o}"]`),
          a = () => {
            this.productImageSibling.classList.add(classes$y.visible), this.productImageSibling.querySelector(`[src="${o}"]`).classList.add(classes$y.fade);
          },
          n = () => {
            this.productImageSibling.querySelectorAll("img").forEach((e) => {
              e.classList.remove(classes$y.fade);
            }),
              requestAnimationFrame(a);
          };
        if (r) n();
        else {
          const e = document.createElement("img");
          (e.src = o),
            this.productCutline && (e.alt = this.productCutline.innerText),
            e.addEventListener("load", () => {
              this.productImageSibling.append(e), n();
            });
        }
      }
      hideSiblingImage() {
        this.productImageSibling &&
          (this.productImageSibling.classList.remove(classes$y.visible),
          this.productImageSibling.querySelectorAll("img").forEach((e) => {
            e.classList.remove(classes$y.fade);
          }));
      }
      constructor(e, t) {
        (this.swatches = e),
          (this.product = t),
          (this.productLinks = this.product.querySelectorAll(selectors$E.productLink)),
          (this.productCutline = this.product.querySelector(selectors$E.productCutline)),
          (this.productPrice = this.product.querySelector(selectors$E.productPrice)),
          (this.productImage = this.product.querySelector(selectors$E.productImage)),
          (this.productImageSibling = this.product.querySelector(selectors$E.productImageSibling)),
          this.init();
      }
    },
    Sibling = class {
      init() {
        this.initScrollbar(),
          this.siblingCount && this.siblingFieldset && this.productInfo && (this.siblingCount.addEventListener("mouseenter", () => this.showSiblings()), this.productInfo.addEventListener("mouseleave", () => this.hideSiblings())),
          this.siblingLinks.length && new SiblingSwatches(this.siblingLinks, this.product);
      }
      showSiblings() {
        this.hideSwatchesTimer && clearTimeout(this.hideSwatchesTimer), this.productLink && this.productLink.classList.add(classes$y.stopEvents), this.siblingFieldset.classList.add(classes$y.visible);
      }
      hideSiblings() {
        this.hideSwatchesTimer = setTimeout(() => {
          this.productLink && this.productLink.classList.remove(classes$y.stopEvents), this.siblingFieldset.classList.remove(classes$y.visible);
        }, 100);
      }
      initScrollbar() {
        this.siblingScrollbar && new NativeScrollbar(this.siblingScrollbar);
      }
      constructor(e, t) {
        (this.holder = e),
          (this.product = t),
          (this.siblingScrollbar = this.holder.querySelector(selectors$E.siblingsInnerHolder)),
          (this.siblingCount = this.holder.querySelector(selectors$E.siblingCount)),
          (this.siblingFieldset = this.holder.querySelector(selectors$E.siblingFieldset)),
          (this.siblingLinks = this.holder.querySelectorAll(selectors$E.siblingLink)),
          (this.productInfo = this.holder.closest(selectors$E.productInfo)),
          (this.productLink = this.holder.closest(selectors$E.link)),
          (this.hideSwatchesTimer = 0),
          this.init();
      }
    },
    Siblings = class {
      constructor(e) {
        (this.container = e.container),
          (this.siblingHolders = this.container.querySelectorAll(`${selectors$E.productGridItem} ${selectors$E.siblingHolder}`)),
          this.siblingHolders.length &&
            this.siblingHolders.forEach((e) => {
              new Sibling(e, e.closest(selectors$E.productGridItem));
            });
      }
    };
  const siblings = {
      onLoad() {
        new Siblings(this);
      },
    },
    selectors$D = {
      rangeSlider: "[data-range-slider]",
      rangeDotLeft: "[data-range-left]",
      rangeDotRight: "[data-range-right]",
      rangeLine: "[data-range-line]",
      rangeHolder: "[data-range-holder]",
      dataMin: "data-se-min",
      dataMax: "data-se-max",
      dataMinValue: "data-se-min-value",
      dataMaxValue: "data-se-max-value",
      dataStep: "data-se-step",
      dataFilterUpdate: "data-range-filter-update",
      priceMin: "[data-field-price-min]",
      priceMax: "[data-field-price-max]",
    },
    classes$x = { initialized: "is-initialized" };
  let RangeSlider = class {
    init() {
      let e = this.min;
      this.slider.hasAttribute(selectors$D.dataMinValue) && (e = parseFloat(this.slider.getAttribute(selectors$D.dataMinValue)));
      let t = this.max;
      this.slider.hasAttribute(selectors$D.dataMaxValue) && (t = parseFloat(this.slider.getAttribute(selectors$D.dataMaxValue))),
        e < this.min && (e = this.min),
        t > this.max && (t = this.max),
        e > t && (e = t),
        this.slider.getAttribute(selectors$D.dataStep) && (this.step = Math.abs(parseFloat(this.slider.getAttribute(selectors$D.dataStep)))),
        this.reset(),
        document.addEventListener("theme:resize", this.resizeFilters),
        (this.maxX = this.slider.offsetWidth - this.touchRight.offsetWidth),
        (this.selectedTouch = null),
        (this.initialValue = this.lineSpan.offsetWidth - this.normalizeFact),
        this.setMinValue(e),
        this.setMaxValue(t),
        this.touchLeft.addEventListener("mousedown", this.onStartEvent),
        this.touchRight.addEventListener("mousedown", this.onStartEvent),
        this.touchLeft.addEventListener("touchstart", this.onStartEvent, { passive: !0 }),
        this.touchRight.addEventListener("touchstart", this.onStartEvent, { passive: !0 }),
        this.slider.classList.add(classes$x.initialized);
    }
    reset() {
      (this.touchLeft.style.left = "0px"),
        (this.touchRight.style.left = this.slider.offsetWidth - this.touchLeft.offsetWidth + "px"),
        (this.lineSpan.style.marginLeft = "0px"),
        (this.lineSpan.style.width = this.slider.offsetWidth - this.touchLeft.offsetWidth + "px"),
        (this.startX = 0),
        (this.x = 0);
    }
    setMinValue(e) {
      const t = (e - this.min) / (this.max - this.min);
      (this.touchLeft.style.left = Math.ceil(t * (this.slider.offsetWidth - (this.touchLeft.offsetWidth + this.normalizeFact))) + "px"),
        (this.lineSpan.style.marginLeft = this.touchLeft.offsetLeft + "px"),
        (this.lineSpan.style.width = this.touchRight.offsetLeft - this.touchLeft.offsetLeft + "px"),
        this.slider.setAttribute(selectors$D.dataMinValue, e);
    }
    setMaxValue(e) {
      const t = (e - this.min) / (this.max - this.min);
      (this.touchRight.style.left = Math.ceil(t * (this.slider.offsetWidth - (this.touchLeft.offsetWidth + this.normalizeFact)) + this.normalizeFact) + "px"),
        (this.lineSpan.style.marginLeft = this.touchLeft.offsetLeft + "px"),
        (this.lineSpan.style.width = this.touchRight.offsetLeft - this.touchLeft.offsetLeft + "px"),
        this.slider.setAttribute(selectors$D.dataMaxValue, e);
    }
    onStart(e) {
      let t = e;
      e.touches && (t = e.touches[0]),
        e.currentTarget === this.touchLeft ? (this.x = this.touchLeft.offsetLeft) : e.currentTarget === this.touchRight && (this.x = this.touchRight.offsetLeft),
        (this.startX = t.pageX - this.x),
        (this.selectedTouch = e.currentTarget),
        document.addEventListener("mousemove", this.onMoveEvent),
        document.addEventListener("mouseup", this.onStopEvent),
        document.addEventListener("touchmove", this.onMoveEvent, { passive: !0 }),
        document.addEventListener("touchend", this.onStopEvent, { passive: !0 });
    }
    onMove(e) {
      let t = e;
      if (
        (e.touches && (t = e.touches[0]),
        (this.x = t.pageX - this.startX),
        this.selectedTouch === this.touchLeft
          ? (this.x > this.touchRight.offsetLeft - this.selectedTouch.offsetWidth + 10 ? (this.x = this.touchRight.offsetLeft - this.selectedTouch.offsetWidth + 10) : this.x < 0 && (this.x = 0),
            (this.selectedTouch.style.left = this.x + "px"))
          : this.selectedTouch === this.touchRight &&
            (this.x < this.touchLeft.offsetLeft + this.touchLeft.offsetWidth - 10 ? (this.x = this.touchLeft.offsetLeft + this.touchLeft.offsetWidth - 10) : this.x > this.maxX && (this.x = this.maxX),
            (this.selectedTouch.style.left = this.x + "px")),
        (this.lineSpan.style.marginLeft = this.touchLeft.offsetLeft + "px"),
        (this.lineSpan.style.width = this.touchRight.offsetLeft - this.touchLeft.offsetLeft + "px"),
        this.calculateValue(),
        this.slider.getAttribute("on-change"))
      ) {
        new Function("min, max", this.slider.getAttribute("on-change"))(this.slider.getAttribute(selectors$D.dataMinValue), this.slider.getAttribute(selectors$D.dataMaxValue));
      }
      this.onChange(this.slider.getAttribute(selectors$D.dataMinValue), this.slider.getAttribute(selectors$D.dataMaxValue));
    }
    onStop() {
      document.removeEventListener("mousemove", this.onMoveEvent),
        document.removeEventListener("mouseup", this.onStopEvent),
        document.removeEventListener("touchmove", this.onMoveEvent),
        document.removeEventListener("touchend", this.onStopEvent),
        (this.selectedTouch = null),
        this.calculateValue(),
        this.onChanged(this.slider.getAttribute(selectors$D.dataMinValue), this.slider.getAttribute(selectors$D.dataMaxValue));
    }
    onChange(e, t) {
      const s = this.slider.closest(selectors$D.rangeHolder);
      if (s) {
        const i = s.querySelector(selectors$D.priceMin),
          o = s.querySelector(selectors$D.priceMax);
        i && o && ((i.value = e), (o.value = t));
      }
    }
    onChanged(e, t) {
      this.slider.hasAttribute(selectors$D.dataFilterUpdate) && this.slider.dispatchEvent(new CustomEvent("theme:range:update", { bubbles: !0 }));
    }
    calculateValue() {
      const e = (this.lineSpan.offsetWidth - this.normalizeFact) / this.initialValue;
      let t = this.lineSpan.offsetLeft / this.initialValue,
        s = t + e;
      if (((t = t * (this.max - this.min) + this.min), (s = s * (this.max - this.min) + this.min), 0 !== this.step)) {
        let e = Math.floor(t / this.step);
        (t = this.step * e), (e = Math.floor(s / this.step)), (s = this.step * e);
      }
      this.selectedTouch === this.touchLeft && this.slider.setAttribute(selectors$D.dataMinValue, t), this.selectedTouch === this.touchRight && this.slider.setAttribute(selectors$D.dataMaxValue, s);
    }
    onUnload() {
      this.resizeFilters && document.removeEventListener("theme:resize", this.resizeFilters);
    }
    constructor(e) {
      (this.container = e.container),
        (this.slider = e.querySelector(selectors$D.rangeSlider)),
        (this.resizeFilters = () => this.init()),
        this.slider &&
          ((this.onMoveEvent = (e) => this.onMove(e)),
          (this.onStopEvent = (e) => this.onStop(e)),
          (this.onStartEvent = (e) => this.onStart(e)),
          (this.startX = 0),
          (this.x = 0),
          (this.touchLeft = this.slider.querySelector(selectors$D.rangeDotLeft)),
          (this.touchRight = this.slider.querySelector(selectors$D.rangeDotRight)),
          (this.lineSpan = this.slider.querySelector(selectors$D.rangeLine)),
          (this.min = parseFloat(this.slider.getAttribute(selectors$D.dataMin))),
          (this.max = parseFloat(this.slider.getAttribute(selectors$D.dataMax))),
          (this.step = 0),
          (this.normalizeFact = 26),
          this.init());
    }
  };
  const selectors$C = {
      collectionSidebar: "[data-collection-sidebar]",
      form: "[data-collection-filters-form]",
      input: "input",
      select: "select",
      label: "label",
      textarea: "textarea",
      priceMin: "[data-field-price-min]",
      priceMax: "[data-field-price-max]",
      priceMinValue: "data-field-price-min",
      priceMaxValue: "data-field-price-max",
      rangeMin: "[data-se-min-value]",
      rangeMax: "[data-se-max-value]",
      rangeMinValue: "data-se-min-value",
      rangeMaxValue: "data-se-max-value",
      rangeMinDefault: "data-se-min",
      rangeMaxDefault: "data-se-max",
      productsContainer: "[data-products-grid]",
      product: "[data-product-grid-item]",
      filterUpdateUrlButton: "[data-filter-update-url]",
      activeFilters: "[data-active-filters]",
      activeFiltersCount: "data-active-filters-count",
      sort: "data-sort-enabled",
      collectionNav: "[data-collection-nav]",
    },
    classes$w = { hidden: "hidden", loading: "is-loading" };
  let sections$m = {},
    FiltersForm = class {
      init() {
        this.form &&
          (this.initRangeSlider(),
          this.sidebar.addEventListener(
            "input",
            debounce((e) => {
              const t = e.type,
                s = e.target;
              if ((t === selectors$C.input || t === selectors$C.select || t === selectors$C.label || t === selectors$C.textarea) && this.form && "function" == typeof this.form.submit) {
                const t = this.form.querySelector(selectors$C.priceMin),
                  i = this.form.querySelector(selectors$C.priceMax);
                t && i && (s.hasAttribute(selectors$C.priceMinValue) && !i.value ? (i.value = i.placeholder) : s.hasAttribute(selectors$C.priceMaxValue) && !t.value && (t.value = t.placeholder)), this.submitForm(e);
              }
            }, 500)
          ),
          this.sidebar.addEventListener("theme:range:update", (e) => this.updateRange(e))),
          this.sidebar && this.sidebar.addEventListener("click", (e) => this.filterUpdateFromUrl(e)),
          this.productsContainer && this.productsContainer.addEventListener("click", (e) => this.filterUpdateFromUrl(e)),
          this.sort && this.container.addEventListener("theme:filter:update", (e) => this.submitForm(e)),
          (this.sidebar || this.sort) && window.addEventListener("popstate", (e) => this.submitForm(e));
      }
      initRangeSlider() {
        new RangeSlider(this.form);
      }
      filterUpdateFromUrl(e) {
        const t = e.target;
        if (t.matches(selectors$C.filterUpdateUrlButton) || (t.closest(selectors$C.filterUpdateUrlButton) && t)) {
          e.preventDefault();
          const s = t.matches(selectors$C.filterUpdateUrlButton) ? t : t.closest(selectors$C.filterUpdateUrlButton);
          this.submitForm(e, s.getAttribute("href"));
        }
      }
      submitForm(e, t = "") {
        this.sort = this.container.querySelector(`[${selectors$C.sort}]`);
        const s = this.sort ? this.sort.getAttribute(selectors$C.sort) : "";
        if (!e || (e && "popstate" !== e.type))
          if ("" === t) {
            let t = new window.URL(window.location.href).searchParams;
            const i = t,
              o = Object.fromEntries(i),
              r = t.toString();
            if (r.includes("filter.") || r.includes("page=")) for (const e in o) (e.includes("filter.") || "page" === e) && t.delete(e);
            if (this.form) {
              const e = new FormData(this.form),
                s = new URLSearchParams(e),
                i = this.form.querySelector(selectors$C.rangeMin),
                o = this.form.querySelector(selectors$C.rangeMax),
                r = i && i.hasAttribute(selectors$C.rangeMinDefault) ? i.getAttribute(selectors$C.rangeMinDefault) : "",
                a = o && o.hasAttribute(selectors$C.rangeMaxDefault) ? o.getAttribute(selectors$C.rangeMaxDefault) : "";
              let n = 0;
              for (let [e, i] of s.entries()) e.includes("filter.") && i && (t.append(e, i), ((i === r && "filter.v.price.gte" === e) || (i === a && "filter.v.price.lte" === e)) && (n += 1));
              2 === n && (t.delete("filter.v.price.gte"), t.delete("filter.v.price.lte"));
            }
            if (s || (e && e.detail && e.detail.href)) {
              const i = s || e.detail.href;
              t.set("sort_by", i);
            }
            const a = t.toString(),
              n = a ? `?${a}` : location.pathname;
            window.history.pushState(null, "", n);
          } else window.history.pushState(null, "", t);
        else this.sort && this.sort.dispatchEvent(new CustomEvent("theme:filter:sort", { bubbles: !1 }));
        this.productsContainer &&
          (this.productsContainer.classList.add(classes$w.loading),
          fetch(`${window.location.pathname}${window.location.search}`)
            .then((e) => e.text())
            .then((e) => {
              if (((this.productsContainer.innerHTML = new DOMParser().parseFromString(e, "text/html").querySelector(selectors$C.productsContainer).innerHTML), this.sidebar)) {
                this.sidebar.innerHTML = new DOMParser().parseFromString(e, "text/html").querySelector(selectors$C.collectionSidebar).innerHTML;
                const t = this.sidebar.querySelector(`[${selectors$C.activeFiltersCount}]`),
                  s = this.container.querySelectorAll(selectors$C.activeFilters);
                if (t && s.length) {
                  const e = parseInt(t.getAttribute(selectors$C.activeFiltersCount));
                  s.forEach((t) => {
                    (t.textContent = e), t.classList.toggle(classes$w.hidden, e < 1);
                  });
                }
              }
              this.form && ((this.form = this.container.querySelector(selectors$C.form)), this.initRangeSlider());
              new Collection(this.section).onUnload(!1),
                makeGridSwatches(this.section),
                new Siblings(this.section),
                document.dispatchEvent(new CustomEvent("theme:tooltip:close", { bubbles: !1, detail: { hideTransition: !1 } })),
                this.collectionNav && scrollTo(this.productsContainer.getBoundingClientRect().top - this.collectionNav.offsetHeight),
                setTimeout(() => {
                  this.productsContainer.classList.remove(classes$w.loading);
                }, 500);
            })
            .catch((e) => {
              console.log(e);
            }));
      }
      updateRange(e) {
        if (this.form && "function" == typeof this.form.submit) {
          const t = this.form.querySelector(selectors$C.rangeMin),
            s = this.form.querySelector(selectors$C.rangeMax),
            i = this.form.querySelector(selectors$C.priceMin),
            o = this.form.querySelector(selectors$C.priceMax);
          if (t && s && i && o && t.hasAttribute(selectors$C.rangeMinValue) && s.hasAttribute(selectors$C.rangeMaxValue)) {
            const r = parseInt(i.placeholder),
              a = parseInt(o.placeholder),
              n = parseInt(t.getAttribute(selectors$C.rangeMinValue)),
              l = parseInt(s.getAttribute(selectors$C.rangeMaxValue));
            (r === n && a === l) || ((i.value = n), (o.value = l), this.submitForm(e));
          }
        }
      }
      constructor(e) {
        (this.section = e),
          (this.container = this.section.container),
          (this.sidebar = this.container.querySelector(selectors$C.collectionSidebar)),
          (this.form = this.container.querySelector(selectors$C.form)),
          (this.sort = this.container.querySelector(`[${selectors$C.sort}]`)),
          (this.productsContainer = this.container.querySelector(selectors$C.productsContainer)),
          (this.collectionNav = this.container.querySelector(selectors$C.collectionNav)),
          this.init();
      }
    };
  const collectionFiltersForm = {
      onLoad() {
        sections$m[this.id] = new FiltersForm(this);
      },
    },
    selectors$B = {
      dataSort: "data-sort-enabled",
      sortLinks: "[data-sort-link]",
      sortValue: "data-value",
      sortButton: "[data-popout-toggle]",
      sortButtonText: "[data-sort-button-text]",
      collectionSidebar: "[data-collection-sidebar]",
      collectionSidebarSlider: "[data-collection-sidebar-slider]",
      collectionSidebarSlideOut: "[data-collection-sidebar-slide-out]",
      collectionSidebarCloseButton: "[data-collection-sidebar-close]",
      showMoreOptions: "[data-show-more]",
      groupTagsButton: "[data-aria-toggle]",
      collectionNav: "[data-collection-nav]",
      linkHidden: "[data-link-hidden]",
      underlay: "[data-drawer-underlay]",
      swatch: "data-swatch",
      animation: "[data-animation]",
    },
    classes$v = { animated: "drawer--animated", hiding: "is-hiding", expanded: "expanded", noMobileAnimation: "no-mobile-animation", hidden: "is-hidden", active: "is-active", focused: "is-focused" };
  let sections$l = {},
    Collection = class {
      init() {
        if ((this.sort && this.initSort(), null !== this.groupTagsButton)) {
          document.addEventListener("theme:resize", this.sidebarResizeEvent),
            this.groupTagsButton.addEventListener("click", this.groupTagsButtonClickEvent),
            this.collectionSidebar &&
              setTimeout(() => {
                this.collectionSidebar.classList.remove(classes$v.noMobileAnimation);
              }, 1e3);
          new MutationObserver((e) => {
            for (const t of e)
              if ("attributes" === t.type) {
                "true" == t.target.ariaExpanded && this.showSidebarCallback();
              }
          }).observe(this.groupTagsButton, { attributes: !0, childList: !1, subtree: !1 });
        }
        this.collectionSidebarCloseButtons.length &&
          this.collectionSidebarCloseButtons.forEach((e) => {
            e.addEventListener("click", this.collectionSidebarCloseEvent);
          }),
          this.container.addEventListener(
            "keyup",
            function (e) {
              e.code === window.theme.keyboardKeys.ESCAPE && this.hideSidebar();
            }.bind(this)
          ),
          this.underlay && this.underlay.addEventListener("click", this.collectionSidebarCloseEvent),
          this.showMoreOptions &&
            this.showMoreOptions.forEach((e) => {
              e.addEventListener("click", (t) => {
                t.preventDefault(),
                  e.parentElement.classList.add(classes$v.hidden),
                  e.parentElement.previousElementSibling.querySelectorAll(selectors$B.linkHidden).forEach((e, t) => {
                    e.classList.remove(classes$v.hidden), 0 === t && (window.accessibility.lastFocused = e);
                  });
                this.container.querySelector(selectors$B.collectionSidebarSlideOut) && (this.accessibility.removeTrapFocus(), this.accessibility.trapFocus(this.collectionSidebar, { elementToFocus: window.accessibility.lastFocused }));
              });
            }),
          this.swatches &&
            this.swatches.forEach((e) => {
              new Swatch(e);
            }),
          this.collectionSidebar &&
            (this.collectionSidebar.addEventListener("transitionend", () => {
              this.collectionSidebar.classList.contains(classes$v.expanded) || this.collectionSidebar.classList.remove(classes$v.animated);
            }),
            this.toggleSidebarSlider());
      }
      collectionSidebarScroll() {
        document.dispatchEvent(new CustomEvent("theme:tooltip:close", { bubbles: !1, detail: { hideTransition: !1 } }));
      }
      sortActions(e, t = !0) {
        const s = e ? e.getAttribute(selectors$B.sortValue) : "";
        this.sort.setAttribute(selectors$B.dataSort, s);
        const i = this.sort.querySelector(selectors$B.sortButtonText),
          o = this.sort.querySelector(`.${classes$v.active}`);
        if (i) {
          const t = e ? e.textContent.trim() : "";
          i.textContent = t;
        }
        o && o.classList.remove(classes$v.active),
          this.sort.classList.toggle(classes$v.active, e),
          e && (e.parentElement.classList.add(classes$v.active), t && e.dispatchEvent(new CustomEvent("theme:filter:update", { bubbles: !0, detail: { href: s } })));
      }
      onSortButtonClick(e) {
        e.preventDefault(), this.sortButton && this.sortButton.dispatchEvent(new Event("click")), this.sortActions(e.currentTarget);
      }
      onSortCheck(e) {
        let t = null;
        if (window.location.search.includes("sort_by")) {
          const e = new window.URL(window.location.href).searchParams;
          for (const [s, i] of e.entries()) {
            const e = this.sort.querySelector(`[${selectors$B.sortValue}="${i}"]`);
            if (s.includes("sort_by") && e) {
              t = e;
              break;
            }
          }
        }
        this.sortActions(t, !1);
      }
      initSort() {
        this.sortLinks.forEach((e) => {
          e.addEventListener("click", this.onSortButtonClickEvent);
        }),
          this.sort.addEventListener("theme:filter:sort", this.onSortCheckEvent),
          this.sortButton &&
            this.sortButton.addEventListener("click", () => {
              const e = this.collectionSidebar.classList.contains(classes$v.expanded);
              isMobile() && e && this.hideSidebar();
            });
      }
      showSidebarCallback() {
        const e = this.container.querySelector(selectors$B.collectionSidebarSlider),
          t = this.container.querySelector(selectors$B.collectionSidebarSlideOut),
          s = e || t,
          i = document.documentElement.hasAttribute("data-scroll-locked"),
          o = isMobile();
        this.collectionSidebar.classList.add(classes$v.animated),
          null === t && !o && i && (this.accessibility.removeTrapFocus(), document.dispatchEvent(new CustomEvent("theme:scroll:unlock", { bubbles: !0 }))),
          (o || null !== t) &&
            (t && this.accessibility.trapFocus(this.collectionSidebar, { elementToFocus: this.collectionSidebar.querySelector(selectors$B.collectionSidebarCloseButton) }),
            document.dispatchEvent(new CustomEvent("theme:scroll:lock", { bubbles: !0 }))),
          s && s.addEventListener("scroll", this.collectionSidebarScrollEvent);
      }
      hideSidebar() {
        const e = this.container.querySelector(selectors$B.collectionSidebarSlider),
          t = this.container.querySelector(selectors$B.collectionSidebarSlideOut),
          s = e || t,
          i = document.documentElement.hasAttribute("data-scroll-locked");
        this.groupTagsButton.setAttribute("aria-expanded", "false"),
          this.collectionSidebar.classList.remove(classes$v.expanded),
          s && s.removeEventListener("scroll", this.collectionSidebarScrollEvent),
          t && this.accessibility.removeTrapFocus(),
          i && document.dispatchEvent(new CustomEvent("theme:scroll:unlock", { bubbles: !0 }));
      }
      toggleSidebarSlider() {
        isMobile() ? this.hideSidebar() : this.collectionSidebar.classList.contains(classes$v.expanded) && this.showSidebarCallback();
      }
      collectionSidebarClose(e) {
        e.preventDefault(), this.hideSidebar(), document.body.classList.contains(classes$v.focused) && this.groupTagsButton && this.groupTagsButton.focus();
      }
      groupTagsButtonClick() {
        document.documentElement.hasAttribute("data-scroll-locked") && document.dispatchEvent(new CustomEvent("theme:scroll:unlock", { bubbles: !0 }));
      }
      onUnload(e = !0) {
        null !== this.groupTagsButton && (document.removeEventListener("theme:resize", this.sidebarResizeEvent), this.groupTagsButton.removeEventListener("click", this.groupTagsButtonClickEvent)),
          this.collectionSidebarCloseButtons.length &&
            e &&
            this.collectionSidebarCloseButtons.forEach((e) => {
              e.removeEventListener("click", this.collectionSidebarCloseEvent);
            }),
          this.collectionSidebarScrollable & e && this.collectionSidebarScrollable.removeEventListener("scroll", this.collectionSidebarScrollEvent),
          this.underlay && this.underlay.removeEventListener("click", this.collectionSidebarCloseEvent),
          this.sort &&
            (this.sortLinks.forEach((e) => {
              e.removeEventListener("click", this.onSortButtonClickEvent);
            }),
            this.sort.removeEventListener("theme:filter:sort", this.onSortCheckEvent));
      }
      constructor(e) {
        (this.container = e.container),
          (this.sort = this.container.querySelector(`[${selectors$B.dataSort}]`)),
          (this.sortButton = this.container.querySelector(selectors$B.sortButton)),
          (this.sortLinks = this.container.querySelectorAll(selectors$B.sortLinks)),
          (this.collectionSidebar = this.container.querySelector(selectors$B.collectionSidebar)),
          (this.collectionSidebarCloseButtons = this.container.querySelectorAll(selectors$B.collectionSidebarCloseButton)),
          (this.groupTagsButton = this.container.querySelector(selectors$B.groupTagsButton)),
          (this.collectionNav = this.container.querySelector(selectors$B.collectionNav)),
          (this.showMoreOptions = this.container.querySelectorAll(selectors$B.showMoreOptions)),
          (this.underlay = this.container.querySelector(selectors$B.underlay)),
          (this.swatches = this.container.querySelectorAll(`[${selectors$B.swatch}]`)),
          (this.accessibility = a11y),
          (this.groupTagsButtonClickEvent = (e) => this.groupTagsButtonClick(e)),
          (this.collectionSidebarCloseEvent = (e) => this.collectionSidebarClose(e)),
          (this.collectionSidebarScrollEvent = () => this.collectionSidebarScroll()),
          (this.onSortButtonClickEvent = (e) => this.onSortButtonClick(e)),
          (this.onSortCheckEvent = (e) => this.onSortCheck(e)),
          (this.sidebarResizeEvent = () => this.toggleSidebarSlider()),
          this.init();
      }
    };
  const collectionSection = {
    onLoad() {
      sections$l[this.id] = new Collection(this);
    },
    onUnload() {
      sections$l[this.id].onUnload();
    },
  };
  register("collection", [slider, parallaxHero, collectionSection, popoutSection, swatchGridSection, collectionFiltersForm, tooltipSection, siblings]);
  const selectors$A = { frame: "[data-ticker-frame]", scale: "[data-ticker-scale]", text: "[data-ticker-text]", clone: "data-clone" },
    attributes$g = { speed: "data-marquee-speed" },
    classes$u = { animation: "ticker--animated", unloaded: "ticker--unloaded", comparitor: "ticker__comparitor" },
    settings$1 = { textAnimationTime: 1.63, space: 100 };
  let Ticker = class {
    unload() {
      document.removeEventListener("theme:resize", this.resizeEvent);
    }
    listen() {
      document.addEventListener("theme:resize", this.resizeEvent), this.checkWidth();
    }
    checkWidth() {
      const e = 2 * window.getComputedStyle(this.frame).paddingLeft.replace("px", ""),
        t = this.frame.getAttribute(attributes$g.speed) ? this.frame.getAttribute(attributes$g.speed) : settings$1.textAnimationTime;
      if (this.frame.clientWidth - e < this.comparitor.clientWidth || this.stopClone) {
        if ((this.text.classList.add(classes$u.animation), 1 === this.scale.childElementCount)) {
          if (((this.clone = this.text.cloneNode(!0)), this.clone.setAttribute(selectors$A.clone, ""), this.scale.appendChild(this.clone), this.stopClone))
            for (let e = 0; e < 10; e++) {
              const e = this.text.cloneNode(!0);
              e.setAttribute(selectors$A.clone, ""), this.scale.appendChild(e);
            }
          const e = ((this.text.clientWidth / settings$1.space) * Number(t)).toFixed(2);
          this.scale.style.setProperty("--animation-time", `${e}s`);
        }
      } else {
        this.text.classList.add(classes$u.animation);
        let e = this.scale.querySelector(`[${selectors$A.clone}]`);
        e && this.scale.removeChild(e), this.text.classList.remove(classes$u.animation);
      }
    }
    constructor(e, t = !1) {
      (this.frame = e),
        (this.stopClone = t),
        (this.scale = this.frame.querySelector(selectors$A.scale)),
        (this.text = this.frame.querySelector(selectors$A.text)),
        (this.comparitor = this.text.cloneNode(!0)),
        this.comparitor.classList.add(classes$u.comparitor),
        this.frame.appendChild(this.comparitor),
        this.scale.classList.remove(classes$u.unloaded),
        (this.resizeEvent = debounce(() => this.checkWidth(), 100)),
        this.listen();
    }
  };
  const selectors$z = {
      bar: "[data-bar]",
      barSlide: "[data-slide]",
      frame: "[data-ticker-frame]",
      header: "[data-header-wrapper]",
      slider: "[data-slider]",
      marquee: "[data-marquee]",
      tickerScale: "[data-ticker-scale]",
      tickerText: "[data-ticker-text]",
    },
    classes$t = { tickerAnimated: "ticker--animated" },
    attributes$f = { slide: "data-slide", stop: "data-stop", style: "style", targetReferrer: "data-target-referrer" },
    sections$k = {};
  let Bar = class {
    init() {
      this.removeAnnouncement(), this.slider && this.initSliders(), this.marquee && this.initTickers(!0), document.dispatchEvent(new CustomEvent("theme:announcement:init", { bubbles: !0 }));
    }
    removeAnnouncement() {
      for (let e = 0; e < this.slides.length; e++) {
        const t = this.slides[e];
        t.hasAttribute(attributes$f.targetReferrer) && (-1 !== this.locationPath.indexOf(t.getAttribute(attributes$f.targetReferrer)) || window.Shopify.designMode || t.parentNode.removeChild(t));
      }
    }
    initSliders() {
      (this.slider = new Slider(this.barHolder)),
        this.slider.flkty
          ? (this.slider.flkty.reposition(),
            this.barHolder.addEventListener("theme:slider:loaded", () => {
              this.initTickers();
            }))
          : this.initTickers();
    }
    initTickers(e = !1) {
      this.barHolder.querySelectorAll(selectors$z.frame).forEach((t) => {
        new Ticker(t, e);
      });
    }
    toggleTicker(e, t) {
      const s = document.querySelector(selectors$z.tickerScale),
        i = document.querySelector(`[${attributes$f.slide}="${e.detail.blockId}"]`);
      t &&
        i &&
        (s.setAttribute(attributes$f.stop, ""),
        s.querySelectorAll(selectors$z.tickerText).forEach((e) => {
          e.classList.remove(classes$t.tickerAnimated), (e.style.transform = `translate3d(${-(i.offsetLeft - i.clientWidth)}px, 0, 0)`);
        })),
        !t &&
          i &&
          (s.querySelectorAll(selectors$z.tickerText).forEach((e) => {
            e.classList.add(classes$t.tickerAnimated), e.removeAttribute(attributes$f.style);
          }),
          s.removeAttribute(attributes$f.stop));
    }
    onBlockSelect(e) {
      this.slider ? this.slider.onBlockSelect(e) : this.toggleTicker(e, !0);
    }
    onBlockDeselect(e) {
      this.slider ? this.slider.onBlockDeselect(e) : this.toggleTicker(e, !1);
    }
    constructor(e) {
      (this.barHolder = e),
        (this.locationPath = location.href),
        (this.slides = this.barHolder.querySelectorAll(selectors$z.barSlide)),
        (this.slider = this.barHolder.querySelector(selectors$z.slider)),
        (this.marquee = this.barHolder.querySelector(selectors$z.marquee)),
        this.init();
    }
  };
  const bar = {
    onLoad() {
      sections$k[this.id] = [];
      const e = this.container.querySelector(selectors$z.bar);
      e && sections$k[this.id].push(new Bar(e));
    },
    onBlockSelect(e) {
      sections$k[this.id].length &&
        sections$k[this.id].forEach((t) => {
          "function" == typeof t.onBlockSelect && t.onBlockSelect(e);
        });
    },
    onBlockDeselect(e) {
      sections$k[this.id].length &&
        sections$k[this.id].forEach((t) => {
          "function" == typeof t.onBlockSelect && t.onBlockDeselect(e);
        });
    },
  };
  register("announcement", [bar]);
  const selectors$y = {
      body: "body",
      drawerWrappper: "[data-drawer]",
      drawerInner: "[data-drawer-inner]",
      underlay: "[data-drawer-underlay]",
      stagger: "[data-stagger-animation]",
      wrapper: "[data-header-transparent]",
      drawerToggle: "data-drawer-toggle",
      focusable: 'button, [href], select, textarea, [tabindex]:not([tabindex="-1"])',
    },
    classes$s = { animated: "drawer--animated", open: "is-open", isFocused: "is-focused", headerStuck: "js__header__stuck" };
  let sections$j = {},
    Drawer = class {
      connectToggle() {
        this.buttons.forEach((e) => {
          e.addEventListener("click", () => {
            this.drawer.dispatchEvent(new CustomEvent("theme:drawer:toggle", { bubbles: !1 }));
          });
        });
      }
      connectDrawer() {
        this.drawer.addEventListener("theme:drawer:toggle", () => {
          this.drawer.classList.contains(classes$s.open) ? this.drawer.dispatchEvent(new CustomEvent("theme:drawer:close", { bubbles: !0 })) : this.drawer.dispatchEvent(new CustomEvent("theme:drawer:open", { bubbles: !0 }));
        }),
          this.drawerInner &&
            this.drawerInner.addEventListener("transitionend", (e) => {
              e.target == this.drawerInner && (this.drawer.classList.contains(classes$s.open) || (this.drawer.classList.remove(classes$s.animated), document.dispatchEvent(new CustomEvent("theme:sliderule:close", { bubbles: !1 }))));
            }),
          document.addEventListener("theme:cart:open", this.hideDrawer),
          document.addEventListener("theme:drawer:close", this.hideDrawer),
          document.addEventListener("theme:drawer:open", this.showDrawer);
      }
      watchFocus(e) {
        !this.wrapper.contains(e.target) && this.body.classList.contains(classes$s.isFocused) && this.hideDrawer();
      }
      closers() {
        this.wrapper.addEventListener(
          "keyup",
          function (e) {
            e.code === window.theme.keyboardKeys.ESCAPE && (this.hideDrawer(), this.buttons[0].focus());
          }.bind(this)
        ),
          this.underlay.addEventListener("click", () => {
            this.hideDrawer();
          });
      }
      showDrawer() {
        this.drawerInner &&
          this.drawerInner.querySelector(this.btnSelector) &&
          (this.accessibility.removeTrapFocus(),
          this.drawerInner.addEventListener("transitionend", (e) => {
            e.target == this.drawerInner && this.drawer.classList.contains(classes$s.open) && this.accessibility.trapFocus(this.drawerInner, { elementToFocus: this.drawerInner.querySelector(this.btnSelector) });
          })),
          this.buttons.forEach((e) => {
            e.setAttribute("aria-expanded", !0);
          }),
          this.drawer.classList.add(classes$s.open),
          this.drawer.classList.add(classes$s.animated),
          this.drawer.querySelector(selectors$y.focusable).focus(),
          document.addEventListener("focusin", this.initWatchFocus),
          document.dispatchEvent(new CustomEvent("theme:scroll:lock", { bubbles: !0 }));
      }
      hideDrawer() {
        this.drawer.classList.contains(classes$s.open) &&
          (this.accessibility.removeTrapFocus(),
          this.body.classList.contains(classes$s.isFocused) && this.buttons.length && this.buttons[0].focus(),
          this.buttons.forEach((e) => {
            e.setAttribute("aria-expanded", !1);
          }),
          this.drawer.classList.remove(classes$s.open),
          document.removeEventListener("focusin", this.initWatchFocus),
          document.dispatchEvent(new CustomEvent("theme:scroll:unlock", { bubbles: !0 })));
      }
      onUnload() {
        document.removeEventListener("theme:cart:open", this.hideDrawer), document.removeEventListener("theme:drawer:close", this.hideDrawer), document.removeEventListener("theme:drawer:open", this.showDrawer);
      }
      constructor(e) {
        (this.drawer = e),
          (this.drawerWrapper = this.drawer.closest(selectors$y.drawerWrappper)),
          (this.drawerInner = this.drawer.querySelector(selectors$y.drawerInner)),
          (this.underlay = this.drawer.querySelector(selectors$y.underlay)),
          (this.wrapper = this.drawer.closest(selectors$y.wrapper)),
          (this.key = this.drawer.dataset.drawer),
          (this.btnSelector = `[${selectors$y.drawerToggle}='${this.key}']`),
          (this.buttons = document.querySelectorAll(this.btnSelector)),
          (this.staggers = this.drawer.querySelectorAll(selectors$y.stagger)),
          (this.body = document.querySelector(selectors$y.body)),
          (this.accessibility = a11y),
          (this.initWatchFocus = (e) => this.watchFocus(e)),
          (this.showDrawer = this.showDrawer.bind(this)),
          (this.hideDrawer = this.hideDrawer.bind(this)),
          this.connectToggle(),
          this.connectDrawer(),
          this.closers();
      }
    };
  const drawer = {
      onLoad() {
        sections$j[this.id] = [];
        this.container.querySelectorAll(selectors$y.drawerWrappper).forEach((e) => {
          sections$j[this.id].push(new Drawer(e));
        });
      },
      onUnload() {
        sections$j[this.id].forEach((e) => {
          "function" == typeof e.onUnload && e.onUnload();
        });
      },
    },
    selectors$x = { headerWrapper: "[data-header-wrapper]", header: "[data-header-wrapper] header", pageHeader: ".page-header" },
    classes$r = {
      stuck: "js__header__stuck",
      stuckAnimated: "js__header__stuck--animated",
      triggerAnimation: "js__header__stuck--trigger-animation",
      stuckBackdrop: "js__header__stuck__backdrop",
      headerIsNotVisible: "is-not-visible",
      hasStickyHeader: "has-sticky-header",
      headerGroup: "shopify-section-group-header-group",
    },
    attributes$e = { transparent: "data-header-transparent", stickyHeader: "data-header-sticky", scrollLock: "data-scroll-locked" };
  let sections$i = {},
    Sticky = class {
      unload() {
        (this.sticks || this.animated) && document.removeEventListener("theme:scroll", this.scrollEventListen),
          this.animated && (document.removeEventListener("theme:scroll:up", this.scrollEventUpListen), document.removeEventListener("theme:scroll:down", this.scrollEventDownListen)),
          this.static && document.removeEventListener("theme:scroll", this.scrollEventStatic),
          document.removeEventListener("shopify:section:load", this.updateHeaderOffset),
          document.removeEventListener("shopify:section:unload", this.updateHeaderOffset);
      }
      listen() {
        (this.sticks || this.animated) && document.addEventListener("theme:scroll", this.scrollEventListen),
          this.animated && (document.addEventListener("theme:scroll:up", this.scrollEventUpListen), document.addEventListener("theme:scroll:down", this.scrollEventDownListen)),
          document.addEventListener("shopify:section:load", this.updateHeaderOffset),
          document.addEventListener("shopify:section:unload", this.updateHeaderOffset);
      }
      listenScroll(e) {
        e.detail.down
          ? (!this.currentlyStuck && e.detail.position > this.headerOffset && this.stickSimple(), !this.currentlyBlurred && e.detail.position > this.headerOffset && this.addBlur())
          : (e.detail.position <= this.headerOffset && this.unstickSimple(), e.detail.position <= this.headerOffset && this.removeBlur());
      }
      updateHeaderOffset(e) {
        e.target.classList.contains(classes$r.headerGroup) &&
          setTimeout(() => {
            var e;
            this.headerOffset = null === (e = document.querySelector(selectors$x.pageHeader)) || void 0 === e ? void 0 : e.offsetTop;
          });
      }
      stickSimple() {
        this.animated && this.cls.add(classes$r.stuckAnimated), this.cls.add(classes$r.stuck), this.wrapper.setAttribute(attributes$e.transparent, !1), (this.currentlyStuck = !0);
      }
      unstickSimple() {
        document.documentElement.hasAttribute(attributes$e.scrollLock) ||
          (this.cls.remove(classes$r.stuck), this.wrapper.setAttribute(attributes$e.transparent, theme.settings.transparentHeader), this.animated && this.cls.remove(classes$r.stuckAnimated), (this.currentlyStuck = !1));
      }
      scrollDownInit() {
        window.scrollY > this.headerOffset && this.stickSimple(), window.scrollY > this.headerOffset && this.addBlur();
      }
      stickDirectional() {
        this.cls.add(classes$r.triggerAnimation);
      }
      unstickDirectional() {
        this.cls.remove(classes$r.triggerAnimation);
      }
      scrollDownDirectional() {
        this.unstickDirectional();
      }
      scrollUpDirectional() {
        window.scrollY <= this.headerOffset ? this.unstickDirectional() : this.stickDirectional();
      }
      addBlur() {
        this.cls.add(classes$r.stuckBackdrop), (this.currentlyBlurred = !0);
      }
      removeBlur() {
        this.cls.remove(classes$r.stuckBackdrop), (this.currentlyBlurred = !1);
      }
      checkIsVisible() {
        const e = document.querySelector(selectors$x.headerWrapper),
          t = e.getAttribute(attributes$e.stickyHeader),
          s = this.win.pageYOffset;
        t || e.classList.toggle(classes$r.headerIsNotVisible, s >= this.headerHeight);
      }
      constructor(e) {
        var t;
        (this.wrapper = e),
          (this.type = this.wrapper.dataset.headerSticky),
          (this.sticks = !1),
          (this.static = !0),
          this.wrapper.hasAttribute(attributes$e.stickyHeader) && ((this.sticks = !0), (this.static = !1)),
          (this.win = window),
          (this.animated = "directional" === this.type),
          (this.currentlyStuck = !1),
          (this.cls = this.wrapper.classList),
          (this.headerOffset = null === (t = document.querySelector(selectors$x.pageHeader)) || void 0 === t ? void 0 : t.offsetTop),
          (this.headerHeight = document.querySelector(selectors$x.header).clientHeight),
          (this.scrollEventStatic = () => this.checkIsVisible()),
          (this.scrollEventListen = (e) => this.listenScroll(e)),
          (this.scrollEventUpListen = () => this.scrollUpDirectional()),
          (this.scrollEventDownListen = () => this.scrollDownDirectional()),
          (this.updateHeaderOffset = this.updateHeaderOffset.bind(this)),
          this.sticks && (this.scrollDownInit(), document.body.classList.add(classes$r.hasStickyHeader)),
          this.static && document.addEventListener("theme:scroll", this.scrollEventStatic),
          this.listen();
      }
    };
  const stickyHeader = {
      onLoad() {
        sections$i = new Sticky(this.container);
      },
      onUnload: function () {
        "function" == typeof sections$i.unload && sections$i.unload();
      },
    },
    selectors$w = {
      disclosureToggle: "data-hover-disclosure-toggle",
      disclosureWrappper: "[data-hover-disclosure]",
      link: "[data-top-link]",
      wrapper: "[data-header-wrapper]",
      stagger: "[data-stagger]",
      staggerPair: "[data-stagger-first]",
      staggerAfter: "[data-stagger-second]",
      focusable: 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    },
    classes$q = { isVisible: "is-visible", meganavVisible: "meganav--visible", meganavIsTransitioning: "meganav--is-transitioning" };
  let sections$h = {},
    disclosures = {},
    HoverDisclosure = class {
      onBlockSelect(e) {
        this.disclosure.contains(e.target) && this.showDisclosure(e);
      }
      onBlockDeselect(e) {
        this.disclosure.contains(e.target) && this.hideDisclosure();
      }
      showDisclosure(e) {
        e && e.type && "mouseenter" === e.type && this.wrapper.classList.add(classes$q.meganavIsTransitioning),
          this.grandparent ? this.wrapper.classList.add(classes$q.meganavVisible) : this.wrapper.classList.remove(classes$q.meganavVisible),
          this.trigger.setAttribute("aria-expanded", !0),
          this.trigger.classList.add(classes$q.isVisible),
          this.disclosure.classList.add(classes$q.isVisible),
          this.transitionTimeout && clearTimeout(this.transitionTimeout),
          (this.transitionTimeout = setTimeout(() => {
            this.wrapper.classList.remove(classes$q.meganavIsTransitioning);
          }, 200));
      }
      hideDisclosure() {
        this.disclosure.classList.remove(classes$q.isVisible),
          this.trigger.classList.remove(classes$q.isVisible),
          this.trigger.setAttribute("aria-expanded", !1),
          this.wrapper.classList.remove(classes$q.meganavVisible, classes$q.meganavIsTransitioning);
      }
      staggerChildAnimations() {
        this.disclosure.querySelectorAll(selectors$w.stagger).forEach((e, t) => {
          e.style.transitionDelay = 50 * t + 10 + "ms";
        });
        this.disclosure.querySelectorAll(selectors$w.staggerPair).forEach((e, t) => {
          const s = 100 * t;
          (e.style.transitionDelay = `${s}ms`),
            e.parentElement.querySelectorAll(selectors$w.staggerAfter).forEach((e, t) => {
              const i = 20 * (t + 1);
              e.style.transitionDelay = `${s + i}ms`;
            });
        });
      }
      handleTablets() {
        this.trigger.addEventListener(
          "touchstart",
          function (e) {
            this.disclosure.classList.contains(classes$q.isVisible) || (e.preventDefault(), this.showDisclosure(e));
          }.bind(this),
          { passive: !0 }
        );
      }
      connectHoverToggle() {
        this.trigger.addEventListener("mouseenter", (e) => this.showDisclosure(e)),
          this.link.addEventListener("focus", (e) => this.showDisclosure(e)),
          this.trigger.addEventListener("mouseleave", () => this.hideDisclosure()),
          this.trigger.addEventListener("focusout", (e) => {
            this.trigger.contains(e.relatedTarget) || this.hideDisclosure();
          }),
          this.disclosure.addEventListener("keyup", (e) => {
            e.code === window.theme.keyboardKeys.ESCAPE && this.hideDisclosure();
          });
      }
      constructor(e) {
        (this.disclosure = e),
          (this.wrapper = e.closest(selectors$w.wrapper)),
          (this.key = this.disclosure.id),
          (this.trigger = document.querySelector(`[${selectors$w.disclosureToggle}='${this.key}']`)),
          (this.link = this.trigger.querySelector(selectors$w.link)),
          (this.grandparent = this.trigger.classList.contains("grandparent")),
          (this.transitionTimeout = 0),
          this.trigger.setAttribute("aria-haspopup", !0),
          this.trigger.setAttribute("aria-expanded", !1),
          this.trigger.setAttribute("aria-controls", this.key),
          this.connectHoverToggle(),
          this.handleTablets(),
          this.staggerChildAnimations();
      }
    };
  const hoverDisclosure = {
      onLoad() {
        (sections$h[this.id] = []),
          (disclosures = this.container.querySelectorAll(selectors$w.disclosureWrappper)),
          disclosures.forEach((e) => {
            sections$h[this.id].push(new HoverDisclosure(e));
          });
      },
      onBlockSelect(e) {
        sections$h[this.id].forEach((t) => {
          "function" == typeof t.onBlockSelect && t.onBlockSelect(e);
        });
      },
      onBlockDeselect(e) {
        sections$h[this.id].forEach((t) => {
          "function" == typeof t.onBlockDeselect && t.onBlockDeselect(e);
        });
      },
    },
    selectors$v = { count: "data-cart-count" };
  let Totals = class {
    listen() {
      document.addEventListener("theme:cart:change", (e) => {
        (this.cartCount = e.detail.cartCount), this.update();
      });
    }
    update() {
      null !== this.cartCount &&
        this.counts.forEach((e) => {
          e.setAttribute(selectors$v.count, this.cartCount), (e.innerHTML = this.cartCount < 10 ? `${this.cartCount}` : "9+");
        });
    }
    constructor(e) {
      (this.section = e), (this.counts = this.section.querySelectorAll(`[${selectors$v.count}]`)), (this.cartCount = null), this.listen();
    }
  };
  const headerTotals = {
      onLoad() {
        new Totals(this.container);
      },
    },
    selectors$u = {
      slideruleOpen: "data-sliderule-open",
      slideruleClose: "data-sliderule-close",
      sliderulePane: "data-sliderule-pane",
      slideruleWrappper: "[data-sliderule]",
      drawerContent: "[data-drawer-content]",
      focusable: 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      dataAnimates: "data-animates",
      children: ":scope > [data-animates], \n             :scope > * > [data-animates], \n             :scope > * > * >[data-animates],\n             :scope > * > .sliderule-grid  > *",
    },
    classes$p = { isVisible: "is-visible", isHiding: "is-hiding", isHidden: "is-hidden", focused: "is-focused", scrolling: "is-scrolling" };
  let sections$g = {},
    HeaderMobileSliderule = class {
      clickEvents() {
        this.trigger.addEventListener("click", () => {
          (this.cachedButton = this.trigger), this.showSliderule();
        }),
          this.exit.forEach((e) => {
            e.addEventListener("click", () => {
              this.hideSliderule();
            });
          });
      }
      keyboardEvents() {
        this.sliderule.addEventListener("keyup", (e) => {
          e.stopPropagation(), e.code === window.theme.keyboardKeys.ESCAPE && this.hideSliderule();
        });
      }
      trapFocusSliderule(e = !0) {
        const t = e ? this.sliderule.querySelector(this.exitSelector) : this.cachedButton;
        this.accessibility.removeTrapFocus(), t && this.drawerContent && this.accessibility.trapFocus(this.drawerContent, { elementToFocus: document.body.classList.contains(classes$p.focused) ? t : null });
      }
      hideSliderule(e = !1) {
        const t = parseInt(this.pane.dataset.sliderulePane, 10) - 1;
        this.pane.setAttribute(selectors$u.sliderulePane, t), this.pane.classList.add(classes$p.isHiding), this.sliderule.classList.add(classes$p.isHiding);
        const s = e ? `[${selectors$u.dataAnimates}].${classes$p.isHidden}` : `[${selectors$u.dataAnimates}="${t}"]`,
          i = this.pane.querySelectorAll(s);
        i.length &&
          i.forEach((e) => {
            e.classList.remove(classes$p.isHidden);
          });
        const o = e ? this.pane.querySelectorAll(`.${classes$p.isVisible}, .${classes$p.isHiding}`) : this.children;
        o.forEach((s, i) => {
          const r = o.length - 1 == i;
          s.classList.remove(classes$p.isVisible), e && (s.classList.remove(classes$p.isHiding), this.pane.classList.remove(classes$p.isHiding));
          const a = () => {
            parseInt(this.pane.getAttribute(selectors$u.sliderulePane)) === t && this.sliderule.classList.remove(classes$p.isVisible),
              this.sliderule.classList.remove(classes$p.isHiding),
              this.pane.classList.remove(classes$p.isHiding),
              r && (this.accessibility.removeTrapFocus(), e || this.trapFocusSliderule(!1)),
              s.removeEventListener("animationend", a);
          };
          window.theme.settings.enableAnimations ? s.addEventListener("animationend", a) : a();
        });
      }
      showSliderule() {
        let e = null;
        const t = this.sliderule.closest(`.${classes$p.isVisible}`);
        let s = this.pane;
        t && (s = t), s.scrollTo({ top: 0, left: 0, behavior: "smooth" }), s.classList.add(classes$p.scrolling);
        const i = () => {
          s.scrollTop <= 0 ? (s.classList.remove(classes$p.scrolling), e && cancelAnimationFrame(e)) : (e = requestAnimationFrame(i));
        };
        (e = requestAnimationFrame(i)), this.sliderule.classList.add(classes$p.isVisible);
        const o = parseInt(this.pane.dataset.sliderulePane, 10),
          r = o + 1;
        this.pane.setAttribute(selectors$u.sliderulePane, r);
        const a = this.pane.querySelectorAll(`[${selectors$u.dataAnimates}="${o}"]`);
        a.length &&
          a.forEach((e, t) => {
            const s = a.length - 1 == t;
            e.classList.add(classes$p.isHiding);
            const i = () => {
              e.classList.remove(classes$p.isHiding), parseInt(this.pane.getAttribute(selectors$u.sliderulePane)) !== o && e.classList.add(classes$p.isHidden), s && this.trapFocusSliderule(), e.removeEventListener("animationend", i);
            };
            window.theme.settings.enableAnimations ? e.addEventListener("animationend", i) : i();
          });
      }
      closeSliderule() {
        this.pane &&
          this.pane.hasAttribute(selectors$u.sliderulePane) &&
          parseInt(this.pane.getAttribute(selectors$u.sliderulePane)) > 0 &&
          (this.hideSliderule(!0), parseInt(this.pane.getAttribute(selectors$u.sliderulePane)) > 0 && this.pane.setAttribute(selectors$u.sliderulePane, 0));
      }
      onUnload() {
        document.removeEventListener("theme:sliderule:close", this.closeSliderule);
      }
      constructor(e) {
        (this.sliderule = e), (this.key = this.sliderule.id);
        const t = `[${selectors$u.slideruleOpen}='${this.key}']`;
        (this.exitSelector = `[${selectors$u.slideruleClose}='${this.key}']`),
          (this.trigger = document.querySelector(t)),
          (this.exit = document.querySelectorAll(this.exitSelector)),
          (this.pane = document.querySelector(`[${selectors$u.sliderulePane}]`)),
          (this.children = this.sliderule.querySelectorAll(selectors$u.children)),
          (this.drawerContent = document.querySelector(selectors$u.drawerContent)),
          (this.cachedButton = null),
          (this.accessibility = a11y),
          this.trigger.setAttribute("aria-haspopup", !0),
          this.trigger.setAttribute("aria-expanded", !1),
          this.trigger.setAttribute("aria-controls", this.key),
          (this.closeSliderule = this.closeSliderule.bind(this)),
          this.clickEvents(),
          this.keyboardEvents(),
          document.addEventListener("theme:sliderule:close", this.closeSliderule);
      }
    };
  const headerMobileSliderule = {
      onLoad() {
        sections$g[this.id] = [];
        this.container.querySelectorAll(selectors$u.slideruleWrappper).forEach((e) => {
          sections$g[this.id].push(new HeaderMobileSliderule(e));
        });
      },
      onUnload() {
        sections$g[this.id].forEach((e) => {
          "function" == typeof e.onUnload && e.onUnload();
        });
      },
    },
    selectors$t = {
      wrapper: "[data-header-wrapper]",
      style: "data-header-style",
      widthContentWrapper: "[data-takes-space-wrapper]",
      widthContent: "[data-child-takes-space]",
      desktop: "[data-header-desktop]",
      cloneClass: "js__header__clone",
      showMobileClass: "js__show__mobile",
      backfill: "[data-header-backfill]",
      transparent: "data-header-transparent",
      firstSectionHasImage: ".main-content > .shopify-section:first-child [data-overlay-header]",
      preventTransparentHeader: ".main-content > .shopify-section:first-child [data-prevent-transparent-header]",
      deadLink: '.navlink[href="#"]',
      cartToggleButton: "[data-cart-toggle]",
    },
    classes$o = { hasTransparentHeader: "has-transparent-header" };
  let sections$f = {},
    Header = class {
      checkForImage() {
        this.overlayedImages = document.querySelectorAll(selectors$t.firstSectionHasImage);
        let e = document.querySelectorAll(selectors$t.preventTransparentHeader).length;
        this.overlayedImages.length && !e && this.isTransparentHeader
          ? (this.listenOverlay(),
            this.wrapper.setAttribute(selectors$t.transparent, !0),
            (document.querySelector(selectors$t.backfill).style.display = "none"),
            (theme.settings.transparentHeader = !0),
            document.body.classList.add(classes$o.hasTransparentHeader))
          : (this.wrapper.setAttribute(selectors$t.transparent, !1),
            (document.querySelector(selectors$t.backfill).style.display = "block"),
            (theme.settings.transparentHeader = !1),
            document.body.classList.remove(classes$o.hasTransparentHeader)),
          this.subtractAnnouncementHeight();
      }
      listenOverlay() {
        document.addEventListener("theme:resize", this.resizeEventOverlay), this.subtractAnnouncementHeight();
      }
      listenWidth() {
        "ResizeObserver" in window ? ((this.resizeObserver = new ResizeObserver(this.checkWidth)), this.resizeObserver.observe(this.wrapper)) : document.addEventListener("theme:resize", this.checkWidth);
      }
      listenSectionEvents() {
        document.addEventListener("shopify:section:load", this.headerUpdateEvent), document.addEventListener("shopify:section:unload", this.headerUpdateEvent), document.addEventListener("shopify:section:reorder", this.headerUpdateEvent);
      }
      killDeadLinks() {
        this.deadLinks.forEach((e) => {
          e.onclick = (e) => {
            e.preventDefault();
          };
        });
      }
      subtractAnnouncementHeight() {
        const e = getScreenOrientation(),
          { announcementHeight: t, headerHeight: s } = readHeights();
        let { windowHeight: i } = readHeights();
        this.screenOrientation === e && isMobile() ? (i = window.initialWindowHeight) : (window.initialWindowHeight = i),
          this.overlayedImages.forEach((e) => {
            theme.settings.transparentHeader ? e.style.setProperty("--full-screen", i - t + "px") : e.style.setProperty("--full-screen", i - s + "px"), e.classList.add("has-overlay");
          }),
          this.screenOrientation !== e && (this.screenOrientation = e);
      }
      checkWidth() {
        document.body.clientWidth < this.minWidth ? this.wrapper.classList.add(selectors$t.showMobileClass) : this.wrapper.classList.remove(selectors$t.showMobileClass);
      }
      getMinWidth() {
        const e = this.wrapper.cloneNode(!0);
        e.classList.add(selectors$t.cloneClass), document.body.appendChild(e);
        const t = e.querySelectorAll(selectors$t.widthContentWrapper);
        let s = 0,
          i = 0;
        return (
          t.forEach((e) => {
            const t = e.querySelectorAll(selectors$t.widthContent);
            let o = 0;
            (o = 3 === t.length ? _sumSplitWidths(t) : _sumWidths(t)), o > s && ((s = o), (i = 20 * t.length));
          }),
          document.body.removeChild(e),
          s + i
        );
      }
      cartToggleEvent() {
        const e = this.wrapper.querySelectorAll(selectors$t.cartToggleButton);
        e.length &&
          e.forEach((e) => {
            e.addEventListener("click", (e) => {
              e.preventDefault(), document.dispatchEvent(new CustomEvent("theme:cart:toggle", { bubbles: !0 }));
            });
          });
      }
      unload() {
        var e;
        "ResizeObserver" in window ? null === (e = this.resizeObserver) || void 0 === e || e.unobserve(this.wrapper) : document.removeEventListener("theme:resize", this.checkWidth);
        document.removeEventListener("theme:resize", this.resizeEventOverlay),
          document.removeEventListener("shopify:section:load", this.headerUpdateEvent),
          document.removeEventListener("shopify:section:unload", this.headerUpdateEvent),
          document.removeEventListener("shopify:section:reorder", this.headerUpdateEvent);
      }
      constructor(e) {
        (this.wrapper = e),
          (this.style = this.wrapper.dataset.style),
          (this.desktop = this.wrapper.querySelector(selectors$t.desktop)),
          (this.isTransparentHeader = "false" !== this.wrapper.getAttribute(selectors$t.transparent)),
          (this.overlayedImages = document.querySelectorAll(selectors$t.firstSectionHasImage)),
          (this.deadLinks = document.querySelectorAll(selectors$t.deadLink)),
          (this.resizeObserver = null),
          (this.headerUpdateEvent = debounce(() => this.checkForImage(), 500)),
          (this.resizeEventOverlay = () => this.subtractAnnouncementHeight()),
          (this.checkWidth = this.checkWidth.bind(this)),
          this.killDeadLinks(),
          "drawer" !== this.style && this.desktop && ((this.minWidth = this.getMinWidth()), this.listenWidth()),
          this.checkForImage(),
          this.listenSectionEvents(),
          this.cartToggleEvent(),
          (this.screenOrientation = getScreenOrientation());
      }
    };
  function _sumSplitWidths(e) {
    let t = [];
    e.forEach((e) => {
      e.firstElementChild && t.push(e.firstElementChild.clientWidth);
    }),
      t[0] > t[2] ? (t[2] = t[0]) : (t[0] = t[2]);
    return t.reduce((e, t) => e + t);
  }
  function _sumWidths(e) {
    let t = 0;
    return (
      e.forEach((e) => {
        t += e.clientWidth;
      }),
      t
    );
  }
  const header = {
    onLoad() {
      (sections$f = new Header(this.container)), setVarsOnResize();
    },
    onUnload() {
      "function" == typeof sections$f.unload && sections$f.unload();
    },
  };
  register("header", [header, drawer, popoutSection, headerMobileSliderule, stickyHeader, hoverDisclosure, headerTotals]);
  const selectors$s = { scrollElement: "[data-block-scroll]", flickityEnabled: "flickity-enabled" },
    sections$e = {};
  let BlockScroll = class {
    onBlockSelect(e) {
      const t = this.container.querySelector(selectors$s.scrollElement);
      if (t && !t.classList.contains(selectors$s.flickityEnabled)) {
        const s = e.srcElement;
        s && t.scrollTo({ top: 0, left: s.offsetLeft, behavior: "smooth" });
      }
    }
    constructor(e) {
      this.container = e.container;
    }
  };
  const blockScroll = {
      onLoad() {
        sections$e[this.id] = new BlockScroll(this);
      },
      onBlockSelect(e) {
        sections$e[this.id].onBlockSelect(e);
      },
    },
    selectors$r = {
      slider: "[data-slider-mobile]",
      slide: "[data-slide]",
      thumb: "[data-slider-thumb]",
      sliderContainer: "[data-slider-container]",
      popupContainer: "[data-popup-container]",
      popupClose: "[data-popup-close]",
      headerSticky: "[data-header-sticky]",
      headerHeight: "[data-header-height]",
    },
    classes$n = { isAnimating: "is-animating", isSelected: "is-selected", isOpen: "is-open" },
    attributes$d = { thumbValue: "data-slider-thumb" },
    sections$d = {};
  let Look = class {
    init() {
      this.slider &&
        this.slides.length &&
        this.thumbs.length &&
        (this.popupContainer.addEventListener("transitionend", (e) => {
          e.target == this.popupContainer && (this.popupContainer.classList.remove(classes$n.isAnimating), e.target.classList.contains(classes$n.isOpen) ? this.popupOpenCallback() : this.popupCloseCallback());
        }),
        this.popupContainer.addEventListener("transitionstart", (e) => {
          e.target == this.popupContainer && this.popupContainer.classList.add(classes$n.isAnimating);
        }),
        this.popupClose.forEach((e) => {
          e.addEventListener("click", () => {
            this.popupContainer.classList.remove(classes$n.isOpen), this.scrollUnlock();
          });
        }),
        this.thumbs.forEach((e, t) => {
          e.addEventListener("click", (s) => {
            s.preventDefault();
            const i = e.hasAttribute(attributes$d.thumbValue) && "" !== e.getAttribute(attributes$d.thumbValue) ? parseInt(e.getAttribute(attributes$d.thumbValue)) : t,
              o = this.slides[i];
            if (isMobile()) {
              const e = parseInt(window.getComputedStyle(this.slider).paddingLeft),
                t = o.offsetLeft;
              this.slider.scrollTo({ top: 0, left: t - e, behavior: "auto" }), this.scrollLock(), this.popupContainer.classList.add(classes$n.isAnimating, classes$n.isOpen);
            } else {
              const e = document.querySelector(selectors$r.headerSticky) && document.querySelector(selectors$r.headerHeight) ? document.querySelector(selectors$r.headerHeight).getBoundingClientRect().height : 0,
                t = o.getBoundingClientRect().top,
                s = o.offsetHeight / 2,
                i = window.innerHeight,
                r = i / 2,
                a = this.container.querySelector(selectors$r.sliderContainer);
              let n = t + s - r + window.scrollY;
              if (a) {
                const t = a.getBoundingClientRect().top + window.scrollY,
                  s = t + a.offsetHeight;
                n < t ? (n = t - e) : n + i > s && (n = s - i);
              }
              window.scrollTo({ top: n, left: 0, behavior: "smooth" });
            }
          });
        }));
    }
    popupCloseByEvent() {
      this.popupContainer.classList.remove(classes$n.isOpen);
    }
    popupOpenCallback() {
      document.addEventListener("theme:quick-add:open", this.popupCloseByEvent, { once: !0 }), document.addEventListener("theme:product:added", this.popupCloseByEvent, { once: !0 });
    }
    popupCloseCallback() {
      document.removeEventListener("theme:quick-add:open", this.popupCloseByEvent, { once: !0 }), document.removeEventListener("theme:product:added", this.popupCloseByEvent, { once: !0 });
    }
    scrollLock() {
      document.dispatchEvent(new CustomEvent("theme:scroll:lock", { bubbles: !0 }));
    }
    scrollUnlock() {
      document.dispatchEvent(new CustomEvent("theme:scroll:unlock", { bubbles: !0 }));
    }
    constructor(e) {
      (this.container = e.container),
        (this.slider = this.container.querySelector(selectors$r.slider)),
        (this.slides = this.container.querySelectorAll(selectors$r.slide)),
        (this.thumbs = this.container.querySelectorAll(selectors$r.thumb)),
        (this.popupContainer = this.container.querySelector(selectors$r.popupContainer)),
        (this.popupClose = this.container.querySelectorAll(selectors$r.popupClose)),
        (this.popupCloseByEvent = this.popupCloseByEvent.bind(this)),
        this.init();
    }
  };
  const lookSection = {
    onLoad() {
      sections$d[this.id] = new Look(this);
    },
  };
  register("look", [lookSection, swatchGridSection, siblings, blockScroll]);
  const selectors$q = {
      body: "body",
      dataRelatedSectionElem: "[data-related-section]",
      dataTabsHolder: "[data-tabs-holder]",
      dataTab: "data-tab",
      dataTabIndex: "data-tab-index",
      dataAos: "[data-aos]",
      blockId: "data-block-id",
      tabsLi: "[data-tab]",
      tabLink: ".tab-link",
      tabLinkRecent: ".tab-link__recent",
      tabContent: ".tab-content",
      scrollbarHolder: "[data-scrollbar]",
    },
    classes$m = { current: "current", hidden: "hidden", aosAnimate: "aos-animate", aosNoTransition: "aos-no-transition", focused: "is-focused" },
    sections$c = {};
  let GlobalTabs = class {
    init() {
      const e = this.container.querySelectorAll(selectors$q.tabsLi);
      this.container.addEventListener("theme:tab:check", () => this.checkRecentTab()),
        this.container.addEventListener("theme:tab:hide", () => this.hideRelatedTab()),
        e.length &&
          e.forEach((e) => {
            const t = parseInt(e.getAttribute(selectors$q.dataTab)),
              s = this.container.querySelector(`${selectors$q.tabContent}-${t}`);
            e.addEventListener("click", () => {
              this.tabChange(e, s);
            }),
              e.addEventListener("keyup", (t) => {
                (t.code !== window.theme.keyboardKeys.SPACE && t.code !== window.theme.keyboardKeys.ENTER) || !this.body.classList.contains(classes$m.focused) || this.tabChange(e, s);
              });
          });
    }
    tabChange(e, t) {
      if (e.classList.contains(classes$m.current)) return;
      const s = this.container.querySelector(`${selectors$q.tabsLi}.${classes$m.current}`),
        i = this.container.querySelector(`${selectors$q.tabContent}.${classes$m.current}`);
      null == s || s.classList.remove(classes$m.current),
        null == i || i.classList.remove(classes$m.current),
        e.classList.add(classes$m.current),
        t.classList.add(classes$m.current),
        e.classList.contains(classes$m.hidden) && t.classList.add(classes$m.hidden),
        this.accessibility.a11y.removeTrapFocus(),
        this.container.dispatchEvent(new CustomEvent("theme:tab:change", { bubbles: !0 })),
        e.dispatchEvent(new CustomEvent("theme:form:sticky", { bubbles: !0, detail: { element: "tab" } })),
        this.animateItems(t);
    }
    animateItems(e, t = !0) {
      const s = e.querySelectorAll(selectors$q.dataAos);
      s.length &&
        s.forEach((e) => {
          e.classList.remove(classes$m.aosAnimate),
            t &&
              (e.classList.add(classes$m.aosNoTransition),
              requestAnimationFrame(() => {
                e.classList.remove(classes$m.aosNoTransition), e.classList.add(classes$m.aosAnimate);
              }));
        });
    }
    initNativeScrollbar() {
      this.scrollbarHolder.length &&
        this.scrollbarHolder.forEach((e) => {
          new NativeScrollbar(e);
        });
    }
    checkRecentTab() {
      const e = this.container.querySelector(selectors$q.tabLinkRecent);
      if (e) {
        e.classList.remove(classes$m.hidden);
        const t = parseInt(e.getAttribute(selectors$q.dataTab)),
          s = this.container.querySelector(`${selectors$q.tabContent}[${selectors$q.dataTabIndex}="${t}"]`);
        s && (s.classList.remove(classes$m.hidden), this.animateItems(s, !1)), this.initNativeScrollbar();
      }
    }
    hideRelatedTab() {
      const e = this.container.querySelector(selectors$q.dataRelatedSectionElem);
      if (!e) return;
      const t = e.closest(`${selectors$q.tabContent}.${classes$m.current}`);
      if (!t) return;
      const s = parseInt(t.getAttribute(selectors$q.dataTabIndex)),
        i = this.container.querySelectorAll(selectors$q.tabsLi);
      if (i.length > s) {
        const e = i[s].nextSibling;
        e && (i[s].classList.add(classes$m.hidden), e.dispatchEvent(new Event("click")), this.initNativeScrollbar());
      }
    }
    onBlockSelect(e) {
      const t = this.container.querySelector(`${selectors$q.tabLink}[${selectors$q.blockId}="${e.detail.blockId}"]`);
      t && (t.dispatchEvent(new Event("click")), t.parentNode.scrollTo({ top: 0, left: t.offsetLeft - t.clientWidth, behavior: "smooth" }));
    }
    constructor(e) {
      (this.container = e),
        (this.body = document.querySelector(selectors$q.body)),
        (this.accessibility = window.accessibility),
        this.container && ((this.scrollbarHolder = this.container.querySelectorAll(selectors$q.scrollbarHolder)), this.init(), this.initNativeScrollbar());
    }
  };
  const tabs = {
      onLoad() {
        sections$c[this.id] = [];
        this.container.querySelectorAll(selectors$q.dataTabsHolder).forEach((e) => {
          sections$c[this.id].push(new GlobalTabs(e));
        });
      },
      onBlockSelect(e) {
        sections$c[this.id].forEach((t) => {
          "function" == typeof t.onBlockSelect && t.onBlockSelect(e);
        });
      },
    },
    selectors$p = {
      dataEnableSound: "data-enable-sound",
      dataEnableBackground: "data-enable-background",
      dataEnableAutoplay: "data-enable-autoplay",
      dataEnableLoop: "data-enable-loop",
      dataVideoId: "data-video-id",
      dataVideoType: "data-video-type",
      videoIframe: "[data-video-id]",
    },
    classes$l = { loaded: "loaded" };
  let LoadVideoVimeo = class {
    init() {
      this.loadVimeoPlayer();
    }
    loadVimeoPlayer() {
      const e = "https://vimeo.com/" + this.videoID;
      let t = "";
      const s = this.player,
        i = { url: e, background: this.enableBackground, muted: this.disableSound, autoplay: this.enableAutoplay, loop: this.enableLoop };
      for (let e in i) t += encodeURIComponent(e) + "=" + encodeURIComponent(i[e]) + "&";
      fetch(`https://vimeo.com/api/oembed.json?${t}`)
        .then((e) => e.json())
        .then(function (e) {
          (s.innerHTML = e.html),
            setTimeout(function () {
              s.parentElement.classList.add(classes$l.loaded);
            }, 1e3);
        })
        .catch(function (e) {
          console.log(e);
        });
    }
    constructor(e) {
      (this.container = e),
        (this.player = this.container.querySelector(selectors$p.videoIframe)),
        this.player &&
          ((this.videoID = this.player.getAttribute(selectors$p.dataVideoId)),
          (this.videoType = this.player.getAttribute(selectors$p.dataVideoType)),
          (this.enableBackground = "true" === this.player.getAttribute(selectors$p.dataEnableBackground)),
          (this.disableSound = "false" === this.player.getAttribute(selectors$p.dataEnableSound)),
          (this.enableAutoplay = "false" !== this.player.getAttribute(selectors$p.dataEnableAutoplay)),
          (this.enableLoop = "false" !== this.player.getAttribute(selectors$p.dataEnableLoop)),
          "vimeo" == this.videoType && this.init());
    }
  };
  const selectors$o = {
      dataSectionId: "data-section-id",
      dataEnableSound: "data-enable-sound",
      dataHideOptions: "data-hide-options",
      dataVideoId: "data-video-id",
      dataVideoType: "data-video-type",
      videoIframe: "[data-video-id]",
      videoWrapper: ".video-wrapper",
      youtubeWrapper: "[data-youtube-wrapper]",
    },
    classes$k = { loaded: "loaded" },
    players = [];
  let LoadVideoYT = class {
    init() {
      window.isYoutubeAPILoaded ? this.loadYoutubePlayer() : loadScript({ url: "https://www.youtube.com/iframe_api" }).then(() => this.loadYoutubePlayer());
    }
    loadYoutubePlayer() {
      const e = {
        ...{
          height: "720",
          width: "1280",
          playerVars: this.videoOptionsVars,
          events: {
            onReady: (e) => {
              const t = e.target.getIframe(),
                s = t.id,
                i = "true" === document.querySelector(`#${s}`).getAttribute(selectors$o.dataEnableSound);
              t.setAttribute("tabindex", "-1"), i ? e.target.unMute() : e.target.mute(), e.target.playVideo();
            },
            onStateChange: (e) => {
              0 == e.data && e.target.playVideo(), 1 == e.data && e.target.getIframe().parentElement.classList.add(classes$k.loaded);
            },
          },
        },
      };
      (e.videoId = this.videoID),
        this.videoID.length &&
          YT.ready(() => {
            players[this.playerID] = new YT.Player(this.playerID, e);
          }),
        (window.isYoutubeAPILoaded = !0);
    }
    onUnload() {
      const e = "youtube-" + this.container.getAttribute(selectors$o.dataSectionId);
      players[e] && players[e].destroy();
    }
    constructor(e) {
      (this.container = e),
        (this.player = this.container.querySelector(selectors$o.videoIframe)),
        this.player &&
          ((this.videoOptionsVars = {}),
          (this.videoID = this.player.getAttribute(selectors$o.dataVideoId)),
          (this.videoType = this.player.getAttribute(selectors$o.dataVideoType)),
          "youtube" == this.videoType &&
            ((this.playerID = this.player.querySelector(selectors$o.youtubeWrapper) ? this.player.querySelector(selectors$o.youtubeWrapper).id : this.player.id),
            this.player.hasAttribute(selectors$o.dataHideOptions) &&
              (this.videoOptionsVars = { cc_load_policy: 0, iv_load_policy: 3, modestbranding: 1, playsinline: 1, autohide: 0, controls: 0, branding: 0, showinfo: 0, rel: 0, fs: 0, wmode: "opaque" }),
            this.init(),
            this.container.addEventListener(
              "touchstart",
              function (e) {
                if (e.target.matches(selectors$o.videoWrapper) || e.target.closest(selectors$o.videoWrapper)) {
                  const t = e.target.querySelector(selectors$o.videoIframe).id;
                  players[t].playVideo();
                }
              },
              { passive: !0 }
            )));
    }
  };
  const selectors$n = {
      popupContainer: ".pswp",
      popupCloseBtn: ".pswp__custom-close",
      popupIframe: "iframe, video",
      popupCustomIframe: ".pswp__custom-iframe",
      popupThumbs: ".pswp__thumbs",
      popupButtons: ".pswp__button, .pswp__caption-close",
    },
    classes$j = { current: "is-current", customLoader: "pswp--custom-loader", customOpen: "pswp--custom-opening", loader: "pswp__loader", popupCloseButton: "pswp__button--close", isFocused: "is-focused" },
    attributes$c = { dataOptionClasses: "data-pswp-option-classes", dataVideoType: "data-video-type", ariaCurrent: "aria-current" },
    loaderHTML = `<div class="${classes$j.loader}"><div class="loader pswp__loader-line"><div class="loader-indeterminate"></div></div></div>`;
  let LoadPhotoswipe = class {
    init() {
      this.pswpElement.classList.add(classes$j.customOpen),
        this.initLoader(),
        loadScript({ url: window.theme.assets.photoswipe })
          .then(() => this.loadPopup())
          .catch((e) => console.error(e));
    }
    initLoader() {
      if (this.pswpElement.classList.contains(classes$j.customLoader) && "" !== this.options && this.options.mainClass) {
        this.pswpElement.setAttribute(attributes$c.dataOptionClasses, this.options.mainClass);
        let e = document.createElement("div");
        (e.innerHTML = loaderHTML), (e = e.firstChild), this.pswpElement.appendChild(e);
      } else this.pswpElement.setAttribute(attributes$c.dataOptionClasses, "");
    }
    loadPopup() {
      const e = window.themePhotoswipe.PhotoSwipe.default,
        t = window.themePhotoswipe.PhotoSwipeUI.default;
      this.pswpElement.classList.contains(classes$j.customLoader) && this.pswpElement.classList.remove(classes$j.customLoader),
        this.pswpElement.classList.remove(classes$j.customOpen),
        (this.popup = new e(this.pswpElement, t, this.items, this.options)),
        this.popup.init(),
        this.initVideo(),
        this.thumbsActions(),
        this.isVideo && this.hideUnusedButtons(),
        setTimeout(() => {
          this.a11y.trapFocus(this.pswpElement, { elementToFocus: this.closeBtn });
        }, 200),
        this.popup.listen("close", () => this.onClose()),
        this.options &&
          this.options.closeElClasses &&
          this.options.closeElClasses.length &&
          this.options.closeElClasses.forEach((e) => {
            const t = this.pswpElement.querySelector(`.pswp__${e}`);
            t && t.addEventListener("keyup", this.keyupCloseEvent);
          });
    }
    initVideo() {
      const e = this.pswpElement.querySelector(selectors$n.popupCustomIframe);
      if (e) {
        const t = e.getAttribute(attributes$c.dataVideoType);
        (this.isVideo = !0), "youtube" == t ? new LoadVideoYT(e.parentElement) : "vimeo" == t && new LoadVideoVimeo(e.parentElement);
      }
    }
    thumbsActions() {
      this.popupThumbsContainer &&
        this.popupThumbsContainer.firstChild &&
        (this.popupThumbsContainer.addEventListener("wheel", (e) => this.stopDisabledScroll(e)),
        this.popupThumbsContainer.addEventListener("mousewheel", (e) => this.stopDisabledScroll(e)),
        this.popupThumbsContainer.addEventListener("DOMMouseScroll", (e) => this.stopDisabledScroll(e)),
        (this.popupThumbs = this.pswpElement.querySelectorAll(`${selectors$n.popupThumbs} > *`)),
        this.popupThumbs.forEach((e, t) => {
          e.addEventListener("click", (s) => {
            s.preventDefault();
            const i = e.parentElement.querySelector(`.${classes$j.current}`);
            i.classList.remove(classes$j.current), i.setAttribute(attributes$c.ariaCurrent, !1), e.classList.add(classes$j.current), e.setAttribute(attributes$c.ariaCurrent, !0), this.popup.goTo(t);
          });
        }),
        this.popup.listen("imageLoadComplete", () => this.setCurrentThumb()),
        this.popup.listen("beforeChange", () => this.setCurrentThumb()));
    }
    hideUnusedButtons() {
      const e = this.pswpElement.querySelectorAll(selectors$n.popupButtons);
      e.length &&
        e.forEach((e) => {
          e.classList.contains(classes$j.popupCloseButton) || (e.style.display = "none");
        });
    }
    stopDisabledScroll(e) {
      e.stopPropagation();
    }
    keyupClose(e) {
      e.code === window.theme.keyboardKeys.ENTER && this.popup.close();
    }
    onClose() {
      const e = this.pswpElement.querySelector(selectors$n.popupIframe);
      if ((e && e.parentNode.removeChild(e), this.popupThumbsContainer && this.popupThumbsContainer.firstChild)) for (; this.popupThumbsContainer.firstChild; ) this.popupThumbsContainer.removeChild(this.popupThumbsContainer.firstChild);
      this.pswpElement.setAttribute(attributes$c.dataOptionClasses, "");
      const t = this.pswpElement.querySelector(`.${classes$j.loader}`);
      t && this.pswpElement.removeChild(t),
        this.options &&
          this.options.closeElClasses &&
          this.options.closeElClasses.length &&
          this.options.closeElClasses.forEach((e) => {
            const t = this.pswpElement.querySelector(`.pswp__${e}`);
            t && t.removeEventListener("keyup", this.keyupCloseEvent);
          }),
        this.a11y.removeTrapFocus(),
        window.accessibility.lastElement &&
          document.body.classList.contains(classes$j.isFocused) &&
          requestAnimationFrame(() => {
            window.accessibility.lastElement.focus();
          });
    }
    setCurrentThumb() {
      const e = this.pswpElement.querySelector(`${selectors$n.popupThumbs} > .${classes$j.current}`);
      if ((e && (e.classList.remove(classes$j.current), e.setAttribute(attributes$c.ariaCurrent, !1)), !this.popupThumbs)) return;
      const t = this.popupThumbs[this.popup.getCurrentIndex()];
      t.classList.add(classes$j.current), t.setAttribute(attributes$c.ariaCurrent, !0), this.scrollThumbs(t);
    }
    scrollThumbs(e) {
      const t = this.popupThumbsContainer.scrollLeft + this.popupThumbsContainer.offsetWidth,
        s = e.offsetLeft;
      if (t <= s + e.offsetWidth || t > s) {
        const t = parseInt(window.getComputedStyle(e).marginLeft);
        this.popupThumbsContainer.scrollTo({ top: 0, left: s - t, behavior: "smooth" });
      }
    }
    constructor(e, t = "") {
      (this.items = e),
        (this.pswpElement = document.querySelectorAll(selectors$n.popupContainer)[0]),
        (this.popup = null),
        (this.popupThumbs = null),
        (this.isVideo = !1),
        (this.popupThumbsContainer = this.pswpElement.querySelector(selectors$n.popupThumbs)),
        (this.closeBtn = this.pswpElement.querySelector(selectors$n.popupCloseBtn)),
        (this.keyupCloseEvent = (e) => this.keyupClose(e)),
        (this.a11y = a11y);
      (this.options = "" !== t ? t : { history: !1, focus: !1, mainClass: "" }), this.init();
    }
  };
  const selectors$m = {
      zoomWrapper: "[data-zoom-wrapper]",
      dataImageSrc: "data-image-src",
      dataImageWidth: "data-image-width",
      dataImageHeight: "data-image-height",
      dataImageAlt: "data-image-alt",
      dataImageZoomEnable: "data-image-zoom-enable",
      thumbs: ".pswp__thumbs",
      caption: "[data-zoom-caption]",
    },
    classes$i = {
      variantSoldOut: "variant--soldout",
      variantUnavailable: "variant--unavailable",
      popupThumb: "pswp__thumb",
      popupClass: "pswp-zoom-gallery",
      popupClassNoThumbs: "pswp-zoom-gallery--single",
      popupTitle: "product__title",
      popupTitleNew: "product__title pswp__title",
    };
  let Zoom = class {
    init() {
      this.zoomWrappers.length &&
        this.zoomWrappers.forEach((e, t) => {
          e.addEventListener("click", (s) => {
            s.preventDefault(), this.createZoom(t), (window.accessibility.lastElement = e);
          }),
            e.addEventListener("keyup", (s) => {
              s.code === window.theme.keyboardKeys.ENTER && (s.preventDefault(), this.createZoom(t), (window.accessibility.lastElement = e));
            });
        });
    }
    createZoom(e) {
      let t = [],
        s = 0,
        i = "";
      this.zoomWrappers.forEach((o) => {
        const r = o.getAttribute(selectors$m.dataImageSrc),
          a = o.hasAttribute(selectors$m.dataImageAlt) ? o.getAttribute(selectors$m.dataImageAlt) : "";
        if (
          ((s += 1),
          t.push({ src: r, w: parseInt(o.getAttribute(selectors$m.dataImageWidth)), h: parseInt(o.getAttribute(selectors$m.dataImageHeight)), msrc: r }),
          (i += `<a href="#" class="${classes$i.popupThumb}" style="background-image: url('${r}')" aria-label="${a}" aria-current="false"></a>`),
          this.zoomWrappers.length === s)
        ) {
          const o = {
            history: !1,
            focus: !1,
            index: e,
            mainClass: 1 === s ? `${classes$i.popupClass} ${classes$i.popupClassNoThumbs}` : `${classes$i.popupClass}`,
            showHideOpacity: !0,
            howAnimationDuration: 150,
            hideAnimationDuration: 250,
            closeOnScroll: !1,
            closeOnVerticalDrag: !1,
            captionEl: !0,
            closeEl: !0,
            closeElClasses: ["caption-close", "title"],
            tapToClose: !1,
            clickToCloseNonZoomable: !1,
            maxSpreadZoom: 2,
            loop: !0,
            spacing: 0,
            allowPanToNext: !0,
            pinchToClose: !1,
            addCaptionHTMLFn: (e, t, s) => {
              this.zoomCaption(e, t, s);
            },
            getThumbBoundsFn: () => {
              const t = this.zoomWrappers[e],
                s = window.pageYOffset || document.documentElement.scrollTop,
                i = t.getBoundingClientRect();
              return { x: i.left, y: i.top + s, w: i.width };
            },
          };
          new LoadPhotoswipe(t, o), this.thumbsContainer && "" !== i && (this.thumbsContainer.innerHTML = i);
        }
      });
    }
    zoomCaption(e, t) {
      let s = "";
      const i = t.children[0];
      return (
        this.zoomCaptionElem &&
          ((s = this.zoomCaptionElem.innerHTML),
          this.zoomCaptionElem.closest(`.${classes$i.variantSoldOut}`) ? i.classList.add(classes$i.variantSoldOut) : i.classList.remove(classes$i.variantSoldOut),
          this.zoomCaptionElem.closest(`.${classes$i.variantUnavailable}`) ? i.classList.add(classes$i.variantUnavailable) : i.classList.remove(classes$i.variantUnavailable)),
        (s = s.replaceAll(classes$i.popupTitle, classes$i.popupTitleNew)),
        (i.innerHTML = s),
        !1
      );
    }
    constructor(e) {
      (this.container = e.container),
        (this.zoomWrappers = this.container.querySelectorAll(selectors$m.zoomWrapper)),
        (this.thumbsContainer = document.querySelector(selectors$m.thumbs)),
        (this.zoomCaptionElem = this.container.querySelector(selectors$m.caption)),
        (this.zoomEnable = "true" === this.container.getAttribute(selectors$m.dataImageZoomEnable)),
        this.zoomEnable && this.init();
    }
  };
  const hosts = { html5: "html5", youtube: "youtube", vimeo: "vimeo" },
    selectors$l = {
      deferredMedia: "[data-deferred-media]",
      deferredMediaButton: "[data-deferred-media-button]",
      productMediaWrapper: "[data-product-single-media-wrapper]",
      productMediaSlider: "[data-product-single-media-slider]",
      mediaContainer: "[data-video]",
      mediaId: "data-media-id",
      dataTallLayout: "data-tall-layout",
    },
    classes$h = { mediaHidden: "media--hidden" };
  theme.mediaInstances = {};
  let Video = class {
    init() {
      this.container.querySelectorAll(selectors$l.mediaContainer).forEach((e) => {
        const t = e.querySelector(selectors$l.deferredMediaButton);
        t && t.addEventListener("click", this.loadContent.bind(this, e));
      });
    }
    loadContent(e) {
      if (e.querySelector(selectors$l.deferredMedia).getAttribute("loaded")) return;
      const t = document.createElement("div");
      t.appendChild(e.querySelector("template").content.firstElementChild.cloneNode(!0));
      const s = e.dataset.mediaId,
        i = t.querySelector("video, iframe"),
        o = this.hostFromVideoElement(i),
        r = e.querySelector(selectors$l.deferredMedia);
      r.appendChild(i).focus(), r.setAttribute("loaded", !0), (this.players[s] = { mediaId: s, sectionId: this.id, container: e, element: i, host: o, ready: () => this.createPlayer(s) });
      const a = this.players[s];
      switch (a.host) {
        case hosts.html5:
          this.loadVideo(a, hosts.html5);
          break;
        case hosts.vimeo:
          window.isVimeoAPILoaded ? this.loadVideo(a, hosts.vimeo) : loadScript({ url: "https://player.vimeo.com/api/player.js" }).then(() => this.loadVideo(a, hosts.vimeo));
          break;
        case hosts.youtube:
          window.isYoutubeAPILoaded ? this.loadVideo(a, hosts.youtube) : loadScript({ url: "https://www.youtube.com/iframe_api" }).then(() => this.loadVideo(a, hosts.youtube));
      }
    }
    hostFromVideoElement(e) {
      if ("VIDEO" === e.tagName) return hosts.html5;
      if ("IFRAME" === e.tagName) {
        if (/^(https?:\/\/)?(www\.)?(youtube\.com|youtube-nocookie\.com|youtu\.?be)\/.+$/.test(e.src)) return hosts.youtube;
        if (e.src.includes("vimeo.com")) return hosts.vimeo;
      }
      return null;
    }
    loadVideo(e, t) {
      e.host === t && e.ready();
    }
    createPlayer(e) {
      const t = this.players[e];
      switch (t.host) {
        case hosts.html5:
          t.element.play(),
            t.element.addEventListener("play", () => this.pauseOtherMedia(e)),
            t.element.play(),
            t.container.addEventListener("theme:media:hidden", (e) => this.onHidden(e)),
            t.container.addEventListener("xrLaunch", (e) => this.onHidden(e)),
            t.container.addEventListener("theme:media:visible", (e) => this.onVisible(e)),
            this.tallLayout && this.observeVideo(t, e);
          break;
        case hosts.vimeo:
          (this.players[e].player = new Vimeo.Player(t.element)),
            this.players[e].player.play(),
            (window.isVimeoAPILoaded = !0),
            t.container.addEventListener("theme:media:hidden", (e) => this.onHidden(e)),
            t.container.addEventListener("xrLaunch", (e) => this.onHidden(e)),
            t.container.addEventListener("theme:media:visible", (e) => this.onVisible(e)),
            this.tallLayout && this.observeVideo(t, e);
          break;
        case hosts.youtube:
          if (t.host == hosts.youtube && t.player) return;
          YT.ready(() => {
            const s = t.container.dataset.videoId;
            (this.players[e].player = new YT.Player(t.element, { videoId: s, events: { onReady: (e) => e.target.playVideo() } })),
              (window.isYoutubeAPILoaded = !0),
              t.container.addEventListener("theme:media:hidden", (e) => this.onHidden(e)),
              t.container.addEventListener("xrLaunch", (e) => this.onHidden(e)),
              t.container.addEventListener("theme:media:visible", (e) => this.onVisible(e)),
              this.tallLayout && this.observeVideo(t, e);
          });
      }
    }
    observeVideo(e, t) {
      new IntersectionObserver(
        (s, i) => {
          s.forEach((s) => {
            1 != s.intersectionRatio ? this.pauseVideo(e) : (this.playVideo(e), this.pauseOtherMedia(t));
          });
        },
        { threshold: 1 }
      ).observe(e.element);
    }
    playVideo(e) {
      e.player && e.player.playVideo ? e.player.playVideo() : e.element && e.element.play ? e.element.play() : e.player && e.player.play && e.player.play();
    }
    pauseVideo(e) {
      e.player && e.player.pauseVideo ? e.player.pauseVideo() : e.element && e.element.pause ? e.element.pause() : e.player && e.player.pause && e.player.pause();
    }
    onHidden(e) {
      void 0 !== e.target.dataset.mediaId && this.pauseVideo(this.players[e.target.dataset.mediaId]);
    }
    onVisible(e) {
      void 0 !== e.target.dataset.mediaId && this.playVideo(this.players[e.target.dataset.mediaId]);
    }
    pauseOtherMedia(e) {
      const t = `[${selectors$l.mediaId}="${e}"]`,
        s = document.querySelectorAll(`${selectors$l.productMediaWrapper}:not(${t})`);
      document.querySelector(`${selectors$l.productMediaWrapper}${t}`).classList.remove(classes$h.mediaHidden),
        s.length &&
          s.forEach((e) => {
            e.dispatchEvent(new CustomEvent("theme:media:hidden")), e.classList.add(classes$h.mediaHidden);
          });
    }
    constructor(e) {
      (this.section = e), (this.container = e.container), (this.id = e.id), (this.tallLayout = "true" === this.container.getAttribute(selectors$l.dataTallLayout)), (this.players = {}), this.init();
    }
  };
  theme.mediaInstances = {};
  const selectors$k = { videoPlayer: "[data-video]", modelViewer: "[data-model]", sliderEnabled: "flickity-enabled" },
    classes$g = { mediaHidden: "media--hidden" };
  let Media = class {
    init() {
      this.detect3d(), this.launch3d(), new Video(this.section), new Zoom(this.section);
    }
    detect3d() {
      const e = this.container.querySelectorAll(selectors$k.modelViewer);
      e.length &&
        e.forEach((e) => {
          theme.ProductModel.init(e, this.id);
        });
    }
    launch3d() {
      document.addEventListener("shopify_xr_launch", () => {
        this.container.querySelector(`${selectors$k.modelViewer}:not(.${classes$g.mediaHidden})`).dispatchEvent(new CustomEvent("xrLaunch"));
      });
    }
    constructor(e) {
      (this.section = e), (this.id = e.id), (this.container = e.container);
    }
  };
  const selectors$j = {
      ariaLabel: "aria-label",
      dataMediaId: "data-media-id",
      dataTallLayout: "data-tall-layout",
      dataThumb: "data-thumb",
      dataThumbIndex: "data-thumb-index",
      deferredMediaButton: "[data-deferred-media-button]",
      focusedElement: "model-viewer, video, iframe, button, [href], input, [tabindex]",
      isActive: ".is-active",
      mediaType: "data-type",
      mobileSliderDisabled: "data-slideshow-disabled-mobile",
      productSlideshow: "[data-product-slideshow]",
      productThumbs: "[data-product-thumbs]",
      thumb: "[data-thumb-item]",
      thumbLink: "[data-thumb-link]",
      thumbSlider: "[data-thumbs-slider]",
      quickAddModal: "[data-quick-add-modal]",
      zoomElement: "[data-zoom-wrapper]",
    },
    classes$f = { active: "is-active", focused: "is-focused", dragging: "is-dragging", selected: "is-selected", sliderEnabled: "flickity-enabled", mediaHidden: "media--hidden" },
    attributes$b = { ariaCurrent: "aria-current", sliderOptions: "data-options" };
  let sections$b = {},
    InitSlider = class {
      init() {
        this.slideshow &&
          (this.tallLayout
            ? this.mobileSliderDisabled || (this.initSliderMobile(), document.addEventListener("theme:resize:width", this.initSliderMobileEvent))
            : this.mobileSliderDisabled
            ? (this.initSliderDesktop(), document.addEventListener("theme:resize:width", this.initSliderDesktopEvent))
            : this.createSlider());
      }
      initSliderMobile() {
        isMobile() ? this.createSlider() : this.destroySlider();
      }
      initSliderDesktop() {
        isMobile() ? this.destroySlider() : this.createSlider();
      }
      destroySlider() {
        this.slideshow.classList.contains(classes$f.sliderEnabled) && this.flkty.destroy();
      }
      createSlider() {
        if (!this.slideshow || (this.mobileSliderDisabled && isMobile())) return;
        const e = { autoPlay: !1, pageDots: !1, wrapAround: !0, ...this.customOptions },
          t = this,
          s = this.slideshow.querySelectorAll(`[${selectors$j.mediaType}]`)[0];
        let i = {
          ...e,
          on: {
            ready: function () {
              const e = this.element;
              e.addEventListener("keyup", (t) => {
                if (t.code === window.theme.keyboardKeys.ENTER) {
                  const t = e.querySelector(`.${classes$f.selected} ${selectors$j.zoomElement}`);
                  t && (t.dispatchEvent(new Event("click", { bubbles: !1 })), (window.accessibility.lastElement = e));
                }
              }),
                t.sliderThumbs(this),
                t.accessibilityActions(this);
            },
          },
        };
        if (((this.flkty = new FlickityFade(this.slideshow, i)), this.flkty.resize(), s)) {
          const e = s.getAttribute(selectors$j.mediaType);
          ("model" !== e && "video" !== e && "external_video" !== e) || ((this.flkty.options.draggable = !1), this.flkty.updateDraggable());
        }
        this.flkty.on("change", function (e) {
          let s = e;
          if (t.thumbSlider) {
            const i = t.thumbSlider.querySelector(selectors$j.isActive),
              o = t.thumbSlider.querySelector(`${selectors$j.thumb} [${selectors$j.dataThumbIndex}="${e}"]`);
            if (i) {
              const e = i.querySelector(`[${selectors$j.dataThumbIndex}]`);
              (s = Array.from(i.parentElement.children).indexOf(i)), i.classList.remove(classes$f.active), e && e.setAttribute(attributes$b.ariaCurrent, !1);
            }
            o && (o.parentElement.classList.add(classes$f.active), o.setAttribute(attributes$b.ariaCurrent, !0)), t.scrollToThumb();
          }
          const i = this.cells[s].element,
            o = this.selectedElement;
          i.dispatchEvent(new CustomEvent("theme:media:hidden")), o.classList.remove(classes$f.mediaHidden);
        }),
          this.flkty.on("settle", function () {
            const e = this.selectedElement,
              s = Array.prototype.filter.call(e.parentNode.children, function (t) {
                return t !== e;
              }),
              i = e.getAttribute(selectors$j.mediaType),
              o = document.body.classList.contains(classes$f.focused);
            "model" === i || "video" === i || "external_video" === i ? ((t.flkty.options.draggable = !1), t.flkty.updateDraggable()) : ((t.flkty.options.draggable = !0), t.flkty.updateDraggable()),
              o && e.dispatchEvent(new Event("focus")),
              s.length &&
                s.forEach((e) => {
                  e.classList.add(classes$f.mediaHidden);
                }),
              e.dispatchEvent(new CustomEvent("theme:media:visible"));
            const r = e.querySelector("deferred-media");
            r && !0 !== r.getAttribute("loaded") && e.querySelector(selectors$j.deferredMediaButton).dispatchEvent(new Event("click", { bubbles: !1 })), t.accessibilityActions(this);
          }),
          this.flkty.on("dragStart", (e, t) => {
            e.target.classList.add(classes$f.dragging);
          }),
          this.flkty.on("dragEnd", (e, t) => {
            const s = this.flkty.element.querySelector(`.${classes$f.dragging}`);
            s && s.classList.remove(classes$f.dragging);
          });
      }
      accessibilityActions(e) {
        const t = e.slides;
        t.length &&
          t.forEach((e) => {
            const t = e.cells[0].element,
              s = t.querySelectorAll(selectors$j.focusedElement);
            t.classList.contains(classes$f.selected) ? t.setAttribute("tabindex", "0") : t.setAttribute("tabindex", "-1"),
              s.length &&
                s.forEach((e) => {
                  t.classList.contains(classes$f.selected) ? e.setAttribute("tabindex", "0") : e.setAttribute("tabindex", "-1");
                });
          });
      }
      scrollToThumb() {
        const e = this.thumbSlider;
        if (e) {
          const t = e.querySelector(selectors$j.isActive);
          if (!t) return;
          const s = e.scrollTop,
            i = e.scrollLeft,
            o = e.offsetWidth,
            r = e.offsetHeight,
            a = s + r,
            n = i + o,
            l = t.offsetTop,
            c = t.offsetLeft,
            d = t.offsetWidth,
            h = t.offsetHeight,
            u = s > l,
            p = i > c,
            m = c + d > n,
            g = l + h > a || u,
            b = m || p,
            y = isMobile();
          if (g || b) {
            let t = l - r + h,
              s = c - o + d;
            u && (t = l), m && y && (s += parseInt(window.getComputedStyle(e).paddingRight)), p && ((s = c), y && (s -= parseInt(window.getComputedStyle(e).paddingLeft))), e.scrollTo({ top: t, left: s, behavior: "smooth" });
          }
        }
      }
      sliderThumbs(e) {
        this.thumbLinks.length &&
          this.thumbLinks.forEach((t) => {
            t.addEventListener("click", (e) => {
              e.preventDefault();
              const s = t.hasAttribute(selectors$j.dataThumbIndex) ? parseInt(t.getAttribute(selectors$j.dataThumbIndex)) : 0;
              this.flkty.select(s);
            }),
              t.addEventListener("keyup", (s) => {
                if (s.code === window.theme.keyboardKeys.ENTER) {
                  const s = t.getAttribute(selectors$j.dataMediaId),
                    i = e.element.querySelector(`[${selectors$j.dataMediaId}="${s}"]`).querySelectorAll('model-viewer, video, iframe, button, [href], input, [tabindex]:not([tabindex="-1"])')[0];
                  i && (i.dispatchEvent(new Event("focus")), i.dispatchEvent(new Event("select")));
                }
              });
          });
      }
      onUnload() {
        this.tallLayout
          ? this.mobileSliderDisabled || document.removeEventListener("theme:resize:width", this.initSliderMobileEvent)
          : this.mobileSliderDisabled && document.removeEventListener("theme:resize:width", this.initSliderDesktopEvent);
      }
      constructor(e, t = null) {
        (this.container = t || e.container),
          (this.tallLayout = "true" === this.container.getAttribute(selectors$j.dataTallLayout)),
          (this.slideshow = this.container.querySelector(selectors$j.productSlideshow)),
          (this.thumbSlider = this.container.querySelector(selectors$j.thumbSlider)),
          (this.thumbLinks = this.container.querySelectorAll(selectors$j.thumbLink)),
          (this.mobileSliderDisabled = "true" === this.container.getAttribute(selectors$j.mobileSliderDisabled)),
          (this.initSliderMobileEvent = () => this.initSliderMobile()),
          (this.initSliderDesktopEvent = () => this.initSliderDesktop()),
          this.slideshow && this.slideshow.hasAttribute(attributes$b.sliderOptions) && (this.customOptions = JSON.parse(decodeURIComponent(this.slideshow.getAttribute(attributes$b.sliderOptions)))),
          (this.flkty = null),
          this.init();
      }
    };
  const initSlider = {
      onLoad() {
        sections$b[this.id] = new InitSlider(this);
      },
      onUnload(e) {
        sections$b[this.id].onUnload(e);
      },
    },
    classes$e = {
      added: "is-added",
      animated: "is-animated",
      disabled: "is-disabled",
      error: "has-error",
      loading: "is-loading",
      open: "is-open",
      overlayText: "product-item--overlay-text",
      visible: "is-visible",
      siblingLinkCurrent: "sibling__link--current",
      focused: "is-focused",
    },
    settings = { errorDelay: 3e3 },
    selectors$i = {
      animation: "[data-animation]",
      apiContent: "[data-api-content]",
      buttonQuickAdd: "[data-quick-add-btn]",
      buttonAddToCart: "[data-add-to-cart]",
      cartDrawer: "[data-cart-drawer]",
      cartLineItems: "[data-line-items]",
      dialog: "dialog",
      focusable: 'button, [href], select, textarea, [tabindex]:not([tabindex="-1"])',
      media: "[data-media-slide]",
      messageError: "[data-message-error]",
      modalButton: "[data-quick-add-modal-handle]",
      modalContainer: "[data-product-upsell-container]",
      modalContent: "[data-product-upsell-ajax]",
      modalClose: "[data-quick-add-modal-close]",
      productGridItem: "data-product-grid-item",
      productInformationHolder: "[data-product-information]",
      popoutWrapper: "[data-popout]",
      quickAddHolder: "[data-quick-add-holder]",
      quickAddModal: "[data-quick-add-modal]",
      quickAddModalTemplate: "[data-quick-add-modal-template]",
      swatch: "[data-swatch]",
    },
    attributes$a = { closing: "closing", productId: "data-product-id", modalHandle: "data-quick-add-modal-handle", siblingSwapper: "data-sibling-swapper", quickAddHolder: "data-quick-add-holder" };
  let QuickAddProduct = class extends HTMLElement {
    connectedCallback() {
      this.modalButton && this.modalButton.addEventListener("click", this.modalButtonClickEvent),
        this.buttonATC &&
          this.buttonATC.addEventListener("click", (e) => {
            e.preventDefault(), document.dispatchEvent(new CustomEvent("theme:cart:add", { detail: { button: this.buttonATC } }));
          }),
        this.quickAddHolder && (this.quickAddHolder.addEventListener("animationend", this.quickAddLoadingToggle), this.errorHandler());
    }
    modalButtonClickEvent(e) {
      e.preventDefault();
      const t = this.modalButton.hasAttribute(attributes$a.siblingSwapper),
        s = this.modalButton.classList.contains(classes$e.siblingLinkCurrent);
      s ||
        (this.modalButton.classList.add(classes$e.loading),
        (this.modalButton.disabled = !0),
        t && !s && ((this.currentModal = e.target.closest(selectors$i.quickAddModal)), this.currentModal.classList.add(classes$e.loading)),
        this.renderModal());
    }
    modalCreate(e) {
      const t = document.querySelector(`${selectors$i.quickAddModal}[${attributes$a.productId}="${this.productId}"]`);
      if (t) (this.modal = t), this.modalOpen();
      else {
        const t = this.quickAddHolder.querySelector(selectors$i.quickAddModalTemplate);
        if (!t) return;
        const s = document.createElement("div");
        (s.innerHTML = t.innerHTML),
          document.body.appendChild(s.querySelector(selectors$i.quickAddModal)),
          t.remove(),
          (this.modal = document.querySelector(`${selectors$i.quickAddModal}[${attributes$a.productId}="${this.productId}"]`)),
          (this.modal.querySelector(selectors$i.modalContent).innerHTML = new DOMParser().parseFromString(e, "text/html").querySelector(selectors$i.apiContent).innerHTML),
          this.modalCreatedCallback();
      }
    }
    modalOpen() {
      this.modal.showModal(), this.modal.setAttribute("open", !0), this.modal.removeAttribute("inert"), this.currentModal && this.currentModal.dispatchEvent(new CustomEvent("theme:modal:close", { bubbles: !1 }));
      (this.modal.querySelector("[autofocus]") || this.modal.querySelector(selectors$i.focusable)).focus();
      const e = { container: this.modal, id: this.productId };
      (theme.mediaInstances[this.id] = new Media(e)),
        theme.mediaInstances[this.id].init(),
        this.quickAddHolder.classList.add(classes$e.disabled),
        this.modalButton && (this.modalButton.classList.remove(classes$e.loading), (this.modalButton.disabled = !1)),
        requestAnimationFrame(() => {
          this.modal.querySelectorAll(selectors$i.animation).forEach((e) => {
            e.classList.add(classes$e.animated);
          });
        }),
        document.dispatchEvent(new CustomEvent("theme:quick-add:open", { bubbles: !0 })),
        document.dispatchEvent(new CustomEvent("theme:scroll:lock", { bubbles: !0 })),
        document.addEventListener("theme:product:added", this.modalCloseOnProductAdded, { once: !0 });
    }
    modalClose() {
      if (this.isAnimating) return;
      if (!this.modal.hasAttribute(attributes$a.closing)) return this.modal.setAttribute(attributes$a.closing, ""), void (this.isAnimating = !0);
      this.modal.close(), this.modal.removeAttribute(attributes$a.closing), this.modal.setAttribute("inert", ""), this.modal.classList.remove(classes$e.loading);
      this.modal.querySelectorAll(selectors$i.media).forEach((e) => {
        e.dispatchEvent(new CustomEvent("pause"));
      }),
        this.modalButton && (this.modalButton.disabled = !1),
        this.quickAddHolder && this.quickAddHolder.classList.contains(classes$e.disabled) && this.quickAddHolder.classList.remove(classes$e.disabled),
        this.resetAnimatedItems();
      const e = this.cartDrawer && this.cartDrawer.classList.contains(classes$e.open),
        t = document.querySelector("dialog[open]");
      e || t || document.dispatchEvent(new CustomEvent("theme:scroll:unlock", { bubbles: !0 })), document.removeEventListener("theme:product:added", this.modalCloseOnProductAdded);
    }
    modalEvents() {
      var e;
      null === (e = this.modal.querySelector(selectors$i.modalClose)) ||
        void 0 === e ||
        e.addEventListener("click", (e) => {
          e.preventDefault(), this.modalClose();
        }),
        this.modal.addEventListener("click", (e) => {
          "DIALOG" === e.target.nodeName && "click" === e.type && this.modalClose();
        }),
        this.modal.addEventListener("keydown", (e) => {
          e.code == theme.keyboardKeys.ESCAPE && (e.preventDefault(), this.modalClose());
        }),
        this.modal.addEventListener("theme:modal:close", () => {
          this.modalClose();
        }),
        this.modal.addEventListener("animationend", (e) => {
          e.target === this.modal &&
            ((this.isAnimating = !1),
            this.modal.hasAttribute(attributes$a.closing) &&
              (this.modalClose(),
              document.body.classList.contains(classes$e.focused) &&
                this.buttonQuickAdd &&
                (this.buttonQuickAdd.addEventListener(
                  "transitionend",
                  () => {
                    this.buttonQuickAdd.focus(), this.buttonQuickAdd.classList.remove(classes$e.visible);
                  },
                  { once: !0 }
                ),
                this.buttonQuickAdd.classList.add(classes$e.visible))));
        });
    }
    modalCloseOnProductAdded() {
      this.resetQuickAddButtons(), this.modal && this.modal.hasAttribute("open") && this.modalClose();
    }
    quickAddLoadingToggle(e) {
      e.target == this.quickAddHolder && this.quickAddHolder.classList.remove(classes$e.disabled);
    }
    errorHandler() {
      this.quickAddHolder.addEventListener("theme:cart:error", (e) => {
        const t = e.detail.holder,
          s = t.closest(`[${selectors$i.productGridItem}]`);
        if (!s) return;
        const i = t.querySelector(selectors$i.messageError),
          o = s.classList.contains(classes$e.overlayText),
          r = s.querySelector(selectors$i.productInformationHolder),
          a = t.querySelector(selectors$i.buttonAddToCart);
        a && (a.classList.remove(classes$e.added, classes$e.loading), t.classList.add(classes$e.error)),
          i && (i.innerText = e.detail.description),
          o && r.classList.add(classes$e.hidden),
          setTimeout(() => {
            this.resetQuickAddButtons(), o && r.classList.remove(classes$e.hidden);
          }, settings.errorDelay);
      });
    }
    resetQuickAddButtons() {
      this.quickAddHolder && this.quickAddHolder.classList.remove(classes$e.visible, classes$e.error), this.buttonQuickAdd && (this.buttonQuickAdd.classList.remove(classes$e.added), (this.buttonQuickAdd.disabled = !1));
    }
    renderModal() {
      this.modal
        ? this.modalOpen()
        : window
            .fetch(`${window.theme.routes.root}products/${this.handle}?section_id=api-product-upsell`)
            .then(this.upsellErrorsHandler)
            .then((e) => e.text())
            .then((e) => {
              this.modalCreate(e);
            });
    }
    modalCreatedCallback() {
      this.modalEvents(), this.modalOpen(), new InitSlider(null, this.modal);
      const e = this.modal.querySelectorAll(selectors$i.swatch);
      e.length &&
        e.forEach((e) => {
          new Swatch(e);
        });
      const t = this.modal.querySelectorAll(selectors$i.popoutWrapper);
      t.length &&
        t.forEach((e) => {
          new Popout(e);
        }),
        wrapElements(this.modal);
    }
    upsellErrorsHandler(e) {
      return e.ok
        ? e
        : e.json().then(function (t) {
            throw new FetchError({ status: e.statusText, headers: e.headers, json: t });
          });
    }
    resetAnimatedItems() {
      var e;
      null === (e = this.modal) ||
        void 0 === e ||
        e.querySelectorAll(selectors$i.animation).forEach((e) => {
          e.classList.remove(classes$e.animated);
        });
    }
    constructor() {
      var e;
      (super(), (this.container = this), (this.quickAddHolder = this.container.querySelector(selectors$i.quickAddHolder)), this.quickAddHolder) &&
        ((this.modal = null),
        (this.currentModal = null),
        (this.productId = this.quickAddHolder.getAttribute(attributes$a.quickAddHolder)),
        (this.modalButton = this.quickAddHolder.querySelector(selectors$i.modalButton)),
        (this.handle = null === (e = this.modalButton) || void 0 === e ? void 0 : e.getAttribute(attributes$a.modalHandle)),
        (this.cartDrawer = document.querySelector(selectors$i.cartDrawer)),
        (this.buttonQuickAdd = this.quickAddHolder.querySelector(selectors$i.buttonQuickAdd)),
        (this.buttonATC = this.quickAddHolder.querySelector(selectors$i.buttonAddToCart)),
        (this.button = this.modalButton || this.buttonATC),
        (this.modalClose = this.modalClose.bind(this)),
        (this.modalCloseOnProductAdded = this.modalCloseOnProductAdded.bind(this)),
        (this.isAnimating = !1),
        (this.modalButtonClickEvent = this.modalButtonClickEvent.bind(this)),
        (this.quickAddLoadingToggle = this.quickAddLoadingToggle.bind(this)));
    }
  };
  register("product-grid", [slider, swatchGridSection, tabs, siblings]), customElements.get("quick-add-product") || customElements.define("quick-add-product", QuickAddProduct);
  const tokensReducer = (e, t) => {
      const { el: s, elStyle: i, elHeight: o, rowsLimit: r, rowsWrapped: a, options: n } = e;
      let l = e.buffer,
        c = l;
      if (a === r + 1) return { ...e };
      const d = l;
      let h = a,
        u = o;
      return (
        (s.innerHTML = c = l.length ? `${l}${n.delimiter}${t}${n.replaceStr}` : `${t}${n.replaceStr}`),
        parseFloat(i.height) > parseFloat(o) && (h++, (u = i.height), h === r + 1)
          ? ((s.innerHTML = c = "." === d[d.length - 1] && "..." === n.replaceStr ? `${d}..` : `${d}${n.replaceStr}`), { ...e, elHeight: u, rowsWrapped: h })
          : ((s.innerHTML = c = d.length ? `${d}${n.delimiter}${t}` : `${t}`), { ...e, buffer: c, elHeight: u, rowsWrapped: h })
      );
    },
    ellipsis = (e = "", t = 1, s = {}) => {
      const i = { replaceStr: "...", debounceDelay: 250, delimiter: " ", ...s },
        o = e && (e instanceof NodeList ? e : 1 === e.nodeType ? [e] : document.querySelectorAll(e));
      for (let e = 0; e < o.length; e++) {
        const s = o[e],
          r = /<!--[\s\S]*?-->/g,
          a = s.innerHTML.replace(r, "").split(i.delimiter);
        s.innerHTML = "";
        const n = window.getComputedStyle(s);
        a.reduce(tokensReducer, { el: s, buffer: s.innerHTML, elStyle: n, elHeight: 0, rowsLimit: t, rowsWrapped: 0, options: i });
      }
    },
    fadeOut = (e, t = null) => {
      (e.style.opacity = 1),
        (function s() {
          (e.style.opacity -= 0.1) < 0 ? (e.style.display = "none") : requestAnimationFrame(s), 0 === parseFloat(e.style.opacity) && "function" == typeof t && t();
        })();
    },
    selectors$h = { pickupContainer: "data-store-availability-container", shopifySection: ".shopify-section", drawer: "[data-pickup-drawer]", drawerOpen: "[data-pickup-drawer-open]", drawerClose: "[data-pickup-drawer-close]" },
    classes$d = { isOpen: "is-open", isHidden: "hidden", isFocused: "is-focused" },
    attributes$9 = { drawerUnderlay: "data-drawer-underlay" };
  let sections$a = {},
    PickupAvailability = class {
      fetchPickupAvailability(e) {
        const t = this.container.querySelector(`[${selectors$h.pickupContainer}]`);
        if (!t) return;
        if ((e && !e.detail.variant) || (e && e.detail.variant && !e.detail.variant.available)) return void t.classList.add(classes$d.isHidden);
        const s = e && e.detail.variant ? e.detail.variant.id : t.getAttribute(selectors$h.pickupContainer);
        (this.drawer = document.querySelector(selectors$h.drawer)),
          this.drawer && document.body.removeChild(this.drawer),
          s &&
            fetch(`${window.theme.routes.root}variants/${s}/?section_id=api-pickup-availability`)
              .then(this.handleErrors)
              .then((e) => e.text())
              .then((e) => {
                const s = new DOMParser().parseFromString(e, "text/html").querySelector(selectors$h.shopifySection).innerHTML;
                (t.innerHTML = s),
                  (this.drawer = this.container.querySelector(selectors$h.drawer)),
                  this.drawer
                    ? ((this.clone = this.drawer.cloneNode(!0)),
                      document.body.appendChild(this.clone),
                      t.classList.remove(classes$d.isHidden),
                      t.removeChild(this.drawer),
                      (this.drawer = document.querySelector(selectors$h.drawer)),
                      (this.buttonDrawerOpen = document.querySelector(selectors$h.drawerOpen)),
                      (this.buttonDrawerClose = document.querySelectorAll(selectors$h.drawerClose)),
                      this.buttonDrawerOpen &&
                        this.buttonDrawerOpen.addEventListener("click", () => {
                          this.openDrawer(), (window.accessibility.lastElement = this.buttonDrawerOpen);
                        }),
                      this.buttonDrawerClose.length &&
                        this.buttonDrawerClose.forEach((e) => {
                          e.addEventListener("click", () => this.closeDrawer());
                        }),
                      this.drawer.addEventListener("keyup", (e) => {
                        e.code === window.theme.keyboardKeys.ESCAPE && this.closeDrawer();
                      }))
                    : t.classList.add(classes$d.isHidden);
              })
              .catch((e) => {
                console.error(e);
              });
      }
      openDrawer() {
        this.drawer &&
          (this.drawer.classList.add(classes$d.isOpen),
          this.drawer.dispatchEvent(new CustomEvent("theme:scroll:lock", { bubbles: !0 })),
          (this.onBodyClickEvent = this.onBodyClickEvent || this.onBodyClick.bind(this)),
          document.body.addEventListener("click", this.onBodyClickEvent),
          setTimeout(() => {
            const e = this.drawer.querySelector(selectors$h.drawerClose);
            this.a11y.trapFocus(this.drawer, { elementToFocus: e });
          }, 200));
      }
      closeDrawer() {
        this.drawer &&
          (this.a11y.removeTrapFocus(),
          this.drawer.classList.remove(classes$d.isOpen),
          document.body.removeEventListener("click", this.onBodyClickEvent),
          document.dispatchEvent(new CustomEvent("theme:scroll:unlock", { bubbles: !0 })),
          window.accessibility.lastElement &&
            document.body.classList.contains(classes$d.isFocused) &&
            requestAnimationFrame(() => {
              window.accessibility.lastElement.focus();
            }));
      }
      onBodyClick(e) {
        (this.container.contains(e.target) && !e.target.hasAttribute(attributes$9.drawerUnderlay)) || this.closeDrawer();
      }
      handleErrors(e) {
        return e.ok
          ? e
          : e.json().then(function (t) {
              throw new FetchError({ status: e.statusText, headers: e.headers, json: t });
            });
      }
      constructor(e) {
        (this.container = e.container),
          (this.drawer = null),
          (this.buttonDrawerOpen = null),
          (this.buttonDrawerClose = null),
          (this.a11y = a11y),
          this.container.addEventListener("theme:variant:change", (e) => this.fetchPickupAvailability(e));
      }
    };
  const pickupAvailability = {
      onLoad() {
        sections$a[this.id] = new PickupAvailability(this);
      },
    },
    selectors$g = { complementaryProducts: "complementary-products", quickAddProduct: "quick-add-product" },
    classes$c = { loaded: "is-loaded" },
    attributes$8 = { url: "data-url" };
  let ComplementaryProducts = class extends HTMLElement {
    connectedCallback() {
      new IntersectionObserver(
        ((e, t) => {
          e[0].isIntersecting &&
            (t.unobserve(this),
            this.hasAttribute(attributes$8.url) &&
              "" !== this.getAttribute(attributes$8.url) &&
              fetch(this.getAttribute(attributes$8.url))
                .then((e) => e.text())
                .then((e) => {
                  const t = document.createElement("div");
                  t.innerHTML = e;
                  const s = t.querySelector(selectors$g.complementaryProducts);
                  s && s.innerHTML.trim().length && (this.innerHTML = s.innerHTML), t.querySelector(`${selectors$g.complementaryProducts} ${selectors$g.quickAddProduct}`) && this.classList.add(classes$c.loaded);
                })
                .catch((e) => {
                  console.error(e);
                }));
        }).bind(this),
        { rootMargin: "0px 0px 400px 0px" }
      ).observe(this);
    }
    constructor() {
      super();
    }
  };
  function _defineProperty(e, t, s) {
    return t in e ? Object.defineProperty(e, t, { value: s, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = s), e;
  }
  const events$1 = { cartUpdate: "cart-update", variantChange: "variant-change", cartError: "cart-error" };
  let RecipientForm = class extends HTMLElement {
    connectedCallback() {
      (this.cartUpdateUnsubscriber = subscribe(events$1.cartUpdate, (e) => {
        "product-form" === e.source && e.productVariantId && e.productVariantId.toString() === this.currentProductVariantId && this.resetRecipientForm();
      })),
        (this.variantChangeUnsubscriber = subscribe(events$1.variantChange, (e) => {
          e.data.sectionId === this.dataset.sectionIdForm && (this.currentProductVariantId = e.data.variant.id.toString());
        })),
        (this.cartUpdateUnsubscriber = subscribe(events$1.cartError, (e) => {
          "product-form" === e.source && e.productVariantId && e.productVariantId.toString() === this.currentProductVariantId && this.displayErrorMessage(e.message, e.errors);
        }));
    }
    disconnectedCallback() {
      this.cartUpdateUnsubscriber && this.cartUpdateUnsubscriber(), this.variantChangeUnsubscriber && this.variantChangeUnsubscriber(), this.cartErrorUnsubscriber && this.cartErrorUnsubscriber();
    }
    onChange() {
      this.checkboxInput.checked || (this.clearInputFields(), this.clearErrorMessage()), this.dispatchEvent(new CustomEvent("theme:form:sticky", { bubbles: !0, detail: { element: "accordion" } }));
    }
    clearInputFields() {
      (this.emailInput.value = ""), (this.nameInput.value = ""), (this.messageInput.value = "");
    }
    displayErrorMessage(e, t) {
      if ((this.clearErrorMessage(), this.errorMessageWrapper.classList.add("is-visible"), "object" == typeof t))
        return (
          (this.errorMessage.innerText = this.defaultErrorHeader),
          Object.entries(t).forEach(([e, t]) => {
            const s = `RecipientForm-${e}-error-${this.dataset.sectionIdForm}`,
              i = `#Recipient-${e}-${this.dataset.sectionIdForm}`,
              o = this.querySelector(`${i}`),
              r = `${(null == o ? void 0 : o.getAttribute("placeholder")) || e} ${t}`,
              a = this.querySelector(`#${s}`),
              n = null == a ? void 0 : a.querySelector(".error-message");
            if (!n) return;
            this.errorMessageList && this.errorMessageList.appendChild(this.createErrorListItem(i, r)), (n.innerText = `${r}.`), a.classList.remove("hidden");
            const l = this[`${e}Input`];
            l && (l.setAttribute("aria-invalid", !0), l.setAttribute("aria-describedby", s));
          })
        );
      this.errorMessage.innerText = t;
    }
    createErrorListItem(e, t) {
      const s = document.createElement("li"),
        i = document.createElement("a");
      return i.setAttribute("href", e), (i.innerText = t), s.appendChild(i), (s.className = "error-message"), s;
    }
    clearErrorMessage() {
      this.errorMessageWrapper.classList.remove("is-visible"),
        this.errorMessageList && (this.errorMessageList.innerHTML = ""),
        this.querySelectorAll(".recipient-fields .form__message").forEach((e) => {
          e.classList.add("hidden");
          const t = e.querySelector(".error-message");
          t && (t.innerText = "");
        }),
        [this.emailInput, this.messageInput, this.nameInput].forEach((e) => {
          e.setAttribute("aria-invalid", !1), e.removeAttribute("aria-describedby");
        });
    }
    resetRecipientForm() {
      this.checkboxInput.checked && ((this.checkboxInput.checked = !1), this.clearInputFields(), this.clearErrorMessage());
    }
    constructor() {
      var e, t, s;
      super(),
        _defineProperty(this, "cartUpdateUnsubscriber", void 0),
        _defineProperty(this, "variantChangeUnsubscriber", void 0),
        _defineProperty(this, "cartErrorUnsubscriber", void 0),
        (this.checkboxInput = this.querySelector(`#Recipient-Checkbox-${this.dataset.sectionIdForm}`)),
        (this.checkboxInput.disabled = !1),
        (this.hiddenControlField = this.querySelector(`#Recipient-Control-${this.dataset.sectionIdForm}`)),
        (this.hiddenControlField.disabled = !0),
        (this.emailInput = this.querySelector(`#Recipient-email-${this.dataset.sectionIdForm}`)),
        (this.nameInput = this.querySelector(`#Recipient-name-${this.dataset.sectionIdForm}`)),
        (this.messageInput = this.querySelector(`#Recipient-message-${this.dataset.sectionIdForm}`)),
        (this.errorMessageWrapper = this.querySelector(".product-form__recipient-error-message-wrapper")),
        (this.errorMessageList = null === (e = this.errorMessageWrapper) || void 0 === e ? void 0 : e.querySelector("ul")),
        (this.errorMessage = null === (t = this.errorMessageWrapper) || void 0 === t ? void 0 : t.querySelector("span.error-message")),
        (this.defaultErrorHeader = null === (s = this.errorMessage) || void 0 === s ? void 0 : s.textContent),
        (this.currentProductVariantId = this.dataset.productVariantId),
        this.addEventListener("change", this.onChange.bind(this));
    }
  };
  const selectors$f = {
      slideshow: "[data-product-slideshow]",
      dataStickyEnabled: "data-sticky-enabled",
      productPage: ".product__page",
      formWrapper: "[data-form-wrapper]",
      headerSticky: "[data-header-sticky]",
      headerHeight: "[data-header-height]",
    },
    classes$b = { sticky: "is-sticky" };
  window.theme.variables = { productPageSticky: !1 };
  const sections$9 = {};
  let ProductSticky = class {
    init() {
      this.stickyEnabled && (this.stickyScrollCheck(), document.addEventListener("theme:resize", this.resizeEvent)), this.initSticky();
    }
    initSticky() {
      theme.variables.productPageSticky &&
        ((this.requestAnimationSticky = requestAnimationFrame(() => this.calculateStickyPosition())),
        this.formWrapper.addEventListener("theme:form:sticky", (e) => {
          this.removeAnimationFrame(), (this.requestAnimationSticky = requestAnimationFrame(() => this.calculateStickyPosition(e)));
        }),
        document.addEventListener("theme:scroll", this.scrollEvent));
    }
    scrollEvents(e) {
      (this.scrollTop = e.detail.position), (this.scrollDirectionDown = e.detail.down), this.requestAnimationSticky || (this.requestAnimationSticky = requestAnimationFrame(() => this.calculateStickyPosition()));
    }
    resizeEvents(e) {
      this.stickyScrollCheck(), document.removeEventListener("theme:scroll", this.scrollEvent), this.initSticky();
    }
    stickyScrollCheck() {
      const e = this.container.querySelector(`${selectors$f.productPage} ${selectors$f.formWrapper}`);
      if (e)
        if (isDesktop()) {
          const t = this.container.querySelector(selectors$f.formWrapper),
            s = this.container.querySelector(selectors$f.slideshow);
          if (!t || !s) return;
          t.offsetHeight < s.offsetHeight ? ((theme.variables.productPageSticky = !0), e.classList.add(classes$b.sticky)) : ((theme.variables.productPageSticky = !1), e.classList.remove(classes$b.sticky));
        } else (theme.variables.productPageSticky = !1), e.classList.remove(classes$b.sticky);
    }
    calculateStickyPosition(e = null) {
      if (document.documentElement.hasAttribute("data-scroll-locked")) return void this.removeAnimationFrame();
      const t = Boolean(e && e.detail),
        s = Boolean(t && e.detail.element && "accordion" === e.detail.element),
        i = this.formWrapper.offsetHeight,
        o = window.innerHeight - i - this.defaultTopBottomSpacings,
        r = Math.abs(this.scrollTop - this.scrollLastPosition);
      this.scrollDirectionDown ? (this.stickyScrollTop -= r) : (this.stickyScrollTop += r),
        this.stickyFormLoad &&
          (document.querySelector(selectors$f.headerSticky) && document.querySelector(selectors$f.headerHeight)
            ? (this.stickyDefaultTop = parseInt(document.querySelector(selectors$f.headerHeight).getBoundingClientRect().height))
            : (this.stickyDefaultTop = this.defaultTopBottomSpacings),
          (this.stickyScrollTop = this.stickyDefaultTop)),
        (this.stickyScrollTop = Math.min(Math.max(this.stickyScrollTop, o), this.stickyDefaultTop));
      const a = this.stickyScrollTop - this.currentPoint;
      (this.currentPoint = this.stickyFormLoad ? this.stickyScrollTop : this.currentPoint + 0.5 * a),
        this.formWrapper.style.setProperty("--sticky-top", `${this.currentPoint}px`),
        (this.scrollLastPosition = this.scrollTop),
        (this.stickyFormLoad = !1),
        (s && this.onChangeCounter <= 10) || (s && this.stickyFormLastHeight !== i) || (this.stickyScrollTop !== this.currentPoint && this.requestAnimationSticky)
          ? (s && (this.onChangeCounter += 1), s && this.stickyFormLastHeight !== i && (this.onChangeCounter = 11), (this.requestAnimationSticky = requestAnimationFrame(() => this.calculateStickyPosition(e))))
          : this.requestAnimationSticky && this.removeAnimationFrame(),
        (this.stickyFormLastHeight = i);
    }
    removeAnimationFrame() {
      this.requestAnimationSticky && (cancelAnimationFrame(this.requestAnimationSticky), (this.requestAnimationSticky = null), (this.onChangeCounter = 0));
    }
    onUnload() {
      this.stickyEnabled && document.removeEventListener("theme:resize", this.resizeEvent), theme.variables.productPageSticky && document.removeEventListener("theme:scroll", this.scrollEvent);
    }
    constructor(e) {
      (this.section = e),
        (this.container = e.container),
        (this.stickyEnabled = "true" === this.container.getAttribute(selectors$f.dataStickyEnabled)),
        (this.formWrapper = this.container.querySelector(selectors$f.formWrapper)),
        (this.stickyScrollTop = 0),
        (this.scrollLastPosition = 0),
        (this.stickyDefaultTop = 0),
        (this.currentPoint = 0),
        (this.defaultTopBottomSpacings = 30),
        (this.scrollTop = window.scrollY),
        (this.scrollDirectionDown = !0),
        (this.requestAnimationSticky = null),
        (this.stickyFormLoad = !0),
        (this.stickyFormLastHeight = null),
        (this.onChangeCounter = 0),
        (this.scrollEvent = (e) => this.scrollEvents(e)),
        (this.resizeEvent = (e) => this.resizeEvents(e)),
        setTimeout(() => {
          this.init();
        }, 50);
    }
  };
  const productStickySection = {
      onLoad() {
        sections$9[this.id] = new ProductSticky(this);
      },
      onUnload() {
        sections$9[this.id].onUnload();
      },
    },
    selectors$e = { section: "data-section-type", shareButton: "[data-share-button]", shareMessage: "[data-share-message]" },
    classes$a = { visible: "is-visible" };
  let ShareButton = class extends HTMLElement {
    init() {
      navigator.share
        ? this.shareButton.addEventListener("click", () => {
            navigator.share({ url: this.urlToShare, title: document.title });
          })
        : this.shareButton.addEventListener("click", this.copyToClipboard.bind(this));
    }
    updateShareLink() {
      "product" == this.container.getAttribute(selectors$e.section) &&
        this.container.addEventListener("theme:variant:change", (e) => {
          e.detail.variant && (this.urlToShare = `${this.urlToShare.split("?")[0]}?variant=${e.detail.variant.id}`);
        });
    }
    copyToClipboard() {
      navigator.clipboard.writeText(this.urlToShare).then(() => {
        this.shareMessage.classList.add(classes$a.visible);
        const e = () => {
          this.shareMessage.classList.remove(classes$a.visible), this.shareMessage.removeEventListener("animationend", e);
        };
        this.shareMessage.addEventListener("animationend", e);
      });
    }
    constructor() {
      super(),
        (this.container = this.closest(`[${selectors$e.section}]`)),
        (this.shareButton = this.querySelector(selectors$e.shareButton)),
        (this.shareMessage = this.querySelector(selectors$e.shareMessage)),
        (this.urlToShare = this.shareButton.dataset.shareUrl ? this.shareButton.dataset.shareUrl : document.location.href),
        this.init(),
        this.updateShareLink();
    }
  };
  const selectors$d = {
      optionPosition: "data-option-position",
      optionInput: '[name^="options"], [data-popout-option]',
      optionInputCurrent: '[name^="options"]:checked, [name^="options"][type="hidden"]',
      selectOptionValue: "data-value",
      popout: "[data-popout]",
    },
    classes$9 = { soldOut: "sold-out", unavailable: "unavailable", sale: "sale" };
  let SelloutVariants = class {
    init() {
      this.update();
    }
    update() {
      this.getCurrentState(),
        this.optionElements.forEach((e) => {
          const t = e.closest(`[${selectors$d.optionPosition}]`);
          if (!t) return;
          const s = e.value || e.getAttribute(selectors$d.selectOptionValue),
            i = t.getAttribute(selectors$d.optionPosition),
            o = parseInt(i, 10) - 1,
            r = e.closest(selectors$d.popout);
          let a = [...this.selections];
          a[o] = s;
          const n = this.productJSON.variants.find((e) => {
            let t = !0;
            for (let s = 0; s < a.length; s++) e.options[s] !== a[s] && (t = !1);
            return t;
          });
          e.classList.remove(classes$9.soldOut, classes$9.unavailable),
            e.parentNode.classList.remove(classes$9.sale),
            r && r.classList.remove(classes$9.soldOut, classes$9.unavailable, classes$9.sale),
            void 0 === n ? (e.classList.add(classes$9.unavailable), r && r.classList.add(classes$9.unavailable)) : n && !1 === n.available && (e.classList.add(classes$9.soldOut), r && r.classList.add(classes$9.soldOut)),
            n && n.compare_at_price > n.price && theme.settings.variantOnSale && e.parentNode.classList.add(classes$9.sale);
        });
    }
    getCurrentState() {
      this.selections = [];
      const e = this.container.querySelectorAll(selectors$d.optionInputCurrent);
      e.length &&
        e.forEach((e) => {
          const t = e.value;
          t && "" !== t && this.selections.push(t);
        });
    }
    constructor(e, t) {
      (this.container = e), (this.productJSON = t), (this.optionElements = this.container.querySelectorAll(selectors$d.optionInput)), this.productJSON && this.optionElements.length && this.init();
    }
  };
  const events = { variantChange: "variant-change" },
    selectors$c = {
      product: "[data-product]",
      productForm: "[data-product-form]",
      addToCart: "[data-add-to-cart]",
      addToCartText: "[data-add-to-cart-text]",
      comparePrice: "[data-compare-price]",
      comparePriceText: "[data-compare-text]",
      formWrapper: "[data-form-wrapper]",
      originalSelectorId: "[data-product-select]",
      priceWrapper: "[data-price-wrapper]",
      productSlideshow: "[data-product-slideshow]",
      productImage: "[data-product-image]",
      productJson: "[data-product-json]",
      productPrice: "[data-product-price]",
      unitPrice: "[data-product-unit-price]",
      unitBase: "[data-product-base]",
      unitWrapper: "[data-product-unit]",
      isPreOrder: "[data-product-preorder]",
      sliderEnabled: "flickity-enabled",
      productSlide: ".product__slide",
      subPrices: "[data-subscription-watch-price]",
      subSelectors: "[data-subscription-selectors]",
      subsToggle: "[data-toggles-group]",
      subsChild: "data-group-toggle",
      subDescription: "[data-plan-description]",
      section: "[data-section-type]",
      quickAddModal: "[data-quick-add-modal]",
      priceOffWrap: "[data-price-off]",
      priceOffType: "[data-price-off-type]",
      priceOffAmount: "[data-price-off-amount]",
      remainingCount: "[data-remaining-count]",
      remainingMax: "[data-remaining-max]",
      remainingWrapper: "[data-remaining-wrapper]",
      remainingJSON: "[data-product-remaining-json]",
      optionValue: "[data-option-value]",
      optionPosition: "[data-option-position]",
      installment: "[data-product-form-installment]",
      inputId: 'input[name="id"]',
    },
    classes$8 = {
      hidden: "hidden",
      variantSoldOut: "variant--soldout",
      variantUnavailable: "variant--unavailable",
      productPriceSale: "product__price--sale",
      remainingLow: "count-is-low",
      remainingIn: "count-is-in",
      remainingOut: "count-is-out",
      remainingUnavailable: "count-is-unavailable",
    },
    attributes$7 = { dataTallLayout: "data-tall-layout", remainingMaxAttr: "data-remaining-max", dataEnableHistoryState: "data-enable-history-state", optionPosition: "data-option-position", dataImageId: "data-image-id" };
  let ProductForm = class extends HTMLElement {
    connectedCallback() {
      if ((this.cartAddEvents(), (this.container = this.closest(selectors$c.section) || this.closest(selectors$c.quickAddModal)), !this.container)) return;
      if (
        ((this.sectionId = this.container.dataset.sectionId),
        (this.tallLayout = "true" === this.container.getAttribute(attributes$7.dataTallLayout)),
        (this.product = this.container.querySelector(selectors$c.product)),
        (this.productForm = this.container.querySelector(selectors$c.productForm)),
        (this.installmentForm = this.container.querySelector(selectors$c.installment)),
        (this.sellout = null),
        (this.priceOffWrap = this.container.querySelector(selectors$c.priceOffWrap)),
        (this.priceOffAmount = this.container.querySelector(selectors$c.priceOffAmount)),
        (this.priceOffType = this.container.querySelector(selectors$c.priceOffType)),
        (this.planDescription = this.container.querySelector(selectors$c.subDescription)),
        (this.remainingWrapper = this.container.querySelector(selectors$c.remainingWrapper)),
        this.remainingWrapper)
      ) {
        const e = this.container.querySelector(selectors$c.remainingMax);
        e &&
          ((this.remainingMaxInt = parseInt(e.getAttribute(attributes$7.remainingMaxAttr), 10)),
          (this.remainingCount = this.container.querySelector(selectors$c.remainingCount)),
          (this.remainingJSONWrapper = this.container.querySelector(selectors$c.remainingJSON)),
          (this.remainingJSON = null),
          this.remainingJSONWrapper && "" !== this.remainingJSONWrapper.innerHTML ? (this.remainingJSON = JSON.parse(this.remainingJSONWrapper.innerHTML)) : console.warn("Missing product quantity JSON"));
      }
      (this.enableHistoryState = "true" === this.container.getAttribute(attributes$7.dataEnableHistoryState)),
        (this.hasUnitPricing = this.container.querySelector(selectors$c.unitWrapper)),
        (this.subSelectors = this.container.querySelector(selectors$c.subSelectors)),
        (this.subPrices = this.container.querySelector(selectors$c.subPrices)),
        (this.isPreOrder = this.container.querySelector(selectors$c.isPreOrder));
      new QuantityCounter(this.container).init();
      let e = null;
      const t = this.container.querySelector(selectors$c.productJson);
      t && (e = t.innerHTML), e ? ((this.productJSON = JSON.parse(e)), this.linkForm(), (this.sellout = new SelloutVariants(this.container, this.productJSON))) : console.error("Missing product JSON");
    }
    cartAddEvents() {
      (this.buttonATC = this.querySelector(selectors$c.addToCart)),
        this.buttonATC &&
          this.buttonATC.addEventListener("click", (e) => {
            e.preventDefault(), document.dispatchEvent(new CustomEvent("theme:cart:add", { detail: { button: this.buttonATC }, bubbles: !1 }));
          });
    }
    destroy() {
      this.productForm.destroy();
    }
    linkForm() {
      (this.productForm = new ProductFormReader(this.container, this.productJSON, { onOptionChange: this.onOptionChange.bind(this), onPlanChange: this.onPlanChange.bind(this) })),
        this.pushState(this.productForm.getFormState()),
        this.subsToggleListeners();
    }
    onOptionChange(e) {
      this.pushState(e.dataset), this.updateProductImage(e);
    }
    onPlanChange(e) {
      this.subPrices && this.pushState(e.dataset);
    }
    pushState(e) {
      var t;
      (this.productState = this.setProductState(e)),
        this.updateAddToCartState(e),
        this.updateProductPrices(e),
        this.updateSaleText(e),
        this.updateSubscriptionText(e),
        this.updateRemaining(e),
        this.updateLegend(e),
        this.fireHookEvent(e),
        null === (t = this.sellout) || void 0 === t || t.update(e),
        this.enableHistoryState && this.updateHistoryState(e);
    }
    updateAddToCartState(e) {
      const t = e.variant;
      let s = theme.strings.addToCart;
      const i = this.container.querySelectorAll(selectors$c.priceWrapper),
        o = this.container.querySelectorAll(selectors$c.addToCart),
        r = this.container.querySelectorAll(selectors$c.addToCartText),
        a = this.container.querySelectorAll(selectors$c.formWrapper);
      if (this.installmentForm && t) {
        const e = this.installmentForm.querySelector(selectors$c.inputId);
        (e.value = t.id), e.dispatchEvent(new Event("change", { bubbles: !0 }));
      }
      this.isPreOrder && (s = theme.strings.preOrder),
        i.length &&
          t &&
          i.forEach((e) => {
            e.classList.remove(classes$8.hidden);
          }),
        o.length &&
          o.forEach((e) => {
            t && t.available ? (e.disabled = !1) : (e.disabled = !0);
          }),
        r.length &&
          r.forEach((e) => {
            t ? (t.available ? (e.innerHTML = s) : (e.innerHTML = theme.strings.soldOut)) : (e.innerHTML = theme.strings.unavailable);
          }),
        a.length &&
          a.forEach((e) => {
            if (t) {
              t.available ? e.classList.remove(classes$8.variantSoldOut, classes$8.variantUnavailable) : (e.classList.add(classes$8.variantSoldOut), e.classList.remove(classes$8.variantUnavailable));
              const s = e.querySelector(selectors$c.originalSelectorId);
              s && (s.value = t.id);
              const i = e.querySelector(`${selectors$c.inputId}[form]`);
              i && ((i.value = t.id), i.dispatchEvent(new Event("change")));
            } else e.classList.add(classes$8.variantUnavailable), e.classList.remove(classes$8.variantSoldOut);
          });

      $(".description-variant").hide();
      $(".description-variant-"+e.variant.id).show();
    }
    updateHistoryState(e) {
      const t = e.variant,
        s = e.plan,
        i = window.location.href;
      if (t && i.includes("/product")) {
        const e = new window.URL(i),
          o = e.searchParams;
        o.set("variant", t.id), s && s.detail && s.detail.id && this.productState.hasPlan ? o.set("selling_plan", s.detail.id) : o.delete("selling_plan"), (e.search = o.toString());
        const r = e.toString();
        window.history.replaceState({ path: r }, "", r);
      }
    }
    updateRemaining(e) {
      var t;
      const s = e.variant;
      if (
        (null === (t = this.remainingWrapper) || void 0 === t || t.classList.remove(classes$8.remainingIn, classes$8.remainingOut, classes$8.remainingUnavailable, classes$8.remainingLow), s && this.remainingWrapper && this.remainingJSON)
      ) {
        const e = this.remainingJSON[s.id];
        ("out" === e || e < 1) && this.remainingWrapper.classList.add(classes$8.remainingOut),
          ("in" === e || e >= this.remainingMaxInt) && this.remainingWrapper.classList.add(classes$8.remainingIn),
          ("low" === e || (e > 0 && e < this.remainingMaxInt)) && (this.remainingWrapper.classList.add(classes$8.remainingLow), this.remainingCount && (this.remainingCount.innerHTML = e));
      } else !s && this.remainingWrapper && this.remainingWrapper.classList.add(classes$8.remainingUnavailable);
    }
    getBaseUnit(e) {
      return 1 === e.unit_price_measurement.reference_value ? e.unit_price_measurement.reference_unit : e.unit_price_measurement.reference_value + e.unit_price_measurement.reference_unit;
    }
    subsToggleListeners() {
      this.container.querySelectorAll(selectors$c.subsToggle).forEach((e) => {
        e.addEventListener(
          "change",
          function (e) {
            const t = e.target.value.toString(),
              s = this.container.querySelector(`[${selectors$c.subsChild}="${t}"]`),
              i = this.container.querySelectorAll(`[${selectors$c.subsChild}]`);
            if (s) {
              s.classList.remove(classes$8.hidden);
              const e = s.querySelector('[name="selling_plan"]');
              (e.checked = !0), e.dispatchEvent(new Event("change"));
            }
            i.forEach((e) => {
              if (e !== s) {
                e.classList.add(classes$8.hidden);
                e.querySelectorAll('[name="selling_plan"]').forEach((e) => {
                  (e.checked = !1), e.dispatchEvent(new Event("change"));
                });
              }
            });
          }.bind(this)
        );
      });
    }
    updateSaleText(e) {
      this.productState.planSale ? this.updateSaleTextSubscription(e) : this.productState.onSale ? this.updateSaleTextStandard(e) : this.priceOffWrap && this.priceOffWrap.classList.add(classes$8.hidden);
    }
    updateSaleTextStandard(e) {
      if ((this.priceOffType && (this.priceOffType.innerHTML = window.theme.strings.sale || "sale"), this.priceOffAmount && this.priceOffWrap)) {
        const t = e.variant,
          s = (t.compare_at_price - t.price) / t.compare_at_price,
          i = Math.floor(100 * s);
        (this.priceOffAmount.innerHTML = `${i}%`), this.priceOffWrap.classList.remove(classes$8.hidden);
      }
    }
    updateSubscriptionText(e) {
      e.plan && this.planDescription ? ((this.planDescription.innerHTML = e.plan.detail.description), this.planDescription.classList.remove(classes$8.hidden)) : this.planDescription && this.planDescription.classList.add(classes$8.hidden);
    }
    updateSaleTextSubscription(e) {
      if ((this.priceOffType && (this.priceOffType.innerHTML = window.theme.strings.subscription || "subscripton"), this.priceOffAmount && this.priceOffWrap)) {
        const t = e.plan.detail.price_adjustments[0],
          s = t.value;
        t && "percentage" === t.value_type ? (this.priceOffAmount.innerHTML = `${s}%`) : (this.priceOffAmount.innerHTML = themeCurrency.formatMoney(s, theme.moneyFormat)), this.priceOffWrap.classList.remove(classes$8.hidden);
      }
    }
    updateProductPrices(e) {
      const t = e.variant,
        s = e.plan;
      this.container.querySelectorAll(selectors$c.priceWrapper).forEach((e) => {
        const i = e.querySelector(selectors$c.comparePrice),
          o = e.querySelector(selectors$c.productPrice),
          r = e.querySelector(selectors$c.comparePriceText);
        let a = "",
          n = "";
        this.productState.available && ((a = t.compare_at_price), (n = t.price)),
          this.productState.hasPlan && (n = s.allocation.price),
          this.productState.planSale && ((a = s.allocation.compare_at_price), (n = s.allocation.price)),
          i &&
            (this.productState.onSale || this.productState.planSale
              ? (i.classList.remove(classes$8.hidden), r.classList.remove(classes$8.hidden), o.classList.add(classes$8.productPriceSale))
              : (i.classList.add(classes$8.hidden), r.classList.add(classes$8.hidden), o.classList.remove(classes$8.productPriceSale)),
            (i.innerHTML = themeCurrency.formatMoney(a, theme.moneyFormat))),
          (o.innerHTML = 0 === n ? window.theme.strings.free : themeCurrency.formatMoney(n, theme.moneyFormat));
      }),
        this.hasUnitPricing && this.updateProductUnits(e);
    }
    updateProductUnits(e) {
      const t = e.variant,
        s = e.plan;
      let i = null;
      if ((t && t.unit_price && (i = t.unit_price), s && s.allocation && s.allocation.unit_price && (i = s.allocation.unit_price), i)) {
        const e = this.getBaseUnit(t),
          s = themeCurrency.formatMoney(i, theme.moneyFormat);
        (this.container.querySelector(selectors$c.unitPrice).innerHTML = s), (this.container.querySelector(selectors$c.unitBase).innerHTML = e), showElement(this.container.querySelector(selectors$c.unitWrapper));
      } else hideElement(this.container.querySelector(selectors$c.unitWrapper));
    }
    fireHookEvent(e) {
      const t = e.variant;
      this.container.dispatchEvent(new CustomEvent("theme:variant:change", { detail: { variant: t }, bubbles: !0 })), publish(events.variantChange, { data: { sectionId: this.sectionId, variant: t } });
    }
    setProductState(e) {
      const t = e.variant,
        s = e.plan,
        i = { available: !0, soldOut: !1, onSale: !1, showUnitPrice: !1, requiresPlan: !1, hasPlan: !1, planPerDelivery: !1, planSale: !1 };
      return (
        !t || (t.requires_selling_plan && !s)
          ? (i.available = !1)
          : (t.available || (i.soldOut = !0),
            t.compare_at_price > t.price && (i.onSale = !0),
            t.unit_price && (i.showUnitPrice = !0),
            this.product && this.product.requires_selling_plan && (i.requiresPlan = !0),
            s && this.subPrices && ((i.hasPlan = !0), s.allocation.per_delivery_price !== s.allocation.price && (i.planPerDelivery = !0), t.price > s.allocation.price && (i.planSale = !0))),
        i
      );
    }
    updateProductImage(e) {
      const t = e.dataset.variant;
      if (t && t.featured_media) {
        const e = this.container.querySelector(`[${attributes$7.dataImageId}="${t.featured_media.id}"]`),
          s = null == e ? void 0 : e.closest(selectors$c.productSlide);
        if (s) {
          const t = Array.from(s.parentElement.children).indexOf(s),
            i = this.container.querySelector(selectors$c.productSlideshow),
            o = isDesktop();
          if ((i && i.classList.contains(selectors$c.sliderEnabled) ? FlickityFade.data(i).select(t) : i && !o && i.scrollTo({ top: 0, left: s.offsetLeft, behavior: "smooth" }), o && this.tallLayout)) {
            const s = e.getBoundingClientRect().top;
            if (0 === t && s + window.scrollY > window.pageYOffset) return;
            document.dispatchEvent(new CustomEvent("theme:tooltip:close", { bubbles: !1, detail: { hideTransition: !1 } })), scrollTo(s);
          }
        }
      }
    }
    updateLegend(e) {
      const t = e.variant;
      if (t) {
        const e = this.container.querySelectorAll(selectors$c.optionValue);
        e.length &&
          e.forEach((e) => {
            const s = e.closest(selectors$c.optionPosition);
            if (s) {
              const i = s.getAttribute(attributes$7.optionPosition),
                o = parseInt(i, 10) - 1,
                r = t.options[o];
              e.innerHTML = r;
            }
          });
      }
    }
    constructor() {
      super();
    }
  };
  const selectors$b = { dialog: "dialog", focusable: 'button, [href], select, textarea, [tabindex]:not([tabindex="-1"])', buttonModalOpen: "[data-modal-open]", buttonModalClose: "[data-modal-close]" },
    attributes$6 = { closing: "closing" };
  let ProductModal = class extends HTMLElement {
    connectedCallback() {
      (this.modal = this.querySelector(selectors$b.dialog)),
        (this.buttonModalOpen = this.querySelector(selectors$b.buttonModalOpen)),
        (this.buttonModalClose = this.querySelector(selectors$b.buttonModalClose)),
        (this.focusTarget = this.modal.querySelector("[autofocus]") || this.modal.querySelector(selectors$b.focusable)),
        (this.isAnimating = !1),
        this.modalEvents();
    }
    modalOpen() {
      var e;
      this.modal.showModal(),
        this.modal.setAttribute("open", !0),
        this.modal.removeAttribute("inert"),
        null === (e = this.focusTarget) || void 0 === e || e.focus(),
        document.dispatchEvent(new CustomEvent("theme:modal:open", { bubbles: !0 }));
    }
    modalClose() {
      if (!this.isAnimating) {
        if (!this.modal.hasAttribute(attributes$6.closing)) return this.modal.setAttribute(attributes$6.closing, ""), void (this.isAnimating = !0);
        this.modal.close(), this.modal.removeAttribute(attributes$6.closing), this.modal.setAttribute("inert", "");
      }
    }
    modalEvents() {
      this.buttonModalOpen.addEventListener("click", (e) => {
        e.preventDefault(), this.modalOpen();
      }),
        this.buttonModalClose.addEventListener("click", (e) => {
          e.preventDefault(), this.modalClose();
        }),
        this.modal.addEventListener("click", (e) => {
          "DIALOG" === e.target.nodeName && "click" === e.type && this.modalClose();
        }),
        this.modal.addEventListener("keydown", (e) => {
          e.code == theme.keyboardKeys.ESCAPE && (e.preventDefault(), this.modalClose());
        }),
        this.modal.addEventListener("theme:modal:close", () => {
          this.modalClose();
        }),
        this.modal.addEventListener("animationend", (e) => {
          e.target === this.modal && ((this.isAnimating = !1), this.modal.hasAttribute(attributes$6.closing) && this.modalClose());
        });
    }
    constructor() {
      super();
    }
  };
  const selectors$a = {
      addToCart: "[data-add-to-cart]",
      priceWrapper: "[data-price-wrapper]",
      productImage: "[data-product-image]",
      productJson: "[data-product-json]",
      form: "[data-product-form]",
      dataSectionId: "data-section-id",
      dataCartBar: "data-cart-bar",
      cartBar: "#cart-bar",
      cartBarAdd: "data-add-to-cart-bar",
      cartBarScroll: "data-cart-bar-scroll",
      productSubmitAdd: ".product__submit__add",
      toggleTruncateHolder: "[data-truncated-holder]",
      toggleTruncateButton: "[data-truncated-button]",
      toggleTruncateContent: "[data-truncated-content]",
      toggleTruncateContentAttr: "data-truncated-content",
      formWrapper: "[data-form-wrapper]",
      slider: "[data-slider]",
      sliderIndex: "data-slider-index",
    },
    classes$7 = { expanded: "is-expanded", visible: "is-visible", loading: "is-loading", added: "is-added" },
    sections$8 = {};
  let Product = class {
    init() {
      (theme.mediaInstances[this.id] = new Media(this.section)), theme.mediaInstances[this.id].init();
    }
    scrollEvents(e) {
      this.cartBarExist && this.cartBarScroll();
    }
    resizeEvents(e) {
      this.truncateText();
    }
    truncateText() {
      if (this.truncateElementHolder.classList.contains(classes$7.visible)) return;
      const e = this.truncateElement.querySelectorAll("style");
      e.length &&
        e.forEach((e) => {
          this.truncateElementHolder.prepend(e);
        });
      const t = this.truncateElement.cloneNode(!0),
        s = this.truncateElement.getAttribute(selectors$a.toggleTruncateContentAttr),
        i = this.truncateElement.nextElementSibling;
      i && i.remove(), this.truncateElement.parentElement.append(t);
      const o = this.truncateElement.nextElementSibling;
      o.classList.add(s),
        o.removeAttribute(selectors$a.toggleTruncateContentAttr),
        showElement(o),
        ellipsis(o, 5, { replaceStr: "", delimiter: " " }),
        hideElement(o),
        this.truncateElement.innerHTML !== o.innerHTML ? this.truncateElementHolder.classList.add(classes$7.expanded) : (o.remove(), this.truncateElementHolder.classList.remove(classes$7.expanded)),
        this.toggleTruncatedContent(this.truncateElementHolder);
    }
    toggleTruncatedContent(e) {
      const t = e.querySelector(selectors$a.toggleTruncateButton);
      t &&
        t.addEventListener("click", (t) => {
          t.preventDefault(), e.classList.remove(classes$7.expanded), e.classList.add(classes$7.visible);
        });
    }
    initCartBar() {
      (this.cartBarBtn = this.cartBar.querySelector(selectors$a.productSubmitAdd)),
        this.cartBarBtn &&
          (this.cartBarBtn.addEventListener("click", (e) => {
            e.preventDefault(),
              e.currentTarget.hasAttribute(selectors$a.cartBarAdd)
                ? (theme.settings.cartDrawerEnabled && (e.currentTarget.classList.add(classes$7.loading), e.currentTarget.setAttribute("disabled", "disabled")),
                  this.form.querySelector(selectors$a.addToCart).dispatchEvent(new Event("click", { bubbles: !0 })))
                : e.currentTarget.hasAttribute(selectors$a.cartBarScroll) && this.scrollToTop();
          }),
          this.cartBarBtn.hasAttribute(selectors$a.cartBarAdd) && document.addEventListener("theme:product:add-error", this.scrollToTop));
    }
    scrollToTop() {
      const e = isDesktop() ? this.container : this.form;
      scrollTo(e.getBoundingClientRect().top);
    }
    cartBarScroll() {
      const e = window.pageYOffset,
        t = theme.variables.productPageSticky && this.formWrapper ? this.formWrapper : this.form;
      if (t && this.cartBar) {
        const s = e > t.offsetTop + t.offsetHeight;
        this.cartBar.classList.toggle(classes$7.visible, s);
      }
    }
    onUnload() {
      document.removeEventListener("theme:product:add-error", this.scrollToTop),
        this.truncateElementHolder && this.truncateElement && document.removeEventListener("theme:resize", this.resizeEvent),
        this.cartBarExist && document.removeEventListener("theme:scroll", this.scrollEvent);
    }
    onBlockSelect(e) {
      const t = e.srcElement.closest(selectors$a.slider);
      if (t && this.slider.length) {
        const s = t.hasAttribute(selectors$a.sliderIndex) ? t.getAttribute(selectors$a.sliderIndex) : 0;
        if (!this.slider[s]) return;
        this.slider[s].onBlockSelect(e);
      }
    }
    onBlockDeselect(e) {
      const t = e.srcElement.closest(selectors$a.slider);
      if (t && this.slider.length) {
        const s = t.hasAttribute(selectors$a.sliderIndex) ? t.getAttribute(selectors$a.sliderIndex) : 0;
        if (!this.slider[s]) return;
        this.slider[s].onBlockDeselect(e);
      }
    }
    constructor(e) {
      (this.section = e),
        (this.container = e.container),
        (this.id = this.container.getAttribute(selectors$a.dataSectionId)),
        (this.sliders = this.container.querySelectorAll(selectors$a.slider)),
        (this.slider = []),
        (this.truncateElementHolder = this.container.querySelector(selectors$a.toggleTruncateHolder)),
        (this.truncateElement = this.container.querySelector(selectors$a.toggleTruncateContent)),
        (this.formWrapper = this.container.querySelector(selectors$a.formWrapper)),
        (this.cartBarExist = "true" === this.container.getAttribute(selectors$a.dataCartBar)),
        (this.cartBar = this.container.querySelector(selectors$a.cartBar)),
        (this.scrollToTop = this.scrollToTop.bind(this)),
        (this.scrollEvent = (e) => this.scrollEvents(e)),
        (this.resizeEvent = (e) => this.resizeEvents(e)),
        (this.unlockTimer = 0),
        (this.accessibility = a11y),
        this.truncateElementHolder && this.truncateElement && (setTimeout(() => this.truncateText(), 50), document.addEventListener("theme:resize", this.resizeEvent));
      const t = this.container.querySelector(selectors$a.productJson);
      if ((t && !t.innerHTML) || !t) {
        return void new QuantityCounter(this.container).init();
      }
      const s = JSON.parse(t.innerHTML).handle;
      let i = {};
      s && (i = { handle: s }),
        Shopify.Products.recordRecentlyViewed(i),
        (this.form = this.container.querySelector(selectors$a.form)),
        this.init(),
        this.sliders.length &&
          this.sliders.forEach((e, t) => {
            e.setAttribute(selectors$a.sliderIndex, t), this.slider.push(new Slider(this.container, e));
          }),
        this.cartBarExist && (this.initCartBar(), document.addEventListener("theme:scroll", this.scrollEvent));
    }
  };
  const productSection = {
    onLoad() {
      sections$8[this.id] = new Product(this);
    },
    onUnload(e) {
      sections$8[this.id].onUnload(e);
    },
    onBlockSelect(e) {
      sections$8[this.id].onBlockSelect(e);
    },
    onBlockDeselect(e) {
      sections$8[this.id].onBlockDeselect(e);
    },
  };
  register("product", [productSection, pickupAvailability, swatchSection, tooltipSection, popoutSection, tabs, productStickySection, initSlider]),
    customElements.get("complementary-products") || customElements.define("complementary-products", ComplementaryProducts),
    customElements.get("share-button") || customElements.define("share-button", ShareButton),
    customElements.get("recipient-form") || customElements.define("recipient-form", RecipientForm),
    customElements.get("product-form") || customElements.define("product-form", ProductForm),
    customElements.get("product-modal") || customElements.define("product-modal", ProductModal);
  const selectors$9 = {
      apiRelatedProductsTemplate: "[data-api-related-template]",
      relatedSection: "[data-related-section]",
      relatedProduct: "[data-product-grid-item]",
      recentlyViewed: "[data-recent-wrapper]",
      recentlyViewedWrapper: "[data-recently-viewed-wrapper]",
      productItem: ".product-item",
      slider: "[data-slider]",
    },
    attributes$5 = { limit: "data-limit", minimum: "data-minimum", productId: "data-product-id" },
    classes$6 = { isHidden: "is-hidden" },
    sections$7 = {};
  let Related = class {
    related() {
      const e = this.container.querySelector(selectors$9.relatedSection);
      if (!e) return;
      const t = e.getAttribute(attributes$5.productId),
        s = e.getAttribute(attributes$5.limit),
        i = `${window.theme.routes.product_recommendations_url}?section_id=api-product-recommendation&limit=${s}&product_id=${t}&intent=related`;
      fetch(i)
        .then((e) => e.text())
        .then((t) => {
          const s = document.createElement("div");
          s.innerHTML = new DOMParser().parseFromString(t, "text/html").querySelector(selectors$9.apiRelatedProductsTemplate).innerHTML;
          if (s.querySelector(selectors$9.relatedProduct)) {
            e.innerHTML = s.innerHTML;
            const t = e.querySelectorAll(selectors$9.relatedProduct);
            makeGridSwatches(this.section), new Siblings(this.section), t.length > 4 && e.querySelector(selectors$9.slider) && new Slider(e);
          } else e.dispatchEvent(new CustomEvent("theme:tab:hide", { bubbles: !0 }));
        })
        .catch(function () {
          e.dispatchEvent(new CustomEvent("theme:tab:hide", { bubbles: !0 }));
        });
    }
    recent() {
      const e = this.container.querySelector(selectors$9.recentlyViewed),
        t = e ? parseInt(e.getAttribute(attributes$5.limit)) : 4;
      Shopify.Products.showRecentlyViewed({
        howManyToShow: t,
        wrapperId: `recently-viewed-products-${this.sectionId}`,
        section: this.section,
        onComplete: (e, t) => {
          const s = t.container,
            i = s.querySelector(selectors$9.recentlyViewed),
            o = s.querySelector(selectors$9.recentlyViewedWrapper),
            r = e.querySelectorAll(selectors$9.productItem),
            a = i.hasAttribute(attributes$5.minimum) ? parseInt(i.getAttribute(attributes$5.minimum)) : 4,
            n = !o && r.length > 0,
            l = o && r.length >= a;
          (n || l) &&
            (l && o.classList.remove(classes$6.isHidden),
            fadeIn(i),
            i.dispatchEvent(new CustomEvent("theme:tab:check", { bubbles: !0 })),
            makeGridSwatches(t),
            new Siblings(t),
            r.length > 4 && i.querySelector(selectors$9.slider) && new Slider(i));
        },
      });
    }
    constructor(e) {
      (this.section = e), (this.sectionId = e.id), (this.container = e.container), this.related(), this.recent();
    }
  };
  const relatedSection = {
    onLoad() {
      sections$7[this.id] = new Related(this);
    },
  };
  register("related", [relatedSection, popoutSection, tabs]), register("reviews", [slider, blockScroll]);
  const sections$6 = {},
    selectors$8 = { sliderLogos: "[data-slider-logos]", sliderText: "[data-slider-text]", slide: "[data-slide]", slideIndex: "[data-slide-index]" },
    classes$5 = { isSelected: "is-selected", flickityEnabled: "flickity-enabled" },
    attributes$4 = { slideData: "data-slide", slideIndex: "data-slide-index" };
  let LogoList = class {
    initSlideshowText() {
      if (!this.slideshowText) return;
      this.flkty = new FlickityFade(this.slideshowText, {
        fade: !0,
        autoPlay: !1,
        prevNextButtons: !1,
        cellAlign: "left",
        contain: !0,
        pageDots: !1,
        wrapAround: !1,
        selectedAttraction: 0.2,
        friction: 0.6,
        draggable: !1,
        accessibility: !1,
        on: { ready: () => this.sliderAccessibility(), change: () => this.sliderAccessibility() },
      });
      const e = this.slideshowText.querySelectorAll(selectors$8.slide);
      if (e.length) {
        let t = -1;
        e.forEach((e) => {
          const s = parseFloat(getComputedStyle(e, null).height.replace("px", ""));
          s > t && (t = s);
        }),
          e.forEach((e) => {
            const s = parseFloat(getComputedStyle(e, null).height.replace("px", ""));
            if (s < t) {
              const i = Math.ceil((t - s) / 2);
              e.style.margin = `${i}px 0`;
            }
          });
      }
    }
    sliderAccessibility() {
      const e = this.slideshowText.querySelectorAll(`${selectors$8.slide} a, ${selectors$8.slide} button`);
      e.length &&
        e.forEach((e) => {
          const t = e.closest(selectors$8.slide);
          if (t) {
            const s = t.classList.contains(classes$5.isSelected) ? 0 : -1;
            e.setAttribute("tabindex", s);
          }
        });
    }
    initSlideshowNav() {
      this.slideshowNav &&
        ((this.logoSlides = this.slideshowNav.querySelectorAll(selectors$8.slideIndex)),
        this.logoSlides.length &&
          this.logoSlides.forEach((e) => {
            e.addEventListener("click", (t) => {
              t.preventDefault();
              const s = parseInt(e.getAttribute(attributes$4.slideIndex)),
                i = this.slideshowNav.classList.contains(classes$5.flickityEnabled);
              if ((this.flkty && this.flkty.select(s), i)) this.flktyNav.select(s), this.slideshowNav.classList.contains(classes$5.isSelected) || this.flktyNav.playPlayer();
              else {
                const t = this.slideshowNav.querySelector(`.${classes$5.isSelected}`);
                t && t.classList.remove(classes$5.isSelected), e.classList.add(classes$5.isSelected);
              }
            });
          }),
        this.setSlideshowNavState(),
        document.addEventListener("theme:resize", this.setSlideshowNavStateOnResize));
    }
    setSlideshowNavState() {
      const e = this.slideshowNav.querySelectorAll(selectors$8.slide),
        t = 200 * e.length,
        s = this.slideshowNav.classList.contains(classes$5.flickityEnabled);
      if (t > getWindowWidth()) {
        if (!s) {
          const t = this.slideshowNav.querySelector(`.${classes$5.isSelected}`);
          t && t.classList.remove(classes$5.isSelected),
            e[0].classList.add(classes$5.isSelected),
            (this.flktyNav = new Flickity(this.slideshowNav, { autoPlay: 4e3, prevNextButtons: !1, contain: !1, pageDots: !1, wrapAround: !0, watchCSS: !0, selectedAttraction: 0.05, friction: 0.8, initialIndex: 0 })),
            this.flkty && (this.flkty.select(0), this.flktyNav.on("change", (e) => this.flkty.select(e)));
        }
      } else s && (this.flktyNav.destroy(), e[0].classList.add(classes$5.isSelected), this.flkty && this.flkty.select(0));
    }
    onBlockSelect(e) {
      if (!this.slideshowNav) return;
      const t = this.slideshowNav.querySelector(`[${attributes$4.slideData}="${e.detail.blockId}"]`),
        s = parseInt(t.getAttribute(attributes$4.slideIndex));
      this.slideshowNav.classList.contains(classes$5.flickityEnabled) ? (this.flktyNav.select(s), this.flktyNav.stopPlayer(), this.slideshowNav.classList.add(classes$5.isSelected)) : t.dispatchEvent(new Event("click"));
    }
    onBlockDeselect() {
      this.slideshowNav && this.slideshowNav.classList.contains(classes$5.flickityEnabled) && (this.flktyNav.playPlayer(), this.slideshowNav.classList.remove(classes$5.isSelected));
    }
    onUnload() {
      if (!this.slideshowNav) return;
      this.slideshowNav.classList.contains(classes$5.flickityEnabled) && this.flktyNav.destroy(), this.flkty && this.flkty.destroy(), document.removeEventListener("theme:resize", this.setSlideshowNavStateOnResize);
    }
    constructor(e) {
      (this.container = e.container),
        (this.slideshowNav = this.container.querySelector(selectors$8.sliderLogos)),
        (this.slideshowText = this.container.querySelector(selectors$8.sliderText)),
        (this.setSlideshowNavStateOnResize = () => this.setSlideshowNavState()),
        (this.flkty = null),
        (this.flktyNav = null),
        this.initSlideshowText(),
        this.initSlideshowNav();
    }
  };
  const LogoListSection = {
    onLoad() {
      sections$6[this.id] = new LogoList(this);
    },
    onUnload(e) {
      sections$6[this.id].onUnload(e);
    },
    onBlockSelect(e) {
      sections$6[this.id].onBlockSelect(e);
    },
    onBlockDeselect(e) {
      sections$6[this.id].onBlockDeselect(e);
    },
  };
  register("logos", [LogoListSection, blockScroll]);
  const selectors$7 = { videoPlay: "[data-video-play]", videoPlayValue: "data-video-play" };
  let VideoPlay = class {
    constructor(e, t = selectors$7.videoPlay, s = selectors$7.videoPlayValue) {
      (this.container = e),
        (this.videoPlay = this.container.querySelectorAll(t)),
        this.videoPlay.length &&
          this.videoPlay.forEach((e) => {
            e.addEventListener("click", (e) => {
              const t = e.currentTarget;
              if (t.hasAttribute(s) && "" !== t.getAttribute(s).trim()) {
                e.preventDefault();
                const i = [{ html: t.getAttribute(s) }];
                new LoadPhotoswipe(i), (window.accessibility.lastElement = t);
              }
            });
          });
    }
  };
  const videoPlay = {
      onLoad() {
        new VideoPlay(this.container);
      },
    },
    selectors$6 = { videoId: "[data-video-id]", videoPlayer: "[data-video-player]", videoTemplate: "[data-video-template]" },
    classes$4 = { loading: "is-loading" },
    sections$5 = {};
  let VideoBackground = class {
    init() {
      this.videoId &&
        (this.container.addEventListener(
          "touchstart",
          () => {
            var e;
            null === (e = this.video) || void 0 === e || e.play();
          },
          { passive: !0 }
        ),
        this.renderVideo());
    }
    renderVideo() {
      (this.videoTemplateObserver = new IntersectionObserver(
        (e, t) => {
          e.forEach((e) => {
            if (e.isIntersecting) {
              const s = this.videoTemplate.innerHTML;
              (this.videoPlayer.innerHTML = s), this.videoPlayer.classList.remove(classes$4.loading), (this.video = this.container.querySelector("video")), this.observeVideoPlayToggle(), t.unobserve(e.target);
            }
          });
        },
        { root: null, rootMargin: "300px", threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] }
      )),
        this.videoTemplateObserver.observe(this.videoPlayer);
    }
    observeVideoPlayToggle() {
      if (!this.video) return;
      (this.videoPlayObserver = new IntersectionObserver(
        (e) => {
          e.forEach((e) => {
            const t = e.isIntersecting;
            t && "function" == typeof this.video.play && this.video.play(), t || "function" != typeof this.video.pause || this.video.pause();
          });
        },
        { rootMargin: "0px", threshold: [0, 1] }
      )),
        this.videoPlayObserver.observe(this.video);
    }
    onUnload() {
      this.videoTemplateObserver && this.videoTemplateObserver.disconnect(), this.videoPlayObserver && this.videoPlayObserver.disconnect();
    }
    constructor(e) {
      (this.container = e.container),
        (this.videoId = this.container.querySelector(selectors$6.videoId)),
        (this.videoPlayer = this.container.querySelector(selectors$6.videoPlayer)),
        (this.videoTemplate = this.container.querySelector(selectors$6.videoTemplate)),
        (this.video = null),
        this.init();
    }
  };
  const videoBackground = {
    onLoad() {
      sections$5[this.id] = new VideoBackground(this);
    },
    onUnload() {
      sections$5[this.id].onUnload();
    },
  };
  register("featured-video", [videoPlay, videoBackground, parallaxHero]), register("slideshow", [slider, parallaxHero]);
  const selectors$5 = { imagesHolder: "[data-images-holder]", imageHolder: "[data-image-holder]", imageElement: "[data-image-element]", imagesButton: "[data-images-button]", dataStartPosition: "data-start-position" },
    sections$4 = {};
  let CompareImages = class {
    init() {
      this.changeValues(), this.imagesButton.addEventListener("mousedown", this.onStartEvent), this.imagesButton.addEventListener("touchstart", this.onStartEvent, { passive: !0 });
    }
    changeValues(e) {
      const t = this.imagesHolder.offsetWidth,
        s = this.imagesButton.offsetWidth;
      if ((!e || (e && "touchmove" !== e.type && "mousemove" !== e.type)) && ((this.imageElement.style.width = `${t}px`), (this.imageHolder.style.width = 100 - parseInt(this.startPosition) + "%"), 0 !== this.startPosition)) {
        const e = (t * parseInt(this.startPosition)) / 100;
        this.x = e - s / 2;
      }
      this.x > t - s ? (this.x = t - s) : this.x < 0 && (this.x = 0), (this.imagesButton.style.left = (this.x / t) * 100 + "%"), (this.imageHolder.style.width = 100 - ((this.x + s / 2) / t) * 100 + "%");
    }
    onStart(e) {
      e.preventDefault();
      let t = e;
      e.touches && (t = e.touches[0]),
        (this.x = this.imagesButton.offsetLeft),
        (this.startX = t.pageX - this.x),
        this.imagesHolder.addEventListener("mousemove", this.onMoveEvent),
        this.imagesHolder.addEventListener("mouseup", this.onStopEvent),
        this.imagesHolder.addEventListener("touchmove", this.onMoveEvent),
        this.imagesHolder.addEventListener("touchend", this.onStopEvent);
    }
    onMove(e) {
      let t = e;
      e.touches && (t = e.touches[0]), (this.x = t.pageX - this.startX), this.changeValues(e);
    }
    onStop(e) {
      this.imagesHolder.removeEventListener("mousemove", this.onMoveEvent),
        this.imagesHolder.removeEventListener("mouseup", this.onStopEvent),
        this.imagesHolder.removeEventListener("touchmove", this.onMoveEvent),
        this.imagesHolder.removeEventListener("touchend", this.onStopEvent);
    }
    onUnload() {
      this.changeValuesEvent && document.removeEventListener("theme:resize", this.changeValuesEvent);
    }
    constructor(e) {
      (this.imagesHolder = e),
        this.imagesHolder &&
          ((this.imageHolder = this.imagesHolder.querySelector(selectors$5.imageHolder)),
          (this.imageElement = this.imagesHolder.querySelector(selectors$5.imageElement)),
          (this.imagesButton = this.imagesHolder.querySelector(selectors$5.imagesButton)),
          (this.startPosition = this.imagesHolder.hasAttribute(selectors$5.dataStartPosition) ? this.imagesHolder.getAttribute(selectors$5.dataStartPosition) : 0),
          (this.startX = 0),
          (this.x = 0),
          (this.changeValuesEvent = (e) => this.changeValues(e)),
          (this.onMoveEvent = (e) => this.onMove(e)),
          (this.onStopEvent = (e) => this.onStop(e)),
          (this.onStartEvent = (e) => this.onStart(e)),
          this.init(),
          document.addEventListener("theme:resize", this.changeValuesEvent));
    }
  };
  const compareImages = {
    onLoad() {
      sections$4[this.id] = [];
      this.container.querySelectorAll(selectors$5.imagesHolder).forEach((e) => {
        sections$4[this.id].push(new CompareImages(e));
      });
    },
    onUnload() {
      sections$4[this.id].forEach((e) => {
        "function" == typeof e.onUnload && e.onUnload();
      });
    },
  };
  register("custom-content", [slider, videoPlay, videoBackground, parallaxHero, swatchGridSection, compareImages, newsletterCheckForResultSection, siblings]);
  var styles = {};
  function mapStyle(e) {
    return styles[e];
  }
  (styles.basic = []),
    (styles.light = [
      { featureType: "administrative", elementType: "labels", stylers: [{ visibility: "simplified" }, { lightness: "64" }, { hue: "#ff0000" }] },
      { featureType: "administrative", elementType: "labels.text.fill", stylers: [{ color: "#bdbdbd" }] },
      { featureType: "administrative", elementType: "labels.icon", stylers: [{ visibility: "off" }] },
      { featureType: "landscape", elementType: "all", stylers: [{ color: "#f0f0f0" }, { visibility: "simplified" }] },
      { featureType: "landscape.natural.landcover", elementType: "all", stylers: [{ visibility: "off" }] },
      { featureType: "landscape.natural.terrain", elementType: "all", stylers: [{ visibility: "off" }] },
      { featureType: "poi", elementType: "all", stylers: [{ visibility: "off" }] },
      { featureType: "poi", elementType: "geometry.fill", stylers: [{ visibility: "off" }] },
      { featureType: "poi", elementType: "labels", stylers: [{ lightness: "100" }] },
      { featureType: "poi.park", elementType: "all", stylers: [{ visibility: "on" }] },
      { featureType: "poi.park", elementType: "geometry", stylers: [{ saturation: "-41" }, { color: "#e8ede7" }] },
      { featureType: "poi.park", elementType: "labels", stylers: [{ visibility: "off" }] },
      { featureType: "road", elementType: "all", stylers: [{ saturation: "-100" }] },
      { featureType: "road", elementType: "labels", stylers: [{ lightness: "25" }, { gamma: "1.06" }, { saturation: "-100" }] },
      { featureType: "road.highway", elementType: "all", stylers: [{ visibility: "simplified" }] },
      { featureType: "road.highway", elementType: "geometry.fill", stylers: [{ gamma: "10.00" }] },
      { featureType: "road.highway", elementType: "geometry.stroke", stylers: [{ weight: "0.01" }, { visibility: "simplified" }] },
      { featureType: "road.highway", elementType: "labels", stylers: [{ visibility: "off" }] },
      { featureType: "road.highway", elementType: "labels.text.fill", stylers: [{ weight: "0.01" }] },
      { featureType: "road.highway", elementType: "labels.text.stroke", stylers: [{ weight: "0.01" }] },
      { featureType: "road.arterial", elementType: "geometry.fill", stylers: [{ weight: "0.8" }] },
      { featureType: "road.arterial", elementType: "geometry.stroke", stylers: [{ weight: "0.01" }] },
      { featureType: "road.arterial", elementType: "labels.icon", stylers: [{ visibility: "off" }] },
      { featureType: "road.local", elementType: "geometry.fill", stylers: [{ weight: "0.01" }] },
      { featureType: "road.local", elementType: "geometry.stroke", stylers: [{ gamma: "10.00" }, { lightness: "100" }, { weight: "0.4" }] },
      { featureType: "road.local", elementType: "labels", stylers: [{ visibility: "simplified" }, { weight: "0.01" }, { lightness: "39" }] },
      { featureType: "road.local", elementType: "labels.text.stroke", stylers: [{ weight: "0.50" }, { gamma: "10.00" }, { lightness: "100" }] },
      { featureType: "transit", elementType: "all", stylers: [{ visibility: "off" }] },
      { featureType: "water", elementType: "all", stylers: [{ color: "#cfe5ee" }, { visibility: "on" }] },
    ]),
    (styles.white_label = [
      { featureType: "all", elementType: "all", stylers: [{ visibility: "simplified" }] },
      { featureType: "all", elementType: "labels", stylers: [{ visibility: "simplified" }] },
      { featureType: "administrative", elementType: "labels", stylers: [{ gamma: "3.86" }, { lightness: "100" }] },
      { featureType: "administrative", elementType: "labels.text.fill", stylers: [{ color: "#cccccc" }] },
      { featureType: "landscape", elementType: "all", stylers: [{ color: "#f2f2f2" }] },
      { featureType: "poi", elementType: "all", stylers: [{ visibility: "off" }] },
      { featureType: "road", elementType: "all", stylers: [{ saturation: -100 }, { lightness: 45 }] },
      { featureType: "road.highway", elementType: "all", stylers: [{ visibility: "simplified" }] },
      { featureType: "road.highway", elementType: "geometry.fill", stylers: [{ weight: "0.8" }] },
      { featureType: "road.highway", elementType: "geometry.stroke", stylers: [{ weight: "0.8" }] },
      { featureType: "road.highway", elementType: "labels", stylers: [{ visibility: "off" }] },
      { featureType: "road.highway", elementType: "labels.text.fill", stylers: [{ weight: "0.8" }] },
      { featureType: "road.highway", elementType: "labels.text.stroke", stylers: [{ weight: "0.01" }] },
      { featureType: "road.arterial", elementType: "geometry.stroke", stylers: [{ weight: "0" }] },
      { featureType: "road.arterial", elementType: "labels.icon", stylers: [{ visibility: "off" }] },
      { featureType: "road.local", elementType: "geometry.stroke", stylers: [{ weight: "0.01" }] },
      { featureType: "road.local", elementType: "labels.text", stylers: [{ visibility: "off" }] },
      { featureType: "transit", elementType: "all", stylers: [{ visibility: "off" }] },
      { featureType: "water", elementType: "all", stylers: [{ color: "#e4e4e4" }, { visibility: "on" }] },
    ]),
    (styles.dark_label = [
      { featureType: "all", elementType: "labels", stylers: [{ visibility: "off" }] },
      { featureType: "all", elementType: "labels.text.fill", stylers: [{ saturation: 36 }, { color: "#000000" }, { lightness: 40 }] },
      { featureType: "all", elementType: "labels.text.stroke", stylers: [{ visibility: "on" }, { color: "#000000" }, { lightness: 16 }] },
      { featureType: "all", elementType: "labels.icon", stylers: [{ visibility: "off" }] },
      { featureType: "administrative", elementType: "geometry.fill", stylers: [{ color: "#000000" }, { lightness: 20 }] },
      { featureType: "administrative", elementType: "geometry.stroke", stylers: [{ color: "#000000" }, { lightness: 17 }, { weight: 1.2 }] },
      { featureType: "administrative", elementType: "labels", stylers: [{ visibility: "simplified" }, { lightness: "-82" }] },
      { featureType: "administrative", elementType: "labels.text.stroke", stylers: [{ invert_lightness: !0 }, { weight: "7.15" }] },
      { featureType: "landscape", elementType: "geometry", stylers: [{ color: "#000000" }, { lightness: 20 }] },
      { featureType: "landscape", elementType: "labels", stylers: [{ visibility: "off" }] },
      { featureType: "poi", elementType: "all", stylers: [{ visibility: "off" }] },
      { featureType: "poi", elementType: "geometry", stylers: [{ color: "#000000" }, { lightness: 21 }] },
      { featureType: "road", elementType: "labels", stylers: [{ visibility: "simplified" }] },
      { featureType: "road.highway", elementType: "geometry.fill", stylers: [{ color: "#000000" }, { lightness: 17 }, { weight: "0.8" }] },
      { featureType: "road.highway", elementType: "geometry.stroke", stylers: [{ color: "#000000" }, { lightness: 29 }, { weight: "0.01" }] },
      { featureType: "road.highway", elementType: "labels", stylers: [{ visibility: "off" }] },
      { featureType: "road.arterial", elementType: "geometry", stylers: [{ color: "#000000" }, { lightness: 18 }] },
      { featureType: "road.arterial", elementType: "geometry.stroke", stylers: [{ weight: "0.01" }] },
      { featureType: "road.local", elementType: "geometry", stylers: [{ color: "#000000" }, { lightness: 16 }] },
      { featureType: "road.local", elementType: "geometry.stroke", stylers: [{ weight: "0.01" }] },
      { featureType: "road.local", elementType: "labels", stylers: [{ visibility: "off" }] },
      { featureType: "transit", elementType: "all", stylers: [{ visibility: "off" }] },
      { featureType: "transit", elementType: "geometry", stylers: [{ color: "#000000" }, { lightness: 19 }] },
      { featureType: "water", elementType: "geometry", stylers: [{ color: "#000000" }, { lightness: 17 }] },
    ]),
    (window.theme.allMaps = window.theme.allMaps || {});
  let allMaps = window.theme.allMaps;
  window.theme.mapAPI = window.theme.mapAPI || null;
  let Map = class {
    initMaps() {
      loadAPI(this.key)
        .then(() => ("true" === this.enableCorrection && "" !== this.lat && "" !== this.long ? new google.maps.LatLng(this.lat, this.long) : geocodeAddressPromise(this.address)))
        .then((e) => {
          const t = { zoom: parseInt(this.zoomString, 10), styles: mapStyle(this.styleString), center: e, draggable: !0, clickableIcons: !1, scrollwheel: !1, zoomControl: !1, disableDefaultUI: !0 };
          return createMap(this.mapContainer, t);
        })
        .then((e) => {
          (this.map = e), (allMaps[this.id] = e);
        })
        .catch((e) => {
          console.log("Failed to load Google Map"), console.log(e);
        });
    }
    unload() {
      void 0 !== window.google && google.maps.event.clearListeners(this.map, "resize");
    }
    constructor(e) {
      (this.container = e.container),
        (this.mapContainer = this.container.querySelector("[data-map-container]")),
        (this.key = this.container.getAttribute("data-api-key")),
        (this.styleString = this.container.getAttribute("data-style") || ""),
        (this.zoomString = this.container.getAttribute("data-zoom") || 14),
        (this.address = this.container.getAttribute("data-address")),
        (this.enableCorrection = this.container.getAttribute("data-latlong-correction")),
        (this.lat = this.container.getAttribute("data-lat")),
        (this.long = this.container.getAttribute("data-long")),
        this.key && this.initMaps();
    }
  };
  const mapSection = {
    onLoad() {
      allMaps[this.id] = new Map(this);
    },
    onUnload() {
      "function" == typeof allMaps[this.id].unload && allMaps[this.id].unload();
    },
  };
  function loadAPI(e) {
    if (null === window.theme.mapAPI) {
      const t = `https://maps.googleapis.com/maps/api/js?key=${e}`;
      window.theme.mapAPI = loadScript({ url: t });
    }
    return window.theme.mapAPI;
  }
  function createMap(e, t) {
    var s = new google.maps.Map(e, t),
      i = s.getCenter();
    return (
      new google.maps.Marker({ map: s, position: i }),
      google.maps.event.addDomListener(window, "resize", function () {
        google.maps.event.trigger(s, "resize"), s.setCenter(i);
      }),
      s
    );
  }
  function geocodeAddressPromise(e) {
    return new Promise((t, s) => {
      new google.maps.Geocoder().geocode({ address: e }, function (e, i) {
        if ("OK" == i) {
          var o = { lat: e[0].geometry.location.lat(), lng: e[0].geometry.location.lng() };
          t(o);
        } else s(i);
      });
    });
  }
  register("map", mapSection), register("search", [swatchGridSection, siblings]);
  const selectors$4 = {
      largePromo: "[data-large-promo]",
      largePromoInner: "[data-large-promo-inner]",
      trackingInner: "[data-tracking-consent-inner]",
      tracking: "[data-tracking-consent]",
      trackingAccept: "[data-confirm-cookies]",
      cartBar: "cart-bar",
      close: "[data-close-modal]",
      modalUnderlay: "[data-modal-underlay]",
      newsletterPopup: "[data-newsletter]",
      newsletterPopupHolder: "[data-newsletter-holder]",
      newsletterClose: "[data-newsletter-close]",
      newsletterHeading: "[data-newsletter-heading]",
      newsletterField: "[data-newsletter-field]",
      promoPopup: "[data-promo-text]",
      newsletterForm: "[data-newsletter-form]",
      delayAttribite: "data-popup-delay",
      cookieNameAttribute: "data-cookie-name",
      dataTargetReferrer: "data-target-referrer",
    },
    classes$3 = {
      hidden: "hidden",
      hasValue: "has-value",
      cartBarVisible: "cart-bar-visible",
      isVisible: "is-visible",
      success: "has-success",
      selected: "selected",
      hasBlockSelected: "has-block-selected",
      mobile: "mobile",
      desktop: "desktop",
      bottom: "bottom",
    },
    attributes$3 = { enable: "data-enable" };
  let sections$3 = {},
    DelayShow = class {
      always() {
        fadeIn(this.element, null, this.callback);
      }
      delayed(e = 10) {
        setTimeout(() => {
          fadeIn(this.element, null, this.callback);
        }, 1e3 * e);
      }
      idle() {
        let e = 0;
        const t = ["mousemove", "mousedown", "click", "touchmove", "touchstart", "touchend", "keydown", "keypress"],
          s = ["load", "resize", "scroll"],
          i = () => {
            (e = setTimeout(() => {
              (e = 0), fadeIn(this.element, null, this.callback);
            }, 6e4)),
              t.forEach((e) => {
                document.addEventListener(e, o);
              }),
              s.forEach((e) => {
                window.addEventListener(e, o);
              });
          },
          o = () => {
            e && clearTimeout(e),
              t.forEach((e) => {
                document.removeEventListener(e, o);
              }),
              s.forEach((e) => {
                window.removeEventListener(e, o);
              }),
              i();
          };
        i();
      }
      bottom() {
        document.addEventListener("theme:scroll", this.showPopupOnScrollEvent);
      }
      showPopupOnScroll() {
        window.scrollY + window.innerHeight >= document.body.clientHeight && (fadeIn(this.element, null, this.callback), document.removeEventListener("theme:scroll", this.showPopupOnScrollEvent));
      }
      onUnload() {
        document.removeEventListener("theme:scroll", this.showPopupOnScrollEvent);
      }
      constructor(e, t, s = null) {
        if (
          ((this.element = t),
          (this.delay = e.getAttribute(selectors$4.delayAttribite)),
          (this.isSubmitted = -1 !== window.location.href.indexOf("accepts_marketing") || -1 !== window.location.href.indexOf("customer_posted=true")),
          (this.callback = s),
          (this.showPopupOnScrollEvent = () => this.showPopupOnScroll()),
          ("always" === this.delay || this.isSubmitted) && this.always(),
          this.delay && this.delay.includes("delayed") && !this.isSubmitted)
        ) {
          const e = this.delay.includes("_") ? parseInt(this.delay.split("_")[1]) : 10;
          this.delayed(e);
        }
        "bottom" !== this.delay || this.isSubmitted || this.bottom(), "idle" !== this.delay || this.isSubmitted || this.idle();
      }
    },
    TargetReferrer = class {
      init() {
        -1 !== this.locationPath.indexOf(this.el.getAttribute(selectors$4.dataTargetReferrer)) || window.Shopify.designMode || this.el.parentNode.removeChild(this.el);
      }
      constructor(e) {
        if (((this.el = e), (this.locationPath = location.href), !this.el.hasAttribute(selectors$4.dataTargetReferrer))) return !1;
        this.init();
      }
    },
    LargePopup = class {
      init() {
        const e = !1 !== this.cookie.read(),
          t = this.popup.classList.contains(classes$3.mobile),
          s = this.popup.classList.contains(classes$3.desktop),
          i = !isDesktop();
        let o = !0;
        ((t && !i) || (s && i)) && (o = !1),
          o
            ? (e && !window.Shopify.designMode) ||
              (window.Shopify.designMode || new DelayShow(this.popup, this.modal, () => this.scrollLock()), this.form && this.form.classList.contains(classes$3.success) && this.checkForSuccess(), this.initClosers())
            : this.scrollUnlock();
      }
      checkForSuccess() {
        fadeIn(this.modal, null, () => this.scrollLock()), this.cookie.write();
      }
      initClosers() {
        this.close.addEventListener("click", this.closeModal.bind(this)), this.underlay.addEventListener("click", this.closeModal.bind(this));
      }
      closeModal(e) {
        e.preventDefault(), fadeOut(this.modal), this.cookie.write(), this.scrollUnlock();
      }
      scrollLock() {
        "none" !== window.getComputedStyle(this.popup).display && (this.a11y.trapFocus(this.modal), document.dispatchEvent(new CustomEvent("theme:scroll:lock", { bubbles: !0 })));
      }
      scrollUnlock() {
        this.a11y.removeTrapFocus(), document.dispatchEvent(new CustomEvent("theme:scroll:unlock", { bubbles: !0 }));
      }
      onBlockSelect(e) {
        this.popup.contains(e.target) && (fadeIn(this.modal, null, () => this.scrollLock()), this.popup.classList.add(classes$3.selected), this.popup.parentNode.classList.add(classes$3.hasBlockSelected));
      }
      onBlockDeselect(e) {
        this.popup.contains(e.target) && (fadeOut(this.modal), this.scrollUnlock(), this.popup.classList.remove(classes$3.selected), this.popup.parentNode.classList.remove(classes$3.hasBlockSelected));
      }
      constructor(e) {
        (this.popup = e),
          (this.modal = this.popup.querySelector(selectors$4.largePromoInner)),
          (this.close = this.popup.querySelector(selectors$4.close)),
          (this.underlay = this.popup.querySelector(selectors$4.modalUnderlay)),
          (this.form = this.popup.querySelector(selectors$4.newsletterForm)),
          (this.cookie = new PopupCookie(this.popup.getAttribute(selectors$4.cookieNameAttribute), "user_has_closed")),
          (this.isTargeted = new TargetReferrer(this.popup)),
          (this.a11y = a11y),
          this.init();
      }
    },
    Tracking = class {
      init() {
        this.showPopup && fadeIn(this.modal), this.clickEvents();
      }
      clickEvents() {
        this.acceptButton.addEventListener("click", (e) => {
          e.preventDefault(), window.Shopify.customerPrivacy.setTrackingConsent(!0, () => fadeOut(this.modal)), document.documentElement.style.setProperty("--cookie-bar-height", "0px");
        }),
          document.addEventListener("trackingConsentAccepted", () => {});
      }
      onBlockSelect(e) {
        this.popup.contains(e.target) && this.showPopup && (fadeIn(this.modal), this.popup.classList.add(classes$3.selected), this.popup.parentNode.classList.add(classes$3.hasBlockSelected));
      }
      onBlockDeselect(e) {
        this.popup.contains(e.target) && (fadeOut(this.modal), this.popup.classList.remove(classes$3.selected), this.popup.parentNode.classList.remove(classes$3.hasBlockSelected));
      }
      constructor(e) {
        (this.popup = e),
          (this.modal = document.querySelector(selectors$4.tracking)),
          (this.acceptButton = this.modal.querySelector(selectors$4.trackingAccept)),
          (this.enable = "true" === this.modal.getAttribute(attributes$3.enable)),
          (this.showPopup = !1),
          window.Shopify.loadFeatures([{ name: "consent-tracking-api", version: "0.1" }], (e) => {
            if (e) throw e;
            const t = window.Shopify.customerPrivacy.userCanBeTracked(),
              s = window.Shopify.customerPrivacy.getTrackingConsent();
            (this.showPopup = !t && "no_interaction" === s && this.enable), window.Shopify.designMode && (this.showPopup = !0), this.init();
          });
      }
    },
    PromoText = class {
      init() {
        (!1 !== this.cookie.read() && !window.Shopify.designMode) || (window.Shopify.designMode ? fadeIn(this.popup) : new DelayShow(this.popup, this.popup), this.clickEvents());
      }
      clickEvents() {
        this.close.addEventListener("click", (e) => {
          e.preventDefault(), fadeOut(this.popup), this.cookie.write();
        });
      }
      onBlockSelect(e) {
        this.popup.contains(e.target) && (fadeIn(this.popup), this.popup.classList.add(classes$3.selected), this.popup.parentNode.classList.add(classes$3.hasBlockSelected));
      }
      onBlockDeselect(e) {
        this.popup.contains(e.target) && (fadeOut(this.popup), this.popup.classList.remove(classes$3.selected), this.popup.parentNode.classList.remove(classes$3.hasBlockSelected));
      }
      constructor(e) {
        (this.popup = e),
          (this.close = this.popup.querySelector(selectors$4.close)),
          (this.cookie = new PopupCookie(this.popup.getAttribute(selectors$4.cookieNameAttribute), "user_has_closed")),
          (this.isTargeted = new TargetReferrer(this.popup)),
          this.init();
      }
    },
    NewsletterPopup = class {
      init() {
        const e = !1 !== this.cookie.read(),
          t = -1 !== window.location.search.indexOf("?customer_posted=true"),
          s = [...this.holder.classList].toString().includes(classes$3.bottom);
        t && (this.delay = 0), (e && !window.Shopify.designMode) || (this.show(), this.form.classList.contains(classes$3.success) && this.checkForSuccess()), s && this.observeCartBar();
      }
      show() {
        window.Shopify.designMode ? fadeIn(this.holder) : new DelayShow(this.popup, this.holder), this.showForm(), this.inputField(), this.closePopup();
      }
      checkForSuccess() {
        fadeIn(this.holder), this.cookie.write();
      }
      observeCartBar() {
        if (((this.cartBar = document.getElementById(selectors$4.cartBar)), !this.cartBar)) return;
        let e = this.cartBar.classList.contains(classes$3.isVisible);
        document.body.classList.toggle(classes$3.cartBarVisible, e);
        (this.observer = new MutationObserver((t) => {
          for (const s of t) "attributes" === s.type && ((e = s.target.classList.contains(classes$3.isVisible)), document.body.classList.toggle(classes$3.cartBarVisible, e));
        })),
          this.observer.observe(this.cartBar, { attributes: !0, childList: !1, subtree: !1 });
      }
      showForm() {
        this.heading.addEventListener("click", (e) => {
          e.preventDefault(), this.heading.classList.add(classes$3.hidden), this.form.classList.remove(classes$3.hidden), this.newsletterField.focus();
        }),
          this.heading.addEventListener("keyup", (e) => {
            e.code === window.theme.keyboardKeys.ENTER && this.heading.dispatchEvent(new Event("click"));
          });
      }
      closePopup() {
        this.close.addEventListener("click", (e) => {
          e.preventDefault(), fadeOut(this.holder), this.cookie.write();
        });
      }
      inputField() {
        const e = () => {
          this.resetClassTimer && clearTimeout(this.resetClassTimer), "" !== this.newsletterField.value && this.holder.classList.add(classes$3.hasValue);
        };
        this.newsletterField.addEventListener("input", e),
          this.newsletterField.addEventListener("focus", e),
          this.newsletterField.addEventListener("focusout", () => {
            this.resetClassTimer && clearTimeout(this.resetClassTimer),
              (this.resetClassTimer = setTimeout(() => {
                this.holder.classList.remove(classes$3.hasValue);
              }, 2e3));
          });
      }
      onBlockSelect(e) {
        this.popup.contains(e.target) && (fadeIn(this.holder), this.popup.classList.add(classes$3.selected), this.popup.parentNode.classList.add(classes$3.hasBlockSelected));
      }
      onBlockDeselect(e) {
        this.popup.contains(e.target) && (fadeOut(this.holder), this.popup.classList.remove(classes$3.selected), this.popup.parentNode.classList.remove(classes$3.hasBlockSelected));
      }
      onUnload() {
        this.observer && this.observer.disconnect();
      }
      constructor(e) {
        (this.popup = e),
          (this.holder = this.popup.querySelector(selectors$4.newsletterPopupHolder)),
          (this.close = this.popup.querySelector(selectors$4.newsletterClose)),
          (this.heading = this.popup.querySelector(selectors$4.newsletterHeading)),
          (this.newsletterField = this.popup.querySelector(selectors$4.newsletterField)),
          (this.cookie = new PopupCookie(this.popup.getAttribute(selectors$4.cookieNameAttribute), "newsletter_is_closed")),
          (this.form = this.popup.querySelector(selectors$4.newsletterForm)),
          (this.isTargeted = new TargetReferrer(this.popup)),
          (this.resetClassTimer = 0),
          this.init();
      }
    };
  const popupSection = {
    onLoad() {
      sections$3[this.id] = [];
      this.container.querySelectorAll(selectors$4.largePromo).forEach((e) => {
        sections$3[this.id].push(new LargePopup(e));
      });
      this.container.querySelectorAll(selectors$4.tracking).forEach((e) => {
        sections$3[this.id].push(new Tracking(e));
      });
      this.container.querySelectorAll(selectors$4.newsletterPopup).forEach((e) => {
        sections$3[this.id].push(new NewsletterPopup(e));
      });
      this.container.querySelectorAll(selectors$4.promoPopup).forEach((e) => {
        sections$3[this.id].push(new PromoText(e));
      });
    },
    onBlockSelect(e) {
      sections$3[this.id].forEach((t) => {
        "function" == typeof t.onBlockSelect && t.onBlockSelect(e);
      });
    },
    onBlockDeselect(e) {
      sections$3[this.id].forEach((t) => {
        "function" == typeof t.onBlockDeselect && t.onBlockDeselect(e);
      });
    },
    onUnload() {
      sections$3[this.id].forEach((e) => {
        "function" == typeof e.onUnload && e.onUnload();
      });
    },
  };
  register("popups", [popupSection, newsletterCheckForResultSection]);
  const selectors$3 = { passwordLogin: "[data-password-login]", passwordModal: "[data-password-modal]", modalBody: "[data-modal-body]", close: "[data-modal-close]", loginErrors: "#login_form .errors" },
    classes$2 = { open: "is-open" };
  let Password = class {
    init() {
      this.passwordLogin.length &&
        this.modal &&
        this.modalBody &&
        (this.passwordLogin.forEach((e) => {
          e.addEventListener("click", (e) => {
            e.preventDefault(), this.openModal();
          });
        }),
        this.closeButtons.length &&
          this.closeButtons.forEach((e) => {
            e.addEventListener("click", (e) => {
              e.preventDefault(), this.closeModal();
            });
          }),
        this.loginErrors && this.openModal());
    }
    openModal() {
      fadeIn(this.modal, "block", () => {
        this.modal.classList.add(classes$2.open);
      }),
        this.scrollLock();
    }
    closeModal() {
      fadeOut(this.modal), this.modal.classList.remove(classes$2.open), this.scrollUnlock();
    }
    scrollLock() {
      "none" !== window.getComputedStyle(this.modal).display && (this.a11y.trapFocus(this.modal), document.dispatchEvent(new CustomEvent("theme:scroll:lock", { bubbles: !0 })));
    }
    scrollUnlock() {
      this.a11y.removeTrapFocus(), document.dispatchEvent(new CustomEvent("theme:scroll:unlock", { bubbles: !0 }));
    }
    constructor(e) {
      (this.container = e.container),
        (this.passwordLogin = this.container.querySelectorAll(selectors$3.passwordLogin)),
        (this.modal = this.container.querySelector(selectors$3.passwordModal)),
        (this.modalBody = this.container.querySelector(selectors$3.modalBody)),
        (this.closeButtons = this.container.querySelectorAll(selectors$3.close)),
        (this.a11y = a11y),
        (this.loginErrors = this.container.querySelector(selectors$3.loginErrors)),
        this.init();
    }
  };
  const passwordSection = {
    onLoad() {
      new Password(this);
    },
  };
  register("password-template", passwordSection),
    register("supporting-menu", [popoutSection]),
    register("list-collections", [slider, swatchGridSection, blockScroll, siblings]),
    register("columns", [blockScroll, slider]),
    register("newsletter", newsletterCheckForResultSection),
    register("before-after", [compareImages]);
  const selectors$2 = { scrollToElement: "[data-scroll-to]", tooltip: "[data-tooltip]", collapsibleTrigger: "[data-collapsible-trigger]" },
    attributes$2 = { open: "open", dataScrollTo: "data-scroll-to", tooltipStopMousenterValue: "data-tooltip-stop-mouseenter" },
    sections$2 = {};
  let ScrollToElement = class {
    init() {
      this.scrollToButtons.forEach((e) => {
        e.addEventListener("click", () => {
          const t = this.container.querySelector(e.getAttribute(attributes$2.dataScrollTo));
          t && "A" !== e.tagName && this.scrollToElement(t);
        });
      });
    }
    scrollToElement(e) {
      scrollTo(e.getBoundingClientRect().top + 1);
      const t = e.nextElementSibling.matches("details") ? e.nextElementSibling : null;
      if (t) {
        const e = null == t ? void 0 : t.querySelector(selectors$2.collapsibleTrigger);
        t.hasAttribute(attributes$2.open) || null == e || e.dispatchEvent(new Event("click"));
      }
      const s = document.querySelectorAll(`${selectors$2.tooltip}:not([${attributes$2.tooltipStopMousenterValue}])`);
      s.length &&
        s.forEach((e) => {
          e.setAttribute(attributes$2.tooltipStopMousenterValue, ""),
            setTimeout(() => {
              e.removeAttribute(attributes$2.tooltipStopMousenterValue);
            }, 1e3);
        });
    }
    constructor(e) {
      (this.section = e), (this.container = e.container), (this.scrollToButtons = this.container.querySelectorAll(selectors$2.scrollToElement)), this.scrollToButtons.length && this.init();
    }
  };
  const scrollToElement = {
      onLoad() {
        sections$2[this.id] = new ScrollToElement(this);
      },
    },
    selectors$1 = { scrollSpy: "[data-scroll-spy]", headerSticky: "[data-header-sticky]" },
    classes$1 = { selected: "is-selected" },
    attributes$1 = { scrollSpy: "data-scroll-spy", mobile: "data-scroll-spy-mobile", desktop: "data-scroll-spy-desktop" },
    sections$1 = {};
  let ScrollSpy = class {
    init() {
      this.loopAnchors(), document.addEventListener("theme:resize:width", this.loopAnchors);
    }
    loopAnchors() {
      this.scrollSpyAnchors.length &&
        this.scrollSpyAnchors.forEach((e) => {
          this.toggleObserver(e);
        });
    }
    toggleObserver(e) {
      const t = this.container.querySelector(e.getAttribute(attributes$1.scrollSpy));
      if (!t) return;
      this.observers[t.id] && this.observers[t.id].unobserve(t);
      const s = isDesktop();
      ((!s && e.hasAttribute(attributes$1.mobile)) || (s && e.hasAttribute(attributes$1.desktop)) || (!e.hasAttribute(attributes$1.desktop) && !e.hasAttribute(attributes$1.mobile))) && this.runObserver(t);
    }
    runObserver(e) {
      let { menuHeight: t } = readHeights();
      const s = Boolean(document.querySelector(selectors$1.headerSticky)),
        i = s ? t : 0,
        o = { rootMargin: s ? -1 * i + "px 0px 0px 0px" : "0px", threshold: [0.5, 1] };
      (this.observers[e.id] = new IntersectionObserver((e) => {
        e.forEach((e) => {
          const t = this.container.querySelector(`[${attributes$1.scrollSpy}].${classes$1.selected}`),
            s = this.container.querySelector(`[${attributes$1.scrollSpy}="#${e.target.id}"]`);
          e.intersectionRatio > 0.5 && e.boundingClientRect.top - i <= e.boundingClientRect.height && (null == t || t.classList.remove(classes$1.selected), null == s || s.classList.add(classes$1.selected));
        });
      }, o)),
        this.observers[e.id].observe(e);
    }
    onUnload() {
      document.removeEventListener("theme:resize:width", this.loopAnchors),
        this.observers.length &&
          this.observers.forEach((e) => {
            e.disconnect();
          });
    }
    constructor(e) {
      (this.section = e), (this.container = e.container), (this.scrollSpyAnchors = this.container.querySelectorAll(selectors$1.scrollSpy)), (this.loopAnchors = this.loopAnchors.bind(this)), (this.observers = []), this.init();
    }
  };
  const scrollSpy = {
    onLoad() {
      sections$1[this.id] = new ScrollSpy(this);
    },
    onUnload() {
      sections$1[this.id].onUnload();
    },
  };
  register("sidebar", [scrollToElement, scrollSpy]);
  const selectors = { button: "[data-hover-target]", image: "[data-collection-image]" },
    attributes = { target: "data-hover-target" },
    classes = { visible: "is-visible", selected: "is-selected" };
  let sections = {},
    CollectionsHover = class {
      init() {
        this.buttons.length &&
          this.buttons.forEach((e) => {
            e.addEventListener("mouseenter", (e) => {
              const t = e.currentTarget.getAttribute(attributes.target);
              this.updateState(t);
            });
          });
      }
      updateState(e) {
        const t = this.container.querySelector(`[${attributes.target}="${e}"]`),
          s = this.container.querySelector(`#${e}:not(.${classes.visible})`),
          i = this.container.querySelector(`${selectors.button}.${classes.selected}`),
          o = this.container.querySelector(`${selectors.image}.${classes.visible}`);
        s && isDesktop() && (null == o || o.classList.remove(classes.visible), null == i || i.classList.remove(classes.selected), s.classList.add(classes.visible), t.classList.add(classes.selected));
      }
      onBlockSelect(e) {
        this.updateState(e.target.id);
      }
      constructor(e) {
        (this.container = e.container), (this.buttons = this.container.querySelectorAll(selectors.button)), this.init();
      }
    };
  const collectionsHover = {
    onLoad() {
      sections[this.id] = new CollectionsHover(this);
    },
    onBlockSelect(e) {
      sections[this.id].onBlockSelect(e);
    },
  };
  register("collections-hover", [collectionsHover, scrollSpy]),
    document.addEventListener("DOMContentLoaded", function () {
      load("*");
      const e = document.querySelector("[data-scroll-top-button]");
      e &&
        (e.addEventListener("click", () => {
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        }),
        document.addEventListener("theme:scroll", () => {
          e.classList.toggle("is-visible", window.pageYOffset > window.innerHeight);
        })),
        window.self !== window.top && document.querySelector("html").classList.add("iframe"),
        "scrollBehavior" in document.documentElement.style || loadScript({ url: window.theme.assets.smoothscroll });
    }),
    window.navigator.cookieEnabled && (document.documentElement.className = document.documentElement.className.replace("supports-no-cookies", "supports-cookies"));
})(themeVendor.ScrollLock, themeVendor.themeAddresses, themeVendor.themeCurrency, themeVendor.Rellax, themeVendor.Flickity, themeVendor.FlickityFade, themeVendor.themeImages);


/* New Mobile Header Dropdown */

$(document).ready(function(){

  $(".swatch__button").click(function(){
    let handle = $(this).attr('data-handle');
    console.log('handle', handle)
    $(".product-image-sliders").hide();
    $(".product-image-slider-"+handle).removeClass('hide_slider');
    $(".product-image-slider-"+handle).show();
  });
  
  $(".drawer__menu>.sliderule__wrappers").click(function(){
    $(this).siblings().removeClass('active');
    $(this).siblings().find('button+.mobile__menu__dropdown').hide();
    if ($(this).hasClass('active')) {
      $(this).removeClass('active');
      $(this).find('button+.mobile__menu__dropdown').hide();
    } else {
      $(this).addClass('active');
      $(this).find('button+.mobile__menu__dropdown').show();
    }
  })
});