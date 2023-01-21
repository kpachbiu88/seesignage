import React from 'react'
import _ from 'lodash'
import { Playlist, useUpdatePlaylistMutation } from '../../types/graphql'
import ManagmentItem from './ManagmentItem'
import ManagmentAddItem from './ManagmentAddItem'

import './styles.css'

interface IManagmentProps {
  playlist: Playlist
  setPlaylist: (playlist: Playlist) => void
}

const Managment: React.FC<IManagmentProps> = props => {
  const { id, name, media } = props.playlist
  const [updatePlaylistMutation, { data, loading, error }] = useUpdatePlaylistMutation({
    refetchQueries: ['playlist']
  })

  const save = () => {
    updatePlaylistMutation({
       variables: {
          id: id || '', 
          name: name || '',
          media: media || []
        } 
    })
  }

  const changeName = (name: string) => {
    const newPlaylist = _.cloneDeep(props.playlist)
    newPlaylist.name = name
    props.setPlaylist(newPlaylist)
  }

  const onChange = (i: number, url: string) => {
    const newPlaylist = _.cloneDeep(props.playlist)
    if (newPlaylist.media)
      newPlaylist.media[i] = url
    props.setPlaylist(newPlaylist)
  }

  const onDelete = (i: number) => {
    const newPlaylist = _.cloneDeep(props.playlist)
    newPlaylist.media?.splice(i, 1)
    props.setPlaylist(newPlaylist)
  }

  const onReplace = (i: number, i2: number) => {
    const newPlaylist = _.cloneDeep(props.playlist)
    if (newPlaylist.media) {
      const firstEl = newPlaylist.media[i]
      newPlaylist.media[i] = newPlaylist.media[i2]
      newPlaylist.media[i2] = firstEl
    }
    props.setPlaylist(newPlaylist)
  }

  const onAdd = (url: string) => {
    const newPlaylist = _.cloneDeep(props.playlist)
    newPlaylist.media?.push(url)
    props.setPlaylist(newPlaylist)
  }

  return (
    <div className="managment">
      <h2>Management</h2>
      Playlist name: <input className="managment__name" type="text" value={name || ''} onChange={ e => changeName(e.target.value) } />
      {
        media?.map((el, i) => {
          return <ManagmentItem key={i} index={i} item={el || ''} onChange={onChange} onDelete={onDelete} onReplace={onReplace} />
        })
      }
      {
        media &&
        <ManagmentAddItem onAdd={onAdd} />
      }
      <div className="managment__save" onClick={save}>Save and play</div>
      {
        error &&
        <div className="managment__error">{error.message}</div>
      }
    </div>
  )
}

export default Managment
