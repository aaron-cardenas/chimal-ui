import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WaLinkService } from '../../services/wa-link.service';
import { AnalyticsService } from '../../services/analytics.service';

@Component({
  selector: 'app-como-trabajamos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './como-trabajamos.component.html',
  styleUrl: './como-trabajamos.component.scss'
})
export class ComoTrabajamosComponent {
  constructor(private readonly wa: WaLinkService, private readonly analytics: AnalyticsService) { }
  get waCta(): string { return this.wa.buildLink('section5_cta'); }
  onClickCta() { this.analytics.trackEvent('click_wa_section5'); }
}

