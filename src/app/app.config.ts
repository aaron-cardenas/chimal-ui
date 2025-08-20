import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import CreditariaPreset from './theme/creditaria.preset';

import { routes } from './app.routes';
import { WA_DEFAULT_MESSAGE, WA_NUMBER } from './services/wa-link.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: { preset: CreditariaPreset }
    }),
    // Variables de ambiente (dev por defecto). No tocar prod.
    { provide: WA_NUMBER, useValue: '5215529669697' },
    { provide: WA_DEFAULT_MESSAGE, useValue: 'Hola, quiero asesoría sin costo. Vengo del sitio.' }
  ]
};
