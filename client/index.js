import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router';

var style = require('./style.scss');

export class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  changeColor(e) {
    var colors = this.state.colors || {};
    colors[this.state.focus] = e.target.value;
    this.setState({colors});
    this.forceUpdate();
  }

  setFocus(focus) {
    return (() => {
     this.setState({focus});
    }).bind(this);
  }
  
  render() {
    var that = this;

    const getStyle = function(name) {
      var ret = {fill: (that.state.colors && that.state.colors[name]) || 'whiteSmoke'};
      if (that.state.focus === name) {
	ret = {...ret, stroke: 'red', strokeWidth:4, strokeDasharray:'none'};
      }
      return ret;
    };
    
    var frontX = 350;
    var frontY = 200;
    var frontW = 200;
    var frontH = 300;

    var getpagefront = (x,y,w,h)=>{
      var top1q = (
	<rect x={x} y={y} width={w} height={h/4} />
      );

      var top2q = (
	<g>
	<rect style={getStyle('inUpLeftRight')} onClick={that.setFocus('inUpLeftRight')} x={x} y={y+h/4} width={w/4} height={h/4} />
	<rect style={getStyle('outRightLeft')} onClick={that.setFocus('outRightLeft')} x={x+w/4} y={y+h/4} width={w/4*2} height={h/4} />
	<rect style={getStyle('inDownLeftRight')} onClick={that.setFocus('inDownLeftRight')} x={x+w/4*3} y={y+h/4} width={w/4} height={h/4} />
	</g>
      );

      var bottom1q = (
	<g>
	<rect style={getStyle('inUpRightLeft')} onClick={that.setFocus('inUpRightLeft')} x={x} y={y+h/4*2} width={w/4} height={h/4} />
	<rect style={getStyle('outLeftRight')} onClick={that.setFocus('outLeftRight')} x={x+w/4} y={y+h/4*2} width={w/4*2} height={h/4} />
	<rect style={getStyle('inDownRightLeft')} onClick={that.setFocus('inDownRightLeft')} x={x+w/4*3} y={y+h/4*2} width={w/4} height={h/4} />
	</g>
      );

      var bottom2q = (
	<rect x={x} y={y+h/4*3} width={w} height={h/4} />
      );
      return {top1q, top2q,bottom2q,bottom1q};
    };

    var {top1q, top2q,bottom2q,bottom1q} =  getpagefront(frontX, frontY, frontW, frontH);

    var pageFront = (
      <g>
      {top1q}
      {top2q}
      {bottom1q}
      {bottom2q}
      </g>
    );

    // page back

    var backX = 50;
    var backY = 200;
    var backW = frontW;
    var backH = frontH;

    var getpageback = (x,y,w,h)=>{
      var fold = 20;
      
      var top1q = (
	<g>
	<rect x={x} y={y} width={w} height={fold} />
	<polygon points={[[x,y+fold],[x+w/4,y+fold],[x,y+h/4]]} />
	<polygon points={[[x+w/4,y+fold],[x+w/4,y+h/4],[x,y+h/4]]} style={getStyle("inUpRightRight")} onClick={that.setFocus('inUpRightRight')} />
	<rect x={x+w/4} y={y+fold} width={w/4*2} height={h/4-fold} style={getStyle("outLeftLeft")} onClick={that.setFocus('outLeftLeft')} />
	<polygon points={[[x+w/4*3,y+fold],[x+w,y+fold],[x+w,y+h/4]]}  />
	<polygon points={[[x+w/4*3,y+fold],[x+w,y+h/4],[x+w/4*3,y+h/4]]} style={getStyle("inDownRightRight")} onClick={that.setFocus('inDownRightRight')} />
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
	<polygon points={[[x+w/4,y-fold],[x+w/4,y-h/4],[x,y-h/4]]} style={getStyle("inUpLeftLeft")} onClick={that.setFocus('inUpLeftLeft')} />
	<rect x={x+w/4} y={y-h/4} width={w/4*2} height={h/4-fold} style={getStyle("outRightRight")} onClick={that.setFocus('outRightRight')} />
	<polygon points={[[x+w/4*3,y-fold],[x+w,y-fold],[x+w,y-h/4]]}  />
	<polygon points={[[x+w/4*3,y-fold],[x+w,y-h/4],[x+w/4*3,y-h/4]]} style={getStyle("inDownLeftLeft")} onClick={that.setFocus('inDownLeftLeft')} />
	</g>
      );
      return {top1q, top2q,bottom2q,bottom1q};
    };

    var {top1q, top2q,bottom2q,bottom1q} =  getpageback(backX, backY, backW, backH);

    var pageBack = (
      <g>
      {top1q}
      {top2q}
      {bottom1q}
      {bottom2q}
      </g>
    );


    // wallet in

    var walletInLeftX = 600;
    var walletInLeftY = 200;
    var walletInLeftW = frontW / 2;
    var walletInLeftH = frontW / 2; // ??

    var getWalletInLeft = (x,y,w,h) => {
      var walletInLeft = (
	<g>
	<polygon points={[[x,y],[x+w/3*2,y],[x,y+h/3*2]]} style={getStyle("inUpLeftLeft")} onClick={that.setFocus('inUpLeftLeft')} />
	<polygon points={[[x+w/3*2,y],[x+w,y],[x+w,y+h/3], [x+w/3,y+h/3]]} style={getStyle("inUpLeftRight")} onClick={that.setFocus('inUpLeftRight')}/>
	<polygon points={[[x+w/3,y+h/3], [x+w,y+h/3], [x+w,y+h],[x+w/3*2,y+h], [x+w/3-10,y+h/3+10]]} style={getStyle("inDownLeftRight")} onClick={that.setFocus('inDownLeftRight')}/>
	<polygon points={[[x+w/3-10,y+h/3+10], [x+w/3*2,y+h], [x,y+h], [x,y+h/3*2]]} style={getStyle("inDownLeftLeft")} onClick={that.setFocus('inDownLeftLeft')}/>
	</g>
      );
      return walletInLeft;
    };

    var walletInLeft = getWalletInLeft(walletInLeftX, walletInLeftY, walletInLeftW, walletInLeftH);

    var walletInRightX = 600 + frontW;
    var walletInRightY = 200;
    var walletInRightW = frontW / 2;
    var walletInRightH = frontW / 2; // ??


    var getWalletInRight = (x,y,w,h) => {
      var walletInLeft = (
	<g>
	<polygon points={[[x,y],[x-w/3*2,y],[x,y+h/3*2]]} style={getStyle("inUpRightRight")} onClick={that.setFocus('inUpRightRight')} />
	<polygon points={[[x-w/3*2,y],[x-w,y],[x-w,y+h/3], [x-w/3,y+h/3]]} style={getStyle("inUpRightLeft")} onClick={that.setFocus('inUpRightLeft')}/>
	<polygon points={[[x-w/3,y+h/3], [x-w,y+h/3], [x-w,y+h],[x-w/3*2,y+h], [x-w/3+10,y+h/3+10]]} style={getStyle("inDownRightLeft")} onClick={that.setFocus('inDownRightLeft')}/>
	<polygon points={[[x-w/3+10,y+h/3+10], [x-w/3*2,y+h], [x,y+h], [x,y+h/3*2]]} style={getStyle("inDownRightRight")} onClick={that.setFocus('inDownRightRight')}/>
	</g>
      );
      return walletInLeft;
    };

    
    var walletInRight = getWalletInRight(walletInRightX, walletInRightY, walletInRightW, walletInRightH);

    // walletout
    var walletOutLeftX = 600;
    var walletOutLeftY = 400;
    var walletOutLeftW = frontW / 2;
    var walletOutLeftH = frontW / 2; // ??

    var getWalletOut = (x,y,w,h) => {
      var walletOut = (
	<g>
	<rect x={x} y={y} width={w/3*2} height={h} style={getStyle("outLeftLeft")} onClick={that.setFocus('outLeftLeft')} />
	<rect x={x+w/3*2} y={y} width={w/3} height={h} style={getStyle("outLeftRight")} onClick={that.setFocus('outLeftRight')} />
	<rect x={x+w} y={y} width={w/3} height={h} style={getStyle("outRightLeft")} onClick={that.setFocus('outRightLeft')} />
	<rect x={x+w/3*4} y={y} width={w/3*2} height={h} style={getStyle("outRightRight")} onClick={that.setFocus('outRightRight')} />
	</g>
      );
      return walletOut;
    };

    var walletOut = getWalletOut(walletOutLeftX, walletOutLeftY, walletOutLeftW, walletOutLeftH);



      return (
	<div id="appdiv" >
	<div>
	pick color:
		<input type="color" onChange={this.changeColor.bind(this)} />
	
	</div>
	<svg>
	{pageBack}
	{pageFront}
	{walletInLeft}
	{walletInRight}
	{walletOut}
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
    
  }
}



ReactDOM.render(
  (<Router history={browserHistory}>
    <Route>
    <Route path="/print/:which" component={Print} />
    <Route path="/" component={App} />
    </Route>
    </Router>)
    , document.getElementById("app"));
