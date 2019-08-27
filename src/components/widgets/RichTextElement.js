import React from 'react'
import PropTypes from 'prop-types'
import parseHTML from 'html-react-parser'

function RichTextElement({ value, contentItems }) {
  return parseHTML(value);
}

RichTextElement.propTypes = {
  value: PropTypes.string.isRequired,
  images: PropTypes.arrayOf(PropTypes.object),
  links: PropTypes.arrayOf(PropTypes.object),
  contentItems: PropTypes.arrayOf(PropTypes.object),
  linkedItemResolver: PropTypes.func,
  linkResolver: PropTypes.func,
  imageResolver: PropTypes.func
}

export default RichTextElement