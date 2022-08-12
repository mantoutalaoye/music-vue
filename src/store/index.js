import Vue from 'vue'
import Vuex from 'vuex'
import http from "../util/http"
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState({
    reducer: (state) => {
      return {
        userId: state.userId,
        nick: state.nick,
        scplaylist: state.scplaylist,
        myplaylist: state.myplaylist,
        audioid: state.audioid,
        playinglist: state.playinglist,
        searchrecord: state.searchrecord,
        likelist: state.likelist,
        recentlyplaylist: state.recentlyplaylist
      }
    }
  })],
  state: {
    userId: "",
    nick: "",
    scplaylist: "",
    myplaylist: "",
    audioid: "",
    playinglist: [],
    storelyriclist: [],
    th: 0,
    searchrecord: [],
    hotcatlist: [],
    catlist: [],
    goodcatlist: [],
    likelist: [],
    recentlyplaylist: []
  },
  mutations: {
    getnick(state, newnick) { //将用户信息储存
      state.nick = newnick
      state.userId = newnick.profile.userId
    },
    getlikelist(state, list) { //将喜欢的音乐的id数组储存
      state.likelist = list
    },
    clearnick(state) { //清除全部用户数据
      state.userId = '',
        state.nick = "",
        state.scplaylist = "",
        state.myplaylist = "",
        state.likelist = ""
    },
    filterplaylist(state, newlist) { //创建和收藏歌单
      state.myplaylist = newlist.myplaylist,
        state.scplaylist = newlist.scplaylist
    },
    getaudiosrc(state, src) {
      state.audioid = src
    },
    nextaudiosrc(state, index) {
      if (state.playinglist.findIndex(item => item.id == state.audioid) == state.playinglist.length - 1) {
        state.audioid = state.playinglist[0].id
      } else {
        state.audioid = state.playinglist[index].id
      }
    },
    upaudiosrc(state) {
      if (state.playinglist.findIndex(item => item.id == state.audioid) == 0) {
        state.audioid = state.playinglist[state.playinglist.length - 1].id
      } else {
        state.audioid = state.playinglist[state.playinglist.findIndex(item => item.id == state.audioid) - 1].id
      }
    },
    addplayinglist(state, song) {
      state.playinglist = state.playinglist.filter(item => item.id !== song.id)
      state.playinglist.splice(state.playinglist.findIndex(item => item.id == state.audioid) + 1, 0, song)
    },
    replaceplayinglist(state, list) {
      state.playinglist = list
    },
    clearplayinglist(state) {
      state.playinglist = []
      state.audioid = ""
    },
    setstorelyriclist(state, lyriclist) {
      state.storelyriclist = lyriclist
    },
    setth(state, th) {
      state.th = th
    },
    addsearchrecord(state, resdata) {
      if (state.searchrecord.indexOf(resdata) == -1) {
        state.searchrecord.unshift(resdata)
      } else {
        state.searchrecord.splice(state.searchrecord.indexOf(resdata), 1)
        state.searchrecord.unshift(resdata)
      }
    },
    clearsearchrecord(state) {
      state.searchrecord = []
    },
    sethotcatlist(state, list) {
      state.hotcatlist = list
    },
    setcatlist(state, list) {
      state.catlist = list
    },
    setgoodcatlist(state, list) {
      state.goodcatlist = list
    },
    // 最近播放
    addrecently(state, song) {
      state.recentlyplaylist = state.recentlyplaylist.filter(item => item.id !== song.id)
      state.recentlyplaylist.splice(0, 0, song)
    },
    //清空最近播放
    clearrecently(state) {
      state.recentlyplaylist = []
    }
  },
  actions: {
    catlist(context) {
      http.http1(`/playlist/hot`).then((res) => {
        //热门分类
        context.commit("sethotcatlist", res.data.tags)
      });
      http.http1(`/playlist/catlist`).then((res) => {
        //歌单分类
        let arr1 = []
        for (var i in res.data.categories) {
          arr1.push({
            'fg': res.data.categories[i],
            'taglist': []
          })
        }
        res.data.sub.forEach(item => {
          arr1[item.category].taglist.push(item)
        });
        context.commit("setcatlist", arr1)
      });
      http.http1(`/playlist/highquality/tags`).then((res) => {
        //精品歌单标签
        context.commit("setgoodcatlist", res.data.tags);
      });
    },
    //获取歌曲详细并添加到最近播放
    actaddrecently(context, itemid) {
      context.commit("getaudiosrc", itemid)
      http.http1(`/song/detail?ids=${itemid}`).then((res => {
        console.log(res.data);
        let item5 = res.data.songs[0]
        item5.bftime = new Date().getTime()
        context.commit("addrecently", item5)
      }))
    }
  },
  getters: {},
  modules: {

  }
})
