import React, { useEffect, useRef } from 'react';
import {ColorType, createChart, IChartApi} from 'lightweight-charts';
import {ItemPricesResponse} from "@/features/dto/ItemResponse.ts";

const CandlestickChart: React.FC<{data: ItemPricesResponse[]}> = ({ data }) => {
    const chartContainerRef = useRef<HTMLDivElement>(null);
    const chartRef = useRef<IChartApi | null>(null);
    const chartData = data as ItemPricesResponse[] || {};

    const lightTheme = {
        lineColor: '#2962FF'
    }


    const colors = {
        backgroundColor: 'white',
        lineColor: lightTheme.lineColor,
        textColor: 'black',
        upColor: '#26a69a',
        downColor: '#ef5350',
        borderVisible: false,
        wickUpColor: '#26a69a',
        wickDownColor: '#ef5350'
    }


    useEffect(() => {
        if (chartContainerRef.current) {
            const handleResize = () => {
                if (chartRef.current && chartContainerRef.current) {
                    const { clientWidth } = chartContainerRef.current;
                    const height = Math.floor(window.innerHeight / 2);
                    chartRef.current.applyOptions({ width: clientWidth, height });
                }
            };

            chartRef.current = createChart(chartContainerRef.current, {
                width: chartContainerRef.current.clientWidth,
                height: Math.floor(window.innerHeight / 2),
                layout: {
                    background: {type: ColorType.Solid, color: colors.backgroundColor},
                    textColor: colors.textColor,
                },
                grid: {
                    vertLines: { color: '#f0f0f0' },
                    horzLines: { color: '#f0f0f0' },
                },
            });

            const candlestickSeries = chartRef.current.addCandlestickSeries({
                upColor: colors.upColor,
                downColor: colors.downColor,
                borderVisible: colors.borderVisible,
                wickUpColor: colors.wickUpColor,
                wickDownColor: colors.wickDownColor
            });

            candlestickSeries.setData(chartData);

            window.addEventListener('resize', handleResize);

            return () => {
                window.removeEventListener('resize', handleResize);
                chartRef.current?.remove();
            };
        }
    }, [chartData]);

    return <div ref={chartContainerRef} style={{ width: '100%', height: '50vh' }} />;
};

export default CandlestickChart;
