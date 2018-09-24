<template>
    <div class="page-container">
        <el-table :data="datas">
            <el-table-column type="selection" width="55" align="center" ></el-table-column>
            <el-table-column label="videoTitle" align="center" prop="title"></el-table-column>
            <el-table-column label="createdOn" align="center" prop="createdOn"></el-table-column>
            <el-table-column fixed="right" label="Operations" align="center">
                <template slot-scope="scope">
                    <el-button @click="edit(scope.row)" size="small" type="primary">edit</el-button>

                    <el-button @click="remove(scope.row)" size="small" type="danger">delete</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
export default{
    data() {
        return{
            limit:10,
            page:1,
            datas:[]
        }
    },
    created(){
        this.getVideos()
    },
    methods:{
        edit(row){
            this.$router.push(`/video/edit/${row._id}`)
        },
        remove(row) {
            console.log(row)
            this.axios.delete(`/videos/${row._id}`).then(res=>{
                const {status,message} = res.data
                status||this.getVideos()
                status?this.$message.error(message):this.$message.success(message)
            })
        },
        getVideos(){
            const {limit,page} = this
            this.axios.get('/videos',{params:{limit,page}}).then(res=>{
                const { data } = res.data
                this.datas = data.data.map(val=>{
                    val.createdOn = new Date(val.createdOn).toLocaleString("zh-Hans-CN")
                    return val
                })
            })
        }
    }
}
</script>
