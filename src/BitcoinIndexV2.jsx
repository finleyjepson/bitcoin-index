import {useEffect, useState } from 'react'

function FetchPrice(currency, setPrice, updatePrice, updateCurrency, setUpdatePrice, setUpdateCurrency, setFetchedCurrency) {
    if (!updatePrice && !updateCurrency) return

    fetch(`https://api.coindesk.com/v1/bpi/currentprice/${currency}.json`)
        .then((res) => res.json())
        .then((data) =>{
            localStorage.setItem('price', data.bpi[currency.toUpperCase()].rate)
            localStorage.setItem('currency', currency)
            localStorage.setItem('fetchedCurrency', currency)
            setPrice(data.bpi[currency.toUpperCase()].rate)
            setFetchedCurrency(currency)
        })
    console.log("Price updated")
    setUpdatePrice(false)
    setUpdateCurrency(false)
}

function CurrencySelector({ currency, onCurrencyChange }) {
    return(
        <select value={currency} className='drop-down' onChange={onCurrencyChange}>
            <option value="aud">AUD</option>
            <option value="usd">USD</option>
            <option value="eur">EUR</option>
        </select>
    )
}

function PriceDisplay({ price, currency }) {
    return(
        <p>The current price is: {price + ` ${currency.toUpperCase()}`}</p>
    )
}

function UpdateButton({ onUpdatePrice }) {
    return(
        <button onClick={onUpdatePrice}>
            Update Price
        </button>
    )
}

function BitcoinIndexV2() {
    let [price, setPrice] = useState(localStorage.getItem('price') || 0) // the price of bitcoin fetched from the API
    let [updatePrice, setUpdatePrice] = useState(true) // whether to update the price
    let [currency, setCurrency] = useState(localStorage.getItem('currency') || 'aud') // the currency selected
	let [fetchedCurrency, setFetchedCurrency] = useState(localStorage.getItem('fetchedCurrency') || 'aud') // used to display the currency when the price is fetched
    let [updateCurrency, setUpdateCurrency] = useState(false) // used to trigger useEffect when a new currency is selected

    useEffect(() => {
        FetchPrice(currency, setPrice, updatePrice, updateCurrency, setUpdatePrice, setUpdateCurrency, setFetchedCurrency)
    }, [updatePrice, updateCurrency, currency])

    const handleCurrencyChange = (e) => {
        setCurrency(e.target.value)
        setUpdateCurrency((prevState) => !prevState)
    }

    return(
        <>
            <CurrencySelector currency={currency} onCurrencyChange={handleCurrencyChange} />
            <PriceDisplay price={price} currency={fetchedCurrency}/>
            <UpdateButton onUpdatePrice={() => setUpdatePrice((prevState) => !prevState)}/>
        </>
    )
}

export default BitcoinIndexV2