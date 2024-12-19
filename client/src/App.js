import React, {Fragment} from 'react'; //A component that allows grouping elements without adding extra nodes to the DOM.
import InputTodo from './components/InputTodo';
import ListTodo from './components/ListTodo';
import EditTodo from './components/EditTodo';
import './App.css';

function App() {
  return (
        <Fragment> 
          <div className="container">
          <InputTodo />
          <ListTodo />
            </div>          
        </Fragment>
      );
}

export default App;
