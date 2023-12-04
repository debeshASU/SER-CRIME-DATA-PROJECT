import { useRef, useEffect } from 'react';
import * as d3 from 'd3';

function PieChart({ data }) {
    const ref = useRef();

    useEffect(() => {
        
        d3.select(ref.current).selectAll("*").remove();

        const svg = d3.select(ref.current)
            .attr("width", 350)
            .attr("height", 350)
            .append("g")
            .attr("transform", "translate(175, 175)");

        const pie = d3.pie().value(d => d.value);
        const arc = d3.arc().innerRadius(0).outerRadius(150);
        const arcs = pie(data);

        svg
            .selectAll('path')
            .data(arcs)
            .enter()
            .append('path')
            .attr('d', arc)
            .attr('fill', (d, i) => d3.schemeCategory10[i])
            .attr('stroke', 'white')
            .style('stroke-width', '2px');

        
        svg
            .selectAll('text')
            .data(arcs)
            .enter()
            .append('text')
            .attr("transform", d => `translate(${arc.centroid(d)})`)
            .attr("text-anchor", "middle")
            .text(d => `(${d.data.name})`)
            .style("font-size", "12px")
            .style("fill", "white");
    }, [data]);

    const svgStyle = {
        display: 'block',
        margin: 'auto'
    };

    return <svg ref={ref} style={svgStyle} />;
}

export default PieChart;
