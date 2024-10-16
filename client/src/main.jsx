import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  // uri: 'http://localhost:4000/graphql',//graphQL endpoint i.e our server url
  uri: 'https://graphql-l8ui.onrender.com',//graphQL endpoint i.e our server url
  cache: new InMemoryCache(),// Apollo Client uses to cache query results after fetching them.
  credentials: "include"// This tells Apollo Client to send cookies along with every request to the server.
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ApolloProvider client={client}> {/*wrap app with ApolloProvider to ge the access of client in the entire application */}
      <App />
    </ApolloProvider>
  </StrictMode>,
)
