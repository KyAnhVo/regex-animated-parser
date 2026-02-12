import './style.css'
import d3 from 'd3'

const svgSize = {
  width: 600,
  height: 400,
}

var nfaSvg;
var dfaSvg;

function init(): void {
  nfaSvg = d3.select("#nfa-canvas")
    .attr("width", svgSize.width)
    .attr("height", svgSize.height);
  dfaSvg = d3.select("#dfa-canvas")
    .attr("width", svgSize.width)
    .attr("height", svgSize.height);
}

init();
