import React, { useState, useEffect } from 'react';
import {
  shape, number, string
} from 'prop-types';
import { stringToArray } from 'ag-grid-community';

const ClientsUpdate = (client) => {

  const [error, setError] = useState(null);
  const [nome, setNome] = useState(client.client.nome);
  const [morada, setMorada] = useState(client.client.morada);
  const [clientToUpdate, setClientToUpdate] = useState(client.client);
  const [isLoaded, setIsLoaded] = useState(false);
  const [greeting, setGreeting] = useState(
      'Hello Function Component!'
  );

  useEffect(() => {
    //getClientById(id)
  }, [])

  const getClientById = (id) => {
    fetch(`http://localhost:8000/clientes/${id}`)
    .then(res => res.json())
    .then(
      (result) => {
        setIsLoaded(true);
        client = result;
      },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      (error) => {
        setIsLoaded(true);
        setError(error);
      }
    )
  };

  const updateClient = (client) => {
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(client)
    };
    fetch(`http://localhost:8000/clientes`,requestOptions)
    .then(res => res.json())
    .then(
      (result) => {
        setIsLoaded(true);
        client = result;
      },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      (error) => {
        setIsLoaded(true);
        setError(error);
      }
    )
  }

  const handleNameChange = (event) => {
    setNome(event.target.value);
  };

  const handleAddressChange = (event) => {
    setMorada(event.target.value);
  };

  const handleSubmit = (event) => {
    var client = clientToUpdate;
    client.morada = morada;
    client.nome = nome;

    updateClient(client);
    event.preventDefault();
  };

return (
  <div class="margem">
     <h1 align="left">Update Cliente</h1>

  <form onSubmit={handleSubmit} align="left">
  <table  >
      <tr height="40px"><td>Nr:</td></tr>
      <tr height="40px"><td><input type="text" value={client.nr} size="50"/></td></tr>
      <tr height="40px"><td>Nome:</td></tr>
      <tr height="40px"><td><input type="text" value={nome} onChange={handleNameChange} size="50"/></td></tr>
      <tr height="40px"><td>Morada:</td></tr>
      <tr height="40px"><td><input type="text" value={morada} onChange={handleAddressChange} size="50"/></td></tr>
      <tr height="50px"><td><button type="submit" value="Alterar" class="btn btn-primary">Alterar</button></td></tr>
    </table>
  </form>
  </div>
);

};

ClientsUpdate.defaultProps = {
};

ClientsUpdate.propTypes = {
  client: shape({
    morada: string.isRequired,
    nome: string.isRequired,
  }).isRequired,
};

export default ClientsUpdate;