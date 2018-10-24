<template>
  <div class="layout-contaier">
    <el-container>
        <el-header class="el-button--primary">
            <ThemePicker />
        </el-header>
        <el-container>
            <el-aside width="200px">
                <el-menu>
                    <el-submenu index="1">
                        <template slot="title">
                            <span>VideoManager</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="1-1">
                                <router-link to="/video/add">VideoAdd</router-link>
                            </el-menu-item>
                            <el-menu-item index="1-2">
                                <router-link to="/video/list">VideoList</router-link>
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="3">
                        <template slot="title">
                            <span>TagManager</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="3-1">
                                <router-link to="/tag/add">TagAdd</router-link>
                            </el-menu-item>
                            <el-menu-item index="3-2">
                                <router-link to="/tag/list">TagList</router-link>
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title">
                            <span>UserManager</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="2-1">
                                <router-link to="/user/list">UserList</router-link>
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <el-main>
                <router-view/>
            </el-main>
        </el-container>
    </el-container>
  </div>
</template>

<script>
import jsCookie from "js-cookie"
import ThemePicker from "@/components/ThemePicker.vue"
export default {
    data:()=>{
         return {
         }
     },
     created(){
        jsCookie.get('token')||this.$router.push('login')
     },
    components:{
        ThemePicker
    }
}
</script>
<style lang="scss">
.el-header {
    line-height: 60px;
    border-bottom: 1px #ddd solid;
}
</style>
