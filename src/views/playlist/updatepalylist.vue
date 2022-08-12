<template>
  <div class="updatelist">
    <p>编辑歌单信息</p>
    <div class="upcontent">
      <div class="conleft">
        <p>
          <i>歌单名：</i
          ><span><el-input v-model="input" size="mini"></el-input></span>
        </p>
        <p>
          <i>标签：</i><span><el-link type="primary">添加标签</el-link></span>
        </p>
        <p>
          <i>简介：</i>
          <span>
            <el-input
              type="textarea"
              v-model="textarea"
              maxlength="1000"
              show-word-limit
              rows="4"
            >
            </el-input>
          </span>
        </p>
        <div class="ann">
          <button @click="bc">保存</button
          ><button @click="$router.back()">取消</button>
        </div>
      </div>
      <div class="conright">
        <div>
          <img :src="play.coverImgUrl" alt="" v-if="play" />
          <el-button round size="medium">编辑封面</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import http from "../../util/http";
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      input: "",
      textarea: "",
      play: "",
    };
  },
  computed: {
    ...mapState(["userId", "nickname"]),
  },
  created() {
    console.log(this.$route.query.id);
    http
      .http1(
        `/playlist/detail?id=${
          this.$route.query.id
        }&cookie=${localStorage.getItem("cookie")}`
      )
      .then((res) => {
        console.log(res.data);
        this.play = res.data.playlist;
        this.input = res.data.playlist.name;
        this.textarea = res.data.playlist.description;
      });
  },
  methods: {
    ...mapMutations(["getplaylist", "filterplaylist"]),
    bc() {
      http
        .http1(
          `/playlist/update?id=${this.$route.query.id}&name=${
            this.input
          }&desc=${this.textarea}&tags=怀旧&cookie=${localStorage.getItem(
            "cookie"
          )}`
        )
        .then((res) => {
          console.log(res.data);
          this.$message({
            message: "修改成功",
            type: "success",
          });
          return http.http1(`/user/playlist?uid=${this.userId}`);
        })
        .then((res) => {
          //获取歌单
          this.getplaylist(res.data.playlist);

          this.filterplaylist({
            myplaylist: res.data.playlist.filter(
              (todo) => todo.creator.nickname == this.nickname
            ),
            scplaylist: res.data.playlist.filter(
              (todo) => todo.creator.nickname != this.nickname
            ),
          });
          console.log(res.data);
        });
    },
    getplayfff() {
      return http.http1(`/user/playlist?uid=${this.userId}`);
    },
  },
};
</script>
<style lang="scss" scoped>
.updatelist {
  padding: 20px 40px;
  & > p {
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 20px;
  }
  .upcontent {
    display: flex;
    .conleft {
      p {
        display: flex;
        justify-content: end;
        font-size: 12px;
        display: flex;
        margin: 15px 0;
        i {
          width: 48px;
          text-align: right;
        }
        span {
          display: block;
          flex: 1;
        }
        .el-link {
          font-size: 12px !important;
          margin: 0 8px;
        }
      }
      .ann {
        display: flex;
        justify-content: space-around;
        margin-top: 30px;
        & > button:first-child {
          border: 0;
          background-color: #ec4141;
          color: #fff;
          &:hover {
            background-color: #d73535;
          }
        }
        & > button:last-child:hover {
          background-color: #eee;
        }
        button {
          border: 0.5px solid #aaa;
          width: 80px;
          height: 35px;
          border-radius: 20px;
          background-color: #fff;
          cursor: pointer;
        }
      }
    }
    .conright {
      margin-left: 60px;
      div {
        display: inline-block;
        img {
          display: block;
          height: 160px;
        }
        button {
          display: block;
          margin: 20px auto;
        }
      }
    }
    div {
      flex: 1;
    }
  }
}
</style>