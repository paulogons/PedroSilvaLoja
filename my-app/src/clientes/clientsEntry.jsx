import React, { useState, useEffect } from 'react';
import {AgGridColumn, AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import ClientsUpdate from './clientsUpdate';
import ClientsCreate from './clientsCreate';
import ButtonCellRender from './button_cell_render/buttonCellRender';
const ClientEntry = () => {

    const [clients, setClients] = useState([]);
    const [client, setClient] = useState({});
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

    const goToUpdate = (data) =>{
      setClient(data);
      setAppState('update');
    }

    const deleteClient= (data) => {
      return fetch(`http://localhost:8000/clientes/${data._id}`, {
        method: 'DELETE',
      })
      .then(response => response.json())
      .then(
        () => {
          alert('Um cliente for apagado!');
        },
      );
    };

    const goToCreate = () => {
      setAppState('create');
    }

    const columnDefs =  [
        //{headerName: 'ID', field: '_id'},
        {headerName: 'Nr', field: 'nr'},
        {headerName: 'Nome', field: 'nome'},
        {headerName: 'Morada', field: 'morada'},
        {
          headerName: 'Update',
          cellRenderer: 'buttonCellRender',
          cellRendererParams: {
            onEventRowClicked: goToUpdate,
            text: 'Update',
          },
        },
        {
          headerName: 'Delete',
          cellRenderer: 'buttonCellRender',
          cellRendererParams: {
            onEventRowClicked: deleteClient,
            text: 'Delete',
          },
        }
    ];

    const frameworkComponents = {
      buttonCellRender: ButtonCellRender,
    };

    return (
      <div>
        {
          (appState === 'update') &&
         <ClientsUpdate client={client}/>
        }
        {
          (appState === 'create') &&
         <ClientsCreate />
        }
        {
        (appState === 'entry') &&
        <div>
          <button onClick={goToCreate}>create</button>
          <div className="ag-theme-alpine" style={{height: 200, width: 600}}>
            <AgGridReact
                rowData={clients}
                frameworkComponents={frameworkComponents}
                columnDefs={columnDefs}>

            </AgGridReact>
          </div>
        </div>
        }
      </div>
      );
};

export default ClientEntry;