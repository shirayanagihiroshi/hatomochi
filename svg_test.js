var svg = d3.select('svg'),
    cir = d3.select('.c1'),
    rotate=0;

cir.attr('cx', 100)
  .attr('cy', 90)
  .attr('r', 20)
  .transition()
  .duration(2000)
  .attr('cx',600)
  .attr('r',40);

svg.append('line')
  .attr('class', 'line1')
  .attr('x1', 100)
  .attr('y1', 100)
  .attr('x2', 200)
  .attr('y2', 300)
  .attr('stroke-width', 1)
  .attr('stroke', '#0aaaa7');
svg.append('line')
  .attr('x1', 200)
  .attr('y1', 300)
  .attr('x2', 45)
  .attr('y2', 80)
  .attr('stroke-width', 1)
  .attr('stroke', '#0aaaa7');



  // Pathの座標データ
  var data = [{x: 0, y: 20},
              {x: 150, y: 250},
              {x: 300, y: 200},
              {x: 450, y: 20},
              {x: 600, y: 380}]

  // SVG設定
  var svg = d3.select("svg");

  // line作成関数
  var curveFunc = d3.line()
            .curve(d3./*curveBasis*/curveCardinal) // curveメソッドで線の形を変更
            .x(function(d) { return d.x })
            .y(function(d) { return d.y })

  // Path追加
  svg.append('path')
            .attr('d', curveFunc(data))
            .attr('stroke-width', 5)
            .attr('stroke', '#aaffaa')
            .attr('fill', 'none');

$(function() {
  $('circle').on('click', function (event) {
    var lin = d3.select('.line1');

    cir.transition()
      .duration(750)
      .attr('cx',100)
      .attr('r',20);

    rotate = rotate - 20;

    lin.transition()
      .duration(1000)
      .attr('transform', 'rotate('+ rotate + ', 100, 200)');
  });
});
