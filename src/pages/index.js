import React from 'react'
import { graphql } from 'gatsby'
import Layout from 'components/Layout'
import PropTypes from 'prop-types'
import Content from 'components/IndexContent'

function DashboardIndex({ data, location }) {
  const { title } = data.site.siteMetadata
  return (
    <Layout location={location} title={title}>
      <Content />
    </Layout>
  )
}
DashboardIndex.propTypes = {
  data: PropTypes.object.isRequired,
  location: PropTypes.object,
}
export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
export default DashboardIndex
