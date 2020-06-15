# Material UI Paperbase Starter for Gatsby with Kentico Kontent 🔥

[![Netlify Status](https://api.netlify.com/api/v1/badges/b65b72e0-1499-415f-83c1-69cc9579d94e/deploy-status)](https://app.netlify.com/sites/kontent-sample-app-gatsby-intranet/deploys)
[![Live demo](https://img.shields.io/badge/-Live%20Demo-brightgreen.svg)](https://kontent-sample-app-gatsby-intranet.netlify.com)

Create dashboards and administration tools in Gastby using [Material UI's](https://material-ui.com/) [Paperbase Premium Theme](https://github.com/mui-org/material-ui/tree/master/docs/src/pages/premium-themes/paperbase) and [Kentico Kontent](http://kontent.ai).

![template preview](/template.jpg)

## 🚀 Quick start

1. **Start developing.**

    Navigate into your new site’s directory and start it up.

    ```sh
    cd kontent-sample-app-gatsby-intranet
    npm install # in case you haven't used gatsby-cli `gatsby new` command to initialize the starter
    gatsby develop
    ```

1. **Open the source code and start editing!**

    Your site is now running at `http://localhost:8000`!

    _Note: You'll also see a second link: _`http://localhost:8000/___graphql`_. This is a tool you can use to experiment with querying your data. Learn more about using this tool in the [Gatsby tutorial](https://www.gatsbyjs.org/tutorial/part-five/#introducing-graphiql)._

    Open the `kontent-sample-app-gatsby-intranet` directory in your code editor of choice and edit `src/pages/index.js`. Save your changes and the browser will update in real time!

## Create content source

1. Go to [app.kontent.ai](https://app.kontent.ai) and [create empty project](https://docs.kontent.ai/tutorials/set-up-kontent/projects/manage-projects#a-creating-projects)
1. Go to "Project Settings", select API keys and copy
    + Project ID
    + Management API key **require Business tier or higher or Trial account**
1. Install [Kontent Backup Manager](https://github.com/Kentico/kontent-backup-manager-js) and import data to newly created project from [`kontent-backup.zip`](./kontent-backup.zip) file (place appropriate values for `apiKey` and `projectId` arguments):

    ```sh
    npm i -g @kentico/kontent-backup-manager

    kbm --action=restore --apiKey=<Management API key> --projectId=<Project ID> --zipFilename=kontent-backup
    ```

    > Alternatively, you can use the [Template Manager UI](https://kentico.github.io/kontent-template-manager/import-from-file) for importing the content.

1. Go to your Kontent project and [publish all the imported items](https://docs.kontent.ai/tutorials/write-and-collaborate/publish-your-work/publish-content-items).

### Join codebase and content data

Copy [`.env.template`](`./.env.template`) and name it `.env` then set the `KONTENT_PROJECT_ID` environment variable to value from Kontent -> "Project Settings" -> API keys -> Project ID.

**You are now ready to use the site as your own!**

## Deploy with Netlify

Netlify CMS can run in any frontend web environment, but the quickest way to try it out is by running it on a pre-configured starter site with Netlify. Use the button below to build and deploy your own copy of the repository:

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/Kentico/kontent-sample-blog-travel-vue)

 After clicking that button, you’ll authenticate with GitHub and choose a repository name. Netlify will then automatically create a repository in your GitHub account with a copy of the files from the template. Next, it will build and deploy the new site on Netlify, bringing you to the site dashboard when the build is complete. Next, you’ll need to set up Netlify’s Identity service to authorize users to log in to the CMS.

> Netlify is using [file-based configuration](https://docs.netlify.com/configure-builds/file-based-configuration/). That meant it presets your configuration based on the [.netlify.toml](./.netlify.toml). That includes environment variables. If you want to use your custom project, set the `KONTENT_PROJECT_ID` to you projects ([Join codebase and content data](#Join-codebase-and-content-data)).
