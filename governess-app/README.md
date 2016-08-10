governess-app
==========

:construction: WIP (Work In Progress) :construction:

Multi-Platform Hybrid-Client to monitor and control governess,
based on Angular2/Ionic2. Since it's still early beta and many
upstream angular modules aren't yet ng2/ts ready, it will serve
as angular2/ionic learning ground, conceptual kitchen-sink and
client work-flow optimizer while waiting for ng2 release to
settle for now. Many features have already been mocked and are
currently in the process of implementation.

## Available Platforms

### Web

HTML5 Web-client delivered by governess-server to any modern
browser on any platform.

### Mobile - Ionic2 build/bundle

  * Android 5.0+
  * IOS (not tested due to IP restrictions)

### Desktop - Electron build/bundle

  * GNU/Linux (x86_64)
  * Windows (not tested due to IP restrictions)
  * MacOSX (not tested due to IP restrictions)

## Full Developer Installation

The next steps are required to get a full Ionic2 development-,
build- and testing-environment in order to be able to fix,
extend and coherently test the client.

### System-Requirements

Known to work NodeJS & NPM versions:

  * NodeJS
    * 4.4.1 (tested with gentoo-portage stable)
    * 4.4.6 (tested with gentoo-portage stable)
  * NPM
    * 2.15.6 (tested with gentoo-portage stable)
    * 3.10.5 (tested with gentoo-portage stable + npm update)

### Global NodeJS-Requirements

    $ npm install -g cordova ionic@beta

### Cloning the Repo

    $ git clone https://github.com/apollo-ng/governess.git

### Bootstrapping

    $ cd governess/governess-app
    $ npm install

This will install the rest of the frameworks and components which
are needed for developing, building and testing. It may take a
while (5-15 minutes), depending on your available internet
connection bandwidth and your host's compiling performance.

## Development with live reload

### Start local server

    $ ionic serve (-l)

### Run in Electron wrapper

    $ npm run electron

### Run on Android via ADB

    $ ionic run android

## Tests

Unit-Tests with Karma/PhantomJS are available again but the
coverage is still bad. E2E tests have been extended to cope,
since they run in chromium and require less effort to build.

### One-Shot Unit-Test

    $ npm run test

### One-Shot End-to-End Test

    $ npm run e2e

### Continuous karma testing during development with watcher

    $ karma start tests/karma.config.js

## Building

### Android

    $ ionic build android

### Electron

    $ ionic build browser

#### Linux

    $ npm run electron dist-linux-x64

## Bootstrapping from scratch

    $ ionic start governess-app sidemenu -s --v2 --ts
    $ ionic platform add android

## Support & Contact

Please use the [issue tracker](https://github.com/apollo-ng/governess/issues)
for governess related issues.

Join #apollo on freenode.
