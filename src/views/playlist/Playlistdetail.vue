<template>
  <div class="Playlistdetail">
    <!-- 骨架屏 -->
    <el-skeleton style="width: 600px; padding: 25px" v-if="!play">
      <template slot="template">
        <div style="display: flex">
          <el-skeleton-item
            variant="image"
            style="width: 180px; height: 180px"
          />
          <div style="flex: 1; margin-left: 20px">
            <el-skeleton-item variant="text" style="width: 30%; height: 35px" />
            <el-skeleton-item variant="text" style="height: 25px" />
          </div>
        </div>
      </template>
    </el-skeleton>
    <div class="detailheader" v-if="play">
      <img :src="play.coverImgUrl + '?param=360y360'" alt="" />
      <div class="herdright">
        <p class="name">
          <!-- 如果歌单名为xxx喜欢的音乐 -->
          <span>歌单</span>{{ play.name == xhxh ? "我喜欢的音乐" : play.name }}
          <!-- 如果已登录、歌单创始人为登录账号、该歌单不为我喜欢的音乐 -->
          <i
            class="el-icon-edit"
            v-if="
              !nick == '' &&
              play.creator.nickname === nick.profile.nickname &&
              play.name !== xhxh
            "
            @click="updateplay(play.id)"
          ></i>
        </p>
        <!-- 创建时间及创建者 -->
        <div class="createtime">
          <el-avatar :size="23" :src="play.creator.avatarUrl"></el-avatar>
          <el-link type="primary">{{ play.creator.nickname }}</el-link>
          {{ createtime }}创建
        </div>
        <!-- 各种功能 -->
        <div class="gzgn">
          <el-button round size="medium" @click="replaceplayinglist"
            ><i class="el-icon-caret-right"></i> 播放全部</el-button
          >
          <el-button round size="medium"
            ><i class="el-icon-folder-checked"></i> 收藏 ({{
              jsxxx(play.subscribedCount)
            }})</el-button
          >
          <el-button round size="medium"
            ><i class="el-icon-paperclip"></i> 分享</el-button
          >
          <el-button round size="medium"
            ><i class="el-icon-download"></i> 下载全部</el-button
          >
        </div>
        <!-- 标签 -->
        <div class="bq" v-if="play.name !== xhxh">
          标签 ：<span v-for="item in play.tags" :key="item">{{
            item + "/"
          }}</span>
          <!-- 标签为空显示添加标签 -->
          <el-link type="primary" v-if="!play.tags.length">添加标签</el-link>
        </div>
        <div class="gq">
          歌曲 ：<span>{{ play.trackCount }} &nbsp;&nbsp;&nbsp;</span>
          播放：<span>{{ jsxxx(play.playCount) }}</span>
        </div>
        <div class="jj" v-if="play.name !== xhxh">
          <span>简介：</span>
          {{ play.description }}
          <el-link type="primary" v-if="!play.description">添加简介</el-link>
        </div>
      </div>
    </div>
    <router-link
      active-class="mttly"
      :to="'/playdetail/' + $route.params.id + '/list'"
      >歌曲列表</router-link
    >
    <router-link
      active-class="mttly"
      :to="'/playdetail/' + $route.params.id + '/comments'"
      >评论</router-link
    >
    <router-view></router-view>
  </div>
</template>
<script>
import { mapState } from "vuex";
import moment from "moment";
import http from "../../util/http";

export default {
  data() {
    return {
      play: null,
    };
  },
  computed: {
    createtime() {
      return moment(this.play.createTime).format("YYYY-MM-DD");
    },
    xhxh() {
      if (this.nick) {
        console.log("已登录");
        return this.nick.profile.nickname + "喜欢的音乐";
      } else {
        console.log("未登录");
        return "";
      }
    },
    ...mapState(["playlist", "userId", "nick"]),
  },
  watch: {
    $route(to, from) {
      http
        .http1(
          `/playlist/detail?cookie=${localStorage.getItem("cookie")}&id=${
            this.$route.params.id
          }`
        )
        .then((res) => {
          this.play = res.data.playlist;
        });
    },
  },
  created() {
    http
      .http1(
        `/playlist/detail?cookie=${localStorage.getItem("cookie")}&id=${
          this.$route.params.id
        }`
      )
      .then((res) => {
        this.play = res.data.playlist;
      });
  },
  methods: {
    updateplay(id) {
      this.$router.push({
        path: "/playdetails/update",
        query: { id: id },
      });
    },
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
    replaceplayinglist() {},
  },
};
</script>
<style lang="scss" scoped>
.detailheader {
  box-sizing: border-box;
  padding: 25px;
  display: flex;
  img {
    height: 180px;
    margin-right: 20px;
  }
  .herdright {
    flex: 1;
    .name {
      font-weight: 700;
      display: flex;
      align-items: center;
      font-size: 22px;
      .el-icon-edit {
        margin-left: 5px;
        font-weight: 200;
        cursor: pointer;
        &:hover {
          color: #666;
        }
      }
      span {
        margin-right: 10px;
        font-weight: normal;
        font-size: 12px;
        padding: 0 4px;
        border: 1px solid red;
        border-radius: 4px;
        color: red;
      }
    }
    .createtime {
      margin: 8px 0;
      color: #aaa;
      font-size: 12px;
      display: flex;
      align-items: center;
      .el-link {
        font-size: 12px !important;
        margin: 0 8px;
      }
    }
    .gzgn {
      margin-bottom: 8px;
    }
    .bq,
    .gq {
      font-size: 13px;
      margin-bottom: 8px;
      display: flex;
      align-items: center;
      .el-link {
        font-size: 12px !important;
        margin: 0 8px;
      }
      span {
        color: #666;
      }
    }
    .jj {
      font-size: 12px;
      height: 16px;
      line-height: 16px;
      white-space: pre-line;
      overflow: hidden; /* 内容超出宽度时隐藏超出部分的内容 */
      .el-link {
        font-size: 12px !important;
        margin: 0 8px;
      }
    }
  }
}
.Playlistdetail {
  overflow: auto;
  //router-link样式
  a {
    text-decoration: none;
    color: #000;
    margin-left: 20px;
    font-weight: 300;
    font-size: 15px;
  }
}
.Playlistdetail::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 3px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}
.Playlistdetail::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 3px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #ddd;
}
.mttly {
  font-weight: 600 !important;
  font-size: 18px !important;
}
</style>