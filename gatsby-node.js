const path = require('path')
const accents = require('remove-accents')

exports.onCreateWebpackConfig = ({ actions, stage }) => {
  // enable sourcemaps on dev
  // https: //github.com/gatsbyjs/gatsby/issues/6278
  if (stage === 'develop') {
    actions.setWebpackConfig({
      devtool: 'cheap-module-source-map',
    })
  }

  actions.setWebpackConfig({
    resolve: {
      modules: [path.join(__dirname, 'src'), 'node_modules'],
      alias: {
        '~components': path.resolve(__dirname, 'src/components'),
        '~utils': path.resolve(__dirname, 'src/utils'),
      },
    },
  })
}

exports.onCreateNode = ({ node, actions: { createNodeField } }) => {
  if (node.internal.type === 'KenticoCloudItemPerson') {
    const name = node.elements.name.value.toLowerCase();
    const surname = node.elements.surname.value.toLowerCase();
    createNodeField({
      node,
      name: `slug`,
      value: accents.remove(`${name}-${surname}`)
    });
  }
}

exports.createPages = ({ graphql, actions: { createPage } }) => {
  return new Promise((resolve, _reject) => {
    graphql(`
    query peoplePortalList {
      allKenticoCloudItemPerson(filter: {elements: {list_in_portal: {value: {elemMatch: {codename: {eq: "yes"}}}}}}) {
        nodes {
          fields {
            slug
          }
        }
      }
    }`).then(({ data: { allKenticoCloudItemPerson: { nodes } } }) => {
      for (const person of nodes) {
        createPage({
          path: `employees/${person.fields.slug}`,
          component: path.resolve(`./src/templates/person.js`),
          context: {
            slug: person.fields.slug,
          },
        });
      }
      resolve();
    });
  });
};
