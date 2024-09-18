<template>
  <CustomQuery
    v-slot="{ data }"
    :path="$route.path"
    :only="['body']"
    find="one"
  >
    <ul
      v-if="data.body.toc && data.body.toc.links"
      id="toc-container"
      class="toc-container"
    >
      <li
        v-for="link in data.body.toc.links"
        :id="`toc-item-${link.id}`"
        :key="link.text"
        class="toc-item"
      >
        <a
          :href="`#${link.id}`"
          :class="{ 'toc-link': true, 'active-toc-item': activeTocIds.has(link.id) || link.id === lastVisibleHeading }"
        >{{
          link.text }}</a>
        <ul
          v-if="link.children && link.children.length"
          class="toc-sublist"
        >
          <li
            v-for="child in link.children"
            :key="child.id"
            class="toc-item toc-subitem"
          >
            <a
              :href="`#${child.id}`"
              :class="{ 'toc-link': true, 'toc-sublink': true, 'active-toc-item': activeTocIds.has(child.id) || child.id === lastVisibleHeading }"
            > {{ child.text }}</a>
          </li>
        </ul>
      </li>
    </ul>
  </CustomQuery>
</template>

<script setup lang="ts">
import CustomQuery from './CustomQuery.vue'
import { ref, onMounted, onUnmounted } from '#imports'

const activeTocIds = ref<Set<string>>(new Set())
const lastVisibleHeading = ref<string>('')

const observeSections = () => {
  const options = {
    root: null,
    rootMargin: '0px 0px -80% 0px',
    threshold: [0, 0.25, 0.5, 0.75, 1],
  }

  const callback: IntersectionObserverCallback = async (entries: IntersectionObserverEntry[]): Promise<void> => {
    entries.forEach((entry) => {
      const id: string = entry.target.id
      if (entry.isIntersecting) {
        lastVisibleHeading.value = id
        activeTocIds.value.add(id)
      }
      else {
        activeTocIds.value.delete(id)
      }
    })
  }

  const observer: IntersectionObserver = new IntersectionObserver(callback, options)
  const sections: NodeListOf<HTMLElement> = document.querySelectorAll('h2, h3')

  sections.forEach((section: HTMLElement) =>
    observer.observe(section))

  onUnmounted((): void => {
    sections.forEach((section: HTMLElement) =>
      observer.unobserve(section))
  })
}

onMounted((): void => {
  observeSections()
})
</script>

<style>
.active-toc-item {
 color: #fef08a
}
</style>
