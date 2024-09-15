import { defineNuxtModule, createResolver, addComponent } from '@nuxt/kit'

// Module options TypeScript interface definition
export interface ModuleOptions {}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-toc',
    configKey: 'nuxt-toc',
    compatibility: {
      nuxt: '>= 3.0.0',
    },
  },
  // Default configuration options of the Nuxt module
  defaults: {},
  setup(_options, _nuxt) {
    const resolver = createResolver(import.meta.url)

    addComponent({
      name: 'TableOfContents',
      filePath: resolver.resolve('runtime/components/TableOfContents.vue'),
    })
  },
})
