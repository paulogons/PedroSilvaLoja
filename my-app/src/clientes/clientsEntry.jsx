import React, { useState, useEffect } from 'react';
import {AgGridColumn, AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const ClientEntry = () => {
        
    const [clients, setClients] = useState([]);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [greeting, setGreeting] = useState(
        'Hello Function Component!'
    );

    useEffect(() => {
        fetch("http://localhost:8000/clientes")
          .then(res => res.json())
          .then(
            (result) => {
                debugger;
              setIsLoaded(true);
              setClients(result);
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
              setIsLoaded(true);
              setError(error);
            }
          )
      }, [])
        
    const updateClient = () => {
        //todo
    };

    const deleteClient = () => {
        //todo
    };

    const columnDefs =  [
        {headerName: 'ID', field: '_id'},
        {headerName: 'Nr', field: 'nr'},
        {headerName: 'Nome', field: 'nome'},
        {headerName: 'Morada', field: 'morada'}
    ];

    return (
        <div className="ag-theme-alpine" style={{height: 200, width: 600}}>
           <AgGridReact
               rowData={clients}
               columnDefs={columnDefs}>
           </AgGridReact>
         </div>
      );
};
 
export default ClientEntry;