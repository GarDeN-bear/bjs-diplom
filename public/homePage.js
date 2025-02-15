"use strict";

//Выход из личного кабинета
const logoutButton = new LogoutButton();

logoutButton.action = () => {
    ApiConnector.logout((response) => {
        if (response.success) {
            location.reload();
        }
    });
};

//Получение информации о пользователе
ApiConnector.current((response) => {
    if (response.success) {
        ProfileWidget.showProfile(response.data);
    }
});

//Получение текущих курсов валюты
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

getStocksRequest();
const delay = 1000 * 60;
setInterval(getStocksRequest, delay);

//Операции с деньгами
const moneyManager = new MoneyManager();

function checkResponse(response, msgSuccess, msgFailure) {
    if (response.success) {
        ProfileWidget.showProfile(response.data);
        moneyManager.setMessage(response.success, msgSuccess);
    } else {
        moneyManager.setMessage(response.success, msgFailure);
    }
}

moneyManager.addMoneyCallback = (data) => {
    ApiConnector.addMoney(data, (response) => {
        checkResponse(response, "Пополнение баланса выполнено!", "Пополнение баланса не выполнено!");
    });
};

moneyManager.conversionMoneyCallback = (data) => {
    ApiConnector.convertMoney(data, (response) => {
        checkResponse(response, "Конвертирование валюты выполнено!", "Конвертирование валюты не выполнено!");
    });
};

moneyManager.sendMoneyCallback = (data) => {
    ApiConnector.transferMoney(data, (response) => {
        checkResponse(response, "Перевод валюты выполнен!", "Перевод валюты не выполнен!");
    });
};

//Работа с избранным
const favoritesWidget = new FavoritesWidget();

function updateUsersList(response, msgSuccess, msgFailure) {
    if (response.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
        if (msgSuccess) {
            favoritesWidget.setMessage(response.success, msgSuccess);
        }
    } else {
        if (msgFailure) {
            favoritesWidget.setMessage(response.success, msgFailure);
        }
    }
}

ApiConnector.getFavorites((response) => {
    updateUsersList(response);
});

favoritesWidget.addUserCallback = (data) => {
    ApiConnector.addUserToFavorites(data, (response) => {
        updateUsersList(response, "Добавление пользователя в список избранных выполено!", "Добавление пользователя в список избранных не выполено!");
    });
};

favoritesWidget.removeUserCallback = (data) => {
    console.log("remove");
    ApiConnector.removeUserFromFavorites(data, (response) => {
        updateUsersList(response, "Удаление пользователя из избранного выполено!", "Удаление пользователя из избранного не выполено!");
    });
};
