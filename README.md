# Coin Price API

Simple example of a Node.js server which fetches cryptocurrency price data from the [CoinGecko API](https://www.coingecko.com/api/documentations/v3). Response is cached for one minute in order to prevent rate limit overages.

## Endpoints

### `/price`

Fetches the price of the coin in all available currencies.
