<template>
  <div class="Recentlyplaybox">
    <div class="recentlyheader">
      <div class="reflex">
        <p>
          最近播放 <span>共{{ recentlyplaylist.length }}首</span>
        </p>
        <span class="clearbut" @click="clearrecently">清空列表</span>
      </div>
      <el-button round size="medium" @click="replaceplayinglist"
        ><i class="el-icon-caret-right"></i> 播放全部</el-button
      >
    </div>

    <nav v-if="recentlyplaylist.length">
      <span></span>
      <span>音乐标题</span>
      <span>歌手</span>
      <span>播放时间</span>
    </nav>
    <el-empty v-else description="您还没播放任何音乐"></el-empty>
    <p
      v-for="(item, index) in recentlyplaylist"
      :key="item.id"
      :class="(index + 1) % 2 == 1 ? 'bmx' : ''"
      @dblclick="sjbf(item.id)"
    >
      <span>
        <template>{{ index + 1 }}</template>
      </span>
      <span>
        {{ item.name }}
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
      <span>{{ bfsj(item.bftime) }}</span>
    </p>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  created() {},
  computed: {
    ...mapState(["recentlyplaylist", "audioid"]),
  },
  methods: {
    ...mapMutations(["clearrecently", "getaudiosrc"]),
    ...mapActions(["actaddrecently"]),
    clearplayinglist() {
      console.log(111);
    },
    replaceplayinglist() {
      console.log(222);
    },
    sjbf(id) {
      this.actaddrecently(id);
    },
    bfsj(bftime) {
      const now = new Date();
      const diff = (now - bftime) / 1000;

      if (diff < 30) {
        return "刚刚";
      } else if (diff < 3600) {
        // less 1 hour
        return Math.ceil(diff / 60) + "分钟前";
      } else if (diff < 3600 * 24) {
        return Math.ceil(diff / 3600) + "小时前";
      } else if (diff < 3600 * 24 * 2) {
        return "1天前";
      } else {
        console.log(bftime);
        return (
          bftime.getFullYear() +
          "年" +
          bftime.getMonth() +
          "月" +
          bftime.getDate() +
          "日"
        );
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.Recentlyplaybox {
  overflow: auto;
}
.Recentlyplaybox::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 3px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}
.Recentlyplaybox::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 3px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #ddd;
}
.recentlyheader {
  margin: 15px 25px;
  .reflex {
    display: flex;
    justify-content: space-between;
    margin-bottom: 25px;
    p {
      display: flex;
      align-items: center;
      font-size: 21px;
      font-weight: 600;
      span {
        font-size: 14px;
        color: #999;
        font-weight: normal;
        margin-left: 15px;
      }
    }
    .clearbut {
      font-size: 14px;
      color: #507daf;
      cursor: pointer;
      &:hover {
        color: #0b58b0;
      }
    }
  }
}
nav {
  height: 40px;
  line-height: 40px;
  font-size: 13px;
  color: #666;
  display: grid;
  grid-template-columns: 5fr 48fr 32fr 15fr;
}
nav ~ p {
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
    justify-content: center;
    padding: 0 10px;
    width: 5%;
    color: #aaa;
  }

  & > span:nth-child(2) {
    font-weight: 400;
    color: #333;
    width: 48%;
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
  & > span:nth-child(3) {
    i {
      i {
        &:hover {
          font-weight: normal;
        }
        cursor: pointer;
      }
    }
    width: 32%;
  }
  & > span:nth-child(4) {
    font-size: 13px;
    width: 15%;
  }
}
.bmx {
  background-color: #f9f9f9;
}
</style>