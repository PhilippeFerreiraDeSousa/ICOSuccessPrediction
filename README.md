# ICOSuccessPrediction
Fall 2019 UC Berkeley IEOR242 Data Science project: Prediction of coin success

### References:
* Predicting ICO returns with machine learning: https://medium.com/@MLJARofficial/predicting-ico-returns-with-machine-learning-af6108ab9e39
* ICO listing: https://icodrops.com/
* ICO Bench rating platform API: https://icobench.com/developers
* Binance recent listings: https://www.binance.com/en/support/sections/115000106672
* Binance IEO listing: https://coincodex.com/ieo-list/binance/
* Binance launchpad: https://launchpad.binance.com/
Binance Launchpad is an exclusive token launch platform of Binance that helps transformative blockchain startups
raise funds to develop products that wants to drive cryptocurrency adoption

### Challenge:

1. Get historical data on coin quotes for free:
* Scrap daily OHLC on https://coinmarketcap.com/currencies/{coin}/historical-data/?start={start_date}&end={end_date}
Example: https://coinmarketcap.com/currencies/bitcoin/historical-data/?start=20181021&end=20191121
* Daily detailed infos on coins (from 2009 to 2019 for Bitcoin): https://coinmetrics.io/data-downloads/
* Free full daily and hourly historical data: https://min-api.cryptocompare.com/pricing
2. Discuss the criteria defining the success of a coin:
* Post ICO price multiplied by 100 in 1 year (x3,000 for ethereum)
* Coin listed on a major spot exchange: Binance / Poloniex / Kraken
3. Check that coin listing makes the price jump
4. Establish a strategy of investment on altcoins