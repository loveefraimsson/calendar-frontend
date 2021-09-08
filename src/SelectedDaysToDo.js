import React from "react";

class SelectedDaysToDo extends React.Component {
    render() {

        //let selectedDayList = [];
        let selectedDayList = this.props.toDoList;
        //console.log("selectedDayList1", selectedDayList);

        // {
                    
        //     Object.values(selectedDayList).map((task, i) => {
        //         //console.log("selectedDayList:", task);
        //         //console.log(this.props.selectedDay);

        //         let selectedDay = this.props.selectedDay;

        //         if(selectedDay === task.deadline && task.done === "false") {
        //             //console.log("task.title", task.title);
        //             return (
        //                 <> 
        //                     {task.title}
        //                     {/* {console.log("Nu har det skrivits ut")} */}
        //                 </>
        //                 )
        //         }

        //     })
        // } 

        return (
            <section className="selectedDaysToDoBox">
                <ul>
                    <p className="selectedDaysToDoBoxP1">Klicka på en dag för att se dess uppgifter</p>
                    <h3 className="H3-choosedDay">Vald dag: {this.props.selectedDay}</h3>
                    <h3 className="H3-todaysToDos">Dagens uppgifter:</h3>

                {
                    
                    Object.values(selectedDayList).map((task, i) => {
                        //console.log("selectedDayList:", task);
                        //console.log(this.props.selectedDay);
        
                        let selectedDay = this.props.selectedDay;
        
                        if(selectedDay === task.deadline && task.done === "false") {
                            //console.log("task.title", task.title);
                            return <li>{task.title}</li>
                        }
        
                    })
                } 



                {/* {
                    Object.values(selectedDayList).map((thing, i) => {
                    //console.log("task map", task);

                        return selectedDayList;

                    })
                } */}



                </ul>
                
            </section>
        )
        
        
        

    }
}

export default SelectedDaysToDo;