import React, { useRef } from 'react';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

function App() {
    const columns = ['First name', 'Last name', 'Age'];
    const data = [['Jill', 'Smith', 50], ['Jill', 'Smith', 50], ['Jill', 'Smith', 50]];
     const btnExportEl = useRef(null);
    const exportXLSX = (e) => {
        
        console.log(btnExportEl.current.handleDownload());
    }
  return (
    <div className="App">
        <button type="button" onClick={exportXLSX}>Click Me!</button>
        <div style={{ display: 'none' }}>
            <ReactHTMLTableToExcel
                        ref={btnExportEl}
                        id="test-table-xls-button"
                        className="download-table-xls-button"
                        table="table-to-xls"
                        filename="tablexls"
                        sheet="tablexls"
                        buttonText="Download as XLS"/>
        <table id="table-to-xls">
            <tr>
                {columns.map(c => <th>{c}</th>)}
            </tr>
            {data.map(row => <tr>{
                row.map(cell => <td>{cell}</td>)
            }</tr>)}
        </table>
        </div>
    </div>
  );
}

export default App;
