const inquirer = require('inquirer');
require('colors');

const questions = [
	{
		type: 'list',
		name: 'opcion',
		message: '¿Qué desea hacer?',
		choices: [
			{
				value: '1',
				name: `${'1'.green}. Crear Lista`
			},
			{
				value: '2',
				name: `${'2'.green}. Listar Tareas`
			},
			{
				value: '3',
				name: `${'3'.green}. Listar Tareas Completadas`
			},
			{
				value: '4',
				name: `${'4'.green}. Listar Tareas Pendientes`
			},
			{
				value: '5',
				name: `${'5'.green}. Completar Tarea(s)`
			},
			{
				value: '6',
				name: `${'6'.green}. Borrar Tarea(s)`
			},
			{
				value: '0',
				name: `${'0'.green}. Salir`
			},
		]
	}
];

const inquirerMenu = async () => {
	console.clear();
	console.log('==========================='.green);
	console.log('  Seleccione una opción '.white);
	console.log('===========================\n'.green);

	const { opcion } = await inquirer.prompt(questions);

	return opcion;
}

const stopApp = async () => {

	const question = [
		{
			type: 'input',
			name: 'enter',
			message: `Presione ${'enter'.green} para continuar`
		}
	];
	console.log('\n');
	await inquirer.prompt(question);

};

const readInput = async (message) => {
	const question = [
		{
			type: 'input',
			name: 'desc',
			message,
			validate(value) {
				if (value.length === 0) {
					return 'Por favor ingrese un valor';
				}
				return true
			}
		}
	];
	const { desc } = await inquirer.prompt(question);
	return desc;
}

const listTaskRemove = async ( task = [] ) => {
	const choices = task.map( (task, i) => {
		const index = `${i + 1}`.green;

		return {
			value: task.id,
			name: `${ index }. ${task.description}`
		}
	});
	choices.unshift({
		value: '0',
		name: '0.'.green + ' Cancelar'
	});

	const questions = [
		{
			type: 'list',
			name: 'id',
			message: 'Borrar',
			choices
		}
	];
	const { id } = await inquirer.prompt(questions);
	return id;
}

const confirmRemove = async( message ) => {
	const question = [
		{
			type: 'confirm',
			name: 'ok',
			message
		}
	]
	const { ok } = await inquirer.prompt(question);
	return ok;
}

const showwListCheck = async ( task = [] ) => {
	const choices = task.map( (task, i) => {
		const index = `${i + 1}`.green;

		return {
			value: task.id,
			name: `${ index }. ${task.description}`,
			checked: ( task.completedOn) ? true : false
		}

	});

	const question = [
		{
			type: 'checkbox',
			name: 'ids',
			message: 'Seleccione',
			choices
		}
	];
	const { ids } = await inquirer.prompt(question);
	return ids;
}

module.exports = {
	inquirerMenu,
	stopApp,
	readInput,
	listTaskRemove,
	confirmRemove,
	showwListCheck
}