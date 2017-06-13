
/*jshint browser: true, jquery: true */
/*jshint multistr: true */

/* global APP */

APP.views.users = (function() {
    'use strict';

//    var myRegexp = /<!\[CDATA\[(.*)]]>/;
// myRegexp.exec(item.channel.description)[1]

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

var channelHeaderTemplate = '\
<section class="js--subscription-list-articles" data-item-url="{{channel.url}}">\
    <header>\
        <a href="#" id="channel-title">{{channel.title}}</a>\
        <button class="js--trash-btn trash-icon pure-button">\
            <i class="fa fa-trash" aria-hidden="true"></i>\
        </button>\
    </header>\
    <div class="js--form-errors form-error"></div>\
{{articles}}\
</section>';

var headerTemplate = '\
<section class="content-header content-subhead">\
<div class="article-header">\
    <h2>{{selected.type}}</h2>\
</div>\
{{channels}}\
</section>';

    function buildArticle(item) {
        var html = itemTemplate.replace('{{article.title}}', item.title)
            .replace('{{article.url}}', item.link)
            .replace('{{article.link}}', item.link)
            .replace('{{article.description}}', item.description);
        return html;
    }

    function buildChannel(data) {
        var html_items = '';
        data.items.forEach(function(item) {
            html_items += buildArticle(item);
        });
        var html = channelHeaderTemplate.replace('{{channel.title}}', data.channel.description)
            .replace('{{channel.url}}', data.url)
            .replace('{{channel.alt}}', data.channel.description)
            .replace('{{channel.image}}', data.channel.image)
            .replace('{{articles}}', html_items);
        return html;
    }

    function buildChannels(selectedType, data) {
        var html_items = '';
        data.forEach(function(item) {
            html_items += buildChannel(item);
        });

        var html = headerTemplate.replace('{{selected.type}}', selectedType)
            .replace('{{channels}}', html_items);
        return html;
    }

    return {
        render: function(selectObject, data, element) {
            element.html(buildChannels(selectObject.value, data[selectObject.value]));
        }
    };

})();
