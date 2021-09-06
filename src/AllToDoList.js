import React from "react";

//let moment = require("moment");

class AllToDoList extends React.Component {

    state = {
        toDoList: this.props.toDoList,
    }





    doneToDo = (evt) => {
        console.log(evt.target.id);
        let clickedToDo = {title: evt.target.id}

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

        // const sortToDoList = this.state.toDoList;

        // sortToDoList.sort(function(a,b){
        //     return new Date(a.deadline) - new Date(b.deadline)
        // })
        
        
        // console.log("sortToDoList", sortToDoList);

    


        return (
            <div className="allToDoListBox">
                <ul className="allToDoList">

                    {/* {
                        sortToDoList.map((thing, i) => {

                            if(thing.done === "false") {
                                return <li id={thing.title} className="allToDoListItem" key={i}>{thing.title} | Ska vara klar senast: {thing.deadline} <button id={thing.title} className="doneToDoButton" onClick={this.doneToDo}>Klar</button></li>
                            }
                           
                        })
                    } */}

                </ul>
            </div>
        )

    }
}

export default AllToDoList;