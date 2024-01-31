import "./App.css"
// import BitcoinIndex from "./BitcoinIndex"
import BitcoinIndexV2 from "./BitcoinIndexV2.jsx"
import Bitcoin from "./assets/bitcoin-btc-logo.png"

function App() {
    return (
        <>
            <div className='heading'>
                <img src={Bitcoin} alt='Bitcoin Logo' className='logo' />
                <h1>Bitcoin Price</h1>
            </div>
            <BitcoinIndexV2 />
        </>
    )
}

export default App
