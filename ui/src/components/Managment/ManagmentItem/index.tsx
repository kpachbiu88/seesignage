import React from 'react'
import { Playlist } from '../../../types/graphql'

import './styles.css'

interface IManagmentItemProps {
  index: number
  item: string
  isNew?: boolean
  onChange: (i: number, url: string) => void
  onDelete: (i: number) => void
  onReplace: (i: number, i2: number) => void
}

const ManagmentItem: React.FC<IManagmentItemProps> = props => {

  const onDragStart = (e: any) => {
    console.log('onDragStart', e, e.target.id)
    e.dataTransfer.setData("text", e.target.id)
  }

  const onDrop = (e: any) => {
    if (e.target.id) {
      e.preventDefault()
      const data = e.dataTransfer.getData("text")
      console.log('DROP', data, '->', e.target.id)
      props.onReplace(data, e.target.id)
      //ev.target.appendChild(document.getElementById(data));
    }
  }

  const onDragOver = (e: any) => {
    if (e.target.id) e.preventDefault()
  }
  
  //const drop

  return (
    <div id={String(props.index)} className="managment-item" draggable onDragStart={onDragStart} onDrop={onDrop} onDragOver={onDragOver}>
      <input className="managment-item__input" type="text" value={props.item} onChange={ e => props.onChange(props.index, e.target.value) } onDrop={ e => e.preventDefault() } />
      {
        !props.isNew &&
        <div className="managment-item__delete" onClick={ () => props.onDelete(props.index) }>Delete</div>
      }
    </div>
  )
}

ManagmentItem.defaultProps = {
  isNew: false
}

export default ManagmentItem
