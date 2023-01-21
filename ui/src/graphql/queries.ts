import { gql } from '@apollo/client'

export const PLAYLIST = gql`
    query playlist {
        playlist {
            id
            name
            media
        }
    }
`