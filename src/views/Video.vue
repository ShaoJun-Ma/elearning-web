<template>
    <div>
        <video-top></video-top>
        <div class="video-container">
            <div class="video-side">
                <video-side></video-side>
            </div>
            <div class="video-info"></div>
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

            }
        },
        mounted(){
            this.getChapterList();
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
    .clear{
        clear: both;
    }
</style>