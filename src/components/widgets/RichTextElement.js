import React from 'react';
import PropTypes from 'prop-types';
import parseHTML from 'html-react-parser';
import get from 'lodash/get';

const isLinkedItem = domNode => domNode.name === 'object' && get(domNode, 'attribs.type') === 'application/kenticocloud';

const replaceNode = (domNode, linkedItems, resolveContentItem) => {
  if (resolveContentItem && linkedItems) {
    if (isLinkedItem(domNode)) {
      const codeName = get(domNode, 'attribs["data-codename"]');
      const linkedItem = linkedItems.find(item => item.system.codename === codeName);
      return resolveContentItem(linkedItem);
    }
  }
};

function RichTextElement({ value, linkedItems, resolveContentItem }) {
  return parseHTML(value, {
    replace: domNode => replaceNode(domNode, linkedItems, resolveContentItem),
  });
}

RichTextElement.propTypes = {
  value: PropTypes.string.isRequired,
  images: PropTypes.arrayOf(PropTypes.object),
  links: PropTypes.arrayOf(PropTypes.object),
  contentItems: PropTypes.arrayOf(PropTypes.object),
  linkedItemResolver: PropTypes.func,
  linkResolver: PropTypes.func,
  imageResolver: PropTypes.func,
};

export default RichTextElement;
