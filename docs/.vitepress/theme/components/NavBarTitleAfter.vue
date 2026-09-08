<script lang="ts" setup>
  import packageConfig from '../../../../package.json'
</script>

<template>
  <el-tag effect="plain" size="small" style="vertical-align: middle;margin-left:8px;" text>{{ packageConfig.version }}</el-tag>
</template>
