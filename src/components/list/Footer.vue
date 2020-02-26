<template>
    <div class="footer">
        <div class="footer-container">
            <div class="footer-link">
                <ul>
                    <li>企业合作</li>
                    <li>人才招聘</li>
                    <li>联系我们</li>
                    <li>帮助中心</li>
                    <li>意见反馈</li>
                </ul>
            </div>
            <div class="footer-copyright">
                <p>@2020 White课堂</p>
                <p>技术支持：嘉应学院计算机学院 WhiteWhite@MSJ</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ListFooter"
    }
</script>

<style scoped>
    .footer{
        min-width: 1400px;
        background-color: #6b7889;
    }
    .footer-container{
        width: 1200px;
        height: 120px;
        padding:26px 0;
        margin: 0 auto;
        color: white;
    }

    .footer-link{
        height: 28px;
        width: 500px;
        margin: 0 auto;
        line-height: 28px;
        text-align: center;
        border-bottom: 1px solid darkgrey;
    }
    .footer-link ul{
        padding: 0;
        margin: 0;
    }
    .footer-link ul li{
        list-style-type: none;
        float: left;
        font-size: 13px;
        padding: 0 24px;
    }
    .footer-copyright{
        text-align: center;
    }

</style>