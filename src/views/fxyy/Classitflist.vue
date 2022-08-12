<template>
  <!-- 歌单页的歌单展现 -->
  <div class="Playcatlist">
    <div class="playcatitem" v-for="item in playcatlist" :key="item.id">
      <div class="playlistimage">
        <el-image
          @click="tzplaydetail(item.id)"
          style="width: 100%; border-radius: 5px"
          :src="item.coverImgUrl"
          lazy
        ></el-image>
        <span class="dingwwww"><img src="/播放2.svg" alt="" /></span>
      </div>
      <span class="playlistname" @click="tzplaydetail(item.id)">{{
        item.name
      }}</span>

      <small>
        <i class="el-icon-caret-right"></i>
        <i>{{ jsxxx(item.playCount) }}</i>
      </small>
    </div>
  </div>
</template>

<script>
import { http1 } from "../../util/http";
export default {
  data() {
    return {
      playcatlist: [],
    };
  },
  created() {
    http1(`/top/playlist?cat=${this.$route.params.id}&limit=50&offset=1`).then(
      (res) => {
        this.playcatlist = res.data.playlists;
        console.log(res.data);
      }
    );
  },
  watch: {
    $route(to, from) {
      http1(
        `/top/playlist?cat=${this.$route.params.id}&limit=50&offset=1`
      ).then((res) => {
        this.playcatlist = res.data.playlists;

        console.log(res.data);
      });
    },
  },
  methods: {
    jsxxx(sl) {
      if (sl <= 9999) {
        return sl;
      }
      if (sl > 9999 && sl <= 100000000) {
        return (sl / 10000).toFixed() + "万";
      }
      if (sl > 99999999) {
        return (sl / 100000000).toFixed() + "亿";
      }
    },
    tzplaydetail(id) {
      this.$router.push(`/playdetail/${id}`);
    },
  },
};
</script>

<style lang="scss" scoped>
.Playcatlist {
  display: grid;
  grid-template-columns: repeat(5, 18%);
  row-gap: 1%;
  column-gap: 2.5%;
  .playcatitem {
    position: relative;
    cursor: pointer;
    .playlistimage:hover > span {
      opacity: 1;
    }
    .playlistimage {
      position: relative;
      .dingwwww {
        position: absolute;
        cursor: pointer;
        background-color: rgb(256, 256, 256);
        bottom: 0.9375rem;
        right: 0.625rem;
        width: 2.8125rem;
        height: 2.8125rem;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: all 0.5s;
        opacity: 0;
        &:hover {
          opacity: 1;
        }
        img {
          width: 1.125rem;
          height: 1.125rem;
          margin: 0;
        }
      }
    }
    .playlistname {
      font-size: 14px;
      cursor: pointer;
    }
    small {
      position: absolute;
      top: 2px;
      right: 5px;
      color: #fff;
    }
  }
}
</style>