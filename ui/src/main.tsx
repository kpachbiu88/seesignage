import React from 'react'
import ReactDOM from 'react-dom/client'
import { ApolloClient, ApolloProvider, createHttpLink, ApolloLink } from '@apollo/client'

import App from './App'
import { cache } from './cache'

import './index.css'

const httpLink = createHttpLink({
    uri: `http://localhost:4000/graphql`
})

const client = new ApolloClient({
    link: ApolloLink.from([httpLink]),
    cache: cache
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    </React.StrictMode>,
)
