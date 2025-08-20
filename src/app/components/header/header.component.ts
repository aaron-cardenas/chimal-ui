import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WaLinkService } from '../../services/wa-link.service';
import { AnalyticsService } from '../../services/analytics.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(private readonly wa: WaLinkService, private readonly analytics: AnalyticsService) { }
  get waLink(): string { return this.wa.buildLink('header_btn'); }
  onClickWa() { this.analytics.trackEvent('click_wa_header'); }
}

