/**
 * Windshield Advisor Quiz Widget Embed Script
 *
 * Usage:
 * <div class="windshield-advisor-quiz"
 *      data-quiz="adas-calibration"
 *      data-primary-color="1a73e8"
 *      data-partner-id="your-partner-id"></div>
 * <script src="https://windshieldadvisor.info/quiz-embed.js"></script>
 */

(function() {
  'use strict';

  const WIDGET_BASE_URL = 'https://windshieldadvisor.info/widget/quiz';

  // Find all quiz embed containers
  function initializeQuizWidgets() {
    const containers = document.querySelectorAll('.windshield-advisor-quiz');

    containers.forEach(container => {
      if (container.dataset.initialized) return;

      const quizSlug = container.dataset.quiz;
      if (!quizSlug) {
        console.error('Quiz widget missing data-quiz attribute');
        return;
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

      // Display options
      if (container.dataset.showBranding !== undefined) params.set('showBranding', container.dataset.showBranding);
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

      // Add event listeners for iframe communication
      iframe.onload = function() {
        // Send ready message
        iframe.contentWindow.postMessage({ type: 'quiz-widget-ready' }, '*');
      };

      container.appendChild(iframe);
      container.dataset.initialized = 'true';

      // Store iframe reference for events
      container._iframe = iframe;
    });
  }

  // Listen for messages from widget iframe
  window.addEventListener('message', function(event) {
    // Verify origin in production
    // if (event.origin !== 'https://windshieldadvisor.info') return;

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

    // Dispatch custom events for partner sites to listen to
    const eventName = data.type.replace('quiz-widget-', '');
    const customEvent = new CustomEvent(`windshieldAdvisorQuiz:${eventName}`, {
      detail: data,
      bubbles: true
    });
    document.dispatchEvent(customEvent);

    // Call partner-specific callbacks
    if (data.partnerId) {
      const callbackName = `onWindshieldAdvisorQuiz${eventName.charAt(0).toUpperCase() + eventName.slice(1)}`;
      if (typeof window[callbackName] === 'function') {
        window[callbackName](data);
      }
    }
  });

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeQuizWidgets);
  } else {
    initializeQuizWidgets();
  }

  // Export API for dynamic initialization
  window.WindshieldAdvisorQuiz = {
    version: '1.0.0',
    init: initializeQuizWidgets,

    // Programmatic embed
    embed: function(container, options) {
      if (typeof container === 'string') {
        container = document.querySelector(container);
      }

      if (!container) {
        console.error('Container not found');
        return;
      }

      container.className = 'windshield-advisor-quiz';
      container.dataset.quiz = options.quiz;

      // Apply options as data attributes
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
