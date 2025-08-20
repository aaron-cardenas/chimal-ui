import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { HeroComponent, SlideData, Segment } from './components/hero/hero.component';
import { WhatsappFabComponent } from './components/whatsapp-fab/whatsapp-fab.component';
import { DynamicSectionComponent } from './components/dynamic-section/dynamic-section.component';
import { ComoTrabajamosComponent } from './components/como-trabajamos/como-trabajamos.component';
import { FaqComponent } from './components/faq/faq.component';
import { FooterComponent } from './components/footer/footer.component';
import { SeoService } from './services/seo.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    HeroComponent,
    DynamicSectionComponent,
    ComoTrabajamosComponent,
    FaqComponent,
    FooterComponent,
    WhatsappFabComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('chimal-ui');
  selectedSegment = signal<Segment>('general');

  constructor(private readonly seo: SeoService) {
    this.seo.setBasic(
      'Creditaria | Asesoría experta para tu hogar, auto o negocio',
      'Brókers financieros: comparamos +10 opciones y te guiamos sin costo hasta la aprobación. Hipotecario, Vehículos (crédito/leasing) y PyME.'
    );
  }

  slides: SlideData[] = [
    { id: 0, segment: 'general', collapsedTitle: 'Creditaria', title: 'La asesoría experta para tu próximo gran paso', subtitle: 'Créditos para tu Hogar, Auto o Negocio. Te guiamos sin costo hasta la aprobación.', imageUrl: '/oficina-3.webp', ctaText: 'Quiero mi asesoría gratis' },
    { id: 2, segment: 'vehiculos', collapsedTitle: 'Vehículos', title: 'Crédito vs Arrendamiento: elige con inteligencia', subtitle: 'Liquidez, flexibilidad y conveniencia. Te ayudamos a decidir.', imageUrl: '/coche-horizontal.webp', ctaText: 'Quiero crédito o leasing' },
    { id: 1, segment: 'hipotecario', collapsedTitle: 'Hipotecario', title: 'Tu hogar, con el crédito correcto', subtitle: 'Comparamos más de 10 bancos y te acompañamos de principio a fin.', imageUrl: '/casa-1.webp', ctaText: 'Precalifícame por WhatsApp (2 min)' },
    { id: 3, segment: 'pyme', collapsedTitle: 'PyME', title: 'Financiamiento que entiende tu flujo', subtitle: 'Respuesta en días, no semanas. Capital, maquinaria y flotillas.', imageUrl: '/oficina-1.webp', ctaText: 'Necesito respuesta rápida' }
  ];

  onSegmentChange(seg: Segment) { this.selectedSegment.set(seg); }
}
