import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
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
  }

  let notSorted = [];
  cars.forEach((el) => notSorted.push(el));

  function callFilter(param, equally, value) {
    console.log(param);
    let forSorting = [];
    switch (equally) {
      case 'equally':
        if (param === 'name') {
          for (let i = 0; i < cars.length; i++) {
            if (cars[i].name.toLowerCase() === value.toLowerCase()) {
              forSorting.push(cars[i]);
              return setCars(forSorting);
            }
          }
          getDataCars();
          forSorting = [];
        } else if (param === 'counter') {
          for (let i = 0; i < cars.length; i++) {
            if (cars[i].counter.toString() === value) {
              forSorting.push(cars[i]);
              return setCars(forSorting);
            }
          }
          getDataCars();
          forSorting = [];
        } else if (param === 'track') {
          for (let i = 0; i < cars.length; i++) {
            if (cars[i].track === value) {
              forSorting.push(cars[i]);
              return setCars(forSorting);
            }
          }
          getDataCars();
          forSorting = [];
        }
        break;

      case 'include':
        for (let key of cars) {
          if ()
          forSorting.push(key);
          setCars(forSorting);
        }
        getDataCars();
        forSorting = [];
        break;

      default:
        break;
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
        {param}
        {equally}
        {input}
        <table>
          <tbody>
            <tr>
              <td>Дата</td>
              <td>Название</td>
              <td>Счётчик</td>
              <td>Километраж</td>
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

      {/* <button onClick={() => sortToMin()}>От большего к меньшему</button>
      <button onClick={() => sortToMax()}>От меньшего к большему</button> */}
    </>
  );
}

export default App;
