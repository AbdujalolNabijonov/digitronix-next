import { ApolloLink } from "@apollo/client";
import createUploadLink from 'apollo-upload-client/public/createUploadLink.js';

function getHeaders() {
    const headers = {} as HeadersInit;
    const token = getJwtToken();
    // @ts-ignore
    if (token) headers['Authorization'] = `Bearer ${token}`;
    return headers;
}

function createIsomorphicLink() {
    if (typeof window !== "undefined") {
        const authLink = new ApolloLink((operation, forward) => {
            operation.setContext(({ headers = {} }) => ({
                headers: {
                    ...headers,
                    ...getHeaders()
                }
            }))
            console.warn('requesting.. ', operation)
            return forward(operation)
        })
    }

    const link = new createUploadLink();

}

// import { createHttpLink, ApolloClient, InMemoryCache } from "@apollo/client";

// const httpLink = createHttpLink({
//     uri: "http://localhost:3005/graphql"
// });

// const client = new ApolloClient({
//     link: httpLink,
//     cache: new InMemoryCache()
// })

// export default client