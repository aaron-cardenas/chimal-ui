import { definePreset } from '@primeng/themes';
import Aura from '@primeng/themes/aura';

// Preset de PrimeNG con colores de marca Creditaria
// Primario: #0D1B2A (azul oscuro)
// Acento/Detalle lujo: #D4AF37 (dorado)
const CreditariaPreset = definePreset(Aura, {
  semantic: {
    transitionDuration: '0.2s',
    focusRing: { width: '1px', style: 'solid', color: '{primary.color}', offset: '2px', shadow: 'none' },
    primary: {
      50: '#e6eaee',
      100: '#cfd6de',
      200: '#a0adbd',
      300: '#71859b',
      400: '#425c7a',
      500: '#0D1B2A', // color principal de marca
      600: '#0b1825',
      700: '#091520',
      800: '#06111a',
      900: '#040d14',
      950: '#02080d'
    },
    colorScheme: {
      light: {
        surface: {
          0: '#ffffff',
          50: '#f8fafc',
          100: '#f1f5f9'
        }
      }
    }
  }
});

export default CreditariaPreset;

