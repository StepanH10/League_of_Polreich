// Správné odpovědi: name otázky → value
const answers = {
  otazka1: 'b',
  otazka2: 'a',
  otazka3: 'c',
  otazka4: 'b',
};

function getRating(score) {
  if (score <= 1) return 'Zavřít podnik!';
  if (score <= 3) return 'Ujde to, ale ta cibule…';
  return 'Ano, šéfe! Jsi přijat.';
}

export function initQuiz() {
  const form = document.getElementById('kviz-form');
  const result = document.getElementById('kviz-vysledek');
  if (!form || !result) return;

  const total = Object.keys(answers).length;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const fieldsets = form.querySelectorAll('fieldset');
    fieldsets.forEach((fs) => fs.classList.remove('is-correct', 'is-wrong'));
    result.classList.remove('is-success');

    // Kontrola nezodpovězených otázek
    const unanswered = Object.keys(answers).filter(
      (name) => !form.querySelector(`input[name="${name}"]:checked`),
    );

    if (unanswered.length > 0) {
      result.textContent = `Počkej, ještě nemáš hotovo! Odpověz na všechny otázky (chybí ${unanswered.length}).`;
      form.querySelector(`input[name="${unanswered[0]}"]`).focus();
      return;
    }

    // Vyhodnocení a obarvení fieldsetů
    let score = 0;
    Object.entries(answers).forEach(([name, correct]) => {
      const checked = form.querySelector(`input[name="${name}"]:checked`);
      const isCorrect = checked.value === correct;
      if (isCorrect) score++;
      checked.closest('fieldset')?.classList.add(isCorrect ? 'is-correct' : 'is-wrong');
    });

    result.textContent = `Skóre: ${score}/${total} – ${getRating(score)}`;
    result.classList.toggle('is-success', score === total);
  });
}
