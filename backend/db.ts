import loki from 'lokijs'
import { Playlist } from './src/types/graphql'

const db = new loki('seesignage.db')
export const playlists = db.addCollection<Playlist>('playlists')