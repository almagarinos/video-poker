# Vídeo Póker

Juego de cartas de casino, en su modalidad *Jacks or Better*, implementado como aplicación web. [¿Cómo jugar?](https://www.casino.es/video-poker/como-jugar-videopoker/)

En ningún momento de este proyecto se realizarán apuestas con dinero real, siempre serán cantidades ficticias.


## 📈 Versión 1.0.0
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=000) ![HTML](https://img.shields.io/badge/HTML-%23E34F26.svg?logo=html5&logoColor=white) ![CSS](https://img.shields.io/badge/CSS-639?logo=css&logoColor=fff)

Esta es una versión estable del proyecto, desarrollada únicamente con tecnologías Front-End nativas: JavaScript, HTML y CSS. Se ha testado con éxito en diferentes tamaños de pantalla.

La aplicación no necesita procesos de compilación, ni instalación de dependencias, ni conexión a Internet. La única excepción es el enlace al tutorial en vídeo, pero no impide jugar.

Actualmente se puede jugar perfectamente entendiendo cómo se forman las jugadas del póker (manos), pero todavía no se han implementado estas funcionalidades:
- Posibilidad de realizar apuestas.
- Posibilidad de jugar con comodines.
- Modalidades distintas a la actual.
- Juego de "Doble o Nada" tras ganar.
- Tipo de juego multimano (*multi-hand*).


## 🎮 Jugar *online*
![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-121013?logo=github&logoColor=white)

Gracias al despliegue en GitHub Pages, se puede jugar aquí:

👉 https://almagarinos.github.io/video-poker/ 👈


## 💻 Instalación local

![Git](https://img.shields.io/badge/Git-F05032?logo=git&logoColor=fff)

### Clonar repositorio ⬇️

Si se tiene instalado [Git](https://git-scm.com/), sólo hay que usar los siguientes comandos en un terminal, dentro de la ruta del directorio donde se quiera descargar el juego:
```bash
git clone https://github.com/almagarinos/video-poker   # Descarga el proyecto
video-poker\index.html                 # Ejecuta el juego en un navegador web
```

### Descargar fichero 🗂️
Se puede obtener todo el proyecto comprimido en [este ZIP](https://github.com/almagarinos/video-poker/archive/refs/heads/main.zip). Descomprímase su contenido dentro del directorio donde se quiera ubicar el juego, para luego abrir el archivo **index.html** en un navegador web.


## 📂 Estructura del proyecto

```sh
video-poker/
│
├── assets/
│   │
│   ├── css/
│   │   └── styles.css          # Estilos propios de la aplicación
│   │
│   ├── icon/
│   │   └── ...                 # Archivos de favicon, generados en https://favicon.io/
│   │
│   └── js/
│       └── app.js              # Lógica principal del juego, incluye comentarios
│
└── index.html                  # Punto de entrada de la aplicación
```


## 📒 Reglas del juego
Se basan en la misma jerarquía de jugadas o clasificación de manos del póker. En este caso sólo hay que lograr una combinación de cartas que puntúe, desde una pareja de jotas o mejor, de ahí el nombre de *Jacks or Better*. 

### Ver videotutorial ▶️

Se puede visualizar [este vídeo](https://www.youtube.com/watch?v=aJfdBxIQaiU) de 6 minutos, perfectamente explicado, relativo a [esta guía](https://www.casino.es/video-poker/) aún más completa.


## ❓ Glosario y nomenclatura

Cada naipe de la baraja francesa tiene un índice y un palo. Los índices son los números del 2 al 10, los ases y las figuras.

### Ases y figuras de la baraja 🃏
- As - *Ace*: **A**
- Jota - *Jack*: **J**
- Reina - *Queen*: **Q**
- Rey - *King*: **K**

### Palos de la baraja 🎴
- Tréboles - *Clubs*: ♣️
- Diamantes - *Diamonds*: ♦️
- Picas - *Spades*: ♠️
- Corazones - *Hearts*: ♥️

Todo lo anterior facilitará entender el nombre de las cartas, que siguen el patrón `[índice][palo]`. Por ejemplo:
- **8♥️** es el ocho de corazones.
- **10♣️** es el diez de tréboles.
- **A♦️** es el as de diamantes.
- **Q♠️** es la reina de picas.


## 🔬 Cobertura de pruebas

Se puede forzar la no aleatoriedad del reparto de las cartas para poder hacer pruebas de casuísticas concretas.

Para ello, búsquese "pruebas" en el archivo `video-poker/assets/js/app.js` para encontrar este comentario:

```JS
// Descomentar lo siguiente permite hacer pruebas
```

Siguiendo el patrón descrito anteriormente para nombrar las cartas, se pueden provocar las manos deseadas para cubrir todas las posibilidades en el testeo de la aplicación. Por ejemplo, si dejamos las siguientes líneas descomentadas tal que así:

```JS
hand = [
    {value: '5', suit: '♣️'},
    {value: '3', suit: '♦️'},
    {value: '4', suit: '♠️'},
    {value: '2', suit: '♥️'},
    {value: 'A', suit: '♣️'}
];
```

Entonces, la mano de cartas que se reparte es exactamente la indicada en ese código. Si no descartamos ninguna carta, la jugada que se evalúa es esa misma, comprobando que la aplicación responde a las reglas. En el ejemplo anterior se tiene una escalera.