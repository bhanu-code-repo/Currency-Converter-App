import CurrencyConverter from "./components/CurrencyConverter";

function App() {
  return (
    <div className="App">
      <div className="card shadow p-3 mb-5 bg-warning rounded border-4">
        <div className="card-body text-dark">
          <h1 className="card-title">Currency Converter</h1>
          <CurrencyConverter />
        </div>
        <div className="text-center mt-3">
          <p>&copy; 2024 BPST Works. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}

export default App;
