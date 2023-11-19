import React from 'react'
import {Link} from 'react-router-dom'

function Chip({title}) {
  return (
    title !== 'Other' &&
    <Link to={`/doctor/${title}`} className=''>{title}</Link>
  )
}

export default Chip