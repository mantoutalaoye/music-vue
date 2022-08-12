<template>
  <div class="login">
    <div class="header">
      <img src="/shaoma.png" alt="" />

      <div class="ewm"></div>
    </div>
    <img class="sjpng" src="/loginsj.png" alt="" />
    <div class="input">
      <div class="phone">
        <div><i class="el-icon-mobile-phone"></i></div>
        <div>
          <input
            type="text"
            @input="istgyz = true"
            placeholder="请输入手机号"
            v-model="phone"
          />
        </div>
      </div>
      <div class="password">
        <i class="el-icon-lock"></i>
        <input
          type="password"
          @input="istgyz = true"
          placeholder="请输入密码"
          v-model="password"
        />
        <span class="czpassword">重设密码</span>
      </div>
      <u v-if="!istgyz">手机号或密码错误</u>
    </div>
    <div class="zqzb">
      <div class="zddl">
        <input type="checkbox" name="" id="" /><span>自动登录</span>
      </div>
      <button @click="phonelogin">登录</button>
      <a href="#" @click="tzzc" class="tzzc">注册</a>
      <img src="/wyemil.png" class="tzemillogin" alt="" />
    </div>
    <div class="tkzc animate__animated" :class="isdh ? 'animate__swing' : ''">
      <input type="checkbox" v-model="isty" /> 同意
      <a href="https://st.music.163.com/official-terms/service" target="_blank"
        >《服务条款》</a
      >
      <a href="https://st.music.163.com/official-terms/privacy" target="_blank"
        >《隐私政策》</a
      ><a
        href="https://st.music.163.com/official-terms/children"
        target="_blank"
        >《儿童隐私政策》</a
      >
    </div>
  </div>
</template>
<script>
import { http1 } from "../../util/http";
import { mapState, mapMutations } from "vuex";
import "animate.css";
export default {
  data() {
    return {
      phone: "",
      password: "",
      istgyz: true, //是否通过账号密码验证
      isty: false, //是否同意条款
      isdh: false, //是否触发抖动动画
    };
  },
  computed: {
    ...mapState(["nick", "userId"]),
  },
  methods: {
    ...mapMutations(["getnick", "filterplaylist", "getlikelist"]),
    tzzc() {
      this.$emit("isxs");
    },
    phonelogin() {
      if (!this.isty) {
        // 如果没有同意条款则触发抖动动画，并结束函数
        this.isdh = true;
        return;
      }
      http1(
        `/login/cellphone?phone=${this.phone}&password=${this.password}`
      ).then((res) => {
        if (res.data.code === 200) {
          localStorage.setItem("cookie", res.data.cookie); //登录成功,并获取用户信息
          this.getnick(res.data); //将信息储存在vuex中
          this.$emit("isoff"); //向父组件发信号，关闭登录框
          http1(
            `/likelist?uid=${this.userId}&cookie=${localStorage.getItem(
              "cookie"
            )}`
          ).then((res) => {
            console.log(res.data);
            this.getlikelist(res.data.ids); //获取喜欢的音乐id列表
          });
          http1(`/user/playlist?uid=${this.userId}`).then((res) => {
            //获取歌单
            // this.getplaylist(res.data.playlist);
            //将歌单分成我创建的歌单和收藏的歌单
            this.filterplaylist({
              myplaylist: res.data.playlist.filter(
                (todo) => todo.creator.nickname === this.nick.profile.nickname
              ),

              scplaylist: res.data.playlist.filter(
                (todo) => todo.creator.nickname !== this.nick.profile.nickname
              ),
            });
            console.log(res.data);
            this.$router.go(0);
          });
        } else {
          this.istgyz = false; //登录失败显示手机号或密码不正确
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.login {
  .header {
    height: 40px;
    position: relative;
    img {
      height: 40px;
    }
    .ewm {
      position: absolute;
      left: 0;
      top: 0;
      width: 40px;
      height: 40px;
      cursor: pointer;
    }
  }
  .sjpng {
    width: 310px;
    margin: 0 auto;
    display: block;
  }
  .input {
    position: relative;
    width: 270px;
    margin: 0 auto;
    border: 0.5px solid #aaa;
    border-radius: 5px;
    font-size: 13px;
    u {
      position: absolute;
      bottom: -24px;
      right: 0;
      color: red;
    }
    input {
      height: 35px;
      border: 0;
      outline: none;
      padding-left: 10px;
    }
    i {
      margin-left: 5px;
    }
    .phone {
      display: flex;
      div {
        height: 35px;
        line-height: 31px;
      }
      & > div:first-child {
        width: 35%;
        border-right: 0.5px solid #aaa;
        border-bottom: 0.5px solid #aaa;
      }
      & > div:last-child {
        width: 65%;
        border-bottom: 0.5px solid #aaa;
      }
    }
    .password {
      position: relative;
      height: 35px;
      line-height: 31px;
      .czpassword {
        position: absolute;
        right: 10px;
        color: #777;
        height: 35px;
        line-height: 35px;
      }
    }
  }
  .zqzb {
    width: 270px;
    margin: 0 auto;
    font-size: 12px;
    .zddl {
      margin: 8px 0;
      display: flex;
      align-items: center;
      input {
        margin-top: 2px;
        border: 0;
      }
      span {
        padding-left: 5px;
        height: 17px;
        line-height: 17px;
      }
    }
    button {
      width: 270px;
      font-size: 15px;
      height: 38px;
      border: 0;
      border-radius: 5px;
      background-color: #ea4848;
      transition: all 0.5s;
      color: #fff;
      &:hover {
        background-color: #c72e2e;
        cursor: pointer;
      }
    }
    .tzzc {
      color: #000;
      font-size: 14px;
      display: block;
      text-align: center;
      margin: 15px 0;
    }
    .tzemillogin {
      width: 50px;
      border-radius: 50%;
      display: block;
      margin: 0 auto;
      cursor: pointer;
      &:hover {
        box-shadow: 0 0 10px rgba(220, 220, 220, 0.8);
      }
    }
  }
  .tkzc {
    font-size: 12px;
    text-align: center;
    a {
      font-size: 12px;
      text-decoration: none;
    }
    input {
      position: relative;
      top: 3px;
    }
  }
}
</style>