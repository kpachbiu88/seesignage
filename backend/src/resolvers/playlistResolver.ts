
import _ from 'lodash'
import path from 'path'
import { GraphQLError } from 'graphql'
import { Resolvers } from '../types/graphql'
import { playlists } from '../../db'

const playlistResolver: Resolvers = {
    Query: {
        playlist: async () => {
            try {
                const playlist = playlists.findOne()
                return playlist
            } catch (e) {
                console.log(e)
                throw new GraphQLError('Query playlist error')
            }
        }
    },

    Mutation: {
        updatePlaylist: async (parent, { id, name, media }) => {
            try {
                if (!name) return new GraphQLError('Name is required', { extensions: { code: 'NAME_REQUIRED' }})
                const allowType = _.every(media, (el) => {
                    const url = new URL(String(el))
                    const ext = path.extname(url.pathname)
                    return ['.mp4', '.png', '.jpg', '.jpeg'].includes(ext.toLocaleLowerCase())
                })
                if (!allowType) return new GraphQLError('Media must be .mp4, .png, .jpg, .jpeg', { extensions: { code: 'FILE_TYPE_ERROR' }})

                playlists.findAndUpdate({ id }, obj => {
                    obj.name = name
                    obj.media = media
                    return obj
                })

                return playlists.findOne()
            } catch (e) {
                console.log(e)
                throw new GraphQLError('Mutation updatePlaylist error')
            }
        }
    }                          
}

export default playlistResolver