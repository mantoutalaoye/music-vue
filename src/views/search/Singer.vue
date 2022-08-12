<template>
  <div class="Singerbox">
    <div
      v-for="(item, index) in singerlist"
      :key="item.id"
      :class="(index + 1) % 2 == 1 ? 'bmx' : ''"
    >
      <div
        class="singerimgbox"
        :style="'background-image: url(' + item.img1v1Url + ')'"
      ></div>
      <span v-if="singerlist.length">
        {{ item.name }}
        <small v-if="item.alias.length">({{ item.alias[0] }})</small>
      </span>
      <div v-if="item.img1v1 !== -1" class="zcgs">
        <i class="el-icon-user" />
      </div>
    </div>
  </div>
</template>
<script>
import http from "../../util/http";
export default {
  data() {
    return {
      singerlist: [],
    };
  },
  created() {
    this.finished = true;
    http
      .http1(`/cloudsearch?type=100&keywords=${this.$route.query.searchname}`)
      .then((res) => {
        this.singerlist = res.data.result.artists;
        console.log(res.data);
      });
  },
};
</script>
<style lang="scss" scoped>
.Singerbox {
  div {
    padding: 6px 25px;
    position: relative;
    display: flex;
    align-items: center;
    &:hover {
      background-color: #eee;
    }
    .singerimgbox {
      padding: 0;
      width: 60px;
      height: 60px;
      border-radius: 5px;
      overflow: hidden;
      background-position: center center;
      background-size: cover;
    }
    span {
      margin-left: 10px;
      font-size: 15px;
      font-weight: 300;
      cursor: pointer;
      color: #507daf;
      small {
        color: #aaa;
      }
    }
    .zcgs {
      padding: 0;
      border-radius: 50%;
      width: 20px;
      height: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 18px;
      position: absolute;
      right: 25px;
      color: #fff;
      background-color: #ec4141;
    }
  }
}
.bmx {
  background-color: #f9f9f9;
}
</style>