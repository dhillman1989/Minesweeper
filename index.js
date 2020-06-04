const numCols = 8;
const numRows = 8;
const totalsquares = numCols * numRows;

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

//clickHandlers

const reset = () => {
  generateField();
};

reset();
