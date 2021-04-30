var sudokuSolver = (function () {
$(function() {
  var sudoku = create_suudoku();

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
    calc_and_set();
    setTimeout(calc_and_set, 1200);
  });

  function calc_and_set() {
    const kouho = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    var i,j,
    // 入力値を全て取得
    world = $('.sudoku').find('tr');

    for (i=0; i<9; i++) {
      for (j=0; j<9; j++) {
        //１桁の整数なら、それを決定済の値として保存
        if (0 < world[i+1].children[j+1].textContent  && world[i+1].children[j+1].textContent < 10){
          sudoku[i][j] = world[i+1].children[j+1].textContent;
        // そうでなければ、候補のリストを設定
        } else {
          sudoku[i][j] = kouho.slice();
          // 「候補」属性を設定
          world[i+1].children[j+1].setAttribute('kouho', 't');
        }
      }
    }

    for (i=0; i<9; i++) {
      for (j=0; j<9; j++) {
        //候補のリストが無いところは、すなわち決定済の値である
        if (!Array.isArray(sudoku[i][j])) {
          //決定済の値をたよりに候補を削ってゆく
          remove_ketteisumi(sudoku, sudoku[i][j], i, j);
        }
      }
    }

    for (i=0; i<9; i++) {
      for (j=0; j<9; j++) {
        if (world[i+1].children[j+1].hasAttribute('kouho')){
          //候補が1つしかないときは決定とする
          if (sudoku[i][j].length == 1) {
            world[i+1].children[j+1].textContent = sudoku[i][j][0];
            world[i+1].children[j+1].removeAttribute('kouho');
          } else {
            world[i+1].children[j+1].textContent = sudoku[i][j];
          }
        }
      }
    }
    //console.log('next timer set');
    setTimeout(calc_and_set, 1200);
  }

});

function table_test_start () {
  console.log('now test start');
}

function create_suudoku(){
  var i;

  arr = new Array(9);

  for (i=0; i<9; i++) {
    arr[i] = new Array(9);
  }
  return arr;
}

// セルの数値が決定済のところを頼りに候補のリストから不要なものを削除する。
//
//sudoku: 9×9のマスが候補のリストを一つづつ持ったもの
//num   : 確定済のセルの値
//i     : 確定済のセルの位置(0～8)
//j     : 確定済のセルの位置(0～8)
function remove_ketteisumi (sudoku, num, i, j) {
  remove_from_yoko(sudoku, num, i, j);
  remove_from_tate(sudoku, num, i, j);
  remove_from_kukei(sudoku, num, i, j);
}

function remove_from_yoko (sudoku, num, i, j) {
  var t;

  for (t = 0; t < 9; t++) {
    if (t != j && Array.isArray(sudoku[i][t])){
      remove_from_list(sudoku[i][t], num);
    }
  }
}

function remove_from_tate (sudoku, num, i, j) {
  var s;

  for (s = 0; s < 9; s++) {
    if (s != i && Array.isArray(sudoku[s][j])){
      remove_from_list(sudoku[s][j], num);
    }
  }
}

function remove_from_kukei (sudoku, num, i, j) {
  var s, t, tate_start, tate_end, yoko_start, yoko_end;

  if (i < 3) {
    tate_start = 0;
    tate_end   = 3;
  } else if (i < 6) {
    tate_start = 3;
    tate_end   = 6;
  } else {
    tate_start = 6;
    tate_end   = 9;
  }

  if (j < 3) {
    yoko_start = 0;
    yoko_end   = 3;
  } else if (j < 6) {
    yoko_start = 3;
    yoko_end   = 6;
  } else {
    yoko_start = 6;
    yoko_end   = 9;
  }

  for (s = tate_start; s < tate_end; s++) {
    for (t = yoko_start; t < yoko_end; t++) {
      if ( !(s == i && t == j) && Array.isArray(sudoku[s][t])){
        remove_from_list(sudoku[s][t], num);
      }
    }
  }
}

// arrにnumがあればそれを削除する
function remove_from_list (arr, num) {
  var index = arr.indexOf(Number(num)); //Number()がないと文字扱いでhitしなかった
  if (index != -1) {
    //numのある位置から1個の要素を削除
    arr.splice(index,1);
  }
}
}());
