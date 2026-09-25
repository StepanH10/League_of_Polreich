// Rozbalovací odpovědi v FAQ
export function initFaq() {
  const questions = document.querySelectorAll('.faq__question');
  if (questions.length === 0) return;

  questions.forEach((question) => {
    const answer = document.getElementById(question.getAttribute('aria-controls'));
    if (!answer) return;

    question.addEventListener('click', () => {
      const open = question.getAttribute('aria-expanded') !== 'true';
      question.setAttribute('aria-expanded', String(open));
      answer.hidden = !open;
      question.closest('.faq__item')?.classList.toggle('is-open', open);
    });
  });
}
