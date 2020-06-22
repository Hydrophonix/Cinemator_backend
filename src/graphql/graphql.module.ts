// Core
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

// Instruments
import { IContext } from './graphql.interfaces';

@Module({
    imports: [
        // Apollo healthcheck endpoint
        // /.well-known/apollo/server-health
        // https://www.apollographql.com/docs/apollo-server/api/apollo-server/
        GraphQLModule.forRoot({
            playground:     true,
            autoSchemaFile: 'schema.graphql',
            cacheControl:   true,
            cors:           false,
            context:        ({ req, res }): IContext => ({ req, res }),
        }),
    ],
})
export class GraphqlModule {}
