<template>
    <el-form :model="form">
        <el-form-item label="title:">
            <el-input v-model="title"></el-input>
        </el-form-item>
        <el-form-item label="description:">
            <el-input type="textarea" v-model="description"></el-input>
        </el-form-item>
        <el-form-item label="thumbnail:">
            <div class="imgUploadContainer">
                <input accept="image/*" ref="imageFile" type="file" />
                <el-button v-if="!imgUploading" @click="uploadImage">upload</el-button>
                <el-button v-if="imgUploading" icon="el-icon-loading">{{imgPrecent}}%</el-button>
            </div>
        </el-form-item>
        <el-form-item label="video:">
            <div class="videoUploadContainer">
                <input accept="video/*" ref="videoFile" type="file" />
                <el-button v-if="!videoUploading" @click="uploadVideo">upload</el-button>
                <el-button v-if="videoUploading" icon="el-icon-loading">{{videoPrecent}}%</el-button>
            </div>
        </el-form-item>
        <el-form-item>
            <el-button @click="submit" class="submit" type="primary">submit</el-button>
        </el-form-item>
    </el-form>
</template>
<script>
import aws from "aws-sdk"
export default {
    data() {
        return {
            form:{},
            videoObject: null,
            imgObject: null,
            imgUploading: false,
            imgPrecent: 0,
            videoUploading: false,
            videoPrecent: 0,
            accessKeyId: 'AKIAIK7PWCM6F6WZKYCQ',
            secretAccessKey: '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'
        }
    },
    created() {
        let config = {
            accessKeyId: this.accessKeyId,
            secretAccessKey: this.secretAccessKey,
            apiVersion: '2006-03-01',
            region: 'ap-northeast-1',
            signatureVersion:'v4',
        }
        aws.config.update({
            ...config
        })
    },
    methods:{
        uploadImage() {
            let file = this.$refs.imageFile.files[0]
                let bucket = new aws.S3()
            if(file) {
                let params = {
                    Bucket: 'somi-test',
                    Key: `images/${file.name}`,
                    ContentType: file.type,
                    Body: file,
                    'Access-Control-Allow-Credentials': '*',
                    'ACL': 'public-read'
                }
                this.imgUploading = true
                bucket.upload(params,(err,data)=>{
                    console.log(err,data)
                    if(!err) {
                        this.imgObject = data
                        this.imgUploading = false
                        this.imgPrecent = 0
                        this.$message.success("image upload successful")
                    }else {
                        this.$message.error("image upload failed")
                    }
                    }).on('httpUploadProgress',e=>{
                        console.log('upload progress',e.loaded,e.total)
                        let Precent = parseInt(e.loaded,10)/parseInt(e.total,10)
                        this.imgPrecent = Precent.toFixed(2)*100
                    })
            }
        },
        uploadVideo() {
            let file = this.$refs.videoFile.files[0]
                let bucket = new aws.S3()
            if(file) {
                let params = {
                    Bucket: 'somi-test',
                    Key: `videos/${file.name}`,
                    ContentType: file.type,
                    Body: file,
                    'Access-Control-Allow-Credentials': '*',
                    'ACL': 'public-read'
                }
                this.videoUploading = true
                bucket.upload(params,(err,data)=>{
                    console.log(err,data)
                    if(!err) {
                        this.videoObject = data
                        this.videoUploading = false
                        this.videoPrecent = 0
                        this.$message.success("video upload successful")
                    }else {
                        this.$message.error("video upload failed")
                    }
                    }).on('httpUploadProgress',e=>{
                        console.log('upload progress',e.loaded,e.total)
                        let Precent = parseInt(e.loaded,10)/parseInt(e.total,10)
                        this.videoPrecent = Precent.toFixed(2)*100
                    })
            }
        },
        submit() {
            const {
                form,
                videoObject,
                imgObject
            } = this
            this.axios.post('/video',{
                ...form,
                video: videoObject,
                image: imgObject
            }).then(res=>{
                console.log(res.data)
            })
        }
    }
}
</script>
<style lang="scss">
[class*=UploadContainer]{
    width: 100%;
    display: inline-block;
    text-align: left;
}
.el-form-item {
    border-bottom: 1px solid #ddd;
    padding-bottom: 20px;
}
.submit{
    display: block;
}
</style>
