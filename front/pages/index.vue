<template>
    <section class="bg-slate dark:bg-dark-50">
        <div class="py-8 px-4 mx-8 max-w-screen-xl lg:py-16">
            <div class="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16">
                <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-dark">Nos commercants</h2>
            </div>
            <div class="grid gap-8 mb-6 lg:mb-16 md:grid-cols-2">
                <MerchantCard :merchant="merchant" v-for="merchant in store.getMerchants" :key="merchant.id" />
            </div>
        </div>
    </section>
</template>

<script setup>  
import { useIndex } from '~/stores/index'
const store = useIndex()
const config = useRuntimeConfig();
const data = await(await fetch(config.public.URL_BACK + 'api/merchants')).json()
    store.setMerchants(data)

</script>

<style>

</style>