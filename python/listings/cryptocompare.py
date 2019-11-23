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

with open("exchanges.pkl", "wb") as file:
    pickle.dump(exchanges, file)
