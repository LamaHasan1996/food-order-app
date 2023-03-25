import React, { useEffect, useState } from "react";
import { restaurants } from "../../utils/data";

export default function Map() {
  const [map, setMap] = useState(null);
  const [currentLocationMarker, setCurrentLocationMarker] = useState(null);
  const [restaurantMarkers, setRestaurantMarkers] = useState([]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDsC_zRb6eZK5ExpD1LOPefTDZctZ7ULyY&callback=initMap&callback=initMap&libraries=drawing`;
    script.defer = true;
    script.async = true;
    document.head.appendChild(script);
    window.initMap = function () {
      const map = new window.google.maps.Map(document.getElementById("map"), {
        zoom: 13,
      });
      const drawingManager = new window.google.maps.drawing.DrawingManager({
        drawingMode: null,
        drawingControl: true,
        drawingControlOptions: {
          position: window.google.maps.ControlPosition.TOP_CENTER,
          drawingModes: [
            window.google.maps.drawing.OverlayType.MARKER,
            window.google.maps.drawing.OverlayType.POLYGON,
            window.google.maps.drawing.OverlayType.RECTANGLE,
            window.google.maps.drawing.OverlayType.CIRCLE,
            window.google.maps.drawing.OverlayType.POLYLINE,
          ],
        },
      });
      drawingManager.setMap(map);
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

  function addRestaurantMarkers(map, currentLocationMarker) {
    const markers = restaurants.map((restaurant) => {
      const marker = new window.google.maps.Marker({
        position: { lat: restaurant.lat, lng: restaurant.lng },
        map: map,
        title: restaurant.title,
        icon: "/images/icons/restaurant.png",
      });
      marker.addListener("click", () => {
        const directionsService = new window.google.maps.DirectionsService();
        const directionsRenderer = new window.google.maps.DirectionsRenderer();
        directionsRenderer.setMap(map);
        directionsService.route(
          {
            origin: currentLocationMarker.getPosition(),
            destination: marker.getPosition(),
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

      return marker;
    });
    var markerCluster = new MarkerClusterer(map, markers, {
      imagePath:
        "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
    });
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
