 governess-app
==========

:construction: Mobile-First Hybrid-Client WIP :construction:

Based on Angular2/Ionic2, but since it's still early beta and many
upstream angular modules aren't yet ng2/ts ready, it will serve
as angular2/ionic learning ground, conceptual kitchensink and client
workflow optimizer while waiting for ng2 release to settle for now.

Many features have already been mocked and are currently in the
process of implementation.

## Install

### Globals

    $ npm install -g cordova ionic@beta gulp karma typings

### Clone & Init Repo

    $ git clone https://github.com/apollo-ng/governess.git
    $ cd governess/governess-app
    $ npm install

## Run Development Server

    $ ionic serve (-l)

## Tests

spec tests with phantomjs are horribly broken at the moment
since it seems to have problems with the chart and most of all
the sqlstorage subsystem. e2e tests have been extended to cope,
since they run in chromium and have no issues with both.

### Continuous karma testing during develoment with watcher

    $ karma start test/karma.config.js

### One-Shot test runs

    $ npm run test
    $ npm run e2e

## Bootstrapping from scratch

    $ ionic start governess sidemenu -s --v2 --ts
    $ ionic platform add android

## Support & Contact

Please use the [issue tracker](https://github.com/apollo-ng/governess/issues)
for governess related issues.

Join #apollo on freenode.
