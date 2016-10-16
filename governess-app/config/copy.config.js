module.exports = {
  include: [
    {
      src: 'src/assets/',
      dest: 'www/assets/'
    },
    {
      src: 'src/index.html',
      dest: 'www/index.html'
    },
    {
      src: 'src/service-worker.js',
      dest: 'www/service-worker.js'
    },
    {
      src: 'node_modules/ionic-angular/polyfills/polyfills.js',
      dest: 'www/build/polyfills.js'
    },
    {
      src: 'node_modules/ionicons/dist/fonts/',
      dest: 'www/assets/fonts/'
    },
    {
      src: 'node_modules/chart.js/dist/Chart.bundle.min.js',
      dest: 'www/build/chart.js'
    },
  ]
};
