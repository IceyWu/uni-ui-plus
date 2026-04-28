<script setup lang="ts">
  import { VPDocAsideSponsors } from 'vitepress/theme'
  import { computed } from 'vue'
  import { useSponsor } from '../composables/sponsor'

  const { data } = useSponsor()

  const sponsors = computed(
    () =>
      data?.value.map((sponsor) => ({
        size: sponsor.size === 'big' ? 'mini' : 'xmini',
        items: sponsor.items
      })) ?? []
  )
</script>

<template>
  <VPDocAsideSponsors v-if="data" :data="sponsors" />
</template>
