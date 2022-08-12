<template>
  <div class="AppFooter">
    <div class="conimg" v-show="audioid">
      <img
        :src="song.al.picUrl + '?param=50y50'"
        alt=""
        v-if="song"
        @click="pushLyirc"
      />
    </div>
    <div class="btgs" v-show="audioid">
      <p v-if="song">{{ song.name }}</p>
      <p v-if="song">
        <span v-for="(item, index) in song.ar" :key="item.id">
          {{ index == 0 ? "" : " &nbsp;/ " }}{{ item.name }}
        </span>
      </p>
    </div>
    <div class="player">
      <i>
        <span
          v-if="playmode == '&#xe6ae;'"
          class="iconfont"
          @click="
            playmode = '&#xea75;';
            circulation();
          "
          >&#xe6ae;</span
        >
        <span
          v-if="playmode == '&#xea75;'"
          class="iconfont"
          @click="playmode = '&#xea84;'"
          >&#xea75;</span
        >
        <span
          v-if="playmode == '&#xea84;'"
          class="iconfont"
          @click="
            playmode = '&#xe6ae;';
            loop();
          "
          >&#xea84;</span
        >
      </i>
      <span class="iconfont topone" @click="upaudiosrc">&#xe688;</span>
      <van-icon name="play" @click="play" v-if="isxsplay" size="25" />
      <van-icon name="pause" @click="pause" v-if="!isxsplay" size="25" />
      <span class="iconfont nextone" @click="checkmusic()">&#xe689;</span>
      <span class="iconfont">&#xe671;</span>
      <div
        class="dw"
        style="width: 380px; margin: 10px auto"
        @mouseover="isxsjdt = true"
        @mouseout="isxsjdt = false"
      >
        <el-progress
          :percentage="parseInt(progress)"
          :show-text="false"
          color="#EF6767"
          :stroke-width="3"
        >
        </el-progress>
        <input
          type="range"
          min="0"
          max="100"
          step="0.1"
          v-model="progress"
          ref="range"
          @mousedown="clickSlider"
          @mouseup="putSlider"
          @input="touing"
          v-show="isxsjdt"
        />
        <span class="timeleft">{{ playaatime }}</span>
        <span class="timeright">{{ ztime }} </span>
      </div>
    </div>
    <div class="bfqzqzb" v-show="audioid">
      <span
        class="iconfont"
        @mouseover="isxsylkzq = true"
        @mouseleave="isxsylkzq = false"
        >&#xe8b8;
        <small class="ylsmall" v-if="isxsylkzq">
          <el-slider v-model="volume" vertical height="100px" class="yljdt">
          </el-slider
        ></small>
      </span>
      <span @click="drawer = true" class="iconfont">&#xea86;</span>
    </div>
    <audio
      :src="src"
      ref="audio"
      @timeupdate="playtime"
      @ended="bfms"
      :loop="isloop"
    ></audio>
    <el-drawer
      title="我是标题"
      :visible.sync="drawer"
      :modal="false"
      :with-header="false"
    >
      <playinglist></playinglist>
    </el-drawer>
    <div class="zzc" v-if="!audioid"></div>
  </div>
</template>
<script>
import http from "../../util/http";
import { mapState, mapMutations } from "vuex";
import "../../assets/font_0js3xa4v157k/iconfont.css";
import playinglist from "../Playinglist";
import moment from "moment";
export default {
  components: {
    playinglist,
  },
  data() {
    return {
      src: "",
      song: "",
      drawer: false,
      duration: 1000,
      volume: 0,
      isxsylkzq: false,
      playmode: "&#xe6ae;",
      isxsplay: true,
      isxsjdt: false,
      progress: 0,
      playaatime: "00:00",
      isclickSlider: false,
      istouSlidering: false,
      isloop: true,
      index: "",
    };
  },
  computed: {
    ...mapState(["audioid", "playinglist", "storelyriclist"]),
    ztime() {
      return moment(this.duration).format("mm:ss");
    },
  },
  watch: {
    audioid(newid) {
      this.song = null;
      this.src = null;
      this.index = this.playinglist.findIndex(
        (item) => item.id == this.audioid
      );
      // this.$refs.audio.pause();
      if (!newid) {
        this.duration = 500;
        return;
      }
      http.http1(`/song/url?id=${newid}`).then((res) => {
        // console.log(res.data);
        this.src = res.data.data[0].url;
        this.$nextTick(() => {
          this.$refs.audio.play();
          this.isxsplay = false;
        });
        // console.log(res.data);
      });
      http.http1(`/lyric?id=${this.audioid}`).then((res) => {
        // console.log(
        //   res.data.lrc.lyric.replace(/\n/g, "<br/>").replace(/[.*]/, "")
        // );
        let arr1 = res.data.lrc.lyric.replace(/\n/g, "");
        let arr2 = arr1.split("[").slice(1);
        let arr3 = [];
        arr2.forEach((item) => {
          let adc = item.split("]");
          adc[0] =
            parseFloat(adc[0].split(":")[0]) * 60 +
            parseFloat(adc[0].split(":")[1]);
          arr3.push(adc);
        });
        this.lyriclist = arr3;
        /* arr3.forEach((item) => {
          console.log(item[1] + "<br/>");
        }); */
        this.setstorelyriclist(arr3);
        // this.lyric = res.data.lrc.lyric.replace(/\[.*?\]/g, "");
      });
      http.http1(`/song/detail?ids=${this.audioid}`).then((res) => {
        this.song = res.data.songs[0];
        this.duration = this.song.dt; //切换歌曲时获取总时长
      });
    },
    volume(newyl) {
      this.$refs.audio.volume = newyl / 100;
    },
  },
  created() {
    this.index = this.playinglist.findIndex((item) => item.id == this.audioid);
    if (this.audioid) {
      http.http1(`/song/url?id=${this.audioid}`).then((res) => {
        this.src = res.data.data[0].url;
      });
      http.http1(`/lyric?id=${this.audioid}`).then((res) => {
        // console.log(res.data.lrc.lyric);
        let arr1 = res.data.lrc.lyric.replace(/\n/g, "");
        let arr2 = arr1.split("[").slice(1);
        let arr3 = [];
        arr2.forEach((item) => {
          let adc = item.split("]");
          adc[0] =
            parseFloat(adc[0].split(":")[0]) * 60 +
            parseFloat(adc[0].split(":")[1]);
          arr3.push(adc);
        });
        this.lyriclist = arr3;
        this.setstorelyriclist(arr3);
        // this.lyric = res.data.lrc.lyric.replace(/\[.*?\]/g, "");
      });
      http.http1(`/song/detail?ids=${this.audioid}`).then((res) => {
        this.song = res.data.songs[0];
        this.duration = this.song.dt; //刷新获取总时长
      });
    }

    // console.log(this.playmode == "&#xe6ae;");
  },
  mounted() {
    this.volume = this.$refs.audio.volume * 100;
    this.loop();
  },
  methods: {
    ...mapMutations([
      "upaudiosrc",
      "nextaudiosrc",
      "setth",
      "setstorelyriclist",
    ]),
    playtime() {
      this.playaatime = moment(this.$refs.audio.currentTime * 1000).format(
        "mm:ss"
      );
      if (this.isclickSlider || this.istouSlidering) {
        return;
      }
      this.storelyriclist.forEach((item) => {
        if (
          parseFloat(item[0]) - this.$refs.audio.currentTime < 0.1 &&
          parseFloat(item[0]) - this.$refs.audio.currentTime > -0.2
        ) {
          this.setth(this.storelyriclist.findIndex((item1) => item1 == item));
          // console.log(this.storelyriclist.findIndex((item1) => item1 == item));
        }
      });
      this.progress = (this.$refs.audio.currentTime * 100000) / this.duration;
      // console.log(this.progress);

      this.$refs.range.style.backgroundSize = `${this.progress}% 100%`;
    },
    async checkmusic() {
      this.index++;
      await http
        .http1(`/check/music?id=${this.playinglist[this.index].id}`)
        .then(
          (res) => {
            this.nextaudiosrc(this.index);
          },
          (req) => {
            this.checkmusic();
          }
        );
    },
    async bfms() {
      if (this.playmode == "&#xea75;") {
        //列表循环当进度条到达100时切换下一首
        let index = this.playinglist.findIndex(
          (item) => item.id == this.audioid
        );
        this.checkmusic();
        // this.nextaudiosrc();
        // console.log("循环播放下一首");
      }
      if (
        this.playmode == "&#xea84;" &&
        this.playinglist.findIndex((item) => item.id !== this.audioid) ==
          this.playinglist.length - 1
      ) {
        this.nextaudiosrc();
      }
      if (
        this.playmode == "&#xea84;" &&
        this.playinglist.findIndex((item) => item.id == this.audioid) ==
          this.playinglist.length - 1
      ) {
        this.pause();
      }
    },
    loop() {
      //单曲播放
      // this.$refs.audio.currentTime = 0; //切换让播放时间为0
      this.isloop = true;
    },
    circulation() {
      //列表循环
      console.log("切换模式");
      this.isloop = false;
    },
    play() {
      this.$refs.audio.play();
      this.isxsplay = !this.isxsplay;
    },
    pause() {
      this.$refs.audio.pause();
      this.isxsplay = !this.isxsplay;
    },
    clickSlider() {
      this.isclickSlider = true;
      console.log("点击滑块");
    },
    touing() {
      this.istouSlidering = true;
      this.$refs.range.style.backgroundSize = `${this.progress}% 100%`;
      console.log("拖滑块");
    },
    putSlider() {
      //松开滑块

      this.$refs.audio.currentTime = (this.progress * this.duration) / 100000;
      this.isclickSlider = false;
      this.istouSlidering = false;
      console.log("松开滑块");
      this.realtimelyricth();
    },
    pushLyirc() {
      if (this.$route.path == "/lyric") {
        this.$router.back();
        return;
      }
      this.$router.push("/lyric");
    },
    realtimelyricth() {
      try {
        this.storelyriclist.forEach((item, index) => {
          if (index == this.storelyriclist.length - 1) {
            this.setth(index);
            // console.log(
            //   this.storelyriclist.findIndex((item1) => item1 == item)
            // );
            throw new Error("退出循环");
          }
          if (
            parseFloat(item[0]) - this.$refs.audio.currentTime < 0.2 &&
            parseFloat(item[0]) - this.$refs.audio.currentTime >
              this.storelyriclist[index][0] - this.storelyriclist[index + 1][0]
          ) {
            this.setth(index);
            // console.log(
            //   this.storelyriclist.findIndex((item1) => item1 == item)
            // );
            throw new Error("退出循环");
          }
        });
      } catch (e) {
        if (e.message === "退出循环") {
          console.log("结束了");
        } else {
          console.log(e.message);
        }
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.AppFooter {
  width: 100%;
  padding: 0 12.5px;
  position: relative;
  background-color: #fff;
  height: 75px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  border-top: 0.5px solid rgb(30, 30, 30, 0.2);
  .conimg {
    height: 50px;
    width: 50px;
    background-color: #eee;
    display: inline-block;
    img {
      height: 50px;
      width: 50px;
    }
  }
  .btgs {
    width: 18%;
    margin-left: 10px;
    font-size: 15px;
    height: 50px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    span {
      font-size: 13px;
    }
  }
  .player {
    flex: 1;
    text-align: center;
  }
  .bfqzqzb {
    width: calc(18% + 62.5px);
    text-align: center;
    display: flex;
    justify-content: end;
    span {
      font-size: 21px;
      margin-right: 25px;
      color: #666;
      cursor: pointer;
      position: relative;
      &:hover {
        color: #333;
      }
      .ylsmall {
        height: 120px;
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #fff;
        width: 25px;
        position: absolute !important;
        bottom: 30px;
        left: -2px;
        box-shadow: 0px 0px 10px rgba(20, 20, 20, 0.5);
        &::after {
          display: block;
          content: "";
          width: 30px;
          height: 40px;
          position: absolute;
          bottom: -20px;
          left: 0;
        }
      }
    }
  }
  .zzc {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 74px;
    background-color: rgba(256, 256, 256, 0.5);
  }
}
input[type="range"] {
  position: absolute;
  left: 0;
  top: 0;
  outline: none;
  -webkit-appearance: none;
  border-radius: 5px;
  height: 5px;
  width: 380px;
  background: -webkit-linear-gradient(#ec4141, #ec4141) no-repeat, #ddd; /*设置左边颜色为#61bd12，右边颜色为#ddd*/
  // background-size: 75% 100%; /*设置左右宽度比例*/
}
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  height: 10px;
  width: 10px;
  border-radius: 50%;
  background-color: #ec4141 !important;
}
.van-icon-play,
.van-icon-pause {
  padding: 3px;
  background-color: #eee;
  border-radius: 50%;
  cursor: pointer;

  &:hover {
    background-color: #ddd;
  }
}
span {
  cursor: pointer;
  &:hover {
    color: #ef6767;
  }
}
.topone,
.nextone {
  margin: 0 40px;
}
.timeleft,
.timeright {
  font-size: 12px;
  color: #aaa;
  &:hover {
    color: #aaa;
  }
}
.timeleft {
  position: absolute;
  left: -34px;
  top: -6px;
}
.timeright {
  position: absolute;
  right: -34px;
  top: -6px;
}
.dw {
  position: relative;
}
</style>