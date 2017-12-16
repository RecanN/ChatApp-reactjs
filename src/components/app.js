import React, { Component } from 'react';
import Formulaire from './formulaire';
import Message from './message';
import base from '../base';
//css
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import '../animation.css';

class App extends Component {
	state = {
		messages: {}
	}

	// syncornisation avec farebase
	componentWillMount() {
		this.ref = base.syncState('/',{
			context: this,
			state: 'messages'
		});
	}
	//
	componentDidUpdate(){
		//Mettre le scroll en bas
		this.messages.scrollTop = this.messages.scrollHeight;	
	}	
	//
	addMessage = message =>{
		//copier le state
		const messages = {...this.state.messages}
		//On ajoute le message avec une clé timestap
		const timestamp = Date.now();
		messages[`message-${timestamp}`]= message;
		Object.keys(messages).slice(0, -10).map(key => messages[key]=null);

		// update State
		this.setState({messages});

	};

	isUser = (pseudo) =>{
		return pseudo === this.props.params.pseudo;
	};

	render() {
		const messages = Object
			.keys(this.state.messages)
			.map(key=> <Message key={key} details={this.state.messages[key]} isUser={this.isUser} />)
			;
			console.log(messages);
		return (
			<div className="box">
				<div>
					<div className="messages"
							 ref={input => this.messages = input}
					>
						<ReactCSSTransitionGroup
							Component="div"
							className="message"
							transitionName="message"
							transitionEnterTimeout={2000}
							transitionLeaveTimeout={2000}
						>
							{messages}
						</ReactCSSTransitionGroup>
					</div>
				</div>
				<Formulaire addMessage={this.addMessage}
										pseudo={this.props.params.pseudo}
										length="140"
				/>
			</div>
		);
	}
}

export default App;