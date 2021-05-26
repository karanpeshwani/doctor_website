var doctors = [
  {
    name: "dr_reddy",
    langLat: [73.8273, 18.9433],
    available: "Monday",
    gender: "Male",
    field: "Cardiologist",
    rating: 4.7,
    appointment_fees: 300,
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
    if(item.field === 'Dermatologist'){
      var newLocation = new mapboxgl.Marker({ color: "yellow"})
      .setLngLat(item.langLat)
      .addTo(map);
    }

    else if(item.field === 'Cardiologist'){
      var newLocation = new mapboxgl.Marker({ color: "red"})
      .setLngLat(item.langLat)
      .addTo(map);
    }
    else if(item.field === 'General Physician'){
      var newLocation = new mapboxgl.Marker({ color: "green"})
      .setLngLat(item.langLat)
      .addTo(map);
    }

    else if(item.field === 'Dentist'){
      var newLocation = new mapboxgl.Marker({ color: "blue"})
      .setLngLat(item.langLat)
      .addTo(map);
    }
    else{
      var newLocation = new mapboxgl.Marker({ color: "black"})
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

function priceFilter(filterType) {
  if (filterType == "low") {
    var newDoctors = doctors;
    newDoctors.sort((a, b) => {
      return compareObjects(a, b, "appointment_fees");
    });
    plotMarkers(newDoctors);
  } else if (filterType == "high") {
    var newDoctors = doctors;
    newDoctors.sort((a, b) => {
      return compareObjectsDes(a, b, "appointment_fees");
    });
    plotMarkers(newDoctors);
  }
}

function availableFilter(day) {
  var newDoctors = doctors.filter((el) => {
    return el.available == day;
  });
  if (newDoctors.length === 0) {
    return alert("No doctors available for this filter");
  }
  plotMarkers(newDoctors);
}

function fieldFilter(field) {
  var newDoctors = doctors.filter((el) => {
    return el.field == field;
  });
  if (newDoctors.length === 0) {
    return alert("No doctors available for this filter");
  }
  plotMarkers(newDoctors);
}

function search_doctor(){
  let input = document.getElementById("searchbar").value
  input = input.toLowerCase();
  var req_doctors=[];
  doctors.forEach((element)=>{
    if(element.name.toLowerCase().includes(input)){
      req_doctors.push(element);
    }
  })
  plotMarkers(req_doctors);
}

function Female(){
  var fem_doctors=[];
  doctors.forEach((element)=>{
    if(element.gender === 'Female'){
      fem_doctors.push(element)
    }
  })
  plotMarkers(fem_doctors)
}

function Male(){
  var male_doctors=[];
  doctors.forEach((element)=>{
    if(element.gender === 'Male'){
      male_doctors.push(element)
    }
  })
  plotMarkers(male_doctors)
}


