:construction: GovernessUI - Mobile-First Hybrid-Client WIP :construction:
==========

Based on Angular2/Ionic2 but since it's still early beta and many
upstream angular modules aren't yet ng2/ts ready it will only serve
as a conceptual kitchensink and client workflow optimizer while waiting
for ng2 to get more crowd support.

## Install

### Globals

    $ npm install -g cordova ionic@beta gulp karma typings

### Clone & Init Repo

    $ git clone
    $ cd governess
    $ npm install

## Run Development Server

    $ ionic serve (-l)

## Tests

Contious karma testing during develoment with watcher

    $ karma start test/karma.config.js

One-Shot test runs

    $ npm run test
    $ npm run e2e

## Bootstrapping from scratch

    $ ionic start governess sidemenu -s --v2 --ts
    $ ionic platform add android

## Support & Contact

Please use the issue tracker for governess related issues.

More info: FIXME

## License

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
