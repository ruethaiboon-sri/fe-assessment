import React, {useContext} from 'react'
import {FocusContext} from '../App'
import './CardFocus.css'
const CardFocus = () => {
  const {selectedCard, onBgClick } = useContext(FocusContext)
  if (!selectedCard){
    return null
  }
  return (
    <div>
      <div className="large-card" >
        <div className="large-card-bg" onClick={onBgClick}/>
          <div className="large-card-content">
            <img alt={selectedCard.name} src={selectedCard.photoUrl} />
            <h2>{selectedCard.name}</h2>
            <h3>{selectedCard.phone}</h3>
            <h3>{selectedCard.email}</h3>
            <h4>{selectedCard.company.name}</h4>
        </div>
      </div>
    </div>
  )
}

export default CardFocus