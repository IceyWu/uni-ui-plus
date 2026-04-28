<script lang="ts" setup>
  import { ElImageViewer } from 'element-plus'
  import { ref } from 'vue'
  import { useAds } from '../composables/adsData'

  const { data } = useAds()

  const showViewer = ref(false)
  const previewUrl = ref('')

  const handleClick = (ad: any) => {
    if (ad.link) {
      window.open(ad.link, '_blank')
    } else if (ad.image) {
      previewUrl.value = ad.image
      showViewer.value = true
    }
  }
</script>

<template>
  <div class="sidebar-ad-container" v-if="data && data.length">
    <slot name="sidebar-ad-content">
      <!-- 默认广告内容 -->
      <div class="sidebar-ad-list">
        <div v-for="(ad, index) in data" :key="index" class="sidebar-ad-item">
          <div class="sidebar-ad-link" @click="handleClick(ad)"><img :src="ad.image" :alt="ad.title" class="sidebar-ad-img"></div>
        </div>
      </div>
    </slot>
    <el-image-viewer v-if="showViewer" :url-list="[previewUrl]" @close="showViewer = false" hide-on-click-modal teleported />
  </div>
</template>

<style scoped>
  .sidebar-ad-container {
    box-sizing: border-box;
    width: calc(100% - 6px);
    padding: 6px;
    margin: 6px 0;
    margin-right: 3px;
    margin-left: 3px;
    background-color: var(--vp-c-bg-soft);
    border-radius: 6px;
  }

  .sidebar-ad-list {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .sidebar-ad-item {
    width: 100%;
  }

  .sidebar-ad-link {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: var(--vp-c-text-1);
    text-decoration: none;
    cursor: pointer;
  }

  .sidebar-ad-img {
    width: 100%;
    height: auto;
    max-height: 120px;
    object-fit: cover;
    border-radius: 8px;
    transition: transform 0.3s ease;
  }

  .sidebar-ad-img:hover {
    transform: translateY(-2px);
  }

  .sidebar-ad-title {
    margin-top: 4px;
    font-size: 14px;
    text-align: center;
  }
</style>
