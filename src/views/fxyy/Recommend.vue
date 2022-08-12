<template>
  <!-- 个人推荐 -->
  <div class="Recommend">
    <!-- 轮播图 -->
    <div class="swiperbox">
      <el-carousel
        :interval="4000"
        type="card"
        height="14.2rem"
        trigger="click"
      >
        <el-carousel-item v-for="item in swiperlist" :key="item.bannerId">
          <div class="swiperitem">
            <img
              :src="item.pic"
              alt=""
              @click="isplaybanner(item.song, item.url, item.targetId)"
            />
            <!-- //如果有url就往外跳 -->
            <span>{{ item.typeTitle }}</span>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
    <!-- 推荐歌单 -->
    <div class="recommendplaylist">
      <router-link to="/fxyy/fxplaylist"
        >推荐歌单<i class="el-icon-arrow-right"></i
      ></router-link>
      <div class="recommendplaylistbox">
        <!-- 每日推荐 -->
        <div class="everydaydiv">
          <div @click="tzeverydaysong">
            <span class="iconfont">&#xe627;</span>
            <span class="everydaydate">{{ date }}</span>
            <span class="bf"><img src="/播放2.svg" alt="" /></span>
          </div>
          <p>每日歌曲推荐</p>
        </div>
        <div v-for="item in recommendplaylist" :key="item.id">
          <div @click="tzplaydetail(item.id)">
            <img :src="item.picUrl" alt="" />
            <span class="bf"><img src="/播放2.svg" alt="" /></span>
          </div>
          <p @click="tzplaydetail(item.id)">{{ item.name }}</p>
          <small>
            <i class="el-icon-caret-right"></i>
            <i>{{
              cookieiiiiii ? jsxxx(item.playcount) : jsxxx(item.playCount)
            }}</i>
          </small>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { http1 } from "../../util/http";
import { mapMutations } from "vuex";
import "../../assets/font_233smh3cngw/iconfont.css";
export default {
  data() {
    return {
      swiperlist: [],
      date: 0,
      recommendplaylist: [],
      cookieiiiiii: "",
    };
  },
  created() {
    this.date = new Date().getDate();
  },
  mounted() {
    http1
      .post("/banner", {
        type: 2,
      })
      .then((res) => {
        console.log(res.data);
        this.swiperlist = res.data.banners;
      });

    if (localStorage.getItem("cookie")) {
      http1(
        `/recommend/resource?cookie=${localStorage.getItem("cookie")}`
      ).then((res) => {
        //获取推荐歌单
        this.recommendplaylist = res.data.recommend;
      });
      this.cookieiiiiii = 999;
    } else {
      http1(`/personalized?limit=9`).then((res) => {
        //获取推荐歌单
        console.log(res.data);
        this.recommendplaylist = res.data.result;
      });
    }
  },
  methods: {
    ...mapMutations(["addplayinglist", "getaudiosrc"]),
    isplaybanner(song, url, id) {
      console.log(999);
      if (song) {
        this.addplayinglist({
          id: song.id,
          name: song.name,
          ar: song.ar,
          dt: song.dt,
        });
        this.getaudiosrc(song.id);
      } else if (url) {
        window.open(url);
      }
    },
    tzeverydaysong() {
      this.$router.push("/recommendplaylist");
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
    tzplaydetail(id) {
      this.$router.push(`/playdetail/${id}`);
      // http.http1(`/playlist/detail?id=${id}`).then((res) => {
      //   console.log(res.data);
      // });
    },
  },
};
</script>
<style lang="scss">
.Recommend {
  margin: 10px 53px;
}
.swiperbox {
  .swiperitem {
    display: inline-block;
    position: relative;
    height: 100%;
    img {
      // width: 100%;
      height: 100%;
      border-radius: 5px;
    }
    span {
      position: absolute;
      right: 0;
      bottom: 0;
      background-color: #cc4a4a;
      font-size: 12px;
      color: #fff;
      padding: 2px 5px;
      border-radius: 5px 0 5px 0/5px 0 5px 0;
    }
  }
}
.recommendplaylist {
  a {
    color: #000;
    display: block;
    font-size: 20px;
    padding: 8px 0;
    font-weight: 800;
  }
  .recommendplaylistbox {
    // display: flex;
    // flex-wrap: wrap;
    // justify-content: space-between;
    display: grid;
    grid-template-columns: repeat(5, 18%);
    grid-gap: 2.5%;
    & > div {
      // width: 18%;
      position: relative;

      img {
        width: 100%;
        border-radius: 5px;
      }
      // background-color: #666;
      & > div {
        width: 100%;
        aspect-ratio: 1/1; //控制宽高比例1比1
        img {
          display: block; //清除行内块的空格
        }
        // height: 0;
        // // height: 192px;
        // padding-bottom: 100%;
        border-radius: 5px;
        background-color: #666;
        cursor: pointer;
        &:hover > span {
          opacity: 1;
        }
        & > .bf {
          &:hover {
            opacity: 1;
          }
          cursor: pointer;
          width: 18%;
          height: 18%;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background-color: #fff;
          border-radius: 50%;
          display: flex;
          opacity: 0;
          justify-content: center;
          align-items: center;
          transition: all 0.8s;
          img {
            width: 50%;
            height: 50%;
          }
        }
      }
      P {
        background-color: #fff;
        margin: 8px 0;
        font-size: 14px;
        display: inline-block;
        cursor: pointer;
      }

      small {
        position: absolute;
        top: 2px;
        right: 5px;
        color: #fff;
      }
    }
    .everydaydiv {
      & > div {
        position: relative;
        span {
          font-size: 5rem;
          color: #fff;
          position: absolute;
          left: 50%;
          top: 53%;
          transform: translate(-50%, -50%);
        }
        .everydaydate {
          font-size: 1.875rem;
          position: absolute;
          left: 50%;
          top: 57%;
          transform: translate(-50%, -50%);
        }
      }
    }
  }
}
</style>