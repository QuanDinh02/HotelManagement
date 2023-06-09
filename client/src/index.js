import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { Provider } from 'react-redux';
import store from './redux/store';

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        customers: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        staff_access_management: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache,
  credentials: 'include',
  mode: 'cors'
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>,
    {/* <React.StrictMode>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>,
    </React.StrictMode> */}
  </Provider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
