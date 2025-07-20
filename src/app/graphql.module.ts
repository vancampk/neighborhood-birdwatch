import { provideApollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { Kind, OperationTypeNode } from 'graphql';
import { createClient } from 'graphql-ws';
import { inject } from '@angular/core';
import { InMemoryCache, split } from '@apollo/client/core';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { NgModule } from '@angular/core';

const uri = 'https://app.birdweather.com/graphql'; 
const wsUri = 'wss://app.birdweather.com/graphql'; 

@NgModule({
  providers: [
    provideApollo(() => {
      const httpLink = inject(HttpLink);
      // http link:
      const http = httpLink.create({
        uri: uri,
      });
    
      // WebSocket link:
      const ws = new GraphQLWsLink(createClient({
        url: uri,
      }));
    
      //  use split links to determine what kind of query we are sending and what should be used as the link method
      const link = split(
        ({ query }) => {
          const definition = getMainDefinition(query);
          return (
            definition.kind === Kind.OPERATION_DEFINITION &&
            definition.operation === OperationTypeNode.SUBSCRIPTION
          );
        },
        ws,
        http,
      );
    
      return {
        link,
        cache: new InMemoryCache(),
      };
    })
  ]
})
export class GraphQLModule { }
