const numCols = 8;
const numRows = 8;
const totalsquares = numCols * numRows;
const numTargets = 10;
let targetsArray = [];
const message = document.querySelector("#message");

const grid = document.querySelector("#grid");

//Create Grid and assign co-ords

const generateField = () => {
  //hide gameover screen
  !message.classList.contains("hidden") && message.classList.add("hidden");

  grid.innerHTML = "";
  targetsArray = [];
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
  while (count < numTargets) {
    let xPoint = Math.floor(Math.random() * numRows);
    let yPoint = Math.floor(Math.random() * numCols);
    if (
      targetsArray.some(
        (item) =>
          JSON.stringify(item) === JSON.stringify({ x: xPoint, y: yPoint })
      )
    ) {
      continue;
    } else {
      let target = { x: xPoint, y: yPoint };
      targetsArray.push(target);
      count++;
    }
  }
};

//tile check and reveal
const tileReveal = (e) => {
  let targetCoords = {
    x: parseInt(e.target.dataset.row, 0),
    y: parseInt(e.target.dataset.col, 0)
  };
  if (
    targetsArray.some(
      (coords) => JSON.stringify(coords) === JSON.stringify(targetCoords)
    )
  ) {
    e.target.classList.add("hit");
    message.classList.remove("hidden");
    message.innerText = "Game Over!";
  } else {
    e.target.classList.add("empty");
    e.target.innerText = checkNeighbours(targetCoords);
  }
};

//count neighbouring mines
const checkNeighbours = (targetCoords) => {
  let { x, y } = targetCoords;

  //check each neighbour
  let activeNeighbours = 0;
  targetsArray.forEach((target) => {
    target.x === x && target.y === y + 1 && activeNeighbours++;
    target.x === x && target.y === y - 1 && activeNeighbours++;
    target.x === x + 1 && target.y === y && activeNeighbours++;
    target.x === x - 1 && target.y === y && activeNeighbours++;
    target.x === x + 1 && target.y === y + 1 && activeNeighbours++;
    target.x === x - 1 && target.y === y - 1 && activeNeighbours++;
    target.x === x + 1 && target.y === y - 1 && activeNeighbours++;
    target.x === x - 1 && target.y === y + 1 && activeNeighbours++;
  });
  return activeNeighbours;
};

const revealHints = () => {
  for (let hintsCount = 0; hintCounts < 5; hints++) {}
};

//add clickHandlers
////tile clicks
const addClickHandlers = () => {
  document
    .querySelectorAll(".tile")
    .forEach((t) => t.addEventListener("click", (e) => tileReveal(e)));

  ////button click
  document.querySelector("#reset").addEventListener("click", () => reset());
};

const reset = () => {
  generateField();
  randomiseTargets();
  addClickHandlers();
};

reset();
