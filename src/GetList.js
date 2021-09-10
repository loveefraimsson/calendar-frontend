//Fetcha todo-listan från backend

function GetList(cb) {
    fetch("https://calendarwithtodobackend.herokuapp.com/")
    .then(res => res.json())
    .then(data => {

        cb(data);
        
    });
}

export default GetList;
