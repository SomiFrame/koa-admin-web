
<template>
    <center>
        <el-form>
            <el-form-item label="email" prop="email">
                <el-input type="email" v-model="form.email"></el-input>
            </el-form-item>
            <el-form-item label="password" prop="password">
                <el-input type="password" v-model="form.password"></el-input>
            </el-form-item>
            <el-form-item label="confirmPassword" prop="confirmPassword">
                <el-input type="password" v-model="form.confirmPassword"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="login" type="primary">
                    login
                </el-button>
            </el-form-item>
        </el-form>
    </center>
</template>
<script>
export default {
    data() {
        return {
            form:{
                email: '',
                password: '',
                confirmPassword: ''
            }
        }
    },
    methods:{
        login() {
            this.axios.post(`/register`,{...this.form}).then(res=>{
                console.log(res)
            })
        }
    }
}
</script>
<style>
form{
    max-width: 600px;
}
</style>
