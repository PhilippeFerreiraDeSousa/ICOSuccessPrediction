# URL = "https://web.archive.org/web/20190208144932/https://coincheckup.com/analysis"

import re
from bs4 import BeautifulSoup
import csv


def current():
    datas = []
    for tab_idx in range(1, 25):
        with open(f"html/20191205/investment_analysis/Investment Overview - CoinCheckup{tab_idx}.html") as file:
            soup = BeautifulSoup(file.read(), 'html.parser')

            cryptos = [link.string for link in soup.find_all('a') if link.get("href") and "coins" in link.get("href")]

            divs = [row for row in soup.find_all(attrs={"class": re.compile("ag-row ag-row-no-focus ag-row-\w* ag-row-level-0")}) if
                    row.div is not None and row.contents[1].img is None]

            data = [[cryptos[idx]] + [cell.string.strip("$% ").replace(',', '') for cell in div.children] for idx, div in enumerate(divs)]
            datas.append(data)

            print(tab_idx)

    with open('coincheckup_current_ia.csv', 'w', newline='') as csvfile:
        writer = csv.writer(csvfile, delimiter=',')
        writer.writerow([span.string for span in soup.find_all(role="columnheader")[1:] if span.string is not None])
        for data in datas:
            for row in data:
                writer.writerow(row)


def ten_months():
    datas = []
    for tab_idx in range(1, 22):    # First page is missing and 2nd / 6th page contain no data (n/A everywhere)
        with open(f"html/20190208/investment_analysis/Investment Overview - CoinCheckup{tab_idx}.html") as file:
            soup = BeautifulSoup(file.read(), 'html.parser')

            cryptos = [link.string for link in soup.find_all('a') if link.get("href") and "coins" in link.get("href")]

            divs = [row for row in
                    soup.find_all(attrs={"class": re.compile("ag-row ag-row-no-focus ag-row-\w* ag-row-level-0")}) if
                    row.div is not None and row.contents[1].img is None]
            if len(cryptos) == 0:
                print("WARNING: File of idx {} is ignored because it contains no data".format(tab_idx))
                continue
            data = [[cryptos[idx]] + [cell.string.strip("$% ").replace(',', '') for cell in div.children] for idx, div in enumerate(divs)]

            datas.append(data)

    with open('coincheckup_10_months_ia.csv', 'w', newline='') as csvfile:
        writer = csv.writer(csvfile, delimiter=',')
        writer.writerow([span.string for span in soup.find_all(role="columnheader")[1:] if span.string is not None])
        for data in datas:
            for row in data:
                writer.writerow(row)
current()
ten_months()
