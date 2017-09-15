# RolleandoAPP 
[![Build Status][travis-badge]][travis-badge-url]
- - - - - - - - - - - - - - - - - - - - - - - - - - - -
Se trata de una aplicación para gestionar partidas de rol. Tiene un creador de personajes y un gestionador de iniciativas y una parte de un chat que es la que está más avanzada.

La aplicación tiene dos partes la parte front realizada con Angular 4 y la parte del servidor realizada con node.js.
Cada una de estas partes tiene sus propios node_modules y su propio package.json. Por lo que hay que realizar `npm install` dos veces, una en la carpeta raiz y otra
dentro de la carpeta src.

Como usa Typescript hay que compilar el proyecto con el comando `tsc -p src`sobre la carpeta raiz del proyecto.

Una vez compilado hay que lanzar el srvidor con el comando `node server`sobre la carpeta raiz y accediendo al localhost:3333 ya deberia funcionar.

La aplicación está en continuo crecimiento por lo que peude modificarse a lo largo de los dias.

- - - - - - - - - - - - - - - - - - - - - - - - - - - -
