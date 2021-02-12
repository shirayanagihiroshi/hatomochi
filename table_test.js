$(function() {

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


    console.log(world[2].children[0].textContent);
    for (i=1; i<10 ;i++) {
      world[i].children[5].textContent = 'hoge'+i
    }
  });

});
