
/*jshint browser: true, jquery: true */
/*jshint multistr: true */

/* global APP */

APP.views.articles = (function() {
    'use strict';

//    var myRegexp = /<!\[CDATA\[(.*)]]>/;
// myRegexp.exec(item.channel.description)[1]

var itemTemplate = '\
<div class="js--article-item" data-item-url="{{article.url}}">\
    <div class="article-header">\
        <button class="js--favorite-btn icon pure-button">\
            <i class="fa fa-star" aria-hidden="true"></i>\
        </button>\
        <button class="js--bookmark-btn icon pure-button">\
            <i class="fa fa-bookmark" aria-hidden="true"></i>\
        </button>\
        <button class="js--dismiss-btn icon pure-button">\
            <i class="fa fa-times-circle" aria-hidden="true"></i>\
        </button>\
        <a href="{{article.link}}" target="_blank">{{article.title}}</a>\
    </div>\
    <div class="article-description fade">\
    {{article.description}}\
    </div>\
</div>';

var channelHeaderTemplate = '\
<section id="js--id-{{id}}" class="subscription-item js--subscription" data-item-url="{{channel.url}}">\
<div class="pure-g">\
    <h2 class="content-head">\
<div class="pure-u-4-24"></div>\
<button class="js--select-title pure-button">{{channel.title}}</button>\
<div class="pure-u-4-24"></div>\
{{button}}\
    </h2>\
</div>';

//var subscribeTemplate = '\
//<button class="js--add-btn pure-button">Subscribe</button>';
//
//var unSubscribeTemplate = '\
//<button class="js--trash-btn pure-button">Unsubscribe</button>';

//var subscribeTemplate = '\
//<button class="js--add-btn icon pure-button">\
//    <i class="fa fa-plus-circle" aria-hidden="true"></i>\
//</button>';
//
//var unSubscribeTemplate = '\
//<button class="js--trash-btn icon pure-button">\
//    <i class="fa fa-trash" aria-hidden="true"></i>\
//</button>';

var subscribeTemplate = '\
<button class="js--add-btn icon pure-button">\
    <i class="fa fa-plus-circle" aria-hidden="true"></i>\
</button>';

var unSubscribeTemplate = '\
<button class="js--trash-btn icon pure-button">\
    <i class="fa fa-trash" aria-hidden="true"></i>\
</button>';

var headerTemplate = '\
<div class="content js--all-subscriptions" data-item-type="{{type}}">';

    return {
        render: function(selectObject, data, element) {
            //type: 'subscriptions', value: url
            var type = selectObject.type;
            var dataType = '';
            if (type === 'subscriptions') {
                dataType = type;
            }
            else if (type === 'article') {
                dataType = selectObject.value;
            }
            else if (type === 'search') {
                dataType = 'subscriptions';
            }

            var html = headerTemplate.replace('{{type}}', dataType);

            data[dataType].forEach(function(item, idx) {     // for each subscription
                var button = item.subscribed ? unSubscribeTemplate : subscribeTemplate;
                html += channelHeaderTemplate
                    .replace('{{id}}', idx)
                    .replace('{{channel.title}}', item.title)
                    .replace('{{channel.url}}', item.url)
                    .replace('{{button}}', button);

                item.items.forEach(function(item) {     // for each article
                    html += itemTemplate
                        .replace('{{article.title}}', item.title)
                        .replace('{{article.url}}', item.link)
                        .replace('{{article.link}}', item.link)
                        .replace('{{article.description}}', item.description);
                    return html;
                });

                html += '</section>';
            });

            html += '</div>';
            element.html(html);

//            $.fn.editable.defaults.ajaxOptions = {contentType: "application/json"};
//            $.fn.editable.defaults.ajaxOptions = {dataType: "json"};

//            if (dataType === 'subscriptions') {
//                data[dataType].forEach(function(item, idx) {     // for each subscription
//                    select_url = item.url;
//                    var $id = $('#js--id-'+idx);
//                    var $edit_title = $id.find('.js--channel-title');
//
//                    $edit_title.editable({
//                        type: 'text',
//                        pk: select_url,
//                        url: APP.keys.USERS_URL+'/subscription/title',
//                        success: function(response, newValue) {
//                            console.log("success; response.message "+response.message+" newValue "+newValue);
//                            APP.$DOM.main.trigger('update-nav', {type: 'subscriptions', value: select_url});
//                            APP.$DOM.main.trigger('select-subscription', [select_url]);
//                        }
//                    });
//                });
//            }
        }
    };

})();

/*
var channelHeaderTemplate = '\
<section id="js--id-{{id}}" class="subscription-item js--subscription" data-item-url="{{channel.url}}">\
    <header class="pure-g">\
<div class="pure-u-4-24"></div>\
<button class="js--select-title pure-button">{{channel.title}}</button>\
<div class="pure-u-4-24"></div>\
{{button}}\
    </header>';
*/
