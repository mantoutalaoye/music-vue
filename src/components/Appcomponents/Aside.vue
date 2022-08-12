<template>
  <ul class="AppAside">
    <router-link to="/fxyy" custom v-slot="{ isActive, navigate }">
      <li @click="navigate" :class="isActive ? 'activeClass' : ''">发现音乐</li>
    </router-link>
    <router-link to="/bk" custom v-slot="{ isActive, navigate }">
      <li @click="navigate" :class="isActive ? 'activeClass' : ''">播客</li>
    </router-link>
    <router-link to="/sp" custom v-slot="{ isActive, navigate }">
      <li @click="navigate" :class="isActive ? 'activeClass' : ''">视频</li>
    </router-link>
    <router-link to="/gz" custom v-slot="{ isActive, navigate }">
      <li @click="navigate" :class="isActive ? 'activeClass' : ''">关注</li>
    </router-link>
    <router-link to="/zb" custom v-slot="{ isActive, navigate }">
      <li @click="navigate" :class="isActive ? 'activeClass' : ''">直播</li>
    </router-link>
    <router-link to="/srfm" custom v-slot="{ isActive, navigate }">
      <li @click="navigate" :class="isActive ? 'activeClass' : ''">私人FM</li>
    </router-link>
    <h2>我的音乐</h2>
    <router-link to="/recentlyplay" custom v-slot="{ isActive, navigate }">
      <li @click="navigate" :class="isActive ? 'activeClass' : ''">最近播放</li>
    </router-link>
    <el-collapse v-model="activeNames" v-if="userId">
      <el-collapse-item title="创建的歌单" name="1">
        <router-link
          :to="'/playdetail/' + item.id"
          custom
          v-slot="{ isActive, navigate }"
          v-for="(item, index) in myplaylist"
          :key="item.id"
        >
          <div
            @click="navigate"
            class="playlist"
            :class="isActive ? 'activeClass2' : ''"
          >
            <template v-if="!index == 0">
              <i class="el-icon-finished"></i>{{ item.name }}
            </template>
            <template v-if="index == 0">
              <i class="el-icon-service"></i>我喜欢的音乐
            </template>
          </div>
        </router-link>
      </el-collapse-item>
      <el-collapse-item title="收藏的歌单" name="2">
        <router-link
          :to="'/playdetail/' + item.id"
          custom
          v-slot="{ isActive, navigate }"
          v-for="item in scplaylist"
          :key="item.id"
        >
          <div
            @click="navigate"
            class="playlist"
            :class="isActive ? 'activeClass2' : ''"
          >
            <i class="el-icon-finished"></i>{{ item.name }}
          </div>
        </router-link>
      </el-collapse-item>
    </el-collapse>
  </ul>
</template>
<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      height: "",
      activeNames: ["1", "2"],
    };
  },
  mounted() {},
  computed: {
    ...mapState(["userId", "myplaylist", "scplaylist"]),
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
.playlist {
  white-space: nowrap; /* 不换行 */
  overflow: hidden; /* 内容超出宽度时隐藏超出部分的内容 */
  text-overflow: ellipsis;
  font-size: 14px;
  border-radius: 3px;
  padding: 2px 2px;
  i {
    font-size: 18px;
    padding-right: 5px;
  }
  &:hover {
    background-color: rgb(30, 30, 30, 0.1);
    cursor: pointer;
  }
}
ul {
  box-sizing: border-box;
  overflow: auto;
  padding: 5px 3px 0 20px;
  border-right: 0.5px solid #ddd;
}
h2 {
  font-weight: 400;
  color: #666;
  font-size: 12px;
  padding: 10px 8px;
}
.AppAside {
  width: 179px;
  overflow: auto;
  box-sizing: border-box;
}
.AppAside::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 3px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}
.AppAside::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 3px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #ddd;
}
li {
  font-size: 16px;
  font-weight: 200;
  border-radius: 3px;
  padding: 8px 10px;
  &:hover {
    background-color: rgb(30, 30, 30, 0.1);
    cursor: pointer;
  }
}
.activeClass {
  font-size: 18px;
  font-weight: 500;
}
.activeClass2 {
  background-color: rgb(30, 30, 30, 0.1);
}
</style>