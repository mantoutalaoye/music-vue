<template>
  <!-- 每日推荐 -->
  <div class="everydaysong">
    <div class="everydaysongnav">
      <span class="iconfont">&#xe627;</span>
      <div>
        <h2>每日歌曲推荐</h2>
        <p>根据你的音乐口味生成，每天6：00更新</p>
      </div>
      <span class="datespan">{{ date }}</span>
    </div>
    <div class="everydaybutton">
      <el-button round size="medium" @click="replaceplayinglistggg"
        ><i class="el-icon-caret-right"></i> 播放全部</el-button
      >
      <el-button round size="medium"
        ><i class="el-icon-folder-checked"></i> 收藏全部
      </el-button>
    </div>
    <div>
      <nav>
        <span></span>
        <span></span>
        <span>音乐标题</span>
        <span>歌手</span>
        <span>专辑</span>
        <span>时长</span>
      </nav>
      <p
        v-for="(item, index) in everydaysongs"
        :key="item.id"
        :class="(index + 1) % 2 == 1 ? 'bmx' : ''"
      >
        <span>
          <template v-if="item.id !== audioid">{{ index + 1 }}</template>

          <van-icon name="volume" v-if="item.id == audioid" color="#EC4141" />
        </span>
        <span
          ><van-icon name="service-o" @click="playthissong(item)" /><van-icon
            name="like-o"
        /></span>
        <span :class="item.id == audioid ? 'bsered' : ''"
          >{{ item.name }}
          <small v-if="item.alia.length">&nbsp;({{ item.alia[0] }})</small>
        </span>
        <span>
          <i v-for="(ges, index) in item.ar" :key="index">
            {{ index == 0 ? "" : " &nbsp;/ " }}<i>{{ ges.name }}</i>
          </i>
        </span>
        <span>{{ item.al.name }}</span>
        <span>{{ dtime(item.dt) }}</span>
      </p>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.everydaysong {
  overflow: auto;
}
.everydaysong::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 3px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}
.everydaysong::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 3px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #ddd;
}
.everydaysongnav {
  display: flex;
  align-items: center;
  margin: 30px 30px 20px;
  position: relative;
  span {
    font-size: 85px;
    color: #ec4141;
    margin-right: 15px;
  }
  p {
    font-size: 12px;
    color: #666;
  }
  .datespan {
    position: absolute;
    top: 31px;
    left: 24px;
    font-size: 36px;
    font-weight: 700;
  }
}
.everydaybutton {
  margin: 0 30px;
}
nav {
  height: 40px;
  line-height: 40px;
  font-size: 13px;
  color: #666;
  display: grid;
  grid-template-columns: 5fr 5fr 38fr 18fr 19fr 12fr;
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
    width: 19%;
  }
  & > span:nth-child(6) {
    color: #999;
    font-weight: 100;
    width: 12%;
  }
}
.bsered {
  color: #ec4141 !important;
}
</style>

<script>
import "../../assets/font_233smh3cngw/iconfont.css";
import { http1 } from "../../util/http";
import { mapState, mapMutations } from "vuex";
import moment from "moment";
export default {
  data() {
    return {
      everydaysongs: [],
    };
  },
  computed: {
    date() {
      return new Date().getDate();
    },
    ...mapState(["audioid"]),
  },
  created() {
    http1(`/recommend/songs?cookie=${localStorage.getItem("cookie")}`).then(
      (res) => {
        console.log(res.data);
        this.everydaysongs = res.data.data.dailySongs;
      }
    );
  },
  methods: {
    ...mapMutations(["addplayinglist", "getaudiosrc", "replaceplayinglist"]),
    dtime(time) {
      return moment(time).format("mm:ss");
    },
    replaceplayinglistggg() {
      //播放全部
      this.getaudiosrc(this.everydaysongs[0].id);
      this.replaceplayinglist(this.everydaysongs);
    },
    playthissong(item) {
      this.addplayinglist({
        id: item.id,
        name: item.name,
        ar: item.ar,
        dt: item.dt,
      });
      this.getaudiosrc(item.id);
    },
  },
};
</script>
