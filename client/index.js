import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash'
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router';

var style = require('./style.scss');

export class Front extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  render() {
    var that = this;
    var getpagefront = (x,y,w,h)=>{
      var top1q = (
	<rect x={x} y={y} width={w} height={h/4} />
      );

      var top2q = (
	<g>
	  <rect style={that.props.getStyle('inUpLeftRight')} onClick={that.props.setFocus('inUpLeftRight')} x={x} y={y+h/4} width={w/4} height={h/4} />
	  <rect style={that.props.getStyle('outRightLeft')} onClick={that.props.setFocus('outRightLeft')} x={x+w/4} y={y+h/4} width={w/4*2} height={h/4} />
	  <rect style={that.props.getStyle('inDownLeftRight')} onClick={that.props.setFocus('inDownLeftRight')} x={x+w/4*3} y={y+h/4} width={w/4} height={h/4} />
	</g>
      );

      var bottom1q = (
	<g>
	  <rect style={that.props.getStyle('inUpRightLeft')} onClick={that.props.setFocus('inUpRightLeft')} x={x} y={y+h/4*2} width={w/4} height={h/4} />
	  <rect style={that.props.getStyle('outLeftRight')} onClick={that.props.setFocus('outLeftRight')} x={x+w/4} y={y+h/4*2} width={w/4*2} height={h/4} />
	  <rect style={that.props.getStyle('inDownRightLeft')} onClick={that.props.setFocus('inDownRightLeft')} x={x+w/4*3} y={y+h/4*2} width={w/4} height={h/4} />
	</g>
      );

      var bottom2q = (
	<rect x={x} y={y+h/4*3} width={w} height={h/4} />
      );
      return {top1q, top2q,bottom2q,bottom1q};
    };

    var {frontX, frontY, frontW, frontH} = this.props;
    var {top1q, top2q,bottom2q,bottom1q} =  getpagefront(frontX, frontY, frontW, frontH);

    var pageFront = (
      <g>
	{top1q}
	{top2q}
	{bottom1q}
	{bottom2q}
      </g>
    );

    return (
      <g className="front">
      <text x={frontX} y={frontY-20} >Page Front</text>
      {pageFront}
      </g>
    );

  }
}

export class Back extends React.Component   {
  constructor(props){
    super(props);
    this.state = {};
  }

  render() {
    var that = this;

    var getpageback = (x,y,w,h)=>{
      var fold = h/16;
      
      var top1q = (
	<g>
	  <rect x={x} y={y} width={w} height={fold} />
	  <polygon points={[[x,y+fold],[x+w/4,y+fold],[x,y+h/4]]} />
	  <polygon points={[[x+w/4,y+fold],[x+w/4,y+h/4],[x,y+h/4]]} style={this.props.getStyle("inUpRightRight")} onClick={that.props.setFocus('inUpRightRight')} />
	  <rect x={x+w/4} y={y+fold} width={w/4*2} height={h/4-fold} style={this.props.getStyle("outLeftLeft")} onClick={that.props.setFocus('outLeftLeft')} />
	  <polygon points={[[x+w/4*3,y+fold],[x+w,y+fold],[x+w,y+h/4]]}  />
	  <polygon points={[[x+w/4*3,y+fold],[x+w,y+h/4],[x+w/4*3,y+h/4]]} style={this.props.getStyle("inDownRightRight")} onClick={that.props.setFocus('inDownRightRight')} />
	</g>
      );

      var top2q = (
	<g>
	  <rect  x={x} y={y+h/4} width={w/4} height={h/4} />
	  <rect  x={x+w/4} y={y+h/4} width={w/4*2} height={h/4} />
	  <rect  x={x+w/4*3} y={y+h/4} width={w/4} height={h/4} />
	</g>
      );

      var bottom1q = (
	<g>
	  <rect x={x} y={y+h/4*2} width={w/4} height={h/4} />
	  <rect x={x+w/4} y={y+h/4*2} width={w/4*2} height={h/4} />
	  <rect x={x+w/4*3} y={y+h/4*2} width={w/4} height={h/4} />
	</g>
      );

      y = y+h;
      
      var bottom2q = (
	<g>
	  <rect x={x} y={y-fold} width={w} height={fold} />
	  <polygon points={[[x,y-fold],[x+w/4,y-fold],[x,y-h/4]]} />
	  <polygon points={[[x+w/4,y-fold],[x+w/4,y-h/4],[x,y-h/4]]} style={this.props.getStyle("inUpLeftLeft")} onClick={that.props.setFocus('inUpLeftLeft')} />
	  <rect x={x+w/4} y={y-h/4} width={w/4*2} height={h/4-fold} style={this.props.getStyle("outRightRight")} onClick={that.props.setFocus('outRightRight')} />
	  <polygon points={[[x+w/4*3,y-fold],[x+w,y-fold],[x+w,y-h/4]]}  />
	  <polygon points={[[x+w/4*3,y-fold],[x+w,y-h/4],[x+w/4*3,y-h/4]]} style={this.props.getStyle("inDownLeftLeft")} onClick={that.props.setFocus('inDownLeftLeft')} />
	</g>
      );
      return {top1q, top2q,bottom2q,bottom1q};
    };
    var {backX, backY, backW, backH} = this.props;
    var {top1q, top2q,bottom2q,bottom1q} =  getpageback(backX, backY, backW, backH);

    var pageBack = (
      <g>
	{top1q}
	{top2q}
	{bottom1q}
	{bottom2q}
      </g>
    );
    
    return (
      <g className="back">
      <text x={backX} y={backY-20} >Page Back</text>
      {pageBack}
      </g>
    );

  }
}



export class WalletIn extends React.Component   {
  constructor(props){
    super(props);
    this.state = {};
  }

  render() {
    var that = this;

    var getWalletInLeft = (x,y,w,h) => {
      var walletInLeft = (
	<g>
	  <polygon points={[[x,y],[x+w/3*2,y],[x,y+h/3*2]]} style={this.props.getStyle("inUpLeftLeft")} onClick={that.props.setFocus('inUpLeftLeft')} />
	  <polygon points={[[x+w/3*2,y],[x+w,y],[x+w,y+h/3], [x+w/3,y+h/3]]} style={this.props.getStyle("inUpLeftRight")} onClick={that.props.setFocus('inUpLeftRight')}/>
	  <polygon points={[[x+w/3,y+h/3], [x+w,y+h/3], [x+w,y+h],[x+w/3*2,y+h], [x+w/3-10,y+h/3+10]]} style={this.props.getStyle("inDownLeftRight")} onClick={that.props.setFocus('inDownLeftRight')}/>
	  <polygon points={[[x+w/3-10,y+h/3+10], [x+w/3*2,y+h], [x,y+h], [x,y+h/3*2]]} style={this.props.getStyle("inDownLeftLeft")} onClick={that.props.setFocus('inDownLeftLeft')}/>
	</g>
      );
      return walletInLeft;
    };

    var {walletInLeftX, walletInLeftY, walletInLeftW, walletInLeftH} = this.props;
    var walletInLeft = getWalletInLeft(walletInLeftX, walletInLeftY, walletInLeftW, walletInLeftH);

    var getWalletInRight = (x,y,w,h) => {
      var walletInLeft = (
	<g>
	  <polygon points={[[x,y],[x-w/3*2,y],[x,y+h/3*2]]} style={this.props.getStyle("inUpRightRight")} onClick={that.props.setFocus('inUpRightRight')} />
	  <polygon points={[[x-w/3*2,y],[x-w,y],[x-w,y+h/3], [x-w/3,y+h/3]]} style={this.props.getStyle("inUpRightLeft")} onClick={that.props.setFocus('inUpRightLeft')}/>
	  <polygon points={[[x-w/3,y+h/3], [x-w,y+h/3], [x-w,y+h],[x-w/3*2,y+h], [x-w/3+10,y+h/3+10]]} style={this.props.getStyle("inDownRightLeft")} onClick={that.props.setFocus('inDownRightLeft')}/>
	  <polygon points={[[x-w/3+10,y+h/3+10], [x-w/3*2,y+h], [x,y+h], [x,y+h/3*2]]} style={this.props.getStyle("inDownRightRight")} onClick={that.props.setFocus('inDownRightRight')}/>
	</g>
      );
      return walletInLeft;
    };

    var {walletInRightX, walletInRightY, walletInRightW, walletInRightH} = this.props;
    var walletInRight = getWalletInRight(walletInRightX, walletInRightY, walletInRightW, walletInRightH);


    return (
      <g className="wIn">
	<text x={walletInLeftX} y={walletInLeftY-20} >Wallet In</text>
	{walletInRight}
	{walletInLeft}
      </g>
    );

  }
}

export class WalletOut extends React.Component   {
  constructor(props){
    super(props);
    this.state = {};
  }

  render() {
    var that = this;

    var getWalletOut = (x,y,w,h) => {
      var walletOut = (
	<g>
	  <rect x={x} y={y} width={w/3*2} height={h} style={this.props.getStyle("outLeftLeft")} onClick={that.props.setFocus('outLeftLeft')} />
	  <rect x={x+w/3*2} y={y} width={w/3} height={h} style={this.props.getStyle("outLeftRight")} onClick={that.props.setFocus('outLeftRight')} />
	  <rect x={x+w} y={y} width={w/3} height={h} style={this.props.getStyle("outRightLeft")} onClick={that.props.setFocus('outRightLeft')} />
	  <rect x={x+w/3*4} y={y} width={w/3*2} height={h} style={this.props.getStyle("outRightRight")} onClick={that.props.setFocus('outRightRight')} />
	</g>
      );
      return walletOut;
    };
    
    var {walletOutLeftX, walletOutLeftY, walletOutLeftW, walletOutLeftH} = this.props;
    var walletOut = getWalletOut(walletOutLeftX, walletOutLeftY, walletOutLeftW, walletOutLeftH);

    return (
      <g className="wIn">
	<text x={walletOutLeftX} y={walletOutLeftY-20} >Wallet Out</text>
	{walletOut}
      </g>
    );

  }
}


export class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
    this._changeColor = _.debounce((e)=> {
      console.log('color', e.target.value);
      var colors = JSON.parse(this.props.location.hash.slice(1) || '{}') || {};
      colors[this.state.focus] = e.target.value;
      this.context.router.push({pathname: '.', hash: '#' + JSON.stringify(colors)});
    },100);
  }
  
  changeColor() {
    return (e)=>{
      e.persist();
      this._changeColor(e);
    };
  }

  setFocus(focus) {
    return (() => {
      this.setState({focus});
    }).bind(this);
  }
  
  render() {
    const getStyle = function(name) {
      var ret = {fill: (colors[name]) || 'whiteSmoke'};
      if (this.state.focus === name) {
	ret = {...ret, stroke: 'red', strokeWidth:4, strokeDasharray:'none'};
      }
      return ret;
    }.bind(this);

    var colors = JSON.parse(this.props.location.hash.slice(1) || '{}') || {};
    
    var that = this;

    // front
    var frontX = 50;
    var frontY = 50;
    var frontW = 100;
    var frontH = frontW*Math.sqrt(2);
    var frontProps = {frontX, frontY, frontW, frontH};
    
    // page back

    var backX = frontX;
    var backY = 250;
    var backW = frontW;
    var backH = frontH;
    var backProps = {backX, backY, backW, backH};

    // wallet in

    var walletInLeftX = frontX;
    var walletInLeftY = 450;
    var walletInLeftW = frontW / 2;
    var walletInLeftH = frontW / 2; // ??
    
    var walletInRightX = walletInLeftX + frontW;
    var walletInRightY = walletInLeftY;
    var walletInRightW = frontW / 2;
    var walletInRightH = frontW / 2; // ??


    var winProps = {walletInLeftX, walletInLeftY, walletInLeftW, walletInLeftH, walletInRightX, walletInRightY, walletInRightW, walletInRightH};

    // walletout
    var walletOutLeftX = frontX;
    var walletOutLeftY = 550;
    var walletOutLeftW = frontW / 2;
    var walletOutLeftH = frontW / 2; // ??
    var woutProps = {walletOutLeftX, walletOutLeftY, walletOutLeftW, walletOutLeftH};

    return (
      <div className="appdiv" >
	<div>
	  pick color:
	  <input type="color" onChange={this.changeColor().bind(this)} />
	  <div className="button" onClick={(x)=>(this.context.router.push({pathname: 'print/front', hash: this.props.location.hash}))}>print front</div>
	  <div className="button" onClick={(x)=>(this.context.router.push({pathname: 'print/back', hash: this.props.location.hash}))}>print back</div>
	  <div className="button" onClick={(x)=>(this.context.router.push({pathname: 'print/frontback', hash: this.props.location.hash}))}>print front+back</div>
	</div>
	<svg>
	  <Back getStyle={getStyle.bind(this)} setFocus={this.setFocus.bind(this)} {...backProps} />
	  <Front getStyle={getStyle.bind(this)} setFocus={this.setFocus.bind(this)} {...frontProps} />
	  <WalletIn getStyle={getStyle.bind(this)} setFocus={this.setFocus.bind(this)} {...winProps} />
	  <WalletOut getStyle={getStyle.bind(this)} setFocus={this.setFocus.bind(this)} {...woutProps} />
	</svg>
      </div>
    );
  }
}

App.contextTypes = {
  router: React.PropTypes.func.isRequired
};


export class Print extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  render() {
    var colors = JSON.parse(this.props.location.hash.slice(1) || '{}') || {};
    const getStyle = function(name) {
      var ret = {fill: (colors[name]) || 'whiteSmoke'};
      if (this.state.focus === name) {
	ret = {...ret, stroke: 'red', strokeWidth:4, strokeDasharray:'none'};
      }
      return ret;
    }.bind(this);

    console.log('colors', colors);
    if (!this.props.params.which || this.props.params.which === 'front') {

      var frontX = 0;
      var frontY = 0;
      var frontW = 794;
      var frontH = 1123;
      var frontProps = {frontX, frontY, frontW, frontH};

      return (
	<div className="print appdiv">
	  <svg>
	    <Front getStyle={getStyle.bind(this)} setFocus={(x)=>((y)=>(y))} {...frontProps} />
	  </svg>
	</div>
      );
    }

    if (this.props.params.which === 'frontback') {

      var frontX = 0;
      var frontY = 0;
      var frontW = 794;
      var frontH = 1123;
      var frontProps = {frontX, frontY, frontW, frontH};



      var backX = 0;
      var backY = 0;
      var backW = 794;
      var backH = 1123;
      var backProps = {backX, backY, backW, backH};

      return (
	<div className="print appdiv">
	  <svg>
	    <Front getStyle={getStyle.bind(this)} setFocus={(x)=>((y)=>(y))} {...frontProps} />
	    <Back getStyle={getStyle.bind(this)} setFocus={(x)=>((y)=>(y))} {...backProps} />
	  </svg>
	</div>
      );
    }



    if (this.props.params.which === 'back') {

      var backX = 0;
      var backY = 0;
      var backW = 794;
      var backH = 1123;
      var backProps = {backX, backY, backW, backH};

      return (
	<div className="print appdiv">
	  <svg>
	    <Back getStyle={getStyle.bind(this)} setFocus={(x)=>((y)=>(y))} {...backProps} />
	  </svg>
	</div>
      );
    }
  }
}



ReactDOM.render(
  (<Router history={browserHistory}>
	  <Route path="/print/:which" component={Print} />
	  <Route path="/" component={App} />
	  <Route path="/papi/print/:which" component={Print} />
	  <Route path="/papi" component={App} />
	  <Route path="/papi/" component={App} />

  </Router>)
  , document.getElementById("app"));
