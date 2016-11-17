governess-app
==========

:construction: WIP (Work In Progress) :construction:

Multi-Platform Hybrid-Client to monitor and control governess,
based on Angular2/Ionic2. Since it's still early RC and many
upstream angular modules aren't yet ng2/ts ready, it will serve
as angular2/ionic learning ground, conceptual kitchen-sink and
client work-flow optimizer while waiting for ng2/ionic2 release
to settle for now. Many features have already been mocked and
are currently in the process of implementation.

## Available Platforms

### Browser

HTML5/Progressive Web-client delivered by governess-server to
any modern browser on any platform.

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
    * \>= 4.4.1 (tested with gentoo-portage stable)
  * NPM
    * \>= 3.10.5 (tested with gentoo-portage stable + npm update)

### Global NodeJS-Requirements

    $ npm install -g cordova ionic

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

### Run in Browser

Open http://localhost:8100

### Run on Android via ADB

    $ ionic run android

### Run in Electron wrapper

    $ npm run electron

## Tests

### Unit testing

Unit testing is still not yet available again.

### E2E testing

End-to-End tests are available and configured in governess-app/tests/e2e.
This is also where the report and automated screenshots can be found.

    $ npm run e2e

## Building

Compiled production code is located below governess-app/platforms

### Browser

    $ ionic build browser

### Android

    $ ionic build android

### Electron

#### Linux

    $ npm run electron-dist-linux-x64

#### Other OS

Not available/tested yet.

## Bootstrapping from scratch

    $ ionic start governess-app sidemenu -s --v2 --ts
    $ ionic platform add android

## Support & Contact

Please use the [issue tracker](https://github.com/apollo-ng/governess/issues)
for governess related issues.

### IRC

Join #apollo on freenode.
