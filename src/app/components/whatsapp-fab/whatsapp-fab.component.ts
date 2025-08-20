import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WaLinkService } from '../../services/wa-link.service';
import { AnalyticsService } from '../../services/analytics.service';

@Component({
  selector: 'app-whatsapp-fab',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './whatsapp-fab.component.html',
  styleUrl: './whatsapp-fab.component.scss'
})
export class WhatsappFabComponent {
  constructor(private readonly wa: WaLinkService, private readonly analytics: AnalyticsService) { }
  get waLink(): string { return this.wa.buildLink('floating_btn'); }
  onClick() { this.analytics.trackEvent('click_wa_floating'); }
}

