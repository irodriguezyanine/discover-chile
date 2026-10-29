# Discover Chile

Interfaz para viajeros extranjeros que quieren armar un viaje a Chile sin subestimar las distancias.

El planificador pregunta país, días, presupuesto y regiones (norte, centro, lagos, Patagonia, Rapa Nui, etc.) y cotiza en vivo como un carrito, en la moneda local o en USD.

## Idea

Chile no es un destino: son varios países en uno. La gente llega, abre el mapa y dibuja Atacama + Torres del Paine + Isla de Pascua en diez días. Esta pieza frena esa fantasía con rutas honestas, avión vs night bus, visas por pasaporte y un estimado que salta cuando sumas Rapa Nui.

## Stack

- Next.js 16 (App Router) + TypeScript + Tailwind
- 12 idiomas: `en es pt de fr it nl ja ko zh ru ar`
- Cotizador en `src/lib/estimate.ts`
- Tipo de cambio vía [open.er-api.com](https://open.er-api.com), con tasas de respaldo

## Desarrollo

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000). El proxy redirige al idioma del navegador.

## Despliegue

Vercel. No hay secretos obligatorios para el primer release.
