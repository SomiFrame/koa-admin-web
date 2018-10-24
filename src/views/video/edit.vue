<template>
    <div class="page-container">
        <el-form :model="form">
            <el-form-item label="title:">
                <el-input v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item label="description:">
                <el-input type="textarea" v-model="form.description"></el-input>
            </el-form-item>
            <el-form-item label="tags:">
                <el-select v-model="form.tags" class="tagSelector" multiple filterable>
                    <el-option
                        v-for="(item,index) in tagOptions"
                        :key="index"
                        :label="item.name"
                        :value="item._id"
                    >
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="thumbnail:">
                <div class="imgUploadContainer">
                    <input accept="image/*" ref="imageFile" type="file" />
                    <el-button v-if="!imgUploading" @click="uploadImage">upload</el-button>
                    <el-button v-if="imgUploading" icon="el-icon-loading">{{imgPercent}}%</el-button>
                </div>
            </el-form-item>
            <el-form-item label="video:">
                <div class="videoUploadContainer">
                    <input accept="video/*" ref="videoFile" type="file" />
                    <el-progress v-if="videoUploading" :color="`rgba(${videoPercent*2},${videoPercent*2}, ${videoPercent*2}, 0.7)`" :text-inside="true" :stroke-width="18" :percentage="videoPercent"></el-progress>
                    <el-button v-if="!videoUploading" @click="uploadVideo">upload</el-button>
                    <!--<el-button v-if="videoUploading" icon="el-icon-loading">{{videoPercent}}%</el-button>-->
                </div>
            </el-form-item>
            <el-form-item>
                <el-button @click="submit" class="submit" type="primary">submit</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import aws from "aws-sdk"
let config = {
    region: 'ap-northeast-1',
    signatureVersion:'v4',
}
aws.config.update({
    ...config
})
export default {
    data() {
        return {
            form:{},
            tagOptions:[],
            videoObject: null,
            imgObject: null,
            imgUploading: false,
            imgPercent: 0,
            videoUploading: false,
            videoPercent: 0,
            credentials: {}
        }
    },
    created() {
        this.getVideo()
        this.getTags()
        this.getCertification()
    },
    methods:{
        getVideo() {
            console.log(this.$route.params)
            const {id} = this.$route.params
            this.axios.get(`/videos/${id}`).then(res=>{
                const {status,data} = res.data
                console.log(data,status)
                this.form = data
            })
        },
        getTags() {
            this.axios.get('/tags').then(res=>{
                const {status,data} = res.data
                console.log(status)
                this.tagOptions = data.data
            })
        },
        uploadImage() {
            let file = this.$refs.imageFile.files[0]
            const {AccessKeyId:accessKeyId,SecretAccessKey:secretAccessKey,SessionToken:sessionToken} = this.credentials
            let bucket = new aws.S3({
                accessKeyId,
                secretAccessKey,
                sessionToken
            })
            if(file) {
                let params = {
                    Bucket: 'somi-test',
                    Key: `images/${file.name}`,
                    ContentType: file.type,
                    Body: file,
                }
                this.imgUploading = true
                bucket.upload(params,(err,data)=>{
                    console.log(err,data)
                    if(!err) {
                        this.imgObject = data
                        this.imgUploading = false
                        this.imgPercent = 0
                        this.$message.success("image upload successful")
                    }else {
                        this.$message.error("image upload failed")
                    }
                    }).on('httpUploadProgress',e=>{
                        let Percent = parseInt(e.loaded,10)/parseInt(e.total,10)
                        this.imgPercent = Percent.toFixed(2)*100
                    })
            }
        },
        getBucket() {
            const {AccessKeyId:accessKeyId,SecretAccessKey:secretAccessKey,SessionToken:sessionToken} = this.credentials
            let bucket = new aws.S3({
                accessKeyId,
                secretAccessKey,
                sessionToken
            })
            return bucket
        },
        customUpload(){
            let file = this.$refs.videoFile.files[0]
            let bucket = this.getBucket()
            bucket.createMultipartUpload({Bucket:'somi-test',Key:`videos/${file.name}`},(err,data)=>{
                err&&console.log(err,err.stack)
                err||console.log(data)
            })
        },
        uploadVideo() {
            let file = this.$refs.videoFile.files[0]
            let bucket = this.getBucket()
            if(file) {
                let params = {
                    Bucket: 'somi-test',
                    Key: `videos/${file.name}`,
                    ContentType: file.type,
                    Body: file
                }
                this.videoUploading = true
                bucket.upload(params,(err,data)=>{
                    console.log(err,data)
                    if(!err) {
                        this.videoObject = data
                        this.videoUploading = false
                        this.videoPercent = 0
                        this.$message.success("video upload successful")
                    }else {
                        this.$message.error("video upload failed")
                    }
                    }).on('httpUploadProgress',e=>{
                        console.log('upload progress',e.loaded,e.total)
                        let Percent = parseInt(e.loaded,10)/parseInt(e.total,10)
                        this.videoPercent = Percent.toFixed(2)*100
                    })
            }
        },
        getCertification() {
            this.axios.get('/certification',{timeout:10000}).then(res=>{
                console.log(res)
                const {data,status} = res.data
                if(!status){
                    this.credentials = data
                }
            })
        },
        submit() {
            const {id} = this.$route.params
            const {
                form,
                videoObject,
                imgObject
            } = this
            this.axios.put(`/videos/${id}`,{
                ...form,
                video: videoObject,
                image: imgObject
            }).then(res=>{
                console.log(res.data)
                const {status,message}=res.data
                if(status) {
                    this.$message.error(message)
                }else {
                    this.$message.success(message)
                    this.$router.push('/video/list')
                }
            })
        }
    }
}
</script>
<style lang="scss">
.page-container {
    form{
        margin: auto;
    }
}
[class*=UploadContainer]{
    width: 100%;
    display: inline-block;
    text-align: left;
}
.el-form-item {
    border-bottom: 1px solid #ddd;
    padding-bottom: 20px;
}
.tagSelector{
    width: 100%;
}
.submit{
    display: block;
}
</style>
