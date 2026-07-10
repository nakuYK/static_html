const root = document.documentElement;
const target = { x: window.innerWidth * 0.72, y: window.innerHeight * 0.45 };
const smooth = { ...target };
let rafId = 0;

function setSpotlight(x, y) {
  root.style.setProperty("--mx", `${x}px`);
  root.style.setProperty("--my", `${y}px`);
}

function animateSpotlight() {
  smooth.x += (target.x - smooth.x) * 0.08;
  smooth.y += (target.y - smooth.y) * 0.08;
  setSpotlight(smooth.x, smooth.y);
  rafId = requestAnimationFrame(animateSpotlight);
}

window.addEventListener("pointermove", (event) => {
  target.x = event.clientX;
  target.y = event.clientY;
});

window.addEventListener("resize", () => {
  if (target.x > window.innerWidth || target.y > window.innerHeight) {
    target.x = window.innerWidth * 0.72;
    target.y = window.innerHeight * 0.45;
  }
});

document.querySelectorAll(".button").forEach((button) => {
  button.addEventListener("pointermove", (event) => {
    const rect = button.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    button.style.transform = `translate(${x * 0.08}px, ${y * 0.14}px)`;
  });

  button.addEventListener("pointerleave", () => {
    button.style.transform = "";
  });
});

setSpotlight(smooth.x, smooth.y);
animateSpotlight();

window.addEventListener("beforeunload", () => {
  cancelAnimationFrame(rafId);
});
