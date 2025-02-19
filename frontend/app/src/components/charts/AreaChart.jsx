import * as React from 'react';
import { LineChart, lineElementClasses } from '@mui/x-charts/LineChart';

const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
const amtData = [2400, 2210, 0, 2000, 2181, 2500, 2100];
const xLabels = [
    'Page A',
    'Page B',
    'Page C',
    'Page D',
    'Page E',
    'Page F',
    'Page G',
];

export default function StackedAreaChart() {
    return (
        <LineChart
            width={350}
            height={290}
            series={[
                { data: uData, label: 'Collected', area: true, stack: 'total', showMark: false ,color: '#8A2BE2'},
                { data: pData, label: 'Distrubuted', area: true, stack: 'total', showMark: false ,color: '#FF0000'},
                {
                    data: amtData,
                    label: 'amt',
                    area: true,
                    stack: 'total',
                    showMark: false,
                },
            ]}
            xAxis={[{ scaleType: 'point', data: xLabels }]}
            sx={{
                [`& .${lineElementClasses.root}`]: {
                    display: 'none',
                },
            }}
        />
    );
}
