$(function() {

  function table_test_start () {
    console.log('now test start');
  }

  $('.testtable').on('click', function (event) {
    console.log('click!');
    console.log('git up test');
  });

  $(window).on('ready', table_test_start());

});
