export let lineChartGlobals: any = {
  animation: false,
  responsive: true,
  bezierCurve : false,
  maintainAspectRatio: false,
  legend: { display: false },
  tooltips: { enabled: false },
  scales: {
    xAxes: [
      {
        type: 'linear',
        position: 'bottom',
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
          maxTicksLimit: 2,
        },
      },
    ],
  },
};