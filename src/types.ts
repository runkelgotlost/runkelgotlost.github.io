export interface RunkState {
    id?: number
    name: string
    description: string
    handling: string
    image: string
}

export interface RunkLocation {
    id?: number
    latitude: string
    longitude: string
    state_id: string
    image: string
}

export interface LatLng {
    latitude: number
    longitude: number
}
