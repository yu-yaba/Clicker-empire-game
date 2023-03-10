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

    increaseHamburgerPerClick () {
        return this.hamburger ++;
    }

    addClickProfit () {
        return this.money += this.profitPerClick;
    }

    addSecondsProfit () {
        return this.money += this.profitPerClick;
    }

    reduceBalance (price) {
        return this.money -= price;
    }

    increaseDay () {
        return this.days ++;
    }

    growOld () {
        return this.age ++;
    }

    increasePrice (price, type) {
        if (type == "ability") return this.profitPerClick += price;
        else return this.profitPerSeconds += price;
    }


};

class Item {
    constructor(name, price, purchaseLimit, purchaseQuantity, profit, type, imgUrl){
        this.name = name;
        this.price = price;
        this.purchaseLimit = purchaseLimit;
        this.purchaseQuantity = purchaseQuantity;
        this.profit = profit;
        this.type = type;
        this.imgUrl = imgUrl;
    }

    increasePurchaseQuantity (quantity) {
        this.purchaseQuantity += quantity;
    }

    increaseAssets (quantity) {
        if (this.name == "ETF Stock") {
            this.profit = (this.price * (this.purchaseQuantity + quantity)) * 0.01;
            this.price *= 1.1;
        } else if (this.name == "ETF Bonds") {
            this.profit = (this.price * (this.purchaseQuantity + quantity)) * 0.0007;
        }
        return quantity * this.profit;
    }
};

let items = [
    new Item("Flip machine", 15000, 500, 0, 25, "ability", "https://cdn-icons-png.flaticon.com/512/823/823215.png"),
    new Item("ETF Stock", 300000, Infinity, 0, 0.1, "investment", "https://cdn-icons-png.flaticon.com/512/4222/4222019.png"),
    new Item("ETF Bonds", 300000, Infinity, 0, 0.07, "investment", "https://cdn-icons-png.flaticon.com/512/2601/2601439.png"),
    new Item("Lemonade Stand", 30000, 1000, 0, 30, "realEstate", "https://cdn-icons-png.flaticon.com/512/941/941769.png"),
    new Item("Ice Cream Truck", 100000, 500, 0, 120, "realEstate", "https://cdn-icons-png.flaticon.com/512/3181/3181382.png"),
    new Item("House", 20000000, 100, 0, 32000, "realEstate", "https://cdn-icons-png.flaticon.com/512/619/619153.png"),
    new Item("TownHouse", 40000000, 100, 0, 64000, "realEstate", "https://cdn-icons-png.flaticon.com/512/2590/2590620.png"),
    new Item("Mansion", 250000000, 20, 0, 500000, "realEstate", "https://cdn-icons-png.flaticon.com/512/492/492058.png"),
    new Item("Industrial", 1000000000, 10, 0, 2200000, "realEstate", "https://cdn-icons-png.flaticon.com/512/1258/1258543.png"),
    new Item("Hotel Skyscraper", 10000000000, 5, 0, 25000000, "realEstate", "https://cdn-icons-png.flaticon.com/512/683/683255.png"),
    new Item("Bullet-Speed Sky Railway", 10000000000000, 1, 0, 30000000000, "realEstate", "https://cdn-icons-png.flaticon.com/512/3112/3112932.png")
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

    if (saveData == null) {alert("??????????????????????????????????????????");
        return false;
    } else {
        let loginItems = [];
        for (let i = 0; i < saveData["items"].length; i++) {
            let eachItem = saveData["items"][i];
            loginItems.push(new Item(eachItem["name"], eachItem["imgUrl"], eachItem["any"], eachItem["profit"], eachItem["purchaseQuantity"], eachItem["purchaseLimit"], eachItem["type"]))
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

    let hamburgerCon = document.createElement("div");
    hamburgerCon.classList.add("col-12 col-md-4 text-center d-flex")
    hamburgerCon.innerHTML = `
    <p>${userData.hamburger} Burger</p>
    <p>$${userData.profitPerClick}/click</p>
    <p>$${userData.profitPerSeconds}/days</p>
    <div class="container-fluid">
        <img alt="" src='https://icons.veryicon.com/png/o/food--drinks/flat-color-restaurant-icon/hamburger-8.png' class="hamburger-btn">
    </div>
    `

    hamburgerCon.querySelector(".hamburger-btn").addEventListener("click", function () {
        hamburgerCon.querySelectorAll("p")[0].innerHTML = `${userData.increaseHamburgerPerClick()} Burgers`;
        userInfo.querySelectorAll("h2")[0].innerHTML = `${userData.addClickProfit()}`;
    })

    let itemCon = document.createElement("div");
    itemCon.classList.add("col-12 col-md-8 ")
    itemCon.innerHTML = `
    <div style="overflow: scroll; height: 20em;" >
        <div id="itemList">
        </div>
    </div>
    `

    itemCon.querySelector("#itemList").append(createItemList(userData.belongings, userData));

    let dataCon = document.createElement("div");
    dataCon.classList.add("d-flex", "justify-content-end");
    dataCon.innerHTML = `
    <button class="back-btn">
        <i class="fas fa-undo-alt fa-3x btn-color"></i>
    </button>
    <button class="save-btn">
        <i class="fas fa-save fa-3x btn-color"></i>
    </button>
    `

    dataCon.querySelector(".back-btn").addEventListener("click", function () {
        confirm("???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????")
        if (confirm) {
            clearInterval();
            config.displayNone(mainPage);
            config.displayBlock(initialForm);
            config.innerHTML = "";
        }
    });

    dataCon.querySelector(".save-btn").addEventListener("click", function () {
        let saveData = userData.name;
        userData = JSON.stringify(userData);
        localStorage.setItem(saveData, userData);
        alert("?????????????????????????????????");
        clearInterval();
        config.displayNone(mainPage);
        config.displayBlock(initialForm);
        config.innerHTML = "";
    })

    let processPerSeconds = setInterval(function () {
        userInfo.querySelectorAll("h2")[3].innerHTML = `${userData.increaseDay()} days`;
        userInfo.querySelectorAll("h2")[0].innerHTML = `$ ${userData.addSecondsProfit()}`;

        if (userData.days == 365) {
            userData.days = 1;
            userData.growOld();
            userInfo.querySelectorAll("h2")[2].innerHTML =`${userData.age} years old`
        }
    }, 1000);

    let mainPageCon = document.createElement("div");
    mainPageCon.append(userInfo, hamburgerCon, itemCon, dataCon);
    return mainPageCon;
}

function createItemList (items, item, userData) {
    let eachItemCon = document.createElement("div");
    for (let i = 0; i < items.length; i++) {
        eachItemCon.innerHTML += `
        <div>
            <div>
                <img alt="" src="${items[i].imgUrl}">
            </div>
            <div>
                <h4>${items[i].name}</h4>
                <p>${items[i].price}</p>
                <p>${renderUnit(items[i])}</p>
            </div>
            <div>
                <button class="btn btn-info purchase-btn">?? 1</button>
                <button class="btn btn-primary max-btn">max</button>
            </div>
            <div>
                <h4>${renderNumOfPossession(items[i])}</h4>
            </div>
        </div>
        `
    }
    let maxBtn = eachItemCon.querySelector(".max-btn")
    maxBtn.addEventListener("click", function () {
    let totalAmount = Math.floor(userData.money / item.price);
    let total = Math.floor(userData.money / item.price) * item.price;
    if (total > userData.money) {
        alert("????????????????????????");
    } else if (item.purchaseLimit == item.purchaseQuantity) {
        alert("?????????????????????????????????");
    } else {
        userData.reduceBalance(total);
        userData.increasePrice(item.increaseAssets(parseInt(total)));
        item.increasePurchaseQuantity(totalAmount);
    }
    });

    let purchaseBtn = eachItemCon.querySelector(".purchase-btn");
    purchaseBtn.addEventListener("click", function () {
        if (parseInt(item.price) > userData.money) {
            alert("????????????????????????");
        } else if (item.purchaseLimit == item.purchaseQuantity) {
            alert("?????????????????????????????????");
        } else {
            userData.reduceBalance(item.price);
            userData.increasePrice(item.increaseAssets(parseInt(item.price)));
            item.increasePurchaseQuantity(1);
        }
        
    });
    return eachItemCon;
}

function renderUnit (item) {
    if (item.type == "ability") return `${item.profit}/click`;
    else if (item.type == "ETF Stock") return "0.1%/sec";
    else if (item.type == "ETF Bonds") return "0.07%/sec";
}

function renderNumOfPossession (items) {
    if (items.type == "investment")
}