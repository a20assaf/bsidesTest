const cursorTrails = document.querySelectorAll('.cursor-trail');
let mouseX = 0, mouseY = 0, trailCoords = [];

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

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

let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    const matrix = document.getElementById('matrix');
    matrix.innerHTML = '';
    createMatrixRain();
  }, 300);
});

const navbar = document.querySelector('.navbar');
let navbarTimeout;

function showNavbar() {
  navbar.classList.add('visible');

  clearTimeout(navbarTimeout);
  navbarTimeout = setTimeout(() => {
    navbar.classList.remove('visible');
  }, 3000);
}

document.addEventListener('mousemove', showNavbar);

document.addEventListener('touchstart', showNavbar);

let lastScrollTop = 0;
window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > lastScrollTop) {
    navbar.classList.remove('visible');
  } else {
    navbar.classList.add('visible');
  }
  lastScrollTop = Math.max(0, scrollTop);
});

document.querySelectorAll('.skill').forEach(skill => {
    const level = skill.getAttribute('data-level');
    skill.querySelector('::after').style.width = level + '%';
});

