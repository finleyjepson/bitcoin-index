import { useEffect, useState } from "react"
import CurrencySelector from "./CurrencySelector"

async function UseFetchPrice(currency, setPrice, updatePrice, updateCurrency, setUpdatePrice, setUpdateCurrency, setFetchedCurrency) {
    if (!updatePrice && !updateCurrency) return

    await fetch(`https://api.coindesk.com/v1/bpi/currentprice/${currency}.json`)
        .then((res) => res.json())
        .then((data) => {
            sessionStorage.setItem("price", data.bpi[currency.toUpperCase()].rate)
            sessionStorage.setItem("currency", currency)
            sessionStorage.setItem("fetchedCurrency", currency)
            setPrice(data.bpi[currency.toUpperCase()].rate)
            setFetchedCurrency(currency)
        })
    console.log("Price updated")
    setUpdatePrice(false)
    setUpdateCurrency(false)
}

function BitcoinIndex() {
    const [price, setPrice] = useState(sessionStorage.getItem("price") || 'Loading...') // the price of bitcoin fetched from the API
    const [updatePrice, setUpdatePrice] = useState(true) // whether to update the price
    const [currency, setCurrency] = useState(sessionStorage.getItem("currency") || "aud") // the currency selected
    const [fetchedCurrency, setFetchedCurrency] = useState(sessionStorage.getItem("fetchedCurrency") || "aud") // used to display the currency when the price is fetched
    const [updateCurrency, setUpdateCurrency] = useState(false) // used to trigger useEffect when a new currency is selected

    useEffect(() => {
        UseFetchPrice(currency, setPrice, updatePrice, updateCurrency, setUpdatePrice, setUpdateCurrency, setFetchedCurrency)
    }, [updatePrice, updateCurrency, currency])

    const handleCurrencyChange = (e) => {
        setCurrency(e.target.value)
        setUpdateCurrency((prevState) => !prevState)
    }

    return (
        <>
            <CurrencySelector currency={currency} onCurrencyChange={handleCurrencyChange} />
            <p>The current price is: {price + ` ${fetchedCurrency.toUpperCase()}`}</p>
            <button onClick={() => setUpdatePrice((prevState) => !prevState)}>Update Price</button>
        </>
    )
}

export default BitcoinIndex