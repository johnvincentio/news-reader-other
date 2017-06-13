
/*jshint browser: true, jquery: true */
/*jshint multistr: true */

/* global APP */

APP.views.nav = (function() {
    'use strict';




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

/*
TODO; handle active link
*/

        var itemTemplate = '\
<li class="pure-menu-item">\
    <button class="pure-button" data-item-title="{{data.title}} data-item-url="{{data.url}}">\
{{title}}\
</button>\
</li>';

    var mydata = {
        nodes: [
            {
            title: 'Title 1',
            url: 'url1',
            nodes: [],
            children: []
            },
            {
            title: 'Title 2',
            url: 'url1',
            nodes: [
                {
                    title: 'Title 3',
                    url: 'url3',
                    nodes: [],
                    children: [
                        {title: 'Child-31', url: 'Child-url-31'},
                        {title: 'Child-32', url: 'Child-url-32'}
                    ]
                }
            ],
            children: [
                {title: 'Child-1', url: 'Child-url-1'},
                {title: 'Child-2', url: 'Child-url-2'}
            ]
            }
        ]
    };

    function buildItem(item) {
        return nodeDetailTemplate.replace('{{title}}', item.title)
            .replace('{{data.title}}', item.title)
            .replace('{{data.url}}', item.url);
    }

    function buildChildren(children) {
        if (children.length < 1) {
            return '';
        }
        var html = '<ul class="pure-menu-children">';
        children.forEach(function(child) {
            html += buildItem(child);
        });
        html += '</ul>';
        return html;
    }

    var nodeDetailTemplate = '\
<li class="pure-menu-item">\
    <button class="pure-button" data-item-title="{{data.title}} data-item-url="{{data.url}}">\
{{title}}\
</button>\
</li>';

    function buildNodes(nodes) {
        if (nodes.length < 1) {
            return '';
        }
        var html = '';
        nodes.forEach(function(node) {
//            html += '<li class="pure-menu-children">';
            html += nodeDetailTemplate.replace('{{title}}', node.title)
                .replace('{{data.title}}', node.title)
                .replace('{{data.url}}', node.url);

            html += buildChildren(node.children);
//            html += buildNodes(node.nodes);

//            html += '</li>';
        });
        return html;
    }

    return {
        render: function(element) {
            var html = '<div class="pure-menu"><ul class="pure-menu-list">';

            html += '<li class="pure-menu-heading">Demo</li>';
            html += buildNodes(mydata.nodes);
            html += '</ul></div>';

            element.html(html);
        }
    };

})();
