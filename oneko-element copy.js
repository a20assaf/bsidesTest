(function oneko() {
  const nekoEl = document.createElement("div");
  const trailContainer = document.createElement("div");
  let nekoPosX = 32;
  let nekoPosY = 32;
  let mousePosX = 0;
  let mousePosY = 0;
  let frameCount = 0;
  const nekoSpeed = 10;
  const jordanColors = ["#ff0000", "#ffffff", "#000000", "#007a3d"];
  let colorIndex = 0;

  const spriteSets = {
    idle: [[-3, -3]],
    alert: [[-7, -3]],
    scratch: [
      [-5, 0],
      [-6, 0],
      [-7, 0],
    ],
    tired: [[-3, -2]],
    sleeping: [
      [-2, 0],
      [-2, -1],
    ],
    N: [
      [-1, -2],
      [-1, -3],
    ],
    NE: [
      [0, -2],
      [0, -3],
    ],
    E: [
      [-3, 0],
      [-3, -1],
    ],
    SE: [
      [-5, -1],
      [-5, -2],
    ],
    S: [
      [-6, -3],
      [-7, -2],
    ],
    SW: [
      [-5, -3],
      [-6, -1],
    ],
    W: [
      [-4, -2],
      [-4, -3],
    ],
    NW: [
      [-1, 0],
      [-1, -1],
    ],
  };

  function create() {
    nekoEl.id = "oneko";
    trailContainer.id = "oneko-trails";

    document.body.appendChild(trailContainer);
    document.body.appendChild(nekoEl);

    window.onekoInterval = setInterval(frame, 100);
  }

  function createTrail(x, y) {
    const trail = document.createElement("div");
    trail.style.position = "absolute";
    trail.style.width = "15px";
    trail.style.height = "15px";
    trail.style.borderRadius = "50%";
    trail.style.backgroundColor = jordanColors[colorIndex];
    trail.style.left = `${x - 7}px`;
    trail.style.top = `${y - 7}px`;
    trail.style.opacity = "1";
    trail.style.transition = "opacity 1s ease-out, transform 1s ease-out";
    trailContainer.appendChild(trail);

    colorIndex = (colorIndex + 1) % jordanColors.length;

    setTimeout(() => {
      trail.style.opacity = "0";
      trail.style.transform = "scale(0.5)";
      setTimeout(() => {
        if (trail.parentNode) trailContainer.removeChild(trail);
      }, 1000);
    }, 100);
  }

  function setSprite(name, frame) {
    const sprite = spriteSets[name][frame % spriteSets[name].length];
    nekoEl.style.backgroundPosition = `${sprite[0] * 32}px ${sprite[1] * 32}px`;
  }

  function frame() {
    frameCount += 1;
    const diffX = nekoPosX - mousePosX;
    const diffY = nekoPosY - mousePosY;
    const distance = Math.sqrt(diffX ** 2 + diffY ** 2);

    if (distance > nekoSpeed) {
      nekoPosX -= (diffX / distance) * nekoSpeed;
      nekoPosY -= (diffY / distance) * nekoSpeed;
    }

    createTrail(nekoPosX, nekoPosY);

    let direction = diffY / distance > 0.5 ? "N" : "";
    direction += diffY / distance < -0.5 ? "S" : "";
    direction += diffX / distance > 0.5 ? "W" : "";
    direction += diffX / distance < -0.5 ? "E" : "";

    setSprite(direction || "idle", frameCount);

    nekoEl.style.left = `${nekoPosX - 16}px`;
    nekoEl.style.top = `${nekoPosY - 16}px`;
  }

  create();
})();
