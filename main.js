const path = require('path')
const url = require('url')
const { app, BrowserWindow, ipcMain } = require('electron')
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const PomoSetting = require('./src/models/PomoSetting');
const Task = require('./src/models/Task');
connectDB()

let mainWindow

let isDev = false

if (
	process.env.NODE_ENV !== undefined &&
	process.env.NODE_ENV === 'development'
) {
	isDev = true
}

function createMainWindow() {
	mainWindow = new BrowserWindow({
		width: 1100,
		height: 800,
		show: false,
		icon: `${__dirname}/assets/icon.png`,
		webPreferences: {
			nodeIntegration: true,
		},
	})

	let indexPath

	if (isDev && process.argv.indexOf('--noDevServer') === -1) {
		indexPath = url.format({
			protocol: 'http:',
			host: 'localhost:8080',
			pathname: 'index.html',
			slashes: true,
		})
	} else {
		indexPath = url.format({
			protocol: 'file:',
			pathname: path.join(__dirname, 'dist', 'index.html'),
			slashes: true,
		})
	}

	mainWindow.loadURL(indexPath)

	// Don't show until we are ready and loaded
	mainWindow.once('ready-to-show', () => {
		mainWindow.show()

		// Open devtools if dev
		if (isDev) {
			const {
				default: installExtension,
				REACT_DEVELOPER_TOOLS,
			} = require('electron-devtools-installer')

			installExtension(REACT_DEVELOPER_TOOLS).catch((err) =>
				console.log('Error loading React DevTools: ', err)
			)
			mainWindow.webContents.openDevTools()
		}
	})

	mainWindow.on('closed', () => (mainWindow = null))
}



app.on('ready', () => {
	createMainWindow()
})

// send tasks data to react
ipcMain.handle('tasks:load', async () => {
	try {
		const tasks = await Task.find().sort({ created: 1 });
		mainWindow.webContents.send('tasks:getAll', JSON.stringify(tasks))
	} catch (error) {
		console.log(error)
	}
})
// send setting data to react
ipcMain.handle('setting:load', async () => {
	try {
		const setting = await PomoSetting.findOne();
		mainWindow.webContents.send('setting:get', JSON.stringify(setting))
	} catch (error) {
		console.log(error)
	}
})
//handle add new Task
ipcMain.handle('tasks:add-task', async (e, newTaskData) => {
	try {
		const newTask = JSON.parse(newTaskData)
		await Task.create(newTask, (err, data) => {
			if (!err) {
				mainWindow.webContents.send('tasks:add-success', JSON.stringify(data))
			}
		})
	} catch (error) {
		console.log(error)
	}
})
//handle update task
ipcMain.handle('tasks:update-task', async (e, updatedTaskData) => {
	try {
		const updatedTask = JSON.parse(updatedTaskData)
		await Task.findByIdAndUpdate(updatedTask._id, updatedTask, (err) => {
			if (!err) {
				mainWindow.webContents.send('tasks:update-success')
			}
		})
	} catch (error) {
		console.log(error)
	}
})
//handle delete task
ipcMain.handle('tasks:delete-task', async (e, deletedTaskId) => {
	try {
		await Task.findByIdAndDelete(deletedTaskId, (err) => {
			if (!err) {
				mainWindow.webContents.send('tasks:delete-success')
			}
		})
	} catch (error) {
		console.log(error)
	}
})
//handle clear finished task
ipcMain.handle('tasks:clear-finished-task', async (e, deletedTaskId) => {
	try {
		await Task.updateMany({isCompleted: true}, {isDisplayed: false} ,(err,data) => {
			if (!err) {
				mainWindow.webContents.send('tasks:clear-finished-task-success')
			}
		})
	} catch (error) {
		console.log(error)
	}
})
//handle completed task
ipcMain.handle('tasks:completed-task', async (e, _taskId) => {
	try {
		const task = await Task.findById(_taskId)
		await Task.findByIdAndUpdate(_taskId, {
			isCompleted: !task.isCompleted
		}, (err => {
			if (!err) {
				mainWindow.webContents.send('tasks:completed-task-success')
			}
		}))
	} catch (error) {
		console.log(error)
	}
})









app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

app.on('activate', () => {
	if (mainWindow === null) {
		createMainWindow()
	}
})

// Stop error
app.allowRendererProcessReuse = true
