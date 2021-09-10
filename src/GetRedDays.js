function GetRedDays(cb, theYear) {
    console.log("theYear2", theYear);
    fetch("http://sholiday.faboul.se/dagar/v2.1/" + theYear)
    .then(res => res.json())
    .then(data => {


        cb(data);
    });
}

export default GetRedDays;
