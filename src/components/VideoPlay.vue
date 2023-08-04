<template>
    <div v-if="isVideoVisible">
        <videoPlayer class="video-player" ref="videoPlayer" :options="playerOptions" v-loading="!isrun"
            element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(255, 255, 255, 1)"></videoPlayer>
        <!-- <iframe :src="'https://jx.playerjy.com/?url=http://'+src"  scrolling="no" frameborder="0" ></iframe> -->
    </div>
</template>

<script>
// import { videoPlayer } from "vue-video-player";
// import "video.js/dist/video-js.css";
// import 'videojs-contrib-hls'
// require('vue-video-player/node_modules/video.js/dist/video-js.css')
// require('vue-video-player/src/custom-theme.css')
import axios from "axios";


export default {
    name: 'VideoPlay',
    components: {
        // videoPlayer,
    },
    props: {
        src: String,
        isVideoVisible: Boolean
    },
    data() {
        return {
            isrun: false,
            resetsrc: {},
            playerOptions: {
                playbackRates: [0.7, 1.0, 1.5, 2.0], // 播放速度
                autoplay: true, // 如果为true,浏览器准备好时开始回放。
                preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
                language: "zh-CN",
                aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                sources: [
                    {
                        type: "application/x-mpegURL", // 类型
                        src: "", // url地址
                    },
                ],
                poster: "", // 封面地址
                notSupportedMessage: "此视频暂无法播放，请稍后再试", // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
                controlBar: {
                    timeDivider: true, // 当前时间和持续时间的分隔符
                    durationDisplay: true, // 显示持续时间
                    remainingTimeDisplay: true, // 是否显示剩余时间功能
                    fullscreenToggle: true, // 是否显示全屏按钮
                },
            }
        };
    },

    mounted() {
        this.viplink();
    },
    methods: {
        viplink() {

            var _this = this;
            _this.isrun = false;


            axios
                .get("https://json.vipjx.cnow.eu.org/?url=https://" + _this.src)
                .then((response) => {

                    if (_this.src != null)
                        if (response.data.code == "200") {
                            _this.resetsrc.src = response.data.url;
                            _this.resetsrc.type = response.data.type == "m3u8" ? "application/x-mpegURL" : "video/mp4";
                            console.log(response.data.msg);
                            if (response.data.msg == "当前请求已限制，请1小时后再试！") {
                                console.log("解析失败,使用本地方式判断")
                                _this.resetsrc.src = "https://" + _this.src;
                                _this.resetsrc.type = _this.src.split('.m3u8').length > 1 ? "application/x-mpegURL" : "video/mp4"
                            }
                        } else {
                            console.log("解析失败,使用本地方式判断")
                            _this.resetsrc.src = "https://" + _this.src;
                            _this.resetsrc.type = _this.src.split('.m3u8').length > 1 ? "application/x-mpegURL" : "video/mp4"
                        }
                    _this.isrun = true;
                    _this.reload();

                    // console.log(_this.src);
                    // console.log(response.data)
                });
        },
        reload() {
            this.playerOptions.sources[0].src = this.resetsrc.src;
            this.playerOptions.sources[0].type = this.resetsrc.type;
        }
    },
    computed: {
    },
    watch: {
        isVideoVisible(newv) {
            if (newv) {
                this.viplink();
            }

        }
    }
};
</script>

<style scoped></style>