import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Content from 'components/Content'

const styles = theme => ({
  paper: {
    maxWidth: 936,
    margin: 'auto',
    overflow: 'hidden',
  },
  searchBar: {
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
  },
  searchInput: {
    fontSize: theme.typography.fontSize,
  },
  block: {
    display: 'block',
  },
  addUser: {
    marginRight: theme.spacing.unit,
  },
  contentWrapper: {
    margin: '40px 16px',
  },
  container: {
    padding: '48px 36px 0',
  },
})
function AuthContent() {
  return (
    <>
      <Content />
    </>
  )
}

AuthContent.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(AuthContent)
