# URL = "https://web.archive.org/web/20190208144932/https://coincheckup.com/predictions"

import re
from bs4 import BeautifulSoup
import csv


datas = []
for tab_idx in range(1, 22):
    with open(f"html/20190208/predictions/Predictions Overview - CoinCheckup{tab_idx}.html") as file:
        soup = BeautifulSoup(file.read(), 'html.parser')

        cryptos = [link.string for link in soup.find_all('a') if link.get("href") and "coins" in link.get("href")]

        divs = [row for row in soup.find_all(attrs={"class": re.compile("ag-row ag-row-no-focus ag-row-\w* ag-row-level-0")}) if
                row.div is not None and row.div.span is None]
        data = [[cryptos[idx]] + [cell.string.strip("$ ").replace(',', '') for cell in div.children] for idx, div in enumerate(divs)]

        datas.append(data)


with open('coincheckup_10_months_predictions.csv', 'w', newline='') as csvfile:
    writer = csv.writer(csvfile, delimiter=',')
    writer.writerow([span.string for span in soup.find_all(role="columnheader")])
    for data in datas:
        for row in data:
            writer.writerow(row)
