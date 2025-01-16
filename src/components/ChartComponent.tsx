import { createChart, ColorType } from "lightweight-charts";
import React, { useEffect, useRef } from "react";
import { ItemPricesResponse } from "@/features/dto/ItemResponse.ts";

const ChartComponent: React.FC<{ data: ItemPricesResponse[] }> = (props) => {
  const chartData = props.data;
  const chartContainerRef = useRef<HTMLDivElement>(null);

  const lightTheme = {
    lineColor: "#2962FF",
  };

  const colors = {
    backgroundColor: "white",
    lineColor: lightTheme.lineColor,
    textColor: "black",
    upColor: "#26a69a",
    downColor: "#ef5350",
    borderVisible: false,
    wickUpColor: "#26a69a",
    wickDownColor: "#ef5350",
  };

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
  }, [
    chartData,
    colors.backgroundColor,
    colors.borderVisible,
    colors.downColor,
    colors.lineColor,
    colors.textColor,
    colors.upColor,
    colors.wickDownColor,
    colors.wickUpColor,
  ]);

  return <div ref={chartContainerRef}></div>;
};
export default ChartComponent;
