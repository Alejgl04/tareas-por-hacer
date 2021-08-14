const fs = require('fs');

const file = './db/data.json';

const saveDatabase = (data) => {
  fs.writeFileSync( file, JSON.stringify(data) );
}  

const readDatabase = () => {
  if ( !fs.existsSync( file ) ) {
    return null;
  }  
  const infoDB = fs.readFileSync( file, {encoding: 'utf-8'});
  const data = JSON.parse(infoDB);

  return data;
}


module.exports = {
  saveDatabase,
  readDatabase
}