<template>
  <ul>
    <router-link
      :to="{
        path: '/searchlist/single',
        query: { searchname: $route.query.searchname },
      }"
      custom
      v-slot="{ isActive, navigate }"
    >
      <li @click="navigate" :class="isActive ? 'activeClass' : ''">单曲</li>
    </router-link>
    <router-link
      :to="{
        path: '/searchlist/singer',
        query: { searchname: $route.query.searchname },
      }"
      custom
      v-slot="{ isActive, navigate }"
    >
      <li @click="navigate" :class="isActive ? 'activeClass' : ''">歌手</li>
    </router-link>
    <router-link
      :to="{
        path: '/searchlist/album',
        query: { searchname: $route.query.searchname },
      }"
      custom
      v-slot="{ isActive, navigate }"
    >
      <li @click="navigate" :class="isActive ? 'activeClass' : ''">专辑</li>
    </router-link>
    <router-link
      :to="{
        path: '/searchlist/video',
        query: { searchname: $route.query.searchname },
      }"
      custom
      v-slot="{ isActive, navigate }"
    >
      <li @click="navigate" :class="isActive ? 'activeClass' : ''">视频</li>
    </router-link>
  </ul>
</template>
<style lang="scss" scoped>
ul {
  display: flex;
  margin: 20px 20px 0;
  li {
    margin-left: 25px;
    padding-bottom: 5px;
    font-size: 15px;
    font-weight: 300;
    cursor: pointer;
  }
}
.activeClass {
  font-size: 16px;
  font-weight: 800;
  border-bottom: 3px solid #ec4141;
}
</style>