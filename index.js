const numCols = 8;
const numRows = 8;
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
const tileReveal = (target) => {
  let clickCoords = {
    x: parseInt(target.dataset.row, 0),
    y: parseInt(target.dataset.col, 0)
  };
  if (
    targetsArray.some(
      (coords) => JSON.stringify(coords) === JSON.stringify(clickCoords)
    )
  ) {
    target.classList.add("hit");
    message.classList.remove("hidden");
    message.innerText = "Game Over!";
  } else {
    target.classList.add("empty");
    target.innerText = checkNeighbours(clickCoords);
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

//add clickHandlers
////tile clicks
const addClickHandlers = () => {
  document.querySelectorAll(".tile").forEach((t) =>
    t.addEventListener("click", (e) => {
      tileReveal(e.target);
    })
  );
  ////button click
  document.querySelector("#reset").addEventListener("click", () => reset());
};

const revealHints = (numHints) => {
  let tiles = document.querySelectorAll(".tile");
  for (let i = 0; i < numHints; i++) {
    let randomTile = tiles[Math.floor(Math.random() * tiles.length)];
    //check for mine in square, skip if there is
    let mineHere = targetsArray.some(
      (t) => t.x == randomTile.dataset.row && t.y == randomTile.dataset.col
    );
    mineHere ? console.log("Mine Here") : tileReveal(randomTile);
  }
};

const reset = () => {
  generateField();
  randomiseTargets();
  revealHints(7);
  addClickHandlers();
};

reset();
