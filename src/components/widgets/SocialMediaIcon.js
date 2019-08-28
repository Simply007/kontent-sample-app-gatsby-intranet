import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';

function SocialMediaIcon({ icon, url }) {
  return (
    <IconButton href={url} target={'_blank'} color="inherit">
      <Avatar src={icon.url} alt={icon.description ? icon.description : icon.name} />
    </IconButton>
  );
}

SocialMediaIcon.propTypes = {
  icon: PropTypes.object.isRequired,
  url: PropTypes.string.isRequired,
};

export default SocialMediaIcon;
