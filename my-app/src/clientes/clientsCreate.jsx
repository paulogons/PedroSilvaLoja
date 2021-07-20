import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  shape
} from 'prop-types';

const ClientsCreate = (client) => {

  const input1 = {};
  const input2 = {};
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
  <form onSubmit={handleSubmit}>
    <label>
      Nome:
      <input type="text" value={client.nome} />
    </label>
    <label>
      Morada:
      <input type="text" value={client.morada} />
    </label>
    <input type="submit" value="Submit" />
  </form>
);

};

ClientsCreate.defaultProps = {
  client: {},
};

ClientsCreate.propTypes = {
  client: shape({}).isRequired,
};

export default ClientsCreate;