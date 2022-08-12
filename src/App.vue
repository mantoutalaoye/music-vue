<template>
  <div id="app">
    <AppHeader></AppHeader>
    <div class="ht">
      <Aside v-if="!$route.meta.isaside"></Aside>
      <router-view />
    </div>
    <Footer></Footer>
  </div>
</template>
<script>
import AppHeader from "@/components/Appcomponents/AppHeader";
import Aside from "./components/Appcomponents/Aside.vue";
import Footer from "./components/Appcomponents/Footer.vue";
export default {
  components: {
    AppHeader,
    Aside,
    Footer,
  },
};
</script>
<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
#app {
  height: 100vh;
  display: flex;
  flex-direction: column;
}
ul {
  list-style: none;
}
.ht {
  flex: 1;
  display: flex;
  height: 0;
  & > div:last-child {
    flex: 1;
  }
}
.el-slider__bar {
  background-color: #ec4141 !important;
  width: 4px !important;
}
.el-slider__button {
  width: 10px !important;
  height: 10px !important;
  background-color: #ec4141 !important;
  border: 0 !important;
  left: -10px !important;
}
.el-slider__runway {
  width: 4px !important;
}
.el-slider__button-wrapper {
  left: -16px !important;
}
</style>
