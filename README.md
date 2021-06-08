# Proyecto Final Desarrollo Web CoderHouse
Proyecto Final Curso Desarrollo Web Coder House

# Dependencias Iniciales
 ## Instalación paso a paso para procesar CSS a SASS
   Para la clase de SASS, se necesitará el procesador de CSS. El mismo cuenta con dos componentes:
   NodeJS es un entorno en tiempo de ejecución multiplataforma, de código abierto, para la capa del servidor que permitirá compilar el código
   NPM es el Gestor de Paquetes de Node para JavaScript.  En conjunto que permitirá compilar el archivo SASS a CSS.

  ## Pasos a Seguir:

   1- Instalar nodejs

   - Windows: 
        Para compilar Sass vía la línea de comandos, primero necesitamos instalar NodeJS. Descárgalo del sitio oficial nodejs.org, abre el paquete y sigue el asistente de  instalación. [Video de Ejemplo.](https://www.youtube.com/watch?v=v0x1Ku5Tgac)

        Verificar que esté instalado por la terminal. En Inicio -> CMD -> escribir node -v y se verá la versión del node.
        ![La descripción de la imagen por si no carga](https://github.com/manteniendowordpress/ProyectoFinalJavaScriptCoderHouse/blob/develop/images/readme/imagen01.png)

   - MAC:
  	    Para compilar Sass vía la línea de comandos, primero necesitamos instalar NodeJS. Descárgalo del sitio oficial nodejs.org, abre el paquete y sigue el asistente de  instalación. [Video Ejemplo](https://www.youtube.com/watch?v=j4cWEDyQ-FM) para la instalación en MAC. Se debe verificar la instalación igualmente.

   - LINUX:
  	    En linux lo puedes hacer desde el modo consola, con el comando de sudo apt-get install nodejs o descargarlo del sitio oficial nodejs.org e instalar el paquete. De igual forma  verificar la versión. [Página guía](https://www.digitalocean.com/community/tutorials/como-instalar-node-js-en-ubuntu-18-04-es)

  2- Instalar npm

   - Cuando instalas NodeJS desde la página, éste trae el npm instalado. Se debe verificar esto por la terminal.
   ![La descripción de la imagen por si no carga](https://github.com/manteniendowordpress/ProyectoFinalJavaScriptCoderHouse/blob/develop/images/readme/imagen02.png)
  - Para inicializar un proyecto en Sass con NPM, abre tu terminal y CD (cambia de directorio) a tu directorio de proyecto. 
  - Si usas Linux e instalaste el NodeJs por consola debes ejecutar sudo apt-get install npm, para terminar la instalación.
  - [Verificar si todo está instalado](https://www.npmjs.com/get-npm)
      
 3- Ingresar al directorio del repositorio
   ![La descripción de la imagen por si no carga](https://github.com/manteniendowordpress/ProyectoFinalJavaScriptCoderHouse/blob/develop/images/readme/imagen03.png)
      
 4- Iniciar el npm, con npm init
  - Una vez en el directorio correcto, ejecuta el comando npm init. Se te pedirá responder varias preguntas sobre el proyecto, después de las cuales NPM generará un archivo package. json en tu directorio.
  ![La descripción de la imagen por si no carga](https://github.com/manteniendowordpress/ProyectoFinalJavaScriptCoderHouse/blob/develop/images/readme/imagen04.gif)

 5- Instalar el nodemon:
  - El nodemon es el que va a monitorear los cambios en el código fuente, nuestro SASS,  que se está desarrollando y automáticamente reinicia el servidor para generar el CSS.  
  - Node-sass se usará para compilar tus archivos scss en archivos css. 
  - Nodemon es algo que usaremos para ver los cambios en nuestros archivos scss. 
  - Normalmente, se usa para detectar cambios en el código Node.js del lado del servidor.
  - Para instalar nuestras dependencias (node-sass y nodemon) ejecutaremos el siguiente comando en la terminal:  npm install -D node-sass nodemon
  - Al final se observa que se creó la carpeta de node_modules y el archivo package-lock.json
  
  ![La descripción de la imagen por si no carga](https://github.com/manteniendowordpress/ProyectoFinalJavaScriptCoderHouse/blob/develop/images/readme/imagen05.gif)

 6- Crear la carpeta SCSS y CSS y sus archivos respectivos, para llevar un orden, o en su defecto el archivo .css y el .scss

  ![La descripción de la imagen por si no carga](https://github.com/manteniendowordpress/ProyectoFinalJavaScriptCoderHouse/blob/develop/images/readme/imagen06.png)

 7- Editar el package.json e insertar las líneas líneas dentro de scripts (ejemplo línea 8 y 9):
   a) "build-css": "node-sass --include-path scss scss/miarchivoSCSS.scss css/miarchivoCSS.css",
   b) "watch-css": "nodemon -e scss -x \"npm 	run build-css\""
   Nota: Sustituir por el nombres de sus carpetas y archivos lo subrayado.
      
 8- En éstas se indica cuál será el archivo inicial de SCSS y adónde va a compilar el .css
 9- Compilar: npm run build-css
 10- Escuchar los cambios sin refresh: npm run watch-css
 
# Rama por defecto:
  - develop
# Rama protegida o de produccción:
  - master
# Colaboraciones
  - Si quieres colaborar en el proyecto, puedes clonarlo y generarte una rama donde apliques tus mejoras o sugerencias.
  - la rama deberá tener un formato similar a este: feature/tu_nombre/nombre_de_la_rama. Donde nombre_de_la_rama, debiera ser algo que refiera a la mejora o cambio a realizar.
