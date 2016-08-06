governess-app
==========

:construction: WIP (Work In Progress) :construction:

Multi-Platform Hybrid-Client to monitor and control governess, based on
Angular2/Ionic2. Since it's still early beta and many upstream angular
modules aren't yet ng2/ts ready, it will serve as angular2/ionic learning
ground, conceptual kitchen-sink and client workflow optimizer while waiting
for ng2 release to settle for now. Many features have already been mocked
and are currently in the process of implementation.

## Available Platforms

### Web

Client delivered to any modern HTML5 browser by governess-server.

### Mobile - Ionic2 build/bundle

  * Android 5.0+
  * IOS (not tested due to IP restrictions)

### Desktop - Electron build/bundle

  * GNU/Linux (x86_64)
  * Windows (not tested due to IP restrictions)
  * MacOSX (not tested due to IP restrictions)

## Full Developer Installation

The next steps are required to get a full Ionic2 development environment
in order to be able to fix, extend and coherently test the client.

### System-Requirements

Known to work NodeJS & NPM versions:

  * NodeJS
    * 4.4.1 (tested with gentoo-portage stable)
  * NPM
    * 2.15.6 (tested with gentoo-portage stable)

### Global NodeJS-Requirements

    $ npm install -g cordova ionic@beta gulp karma typings

### Cloning the Repo

    $ git clone https://github.com/apollo-ng/governess.git
    $ cd governess/governess-app

### Bootstrapping

    $ npm install

This can take a while (5-15 minutes), depending on your available internet
connection bandwidth and your host's compiling performance.

## Development with live reload



### Start local server

    $ ionic serve (-l)

### Run in electron wrapper

    $ npm electron

### Run on android via ADB

    $ ionic run android

## Tests

spec tests with phantomjs are horribly broken at the moment
since it seems to have problems with the chart and most of all
the sqlstorage subsystem. e2e tests have been extended to cope,
since they run in chromium and have no issues with both.

### Continuous karma testing during develoment with watcher

    $ karma start tests/karma.config.js

### One-Shot test runs

    $ npm run test
    $ npm run e2e

## Building

### android

    $ ionic build android

### electron

    $ npm electron-package


## Bootstrapping from scratch

    $ ionic start governess-app sidemenu -s --v2 --ts
    $ ionic platform add android

## Support & Contact

Please use the [issue tracker](https://github.com/apollo-ng/governess/issues)
for governess related issues.

Join #apollo on freenode.
