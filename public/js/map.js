var myMarker
var myMap
var myRadius
var mapSetup = false
var stylesArray = [
  {
    'elementType': 'geometry',
    'stylers': [
      {
        'color': '#242f3e'
      }
    ]
  },
  {
    'elementType': 'labels.text.fill',
    'stylers': [
      {
        'color': '#746855'
      }
    ]
  },
  {
    'elementType': 'labels.text.stroke',
    'stylers': [
      {
        'color': '#242f3e'
      }
    ]
  },
  {
    'featureType': 'administrative.locality',
    'elementType': 'labels.text.fill',
    'stylers': [
      {
        'color': '#d59563'
      }
    ]
  },
  {
    'featureType': 'poi',
    'elementType': 'labels.text.fill',
    'stylers': [
      {
        'color': '#d59563'
      }
    ]
  },
  {
    'featureType': 'poi.business',
    'stylers': [
      {
        'visibility': 'off'
      }
    ]
  },
  {
    'featureType': 'poi.park',
    'elementType': 'geometry',
    'stylers': [
      {
        'color': '#263c3f'
      }
    ]
  },
  {
    'featureType': 'poi.park',
    'elementType': 'labels.text',
    'stylers': [
      {
        'visibility': 'off'
      }
    ]
  },
  {
    'featureType': 'poi.park',
    'elementType': 'labels.text.fill',
    'stylers': [
      {
        'color': '#6b9a76'
      }
    ]
  },
  {
    'featureType': 'road',
    'elementType': 'geometry',
    'stylers': [
      {
        'color': '#38414e'
      }
    ]
  },
  {
    'featureType': 'road',
    'elementType': 'geometry.stroke',
    'stylers': [
      {
        'color': '#212a37'
      }
    ]
  },
  {
    'featureType': 'road',
    'elementType': 'labels.text.fill',
    'stylers': [
      {
        'color': '#9ca5b3'
      }
    ]
  },
  {
    'featureType': 'road.highway',
    'elementType': 'geometry',
    'stylers': [
      {
        'color': '#746855'
      }
    ]
  },
  {
    'featureType': 'road.highway',
    'elementType': 'geometry.stroke',
    'stylers': [
      {
        'color': '#1f2835'
      }
    ]
  },
  {
    'featureType': 'road.highway',
    'elementType': 'labels.text.fill',
    'stylers': [
      {
        'color': '#f3d19c'
      }
    ]
  },
  {
    'featureType': 'transit',
    'elementType': 'geometry',
    'stylers': [
      {
        'color': '#2f3948'
      }
    ]
  },
  {
    'featureType': 'transit.station',
    'elementType': 'labels.text.fill',
    'stylers': [
      {
        'color': '#d59563'
      }
    ]
  },
  {
    'featureType': 'water',
    'elementType': 'geometry',
    'stylers': [
      {
        'color': '#17263c'
      }
    ]
  },
  {
    'featureType': 'water',
    'elementType': 'labels.text.fill',
    'stylers': [
      {
        'color': '#515c6d'
      }
    ]
  },
  {
    'featureType': 'water',
    'elementType': 'labels.text.stroke',
    'stylers': [
      {
        'color': '#17263c'
      }
    ]
  }
]
function setupMap (location, callback) {
  console.log('setupMap', location)
  $('div#map').fadeIn(500)
  $('div#placeholder').fadeOut(500)
  // Create a map object and specify the DOM element for display.
  myMap = new google.maps.Map(document.getElementById('map'), {
    center: location,
    zoom: 15,
    styles: stylesArray
  })
  // Create a marker and set its position.
  setTimeout(function() {
    myMarker = new google.maps.Marker({
      map: myMap,
      position: location,
      title: 'naxxfish',
      icon: 'img/marker.png',
      animation: google.maps.Animation.DROP
    })
    mapSetup = true
    callback()
  }, 2000)
  google.maps.event.trigger(myMap, 'resize')

}

function hideMap () {
  console.log('hideMap')
  $('div#map').fadeOut(500)
  $('div#placeholder').fadeIn(500)
  mapSetup = false
}

function processLocation (location) {
  console.log('processlocation', location)
  if (location !== null) {
    console.log('public location')
    var updatedPosition = new google.maps.LatLng(location.lat, location.lon)
    if (!mapSetup) {
      console.log('setting up map first')
      setupMap(updatedPosition, function () {
        processLocation(location)
      })
      return
    }
    console.log('updatedPosition', updatedPosition)
    myMap.setCenter(updatedPosition)
    myMarker.setPosition(updatedPosition)
    myRadius = new google.maps.Circle({
      center: updatedPosition,
      radius: location.acc + 20,
      map: myMap
    })
    setTimeout(function () {
      myMarker.setAnimation(google.maps.Animation.BOUNCE);
      setTimeout(function () {
        myMarker.setAnimation(null)
      }, 1000)
    }, 1000)


  } else {
    console.error('non public location')
    hideMap()
  }
  console.log('finished processLocation')
}
