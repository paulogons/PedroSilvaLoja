import React, { useState, useEffect } from 'react';
import {AgGridColumn, AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import ClientsUpdate from './clientsUpdate';
import ClientsCreate from './clientsCreate';

const ClientEntry = () => {

    const [clients, setClients] = useState([]);
    const [appState, setAppState] = useState('entry');
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);
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

    const goToUpdate = () =>{
      setAppState('update');
    }

    const goToCreate = () =>{
      setAppState('create');
    }

    const columnDefs =  [
        //{headerName: 'ID', field: '_id'},
        {headerName: 'Nr', field: 'nr'},
        {headerName: 'Nome', field: 'nome'},
        {headerName: 'Morada', field: 'morada'}
       
    ];

    return (
      <div>
        {
          (appState == 'update') &&
         <ClientsUpdate />
        }
        {
          (appState == 'create') &&
         <ClientsCreate />
        }
        {
        (appState == 'entry') &&
        <div>
         
          <button onClick={goToCreate} class="btn btn-primary">Create</button>
          <p>&nbsp;</p>
          <button onClick={goToUpdate} class="btn btn-primary">update</button>
          <div className="ag-theme-alpine" style={{height: 500, width: 1300}}>
            <AgGridReact
                rowData={clients}
                columnDefs={columnDefs}>
                 
            </AgGridReact>
          </div>
        </div>
        }
      </div>
      );
};

export default ClientEntry;