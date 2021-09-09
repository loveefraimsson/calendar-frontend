//Fetcha todo-listan från backend

function GetList(cb) {
    fetch("http://localhost:3001/users")
    .then(res => res.json())
    .then(data => {

        // let test = data[0];
        // console.log(test);

        cb(data);
        
    });
}

export default GetList;
