<template>
  <CustomQuery
    v-slot="{ data }"
    :path="resolvedPath"
    :only="['body']"
    find="one"
  >
    <span
      v-if="(data.body.toc && data.body.toc.links.length) || isTitleShownWithNoContent"
      id="toc-title"
    >{{ props.title }}</span>
    <ul
      v-if="data.body.toc && data.body.toc.links"
      id="toc-container"
    >
      <li
        v-for="link in data.body.toc.links"
        :key="link.text"
        class="toc-topitem-and-sublist"
      >
        <div
          :id="`toc-item-${link.id}`"
          class="toc-item toc-topitem"
          :class="{ 'active-toc-item active-toc-topitem': activeTocIds.has(link.id) || link.id === lastVisibleHeading }"
        >
          <a
            :href="`#${link.id}`"
            class="toc-link toc-toplink"
          >{{
            link.text }}</a>
        </div>

        <ul
          v-if="isSublistShown && link.children && link.children.length"
          class="toc-sublist"
        >
          <li
            v-for="sublink in link.children"
            :key="sublink.id"
            class="toc-item toc-sublist-item"
            :class="{ 'active-toc-item active-toc-sublist-item': activeTocIds.has(sublink.id) || sublink.id === lastVisibleHeading }"
          >
            <a
              :href="`#${sublink.id}`"
              class="toc-link toc-sublink"
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
  isSublistShown: {
    type: Boolean,
    default: true,
  },
  isTitleShownWithNoContent: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: 'Table of Contents',
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

.toc-sublist-item {
  padding-left: 1rem;
}

a:link,
a:hover,
a:active,
a:visited {
  text-decoration: none;
  color: inherit;
}

ul,
ol {
  list-style: none;
  padding: 0;
  margin: 0;
}
</style>
