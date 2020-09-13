import React from 'react'
import $ from 'jquery'
import MainFrame from './MainFrame/MainFrame'
import AboutFrame from './AboutFrame/AboutFrame'
import Footer from './Footer/Footer'

const App = () => {
	return (
		<React.Fragment>
			<div style={{backgroundColor: '#F05B56'}}>
				<MainFrame />
			</div>
			<div style={{backgroundColor: '#fff'}}>
				<AboutFrame />
			</div>
			<div style={{backgroundColor: '#fff'}}>
				<Footer />
			</div>
		</React.Fragment>
	)
}

export default App
