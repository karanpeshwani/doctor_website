var doctors = [
  {
    name: "dr_reddy",
    langLat: [73.8273, 18.9433],
    available: "Monday",
    gender: "Male",
    field: "Cardiologist",
    rating: 4.7,
    appointment_fees: 490,
  },
  {
    name: "dr_priya",
    langLat: [74.1273, 19.1433],
    available: "Tuesday",
    gender: "Female",
    field: "Dentist",
    rating: 4.5,
    appointment_fees: 400,
  },
  {
    name: "dr_suresh",
    langLat: [74.8273, 19.9433],
    available: "Wednesday",
    gender: "Male",
    field: "ENT",
    rating: 4.4,
    appointment_fees: 588,
  },
  {
    name: "dr_diya",
    langLat: [75.5273, 20.1433],
    available: "Friday",
    gender: "Female",
    field: "Dentist",
    rating: 4.3,
    appointment_fees: 699,
  },
  {
    name: "dr_anil",
    langLat: [74.4273, 19.7433],
    available: "Thursday",
    gender: "Male",
    field: "Cardiologist",
    rating: 4.2,
    appointment_fees: 234,
  },
  {
    name: "dr_muskaan",
    langLat: [75.7173, 19.1833],
    available: "Thursday",
    gender: "Female",
    field: "General Physician",
    rating: 4.1,
    appointment_fees: 786,
  },
  {
    name: "dr_piyush",
    langLat: [73.9973, 19.9333],
    available: "Saturday",
    gender: "Male",
    field: "General Physician",
    rating: 3.7,
    appointment_fees: 896,
  },
];

function plotMarkers(doctors) {
  document.getElementById("card-container").innerHTML = "";

  mapboxgl.accessToken =
    "pk.eyJ1Ijoia2FyYW5wZXNod2FuaSIsImEiOiJja3Azd3RmbWQxd2J4MnZxd3EyeTB5d2d4In0.3_t0A74H1fqc_U7kXioSNw";
  var map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v11",
    zoom: 7,
    center: [74.4, 19.4],
  });

  doctors.forEach((item) => {
    // PLOTTING THE DATA ON THE MAP
    if (item.field === "Dermatologist") {
      var newLocation = new mapboxgl.Marker({ color: "yellow" })
        .setLngLat(item.langLat)
        .addTo(map);
    } else if (item.field === "Cardiologist") {
      var newLocation = new mapboxgl.Marker({ color: "red" })
        .setLngLat(item.langLat)
        .addTo(map);
    } else if (item.field === "General Physician") {
      var newLocation = new mapboxgl.Marker({ color: "green" })
        .setLngLat(item.langLat)
        .addTo(map);
    } else if (item.field === "Dentist") {
      var newLocation = new mapboxgl.Marker({ color: "blue" })
        .setLngLat(item.langLat)
        .addTo(map);
    } else {
      var newLocation = new mapboxgl.Marker({ color: "black" })
        .setLngLat(item.langLat)
        .addTo(map);
    }
    // MAKING THE CARDS
    document.getElementById("card-container").innerHTML += `<div
    class="card position-relative"
    style="border: none !important; width: 33rem; height: 20rem;"
  >
    <div class="position-absolute ml-4" style="top: 5%; left: 10%">
      <img
        src="./images/karan.jpg"
        class="shadow"
        style="border-radius: 100%; height: 60px; width: 60px"
      />
    </div>
    <div class="card-body pt-5 shadow mt-5" style="border-radius: 8px">
      <h5 class="card-title">${item.name}</h5>
      <h6 class="card-subtitle mb-2 text-muted">
        ${item.field} <b>|</b>
        <i class="fas fa-thumbs-up text-primary"></i> ${item.rating}
      </h6>
      <p class="mb-0 mt-1" style="color: #d6006b">
        Sadanand Eye Clinic
      </p>
      <hr />
      <ul
        class="d-flex justify-content-around align-center mx-1"
        style="list-style: none"
      >
        <li><i class="fas fa-comments"></i></li>
        <li><i class="fas fa-video"></i></li>
        <li><i class="fas fa-phone-alt"></i></li>
        <li><b class="text-success">&#8377;${item.appointment_fees}</b></li>
      </ul>
    </div>
  </div>`;
  });
}

plotMarkers(doctors);

var speciality = [];
var available_doctors = [];
var genderfilter = [];
var final_array_of_doctors = [];
var x = -1;
var fieldflag = 0;
var dayflag = 0;
var genderflag = 0;

function compareObjects(object1, object2, key) {
  const obj1 = object1[key];
  const obj2 = object2[key];

  if (obj1 < obj2) {
    return -1;
  }
  if (obj1 > obj2) {
    return 1;
  }
  return 0;
}

function compareObjectsDes(object1, object2, key) {
  const obj1 = object1[key];
  const obj2 = object2[key];

  if (obj1 < obj2) {
    return 1;
  }
  if (obj1 > obj2) {
    return -1;
  }
  return 0;
}

function toggle1(a) {
  x = a;
}

function priceFilter() {
  if (x === 0) {
    var newDoctors = final_array_of_doctors;
    newDoctors.sort((a, b) => {
      return compareObjects(a, b, "appointment_fees");
    });
    // plotMarkers(newDoctors);
  } else if (x === 1) {
    var newDoctors = final_array_of_doctors;
    newDoctors.sort((a, b) => {
      return compareObjectsDes(a, b, "appointment_fees");
    });
    // plotMarkers(newDoctors);
  } else if (x === -1) {
    var newDoctors = final_array_of_doctors;
  }
  // console.log(newDoctors);
  plotMarkers(newDoctors);
}

function availableFilter(day) {
  var temp_doctors = doctors.filter((el) => {
    return el.available == day;
  });

  available_doctors = [...available_doctors, ...temp_doctors];
  // console.log(available_doctors)
  console.log(temp_doctors);
  dayflag = 1;
}

function fieldFilter(field) {
  var temp_array = doctors.filter((el) => {
    return el.field == field;
  });
  speciality = [...speciality, ...temp_array];
  // if (newDoctors.length === 0) {
  //   return alert("No doctors available for this filter");
  // }
  // plotMarkers(newDoctors);
  fieldflag = 1;
}

function search_doctor() {
  let input = document.getElementById("searchbar").value;
  input = input.toLowerCase();
  var req_doctors = [];
  doctors.forEach((element) => {
    if (element.name.toLowerCase().includes(input)) {
      req_doctors.push(element);
    }
  });
  plotMarkers(req_doctors);
}

function Female() {
  doctors.forEach((element) => {
    if (element.gender === "Female") {
      genderfilter.push(element);
    }
  });
  // plotMarkers(fem_doctors)
  genderflag = 1;
}

function Male() {
  doctors.forEach((element) => {
    if (element.gender === "Male") {
      genderfilter.push(element);
    }
  });
  // plotMarkers(male_doctors)
  genderflag = 1;
}

function savechanges() {
  if (genderflag === 0) {
    genderfilter = doctors;
  }

  if (fieldflag === 0) {
    speciality = doctors;
  }

  if (dayflag === 0) {
    available_doctors = doctors;
  }

  var partial_array_of_doctors = [];
  speciality.forEach((element) => {
    available_doctors.forEach((e) => {
      if (e === element) {
        partial_array_of_doctors.push(e);
      }
    });
  });
  partial_array_of_doctors.forEach((element) => {
    genderfilter.forEach((e) => {
      if (e === element) {
        final_array_of_doctors.push(e);
      }
    });
  });
  if (final_array_of_doctors.length === 0) {
    return alert("No doctors available for this filter");
  } else {
    priceFilter();
  }

  // speciality = [];
  // available_doctors = [];
  // genderfilter = [];
  // final_array_of_doctors = [];
  // x = -1;
  // fieldflag = 0;
  // dayflag = 0;
  // genderflag = 0;
}

// var speciality=[]
// var available_doctors=[]
// var genderfilter=[]

// var final_array_of_doctors=[]
// var a = speciality.length;
// var b = available_doctors.length;
// var c = genderfilter.length;
// var n = Math.min(a,b,c);

//high to low = 1
//low to high = 0

{
  /* <li class="dropdown-item" onclick="priceFilter('low')">Low to High</li>
<li class="dropdown-item" onclick="priceFilter('high')">High to Low</li> */
}
