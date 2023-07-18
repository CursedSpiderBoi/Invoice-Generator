import React from "react";
import { toPng } from "html-to-image";
import { jsPDF } from "jspdf";

const SideCard = ({ invoiceInfo }) => {
    const handleDownload = () => {
        const dom = document.getElementById("print");
        toPng(dom)
            .then((dataUrl) => {
                const img = new Image();
                img.crossOrigin = "annoymous";
                img.src = dataUrl;
                img.onload = () => {
                    // Initialize the PDF.
                    const pdf = new jsPDF({
                        orientation: "portrait",
                        unit: "in",
                        format: [5.5, 8.5],
                    });

                    // Define reused data
                    const imgProps = pdf.getImageProperties(img);
                    const imageType = imgProps.fileType;
                    const pdfWidth = pdf.internal.pageSize.getWidth();

                    // Calculate the number of pages.
                    const pxFullHeight = imgProps.height;
                    const pxPageHeight = Math.floor((imgProps.width * 8.5) / 5.5);
                    const nPages = Math.ceil(pxFullHeight / pxPageHeight);

                    // Define pageHeight separately so it can be trimmed on the final page.
                    let pageHeight = pdf.internal.pageSize.getHeight();

                    // Create a one-page canvas to split up the full image.
                    const pageCanvas = document.createElement("canvas");
                    const pageCtx = pageCanvas.getContext("2d");
                    pageCanvas.width = imgProps.width;
                    pageCanvas.height = pxPageHeight;

                    for (let page = 0; page < nPages; page++) {
                        // Trim the final page to reduce file size.
                        if (page === nPages - 1 && pxFullHeight % pxPageHeight !== 0) {
                            pageCanvas.height = pxFullHeight % pxPageHeight;
                            pageHeight = (pageCanvas.height * pdfWidth) / pageCanvas.width;
                        }
                        // Display the page.
                        const w = pageCanvas.width;
                        const h = pageCanvas.height;
                        pageCtx.fillStyle = "white";
                        pageCtx.fillRect(0, 0, w, h);
                        pageCtx.drawImage(img, 0, page * pxPageHeight, w, h, 0, 0, w, h);

                        // Add the page to the PDF.
                        if (page) pdf.addPage();

                        const imgData = pageCanvas.toDataURL(`image/${imageType}`, 1);
                        pdf.addImage(imgData, imageType, 0, 0, pdfWidth, pageHeight);
                    }
                    // Output / Save
                    pdf.save(`invoice-${invoiceInfo.invoiceNumber}.pdf`);
                };
            })
            .catch((error) => {
                console.error("oops, something went wrong!", error);
            });
    };

    return (
        <>
            <div className="container">
                <div
                    className="mx-3 my-3"
                    style={{
                        backgroundColor: "#f2f2f2",
                        padding: "10px",
                        float: "right",
                        width: "30%",
                        display: "flex",
                        flexDirection: "column",
                        borderRadius: "5px",
                    }}
                >
                    <button className="btn btn-danger center mx-3 my-3">
                        Delete Invoice
                    </button>
                    <button className="btn btn-primary center mx-3 my-3">
                        Save Invoice
                    </button>
                    <button
                        className="btn btn-success center mx-3 my-3"
                        onClick={handleDownload}
                    >
                        Save as PDF
                    </button>
                </div>
            </div>
        </>
    );
};

export default SideCard;
