// Bootstrap stubs allow the state bundle to initialize before the real draft helpers load.
// form-core.js replaces these global functions and immediately runs the real load/apply pass.
function loadDraft() {}
function applyPrefills() {}

// Individual department feedback links are intended for the assigned respondent only.
// Remove in-app routes back to the department selector/facilitator notes while leaving
// normal Back navigation between steps intact. Browser controls remain under the user's control.
window.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  if (params.get('form') !== 'pulse') return;

  const appNode = document.getElementById('app');
  if (!appNode) return;

  const enforceIndividualNavigation = () => {
    document.getElementById('home-btn')?.remove();

    const confirmation = appNode.querySelector('.confirmation');
    if (!confirmation) return;

    confirmation.querySelectorAll('a.button-link').forEach(link => {
      if (link.textContent.includes('Return to department selection')) link.remove();
    });

    if (!confirmation.querySelector('[data-close-message]')) {
      const message = document.createElement('p');
      message.dataset.closeMessage = '1';
      message.textContent = 'You may close this page.';
      confirmation.appendChild(message);
    }
  };

  new MutationObserver(enforceIndividualNavigation).observe(appNode, { childList: true, subtree: true });
  enforceIndividualNavigation();
});
