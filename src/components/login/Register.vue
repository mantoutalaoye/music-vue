<template>
  <!-- 注册页面 -->
  <div class="Register">
    <div class="header">
      <span @click="tzlogin">返回登录</span>
    </div>
    <img class="sjpng" src="/loginsj.png" alt="" />
    <div class="input">
      <div class="phone">
        <div>
          <i class="el-icon-mobile-phone">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+86</i>
        </div>
        <div>
          <input type="text" placeholder="请输入手机号" v-model="phone" />
        </div>
      </div>
      <div class="password">
        <i class="el-icon-lock"></i>
        <input type="password" placeholder="设置登录密码" v-model="password" />
      </div>
      <div class="name">
        <i class="el-icon-coordinate"></i>
        <input
          @change="namejc"
          @input="isclick = false"
          type="text"
          placeholder="设置昵称"
          v-model="username"
        />
        <span
          v-if="isclick"
          style="color: red; position: absolute; left: 210px; top: 7px"
          >昵称重复</span
        >
      </div>
      <div class="captchainput">
        <div>
          <input type="text" placeholder="验证码" v-model="captcha" />
        </div>
        <div v-if="!djs" @click="getcaptcha">发送验证码</div>
        <div v-if="djs">{{ time }}s</div>
      </div>
    </div>
    <div class="zqzb">
      <p>密码8-20位，至少包含字母/数字/字符2种组合</p>
      <button @click="register" :disabled="isclick">注册</button>
      <div>其他登录方式</div>
      <img src="/wyemil.png" class="tzemillogin" alt="" />
    </div>
  </div>
</template>
<script>
import { http1 } from "../../util/http";
export default {
  data() {
    return {
      phone: "",
      password: "",
      username: "",
      captcha: "",
      time: 60,
      djs: false,
      isclick: false,
      isyzcg: true,
    };
  },
  methods: {
    tzlogin() {
      this.$emit("isxslogin");
    },
    namejc() {
      http1(`/nickname/check?nickname=${this.username}`).then((res) => {
        if (res.data.duplicated) {
          this.isclick = true;
        } else {
          this.isclick = false;
        }
      });
    },
    getcaptcha() {
      //发送验证码请求
      http1(`/captcha/sent?phone=${this.phone}`).then((res) => {
        console.log(res.data);
        if (res.data.code === 400) {
          this.$message.error("手机号码不符合规范");
          return;
        }
        this.djs = true;
        let timer = setInterval(() => {
          this.time--;
          if (this.time === 0) {
            clearInterval(timer);
            this.djs = false;
          }
        }, 950);
      });
    },
    register() {
      //账号密码昵称不能为空
      http1(`/captcha/verify?phone=${this.phone}&captcha=${this.captcha}`)
        .then(
          (res1) => {
            console.log(res1.data);
            return http.http1(
              `/register/cellphone?phone=${this.phone}&password=${this.password}&captcha=${this.captcha}&nickname=${this.username}`
            );
          },
          (req1) => {
            this.$message.error("验证码错误");
            return new Promise(() => {}); //返回“pending”状态的Promise对象中止不在执行后续then
          }
        )
        .then((res) => {
          this.$emit("isxslogin");
        })
        .catch((err) => {
          console.log("err->", err);
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.Register {
  background-color: #fff;
  width: 350px;
  height: 500px;
  box-shadow: 0 0 10px rgba(220, 220, 220, 0.8);
  .header {
    height: 40px;
    line-height: 40px;
    span {
      font-size: 13px;
      color: #666;
      margin-left: 20px;
      cursor: pointer;
      &:hover {
        color: #333;
      }
    }
  }
  .sjpng {
    width: 310px;
    margin: 0 auto;
    display: block;
  }
  .input {
    width: 270px;
    margin: 0 auto;
    border: 0.5px solid #aaa;
    border-radius: 5px;
    font-size: 13px;
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
      border-bottom: 0.5px solid #aaa;
    }
    .name {
      border-bottom: 0.5px solid #aaa;
      position: relative;
    }
    .captchainput {
      display: flex;
      & > div:first-child {
        border-right: 0.5px solid #aaa;
        width: 60%;
        input {
          width: 75%;
          height: 34px;
          position: relative;
          top: -1px;
          margin-left: 18px;
        }
      }
      & > div:last-child {
        text-align: center;
        width: 40%;
        color: #666;
        cursor: pointer;

        &:hover {
          color: #333;
        }
      }
      div {
        line-height: 35px;
        height: 35px;
      }
    }
  }
  .zqzb {
    width: 270px;
    margin: 0 auto;
    font-size: 12px;
    p {
      color: #666;
      text-align: center;
      margin: 8px 0 8px;
    }
    div {
      font-size: 14px;
      color: #333;
      margin: 10px 0 5px;
      text-align: center;
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
}
.buttondisabled {
  background-color: #aaa !important;
}
</style>