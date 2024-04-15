/* eslint-disable react/prop-types */
export default function CurrencyInput({
  value,
  onChange,
  currencies,
  selectedCurrency,
  onSelectCurrency,
  readOnly,
}) {
  return (
    <div className="input-group mb-3">
      <input
        type="number"
        className="form-control"
        value={value}
        onChange={onChange}
        readOnly={readOnly}
      />
      <select
        className="form-select"
        value={selectedCurrency}
        onChange={onSelectCurrency}
      >
        {currencies.map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>
    </div>
  );
}
