<template>
  <div>
    <lottie-animation
      :animation-data="LottieJSON"
      :auto-play="true"
      :loop="true"
      :speed="1"
      ref="anim"
    />

    <div id="webbg" class="login-wrap" v-show="showLogin" ref="loginWrap">
      <!-- <webview id="wb" src="http://babg.zj.pcc/" /> -->
    </div>
    <el-card class="box-card-login">
      <h3 align="center">用户登录</h3>
      <el-form label-position="left" label-width="65px" :model="logininfo_">
        <el-form-item label="用户名">
          <el-input id="username" v-model="logininfo_.username" clearable placeholder="输入用户名">
            <template #prepend>
              <el-tooltip
                class="box-item"
                effect="dark"
                content="请前往设置更改所在单位代码"
                placement="bottom"
              >
                {{ STORE_Setting().org_code.toString() }}
              </el-tooltip>
              -
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input
            id="passwd"
            v-model="logininfo_.passwd"
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
        >
          登录
        </el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import qs from 'qs';
import { HTTP_checkuserinfo, HTTP_checkToken } from '../script/api/apiList';
import { inject, onMounted, reactive, Ref, ref, watch } from 'vue';
import { showLoading, hideLoading } from '../script/utils/loading';
import { STORE_Login } from '../store/modules/login';
import { Msg } from '../script/utils/message';
import { STORE_Setting } from '../store/modules/setting';
import { REQUEST_get_caselist } from '../script/request/caselist';
import LottieJSON from '../assets/lottie/Rocket.json';

const STORE_login_instance = STORE_Login();

const loginWrap = ref();
const anim = ref();
const drawer: Ref<boolean> = inject('drawer') as Ref<boolean>;
let showLogin = false;

const logininfo_ = reactive({
  username: STORE_login_instance.LoginInfo.username,
  passwd: STORE_login_instance.LoginInfo.password,
});

watch(
  () => drawer.value,
  (n, o) => {
    if (n) {
      anim.value.play();
    } else {
      anim.value.stop();
    }
  }
);

const login = () => {
  showLoading('正在登录......');
  //获取用户信息
  const username_ = (<HTMLInputElement>document.getElementById('username')).value;
  const password_ = (<HTMLInputElement>document.getElementById('passwd')).value;

  //匹配缓存用户名与输入用户是否一致以判断是否是第一次登陆
  const first_login = username_ != STORE_login_instance.LoginInfo.username ? true : false;

  //判断输入信息
  if (username_ != '' && password_ != '') {
    //格式化登录信息
    const data = {
      username: username_,
      password: password_,
      themeurl: 'http://babg.zj.pcc/',
      rememberU: 'on',
      rememberP: 'on',
    };

    //初始化preload脚本地址等信息
    const preload_url =
      'file://' + window.path.resolve('packages/renderer/src/script/preload/login.js');
    const login_info = {
      ...data,
      username: STORE_Setting().org_code + '-' + username_,
    };
    const logindata = qs.stringify(login_info);
    let _obj = document.createElement('webview');

    //确认登陆信息是否正确
    HTTP_checkuserinfo(logindata)
      .then(async (res: any) => {
        let login_end = false; //ipcRenderer发送信息计数
        let login_err = false;
        if (res.msg == null) {
          //登陆信息无误,保存用户名和密码到localStorage
          STORE_login_instance.Set_LoginInfo(data);

          let ft = false; //防止dom-ready在重定向后多次刷新
          _obj.src =
            'http://203.49.14.89/gzpt3-platform/static/login/default/login.html?themeurl=http://babg.zj.pcc/';
          _obj.setAttribute('preload', preload_url);
          loginWrap.value.appendChild(_obj);

          _obj.addEventListener('dom-ready', e => {
            if (!ft) {
              // _obj.openDevTools();
              _obj.send('login', logindata);
              ft = true;
            }
          });

          _obj.addEventListener('ipc-message', async e => {
            let reasult = e.channel;
            if (reasult == 'login success') {
              //登录成功后延迟获取Token等信息
              setTimeout(() => {
                _obj.send('gettoken');
              }, 2000);
            } else if (reasult.includes('result')) {
              //输出获取的Token等信息
              let result = reasult.replace('result:', '').split(',');

              //将获取的Token和头像地址写到localStorage
              STORE_login_instance.Set_Token(result[0]);
              STORE_login_instance.Set_UserID(result[1]);
              STORE_login_instance.Set_Avatar(result[2]);
            } else {
              login_err = true;
            }

            //执行两次或者报错后结束登录
            if (login_end || login_err) {
              _obj.removeEventListener('dom-ready', e => {});
              _obj.removeEventListener('ipc-message', e => {});

              loginWrap.value.removeChild(_obj);

              const token = STORE_login_instance.Token;
              if (token) {
                //获取用户代码等信息
                await HTTP_checkToken(token).then(async (res: any) => {
                  STORE_login_instance.Set_LoginResult(res);
                  await REQUEST_get_caselist(false);
                  hideLoading();
                });
              }

              //判断是否是第一次登陆
              let msg = '';
              if (first_login) {
                msg = '登录成功，即将刷新。';
                setTimeout(() => {
                  window.location.reload();
                }, 1000);
              } else {
                msg = '登录成功';
              }

              Msg(login_err ? '服务器错误，请稍后再试。' : msg, login_err ? 'error' : 'success');
              drawer.value = false;
              return;
            }
            login_end = true;
          });
        } else {
          //登录信息校验失败
          // Msg(res.msg, "error");
          hideLoading();
        }
      })
      .catch(err => {
        //服务器接口错误时处理
        Msg('服务器接口错误，请稍后再试。', 'error');
        drawer.value = false;
        hideLoading();
      });
    // .finally(() => {
    //   hideLoading();
    // });
  } else {
    const msg_ = username_ == '' ? '用户名' : '密码';
    Msg(msg_ + '不能为空', 'warning');
  }
};

// onMounted(() => {
//   anim.value.play();
// });
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
  display: flex;
}
</style>
