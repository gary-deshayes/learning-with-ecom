<template>
  <div>
    <NuxtLayout />

  </div>
</template>

<script setup>
import { useIndex } from '~/stores/index'
const store = useIndex()
onMounted(() => {
  store.setToken(localStorage.getItem('token'))
}) 
</script>

