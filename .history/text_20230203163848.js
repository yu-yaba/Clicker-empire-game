// 各コンテナーを定数としてまとめました
const config = {
    initialForm : document.getElementById("initial-form"),
    mainPage : document.getElementById("main-page"),
    balanceInfo : document.getElementById("balance-info"),
    hamburgerInfo : document.getElementById("hamburger-info"),
    userInfo : document.getElementById("user-info"),
    itemInfo : document.getElementById("item-info"),
    dataInfo : document.getElementById("data-info"),
    userName : document.getElementById("userName"),
    particles : document.getElementById("particles-js"),
};

// 効果音です
const clickSound = new Audio("sounds/click.mp3");
const x1ButtonSound = new Audio("sounds/money.mp3");
const maxButtonSound = new Audio("sounds/max-button.mp3");
const errorSound = new Audio("sounds/error.mp3");


// ページを表示する関数です
function displayBlock (ele) {
    ele.classList.remove("d-none");
    ele.classList.add("d-block");
}

// ページを非表示する関数です
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

    //itemのtypeによってprofitを変えるメソッドです
    addProfit (profit, type) {
        if (type == "ability") return this.profitPerClick += profit;
        else if (type == "autoClicker") {
            this.profit = this.profitPerClick;
            return this.profitPerSeconds += this.profitPerClick;
        }
        else return this.profitPerSeconds += profit;
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

    //Stockかbondsだった場合、所持量と購入量を足した合計からprofitを産出するメソッドです
    increaseAssets (quantity) {
        if (this.name == "ETF Stock") {
            this.profit = (this.price * (this.purchaseQuantity + quantity)) * 0.001;
            this.price = this.price * 1.1;
        } else if (this.name == "ETF Bonds") {
            this.profit = (this.price * (this.purchaseQuantity + quantity)) * 0.0007;
        } 
        return quantity * this.profit;
    }
};

const itemList = [
    new Item("Flip machine", 100, 500, 0, 2, "ability", "https://cdn-icons-png.flaticon.com/512/5541/5541721.png"),
    new Item("Auto Clicker", 300, 100, 0, 0, "autoClicker", "https://cdn-icons-png.flaticon.com/512/1481/1481125.png"),
    new Item("ETF Stock", 3000, Infinity, 0, 0.01, "investment", "https://cdn-icons-png.flaticon.com/512/7401/7401287.png"),
    new Item("ETF Bonds", 3000, Infinity, 0, 0.007, "investment", "https://cdn-icons-png.flaticon.com/512/9132/9132690.png"),
    new Item("Lemonade Stand", 300, 1000, 0, 30, "realEstate", "https://cdn-icons-png.flaticon.com/512/3227/3227973.png"),
    new Item("Ice Cream Truck", 1000, 500, 0, 120, "realEstate", "https://cdn-icons-png.flaticon.com/512/3165/3165504.png"),
    new Item("House", 200000, 100, 0, 320, "realEstate", "https://cdn-icons-png.flaticon.com/512/2163/2163350.png"),
    new Item("TownHouse", 400000, 100, 0, 640, "realEstate", "https://cdn-icons-png.flaticon.com/512/5348/5348887.png"),
    new Item("Mansion", 2500000, 20, 0, 5000, "realEstate", "https://cdn-icons-png.flaticon.com/512/6309/6309561.png"),
    new Item("Industrial", 10000000, 10, 0, 22000, "realEstate", "https://cdn-icons-png.flaticon.com/512/8384/8384362.png"),
    new Item("Hotel Skyscraper", 100000000, 5, 0, 250000, "realEstate", "https://cdn-icons-png.flaticon.com/512/3190/3190072.png"),
    new Item("Sky Railway", 100000000000, 1, 0, 300000000, "realEstate", "https://cdn-icons-png.flaticon.com/512/4516/4516833.png")
]

//new gameする関数です
function initializeAccount () {
    let userData = "";

//userNameがmillionaireだった場合100万ドルからゲームスタートします
    if (config.userName.value === "millionaire")  userData = new UserAccount("millionaire", 20, 0, 1000000, 100000, 1000, itemList, 0);
    else if (config.userName.value == "") {
        return alert (`名前を入力して下さい`); 
    }
    else userData = new UserAccount (config.userName.value, 20, 0, 100, 1, 0, itemList, 0);

    displayNone(config.initialForm);
    displayBlock(config.mainPage);
    config.mainPage.innerHTML ="";
    config.mainPage.append(createMainPage(userData));
    return userData;
}

//ユーザーがログインする関数です
function loginAccount () {
    let saveData = localStorage.getItem(config.userName.value);
    saveData = JSON.parse(saveData);

//セーブデータがあった場合新しいUserAccountインスタンスに所持アイテムをプッシュします
    if (saveData == null) {alert("データが見つかりませんでした");
        return false;
    } else {
        let loginItems = [];
        for (let i = 0; i < saveData["belongings"].length; i++) {
            let eachItem = saveData["belongings"][i];
            loginItems.push(new Item(eachItem["name"], eachItem["price"], eachItem["purchaseLimit"], eachItem["purchaseQuantity"], eachItem["profit"], eachItem["type"], eachItem["imgUrl"]))
        }

    config.mainPage.innerHTML = "";
    displayNone(config.initialForm);
    displayBlock(config.mainPage);
    config.mainPage.append(createMainPage(saveData))
    return userData;
    }
}

//各コンテナーを作る関数です　

function createBalanceInfo (userData) {
    let balanceInfoCon = document.createElement("div");
    balanceInfoCon.classList.add();
    balanceInfoCon.innerHTML =`
        <h2>Balance</h2>
        <h2> $${userData.money}</h2>
    `
    return balanceInfoCon;
}

function createUserInfo (userData) {
    let userInfoCon = document.createElement("div");
    userInfoCon.classList.add("d-flex", "flex-wrap", "justify-content-between");
    userInfoCon.innerHTML = `
        <h2 class="col-4">${userData.name}</h2>
        <h2 class="col-4">${userData.age} years old</h2>
        <h2 class="col-4">${userData.days} days</h2>
    `
    return userInfoCon;
}

function createHamburger (userData) {
    let hamburgerCon = document.createElement("div");
    hamburgerCon.classList.add("col-12", "text-center");
    hamburgerCon.innerHTML = `
    <div class="mb-0">
        <p>${userData.hamburger} Burger</p>
        <p>$${userData.profitPerClick}/click</p>
        <p>$${userData.profitPerSeconds}/days</p>
    </div>
    <div class="container-fluid">
        <img alt="" src='https://cdn-icons-png.flaticon.com/512/678/678966.png' class="hamburger-btn" width="65%">
    </div>
    `

//hamburgerの画像がクリックされた際に、ハンバーガーの数を数え、利益を残高に加算します
    hamburgerCon.querySelector(".hamburger-btn").addEventListener("click", function () {
        clickSound.currentTime = 0;
        clickSound.play();
        hamburgerCon.querySelectorAll("p")[0].innerHTML = `${userData.increaseHamburgerPerClick()} Burgers`;
        config.balanceInfo.querySelectorAll("h2")[1].innerHTML =` $${parseInt(userData.addClickProfit())}`;
    })
    return hamburgerCon;
}

//itemListにeachItemConをプッシュします
function createItemList (userData, itemList) {
    let itemCon = document.createElement("div");
    itemCon.classList.add("col-12");
    itemCon.innerHTML = `
    <div style="overflow: auto; height: 25em;" >
        <div id="itemList">
        </div>
    </div>
    `

    let eachItemCon = document.createElement("div");
    for (let i = 0; i < itemList.length; i++) {
        eachItemCon.innerHTML += `
        <div class="d-flex row eachItemCon justify-content-center m-0">
            <div class="col-3 d-flex align-items-center justify-content-center">
                <img alt="" src="${itemList[i].imgUrl}" class="col-12" >
            </div>
            <div class="col-4 col-md-3">
                <h4 class="col-1">${itemList[i].name}</h4>
                <p class="updatePrice">${itemList[i].price}</p>
                <p class="updateProfit">$${renderProfit(itemList[i])}</p>
            </div>
            <div class="col-3 d-flex flex-wrap align-items-center justify-content-center">
                <button class="purchase-btn mx-2">× 1</button>
            </div>
            <div class="col-2 d-flex align-items-center justify-content-center">
                <h4 class="possession available">${renderNumOfPossession(itemList[i])}</h4>
            </div>
        </div>
        `
    }
    //for文ですべてのitemにaddEventListenerを適用して購入の処理を行います
    for (let i = 0; i < itemList.length; i++) {
    let purchaseBtn = eachItemCon.querySelectorAll(".purchase-btn")[i];
    purchaseBtn.addEventListener("click", function () {
        if (parseInt(itemList[i].price) > parseInt(userData.money)) {
            errorSound.currentTime = 0;
            errorSound.play();
        } else if (itemList[i].purchaseLimit <= itemList[i].purchaseQuantity) {
            return alert("これ以上購入できません");
        } else {
            x1ButtonSound.currentTime = 0;
            x1ButtonSound.play();
            userData.reduceBalance(itemList[i].price);
            userData.addProfit(itemList[i].increaseAssets(1), itemList[i].type);
            return itemList[i].increasePurchaseQuantity(1);
        }
    })

//買える最大個数を購入するmaxButtonは処理が難しく断念しました

    // let maxBtn = eachItemCon.querySelectorAll(".max-btn")[i];
    // maxBtn.addEventListener("click", function () {
    // totalAmount = parseInt(userData.money / itemList[i].price)

    // let total = totalAmount * itemList[i].price;
    //     if (total > userData.money) {
    //         return alert("お金が足りません");
    //     } else if (itemList[i].purchaseLimit <= itemList[i].purchaseQuantity) {
    //         return alert("これ以上購入できません");
    //     } else {
    //         maxButtonSound.currentTime = 0;
    //         maxButtonSound.play();
    //         userData.reduceBalance(total);
    //         userData.addProfit(itemList[i].increaseAssets(parseInt(totalAmount)), itemList[i].type);
    //         return itemList[i].increasePurchaseQuantity(totalAmount);
    //     }
    // })

//0.1秒ごとに値段の更新とAvailabilityPurchaseでこう
    setInterval (function() {
        eachItemCon.querySelectorAll(".possession")[i].innerHTML = renderNumOfPossession(itemList[i]);
        AvailabilityPurchase(eachItemCon.querySelectorAll(".possession")[i], true);
        if (itemList[i].purchaseLimit <= itemList[i].purchaseQuantity) {
            AvailabilityPurchase(eachItemCon.querySelectorAll(".possession")[i], false);
        }
        else if(itemList[i].name == "ETF Stock"){
            eachItemCon.querySelectorAll(".updatePrice")[i].innerHTML = `$${parseInt(itemList[i].price)}`
            if(parseInt(itemList[i].price) > parseInt(userData.money)) {
                AvailabilityPurchase(eachItemCon.querySelectorAll(".possession")[i], false);
            }
        } else if (itemList[i].name == "Auto Clicker") {
            eachItemCon.querySelectorAll(".updateProfit")[i].innerHTML = `$${userData.profitPerClick}/sec`
            if(parseInt(itemList[i].price) > parseInt(userData.money)) {
                AvailabilityPurchase(eachItemCon.querySelectorAll(".possession")[i], false);
            }
        }
        else if(parseInt(itemList[i].price) > parseInt(userData.money)) {
            AvailabilityPurchase(eachItemCon.querySelectorAll(".possession")[i], false);
        }
    }, 100);
    }

    itemCon.querySelector("#itemList").append(eachItemCon);
    return itemCon;
}



function createSaveDataBtn (userData) {
    let dataCon = document.createElement("div");
    dataCon.classList.add("d-flex", "justify-content-end");
    dataCon.innerHTML = `
    <button class="save-btn">save</button>
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
        config.hamburgerInfo.querySelectorAll("p").item(2).innerHTML = `[$${parseInt(userData.profitPerSeconds)}/days]`;
    
        config.userInfo.querySelectorAll("h2")[2].innerHTML = `${userData.increaseDay()} days`;
        config.balanceInfo.querySelectorAll("h2")[1].innerHTML = ` $${parseInt(userData.addSecondsProfit())}`;

        if (userData.days == 366) {
            userData.growOld();
            userData.days = 1;
            config.userInfo.querySelectorAll("h2")[1].innerHTML =`${userData.age} years old`
        }
    }, 1000);
}

function createMainPage (userData) {
    let mainPageCon = document.createElement("div");
    mainPageCon.classList.add("d-flex", "justify-content-center", "align-items-center", "flex-wrap", "col-12", "mainPageCon")

    config.balanceInfo.append(createBalanceInfo(userData));
    config.userInfo.append(createUserInfo(userData));
    let headerCon = document.createElement("div");
    headerCon.classList.add("row", "col-12", "d-flex", "justify-content-center");
    headerCon.append(config.balanceInfo, config.userInfo);

    config.hamburgerInfo.append(createHamburger(userData));
    config.itemInfo.append(createItemList(userData, itemList));
    let bodyCon = document.createElement("div");
    bodyCon.classList.add("row", "col-12", "d-flex", "justify-content-center");
    bodyCon.append(config.hamburgerInfo, config.itemInfo);

    config.dataInfo.append(createSaveDataBtn(userData));
    startInterval(userData);
    mainPageCon.append(headerCon, bodyCon, config.dataInfo);

    config.mainPage.append(mainPageCon);
    return mainPageCon;
}



function renderProfit (item) {
    if (item.type == "ability") return `${item.profit}/click`;
    else if (item.name == "ETF Stock") return "0.1%/sec";
    else if (item.name == "ETF Bonds") return "0.07%/sec";
    else if (item.name == "Auto Clicker") return "100/sec";
    else return `${item.profit}/sec`;
}

function renderNumOfPossession (item) {
    if (item.type == "investment") return "∞";
    else return item.purchaseQuantity + "/" + item.purchaseLimit;
}

function AvailabilityPurchase(ele, bool) {
    if(bool == true) {
        ele.classList.remove("no-available");
        ele.classList.add("available");
    } else {
        ele.classList.remove("available");
        ele.classList.add("no-available");
    }
}



