"use strict";

class RatesBoard {
  constructor() {
    this.tableBody = document.querySelector('table.table.rates tbody');
  }

  fillTable(data) {
    Object.keys(data).forEach((key) => {
      const element = data[key];
      this.tableBody.innerHTML += `
      <tr>
        <td>${key}</td>
        <td data-eur-ntc='${element}'>${element}</td>
      </tr>`;
    });
  }

  clearTable() {
    this.tableBody.innerHTML = '';
  }
}


const ratesBoard = new RatesBoard();

function getStocksRequest() {
    ApiConnector.getStocks((response) => {
        if (response.success) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(response.data);
            console.log("2");
        }
    });
}

const delay = 1000 * 60;

setInterval(getStocksRequest, delay);
