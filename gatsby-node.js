const path = require('path');

exports.onCreateWebpackConfig = ({ actions, stage }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.join(__dirname, 'src'), 'node_modules'],
      alias: {
        '~components': path.resolve(__dirname, 'src/components'),
        '~utils': path.resolve(__dirname, 'src/utils'),
      },
    },
  });
};

exports.onCreateNode = ({ node, actions: { createNodeField } }) => {
  if (node.internal.type === 'kontent_item_person') {
    const hasNotes = node.elements.pinned_notes.value.length > 0;
    createNodeField({
      node,
      name: `hasNotes`,
      value: hasNotes,
    });
  }
};

exports.createPages = ({ graphql, actions: { createPage } }) => {
  return new Promise((resolve, _reject) => {
    graphql(`
      query peoplePortalList {
        allKontentItemPerson(
          filter: { elements: { list_in_portal: { value: { elemMatch: { codename: { eq: "yes" } } } } } }
        ) {
          nodes {
            elements {
              urlslug {
                value
              }
            }
            preferred_language
          }
        }
      }
    `).then(
      ({
        data: {
          allKontentItemPerson: { nodes },
        },
      }) => {
        for (const person of nodes) {
          let lang = `${person.preferred_language}/`;
          if (person.preferred_language === 'en') {
            lang = '/';
          }

          let pagePath = `${lang}employees/${person.elements.urlslug.value}`;

          createPage({
            path: pagePath,
            component: path.resolve(`./src/templates/person.js`),
            context: {
              slug: person.elements.urlslug.value,
              lang: person.preferred_language,
            },
          });
        }
        resolve();
      }
    );
  });
};
