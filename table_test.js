$(function() {
  const kouho = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  var i, j,
  sudoku = new Array(9);

  for (i=0; i<9; i++) {
    sudoku[i] = new Array(9);
    for (j=0; j<9; j++) {
      sudoku[i][j] = kouho.slice();
    }
  }

  $(window).on('ready', table_test_start());

// 色付きセルがクリックされたらテキストボックスを用意する
  $('.edi').on('click', function (event) {
    var temp = $(this).text();

    $(this).html('<input class="hoge" type="text" value="">');

    $('.hoge').focus();
  });

//テキストボックスからフォーカスが外れたら入力されていた値をセルに設定する
  $(document).on('blur', '.hoge', function () {

    $('.hoge').parent().html($('.hoge').val());

  });

// 解く
  $('.solv').on('click', function (event) {
    var i,
    // 入力値を全て取得
    world = $('.sudoku').find('tr');

    for (i=0; i<9; i++) {
      for (j=0; j<9; j++) {
        //１桁の整数なら
        if (0 < world[i].children[j].textContent  && world[i].children[j].textContent < 10){
//          console.log(world[i].children[j].nodeValue);
          console.log('i:'+i+'j:'+j+','+world[i].children[j].textContent);
//        } else {
//          console.log('i:'+i+'j:'+j+','+world[i].children[j].textContent);
        }
      }
    }

    console.log(sudoku[0].length);
    sudoku[0]=100;
    console.log(sudoku[0]);
    sudoku[1]=101;
    console.log(sudoku[1]);
    sudoku[2]=102;
    console.log(sudoku[2]);
    sudoku[3][0]=103;
    console.log(sudoku[3][0]);
    sudoku.unshift(5);//リストの先頭に追加
    sudoku.push(104);//リストの最後に追加
    console.log(sudoku);
    //sudoku.splice(3,1);
    remove_from_list(sudoku, 102);
    console.log(sudoku);
    console.log(sudoku.length);
    console.log('Array.isArray(sudoku):' + Array.isArray(sudoku));
    console.log('Array.isArray([1,2]]):' + Array.isArray([1,2]));
    console.log('Array.isArray(1]):' + Array.isArray(1));

    console.log(world[2].children[0].textContent);
    for (i=1; i<10 ;i++) {
      world[i].children[5].textContent = sudoku[4][2];//'hoge'+i
    }
  });

});

function table_test_start () {
  console.log('now test start');
}

//sudoku: 9×9のマスが候補のリストを一つづつ持ったもの
//num   : 確定済のセルの値
//i     : 確定済のセルの位置
//j     : 確定済のセルの位置
function remove_from_yoko (sudoku, num, i, j) {
  var s;

  for (s=0; s<9; s++) {
    if (s != j && Array.isArray(sudoku[i][s])){
      remove_from_list(sudoku[i][s], num);
    }
  }
}

//sudoku: 9×9のマスが候補のリストを一つづつ持ったもの
//num   : 確定済のセルの値
//i     : 確定済のセルの位置
//j     : 確定済のセルの位置
function remove_from_tate (sudoku, num, i, j) {
  var s;

  for (s=0; s<9; s++) {
    if (s != i && Array.isArray(sudoku[s][j])){
      remove_from_list(sudoku[s][j], num);
    }
  }
}

// arrにnumがあればそれを削除する
function remove_from_list (arr, num) {
  var index = arr.indexOf(num);
  if (index != -1) {
    //numのある位置から1個の要素を削除
    arr.splice(index,1);
  }
}
