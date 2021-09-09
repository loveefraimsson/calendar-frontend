import React from "react";

//let moment = require("moment");

class AllToDoList extends React.Component {

    state = {
        toDoList: this.props.toDoList,
    }





    doneToDo = (evt) => {
        console.log(evt.target.id);
        let clickedToDo = {id: evt.target.id}
        console.log("clickedId", clickedToDo);

        fetch("http://localhost:3001/users/delete", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(clickedToDo)
        })
        .then(res => res.json())
        .then(data => {
            console.log("data tillbaka:", data);

            let newToDoList = data.list;
            console.log("test", newToDoList);
            this.setState({toDoList: newToDoList})

            this.props.getNewState(this.state.toDoList)
        })

    }





    render() {

        const sortToDoList = this.props.toDoList;
        //console.log("sortToDoList1", sortToDoList);

        {
            Object.values(sortToDoList).map((task, i) => {
                //console.log("task map", task);

                sortToDoList.sort(function(a,b){
                    //console.log(new Date(a.deadline) - new Date(b.deadline));
                    return new Date(a.deadline) - new Date(b.deadline)
                })

                

            })
        }

        //console.log("sortToDoList2", sortToDoList);


        
        // console.log("sortToDoList", sortToDoList);
         


        return (
            <div className="allToDoListContainer">
                <h3>Alla uppgifter</h3>
                <ul className="allToDoList">
                    {
                        Object.values(sortToDoList).map((thing, i) => {
                        //console.log("task map", task);

                            if(thing.done === "false") {
                                return <li id={thing.id} className="allToDoListItem" key={i}>{thing.title} | Ska vara klar senast: {thing.deadline} <button id={thing.id} className="doneToDoButton" onClick={this.doneToDo}>Klar</button></li>
                            }
                        })
                    } 
                </ul>
            </div>
        )
    }
}

export default AllToDoList;