import type { Data } from '@/types/cityWeather';
import type { LocationQueryValue } from "vue-router"

export interface SavedCityWeatherView {
    id: string | number,
    city: string | string[],
    state: string | string[],
    coords: Coords
}

export interface RetrievedCityWeatherView {
    id: string | number,
    city: string | string[],
    state: string | string[],
    coords: Coords,
    weather: Data
}

export interface Coords{
    lat: LocationQueryValue | LocationQueryValue [],
    lng: LocationQueryValue | LocationQueryValue []
}