import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WaLinkService } from '../../services/wa-link.service';
import { AnalyticsService } from '../../services/analytics.service';

export type Segment = 'general' | 'hipotecario' | 'vehiculos' | 'pyme';

@Component({
  selector: 'app-dynamic-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dynamic-section.component.html',
  styleUrl: './dynamic-section.component.scss'
})
export class DynamicSectionComponent {
  @Input() segment: Segment = 'general';
  @Output() segmentPick = new EventEmitter<Segment>();

  constructor(private readonly wa: WaLinkService, private readonly analytics: AnalyticsService) { }

  waLink(segment: Segment): string {
    return this.wa.buildLinkForSegment('wa_segment', segment);
  }

  onClickWa(segment: Segment) {
    this.analytics.trackEvent('click_wa_segment', { segment });
  }

  pickSegment(seg: Segment) {
    this.segmentPick.emit(seg);
  }
}

