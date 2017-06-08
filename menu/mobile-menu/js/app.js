$(function() {
    // Insert Responsive Navigation Icon, Close Icon, and Overlay
    // If you have access to your HTML, you should put this directly into your markup.
    $('<div class="responsive-nav-icon" />').appendTo('.row.one');
    $('<div class="responsive-nav-close" />').appendTo('nav');
    $('<div id="overlay" />').insertAfter('footer');

    // Navigation Slide In
    $('.responsive-nav-icon').click(function() {
        $('nav').addClass('slide-in');
        $('html').css("overflow", "hidden");
        $('#overlay').show();
        return false;
    });

    // Navigation Slide Out
    $('#overlay, .responsive-nav-close').click(function() {
        $('nav').removeClass('slide-in');
        $('html').css("overflow", "auto");
        $('#overlay').hide();
        return false;
    });
});
