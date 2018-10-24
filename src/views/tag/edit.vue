<template>
    <div class="page-container">
        <el-form :model="form">
            <el-form-item label="name:">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="submit" type="primary">submit</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
    data() {
        return {
            form:{
                name: null
            }
        }
    },
    created(){
        const {id} = this.$route.params
        this.axios.get(`/tags/${id}`).then(res=>{
            const {data} = res.data
            console.log(data)
            this.form.name = data.name
        })
    },
    methods:{
        submit() {
            const {id} = this.$route.params
            this.axios.put(`/tags/${id}`,{...this.form}).then(res=>{
                const {status,message} = res.data
                status||this.$router.push("/tag/list")
                status?this.$message.error(message):this.$message.success(message)
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.page-container {
    form {
        margin: auto;
    }
}
</style>
