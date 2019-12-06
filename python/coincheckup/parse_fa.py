# URL = "https://web.archive.org/web/20190208144932/https://coincheckup.com/analysis"

import re
from bs4 import BeautifulSoup
import csv


def current():
    datas = []
    for tab_idx in range(1, 20):
        with open(f"html/20191205/fundamental_analysis/FA_Page{tab_idx}.htm") as file:
            soup = BeautifulSoup(file.read(), 'html.parser')

            cryptos = [link.string for link in soup.find_all('a') if link.get("href") and "coins" in link.get("href")]

            divs = [row for row in soup.find_all(attrs={"class": re.compile("ag-row ag-row-no-focus ag-row-\w* ag-row-level-0")}) if
                    row.div is not None and row.contents[1].img is None]
            data = [[cryptos[idx]] + [div.contents[i].string if div.contents[i].div is None else div.contents[i].div.string for i in range(len(div.contents)-1) if i != 1] for idx, div in enumerate(divs)]

            for d in data:
                for i in range(len(d)):
                    if d[i] is not None:  # Some 200d values are None
                        d[i] = d[i].strip("$% ")    # MM and K units should be handled here
            datas.append(data)


    with open('coincheckup_current_fa.csv', 'w', newline='') as csvfile:
        writer = csv.writer(csvfile, delimiter=',')
        writer.writerow([span.string for span in soup.find_all(role="columnheader")[1:-1] if span.string is not None])
        # ['Name', 'MC #', 'Symbol', 'Price', 'BTC', '1h', '24h', '7d', '14d', '30d', '45d', '90d', '200d', 'Mkt. Cap', 'MCAP BTC']
        for data in datas:
            for row in data:
                writer.writerow(row)


def ten_months():
    datas = []
    for tab_idx in range(1, 19):
        with open(f"html/20190208/fundamental_analysis/Analysis Overview - CoinCheckup{tab_idx}.html") as file:
            soup = BeautifulSoup(file.read(), 'html.parser')

            cryptos = [link.string for link in soup.find_all('a') if link.get("href") and "coins" in link.get("href")]

            divs = [row for row in
                    soup.find_all(attrs={"class": re.compile("ag-row ag-row-no-focus ag-row-\w* ag-row-level-0")}) if
                    row.div is not None and row.contents[1].img is None]
            data = [
                [cryptos[idx]] + [div.contents[i].string if div.contents[i].div is None else div.contents[i].div.string
                                  for i in range(len(div.contents) - 2)] for idx, div in enumerate(divs)]

            for d in data:
                for i in range(len(d)):
                    if d[i] is not None:  # Some 200d values are None
                        d[i] = d[i].strip("$% ")
            datas.append(data)

    with open('coincheckup_10_months_fa.csv', 'w', newline='') as csvfile:
        writer = csv.writer(csvfile, delimiter=',')
        writer.writerow([span.string for span in soup.find_all(role="columnheader")[1:-1] if span.string is not None])
        for data in datas:
            for row in data:
                writer.writerow(row)

current()
ten_months()