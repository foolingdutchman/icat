import { Actor, HttpAgent } from "@dfinity/agent";
import {
  idlFactory as icat_idl,
  canisterId as icat_id,
} from "dfx-generated/icat";

import $ from "jquery";
import { WOW } from "wowjs";
import Typed from "typed.js";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css/animate.min.css";
import { Alert } from "bootstrap";

const agent = new HttpAgent();
const icat = Actor.createActor(icat_idl, {
  agent,
  canisterId: icat_id,
});
var principal = "";
var principal_ =null;
var data = {};

var is_cat_anim = false;
window.$ = window.jQuery = $;

$(function () {
  // initial view

  // loading always in center of screen
  //页面初始化
  goCenter($("#loading"));

  //滚动条滚动
  $(window).scroll(function () {
    goCenter($("#loading"));
  });
  //拖动浏览器窗口
  $(window).resize(function () {
    goCenter($("#loading"));
  });

  // typed text anim
  new Typed("#typed", {
    cursorChar: "_",
    strings: [
      "&nbsp;Click to claim your daily reward Shit Coin,\t",
      "&nbsp;You can get 100 Shit Coin For each 24 Hours, \t",
      "&nbsp;try to use these coins to buy stuff for your ICat.",
    ],
    typeSpeed: 50,
    backSpeed: 25,
    backDelay: 3000,
    loop: true,
  });

  new Typed("#intro",{
    cursorChar: "|",
    strings: [
      "&nbsp;This is a tiny pet game,\n ",
      "&nbsp;You must to use ICP principal ID to register the game,\n",
      "&nbsp;Otherwise you will meet problem for playing.\t",
      "&nbsp;You will get a cute ICat, \n",
      "&nbsp;You need to take care of your Icat.\n",
      "&nbsp;You need to feed water ,food and entertain your pet.\t",
      "&nbsp;Food ,water and music is not free, you need to buy this item by use ShitCoin.\n",
      "&nbsp;Shit Coin is a token used for payment here,\n",
      "&nbsp;You can get 100 ShitCoin per Day for free.\t",
      "&nbsp;That is all for the game, enjoy it!\t",
    ],
    typeSpeed: 50,
    backSpeed: 25,
    backDelay: 3000,
    loop: true,

  });

  // set backgroun for the cat area
  setCatAreaBackground();

  // click events listening

  $("#check_balance").click(async function () {
    if (check_empty_log_in()) {
      alert("Please Log In!");
      return;
    } else {
      show_balance(principal);
    }
  });

  $("#log_out").click(async function () {
    log_out();
  });

  $("#log-in").click(async function () {
    var temp_id = $("#wallet_id").val().toString();
    var temp_password = $("#password").val().toString();
    showLoading(true);
    var success = await icat.logIn(temp_id, temp_password);
    if (success) {
      principal = temp_id;
      alert("Log In success!");
      show_login_area(false);
      show_balance(principal);
      get_icat(principal);
    } else {
      showLoading(false);
      alert("Log In falied!");
    }
  });

  $("#register").click(async function () {
    var temp_id = $("#wallet_id").val().toString();
    var temp_password = $("#password").val().toString();
    showLoading(true);
    var success = await icat.registerUser(temp_id, temp_password);
    if (success) {
      principal = temp_id;
      alert("Register and Log In success!");
      principal_ = await icat.getPrincipal(principal);
      var firstReward =await icat.airDrop(principal, 200);
      if (firstReward) {
        var recordReward =await icat.updateAirDropRecord(
          principal_,
          getCurrentTimeStamp()
        );
        if (recordReward) {
          alert("You have get your first airdrop!");
        } else {
          alert("Register airdrop record failed! ");
        }
      } else {
        alert("First airdrop record failed! ");
      }
      show_login_area(false);
      show_balance(principal);
      create_icat(principal);
    } else {
      showLoading(false);
      alert("Register falied, User has existed!");
    }
  });
  $("#coin").click(async function () {
    showLoading(true);
    var last_drop = await icat.getAirdropLastRecord(principal_);
    if (last_drop == null) {
      showLoading(false);
      alert(" have no record !");     
    } else {    
      var gap = getCurrentTimeStamp() - parseInt(last_drop);
      if (gap > 3600 * 1000 * 24) {
        var firstReward =await icat.airDrop(principal, 200);
        if (firstReward) {
          var recordReward =await icat.updateAirDropRecord(
            principal_,
            getCurrentTimeStamp()
          );
          if (recordReward) {
            showLoading(false);
            alert("You have get your airdrop successfully!");
          } else {
            showLoading(false);
            alert("Register airdrop record failed! ");
          }
        } else {
          showLoading(false);
          alert("First airdrop record failed! ");
        }
      } else {
        showLoading(false);
        alert(
          "You have get your reward within 24 hours,please wait more time."
        );
      }
    }
  });

  $("#cat").click(function () {
    if (!is_cat_anim) {
      jumpAnim();
    }
  });

  $("#water").click(async function () {
    rotate($(this));
    feedWater();
  });
  $("#food").click(async function () {
    rotate($(this));
    feedFood();
  });
  $("#music").click(async function () {
    rotate($(this));
    listenMusic();
  });
  $("#water-buy").click(async function () {
    rotate($(this));
    buyWater();
  });
  $("#food-buy").click(function () {
    rotate($(this));
    buyFood();
  });
  $("#music-buy").click(function () {
    rotate($(this));
    buyMusic();
  });

  $("#edit-name").click(function(){
    show_Edit_pannel(true);
  });

  $("#edit-name-confirm").click(function(){
    editName();
  });

  $("#edit-name-cancel").click(function(){
    show_Edit_pannel(false);
  });



  // functions

  function isEmpty(obj){
    if(typeof obj == "undefined" || obj == null || obj == ""){
        return true;
    }else{
        return false;
    }
}


  function goCenter(element) {
    var h = $(window).height();
    var w = $(window).width();
    var st = $(window).scrollTop();
    var sl = $(window).scrollLeft();
    element.css("top", (h) / 2 + st);
    element.css("left", (w) / 2 + sl);
  }

  function showLoading(is_shown) {
    if (is_shown) {
      $("#loading").show();
    } else {
      $("#loading").hide();
    }
  }

  function setCatAreaBackground() {
    $("#cat-area-inner")
      .css("background-image", "url(cat-bg.png)")
      .css("background-repeat", "no-repeat")
      .css("background-size", "100% 100%");
  }

  async function create_icat(principal_str) {
    const timestamp = Date.parse(new Date());
    const gender =Math.round(Math.random()); 
    var data = await icat.createNewCat(principal_, timestamp ,gender);
    if (data == null) {
      alert("icat create fail!");
      showLoading(false);
    } else {
      alert("icat create success!");
      load_cate_info(data);
      showLoading(false);
    }
  }

  async function feedWater() {
    if (is_cat_anim) {
      alert("Your last action has not finish yet, please wait...");
      return;
    }
    showLoading(true);
    if (parseInt(data.water) > 0) {
      if (parseInt(data.thirsty) > 0) {
        is_cat_anim = true;
        var newWater = parseInt(data.water) - 1;
        var newThirsty =
          parseInt(data.thirsty) - 10 > 0 ? parseInt(data.thirsty) - 10 : 0;
        data.water = newWater;
        data.thirsty = newThirsty;
        data.last_drink = getCurrentTimeStamp();
        await icat.updateProfile(data);
        drinkAnim();
        load_cate_info(data);
        is_cat_anim = false;
      } else {
        alert("your icat now is not thirsty at all, you can feed later ");
      }
    } else {
      alert("You dont have water, buy some for your cat!");
    }
    showLoading(false);
  }

  async function feedFood() {
    if (is_cat_anim) {
      alert("Your last action has not finish yet, please wait...");
      return;
    }
    showLoading(true);
    if (parseInt(data.food) > 0) {
      if (parseInt(data.hungry) > 0) {
        is_cat_anim = true;
        var newFood = parseInt(data.food) - 1;
        var newHungry =
          parseInt(data.hungry) - 10 > 0 ? parseInt(data.hungry) - 10 : 0;
        data.food = newFood;
        data.hungry = newHungry;
        data.last_feed = getCurrentTimeStamp();
        await icat.updateProfile(data);
        eatAnim();
        load_cate_info(data);
        is_cat_anim = false;
      } else {
        alert("your icat now is not hungry at all, you can feed later ");
      }
    } else {
      alert("You dont have food, buy some for your cat!");
    }
    showLoading(false);
  }

  async function listenMusic() {
    if (is_cat_anim) {
      alert("Your last action has not finish yet, please wait...");
      return;
    }
    showLoading(true);

    if (parseInt(data.music) > 0) {
      if (parseInt(data.happyness) < 100) {
        is_cat_anim = true;
        var newMusic = parseInt(data.music) - 1;
        var newHappyness =
          parseInt(data.happyness) + 10 < 100
            ? parseInt(data.happyness) + 10
            : 100;
        data.music = newMusic;
        data.happyness = newHappyness;
        data.last_play = getCurrentTimeStamp();
        await icat.updateProfile(data);
        musicAnim();
        load_cate_info(data);
        is_cat_anim = false;
      } else {
        alert("your icat happyness is full, you can enjoy music later ");
      }
    } else {
      alert("You dont have music, buy some for your cat!");
    }
    showLoading(false);
  }

  async function buyWater() {
    if (is_cat_anim) {
      alert("Your last action has not finish yet, please wait...");
      return;
    }
    showLoading(true);
    var balance = await getBalance();
    if (parseInt(balance) >= 10) {
      is_cat_anim = true;
      let recover_chip = await icat.recoverChip(principal, 10);
      if (recover_chip) {
        var newWater = parseInt(data.water) + 1;
        data.water = newWater;
        await icat.updateProfile(data);
        showLoading(false);
        load_cate_info(data);
        show_balance(principal);
        buyWaterAnim();
        is_cat_anim = false;
       
      } else {
        is_cat_anim = false;
        showLoading(false);
        alert("deduct balance failed");
      }
    } else {
      showLoading(false);
      alert("Your Shit Coin is not enough to buy this item.");
    }
    
  }

  async function buyFood() {
    if (is_cat_anim) {
      alert("Your last action has not finish yet, please wait...");
      return;
    }
    showLoading(true);
    var balance = await getBalance();
    if (parseInt(balance) >= 20) {
      is_cat_anim = true;
      let recover_chip = await icat.recoverChip(principal, 20);
      if (recover_chip) {
        var newFood = parseInt(data.food) + 1;
        data.food = newFood;
        await icat.updateProfile(data);
        showLoading(false);
        load_cate_info(data);
        show_balance(principal);
        buyFoodAnim();
        is_cat_anim = false;
      } else {
        is_cat_anim = false;
        showLoading(false);
        alert("deduct balance failed");
      }
    } else {
      showLoading(false);
      alert("Your Shit Coin is not enough to buy this item.");
    }
   
  }

  async function buyMusic() {
    if (is_cat_anim) {
      alert("Your last action has not finish yet, please wait...");
      return;
    }
    showLoading(true);
    var balance = await getBalance();
    if (parseInt(balance) >= 50) {
      is_cat_anim = true;
      let recover_chip = await icat.recoverChip(principal, 50);
      if (recover_chip) {
        var newMusic = parseInt(data.music) + 1;
        data.music = newMusic;
        await icat.updateProfile(data);
        showLoading(false);
        load_cate_info(data);
        show_balance(principal);
        buyMusicAnim();
        is_cat_anim = false;
      } else {
        is_cat_anim = false;
        showLoading(false);
        alert("deduct balance failed");
      }
    } else {
      showLoading(false);
      alert("Your Shit Coin is not enough to buy this item.");
    }
    
  }

  async function editName(){
  var name = $("#input-name").val().toString();
  if(isEmpty(name)){
   alert("please input Icat name!");
  }else{
    showLoading(true);
    data.name =name;
    await icat.updateProfile(data);
    load_cate_info(data);
    show_Edit_pannel(false);
    showLoading(false);
  }
  }

  async function get_icat(principal) {
    principal_ = await icat.getPrincipal(principal);
    var list = await icat.getICatInfo(principal_);
    if (list == null) {
      alert("icat info get fail!");
      showLoading(false);
    } else {
      data = list[0];
      if (data != null) {
        update_catInfo_at_logIn(data, getCurrentTimeStamp());
        load_cate_info(data);
      }
      showLoading(false);
    }
  }

  async function update_catInfo_at_logIn(data, timestamp) {
    var hungry = parseInt(data.hungry);
    var thirsty = parseInt(data.thirsty);
    var happyness = parseInt(data.happyness);

    if (hungry < 100) {
      hungry =
        hungry + parseInt((timestamp - parseInt(data.last_feed)) / 10800000) <
        100
          ? hungry + parseInt((timestamp - parseInt(data.last_feed)) / 10800000)
          : 100;
      data.hungry = hungry;
    }

    if (thirsty < 100) {
      thirsty =
        thirsty + parseInt((timestamp - parseInt(data.last_drink)) / 7200000) <
        100
          ? thirsty +
            parseInt((timestamp - parseInt(data.last_drink)) / 7200000)
          : 100;
      data.thirsty = thirsty;
    }

    if (happyness > 0) {
      happyness =
        happyness - parseInt((timestamp - parseInt(data.last_play)) / 3600000) >
        0
          ? happyness -
            parseInt((timestamp - parseInt(data.last_play)) / 3600000)
          : 0;
      data.happyness = happyness;
    }
    var updateCatInfo = await icat.updateProfile(data);
    if (updateCatInfo) {
      alert("update cat info！");
    }
  }

  function show_Edit_pannel(is_shown){
    if(is_shown){
      goCenter($("#edit-pannel"));

      $("#edit-pannel").show();
     
    }else{
      $("#edit-pannel").hide();
    }   
  }

  function load_cate_info(data) {
    $("#cat-birth").text(timeStamp2Time(data.birthdate) + "");
    if(isEmpty(data.name+"")){
      $("#edit-name").show();
    }else{
      $("#edit-name").hide();
    }
    $("#cat-name").text(data.name + "");
    $("#cat-gender").text(data.gender == 0 ? "Female" : "Male");
    $("#hungry").text(data.hungry + "");
    $("#thirsty").text(data.thirsty + "");
    $("#happyness").text(data.happyness + "");
    $("#water-num").text(data.water + "");
    $("#food-num").text(data.food + "");
    $("#music-num").text(data.music + "");
    $("#water-buy-num").text(data.water + "");
    $("#food-buy-num").text(data.food + "");
    $("#music-buy-num").text(data.music + "");
  }

  async function show_balance(principal) {
    const balance = await icat.balanceOfFromtr(principal);
    document.getElementById("greeting").innerText =
      "Hi, your Balance is: " + balance;
    document.getElementById("balance").innerText = "" + balance;
  }

  

  function check_empty_log_in() {
    return principal == "";
  }

  function show_login_area(is_shown) {
    $("#log-in-area").addClass(
      is_shown
        ? "animate__animated animate__fadeInDown"
        : "animate__animated animate__fadeOutUp"
    );
    $("#main-area").addClass(
      is_shown
        ? "animate__animated animate__fadeOutUp"
        : "animate__animated animate__fadeInDown"
    );
    setTimeout(function () {
      document.getElementById("log-in-area").style.display = is_shown
        ? ""
        : "none";
      document.getElementById("main-area").style.display = is_shown
        ? "none"
        : "";
    }, 1000);
    var showPrincipal =
      principal.substr(0, 6) +
      "****" +
      principal.substr(principal.length - 4, principal.length);
    $("#la_wallet_id").text(is_shown ? "" : showPrincipal);
  }

  function log_out() {
    principal = "";
    principal_ =null;
    document.getElementById("wallet_id").value = "";
    document.getElementById("password").value = "";
    document.getElementById("balance").value = "";
    show_login_area(true);
  }

  function rotate(item) {
    item.removeClass("rotate").addClass("rotate1");
    setTimeout(function () {
      item.removeClass("rotate1").addClass("rotate");
    }, 500);
  }

  function timeStamp2Time(timestamp) {
    var date = new Date(parseInt(timestamp) + 8 * 3600 * 1000); // 增加8小时
    return date.toJSON().substr(0, 10).replace("T", " ");
  }

  function drinkAnim() {
    $("#cat").attr("src", "cat-drink.gif");
    setTimeout(function () {
      $("#cat").attr("src", "cat-1.gif");
    }, 4000);
  }
  function eatAnim() {
    $("#cat").attr("src", "cat-eat.gif");
    setTimeout(function () {
      $("#cat").attr("src", "cat-1.gif");
    }, 4000);
  }

  function musicAnim() {
    $("#cat").attr("src", "cat-music.gif");
    setTimeout(function () {
      $("#cat").attr("src", "cat-1.gif");
    }, 4000);
  }

  function jumpAnim() {
    is_cat_anim = true;
    $("#cat").attr("src", "cat-jump.gif");
    setTimeout(function () {
      $("#cat").attr("src", "cat-1.gif");
      is_cat_anim = false;
    }, 400);
  }

  function buyWaterAnim() {
    $("#shop").attr("src", "shop-water.gif");
    setTimeout(function () {
      $("#shop").attr("src", "shop.png");
    }, 3000);
  }

  function buyFoodAnim() {
    $("#shop").attr("src", "shop-food.gif");
    setTimeout(function () {
      $("#shop").attr("src", "shop.png");
    }, 3000);
  }

  function buyMusicAnim() {
    $("#shop").attr("src", "shop-music.gif");
    setTimeout(function () {
      $("#shop").attr("src", "shop.png");
    }, 3000);
  }

  async function getBalance() {
    if (check_empty_log_in()) {
      return 0;
    } else {
      const balance = await icat.balanceOfFromtr(principal);
      return balance;
    }
  }

  function getCurrentTimeStamp() {
    const timestamp = Date.parse(new Date());
    return timestamp;
  }
});
