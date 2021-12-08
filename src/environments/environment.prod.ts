export const environment = {
  production: true,
  projectName: "Dagom Online Shop",
  // url :"https://santafe-dagom.herokuapp.com/api/",
  url : "http://localhost:8000/api/",
  socket: {
    url: 'wss://dagom-notif.herokuapp.com/',
    topic: 'notification',
  }
};
