<template>
  <div
    class="Commentsbox"
    :class="commenttype == 'music' ? 'commentsboxxxx' : ''"
  >
    <el-input
      type="textarea"
      v-model="textarea"
      maxlength="140"
      show-word-limit
      :rows="3"
      v-if="commenttype !== 'music'"
    >
    </el-input>
    <div class="buttoncomments" v-if="commenttype !== 'music'">
      <el-button round size="mini" @click="fbpl">评论</el-button>
    </div>

    <div class="splendidcomments">
      <h4>精彩评论</h4>
      <div
        class="commentsitem"
        v-for="item in hotComments"
        :key="item.commentId"
      >
        <el-avatar
          class="plimg"
          size="medium"
          :src="item.user.avatarUrl"
        ></el-avatar>
        <div class="commentsitemright">
          <p>
            <span>{{ item.user.nickname + "：" }}</span
            >{{ item.content }}
          </p>
          <div class="yydajucna" v-if="item.beReplied.length">
            <span>{{ "@" + item.beReplied[0].user.nickname + "：" }}</span
            >{{ item.beReplied[0].content }}
          </div>
          <div class="zqzbdddd">
            <small>{{ zhdate(item.time) }}</small>
            <small>
              <span
                ><van-icon name="good-job-o" size="16" />&nbsp;{{
                  item.likedCount
                }}</span
              >|
              <span
                ><van-icon
                  @click="huifu(item.commentId, item.user.nickname)"
                  name="chat-o"
                  size="16"
              /></span>
            </small>
          </div>
        </div>
      </div>
    </div>
    <div class="comments">
      <h4>最新评论</h4>
      <div class="commentsitem" v-for="item in comments" :key="item.commentId">
        <el-avatar
          class="plimg"
          size="medium"
          :src="item.user.avatarUrl"
        ></el-avatar>
        <div class="commentsitemright">
          <p>
            <span>{{ item.user.nickname + "：" }}</span
            >{{ item.content }}
          </p>
          <div class="yydajucna" v-if="item.beReplied.length">
            <span>{{ "@" + item.beReplied[0].user.nickname + "：" }}</span
            >{{ item.beReplied[0].content }}
          </div>
          <div class="zqzbdddd">
            <small>{{ zhdatexxxx(item.time, item.timeStr) }}</small>
            <small>
              <span
                ><van-icon name="good-job-o" size="16" />&nbsp;{{
                  item.likedCount
                }}</span
              >|
              <span
                ><van-icon
                  name="chat-o"
                  size="16"
                  @click="huifu(item.commentId, item.user.nickname)"
              /></span>
            </small>
          </div>
        </div>
      </div>
    </div>
    <el-dialog :visible.sync="dialogFormVisible" @close="textarea2 = ''">
      <el-input
        type="textarea"
        v-model="textarea2"
        maxlength="140"
        :placeholder="'回复：' + commentName + '：'"
        show-word-limit
        :rows="4"
      >
      </el-input>
      <div slot="footer" class="dialog-footer">
        <button
          class="plbuttondhk"
          :disabled="textarea2 == ''"
          @click="releasecomment"
        >
          确 定
        </button>
        <div v-if="textarea2 == ''"></div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import moment from "moment";
import http from "../util/http";
import { mapState } from "vuex";
export default {
  props: ["commenttype"],
  data() {
    return {
      textarea: "",
      hotComments: [],
      comments: [],
      idsss: "",
      dialogFormVisible: false,
      textarea2: "",
      commentName: "",
      commentIdfyj: "",
      type: "",
    };
  },
  computed: {
    ...mapState(["audioid", "userId"]),
  },
  created() {
    if (this.commenttype == "music") {
      this.idsss = this.audioid;
    }
    if (this.commenttype == "playlist") {
      this.idsss = this.$route.params.id;
      console.log(this.idsss);
    }
    http
      .http1(`/comment/${this.commenttype}?id=${this.idsss}&limit=100&offset=0`)
      .then((res) => {
        this.hotComments = res.data.hotComments;
        this.comments = res.data.comments;
        console.log(res.data);
      });
  },
  watch: {
    audioid(newid) {
      if (this.commenttype == "music") {
        this.idsss = newid;
      }
      http
        .http1(
          `/comment/${this.commenttype}?id=${this.idsss}&limit=100&offset=0`
        )
        .then((res) => {
          this.hotComments = res.data.hotComments;
          this.comments = res.data.comments;
          console.log(res.data);
        });
    },
  },
  methods: {
    zhdate(time) {
      return moment(time).format("YYYY年MM月DD日 HH:mm");
    },
    zhdatexxxx(time, timeStr) {
      if (timeStr.includes("-")) {
        if (timeStr.length == 5) {
          return moment(time).format("MM月DD日 HH:mm");
        }
        if (timeStr.length == 10) {
          return moment(time).format("YYYY年MM月DD日 HH:mm");
        }
      } else {
        return timeStr;
      }
    },
    huifu(commentId, name) {
      console.log(999999);
      this.dialogFormVisible = true;
      this.commentName = name;
      this.commentIdfyj = commentId;
      console.log(this.commentIdfyj);
    },
    releasecomment() {
      if (this.commenttype == "music") {
        this.type = 0;
        console.log("回复歌曲评论");
        // t :1 发送, 2 回复
        http
          .http1(
            `/comment?t=2&type=${this.type}&id=${this.idsss}&content=${
              this.textarea2
            }&commentId=${this.commentIdfyj}&cookie=${localStorage.getItem(
              "cookie"
            )}`
          )
          .then((res) => {
            console.log(res.data);
            this.dialogFormVisible = false;
          });
      }
      if (this.commenttype == "playlist") {
        console.log("回复歌单评论");
        this.type = 2;
        // t :1 发送, 2 回复
        http
          .http1(
            `/comment?t=2&type=${this.type}&id=${this.idsss}&content=${
              this.textarea2
            }&commentId=${this.commentIdfyj}&cookie=${localStorage.getItem(
              "cookie"
            )}`
          )
          .then((res) => {
            console.log(res.data);
            this.dialogFormVisible = false;
          });
      }
    },
    fbpl() {
      console.log(4566415416516);
    },
  },
};
</script>
<style lang="scss" scoped>
.commentsboxxxx {
  // position: absolute;
  // top: 80%;
  // left: 50%;
  // transform: translateX(-50%);
  // z-index: 999;
  width: 45%;
  position: relative;
  top: -128px;
}
.Commentsbox {
  margin: 30px;
}

.buttoncomments {
  padding: 8px 0 0;
  display: flex;
  justify-content: end;
}
h4 {
  margin-top: 20px;
}
.commentsitem {
  border-bottom: 0.5px solid #ccc;
  padding: 10px 0;
  display: flex;
  .plimg {
    width: 36px;
    display: block;
  }
  .commentsitemright {
    font-size: 13px;
    padding-left: 20px;
    flex: 1;
    p {
      // display: flex;
      // align-items: center;
      margin-bottom: 10px;
      color: #373737;
      span {
        color: #507daf;
        cursor: pointer;
        &:hover {
          color: #0b58c1;
        }
      }
    }
    .zqzbdddd {
      margin-top: 10px;
      color: #aaa;
      display: flex;
      justify-content: space-between;
      & > small:last-child {
        display: flex;
        span {
          display: flex;
          align-items: center;
          margin: 0 10px;
          i {
            color: #666;
            cursor: pointer;
          }
          i:hover {
            color: #000;
          }
        }
      }
    }
    .yydajucna {
      color: #636363;
      background-color: #f4f4f4;
      border-radius: 6px;
      padding: 8px;
      span {
        color: #507daf;
        cursor: pointer;
        &:hover {
          color: #0b58c1;
        }
      }
    }
  }
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