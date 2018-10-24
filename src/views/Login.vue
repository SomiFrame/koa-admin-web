<template>
    <center>
        <el-form @submit.native.prevent>
            <el-form-item label="email" prop="email">
                <el-input type="email" v-model="form.email"></el-input>
            </el-form-item>
            <el-form-item label="password" prop="password">
                <el-input type="password" v-model="form.password" @keyup.enter.native="login"></el-input>
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
import jsCookie from "js-cookie"
export default {
    data() {
        return {
            form:{
                email: '',
                password: ''
            }
        }
    },
    methods:{
        login() {
            console.log('submit')
            this.axios.post(`/login`,{...this.form}).then(res=>{
                console.log(res)
                const {status,message,data} = res.data
                if(status) {
                    this.$message.error(message)
                }else {
                    jsCookie.set('token',data.token)
                    this.$message.success(message)
                    this.$router.push('/')
                }
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
