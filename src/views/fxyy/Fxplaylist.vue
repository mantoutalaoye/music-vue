<template>
  <!-- 歌单页 -->
  <div class="Fxplaylist">
    <div class="headerjpone" v-if="fristjpplaylist">
      <img :src="fristjpplaylist.coverImgUrl" alt="" />
      <div class="fontmiaos">
        <span>精品歌单</span>
        <p>{{ fristjpplaylist.name }}</p>
        <p>{{ fristjpplaylist.copywriter }}</p>
      </div>
      <div
        class="mblxg"
        :style="{
          backgroundImage: 'url(' + fristjpplaylist.coverImgUrl + ')',
        }"
      ></div>
    </div>
    <div class="classify">
      <div>
        <el-popover
          placement="bottom-start"
          width="600"
          trigger="click"
          v-model="visible"
        >
          <h3>全部歌单</h3>
          <div class="Popover" v-for="(item, index) in catlist" :key="index">
            <p>{{ item.fg }}</p>
            <ul @click="navigate5555">
              <!-- <li v-for="(item1, index) in item.taglist" :key="index">
                {{ item1.name }}
              </li> -->
              <router-link
                v-for="(item1, index) in item.taglist"
                :key="index"
                :to="'/fxyy/fxplaylist/' + zy(item1.name)"
                custom
                v-slot="{ isActive, navigate }"
              >
                <li @click="navigate" :class="isActive ? 'activeClass3' : ''">
                  {{ item1.name }}
                </li>
              </router-link>
            </ul>
          </div>
          <el-button size="mini" slot="reference" round
            >{{ $route.params.id }}<i class="el-icon-arrow-right"></i
          ></el-button>
        </el-popover>
      </div>
      <ul>
        <router-link
          v-for="item in hotcatlist"
          :key="item.id"
          :to="'/fxyy/fxplaylist/' + zy(item.name)"
          custom
          v-slot="{ isActive, navigate }"
        >
          <li @click="navigate" :class="isActive ? 'activeClass' : ''">
            {{ item.name }}
          </li>
        </router-link>
      </ul>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
import http from "../../util/http";
import { mapState } from "vuex";
export default {
  data() {
    return {
      fristjpplaylist: null,
      visible: false,
    };
  },
  computed: {
    ...mapState(["hotcatlist", "catlist", "goodcatlist"]),
  },
  created() {
    http.http1(`/top/playlist/highquality?cat=华语&limit=1`).then((res) => {
      this.fristjpplaylist = res.data.playlists[0];
      console.log(this.fristjpplaylist);
      console.log(this.catlist);
    });
  },
  watch: {
    $route(to, from) {
      try {
        this.goodcatlist.forEach((item, index) => {
          if (item.name == this.$route.params.id) {
            http
              .http1(`/top/playlist/highquality?cat=${item.name}&limit=1`)
              .then((res) => {
                this.fristjpplaylist = res.data.playlists[0];
                console.log(this.fristjpplaylist);
                console.log(this.catlist);
              });
            throw new Error("退出循环");
          }
          if (index == this.goodcatlist.length - 1) {
            this.fristjpplaylist = "";
            console.log(999999999);
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
  methods: {
    zy(name) {
      return name.replace(/\//g, "%2F");
    },
    navigate5555() {
      this.visible = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.Fxplaylist {
  margin: 15px 65px;
}
.headerjpone {
  height: 11.25rem;
  background-color: rgba(0, 0, 0, 0.35);
  overflow: hidden;
  position: relative;
  border-radius: 5px;
  padding: 0.9375rem;
  box-sizing: border-box;
  display: flex;
  cursor: pointer;
  img {
    height: 9.375rem;
    border-radius: 5px;
  }
  .fontmiaos {
    margin-left: 12px;
    span {
      color: #e7aa5a;
      display: inline-block;
      padding: 5px 20px;
      border: 1px solid #e7aa5a;
      font-size: 13px;
      border-radius: 50px;
      margin: 20px 0;
    }
    & > p:nth-child(2) {
      font-size: 15px;
      color: #fff;
    }
    & > p:nth-child(3) {
      color: #bbb;
      margin-top: 8px;
      font-size: 12px;
    }
  }
  .mblxg {
    width: 100%;
    height: 100%;
    filter: blur(40px);
    background-size: cover;
    background-position: center center;
    border-radius: 5px;
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
  }
}
.classify {
  margin: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ul {
    display: flex;
    height: 18px;
    line-height: 18px;
    font-size: 12px;
    color: #666;
    li {
      margin: 0 6px;
      padding: 0 5px;
      border-radius: 9px;
      cursor: pointer;
      &:hover {
        color: #000;
      }
    }
  }
}
.activeClass {
  background-color: #fdf5f5;
  color: #ec4141;
  &:hover {
    color: #ec4141 !important;
  }
}
.activeClass3 {
  background-color: #fdf5f5;
  color: #ec4141;
}
h3 {
  font-weight: 400;
  padding-bottom: 10px;
  border-bottom: 1px solid #666;
}
.Popover {
  display: flex;
  margin: 12px 0 0;
  p {
    width: 40px;
    padding-top: 5px;
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    flex: 1;
    li {
      padding: 5px;
      border-radius: 10px;
      font-weight: 300;
      font-size: 14px;
    }
  }
}
</style>