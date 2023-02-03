<template>
  <main class="container text-white">
    <div class="pt-4 mb-8 relative">
      <input v-model="searchQuery"
      @input="getSearchResult"
      type="text" class="w-full py-2 px-1 bg-transparent border-b
       focus:border-weather-secondary focus:outline-none focus:shadow-[0px_1px_0_0_#004E71]">

       <ul v-if="mapBoxSearchResults.length"
        class="absolute top-[66px] w-full bg-weather-secondary text-white py-2 px-1 shadow-md">
          <li v-for="searchResult in mapBoxSearchResults" :key="searchResult.id"
           @click="previewCity(searchResult)" class="py-2 cursor-pointer">
            {{ searchResult.place_name }}
          </li>
       </ul>

       <div v-else class="absolute top-[66px] w-full text-white py-2 px-1">
          <p v-if="searchErrorStatus">Sorry, something went wrong, please try again.</p>
          <p v-if="noResultStatus && !searchErrorStatus">No results match your query, try a different term.</p>
       </div>
    </div>

    <div class="flex flex-col gap-4">
      <Suspense>
        <CityList />
        
        <template #fallback>
            <CityCardSkeleton/>
        </template>
      </Suspense>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Feature } from '@/types/mapbox';
import axios from 'axios';
import { useRouter } from 'vue-router';
import CityList from '@/components/CityList.vue';
import CityCardSkeleton from '@/components/CityCardSkeleton.vue';

const router = useRouter();
const mapboxAPIKey = 'pk.eyJ1Ijoiam9obmtvbWFybmlja2kiLCJhIjoiY2t5NjFzODZvMHJkaDJ1bWx6OGVieGxreSJ9.IpojdT3U3NENknF6_WhR2Q'
const searchQuery = ref<string>('');
const queryTimeout = ref<number>();
const mapBoxSearchResults = ref<Feature[]>([]);
const searchErrorStatus = ref<boolean>(false);
const noResultStatus = ref<boolean>(false);

const getSearchResult = () => {
  noResultStatus.value = false;
  clearTimeout(queryTimeout.value);
  queryTimeout.value = setTimeout(async() => {
    if(searchQuery.value !== ''){
      try{
        const { data } = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery.value}.json?access_token=${mapboxAPIKey}&types=place`);
        mapBoxSearchResults.value = data.features;
      }catch {
        searchErrorStatus.value = true;
      }
      if(mapBoxSearchResults.value.length===0) {noResultStatus.value = true;}
      return;
    }
    mapBoxSearchResults.value = [];
  }, 300);
}

const previewCity = (searchResult: Feature) => {
  const [ city, state ] = searchResult.place_name.split(",");

  router.push({
    name: 'cityView',
    params: { city: city, state: state.replace(" ", "") },
    query: {
      lat: searchResult.geometry.coordinates[1],
      lng: searchResult.geometry.coordinates[0],
      preview: 'true'
    }
  })
}

</script>
