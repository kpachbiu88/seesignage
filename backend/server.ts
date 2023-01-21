import fs from 'fs'
import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'

import playlistDefault from './src/resources/playlist.json'
import resolvers from './src/resolvers'
import { playlists } from './db'

const getGraphqlSchemas = async () => {
    const schemaFiles = await fs.promises.readdir('./src/graphql/')
    return schemaFiles.map(file =>
      fs.readFileSync(`./src/graphql/${file}`, {encoding: 'utf-8'})
    )
}

const start = async () => {
    playlists.insert(playlistDefault)

    const typeDefs = await getGraphqlSchemas()
    const server = new ApolloServer({
        typeDefs,
        resolvers,
    })
    const { url } = await startStandaloneServer(server, {
        listen: { port: 4000 },
    })
    console.log(`🚀 Server ready at: ${url}`)
}

start()

