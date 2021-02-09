$(function() {

  function table_test_start () {
    console.log('now test start');
  }

  $('td').on('click', function (event) {
    var temp = $(this).text();

    console.log(temp);
    //$(this).html('<input class="hoge" type="text" value="' + temp + '">');
    $(this).html('<input class="hoge" type="text" value="">');

    $('.hoge').focus();
  });

  $(document).on('blur', '.hoge', function () {

    $('.hoge').parent().html($('.hoge').val());

    console.log($('.hoge').parent());

    console.log("change");
  });

  $(window).on('ready', table_test_start());

});
