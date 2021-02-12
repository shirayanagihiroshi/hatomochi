$(function() {
  var sudoku = new Array(2);

  function table_test_start () {
    console.log('now test start');
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
    var i;
    var world = $('.sudoku').find('tr');
//    var elements = $('.sudoku > td:eq(1)').find('tr');var  = world[0].find('td');

    sudoku[0]=100;
    console.log(sudoku[0]);
    sudoku[1]=101;
    console.log(sudoku[1]);
    sudoku[2]=102;
    console.log(sudoku[2]);
    sudoku[3]=103;
    console.log(sudoku[3]);
    sudoku.unshift(5);
    sudoku.push(104);
    console.log(sudoku);
    //sudoku.splice(3,1);
    remove_from_list(sudoku, 102);
    console.log(sudoku);
    console.log(sudoku.length);


    console.log(world[2].children[0].textContent);
    for (i=1; i<10 ;i++) {
      world[i].children[5].textContent = 'hoge'+i
    }
  });

});

// arrにnumがあればそれを削除する
function remove_from_list (arr, num) {
  var index = arr.indexOf(num);
  if (index != -1) {
    //numのある位置から1個の要素を削除
    arr.splice(index,1);
  }
}
