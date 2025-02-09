import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490,1345,3456,1000,2451,2132];
const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300,700,1345,1000,2312,1212];
const xLabels = [
 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul','Aug','Sept','Oct','Nov','Dec'
];

export default function BiaxialLineChart() {
    return (
        <LineChart
            width={900}
            height={333}
            series={[
                { data: pData, label: 'Loan Collected', yAxisId: 'leftAxisId', color: '#8A2BE2' },
                { data: uData, label: 'Loan Distributed', yAxisId: 'rightAxisId', color: '#FF0000' },
            ]}
            xAxis={[{ scaleType: 'point', data: xLabels }]}
            yAxis={[{ id: 'leftAxisId' }, { id: 'rightAxisId' }]}
            rightAxis="rightAxisId"
        />
    );
}
