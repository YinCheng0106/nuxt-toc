<template>
  <CustomQuery
    v-slot="{ data }"
    :path="resolvedPath"
    :only="['body']"
    find="one"
  >
    <span id="toc-title">{{ props.title }}</span>
    <ul
      v-if="isSublistNested && data.body.toc && data.body.toc.links"
      id="toc-container"
      class="toc-container"
    >
      <li
        v-for="link in data.body.toc.links"
        :id="`toc-item-${link.id}`"
        :key="link.text"
        class="toc-item toc-topitem"
        :class="{ 'active-toc-item': activeTocIds.has(link.id) || link.id === lastVisibleHeading, 'active-toc-topitem': activeTocIds.has(link.id) || link.id === lastVisibleHeading }"
      >
        <a
          :href="`#${link.id}`"
          :class="{ 'toc-link': true, 'toc-toplink': true, 'active-toc-link': activeTocIds.has(link.id) || link.id === lastVisibleHeading, 'active-toc-toplink': activeTocIds.has(link.id) || link.id === lastVisibleHeading }"
        >{{
          link.text }}</a>
        <ul
          v-if="isSubListShown && link.children && link.children.length"
          class="toc-sublist"
        >
          <li
            v-for="sublink in link.children"
            :key="sublink.id"
            class="toc-item toc-subitem"
            :class="{ 'active-toc-subitem': activeTocIds.has(sublink.id) || sublink.id === lastVisibleHeading, 'active-toc-item': activeTocIds.has(sublink.id) || sublink.id === lastVisibleHeading }"
          >
            <a
              :href="`#${sublink.id}`"
              :class="{ 'toc-link': true, 'toc-sublink': true, 'active-toc-link': activeTocIds.has(sublink.id) || sublink.id === lastVisibleHeading, 'active-toc-sublink': activeTocIds.has(sublink.id) || sublink.id === lastVisibleHeading }"
            > {{ sublink.text }}</a>
          </li>
        </ul>
      </li>
    </ul>

    <ul
      v-if="!isSublistNested && data.body.toc && data.body.toc.links"
      id="toc-container"
      class="toc-container"
    >
      <li
        v-for="link in data.body.toc.links"
        :key="link.text"
      >
        <div
          :id="`toc-item-${link.id}`"
          class="toc-item toc-topitem"
          :class="{ 'active-toc-item': activeTocIds.has(link.id) || link.id === lastVisibleHeading, 'active-toc-topitem': activeTocIds.has(link.id) || link.id === lastVisibleHeading }"
        >
          <a
            :href="`#${link.id}`"
            :class="{ 'toc-link': true, 'toc-toplink': true, 'active-toc-link': activeTocIds.has(link.id) || link.id === lastVisibleHeading, 'active-toc-toplink': activeTocIds.has(link.id) || link.id === lastVisibleHeading }"
          >{{
            link.text }}</a>
        </div>

        <ul
          v-if="isSubListShown && link.children && link.children.length"
          class="toc-sublist"
        >
          <li
            v-for="sublink in link.children"
            :key="sublink.id"
            class="toc-item toc-subitem"
            :class="{ 'active-toc-subitem': activeTocIds.has(sublink.id) || sublink.id === lastVisibleHeading, 'active-toc-item': activeTocIds.has(sublink.id) || sublink.id === lastVisibleHeading }"
          >
            <a
              :href="`#${sublink.id}`"
              :class="{ 'toc-link': true, 'toc-sublink': true, 'active-toc-link': activeTocIds.has(sublink.id) || sublink.id === lastVisibleHeading, 'active-toc-sublink': activeTocIds.has(sublink.id) || sublink.id === lastVisibleHeading }"
            > {{ sublink.text }}</a>
          </li>
        </ul>
      </li>
    </ul>
  </CustomQuery>
</template>

<script setup lang="ts">
import CustomQuery from './CustomQuery.vue'
import { ref, onMounted, onUnmounted, useRoute, computed } from '#imports'

const activeTocIds = ref<Set<string>>(new Set())
const lastVisibleHeading = ref<string>('')

const props = defineProps({
  path: {
    type: String,
    default: '',
  },
  isSubListShown: {
    type: Boolean,
    default: true,
  },
  title: {
    type: String,
    default: 'Table of Contents',
  },
  isSublistNested: {
    type: Boolean,
    default: true,
  },
})

const route = useRoute()
const resolvedPath = computed(() => props.path || route.path)

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

.toc-subitem {
  padding-left: 1rem;
}
</style>
