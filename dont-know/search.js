
/*jshint browser: true, jquery: true */
/*jshint multistr: true */

/* global APP */

APP.views.search = (function() {
    'use strict';

//var itemTemplate = '\
//<div><p>{{1}}</p></div>';

//var channelTemplate = '\
//<div class="article-header">\
//    <h3>Channel: {{1}}</h3>\
//</div>';
//
//var headerTemplate = '\
//<div class="article-header">\
//    <h2>{{1}}</h2>\
//</div>';


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
<div class="article-header">\
    <h2>{{selected.type}}</h2>\
</div>\
{{channels}}';

var outerTemplate = '\
<section class="content-header content-subhead">\
{{type}}\
</section>';

    function buildArticle(item) {
        console.log("item.description");
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
//
//    function buildType(selectedType, data) {
//        var html_items = '';
//        data.forEach(function(item) {
//            html_items += buildChannel(item);
//        });
//
//        var html = outerTemplate.replace('{{selected.type}}', selectedType)
//            .replace('{{channels}}', html_items);
//        return html;
//    }

    return {
        render: function(data, element) {
            var html = '';
            html += buildChannels('favorites', data.favorites);
            html += buildChannels('saved', data.saved);
            html += buildChannels('subscriptions', data.subscriptions);
            element.html(html);
        }
    };

})();

/*
    function buildItem(item) {
        return itemTemplate.replace('{{1}}', item.title);
    }

    function buildChannel(data) {
        var html = channelTemplate.replace('{{1}}', data.channel.title);
        data.items.forEach(function(item) {
            html += buildItem(item);
        });
        return html;
    }

    function buildChannels(selectedType, data) {
        if (typeof data === 'undefined' || data === null) {
            return '';
        }
        var html = headerTemplate.replace('{{1}}', selectedType);
        data.forEach(function(item) {
            html += buildChannel(item);
        });
        return html;
    }
*/
