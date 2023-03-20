import React, { useEffect, useState } from "react";
import { restaurants } from "../../utils/data";

export default function Map() {
  const [map, setMap] = useState(null);
  const [currentLocationMarker, setCurrentLocationMarker] = useState(null);
  const [restaurantMarkers, setRestaurantMarkers] = useState([]);
  const distanceThreshold = 1;

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDsC_zRb6eZK5ExpD1LOPefTDZctZ7ULyY&callback=initMap`;
    script.defer = true;
    script.async = true;
    document.head.appendChild(script);
    window.initMap = function () {
      const map = new window.google.maps.Map(document.getElementById("map"), {
        zoom: 13,
      });
      setMap(map);
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            const currentLocationMarker = new window.google.maps.Marker({
              position: pos,
              map: map,
              title: "Your Location",
            });
            setCurrentLocationMarker(currentLocationMarker);
            map.setCenter(pos);
            addRestaurantMarkers(map, currentLocationMarker);
          },
          () => {
            handleLocationError(true, map.getCenter());
          }
        );
      } else {
        handleLocationError(false, map.getCenter());
      }
    };
  }, []);

  function distance(lat1, lng1, lat2, lng2) {
    const R = 6371; // radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLng = deg2rad(lng2 - lng1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const dist = R * c; // distance in km
    return dist;
  }

  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  function addRestaurantMarkers(map, currentLocationMarker) {
    let markers = [];
    for (let i = 0; i < restaurants.length; i++) {
      const restaurant = restaurants[i];
      const restaurantMarker = new window.google.maps.Marker({
        position: { lat: restaurant.lat, lng: restaurant.lng },
        map: map,
        title: restaurant.title,
        icon: "images/icons/restaurant.png",
      });
      restaurantMarker.addListener("click", () => {
        const directionsService = new window.google.maps.DirectionsService();
        const directionsRenderer = new window.google.maps.DirectionsRenderer();
        directionsRenderer.setMap(map);
        directionsService.route(
          {
            origin: currentLocationMarker.getPosition(),
            destination: restaurantMarker.getPosition(),
            travelMode: window.google.maps.TravelMode.DRIVING,
          },
          (response, status) => {
            if (status === "OK") {
              directionsRenderer.setDirections(response);
            } else {
              window.alert("Directions request failed due to " + status);
            }
          }
        );
      });

      let isDuplicate = false;
      for (let j = 0; j < markers.length; j++) {
        const existingMarker = markers[j];
        const dist = distance(
          existingMarker.getPosition().lat(),
          existingMarker.getPosition().lng(),
          restaurantMarker.getPosition().lat(),
          restaurantMarker.getPosition().lng()
        );
        if (dist <= distanceThreshold) {
          existingMarker.setIcon("images/icons/number-2.png");
          existingMarker.setTitle(
            markers[j]?.getTitle() + "&" + restaurantMarker?.getTitle()
          );
          markers = markers.filter((item) => item !== restaurantMarker);
          isDuplicate = true;
          break;
        }
      }

      if (!isDuplicate) {
        markers.push(restaurantMarker);
      }
    }

    setRestaurantMarkers(markers);
  }
  function handleLocationError(browserHasGeolocation, pos) {
    const infoWindow = new window.google.maps.InfoWindow();
    infoWindow.setPosition(pos);
    infoWindow.setContent(
      browserHasGeolocation
        ? "Error: The Geolocation service failed."
        : "Error: Your browser doesn't support geolocation."
    );
    infoWindow.open(map);
  }

  return (
    <div id="map" style={{ height: "500px" }}>
      Map Loading...
    </div>
  );
}
