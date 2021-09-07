//Kod för att lägga till todo i JSON

import React from "react";


class AddToDo extends React.Component {

    state = {
        //toDoList: this.props.toDoList,
        toDoList: "",
        newToDo: "",
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

    onSubmit = (evt) => {
        evt.preventDefault();
        let newToDo = {newToDo: this.state.newToDo};
        console.log(newToDo);

        fetch("http://localhost:3001/users/delete", {
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
                <input type="text" placeholder="Deadline..."/> <br />
                <button>Lägg till</button>
            </form>
        )
        
    }
}



export default AddToDo;