export const settings = {
  port: process.env.PORT || 3000,
  database: {
    connection: {
      dbpath: 'src-electron/database/example.db',
    },
    buildNumber: '1',
  },
  workingfolder: {
    dbc: 'dbc',
  },
};
