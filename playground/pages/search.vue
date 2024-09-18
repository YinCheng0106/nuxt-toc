<script lang="ts" setup>
const search  = ref<string>('')

const results = ref<string[]>([])

watch(search, async (newSearch: string) => {
  results.value = await searchContent(newSearch);
})

</script>

<template>
  <main>
    <input v-model="search">

    <pre>{{ results }} </pre>
  </main>
</template>
