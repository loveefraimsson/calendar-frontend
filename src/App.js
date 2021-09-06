import React from "react";
import PrintCalendar from "./PrintCalender";
import GetList from "./GetList"
import AllToDoList from "./AllToDoList";
import AddToDo from "./AddToDo";
import SelectedDaysToDo from "./SelectedDaysToDo";


//let moment = require("moment");


class App extends React.Component {
  
  state = {
      toDoList: "",
      clickedId: ""
  }

 

  componentDidMount = () => { 

    GetList((data) => {      
      //console.log(data);
      this.setState({toDoList: data})
      //console.log("state efter setState: ", this.state.toDoList);
    })
  }
  
  

  saveNewState = (saveState) => {
    console.log("saveState", saveState);
    this.setState({toDoList: saveState})
  }


  saveNewId = (id) => {
    console.log("id", id);
    this.setState({clickedId: id})
  }

  saveNewList = (newList) => {
    this.setState({toDoList: newList})
  }


  
  render() {

    return (
      <section className="container">
        <section className="upper-section">
          <PrintCalendar toDoList={this.state.toDoList} getNewId={this.saveNewId} />
          <AddToDo clickedId={this.state.clickedId} getNewList={this.saveNewList}/>
        </section>

        <section>
          {/* <AllToDoList  toDoList={this.state.toDoList} getNewState={this.saveNewState} /> */}
          {/* <SelectedDaysToDo /> */}
        </section>
      </section>
      
    )
  }
}

export default App;