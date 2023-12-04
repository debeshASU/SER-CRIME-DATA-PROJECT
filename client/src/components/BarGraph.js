import { useRef, useEffect } from 'react';
import * as d3 from 'd3';

function BarChart({ data }) {
    const ref = useRef();

    useEffect(() => {
        d3.select(ref.current).selectAll("*").remove();

        const svg = d3.select(ref.current);
        const margin = { top: 20, right: 20, bottom: 30, left: 40 };
        const width = +svg.attr('width') - margin.left - margin.right;
        const height = +svg.attr('height') - margin.top - margin.bottom;
        const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

        const x = d3.scaleBand()
                    .rangeRound([0, width])
                    .padding(0.1)
                    .domain(data.map(d => d.name));

        const y = d3.scaleLinear()
                    .rangeRound([height, 0])
                    .domain([0, d3.max(data, d => d.value)]);

        g.append('g')
            .attr('class', 'axis axis--x')
            .attr('transform', `translate(0,${height})`)
            .call(d3.axisBottom(x));

        g.append('g')
            .attr('class', 'axis axis--y')
            .call(d3.axisLeft(y).ticks(10))
          .append('text')
            .attr('transform', 'rotate(-90)')
            .attr('y', 6)
            .attr('dy', '0.71em')
            .attr('text-anchor', 'end')
            .text('Value');

        g.selectAll('.bar')
            .data(data)
            .enter().append('rect')
            .attr('class', 'bar')
            .attr('x', d => x(d.name))
            .attr('y', d => y(d.value))
            .attr('width', x.bandwidth())
            .attr('height', d => height - y(d.value))
            .style('fill', 'steelblue');
    }, [data]);

    return <svg ref={ref} width={800} height={500} />;
}

export default BarChart;
