<template>
  <a class="a_m_toBack" :href="href">
    <i class="el-icon-arrow-left" />
    <span>{{ content }}</span>
  </a>
</template>

<script>
export default {
  name: 'Amtoback',
  props: {
    content: {
      type: String,
      default: ''
    },
    href: {
      type: String,
      default: '/'
    }
  }
}
</script>

<style>

</style>
