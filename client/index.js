import React from 'react';
import ReactDOM from 'react-dom';

var style = require('./style.scss');

export class App extends React.Component {
    constructor(props){
	super(props);
    }

    render() {
	console.log('rendering app', this)
	return (
		<div>hello w0rld</div>
	);
    }
}

ReactDOM.render(<App/>, document.getElementById("app"));
