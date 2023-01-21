import React from 'react'
import { Playlist } from '../../../types/graphql'

import './styles.css'

interface IManagmentAddItemProps {
  onAdd: (url: string) => void
}

const ManagmentAddItem: React.FC<IManagmentAddItemProps> = props => {
  const [url, setUrl] = React.useState<string>('')

  return (
    <div className="managment-add-item">
      <input className="managment-add-item__input" type="text" value={url} onChange={ e => setUrl(e.target.value) } />
      <div className="managment-add-item__add" onClick={ () => { props.onAdd(url); setUrl(''); } }>Add</div>
    </div>
  )
}


export default ManagmentAddItem
