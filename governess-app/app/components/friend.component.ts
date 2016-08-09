import { Component,
         ViewChild,
         AfterViewInit }      from '@angular/core';
import { FriendService }      from '../providers/friend.service';

@Component({
  selector: 'my-friends',
  providers : [FriendService],
  template: `
  <h2>Hello from the {{componentName}}!</h2>
  <canvas #myCanvas width="400" height="400"></canvas>
 <div>
   <input type="range" min="1" max="400" [(ngModel)]="rectW" /><br />
   <input type="range" min="1" max="400" [(ngModel)]="rectH" /><br />
   <input type="color" [(ngModel)]="rectColor" placeholder="color" value="{{rectColor}}" />
 </div>
  <div *ngFor="let f of friends">
   <h4> Name : {{f.name}} </h4>
   <p>Age: {{f.age}}</p>
  </div>
  `
})

export class FriendComponent implements AfterViewInit {

  public componentName: string = 'FriendComponent';
  public friends: any;

  public rectW:number = 100;
  public rectH:number = 100;
  public rectColor:string = "#FF0000";
  public context: CanvasRenderingContext2D;

  @ViewChild("myCanvas") myCanvas;

  constructor(friendService: FriendService) {
    this.friends = friendService.getFriends();
  }

  ngAfterViewInit() {
    let canvas: any = this.myCanvas.nativeElement;
    this.context = canvas.getContext("2d");
    this.tick();
  }

  tick() {
    requestAnimationFrame(()=> {
      this.tick()
    });

    let ctx: any = this.context;

    ctx.save();

    ctx.clearRect(0, 0, 400, 400);
    ctx.globalAlpha = 0.8;
    ctx.fillStyle = this.rectColor;
    ctx.shadowColor = 'rgba(9,8,4,1)';
    ctx.shadowBlur = 15;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.fillRect(0, 0, this.rectW, this.rectH);
    ctx.fillRect(150, 0, this.rectW, this.rectH);

    ctx.restore();
    ctx.beginPath();
    ctx.moveTo(50, 100);
    ctx.bezierCurveTo(200, 0, 50, 125, 50, 150);
    ctx.stroke();

  }

}
