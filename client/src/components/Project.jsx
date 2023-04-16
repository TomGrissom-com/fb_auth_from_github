import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'

function Project(props) {
    const contactID = props.data

  return (
    <h1>{contactID}</h1>
  )
}

export default Project
