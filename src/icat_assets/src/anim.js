import $ from "jquery";

export const drinkAnim = () => {
  $("#cat").attr("src", "cat-drink.gif");
  setTimeout(function () {
    $("#cat").attr("src", "cat-1.gif");
  }, 4000);
};
export const eatAnim = () => {
  $("#cat").attr("src", "cat-eat.gif");
  setTimeout(function () {
    $("#cat").attr("src", "cat-1.gif");
  }, 4000);
};

export const musicAnim = () => {
  $("#cat").attr("src", "cat-music.gif");
  setTimeout(function () {
    $("#cat").attr("src", "cat-1.gif");
  }, 4000);
};

export const jumpAnim = () => {
  is_cat_anim = true;
  $("#cat").attr("src", "cat-jump.gif");
  setTimeout(function () {
    $("#cat").attr("src", "cat-1.gif");
    is_cat_anim = false;
  }, 400);
};

export const buyWaterAnim = () => {
  $("#shop").attr("src", "shop-water.gif");
  setTimeout(function () {
    $("#shop").attr("src", "shop.png");
  }, 3000);
};

export const buyFoodAnim = () => {
  $("#shop").attr("src", "shop-food.gif");
  setTimeout(function () {
    $("#shop").attr("src", "shop.png");
  }, 3000);
};

export const buyMusicAnim = () => {
  $("#shop").attr("src", "shop-music.gif");
  setTimeout(function () {
    $("#shop").attr("src", "shop.png");
  }, 3000);
};

export const rotate = (item) => {
  item.removeClass("rotate").addClass("rotate1");
  setTimeout(function () {
    item.removeClass("rotate1").addClass("rotate");
  }, 500);
};
