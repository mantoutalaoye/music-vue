<template>
  <div class="Hotsearchbox" @mouseenter="yrychot" @mouseleave="yrychot">
    <div class="jl" v-if="searchrecord.length">
      <div>
        <span>搜索记录</span>
        <i class="el-icon-delete" @click="clearsearchrecord"></i>
        <span>查看全部</span>
      </div>
      <div>
        <span
          v-for="(item1, index) in searchrecord"
          :key="index"
          @click="cdinput(item1)"
        >
          {{ item1 }}
        </span>
      </div>
    </div>
    <div class="hot">
      <p>热搜榜</p>
      <div
        v-for="(item, index) in hotlistl"
        :key="index"
        @click="cdinput(item.searchWord)"
      >
        <span :class="index < 3 ? 'indred' : ''">{{ index + 1 }}</span>
        <span :class="index < 3 ? 'hotb' : ''">{{ item.searchWord }}</span>
        <span>{{ item.score }}</span>
        <i class="hotxxx" v-if="item.iconType == 1">HOT</i>
        <i class="newxxx" v-if="item.iconType == 2">NEW</i>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
import http from "../../util/http";
export default {
  data() {
    return {
      hotlistl: [],
    };
  },
  methods: {
    cdinput(name) {
      this.$emit("chuanname", name);
    },
    yrychot() {
      this.$emit("yrychot");
    },
    ...mapMutations(["clearsearchrecord"]),
  },
  computed: {
    ...mapState(["searchrecord"]),
  },
  created() {
    http.http1(`/search/hot/detail`).then((res) => {
      this.hotlistl = res.data.data;
      //   console.log(res.data.data);
    });
  },
};
</script>
<style lang="scss" scoped>
.Hotsearchbox {
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
.jl {
  margin: 20px 20px 0;
  & > div:first-child {
    color: #666;
    font-size: 15px;
    i {
      margin-left: 8px;
      cursor: pointer;
      &:hover {
        color: #000;
      }
    }
    & > span:last-child {
      font-size: 12px;
      float: right;
      cursor: pointer;
      &:hover {
        color: #000;
      }
    }
  }
  & > div:last-child {
    display: flex;
    flex-wrap: wrap;
    max-height: 89px;
    overflow: hidden;
    span {
      margin: 15px 15px 0 0;
      padding: 5px 15px;
      font-size: 13px;
      border-radius: 14px;
      display: block;
      border: 1px solid #ddd;
      cursor: pointer;
      &:hover {
        background-color: #eee;
      }
    }
  }
}
.hot {
  p {
    color: #666;
    margin: 20px 20px 0;
  }
  div {
    padding: 18px 20px;
    cursor: pointer;
    &:hover {
      background-color: #f3f3f3;
    }
    span {
      display: inline-block;
    }
    & > span:nth-child(1) {
      width: 35px;
      font-size: 14px;
      color: #666;
    }
    & > span:nth-child(2) {
      font-size: 13px;
    }
    & > span:nth-child(3) {
      font-size: 14px;
      color: #999;
      margin: 0 10px;
    }
  }
}
.indred {
  color: red;
}
.hotb {
  font-weight: 700;
}
.hotxxx {
  color: red;
  font-weight: 700;
  font-size: 14px;
}
.newxxx {
  color: #29af29;
  font-weight: 700;
  font-size: 14px;
}
.Hotsearchbox::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 3px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}
.Hotsearchbox::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 3px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #ddd;
}
</style>