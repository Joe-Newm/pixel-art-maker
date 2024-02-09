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
    
  container.appendChild(div);
}}

container.addEventListener("mousedown", function (event) {
  event.preventDefault()
  draw = true;
  }
  
);
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
