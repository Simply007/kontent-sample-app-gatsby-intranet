import React from 'react';
import PropTypes from 'prop-types';
import Layout from 'components/Layout';
import EmployeesContent from 'components/EmployeesContent';

function EmployeesPage({ location }) {
  return (
    <Layout location={location} title="Zaměstnanci" lang="cs">
      <EmployeesContent lang="cs" />
    </Layout>
  );
}

EmployeesPage.propTypes = {
  location: PropTypes.object,
};
export default EmployeesPage;
