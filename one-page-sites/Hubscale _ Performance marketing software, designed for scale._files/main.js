jQuery(document).ready(function($){
	// Add open modal bootstrap attributes to links in top menu
// 	$('.navbar-nav li.openContactForm').attr({"data-toggle":"modal", "data-target":"#ModalWrap"});
// 	$('.navbar-nav li.openGetDemoForm').attr({"data-toggle":"modal", "data-target":"#ModalWrap"});

	// Form Dropdown Script
	var inline_dropdown_wrap = $('.form-body').find('.dropdown');
	var inline_dropdown_menu = inline_dropdown_wrap.find('.dropdown-menu');
	var inline_dropdown_button = inline_dropdown_wrap.find('.MeetingDropDownLabel');
	
	
	var inline_dropdown_menu_elem = inline_dropdown_menu.find('li');
	
	inline_dropdown_menu_elem.click(function(e){
		e.preventDefault();
		
		var inline_dropdown_menu_elem_text = $(this).find('a').text();
		
		inline_dropdown_button.html(inline_dropdown_menu_elem_text + '<span><i class="fa fa-chevron-down" aria-hidden="true"></i><span>');
		
		var inline_index_elem = $(this).index() + 1;
		
		var inline_talk_selected_elem = $('.form-body').find('.wpcf7-select option:nth-child('+inline_index_elem+')').attr('selected', 'selected');
	});


		//Opening Forms
// 		$('.openContactForm').click(function(e){
// 			e.preventDefault();
// 			$('#ScheduleMeetingFormWrap').css('display','none');
// 			$('#GetDemoFormWrap').css('display','none');
// 			$('#ContactUsFormWrap').fadeIn();
// 		});
// 		$('.openGetMeetingForm').click(function(e){
// 			$('#ContactUsFormWrap').css('display','none');
// 			$('#GetDemoFormWrap').css('display','none');
// 			$('#ScheduleMeetingFormWrap').fadeIn();
// 		});
// 		$('.openGetDemoForm').click(function(e){
// 			e.preventDefault();
// 			$('#ContactUsFormWrap').css('display','none');
// 			$('#ScheduleMeetingFormWrap').css('display','none');
// 			$('#GetDemoFormWrap').fadeIn();
// 		});

		// Cleaning Form and Close Forms
		$('.cancel-form').click(function(e){
		    // $('.new-forms-wrap').fadeOut();
		    // $('.new-forms-wrap .become-supplier-form-wrap').fadeOut();
		    // $('.new-forms-wrap .become-supplier-form-wrap .sent-ok-message').fadeOut();
		    // $('.new-forms-wrap .become-supplier-form-wrap .wpcf7').fadeIn();
		    // Hide form-wrap
	   //  	e.preventDefault();
    //         history.back();


		    // Reset Contact form Data
		    $(this).closest('.form-body form')[0].reset();
		    $(this).closest('.form-body form').find('input').attr('aria-invalid', 'false');
		    $(this).closest('.form-body form span.wpcf7-not-valid-tip').remove();
		    $(this).closest('.form-body form').find('input').removeClass('wpcf7-not-valid');
		    inline_dropdown_button.html('Select a Meeting<span><i class="fa fa-chevron-down" aria-hidden="true"></i></span>');
		    $(this).closest('.form-body').find('.wpcf7-select option:nth-child(1)').attr('selected', 'selected');
		});

// 		// Thank you message
// 		$('.close-thank, .history-back').click(function(e){
// 			e.preventDefault();
//             history.back();
// 		});
		


	// #MEETUS SLIDER
	$('.center-slick').slick({
	  centerMode: true,
	  centerPadding: '20%',
	  slidesToShow: 1,
   	prevArrow: $('#meetus .prev'),
    nextArrow: $('#meetus .next'),
	  slidesToScroll: 1,
	  autoplay: true,
	  speed: 500,
  	autoplaySpeed: 5000,
	  responsive: [
	    {
	      breakpoint: 480,
	      settings: {
	        arrows: false,
	        centerMode: true,
	        centerPadding: '50px',
	        slidesToShow: 1
	      }
	    }
	  ]
	});

	$('a[href*="#"]')

	  .not('[href="#"]')
	  .not('[href="#0"]')
	  .not('[href^="#collapse"]')
	  .click(function(event) {

	    if (
	      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
	      && 
	      location.hostname == this.hostname
	    ) {

	      var target = $(this.hash);
	      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');

	      if (target.length) {

	        event.preventDefault();
	        $('html, body').animate({
	          scrollTop: target.offset().top - 72
	        }, 1000);
	      }
	    }
	  });


	  // Switcher 
	  $(".custom-switcher input").change(function() {
		    if(this.checked) {
		        $('.default-switcher input').prop('checked', true);
		    }else{
		    	$('.default-switcher input').prop('checked', false);
		    }
		});


		/*sticky header*/
		$(window).scroll(function() {
			if ($(this).scrollTop() > 93){
				$('header').addClass("sticky");
			}
			else{
			$('header').removeClass("sticky");
			}
		});



        // Partners Carousel
        jQuery('#carousel-logo-customers').bind('slid.bs.carousel', function (e) {
            // alert(2);
            var index_item = $(this).find('.item.active').index() + 1;
        	$('.partners-titles-wrap h2.heading-'+index_item).addClass('active').siblings().removeClass('active');
			$('.partners-titles-wrap h2.heading-'+index_item).siblings().css('display','none');
			$('.partners-titles-wrap h2.heading-'+index_item).fadeIn();
        });
        
        
        
        // Hide mobile menu on click link
        if (screen.width < 992) {
            $('.navbar-nav>li>a').attr({"data-toggle":"collapse","data-target":"#primary-top-menu","aria-expanded":"true"});
        }else{
            $('.navbar-nav>li>a').removeAttr("data-toggle").removeAttr("data-target").removeAttr("aria-expanded");
        }

        
});