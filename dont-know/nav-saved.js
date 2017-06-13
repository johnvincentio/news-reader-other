
/*jshint browser: true, jquery: true */
/*jshint multistr: true */

/* global APP */

APP.views.nav = (function() {
    'use strict';

//    var myRegexp = /<!\[CDATA\[(.*)]]>/;
// myRegexp.exec(item.channel.description)[1]

/*
Handle article menu
*/

    var navItemTemplate = '\
<li class="pure-menu-item">\
    <button class="capitalize pure-button{{3}} js--select-article" data-item-type="{{4}}">{{1}}\
        <span class="article-count">{{2}}</span>\
    </button>\
</li>';

    function handleCount(type, data) {
        var count = 0;
        data[type].forEach(function(item) {
            count += item.items.length;
        });
        return (count > 0) ? '('+count+')' : '';
    }

    function buildNavArticle(selectObject, type, data) {
        var selectedType = selectObject.type === 'article' ? selectObject.value : '';
        var html = navItemTemplate.replace('{{1}}', type)
            .replace('{{2}}', handleCount(type, data))
            .replace('{{3}}', selectedType === type ? ' pure-button-active' : '')
            .replace('{{4}}', type);
        return html;
    }

/*
Handle subscription menu
*/

    var importSubscriptionTemplate = '\
<li class="pure-menu-heading">\
    <button class="js--import pure-button">\
        <i class="fa fa-plus-circle" aria-hidden="true"></i>\
    </button>\
</li>';

    var subscriptionItemTemplate = '\
<li class="pure-menu-item">\
    <button class="js--select-subscription pure-button{{3}}" data-item-url="{{2}}">{{1}}</button>\
</li>';

    function buildSubscriptions(selectObject, data) {
        var selectedUrl = selectObject.type === 'subscription' ? selectObject.value : '';
        var html = '';
        data.forEach(function(item) {
            var title = item.channel.title;
            if (item.title) {
                title = item.title;
            }
            html += subscriptionItemTemplate.replace('{{1}}', title)
                .replace('{{2}}', item.url)
                .replace('{{3}}', selectedUrl === item.url ? ' pure-button-active' : '');
        });
        return html;
    }

    return {
        render: function(selectObject, data, element) {
            var html = '<div class="pure-menu"><ul class="pure-menu-list">';

            html += '<li class="pure-menu-heading">Articles</li>';
            html += buildNavArticle(selectObject, 'unread', data);
            html += buildNavArticle(selectObject, 'favorites', data);
            html += buildNavArticle(selectObject, 'saved', data);

            html += '<li class="pure-menu-heading">Subscriptions</li>';
            html += buildSubscriptions(selectObject, data.subscriptions);
            html += importSubscriptionTemplate;

            html += '</ul></div>';

            element.html(html);
        }
    };

})();
