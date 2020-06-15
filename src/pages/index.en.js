import React from 'react';
import { graphql } from 'gatsby';
import Layout from 'components/Layout';
import PropTypes from 'prop-types';
import IndexContent from 'components/IndexContent';

function DashboardIndex({ data, location }) {
  const { title } = data.site.siteMetadata;
  return (
    <Layout location={location} title={title} lang="en">
      <IndexContent lang="en" />
    </Layout>
  );
}
DashboardIndex.propTypes = {
  data: PropTypes.object.isRequired,
  location: PropTypes.object,
};
export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
export default DashboardIndex;
