function GetRedDays(cb) {
    fetch("http://sholiday.faboul.se/dagar/v2.1/2021")
    .then(res => res.json())
    .then(data => {

        // let test = data[0];
        // console.log(test);

        cb(data);
    });
}

export default GetRedDays;

// fetch("http://sholiday.faboul.se/dagar/v2.1/2021")
// .then(res => res.json())
// .then(data => {
//     console.log(data.dagar[200]);

//     // if(data.dagar === "200") {
//     //     console.log("HÄR");
//     // }

// });