import {
    ApolloClient,
    InMemoryCache,
    createHttpLink
} from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import 'localstorage-polyfill';

const androidURI = 'https://chcmobileapps.ddns.net';

const httpLink = createHttpLink({
    uri: androidURI,
});

const authLink = setContext(async (_, { headers }) => {
    const token =  localStorage.getItem('token');
    return {
        headers: {
            ...headers,
            authorization: token || '',
        }
    }
});

export const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});
