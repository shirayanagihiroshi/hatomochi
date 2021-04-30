var bingo = (function () {
  var bingos = new Array(25);
  var bingos_ans_b = new Array(15);
  var bingos_ans_i = new Array(15);
  var bingos_ans_n = new Array(15);
  var bingos_ans_g = new Array(15);
  var bingos_ans_o = new Array(15);
  var bingo_i,timer_interval;
  var ans_b_i,ans_i_i,ans_n_i,ans_g_i,ans_o_i;
  var canvas, context;
  var gamestart, prepare, nextnumber;

  window.onload = function (){
    //ロードが完了してからカンバスの取得
    canvas = document.getElementById('bingo_canvas');
    context = canvas.getContext('2d');
    
    show_frame();
  };

  gamestart = function () {
    //間違ってクリックすると面倒なので、問題作成は消す。
    var obj = document.getElementById("bingoSakusei");
    if (obj != null) {
      obj.parentNode.removeChild(obj);
    }

    fill_random_no_duplication(bingos_ans_b, 1, 16);
    fill_random_no_duplication(bingos_ans_i, 16, 31);
    fill_random_no_duplication(bingos_ans_n, 31, 46);
    fill_random_no_duplication(bingos_ans_g, 46, 61);
    fill_random_no_duplication(bingos_ans_o, 61, 76);

    ans_b_i = 0;
    ans_i_i = 0;
    ans_n_i = 0;
    ans_g_i = 0;
    ans_o_i = 0;

    obj = document.getElementById("bingoNextNumber");
    obj.innerHTML="数を選ぶよ。ここをクリックしてね。";

    context.clearRect(0,0,500,500);
  };

  nextnumber = function () {
    var i;
    var nextnum;
    var target;

    if (ans_b_i > 14 && ans_i_i > 14 && ans_n_i > 14 && ans_g_i > 14 && ans_o_i > 14){
      return;
    }

    context.clearRect(0,0,500,500);

    oncemore:while(1){
      target = getRandomInt(0,5);

      if(target == 0) {
	      if(ans_b_i > 14){
          continue oncemore;
        }
        nextnum = bingos_ans_b[ans_b_i];
        ans_b_i++;
        break;

      } else if(target == 1) {
	      if(ans_i_i > 14){
          continue oncemore;
        }
        nextnum = bingos_ans_i[ans_i_i];
        ans_i_i++;
        break;

      } else if(target == 2) {
	      if(ans_n_i > 14){
          continue oncemore;
        }
        nextnum = bingos_ans_n[ans_n_i];
        ans_n_i++;
        break;

      } else if(target == 3) {
	      if(ans_g_i > 14){
          continue oncemore;
        }
        nextnum = bingos_ans_g[ans_g_i];
        ans_g_i++;
        break;

      } else if(target == 4) {
	      if(ans_o_i > 14){
          continue oncemore;
        }
        nextnum = bingos_ans_o[ans_o_i];
        ans_o_i++;
        break;
      }
    }

    context.font = 'bold 60pt sans-serif';
    context.strokeText('次の数は'+nextnum, 20, 80);

    context.font = 'bold 10pt sans-serif';
    for(i=0;i<ans_b_i;i++){
      context.fillText(bingos_ans_b[i]+",", 10+(22*i), 160);
    }
    for(i=0;i<ans_i_i;i++){
      context.fillText(bingos_ans_i[i]+",", 10+(22*i), 190);
    }
    for(i=0;i<ans_n_i;i++){
      context.fillText(bingos_ans_n[i]+",", 10+(22*i), 220);
    }
    for(i=0;i<ans_g_i;i++){
      context.fillText(bingos_ans_g[i]+",", 10+(22*i), 250);
    }
    for(i=0;i<ans_o_i;i++){
      context.fillText(bingos_ans_o[i]+",", 10+(22*i), 280);
    }
  };

  prepare = function () {
    bingo_i = 0;
    timer_interval = 30;
    make_bingo();
    show_frame();
    show_numbers();
  };

  //ビンゴの生成
  function make_bingo() {
     var i;
     var bingos_temp = new Array(5);

    fill_random_no_duplication(bingos_temp, 1, 16);
    for (i=0; i<5; i++) {
      bingos[i] = bingos_temp[i];
    }

    fill_random_no_duplication(bingos_temp, 16, 31);
    for (i=0; i<5; i++) {
      bingos[i+5] = bingos_temp[i];
    }

    fill_random_no_duplication(bingos_temp, 31, 46);
    for (i=0; i<5; i++) {
      bingos[i+10] = bingos_temp[i];
    }

    fill_random_no_duplication(bingos_temp, 46, 61);
    for (i=0; i<5; i++) {
      bingos[i+15] = bingos_temp[i];
    }

    fill_random_no_duplication(bingos_temp, 61, 76);
    for (i=0; i<5; i++) {
      bingos[i+20] = bingos_temp[i];
    }
//    console.log(bingos);
  }

  function show_frame () {
    var i;

    context.clearRect(0,0,500,500);

    //まず枠を書く
    //縦線
    for (i=0; i<6; i++) {
      context.moveTo(10+(80*i),10);
      context.lineTo(10+(80*i),10+(80*6));
    }
    //横線
    for (i=0; i<7; i++) {
      context.moveTo(10,10+(80*i));
      context.lineTo(10+(80*5),10+(80*i));
    }
    context.stroke();

    context.font = 'bold 60pt sans-serif'
    context.lineWidth = 3;
    //位置を微妙に調整した
    context.strokeText('B', 20, 80);
    context.strokeText('I', 108, 80);
    context.strokeText('N', 178, 80);
    context.strokeText('G', 258, 80);
    context.strokeText('O', 338, 80);
  }

  function show_numbers() {
    write_number((bingo_i%5),Math.floor(bingo_i/5),bingos[bingo_i]);

    bingo_i = bingo_i + 1;
    timer_interval = timer_interval +4;
    if (bingo_i < 25) {
      setTimeout(show_numbers,timer_interval);
    }
  }

  //行(gyou)と列(retsu)を指定して数値(n)を書く
  //中央はnに関係なくfreeと書く
  function write_number(gyou,retsu,n) {
    var hosei = 0

    if ((gyou == 2) && (retsu == 2)) {
      context.font = 'bold 25pt sans-serif'
      context.fillText("free", (80*retsu)+15, (80*(gyou+2))-17);
    } else {
      if (n < 10) {
        hosei = 31;
      } else {
        hosei = 13;
      }
      context.font = 'bold 40pt sans-serif'
      context.fillText(String(n), (80*retsu)+hosei, (80*(gyou+2))-9);
    }
  }

  //m以上、n未満の数を返す
  function getRandomInt(m, n) {
    return Math.floor(Math.random() * (n - m)) + m;
  }

  //配列(lst)へm以上n未満の重複しないランダムな数値を詰める
  function fill_random_no_duplication(lst,m,n) {
    var i,j,temp;

    i = 0;

    while (i<lst.length) {
      lst[i] = 0;
      i++;
    }

    i = 0;

    loop:while (i<lst.length) {
      temp = getRandomInt(m, n);

      j = 0;
      while (j < i) {
        if (lst[j] == temp) {
          continue loop;
        }
        j++;
      }
      lst[i] = temp;
      i++;
    }
  }

  return {
    gamestart  : gamestart,
    prepare    : prepare,
    nextnumber : nextnumber
  };
}());
