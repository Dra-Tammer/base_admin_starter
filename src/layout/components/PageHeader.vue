<script lang="ts" setup="">
import {CaretBottom} from "@element-plus/icons-vue";
import {useRouter} from "vue-router";
import {useUserStore} from "@/store/user";
import {storeToRefs} from "pinia";

const userStore = useUserStore()

const {userInfo, isLogin} = storeToRefs(userStore)
const {removeUser} = userStore
const router = useRouter()
const commands = ({
  toPersonal: () => {
    alert('topersonal')
  },
  toLogout: () => {
    alert('tologout')
    removeUser()
    router.push('/register')
  }
})

function handleCommand(command) {
  commands[command] && commands[command]()
}
</script>
<template>
  <div class="headerContainer">
    <div>
      <h1>
        <router-link to="/">
          BASE_ADMIN_STARTER
        </router-link>
      </h1>
    </div>
    <div>
      <template v-if="isLogin">
        <el-dropdown trigger="click" @command="handleCommand">
          <div class="dropDownOperator">
            {{ userInfo!.username }}
            <el-icon>
              <caret-bottom/>
            </el-icon>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="toPersonal">
                个人信息
              </el-dropdown-item>
              <el-dropdown-item command="toLogout">
                退出登录
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.headerContainer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  height: 100%;


  a {
    color: inherit;
    text-decoration: none;
  }

  h1 {
    margin: 0;
    font-size: 20px;
  }
}

.dropDownOperator {
  color: #fff;
  cursor: pointer;
}
</style>
