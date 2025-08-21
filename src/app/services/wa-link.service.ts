import { Inject, Injectable, InjectionToken } from '@angular/core';

export const WA_NUMBER = new InjectionToken<string>('WA_NUMBER');
export const WA_DEFAULT_MESSAGE = new InjectionToken<string>('WA_DEFAULT_MESSAGE');

@Injectable({ providedIn: 'root' })
export class WaLinkService {
  constructor(
    @Inject(WA_NUMBER) private readonly number: string,
    @Inject(WA_DEFAULT_MESSAGE) private readonly defaultMessage: string
  ) { }

  private replacePlaceholders(template: string, replacements: Record<string, string>): string {
    return template.replace(/\[(UTM_SOURCE|UTM_CAMPAIGN|UTM_CONTENT|SEGMENT)\]/g, (_match, key) => {
      return (replacements[key] ?? '').toString();
    });
  }

  private resolveMessageTemplate(segment?: string): string {
    // Mensajes específicos por segmento; si no hay segmento, usar el mensaje por defecto
    const seg = (segment ?? '').trim().toLowerCase();
    if (!seg) return this.defaultMessage.trim();

    switch (seg) {
      case 'hipotecario':
        return 'Hola, me interesa una asesoría hipotecaria. ¿Me pueden orientar?';
      case 'vehiculos':
        return 'Hola, me interesa financiamiento o arrendamiento de vehículos. ¿Me pueden orientar?';
      case 'pyme':
        return 'Hola, me interesan opciones de crédito o arrendamiento para mi PyME. ¿Me pueden orientar?';
      default:
        return this.defaultMessage.trim();
    }
  }

  buildLink(origin: string, extraParams?: Record<string, string>): string {
    const utm = {
      utm_source: 'site',
      utm_campaign: 'landing',
      utm_content: origin,
      ...(extraParams ?? {})
    } as Record<string, string>;

    const segment = (extraParams && extraParams['segment']) ? extraParams['segment'] : undefined;

    // Construir mensaje basado en origen/segmento y aplicar placeholders si existen
    const template = this.resolveMessageTemplate(segment);
    const replacements = {
      UTM_SOURCE: utm['utm_source'] ?? '',
      UTM_CAMPAIGN: utm['utm_campaign'] ?? '',
      UTM_CONTENT: utm['utm_content'] ?? '',
      SEGMENT: segment ?? ''
    } as Record<string, string>;

    const msg = this.replacePlaceholders(template, replacements).trim();

    const url = new URL(`https://wa.me/${this.number}`);
    url.searchParams.set('text', msg);
    // UTM y segmento como parámetros de URL (no dentro del texto)
    Object.entries(utm).forEach(([k, v]) => url.searchParams.set(k, v));
    if (segment) {
      url.searchParams.set('segment', segment);
    }

    return url.toString();
  }

  buildLinkForSegment(originBase: string, segment: string): string {
    return this.buildLink(`${originBase}_${segment}`, { segment });
  }
}

