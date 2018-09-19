<template>
    <div class="page-container">
        <el-table :data="datas">
            <el-table-column type="selection" width="55" align="center"></el-table-column>
            <el-table-column label="tag name" property="name" align="center"></el-table-column>
            <el-table-column label="created at" property="createdOn" align="center"></el-table-column>
        </el-table>
        <el-pagination
            @current-change="pageChange"
            :page-size="limit"
            :pager-count="11"
            layout="prev, pager, next"
            :total="total">
        </el-pagination>
    </div>
</template>
<script>
export default {
    data(){
        return{
            limit: 10,
            page: 1,
            total: 0,
            datas: []
        }
    },
    created(){
        this.getData()
    },
    methods:{
        converDate(val) {
            val.createdOn = new Date(val.createdOn).toLocaleString("zh-Hans-CN")
            return val
        },
        pageChange(val){
            this.page = val
            this.getData()
        },
        getData() {
            const {limit,page} = this
            this.axios.get('/tags',{params:{limit,page}}).then(res=>{
                const {status,data} = res.data
                this.datas = data.data.map(this.converDate)
                this.total = data.total
            })
        }
    }
}
</script>
<style>
</style>
