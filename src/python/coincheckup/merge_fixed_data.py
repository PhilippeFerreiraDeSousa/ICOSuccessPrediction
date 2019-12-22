import csv

num_fields = ['MC #', 'Price', 'BTC', '1h', '24h', '7d', '14d', '30d', '45d', '90d', '200d', 'Mkt. Cap', 'MCAP BTC', '24h Vol', '24h Vol BTC', 'Circ. Supply', 'Total Supply', 'Max. Supply', 'Team', 'Advisors', 'Brand/Buzz', 'Product', 'Coin', 'Social', 'Communication', 'Business', 'GitHub', 'Avg. volume', 'Age (mo)', 'Winning months']

with open("fixed_data/coincheckup_10_months_fa.csv", 'r', newline='') as old_fa, open("fixed_data/coincheckup_10_months_fa.csv", 'r', newline='') as old_ia:
    fa_reader = csv.DictReader(old_fa, delimiter=',')
    ia_reader = csv.DictReader(old_ia, delimiter=',')

    fields = set(fa_reader.fieldnames).union(set(ia_reader.fieldnames))
    #data = pd.DataFrame({field: [] for field in fields})
    data = {row["Name"]: row  for row in fa_reader}
    for row in ia_reader:
        for key, value in row.items():
            data[row["Name"]][key] = value

    for name, row in data.items():
        for field in num_fields:
            if row[field] in {'--', '---', '', 'N/A'}:
                row[field] = ''
            else:
                row[field] = float(row[field].strip("$% ").replace(',', '').replace(' ', '').replace('K', '000').replace('MM', '000000').replace('Bn', '000000000').replace('Tn', '000000000000'))

with open("merged_10months_data.csv", 'w', newline='') as output:
    writer = csv.DictWriter(output, delimiter=',', fieldnames=fields)
    writer.writeheader()
    for row in data.values():
        writer.writerow(row)