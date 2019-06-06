# xthon-core library

Vue-powered standalone and library that can be used to power sites like Volunteerathon, GiveItUpForGood, RideForGood, etc. 

## Guidelines for development

[Please refer to the *wiki* tab on this repository](https://github.com/dailysourceorg/xthon-core/wiki) to see the general guidelines for developing components on this repository.

## Tag version

If there are changes to the package.json file in the library, these need to be reflected in the parent. Bump the version in the library following (https://semver.org/)[https://semver.org/] guidelines, commit and push to the remote. After that, create a tag and push it to the remote:
```
git tag -a v0.0.25
git push origin v.0.0.25
```

Then, update the library version in the container's package.json file to reflect that exact version:
```
"xthon-core": "github:dailysourceorg/xthon-core#0.0.25"
```

Note: ensure to commit the changes here in the library before commiting the changes to the main repository (or container), and also update (bump) the library version.


## Build Setup

**Requires Node.js 9+**


``` bash
# install dependencies
npm install # or yarn

# serve in dev mode, with hot reload at localhost:8080
# this will also start a fake json server at localhost:8080/api serving static assets at localhost:8080/static
npm run dev

# serve in production mode
npm start
```


## Tests

``` bash
# run test suite
yarn test
```

## Linting

``` bash
# run test suite
yarn lint
```

## .env variables

Add a .env file with the following entries:

``` javascript
IRS_SEARCH_API_URL='https://irs-eomf-search-api.herokuapp.com/v1'
BASE_API='http://localhost:1437/v1'
CMS_API='http://localhost:8080/api'
FB_APP_ID='542100222812055'
COMMENT_API='https://wt-9c78551d704acfbbfbeb0bb6cca86e9a-0.sandbox.auth0-extend.com/volunteerathon-comment'
```

*Please have a look at the .env.example file for a complete list of env vars*

The `IRS_SEARCH_API_URL` constant is needed by the NonprofitAjaxSearch component and by the nonprofit view to pull information from non-claimed nonrpofits, i.e., nonprofits that are not yet in the database but that do exists in the IRS database.

## Inspiration

The skeleton was built using a combination of these two templates:
- [vue-hackernews-2.0](https://github.com/vuejs/vue-hackernews-2.0)
- [vue-webpack-ssr-fully-featured](https://github.com/crisbal/vue-webpack-ssr-fully-featured/tree/master/test/unit/specs)

and also uses the following plugins or forks of them:
- [vue-meta](https://github.com/declandewet/vue-meta)
- [vue-flickity](https://github.com/drewjbartlett/vue-flickity)
- [v-lazy-image](https://github.com/alexjoverm/v-lazy-image)
- [vue-select](https://github.com/sagalbot/vue-select)

and the selection of icons is taken from [Material Design icons](https://materialdesignicons.com)

## License

MIT
