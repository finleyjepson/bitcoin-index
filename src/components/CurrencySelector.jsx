function CurrencySelector({ currency, onCurrencyChange}) {
    return (
        <select value={currency} className='drop-down' onChange={onCurrencyChange}>
            <option value='aud'>AUD</option>
            <option value='usd'>USD</option>
            <option value='eur'>EUR</option>
        </select>
    )
}

export default CurrencySelector