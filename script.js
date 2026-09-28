/**
 * PS 26099: National Unified Material Master (NUMM)
 * Interactive Flyer Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const body = document.body;
  const flyerPage = document.getElementById('flyerPage');
  const printBtn = document.getElementById('printBtn');
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeBtnText = document.getElementById('themeBtnText');
  const zoomInBtn = document.getElementById('zoomInBtn');
  const zoomOutBtn = document.getElementById('zoomOutBtn');
  const zoomFitBtn = document.getElementById('zoomFitBtn');
  const zoomLevelText = document.getElementById('zoomLevelText');
  const viewport = document.getElementById('flyerViewport');

  // Zoom State
  let currentZoom = 1.0;
  const ZOOM_STEP = 0.1;
  const MIN_ZOOM = 0.5;
  const MAX_ZOOM = 2.0;

  function updateZoom(newZoom) {
    currentZoom = Math.min(Math.max(newZoom, MIN_ZOOM), MAX_ZOOM);
    flyerPage.style.transform = `scale(${currentZoom})`;
    zoomLevelText.textContent = `${Math.round(currentZoom * 100)}%`;
  }

  function fitToScreen() {
    if (!viewport || !flyerPage) return;
    const availableWidth = viewport.clientWidth - 40;
    const pagePixelWidth = flyerPage.offsetWidth;
    if (pagePixelWidth > 0) {
      const fitRatio = availableWidth / pagePixelWidth;
      updateZoom(Math.min(fitRatio, 1.15));
    }
  }

  // Event Listeners for Zoom
  if (zoomInBtn) {
    zoomInBtn.addEventListener('click', () => updateZoom(currentZoom + ZOOM_STEP));
  }

  if (zoomOutBtn) {
    zoomOutBtn.addEventListener('click', () => updateZoom(currentZoom - ZOOM_STEP));
  }

  if (zoomFitBtn) {
    zoomFitBtn.addEventListener('click', fitToScreen);
  }

  // Print Action
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }

  // Theme Switcher
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      if (body.classList.contains('theme-dark')) {
        body.classList.remove('theme-dark');
        body.classList.add('theme-light');
        themeBtnText.textContent = 'Dark View';
      } else {
        body.classList.remove('theme-light');
        body.classList.add('theme-dark');
        themeBtnText.textContent = 'Light View';
      }
    });
  }

  // Interactive HITL Review Card Actions (Simulation for Evaluators)
  const btnApprove = document.querySelector('.btn-approve');
  const btnReject = document.querySelector('.btn-reject');
  const btnReview = document.querySelector('.btn-review');
  const rcFlag = document.querySelector('.rc-flag span:last-child');
  const confPct = document.querySelector('.conf-pct');

  if (btnApprove && rcFlag) {
    btnApprove.addEventListener('click', () => {
      rcFlag.textContent = 'Mapping Approved & Committed to Master';
      rcFlag.style.color = 'var(--emerald-600)';
      btnApprove.style.opacity = '0.5';
      btnApprove.style.pointerEvents = 'none';
      if (btnReject) btnReject.style.display = 'none';
      if (btnReview) btnReview.style.display = 'none';
    });
  }

  if (btnReject && rcFlag) {
    btnReject.addEventListener('click', () => {
      rcFlag.textContent = 'Mapping Flagged for Engineering Clarification';
      rcFlag.style.color = '#dc2626';
      btnReject.style.opacity = '0.5';
      btnReject.style.pointerEvents = 'none';
      if (btnApprove) btnApprove.style.display = 'none';
    });
  }

  // Initial Auto-Fit check
  window.addEventListener('resize', () => {
    // Only auto-adjust if close to 100% or on initial load
    if (window.innerWidth < 1100 && currentZoom > 0.9) {
      fitToScreen();
    }
  });

  // Fit on load if on smaller screen
  if (window.innerWidth < 1200) {
    fitToScreen();
  }
});
