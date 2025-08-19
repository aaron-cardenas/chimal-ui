# ChimalUi

Este proyecto fue generado con Angular CLI 20.1.4 con SSR + prerender, Tailwind CSS v4 y PrimeNG v20.

## Desarrollo

- Arrancar dev:

```powershell
ng serve
```

- Compilar (produce salida estática prerender en `dist/`):

```powershell
npm run build
```

## Tailwind CSS v4

Configuración vía PostCSS:

- Archivo `.postcssrc.json` con `@tailwindcss/postcss`.
- `src/styles.scss` importa Tailwind y PrimeIcons:

```scss
@import "tailwindcss";
@import "primeicons/primeicons.css";
```

Nota: Sass `@import` está deprecado, Angular lo soporta mediante el plugin `angular-sass`. Cuando Tailwind añada directivas para Sass nativas, se podrá migrar.

## PrimeNG v20

Se configura en `src/app/app.config.ts` con:

```ts
provideAnimationsAsync(),
providePrimeNG({ theme: { preset: Aura } })
```

## CI/CD a AWS S3 + CloudFront (solo rama main)

Se incluye GitHub Actions `.github/workflows/deploy.yml` que:

1. Instala Node 22 y dependencias
2. Compila `ng build`
3. Sube `dist/chimal-ui/browser` a un bucket S3
4. Invalida una distribución de CloudFront

Debes crear los siguientes secrets en GitHub (Settings > Secrets and variables > Actions):

- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_REGION` (ej. `us-east-1`)
- `AWS_S3_BUCKET` (nombre del bucket destino)
- `AWS_CLOUDFRONT_DISTRIBUTION_ID` (ID de la distribución a invalidar)

Se ejecuta automáticamente en push a `main`. En `develop` no hay automatización.
