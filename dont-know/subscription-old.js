
/*jshint browser: true, jquery: true */
/*jshint multistr: true */

/* global APP */

APP.views.subscription = (function() {
    'use strict';

var itemTemplate = '\
<div class="js--article-item" data-item-url="{{article.url}}">\
    <div class="article-header">\
        <a href="{{article.link}}" target="_blank">{{article.title}}</a>\
        <button class="js--favorite-btn favorite-icon pure-button">\
            <i class="fa fa-star" aria-hidden="true"></i>\
        </button>\
        <button class="js--bookmark-btn bookmark-icon pure-button">\
            <i class="fa fa-bookmark" aria-hidden="true"></i>\
        </button>\
        <button class="js--dismiss-btn dismiss-icon pure-button">\
            <i class="fa fa-times-circle" aria-hidden="true"></i>\
        </button>\
    </div>\
    <p class="article-description">\
    {{article.description}}\
    </p>\
</div>';

var headerTemplate = '\
<section id="js--subscription-list-articles" class="content-header content-subhead" data-item-url="{{channel.url}}">\
    <header>\
        <a href="#" id="channel-title">{{channel.title}}</a>\
        <button class="js--trash-btn trash-icon pure-button">\
            <i class="fa fa-trash" aria-hidden="true"></i>\
        </button>\
    </header>\
    <div class="js--form-errors form-error"></div>\
{{articles}}\
</section>';

    var select_url;

    function buildItem(item) {
        var html = itemTemplate.replace('{{article.title}}', item.title)
            .replace('{{article.url}}', item.link)
            .replace('{{article.link}}', item.link)
            .replace('{{article.description}}', item.description);
        return html;
    }

    return {
        render: function(data, title, element) {
            var html_items = '';
            data.items.forEach(function(item) {
                html_items += buildItem(item);
            });
            var html = headerTemplate.replace('{{channel.title}}', title)
                .replace('{{channel.url}}', data.url)
                .replace('{{channel.alt}}', title)
                .replace('{{channel.image}}', data.channel.image)
                .replace('{{articles}}', html_items);
            element.html(html);

//            $.fn.editable.defaults.ajaxOptions = {contentType: "application/json"};
//            $.fn.editable.defaults.ajaxOptions = {dataType: "json"};

            select_url = data.url;

            $('#channel-title').editable({
                type: 'text',
                pk: data.url,
                url: APP.keys.USERS_URL+'/subscription/title',
                success: function(response, newValue) {
                    console.log("success; response.message "+response.message);
                    APP.$DOM.main.trigger('update-nav', {type: "subscription", value: select_url});
                }
            });
        }
    };

})();
