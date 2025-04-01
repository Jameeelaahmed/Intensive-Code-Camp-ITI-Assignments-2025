var addObj = {
    street: 'abc st.',
    buildingNum: 15,
    city: "xyz",
}

function showAddr(addObj) {
    const d = new Date("2024-10-15"); // Use a recognized date format
    console.log(addObj.buildingNum, addObj.street, addObj.city, "registered in", d.toLocaleDateString())
}

showAddr(addObj)