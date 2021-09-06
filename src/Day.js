import React from "react";
//import DayNames from "./DayNames";
//import Week from "./Week";
//import AddToDo from "./AddToDo";




//let moment = require("moment");


class Day extends React.Component {

    state = {
      toDoList: this.props.toDoList,
      //showForm: false,
      
    }


    // onButtonClick = (evt) => {
    //   //this.setState({showForm: true})
    //   //let dayNow = document.getElementById()
    //   console.log(evt);
    // }

    render() {

      //let list = this.state.toDoList;
      //console.log("list", list);

      const {
        day,
        day: {
          date,
          isCurrentMonth,
          isToday,
          number
        },
        select,
        selected
      } = this.props;

  
      

      return (
        <span
          key={date.toString()} 
          id={date.format("YYYY-MM-DD")}
          className={"day" + (isToday ? " today" : "") + (isCurrentMonth ? "" : " different-month") + (date.isSame(selected) ? " selected" : "") } 
          onClick={()=>select(day)}>{number}
          
          {/* <button onClick={this.onButtonClick} className="addToDoButton">+</button> */}

          <button id={date.format("YYYY-MM-DD")} onClick={this.onButtonClick} className="addToDoButton">+</button>
          {/* {this.state.showForm ? <AddToDo /> : null} */}
          <div>
            


            {/* {
              list.map((thing) => {
                //console.log("thing", thing);
                //console.log("thing.deadline", thing.deadline);
                //console.log(date.format("YYYY-MM-DD")); 
                if (date.format("YYYY-MM-DD") === thing.deadline && thing.done === "false") { //thing.deadline === "2021-09-20"
                  //console.log("Här är samma");
                
                  return (
                    <> 
                      <p>{thing.title}</p>
                      {console.log("Nu har det skrivits ut")}
                    </>
                  )
                  
                  
                }
                
              })
            } */}
            
          </div>
          
          </span>
          
      );
    }
  }


  export default Day;