#!/usr/bin/env python

import csv
import os
import sys

import pdfplumber


def convert(file):
    inFile = file + ".pdf"
    outFile = file + ".csv"
    print(file, "\n", inFile, "\n", outFile)
    firstWrite = not os.path.exists(outFile)
    headers = ["date", "code", "amount", "detail"]
    with pdfplumber.open(inFile) as pdf:
        totalPages = len(pdf.pages)
        print("Total pages: ", totalPages)
        with open(outFile, "a", newline="", encoding="utf-8") as csvfile:
            writer = csv.writer(csvfile)
            if firstWrite:
                writer.writerow(headers)
            for i in range(0, totalPages, 1):
                page = pdf.pages[i]
                tables = page.extract_tables()
                for table in tables:
                    for row in table[1:]:
                        dates, codes, amounts, details = [], [], [], []
                        print(row)
                        # for j, cell in enumerate(row):
                        #     print(j, ": ", cell)
                        #     if cell is not None:
                        #         lines = cell.split("\n")
                        #         if j == 0:
                        #             dates.extend(lines[::2])
                        #             codes.extend(lines[1::2])
                        #         elif j == 2:
                        #             amounts.extend(lines)
                        #         elif j == 4:
                        #             details.extend(lines)
                        # for date, code, amount, detail in zip(
                        #     dates, codes, amounts, details
                        # ):
                        #     writer.writerow([date, code, amount, detail])


convert(sys.argv[1])
