import { createChart, ColorType, BarData } from "lightweight-charts";
import React, { useEffect, useMemo, useRef } from "react";
import { ItemPricesResponse } from "@/entities/gem/model/ItemResponse";
import { formatPriceAndSign } from "@/shared/utils/formatter";

const ChartComponent: React.FC<{ data: ItemPricesResponse[] }> = ({ data }) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<any>(null);
  const candleSeriesRef = useRef<any>(null);
  const toolTipRef = useRef<HTMLDivElement | null>(null);

  const lightTheme = {
    lineColor: "#2962FF",
    upColor: "#ef4444",
    downColor: "#3b82f6",
  };

  const colors = useMemo(
    () => ({
      backgroundColor: "white",
      textColor: "black",
      upColor: lightTheme.upColor,
      downColor: lightTheme.downColor,
      borderVisible: false,
      wickUpColor: "#ef4444",
      wickDownColor: "#3b82f6",
    }),
    [lightTheme.downColor, lightTheme.upColor]
  );

  // 차트 및 시리즈는 컴포넌트 마운트 시 한 번만 생성
  useEffect(() => {
    if (!chartContainerRef.current) return;
    const container = chartContainerRef.current;
    const chart = createChart(container, {
      layout: {
        background: { type: ColorType.Solid, color: colors.backgroundColor },
        textColor: colors.textColor,
      },
      width: container.clientWidth,
      height: 500,
    });
    chartRef.current = chart;
    chart.timeScale().fitContent();

    // 캔들 시리즈 생성
    const candleSeries = chart.addCandlestickSeries({
      upColor: colors.upColor,
      downColor: colors.downColor,
      borderVisible: colors.borderVisible,
      wickUpColor: colors.wickUpColor,
      wickDownColor: colors.wickDownColor,
    });
    candleSeriesRef.current = candleSeries;

    // magnifier tooltip 엘리먼트 생성
    const toolTip = document.createElement("div");
    const toolTipWidth = 150;
    toolTip.style.cssText = `
      width: ${toolTipWidth}px;
      height: 500px;
      position: absolute;
      display: none;
      padding: 8px;
      box-sizing: border-box;
      font-size: 12px;
      text-align: left;
      z-index: 1000;
      top: 12px;
      left: 12px;
      pointer-events: none;
      border-radius: 4px 4px 0 0;
      border-bottom: none;
      box-shadow: 0 2px 5px 0 rgba(117,134,150,0.45);
      font-family: -apple-system, BlinkMacSystemFont, 'Trebuchet MS', Roboto, Ubuntu, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    `;
    toolTip.style.background = `rgba(255,255,255,0.70)`;
    toolTip.style.color = "black";
    toolTip.style.borderColor = "#2962FF";
    container.appendChild(toolTip);
    toolTipRef.current = toolTip;

    // crosshair 이동 시 tooltip 업데이트
    chart.subscribeCrosshairMove((param) => {
      if (
        param.point === undefined ||
        !param.time ||
        param.point.x < 0 ||
        param.point.x > container.clientWidth ||
        param.point.y < 0 ||
        param.point.y > container.clientHeight
      ) {
        toolTip.style.display = "none";
        return;
      }
      const candle = param.seriesData.get(candleSeries) as BarData;
      if (!candle) {
        toolTip.style.display = "none";
        return;
      }
      toolTip.style.display = "block";
      const dateStr =
        typeof param.time === "string"
          ? param.time
          : new Date((param.time as number) * 1000).toLocaleDateString();

      const closePrice = formatPriceAndSign(candle.close);
      toolTip.innerHTML = `
        <div style="color: #2962FF; font-weight: bold;"></div>
        <div style="font-size: 14px; margin: 4px 0; color: black; text-align: center;">
          가격: ${closePrice}<br/>
        </div>
        <div style="color: black; text-align: center;">${dateStr}</div>
      `;

      const priceScaleWidth = chart.priceScale("left").width();
      const timeScaleWidth = chart.timeScale().width();
      const halfToolTipWidth = toolTipWidth / 2;
      let left = param.point.x + priceScaleWidth - halfToolTipWidth;
      left = Math.min(left, priceScaleWidth + timeScaleWidth - toolTipWidth);
      left = Math.max(left, priceScaleWidth);
      toolTip.style.left = left + "px";
      toolTip.style.top = "0px";
    });

    const handleResize = () => {
      chart.applyOptions({ width: container.clientWidth });
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
    };
  }, []); // 빈 dependency 배열로 한 번만 실행

  // data가 변경될 때 기존 시리즈에 데이터 업데이트
  useEffect(() => {
    if (candleSeriesRef.current) {
      candleSeriesRef.current.setData(data);
    }
  }, [data]);

  return <div ref={chartContainerRef} style={{ position: "relative" }} />;
};

export default ChartComponent;
