import React from 'react'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { StaticQuery, graphql } from 'gatsby'
import Visibility from '@material-ui/icons/Visibility';
import IconButton from '@material-ui/core/IconButton'

function createData(name, surname, birthYear, urlSlug) {
  return { name, surname, birthYear, urlSlug };
}

function EmployeeList({ classes }) {
  return (
    <StaticQuery
      query={
        graphql`
query peoplePortalList {
  allKenticoCloudItemPerson(filter: {elements: {list_in_portal: {value: {elemMatch: {codename: {eq: "yes"}}}}}}) {
    nodes {
      elements {
        name {
          value
        }
        surname {
          value
        }
        date_of_birth {
          value(formatString: "YYYY")
        }
      }
      fields {
        slug
      }
    }
  }
}`
      }
      render={({ allKenticoCloudItemPerson }) => {
        const rows = allKenticoCloudItemPerson.nodes.map(person =>
          createData(
            person.elements.name.value,
            person.elements.surname.value,
            person.elements.date_of_birth.value,
            person.fields.slug
          ));
        return (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Surname</TableCell>
                <TableCell align="right">Birth Year</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.surname}</TableCell>
                  <TableCell align="right">{row.birthYear}</TableCell>
                  <TableCell align="right"><Link to={`/employees/${row.urlSlug}`}><Visibility /></Link></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>)
      }} />
  );
}
EmployeeList.propTypes = {
}

export default EmployeeList