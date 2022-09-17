import json
import requests


def lambda_handler(event, context):

    x = requests.get("https://api.exchangerate.host/latest")
    asiaCurrencies = getAsiaCurrenciesList()
    dict = json.loads((x.content).decode('utf-8'))["rates"]
    
    for currency in asiaCurrencies:
        for key in dict.keys():
            if currency["Currency code"] == key:
                currency.update({"rate": dict[key]})
                break

    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,GET'
        },
        'body': json.dumps(asiaCurrencies)
    }

def getAsiaCurrenciesList():
    asiaCurrencies = [
        {"id":  0, "Country/Territory": "Afghanistan", "Currency": "Afghan afghani", "Currency code": "AFN"},
        {"id":  1, "Country/Territory": "Armenia", "Currency": "Armenian dram", "Currency code": "AMD"},
        {"id":  2, "Country/Territory": "Azerbaijan", "Currency": "Azerbaijan manat", "Currency code": "AZN"},
        {"id":  3, "Country/Territory": "Bahrain", "Currency": "Bahraini dinar", "Currency code": "BHD"},
        {"id":  4, "Country/Territory": "Bangladesh", "Currency": "Bangladeshi taka", "Currency code": "BDT"},
        {"id":  5, "Country/Territory": "Bhutan", "Currency": "Bhutanese ngultrum", "Currency code": "BTN"},
        {"id":  6, "Country/Territory": "British Indian Ocean Territory (UK)", "Currency": "United States dollar", "Currency code": "USD"},
        {"id":  7, "Country/Territory": "Brunei", "Currency": "Brunei dollar", "Currency code": "BND"},
        {"id":  8, "Country/Territory": "Cambodia", "Currency": "Cambodian riel", "Currency code": "KHR"},
        {"id":  9, "Country/Territory": "China", "Currency": "Chinese Yuan Renminbi", "Currency code": "CNY"},
        {"id": 10, "Country/Territory": "Christmas Island (Australia)", "Currency": "Australian dollar", "Currency code": "AUD"},
        {"id": 11, "Country/Territory": "Cocos (Keeling) Islands (Australia)", "Currency": "Australian dollar", "Currency code": "AUD"},   
        {"id": 12, "Country/Territory": "Cyprus", "Currency": "European euro", "Currency code": "EUR"},
        {"id": 13, "Country/Territory": "Georgia", "Currency": "Georgian lari", "Currency code": "GEL"},
        {"id": 14, "Country/Territory": "Hong Kong (China)", "Currency": "Hong Kong dollar", "Currency code": "HKD"},
        {"id": 15, "Country/Territory": "India", "Currency": "Indian rupee", "Currency code": "INR"},
        {"id": 16, "Country/Territory": "Indonesia", "Currency": "Indonesian rupiah", "Currency code": "IDR"},
        {"id": 17, "Country/Territory": "Iran", "Currency": "Iranian rial", "Currency code": "IRR"},
        {"id": 18, "Country/Territory": "Iraq", "Currency": "Iraqi dinar", "Currency code": "IQD"},
        {"id": 19, "Country/Territory": "Israel", "Currency": "Israeli new shekel", "Currency code": "ILS"},
        {"id": 20, "Country/Territory": "Japan", "Currency": "Japanese yen", "Currency code": "JPY"},
        {"id": 21, "Country/Territory": "Jordan", "Currency": "Jordanian dinar", "Currency code": "JOD"},
        {"id": 22, "Country/Territory": "Kazakhstan", "Currency": "Kazakhstani tenge", "Currency code": "KZT"},
        {"id": 23, "Country/Territory": "Kuwait", "Currency": "Kuwaiti dinar", "Currency code": "KWD"},
        {"id": 24, "Country/Territory": "Kyrgyzstan", "Currency": "Kyrgyzstani som", "Currency code": "KGS"},
        {"id": 25, "Country/Territory": "Laos", "Currency": "Lao kip", "Currency code": "LAK"},
        {"id": 26, "Country/Territory": "Lebanon", "Currency": "Lebanese pound", "Currency code": "LBP"},
        {"id": 27, "Country/Territory": "Macau (China)", "Currency": "Macanese pataca", "Currency code": "MOP"},
        {"id": 28, "Country/Territory": "Malaysia", "Currency": "Malaysian ringgit", "Currency code": "MYR"},
        {"id": 29, "Country/Territory": "Maldives", "Currency": "Maldivian rufiyaa", "Currency code": "MVR"},
        {"id": 30, "Country/Territory": "Mongolia", "Currency": "Mongolian tugrik", "Currency code": "MNT"},
        {"id": 31, "Country/Territory": "Myanmar", "Currency": "Myanmar kyat", "Currency code": "MMK"},
        {"id": 32, "Country/Territory": "Nepal", "Currency": "Nepalese rupee", "Currency code": "NPR"},
        {"id": 33, "Country/Territory": "North Korea", "Currency": "North Korean won", "Currency code": "KPW"},
        {"id": 34, "Country/Territory": "Oman", "Currency": "Omani rial", "Currency code": "OMR"},
        {"id": 35, "Country/Territory": "Pakistan", "Currency": "Pakistani rupee", "Currency code": "PKR"},
        {"id": 36, "Country/Territory": "Palestine", "Currency": "Israeli new shekel", "Currency code": "ILS"},
        {"id": 37, "Country/Territory": "Philippines", "Currency": "Philippine peso", "Currency code": "PHP"},
        {"id": 38, "Country/Territory": "Qatar", "Currency": "Qatari riyal", "Currency code": "QAR"},
        {"id": 39, "Country/Territory": "Russia", "Currency": "Russian ruble", "Currency code": "RUB"},
        {"id": 40, "Country/Territory": "Saudi Arabia", "Currency": "Saudi Arabian riyal", "Currency code": "SAR"},
        {"id": 41, "Country/Territory": "Singapore", "Currency": "Singapore dollar", "Currency code": "SGD"},
        {"id": 42, "Country/Territory": "South Korea", "Currency": "South Korean won", "Currency code": "KRW"},
        {"id": 43, "Country/Territory": "Sri Lanka", "Currency": "Sri Lankan rupee", "Currency code": "LKR"},
        {"id": 44, "Country/Territory": "Syria", "Currency": "Syrian pound", "Currency code": "SYP"},
        {"id": 45, "Country/Territory": "Taiwan", "Currency": "New Taiwan dollar", "Currency code": "TWD"},
        {"id": 46, "Country/Territory": "Tajikistan", "Currency": "Tajikistani somoni", "Currency code": "TJS"},
        {"id": 47, "Country/Territory": "Thailand", "Currency": "Thai baht", "Currency code": "THB"},
        {"id": 48, "Country/Territory": "Timor-Leste", "Currency": "United States dollar", "Currency code": "USD"},
        {"id": 49, "Country/Territory": "Turkey", "Currency": "Turkish lira", "Currency code": "TRY"},
        {"id": 50, "Country/Territory": "Turkmenistan", "Currency": "Turkmen manat", "Currency code": "TMT"},
        {"id": 51, "Country/Territory": "United Arab Emirates", "Currency": "UAE dirham", "Currency code": "AED"},
        {"id": 52, "Country/Territory": "Uzbekistan", "Currency": "Uzbekistani som", "Currency code": "UZS"},
        {"id": 53, "Country/Territory": "Vietnam", "Currency": "Vietnamese dong", "Currency code": "VND"},
        {"id": 54, "Country/Territory": "Yemen", "Currency": "Yemeni rial", "Currency code": "YER"}]
    return asiaCurrencies
