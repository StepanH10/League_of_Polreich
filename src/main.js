import './scss/main.scss';

import { initMenu } from './js/menu.js';
import { initTabs } from './js/tabs.js';
import { initQuotes } from './js/quotes.js';
import { initQuiz } from './js/quiz.js';
import { initFaq } from './js/faq.js';
import { initForm } from './js/form.js';
import { initFooter } from './js/footer.js';
import { initVideo } from './js/video.js';

function init() {
  initMenu();
  initTabs();
  initQuotes();
  initQuiz();
  initFaq();
  initForm();
  initFooter();
  initVideo();
}

// Moduly se spouštějí odloženě, ale pro jistotu počkáme na DOM
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
