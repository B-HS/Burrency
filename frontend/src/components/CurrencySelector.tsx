import { Button, Code, Grid, Input, Text } from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import { CURRENCIES } from "../constant"
import useInput from "../hooks/useInput"


const CurrencySelector = () => {
    const [init, setInit] = useState(true)
    const [search, onChangeSearch] = useInput()
    const [selected, setSelected] = useState([])
    const currencies = CURRENCIES.filter(val => val.toLowerCase().includes(search.toLowerCase())).map(val => {
        return { name: val, checked: selected.includes(val) }
    })
    const setCurrency = (e: string) => {
        if (selected.includes(e)) {
            setSelected(selected.filter(val => val !== e))
        } else {
            setSelected([...selected, e])
        }
    }

    const initialize = () => {
        window.app.currencyEventer((val: string[]) => setSelected(() => Array.isArray(val) ? [...val] : []))
        window.app.getCurrency()
        setInit(false)
    }
    useEffect(() => {
        init && initialize()
    }, [])

    useEffect(() => {
        !init && window.app.setCurrency(selected as string[])
    }, [selected])

    return (
        <>
            <Text fontWeight={'bold'} pb='3' fontSize='sm'>
                Selected item will be used for <Code>CHART</Code>|<Code>TASKBAR</Code>
            </Text>
            <Grid templateColumns='repeat(auto-fit, minmax(50px, 1fr))'>
                {currencies.map(val => <Button colorScheme={selected.includes(val.name) ? 'blue' : 'gray'} key={val.name} variant={!val.checked ? 'outline' : 'solid'} onClick={() => setCurrency(val.name)} size={'xs'}>{val.name}</Button>)}
            </Grid>
            <Input
                value={search}
                onChange={onChangeSearch}
                placeholder={'Search'}
                size='sm'
                _focus={{ boxShadow: 'none' }}
                _active={{ boxShadow: 'none' }}
            />
        </>
    )
}

export default CurrencySelector