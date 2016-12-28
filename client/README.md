governess-app
=============

Multi-Platform Hybrid-Client to monitor and control governess,
based on Angular2/Ionic2. Since Ionic2 is still early RC and many
upstream angular modules aren't yet ng2/ts ready, it serves as
learning ground, conceptual kitchen-sink and client work-flow
optimizer while waiting for ng2/ionic2 release to settle a little
more. Many features have already been mocked and are currently in
the process of implementation.

Available Platforms
-------------------

### Browser

  * HTML5/Progressive Web-client - working
  * Delivered by governess-server to any modern browser on any platform

### Mobile - Ionic2 build/bundle

  * Android 5.0+ - working
  * IOS - not built/tested due to IP restrictions

### Desktop - Electron build/bundle

  * GNU/Linux (x86_64) - working
  * Windows - not built/tested due to IP restrictions
  * MacOSX - not built/tested due to IP restrictions

----
Full Developer Installation
---------------------------

The next steps are required to get a full Ionic2 Development-,
Build- and Testing-environment to fix, extend and coherently
test the client.

### System-Requirements

#### NodeJS

Known to work NodeJS & NPM versions:

  * NodeJS
    * \>= 4.4.1 (tested with gentoo-portage stable)
  * NPM
    * \>= 3.10.5 (tested with gentoo-portage stable + npm update)

#### Global NPM Requirements

    $ npm install -g cordova ionic

#### Android SDK

In order to build apks, the Android-SDK has to be installed.

##### Gentoo

    $ emerge -av dev-util/android-sdk-update-manager dev-util/android-tools

##### Ubuntu

    $ FIXME

### Cloning the Repo

    $ git clone https://github.com/apollo-ng/governess.git

### Bootstrapping

Install the rest of the frameworks and components which
are needed for developing, building and testing:

    $ cd governess/client
    $ npm install

It may take a while (5-15 minutes), depending on available
Internet connection bandwidth and host's compiling performance.

----
Development with live reload
-------------------------------

### Start local server

    $ ionic serve (-l)

### Run in Browser

Open http://localhost:8100

### Run on Android via ADB

Connect an Android phone via USB and make sure ADB is enabled on the phone.

    $ ionic run android

If no phone is connected, it will try to fall back to device emulation. For
device emulation to work, an AVD (Android Virtual Device) must be created
with the Android-SDK tools first. The following have been successfully tested
as AVD system images:

  * API23 ARM EABI v7a System Image (painfully slow)
  * API23 Intel x86 Atom_64 System Image (slow)

### Run in Electron wrapper

    $ npm run electron

----
Tests
--------

### Unit testing

Unit testing is still not yet available again.

### E2E testing

End-to-End tests are available and configured in client/tests/e2e/.
This is also where the report and automated screenshots can be found.

    $ npm run e2e

----
Building
--------

Compiled production code is located below client/platforms/

### Browser

    $ ionic build browser

### Android

AoT release build with an optimized APK:

    $ ionic build android --prod --release

### Electron

#### Linux

    $ npm run electron-dist-linux-x64

#### Windows

Building for Windows requires the following packages:

  * Wine-1.8+
  * Mono-4.2+

#### MacOSX

MacOS Code Signing works only on MacOS,
[cannot be fixed](http://http://stackoverflow.com/questions/11736368/how-to-sign-a-mac-os-x-application-in-linux/12156576#12156576)


#### Other OS

  * Not available/tested yet

----
Bootstrapping from scratch
--------------------------

For reference and to compare to new ionic2 releases,
this is the basis on which the app was started on:

    $ ionic start governess-app sidemenu -s --v2 --ts
    $ ionic platform add android
    $ ionic platform add browser
