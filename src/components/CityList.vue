<template>
    <div v-for="city in allSavedCities" :key="city.id">
        <CityCard :city="city" @click="goToCityView(city)" />
    </div>

    <p v-if="allSavedCities.length===0">
        No locations added. To start tracking a location, search in the field above.
    </p>
</template>

<script setup lang="ts">
import axios from 'axios';
import { ref } from 'vue';
import type { SavedCityWeatherView, RetrievedCityWeatherView } from '@/types/index';
import type { WeatherData } from '@/types/cityWeather';
import CityCard from '@/components/CityCard.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const savedCities = ref<SavedCityWeatherView[]>([]);
const allSavedCities = ref<RetrievedCityWeatherView[]>([]);

const getCities = async () => {
    if(localStorage.getItem('savedCities')){
        let localStorageData: string | any = localStorage.getItem('savedCities');
        savedCities.value = JSON.parse(localStorageData);
    }

    let requests: any[] = [];
    savedCities.value.forEach((city: SavedCityWeatherView) => {
        requests.push(
            axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${city.coords.lat}&lon=${city.coords.lng}&appid=7efa332cf48aeb9d2d391a51027f1a71&units=imperial`)
        );
    });

    const weatherData: WeatherData[] = await Promise.all(requests);

    // Delay
    await new Promise(res => setTimeout(res, 1000));

    weatherData.forEach((city: WeatherData, index) => {
        allSavedCities.value.push({
            id: savedCities.value[index].id,
            city: savedCities.value[index].city,
            state: savedCities.value[index].state,
            coords: savedCities.value[index].coords,
            weather: city.data
        });
    })
}

await getCities();

const goToCityView = (city: RetrievedCityWeatherView) => {
    router.push({
        name: 'cityView',
        params: { city: city.city, state: city.state },
        query: {
          id: city.id,
          lat: city.coords.lat,
          lng: city.coords.lng
        }
    })
}

</script>