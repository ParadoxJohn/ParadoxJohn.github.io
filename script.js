$(document).ready(function() {
    $('.reasons-slider').slick({
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 1,
        touchMove: true,
        prevArrow: `
        <button type="button" class="slick-prev">
            <img src="img/ArrowLeft.svg" alt="Previous" />
        </button>`,
        nextArrow: `
        <button type="button" class="slick-next">
            <img src="img/ArrowRight.svg" alt="Next" />
        </button>`,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                }
            },
            {
                breakpoint: 361,
                settings: {
                    slidesToShow: 1,
                    dots: true,
                    arrows: false
                }
            }
        ]
    });

    function updateSliderSettings() {
        if ($(window).width() <= 360) {
            $('.reasons-slider').slick('slickSetOption', 'dots', true, true);
            $('.reasons-slider').slick('slickSetOption', 'arrows', false, true);
        } else {
            $('.reasons-slider').slick('slickSetOption', 'dots', false, true);
            $('.reasons-slider').slick('slickSetOption', 'arrows', true, true);
        }
    }

    updateSliderSettings();
    $(window).resize(updateSliderSettings);

    $('.hero, .reasons').hide().fadeIn(1000);

    window.addEventListener('load', function() {
        const images = document.querySelectorAll('.overlay-image');
        images.forEach(image => {
            image.style.opacity = '1';
            image.style.transform = 'translateY(0)';
        });
    });

    $('#contactSalesBtn').on('click', function() {
        $('#contactModal').modal('show');
    });

    $('.plerdy-tool-btn').on('click', function() {
        $('#contactModal').modal('show');
    });

    $('.btn-footer').on('click', function() {
        $('#contactModal').modal('show');
    });

    $('#contactForm').submit(function(e) {
        e.preventDefault();
        let isValid = true;
        $('#contactForm input').each(function() {
            const $this = $(this);
            const value = $this.val().trim();
            const $errorMessage = $this.next('.error-message');

            if (value === '') {
                isValid = false;
                $this.addClass('is-invalid');
                if ($errorMessage.length === 0) {
                    $this.after('<div class="error-message">This field is required.</div>');
                }
                $this.css('border-color', 'red'); // Встановлення червоного бордера
            } else {
                $this.removeClass('is-invalid');
                $this.next('.error-message').remove();
                $this.css('border-color', ''); // Встановлення стандартного бордера
            }
        });

        if (isValid) {
            alert('Form submitted successfully!');
            $('#contactModal').modal('hide');
        }
    });

    // Handle input field change to remove error styles when filled
    $('#contactForm input').on('input', function() {
        const $this = $(this);
        const value = $this.val().trim();
        
        if (value === '') {
            $this.css('border-color', 'red'); // Червоний бордер для порожніх полів
        } else {
            $this.css('border-color', ''); // Стандартний бордер для заповнених полів
            $this.next('.error-message').remove();
            $this.removeClass('is-invalid');
        }
    });

    const customSelect = $('.custom-select');
    const selectedOption = customSelect.find('.selected-option');
    const optionsList = customSelect.find('.options');

    selectedOption.on('click', function() {
        customSelect.toggleClass('open');
    });

    optionsList.find('li').on('click', function() {
        const value = $(this).data('value');
        const html = $(this).html();
        selectedOption.html(html);
        customSelect.removeClass('open');
        // Update the hidden input or use the value as needed
    });

    $(document).on('click', function(e) {
        if (!customSelect.is(e.target) && customSelect.has(e.target).length === 0) {
            customSelect.removeClass('open');
        }
    });

    let isMenuOpen = false;

    $('.navbar-toggler').on('click', function(event) {
        event.stopPropagation();
        isMenuOpen = !isMenuOpen;
        $(this).toggleClass('active', isMenuOpen);
        $('#navbarContent').toggleClass('show', isMenuOpen);
    });

    $(document).on('click', function(event) {
        var $navbar = $('.navbar');
        var $navbarToggler = $('.navbar-toggler');
        
        if (!$navbar.is(event.target) && $navbar.has(event.target).length === 0) {
            if (isMenuOpen) {
                isMenuOpen = false;
                $('#navbarContent').removeClass('show');
                $('.navbar-toggler').removeClass('active');
            }
        }
    });
});
