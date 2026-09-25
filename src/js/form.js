const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Validační pravidla: název pole → funkce vracející chybovou hlášku, nebo ''
const rules = {
  prezdivka: (form) => {
    const value = form.elements.prezdivka.value.trim();
    if (value === '') return 'Vyplň přezdívku.';
    if (value.length < 3 || value.length > 20) return 'Přezdívka musí mít 3–20 znaků.';
    return '';
  },
  email: (form) => {
    const value = form.elements.email.value.trim();
    if (value === '') return 'Vyplň e-mail.';
    if (!EMAIL_REGEX.test(value)) return 'Tohle není platný e-mail.';
    return '';
  },
  platforma: (form) => (form.elements.platforma.value ? '' : 'Vyber platformu.'),
  obtiznost: (form) =>
    form.querySelector('input[name="obtiznost"]:checked') ? '' : 'Zvol obtížnost.',
  souhlas: (form) => (form.elements.souhlas.checked ? '' : 'Bez souhlasu tě šéf do kuchyně nepustí.'),
};

// Zobrazí / smaže chybu u pole
function setError(form, name, message) {
  const errorEl = document.getElementById(`${name}-chyba`);
  const control = form.elements[name];
  // U radio skupiny je form.elements[name] RadioNodeList → vezmeme první input
  const firstInput = control instanceof RadioNodeList ? control[0] : control;
  const field = firstInput?.closest('.form__field');

  if (errorEl) errorEl.textContent = message;
  field?.classList.toggle('has-error', message !== '');

  const inputs = control instanceof RadioNodeList ? [...control] : [control];
  inputs.forEach((input) => {
    if (message) input.setAttribute('aria-invalid', 'true');
    else input.removeAttribute('aria-invalid');
  });
}

export function initForm() {
  const form = document.getElementById('registrace-form');
  const message = document.getElementById('form-zprava');
  if (!form || !message) return;

  // Mazání chyby při opravě pole
  const clearOnChange = (e) => {
    const name = e.target.name;
    if (!(name in rules)) return;
    setError(form, name, '');
    message.textContent = '';
    message.classList.remove('is-success', 'has-error');
  };
  form.addEventListener('input', clearOnChange);
  form.addEventListener('change', clearOnChange);

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let firstInvalid = null;
    Object.entries(rules).forEach(([name, validate]) => {
      const error = validate(form);
      setError(form, name, error);
      if (error && !firstInvalid) firstInvalid = name;
    });

    if (firstInvalid) {
      message.textContent = 'Formulář obsahuje chyby. Oprav je a zkus to znovu.';
      message.classList.remove('is-success');
      message.classList.add('has-error');
      const control = form.elements[firstInvalid];
      (control instanceof RadioNodeList ? control[0] : control).focus();
      return;
    }

    const nickname = form.elements.prezdivka.value.trim();
    message.textContent = `Díky, ${nickname}! Šéf ti napíše… možná.`;
    message.classList.remove('has-error');
    message.classList.add('is-success');
    form.reset();
  });
}
