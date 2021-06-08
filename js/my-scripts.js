

//Carrusels
$('.owl-novedades').owlCarousel({
    margin: 24,
    loop: true,
    responsiveClass: true,
    responsive: {
        0: {
            items: 1,
            nav: false
        },
        600: {
            items: 2,
            nav: false
        },
        1000: {
            items: 4,
            nav: true,
            loop: true
        }
    }
})
$('.owl-categorias').owlCarousel({
    margin: 24,
    loop: true,
    responsiveClass: true,
    responsive: {
        0: {
            items: 1,
            nav: false
        },
        600: {
            items: 2,
            nav: false
        },
        1000: {
            items: 4,
            nav: true,
            loop: true
        }
    }
})
$('.owl-slider').owlCarousel({
    margin: 0,
    loop: true,
    nav: true, // Show next and prev buttons
    autoplay: true,
    autoplayTimeout: 5000,
    autoplayHoverPause: true,
    responsive: {
        0: {
            nav: false
        },
        600: {
            nav: false
        },
        1000: {
            nav: true,
            loop: true
        }
    },

    slideSpeed: 300,
    paginationSpeed: 400,

    items: 1,
    itemsDesktop: false,
    itemsDesktopSmall: false,
    itemsTablet: false,
    itemsMobile: false
})