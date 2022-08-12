<template>
  <div class="Playinglistbox">
    <div class="playinglistnav">
      <h3>当前播放</h3>
      <p class="gnbox">
        总{{ playinglist.length }}首
        <span @click="clearplayinglist">清空列表</span>
      </p>
    </div>
    <div
      class="kklt555"
      :style="{
        height: height,
      }"
    >
      <p
        class="list"
        v-for="(item, index) in playinglist"
        :key="item.time"
        :class="(index + 1) % 2 == 0 ? 'bmx' : ''"
        @dblclick="sjbf(item.id)"
      >
        <span class="name" :class="item.id == audioid ? 'bsered' : ''">{{
          item.name
        }}</span>
        <span class="singer">{{ item.ar[0].name }}</span>
        <span class="time">{{ dtime(item.dt) }}</span>
        <van-icon
          class="bftbdw"
          name="volume"
          v-if="item.id == audioid"
          color="#EC4141"
        />
      </p>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.playinglistnav {
  margin: 15px 20px 0;
  height: 65px;
}
.kklt555 {
  overflow: auto;
}
.kklt555::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 3px; /*高宽分别对应横竖滚动条的尺寸*/
}
.kklt555::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 3px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #ddd;
}
.list {
  height: 35px;
  font-size: 12px;
  display: flex;
  color: #333;
  align-items: center;
  box-sizing: border-box;
  position: relative;
  padding: 0 20px;
  &:hover {
    background-color: #f4f4f4;
  }
  span {
    display: block;
  }
  & > span:nth-child(1) {
    width: 50%;
  }
  & > span:nth-child(2) {
    width: 25%;
  }
  & > span:nth-child(3) {
    color: #aaa;
    width: 25%;
  }
}
.gnbox {
  padding: 8px 0 15px;
  font-size: 12px;
  color: #aaa;
  border-bottom: 0.5px solid #aaa;
  position: relative;
  span {
    position: absolute;
    right: 0;
    cursor: pointer;
    color: #507daf;
  }
}
.bmx {
  background-color: #f9f9f9;
}
.bftbdw {
  position: absolute;
  left: 3px;
}
.bsered {
  color: #ec4141;
}
</style>
<script>
import { mapState, mapMutations } from "vuex";
import moment from "moment";
export default {
  data() {
    return {
      height: 0,
    };
  },
  computed: {
    ...mapState(["playinglist", "audioid"]),
  },
  methods: {
    ...mapMutations(["clearplayinglist", "getaudiosrc"]),
    dtime(time) {
      return moment(time).format("mm:ss");
    },
    sjbf(id) {
      this.getaudiosrc(id);
    },
  },
  mounted() {
    this.height = document.documentElement.clientHeight - 80 + "px";
  },
};
</script>