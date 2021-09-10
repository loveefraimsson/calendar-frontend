import React from "react";
import GetList from "./GetList"
import AllToDoList from "./AllToDoList";
import PrintCal from "./PrintCal";


class App extends React.Component {
  
  state = {
      toDoList: "",
      selectedDay: "",
  }

  componentDidMount = () => { 

    GetList((data) => {      
      //console.log(data);
      this.setState({toDoList: data})
    })
  }


  saveNewState = (saveState) => {
    console.log("saveState", saveState);
    this.setState({toDoList: saveState})
  }


  savenewtodo = (todo) => {
    this.setState({toDoList: todo})
  } 


  render() {

    
    return (
      <section className="container">
        <section className="upper-section">
          <PrintCal toDoList={this.state.toDoList} getnewtodo={this.savenewtodo}  />
        </section>
        <section className="lower-section">
          <AllToDoList toDoList={this.state.toDoList} getNewState={this.saveNewState} />
        </section>
      </section>      
    )
  }
}

export default App;