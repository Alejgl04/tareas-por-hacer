const Task = require('./task');

class Tasks {
  
  _listado = {};

  get listArray() {
    const theList = [];

    Object.keys(this._listado).forEach( key => {
      const homework = this._listado[key];
      theList.push(homework);
    });

    return theList;
  };


  constructor() {
    this._listado = {};
  }

  removeTask( id = '') {
    if( this._listado[id] ){
      delete this._listado[id];
    }
  }

  getManyTask( tasks = [] ) {
    tasks.forEach( task => {
      this._listado[task.id] = task;
    })
  }

  createTask( description = '') {
    const task = new Task(description);
    this._listado[task.id] = task;
  }

  listCompleted() {
    console.log();
    const list = this.listArray;
    let status = '';
    list.forEach( ( task,index ) => {
      
      const idTask = `${index + 1}`.green;
      if( task.completedOn == null ) {
        status = 'Pendiente'.red;
      }
      else {
        status = 'Completada'.green;
      }
      console.log(`${idTask}. ${task.description} :: ${status}`)
    });
  }
  
  listTaskCompleteAndPend( completed = true ) {
    const list = this.listArray;
    let index  = 0;
    list.forEach( ( task ) => {
      const status = (task.completedOn) ? 'Completada'.green : 'Pendiente'.red;

      if ( completed ) {
        if( task.completedOn ) {
          index += 1;
          console.log(`${ (index + '.').green} ${task.description} :: ${task.completedOn.green}`)
        }
      }
      else {
        if( !task.completedOn ) {
          index += 1;
          console.log(`${ (index + '.').green} ${task.description} :: ${status}`)
        } 
      }
    });
    return;

  }

  toggleTaskComplete( ids = [] ) {
    ids.forEach( id => {
      const task = this._listado[id];
      if( !task.completedOn ) {
        task.completedOn = new Date().toISOString();
      }
    });
    this.listArray.forEach( task => {
      if( !ids.includes(task.id) ){
        this._listado[task.id].completedOn = null;
      }
    });
  }
}


module.exports = Tasks;
