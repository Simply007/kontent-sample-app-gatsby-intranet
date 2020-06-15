import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import EmployeeList from 'components/widgets/EmployeeList';

const styles = () => ({
  paper: {
    maxWidth: 936,
    margin: 'auto',
    overflow: 'hidden',
  },
  contentWrapper: {
    margin: '40px 16px',
  },
  container: {
    padding: '48px 36px 0',
  },
});
function EmployeesContent({ classes, lang }) {
  return (
    <div className={classes.container}>
      <Paper className={classes.paper}>
        <EmployeeList lang={lang} />
      </Paper>
    </div>
  );
}

EmployeesContent.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EmployeesContent);
