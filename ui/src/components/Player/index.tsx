import React from 'react'
import { getExt } from '../../misc/common'
import { Playlist } from '../../types/graphql'

import './styles.css'

interface IPlayerProps {
  playlist: Playlist
  index: number
  setIndex: (i: number) => void
}

const Player: React.FC<IPlayerProps> = props => {
  let currentMedia = ''
  let mediaType = "video"

  const playNext = () => {
    if (props.playlist?.media) {
      const lastIndex = props.playlist.media.length - 1
      const nextIndex = lastIndex != props.index ? props.index + 1 : 0

      props.setIndex(nextIndex)
    }
  }

  if (props.playlist?.media) {
      currentMedia = props.playlist?.media[props.index] || ''
      if (['png', 'jpg', 'jpeg'].includes(getExt(currentMedia))) {
        mediaType = "image"
      }
  }

  React.useEffect(() => {
    if (mediaType === 'image') {
        const timer = setTimeout(() => {
          playNext()
      }, 7000)
      return () => clearTimeout(timer)
    }
  }, [props.playlist.media, currentMedia, mediaType])

  return (
    <div className="player">
      <h2>Digital Signage player</h2>
      <div className="player__frame">
        {
          mediaType === 'image'
          ? <div className="player__image"><img src={currentMedia} alt="" /></div>
          : <video className="player__player" src={currentMedia} controls={false} autoPlay muted onEnded={playNext}></video>
        }
      </div>
      <div className="player__playlist-name">You watching: {props.playlist?.name}</div>
    </div>
  )
}

export default Player
