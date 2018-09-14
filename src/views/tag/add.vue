<template>
    <el-form :model="form">
        <el-form-item label="name:">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button @click="submit" type="primary">submit</el-button>
        </el-form-item>
    </el-form>
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
            console.log(this.form)
                this.axios.post('/tags',{...this.form}).then(res=>{
                    console.log(res.data)
                })
        }
    }
}
</script>
