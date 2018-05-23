// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebaseConfig : {
    apiKey: "AIzaSyADGTUOXB6cWgs-zZ_njgWb5YCBNg_V-TE",
    authDomain: "postgram-4cd7f.firebaseapp.com",
    databaseURL: "https://postgram-4cd7f.firebaseio.com",
    projectId: "postgram-4cd7f",
    storageBucket: "postgram-4cd7f.appspot.com",
    messagingSenderId: "734941854768"
  }
};
