import csv

with open("merged_10months_data.csv", 'r', newline='') as old, open("fixed_data/coincheckup_current_fa.csv", 'r', newline='') as label, open("dataset.csv", 'w', newline='') as output:
    reader_old = csv.DictReader(old, delimiter=',')
    reader_label = csv.DictReader(label, delimiter=',')

    data = {row["Name"]: row for row in reader_old}

    for row in reader_label:
        if row["Name"] not in data:
            continue

        data[row["Name"]]["Price"] = float(data[row["Name"]]["Price"])
        data[row["Name"]]["Mkt. Cap"] = float(data[row["Name"]]["Mkt. Cap"])# VeThor Token Market cap is always 0 the growth rate crashed
        data[row["Name"]]["label_Price"] = float(row["Price"].replace(',', ''))
        data[row["Name"]]["label_Mkt. Cap"] = float(row["Mkt. Cap"].replace(',', '').replace(' ', '').replace('K', '000').replace('MM', '000000').replace('Bn', '000000000').replace('Tn', '000000000000'))
        data[row["Name"]]["label_growth_rate_Price"] = (data[row["Name"]]["label_Price"] - data[row["Name"]]["Price"])/data[row["Name"]]["Price"]
        data[row["Name"]]["label_growth_rate_Mkt. Cap"] = 1 if data[row["Name"]]["Mkt. Cap"] == 0 else (data[row["Name"]]["label_Mkt. Cap"] - data[row["Name"]]["Mkt. Cap"])/data[row["Name"]]["Mkt. Cap"]  # VeThor Token's Market cap so the growth rate is 1
        data[row["Name"]]["label_disappeared"] = "FALSE"

    for row in data.values():
        if "label_Price" not in row:
            row["label_Price"] = row["label_Mkt. Cap"] = row["label_growth_rate_Price"] = row["label_growth_rate_Mkt. Cap"] = ""
            row["label_disappeared"] = "TRUE"


    writer = csv.DictWriter(output, delimiter=',', fieldnames=reader_label.fieldnames + ["label_Price", "label_Mkt. Cap", "label_growth_rate_Price", "label_growth_rate_Mkt. Cap", "label_disappeared"])
    writer.writeheader()
    for row in data.values():
        writer.writerow(row)