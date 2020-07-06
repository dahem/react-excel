import React from 'react';
import XlsxPopulate from 'xlsx-populate';

function getCol(c) {
    return String.fromCharCode('A'.charCodeAt(0) + c);    
}

function App() {
    const reportTitle = 'xxxxxxxxreportxxxxxxxxxx';
    const columns = ['First ', 'Last name', 'Age', 'Date'];
    const data = [
        ['Jill namexxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxdfsdfsxxxs', 'Smith', 50, new Date()],
        ['Jill', 'Smith', 50, new Date()],
        ['Jill', 'Smith', 50, new Date()]
    ];
    
    const generate = (type) => {
        return XlsxPopulate.fromBlankAsync()
            .then(function (workbook) {
                const range = workbook.sheet(0).range(`A1:${getCol(columns.length-1)}1`);
                range.value(reportTitle);
                range.style({horizontalAlignment: "center", verticalAlignment: "center" })
                range.merged(true);
                columns.forEach((col, c) => {
                    workbook.sheet(0).column(getCol(c)).width(25);
                    workbook.sheet(0).row(2).cell(c+1).value(col).style({ bold: true, italic: true });
                });
                data.forEach((row, r) => {
                    row.forEach((cell, c) => {
                        
                        const cellValue = workbook.sheet(0).row(r+3).cell(c+1).value(cell).style({ horizontalAlignment: 'distributed', 'wrapText': true });
                        if (cell instanceof Date) {
                            cellValue.style("numberFormat", "DD/MM/YYYY");
                        }
                    });
                });
                return workbook.outputAsync({ type: type });
            });
    }

    const exportXLSX = () => {
        return generate()
            .then(function (blob) {
                if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                    window.navigator.msSaveOrOpenBlob(blob, "out.xlsx");
                } else {
                    var url = window.URL.createObjectURL(blob);
                    var a = document.createElement("a");
                    document.body.appendChild(a);
                    a.href = url;
                    a.download = "out.xlsx";
                    a.click();
                    window.URL.revokeObjectURL(url);
                    document.body.removeChild(a);
                }
            })
            .catch(function (err) {
                alert(err.message || err);
                throw err;
            });
    }

    return (
    <div className="App">
        <button type="button" onClick={exportXLSX}>Click Me!</button>
        
    </div>
  );
}

export default App;
