import React from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Layout from 'components/Layout';
import RichTextElement from 'components/widgets/RichTextElement';
import SocialMediaAccount from 'components/widgets/SocialMediaAccount';
import get from 'lodash/get';

function Person({ location, data: { kenticoCloudItemPerson } }) {
  const fullName = `${kenticoCloudItemPerson.elements.name.value} ${kenticoCloudItemPerson.elements.surname.value}`;
  const bio = kenticoCloudItemPerson.elements.bio;
  return (
    <Layout location={location} title={fullName}>
      <RichTextElement
        value={bio.value}
        linkedItems={bio.linked_items}
        resolveContentItem={linkedItem => {
          switch (get(linkedItem, 'system.type')) {
            case 'social_media_account': {
              return <SocialMediaAccount item={linkedItem} />;
            }
            default: {
              return null;
            }
          }
        }}
        images={bio.images}
        resolveImage={image => (
          <img src={image.url} alt={image.description ? image.description : image.name} width="200" />
        )}
        links={bio.links}
        resolveLink={(link, domNode) => {
          switch (get(link, 'type')) {
            case 'person': {
              return <Link to={`/employees/${link.urlSlug}`}>{get(domNode, 'children[0].data', 'broken-link')}</Link>;
            }
            default: {
              return null;
            }
          }
        }}
      />
    </Layout>
  );
}

export default Person;

export const query = graphql`
query personQuery($slug: String!) {
  kenticoCloudItemPerson(elements: {list_in_portal: {value: {elemMatch: {codename: {eq: "yes"}}}} urlslug: { value :{eq: $slug}}}) {
    elements {
      name {
        value
      }
      surname {
        value
      }
      date_of_birth {
        value(formatString: "YYYY/MM/DD")
      }
      profile_picture {
        value {
          url
          description
          name
        }
      }
      bio {
        value
        linked_items {
          ... on Node {
            ... on KenticoCloudItemSocialMediaAccount {
              system {
                id
                codename
                type
              }
              elements {
                handle {
                  value
                }
                social_media {
                  linked_items {
                    ... on Node {
                      ... on KenticoCloudItemSocialMediaType {
                        system {
                          codename
                          id
                        }
                        elements {
                          title {
                            value
                          }
                          icon {
                            value {
                              name
                              url
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        images {
          url
          imageId
        }
        links {
          codename
          linkId
          urlSlug
          type
        }
      }
    }
  }
}
`;

Person.propTypes = {
  data: PropTypes.object,
};
