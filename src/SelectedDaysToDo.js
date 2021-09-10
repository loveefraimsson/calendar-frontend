import React from "react";

class SelectedDaysToDo extends React.Component {
    
    render() {

        let selectedDayList = this.props.toDoList;

        return (
            <section className="selectedDaysToDoBox">

                <p className="selectedDaysToDoBoxP1">Klicka på en dag för att se dess uppgifter</p>
                <h3 className="H3-choosedDay">Vald dag: {this.props.selectedDay}</h3>
                <h3 className="H3-todaysToDos">Dagens uppgifter:</h3>

                <ul className="selectedDaysToDoList">

                    {                   
                        Object.values(selectedDayList).map((task, i) => {        
                            let selectedDay = this.props.selectedDay;          
                            if(selectedDay === task.deadline && task.done === "false") {
                                return <li key={i}>{task.title}</li>
                            }       
                        })
                    } 
                </ul>               
            </section>
        )
    }
}

export default SelectedDaysToDo;