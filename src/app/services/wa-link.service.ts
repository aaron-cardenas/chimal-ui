import { Inject, Injectable, InjectionToken } from '@angular/core';

export const WA_NUMBER = new InjectionToken<string>('WA_NUMBER');
export const WA_DEFAULT_MESSAGE = new InjectionToken<string>('WA_DEFAULT_MESSAGE');

@Injectable({ providedIn: 'root' })
export class WaLinkService {
  constructor(
    @Inject(WA_NUMBER) private readonly number: string,
    @Inject(WA_DEFAULT_MESSAGE) private readonly defaultMessage: string
  ) { }

  buildLink(origin: string, extraParams?: Record<string, string>): string {
    const utm = {
      utm_source: 'site',
      utm_campaign: 'landing',
      utm_content: origin,
      ...(extraParams ?? {})
    } as Record<string, string>;

    const segment = (extraParams && extraParams['segment']) ? extraParams['segment'] : undefined;

    // Mensaje con sustituciones explícitas en texto + UTM como query params
    let msg = this.defaultMessage;
    msg += ` UTM_SOURCE=${utm['utm_source']} UTM_CAMPAIGN=${utm['utm_campaign']} UTM_CONTENT=${utm['utm_content']}`;
    if (segment) {
      msg += ` SEGMENT=${segment}`;
    }

    const url = new URL(`https://wa.me/${this.number}`);
    url.searchParams.set('text', msg);
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

