import React from "react";
import AddToDo from "./AddToDo";
import SelectedDaysToDo from "./SelectedDaysToDo"

let moment = require("moment");


class PrintCal extends React.Component {

    state = {
        dateObject: moment(),
        selectedDay: "",
        toDoList: this.props.toDoList,
        redDays: "",
    }


    firstDayOfMonth = () => {
        let dateObject = this.state.dateObject;
        let firstDay = moment(dateObject).startOf("month").format("d"); 
        return firstDay;
    }

    daysInMonth = () => {
        return this.state.dateObject.daysInMonth();
    };

    currentMonth = () => {

        return this.state.dateObject.format("MMMM");
    }
    currentYear = () => {
        return this.state.dateObject.format("YYYY");
    }


    onPrev = () => {
        console.log("onPrev()");

        this.setState({
            dateObject: this.state.dateObject.subtract(1, "month")
        });
        
    };

    onNext = () => {
        console.log("onNext()");

        this.setState({
            dateObject: this.state.dateObject.add(1, "month")
        });
    };  


    clickOnDay = (evt) => {
        console.log("on evt click", evt.target.id);
        this.setState({selectedDay: evt.target.id});
    }

    
    monthToId = () => {
        return this.state.dateObject.format("MM")
    }

    yearToId = () => {
        let yearToId = this.state.dateObject.format("YYYY");
       return yearToId;
    }

    saveNewList = (newList) => {
        this.setState({toDoList: newList})
        this.props.getnewtodo(this.state.toDoList)
    }

  

    render() {

        let weekdayNames = moment.weekdays();

        let allWeekdayNames = weekdayNames.map(day => {
            return (
                <th key={day} className="weekdayName">
                    {day}
                </th>
              );
        })


        let blanks = [];
        for(let i = 0; i < this.firstDayOfMonth(); i++) {
            blanks.push(<td key={i} className="calender-day empty">{""}</td>);
        }

        
        let daysInMonth = [];
        for(let d = 1; d <= this.daysInMonth(); d++) {

            if(d < 10) {
                d = "0" + d;
            }

            let monthToId = this.state.dateObject.format("MM");

            let yearToId = this.state.dateObject.format("YYYY");

            let datum = yearToId + "-" + monthToId + "-" + d;

            let list = [];
            list = this.props.toDoList;     
            
            daysInMonth.push(
                <td id={datum} onClick={this.clickOnDay} key={d + 200} className="calendar-day" >
                   
                    <p className="date">{d}</p>
                    {
                        Object.values(list).map((task, i) => {
                            if(datum === task.deadline && task.done === "false") {
                                return (
                                    <> 
                                        <p onClick={this.clickOnDay} key={i} id={datum} className="toDo">{task.title}</p>
                                    </>
                                )
                            }

                        })
                    } 
                </td>
            );
        }


        var totalSlots = [...blanks, ...daysInMonth];
        let rows = [];
        let cells = [];

        totalSlots.forEach((row, i) => {
            if(i % 7 !== 0) {
                cells.push(row);
            }
            else {
                rows.push(cells);
                cells = [];
                cells.push(row)
            }
            if( i === totalSlots.length - 1) {
                rows.push(cells)
            }            
        })

        let daysinmonth = rows.map((d, i) => {
            return <tr key={i} className="calender-week-row">{d}</tr>;
        });


        return(
            <section className="upper-section-container">
                <section className="calender-container">
                    <div className="calender-header">
                        <span onClick={e => {this.onPrev()}} className="arrow calendar-button-prev" ></span>
                        <p className="monthAndYear">{this.currentMonth()} {this.currentYear()}</p>
                        <span onClick={e => {this.onNext()}} className="arrow calendar-button-next" ></span>
                    </div>
                    <table className="calendar">                       
                        <thead className="weekdayNames-container">
                            <tr>{allWeekdayNames}</tr>
                        </thead>
                        <tbody>
                            {daysinmonth}
                        </tbody>
                    </table>
                </section>
                <section className="right-section">
                    <section className="addToDo-container">
                        <AddToDo toDoList={this.state.toDoList} selectedDay={this.state.selectedDay} getNewList={this.saveNewList}/>
                    </section>                  
                    <section className="selectedDaysToDo-container">
                    <SelectedDaysToDo toDoList={this.props.toDoList} selectedDay={this.state.selectedDay}/>  
                    </section>                   
                </section>
            </section>
        )
    }
}


export default PrintCal;
