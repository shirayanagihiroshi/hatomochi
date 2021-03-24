/*
 * skt.js
 * ルート名前空間モジュール
 */
var skt = (function () {
  var initModule = function ( $container ) {
    skt.shell.initModule($container);
  }

  return { initModule : initModule };
}());
