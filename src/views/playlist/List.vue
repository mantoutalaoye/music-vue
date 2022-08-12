<template>
  <div class="listcon">
    <!-- :immediate-check="false" -->
    <nav>
      <span></span>
      <span>操作</span>
      <span>标题</span>
      <span>歌手</span>
      <span>专辑</span>
      <span>时间</span>
    </nav>
    <div v-if="!list.length">
      <el-skeleton-item
        v-for="item in 10"
        :key="item"
        variant="text"
        style="height: 25px; border-radius: 5px; margin: 2px 20px"
      />
    </div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :immediate-check="false"
    >
      <p
        v-for="(item, index) in list"
        :key="item.id"
        :class="(index + 1) % 2 == 1 ? 'bmx' : ''"
      >
        <span>
          <template v-if="item.id !== audioid">{{ index + 1 }}</template>

          <van-icon name="volume" v-if="item.id == audioid" color="#EC4141" />
        </span>
        <span>
          <!-- 播放按钮 -->
          <van-icon name="service-o" @click="ifbangq(item)" />
          <!-- 是否喜欢 -->
          <van-icon
            name="like-o"
            v-if="!item.islike"
            @click="likemusic(item.id, index, true)"
          />
          <van-icon
            name="like"
            v-if="item.islike"
            color="#EC4141"
            @click="likemusic(item.id, index, false)"
          />
        </span>
        <span :class="item.id == audioid ? 'bsered' : ''"
          >{{ item.name }}
          <small v-if="item.alia.length">&nbsp;({{ item.alia[0] }})</small>
          <div class="vipmusic" v-if="item.fee == 1">
            <span>VIP</span>
            <span>试听</span>
          </div>
        </span>
        <span>
          <i v-for="(ges, index) in item.ar" :key="ges.id">
            {{ index == 0 ? "" : " &nbsp;/ " }}<i>{{ ges.name }}</i>
          </i>
        </span>
        <span>{{ item.al.name }}</span>
        <span>{{ dtime(item.dt) }}</span>
      </p>
    </van-list>
  </div>
</template>
<script>
import { http1 } from "../../util/http";
import moment from "moment";
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  data() {
    return {
      list: [],
      trackCount: 0,
      loading: false,
      finished: false,
      offset: 0,
    };
  },
  computed: {
    ...mapState(["playlist", "audioid", "userId", "likelist"]),
  },

  watch: {
    $route(to, from) {
      // 这里可以操作逻辑变化
      // 重新执行获取数据的函数

      this.loading = false;
      this.finished = false;
      this.offset = 0;
      this.list = [];
      http1(
        `/playlist/detail?id=${
          this.$route.params.id
        }&cookie=${localStorage.getItem("cookie")}`
      ).then((res) => {
        this.trackCount = res.data.playlist.trackCount;
        this.onLoad();
      });
    },
  },
  created() {
    console.log("create");
    this.loading = false;
    this.finished = false;
    this.offset = 0;
    this.list = [];
    http1(
      `/playlist/detail?id=${
        this.$route.params.id
      }&cookie=${localStorage.getItem("cookie")}`
    ).then((res) => {
      this.trackCount = res.data.playlist.trackCount;
      this.onLoad();
    });
  },
  methods: {
    ...mapMutations(["getaudiosrc", "replaceplayinglist", "getlikelist"]),
    ...mapActions(["actaddrecently"]),
    ifbangq(item) {
      http1(`/check/music?id=${item.id}`).then(
        (res) => {
          this.actaddrecently(item.id);
          this.replaceplayinglist(this.list);
        },
        (req) => {
          this.$message("应版权商要求，该资源暂时无法播放");
        }
      );
    },
    async likemusic(id, index, islikemusic) {
      //设置/取消喜欢
      await http1(
        `/like?id=${id}&like=${islikemusic}&cookie=${localStorage.getItem(
          "cookie"
        )}`
      ).then((res) => {
        console.log(res.data);
      });
      await http1(
        `/likelist?uid=${this.userId}&cookie=${localStorage.getItem(
          "cookie"
        )}&timestamp=${new Date().getTime() / 1000}`
      ).then((res) => {
        console.log(res.data);
        this.getlikelist(res.data.ids);
        console.log(index);
        this.list[index].islike = islikemusic;
        this.$message({
          message: islikemusic ? "喜欢设置成功" : "取消喜欢成功",
          type: "success",
        });
        this.$set(this.list, index, this.list[index]);
      });
    },
    dtime(time) {
      return moment(time).format("mm:ss");
    },
    onLoad() {
      http1(
        `/playlist/track/all?id=${this.$route.params.id}&limit=30&offset=${
          this.offset++ * 30
        }&cookie=${localStorage.getItem("cookie")}`
      ).then((res) => {
        // console.log(res.data.songs);
        let arr1 = res.data.songs;
        arr1.forEach((item) => {
          if (this.likelist.includes(item.id)) {
            item.islike = true;
          } else {
            item.islike = false;
          }
        });
        this.list = [...this.list, ...arr1];
        // 加载状态结束
        this.loading = false;
        console.log("总曲数", this.trackCount, "已加载曲数", this.list.length);
        if (this.list.length >= this.trackCount || this.list.length == 0) {
          //如果已加载的歌曲数量大于等于歌单总曲数或
          this.finished = true;
        }
      });
    },
  },
  // mounted() {
  //   this.height =
  //     document.documentElement.clientHeight -
  //     document.querySelector(".AppFooter").offsetHeight -
  //     document.querySelector(".AppNav").offsetHeight +
  //     "px";
  // },
};
</script>
<style lang="scss" scoped>
.bsered {
  color: #ec4141 !important;
}
.listcon {
  // overflow: hidden;
  nav {
    height: 40px;
    line-height: 40px;
    font-size: 13px;
    color: #666;
    display: grid;
    grid-template-columns: 5fr 5fr 38fr 18fr 24fr 10fr;
  }
  p {
    height: 35px;
    display: flex;
    span {
      display: flex;
      align-items: center;
      font-size: 14px;
      font-weight: 300;
      box-sizing: border-box;
      white-space: nowrap; /* 不换行 */
      overflow: hidden; /* 内容超出宽度时隐藏超出部分的内容 */
      text-overflow: ellipsis;
    }
    &:hover {
      background-color: #f0f1f2;
    }
    & > span:nth-child(1) {
      justify-content: end;
      padding: 0 10px;
      width: 5%;
      color: #aaa;
    }
    & > span:nth-child(2) {
      color: #999;
      padding: 0 5px;
      justify-content: space-around;
      font-size: 16px;
      width: 5%;
      i {
        cursor: pointer;
        &:hover {
          font-weight: normal;
          color: #000;
        }
      }
    }
    & > span:nth-child(3) {
      font-weight: 400;
      color: #333;
      width: 38%;
      small {
        color: #999 !important;
      }
      .vipmusic {
        display: flex;
        color: #ec4141;
        span {
          height: 14px;
          border: 1px solid #ec4141;
          border-radius: 2px;
          font-size: 12px;
          padding: 3px 2px;
          margin-left: 7px;
        }
      }
    }
    & > span:nth-child(4) {
      i {
        i {
          &:hover {
            font-weight: normal;
          }
          cursor: pointer;
        }
      }
      width: 18%;
    }
    & > span:nth-child(5) {
      width: 24%;
    }
    & > span:nth-child(6) {
      color: #999;
      font-weight: 100;
      width: 10%;
    }
  }
  .bmx {
    background-color: #f9f9f9;
  }
}
</style>