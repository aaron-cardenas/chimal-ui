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

  buildLink(origin: string, extraParams?: Record<string, string>): string {
    const utm = {
      utm_source: 'site',
      utm_campaign: 'landing',
      utm_content: origin,
      ...(extraParams ?? {})
    } as Record<string, string>;

    const segment = (extraParams && extraParams['segment']) ? extraParams['segment'] : undefined;

    // Intentar sustitución en el mensaje por defecto si usa placeholders
    const replacements = {
      UTM_SOURCE: utm['utm_source'] ?? '',
      UTM_CAMPAIGN: utm['utm_campaign'] ?? '',
      UTM_CONTENT: utm['utm_content'] ?? '',
      SEGMENT: segment ?? ''
    } as Record<string, string>;

    let msg = this.replacePlaceholders(this.defaultMessage, replacements).trim();

    // Si no hay placeholders en el mensaje, añadimos los datos al final
    if (msg === this.defaultMessage.trim()) {
      msg += ` UTM_SOURCE=${replacements['UTM_SOURCE']} UTM_CAMPAIGN=${replacements['UTM_CAMPAIGN']} UTM_CONTENT=${replacements['UTM_CONTENT']}`;
      if (segment) {
        msg += ` SEGMENT=${segment}`;
      }
    }

    const url = new URL(`https://wa.me/${this.number}`);
    url.searchParams.set('text', msg);
    // UTM y segmento también como parámetros de URL
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

