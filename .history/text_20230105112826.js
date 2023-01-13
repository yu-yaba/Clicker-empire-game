const config = {
    initialForm : document.getElementById("initial-form"),
    mainPage : document.getElementById("main-page"),
};

class UserAccount {
    constructor(name, age, days, money){
        this.name = name;
        this.age = age;
        this.days = days;
        this.money = money;
    }
};

class Item {
    constructor(name, imgUrl, price, profit, numPossession, purchaseLimit){
        this.name = name;
        this.imgUrl = imgUrl;
        this.price = price;
        this.profit = profit;
        this.numPossession = numPossession;
        this.purchaseLimit = purchaseLimit;
    }
};

let items = [
    new 
]

