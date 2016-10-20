import { Component}             from '@angular/core';
import { NgClass }              from '@angular/common';
import { ActionSheetController,
         ModalController,
         ViewController,
         NavController }        from 'ionic-angular';

import { ConfigService }        from '../../providers/config/config';
import { TaskService }          from '../../providers/tasks/tasks';
import { StatusService }        from '../../providers/status/status';

import { TaskDetailPage }       from '../tasks/task.detail';

////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////

@Component({
  selector: 'control-page',
  templateUrl: 'control.html'
})

////////////////////////////////////////////////////////////////////////
//
//

export class ControlPage {

  public navCtrl: NavController;
  public modalCtrl: ModalController;

  public configService: ConfigService;
  public config: any;

  public taskService: TaskService;
  public tasks: any;

  public statusService: StatusService;
  public status: any;
  private statusSub: any;

  //////////////////////////////////////////////////////////////////////

  constructor (

    navCtrl: NavController,
    modalCtrl: ModalController,
    configService: ConfigService,
    taskService: TaskService,
    statusService: StatusService

  ) {

    this.navCtrl = navCtrl;
    this.modalCtrl = modalCtrl;

    this.configService = configService;
    this.config = {};
    //this.config = this.configService.get();

    this.taskService = taskService;
    this.tasks = this.taskService.get();

    this.statusService = statusService;
    this.status = {
      status: 'offline',
      temperature: '-',
      temperature_major: '0',
      temperature_minor: '0'
    };

    this.init().then(data => {
      console.log('I seem to be needed to get the promise')
    });

  }

  //////////////////////////////////////////////////////////////////////

  public init(): Promise<void> {
    return this.configService.get().then((data: string) => {
      //console.log('settings ngoninit configdata', data);
      this.config = JSON.parse(data);
      //console.log(this.config);
    });
  }

  public ionViewWillEnter(): void {
    console.log('ControlPage ionViewWillEnter called');
    this.statusSub = this.statusService.socketData().subscribe((result) => {
      this.status = JSON.parse(result.data);

      // Split Temperature and hack the ghost zero - wtf??
      let temp: Array<any> = this.status.temperature.toString().split('.');
      this.status.temperature_major = temp[0];
      if (temp[1] > 1) {
        this.status.temperature_minor = temp[1];
      } else {
        this.status.temperature_minor = "0";
      }
      //console.log('GIS:', this.status);
    });
  }

  public ionViewDidLoad(): void {
    console.log('ControlPage ionViewDidLoad called');
  }

  public ionViewWillLeave(): void {
    console.log('ControlPage ionViewWillLeave called');
    this.statusSub.unsubscribe();
    //this.statusService.disconnect();
  }

  public openHelp(): void {
    let modal: any = this.modalCtrl.create(HelpModal);
    modal.present(modal);
  };

  public lineChartData: Array<any> = [
    { data: [65, 59, 80, 81, 56, 55, 40],
      label: 'Series A',
      lineTension: 0,
      yAxisID: 'y-axis-1' },
    { data: [28, 48, 40, 19, 86, 27, 90],
      label: 'Series B',
      lineTension: 0,
      yAxisID: 'y-axis-1' },
    { data: [18, 48, 77, 9, 100, 27, 40],
      label: 'Series C',
      lineTension: 0,
      yAxisID: 'y-axis-2' },
  ];

  public lineChartLabels: Array<any> = [
    new Date(1466888585 * 1000).toISOString(),
    new Date(1466888590 * 1000).toISOString(),
    new Date(1466888595 * 1000).toISOString(),
    new Date(1466888600 * 1000).toISOString(),
    new Date(1466888605 * 1000).toISOString(),
    new Date(1466888610 * 1000).toISOString(),
    new Date(1466888615 * 1000).toISOString(),
  ];

  public lineChartOptions: any = {
    animation: false,
    responsive: true,
    maintainAspectRatio: false,
    legend: { display: false },
    scales: {
      xAxes: [
        {
          type: 'time',
          time: {
            unit: 'second',
            unitStepSize: 5,
            displayFormats: {
              second: 'ss',
            },
          },
          gridLines: {
            color: 'rgba(255,255,255,0.15)',
            drawTicks: false,
          },
          ticks: {
            beginAtZero: false,
            fontColor: '#d8d3c5',
            fontFamily: 'DIN',
          },
        },
      ],
      yAxes: [
        {
          id: 'y-axis-1',
          type: 'linear',
          position: 'left',
          gridLines: {
            color: 'rgba(255,255,255,0.15)',
            drawTicks: false,
          },
          ticks: {
            beginAtZero: false,
            fontColor: '#d8d3c5',
            fontFamily: 'DIN',
            maxTicksLimit: 8,
          },
        },
        {
          id: 'y-axis-2',
          type: 'linear',
          position: 'right',
          gridLines: {
            color: 'rgba(255,255,255,0.15)',
            drawTicks: false,
          },
          ticks: {
            beginAtZero: false,
            fontColor: '#d8d3c5',
            fontFamily: 'DIN',
            maxTicksLimit: 8,
          },
        },
      ],
    },
  };

  public lineChartColours: Array<any> = [
    {
      backgroundColor: 'rgba(255, 152, 0, 0.15)',
      borderColor: 'rgb(255, 152, 0)',
      borderWidth: 2,
      pointRadius: '3',
      pointBorderWidth: '2',
      pointBackgroundColor: '#fff',
      pointBorderColor: 'rgb(255, 152, 0)',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)',
    },
    {
      backgroundColor: 'rgba(162, 48, 22, 0.15)',
      borderColor: 'rgb(162, 48, 22)',
      borderWidth: 2,
      pointRadius: '3',
      pointBorderWidth: '2',
      pointBackgroundColor: '#fff',
      pointBorderColor:  'rgb(162, 48, 22)',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)',
    },
    {
      backgroundColor: 'rgba(109, 128, 6, 0.15)',
      borderColor: 'rgb(109, 128, 6)',
      borderWidth: 2,
      pointRadius: '3',
      pointBorderWidth: '2',
      pointBackgroundColor: '#fff',
      pointBorderColor: 'rgb(109, 128, 6)',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)',
    },
  ];

  public lineChartType: string = 'line';

  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  public playSound(file: string): void {
    let audio: any = new Audio();
    audio.src = 'assets/audio/' + file;
    audio.load();
    audio.play();
  }

  public setMode(mode: string): void {
    this.config.ctrlMode = mode;
    this.configService.update(this.config);
  }

  public editTask(): void {

    let activeTask: any = this.tasks.filter(
      task => task.name.includes(this.config.taskActive)
    )[0];

    if (activeTask) this.navCtrl.push(TaskDetailPage, activeTask);

  }

  public startTask(): void {
    if (this.config.audio) this.playSound('run.mp3');
    console.log('Start Task');
    this.status = 'running';
  }

  public pauseTask(): void {
    if (this.config.audio) this.playSound('float.mp3');
    console.log('Pause Task');
    this.status = 'paused';
  }

  public restartTask(): void {
    if (this.config.audio) this.playSound('float.mp3');
    console.log('Restart Task');
    this.status = 'running';
  }

  public stopTask(): void {
    if (this.config.audio) this.playSound('stop.mp3');
    console.log('Stop Task');
    this.status = 'idle';
  }

}

////////////////////////////////////////////////////////////////////////
// Help
////////////////////////////////////////////////////////////////////////

@Component({
  templateUrl: 'control.help.html',
})

class HelpModal {

  private viewCtrl: ViewController;

  constructor( viewCtrl: ViewController ) {
    this.viewCtrl = viewCtrl;
  }

  private dismissModal(): void {
    this.viewCtrl.dismiss();
  }
}
