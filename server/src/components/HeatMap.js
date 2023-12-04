import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import newyorkStateGeoJSON from './NewYorkState.json'; 
import newyorkBoroughs from './NewYorkCounties.json'; 

const HeatMap = ({ data }) => {
  const d3Container = useRef(null);

  useEffect(() => {
    if (d3Container.current && data) {
      const width = 800;
      const height = 600;

      d3.select(d3Container.current).selectAll("*").remove();

      const svg = d3.select(d3Container.current)
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .style('background', '#f0f0f0')
        .style('border', '1px solid black');

      
      const projection = d3.geoMercator()
        .fitSize([width, height], newyorkStateGeoJSON);

      
      const pathGenerator = d3.geoPath().projection(projection);

      
      svg.selectAll(".state")
        .data(newyorkStateGeoJSON.features)
        .enter()
        .append("path")
        .attr("class", "state")
        .attr("d", pathGenerator)
        .attr("fill", "#ddd");

      
      const maxValue = d3.max(data, d => d.value);
      const colorScale = d3.scaleSequential(d3.interpolateReds).domain([0, maxValue]);

      
      svg.selectAll(".borough")
        .data(newyorkBoroughs.features)
        .enter()
        .append("path")
        .attr("class", "borough")
        .attr("d", pathGenerator)
        .attr("fill", d => {
          const match = data.find(item => item.name.toUpperCase() === d.properties.name.toUpperCase());
          return match ? colorScale(match.value) : '#ccc';
        });

      
      svg.selectAll(".borough-dot")
        .data(newyorkBoroughs.features)
        .enter().append("circle")
        .attr("class", "borough-dot")
        .attr("cx", d => projection(d3.geoCentroid(d))[0])
        .attr("cy", d => projection(d3.geoCentroid(d))[1])
        .attr("r", 20) // Radius of the dots
        .attr("fill", d => {
          const match = data.find(item => item.name.toUpperCase() === d.properties.name.toUpperCase());
          return match ? colorScale(match.value) : '#ccc';
        });

      // Add labels for each borough
      svg.selectAll(".label")
        .data(newyorkBoroughs.features)
        .enter()
        .append("text")
        .attr("class", "label")
        .attr("x", d => projection(d3.geoCentroid(d))[0])
        .attr("y", d => projection(d3.geoCentroid(d))[1] + 15) 
        .text(d => d.properties.name)
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "central")
        .style("font-size", "10px")
        .style("fill", "black");
    }
  }, [data]);

  return <div ref={d3Container} />;
};

export default HeatMap;
