// Lista de blogs de ejemplo
const BLOGS = [
  {
    id: "b1",
    titulo: "Guía para armar tu primer setup 🎮🖥️",
    descripcion:
      "Descubre los mejores consejos para armar tu setup gamer ideal y darle a tu rendimiento un LEVEL UP.",
    imagen: "assets/img/blog/b1.jpg",
    contenido:
      "<p style='text-align: justify;'>¿Quieres armar tu propio setup gamer pero no sabes por dónde empezar? Tranquilo, aquí encontrarás una guía completa para llevar tu espacio de juego al siguiente nivel 🚀. Lo primero que debes considerar es tu <strong>PC</strong>: procura que cuente con un <strong>procesador</strong> de gama media o alta (por ejemplo, un Intel Core i5 o Ryzen 5 en adelante), una <strong>tarjeta gráfica</strong> capaz de mover tus juegos favoritos sin problemas (como una NVIDIA GTX 1660 Super o una RTX 3060), y al menos <strong>16 GB de memoria RAM</strong>. Si además agregas un <strong>SSD</strong> de 500 GB o más, vas a notar una gran mejora en los tiempos de carga y en la fluidez general del sistema ⚡.</p> \
    <p style='text-align: justify;'>Otro punto clave es el <strong>monitor</strong>. Si disfrutas de juegos competitivos, especialmente shooters, busca un panel con al menos <strong>144Hz</strong> y un tiempo de respuesta de 1 ms, ya que eso puede marcar la diferencia en partidas rápidas. También puedes optar por una pantalla curva de 27 pulgadas, que brinda una experiencia más inmersiva y envolvente. En cuanto a los <strong>periféricos</strong>, un <strong>teclado mecánico</strong> con switches resistentes, un <strong>mouse</strong> ergonómico con <strong>DPI ajustable</strong> (por ejemplo, entre 800 y 12.000) y unos <strong>auriculares</strong> con sonido envolvente 7.1 son herramientas que no solo mejoran la comodidad, sino también tu rendimiento en cada partida 🎧⌨️.</p> \
    <p style='text-align: justify;'>La <strong>silla gamer</strong> es otro elemento fundamental. Pasarás varias horas sentado, por lo que elegir una que sea ergonómica, ajustable y cómoda es una inversión en tu salud y bienestar a largo plazo. Para complementar, la <strong>iluminación RGB</strong> 🌈 puede darle un estilo único a tu espacio. Aunque no aumente tus FPS, sí crea un ambiente atractivo que hace más entretenido el momento de jugar. Finalmente, recuerda mantener el orden: usar soportes para el <strong>monitor</strong>, organizar los <strong>cables</strong> y dejar el escritorio despejado contribuye a mejorar tu concentración y disfrutar más de la experiencia de juego.</p> \
    <p style='text-align: justify;'>Lo importante es que no necesitas armar todo tu setup de una sola vez. Puedes ir avanzando poco a poco, de acuerdo con tu presupuesto y necesidades. Si quieres orientación para elegir los mejores componentes, en nuestra tienda encontrarás todo lo que necesitas para transformar tu espacio en un verdadero centro gamer 🙌.</p>",
  },
  {
    id: "b2",
    titulo: "Top 5 juegos de mesa familiares 🎲👨‍👩‍👧‍👦",
    descripcion:
      "Los mejores juegos de mesa para compartir y divertirse en casa con la familia y los amigos.",
    imagen: "assets/img/blog/b2.jpg",
    contenido:
      "<p style='text-align: justify;'>Los juegos de mesa son una excelente forma de reunirse y compartir en familia. Aquí te dejamos una selección con distintas opciones, ideales para grandes y chicos, que harán que cada tarde sea más entretenida 🎲.</p> \
    <p style='text-align: justify;'><strong>Monopoly</strong>: un clásico infaltable que pone a prueba tu habilidad para negociar y administrar dinero. Es perfecto para pasar horas en familia entre risas, estrategias y, a veces, discusiones divertidas 💸.</p> \
    <p style='text-align: justify;'><strong>Uno</strong>: simple, rápido y dinámico. Este juego de cartas es ideal para todas las edades y siempre garantiza emoción, sobre todo cuando alguien se queda con una sola carta y grita ¡UNO! 🃏.</p> \
    <p style='text-align: justify;'><strong>Catan</strong>: una opción más moderna en la que deberás construir pueblos, rutas y comerciar recursos. Es una excelente manera de aprender a planificar y pensar estratégicamente, sin perder la diversión.</p> \
    <p style='text-align: justify;'><strong>Dixit</strong>: un juego creativo donde las ilustraciones son las protagonistas. Perfecto para estimular la imaginación y disfrutar de historias únicas en cada partida ✨.</p> \
    <p style='text-align: justify;'><strong>Jenga</strong>: sencillo y emocionante. Solo necesitas buen pulso y concentración para evitar que la torre se derrumbe. Es un favorito en reuniones familiares porque todos pueden participar fácilmente.</p> \
    <p style='text-align: justify;'>Con estas opciones tienes variedad para elegir según el ánimo del momento: estrategia, azar, creatividad o destreza. Lo importante es disfrutar del tiempo juntos y crear recuerdos inolvidables en familia 🙌.</p>",
  },
  {
    id: "b3",
    titulo: "Mejores headset del 2025 🎧🎤",
    descripcion:
      "Encuentra algunos consejos para escoger los mejores auriculares de la escena gamer en el 2025.",
    imagen: "assets/img/blog/b3.jpg",
    contenido:
      "<p style='text-align: justify;'>Elegir unos buenos <strong>auriculares gamer</strong> puede marcar la diferencia entre una experiencia de juego común y una realmente inmersiva. El 2025 trae modelos muy completos, pero aquí te dejamos los puntos más importantes que deberías considerar antes de comprar.</p> \
    <p style='text-align: justify;'><strong>Calidad de sonido</strong>: busca auriculares con sonido envolvente 7.1 o al menos estéreo de alta fidelidad. Esto permite ubicar con precisión los pasos, disparos y efectos del juego, dándote una ventaja en partidas competitivas.</p> \
    <p style='text-align: justify;'><strong>Micrófono</strong>: un buen micrófono es clave para la comunicación en equipo. Prefiere aquellos con cancelación de ruido, que filtran sonidos externos para que tu voz se escuche clara y sin interferencias.</p> \
    <p style='text-align: justify;'><strong>Comodidad</strong>: recuerda que pasarás varias horas con ellos puestos. Busca modelos con almohadillas acolchadas, diadema ajustable y materiales transpirables para evitar molestias en sesiones largas.</p> \
    <p style='text-align: justify;'><strong>Conectividad</strong>: hoy existen opciones inalámbricas con baja latencia que funcionan perfecto, aunque los modelos con cable siguen siendo más confiables y sin cortes. Considera qué se adapta mejor a tu estilo de juego.</p> \
    <p style='text-align: justify;'><strong>Relación calidad-precio</strong>: no es necesario gastar una fortuna. En el rango medio (entre 60 y 120 USD) puedes encontrar auriculares con muy buen rendimiento, pensados tanto para principiantes como para jugadores avanzados.</p> \
    <p style='text-align: justify;'>En resumen, los mejores auriculares gamer del 2025 son aquellos que combinan un sonido claro, comodidad y buen precio. Evalúa qué aspectos son más importantes para ti y elige el modelo que te acompañará en tus próximas partidas 🎧.</p>",
  },
];
window.BLOGS = BLOGS;
