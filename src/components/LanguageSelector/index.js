import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Location } from '@reach/router';
import { Link } from 'gatsby';

function LanguageSelector({ classes, lang, location, className }) {
  if (lang === 'en') {
    return (
      <Link className={className} to={`/cs/${location.pathname}`}>
        čeština
      </Link>
    );
  } else {
    return (
      <Link className={className} to={location.pathname.replace('/' + lang + '/', '/')}>
        english
      </Link>
    );
  }
}

export default LanguageSelector;
