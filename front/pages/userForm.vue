<template>
  <section class="bg-gray-50 dark:bg-gray-900">
    <div class="flex flex-row items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div class="logo mr-6"><img class="rounded h-48 w-48" :src="imgSrc" alt="" srcset="">
        <input type="file" hidden ref="uploadPhoto" @change="fileSelected">
        <button class="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-400 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150 mt-2" @click="openFileUpload">Changez votre photo</button>
      </div>
      <div class="form">
        <div class="mb-6">
          <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
          <input v-model="user.email" type="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required>
          <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ancien mot de passe</label>
          <input v-model="formData.password" type="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nouveau mot de passe</label>
          <input v-model="formData.passwordConfirm" type="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        </div>
        <div class="mb-6">

          <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description du shop</label>
          <textarea v-model="user.description" id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Décrivez votre shop"></textarea>

        </div>
        <div class="mb-6">
          <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Adresse</label>
          <input v-model="user.address" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        </div>

        <button class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" @click="sendData()">Sauvegarder</button>
      </div>


    </div>
  </section>
</template>
<script setup>
import { useIndex } from '~/stores/index'
const store = useIndex()
const config = useRuntimeConfig();
const options = {
  headers: {
    authorization: "Bearer " + store.getToken
  }
}
const formData = {
  password: '',
  passwordConfirm: ''
}
const uploadPhoto = ref()
const { data: user } = await useFetch(config.public.URL_BACK + 'api/users/me', options)
const imgSrc = config.public.URL_BACK + 'api/users/photo/' + user.value._id
async function sendData() {
  const { data: data } = await useFetch(config.public.URL_BACK + 'api/users/me', {
    method: 'POST',
    body: {
      "user": user,
      "password": formData
    },
    headers: {
      authorization: "Bearer " + store.getToken
    }
  })
}
function openFileUpload(){
  uploadPhoto.value.click()
}
async function fileSelected(){
  const formData = new FormData()
  formData.append('avatar', uploadPhoto.value.files[0])
  const { data: user } = await useFetch(config.public.URL_BACK + 'api/users/photo', {
    method: 'POST',
    body: formData,
    headers: {
      authorization: "Bearer " + store.getToken
    }
  })
}
</script>
  
<style>

</style>