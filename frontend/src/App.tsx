import { ChakraProvider, Divider, Flex, Tab, TabList, TabPanel, TabPanels, Tabs, extendTheme } from '@chakra-ui/react';
import React from 'react';
import { AppControllerProps } from './module/Bridge';
import { borderRadius } from './styles/ChakraTheme';
import CurrencySelector from './components/CurrencySelector';
import Github from './components/Github';

declare global {
    interface Window {
        app: AppControllerProps;
    }
}
const App = () => {
    const theme = extendTheme({ ...borderRadius })
    return (
        <ChakraProvider theme={theme}>
            <Tabs h={'320px'}>
                <TabList>
                    <Tab>Setting</Tab>
                </TabList>
                <TabPanels h='full'>
                    <TabPanel h='full'>
                        <CurrencySelector />
                    </TabPanel>
                </TabPanels>
            </Tabs>
            <Divider />
            <Flex gap={2} justify={'flex-end'} align={'center'} p={3}>
                <Github fn={() => window.app.github()} name="B-HS" />
            </Flex>
        </ChakraProvider>
    )
}
export default App