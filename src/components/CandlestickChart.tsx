import React, { useRef, useEffect } from "react";
import { createChart, IChartApi, MouseEventParams } from "lightweight-charts";

const CandlestickChart: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const toolTipRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const toolTipWidth = 96;

    // Create and style the tooltip html element
    const toolTip = document.createElement("div");
    toolTip.style.cssText = `
      width: ${toolTipWidth}px;
      height: 300px;
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
      border-radius: 4px 4px 0px 0px;
      border-bottom: none;
      box-shadow: 0 2px 5px 0 rgba(117, 134, 150, 0.45);
      font-family: -apple-system, BlinkMacSystemFont, 'Trebuchet MS', Roboto, Ubuntu, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    `;

    const toolTipColor = {
      b,
    };

    toolTip.style.background = `rgba(${CHART_BACKGROUND_RGB_COLOR}, 0.25)`;
    toolTip.style.color = CHART_TEXT_COLOR;
    toolTip.style.borderColor = BASELINE_BOTTOM_LINE_COLOR;
    containerRef.current.appendChild(toolTip);
    toolTipRef.current = toolTip;

    // Create chart
    const chart = createChart(containerRef.current, {
      /* chart options */
    });
    chartRef.current = chart;

    const series = chart.addAreaSeries({
      /* series options */
    });
    series.setData([
      /* your data */
    ]);

    // update tooltip
    chart.subscribeCrosshairMove((param: MouseEventParams) => {
      if (!containerRef.current || !toolTipRef.current) return;

      if (
        param.point === undefined ||
        !param.time ||
        param.point.x < 0 ||
        param.point.x > containerRef.current.clientWidth ||
        param.point.y < 0 ||
        param.point.y > containerRef.current.clientHeight
      ) {
        toolTipRef.current.style.display = "none";
      } else {
        const dateStr = param.time;
        toolTipRef.current.style.display = "block";
        const data = param.seriesData.get(series);
        const price = data.value !== undefined ? data.value : data.close;
        toolTipRef.current.innerHTML = `
          <div style="color: ${BASELINE_BOTTOM_LINE_COLOR}">⬤ ABC Inc.</div>
          <div style="font-size: 24px; margin: 4px 0px; color: ${CHART_TEXT_COLOR}">
            ${Math.round(100 * price) / 100}
          </div>
          <div style="color: ${CHART_TEXT_COLOR}">
            ${dateStr}
          </div>
        `;

        let left = param.point.x;
        const timeScaleWidth = chart.timeScale().width();
        const priceScaleWidth = chart.priceScale("left").width();
        const halfTooltipWidth = toolTipWidth / 2;
        left += priceScaleWidth - halfTooltipWidth;
        left = Math.min(left, priceScaleWidth + timeScaleWidth - toolTipWidth);
        left = Math.max(left, priceScaleWidth);

        toolTipRef.current.style.left = left + "px";
        toolTipRef.current.style.top = "0px";
      }
    });

    return () => {
      chart.remove();
    };
  }, []);

  return <div ref={containerRef} />;
};

export default CandlestickChart;
