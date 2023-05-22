import { Marker} from '@react-google-maps/api' 

export const CurrentLocationMarker = ({position}) => {
    return <Marker position={position} icon={{url: '/geoMarker.svg', scaledSize: new window.google.maps.Size(50, 50),}} /* /* /* label={{text: 'We are here', className: s.text, fontSize: '20px', color: 'red'}} */ />
}