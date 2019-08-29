const path = require('path');

exports.onCreateWebpackConfig = ({ actions, stage }) => {
  // enable sourcemaps on dev
  // https: //github.com/gatsbyjs/gatsby/issues/6278
  if (stage === 'develop') {
    actions.setWebpackConfig({
      devtool: 'cheap-module-source-map',
    });
  }

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
  if (node.internal.type === 'KenticoCloudItemPerson') {
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
        allKenticoCloudItemPerson(
          filter: { elements: { list_in_portal: { value: { elemMatch: { codename: { eq: "yes" } } } } } }
        ) {
          nodes {
            elements {
              urlslug {
                value
              }
            }
          }
        }
      }
    `).then(({ data: { allKenticoCloudItemPerson: { nodes } } }) => {
      for (const person of nodes) {
        createPage({
          path: `employees/${person.elements.urlslug.value}`,
          component: path.resolve(`./src/templates/person.js`),
          context: {
            slug: person.elements.urlslug.value,
          },
        });
      }
      resolve();
    });
  });
};
