<template>
  <div class="sort-wrapper">
    <div class="sort-top">
      <div class="sort-border">
        <img src="@/assets/search-top/放大镜 .png" alt />
      </div>
    </div>
  </div>
</template>


<script>
export default {};
</script>


<style lang='less' scope>
.sort-wrapper {
  background-color: #f7f7f7;
  width: 100%;
  height: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  .sort-top {
    .sort-border {
      border-radius: 0.4rem;
      background-color: #fff;
      width: 6.96rem;
      height: 0.68rem;
      line-height: 0.68rem;
      img {
        margin-left: 0.2rem;
        width: 0.5rem;
        height: 0.5rem;
      }
    }
  }
}
</style>