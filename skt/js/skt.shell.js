/*
 * skt.shell.js
 * シェルモジュール
 */
skt.shell = (function () {
  //---モジュールスコープ変数---
  var configMap = {
    main_html : String()
      + '<div class="skt-shell-head">'
        + '<div class="skt-shell-head-acct"></div>'
      + '</div>'
      + '<div class="skt-shell-main">'
        + '<div class="skt-shell-main-content"></div>'
      + '</div>'
    },
    stateMap = { $container : null },
    jqueryMap = {},
    setJqueryMap, initModule;

  //---DOMメソッド---
  setJqueryMap = function () {
    var $container = stateMap.$container;
    jqueryMap = { $container : $container};
  }

  //---パブリックメソッド---
  var initModule = function ( $container ) {
    stateMap.$container = $container;
    $container.html( configMap.main_html );
    setJqueryMap();
  }

  return { initModule : initModule };
}());
