import React from 'react';
import Button from '@material-ui/core/Button';
import { Link, navigate } from 'gatsby';

function LanguageSelector({ classes, lang, location, className }) {
  if (lang === 'en') {
    return (
      <Button
        className={classes.button}
        variant="outlined"
        color="inherit"
        size="small"
        onClick={() => navigate(`/cs${location.pathname}`)}
      >
        čeština
      </Button>
    );
  } else {
    return (
      <Button
        className={classes.button}
        variant="outlined"
        color="inherit"
        size="small"
        onClick={() => navigate(location.pathname.replace('/' + lang + '/', '/'))}
      >
        english
      </Button>
    );
  }
}

export default LanguageSelector;
