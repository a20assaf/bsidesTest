/* Cursor Trail Effect */
const cursorTrails = document.querySelectorAll('.cursor-trail');
let mouseX = 0, mouseY = 0, trailCoords = [];

// Track mouse movement
document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

// Animate the cursor trails
function animateTrails() {
  trailCoords.unshift({ x: mouseX, y: mouseY });

  cursorTrails.forEach((trail, index) => {
    const coord = trailCoords[index * 3];
    if (coord) {
      trail.style.left = `${coord.x}px`;
      trail.style.top = `${coord.y}px`;
    }
  });

  if (trailCoords.length > 100) trailCoords.pop();

  requestAnimationFrame(animateTrails);
}
animateTrails();

/* Matrix Rain Effect */
function createMatrixRain() {
  const matrix = document.getElementById('matrix');
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*';
  const columns = Math.floor(window.innerWidth / 20);

  for (let i = 0; i < columns; i++) {
    const column = document.createElement('div');
    column.className = 'matrix-column';
    column.style.left = `${i * 20}px`;
    column.style.animationDuration = `${Math.random() * 3 + 2}s`;

    let content = '';
    for (let j = 0; j < 50; j++) {
      const char = characters[Math.floor(Math.random() * characters.length)];
      content += `<span>${char}</span><br>`;
    }
    column.innerHTML = content;
    matrix.appendChild(column);
  }
}
createMatrixRain();

// Recreate matrix rain on window resize (debounced)
let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    const matrix = document.getElementById('matrix');
    matrix.innerHTML = '';
    createMatrixRain();
  }, 300);
});

/* Navbar Show/Hide on Mouse Movement */
const navbar = document.querySelector('.navbar');
let navbarTimeout;

function showNavbar() {
  navbar.classList.add('visible');

  // Reset hide timeout
  clearTimeout(navbarTimeout);
  navbarTimeout = setTimeout(() => {
    navbar.classList.remove('visible');
  }, 3000); // Hide after 3 seconds of inactivity
}

// Show/hide navbar on mouse movement
document.addEventListener('mousemove', showNavbar);

// Show navbar on touch for mobile devices
document.addEventListener('touchstart', showNavbar);

// Hide navbar on scroll
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > lastScrollTop) {
    navbar.classList.remove('visible'); // Scrolling down
  } else {
    navbar.classList.add('visible'); // Scrolling up
  }
  lastScrollTop = Math.max(0, scrollTop); // Prevent negative scrolling
});


document.querySelectorAll('.skill').forEach(skill => {
    const level = skill.getAttribute('data-level');
    skill.querySelector('::after').style.width = level + '%';
});

