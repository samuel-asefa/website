import { SITE } from '../../config/site';
import { sectionHeader } from '../components';
import { page } from '../layout';

export const renderContact = (): string => {
  const main = `
<section class="contact page-section" id="contact">
  ${sectionHeader({ title: 'Get In Touch', level: 1 })}
  <div class="contact-page-layout">
    <div class="contact-left-col">
      <p class="contact-intro">Have a project in mind, a question, or just want to connect? I'd love to hear from you. Email is the fastest way to reach me.</p>
      <div class="contact-reason-list">
        <div class="contact-reason-item">
          <div class="contact-reason-icon" aria-hidden="true"><i class="fas fa-code"></i></div>
          <div class="contact-reason-body">
            <h2 class="contact-reason-title">Collaboration</h2>
            <p>Working together on a software, hardware, or research project.</p>
          </div>
        </div>
        <div class="contact-reason-item">
          <div class="contact-reason-icon" aria-hidden="true"><i class="fas fa-lightbulb"></i></div>
          <div class="contact-reason-body">
            <h2 class="contact-reason-title">Questions</h2>
            <p>About RoboRoute, my research, VEX, or anything on this site.</p>
          </div>
        </div>
        <div class="contact-reason-item">
          <div class="contact-reason-icon" aria-hidden="true"><i class="fas fa-handshake"></i></div>
          <div class="contact-reason-body">
            <h2 class="contact-reason-title">Networking</h2>
            <p>Just want to say hi and connect!</p>
          </div>
        </div>
      </div>
      <div class="contact-secondary-links">
        <a href="mailto:${SITE.email}" class="contact-link-row">
          <i class="fas fa-envelope" aria-hidden="true"></i>
          <div class="contact-link-info">
            <span class="contact-link-title">Email</span>
            <span class="contact-link-value">${SITE.email}</span>
          </div>
          <i class="fas fa-arrow-right contact-link-arrow" aria-hidden="true"></i>
        </a>
        <button type="button" class="copy-email-btn" data-copy="${SITE.email}" hidden><i class="far fa-copy" aria-hidden="true"></i> <span data-copy-label>Copy email address</span></button>
        <span class="visually-hidden" role="status" aria-live="polite" data-copy-status></span>
        <a href="https://www.linkedin.com/in/samuelasefa/" target="_blank" rel="noopener" class="contact-link-row">
          <i class="fab fa-linkedin" aria-hidden="true"></i>
          <div class="contact-link-info">
            <span class="contact-link-title">LinkedIn</span>
            <span class="contact-link-value">linkedin.com/in/samuelasefa</span>
          </div>
          <i class="fas fa-arrow-right contact-link-arrow" aria-hidden="true"></i>
        </a>
        <a href="https://github.com/samuel-asefa" target="_blank" rel="noopener" class="contact-link-row">
          <i class="fab fa-github" aria-hidden="true"></i>
          <div class="contact-link-info">
            <span class="contact-link-title">GitHub</span>
            <span class="contact-link-value">github.com/samuel-asefa</span>
          </div>
          <i class="fas fa-arrow-right contact-link-arrow" aria-hidden="true"></i>
        </a>
        <a href="https://scholar.google.com/citations?user=IPMvevIAAAAJ&amp;hl=en" target="_blank" rel="noopener" class="contact-link-row">
          <i class="fas fa-graduation-cap" aria-hidden="true"></i>
          <div class="contact-link-info">
            <span class="contact-link-title">Google Scholar</span>
            <span class="contact-link-value">Research profile</span>
          </div>
          <i class="fas fa-arrow-right contact-link-arrow" aria-hidden="true"></i>
        </a>
      </div>
    </div>
    <div class="contact-right-col">
      <div class="contact-form-card">
        <h2 class="contact-form-heading">Send a Message</h2>
        <p class="contact-form-note"><i class="fas fa-circle-info" aria-hidden="true"></i> This form opens a pre-filled draft in your email app. Nothing is sent until you press send there.</p>
        <form id="contactForm" class="contact-form-fields" novalidate data-draft>
          <div class="cform-group">
            <label for="name">Name</label>
            <input type="text" id="name" name="name" required autocomplete="name" placeholder="Your Name">
          </div>
          <div class="cform-group">
            <label for="email">Email <span class="cform-optional">(optional, so I can reply)</span></label>
            <input type="email" id="email" name="email" autocomplete="email" placeholder="your.email@example.com">
          </div>
          <div class="cform-group">
            <label for="message">Message</label>
            <textarea id="message" name="message" rows="6" required placeholder="What's on your mind?"></textarea>
          </div>
          <p class="cform-error" role="alert" data-draft-error></p>
          <button type="submit" class="btn primary-btn contact-submit-btn">
            Open in Email App <i class="fas fa-paper-plane" aria-hidden="true"></i>
          </button>
          <noscript><p class="contact-form-note">JavaScript is off, so this form can't build the draft. Email me directly at <a href="mailto:${SITE.email}">${SITE.email}</a>.</p></noscript>
        </form>
      </div>
    </div>
  </div>
</section>`;

  return page(
    {
      title: 'Contact',
      description: `Get in touch with Samuel Asefa by email (${SITE.email}), LinkedIn, or GitHub.`,
      path: '/contact.html',
      image: '/images/projects/ndvi-payload/nasapayload.jpeg',
      nav: 'contact',
    },
    main,
  );
};
