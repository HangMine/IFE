/*
 treeMenu - jQuery plugin
 version: 0.4

 Copyright 2014 Stepan Krapivin

*/

(function($){
    $.fn.openActive = function(activeSel) {
        activeSel = activeSel || ".active";

        var c = this.attr("class");

        this.find(activeSel).each(function(){
            var el = $(this).parent();
            while (el.attr("class") !== c) {
                if(el.prop("tagName") === 'UL') {
                    el.show();
                } else if (el.prop("tagName") === 'LI') {
                    el.removeClass('tree-closed');
                    el.addClass("tree-opened");
                }

                el = el.parent();
            }
        });

        return this;
    }

    var searchResult=[];
    var tag = true; //标记是否搜索到，搜索到为false
    $.fn.searchTree = function(tree, content) {

        tree.style.display = 'block';
        tree.firstElementChild.firstElementChild.setAttribute('class','unfold');
        if (tree !== null) {
            var equal = (tree.firstElementChild.lastElementChild.innerHTML === content);
            if(equal){

                searchResult.push(tree);
                tag = false;
            }
            for (var i = 1; i < tree.children.length; i++) {
                searchTree(tree.children[i], content);
            }
        }
    }

    //执行搜索前的清除操作
    $.fn.clearSearch = function() {
        tag = true;
        var allA = document.getElementsByTagName('a');
        for(var i=0,len=allA.length;i<len;i++){
            allA[i].setAttribute('class','');
        }
        searchResult = [];
    }

    document.getElementById('searchBtn').onclick = function() {
        var searchName = document.getElementById('nodeToSearch').value;
        if (searchName == '') {
            alert('请填写要搜索的内容');
        } else {
            clearSearch();
            searchTree(document.getElementsByTagName('tree')[0], searchName);
            if (tag) {
                alert('无搜索结果');
            }else{
                for(var i=0,len=searchResult.length;i<len;i++){
                    searchResult[i].firstElementChild.lastElementChild.setAttribute('class','searched');
                    searchResult[i].firstElementChild.firstElementChild.setAttribute('class','unfold');
                }
            }
        }
    };

    $.fn.treemenu = function(options) {
        options = options || {};
        options.delay = options.delay || 0;
        options.openActive = options.openActive || false;
        options.activeSelector = options.activeSelector || "";

        this.addClass("treemenu");
        this.find("> li").each(function() {
            e = $(this);
            var subtree = e.find('> ul');
            var button = e.find('span').eq(0).addClass('toggler');

            if( button.length == 0) {
                var button = $('<span>');
                button.addClass('toggler');
                e.prepend(button);
            } else {
                button.addClass('toggler');
            }

            if(subtree.length > 0) {
                subtree.hide();

                e.addClass('tree-closed');

                e.find(button).click(function() {
                    var li = $(this).parent('li');
                    li.find('> ul').slideToggle(options.delay);
                    li.toggleClass('tree-opened');
                    li.toggleClass('tree-closed');
                    li.toggleClass(options.activeSelector);
                });

                $(this).find('> ul').treemenu(options);
            } else {
                $(this).addClass('tree-empty');
            }
        });

        if (options.openActive) {
            this.openActive(options.activeSelector);
        }

        return this;
    }
})(jQuery);
