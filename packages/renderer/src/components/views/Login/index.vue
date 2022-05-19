<template>
  <div
    class="relative flex min-h-screen flex-col justify-center overflow-hidden bg-base-100 py-6 sm:py-12 select-none"
    style="-webkit-user-drag: none"
  >
    <img
      :src="basms"
      class="absolute top-1/2 left-1/2 max-w-none -translate-x-1/2 -translate-y-1/2 blur w-screen"
    />
    <div
      class="absolute inset-0 bg-login-grid bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"
    ></div>
    <div
      id="LoginWindow"
      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-base-100 shadow-xl ring-1 ring-gray-900/5 w-96 h-[410px] rounded-md"
    >
      <div class="title w-full flex flex-col justify-center mx-auto text-center space-y-2 py-8">
        <b class="text-4xl bg-clip-text text-transparent font-extrabold">Login To</b>
        <b class="text-2xl bg-clip-text text-transparent font-bold">The Case Office Platform</b>
      </div>
      <div class="space-y-2">
        <p class="flex flex-1 w-4/5 m-auto text-sm text-base-content">用户名</p>

        <div
          id="account"
          class="group flex input input-bordered input-sm w-4/5 m-auto px-2 border-base-content/20 focus-within:outline-none focus-within:border-primary-focus"
        >
          <input
            ref="account_input"
            type="text"
            class="flex flex-1 px-2 text-sm bg-base-100 focus:outline-none"
            v-model="logininfo_.account"
            @input="show_clear_icon = logininfo_.account.length > 0 ? true : false"
          />

          <button
            class="block rounded-md px-1 text-base-content/30"
            @click="clear_all_text"
            tabindex="-1"
            v-show="show_clear_icon"
          >
            <svg-icon name="close" class="h-4 w-4" />
          </button>
        </div>

        <p class="flex flex-1 w-4/5 m-auto text-sm">密码</p>

        <div
          id="psssword"
          class="flex input input-bordered input-sm w-4/5 m-auto px-2 border-base-content/20 focus-within:outline-none focus-within:border-primary-focus"
        >
          <input
            ref="password_input"
            type="password"
            class="flex flex-1 px-2 text-sm bg-base-100 focus:outline-none"
            v-model="logininfo_.password"
          />

          <button
            class="block rounded-md px-1 text-base-content/30"
            @click="switch_show_password"
            tabindex="-1"
          >
            <div v-show="show_password">
              <svg-icon name="showpassword" class="h-4 w-4" />
            </div>

            <div v-show="!show_password">
              <svg-icon name="hidepassword" class="h-4 w-4" />
            </div>
          </button>
        </div>

        <div class="flex w-4/5 m-auto items-center">
          <input
            type="checkbox"
            v-model="remember_me"
            class="checkbox checkbox-xs checkbox-primary border-base-content/20"
          />
          <label class="ml-2 text-sm">记住用户名和密码</label>
        </div>
        <div class="w-full flex flex-col space-y-2">
          <button
            class="w-4/5 m-auto btn btn-sm btn-primary hover:bg-primary-focus/75 active:bg-primary-focus"
            @click="test_login"
          >
            登录
          </button>
          <button
            class="w-4/5 m-auto btn btn-sm btn-outline border-base-200 hover:border-primary/30 hover:bg-primary/10 hover:text-primary active:border-primary"
            @click="Close_Login_View"
          >
            取消
          </button>
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

// import { Msg } from '/scripts/utils/message';
// import { REQUEST_get_caselist } from '/scripts/request/caselist';
// import { showLoading, hideLoading } from '/scripts/utils/loading';
// import { HTTP_checkuserinfo, HTTP_checkToken } from '/scripts/api/apiList';

const account = ref<string>('');
const password = ref<string>('');
const remember_me = ref(false);

const password_input = ref();
const account_input = ref();

const show_clear_icon = ref(false);
const show_password = ref(false);

const clear_all_text = () => {
  logininfo_.account = '';
  show_clear_icon.value = false;
  account_input.value.focus();
};

const switch_show_password = () => {
  show_password.value = !show_password.value;
  password_input.value.type = password_input.value.type == 'password' ? 'text' : 'password';
};

const emit = defineEmits(['CloseLoginView']);
const Close_Login_View = () => {
  emit('CloseLoginView');
};

const STORE_login_instance = STORE_Login();
const loginWrap = ref();

const logininfo_ = reactive({
  account: STORE_login_instance.LoginInfo.username,
  password: STORE_login_instance.LoginInfo.password,
});

const test_login = () => {
  console.log(logininfo_.account);
};

onMounted(() => {
  show_clear_icon.value = logininfo_.account.length > 0 ? true : false;
});

// const login = () => {
//   // showLoading('正在登录......');
//   //获取用户信息
//   const username_ = (<HTMLInputElement>document.getElementById('username')).value;
//   const password_ = (<HTMLInputElement>document.getElementById('passwd')).value;

//   //匹配缓存用户名与输入用户是否一致以判断是否是第一次登陆
//   const first_login = username_ != STORE_login_instance.LoginInfo.username ? true : false;

//   //判断输入信息
//   if (username_ != '' && password_ != '') {
//     //格式化登录信息
//     const data = {
//       username: username_,
//       password: password_,
//       themeurl: 'http://babg.zj.pcc/',
//       rememberU: 'on',
//       rememberP: 'on',
//     };

//     //初始化preload脚本地址等信息
//     const preload_url =
//       'file://' + window.path.resolve('packages/renderer/src/script/preload/login.js');
//     const login_info = {
//       ...data,
//       username: STORE_Setting().org_code + '-' + username_,
//     };
//     const logindata = qs.stringify(login_info);
//     let _obj = document.createElement('webview');

//     //确认登陆信息是否正确
//     HTTP_checkuserinfo(logindata)
//       .then(async (res: any) => {
//         let login_end = false; //ipcRenderer发送信息计数
//         let login_err = false;
//         if (res.msg == null) {
//           //登陆信息无误,保存用户名和密码到localStorage
//           STORE_login_instance.Set_LoginInfo(data);

//           let ft = false; //防止dom-ready在重定向后多次刷新
//           _obj.src =
//             'http://203.49.14.89/gzpt3-platform/static/login/default/login.html?themeurl=http://babg.zj.pcc/';
//           _obj.setAttribute('preload', preload_url);
//           loginWrap.value.appendChild(_obj);

//           _obj.addEventListener('dom-ready', e => {
//             if (!ft) {
//               // _obj.openDevTools();
//               _obj.send('login', logindata);
//               ft = true;
//             }
//           });

//           _obj.addEventListener('ipc-message', async e => {
//             let reasult = e.channel;
//             if (reasult == 'login success') {
//               //登录成功后延迟获取Token等信息
//               setTimeout(() => {
//                 _obj.send('gettoken');
//               }, 2000);
//             } else if (reasult.includes('result')) {
//               //输出获取的Token等信息
//               let result = reasult.replace('result:', '').split(',');

//               //将获取的Token和头像地址写到localStorage
//               STORE_login_instance.Set_Token(result[0]);
//               STORE_login_instance.Set_UserID(result[1]);
//               STORE_login_instance.Set_Avatar(result[2]);
//             } else {
//               login_err = true;
//             }

//             //执行两次或者报错后结束登录
//             if (login_end || login_err) {
//               _obj.removeEventListener('dom-ready', e => {});
//               _obj.removeEventListener('ipc-message', e => {});

//               loginWrap.value.removeChild(_obj);

//               const token = STORE_login_instance.Token;
//               if (token) {
//                 //获取用户代码等信息
//                 await HTTP_checkToken(token).then(async (res: any) => {
//                   STORE_login_instance.Set_LoginResult(res);
//                   await REQUEST_get_caselist(false);
//                   // hideLoading();
//                 });
//               }

//               //判断是否是第一次登陆
//               let msg = '';
//               if (first_login) {
//                 msg = '登录成功，即将刷新。';
//                 setTimeout(() => {
//                   window.location.reload();
//                 }, 1000);
//               } else {
//                 msg = '登录成功';
//               }

//               // Msg(login_err ? '服务器错误，请稍后再试。' : msg, login_err ? 'error' : 'success');
//               return;
//             }
//             login_end = true;
//           });
//         } else {
//           //登录信息校验失败
//           // Msg(res.msg, "error");
//           // hideLoading();
//         }
//       })
//       .catch(err => {
//         //服务器接口错误时处理
//         // Msg('服务器接口错误，请稍后再试。', 'error');
//         // hideLoading();
//       });
//     // .finally(() => {
//     //   hideLoading();
//     // });
//   } else {
//     const msg_ = username_ == '' ? '用户名' : '密码';
//     // Msg(msg_ + '不能为空', 'warning');
//   }
// };
</script>

<style>
.form-tick:checked {
  background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
  border-color: transparent;
  background-size: 100% 100%;
  background-position: 50%;
  background-repeat: no-repeat;
}

.title {
  background-image: -webkit-linear-gradient(
    left,
    #fb7185,
    #facc15 10%,
    #75d701 20%,
    #38bdf8 30%,
    #c084fc 40%,
    #fb7185 50%,
    #facc15 60%,
    #75d701 70%,
    #38bdf8 80%,
    #c084fc 90%,
    #fb7185
  );
  -webkit-background-clip: text;
  color: transparent;
  background-size: 500% 100%;
  animation: flowlight 5s linear infinite;
}
@keyframes flowlight {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: -62.5% 0;
  }
}
</style>
