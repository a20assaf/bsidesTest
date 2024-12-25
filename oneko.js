(function oneko() {
    const nekoEl = document.createElement("div");
    const trailContainer = document.createElement("div");
    let nekoPosX = 32;
    let nekoPosY = 32;
    let mousePosX = 0;
    let mousePosY = 0;
    let frameCount = 0;
    const nekoSpeed = 10;
    const jordanColors = ["#ff0000", "#ffffff", "#000000", "#007a3d"]; // Jordan flag colors
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
      nekoEl.style.width = "32px";
      nekoEl.style.height = "32px";
      nekoEl.style.position = "absolute"; // Change to absolute
      nekoEl.style.backgroundImage = "url('./oneko.gif')";
      nekoEl.style.imageRendering = "pixelated";
      nekoEl.style.left = "16px";
      nekoEl.style.top = "16px";
      nekoEl.style.zIndex = "10"; // Ensure cat is above the stars
  
      trailContainer.id = "oneko-trails";
      trailContainer.style.position = "absolute"; // Absolute for proper placement
      trailContainer.style.top = "0";
      trailContainer.style.left = "0";
      trailContainer.style.width = "100%";
      trailContainer.style.height = "100%";
      trailContainer.style.pointerEvents = "none";
      trailContainer.style.zIndex = "0"; // Stars appear under the cat
  
      document.body.appendChild(trailContainer);
      document.body.appendChild(nekoEl);
  
      document.addEventListener("mousemove", (event) => {
        // Adjust mouse position relative to the scroll
        mousePosX = event.pageX;
        mousePosY = event.pageY;
      });
  
      window.onekoInterval = setInterval(frame, 100);
    }
  
    function createSevenPointedStar(size) {
      const outerRadius = size;
      const innerRadius = size * 0.5;
      const points = 7;
      const angleStep = (2 * Math.PI) / points;
      let path = "";
  
      for (let i = 0; i < points * 2; i++) {
        const radius = i % 2 === 0 ? outerRadius : innerRadius;
        const angle = i * angleStep * 0.5;
        const x = 50 + radius * Math.cos(angle);
        const y = 50 + radius * Math.sin(angle);
        path += `${i === 0 ? "M" : "L"}${x},${y} `;
      }
  
      path += "Z"; // Close the path
      return path;
    }
  
    function createTrail(x, y) {
      const star = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  
      star.setAttribute("width", "32");
      star.setAttribute("height", "32");
      star.setAttribute("viewBox", "0 0 100 100");
      star.style.position = "absolute";
      star.style.left = `${x - 16}px`;
      star.style.top = `${y - 16}px`;
      star.style.opacity = "1";
      star.style.transition = "opacity 1s ease-out, transform 1s ease-out";
      star.style.transform = "scale(1)";
      star.style.zIndex = "0";
  
      path.setAttribute("d", createSevenPointedStar(40));
      path.setAttribute("fill", jordanColors[colorIndex]);
      star.appendChild(path);
  
      trailContainer.appendChild(star);
  
      colorIndex = (colorIndex + 1) % jordanColors.length;
  
      setTimeout(() => {
        star.style.opacity = "0";
        star.style.transform = "scale(0.5)";
        setTimeout(() => {
          if (star.parentNode) trailContainer.removeChild(star);
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
  
      if (distance < nekoSpeed || distance < 48) {
        idleTime += 1;
        if (idleTime > 10) setSprite("idle", frameCount);
        return;
      }
  
      idleTime = 0;
  
      nekoPosX -= (diffX / distance) * nekoSpeed;
      nekoPosY -= (diffY / distance) * nekoSpeed;
  
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
  