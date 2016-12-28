import React, { Component } from 'react'
import Geosuggest from 'react-geosuggest'

import { base } from '../../components/base'
import { monthsAndDays, getNumOfDays, birthYears, hasValidInputs } from './util'


//On form submit, set cookies to keep the value of inputs on refresh?

export default class Login extends Component {
	constructor(props) {
		super(props)

		this.state = {
			login_username: '',
			login_password: '',
			signup_username: '',
			signup_password: '',
			confirmPassword: '',
			email: '',
			gender: '',
			location: '',
			birthday: {
				month: 'January',
				day: '1',
				year: 0
			},
			invalidSignUp: true
		}

		this.handleLogin = this.handleLogin.bind(this)
		this.handleSignUp = this.handleSignUp.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.onSuggestSelect = this.onSuggestSelect.bind(this)
		this.handleDateChange = this.handleDateChange.bind(this)
	}

	handleChange(e, fieldType) {
		let newState = this.state


		newState[fieldType] = e.target.value
		this.setState({...this.state, ...newState})



		//Validate Signup
		let validSignUp = hasValidInputs(this.state)

		if(validSignUp) {
			this.setState({ invalidSignUp: false })
		}
	}

	handleDateChange(e, type) {
		// Generalized function to handle month, day, and year state changes
		let newState = this.state
		newState.birthday[type] = e.target.value
		this.setState({...this.state, ...newState})
	}

	onSuggestSelect(suggest, location) {
			let validSignUp = hasValidInputs(this.state)
			if(validSignUp) {
				this.setState({ invalidSignUp: false })
			}
			this.setState({ location: suggest.label })	
	}

	handleLogin() {
		

	}

	handleSignUp() {

	}

	render() {
		const { month, day, year } = this.state.birthday
		const { invalidSignUp, login_username, login_password } = this.state
		//Checks if the login inputs are valid
		const isValidLogin = login_username.length && login_password.length
		//Call util func that returns the # of days depending on month
		const numOfdays = getNumOfDays(monthsAndDays[month])
		//Call util func that gives all possible birth years
		const allBirthYears = birthYears()

		return (
		<div>
			<base.navbar />
			<div className="col-xs-6">
				<div className="auth-container">	
					<ul className="nav nav-tabs" role="tablist">
					    <li role="presentation" className="active"><a href="#login" aria-controls="login" role="tab" data-toggle="tab">Login</a></li>
					    <li role="presentation"><a href="#signup" aria-controls="signup" role="tab" data-toggle="tab">Sign Up</a></li>
		  			</ul>

					<div className="tab-content">
						{/*Login Panel*/}
					    <div role="tabpanel" className="tab-pane active" id="login">
					    	<div className="input-group">
	  							<span className="input-group-addon"><span className="glyphicon glyphicon-user"></span></span>
	 							<input type="text" onChange={(e) => this.handleChange(e, 'login_username')} className="form-control" placeholder="Username" />
							</div>
							<div className="input-group">
	  							<span className="input-group-addon"><span className="glyphicon glyphicon-lock"></span></span>
	 							<input type="password" onChange={(e) => this.handleChange(e, 'login_password')} className="form-control" placeholder="Password" />
							</div>
							<button type="button" className="btn btn-primary" disabled={!isValidLogin} onSubmit={this.handleLogin}>Submit</button>
					    </div>

						{/*Signup Panel*/}
					    <div role="tabpanel" className="tab-pane" id="signup">
					    	<div className="input-group">
	  							<span className="input-group-addon"><span className="glyphicon glyphicon-user"></span></span>
	 							<input type="text" onChange={(e) => this.handleChange(e, 'signup_username')} className="form-control" placeholder="Username" />
							</div>
							<div className="input-group">
	  							<span className="input-group-addon"><span className="glyphicon glyphicon-lock"></span></span>
	 							<input type="password" onChange={(e) => this.handleChange(e, 'signup_password')} className="form-control" placeholder="Password" />
							</div>
							<div className="input-group">
	  							<span className="input-group-addon"><span className="glyphicon glyphicon-lock"></span></span>
	 							<input type="password" onChange={(e) => this.handleChange(e, 'confirmPassword')} className="form-control" placeholder="Confirm Password" />
							</div>
							<div className="input-group">
	  							<span className="input-group-addon"><span className="glyphicon glyphicon-envelope"></span></span>
	 							<input type="email" onChange={(e) => this.handleChange(e, 'email')} className="form-control" placeholder="Email" />
							</div>
							<div className="input-group">
	  							<span className="input-group-addon">Birthday </span>
	  							<div className="col-xs-5">
	  							<select className="form-control" name="month" value={month} onChange={(e) => this.handleDateChange(e, 'month')}>
	  								{Object.keys(monthsAndDays).map(month => <option key={month} value={month}>{month}</option>)}
								</select>
								</div>
								<div className="col-xs-3">
								<select  className="form-control" name="day" value={day} onChange={(e) => this.handleDateChange(e, 'day')}>
	  								{numOfdays.map(day => <option key={day} value={day}>{day}</option>)}
								</select>
								</div>
								<div className="col-xs-4">
								<select  className="form-control" name="year" value={year} onChange={(e) => this.handleDateChange(e, 'year')}>
	  								{allBirthYears.map(year => <option key={year} value={year}>{year}</option>)}
								</select>
								</div>
							</div>
							<div className="input-group">
								<span className="input-group-addon">Gender</span>
	  							<label className="radio-inline">
							      <input type="radio" value="Male" onChange={(e) => this.handleChange(e, 'gender')} />Male
							    </label>
							    <label className="radio-inline">
							      <input type="radio" value="Female" onChange={(e) => this.handleChange(e, 'gender')}  />Female
							    </label>
							    <label className="radio-inline">
							      <input type="radio" value="Other" onChange={(e) => this.handleChange(e, 'gender')} />Other
							    </label>
							</div>
							<div className="input-group">
	  							<span className="input-group-addon"><span className="glyphicon glyphicon-map-marker"></span></span>
	 							<Geosuggest
						          ref={el=>this._geoSuggest=el}
						          country='us'
						          inputClassName="form-control"
						          types={['(cities)']}
						          onSuggestSelect={this.onSuggestSelect}
						          onSuggestNoResults={this.onSuggestNoResults}
						      	 />
							</div>
							<button type="submit" onSubmit={this.handleSignUp} disabled={invalidSignUp} className="btn btn-primary">Submit</button>
					    </div>
					</div>
				</div>
			</div>
			<div className="col-xs-6 error-container">
			</div>
		</div>
		)
	}
}