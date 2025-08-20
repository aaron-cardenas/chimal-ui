import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';

@Directive({ selector: '[appReveal]', standalone: true })
export class RevealDirective implements AfterViewInit {
  @Input('appReveal') revealClass = 'animate-fadeInUp';

  constructor(private readonly el: ElementRef<HTMLElement>) { }

  ngAfterViewInit(): void {
    if (typeof window === 'undefined') return;

    const node = this.el.nativeElement;
    node.style.opacity = '0';

    const ob = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          // Validar que la clase no esté vacía antes de agregarla
          if (this.revealClass && this.revealClass.trim()) {
            node.classList.add(this.revealClass.trim());
          }
          node.style.opacity = '1';
          ob.unobserve(node);
        }
      });
    }, { threshold: 0.1 });

    ob.observe(node);
  }
}

