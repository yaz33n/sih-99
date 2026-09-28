/**
 * PS 26099: National Unified Material Master (NUMM)
 * Interactive Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeBtnText = document.getElementById('themeBtnText');

  // Theme Switcher
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      if (body.classList.contains('theme-dark')) {
        body.classList.remove('theme-dark');
        body.classList.add('theme-light');
        if (themeBtnText) themeBtnText.textContent = 'Dark';
      } else {
        body.classList.remove('theme-light');
        body.classList.add('theme-dark');
        if (themeBtnText) themeBtnText.textContent = 'Light';
      }
    });
  }

  // Interactive HITL Review Card Actions (Simulation for Evaluators)
  const btnApproveDemo = document.getElementById('btnApproveDemo') || document.querySelector('.btn-approve');
  const btnRejectDemo = document.getElementById('btnRejectDemo') || document.querySelector('.btn-reject');
  const btnReviewDemo = document.getElementById('btnReviewDemo') || document.querySelector('.btn-review');
  const ircStatusText = document.getElementById('ircStatusText') || document.querySelector('.rc-flag span:last-child');
  const ircReasoning = document.querySelector('.irc-reasoning');

  if (btnApproveDemo && ircStatusText) {
    btnApproveDemo.addEventListener('click', () => {
      ircStatusText.textContent = 'Mapping Approved & Committed to Master NUMM Catalog (Audit Ref: #VAL-2024-998)';
      ircStatusText.style.color = '#10b981';
      ircStatusText.style.fontWeight = '700';
      btnApproveDemo.style.opacity = '0.6';
      btnApproveDemo.style.pointerEvents = 'none';
      btnApproveDemo.textContent = '✓ Approved';
      if (btnRejectDemo) btnRejectDemo.style.display = 'none';
      if (btnReviewDemo) btnReviewDemo.style.display = 'none';
    });
  }

  if (btnRejectDemo && ircStatusText) {
    btnRejectDemo.addEventListener('click', () => {
      ircStatusText.textContent = 'Mapping Flagged for Engineering Clarification & Review';
      ircStatusText.style.color = '#ef4444';
      ircStatusText.style.fontWeight = '700';
      btnRejectDemo.style.opacity = '0.6';
      btnRejectDemo.style.pointerEvents = 'none';
      btnRejectDemo.textContent = '✗ Flagged';
      if (btnApproveDemo) btnApproveDemo.style.display = 'none';
    });
  }

  if (btnReviewDemo && ircReasoning) {
    btnReviewDemo.addEventListener('click', () => {
      const isExpanded = ircReasoning.getAttribute('data-expanded') === 'true';
      if (isExpanded) {
        ircReasoning.setAttribute('data-expanded', 'false');
        ircReasoning.innerHTML = '<strong>AI Rationale:</strong> Exact match on metallurgical grade (TP304), dimensional equivalence (2.00" = 50.8mm &approx; DN50), and pressure schedule (SCH40).';
        btnReviewDemo.innerHTML = '&#128065; Review Details';
      } else {
        ircReasoning.setAttribute('data-expanded', 'true');
        ircReasoning.innerHTML = '<strong>AI Rationale &amp; Deep Attribute Trace:</strong><br>' +
          '&bull; <strong>Dimension:</strong> 2 IN (Imperial) matches 50mm (Metric) and DN50 (Nominal Diameter) per ASME B36.19M.<br>' +
          '&bull; <strong>Metallurgy:</strong> TP304 / Grade 304 Austenitic Stainless Steel confirmed across all three specifications.<br>' +
          '&bull; <strong>Pressure Rating:</strong> Schedule 40 (SCH40) uniform across CPSE A, B &amp; C.<br>' +
          '&bull; <strong>Confidence Vector:</strong> 0.963 cosine similarity (Threshold: 0.85). Recommended for immediate master convergence.';
        btnReviewDemo.innerHTML = '&#128065; Collapse Details';
      }
    });
  }

  // Smooth scroll for nav items
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({
            behavior: 'smooth'
          });
        }
      }
    });
  });
});
