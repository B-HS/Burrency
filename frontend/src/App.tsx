import { CloseIcon, ViewOffIcon } from '@chakra-ui/icons';
import { Card, ChakraProvider, Divider, Flex, Text, extendTheme } from '@chakra-ui/react';
import {
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    Title,
    Tooltip,
} from 'chart.js';
import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { borderRadius } from './styles/ChakraTheme';
import Github from './styles/Github';
const App = () => {
    const theme = extendTheme({ ...borderRadius })
    const [currencyInfo, setCurrencyInfo] = useState()
    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
    );

    const options = {
        responsive: true,
        scales: {
            y: {
                type: 'linear' as const,
                display: true,
                position: 'left' as const,
            },
            y1: {
                type: 'linear' as const,
                display: true,
                position: 'right' as const,
                grid: {
                    drawOnChartArea: false,
                },
            },
        },
    };

    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

    const data = {
        labels,
        datasets: [
            {
                label: 'Dataset 1',
                data: [1, 2, 3, 4, 5],
                yAxisID: 'y',
                borderColor: 'green',
                backgroundColor: 'green',
            },
            {
                label: 'Dataset 2',
                data: [5, 2, 3, 4, 5],
                yAxisID: 'y1',
                borderColor: 'blue',
                backgroundColor: 'blue',
            },
        ],
    };

    return (
        <ChakraProvider theme={theme}>
            <Flex justify={'space-between'} align={'center'} p={3}>
                <Text>Burrency</Text>
                <Flex alignContent={'center'} gap={2}>
                    <ViewOffIcon />
                    <CloseIcon ml={2} viewBox='0 0 25 25' />
                </Flex>
            </Flex>
            <Divider />
            <Card p={3}>
                <Line options={options} data={data} />
            </Card>
            <Divider />
            <Flex gap={2} justify={'flex-end'} align={'center'} p={3}>
                <Text>B-HS</Text>
                <Flex alignContent={'center'} gap={2}>
                    <Github />
                    {currencyInfo}
                </Flex>
            </Flex>
        </ChakraProvider>
    )
}
export default App