<template>
  <!-- 模糊搜索框 -->
  <div
    class="Suggestbox"
    @mouseenter="yrycsuggest(1)"
    @mouseleave="yrycsuggest(2)"
    v-if="suggest"
  >
    <div class="suggestbox" v-if="suggest.songs">
      <p @click="tzss"><span class="iconfont">&#xe625;</span>单曲</p>
      <div
        v-for="item in suggest.songs"
        :key="item.id"
        @click="bfmusic(item.id)"
      >
        {{ item.name }} -
        <span v-for="item1 in item.artists" :key="item1.id"
          >{{ item1.name }}&nbsp;</span
        >
      </div>
    </div>
    <div class="suggestbox" v-if="suggest.artists">
      <p><span class="iconfont">&#xe614;</span>歌手</p>
      <div v-for="item in suggest.artists" :key="item.id">
        {{ item.name }}
      </div>
    </div>
    <div class="suggestbox" v-if="suggest.albums">
      <p><span class="iconfont">&#xe60a;</span>专辑</p>
      <div v-for="item in suggest.albums" :key="item.id">
        {{ item.name }} -
        <span>{{ item.artist.name }}&nbsp;</span>
      </div>
    </div>
    <div class="suggestbox" v-if="suggest.playlists">
      <p><span class="iconfont">&#xe62d;</span>歌单</p>
      <div v-for="item in suggest.playlists" :key="item.id">
        {{ item.name }}
      </div>
    </div>
  </div>
</template>
<script>
import { http1 } from "../../util/http";
import "../../assets/font_d3l96f4jgh/iconfont.css";
import { mapMutations, mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      suggest: null,
    };
  },
  props: ["searchname"],
  computed: {
    ...mapState(["audioid"]),
  },
  created() {
    http1(`/search/suggest?keywords=${this.searchname}`).then((res) => {
      this.suggest = res.data.result;
      console.log(this.suggest);
    });
  },
  watch: {
    searchname() {
      http1(`/search/suggest?keywords=${this.searchname}`).then((res) => {
        this.suggest = res.data.result;
        console.log(res.data);
      });
    },
  },
  methods: {
    ...mapMutations(["getaudiosrc", "addplayinglist"]),
    ...mapActions(["actaddrecently"]),
    tzss() {
      this.$emit("tzxxx"); //点击单曲
    },
    bfmusic(id) {
      console.log(1111);
      http1(`/song/detail?ids=${id}`).then((res) => {
        console.log(res.data.songs[0]);
        this.addplayinglist({
          id: res.data.songs[0].id,
          name: res.data.songs[0].name,
          ar: res.data.songs[0].ar,
          dt: res.data.songs[0].dt,
        });
        // this.getaudiosrc(id);  添加至最近播放时会切换id
        this.actaddrecently(id);
        this.$emit("bfmusic"); //通知关闭模糊搜索框
      });
    },
    yrycsuggest(i) {
      this.$emit("isyrycsuggest", i);
    },
  },
};
</script>
<style lang="scss" scoped>
.Suggestbox {
  position: fixed;
  z-index: 1000;
  top: 57px;
  left: 188px;
  overflow: auto;
  background-color: #fff;
  width: 350px;
  height: 550px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}
.suggestbox {
  p {
    margin: 10px;
    color: #999;
    font-size: 15px;
    span {
      margin-right: 5px;
    }
    &:hover {
      color: #222;
    }
  }
  div {
    padding: 8px 30px;
    font-size: 12px;
    &:hover {
      background-color: #f2f2f2;
    }
  }
}
</style>