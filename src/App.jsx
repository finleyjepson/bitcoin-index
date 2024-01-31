import "./App.css"
import BitcoinIndex from "./components/BitcoinIndex"
import Bitcoin from "./assets/bitcoin-btc-logo.png"

function App() {
    return (
        <>
            <div className='heading'>
                <img src={Bitcoin} alt='Bitcoin Logo' className='logo' />
                <h1>Bitcoin Price</h1>
            </div>
            <BitcoinIndex />
        </>
    )
}

export default App
