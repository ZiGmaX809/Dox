<template>
  <div class="bg">
    <img
      class="bg-img"
      :src="getImageUrl('loginbg.svg')"
      style="-webkit-user-select: none; user-select: none"
    />
    <div id="webbg" class="login-wrap" v-show="showLogin" ref="loginWrap">
      <!-- <webview id="wb" src="http://babg.zj.pcc/" /> -->
    </div>
    <el-card
      class="box-card"
      style="width: 100%; position: relative; top: 50px"
    >
      <h3 align="center">用户登录</h3>
      <el-form label-position="left" label-width="65px" :model="formLabelAlign">
        <el-form-item label="用户名">
          <el-input
            id="username"
            v-model="formLabelAlign.username"
            clearable
            placeholder="输入用户名"
            ><template #prepend>1301-</template></el-input
          >
        </el-form-item>
        <el-form-item label="密码">
          <el-input
            id="passwd"
            v-model="formLabelAlign.passwd"
            placeholder="输入密码"
            show-password
          ></el-input>
        </el-form-item>
        <el-button
          id="login_btn"
          style="display: block; margin: 0 auto"
          type="primary"
          plain
          @click="login()"
          >登录</el-button
        >
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "@vue/reactivity";
import qs from "qs";
import { HTTP_checkuserinfo, HTTP_checkToken } from "../script/api/apiList";
import { setItem } from "../script/utils/storage";
import { inject, Ref } from "vue";
import { ElMessage } from "element-plus";
import { showLoading, hideLoading } from "../script/utils/loading";
import { STORE_login } from "../store/modules/login";

const STORE_login_instance = STORE_login();

const loginWrap = ref();
const drawer: Ref<boolean> = inject("drawer") as Ref<boolean>;
let showLogin = false;

const formLabelAlign = ref({
  username: STORE_login_instance.userInfo.username,
  passwd: STORE_login_instance.userInfo.password,
});

const getImageUrl = (name: any) => {
  return new URL(`../assets/${name}`, import.meta.url).href;
};

const login = () => {
  showLoading("正在登录......");
  //获取用户信息
  const username_ = (<HTMLInputElement>document.getElementById("username"))
    .value;
  const password_ = (<HTMLInputElement>document.getElementById("passwd")).value;
  //判断输入信息
  if (username_ != "" && password_ != "") {
    //格式化登录信息
    const data = {
      username: "1301-" + username_,
      password: password_,
      themeurl: "http://babg.zj.pcc/",
      rememberU: "on",
      rememberP: "on",
    };

    //初始化preload脚本地址等信息
    const preload_url =
      "file://" +
      window.path.resolve("packages/renderer/src/script/preload/login.js");
    const logindata = qs.stringify(data);
    let _obj = document.createElement("webview");

    //确认登陆信息是否正确
    HTTP_checkuserinfo(logindata, true, false)
      .then((res: any) => {
        let login_end = false; //ipcRenderer发送信息计数
        let login_err = false;
        if (res.msg == null) {
          //登陆信息无误,保存用户名和密码到localStorage
          // store.commit("loginModule/SetUser", data);
          STORE_login_instance.SetUser(data)

          let ft = false; //防止dom-ready在重定向后多次刷新
          _obj.src =
            "http://203.49.14.89/gzpt3-platform/static/login/default/login.html?themeurl=http://babg.zj.pcc/";
          _obj.setAttribute("preload", preload_url);
          loginWrap.value.appendChild(_obj);

          _obj.addEventListener("dom-ready", (e) => {
            if (!ft) {
              // _obj.openDevTools();
              _obj.send("login", logindata);
              ft = true;
            }
          });

          _obj.addEventListener("ipc-message", (e) => {
            let reasult = e.channel;
            if (reasult == "login success") {
              //登录成功后延迟获取Token等信息
              setTimeout(() => {
                _obj.send("gettoken");
              }, 2000);
            } else if (reasult.includes("result")) {
              //输出获取的Token等信息
              //console.log(reasult);
              let result = (reasult.replace("result:", "")).split(",");
              //将获取的Token和头像地址写到localStorage
              STORE_login_instance.SetToken(result[0]);
              STORE_login_instance.SetUserID(result[1]);
              STORE_login_instance.SetAvatar(result[2]);
            } else {
              login_err = true;
            }

            //执行两次或者报错后结束登录
            if (login_end || login_err) {
              _obj.removeEventListener("dom-ready", (e) => {});
              _obj.removeEventListener("ipc-message", (e) => {});

              loginWrap.value.removeChild(_obj);

              const token = STORE_login_instance.token;
              if (token) {
                //获取用户代码等信息
                HTTP_checkToken(token).then((res: any) => {
                  setItem("loginInfo", res);
                });
              }

              ElMessage({
                message: login_err ? "服务器错误，请稍后再试。" : "登录成功!",
                grouping: true,
                type: login_err ? "error" : "success",
              });

              drawer.value = false;
              return;
            }
            login_end = true;
          });
        } else {
          //登录信息校验失败
          ElMessage({
            message: res.msg,
            grouping: true,
            type: "error",
          });
        }
      })
      .catch((err) => {
        //服务器接口错误时处理
        ElMessage({
          message: "服务器接口错误，请稍后再试。",
          grouping: true,
          type: "error",
        });
        drawer.value = false;
      })
      .finally(() => {
        hideLoading();
      });
  } else {
    const msg_ = username_ == "" ? "用户名" : "密码";
    ElMessage({
      message: msg_ + "不能为空",
      grouping: true,
      type: "warning",
    });
  }
};
</script>

<style>
.el-drawer {
  background-color: #f4f6f9;
  padding: 0px;
  margin: 0px;
  height: 100%;
}

.bg-img {
  width: 100%;
  height: 100%;
  user-select: none;
  display: block;
  margin: 0 auto;
}
</style>
