"use client";
import { useMeasure } from '@uidotdev/usehooks';
import * as d3 from 'd3';
import {fakeData1, fakeData2} from './fakeData';


export default function Home() {
  const [ref, { height, width }] = useMeasure();
  return (
    <main
      className='mx-auto max-w-3xl h-[400px] my-20'
      ref={ref}
    >
      {height&&width&&<Graph height={height} width={width}/>}
      <p className='text-center text-sm'>
        Original Design - <a href="https://www.behance.net/gallery/54656777/Media-Economy-Report-Vol10" className='hover:underline' target='blank'>https://www.behance.net/gallery/54656777/Media-Economy-Report-Vol10</a>
      </p>
    </main>
  );
}

function Graph({height, width}: {height: number, width:number}) {
  const paddingX = 50;
  const paddingY = 80;

  const xScale = d3.scaleBand(fakeData1.map(data => data.year), [paddingX, width-paddingX])
    .paddingOuter(0)
    .paddingInner(0.7)
  const yScale = d3.scaleLinear([5, -5], [paddingY, height-paddingY])
  const yScaleTicks = yScale.ticks(5);
    

  const curveGenerator = d3.line()
  // @ts-ignore
    .x(d => xScale(d.year) + xScale.bandwidth()/2)
  // @ts-ignore
    .y(d => yScale(d.val))
    .curve(d3.curveMonotoneX)

  // @ts-ignore
  const curvePath1 = curveGenerator(fakeData1);
  // @ts-ignore
  const curvePath2 = curveGenerator(fakeData2);

  return (
    <div>
      <svg height={height} width={width}>
        <pattern id="diagonalHatch" patternUnits="userSpaceOnUse" width="4" height="4">
          <path d="M-1,1 l2,-2 M0,4 l4,-4 M3,5 l2,-2" style={{stroke: 'currentcolor', strokeWidth: 1}} />
        </pattern>
        {fakeData1.map((data, index) => {
          return (
            <g
              key={index}
            >
              <text
                className='text-md font-mono font-bold'
                // @ts-ignore
                transform={`translate(${xScale(data.year) + xScale.bandwidth()/2 + 5}, ${yScale(5)-20}) rotate(-90)`}
              >
                {data.year}
              </text>
              <rect
                x={xScale(data.year)}
                y={yScale(5)}
                height={yScale(-5) -yScale(5)}
                width={xScale.bandwidth()}
                fill='url(#diagonalHatch)'
                fillOpacity={0.2}
              />
            </g>
          )
        })}
        {yScaleTicks.map(val => {
          return (
            <g>
              <text
                textAnchor='middle'
                dominantBaseline='middle'
                // @ts-ignore
                transform={`translate(${xScale("2012") - 20}, ${yScale(val)})`}
                className='text-[0.6rem] font-bold'
                fill='black'
              >
                {val}
              </text>
              <line
                x1={xScale("2012")}
                y1={yScale(val)}
                // @ts-ignore
                x2={xScale("2021") + xScale.bandwidth()}
                y2={yScale(val)}
                stroke='black'
                strokeOpacity={0.6}
                strokeDasharray={'3 4'}

              />
            </g>
          )
        })}
        <line
          x1={xScale("2012")}
          y1={yScale(0)}
          // @ts-ignore
          x2={xScale("2021") + xScale.bandwidth()}
          y2={yScale(0)}
          stroke='black'
        />
        <path
          d={curvePath1}
          stroke='#2563eb'
          strokeWidth={1}
          fill='none'
        />
        <path
          d={curvePath2}
          stroke='#be123c'
          strokeWidth={1}
          fill='none'
        />
        {fakeData1.map((data, index) => {
          return (
            <g key={`data1-${index}`}>
              <text
                textAnchor='middle'
                dominantBaseline='middle'
                // @ts-ignore
                transform={`translate(${xScale(data.year) + xScale.bandwidth()/2}, ${yScale(data.val) - 15})`}
                className='text-sm font-bold'
                fill='#2563eb'
              >
                {data.val}
              </text>
              <circle
                key={index}
                r={4}
                // @ts-ignore
                cx={xScale(data.year) + xScale.bandwidth()/2}
                cy={yScale(data.val)}
                fill='white'
                stroke='#2563eb'
                strokeWidth={2}
              />
            </g>
          )
        })}
        {fakeData2.map((data, index) => {
          return (
            <g key={`data1-${index}`}>
              <text
                textAnchor='middle'
                dominantBaseline='middle'
                // @ts-ignore
                transform={`translate(${xScale(data.year) + xScale.bandwidth()/2}, ${yScale(data.val) - 15})`}
                className='text-sm font-bold'
                fill='#be123c'
              >
                {data.val}
              </text>
              <circle
                key={index}
                r={4}
                // @ts-ignore
                cx={xScale(data.year) + xScale.bandwidth()/2}
                cy={yScale(data.val)}
                fill='white'
                stroke='#be123c'
                strokeWidth={2}
              />
            </g>
          )
        })}
      </svg>
    </div>
  )
}
