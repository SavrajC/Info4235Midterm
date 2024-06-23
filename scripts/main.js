function initMap() {
  const kpuSurreyLibrary = { lat: 49.1334, lng: -122.8905 };
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 14,
    center: kpuSurreyLibrary,
  });
  const kpuMarker = new google.maps.Marker({
    position: kpuSurreyLibrary,
    map: map,
    title: "KPU Surrey Library",
  });

  const directionsService = new google.maps.DirectionsService();
  const directionsRenderer = new google.maps.DirectionsRenderer();
  directionsRenderer.setMap(map);

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const userLocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };

      const userMarker = new google.maps.Marker({
        position: userLocation,
        map: map,
        title: "Your Location",
      });

      map.setCenter(userLocation);

      const request = {
        origin: userLocation,
        destination: kpuSurreyLibrary,
        travelMode: "DRIVING",
      };

      directionsService.route(request, (result, status) => {
        if (status === "OK") {
          directionsRenderer.setDirections(result);
        } else {
          console.error("Directions request failed due to " + status);
        }
      });
      calculateDistanceMatrix(userLocation, kpuSurreyLibrary);
    });
  } else {
    alert("Geolocation is not supported");
  }
}

function calculateDistanceMatrix(origin, destination) {
  const service = new google.maps.DistanceMatrixService();
  service.getDistanceMatrix(
    {
      origins: [origin],
      destinations: [destination],
      travelMode: "DRIVING",
    },
    (response, status) => {
      if (status === "OK") {
        const distance = response.rows[0].elements[0].distance.text;
        document.getElementById(
          "distance"
        ).innerText = `Distance to KPU Surrey Library: ${distance}`;
      } else {
        console.log("Distance Matrix request failed due to " + status);
      }
    }
  );
}
