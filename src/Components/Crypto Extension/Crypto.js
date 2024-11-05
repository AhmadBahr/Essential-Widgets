import { useState } from "react";
import './Crypto.css';

const baseUrl = "https://api.coingecko.com/api/v3/simple/price";
const currencies = ["USD", "EUR", "GBP"];
const coins = [
    { id: "bitcoin", symbol: "BTC" },
    { id: "ethereum", symbol: "ETH" },
    { id: "litecoin", symbol: "LTC" }
];

const Crypto = () => {
    const [choosedCoin, setChoosedCoin] = useState('bitcoin');
    const [currency, setCurrency] = useState('USD');
    const [coinValue, setCoinValue] = useState('');
    const [loadingCoinValue, setLoadingCoinValue] = useState(false);
    const [coinSearchFailed, setCoinSearchFailed] = useState(false);

    const showCoinValue = () => {
        setLoadingCoinValue(true);
        setCoinSearchFailed(false); 
        fetch(`${baseUrl}?ids=${choosedCoin}&vs_currencies=${currency.toLowerCase()}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error("Network response was not ok");
                }
                return res.json();
            })
            .then(data => {
                const value = data[choosedCoin][currency.toLowerCase()];
                setCoinValue(Math.round(value)); 
                setLoadingCoinValue(false);
            })
            .catch(err => {
                console.error(err);
                setCoinSearchFailed(true);
                setCoinValue('');
                setLoadingCoinValue(false);
            });
    };

    return (
        <div className="crypto-card">
            <h3 className="crypto-heading">Crypto Rates</h3>
            <div className="selections">
                {coins.map(coin => (
                    <input
                        type="button"
                        style={{ background: coin.id === 'bitcoin' ? '#f7931a' : coin.id === 'ethereum' ? '#8c8c8c' : '#345d9d' }}
                        className="btn-input btn-coin"
                        key={coin.id}
                        value={coin.symbol}
                        onClick={() => {
                            setCoinValue('');
                            setChoosedCoin(coin.id);
                            showCoinValue(); 
                        }}
                    />
                ))}
                <br />
                {currencies.map(curr => (
                    <input
                        type="button"
                        className="btn-input btn-currency"
                        key={curr}
                        value={curr}
                        onClick={() => {
                            setCoinValue(''); 
                            setCurrency(curr);
                            showCoinValue();
                        }}
                    />
                ))}
            </div>
            <div>
                <span className="btn-fetch" onClick={showCoinValue}>Fetch</span>
            </div>
            {coinSearchFailed && <p className="search-failed">We couldn't find data. Please try again!</p>}
            <div className="coin-rate">
                <img className="coin-logo" src={`../images/${choosedCoin}.svg`} alt="Coin logo" />
                <span>&nbsp;{choosedCoin}</span>
                <span>&nbsp;=&nbsp;
                    {currency === 'GBP' ? '£' : currency === 'EUR' ? '€' : '$'}
                    {loadingCoinValue ? <span>...</span> : <span>{coinValue}</span>}
                </span>
            </div>
        </div>
    );
}

export default Crypto;
