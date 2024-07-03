<script lang="ts" setup>
import {onMounted, ref} from 'vue';
import type {UserInfo} from '@/types';
import {ElMessage, ElMessageBox} from 'element-plus'
import {updateUser} from '@/api';
import {useUserStore} from '@/store/user';
import {storeToRefs} from 'pinia';

const userStore = useUserStore()
const {userInfo} = storeToRefs(userStore)
const {setUser} = userStore;

const open = (message) => {
  ElMessage.error(message)
}


const user = ref<UserInfo>({
  email: '',
  username: '',
  password: '',
  bio: '',
  image: ''
})

const handleUpdateUser = async () => {
  try {
    const res = await updateUser({user: user.value});
    setUser(res.data.user)
    await ElMessageBox.alert('修改成功', '修改用户', {
      confirmButtonText: 'OK'
    })
  } catch (error) {
    open(error.message)
  }
}

onMounted(() => {
  if (userInfo.value) {
    user.value = {
      email: userInfo.value.email,
      username: userInfo.value.username,
      password: userInfo.value.password,
      bio: userInfo.value.bio,
      image: userInfo.value.image
    }
  }
})


</script>
<template>
  <div class="mainContainer">
    <el-form ref="formRef" :model="user" label-width="86px" class="profileForm">
      <h3 class="title">个人信息</h3>
      <el-form-item label="用户名">
        <el-input placeholder="请输入用户名" v-model="user.username" prefix-icon="user"></el-input>
      </el-form-item>
      <el-form-item label="头像">
        <el-input placeholder="请更新头像链接" v-model="user.image" prefix-icon="message"></el-input>
      </el-form-item>
      <el-form-item label="个人简介">
        <el-input placeholder="请输入简介" v-model="user.bio" prefix-icon="user"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input placeholder="请输入邮箱" v-model="user.email" prefix-icon="chat-square"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input placeholder="请更新密码" v-model="user.password" prefix-icon="chat-square" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="w100p" @click="handleUpdateUser">修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<style lang="scss" scoped>
.profileForm {
  width: 60%;
  margin-right: auto;
  margin-left: 40px;
}
</style>
