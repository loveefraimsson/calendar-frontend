//Kod för att lägga till todo i JSON

import React from "react";


class AddToDo extends React.Component {

    state = {
        //toDoList: this.props.toDoList,
        toDoList: "",
        newToDo: "",
        selectedDay: this.props.selectedDay,
        //clickedId: this.props.clickedId,
    }


    // componentDidUpdate = (prevProps, prevState) => {
    //     if(prevState.toDoList === this.state.toDoList) {
    //       //console.log("PrintCal1:", this.state.toDoList);
    //       this.setState({toDoList: this.props.toDoList})
    //       //console.log("PrintCal2:", this.state.toDoList);
    //     }      
    // }

    onChange = (evt) => {
        //console.log(evt);
        this.setState({newToDo: evt.target.value})
    }

    test = (evt) => {
        console.log("evt från test", evt.target.value);

    }

    // onChangeDeadline = (evt) => {
    //     console.log("Upptäckte förändring i onChangeDeadline");
    //     console.log("selectedDay: evt.target.value", evt.target.value);
    //     this.setState({selectedDay: evt.target.value})
    // }

    onSubmit = (evt) => {
        evt.preventDefault();
        let newToDo = {newToDo: this.state.newToDo, theDeadline: this.props.selectedDay, done: "false"};
        //let theDay = {theDay: this.props.selectedDay}
        console.log(newToDo);
        //console.log(theDay);

        fetch("http://localhost:3001/users/addToDo", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newToDo)
        })
        .then(res => res.json())
        .then(data => {
            console.log("data tillbaka", data);

            let newList = data.list;
            this.setState({toDoList: newList})

            this.props.getNewList(this.state.toDoList)
        })

    }
    
    render() {

        return  (
            <form onSubmit={this.onSubmit} className="addToDoForm">
                <input type="text" placeholder="Lägg till todo..." onChange={this.onChange} /> <br />
                <input type="text" placeholder="Deadline..."  value={this.props.selectedDay} onChange={this.test}/> <br />
                <button>Lägg till</button>
            </form>
        )
        //onChange={this.onChangeDeadline}      value={this.props.selectedDay}
    }
}



export default AddToDo;