import React from "react";
//import DayNames from "./DayNames"
import Day from "./Day"

//let moment = require("moment");




class Week extends React.Component {

  state = {
    toDoList: this.props.toDoList,
  }



    render() {
      let days = [];
      let {date} = this.props;
      
      const {
        month,
        selected,
        select,
      } = this.props;
  
      for (var i = 0; i < 7; i++) {
        let day = {
            
            key: date.date(),
            name: date.format("dd").substring(0, 1),
            number: date.date(),
            isCurrentMonth: date.month() === month.month(),
            isToday: date.isSame(new Date(), "day"),
            date: date,
            
        };



        days.push(
          <Day day={day}
            selected={selected}
            select={select}
            toDoList={this.state.toDoList}
            key={date.date()}
          />
        );
  

        
        date = date.clone();
        date.add(1, "day");
      }
  
      return (
        <div className="row-week" key={days[0]}>
          {days}
        </div>
      );
    }
  
  }



  export default Week;