import React from 'react'
import PropTypes from 'prop-types'
import Layout from 'components/Layout'
import EmployeesContent from 'components/EmployeesContent'

function EmployeesPage({ location }) {
  const pageTitle = location ? location.pathname.replace(/\//g, '') : ''
  return (
    <Layout location={location} title={pageTitle}>
      <EmployeesContent />
    </Layout>
  )
}

EmployeesPage.propTypes = {
  location: PropTypes.object,
}
export default EmployeesPage
