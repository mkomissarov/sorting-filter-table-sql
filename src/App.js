import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [defaultCars, setDefaultCars] = useState([]);
  const [cars, setCars] = useState([]);
  const [param, setParam] = useState('');
  const [equally, setEqually] = useState('');
  const [input, setInput] = useState('');

  useEffect(() => {
    getDataCars();
  }, []);

  async function getDataCars() {
    const response = await (await fetch('/getdata')).json();
    setCars(response);
    return setDefaultCars(response);
  }

  let notSorted = [];
  cars.forEach((el) => notSorted.push(el));

  function callFilter(param, equally, value) {
    let forSorting = [];
    // eslint-disable-next-line default-case
    switch (equally) {
      case 'equally':
        if (param === 'name') {
          if (value === '') {
            return getDataCars();
          } else {
            for (let i = 0; i < notSorted.length; i++) {
              if (notSorted[i].name.toLowerCase() !== value.toLowerCase()) {
              } else {
                forSorting.push(notSorted[i]);
                setCars(forSorting);
              }
            }
          }
        } else if (param === 'counter') {
          if (value === '') {
            return getDataCars();
          } else {
            for (let i = 0; i < notSorted.length; i++) {
              if (notSorted[i].counter !== +value) {
              } else {
                forSorting.push(notSorted[i]);
                setCars(forSorting);
              }
            }
          }
        } else if (param === 'track') {
          if (value === '') {
            return getDataCars();
          } else {
            for (let i = 0; i < notSorted.length; i++) {
              if (notSorted[i].track.toLowerCase() !== value.toLowerCase()) {
              } else {
                forSorting.push(notSorted[i]);
                setCars(forSorting);
              }
            }
          }
        }
        break;
      case 'include':
        if (param === 'name') {
          if (value.length > 0) {
            for (let key of cars) {
              if (key.name.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
                forSorting.push(key);
                setCars(forSorting);
              }
            }
          } else {
            getDataCars();
          }
        } else if (param === 'counter') {
          if (value.length > 0) {
            for (let key of cars) {
              if (key.counter.toString().indexOf(value.toString()) >= 0) {
                forSorting.push(key);
                setCars(forSorting);
              }
            }
          } else {
            getDataCars();
          }
        } else if (param === 'track') {
          if (value.length > 0) {
            for (let key of cars) {
              if (key.track.toString().indexOf(value.toString()) >= 0) {
                forSorting.push(key);
                setCars(forSorting);
              }
            }
          } else {
            getDataCars();
          }
        }
        break;
      case 'more':
        if (param === 'counter') {
          if (value === '') {
            return getDataCars();
          } else {
            for (let i = 0; i < notSorted.length; i++) {
              if (notSorted[i].counter < +value) {
              } else {
                forSorting.push(notSorted[i]);
                setCars(forSorting);
              }
            }
          }
        } else if (param === 'track') {
          if (value === '') {
            return getDataCars();
          } else {
            for (let i = 0; i < notSorted.length; i++) {
              if (+notSorted[i].track.replace('km', '') < +value) {
              } else {
                forSorting.push(notSorted[i]);
                setCars(forSorting);
              }
            }
          }
        }
        break;
      case 'less':
        if (param === 'counter') {
          if (value === '') {
            return getDataCars();
          } else {
            for (let i = 0; i < defaultCars.length; i++) {
              if (defaultCars[i].counter > +value) {
              } else {
                forSorting.push(defaultCars[i]);
                setCars(forSorting);
              }
            }
          }
        } else if (param === 'track') {
          if (value === '') {
            return getDataCars();
          } else {
            for (let i = 0; i < defaultCars.length; i++) {
              if (+value > Number(defaultCars[i].track.replace('km', '')))
                forSorting.push(defaultCars[i]);
            }
          }
          setCars(forSorting);
        }
    }
  }

  return (
    <>
      <select onChange={(e) => setParam(e.target.value)}>
        <option value=''>Выбрать...</option>
        <option value='name'>Название</option>
        <option value='counter'>Количество</option>
        <option value='track'>Расстояние</option>
      </select>
      <select onChange={(e) => setEqually(e.target.value)}>
        <option>Выбрать...</option>
        <option value='equally'>Равно</option>
        <option value='include'>Содержит</option>
        <option value='more'>Больше</option>
        <option value='less'>Меньше</option>
      </select>
      <input
        type='text'
        onChange={(e) => {
          return callFilter(param, equally, e.target.value);
        }}
      />
      <div>
        <table>
          <tbody>
            <tr>
              <th>Дата</th>
              <th>Название</th>
              <th>Счётчик</th>
              <th>Километраж</th>
            </tr>
            {cars.map((el) => (
              <tr>
                <td>{el.date}</td>
                <td>{el.name}</td>
                <td>{el.counter}</td>
                <td>{el.track}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* #############################################################
      В случае, если потребуется сортировка, раскомментируйте данный код и удалите этот комментарий.
      Подробнее в buble.js
      #################################################################
      <button onClick={() => sortToMin()}>От большего к меньшему</button>
      <button onClick={() => sortToMax()}>От меньшего к большему</button> */}
    </>
  );
}

export default App;
