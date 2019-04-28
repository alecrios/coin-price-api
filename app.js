const express = require('express');
const apicache = require('apicache');
const to = require('await-to-js').default;
const CoinGecko = require('coingecko-api');

const app = express();
const port = 3000;
const cache = apicache.options({
	defaultDuration: '1 minute',
	statusCodes: { include: [200] },
}).middleware;
const coinGecko = new CoinGecko();
const coin = 'nano';

app.use(cache());

app.get('/price', async (req, res) => {
	const [error, response] = await to(coinGecko.coins.fetch(coin));

	if (!response || !response.success) {
		res.status(500).end();
		return;
	}

	res.send(response.data.market_data.current_price);
});

app.listen(port, () => console.log(`Listening on port ${port}.`));
