<template>
  <div class="listcon">
    <!-- :immediate-check="false" -->
    <nav>
      <span></span>
      <span></span>
      <span>音乐标题</span>
      <span>歌手</span>
      <span>专辑</span>
      <span>时长</span>
      <span>热度</span>
    </nav>
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
        <span
          ><van-icon name="service-o" @click="ifbangq(item)" /><van-icon
            name="like-o"
            v-if="!item.islike"
          />
          <van-icon name="like" v-if="item.islike" color="#EC4141" />
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
          <i v-for="(ges, index) in item.ar" :key="index">
            {{ index == 0 ? "" : " &nbsp;/ " }}<i>{{ ges.name }}</i>
          </i>
        </span>
        <span>{{ item.al.name }}</span>
        <span>{{ dtime(item.dt) }}</span>
        <span>
          <el-progress
            :percentage="item.pop"
            :show-text="false"
            color="#ccc"
            :stroke-width="3"
            class="redujdt"
          >
          </el-progress>
        </span>
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
    ...mapState(["audioid", "likelist"]),
  },

  watch: {
    $route(to, from) {
      //limit : 返回数量 , 默认为 30 offset : 偏移数量，用于分页 , 如 : 如 :( 页数 - 1)*30, 其中 30 为 limit 的值 , 默认为 0
      //type: 搜索类型；默认为 1 即单曲 , 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单......
      this.list = [];
      this.offset = 0;
      this.onLoad();
    },
  },
  created() {
    this.list = [];
    this.offset = 0;
    this.onLoad();
  },
  methods: {
    ...mapMutations(["getaudiosrc", "addplayinglist", "addrecently"]),
    ...mapActions(["actaddrecently"]),
    ifbangq(item) {
      http1(`/song/url?id=${item.id}`).then((res) => {
        if (!res.data.data[0].url) {
          this.$message("应版权商要求，该资源暂时无法播放");
        } else {
          //添加至播放列表
          this.addplayinglist({
            id: item.id,
            name: item.name,
            ar: item.ar,
            dt: item.dt,
          });
          //添加至最近播放
          this.actaddrecently(item.id);
          // this.getaudiosrc(item.id);
        }
      });
    },
    dtime(time) {
      return moment(time).format("mm:ss");
    },
    onLoad() {
      http1(
        `/cloudsearch?keywords=${
          this.$route.query.searchname
        }&limit=30&offset=${this.offset++ * 30}`
      ).then((res) => {
        let arr1 = res.data.result.songs;
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
        // 数据全部加载完成
        if (arr1.length < 30) {
          this.finished = true;
        }
      });
    },
  },
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
    grid-template-columns: 5fr 5fr 33fr 15fr 19fr 10fr 13fr;
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
      width: 33%;
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
      width: 15%;
    }
    & > span:nth-child(5) {
      width: 19%;
    }
    & > span:nth-child(6) {
      color: #999;
      font-weight: 100;
      width: 10%;
    }
    & > span:nth-child(7) {
      width: 10%;
      .redujdt {
        width: 80%;
      }
    }
  }
  .bmx {
    background-color: #f9f9f9;
  }
}
</style>