# drag

​	在html5中，添加了draggable属性，可以使元素拖动。

​	文本、图片和链接是默认可以拖动的。

​	draggable属性：设置元素是否可以拖动。语法<element draggable="true | false | auto">

| 针对对象     | 事件名称  | 说明                                               |
| ------------ | :-------- | -------------------------------------------------- |
| 被拖动的元素 | dragstart | 在元素开始被拖动时候触发                           |
|              | drag      | 在拖动的过程中一直在触发                           |
|              | dragend   | 在拖动事件结束时候触发                             |
| 目的对象     | dragenter | 当被拖动元素进入目的地元素所占据的屏幕空间时候触发 |
|              | dragover  | 在被拖到目的地元素内时触发                         |
|              | dragleave | 当被拖动元素没有放下就离开目的地元素时触发         |

dragenter和dragover事件的默认行为是拒绝接受任何被拖放的元素。因此，我们必须阻止浏览器这种默认行为。e.preventDefault();

### 释放

到达目的地之后，释放元素事件

| 针对对象   | 事件名称 | 说明                                                         |
| ---------- | -------- | ------------------------------------------------------------ |
| 目的地对象 | drop     | 当被拖动元素在目的地元素里放下时触发，一般需要取消浏览器的默认行为。 |

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <style>
    .src {
      display: flex;
    }
    .dropabled {
      flex: 1;
    }
    .txt {
      color: gray;
    }
    .img {
      width: 100px;
      height: 100px;
      border: 1px solid red;
    }
    .target {
      width: 200px;
      height: 200px;
      line-height: 200px;
      text-align: center;
      border: 1px solid gray;
      color: red;
    }
  </style>
  <body>
    <div class="src">
      <div class="dragabled">
        <div class="txt" id="txt">
          所有的文字都可以拖拽
          <p dragable="true">该处设置了dragable="true"</p>
        </div>
        <div class="url" id="url">
          <a href="www.baidu.com">www.baidu.com</a>
        </div>
        <img class="img" src="./img/1.jpg" id="tupian1" alt="" srcset="" />
        <img class="img" src="./img/2.jpg" id="tupian2" alt="" srcset="" />
      </div>
      <div id="target" class="dropabled target">Drop Here</div>
    </div>
  </body>
</html>
<script>
  var dragSrc = document.getElementById('txt')
  // 目的地
  var target = document.getElementById('target')

  dragSrc.ondragstart = handle_start
  dragSrc.ondrag = handle_drag
  dragSrc.ondragend = handle_end
  function handle_start(e){
    console.log('ondragstart-开始拖动')
  }
  function handle_drag(e){
    console.log('handle_drag-拖动中~~~~~')
  }
  function handle_end(e){
    console.log('ondragend-拖动结束了')
  }

  target.ondragenter = handle_enter
  target.ondragover = handle_over
  target.ondragleave = handle_leave

  target.ondrop = handle_drop

  function handle_enter(e) {
    console.log('handle_enter-元素进入目的地')
    e.preventDefault();
  }
  function handle_over(e) {
    console.log('handle_over-元素处于目的地中')
    e.preventDefault();
  }
  function handle_leave(e) {
    console.log('handle_leave-元素离开目的地')
    e.preventDefault();
  }
  function handle_drop(e) {
    console.log('handle_drop-元素离开目的地在目的地放下触发')
    var t = Date.now()
    target.innerHTML = '啦啦啦啦~~~'
    target.append(t + '-拖放触发的时候')
    e.preventDefault();
  }
</script>
```

