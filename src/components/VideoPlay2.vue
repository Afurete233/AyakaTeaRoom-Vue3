<template>
    <div v-if="isVideoVisible">
        {{ this.src }}        
        <iframe :src="this.src" scrolling="no" frameborder="0"></iframe>
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
        };
    },

    mounted() {
        console.log(this.src)
    },
    methods: {
    },
    computed: {
    },
    watch: {
        // isVideoVisible(newv) {
        //     if (newv) {
        //     }

        // }
    }
};
</script>

<style scoped></style>