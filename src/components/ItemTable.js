import React, { useState } from "react";
import "./ItemTable.css";

const ItemTable = () => {
    const [taxRate, setTaxRate] = useState(0.0);
    const [items, setItems] = useState([]);
    const [currency, setCurrency] = useState("USD");

    const handleTaxRateChange = (e) => {
        setTaxRate(parseFloat(e.target.value));
    };

    const handleItemNameChange = (e, index) => {
        const newItems = [...items];
        newItems[index].name = e.target.value;
        setItems(newItems);
    };

    const calculateSubtotal = (quantity, unitPrice) => {
        let subtotal = quantity * unitPrice;
        subtotal += subtotal * (taxRate / 100);
        return subtotal;
    };

    const calculateTotal = () => {
        let total = 0;
        items.forEach((item) => {
            total += calculateSubtotal(item.quantity, item.unitPrice);
        });
        return total;
    };

    const calculateTax = () => {
        let tax = 0;
        items.forEach((item) => {
            tax += item.quantity * item.unitPrice * (taxRate / 100);
        });
        return tax;
    };

    const handleAddRow = () => {
        setItems([...items, { name: "", quantity: 0, unitPrice: 0 }]);
    };

    const handleRemoveRow = (index) => {
        const newItems = [...items];
        newItems.splice(index, 1);
        setItems(newItems);
    };

    const handleQuantityChange = (e, index) => {
        const newItems = [...items];
        newItems[index].quantity = parseInt(e.target.value);
        setItems(newItems);
    };

    const handleUnitPriceChange = (e, index) => {
        const newItems = [...items];
        newItems[index].unitPrice = parseFloat(e.target.value);
        setItems(newItems);
    };

    const handleCurrencyChange = (e) => {
        setCurrency(e.target.value);
    };

    return (
        <div className="item-table-container">
            <h2>Invoice Summary</h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col"></th>
                        <th scope="col">Name</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Unit Price</th>
                        <th scope="col">Tax Rate</th>
                        <th scope="col">Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, index) => (
                        <tr key={index}>
                            <td>
                                <img
                                    src="https://cdn-icons-png.flaticon.com/512/1214/1214428.png"
                                    alt="Delete"
                                    className="delete-icon"
                                    onClick={() => handleRemoveRow(index)}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    value={item.name}
                                    onChange={(e) => handleItemNameChange(e, index)}
                                />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    value={item.quantity}
                                    onChange={(e) => handleQuantityChange(e, index)}
                                />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={item.unitPrice}
                                    onChange={(e) => handleUnitPriceChange(e, index)}
                                />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={taxRate}
                                    onChange={handleTaxRateChange}
                                />
                            </td>
                            <td>
                                {currency} {calculateSubtotal(item.quantity, item.unitPrice).toFixed(2)}
                            </td>
                        </tr>
                    ))}
                    <tr>
                        <td colSpan="6">
                            <button className="add-row-button" onClick={handleAddRow}>+</button>
                        </td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="4" className="text-right">
                            Subtotal:
                        </td>
                        <td>
                            {currency} {calculateTotal().toFixed(2)}
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="4" className="text-right">
                            Tax ({taxRate}%):
                        </td>
                        <td>
                            {currency} {calculateTax().toFixed(2)}
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="4" className="text-right">
                            Total:
                        </td>
                        <td>
                            {currency} {(calculateTotal() + calculateTax()).toFixed(2)}
                        </td>
                    </tr>
                </tfoot>
            </table>
            <div className="currency-container">
                <label htmlFor="currency" className="currency-label">
                    Currency:
                </label>
                <select id="currency" value={currency} onChange={handleCurrencyChange}>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                    <option value="JPY">JPY</option>
                </select>
            </div>
        </div>
    );
};

export default ItemTable;
