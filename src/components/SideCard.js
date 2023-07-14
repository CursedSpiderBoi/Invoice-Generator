import React from "react";


const SideCard = () => {
    return (
        <>
            <div className="container">
                <div className="mx-3 my-3" style={{ backgroundColor: "#f2f2f2", padding: "10px" , float: "right", width: "30%", display: "flex", flexDirection: "column", borderRadius:"5px" }}>
                    <button className="btn btn-primary center mx-3 my-3">Delete Invoice</button>
                    <button className="btn btn-primary center mx-3 my-3">Download PDF</button>
                    <button className="btn btn-danger center mx-3 my-3">Save PDF</button>
                </div>
            </div>
        </>
    );
};


export default SideCard;
