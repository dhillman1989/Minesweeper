const numCols = 8;
const numRows = 8;
const totalsquares = numCols * numRows;
const numTargets = 10;
const targetsArray = [];

const grid = document.querySelector("#grid");

//Create Grid and assign co-ords
const generateField = () => {
  for (let r = 0; r < numRows; r++) {
    grid.innerHTML = grid.innerHTML + `<div class="row"></div>`;
  }
  const rowsList = document.querySelectorAll(".row");

  for (let r = 0; r < rowsList.length; r++) {
    for (let c = 0; c < numCols; c++) {
      rowsList[r].innerHTML =
        rowsList[r].innerHTML +
        `<div class="tile" data-row=` +
        r +
        ` data-col=` +
        c +
        `></div>`;
    }
  }
};

//randomize targets
const randomiseTargets = () => {
  let count = 0;
  console.log(count);
  while (count < numTargets) {
    let xPoint = Math.floor(Math.random() * numCols);
    let yPoint = Math.floor(Math.random() * numRows);
    if (targetsArray.some((item) => item === { x: xPoint, y: yPoint })) {
      continue;
    } else {
      let target = { x: xPoint, y: yPoint };
      targetsArray.push(target);
      count++;
      console.log(targetsArray);
    }
  }
};

//add clickHandlers
const addClickHandlers = () => {
  const tiles = document
    .querySelectorAll(".tile")
    .forEach((t) => t.addEventListener("click", () => console.log("clicked")));
};
const reset = () => {
  generateField();
  randomiseTargets();
  addClickHandlers();
};

reset();
