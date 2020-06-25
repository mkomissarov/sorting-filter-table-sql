//###################################################################
//Пример сортировки (например, отфильтрованных) по значению Counter
//для реализации перенесите код в App.js
//###################################################################

let forSorting = [];
cars.forEach((el) => forSorting.push(el));

//От большего к меньшему
function sortToMin() {
  let x = {};
  for (let j = forSorting.length - 1; j > 0; j--) {
    for (let i = 0; i < j; i++) {
      if (forSorting[i].counter >= forSorting[i + 1].counter) {
        console.log('Уже отсортировано');
      } else {
        if (forSorting[i].counter <= forSorting[i + 1].counter)
          x = forSorting[i];
        forSorting[i] = forSorting[i + 1];
        forSorting[i + 1] = x;
      }
    }
  }
  setCars(forSorting);
}

//От меньшего к большему
function sortToMax() {
  let x = {};
  for (let j = forSorting.length - 1; j > 0; j--) {
    for (let i = 0; i < j; i++) {
      if (forSorting[i].counter <= forSorting[i + 1].counter) {
        console.log('Уже отсортировано');
      } else {
        if (forSorting[i].counter >= forSorting[i + 1].counter)
          x = forSorting[i + 1];
        forSorting[i + 1] = forSorting[i];
        forSorting[i] = x;
      }
    }
  }
  setCars(forSorting);
}
