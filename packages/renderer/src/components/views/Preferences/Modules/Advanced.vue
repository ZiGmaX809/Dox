<template>
  <b class="text-2xl mt-10">高级</b>
  <el-divider />
  <div class="space-y-3">
    <div>
      <div class="flex justify-between h-8">
        <p class="font-bold">离线功能</p>
        <el-switch v-model="switch_offline_bool" />
      </div>

      <div class="flex justify-between">
        <p class="text-xs text-neutral-400 mr-2">
          <b>
            &#10059;&nbsp;注意：此功能仅缓存「我的案件」中尚在审理的案件信息，因涉及当事人信息，请遵守相关规章制度！
          </b>
          <br />
          开启离线功能后，可在脱机状态下查看案件、编辑、生成文书。
          <br />
          考虑到服务器负载，拉取数据间隔为60秒，请手动点击离线数据按钮进行数据离线。
          <br />
          已拉取案件数量：{{ offline_files_num.data }}；上次拉取时间：{{
            STORE_setting_instance.offline_time
          }}；
        </p>
        <div class="flex flex-col">
          <el-button
            size="small"
            class="!ml-0"
            @click="download_offline_files()"
            :disabled="!switch_offline_bool"
          >
            离线数据
          </el-button>
          <el-button
            size="small"
            class="!ml-0 mt-2"
            type="danger"
            @click=""
            :disabled="!switch_offline_bool"
          >
            清理过期数据
          </el-button>
        </div>
      </div>
    </div>

    <div>
      <div class="flex justify-between h-8">
        <p class="font-bold">本地资源文件夹</p>
        <el-button size="small" @click="open_cachefile()">打开</el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElNotification } from 'element-plus';

import { STORE_System } from '/store/modules/system';
import { STORE_Setting } from '/store/modules/setting';
import { STORE_Request } from '/store/modules/request';

import { REQUEST_get_ALL_casedetailinfo } from '/scripts/request/casedetailinfo';

import { delay } from '/scripts/utils/delay';
import { Msg } from '/scripts/utils/message';
import Notice from '/components/utils/Notice.vue';

const STORE_setting_instance = STORE_Setting();
const STORE_system_instance = STORE_System();
const STORE_request_instance = STORE_Request();

const open_cachefile = async () => {
  const cacheFile_path = STORE_system_instance.CacheFile_Path;

  if (cacheFile_path != '') {
    window.shell.openPath(cacheFile_path);
  }
};

//开关离线功能
const switch_offline_bool = computed({
  get() {
    return STORE_setting_instance.offline_bool;
  },
  set(newVal: boolean) {
    STORE_setting_instance.Switch_offline_bool(newVal);
  },
});

//计算并返回离线文件数量
const offline_files_num = reactive({
  data: STORE_setting_instance.offline_bool ? STORE_request_instance.caselist_num.join('/') : '0',
});

//缓存离线数据
const download_offline_files = async () => {
  const time = new Date();
  const interval_time = time.getTime() - STORE_setting_instance.offline_timestamp;

  if (interval_time < 60 * 1000) {
    Msg(`请勿重复拉取离线数据，请在${Math.floor(60 - interval_time / 1000)}秒后再试。`, 'warning');
  } else {
    const notice_instance = ElNotification({
      title: '正在缓存离线文件……',
      dangerouslyUseHTMLString: true,
      message: h(Notice, {
        style: 'user-select: none',
      }),
      offset: 50,
      duration: 0,
      showClose: false,
    });

    const arr_caselist = STORE_request_instance.CaseIDList;
    let downloaded_num = 0;

    let index = 0;
    const offline_id = setInterval(async () => {
      const result = await REQUEST_get_ALL_casedetailinfo(arr_caselist[index], false, false);
      if (result) {
        downloaded_num++;
      }
      window.postMessage([downloaded_num, index + 1]);
      if (index + 1 == arr_caselist.length) {
        clearInterval(offline_id);
        const arr_final_offline_num = [downloaded_num, arr_caselist.length];
        offline_files_num.data = arr_final_offline_num.join('/');

        await delay(2000);
        notice_instance.close();
      }
      index++;
    }, 200);
    STORE_setting_instance.Set_offline_time();
  }
};
</script>
