//Fetcha todo-listan från backend

function GetList(cb) {
    fetch("http://localhost:3001/users")
    .then(res => res.json())
    .then(data => {

        cb(data);
        
    });
}

export default GetList;
