const path = require('path')
const url = require('url')
const { app, BrowserWindow, ipcMain } = require('electron')
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const PomoSetting = require('./src/models/PomoSetting');
const Task = require('./src/models/Task');
const User = require('./src/models/User');
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
ipcMain.handle('tasks:load', async (e, userData) => {
	try {
		const user = JSON.parse(userData)
		if (!user._id) {
			// console.log("NoID",userData)

		} else {
			//find user in db and tasks of user
			const gettingUser = await User.findById(user._id);
			gettingUser.populate('tasks')
				.execPopulate()
				.then(userData => {
					mainWindow.webContents.send('tasks:getAll', JSON.stringify(userData.tasks))
				})
				.catch(err => {
					console.log(err);
				})
		}

	} catch (error) {
		console.log(error)
	}
})
// send setting data to react
ipcMain.handle('setting:load', async (e, userData) => {
	try {
		const user = JSON.parse(userData)
		if (!user._id) {
			//default setting
		} else {
			const gettingUser = await User.findById(user._id);

			const setting = await PomoSetting.findById(gettingUser.setting);
			mainWindow.webContents.send('setting:get', JSON.stringify(setting))
		}
	} catch (error) {
		console.log(error)
	}
})
// handle update setting request
ipcMain.handle('setting:update', async (e, data) => {
	try {
		data = JSON.parse(data)
		if (!data.user._id) {
			//default setting
		} else {
			const gettingUser = await User.findById(data.user._id);
			PomoSetting.findByIdAndUpdate(gettingUser.setting, data.pomodoroSetting, (err, res) => {
				mainWindow.webContents.send('setting:update-success')
			})

		}
	} catch (error) {
		console.log(error)
	}
})

//handle add new Task
ipcMain.handle('tasks:add-task', async (e, data) => {
	try {
		data = JSON.parse(data)
		if (!data.user._id) {
			//if doesn't login

		} else {
			//if logined
			const gettingUser = await User.findById(data.user._id);
			await Task.create(data.addingTask, (err, args) => {
				if (!err) {
					gettingUser.addTask(args._id).then(() => {
						mainWindow.webContents.send('tasks:add-success', JSON.stringify(args))
					}).catch(error => {
						console.log(error)
					})
				}
			})
		}

	} catch (error) {
		console.log(error)
	}
})
//handle update task
ipcMain.handle('tasks:update-task', async (e, data) => {
	try {
		data = JSON.parse(data)
		if (!data.user._id) {
			//if doesn't login
			// mainWindow.webContents.send('tasks-localstorage:update')
		} else {
			//if logined
			const updatedTask = data.updatedTask
			await Task.findByIdAndUpdate(updatedTask._id, updatedTask, (err) => {
				if (!err) {
					mainWindow.webContents.send('tasks:update-success')
				}
			})
		}
	} catch (error) {
		console.log(error)
	}
})
//handle delete task
ipcMain.handle('tasks:delete-task', async (e, data) => {
	try {
		data = JSON.parse(data)
		if (!data.user._id) {
			//if doesn't login

		} else {
			//if logined
			const gettingUser = await User.findById(data.user._id);
			gettingUser.deleteTask(data.deletedTaskId)
			.catch(err => {
				console.log(err)
			})
			await Task.findByIdAndDelete(data.deletedTaskId, (err) => {
				if (!err) {
					mainWindow.webContents.send('tasks:delete-success')
				}
			})
		}
	} catch (error) {
		console.log(error)
	}
})
//handle clear finished task
ipcMain.handle('tasks:clear-finished-task', async (e, data) => {
	try {
		data = JSON.parse(data)
		if (!data.user._id) {
			//if doesn't login
		} else {
			//if logined
			await Task.updateMany({ isCompleted: true }, { isDisplayed: false }, (err, data) => {
				if (!err) {
					mainWindow.webContents.send('tasks:clear-finished-task-success')
				}
			})
		}
	} catch (error) {
		console.log(error)
	}
})
//handle completed task
ipcMain.handle('tasks:completed-task', async (e, data) => {
	try {
		data = JSON.parse(data)
		if (!data.user._id) {
			//if doesn't login
		} else {
			//if logined
			const task = await Task.findById(data.toggleTaskId)
			await Task.findByIdAndUpdate(data.toggleTaskId, {
				isCompleted: !task.isCompleted
			}, (err => {
				if (!err) {
					mainWindow.webContents.send('tasks:completed-task-success')
				}
			}))
		}
	} catch (error) {
		console.log(error)
	}
})
//handle create new user
ipcMain.handle('users:create-user', async (e, newUserData) => {
	try {
		let newUser = JSON.parse(newUserData)
		let existedUser = await User.find({ userName: newUser.userName })
		if (existedUser.length > 0) {
			return mainWindow.webContents.send('users:error-create-user', "This username is existed, please choose another usename!")
		}
		existedUser = await User.find({ mail: newUser.mail })
		if (existedUser.length > 0) {
			return mainWindow.webContents.send('users:error-create-user', "This mail is existed, please choose another mail!")
		}
		//create new user
		const defaultSetting = await PomoSetting.create({ created: Date.now() }, (err, setting) => {
			if (!err) {
				console.log(newUser)
				newUser = { ...newUser, setting: setting._id }
				console.log(newUser)
				User.create(newUser, (err, data) => {
					if (!err) {
						mainWindow.webContents.send('users:complete-create-user', JSON.stringify(data._id))
					}
					else {
						console.log(err)
					}
				})
			}
		})

	} catch (error) {
		console.log(error)
	}
})
//handle user login request
ipcMain.handle('users:login-user', async (e, userLoginData) => {
	try {
		const userLogin = JSON.parse(userLoginData);
		const user = await User.findOne({ userName: userLogin.userName })
		if (!user) {
			return mainWindow.webContents.send('users:error-login-user', "Username doesn't exist, please check again!")
		}
		else if (user.password !== userLogin.password) {
			return mainWindow.webContents.send('users:error-login-user', "Your Password doesn't correct, please check again!")
		}
		else {
			return mainWindow.webContents.send('users:success-login-user', JSON.stringify({
				userName: user.userName,
				_id: user._id
			}))
		}
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
