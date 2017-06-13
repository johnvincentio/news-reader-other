
/*jshint browser: true, jquery: true */
/*jshint multistr: true */

/* global APP */

$(function() {
    'use strict';

    $.fn.editable.defaults.mode = 'inline';

    APP.$DOM = {
        main : $('#container'),
        nav_menu_button : $('.js--nav-menu-button'),
        left_nav : $('.js--nav-inner'),
        search_btn : $('.js--search-btn'),
        search_field : $('.js--search-field'),
        content: $('.js--content')
    };

    var $MOCK = {
        username: 'john'
    };

/* ----------------------------------- */
/* Custom events */
/* ----------------------------------- */

    APP.$DOM.main.on('init', function(event, selectObject) {
        console.log("$main.on('init')");
        APP.model.users.getData($MOCK.username, function() {
            APP.$DOM.main.trigger('nav', selectObject);
            APP.$DOM.main.trigger('article', selectObject);
        });
    });

    APP.$DOM.main.on('update-nav', function(event, selectObject) {
        console.log("$main.on('update-nav')");
        APP.model.users.getData($MOCK.username, function() {
            APP.$DOM.main.trigger('nav', selectObject);
        });
    });

    APP.$DOM.main.on('nav', function(event, selectObject) {
        console.log("$main.on('nav'), selectObject "+selectObject);
        APP.views.nav.render(selectObject, APP.model.users.getStorage(), APP.$DOM.left_nav);
    });

    APP.$DOM.main.on('article', function(event, selectObject) {
        console.log("$main.on('article'), selected "+selectObject);
        APP.views.users.render(selectObject, APP.model.users.getStorage(), APP.$DOM.content);
    });

    APP.$DOM.main.on('select-subscription', function(event, url, title) {
        console.log("$main.on('select-subscription'), url "+url);
        var cleanUrl = encodeURIComponent(url);
        console.log("encoded :"+cleanUrl+":");
        var request = $.ajax({
            url: APP.keys.SUBSCRIPTIONS_URL + '/' + cleanUrl,
            data: {format: 'json'},
            dataType: 'json',
            type: 'GET'
        });
        request.done(function(data) {
            console.log("addData");
            APP.$DOM.main.trigger('nav', {type: "subscription", value: url});
            APP.views.subscription.render(data, title, APP.$DOM.content);
        });
        request.fail(function(jqXHR, status) {
            console.log("ajax get failed; "+status);
        });
    });

    APP.$DOM.main.on('search-complete', function(event, query, data) {
        console.log("$main.on('search-complete')");
        APP.$DOM.main.trigger('nav', {type: "search", value: query});
        APP.views.search.render(data, APP.$DOM.content);
    });

/* ----------------------------------- */
/* Mobile navigation                   */
/* ----------------------------------- */

    APP.$DOM.nav_menu_button.click(function() {
        var nav = $('#nav');
        nav.toggleClass('active');
    });

/* ----------------------------------- */
/* User selected Search */
/* ----------------------------------- */

    APP.$DOM.search_btn.on('click', function() {
        var query = APP.$DOM.search_field.val().trim().toLowerCase();
        console.log('Search: query '+query);

//        var cleanUrl = encodeURIComponent(query);
//        console.log("encoded :"+cleanUrl+":");
        var data = {"query": query, "username": $MOCK.username};
        var request = $.ajax({
            url: APP.keys.SEARCH_URL + '/',
            data: JSON.stringify(data),
            dataType: 'json',
            contentType: 'application/json',
            type: 'POST'
        });
        request.fail(function(jqXHR, status, ex) {
            console.log("ajax get failed; status "+status+" ex "+ex);
            console.log("status code "+jqXHR.status+" responseText  "+jqXHR.responseText);
            APP.$DOM.content.text('Search Error; '+jqXHR.responseText);
        });
        request.done(function(data, responseText) {
            console.log("responseText "+responseText);
            APP.$DOM.main.trigger('search-complete', [query, data]);
        });
    });

/*
* User presses Enter while in the search text box
*/
    APP.$DOM.search_field.keypress(function(event) {
        console.log(event);
        if (event.keyCode === 13 || event.which === 13) {
            APP.$DOM.search_btn.click();
        }
    });

/* ----------------------------------- */
/* User selected Article Item */
/* ----------------------------------- */

    APP.$DOM.left_nav.on('click', '.js--select-article', function(e) {
        console.log("click left_nav.on('click', '.js--select-article'");
        var type = $(e.currentTarget).attr('data-item-type');
        APP.$DOM.main.trigger('nav', {type: "article", value: type});
        APP.$DOM.main.trigger('article', {type: "article", value: type});
    });

/* ----------------------------------- */
/* User selected Subscription          */
/* ----------------------------------- */

    APP.$DOM.left_nav.on('click', '.js--select-subscription', function(e) {
        console.log("click left_nav.on('click', '.js--select-subscription'");
        var url = $(e.currentTarget).attr('data-item-url');
        var title = $(e.currentTarget).text();
        APP.$DOM.main.trigger('select-subscription', [url, title]);
    });

/* ----------------------------------- */
/* User selected Import Subscription   */
/* ----------------------------------- */

    APP.$DOM.left_nav.on('click', '.js--import', function() {
        console.log("click left_nav.on('click', '.js--import'");
        APP.views.import.render(APP.$DOM.content);
    });

/* ----------------------------------------- */
/* User selected Import Subscription Submit  */
/* ----------------------------------------- */
/*
1. ensure feed is not empty, else produce error
2. post url to server.
3. if error, produce error message.
4. if no error, refresh user data.
*/
/*
    test with:
http://feeds.reuters.com/reuters/USVideoWorldNews
*/
    APP.$DOM.main.on('click', '.js--import-submit', function(e) {
        console.log("click main.on.on('click', '.js--import-submit'");
        e.preventDefault();
        var $div = $(e.currentTarget).closest('fieldset');
        var feed_url = $div.find('#feed').val();
        if (feed_url === '') {
            $div.find('.js--form-errors').text('Please enter a valid RSS Feed URL');
        }
        else {
            console.log('Importing: ' + feed_url);
            var cleanUrl = encodeURIComponent(feed_url);
            console.log("encoded :"+cleanUrl+":");
            var request = $.ajax({
                url: APP.keys.IMPORT_URL + '/' + cleanUrl,
                dataType: 'json',
                contentType: 'application/json',
                type: 'GET'
            });
            request.fail(function(jqXHR, status, ex) {
                console.log("ajax get failed; status "+status+" ex "+ex);
                console.log("status code "+jqXHR.status+" responseText  "+jqXHR.responseText);
                $div.find('.js--form-errors').text(jqXHR.responseJSON.message);
            });
            request.done(function(data, responseText) {
                console.log("responseText "+responseText);
                APP.$DOM.main.trigger('init', {type: "subscription", value: feed_url});
            });
        }
    });

    /* ----------------------------------------- */
    /* User selected Delete Subscription         */
    /* ----------------------------------------- */

    APP.$DOM.content.on('click', '#js--subscription-list-articles .js--trash-btn', function(e) {
        console.log("'click', '#js--subscription-list-articles .js--trash-btn'");
        e.preventDefault();
        var url = $('#js--subscription-list-articles').attr('data-item-url');
        console.log("Delete Subscription: url :"+url+":");

        var data = {"url": url, "username": $MOCK.username};
        var request = $.ajax({
            url: APP.keys.USERS_URL + '/subscription/delete',
            data: JSON.stringify(data),
            dataType: 'json',
            contentType: 'application/json',
            type: 'POST'
        });
        request.fail(function(jqXHR, status, ex) {
            console.log("ajax get failed; status "+status+" ex "+ex);
            console.log("status code "+jqXHR.status+" responseText  "+jqXHR.responseText);
            APP.$DOM.content.find('.js--form-errors').text(jqXHR.responseJSON.message);
        });
        request.done(function(data, responseText) {
            console.log("responseText "+responseText);
            APP.$DOM.main.trigger('init', {type: "article", value: 'unread'});
        });
    });

    /* ----------------------------------------------------- */
    /* Show Subscription; User selected Add Favorite Article */
    /* ----------------------------------------------------- */

    APP.$DOM.content.on('click', '#js--subscription-list-articles .js--favorite-btn', function(e) {
        console.log("'click', '#js--subscription-list-articles .js--favorite-btn'");
        e.preventDefault();
        var $dismiss_div = $(e.currentTarget).closest('.js--article-item');
        var article_url = $dismiss_div.attr('data-item-url');
        var channel_url = $('#js--subscription-list-articles').attr('data-item-url');
        console.log("Add Favorite Article: url :"+article_url+":");
        console.log("Add Favorite Article Channel: url :"+channel_url+":");

        var data = {"channel_url": channel_url, "article_url": article_url, "username": $MOCK.username};
        var request = $.ajax({
            url: APP.keys.USERS_URL + '/favorite/add',
            data: JSON.stringify(data),
            dataType: 'json',
            contentType: 'application/json',
            type: 'POST'
        });
        request.fail(function(jqXHR, status, ex) {
            console.log("ajax get failed; status "+status+" ex "+ex);
            console.log("status code "+jqXHR.status+" responseText  "+jqXHR.responseText);
            APP.$DOM.content.find('.js--form-errors').text(jqXHR.responseJSON.message);
        });
        request.done(function(data, responseText) {
            console.log("add favorite; responseText "+responseText);
            APP.$DOM.main.trigger('update-nav', {type: "subscription", value: channel_url});
            $dismiss_div.remove();
        });
    });

    /* --------------------------------------------------- */
    /* Show Subscription; User selected Bookmarked Article */
    /* --------------------------------------------------- */

   APP.$DOM.content.on('click', '#js--subscription-list-articles .js--bookmark-btn', function(e) {
        console.log("'click', '#js--subscription-list-articles .js--bookmark-btn'");
        e.preventDefault();
        var $dismiss_div = $(e.currentTarget).closest('.js--article-item');
        var article_url = $dismiss_div.attr('data-item-url');
        var channel_url = $('#js--subscription-list-articles').attr('data-item-url');
        console.log("Bookmarked Article: url :"+article_url+":");
        console.log("Bookmarked Article Channel: url :"+channel_url+":");

        var data = {"channel_url": channel_url, "article_url": article_url, "username": $MOCK.username};
        var request = $.ajax({
            url: APP.keys.USERS_URL + '/bookmark/add',
            data: JSON.stringify(data),
            dataType: 'json',
            contentType: 'application/json',
            type: 'POST'
        });
        request.fail(function(jqXHR, status, ex) {
            console.log("ajax get failed; status "+status+" ex "+ex);
            console.log("status code "+jqXHR.status+" responseText  "+jqXHR.responseText);
            APP.$DOM.content.find('.js--form-errors').text(jqXHR.responseJSON.message);
        });
        request.done(function(data, responseText) {
            console.log("add bookmark; responseText "+responseText);
            APP.$DOM.main.trigger('update-nav', {type: "subscription", value: channel_url});
            $dismiss_div.remove();
        });

    });

    /* ------------------------------------------------- */
    /* Show Subscription; User selected Dismiss Article  */
    /* ------------------------------------------------- */

    APP.$DOM.content.on('click', '#js--subscription-list-articles .js--dismiss-btn', function(e) {
        console.log("'click', '#js--subscription-list-articles .js--dismiss-btn'");
        e.preventDefault();

        var $dismiss_div = $(e.currentTarget).closest('.js--article-item');
        var article_url = $dismiss_div.attr('data-item-url');
        var channel_url = $('#js--subscription-list-articles').attr('data-item-url');
        console.log("Dismiss Article Channel: url :"+channel_url+":");
        console.log("Dismiss Article: url :"+article_url+":");
        var data = {"channel_url": channel_url, "article_url": article_url, "username": $MOCK.username};
        var request = $.ajax({
            url: APP.keys.USERS_URL + '/article/dismiss',
            data: JSON.stringify(data),
            dataType: 'json',
            contentType: 'application/json',
            type: 'POST'
        });
        request.fail(function(jqXHR, status, ex) {
            console.log("ajax get failed; status "+status+" ex "+ex);
            console.log("status code "+jqXHR.status+" responseText  "+jqXHR.responseText);
            APP.$DOM.content.find('.js--form-errors').text(jqXHR.responseJSON.message);
        });
        request.done(function(data, responseText) {
            console.log("add favorite; responseText "+responseText);
            APP.$DOM.main.trigger('update-nav', {type: "subscription", value: channel_url});
            $dismiss_div.remove();
        });
    });

/* ----------------------------------- */
/* Entry point                         */
/* ----------------------------------- */

//    APP.$DOM.main.trigger('init', {type: "article", value: 'unread'});

    APP.views.nav.render(APP.$DOM.left_nav);

});
