import { Actor, HttpAgent } from "@dfinity/agent";
import {
  idlFactory as icat_idl,
  canisterId as icat_id,
} from "dfx-generated/icat";

import $ from "jquery";
import Typed from "typed.js";
import { WOW } from "wowjs";
// import "jquery";
// import "bootstrap";
// import "./js/lightbox.min";

import "../assets/css/bootstrap.min.css";
import "animate.css/animate.min.css";
import "../assets/css/main.css";
import "../assets/css/font-awesome.min.css";
import "../assets/css/lightbox.css";
import "../assets/css/main.css";
import "../assets/css/responsive.css";

window.$ = window.jQuery = $;

$(function () {
  //Responsive Nav
  $("li.dropdown")
    .find(".fa-angle-down")
    .each(function () {
      $(this).on("click", function () {
        if ($(window).width() < 768) {
          $(this).parent().next().slideToggle();
        }
        return false;
      });
    });


  //Initiat WOW JS
  new WOW().init();

  // portfolio filter
  $(window).load(function () {
    $(".main-slider").addClass("animate-in");
    $(".preloader").remove();
    //End Preloader

    if ($(".masonery_area").length) {
      $(".masonery_area").masonry(); //Masonry
    }

    var $portfolio_selectors = $(".portfolio-filter >li>a");

    if ($portfolio_selectors.length) {
      var $portfolio = $(".portfolio-items");
      $portfolio.isotope({
        itemSelector: ".portfolio-item",
        layoutMode: "fitRows",
      });

      $portfolio_selectors.on("click", function () {
        $portfolio_selectors.removeClass("active");
        $(this).addClass("active");
        var selector = $(this).attr("data-filter");
        $portfolio.isotope({ filter: selector });
        return false;
      });
    }
  });

  $(".timer").each(count);
  function count(options) {
    var $this = $(this);
    options = $.extend({}, options || {}, $this.data("countToOptions") || {});
    $this.countTo(options);
  }

  // Search
  $(".fa-search").on("click", function () {
    $(".field-toggle").fadeToggle(200);
  });

  // Contact form
  var form = $("#main-contact-form");
  form.submit(function (event) {
    event.preventDefault();
    var form_status = $('<div class="form_status"></div>');
    $.ajax({
      url: $(this).attr("action"),
      beforeSend: function () {
        form.prepend(
          form_status
            .html(
              '<p><i class="fa fa-spinner fa-spin"></i> Email is sending...</p>'
            )
            .fadeIn()
        );
      },
    }).done(function (data) {
      form_status
        .html(
          '<p class="text-success">Thank you for contact us. As early as possible  we will contact you</p>'
        )
        .delay(3000)
        .fadeOut();
    });
  });

  // Progress Bar
  $.each($("div.progress-bar"), function () {
    $(this).css("width", $(this).attr("data-transition") + "%");
  });


  //---- original
});
