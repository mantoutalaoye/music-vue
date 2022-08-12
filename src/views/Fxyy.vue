<template>
  <div class="fxyybox">
    <ul>
      <router-link to="/fxyy/recommend" custom v-slot="{ isActive, navigate }">
        <li @click="navigate" :class="isActive ? 'activeClassfxyy' : ''">
          个人推荐
        </li>
      </router-link>
      <router-link
        to="/fxyy/rankinglist"
        custom
        v-slot="{ isActive, navigate }"
      >
        <li @click="navigate" :class="isActive ? 'activeClassfxyy' : ''">
          排行榜
        </li>
      </router-link>
      <router-link to="/fxyy/fxplaylist" custom v-slot="{ isActive, navigate }">
        <li @click="navigate" :class="isActive ? 'activeClassfxyy' : ''">
          歌单
        </li>
      </router-link>
    </ul>
    <router-view></router-view>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(["userId"]),
  },
  created() {
    this.catlist();
  },
  methods: {
    ...mapActions(["catlist"]),
  },
};
</script>
<style lang="scss" scoped>
.fxyybox {
  overflow: auto;
  ul {
    margin: 0 30px;
    display: flex;
    li {
      margin-right: 20px;
      cursor: pointer;
      line-height: 50px;
      height: 50px;
      box-sizing: border-box;
    }
  }
}
.fxyybox::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 3px; /*高宽分别对应横竖滚动条的尺寸*/
}
.fxyybox::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 3px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #ddd;
}
.activeClassfxyy {
  font-weight: 900;
  font-size: 20px;
  border-bottom: 3px solid #ec4141;
}
</style>
