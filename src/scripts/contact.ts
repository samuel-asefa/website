/**
 * Contact page helpers. "Copy email address" uses the Clipboard API when it
 * exists. The form only builds a mailto: link and opens the visitor's email
 * app; nothing is sent from the site, and the page says so.
 */
import { SITE } from '../config/site';

export const initContact = (): void => {
  const copy = document.querySelector<HTMLButtonElement>('[data-copy]');
  const label = copy?.querySelector<HTMLElement>('[data-copy-label]');
  const status = document.querySelector<HTMLElement>('[data-copy-status]');
  if (copy && navigator.clipboard) {
    copy.hidden = false;
    copy.addEventListener('click', async () => {
      let msg = 'Email address copied';
      try {
        await navigator.clipboard.writeText(copy.dataset.copy ?? SITE.email);
      } catch {
        msg = 'Couldn’t copy. Select the address above instead.';
      }
      if (label) label.textContent = msg;
      if (status) status.textContent = msg;
      window.setTimeout(() => {
        if (label) label.textContent = 'Copy email address';
      }, 2500);
    });
  }

  const form = document.querySelector<HTMLFormElement>('[data-draft]');
  const error = form?.querySelector<HTMLElement>('[data-draft-error]');
  if (!form || !error) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const name = String(data.get('name') ?? '').trim();
    const reply = String(data.get('email') ?? '').trim();
    const message = String(data.get('message') ?? '').trim();
    const emailField = form.querySelector<HTMLInputElement>('#email');
    let problem = '';
    let focus = '';
    if (!name) [problem, focus] = ['Please add your name.', '#name'];
    else if (reply && emailField && !emailField.checkValidity()) [problem, focus] = ['That email address doesn’t look right.', '#email'];
    else if (!message) [problem, focus] = ['Please write a message.', '#message'];
    if (problem) {
      error.textContent = problem;
      form.querySelector<HTMLElement>(focus)?.focus();
      return;
    }
    error.textContent = '';
    const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\n${reply ? `Email: ${reply}\n` : ''}\nMessage:\n${message}`);
    window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;
  });
};
