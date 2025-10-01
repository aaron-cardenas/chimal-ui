import { Component, EventEmitter, Input, Output, signal, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WaLinkService } from '../../services/wa-link.service';
import { AnalyticsService } from '../../services/analytics.service';
import { RevealDirective } from '../../directives/reveal.directive';

export type Segment = 'general' | 'hipotecario' | 'vehiculos' | 'pyme';

export interface SlideData {
  id: number;
  segment: Segment;
  collapsedTitle: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  ctaText: string;
}

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, RevealDirective],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent {
  @Input() slides: SlideData[] = [];
  @Output() segmentChange = new EventEmitter<Segment>();
  @ViewChild('mobileSlider') mobileSlider?: ElementRef<HTMLDivElement>;

  activeIndex = signal(0);
  mobileActiveIndex = signal(0);

  constructor(private readonly wa: WaLinkService, private readonly analytics: AnalyticsService) { }

  setActive(index: number) {
    this.activeIndex.set(index);
    const seg = this.slides[index]?.segment ?? 'general';
    this.segmentChange.emit(seg);
  }

  onMobileScroll(event: Event) {
    const element = event.target as HTMLDivElement;
    const scrollLeft = element.scrollLeft;
    const slideWidth = element.clientWidth;
    const newIndex = Math.round(scrollLeft / slideWidth);

    if (newIndex !== this.mobileActiveIndex()) {
      this.mobileActiveIndex.set(newIndex);
      const seg = this.slides[newIndex]?.segment ?? 'general';
      this.segmentChange.emit(seg);
    }
  }

  scrollToSlide(index: number) {
    if (this.mobileSlider) {
      const element = this.mobileSlider.nativeElement;
      const slideWidth = element.clientWidth;
      element.scrollTo({
        left: slideWidth * index,
        behavior: 'smooth'
      });
    }
  }

  waLink(segment: Segment): string {
    return this.wa.buildLinkForSegment('wa_hero', segment);
  }

  onClickWa(segment: Segment) {
    this.analytics.trackEvent('click_wa_hero', { segment });
  }
}

