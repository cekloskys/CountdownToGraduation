import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    useQuery,
    gql, createHttpLink
} from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import 'localstorage-polyfill';

const URI = 'http://localhost:4000/';
// const androidURI = 'https://chestnut-hill-college-2.herokuapp.com/';
const androidURI = 'https://chcmobileapps.ddns.net';

const httpLink = createHttpLink({
    uri: androidURI,
});

const authLink = setContext(async (_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token =  localStorage.getItem('token');
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: token || '',
        }
    }
});

export const client = new ApolloClient({
    // uri: httpLink,
    link: authLink.concat(httpLink),
    // link: httpLink,
    cache: new InMemoryCache(),
});
