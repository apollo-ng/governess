import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////

@Component({
  selector: 'logs-page',
  templateUrl: 'logs.html'
})

////////////////////////////////////////////////////////////////////////
//
//

export class LogsPage {

  public navCtrl: NavController;
  public view: string;
  public syslog: string;

  constructor (

    navCtrl: NavController

  ) {

    this.navCtrl = navCtrl;
    this.view = 'tasks';
    this.syslog = `
    [    6.564687] EXT4-fs (sda3): re-mounted. Opts: (null)
    [    6.756630] Adding 2097148k swap on /dev/sda2.  Priority:-1 extents:1 across:2097148k
    [    6.830405] EXT4-fs (sdc1): mounted filesystem with ordered data mode. Opts: (null)
    [    7.361130] device-mapper: ioctl: 4.34.0-ioctl (2015-10-28) initialised: dm-devel@redhat.com
    [    8.270747] EXT4-fs (dm-0): mounted filesystem with ordered data mode. Opts: (null)
    [    8.292031] SGI XFS with security attributes, no debug enabled
    [    8.294348] XFS (dm-3): Mounting V4 Filesystem
    [    8.343538] XFS (dm-3): Ending clean mount
    [    8.980856] bnx2 0000:03:00.0 enp3s0f0: using MSIX
    [    8.980894] IPv6: ADDRCONF(NETDEV_UP): enp3s0f0: link is not ready
    [    9.112389] 8021q: 802.1Q VLAN Support v1.8
    [    9.126246] IPv6: ADDRCONF(NETDEV_UP): vlan1: link is not ready
    [    9.160661] bridge: automatic filtering via arp/ip/ip6tables has been deprecated. Update your scripts to load br_netfilter if you need this.
    [    9.170321] vlan1br: port 1(vlan1) entered blocking state
    [    9.170326] vlan1br: port 1(vlan1) entered disabled state
    [    9.170402] device vlan1 entered promiscuous mode
    [    9.170404] device enp3s0f0 entered promiscuous mode
    [    9.261947] IPv6: ADDRCONF(NETDEV_UP): vlan10: link is not ready
    [    9.290936] vlan10br: port 1(vlan10) entered blocking state
    [    9.290940] vlan10br: port 1(vlan10) entered disabled state
    [    9.291012] device vlan10 entered promiscuous mode
    [    9.476492] IPv6: ADDRCONF(NETDEV_UP): vlan10br: link is not ready
    [    9.499741] device vlan10br entered promiscuous mode
    [    9.682694] IPv6: ADDRCONF(NETDEV_UP): vlan1br: link is not ready
    [    9.706244] device vlan1br entered promiscuous mode
    [   10.875730] device vlan10br left promiscuous mode
    [   12.778803] bnx2 0000:03:00.0 enp3s0f0: NIC Copper Link is Up, 1000 Mbps full duplex
    [    6.564687] EXT4-fs (sda3): re-mounted. Opts: (null)
    [    6.756630] Adding 2097148k swap on /dev/sda2.  Priority:-1 extents:1 across:2097148k
    [    6.830405] EXT4-fs (sdc1): mounted filesystem with ordered data mode. Opts: (null)
    [    7.361130] device-mapper: ioctl: 4.34.0-ioctl (2015-10-28) initialised: dm-devel@redhat.com
    [    8.270747] EXT4-fs (dm-0): mounted filesystem with ordered data mode. Opts: (null)
    [    8.292031] SGI XFS with security attributes, no debug enabled
    [    8.294348] XFS (dm-3): Mounting V4 Filesystem
    [    8.343538] XFS (dm-3): Ending clean mount
    [    8.980856] bnx2 0000:03:00.0 enp3s0f0: using MSIX
    [    8.980894] IPv6: ADDRCONF(NETDEV_UP): enp3s0f0: link is not ready
    [    9.112389] 8021q: 802.1Q VLAN Support v1.8
    [    9.126246] IPv6: ADDRCONF(NETDEV_UP): vlan1: link is not ready
    [    9.160661] bridge: automatic filtering via arp/ip/ip6tables has been deprecated. Update your scripts to load br_netfilter if you need this.
    [    9.170321] vlan1br: port 1(vlan1) entered blocking state
    [    9.170326] vlan1br: port 1(vlan1) entered disabled state
    [    9.170402] device vlan1 entered promiscuous mode
    [    9.170404] device enp3s0f0 entered promiscuous mode
    [    9.261947] IPv6: ADDRCONF(NETDEV_UP): vlan10: link is not ready
    [    9.290936] vlan10br: port 1(vlan10) entered blocking state
    [    9.290940] vlan10br: port 1(vlan10) entered disabled state
    [    9.291012] device vlan10 entered promiscuous mode
    [    9.476492] IPv6: ADDRCONF(NETDEV_UP): vlan10br: link is not ready
    [    9.499741] device vlan10br entered promiscuous mode
    [    9.682694] IPv6: ADDRCONF(NETDEV_UP): vlan1br: link is not ready
    [    9.706244] device vlan1br entered promiscuous mode
    [   10.875730] device vlan10br left promiscuous mode
    [   12.778803] bnx2 0000:03:00.0 enp3s0f0: NIC Copper Link is Up, 1000 Mbps full duplex
    `;

  }

  //////////////////////////////////////////////////////////////////////

  public openHelp(): void {
    // FIXME: Add proper help
    console.log('help tapped');
  }

  public setLogView(_view: string): void {
    this.view = _view;
  }

}
