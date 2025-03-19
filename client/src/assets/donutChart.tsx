import { useMemo } from "react";
import * as d3 from "d3";

type DataItem = {
    id: number;
    user_id: number;
    med_stats: string;
    quantity: number;
};
type DonutChartProps = {
  width: number;
  height: number;
  data: DataItem[];
};

const MARGIN = 30;

const colors = [
  "#54b3d6",
  "#D3D3D3",
  "#6689c6",
  "#9a6fb0",
  "#a53253",
  "#69b3a2",
];

export const DonutChart = ({ width, height, data }: DonutChartProps) => {
  const radius = Math.min(width, height) / 2 - MARGIN;

  const pie = useMemo(() => {
    const pieGenerator = d3.pie<any, DataItem>().value((d) => d.quantity);
    return pieGenerator(data);
  }, [data]);

  const arcs = useMemo(() => {
    const arcPathGenerator = d3.arc();
    return pie.map((p) =>
      arcPathGenerator({
        innerRadius: 70,
        outerRadius: radius,
        startAngle: p.startAngle,
        endAngle: p.endAngle,
      })
    );
  }, [radius, pie]);

  return (
    <svg width={width} height={height} style={{ display: "inline-block" }}>
      <g transform={`translate(${width / 2}, ${height / 2})`}>
      {arcs.map((arc, i) => {
          return <path key={i} d={arc || undefined} fill={colors[i]} />;
        })}
      </g>
    </svg>
  );
};