window.onload = function() {
    ajax('./js/json/folder.json', function(data) {
        var containerDiv = document.getElementById('container');
        var data = eval(data);
        genFolders(data, containerDiv);
        foldOrNot();
        selectNode();
        document.getElementById('deleteBtn').onclick = function() {
            deleteNode();
            selectNode();
        };
        document.getElementById('addBtn').onclick = function() {
            var newNodeName = document.getElementById('nodeName').value;
            if (newNodeName == '') {
                alert('请为新节点填写一个名称');
            } else {
                addNode(newNodeName);
                selectNode();
                foldOrNot();
            }
        };
        document.getElementById('searchBtn').onclick = function() {
            var searchName = document.getElementById('nodeToSearch').value;
            if (searchName == '') {
                alert('请填写要搜索的内容');
            } else {
                clearSearch();
                searchTree(containerDiv.firstElementChild, searchName);
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
        selectNode();
    }, function() {
        alert('JSON文件加载失败');
    });
};

//控制节点显示和隐藏
function foldOrNot() {
    var iBtn = document.getElementsByTagName('i');

    for (var i = 0, len = iBtn.length; i < len; i++) {
        iBtn[i].onclick = function(e) {
            var hideChild = this.parentNode.parentNode.childNodes;
            if (this.className == 'unfold') {
                this.setAttribute('class', 'fold');
                for (var i = 1, len = hideChild.length; i < len; i++) {
                    hideChild[i].style.display = 'none';
                }
            } else {
                this.setAttribute('class', 'unfold');
                for (var i = 1, len = hideChild.length; i < len; i++) {
                    hideChild[i].style.display = 'block';
                }
            }
            e.stopPropagation();
        }
    }
}

//选择节点
var selectedNode; //被选中的节点
function selectNode() {
    var aText = document.getElementsByTagName('a');
    for (var i = 0, len = aText.length; i < len; i++) {
        aText[i].onclick = function(e) {
            for (var j = 0, jlen = aText; j < len; j++) {
                aText[j].setAttribute('class', '');
            }
            // this.setAttribute('class', 'selected');
            this.className+=' selected';
            selectedNode = this;
            e.stopPropagation();
        }
    }
}

//删除节点
function deleteNode() {
    if (selectedNode == undefined) {
        alert('请选中要删除的节点');
    } else {
        var nodeToDelete = selectedNode.parentNode.parentNode;
        nodeToDelete.parentNode.removeChild(nodeToDelete);
        selectedNode = undefined;
    }

}
//添加节点
function addNode(name) {
    var newNode = document.createElement('ul');
    var newNodeLi = document.createElement('li');
    var newNodeI = document.createElement('i');
    var newNodeA = document.createElement('a');
    newNodeI.setAttribute('class', 'unfold');
    newNode.appendChild(newNodeLi);
    newNodeLi.appendChild(newNodeI);
    newNodeLi.appendChild(newNodeA).innerHTML = name;

    var hasNode = document.getElementById('container').childNodes.length > 0 ? true : false;
    if (selectedNode == undefined && hasNode) {
        alert('请选中一个节点，作为添加节点的父节点');
    } else if (selectedNode == undefined && hasNode == false) {
        document.getElementById('container').appendChild(newNode);
    } else {
        selectedNode.parentNode.parentNode.appendChild(newNode);
    }
}
//从json文件生成文档树
function genFolders(data, container) {
    for (var i = 0, len = data.length; i < len; i++) {
        var newUl = document.createElement('ul');
        var newLi = document.createElement('li');
        var unfoldI = document.createElement('i');
        unfoldI.className = 'unfold';
        var newText = document.createElement('a');
        newText.innerHTML = data[i].text;
        newLi.appendChild(unfoldI);
        newLi.appendChild(newText)
        newUl.appendChild(newLi);

        container.appendChild(newUl);

        if (data[i].hasOwnProperty('children')) {
            genFolders(data[i].children, newUl);
        }
    }
}

//执行搜索前的清除操作
function clearSearch() {
    tag = true;
    var allA = document.getElementsByTagName('a');
    for(var i=0,len=allA.length;i<len;i++){
        allA[i].setAttribute('class','');
    }
    searchResult = [];

}

//搜索
var searchResult=[];
var tag = true; //标记是否搜索到，搜索到为false
function searchTree(tree, content) {

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
