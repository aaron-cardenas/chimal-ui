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
      'CHIMAL | Tu aliado financiero para auto, casa o negocio',
      'Haz realidad tu auto, casa o negocio. Comparamos multiple opciones y gestionamos todo sin costo hasta la aprobación. Hipotecario, Vehículos (crédito/leasing, alta gama) y PyME.'
    );
  }

  slides: SlideData[] = [
    { id: 0, segment: 'general', collapsedTitle: 'CHIMAL', title: 'Tu próximo auto, casa o negocio… más facil de lo que imaginas', subtitle: 'Nosotros comparamos por ti y te guiamos sin costo hasta la conseguir tu objetivo. Fácil, rápido y seguro.', imageUrl: '/oficina-3.webp', ctaText: 'Quiero mi asesoría gratis' },
    { id: 2, segment: 'vehiculos', collapsedTitle: 'Vehículos', title: 'Estrena con la opción más inteligente', subtitle: 'Renta o compra a crédito: liquidez, flexibilidad y conveniencia. Tú eliges, nosotros lo gestionamos.', imageUrl: '/coche-horizontal.webp', ctaText: 'Quiero crédito o leasing' },
    { id: 1, segment: 'hipotecario', collapsedTitle: 'Hipotecario', title: 'Tu hogar, con el crédito correcto', subtitle: 'Comparamos más de 10 bancos y te acompañamos de principio a fin para lograr la mejor tasa y condiciones.', imageUrl: '/casa-1.webp', ctaText: 'Precalifícame por WhatsApp (2 min)' },
    { id: 3, segment: 'pyme', collapsedTitle: 'PyME', title: 'Financiamiento que entiende tu realidad', subtitle: 'Deja de perder semanas con los bancos. Te conectamos con financieras que responden agilmente y entienden tu flujo real.', imageUrl: '/oficina-1.webp', ctaText: 'Necesito respuesta rápida' }
  ];

  onSegmentChange(seg: Segment) { this.selectedSegment.set(seg); }
}
