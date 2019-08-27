import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Layout from 'components/Layout'
import RichTextElement from "components/widgets/RichTextElement";



function Person({ location, data: { kenticoCloudItemPerson } }) {
  const fullName = `${kenticoCloudItemPerson.elements.name.value} ${kenticoCloudItemPerson.elements.surname.value}`;
  const bio = kenticoCloudItemPerson.elements.bio;
  return (
    <Layout location={location} title={fullName}>
      <RichTextElement
        value={bio.value}
        contentItems={bio.linked_items}
      />
    </Layout>
  );
};

export default Person;


export const query = graphql`
query personQuery($slug: String!) {
  kenticoCloudItemPerson(elements: {list_in_portal: {value: {elemMatch: {codename: {eq: "yes"}}}}}, fields: {slug: {eq: $slug}}) {
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