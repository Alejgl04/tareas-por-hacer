const { v4: uuidv4 } = require('uuid');

class Task {
  id = '';
  description = '';
  completedOn = null;

  constructor( description ) {
    this.id = uuidv4();
    this.description = description;
    this.completedOn = null;
  }
}


module.exports = Task;