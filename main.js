const container = document.querySelector(".container");
const sizeEl = document.querySelector(".size");
const color = document.querySelector(".color");
const resetBtn = document.querySelector(".btn");
const gridBtn = document.querySelector(".toggle-grid");
const saveBtn = document.querySelector(".save-image");
const fillBtn = document.querySelector(".toggle-buttons")


// only draw pixels if variable is true
let draw = false;




function populate(size) {
  // update the --size CSS variable
  container.style.setProperty("--size", size);
  for (let i = 0; i < size * size; i++) {
    const div = document.createElement("div");
    div.classList.add("pixel");
    div.classList.add('border-toggle')
    
    // Draw event listener
    div.addEventListener("mouseover", function () {
      if (!draw) return;
      div.style.backgroundColor = color.value;
    });
    div.addEventListener("mousedown", function () {
      div.style.backgroundColor = color.value;
      
    });
    // Fill bucket event listener
    div.addEventListener('click', () => {
    const fillButtonActivated = fillBtn.classList.contains("button-activated");

    // If the fill button is activated, perform the flood fill
    if (fillButtonActivated) {
      const startPixelIndex = 0;  // You may want to adjust the starting pixel based on user selection
      const newColor = color.value;  // Get the color from the color input

    // Call the flood fill function
    floodFill(startPixelIndex, newColor);
  }
})
  container.appendChild(div);
}}

function saveAsImage() {
  // Use html2canvas to capture the content of the container
  html2canvas(container, {
    scale: window.devicePixelRatio, // Use the device pixel ratio for better quality
    imageSmoothingEnabled: false, // Disable image smoothing for pixel-perfect appearance
  }).then(function (canvas) {
    // Get the data URL of the canvas as a PNG image
    const dataURL = canvas.toDataURL("image/png");

    // Create a link element to trigger the download
    const downloadLink = document.createElement("a");
    downloadLink.href = dataURL;
    downloadLink.download = "grid_image.png";
    document.body.appendChild(downloadLink);

    // Trigger the click event to start the download
    downloadLink.click();

    // Remove the temporary link element from the DOM
    document.body.removeChild(downloadLink);
  });
}

container.addEventListener("mousedown", function (event) {
  event.preventDefault()
  if (fillBtn.classList.contains("button-activated")) {
  draw = false;
  } else {
  draw = true;
  }
  
});
container.addEventListener("mouseup", function () {
  draw = false;
});

// toggle grid Function
let pixelStyle = 0;
function changePixelStyle() {
  const pixels = document.querySelectorAll(".pixel");
  pixels.forEach((pixel) => {
    // Modify the style of each pixel element
    pixel.classList.toggle('border-toggle')
  });
  pixelStyle = pixelStyle === 0 ? 1 : 0;
}

// reset function
function reset() {
  container.innerHTML = "";
  populate(size);
}

// flood fill function
function floodFill(startPixel, newColor) {
  const pixels = document.querySelectorAll(".pixel");
  const originalColor = pixels[startPixel].style.backgroundColor;

  function fill(pixelIndex) {
    const pixel = pixels[pixelIndex];
    if (!pixel || pixel.style.backgroundColor !== originalColor || pixel.style.backgroundColor === newColor) {
      return;
    }

    // Fill the current pixel with the new color
    pixel.style.backgroundColor = newColor;

    fill(pixelIndex + 1);     // Right neighbor
    fill(pixelIndex - 1);     // Left neighbor
    fill(pixelIndex + size);  // Bottom neighbor
    fill(pixelIndex - size);  // Top neighbor
  }

  // Start the flood fill from the clicked pixel
  fill(startPixel);
}


// save button event listener
saveBtn.addEventListener("click", saveAsImage)

// fill button event listener
fillBtn.addEventListener("click", () => {
  fillBtn.classList.toggle("button-activated")
  })



//reset button event listener
resetBtn.addEventListener("click", reset);

// get value of the size input
let size = sizeEl.value;
// Slider event listener
sizeEl.addEventListener("mouseup", function () {
  size = sizeEl.value;
  reset();
});

//grid event listener
gridBtn.addEventListener("click", function () {
  changePixelStyle();
});

populate(size);
