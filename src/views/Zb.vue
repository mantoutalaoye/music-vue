<template>
  <div>获取等级</div>
</template>
<script>
import http from "../util/http";
export default {
  mounted() {
    if (localStorage.getItem("cookie")) {
      http.http2("/user/level").then((res) => {
        console.log(res);
      });
    }
  },
};
</script>