const express = require('express');
const apicache = require('apicache');
const to = require('await-to-js').default;
const CoinGecko = require('coingecko-api');

const app = express();
const port = 3000;
const coinGecko = new CoinGecko();

const cacheOptions = {
	defaultDuration: '1 minute',
	statusCodes: {
		include: [200],
	},
};

const cache = apicache.options(cacheOptions).middleware;

app.use(cache());

app.get('/market/:coin', async (req, res) => {
	const [error, response] = await to(coinGecko.coins.fetch(req.params.coin));
	if (!response || !response.success) throw Error(error);

	res.send({
		price: response.data.market_data.current_price.usd,
		marketCap: response.data.market_data.market_cap.usd,
		supply: response.data.market_data.circulating_supply,
	});
});

app.listen(port, () => console.log(`Listening on port ${port}`));
