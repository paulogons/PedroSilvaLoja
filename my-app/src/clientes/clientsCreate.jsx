import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  shape
} from 'prop-types';

const ClientsCreate = (client) => {

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [greeting, setGreeting] = useState(
      'Hello Function Component!'
  );

  useEffect(() => {

  }, [])

  const createClient = (client) => {
    const requestOptions = {
      method: 'POST',
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
    createClient(client);
    event.preventDefault();
  };

return (
 
  <div class="margem">
     <h1 align="left">Create Cliente</h1>
    
  <form onSubmit={handleSubmit} align="left">
  <table  >
      <tr height="40px"><td>Nr:</td></tr>
      <tr height="40px"><td><input type="text" value={client.nr} size="50"/></td></tr>
      <tr height="40px"><td>Nome:</td></tr>
      <tr height="40px"><td><input type="text" value={client.nome} size="50"/></td></tr>
      <tr height="40px"><td>Morada:</td></tr>
      <tr height="40px"><td><input type="text" value={client.morada} size="50"/></td></tr>
      <tr height="50px"><td><button type="submit" value="Criar" class="btn btn-primary">Criar</button></td></tr>
    </table>
  
  </form>
  </div>
);

};

ClientsCreate.defaultProps = {
  client: {},
};

ClientsCreate.propTypes = {
  client: shape({}).isRequired,
};

export default ClientsCreate;