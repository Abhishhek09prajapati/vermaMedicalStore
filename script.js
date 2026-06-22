// Function to update the DOM elements
function updateShopUI(data) {
    document.getElementById("shopname").innerHTML = data[1].shopname;
    document.getElementsByClassName("address")[0].innerHTML = data[1].shopaddhress;
    document.getElementById("mobilenumber1").innerHTML = `<strong>Mobile:</strong> +91 ${data[1].shopmobilenumber}`;

    if (data[1].gststatus === "on") {
        document.getElementById("gstno").style.display = `block`;
        document.getElementById("gstno").innerHTML = `<strong>GST No:</strong> ${data[1].gst}`;
    } else {
        document.getElementById("gstno").style.display = `none`;
    }

    if (data[1].dlstatus === "on") {
        document.getElementById("dls").style.display = `block`;
        document.getElementById("dls").innerHTML = `<strong>Drug License:</strong> ${data[1].dl}`;
    } else {
        document.getElementById("dls").style.display = `none`;
    }

    document.getElementById("shopname1").innerHTML = `${data[1].shopname}`;
}

// 1. INSTANT LOAD: Check LocalStorage first and update UI immediately
const cachedShopData = localStorage.getItem("shopDetailsCache");
if (cachedShopData) {
    updateShopUI(JSON.parse(cachedShopData));
}

// 2. BACKGROUND FETCH: Get the absolute latest data from the API
fetch(`https://api.npoint.io/db81072fa6eb1e2bd6de?t=${Date.now()}`)
    .then(res => res.json())
    .then(data => {
        // Save the fresh data to LocalStorage for the next time the page is opened
        localStorage.setItem("shopDetailsCache", JSON.stringify(data));
        
        // Update the UI again just in case the API data was changed/updated
        updateShopUI(data);
    })
    .catch(err => {
        console.log("Error fetching shop data:", err);
    });