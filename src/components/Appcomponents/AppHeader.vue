<template>
  <div class="AppNav">
    <img src="/logo.png" alt="" />
    <div class="headerright">
      <div>
        <i class="el-icon-arrow-left" @click="upweb"></i>
        <!-- 上一页和下一页 -->
        <i class="el-icon-arrow-right" @click="nextweb"></i>
        <input
          placeholder="借月 最近很火"
          type="text"
          @keyup.enter="bb"
          v-model="searchname"
          @input="jianyi"
          @focus="jianyi"
          @blur="
            isxshot = false;
            isxssuggest = false;
          "
          ref="inputhead"
        />
        <!-- 回车搜索 -->
        <!-- input事件检测输入框是否有内容 -->
        <!-- 获取焦点检验是否有内容 -->
        <!-- 失去焦点关闭提示框 -->
        <i class="el-icon-search syseaech"></i>
      </div>
      <div>
        <el-avatar
          v-if="nick"
          :size="35"
          :src="nick.profile.avatarUrl"
        ></el-avatar>
        <button>
          <!-- 点击则打开登录框 -->
          <span v-if="!nick" @click="islogin = true">未登录</span>
          <span v-if="nick">{{ nick.profile.nickname }}</span>
          <i class="el-icon-caret-bottom"></i>
        </button>
        <button v-if="nick" @click="zx">注销</button>
        <div></div>
      </div>
    </div>
    <!-- 登录框 -->
    <Loginmain v-if="islogin" @offlogin="islogin = false"></Loginmain>
    <!-- 搜索框热门推荐 -->
    <Hotsearch
      v-if="isxshot || isyr"
      @chuanname="zjss"
      @yrychot="yrychot"
    ></Hotsearch>
    <!-- 模糊搜索的结果 -->
    <Searchsuggest
      v-if="isxssuggest || isyrsuggest"
      :searchname="searchname"
      @tzxxx="bb"
      @bfmusic="bfmusic"
      @isyrycsuggest="isyrycsuggest"
    ></Searchsuggest>
  </div>
</template>
<script>
import Loginmain from "../login/Loginmain.vue";
import Hotsearch from "../search/Hotsearch.vue";
import Searchsuggest from "../search/Searchsuggest.vue";
import http from "../../util/http";
import { mapState, mapMutations } from "vuex";
export default {
  components: {
    Loginmain,
    Hotsearch,
    Searchsuggest,
  },
  data() {
    return {
      inputinitiate: "借月",
      islogin: false, //是否显示登录框
      searchname: "", //搜索框的内容
      isxshot: false, //是否显示热门推荐
      isyr: false, //是否移入热门框
      isxssuggest: false, //是否显示模糊搜索
      isyrsuggest: false, //是否移入模糊搜索
    };
  },
  computed: {
    ...mapState(["nick"]),
  },
  methods: {
    ...mapMutations(["clearnick", "addsearchrecord"]),
    zx() {
      http.http1("/logout").then((res) => {
        console.log(res.data);
        this.clearnick();
        localStorage.clear();

        this.$router.push("/");
      });
    },
    jianyi() {
      if (!this.searchname) {
        this.isxshot = true;
        return;
      }
      this.isxssuggest = true;
      this.isxshot = false;
    },
    zjss(name) {
      this.searchname = name;
      this.bb();
      this.isxshot = false;
      this.isyr = false;
    },
    yrychot() {
      this.isyr = !this.isyr;
    },
    isyrycsuggest(i) {
      if (i == 1) {
        this.isyrsuggest = true;
      } else {
        this.isyrsuggest = false;
      }
    },
    bb() {
      this.isxshot = false;
      this.isxssuggest = false;
      if (this.searchname) {
        this.addsearchrecord(this.searchname); //添加搜索记录
      } else {
        this.addsearchrecord(this.inputinitiate);
      }
      if (this.$route.path == "/searchlist/single") {
        //判断当前页面是否为搜索音乐结果,是则只修改query,不跳转
        if (this.searchname) {
          this.$router.push({ query: { searchname: this.searchname } });
        } else {
          this.$router.push({ query: { searchname: this.inputinitiate } });
        }
      } else {
        if (this.searchname) {
          this.$router.push({
            path: "/searchlist/single",
            query: {
              searchname: this.searchname,
            },
          });
        } else {
          this.$router.push({
            path: "/searchlist/single",
            query: {
              searchname: this.inputinitiate,
            },
          });
        }
      }
      this.$refs.inputhead.blur();
    },
    bfmusic() {
      //点击模糊查询的单曲后不显示模糊查询框
      this.isxssuggest = false;
      this.isyrsuggest = false;
    },
    upweb() {
      this.$router.back();
    },
    nextweb() {
      this.$router.forward();
    },
  },
};
</script>
<style lang="scss" scoped>
.AppNav {
  width: 100%;
  height: 55px;
  background-color: #ec4141;
  display: flex;
  img {
    height: 100%;
  }
  .headerright {
    display: flex;
    flex: 1;
    justify-content: space-between;
    div {
      display: flex;
      align-items: center;
    }
    & > div:first-child {
      position: relative;
      i {
        width: 23px;
        height: 23px;
        text-align: center;
        line-height: 23px;
        color: rgb(250, 250, 250, 0.8);
        border-radius: 50%;
        margin-left: 10px;
        background-color: rgb(30, 30, 30, 0.1);
      }
      input {
        background-color: rgb(30, 30, 30, 0.1);
        border: 0;
        height: 32px;
        border-radius: 16px;
        margin-left: 20px;
        outline: none;
        padding-left: 36px;
        color: #ddd;
        font-size: 14px;
      }
      input::-webkit-input-placeholder {
        color: #999;
        font-size: 13px;
      }
      .syseaech {
        width: 32px;
        height: 32px;
        line-height: 32px;
        background-color: rgb(30, 30, 30, 0);
        margin: 0 !important;
        position: absolute;
        left: 86px;
        border-right: 0.5px solid rgb(30, 30, 30, 0.2);
      }
    }
    & > div:last-child {
      button {
        background: transparent;
        padding: 0 15px;
        border: 0;
        color: #ddd;
        &:hover {
          color: #fff;
          cursor: pointer;
        }
      }
    }
  }
}
.el-icon-arrow-left,
.el-icon-arrow-right {
  cursor: pointer;
}
</style>