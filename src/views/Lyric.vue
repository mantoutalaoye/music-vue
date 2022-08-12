<template>
  <div
    class="Lyircbox"
    :style="{
      height: height,
    }"
  >
    <div class="buttoncommentsfxdff">
      <el-button round size="mini" @click="dialogFormVisible = true"
        ><i class="el-icon-edit-outline"></i> 写评论</el-button
      >
    </div>

    <el-dialog :visible.sync="dialogFormVisible" @close="textarea = ''">
      <h3 class="dhktitle">歌曲：{{ song.name }}</h3>
      <el-input
        type="textarea"
        v-model="textarea"
        maxlength="140"
        placeholder="发布评论"
        show-word-limit
        :rows="4"
      >
      </el-input>
      <div slot="footer" class="dialog-footer">
        <button
          class="plbuttondhk"
          :disabled="textarea == ''"
          @click="releasecomment"
        >
          确 定
        </button>
        <div v-if="textarea == ''"></div>
        <!-- 确定按钮的遮罩层 -->
      </div>
    </el-dialog>
    <div class="lyrictitle">
      <h1>{{ song.name }}</h1>
      <p>
        <span v-for="(item, index) in song.ar" :key="item.id">
          {{ index == 0 ? "" : " &nbsp;/ " }}{{ item.name }}&nbsp;-&nbsp;{{
            song.name
          }}
        </span>
      </p>
    </div>
    <div class="heijiao">
      <span class="cjdw"><img src="/触角1.png" alt="" /></span>
      <div>
        <img :src="song.al.picUrl + '?param=400y400'" alt="" v-if="song" />
      </div>
    </div>
    <div class="lyric">
      <div class="liricbox">
        <ul class="lyricul" ref="lyricul">
          <li v-for="(item, index) in storelyriclist" :key="index">
            {{ item[1] }}
          </li>
        </ul>
      </div>
    </div>
    <Comments
      commenttype="music"
      :ifreleasenewcomment="ifreleasenewcomment"
    ></Comments>
  </div>
</template>
<script>
import http from "../util/http";
import Comments from "../components/Comments.vue";
import { mapMutations, mapState } from "vuex";
export default {
  components: {
    Comments,
  },
  data() {
    return {
      height: "",
      lyric: "",
      lyriclist: [],
      song: "",
      isgxdom: false,
      dialogFormVisible: false,
      textarea: "",
      ifreleasenewcomment: false,
    };
  },
  computed: {
    ...mapState(["audioid", "th", "storelyriclist"]),
  },
  created() {
    http.http1(`/song/detail?ids=${this.audioid}`).then((res) => {
      this.song = res.data.songs[0];
      // console.log(this.song);
    });
  },
  updated() {
    this.$nextTick(() => {
      if (this.isgxdom) {
        // console.log(1);
        return;
      }
      if (this.$refs.lyricul.children[0]) {
        // console.log(this.$refs.lyricul.children);
        this.$refs.lyricul.style.top = 145 - this.th * 40 + "px";
        this.$refs.lyricul.children[this.th].style.fontWeight = 700;
        this.$refs.lyricul.children[this.th].style.fontSize = 18 + "px";
        this.isgxdom = true;
        // console.log(2);
      }
    });
  },
  watch: {
    audioid() {
      http.http1(`/song/detail?ids=${this.audioid}`).then((res) => {
        this.song = res.data.songs[0];
        console.log(this.song);
      });
    },
    th() {
      if (this.isgxdom) {
        // console.log("watch");
        this.realtimelyric();
      }
    },
  },
  methods: {
    ...mapMutations(["setstorelyriclist"]),
    realtimelyric() {
      this.$refs.lyricul.style.top = 145 - this.th * 40 + "px";
      document
        .querySelectorAll("li")
        .forEach((item) => (item.style.fontWeight = 300));
      document
        .querySelectorAll("li")
        .forEach((item) => (item.style.fontSize = 16 + "px"));
      document.querySelectorAll("li")[this.th].style.fontWeight = 700;
      document.querySelectorAll("li")[this.th].style.fontSize = 18 + "px";
    },
    async releasecomment() {
      await http
        .http1(
          `/comment?t=1&type=0&id=${this.audioid}&content=${
            this.textarea
          }&cookie=${localStorage.getItem("cookie")}`
        )
        .then((res) => {
          console.log(res.data);
          // this.i
          this.ifreleasenewcomment = true;
        });
      this.dialogFormVisible = false;
    },
  },
  mounted() {
    this.height =
      document.documentElement.clientHeight -
      document.querySelector(".AppFooter").offsetHeight -
      document.querySelector(".AppNav").offsetHeight +
      "px";
  },
};
</script>
<style lang="scss" scoped>
.Lyircbox {
  // background: linear-gradient(#ec4141, #ffffff);
  position: relative;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  overflow: auto;
}
.Lyircbox::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 3px; /*高宽分别对应横竖滚动条的尺寸*/
}
.Lyircbox::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 3px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #ddd;
}
.buttoncommentsfxdff {
  position: fixed;
  bottom: 90px;
  left: 75%;
}

@keyframes rotateheijiao {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
@keyframes rotatecj {
  0% {
    transform: rotate(-15deg);
  }
  100% {
    transform: rotate(25deg);
  }
}
.cjdw {
  position: absolute;
  top: 73px;
  left: 45%;
  z-index: 999;
  transform-origin: 10px 10px;
  animation: rotatecj 1s forwards linear;
  img {
    width: 150px;
    border-radius: 10px;
  }
}
.heijiao {
  width: 50%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  div {
    width: 280px;
    height: 280px;
    background: radial-gradient(#1f2022 66%, #dcd8d4 66%);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    animation: rotateheijiao 40s linear infinite;

    img {
      width: 200px;
      height: 200px;
      border-radius: 50%;
    }
  }
}
.lyric {
  width: 50%;
}
.lyrictitle {
  position: absolute;
  top: 30px;
  left: 50%;
  text-align: center;
  transform: translateX(-50%);
  h1 {
    font-weight: 300;
  }
  p {
    color: #999;
    font-size: 15px;
    margin-top: 8px;
  }
}
.liricbox {
  overflow: hidden;
  width: 100%;
  height: 320px;
  margin: 130px auto;
  text-align: center;
  position: relative;
}
ul {
  position: absolute;
  width: 100%;
  left: 0;
  top: 145px;
  transition: all 0.2s;
  li {
    padding: 8px 0;
    height: 40px;
    box-sizing: border-box;
    font-size: 16px;
  }
}
.liricbox::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 3px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 0;
}
.liricbox::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 3px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #ddd;
}
.dhktitle {
  text-align: center;
  margin-bottom: 30px;
}
.plbuttondhk {
  border: 0;
  background-color: #ec4141;
  padding: 7px 25px;
  border-radius: 20px;
  font-size: 14px;
  color: #fff;
}
.dialog-footer {
  position: relative;
  button {
    cursor: pointer;
  }
  div {
    width: 50%;
    height: 100%;
    background-color: rgba(256, 256, 256, 0.5);
    position: absolute;
    right: 0;
    top: 0;
  }
}
</style>