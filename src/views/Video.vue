<template>
    <div>
        <video-top></video-top>
        <div class="video-container">
            <div class="video-side">
                <video-side></video-side>
            </div>
            <div class="video-info">
                <video ref="myVideo"
                       class="video-js"
                       poster="http://localhost:8888/img/video/p1.png">
                    <source src="http://localhost:8888/video/1-1%E5%AF%BC%E5%AD%A6%E5%BF%85%E7%9C%8B.mp4"
                            type="video/mp4">
                </video>
            </div>
            <div class="video-side"></div>
            <div class="clear"></div>
        </div>
    </div>
</template>

<script>
    import VideoTop from "@/components/video/Top";
    import VideoSide from "@/components/video/Side";
    export default {
        name: "Video",
        components: {
            VideoTop,
            VideoSide,
        },
        data(){
          return{
              chapterList:[],
          }
        },
        props:{
            VideoTop,
        },
        methods:{
            getChapterList(){
                console.log(this.$route.params.id);
                let data = this.$qs.stringify({
                    cdId:this.$route.params.id,
                });
                this.$axios.post("/api/course/getChapter",data).then((result)=>{
                    result = result.data;
                    console.log(result);
                    this.chapterList = result.result;
                })
            },
            //初始化视频方法
            initVideo() {
                this.$video(this.$refs.myVideo, {
                    //确定播放器是否具有用户可以与之交互的控件。没有控件，启动视频播放的唯一方法是使用autoplay属性或通过Player API。
                    controls: true,
                    //建议浏览器是否应在<video>加载元素后立即开始下载视频数据。
                    preload: "auto",
                    //设置视频播放器的显示宽度（以像素为单位）
                    width: "800px",
                    //设置视频播放器的显示高度（以像素为单位）
                    height: "400px"
                });
            }
        },
        mounted(){
            this.getChapterList();
            this.initVideo();
        }
    }
</script>

<style scoped>
    .video-container{
        min-width: 1400px;
        height: 800px;
        background-color: black;
        position: relative;
        margin-bottom: 100px;
    }
    .video-side{
        width: 70px;
        height: 100%;
        padding: 0 10px;
        float: left;
        box-sizing: border-box;
        display: flex;
        align-items: center;
    }
    .video-info{
        width: 1763px;
        height: 100%;
        padding: 10px 26px;
        float: left;
        box-sizing: border-box;
    }
    .video-info .video-js{
        width: 100%;
        height: 100%;
    }
    .video-js >>> .vjs-big-play-button{
        top:46% !important;
        left: 50% !important;
    }
    .clear{
        clear: both;
    }
</style>