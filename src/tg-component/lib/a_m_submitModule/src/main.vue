<template>
  <div class="a_m_submitBox" :style="{height:boxHeight+'px'}">
    <div class="a_m_submitMain">
      <slot name="a_m_submit_boxMain" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Amsubmitmodule',
  props: {
    boxHeight: {
      type: String,
      default: '100'
    }
  }
}

</script>

<style lang="scss" scoped>
.a_m_submitBox{
  width: 100%;
  position:absolute;
  bottom: 0;
  left: 0;
  box-shadow: 0 -3px 4px rgba(4,4,4,.2);
  padding: 16px 24px;
  background-color: #fff;
  z-index: 30;
  .a_m_submitMain{
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;

  }
}
</style>
