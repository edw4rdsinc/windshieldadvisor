/**
 * Windshield Advisor Quiz Widget Embed Script (SEO-Enhanced Version)
 *
 * This version adds visible attribution links and structured data for better SEO value
 *
 * Usage:
 * <div class="windshield-advisor-quiz"
 *      data-quiz="adas-calibration"
 *      data-seo-mode="true"
 *      data-partner-id="your-partner-id"></div>
 * <script src="https://windshieldadvisor.info/quiz-embed-seo.js"></script>
 */

(function() {
  'use strict';

  const WIDGET_BASE_URL = 'https://windshieldadvisor.info/widget/quiz';
  const BASE_URL = 'https://windshieldadvisor.info';

  function initializeQuizWidgets() {
    const containers = document.querySelectorAll('.windshield-advisor-quiz');

    containers.forEach(container => {
      if (container.dataset.initialized) return;

      const quizSlug = container.dataset.quiz;
      if (!quizSlug) {
        console.error('Quiz widget missing data-quiz attribute');
        return;
      }

      const seoMode = container.dataset.seoMode === 'true';

      // Add SEO-friendly attribution BEFORE the iframe
      if (seoMode) {
        addSEOAttribution(container, quizSlug);
      }

      // Build widget URL with theme parameters
      const params = new URLSearchParams();

      // Theme parameters
      if (container.dataset.primaryColor) params.set('primaryColor', container.dataset.primaryColor.replace('#', ''));
      if (container.dataset.accentColor) params.set('accentColor', container.dataset.accentColor.replace('#', ''));
      if (container.dataset.textColor) params.set('textColor', container.dataset.textColor.replace('#', ''));
      if (container.dataset.bgColor) params.set('bgColor', container.dataset.bgColor.replace('#', ''));
      if (container.dataset.fontFamily) params.set('fontFamily', container.dataset.fontFamily);
      if (container.dataset.borderRadius) params.set('borderRadius', container.dataset.borderRadius);

      // Partner configuration
      if (container.dataset.partnerId) params.set('partnerId', container.dataset.partnerId);
      if (container.dataset.partnerName) params.set('partnerName', container.dataset.partnerName);
      if (container.dataset.callbackUrl) params.set('callbackUrl', container.dataset.callbackUrl);

      // Display options - hide branding in iframe if SEO mode (we'll show it outside)
      if (seoMode) {
        params.set('showBranding', 'false');
      } else if (container.dataset.showBranding !== undefined) {
        params.set('showBranding', container.dataset.showBranding);
      }

      if (container.dataset.compact !== undefined) params.set('compact', container.dataset.compact);

      const widgetUrl = `${WIDGET_BASE_URL}/${quizSlug}?${params.toString()}`;

      // Create iframe
      const iframe = document.createElement('iframe');
      iframe.src = widgetUrl;
      iframe.style.width = '100%';
      iframe.style.border = 'none';
      iframe.style.overflow = 'hidden';
      iframe.style.minHeight = '400px';
      iframe.setAttribute('scrolling', 'no');
      iframe.setAttribute('title', `Windshield Advisor Quiz: ${quizSlug}`);

      iframe.onload = function() {
        iframe.contentWindow.postMessage({ type: 'quiz-widget-ready' }, '*');
      };

      container.appendChild(iframe);

      // Add SEO-friendly attribution AFTER the iframe
      if (seoMode) {
        addSEOFooter(container, quizSlug);
      }

      container.dataset.initialized = 'true';
      container._iframe = iframe;

      // Add structured data for SEO
      if (seoMode) {
        addStructuredData(container, quizSlug);
      }
    });
  }

  /**
   * Add visible attribution header with backlink
   */
  function addSEOAttribution(container, quizSlug) {
    const header = document.createElement('div');
    header.className = 'windshield-advisor-attribution';
    header.style.cssText = `
      padding: 12px 16px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border-radius: 8px 8px 0 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      font-size: 14px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    `;

    const quizTitles = {
      'adas-calibration': 'ADAS Calibration Quiz',
      'repair-replace': 'Repair vs Replace Quiz',
      'insurance-coverage': 'Insurance Coverage Calculator',
      'installer-qualified': 'Installer Qualification Check',
      'windshield-safety': 'Windshield Safety Assessment'
    };

    header.innerHTML = `
      <div style="display: flex; align-items: center; gap: 8px;">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <span style="font-weight: 600;">${quizTitles[quizSlug] || 'Interactive Quiz'}</span>
      </div>
      <a href="${BASE_URL}/quizzes/${quizSlug}"
         target="_blank"
         rel="noopener"
         style="color: white; text-decoration: none; font-weight: 500; display: flex; align-items: center; gap: 4px; padding: 4px 12px; background: rgba(255,255,255,0.15); border-radius: 4px; transition: background 0.2s;"
         onmouseover="this.style.background='rgba(255,255,255,0.25)'"
         onmouseout="this.style.background='rgba(255,255,255,0.15)'">
        View Source
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
        </svg>
      </a>
    `;

    container.appendChild(header);
  }

  /**
   * Add visible attribution footer with backlink and citation
   */
  function addSEOFooter(container, quizSlug) {
    const footer = document.createElement('div');
    footer.className = 'windshield-advisor-citation';
    footer.style.cssText = `
      padding: 16px;
      background: #f7fafc;
      border: 1px solid #e2e8f0;
      border-radius: 0 0 8px 8px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      font-size: 13px;
      color: #4a5568;
      line-height: 1.6;
    `;

    footer.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 8px;">
        <div style="display: flex; align-items: center; gap: 8px;">
          <strong style="color: #2d3748;">Assessment Tool Provided By:</strong>
          <a href="${BASE_URL}"
             target="_blank"
             rel="noopener"
             style="color: #667eea; text-decoration: none; font-weight: 600; border-bottom: 1px solid #667eea;"
             onmouseover="this.style.color='#5a67d8'"
             onmouseout="this.style.color='#667eea'">
            Windshield Advisor
          </a>
        </div>
        <div style="font-size: 12px; color: #718096;">
          Expert windshield safety research and ADAS calibration guidance.
          <a href="${BASE_URL}/white-papers"
             target="_blank"
             rel="noopener"
             style="color: #667eea; text-decoration: none;"
             onmouseover="this.style.textDecoration='underline'"
             onmouseout="this.style.textDecoration='none'">
            View our research
          </a> |
          <a href="${BASE_URL}/quizzes"
             target="_blank"
             rel="noopener"
             style="color: #667eea; text-decoration: none;"
             onmouseover="this.style.textDecoration='underline'"
             onmouseout="this.style.textDecoration='none'">
            More quizzes
          </a>
        </div>
      </div>
    `;

    container.appendChild(footer);
  }

  /**
   * Add JSON-LD structured data for search engines
   */
  function addStructuredData(container, quizSlug) {
    const quizData = {
      'adas-calibration': {
        name: 'ADAS Calibration Assessment Quiz',
        description: 'Determine if your vehicle\'s Advanced Driver Assistance Systems need recalibration after windshield replacement.',
        about: 'ADAS Calibration and Windshield Safety'
      },
      'repair-replace': {
        name: 'Windshield Repair vs Replace Decision Tool',
        description: 'Get expert guidance on whether to repair or replace your damaged windshield based on professional standards.',
        about: 'Windshield Damage Assessment'
      },
      'insurance-coverage': {
        name: 'Windshield Insurance Coverage Calculator',
        description: 'Calculate your estimated out-of-pocket costs for windshield replacement based on your insurance coverage.',
        about: 'Auto Glass Insurance Coverage'
      },
      'installer-qualified': {
        name: 'Auto Glass Installer Qualification Check',
        description: 'Verify if your windshield installer meets industry certification standards for safe installation.',
        about: 'Windshield Installer Qualifications'
      },
      'windshield-safety': {
        name: 'Comprehensive Windshield Safety Assessment',
        description: 'Complete evaluation of your windshield\'s safety status and potential risks.',
        about: 'Windshield Safety Standards'
      }
    };

    const quiz = quizData[quizSlug] || {};

    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'Quiz',
      'name': quiz.name || 'Windshield Safety Quiz',
      'description': quiz.description || 'Interactive windshield safety assessment tool',
      'about': {
        '@type': 'Thing',
        'name': quiz.about || 'Windshield Safety'
      },
      'provider': {
        '@type': 'Organization',
        'name': 'Windshield Advisor',
        'url': BASE_URL,
        'logo': `${BASE_URL}/logo.png`,
        'sameAs': [
          `${BASE_URL}/quizzes/${quizSlug}`
        ]
      },
      'educationalLevel': 'General Public',
      'inLanguage': 'en-US',
      'isAccessibleForFree': true,
      'url': `${BASE_URL}/quizzes/${quizSlug}`,
      'citation': `${BASE_URL}/white-papers`
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    container.appendChild(script);
  }

  // Listen for messages from widget iframe
  window.addEventListener('message', function(event) {
    const data = event.data;
    if (!data || typeof data.type !== 'string' || !data.type.startsWith('quiz-widget-')) {
      return;
    }

    // Handle resize events
    if (data.type === 'quiz-widget-resize') {
      const containers = document.querySelectorAll('.windshield-advisor-quiz');
      containers.forEach(container => {
        if (container._iframe && container._iframe.contentWindow === event.source) {
          container._iframe.style.height = (data.height + 20) + 'px';
        }
      });
    }

    // Dispatch custom events
    const eventName = data.type.replace('quiz-widget-', '');
    const customEvent = new CustomEvent(`windshieldAdvisorQuiz:${eventName}`, {
      detail: data,
      bubbles: true
    });
    document.dispatchEvent(customEvent);
  });

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeQuizWidgets);
  } else {
    initializeQuizWidgets();
  }

  // Export API
  window.WindshieldAdvisorQuiz = {
    version: '1.1.0-seo',
    init: initializeQuizWidgets,
    embed: function(container, options) {
      if (typeof container === 'string') {
        container = document.querySelector(container);
      }
      if (!container) return;

      container.className = 'windshield-advisor-quiz';
      container.dataset.quiz = options.quiz;

      Object.keys(options).forEach(key => {
        if (key !== 'quiz') {
          const dataKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
          container.dataset[key] = options[key];
        }
      });

      initializeQuizWidgets();
    }
  };
})();
