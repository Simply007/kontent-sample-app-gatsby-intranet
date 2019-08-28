import React from 'react';
import PropTypes from 'prop-types';
import parseHTML from 'html-react-parser';
import get from 'lodash/get';

const isLinkedItem = domNode =>
  domNode.name === 'object' && get(domNode, 'attribs.type') === 'application/kenticocloud';
const isImage = domNode => domNode.name === 'figure' && get(domNode, 'attribs.data-image-id');
const isLink = domNode => domNode.name === 'a' && get(domNode, 'attribs.data-item-id');

const replaceNode = (domNode, linkedItems, resolveContentItem, images, resolveImage, links, resolveLink) => {
  if (resolveContentItem && linkedItems) {
    if (isLinkedItem(domNode)) {
      const codeName = get(domNode, 'attribs["data-codename"]');
      const linkedItem = linkedItems.find(item => item.system.codename === codeName);
      return resolveContentItem(linkedItem);
    }
  }

  if (resolveImage && images) {
    if (isImage(domNode)) {
      const imageId = get(domNode, 'attribs.data-image-id');
      const image = images.find(image => image.imageId === imageId);
      return resolveImage(image);
    }
  }

  if (resolveLink && links) {
    if (isLink(domNode)) {
      const linkId = get(domNode, 'attribs.data-item-id');
      const link = links.find(links => links.linkId === linkId);
      return resolveLink(link, domNode);
    }
  }
};

function RichTextElement({ value, linkedItems, resolveContentItem, images, resolveImage, links, resolveLink }) {
  return parseHTML(value, {
    replace: domNode => replaceNode(domNode, linkedItems, resolveContentItem, images, resolveImage, links, resolveLink),
  });
}

RichTextElement.propTypes = {
  value: PropTypes.string.isRequired,
  linkedItems: PropTypes.arrayOf(PropTypes.object),
  resolveContentItem: PropTypes.func,
  images: PropTypes.arrayOf(PropTypes.object),
  resolveImage: PropTypes.func,
  links: PropTypes.arrayOf(PropTypes.object),
  resolveLink: PropTypes.func,
};

export default RichTextElement;
