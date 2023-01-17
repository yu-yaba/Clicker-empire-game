const config = {
    initialForm : document.getElementById("initial-form"),
    mainPage : document.getElementById("main-page"),
};

function displayBlock (ele) {
    ele.classList.remove("d-none");
    ele.classList.add("d-block");
}

function displayNone (ele) {
    ele.classList.remove("d-none");
    ele.classList.add("d-block");
}
class UserAccount {
    constructor(name, age, days, money, profitPerClick, profitPerSeconds, belongings, hamburger){
        this.name = name;
        this.age = age;
        this.days = days;
        this.money = money;
        this.profitPerClick = profitPerClick;
        this.profitPerSeconds = profitPerSeconds;
        this.belongings = belongings;
        this.hamburger = hamburger;
    }



};

class Item {
    constructor(name, imgUrl, price, profit, numPossession, purchaseLimit, type){
        this.name = name;
        this.imgUrl = imgUrl;
        this.price = price;
        this.profit = profit;
        this.numPossession = numPossession;
        this.purchaseLimit = purchaseLimit;
        this.type = type;
    }
};

let items = [
    new Item("Flip Machine", "https://cdn.pixabay.com/photo/2019/06/30/20/09/grill-4308709_960_720.png", 1000, 25, 0, 500),
    new Item("ETF Stock", "https://cdn.pixabay.com/photo/2016/03/31/20/51/chart-1296049_960_720.png", 300000, 0.1, 0, Infinity),
    new Item("ETF Bonds", "https://cdn.pixabay.com/photo/2016/03/31/20/51/chart-1296049_960_720.png", 100000, 0.07, 0, Infinity),
    new Item("Lemonade Stand","https://cdn.pixabay.com/photo/2012/04/15/20/36/juice-35236_960_720.png", 30000, 30, 0, 1000),
    new Item("Ice Cream Truck", "https://cdn.pixabay.com/photo/2020/01/30/12/37/ice-cream-4805333_960_720.png", 100000, 120, 0, 500),
    new Item("House", "https://cdn.pixabay.com/photo/2016/03/31/18/42/home-1294564_960_720.png", 2000000, 32000, 0, 100),
    new Item("Town House", "https://cdn.pixabay.com/photo/2019/06/15/22/30/modern-house-4276598_960_720.png", 4000000, 64000, 100),
    new Item("Mansion", "https://cdn.pixabay.com/photo/2017/10/30/20/52/condominium-2903520_960_720.png", 25000000, 500000, 20),
    new Item("Industrial Space", "https://cdn.pixabay.com/photo/2012/05/07/17/35/factory-48781_960_720.png", 1000000000, 2200000, 0, 10),
    new Item("Hotel Skyscraper", "https://cdn.pixabay.com/photo/2012/05/07/18/03/skyscrapers-48853_960_720.png", 10000000000, 25000000, 0, 5),
    new Item("Bullet-Speed Sky Railway", "https://cdn.pixabay.com/photo/2013/07/13/10/21/train-157027_960_720.png", 10000000000000, 30000000000, 0, 1)
]

function registerAccount () {
    let userName = document.getElementById("userName");

    let player;
    if (userName.value == "yuya") player = new UserAccount(userName.value, 20, 0)
}

