EXCHANGE_URL = "https://min-api.cryptocompare.com/data/v4/all/exchanges"

import requests
import pickle

exchanges = requests.get(EXCHANGE_URL).json()['Data']['exchanges']
#incomplete_data_exchanges = [exchange for exchange, details in exchanges.items() if 'isTopTier' not in details.keys()]
#print("- Incomplete data exchanges:", incomplete_data_exchanges)
#for exchange in incomplete_data_exchanges:
#    exchanges.pop(exchange)
exchanges['coinfield']['isTopTier'] = False
exchanges['deribit']['isActive'] = True
exchanges['deribit']['isTopTier'] = True

inactive_top_tier_exchanges = {exchange: details for exchange, details in exchanges.items() if not details['isActive'] and details['isTopTier']}
assert not inactive_top_tier_exchanges, "Inactive top-tier excahnges: "+ str(list(inactive_top_tier_exchanges.keys()))

exchanges = dict(
    inactive = {exchange: details['pairs'] for exchange, details in exchanges.items() if not details['isActive'] and not details['isTopTier']},
    top_tier = {exchange: details['pairs'] for exchange, details in exchanges.items() if details['isActive'] and details['isTopTier']},
    secondary = {exchange: details['pairs'] for exchange, details in exchanges.items() if details['isActive'] and not details['isTopTier']}
)

for type, exch in exchanges.items():
    print("-", type, ":")
    print("Count:", len(exch.keys()))
    print("List:", list(exch.keys()))

# - inactive :
# Count: 74
# List: ['Abucoins', 'BTC38', 'BTCChina', 'BTCE', 'BTCXIndia', 'BTER', 'BitFlip', 'BitGrail', 'BitMarket', 'Bitinfi', 'Bitpoint', 'Bitsane', 'Bitshares', 'Bluebelt', 'CCEDK', 'CCEX', 'CHBTC', 'CoinPulse', 'CoinTiger', 'Coincap', 'Coinnest', 'Coinroom', 'CoinsBank', 'Coinse', 'Coinsetter', 'Cryptagio', 'CryptoBulls', 'CryptoX', 'Cryptonit', 'Cryptopia', 'Cryptsy', 'DEx', 'EtherDelta', 'Ethermium', 'EthexIndia', 'Foxbit', 'Gatecoin', 'Gnosis', 'Huobi', 'Incorex', 'Ironex', 'Jubi', 'LAToken', 'Liqui', 'MonetaGo', 'MtGox', 'Novaexchange', 'Ore', 'Qryptos', 'QuadrigaCX', 'Quoine', 'Remitano', 'Simex', 'StocksExchangeio', 'Surbitcoin', 'TDAX', 'TuxExchange', 'Unocoin', 'Velox', 'ViaBTC', 'WEX', 'WavesDEX', 'WorldCryptoCap', 'XS2', 'Yacuna', 'Yunbi', 'Zecoex', 'altilly', 'btcXchange', 'bybit', 'iCoinbay', 'oex', 'onederx', 'zloadr']
# - top_tier :
# Count: 25
# List: ['Binance', 'BitBank', 'BitTrex', 'Bitfinex', 'Bithumb', 'Bitstamp', 'Cexio', 'Coinbase', 'Coincheck', 'Gemini', 'HuobiPro', 'IndependentReserve', 'Korbit', 'Kraken', 'Liquid', 'OKCoin', 'OKEX', 'Poloniex', 'Upbit', 'Zaif', 'bitFlyer', 'bitflyereu', 'bitflyerus', 'deribit', 'itBit']
# - secondary :
# Count: 160
# List: ['ABCC', 'ACX', 'AidosMarket', 'BCEX', 'BTCAlpha', 'BTCBOX', 'BTCExchange', 'BTCMarkets', 'BTCTurk', 'BXinth', 'Bgogo', 'Bibox', 'BigONE', 'Binanceje', 'Bit2C', 'BitBay', 'BitMart', 'BitSquare', 'BitZ', 'BitexBook', 'Bitforex', 'Bitkub', 'Bitlish', 'Bitmex', 'Bitso', 'Blackturtle', 'Bleutrade', 'Braziliex', 'Buda', 'CBX', 'CCCAGG', 'Catex', 'ChileBit', 'Codex', 'CoinBene', 'CoinCorner', 'CoinDeal', 'CoinEx', 'CoinFalcon', 'CoinHub', 'CoinJar', 'Coinfloor', 'Coinmate', 'Coinone', 'Coinsbit', 'CryptoCarbon', 'CryptoExchangeWS', 'DDEX', 'DSX', 'DigiFinex', 'EXRATES', 'EXX', 'Ethfinex', 'Everbloom', 'Exenium', 'Exmo', 'ExtStock', 'FCCE', 'FCoin', 'Gateio', 'Globitex', 'Gneiss', 'Graviex', 'HADAX', 'Hikenex', 'HitBTC', 'IDAX', 'IDEX', 'IQFinex', 'InstantBitex', 'Kucoin', 'Kuna', 'LBank', 'LakeBTC', 'Liqnet', 'LiveCoin', 'LocalBitcoins', 'Luno', 'Lykke', 'MercadoBitcoin', 'Minebit', 'NDAX', 'Nebula', 'Neraex', 'Nexchange', 'Nlexch', 'Nuex', 'OpenLedger', 'P2PB2B', 'Paymium', 'RightBTC', 'SafeCoin', 'SingularityX', 'StocksExchange', 'Switcheo', 'TheRockTrading', 'Threexbit', 'Tidex', 'TokenStore', 'Tokenomy', 'TradeSatoshi', 'TrustDEX', 'VBTC', 'Vaultoro', 'Yobit', 'ZB', 'ZBG', 'aliexchange', 'alphaex', 'ataix', 'bhex', 'biki', 'bilaxy', 'binanceus', 'bingcoins', 'bitFlyerFX', 'bitasset', 'bitci', 'bitmax', 'bitspark', 'bkex', 'bw', 'chainrift', 'chainx', 'chaoex', 'cobinhood', 'coinall', 'coineal', 'coinegg', 'coinfield', 'coinsuper', 'coinzest', 'coss', 'crex24', 'cryptofacilities', 'darbfinance', 'dcoin', 'decoin', 'e55com', 'eidoo', 'erisx', 'exscudo', 'fatbtc', 'gopax', 'hbus', 'huobijapan', 'huobikorea', 'idevex', 'primexbt', 'raidofinance', 'seedcx', 'sistemkoin', 'smartrade', 'tchapp', 'thore', 'tokok', 'trxmarket', 'unnamed', 'xcoex', 'xena']

with open("exchanges.pkl", "wb") as file:
    pickle.dump(exchanges, file)
