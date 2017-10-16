/**
* 创建一个可复用的对象给tag以及hobby
* @param {String} - input 输入框的id
* @param {String} - output 输出框的class名
* @param {String} - button 按钮的id，可选，如果不选则默认触发键盘事件
*/

var createTag = (function() {
  // 创建类
  function _tag(input, output, button) {
    // 私有变量
    var number;
    // 特权方法
    this.getNumber = function() {
      return number;
    };
    this.setNumber = function(newNumber) {
      number = newNumber;
    };
    // 公有属性
    this.input = document.getElementById(input);
    this.output = document.getElementsByClassName(output)[0];
    this.button = document.getElementById(button);
    // 公有方法
    this.getData = function() {
      switch (input) {
        case 'tag':
          var value = this.input.value.match(/(^[^,\， ]*)/)[0];
          break;
        case 'hobby':
        default:
          var value = this.input.value.trim().split(/,|，|、|\s|\n|\r|\t/);
      }
      return value;
    };
    this.render = function(value) {
      if (value === '' || value === ',' || value === '，') {
        alert("is empty!");
        return ;
      }
      this.output.innerHTML += "<div>" + value + "</div>";
      number ++;
    };
    // 构造器
    this.setNumber(0);
    // 初始化
    this.button ? this.init('buttonEvent') : this.init('keyEvent');
  }

  /**
   * 构造原型方法
   */

  _tag.prototype = {

    /**
     * 检测输入数据是否有重复
     * @param {String} - data 输入的数据
     * @return {Boolean} - 数据是否重复
     */

    repeatData: function(data) {
      for (var i = 0; i < this.output.children.length; i++) {
        if (this.output.children[i].textContent.localeCompare(data) === 0) {
          this.input.value = '';
          this.setNumber(this.output.children.length);
          return true;
        }
      }
    },

    /**
     * 删除特定的数据
     * @param {HTMLDOMElement} - ele 被删除的元素
     */

    delData: function(ele) {
      this.output.removeChild(ele);
      this.setNumber(this.output.children.length);
    },

    /**
     * 初始化
     * @param {String} - type 判断是用否需要按钮选择不同的初始化方式
     */

    init: function(type) {
      var self = this;
      this.output.addEventListener('mouseover',function(event) {
       event.target.textContent = '删除：' + event.target.textContent;
      });
      this.output.addEventListener('mouseout',function(event) {
        event.target.textContent = event.target.textContent.replace(/删除：/,'');
      });
      this.output.addEventListener('click', function(event) {
        self.delData(event.target);
      });
      switch (type) {
        case 'keyEvent':
        document.addEventListener('keyup',function(event) {
          if (/(,| |\，)$/.test(self.input.value) || event.keyCode===13) {
            console.log(self.getData())
            self.repeatData(self.getData().trim()) || self.render(self.getData().trim());
            self.input.value = '';
            if (self.getNumber() > 10) {
              self.delData(self.output.firstChild);
            }
          }
        });
        break;
        case 'buttonEvent':
        self.button.addEventListener('click',function() {
          for (var i = 0; i < self.getData().length; i++) {
            self.repeatData(self.getData()[i]) || self.render(self.getData()[i]);
            if (self.getNumber() > 10) {
              self.delData(self.output.firstChild);
            }
          }
          self.input.value = '';
        });
        break;
      }
    }
  };
  // 返回类
  return _tag;
})();

/**
* 实例化tag和hobby
*/
var tag = new createTag('tag','tagContainer');
var hobby = new createTag('hobby','hobbyContainer', 'confirm');
