<template>
  <!-- Top -->
  <div class="topbars">
    <!-- 导航栏 -->
    <div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">我的案件</el-breadcrumb-item>
        <el-breadcrumb-item>
          <a href="/" style="pointer-events: none">{{ router.hash.slice(1) }}</a>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 右上角功能区 -->
    <div class="topbars-right">
      <el-dropdown
        size="small"
        @click="Open_Web_Casezone(router_caseid)"
        split-button
        placement="bottom-end"
      >
        <el-icon class="el-icon--left"><Cloudy /></el-icon>
        打开案件空间
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item
              v-for="item in previous_caseinfo"
              @click="Open_Web_Casezone(item.yabs)"
            >
              {{ item.ah }}
            </el-dropdown-item>
            <!-- 判断有无前序案件 -->
            <el-dropdown-item v-if="previous_caseinfo?.length > 0 ? false : true" disabled>
              无前序案件
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <el-button :icon="Refresh" size="small" @click="Refresh_Dsrinfo" style="margin-right: 5px">
        刷新
      </el-button>
      <el-tooltip
        content="如需修改当前页信息，请进入案件空间修改后刷新本页！"
        placement="bottom"
        effect="light"
      >
        <el-icon :size="15" color="#d1d2d3" style="margin-right: 5px"><InfoFilled /></el-icon>
      </el-tooltip>
    </div>
  </div>
  <!-- 主功能区 -->
  <div style="display: flex; flex-direction: column; flex: 1">
    <el-tabs class="tabs" type="border-card" @tab-click="(val:any) => handle_tabs_change(val)">
      <el-tab-pane v-if="isReload">
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><postcard /></el-icon>
            <span>当事人信息</span>
          </span>
        </template>

        <el-skeleton :loading="isLoading" animated :rows="5">
          <template #template>
            <div style="padding: 15px">
              <div v-for="i in 2" :key="i" :class="[i === 1 ? 'box-card0' : 'box-card1']">
                <el-card>
                  <el-skeleton-item
                    variant="h1"
                    style="width: 30%; padding: 7px; line-height: 20px"
                  />
                  <el-skeleton-item
                    v-for="o in 5"
                    :key="o"
                    variant="h3"
                    style="margin-top: 20px; line-height: 20px"
                  />
                </el-card>
              </div>
            </div>
          </template>
          <template #default>
            <el-scrollbar v-show="!isLoading">
              <div style="padding: 15px">
                <casedetail />
              </div>
            </el-scrollbar>
          </template>
        </el-skeleton>
      </el-tab-pane>
      <el-tab-pane class="Horizontal_alignment">
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><EditPen /></el-icon>
            <span>编辑文书</span>
          </span>
        </template>
        <!-- 编辑器 -->
        <div class="tab_view">
          <Editor ref="Editors" />
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { ref, inject, nextTick, Ref, provide } from 'vue';
import { Cloudy, InfoFilled, Refresh, Postcard, EditPen } from '@element-plus/icons-vue';
import { HTTP_checkToken } from '../../script/api/apiList';
import { getItem } from '../../script/utils/storage';
import { REQUEST_get_casedetailinfo } from '../../script/request/casedetailinfo';
import { useRoute } from 'vue-router';
import { STORE_Login } from '../../store/modules/login';
import { STORE_Editor } from '../../store/modules/editor';
import { STORE_Request } from '../../store/modules/request';
import { Msg } from '../../script/utils/message';

import Casedetail from './Casedetail.vue';
import Editor from './Caseeditor.vue';

const STORE_login_instance = STORE_Login();
const STORE_editor_instance = STORE_Editor();
const STORE_request_instance = STORE_Request();

/* 路由传参 */
const router = useRoute();
const router_caseid: string = useRoute().params.caseid as string;
const router_prev_fy: string = useRoute().params.prev_fy as string;

/* 控件开关 */
const drawer: Ref<boolean> = inject('drawer')!; //登录抽屉界面
const isReload = ref(true); //刷新组件用
const isLoading = ref(true); //骨架用
const Editors = ref();

/* 获取数据 */
const previous_caseinfo = STORE_request_instance.previous_caseinfo;
const case_id = ref(router_caseid);

//切换到编辑文书页面时自动启用首行缩进并读取暂存文本
const first_into = ref(true);
const handle_tabs_change = (val: { index: number }) => {
  if (first_into.value) {
    first_into.value = false;
    const txt = getItem('SaveText');
    if (txt?.ah === router_caseid) {
      Editors.value.addText(txt.text);
      //在插入内容后延迟重置内容检测开关
      setTimeout(() => {
        STORE_editor_instance.Reset_editor_isChanged();
      }, 100);
    }
  }

  if (val.index == 1) {
    setTimeout(() => {
      Editors.value.focus();
    }, 100);
  }
};

//打开网页案件空间
const Open_Web_Casezone = (caseid: any) => {
  const token = STORE_login_instance.Token;
  HTTP_checkToken(token).then((res: any) => {
    if (res.code === 0) {
      let link = `http://babg.zj.pcc/ajkjPlus?tokenid=${token}&ahdm=${caseid}&lx=sp&flag=2`;
      window.shell.openExternal(link);
    } else {
      Msg('会话超时,请重新登录~', 'error');
      drawer.value = true;
    }
  });
};

//判断是否成功请求到案件详细信息
const request_bool = ref(false);

const Reload_DsrInfo = () => {
  //延迟刷新组件
  setTimeout(() => {
    isReload.value = false;
    nextTick(() => {
      isReload.value = true;
    });
    if (request_bool.value) isLoading.value = false;
  }, 1000);
};

const Refresh_Dsrinfo = async () => {
  //重新请求数据并刷新组件
  // get_dsrdetialinfo(route_caseid, true, true);
  request_bool.value = await REQUEST_get_casedetailinfo(router_caseid, true, true, false);
  Reload_DsrInfo();
  // if (request_bool) {
  isLoading.value = false;
  // }
};

/**
 * 进入案件空间时
 * 对比传参案号代码和缓存数据的案号代码一致
 * 以判断读取缓存或请求数据
 */

const Open_Casezone = async () => {
  const cache_caseid = STORE_request_instance.this_caseid;
  //写入传入原审法院名称
  STORE_editor_instance.Set_prev_fy(router_prev_fy);
  STORE_editor_instance.Set_case_id(router_caseid);
  if (cache_caseid === router_caseid) {
    isLoading.value = false;
  } else {
    request_bool.value = await REQUEST_get_casedetailinfo(router_caseid, false, false, true);
  }
  //重置内容检测开关
  STORE_editor_instance.Reset_editor_isChanged();
  Reload_DsrInfo();
};

//打开页面时执行
Open_Casezone();
</script>

<style lang="scss">
.tabs {
  position: relative;
  margin-top: 10px;
  height: calc(100vh - 120px);
  display: flex;
  flex-direction: column;
  width: 100%;
}

.tabs .custom-tabs-label .el-icon {
  vertical-align: middle;
}
.tabs .custom-tabs-label span {
  vertical-align: middle;
  margin-left: 4px;
}

.Horizontal_alignment {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.el-tabs__header {
  margin-left: -1px;
  user-select: none !important;
}

.el-tabs__content {
  display: flex;
  flex: 1;
  width: 100%;
  padding: 0px !important;
}

.el-tab-pane {
  flex: 1;
}

.tab_view {
  padding: 15px;
  display: flex;
  width: 100%;
}

#editorBase {
  display: block !important;
  width: calc(100% - 200px) !important;
  height: 100% !important;
}
</style>
