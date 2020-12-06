import React, { Component } from 'react';
import './App.css';
import Main from './components/Main';
import {BrowserRouter} from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import api_route from "../src/app-config";

// apollo client setup
const client = new ApolloClient({
  uri: `${api_route.host}/graphql`
});

//App Component
class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
      <BrowserRouter>
        <div>
          {}
          <Main/>
        </div>
      </BrowserRouter>
      </ApolloProvider>
    );
  }
}

export default App;
