var canvas, context,
    world = new Array(30);

window.addEventListener('load', lifegame_ready);

function lifegame_ready () {
  var i,j;
  //世界の創造
  for (j = 0; j < 30; j++){

    world[j] = new Array(30);

    for (i = 0; i < 30; i++){
      world[j][i] = 0;
    }
  }

  //描画準備
  canvas = document.getElementById('lifegame_canvas');
  context = canvas.getContext('2d');

  //クリック時の動作を登録
  canvas.addEventListener('click', function(e){
    var x,y;
    var rect_size = 15;

    var rect = e.target.getBoundingClientRect();

    x = e.clientX - rect.left;
    y = e.clientY - rect.top;

    world[Math.floor(y / rect_size)][Math.floor(x / rect_size)] = 1;

    my_draw(15);

  }, false);
}

function my_draw (rect_size) {
  "use strict";
  var i,j;

  context.clearRect(0,0,450,450);
  context.fillStyle = "rgb(255, 0, 0)";

  for (j=0; j < 30; j++) {
    for (i=0; i < 30; i++) {
      if (world[j][i] == 1) {
        context.fillRect(i*rect_size,j*rect_size,rect_size,rect_size);
      }
    }
  }
}

function next_generation(){
  "use strict";
  var i,j;
  var temp_world = new Array(30);
  var count_around;

  for (j = 0; j < 30; j++){

    temp_world[j] = new Array(30);

    for (i = 0; i < 30; i++){
      //端の計算はめんどいので適当
      if(i > 0 && i < 29 && j > 0 && j < 29) {
        count_around = world[j - 1][i - 1] + world[j - 1][i] + world[j - 1][i + 1] + world[j][i - 1] + world[j][i + 1] + world[j + 1][i - 1] + world[j + 1][i] + world[j + 1][i + 1];
      } else {
        count_around = 0;
      }

      switch (count_around) {
        case 0:
        case 1:
          temp_world[j][i] = 0;
          break;
        case 2:
          temp_world[j][i] = world[j][i];
          break;
        case 3:
          temp_world[j][i] = 1;
          break;
        case 4:
        case 5:
        case 6:
        case 7:
        case 8:
        default:
          temp_world[j][i] = 0;
          break;
      }
    }
  }

  for (j = 0; j < 30; j++){
    for (i = 0; i < 30; i++){
      world[j][i] = temp_world[j][i];
    }
  }
}

function lifegame(){
  "use strict";

  next_generation();
  my_draw(15);
}

function lifegamestart(){
  "use strict";

  setInterval(lifegame, 500);
}
