
require('colors');
const { inquirerMenu, stopApp, readInput, listTaskRemove, confirmRemove, showwListCheck } = require('./helpers/inquirer');
const { saveDatabase, readDatabase } = require('./helpers/save-file');
const Tasks = require('./models/tasks');

console.clear();

const main = async () => {

	let opt = '';
	const theTask = new Tasks();
	const taskDb = readDatabase();
	if ( taskDb ) {
		theTask.getManyTask( taskDb );
	}

	do {
		opt = await inquirerMenu();

		switch (opt) {
			case '1':
				const description = await readInput('Decripción:');
				theTask.createTask(description)
				break;
			case '2':
				theTask.listCompleted();
				break;
			case '3':
				theTask.listTaskCompleteAndPend( true );
				break;
			case '4':
				theTask.listTaskCompleteAndPend( false );
				break;
			case '5':
				const ids = await showwListCheck( theTask.listArray );
				theTask.toggleTaskComplete( ids );
				break;
			case '6':
				const id = await listTaskRemove( theTask.listArray );
				if( id !== '0' ){
					const confirm = await confirmRemove( '¿Está seguro?' );
					if( confirm ){
						theTask.removeTask( id );
						console.log('Tarea Borrada');
					}
				}
				break;
		}

		saveDatabase( theTask.listArray );

		await stopApp();

	} while (opt !== '0');

}

main();