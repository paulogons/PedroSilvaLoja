import React, { useState, useEffect } from 'react';
import {
  shape, number
} from 'prop-types';

const ClientsUpdate = (id, client) => {

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [greeting, setGreeting] = useState(
      'Hello Function Component!'
  );

  useEffect(() => {
    getClientById(id)
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

  const updateClient = () => {
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

  const handleChange = (event) => {
    this.setState({value: event.target.value});
  };

  const handleSubmit = (event) => {
    alert('A name was submitted: ' + client.nome);
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
      <tr height="40px"><td><input type="text" value={client.nome} size="50"/></td></tr>
      <tr height="40px"><td>Morada:</td></tr>
      <tr height="40px"><td><input type="text" value={client.morada} size="50"/></td></tr>
      <tr height="50px"><td><button type="submit" value="Alterar" class="btn btn-primary">Alterar</button></td></tr>
    </table>
  
  </form>
  </div>
);

};

ClientsUpdate.defaultProps = {
  client: {},
  id: 1,
};

ClientsUpdate.propTypes = {
  client: shape({}).isRequired,
  id: number.isRequired,
};

export default ClientsUpdate;