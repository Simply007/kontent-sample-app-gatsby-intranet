import React from 'react';
import PropTypes from 'prop-types';
import SocialMediaIcon from 'components/widgets/SocialMediaIcon';

function SocialMediaAccount({ item }) {
  const handle = item.elements.handle.value;
  const mediaType = item.elements.social_media.value[0];
  const url = `https://${mediaType.system.codename}.com/${handle}`;

  return <SocialMediaIcon icon={mediaType.elements.icon.value[0]} url={url} />;
}

SocialMediaAccount.propTypes = {
  item: PropTypes.object.isRequired,
};

export default SocialMediaAccount;
