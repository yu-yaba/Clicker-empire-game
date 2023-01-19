// ここからJavaScriptを記述してください。
const config = {
    homePage: document.getElementById("home-page"),
    mainPage: document.getElementById("main-page")
  }
  
  function displayNone(ele) {
    ele.classList.remove("d-block");
    ele.classList.add("d-none");
  }
  
  function displayBlock(ele) {
    ele.classList.remove("d-none");
    ele.classList.add("d-block");
  }
  
  class User {
    countSeconds = 0;
    constructor(userName, old, days, balance, clickUnitPrice, secondsUnitPrice, items, hamburgerAmount) {
      this.userName = userName;
      this.old = old;
      this.days = days;
      this.balance = balance;
      this.clickUnitPrice = clickUnitPrice;
      this.secondsUnitPrice = secondsUnitPrice;
      this.items = items;
      this.hamburgerAmount = hamburgerAmount;
    }
  
    getOld() {
      return this.old++;
    }
  
    goesDay() {
      this.countSeconds++;
      return this.days++;
    }
  
    increaseBalanceByseconds() {
      return this.balance += this.secondsUnitPrice;
    }
  
    increaseAmountByClick() {
      return this.hamburgerAmount++;
    }
    increaseBalanceByClick() {
  
      return this.balance += this.clickUnitPrice;
    }
  
    increaseUnitPrice(value, type) {
      if (type == "ability") return this.clickUnitPrice += value;
      else return this.secondsUnitPrice += value;
    }
  
    reduceBalanceByPurchaseItem(value) {
      return this.balance -= value;
    }
  }
  
  class Item {
    constructor(name, price, purcaseLimit, purcaseAmount, risedUnitPrice, type, imgURL) {
      this.name = name;
      this.price = price;
      this.purcaseLimit = purcaseLimit;
      this.purcaseAmount = purcaseAmount;
      this.risedUnitPrice = risedUnitPrice;
      this.type = type;
      this.imgURL = imgURL;
    }
  
    increasePurcaseAmount(amount) {
      return this.purcaseAmount += amount;
    }
  
    SoaringUnitPrice(amount) {
      if (this.name == "ETF Stock") {
        // 	ETF 銘柄の購入分をまとめて加算し、毎秒 0.1% を取得します
        this.risedUnitPrice = (this.price * (this.purcaseAmount + amount)) * 0.001;
  
        // 毎購入ごとに 10% 購入額が増加します
        this.price = this.price * 1.1;
      } else if (this.name == "ETF Bonds") {
        // 債券 ETF の購入分をまとめて加算し、毎秒 0.07% を取得します。
        this.risedUnitPrice = (this.price * (this.purcaseAmount + amount)) * 0.0007;
  
      }
      return amount * this.risedUnitPrice;
  
    }
  }
  
  function registerNewData() {
    const form = document.getElementById("form");
    let itemList = [
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
    ];
  
    let userData;
    if(form.querySelectorAll(`input[name="userName"]`).item(0).value == "Millionaire"){
       userData = new User(form.querySelectorAll(`input[name="userName"]`).item(0).value,
      20, 1, 50000000, 25, 0, itemList, 0);
    }else{
       userData = new User(form.querySelectorAll(`input[name="userName"]`).item(0).value,
      20, 1, 50000, 25, 0, itemList, 0);
    }
  
    displayNone(config.homePage);
    displayBlock(config.mainPage);
    config.mainPage.innerHTML = "";
    config.mainPage.append(makingMainPage(userData));
    return userData;
  }
  
  function loginData() {
    const userName = document.getElementById("form").querySelectorAll(`input[name="userName"]`).item(0).value;
    let saveData = localStorage.getItem(userName);
  
    if (saveData == null) {
      alert("There is no data.");
      return false;
    } else {
      saveData = JSON.parse(saveData)
      displayNone(config.homePage);
      displayBlock(config.mainPage);
      config.mainPage.innerHTML = "";
  
      let itemList = [];
      for (let i = 0; i < saveData["items"].length; i++) {
        itemList.push(new Item(saveData["items"][i]["name"], saveData["items"][i]["price"], saveData["items"][i]["purcaseLimit"], saveData["items"][i]["purcaseAmount"], saveData["items"][i]["risedUnitPrice"], saveData["items"][i]["type"], saveData["items"][i]["imgURL"]));
      }
  
  
  
      let userData = new User(saveData["userName"], saveData["old"], saveData["days"], saveData["balance"], saveData["clickUnitPrice"], saveData["secondsUnitPrice"], itemList, saveData["hamburgerAmount"]);
      console.log(userData);
  
      config.mainPage.append(makingMainPage(userData));
      return userData;
    }
  }
  
  
  function makingMainPage(userData) {
    //ユーザーの情報を表示 
    let userInfo = document.createElement("div");
    userInfo.classList.add("d-flex", "flex-wrap", "justify-content-around", "col-12", "p-2");
    userInfo.innerHTML = `<div class="col-12 col-lg-9">
   <h1 class="text-left">Total Balance</h1>
   <h2 class="text-right bt-border">￥${userData.balance}</h2>
  </div>
  <div class="col-12  col-lg-3  rem1p3  text-right">
   <div class=" d-flex flex-lg-column justify-content-around justify-content-lg-end ">
     <p>name: ${userData.userName}</p>
     <p>${userData.old} years old</p>
     <p>${userData.days} days</p>
   </div>
  </div>`;
  
    let operationScreen = document.createElement("div");
    operationScreen.classList.add("col-12", "d-flex", "align-items-center", "flex-wrap", "p-0", "mt-lg-5");
  
    // 画面左側、ハンバーガーのクリック画面の表示
    let clickhumbergerCon = document.createElement("div");
    clickhumbergerCon.classList.add("col-12", "col-lg-4", "text-center", "p-4", "p-lg-2", "rem1p3");
    clickhumbergerCon.innerHTML = ` <p class="hanburgerAmount">${userData.hamburgerAmount} Burger</p>
  <p class="clickPrice">[$${userData.clickUnitPrice}/click]</p>
  <p class="secondPrice">[$${userData.secondsUnitPrice}/days]</p>
  <div class="w-100 container pt-2">
    <img src="https://cdn-icons-png.flaticon.com/512/1858/1858002.png" alt="" class="hamburger-btn hover  w-50 w-lg-100">
  </div>`;
  
    // ハンバーガーをクリックした時の処理
    clickhumbergerCon.querySelector(".hamburger-btn").addEventListener("click", () => {
      clickhumbergerCon.querySelectorAll("p").item(0).innerHTML = `${userData.increaseAmountByClick()} Burgers`;
      userInfo.querySelector("h2").innerHTML = `￥${userData.increaseBalanceByClick()}`;
    });
  
    // 1秒毎の処理
    const callEverySecond = setInterval(() => {
      clickhumbergerCon.querySelectorAll("p").item(1).innerHTML = `[$${userData.clickUnitPrice}/click]`;
      clickhumbergerCon.querySelectorAll("p").item(2).innerHTML = `[$${userData.secondsUnitPrice.toFixed()}/days]`;
  
      userInfo.querySelectorAll("p").item(2).innerHTML = `${userData.goesDay()} days`;
      userInfo.querySelector("h2").innerHTML = `￥${userData.increaseBalanceByseconds().toFixed()}`;
      if (userData.countSeconds == 365) {
        userData.countSeconds = 1;
        userData.getOld();
        userInfo.querySelectorAll("p").item(1).innerHTML = `${userData.old} years old`;
      }
    }, 1000);
  
    // 画面右側、アイテムリスト、保存、戻るボタンの表示
    let rightSceen = document.createElement("div");
    rightSceen.classList.add("col-12", "col-lg-8", "w-100", "p-0");
  
    // アイテムリスト画面の表示
    let itemListCon = document.createElement("div");
    itemListCon.classList.add("shadow", "bg-paper");
    itemListCon.style = "height: 20em";
    itemListCon.innerHTML = `
  <div class="p-3" style="overflow-y: scroll; height: 100% ;">
    <div class="d-flex justify-content-between">
      <div class="clip"></div>
      <div class="clip"></div>
    </div>
    <div id="itemList-target"></div>
    
    </div>  
    </div>`;
  
    itemListCon.querySelector("#itemList-target").append(makingItemListPage(userData.items, userData));
  
  
  
    // 戻る、保存ボタンの表示
    let dataCon = document.createElement("div");
    dataCon.innerHTML = `  <div class="pt-4 d-flex justify-content-end">
    <button class="btn-back pr-4 hover">
    <i class="fas fa-undo-alt fa-3x btn-color"></i>
    </button>
    <button class="btn-save pr-4 hover">
    <i class="fas fa-save fa-3x btn-color"></i>
    </button>
  </div>`;
  
    // ホーム画面に戻る
    dataCon.querySelector(".btn-back").addEventListener("click", () => {
      let result = confirm("If you haven't saved the data, it will be lost, is that okay?");
      if (result) {
        config.mainPage.innerHTML = "";
        clearInterval(callEverySecond);
        config.mainPage.innerHTML = "";
        displayNone(config.mainPage);
        displayBlock(config.homePage);
      }
    });
    // データを保存
    dataCon.querySelector(".btn-save").addEventListener("click", () => {
      let userName = userData.userName
      userData = JSON.stringify(userData);
      localStorage.setItem(userName, userData);
      alert("Saved your data. Please put the same name when you login.");
      clearInterval(callEverySecond);
      config.mainPage.innerHTML = "";
      displayNone(config.mainPage);
      displayBlock(config.homePage);
  
    });
  
    rightSceen.append(itemListCon, dataCon);
    operationScreen.append(clickhumbergerCon, rightSceen);
    let container = document.createElement("div");
    container.append(userInfo, operationScreen);
  
    return container;
  }
  
  
  function makingItemListPage(itemList, userData) {
    let container = document.createElement("div");
    let itemListPage = document.createElement("div");
    itemListPage.classList.add("itemListPage");
  
    for (let i = 0; i < itemList.length; i++) {
      itemListPage.innerHTML += `
        <div class="item-btn text-dark bt-border2 col-12 d-flex justify-content-between  text-center pb-3 m-1 ">
        <div class="col-2 w-100 p-0">
        <img src="${itemList[i].imgURL}" alt="" class="w-100">
        </div>
        <div class="col-8 p-2 rem1p3">
        <h4>${itemList[i].name}</h4>
        <div class="d-flex justify-content-around pt-3">
        <p class="cirrentPrice">￥${itemList[i].price}</p>
        <p>${displayUnit(itemList[i])}</p>
        </div>
        </div>
        <div class="success stock col-2  d-flex align-items-center rem1p5">${displayStock(itemList[i])}</div>
        </div>`;
      container.append(itemListPage);
    }
  
    for (let i = 0; i < itemList.length; i++) {
      itemListPage.querySelectorAll(".item-btn").item(i).addEventListener("click", () => {
        displayNone(itemListPage);
        let purchasePage = makingPurchasePage(itemList[i], userData, itemListPage);
        container.append(purchasePage);
        displayBlock(purchasePage);
      });
  
      setInterval(() => {
        itemListPage.querySelectorAll(".stock").item(i).innerHTML = displayStock(itemList[i]);
        if (itemList[i].name == "ETF Stock") {
          itemListPage.querySelectorAll(".cirrentPrice").item(i).innerHTML = `￥${itemList[i].price.toFixed()}`;
        }
        if (itemList[i].purcaseLimit == itemList[i].purcaseAmount) {
          displayIsAvailablePurchase(itemListPage.querySelectorAll(".stock").item(i), false);
        }
      }, 1000);
    }
    return container;
  }
  
  
  function makingPurchasePage(item, data, ele) {
    let purchasePage = document.createElement("div");
    purchasePage.classList.add("purchasePage");
    purchasePage.innerHTML = `<div class="col-12 d-flex justify-content-between">
        <div class="col-8 text-left rem1p3 text-dark">
        <h4>${item.name}</h4>
        <p class="pb-2">Max purchases: ${item.purcaseLimit}</p>
        <p class="pb-2">Price: ￥${item.price.toFixed()}</p>
        <p class="pb-2">Get extra ${displayUnit(item)}</p>
  
        </div>
        <div class="col-4 w-100">
          <img src="${item.imgURL}" alt="" class="w-100">
        </div>
      </div>
      <div class=" my-3 col-12">
      <div class="input-group">
        <label for="" class="text-dark" >How many would you like to purchase?</label>
        <input type="number" min="0" max="${item.purcaseLimit}" class="col-11 form-control text-center w-100">
        <div class="input-group-append">
        <span class="input-group-text max btn btn-danger">Max</span>
        </div>
      </div>
        <p class="total text-right py-1 text-dark">total: 0</p>
        </div>
        <div class="col-12 py-3 d-flex">
          <div class="col-6 ">
            <button class="back-btn col-12 btn btn-danger">Go Back</button>
          </div>
          <div class="col-6">
            <button class="purchase-btn col-12 btn btn-info">Purchase</button>
          </div>
        </div>
    </div>
  </div>`;
  
  
    //inputの値の変化に応じてトータルを変更する
    let purchaseAmount = purchasePage.querySelector(".form-control");
    let total = purchasePage.querySelector(".total");
    purchaseAmount.addEventListener("change", () => {
      total.innerHTML = `total: ${displayTotal(purchaseAmount.value, item.price).toFixed()}`;
      total.classList.remove("text-dark");
      if (displayTotal(purchaseAmount.value, item.price) <= data.balance) {
        displayIsAvailablePurchase(total, true);
      } else {
        displayIsAvailablePurchase(total, false)
      }
    });
  
    // Maxを押した時の処理
    const maxBtn = purchasePage.querySelector(".max");
    maxBtn.addEventListener("click", () => {
      purchaseAmount.value = displayMaximumPurchaseAmount(item, data);
      total.innerHTML = `total: ${displayTotal(purchaseAmount.value, item.price)}`;
      displayIsAvailablePurchase(total, true);
    });
  
    // Go Backを押したときの処理
    let backBtn = purchasePage.querySelector(".back-btn");
    backBtn.addEventListener(("click"), () => {
      displayNone(purchasePage);
      displayBlock(ele);
    });
    // Purchaseを押した時の処理
    let purchaseBtn = purchasePage.querySelector(".purchase-btn");
    purchaseBtn.addEventListener(("click"), () => {
      if (displayTotal(parseInt(purchaseAmount.value), item.price) > data.balance) {
        alert("You don't have enough money.");
      } else if (item.purcaseLimit == item.purcaseAmount) {
        alert("You can't buy this any more!")
      } else {
        data.reduceBalanceByPurchaseItem(displayTotal(parseInt(purchaseAmount.value), item.price));
        data.increaseUnitPrice(item.SoaringUnitPrice(parseInt(purchaseAmount.value)), item.type);
        item.increasePurcaseAmount(parseInt(purchaseAmount.value));
        displayNone(purchasePage);
        displayBlock(ele);
      }
    });
    return purchasePage;
  }
  
  function displayUnit(item) {
    if (item.type == "ability") return `${item.risedUnitPrice}/click`;
    else if (item.name == "ETF Stock") return "0.1%/sec";
    else if (item.name == "ETF Bonds") return "0.07%/sec";
    else return `${item.risedUnitPrice}/sec`;
  }
  
  function displayStock(itemList) {
    if (itemList.type == "investment") return "∞";
    else return itemList.purcaseAmount + "/" + itemList.purcaseLimit;
  }
  
  function displayTotal(x, y) {
    return x * y;
  }
  
  
  function displayMaximumPurchaseAmount(item, data) {
    return Math.floor(data.balance / item.price) > item.purcaseLimit ? item.purcaseLimit : Math.floor(data.balance / item.price);
  }
  
  function displayIsAvailablePurchase(ele, boolean) {
    if (boolean == true) {
      ele.classList.remove("file");
      ele.classList.remove("text-dark");
      ele.classList.add("success");
    } else {
      ele.classList.remove("success");
      ele.classList.remove("text-dark");
      ele.classList.add("file");
    }
  }