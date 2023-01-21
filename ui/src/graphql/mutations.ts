import { gql } from '@apollo/client'

export const UPDATE_PLAYLIST = gql`
    mutation updatePlaylist($id: ID!, $name: String!, $media: [String]!) {
        updatePlaylist(id: $id, name: $name, media: $media) {
            id
            name
            media
        }
    }
`