governess
==========

A modular stack to create, manage and share software defined appliances (SDA)
with ease. governess can be deployed on platforms like the Raspberry Pi or the
Odroid family (more to come) and use cheaply available PCB Break-out boards to
create any kind of DIY appliance. From there, governess serves as an autonomous
bot, watching over the appliance and running tasks from schedules, RPC or users.

Client
------

Multi-Platform Hybrid-Client to monitor and control governess,
based on Angular2/Ionic2.

Server
------

Backend communication/storage/task-runner

Still unclear whether Python/RPi.GPIO 3.5 (asyncio) or, for ease of deployment,
selecting go as server language. Go is undoubtedly way easier to package and
deploy but there would be far less ready to go hardware driver implementations.


Support & Contact
-----------------

### Issues

Please use the [issue tracker](https://github.com/apollo-ng/governess/issues)
for governess related issues.

### IRC

Join #apollo on freenode.

License
-------

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
