<template>
  <div class="loginmain">
    <i class="el-icon-close" @click="txoff"></i>
    <Login v-if="!isxszc" @isoff="txoff" @isxs="isxszc = !isxszc"></Login>
    <Register v-if="isxszc" @isxslogin="isxszc = !isxszc"></Register>
  </div>
</template>
<script>
import Register from "./Register";
import Login from "./Login";
export default {
  data() {
    return {
      isxszc: false,
    };
  },
  components: {
    Register,
    Login,
  },
  methods: {
    txoff() {
      this.$emit("offlogin"); //向父组件发信号，关闭登录框
    },
  },
};
</script>
<style lang="scss" scoped>
.loginmain {
  background-color: #fff;
  width: 350px;
  height: 500px;
  box-shadow: 0 0 10px rgba(220, 220, 220, 0.8);
  position: fixed;
  z-index: 99999;
  top: 100px;
  left: 50%;
  transform: translateX(-50%);
}
i {
  position: absolute;
  z-index: 3;
  right: 0;
  top: 0;
  cursor: pointer;
  width: 40px;
  height: 40px;
  line-height: 40px;
  font-size: 20px;
  text-align: center;
  color: #aaa;
  &:hover {
    color: #333;
  }
}
</style>