import React from 'react'

const Card = ({recipe}) => {
  return (
    <figure>
        <img src={recipe.image} alt={recipe.name} />
    </figure>
  )
}

export {Card}