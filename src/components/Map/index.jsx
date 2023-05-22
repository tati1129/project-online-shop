import React from 'react'
import {GoogleMap} from '@react-google-maps/api'
import { defaultTheme } from './Theme';
import s from './style.module.css'
import { CurrentLocationMarker } from '../CurrentLocationMarker';

const containerStyle = {
    width: '100%',
    height: '100%'
  };
  
const defaultOptions = {
  panControl: true,
  zoomControl: true,
  mapTypeControl: false,
  scaleControl: false,
  streetViewControl: false,
  rotateControl: false,
  clickableIcons: false,
  keyboardShortcuts: false,
  scrollwheel: false,
  disableDoubleClickZoom: false,
  fullscreenControl: false,
  styles: defaultTheme
}
  

export default function Map({center}) {

const mapRef = React.useRef(undefined);

    const onLoad = React.useCallback(function callback(map) {
        mapRef.current = map
      }, [])
    
      const onUnmount = React.useCallback(function callback(map) {
        mapRef.current = undefined;
      }, [])

  return (
    <div className={s.container}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={15.5}
          onLoad={onLoad}
          onUnmount={onUnmount}
          options={defaultOptions}
        >
          <CurrentLocationMarker position={center} />
        </GoogleMap>
    </div>
  )
}
