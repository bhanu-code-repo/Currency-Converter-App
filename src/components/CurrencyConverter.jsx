import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import CurrencyInput from "./CurrencyInput";
import Button from "./Button";

export default function CurrencyConverter() {
  const [amount, setAmount] = useState(0);
  const [baseCurrency, setBaseCurrency] = useState("GBP");
  const [targetCurrency, setTargetCurrency] = useState("INR");
  const [convertedAmount, setConvertedAmount] = useState(0);

  const currencies = [
    "AED",
    "AFN",
    "ALL",
    "AMD",
    "ANG",
    "AOA",
    "ARS",
    "AUD",
    "AWG",
    "AZN",
    "BAM",
    "BBD",
    "BDT",
    "BGN",
    "BHD",
    "BIF",
    "BMD",
    "BND",
    "BOB",
    "BRL",
    "BSD",
    "BTN",
    "BWP",
    "BYN",
    "BZD",
    "CAD",
    "CDF",
    "CHF",
    "CLP",
    "CNY",
    "COP",
    "CRC",
    "CUP",
    "CVE",
    "CZK",
    "DJF",
    "DKK",
    "DOP",
    "DZD",
    "EGP",
    "ERN",
    "ETB",
    "EUR",
    "FJD",
    "FKP",
    "FOK",
    "GBP",
    "GEL",
    "GGP",
    "GHS",
    "GIP",
    "GMD",
    "GNF",
    "GTQ",
    "GYD",
    "HKD",
    "HNL",
    "HRK",
    "HTG",
    "HUF",
    "IDR",
    "ILS",
    "IMP",
    "INR",
    "IQD",
    "IRR",
    "ISK",
    "JEP",
    "JMD",
    "JOD",
    "JPY",
    "KES",
    "KGS",
    "KHR",
    "KID",
    "KMF",
    "KRW",
    "KWD",
    "KYD",
    "KZT",
    "LAK",
    "LBP",
    "LKR",
    "LRD",
    "LSL",
    "LYD",
    "MAD",
    "MDL",
    "MGA",
    "MKD",
    "MMK",
    "MNT",
    "MOP",
    "MRU",
    "MUR",
    "MVR",
    "MWK",
    "MXN",
    "MYR",
    "MZN",
    "NAD",
    "NGN",
    "NIO",
    "NOK",
    "NPR",
    "NZD",
    "OMR",
    "PAB",
    "PEN",
    "PGK",
    "PHP",
    "PKR",
    "PLN",
    "PYG",
    "QAR",
    "RON",
    "RSD",
    "RUB",
    "RWF",
    "SAR",
    "SBD",
    "SCR",
    "SDG",
    "SEK",
    "SGD",
    "SHP",
    "SLL",
    "SOS",
    "SRD",
    "SSP",
    "STN",
    "SYP",
    "SZL",
    "THB",
    "TJS",
    "TMT",
    "TND",
    "TOP",
    "TRY",
    "TTD",
    "TVD",
    "TWD",
    "TZS",
    "UAH",
    "UGX",
    "USD",
    "UYU",
    "UZS",
    "VES",
    "VND",
    "VUV",
    "WST",
    "XAF",
    "XCD",
    "XDR",
    "XOF",
    "XPF",
    "YER",
    "ZAR",
    "ZMW",
    "ZWD",
  ];

  function handleAmountChange(e) {
    const amount = parseFloat(e.target.value);
    if (!isNaN(amount)) setAmount(amount);
  }

  useEffect(
    function () {
      // Create a controller for the fetch request
      const controller = new AbortController();

      async function convertCurrency() {
        const response = await fetch(
          `https://api.frankfurter.app/latest?amount=${amount}&from=${baseCurrency}&to=${targetCurrency}`,
          {
            signal: controller.signal,
          }
        );
        const data = await response.json();
        setConvertedAmount(data.rates[targetCurrency]);
      }

      // Check if base and target currencies are the same
      if (baseCurrency === targetCurrency) setConvertedAmount(amount);

      // Convert currency if base and target currencies are different
      convertCurrency();

      // Fix race condition
      return function () {
        controller.abort();
      };
    },
    [amount, baseCurrency, targetCurrency]
  );

  function swapCurrencies() {
    setBaseCurrency(targetCurrency);
    setTargetCurrency(baseCurrency);
  }

  return (
    <div className="currency-converter shadow p-3 mb-6 bg-warning rounded text-dark border-dark border-2">
      <CurrencyInput
        value={amount}
        onChange={handleAmountChange}
        currencies={currencies}
        selectedCurrency={baseCurrency}
        onSelectCurrency={(e) => setBaseCurrency(e.target.value)}
        readOnly={false}
      />
      <CurrencyInput
        value={convertedAmount}
        onChange={() => {}}
        currencies={currencies}
        selectedCurrency={targetCurrency}
        onSelectCurrency={(e) => setTargetCurrency(e.target.value)}
        readOnly={true}
      />
      <Button btnLabel={"Swap Currencies"} onClick={swapCurrencies} />
    </div>
  );
}
