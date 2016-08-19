     window.onload = function() {
         var canvas = document.getElementById('canvas1'), //获取canvas元素
             context = canvas.getContext('2d'), //获取画图环境，指明为2d
             centerX = canvas.width / 2, //Canvas中心点x轴坐标
             centerY = canvas.height / 2, //Canvas中心点y轴坐标
             rad = Math.PI * 2 / 100, //将360度分成100份，那么每一份就是rad度
             speed = 0.1; //加载的快慢就靠它了

         console.log(rad);

         //绘制蓝色外圈
         function blueCircle(n) {
             context.save();
             context.strokeStyle = "#49f"; //设置描边样式
             context.lineWidth = 5; //设置线宽
             context.beginPath(); //路径开始
             let start = -Math.PI / 2;
             let end = -Math.PI / 2 + n * rad;
             context.arc(centerX, centerY, 50, start, end, false); //用于绘制圆弧context.arc(x坐标，y坐标，半径，起始角度，终止角度，顺时针/逆时针)
             context.stroke(); //绘制
             context.closePath(); //路径结束
             context.restore();
         }
         //绘制白色外圈
         function whiteCircle() {
             context.save();
             context.beginPath();
             context.strokeStyle = "white";
             context.arc(centerX, centerY, 50, 0, Math.PI * 2, false);
             context.stroke();
             context.closePath();
             context.restore();
         }

         //百分比文字绘制
         function text(n) {
             context.save(); //save和restore可以保证样式属性只运用于该段canvas元素
             context.strokeStyle = "#49f"; //设置描边样式
             context.font = "20px Arial"; //设置字体大小和字体
             //绘制字体，并且指定位置
             context.strokeText(n.toFixed(0) + "%", centerX - 15, centerY + 10);
             context.stroke(); //执行绘制
             context.restore();
         }

         //动画循环
         (function drawFrame() {
             window.requestAnimationFrame(drawFrame, canvas);
             context.clearRect(0, 0, canvas.width, canvas.height);

             whiteCircle();
             text(speed);
             blueCircle(speed);

             if (speed > 100) speed = 0;
             speed += 0.1;
         }());







         // canvas2

         var canvas2 = document.querySelector('#canvas2'),
             context2 = canvas2.getContext('2d'),
             w, h;
         w = canvas2.width = window.innerWidth;
         h = canvas2.height = window.innerHeight;

         //初始化
         var clearColor = 'rgba(0, 0, 0, .1)', //用于绘制渐变阴影
             wordColor = "#33ff33", //文字颜色
             words = "0123456789qwertyuiopasdfghjklzxcvbnm,./;'\[]QWERTYUIOP{}ASDFGHJHJKL:ZXCVBBNM<>?",
             wordsArr = words.split(''), //将文字拆分进一个数组
             font_size = 16, //字体大小
             clumns = w / font_size, //文字降落的列数
             drops = [];

         for (var i = 0; i < clumns; i++) {
             drops[i] = 1;
         }

         function draw() {
             context2.save();
             context2.fillStyle = wordColor;
             context2.font = font_size + "px arial";
             //核心
             for (var i = 0; i < drops.length; i++) {
                 var text = wordsArr[Math.floor(Math.random() * wordsArr.length)];
                 context2.fillText(text, i * font_size, drops[i] * font_size);
                 if (drops[i] * font_size > h && Math.random() > 0.98) {
                     drops[i] = 0;
                 }
                 drops[i]++;
             }
             context2.restore();
         }

         //动画循环
         (function drawFrame() {
             window.requestAnimationFrame(drawFrame, canvas2);
             context2.fillStyle = clearColor;
             context2.fillRect(0, 0, w, h);

             draw();
         }())

         //resize
         function resize() {
             w = canvas2.width = window.innerWidth;
             h = canvas2.height = window.innerHeight;
             ``
         }
         canvas2.addEventListener("resize", resize);

     }
