//import { Calendar } from "calendar";
import { months, weekdays } from "moment";
import React from "react";
import GetList from "./GetList";
import AddToDo from "./AddToDo";
import SelectedDaysToDo from "./SelectedDaysToDo"
import GetRedDays from "./GetRedDays"

let moment = require("moment");


class PrintCal extends React.Component {

    state = {
        dateObject: moment(),
        selectedDay: "",
        toDoList: this.props.toDoList,
        redDays: "",
    }


      componentDidMount = () => { 

            GetRedDays((data) => {      
                //console.log("GetRedDays:", data.dagar[27]);
                this.setState({redDays: data.dagar})
            })

        }




    //KOMMENTERA FRAM DETTA OM MAPPEN INTE FUNGERAR OCH ÄNDRA ATT DEN MAPPA PROPPS
    // componentDidMount = () => { 

    //     GetList((data) => {      
    //       //console.log(data);
    //       this.setState({toDoList: data})
    //       //console.log("state efter setState: ", this.state.toDoList);
    //     })
    // }



    // componentDidUpdate = (prevProps, prevState) => {
    //     if (prevState.toDoList === this.state.toDoList) {

    //         this.setState({toDoList: })
    //         // GetList((data) => {
    //         //     console.log("data", data);
    //         //     this.setState({toDoList: data});
    //         // }, this.state.toDoList);
    //     }  
    // }




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
        this.setState({selectedDay: evt.target.id})

        //this.props.getSelectedDay(evt.target.id);

    }




    
    monthToId = () => {
        // let monthToId = this.state.dateObject.format("MM");
        // console.log("monthToId:", monthToId);
        return this.state.dateObject.format("MM")
    }

    yearToId = () => {
        let yearToId = this.state.dateObject.format("YYYY");
       // console.log("yearToId:", yearToId);
       return yearToId;
    }

    saveNewList = (newList) => {
        this.setState({toDoList: newList})
        this.props.getnewtodo(this.state.toDoList)
    }
    

    render() {

        let weekdayNames = moment.weekdays();
        //console.log("weekdays:", weekdayNames);


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

        

        let redDays = [];


        {
            Object.values(this.state.redDays).map((day, i) => {
                //console.log("red day", day);

                if(day[ 'röd dag' ] === "Ja") {
                    redDays.push(day);
                    
                }
                // console.log("Från if-sats: ", redDays);

                

            })
        }

        //console.log("Från if-sats: ", redDays);

        


        
        let daysInMonth = [];
        for(let d = 1; d <= this.daysInMonth(); d++) {
            //console.log(d);
            // let mo = this.monthToId();
            // console.log(mo);
            // this.monthToId()
            // {this.yearToId()}

            //console.log(d);

            if(d < 10) {
                d = "0" + d;
            }

            let monthToId = this.state.dateObject.format("MM");
            //console.log("monthToId:", monthToId);

            let yearToId = this.state.dateObject.format("YYYY");
            //console.log("yearToId:", yearToId);

            let datum = yearToId + "-" + monthToId + "-" + d;
            //console.log(datum);


            let list = [];
            //HÄR KAN DU BEHÖVA ÄNDRA TILL STATE OM DU KOMMENTERAR FRAM DÄR UPPE
            list = this.props.toDoList;       
            //console.log("list", list);


  



            daysInMonth.push(
                <td id={datum} onClick={this.clickOnDay} key={d + 200} className="calendar-day">
                    
                    {d}
                    {
                        Object.values(list).map((task, i) => {
                        //console.log("task map", task);

                            if(datum === task.deadline && task.done === "false") {
                                //console.log("task.title", task.title);
                                return (
                                    <> 
                                        <p key={i}>{task.title}</p>
                                        {/* {console.log("Nu har det skrivits ut")} */}
                                    </>
                                    )
                            }

                        })
                    } 

                    {
                        redDays.map((holiday) => {

                        if(holiday.helgdag && holiday.datum === datum) {
                            console.log(holiday.helgdag);
                            return <p className={"holiday"} key={holiday}>{holiday.helgdag}</p>
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

        // let array = ["elefant", "anka", "katt", "hund"];
        // console.log(array.slice(-1));



        return(
            <section className="upper-section-container">
                <section className="calender-container">
                    <div className="calender-header">
                        <span onClick={e => {this.onPrev()}} className="arrow calendar-button-prev" ></span>
                        {this.currentMonth()} {this.currentYear()}
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



        // let datum = daysInMonth;
        // console.log("datum", datum[9]._owner.memoizedState.dateObject._d);


        // let mån = this.currentMonth();

        // console.log("mån:", mån);
        

        // for (let d = 1; d <= this.daysInMonth(); d++) {
        //     let currentDay = d == this.currentDay() ? "today" : "";
        //     daysInMonth.push(
        //       <td key={d} className={`calendar-day ${currentDay}`}>
        //         <span
        //           onClick={e => {
        //             this.onDayClick(e, d);
        //           }}
        //         >
        //           {d}
        //         </span>
        //       </td>
        //     );
        //   }


        // for(let d = 1; d<=this.daysInMonth; d++) {
        //     let currentDay = d == this.currentDay() ? "today" : "";

        //     daysInMonth.push (
        //         <td key={da} className={`calendar-day ${currentDay}`}>
        //             <span onClick={e => {
        //                 this.onDayClick(e, da);
        //             }}>
        //                 {da}
        //             </span>
        //         </td>
        //     );
        // }




        //console.log(this.currentMonth.format("MM"));
        //console.log(daysInMonth);


        //return allWeekdayNames;


                    // <table>
            //     <thead>
            //         {weekdayshortname}
            //     </thead>
            // </table>


    // onDayClick = (e, da) => {
    //     this.setState({selectedDay: da},() => {
    //          console.log("SELECTED DAY: ", this.state.selectedDay);
    //       }
    //     );
    // }


    // onClick = (evt) => {
    //     console.log("on evt click", evt);

    // }


        // return (
        //     <section className="calendar">
        //         <header className="calendar-header">

        //         </header>
        //         <div className="dayBoxContainer">
        //             <div>
        //                 {this.printDays()}
                        
        //             </div>
        //         </div>
        //     </section>
        // )