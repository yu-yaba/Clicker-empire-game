const config = {
    initialForm : document.getElementById("initial-form"),
    mainPage : document.getElementById("main-page"),
    userName : document.getElementById("userName").value,
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
    let userData;
    if (userName == "yuya") player = new UserAccount(userName, 20, 0, 10000000, 100000, 1000, items, 0);
    else userData = new UserAccount (userName, 20, 0, 30000, 0, 0, items, 0);

    displayNone(initialForm);
    displayBlock(mainPage);
    config.mainPage.innerHTML ="";
    config.mainPage.append(createMainPage(player));
}

function loginAccount () {
    let saveData = localStorage.getItem(userName);
    saveData = JSON.parse(saveData);

    if (saveData == null) {alert("データが見つかりませんでした");
        return false;
    } else {
        let loginItems = [];
        for (let i = 0; i < saveData["items"].length; i++) {
            let eachItem = saveData["items"][i];
            loginItems.push(new Item(eachItem["name"], eachItem["imgUrl"], eachItem["any"], eachItem["profit"], eachItem["numPossession"], eachItem["purchaseLimit"], eachItem["type"]))
        }

        let userData = new UserAccount(saveData["name"], saveData["age"], saveData["days"], saveData["money"], saveData["profitPerClick"], saveData["profitPerSeconds"], loginItems, saveData["hamburger"]);
    }

    displayNone(initialForm);
    displayBlock(mainPage);
    config.mainPage.innerHTML = "";
    mainPage.append(createMainPage(userData))
}


function createMainPage (userData) {
    let userInfo = document.createElement("div");
    userInfo.classList.add("col-12", "d-flex", "flex-wrap");
    userInfo.innerHTML = `
    <div class="col-9">
        <h2 class="mr-auto">Balance</h2>
        <h2>${userData.money}</h2>
    </div>
    <div class="col-3">
        <h2>${userData.name}</h2>
        <h2>${userData.age}</h2>
        <h2>${userData.days}</h2>
    </div>
    `

    let hamburgerCon = document.createElement
}