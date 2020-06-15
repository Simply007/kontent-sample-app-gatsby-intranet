import React from 'react';
import { navigate } from '@reach/router';
import { Link } from 'gatsby';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { StaticQuery, graphql } from 'gatsby';

function createData(name, surname, birthYear, urlSlug) {
  return { name, surname, birthYear, urlSlug };
}

function EmployeeList(props) {
  return (
    <StaticQuery
      query={graphql`
        query peoplePortalList {
          allKontentItemPerson(
            filter: { elements: { list_in_portal: { value: { elemMatch: { codename: { eq: "yes" } } } } } }
          ) {
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
                urlslug {
                  value
                }
              }
              preferred_language
            }
          }
        }
      `}
      render={({ allKontentItemPerson }) => {
        const rows = allKontentItemPerson.nodes
          .filter(person => person.preferred_language === props.lang)
          .map(person =>
            createData(
              person.elements.name.value,
              person.elements.surname.value,
              person.elements.date_of_birth.value,
              `/${props.lang === 'en' ? '' : props.lang + '/'}employees/${person.elements.urlslug.value}`
            )
          );
        return (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Surname</TableCell>
                <TableCell align="right">Birth Year</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => (
                <TableRow key={row.name} onClick={() => navigate(row.urlSlug)} style={{ cursor: 'pointer' }}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.surname}</TableCell>
                  <TableCell align="right">{row.birthYear}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        );
      }}
    />
  );
}

export default EmployeeList;
