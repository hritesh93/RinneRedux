import React, { Component } from 'react';
import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';
import { connect } from 'react-redux';   // connect is a fn that returns hoc

class Counter extends Component {
  state = {
    counter: 0
  }

  counterChangedHandler = ( action, value ) => {
    switch ( action ) {
      case 'inc':
        this.setState( ( prevState ) => { return { counter: prevState.counter + 1 } } )
        break;
      case 'dec':
        this.setState( ( prevState ) => { return { counter: prevState.counter - 1 } } )
        break;
      case 'add':
        this.setState( ( prevState ) => { return { counter: prevState.counter + value } } )
        break;
      case 'sub':
        this.setState( ( prevState ) => { return { counter: prevState.counter - value } } )
        break;
      default:
        console.log('hello');
    }
  }

  render () {
    return (
      <div>
        <CounterOutput value={this.props.ctr} />
        <CounterControl label="Increment" clicked={this.props.onIncrementCounter} />
        <CounterControl label="Decrement" clicked={this.props.onDecrementCounter} />
        <CounterControl label="Add 10" clicked={this.props.onAddCounter} />
        <CounterControl label="Subtract 15" clicked={this.props.onSubtractCounter} />
        <hr />
        <button onClick={this.props.onStoreResult}>Store Results</button>
        <ul>
          {this.props.storedResults.map(strResult => (
            <li key={strResult.id} onClick={this.props.onDeleteResult}>{strResult.value}</li>
          ))}
        </ul>
      </div>
    );
  }
}

const mapStateToProp = state => {
  return {
    ctr: state.counter,
    storedResults: state.results
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onIncrementCounter: () => dispatch({type: 'INCREMENT'}),
    onDecrementCounter: () => dispatch({type: 'DECREMENT'}),
    onAddCounter: () => dispatch({type: 'ADD', val: 10}),
    onSubtractCounter: () => dispatch({type: 'SUBTRACT', val: 15}),
    onStoreResult: () => dispatch({type: 'STORE_RESULT'}),
    onDeleteResult: () => dispatch({type: 'DELETE_RESULT'})
  };
}

export default connect(mapStateToProp, mapDispatchToProps)(Counter);