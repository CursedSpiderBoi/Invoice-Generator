import { useState } from "react";
import Navbar from "./components/Navbar";
import ItemTable from "./components/ItemTable";
import SideCard from "./components/SideCard";
import "./App.css"; // import custom CSS file

function App() {
  const [issueDate, setIssueDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [senderName, setSenderName] = useState("");
  const [receiverName, setReceiverName] = useState("");
  const [items, setItems] = useState([]);

  const handleIssueDateChange = (event) => {
    setIssueDate(event.target.value);
  };

  const handleDueDateChange = (event) => {
    setDueDate(event.target.value);
  };

  const handleSenderNameChange = (event) => {
    setSenderName(event.target.value);
  };

  const handleReceiverNameChange = (event) => {
    setReceiverName(event.target.value);
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const handleAddItem = () => {
    setItems([...items, { name: "", quantity: 0, price: 0 }]);
  };

  const handleRemoveItem = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  return (
    <>
      <Navbar />
      <SideCard
        issueDate={issueDate}
        dueDate={dueDate}
        senderName={senderName}
        receiverName={receiverName}
        items={items}
      />
      <div className="container my-4 mx-5">
        <div className="card text-center ">
          <div className="card-header bg-primary text-white">Invoice Generator</div>
          <div className="card-body">
            <form className="mx-3 my-3">
              <div className="row mb-3">
                <div className="col">
                  <label htmlFor="issueDate" className="form-label">
                    Issue Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="issueDate"
                    value={issueDate}
                    onChange={handleIssueDateChange}
                  />
                </div>
                <div className="col">
                  <label htmlFor="dueDate" className="form-label">
                    Due Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="dueDate"
                    value={dueDate}
                    onChange={handleDueDateChange}
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col">
                  <label htmlFor="senderName" className="form-label">
                    Sender Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="senderName"
                    value={senderName}
                    onChange={handleSenderNameChange}
                  />
                </div>
                <div className="col">
                  <label htmlFor="receiverName" className="form-label">
                    Receiver Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="receiverName"
                    value={receiverName}
                    onChange={handleReceiverNameChange}
                  />
                </div>
              </div>
            </form>
            <ItemTable
              items={items}
              onItemChange={handleItemChange}
              onAddItem={handleAddItem}
              onRemoveItem={handleRemoveItem}
            />
          </div>
          <div className="card-footer bg-light text-muted">Looking Forward to it</div>
        </div>
      </div>
    </>
  );
}

export default App;
