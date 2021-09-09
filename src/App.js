import React from "react";
//import PrintCalendar from "./PrintCalender";
import GetList from "./GetList"
import AllToDoList from "./AllToDoList";
import AddToDo from "./AddToDo";
import SelectedDaysToDo from "./SelectedDaysToDo";
import PrintCal from "./PrintCal";
import GetRedDays from "./GetRedDays"


//let moment = require("moment");


class App extends React.Component {
  
  state = {
      toDoList: "",
      //clickedId: "",
      selectedDay: "",
      //redDays: ""
  }


  
 

  componentDidMount = () => { 

    GetList((data) => {      
      //console.log(data);
      this.setState({toDoList: data})
      //console.log("state efter setState: ", this.state.toDoList);
    })
  }








  // componentDidUpdate = (prevProps, prevState) => {
  //   if (prevState.toDoList === this.state.toDoList) {
  //       GetList((data) => {
  //           console.log("data", data);
  //           this.setState({toDoList: data});
  //       }, this.state.toDoList);
  //   }  
  // }

  
  

  saveNewState = (saveState) => {
    console.log("saveState", saveState);
    this.setState({toDoList: saveState})
  }


  // saveNewId = (id) => {
  //   console.log("id", id);
  //   this.setState({clickedId: id})
  // }

  // saveNewList = (newList) => {
  //   this.setState({toDoList: newList})
  // }

  // saveSelectedDay = (saveDay) => {
  //   this.setState({selectedDay: saveDay})
  // }

  savenewtodo = (todo) => {
    this.setState({toDoList: todo})
  } 




  



  
  render() {

    

    return (
      <section className="container">
        <section className="upper-section">
          <PrintCal toDoList={this.state.toDoList} getnewtodo={this.savenewtodo} redDays={this.state.redDays} />
        </section>
        <section className="lower-section">
          <AllToDoList toDoList={this.state.toDoList} getNewState={this.saveNewState} />
        </section>
      </section>      
    )
  }
}

export default App;