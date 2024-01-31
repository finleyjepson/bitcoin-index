import { useState, useEffect } from "react"

function BitcoinIndex() {
    let [price, setPrice] = useState(localStorage.getItem('price') || 0) // the price of bitcoin fetched from the API
    let [updatePrice, setUpdatePrice] = useState(true) // whether to update the price
    let [currency, setCurrency] = useState(localStorage.getItem('currency') || 'aud') // the currency selected
	let [fetchedCurrency, setFetchedCurrency] = useState(localStorage.getItem('fetchedCurrency') || 'aud') // used to display the currency when the price is fetched
    let [updateCurrency, setUpdateCurrency] = useState(false) // used to trigger useEffect when a new currency is selected

    useEffect(() => {
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
    }, [updatePrice, updateCurrency, currency])

    const handleCurrencyChange = (e) => {
        setCurrency(e.target.value)
        setUpdateCurrency((prevState) => !prevState)
    }

    return (
        <>
            <select value={localStorage.getItem('currency') || 'aud'} className="drop-down" onChange={handleCurrencyChange}>
                <option value='aud'>AUD</option>
                <option value='usd'>USD</option>
                <option value='eur'>EUR</option>
            </select>
            <p>Current Price: {price + ` ${fetchedCurrency.toUpperCase()}`}</p>
            <button onClick={() => setUpdatePrice((prevState) => !prevState)}>
                Update Price
            </button>
        </>
    )
}

export default BitcoinIndex