import {createChart, ColorType} from "lightweight-charts";
import React, {useEffect, useRef} from 'react';
import {PriceRecord} from "@/model/item.ts";

interface PriceRecords {
    data: PriceRecord[]
}
const ChartComponent: React.FC<PriceRecords> = (props) => {
        const chartData = props.data;

        const colors = {
            backgroundColor: 'white',

            lineColor: '#2962FF',
            textColor: 'black',
            areaTopColor: '#2962FF',
            areaBottomColor: 'rgba(41, 98, 255, 0.28)',


            upColor: '#26a69a',
            downColor: '#ef5350',
            borderVisible: false,
            wickUpColor: '#26a69a',
            wickDownColor: '#ef5350'
        }

        const chartContainerRef = useRef<HTMLDivElement>(null);

        useEffect(
            () => {
                const handleResize = () => {
                    chart.applyOptions({width: chartContainerRef.current!.clientWidth});
                };

                const chart = createChart(chartContainerRef.current!, {
                    layout: {
                        background: {type: ColorType.Solid, color: colors.backgroundColor},
                        textColor: colors.textColor,
                    },
                    // width: chartContainerRef.current!.clientWidth,
                    width: 1000,
                    height: 300,
                });
                chart.timeScale().fitContent();

                const newSeries = chart.addCandlestickSeries({
                        upColor: colors.upColor,
                        downColor: colors.downColor,
                        borderVisible: colors.borderVisible,
                        wickUpColor: colors.wickUpColor,
                        wickDownColor: colors.wickDownColor
                    })
                ;
                newSeries.setData(chartData);
                window.addEventListener('resize', handleResize);
                return () => {
                    window.removeEventListener('resize', handleResize);
                    chart.remove();
                };
            },
            [chartData, colors.backgroundColor, colors.lineColor, colors.textColor, colors.areaTopColor, colors.areaBottomColor]
        );

        return (
            <div ref={chartContainerRef}></div>
        );
    }
;
export default ChartComponent;