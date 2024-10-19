// main.js

// Menú móvil
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuButton && mobileMenu) {
  mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });
}

// Navegación smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Navbar fixed con cambio de color al scroll
const navbar = document.querySelector('nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll <= 0) {
    navbar.classList.remove('nav-shadow');
    return;
  }

  if (currentScroll > lastScroll) {
    navbar.classList.add('nav-shadow');
  }

  lastScroll = currentScroll;
});

// Animaciones de entrada para elementos
const observerOptions = {
  threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-fade-in');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.animate-on-scroll').forEach((element) => {
  observer.observe(element);
});

// Formulario de contacto con validación
const contactForm = document.querySelector('#contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = this.querySelector('[name="name"]').value;
    const email = this.querySelector('[name="email"]').value;
    const message = this.querySelector('[name="message"]').value;

    // Validación básica
    let isValid = true;
    let errors = [];

    if (!name.trim()) {
      errors.push('El nombre es requerido');
      isValid = false;
    }

    if (!email.trim() || !email.includes('@')) {
      errors.push('Email inválido');
      isValid = false;
    }

    if (!message.trim()) {
      errors.push('El mensaje es requerido');
      isValid = false;
    }

    if (!isValid) {
      showErrors(errors);
      return;
    }

    // Simulación de envío
    const submitButton = this.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.textContent = 'Enviando...';

    setTimeout(() => {
      showSuccess();
      this.reset();
      submitButton.disabled = false;
      submitButton.textContent = 'Enviar mensaje';
    }, 2000);
  });
}

// Mostrar errores del formulario
function showErrors(errors) {
  const errorDiv = document.querySelector('#form-errors');
  if (errorDiv) {
    errorDiv.innerHTML = `
            <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                <ul class="list-disc list-inside">
                    ${errors.map(error => `<li>${error}</li>`).join('')}
                </ul>
            </div>
        `;
  }
}

// Mostrar mensaje de éxito
function showSuccess() {
  const successDiv = document.querySelector('#form-success');
  if (successDiv) {
    successDiv.innerHTML = `
            <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                Mensaje enviado con éxito. Nos pondremos en contacto contigo pronto.
            </div>
        `;
    setTimeout(() => {
      successDiv.innerHTML = '';
    }, 5000);
  }
}

// Cargar juegos destacados dinámicamente

const gamesData = [
  {
    title: 'Aventura Espacial',
    description: 'Explora el espacio en esta emocionante aventura.',
    image: 'https://via.placeholder.com/400x200?text=Aventura+Espacial' // Cambia a la URL de la imagen real
  },
  {
    title: 'Carreras Extremas',
    description: 'Compite en las pistas más desafiantes.',
    image: 'https://via.placeholder.com/400x200?text=Carreras+Extremas' // Cambia a la URL de la imagen real
  },
  {
    title: 'Mundo Mágico',
    description: 'Descubre un mundo lleno de magia y misterios.',
    image: 'https://via.placeholder.com/400x200?text=Mundo+Mágico' // Cambia a la URL de la imagen real
  }
];

// Simulación de usuarios y sus bibliotecas de juegos
const users = [
  {
    name: "Matteo",
    library: []
  }
];

// Función para cargar los juegos destacados
function loadGames() {
  const gamesContainer = document.querySelector('#games-container');
  if (gamesContainer) {
    gamesContainer.innerHTML = gamesData.map((game, index) => `
            <div class="bg-gray-800 rounded-lg overflow-hidden hover:scale-105 transition-transform">
                <img src="${game.image}" alt="${game.title}" class="w-full h-48 object-cover">
                <div class="p-6">
                    <h3 class="text-xl font-bold mb-2">${game.title}</h3>
                    <p class="mb-4">${game.description}</p>
                    <button class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600" onclick="addToLibrary(${index})">
                        Agregar a mi biblioteca
                    </button>
                </div>
            </div>
        `).join('');
  }
}

// Función para agregar un juego a la biblioteca del usuario
function addToLibrary(gameIndex) {
  const user = users[0]; // Simulamos que siempre trabajamos con el primer usuario
  const game = gamesData[gameIndex];

  // Agregamos el juego a la biblioteca si no está ya
  if (!user.library.includes(game)) {
    user.library.push(game);
    alert(`${game.title} ha sido agregado a tu biblioteca.`);
  } else {
    alert(`Ya tienes ${game.title} en tu biblioteca.`);
  }
}

// Cargar juegos cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', loadGames);





// Cargar juegos cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', loadGames);

// Sistema de notificaciones
class NotificationSystem {
  constructor() {
    this.container = document.createElement('div');
    this.container.className = 'fixed bottom-4 right-4 z-50 space-y-2';
    document.body.appendChild(this.container);
  }

  show(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `
            p-4 rounded-lg shadow-lg transition-all duration-300 transform translate-x-0
            ${type === 'success' ? 'bg-green-500' : ''}
            ${type === 'error' ? 'bg-red-500' : ''}
            ${type === 'info' ? 'bg-blue-500' : ''}
            text-white
        `;
    notification.textContent = message;

    this.container.appendChild(notification);

    setTimeout(() => {
      notification.style.opacity = '0';
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, 3000);
  }
}

// Inicializar sistema de notificaciones
const notifications = new NotificationSystem();

// Ejemplo de uso:
notifications.show('¡Bienvenido a RedMad!', 'success');
document.addEventListener('DOMContentLoaded', function () {
  const text = "Juega sin límite";
  let index = 0;
  let isDeleting = false;

  function typeWriter() {
    const element = document.getElementById("typewriter-text");

    if (!isDeleting && index < text.length) {
      // Mientras escribe el texto
      element.textContent += text.charAt(index);
      index++;
      setTimeout(typeWriter, 150); // Velocidad de escritura
    } else if (isDeleting && index > 0) {
      // Mientras borra el texto
      element.textContent = text.substring(0, index - 1);
      index--;
      setTimeout(typeWriter, 100); // Velocidad de borrado
    } else if (index === text.length) {
      // Pausa antes de comenzar a borrar
      setTimeout(() => isDeleting = true, 1000); // Pausa antes de borrar
      setTimeout(typeWriter, 150);
    } else if (index === 0 && isDeleting) {
      // Pausa antes de comenzar a escribir de nuevo
      isDeleting = false;
      setTimeout(typeWriter, 500); // Pausa antes de empezar de nuevo
    }
  }

  typeWriter();
});




// Datos de juegos disponibles
