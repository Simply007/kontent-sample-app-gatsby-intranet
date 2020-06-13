import React from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Layout from 'components/Layout';
import SocialMediaAccount from 'components/widgets/SocialMediaAccount';
import get from 'lodash/get';
import { RichTextElement } from '@kentico/gatsby-kontent-components';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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
  bio: {
    margin: '1em',
    padding: '1em',
  },
  profilePicture: {
    width: '100%',
    margin: '1em',
    boxShadow: '0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12)',
    borderRadius: '8px',
  },
  container: {
    padding: '48px 36px 48px',
  },
  notes: {
    marginTop: '1em',
  },
});

const resolveLinkedItem = linkedItem => {
  debugger;
  switch (get(linkedItem, 'system.type')) {
    case 'social_media_account': {
      return <SocialMediaAccount item={linkedItem} />;
    }
    default: {
      return null;
    }
  }
};

const resolveLink = (language, link, domNode) => {
  switch (get(link, 'type')) {
    case 'person': {
      return (
        <Link to={`/${language === 'en' ? '' : language + '/'}employees/${link.url_slug}`}>
          {get(domNode, 'children[0].data', 'broken-link')}
        </Link>
      );
    }
    default: {
      return null;
    }
  }
};

const resolveImage = image => (
  <img src={image.url} alt={image.description ? image.description : image.name} width="200" />
);

function Person({ location, classes, data: { kontentItemPerson } }) {
  const fullName = `${kontentItemPerson.elements.name.value} ${kontentItemPerson.elements.surname.value}`;
  const bio = kontentItemPerson.elements.bio;
  const profilePicture = kontentItemPerson.elements.profile_picture.value[0];
  const notes =
    kontentItemPerson.fields.hasNotes &&
    kontentItemPerson.elements.pinned_notes.value.map((note, index) => (
      <ExpansionPanel key={index + 1}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`panel${index + 1}a-content`}
          id={`panel${index + 1}a-header`}
        >
          {note.elements.title.value}
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <RichTextElement value={note.elements.text.value} />
        </ExpansionPanelDetails>
      </ExpansionPanel>
    ));

  return (
    <Layout location={location} title={fullName} lang={kontentItemPerson.preferred_language}>
      <div className={classes.container}>
        <Paper className={classes.paper}>
          <Grid container spacing={16} wrap="wrap" alignItems="flex-start" justify="center">
            <Grid lg={6} xs={12} item>
              <Grid lg={5} xs={6} item>
                <img
                  src={profilePicture.url}
                  alt={profilePicture.description ? profilePicture.description : profilePicture.name}
                  className={classes.profilePicture}
                />
              </Grid>
            </Grid>
            <Grid lg={6} xs={12} item>
              <Paper className={classes.bio}>
                <RichTextElement
                  value={bio.value}
                  linkedItems={bio.modular_content}
                  resolveLinkedItem={resolveLinkedItem}
                  images={bio.images}
                  resolveImage={resolveImage}
                  links={bio.links}
                  resolveLink={resolveLink.bind(this, kontentItemPerson.preferred_language)}
                />
              </Paper>
            </Grid>
          </Grid>
        </Paper>
        <div className={classes.notes}>{notes}</div>
      </div>
    </Layout>
  );
}

export default withStyles(styles)(Person);

export const query = graphql`
  query personQuery($slug: String!, $lang: String!) {
    kontentItemPerson(
      preferred_language: { eq: $lang }
      elements: {
        list_in_portal: { value: { elemMatch: { codename: { eq: "yes" } } } }
        urlslug: { value: { eq: $slug } }
      }
    ) {
      fields {
        hasNotes
      }
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
        pinned_notes {
          value {
            ... on kontent_item_note {
              elements {
                title {
                  value
                }
                text {
                  value
                }
              }
            }
          }
        }
        bio {
          value
          modular_content {
            ... on kontent_item_social_media_account {
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
                  value {
                    ... on kontent_item_social_media_type {
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
          images {
            url
            image_id
          }
          links {
            codename
            link_id
            url_slug
            type
          }
        }
      }
      preferred_language
    }
  }
`;

Person.propTypes = {
  data: PropTypes.object,
};
