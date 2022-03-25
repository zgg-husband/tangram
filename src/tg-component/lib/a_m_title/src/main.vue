<template>
  <div class="ag-title-bar">
    <span class="ag-title-before" :style="{backgroundColor:beforeColor}" /><span class="a_m_title">{{ content }}</span>
  </div>
</template>

<script>
export default {
  name: 'Amtitle',
  props: {
    content: {
      type: String,
      default: ''
    },
    beforeColor: {
      type: String,
      default: '#E60017'
    }
  }
}
</script>

<style>

</style>
