import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-guestbook',
  templateUrl: './guestbook.component.html',
  styleUrls: ['./guestbook.component.css']
})
export class GuestbookComponent implements OnInit, OnDestroy {
  @ViewChild('giscusContainer', { static: true }) giscusContainer!: ElementRef<HTMLDivElement>;

  private scriptEl?: HTMLScriptElement;

  ngOnInit(): void {
    // create giscus script with the exact attributes you provided
    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.async = true;
    script.defer = true;

    script.setAttribute('data-repo', 'sudhir-tiwari01/portfolio-app');
    script.setAttribute('data-repo-id', 'R_kgDOOvMS5w');
    script.setAttribute('data-category', 'General');
    script.setAttribute('data-category-id', 'DIC_kwDOOvMS584CvE_c');
    script.setAttribute('data-mapping', 'pathname');
    script.setAttribute('data-strict', '1');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-input-position', 'top');
    script.setAttribute('data-theme', 'preferred_color_scheme');
    script.setAttribute('data-lang', 'en');
    script.setAttribute('data-loading', 'lazy');
    script.setAttribute('crossorigin', 'anonymous');

    this.scriptEl = script;
    this.giscusContainer.nativeElement.appendChild(script);
  }

  ngOnDestroy(): void {
    // clean up the widget when component is destroyed / navigated away
    try {
      if (this.giscusContainer?.nativeElement) {
        this.giscusContainer.nativeElement.innerHTML = '';
      }
      if (this.scriptEl && this.scriptEl.parentNode) {
        this.scriptEl.parentNode.removeChild(this.scriptEl);
      }
    } catch (e) {
      // ignore cleanup errors
      console.warn('Error cleaning up giscus widget', e);
    }
  }

  /**
   * Called when the user clicks our page-level "Sign In" CTA.
   * Scrolls to and attempts to focus the giscus iframe (where GitHub sign-in lives).
   */
  focusGiscus() {
    const el = this.giscusContainer?.nativeElement;
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // try to focus the giscus iframe once it's available (it may load after a short delay)
    setTimeout(() => {
      const iframe = el.querySelector('iframe') as HTMLIFrameElement | null;
      if (iframe) {
        try { iframe.focus(); } catch { /* ignore focus errors */ }
      }
    }, 700);
  }
}
