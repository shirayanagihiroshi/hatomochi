var svg = d3.select("svg");


svg.append('circle')
  .attr('cx', 100)
  .attr('cy', 90)
  .attr('r', 20)
  .transition()
  .duration(750)
  .attr('cx',500)
  .attr('r',40)



$(function() {
  $('circle').on('click', function (event) {
    svg.append('circle')
      .attr('cx', 100)
      .attr('cy', 90)
      .attr('r', 20)
      .transition()
      .duration(750)
      .attr('cx',100)
      .attr('r',40)
  });
});
