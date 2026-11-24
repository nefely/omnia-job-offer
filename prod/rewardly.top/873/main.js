(function () {
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  // Support email — динамічно по поточному домену
  var supportEmail = 'hello@' + window.location.hostname;

  function applyEmailLinks(root) {
    root.querySelectorAll('a.js-email').forEach(function (a) {
      a.href = 'mailto:' + supportEmail;
      if (!a.dataset.label) a.textContent = supportEmail;
    });
  }

  function applyEmailLinksUnsubscribe(root) {
    root.querySelectorAll('a.js-email-unsubscribe').forEach(function (a) {
      a.href = 'mailto:' + supportEmail + '?subject=Unsubscribe';
    });
  }

  applyEmailLinks(document);
  applyEmailLinksUnsubscribe(document);

  // Попапи (Privacy / Terms / CCPA)
  var dlg = document.getElementById('dlg');
  var dlgTitle = document.getElementById('dlgTitle');
  var dlgBody = document.getElementById('dlgBody');
  var TITLES = {
    privacy: 'Privacy Notice',
    terms: 'Terms of Use',
    ccpa: 'Your state privacy rights'
  };

  function openDialog(key) {
    var tpl = document.getElementById('tpl-' + key);
    if (!tpl) return;
    dlgTitle.textContent = TITLES[key] || 'Document';
    dlgBody.innerHTML = '';
    dlgBody.appendChild(tpl.content.cloneNode(true));
    applyEmailLinks(dlgBody);
    if (typeof dlg.showModal === 'function') dlg.showModal();
    else dlg.setAttribute('open', '');
  }

  function closeDialog() {
    if (typeof dlg.close === 'function') dlg.close();
    else dlg.removeAttribute('open');
  }

  document.querySelectorAll('[data-open]').forEach(function (el) {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      openDialog(el.getAttribute('data-open'));
    });
  });

  document.querySelectorAll('[data-close]').forEach(function (el) {
    el.addEventListener('click', closeDialog);
  });

  dlg.addEventListener('click', function (e) {
    if (e.target === dlg) closeDialog();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeDialog();
  });

  // Форма підписки
  var form = document.getElementById('subForm');
  var emailInput = document.getElementById('email');
  var consentBox = document.getElementById('consent');
  var errBox = document.getElementById('errMsg');
  var submitBtn = document.getElementById('submitBtn');
  var successBlock = document.getElementById('success');

  function showErr(msg) {
    errBox.textContent = msg;
    emailInput.classList.add('err');
  }

  function clearErr() {
    errBox.textContent = '';
    emailInput.classList.remove('err');
  }

  emailInput.addEventListener('input', clearErr);

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    clearErr();

    var email = (emailInput.value || '').trim().toLowerCase();

    if (!EMAIL_RE.test(email) || email.length > 254) {
      showErr('Please enter a valid email address.');
      emailInput.focus();
      return;
    }

    if (!consentBox.checked) {
      showErr('Please confirm that you are 18+ and agree to receive the email.');
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = 'Subscribing…';

    setTimeout(function () {

        fbq('track', 'PageView');

      form.hidden = true;
      successBlock.hidden = false;
      successBlock.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 600);
  });
})();
