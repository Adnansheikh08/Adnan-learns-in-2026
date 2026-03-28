import React from 'react'
import type { CardProps } from '../types'



export default function Card({name ,price , isSpecial = false}: CardProps) {
  return (
    <article>
        <h2>
            {name} - ${price} {isSpecial && <span>Special Offer!</span>}
        </h2>
    </article>
  )
}
