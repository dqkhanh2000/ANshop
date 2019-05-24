$(document).ready(function () {
    $('.delete').click(function (e) { 
        e.preventDefault();
        $(this).parent().parent().hide();
    });
    function myalert(mess) {
        $('.alert').text('');
        $('.alert').text(mess);
        $('.alert').fadeIn();
        setTimeout(() => {
            $('.alert').fadeOut('slow');
        }, 1500);
    }
    $('#btn-login').click (function (e) {
        myalert('Đăng nhập thành công');
    });
    $('#btn-signup').click(function (e) {
        myalert('Đăng ký thành công');
    });
    $(document).on("click", '.add-list-favorite', function (e) {
        e.preventDefault();
        myalert('Đã thêm vào danh sách yêu thích');
    });
    $(document).on("click", '.add-cart',function (e) {
        e.preventDefault();
        myalert('Đã thêm vào giỏ hàng');
    });



    var search = $(".search-bar");
    $(document).on("click", ".icon-show", function (e) {
        
        if (search.css("display") === "none") {
            e.preventDefault();
            search.show();
            search.animate({ width: "250px" }, 200);
            if($(document).width() >= 900 && $(document).width() <= 1050){
               $('.lg-hide').hide();
            }
        }
        else if (search.val() == '') {
            e.preventDefault();
            search.animate({ width: "0" }, 200);
            setTimeout(() => {
                search.hide();
                if($(document).width() >= 900 && $(document).width() <= 1050){
                    $('.lg-hide').show();
                 }
            }, 160);
        }
    });
    $(window).on('scroll', function () {
        var position = $(window).scrollTop();
        if (position > 90) {
            $('.navmenu').addClass("fix-top");
        }
        else {
            $('.navmenu').removeClass("fix-top");
        }
    });
    //animate dropdown
    // if($('.mobile').css("display") === "none"){
       
    // }
    

    //login group
    $('.signup-title').click(function (e) {
        e.preventDefault();
        if ($('.signup-form').css("display") === "none") {
            $('.login-form').hide();
            $('.login-title').addClass('left-hide');
            $('.signup-title').removeClass('right-hide');
            $('.signup-form').slideDown('fast');

        }
    });
    $('.login-title').click(function (e) {
        e.preventDefault();
        if ($('.login-form').css("display") === "none") {
            $('.signup-form').hide();
            $('.signup-title').addClass('right-hide');
            $('.login-title').removeClass('left-hide');
            $('.login-form').slideDown('fast');
        }
    });
    $('.carousel-banner').owlCarousel({
        items: 1,
        loop: true,
        margin: 10,
        autoplay: true,
        autoplayTimeout: 4000,
        autoplayHoverPause: true,
        animateOut: 'fadeOut'
    });

    $('.carousel-detail').owlCarousel({
        items: 1,
        margin: 10,
        autoplayHoverPause: true,
        animateOut: 'fadeOut',
        dotsContainer: '#carousel-custom-dots'
    });
    $('.owl-dot').click(function () {
        $('.carousel-detail').trigger('to.owl.carousel', [$(this).index(), 300]);
    });

    var owl = $('.carousel-product');
    owl.owlCarousel({
        responsive: {
            0: {
                items: 1
            },
            320: {
                items: 2
            },
            768: {
                items: 3
            },
            1024: {
                items: 5
            }
        },
        dots: false,
        margin: 20,
        autoplayHoverPause: true,
        animateOut: 'fadeOut',
    });

    $('.next').click(function (e) {
        // e.preventDefault();
        $(this).parent().parent().children('.owl-carousel').trigger('next.owl.carousel');
    });
    $('.pre').click(function (e) {
        e.preventDefault();
        $(this).parent().parent().children('.owl-carousel').trigger('prev.owl.carousel');
    });
    $(".owl-carousel").on('initialized.owl.carousel changed.owl.carousel refreshed.owl.carousel', function (e) {
        if (!e.namespace) return;
        var carousel = e.relatedTarget,
            current = carousel.current();
        if (current == 0) {
            $(this).parent().children('.control').children('.pre').addClass('no-pre');
        }
        else if (current === carousel.maximum()) {
            $(this).parent().children('.control').children('.next').children('i').hide();
            $(this).parent().children('.control').children('.next').children('.more').show();
        }
        else {
            $(this).parent().children('.control').children('.pre').removeClass('no-pre');
            $(this).parent().children('.control').children('.next').children('.more').hide();
            $(this).parent().children('.control').children('.next').children('i').show();
        }
    });

    $('.list li').click(function () {
        $(this).parent().children('li').removeClass('active');
        $(this).addClass('active');
    });

    $('#btn-update-cart').click(function (e) { 
        e.preventDefault();
        myalert('Đã cập nhật giỏ hàng')
    });

    $('.btn-more-product').click(function (){
        $(this).children('.watting').show();
        $(this).children('span').hide();
        $(this).children('.fa-arrow-alt-down').hide();
        setTimeout(() =>{
            $.get('./moreproduct.php', function(data){
                $('.list-product').append(data);
            });
            $(this).children('.watting').hide();
            $(this).children('span').show();
            $(this).children('.fa-arrow-alt-down').show();
        }, 500)
    });

    //reponsive
    if($(document).width() <= 800){
        $('.space').removeClass('space');
        $('.detail').parent().removeClass('row');
        $('.icon-menu').click(function (){
            $('.filter').toggle();
            $(this).toggleClass('fa-bars');
            $(this).toggleClass('fa-times');
            $('.menu-right').toggle();
            if($(this).parent().children('.navbar').css("display") === "none")
                $(this).parent().children('.navbar').slideDown('fast');
            else
            $(this).parent().children('.navbar').slideUp('fast');
        });
        
        $('.dropdown a').click(function () {
            $(this).parent().children('.box-dropdown').animate({
                height: 'toggle'
            });
        });
        $('.nav-item').click(function (e) { 
            $(this).children('.box-dropdown').animate({
                height: 'toggle'
            });
            $(this).children('i').toggleClass('fa-plus');
            $(this).children('i').toggleClass('fa-minus');
        });
    }
    else{
        $('.dropdown').hover(function () {
            $(this).children('.box-dropdown').slideDown('fast');
        }, function () {
            $(this).children('.box-dropdown').slideUp('fast');
        }
        );
    }

});