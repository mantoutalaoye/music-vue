<template>
  <div class="Selectlist">
    <Luyou></Luyou>
    <router-view></router-view>
  </div>
</template>
<script>
import Luyou from "../../components/search/Luyou";
export default {
  components: {
    Luyou,
  },
  data() {
    return {
      height: "",
    };
  },
  mounted() {},
};
</script>
<style lang="scss" scoped>
.Selectlist {
  overflow: auto;
}
.Selectlist::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 3px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}
.Selectlist::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 3px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #ddd;
}
</style>
