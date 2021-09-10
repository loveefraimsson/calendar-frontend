import React from "react";


class AllToDoList extends React.Component {

    state = {
        toDoList: this.props.toDoList,
    }


    doneToDo = (evt) => {
        console.log(evt.target.id);
        let clickedToDo = {id: evt.target.id}
        console.log("clickedId", clickedToDo);

        fetch("https://calendarwithtodobackend.herokuapp.com/delete", {
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
        
        Object.values(sortToDoList).map((task, i) => {

            sortToDoList.sort(function(a,b){
                return new Date(a.deadline) - new Date(b.deadline)
            })

        })
                 


        return (
            <div className="allToDoListContainer">
                <h3>Alla uppgifter:</h3>
                <ul className="allToDoList">
                    {
                        Object.values(sortToDoList).map((thing, i) => {
                            if(thing.done === "false") {
                                return <li id={thing.id} className="allToDoListItem" key={i}>{thing.title} <span className="shallBeDone"> | Ska vara klar senast: {thing.deadline} </span> <button id={thing.id} className="doneToDoButton" onClick={this.doneToDo}>Klar</button></li>
                            }
                        })
                    } 
                </ul>
            </div>
        )
    }
}

export default AllToDoList;