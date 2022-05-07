<template>
  <div
    class="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-6 sm:py-12 select-none"
    style="-webkit-user-drag: none"
  >
    <img
      :src="basms"
      class="absolute top-1/2 left-1/2 max-w-none -translate-x-1/2 -translate-y-1/2 blur"
      width="1308"
    />
    <div
      class="absolute inset-0 bg-login-grid bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"
    ></div>
    <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"></form>
    <div
      id="LoginWindow"
      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white shadow-xl ring-1 ring-gray-900/5 w-96 h-[410px] rounded-md"
    >
      <div class="flex flex-col mx-auto max-w-md w-full text-center space-y-2 py-8">
        <b
          class="text-3xl bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-blue-500"
        >
          Login To
        </b>
        <b
          class="text-xl bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-blue-500"
        >
          The Case Office Platform
        </b>
      </div>
      <div class="space-y-2">
        <p class="flex flex-1 w-4/5 m-auto text-sm">用户名</p>
        <el-input v-model="account" clearable class="!w-4/5 mx-10 rounded-md" />
        <p class="flex flex-1 w-4/5 m-auto text-sm">密码</p>
        <el-input v-model="password" show-password class="!w-4/5 mx-10 rounded-md" />
        <div class="w-full flex">
          <el-checkbox v-model="remember_me" class="flex flex-1 !w-4/5 mx-10 text-gray-700">
            记住用户名和密码
          </el-checkbox>
        </div>
        <div class="w-full flex flex-col space-y-2">
          <el-button type="primary" class="!w-4/5 mx-10 rounded-md justify-center">登陆</el-button>
          <el-button @click="Close_Login_View" class="!w-4/5 !mx-10 rounded-md justify-center">
            取消
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import basms from '@/assets/imgs/beams.jpeg';
import qs from 'qs';
import { Ref } from 'vue';

import { STORE_Login } from '/store/modules/login';
import { STORE_Setting } from '/store/modules/setting';

import { Msg } from '/scripts/utils/message';
import { REQUEST_get_caselist } from '/scripts/request/caselist';
import { showLoading, hideLoading } from '/scripts/utils/loading';
import { HTTP_checkuserinfo, HTTP_checkToken } from '/scripts/api/apiList';

const account = ref<string>('');
const password = ref<string>('');
const remember_me = ref(false);

const emit = defineEmits(['CloseLoginView']);
const Close_Login_View = () => {
  emit('CloseLoginView');
};

const STORE_login_instance = STORE_Login();
const loginWrap = ref();
const drawer: Ref<boolean> = inject('drawer') as Ref<boolean>;


const logininfo_ = reactive({
  username: STORE_login_instance.LoginInfo.username,
  passwd: STORE_login_instance.LoginInfo.password,
});

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
</script>
