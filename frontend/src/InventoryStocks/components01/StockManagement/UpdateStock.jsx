import "./../../Styles/StockManagement/UpdateStock.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "./NavBar";
//import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function UpdateStock() {
  const [stockList, setStockList] = useState([]);
  const [selectedStock, setSelectedStock] = useState("");
  const [units, setUnits] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  //const history = useHistory();

  useEffect(() => {
    fetchStockList();
  }, []);

  const fetchStockList = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8090/stock/get_stocklist"
      );
      setStockList(response.data);
    } catch (error) {
      console.error("Error fetching stock list:", error);
    }
  };

  const handleStockChange = (event) => {
    setSelectedStock(event.target.value);
  };

  const handleUnitsChange = (event) => {
    setUnits(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:8090/stock/update", {
        id: selectedStock,
        units: parseInt(units),
      });
      setErrorMessage("");
      fetchStockList(); // Refresh stock list after update
      history.push("/");
    } catch (error) {
      setErrorMessage("Failed to update stock. Please try again.");
      console.error("Error updating stock:", error);
    }
  };
  return (
    <><NavBar></NavBar>
    <div className="update-stock-container">
      <form onSubmit={handleSubmit}>
        <h1
          style={{
            textAlign: "center",
            marginTop: 0,
            fontSize: "3rem",
          }}
        >
          Update Stock
        </h1>

        <label htmlFor="stock">Select RawMateiral:</label>
        <select
          id="stock"
          value={selectedStock}
          onChange={handleStockChange}
          placeholder="Select RawMaterial"
          searchable={true}
          clearable={true}
          style={
            ({ width: "100%" },
            { fontSize: "20px" },
            { backgroundColor: "white" },
            { fontSize: "20px" })
          }
        >
          <option value="">-- Select RawMaterial --</option>
          {stockList.map((stock) => (
            <option key={stock.id} value={stock.id}>
              {stock.name}
            </option>
          ))}
        </select>
        <br />

        <div>
          <label htmlFor="units">Units:</label>
          <input
            className="update-stock-input"
            type="number"
            id="units"
            value={units}
            onChange={handleUnitsChange}
          />
        </div>
        <br />

        <button className="update-stock-button" type="submit">
          Update Stock
        </button>
      </form>

      {errorMessage && <p>{errorMessage}</p>}
    </div>
    </>
  );
}
export default UpdateStock;