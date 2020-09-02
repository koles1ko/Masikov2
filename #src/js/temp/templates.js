$(function () { //JQuery

   // $('.intro__location .intro__item').on('click', function(event) {
   // var id = $(this).attr('data-id');
   //    $('#'+id).toggleClass('active');
   //    $(this).toggleClass('current');
   //    return false;
   // }); 
   
   // $('.intro__location .intro__description-cross').on('click', function(event) {
   //    $('.intro__description').removeClass('active');
   //    $('.intro__item').removeClass('current');
   //    return false;
   // }); 

   // $('.industries__tabs .js-trigger').click(function() {
   //    var id = $(this).attr('data-tab'),
   //    content = $('.js-content[data-tab="'+ id +'"]');
   //    $('.js-trigger.active').removeClass('active'); // 1
   //    $(this).addClass('active'); // 2
   //    $('.js-content.active-tab').removeClass('active-tab'); // 3
   //    content.addClass('active-tab'); // 4
   // });

   // $('.slider-reviews').slick({
   //    slidesToShow: 1,
   //    slidesToScroll: 1,
   //    arrows: true,
   //    dots: true,
   // });

   // $('.story__slider').slick({
   //    dots: false,
   //    arrows: false,
   //    slidesToShow: 1,
   //    slidesToScroll: 1,
   //    autoplay: true,
   //    autoplaySpeed: 2000,
   //    fade: true,
   // });

   // $('.accordion__item .js-label').click(function() {
   //    var id = $(this).attr('data-tab'),
   //    content = $('.js-wrapper[data-tab="'+ id +'"]');
   //    // $('.js-label.active').removeClass('active'); // 1
   //    $(this).toggleClass('active'); // 2
   //    // $('.js-wrapper.active-wrap').removeClass('active-wrap'); // 3
   //    content.toggleClass('active-wrap'); // 4
   // });


   // $('.menu__btn').on('click', function(){
   //   $('.menu__list').slideToggle();
   // }); Для бургера!

   //   $('.class').slick({
   //   dots: true,
   //   arrows: false,
   //   slidesToShow: 4,
   //   slidesToScroll: 4,
   // }); Обычный одиночный слайдер!

   //  $('.slider-for').slick({
   //   slidesToShow: 1,
   //   slidesToScroll: 1,
   //   arrows: false,
   //   fade: true,
   //   asNavFor: '.slider-nav'
   // });
   // $('.slider-nav').slick({
   //   slidesToShow: 3,
   //   slidesToScroll: 1,
   //   asNavFor: '.slider-for',
   //   dots: true,
   //   centerMode: true,
   //   focusOnSelect: true
   // }); Двойной слайдер!


   // $('.wrapper .tab').on('click', function(event) {
   // var id = $(this).attr('data-id');
   //   $('.wrapper').find('.tab-item').removeClass('active-tab').hide();
   //   $('.wrapper .tabs').find('.tab').removeClass('active');
   //   $(this).addClass('active');
   //   $('#'+id).addClass('active-tab').fadeIn();
   //   return false;
   // }); Для табов!

   // $('.accordion__item .js-label').click(function() {
   //   var id = $(this).attr('data-tab'),
   //     content = $('.js-wrapper[data-tab="'+ id +'"]');
   //   $(this).toggleClass('active'); 
   //   content.toggleClass('active-wrap'); 
   // });
   // вариант аккордеона и добавления класса

});



// чистый JS

/////////////////////// для добавления/удаление класса
// function makeBurgerACtive() {
// 	headerBurger.classList.toggle('active');
// 	headerMenu.classList.toggle('active');
// }



////////////////////// функция работающая в зависимости от ширины экрана
// function switchHeaderBlock() {
//    if (window.innerWidth < 768) {
//      headerMenu.appendChild(headerSocial);
//   } else {
//      headerMenu.removeChild(headerSocial);
//      headerLinks.appendChild(headerSocial);
//   }
// }


////////////// событие которое следит за шириной экрана
// window.addEventListener('resize', switchHeaderBlock);

//HEADER-BURGER===========================================
// const menuBurger = document.querySelector('.menu__burger');
// const menu = document.querySelector('.menu');

// function openMenu() {
// 	menu.classList.toggle('opened');
// 	menuBurger.classList.toggle('opened');
// }

// menuBurger.addEventListener('click', openMenu);

//HEADER-BURGER===========================================