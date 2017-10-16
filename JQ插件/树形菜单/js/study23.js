//生成树遍历序列算法
var traversal = {
    preorderTraversal: function preorderTraversal(root){
        var traverseQueue = [];
        function genTraverseQueue(root) {
            var key;
            traverseQueue.push(root.view);
            for(key in root){

                if(key != 'view'){
                    if(root.hasOwnProperty(key)){

                        genTraverseQueue(root[key]);
                    }
                }

            }
        }
        genTraverseQueue(root);
        //data第一次访问view的时候为undefined。删除第一个元素
        traverseQueue.shift();
        return traverseQueue;
    },

    postorderTraversal: function postorderTraversal(root){
        var traverseQueue = [];
        function genTraverseQueue(root) {
            var key;
            for(key in root){
                if(key != 'view'){
                    if(root.hasOwnProperty(key)){
                        genTraverseQueue(root[key]);
                    }
                }
            }
            traverseQueue.push(root.view);
        }
        genTraverseQueue(root);
        //data第一次访问view的时候为undefined。删除最后一个元素
        traverseQueue.pop();
        return traverseQueue;
    }
};

//初始化一棵树并绑定事件
function initTree(data){

    var rootView = document.getElementById('root');
    rootView.innerHTML = '';
    renderTree(data,rootView);
    var preAnimate;
    var animator = new TreeAnimator();
    //当树渲染完成后再绑定遍历按钮的事件。
    addClickEvent($('preorderTraversal'), function () {
        animator.animateTraverse(traversal.preorderTraversal(data), false);
        // cleanAnimation(preAnimate);
        // preAnimate = animateTraverse(traversal.preorderTraversal(data));
    });

    addClickEvent($('postorderTraversal'), function () {
        animator.animateTraverse(traversal.postorderTraversal(data), false);
    });

    addClickEvent($('preordersearchBtn'), function () {
        // cleanAnimation(preAnimate);
        // preAnimate = searchTree(traversal.preorderTraversal, data);
        var searchResult = searchTree(traversal.preorderTraversal, data);
        animator.animateTraverse(searchResult.result, searchResult.isFindTarget, function () {
            if(searchResult.isFindTarget){
                $('searchResult').innerHTML = '找到 '+ searchResult.target;
            }else{
                $('searchResult').innerHTML = '没有找到 ' + searchResult.target;
            }
        });
    });

    addClickEvent($('postordersearchBtn'), function () {
        // cleanAnimation(preAnimate);
        // preAnimate = searchTree(traversal.postorderTraversal, data);
        $('searchResult').innerHTML = '';
        var searchResult = searchTree(traversal.postorderTraversal, data);
        animator.animateTraverse(searchResult.result, searchResult.isFindTarget, function () {
            if(searchResult.isFindTarget){
                $('searchResult').innerHTML = '找到 '+ searchResult.target;
            }else{
                $('searchResult').innerHTML = '没有找到 ' + searchResult.target;
            }
        });
    });
}

//搜索内容，生成搜索队列
function searchTree(queryMethod,data) {
    var searchTarget = $('searchText').value;
    var queue = queryMethod(data);
    var len = queue.length;
    var start=0, end=0;

    var findTarget = false;
    for(var i = 0; i < len; i++){
        end = i;
        if(queue[i].getAttribute('data') == searchTarget){
            findTarget = true;
            console.log('find search!');
            break;
        }
    }
    return {result: queue.slice(start, end +1), isFindTarget: findTarget, target: searchTarget};
}

var $ = function (element) {
    return document.getElementById(element);
};

function addEvent(element, event, listener) {
    if(element.addEventListener) {
        element.addEventListener(event, listener);
    }else{
        element['on' + event] = listener;
    }
}

function addClickEvent(element, listener) {
    addEvent(element, 'click', listener);
}


//将json树渲染到网页
function renderTree(data, parentElement){
    // var data = {
    //     'root': {
    //         'a': {
    //             'a1': 'a1',
    //             'a2': 'a2'
    //         },
    //         'b': {
    //             'b1': {
    //                 'b1.1': 'b1.1',
    //                 'b1.2': 'b1.2',
    //                 'b1.3': 'b1.3'
    //             },
    //             'b2': {
    //                 'b2.1': 'b2.1'
    //             }
    //         }
    //     }
    // };
    var key;
    var treeView;
    for(key in data){
        if(data.hasOwnProperty(key)){
            if(key != 'view'){
                treeView = document.createElement('div');
                treeView.className='child';
                treeView.innerHTML = key;
                parentElement.appendChild(treeView);
                data[key].view = treeView;
                data[key].view.setAttribute('data', key.toString());
                renderTree(data[key], treeView);
            }
        }
    }
}

//封装动画对象
var TreeAnimator = function () {
    var preAnimate;
    var animatingElement;

    function cleanAnimation() {
        clearInterval(preAnimate);
        if(animatingElement){
            animatingElement.id = '';
        }
    }

    this.animateTraverse = function (traverseQueue, highlightLast, callBack){
        cleanAnimation();
        var start = 0;
        var end = traverseQueue.length;
        var preNode = null;

        preAnimate = setInterval(function () {
            if(preNode != null){
                preNode.id = '';
                //preNode.classList.remove('focus');
            }
            if(start < end){
                //traverseQueue[start].view.classList.add('focus');
                traverseQueue[start].id='focus';
                animatingElement = traverseQueue[start];
                preNode =traverseQueue[start];
                start++;
            }else{
                clearInterval(preAnimate);
                if(highlightLast){
                    traverseQueue[end-1].id='highlight';
                    animatingElement = traverseQueue[end-1];
                }
                console.log('animate done');
                callBack();
            }
        }, 500);
    };
};

function init() {
    var data = {
        'root': {
            'a': {
                'a1': {},
                'a2': {}
            },
            'b': {
                'b1': {
                    'b1.1': {},
                    'b1.2': {},
                    'b1.3': {
                        'b1.3.1': {}
                    }
                },
                'b2': {
                    'b2.1': {}
                }
            }
        }
    };

    initTree(data);
}

init();
