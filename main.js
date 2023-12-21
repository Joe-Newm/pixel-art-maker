const container = document.querySelector(".container");
const sizeEl = document.querySelector(".size");
const color = document.querySelector(".color");
const resetBtn = document.querySelector(".btn");
const gridBtn = document.querySelector(".toggle-grid");

let pixelStyle = 0;

// get value of the size input
let size = sizeEl.value;

// only draw pixels if variable is true
let draw = false;

function populate(size) {
  // update the --size CSS variable
  container.style.setProperty("--size", size);
  for (let i = 0; i < size * size; i++) {
    const div = document.createElement("div");
    div.classList.add("pixel");
    div.style.border = "1px solid";
    div.style.borderColor = "gray";

    div.addEventListener("mouseover", function () {
      if (!draw) return;
      div.style.backgroundColor = color.value;
    });
    div.addEventListener("mousedown", function () {
      div.style.backgroundColor = color.value;
    });

    container.appendChild(div);
  }
}

window.addEventListener("mousedown", function () {
  draw = true;
});
window.addEventListener("mouseup", function () {
  draw = false;
});

function changePixelStyle() {
  const pixels = document.querySelectorAll(".pixel");
  pixels.forEach((pixel) => {
    // Modify the style of each pixel element
    pixel.style.border = `${pixelStyle}px solid`;
    pixel.style.borderColor = "gray";
  });
  // Add any other style modifications as needed
  pixelStyle = pixelStyle === 0 ? 1 : 0;
}

//reset button function and listener
function reset() {
  container.innerHTML = "";
  populate(size);
}
resetBtn.addEventListener("click", reset);

// Slider function
sizeEl.addEventListener("mouseup", function () {
  size = sizeEl.value;
  reset();
});

//grid toggle
gridBtn.addEventListener("click", function () {
  changePixelStyle();
});

populate(size);
