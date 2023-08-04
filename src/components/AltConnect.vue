<template>
  <el-row>
    <el-col :span="8">
      <el-card style="border: none" :body-style="{ padding: '0px' }">
        <div style="position: relative">
          <img draggable="false" v-bind:src="getimg(this.acgdata.AID)" :onerror="defalutLogoUrl" class="image"
            width="100%" style="border-radius: 3px 3px 0px 0px" />
        </div>
        <div>
          <span id="NewTitle2">{{ this.acgdata.NewTitle }}</span>
        </div>
        <div id="Title">
          <span>{{ this.acgdata.Title }}</span>
        </div>
      </el-card>
    </el-col>
    <el-col :span="16">
      <el-row>
        <transition-group name="el-fade-in-linear">
          <el-card key="yuan" style="padding-bottom: 15px;width: 100%;">
            <el-row>
              <el-col :xs="24" :sm="12" :md="8" v-for="(item, index) in acg_url_data" :key="index">
                <a :href="item.api + (item.mode == 0 ? acgdata.AID : acgdata.Title)" target="_blank">
                  <el-button type="primary" plain style="height: 50px;" :title="item.title">
                    <img :src="item.icon" width="100%" />
                    {{ item.icon == "" ? item.title : "" }}</el-button>
                </a>
              </el-col>
            </el-row>
          </el-card>
          <el-col key="tab">
            <el-col>
              <el-tabs v-model="tabnum" :stretch="true" style="padding: 15px;">
                <el-tab-pane v-for="(yuan, index) in acg_src" :label="index" :name="index + ''"
                  :key="index"></el-tab-pane>
              </el-tabs>
            </el-col>
            <el-card v-for="(item, index) in acg_src" :key="index" style="margin-left: 10px;margin-right: 10px;
          padding-bottom: 15px;" v-show="item != '' && tabnum == index">
              <el-col v-for="(citem, num) in item" :key="num" :xs="24" :sm="12" :md="8">
                <el-button type="primary" plain style="height: 50px;"
                  @click="videoplayer = true, now_src = citem.replace('http:', 'https:').split('https://')[1], num1 = citem.replace('http:', 'https:').split('https://')[0].split(' ')[0]">
                  第{{ num + 1 }}话
                </el-button>
              </el-col>
            </el-card>
          </el-col>
        </transition-group>
      </el-row>
    </el-col>
    <el-dialog :title="num1" :visible.sync="videoplayer" :modal-append-to-body='false' @open="isVideoVisible = true"
      @close="isVideoVisible = false" append-to-body>
      <!-- <VideoPlay :src="now_src" :isVideoVisible="isVideoVisible"></VideoPlay> -->
    </el-dialog>
  </el-row>
</template>

<script>
import axios from "axios";
import DefaultData from "./DefaultData.vue";
// import VideoPlay from './VideoPlay.vue';

export default {
  // components: { VideoPlay },
  name: "AltConnect",

  props: {
    acgdata: {},
  },
  data() {
    return {
      isVideoVisible: false,
      num1: "0",
      videoplayer: false,
      tabnum: 'R在线播放3',
      now_src: "",
      acg_src: {},
      acg_url_data: DefaultData.old_acg_url,
      imgURL: "",
      defalutLogoUrl: DefaultData.errorimg,
      onlyone: 0
    };
  },

  mounted() {



  },
  methods: {
    getimg(index) {
      var _this = this;


      if (this.acgdata.Title == undefined) {
        // eslint-disable-next-line vue/no-mutating-props
        this.acgdata.Title = this.acgdata.name;
      }

        axios
          .get(DefaultData.age_api + "detail/" + index)
          .then((response) => {

            _this.imgURL = response.data.video.cover;
            _this.acgdata.NewTitle = response.data.video.uptodate;


            // .replace("http:","https:").split("https://")
          });
      return _this.imgURL;
    },
  },
};
</script>

<style lang="scss" scoped>
a {
  color: #4297e0;
  text-decoration: none;
}

.el-button {
  width: 100px;
  margin: 5px;
}

#NewTitle2 {
  position: absolute;
  left: 10px;
  top: 10px;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 5px;
  background-color: #f4f0f0ce;
  overflow: hidden;
  border-radius: 2.5px;
  max-width: 80%;
  font-size: 10px;
  line-height: 10px;
}
</style>