import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import ContentGraphic from './ContentGraphic';
import EmployeeList from 'components/widgets/EmployeeList';

const styles = theme => ({
  paper: {
    margin: 'auto',
    overflow: 'hidden',
    [theme.breakpoints.up('sm')]: {
      minWidth: 600,
    },
    [theme.breakpoints.up('lg')]: {
      minWidth: 936,
    },
  },
  widget: {
    maxWidth: 936,
    margin: 'auto',
    overflow: 'hidden',
  },
  contentWrapper: {
    height: 368,
  },
  container: {
    padding: '48px 36px 48px',
  },
});

function Content({ classes, lang }) {
  return (
    <>
      <div className={classes.container}>
        <Paper className={classes.paper}>
          <Grid
            container
            spacing={16}
            className={classes.contentWrapper}
            wrap="wrap"
            alignItems="center"
            justify="center"
          >
            <Grid lg={6} xs={12} item align="center">
              <ContentGraphic />
            </Grid>
            <Grid lg={6} xs={12} item>
              <Typography component="h2" variant="h4" color="textSecondary" align="center">
                {lang === 'en' ? 'Welcome!' : 'Vítejte!'}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </div>
      <div className={classes.container}>
        <Paper className={classes.widget}>
          <EmployeeList lang={lang} />
        </Paper>
      </div>
    </>
  );
}

Content.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Content);
