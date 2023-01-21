const config = {
    initialForm : document.getElementById("initial-form"),
    mainPage : document.getElementById("main-page"),
    balanceInfo : document.getElementById("balance-info"),
    hamburgerInfo : document.getElementById("hamburger-info"),
    userInfo : document.getElementById("user-info"),
    itemInfo : document.getElementById("item-info"),
    dataInfo : document.getElementById("data-info"),
    userName : document.getElementById("userName"),
};

function displayBlock (ele) {
    ele.classList.remove("d-none");
    ele.classList.add("d-block");
}

function displayNone (ele) {
    ele.classList.remove("d-block");
    ele.classList.add("d-none");
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
        return this.money += this.profitPerSeconds;
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

const itemList = [
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
    if (config.userName.value == "yuya") userData = new UserAccount(yuya, 20, 0, 10000000, 100000, 1000, itemList, 0);
    else userData = new UserAccount (config.userName.value, 20, 0, 30000, 100, 0, itemList, 0);

    displayNone(config.initialForm);
    displayBlock(config.mainPage);
    config.mainPage.innerHTML ="";
    config.mainPage.append(createMainPage(userData));
    return userData;
}

function loginAccount () {
    let saveData = localStorage.getItem(config.userName.value);
    saveData = JSON.parse(saveData);

    if (saveData == null) {alert("データが見つかりませんでした");
        return false;
    } else {
        let loginItems = [];
        for (let i = 0; i < saveData["belongings"].length; i++) {
            let eachItem = saveData["belongings"][i];
            loginItems.push(new Item(eachItem["name"], eachItem["imgUrl"], eachItem["any"], eachItem["profit"], eachItem["purchaseQuantity"], eachItem["purchaseLimit"], eachItem["type"]))
        }

        let userData = new UserAccount(saveData["name"], saveData["age"], saveData["days"], saveData["money"], saveData["profitPerClick"], saveData["profitPerSeconds"], loginItems, saveData["hamburger"]);

    config.mainPage.innerHTML = "";
    displayNone(config.initialForm);
    displayBlock(config.mainPage);
    config.mainPage.append(createMainPage(userData))
    return userData;
    }
}


function createBalanceInfo (userData) {
    let balanceInfoCon = document.createElement("div");
    balanceInfoCon.classList.add("d-flex" ,"justify-content-center");
    balanceInfoCon.innerHTML =`
    <h2>Balance </h2>
    <h2> $${userData.money}</h2>
    `
    return balanceInfoCon;
}

function createUserInfo (userData) {
    let userInfoCon = document.createElement("div");
    userInfoCon.classList.add("d-flex", "flex-wrap");
    userInfoCon.innerHTML = `
    <div>
        <h2>${userData.name}</h2>
        <h2>${userData.age} years old</h2>
        <h2>${userData.days} days</h2>
    </div>
    `
    return userInfoCon;
}

function createHamburger (userData) {
    let hamburgerCon = document.createElement("div");
    hamburgerCon.classList.add("col-12", "col-md-4", "text-center");
    hamburgerCon.innerHTML = `
    <div class="p-0">
        <p>${userData.hamburger} Burger</p>
        <p>$${userData.profitPerClick}/click</p>
        <p>$${userData.profitPerSeconds}/days</p>
    </div>
    <div class="container-fluid">
        <img alt="" src='https://icons.veryicon.com/png/o/food--drinks/flat-color-restaurant-icon/hamburger-8.png' class="hamburger-btn w-50 w-lg-100">
    </div>
    `

    hamburgerCon.querySelector(".hamburger-btn").addEventListener("click", function () {
        hamburgerCon.querySelectorAll("p")[0].innerHTML = `${userData.increaseHamburgerPerClick()} Burgers`;
        config.balanceInfo.querySelectorAll("h2")[1].innerHTML =` $${userData.addClickProfit()}`;
    })
    return hamburgerCon;
}


function createItemList (userData, item) {
    let itemCon = document.createElement("div");
    itemCon.classList.add("col-12", "col-md-8");
    itemCon.innerHTML = `
    <div style="overflow: scroll; height: 20em;" >
        <div id="itemList">
        </div>
    </div>
    `

    let eachItemCon = document.createElement("div");
    for (let i = 0; i < itemList.length; i++) {
        eachItemCon.innerHTML += `
        <div class="d-flex">
            <div>
                <img alt="" src="${itemList[i].imgUrl}" class="col-2 col-md-3" >
            </div>
            <div>
                <h4 class="col-1">${itemList[i].name}</h4>
                <p>${itemList[i].price}</p>
                <p>${renderUnit(itemList[i])}</p>
            </div>
            <div>
                <button class='btn btn-info purchase-btn'>× 1</button>
                <button class="btn btn-primary max-btn">max</button>
            </div>
            <div>
                <h4>${renderNumOfPossession(itemList[i])}</h4>
            </div>
        </div>
        `
    }
    itemCon.querySelector("#itemList").append(eachItemCon);

    let maxBtn = eachItemCon.querySelector(".max-btn")
    maxBtn.addEventListener("click", function () {
    let totalAmount = Math.floor(userData.money / item.price);
    let total = Math.floor(userData.money / item.price) * item.price;
    if (total > userData.money) {
        alert("お金が足りません");
    } else if (item.purchaseLimit == item.purchaseQuantity) {
        alert("これ以上購入できません");
    } else {
        userData.reduceBalance(total);
        userData.increasePrice(item.increaseAssets(parseInt(total)));
        item.increasePurchaseQuantity(totalAmount);
    }
    });

    let purchaseBtn = eachItemCon.querySelector(".purchase-btn");
    purchaseBtn.addEventListener("click", function () {
        if (item.price > userData.money) {
            alert("お金が足りません");
        } else if (item.purchaseLimit == item.purchaseQuantity) {
            alert("これ以上購入できません");
        } else {
            userData.reduceBalance(item.price);
            userData.increasePrice(item.increaseAssets(item.price));
            item.increasePurchaseQuantity(1);
        }
        
    });
    return itemCon;
}



function createData (userData) {
    let dataCon = document.createElement("div");
    dataCon.classList.add("d-flex", "justify-content-end");
    dataCon.innerHTML = `
    <button class="save-btn">
        <i class="fas fa-save fa-3x btn-color"></i>
    </button>
    `

    dataCon.querySelector(".save-btn").addEventListener("click", function () {
        let saveData = userData.name;
        userData = JSON.stringify(userData);
        localStorage.setItem(saveData, userData);
        alert("データを保存しました。");
    })
    return dataCon;
}


function startInterval (userData) {
    let processPerSeconds = setInterval(function () {
        config.hamburgerInfo.querySelectorAll("p").item(1).innerHTML = `[$${userData.profitPerClick}/click]`;
        config.hamburgerInfo.querySelectorAll("p").item(2).innerHTML = `[$${userData.profitPerSeconds}/days]`;
    
        config.userInfo.querySelectorAll("h2")[2].innerHTML = `${userData.increaseDay()} days`;
        config.balanceInfo.querySelectorAll("h2")[1].innerHTML = ` $${userData.addSecondsProfit()}`;

        if (userData.days == 365) {
            userData.days = 1;
            userData.growOld();
            userInfo.querySelectorAll("h2")[2].innerHTML =`${userData.age} years old`
        }
    }, 1000);
}

function createMainPage (userData) {
    config.balanceInfo.append(createBalanceInfo(userData));
    config.userInfo.append(createUserInfo(userData));
    let headerCon = document.createElement("div");
    headerCon.classList.add("row");
    headerCon.append(config.balanceInfo, config.userInfo);

    config.hamburgerInfo.append(createHamburger(userData));
    config.itemInfo.append(createItemList(userData, itemList));
    let bodyCon = document.createElement("div");
    bodyCon.classList.add("row", "justify-content-center");
    bodyCon.append(config.hamburgerInfo, config.itemInfo);

    config.dataInfo.append(createData(userData));
    startInterval(userData);
    config.mainPage.append(headerCon, bodyCon, config.dataInfo)
}



function renderUnit (item) {
    if (item.type == "ability") return `${item.profit}/click`;
    else if (item.type == "ETF Stock") return "0.1%/sec";
    else if (item.type == "ETF Bonds") return "0.07%/sec";
}

function renderNumOfPossession (items) {
    if (items.type == "investment") return "∞";
    else return items.purchaseQuantity + "/" + items.purchaseLimit;
}