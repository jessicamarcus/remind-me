# Remind Me

Experimental offline-first [Progressive Web App](https://developers.google.com/web/progressive-web-apps/) which will allow you to send your future self quick reminders. Add your text, select when you'd like to be reminded, and your reminder will pop up as a notification on your device at that time.


### Major libraries
* [React 16.2.x](https://reactjs.org/)
* [Webpack 4.1.x](https://webpack.js.org/)
* [Workbox 2.1.x](https://developers.google.com/web/tools/workbox/)

### Browser requirements
* [Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
* [Notifications API](https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API)

_see [https://jakearchibald.github.io/isserviceworkerready/](https://jakearchibald.github.io/isserviceworkerready/)_


## Development
1. clone or fork this project 
2. run `npm install`
3. run `npm run develop` which will start Webpack in watch mode, and will also start up a server at [http://localhost:5555/](http://localhost:5555/) _note: HTTPS is a PWA requirement, except when developing locally_

⚠ [webpack-dev-server](https://github.com/webpack/webpack-dev-server) + [workbox-sw](https://www.npmjs.com/package/workbox-sw) were not playing nicely together, which is why [http-server](https://www.npmjs.com/package/http-server) is being used in that task for now.

### Code style

#### CSS
Sass/SCSS. [Autoprefixer](https://github.com/postcss/autoprefixer/) is in the build pipeline, so there is no need to use vendor prefixes.

#### js/JSX/React
More or less follows [Airbnb's](https://github.com/airbnb/javascript/tree/master/react/) style guide. See [.eslintrc](.eslintrc) for details.

ESLint plugins: 
* [https://github.com/yannickcr/eslint-plugin-react/](https://github.com/yannickcr/eslint-plugin-react/)
* [https://github.com/evcohen/eslint-plugin-jsx-a11y/](https://github.com/evcohen/eslint-plugin-jsx-a11y/)



### todo
* http => https redirect
* waiting/confirmation state after sw receives message
* add "snooze" functionality to notifications
* app banner install
* revisit WDS+workbox
* test all the things
