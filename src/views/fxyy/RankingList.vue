<template>
  <!-- 排行榜 -->
  <div class="Rankinglistbox" v-if="officialranklistxxxx.length">
    <div class="officialbox">
      <h3>官方榜</h3>
      <div
        class="officialboxitem"
        v-for="item in officialranklistxxxx"
        :key="item.id"
      >
        <el-image
          class="img"
          @click="tzplaylistdetail(item.id)"
          style="width: 180px; border-radius: 5px"
          :src="item.coverImgUrl"
          lazy
        ></el-image>
        <span class="dingwwww" @click="tzplaylistdetail(item.id)"
          ><img src="/播放2.svg" alt=""
        /></span>
        <div class="songlistzzz">
          <p
            v-for="(item1, index) in item.songs"
            :key="item1.id"
            :class="(index + 1) % 2 == 1 ? 'bmx' : ''"
            @dblclick="ifbangq(item1.id, item.id)"
          >
            <span>{{ index + 1 }}</span>
            <span>{{ item1.name }}</span>
            <span v-if="item1.ar"
              ><i v-for="item2 in item1.ar" :key="item2.id">{{
                item1.ar.length > 1 ? item2.name + "/" : item2.name
              }}</i></span
            >
          </p>
          <span @click="tzplaylistdetail(item.id)"
            >查看全部<i class="el-icon-arrow-right"></i
          ></span>
        </div>
      </div>
    </div>
    <h3>全球榜</h3>
    <div class="globalbox">
      <div class="globalitem" v-for="item4 in globalranklist" :key="item4.id">
        <div
          class="img"
          style="
            width: 100%;
            height: 0;
            padding-bottom: 100%;
            background-color: #666;
            border-radius: 5px;
          "
        >
          <el-image
            class="img22"
            @click="tzplaylistdetail(item.id)"
            style="width: 100%; border-radius: 5px"
            :src="item4.coverImgUrl"
            lazy
          ></el-image>
        </div>
        <span class="dingwwww" @click="tzplaylistdetail(item4.id)"
          ><img src="/播放2.svg" alt=""
        /></span>
        <span @click="tzplaylistdetail(item4.id)">{{ item4.name }}</span>
        <small>
          <i class="el-icon-caret-right"></i>
          <i>{{ jsxxx(item4.playCount) }}</i>
        </small>
      </div>
    </div>
  </div>
</template>
<script>
import http from "../../util/http";
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      officialranklist: [],
      officialranklistxxxx: [],
      globalranklist: [],
      rightsongs: [],
    };
  },
  async created() {
    console.log(111);
    await http.http1(`/toplist`).then((res) => {
      this.officialranklist = res.data.list.filter(
        (item) => item.ToplistType != undefined
      );
      this.globalranklist = res.data.list.filter(
        (item) => item.ToplistType == undefined
      );
      console.log(this.officialranklist);
      console.log(this.globalranklist);
    });
    await this.officialranklist.forEach((item) => {
      http
        .http1(`/playlist/track/all?id=${item.id}&limit=5&offset=0`)
        .then((res) => {
          this.officialranklist[this.officialranklist.indexOf(item)].songs =
            res.data.songs;
          console.log(
            this.officialranklist[this.officialranklist.indexOf(item)].songs
          );
          if (this.officialranklist.indexOf(item) == 3) {
            this.officialranklistxxxx = this.officialranklist;
          }
        });
    });
  },
  methods: {
    ...mapMutations(["getaudiosrc", "replaceplayinglist"]),
    tzplaylistdetail(id) {
      this.$router.push(`/playdetail/${id}`);
    },
    ifbangq(id1, id2) {
      this.getaudiosrc(id1);
      http
        .http1(`/playlist/track/all?id=${id2}&limit=9999&offset=1`)
        .then((res) => {
          this.replaceplayinglist(res.data.songs);
        });
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
  },
};
</script>
<style lang="scss" scoped>
.Rankinglistbox {
  margin: 20px 55px 350px;
  h3 {
    margin-bottom: 10px;
  }
}
.officialboxitem {
  display: flex;
  margin-bottom: 40px;
  position: relative;
  .dingwwww {
    position: absolute;
    cursor: pointer;
    background-color: rgba(256, 256, 256, 0.5);
    top: 70px;
    left: 70px;
    width: 45px;
    height: 45px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.5s;
    opacity: 0;
    &:hover {
      opacity: 1;
    }
    img {
      width: 18px;
      height: 18px;
      margin: 0;
    }
  }
  .img {
    margin-right: 40px;
    cursor: pointer;
    &:hover + .dingwwww {
      opacity: 1;
    }
  }
  .songlistzzz {
    flex: 1;
  }
  p {
    display: flex;
    height: 30px;
    font-size: 13px;
    font-weight: 300;
    border-radius: 5px;
    &:hover {
      background-color: #f4f4f4;
    }
    span {
      height: 30px;
      line-height: 30px;
    }
    & > span:nth-child(1) {
      width: 5%;

      text-align: center;
    }
    & > span:nth-child(2) {
      width: 50%;
    }
    & > span:nth-child(3) {
      width: 45%;
      padding-right: 20px;
      text-align: right;
    }
    & + span {
      font-size: 12px;
      display: block;
      color: #666;
      cursor: pointer;
      margin-top: 10px;
      &:hover {
        color: #000;
      }
    }
  }
}
.globalbox {
  display: grid;
  grid-template-columns: repeat(5, 18%);
  grid-gap: 2.5%;
}
.globalitem {
  position: relative;
  .img22 {
    cursor: pointer;
    &:hover + span {
      opacity: 1;
    }
  }
  .dingwwww {
    position: absolute;
    cursor: pointer;
    background-color: rgba(256, 256, 256, 0.5);
    top: 45%;
    transform: translate(-50%, -50%);
    left: 50%;
    width: 45px;
    height: 45px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.5s;
    opacity: 0;
    &:hover {
      opacity: 1;
    }
    img {
      width: 18px;
      height: 18px;
      margin: 0;
    }
  }
  & > span:nth-child(3) {
    font-size: 14px;
    cursor: pointer;
  }
  small {
    position: absolute;
    top: 2px;
    right: 5px;
    color: #fff;
  }
}
.bmx {
  background-color: #f9f9f9;
}
</style>