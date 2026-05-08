# PRESENTACION FLAM

Sitio interactivo tipo recorrido visual en Canvas sobre actividades en Flåm, Noruega.

## Descripcion

Esta web muestra una secuencia de escenas conectadas por trayectorias animadas:

- Pantalla de inicio (escena 0)
- Viaje inicial a Flåm
- Eleccion de alojamiento (camp u hotel)
- Visita a Brekkefossen
- Traslado al Museo Flamsbana
- Traslado al restaurante/microbrewery Ægir

Incluye botones contextuales, menu para saltar de escena y animaciones de rutas con puntos luminosos.

## Tecnologias

- HTML5
- CSS3
- JavaScript (vanilla)
- Canvas 2D

## Estructura del proyecto

- [index.html](index.html): estructura del sitio y botones UI.
- [styles.css](styles.css): estilos de personajes, botones y overlays.
- [script.js](script.js): logica de escenas, estados, animaciones y eventos.
- [assets/img](assets/img): fondos y personajes por escena.

## Flujo de escenas (actual)

- 0: Home con personaje inicial y acceso al recorrido.
- 1: Inicio de trayectoria principal.
- 2: Tren.
- 3: Punto interactivo de llegada.
- 4: Trayecto a Flåm.
- 5: Trayecto a alojamiento.
- 6: Decision camp/hotel.
- 7_1 y 7_2: Recepcion segun opcion.
- 8_1 y 8_2: Check-in segun opcion.
- 9: Ruta a Brekkefossen.
- 10: Viaje en ferrocarril al museo.
- 11: Ruta de Brekkefossen al museo.
- 12: Ruta del museo a Ægir Microbrewery.

## Como ejecutar

1. Abrir la carpeta del proyecto en VS Code.
2. Ejecutar un servidor local (recomendado: Live Server).
3. Abrir [index.html](index.html) en el navegador.

Tambien puedes usar cualquier servidor estatico. Ejemplo con Python:

```bash
python -m http.server 5500
```

Luego abrir:

```text
http://127.0.0.1:5500
```

## Interaccion principal

- Boton de inicio del recorrido.
- Botones contextuales: Back, Check In, Get Out, Next Spot, Return to Home.
- Menu flotante para ir a una escena especifica.
- Nodos y trayectorias animadas (linea punteada + punto en movimiento).

## Requisitos de assets

El proyecto espera la carpeta [assets/img](assets/img) organizada por escena:

- [assets/img/escene_0](assets/img/escene_0)
- [assets/img/escene_1](assets/img/escene_1)
- ...
- [assets/img/escene_12](assets/img/escene_12)

Cada escena puede incluir:

- background.png o background.jpg
- person.png (si aplica)
- imagenes extra (ejemplo: ferrocarril.png)

## Notas

- Si una imagen no aparece, revisar nombre exacto, extension y ruta.
- El render depende del estado de carga de imagenes criticas (escena inicial).
