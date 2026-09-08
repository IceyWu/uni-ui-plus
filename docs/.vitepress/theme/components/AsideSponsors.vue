<script lang="ts" setup>
  import { VPDocAsideSponsors } from 'vitepress/theme'
  import { computed } from 'vue'
  import { useSponsor } from '../composables/sponsor'

  const { data } = useSponsor()

  const sponsors = computed(
    () =>
      data?.value.map((sponsor) => ({
        items: sponsor.items,
        size: sponsor.size === 'big' ? 'mini' : 'xmini'
      })) ?? []
  )
</script>

<template>
  <VPDocAsideSponsors v-if="data" :data="sponsors" />
</template>
