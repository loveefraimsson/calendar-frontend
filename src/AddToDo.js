//Kod för att lägga till todo i JSON

import React from "react";


class AddToDo extends React.Component {

    state = {
        toDoList: "",
        newToDo: "",
        selectedDay: this.props.selectedDay,
    }

    onChange = (evt) => {
        this.setState({newToDo: evt.target.value})
    }

    onChangeDeadline = (evt) => {
        console.log("evt från test", evt.target.value);       
    }

    onSubmit = (evt) => {
        evt.preventDefault();
        let newToDo = {newToDo: this.state.newToDo, theDeadline: this.props.selectedDay, done: "false"};
        console.log(newToDo);

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

        alert("Uppgiften har lagts till i kalendern!");

        let field = document.querySelector(".addToDoFormInputToDo");
        field.value = "";

    }
    
    render() {

        return  (
            <form onSubmit={this.onSubmit} className="addToDoForm">
                <input className="addToDoFormInputToDo" type="text" placeholder="Lägg till todo..." onChange={this.onChange} /> <br />
                <p>Klicka på ett datum i kalendern för att lägga till en deadline! </p>
                <input className="addToDoFormInputDeadline" type="text" placeholder="Deadline..." value={this.props.selectedDay}  onChange={this.onChangeDeadline}/> <br />
                <button>Lägg till</button>               
            </form>
        )
    }
}

export default AddToDo;