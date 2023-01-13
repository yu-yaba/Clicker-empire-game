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
    new Item("Flip machine", "https://cdn.pixabay.com/photo/2019/06/30/20/09/grill-4308709_960_720.png", 1000, 25, 0, 500),
    new Item("ETF stock", "https://cdn.pixabay.com/photo/2016/03/31/20/51/chart-1296049_960_720.png", 300000, 0.1, 0, Infinity
    )
]

