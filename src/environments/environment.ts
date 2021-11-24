// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  projectName : "Dagom local",
<<<<<<< HEAD
  // url : "http://santafe-dagom.herokuapp.com/api/"
  // url  : "https://santafe-dagom.herokuapp.com/"
  url: "http://localhost:8000/api/"
=======
//   url : "http://localhost:8000/api/",
  url  : "https://santafe-dagom.herokuapp.com/api/",
  socket: {
    url: 'http://dagom-notif.herokuapp.com/',
    topic: 'notification',
  }
>>>>>>> ae82de35862c072e822193cea5b5733f92d861fa
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
