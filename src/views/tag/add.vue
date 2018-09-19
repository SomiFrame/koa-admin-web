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
            form:{}
        }
    },
    methods:{
        submit() {
            this.axios.post('/tags',{...this.form}).then(res=>{
                const {status,message} = res.data
                status||this.$router.push("/tag/list")
                status?this.$message.error(message):this.$message.success(message)
            })
        }
    }
}
</script>

<style lang="scss">
.page-container {
    form {
        margin: auto;
    }
}
</style>
