import { createChart, ColorType } from "lightweight-charts";
import React, { useEffect, useMemo, useRef } from "react";
import { ItemPricesResponse } from "@/entities/gem/model/ItemResponse";

const ChartComponent: React.FC<{ data: ItemPricesResponse[] }> = (props) => {
  const chartData = props.data;
  const chartContainerRef = useRef<HTMLDivElement>(null);

  const lightTheme = {
    lineColor: "#2962FF",
  };

  const colors = useMemo(
    () => ({
      backgroundColor: "white",
      lineColor: lightTheme.lineColor,
      textColor: "black",
      upColor: "#26a69a",
      downColor: "#ef5350",
      borderVisible: false,
      wickUpColor: "#26a69a",
      wickDownColor: "#ef5350",
    }),
    [lightTheme.lineColor]
  );
  useEffect(() => {
    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef.current!.clientWidth });
      console.log(chartContainerRef.current!.clientWidth);
    };

    const chart = createChart(chartContainerRef.current!, {
      layout: {
        background: { type: ColorType.Solid, color: colors.backgroundColor },
        textColor: colors.textColor,
      },
      width: chartContainerRef.current!.clientWidth,
      height: 500,
    });
    chart.timeScale().fitContent();

    const newSeries = chart.addCandlestickSeries({
      upColor: colors.upColor,
      downColor: colors.downColor,
      borderVisible: colors.borderVisible,
      wickUpColor: colors.wickUpColor,
      wickDownColor: colors.wickDownColor,
    });
    newSeries.setData(chartData);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
    };
  }, [chartData, colors]);

  return <div ref={chartContainerRef}></div>;
};
export default ChartComponent;
