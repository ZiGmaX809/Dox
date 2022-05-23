<template>
  <b class="text-2xl mt-10">快捷输入</b>
  <Divider />
  <div class="text-base-content">
    <PreferencesItem>
      <p class="font-bold">已引入的法律法规文件</p>
      <button class="btn btn-xs" @click="Refresh_lawfiles">选择文件夹</button>
    </PreferencesItem>

    <PreferencesItem>
      <div class="flex items-center">
        <p class="font-bold">引入新的法律法规文件</p>
        <Explain width="600px" offset="40">
          <b>
            &#10059;&nbsp;注意：快捷输入工具仅为编辑文书的辅助性功能。对于导入的文件，工具将尽可能进行准确匹配、转换，但是无法百分百保证任何法律法规文件导入后法条完整和准确性。
            <br />
            &#10059;&nbsp;请不要过度依赖该功能！裁判文书校对依旧是案件审理的必要环节与步骤！
          </b>
          <br />
          <br />
          下载法律法规:
          <a
            class="text-lime-500 underline font-bold cursor-pointer hover:text-lime-500/75 after:content-['_↗']"
            @click="Copy_Url(law_url)"
          >
            {{ law_url }}
          </a>
          (北大法宝中国法律法规数据库，需互联网下载后导入)
          <br />
          <i>国务院下属国家法律法规数据库因更新效率问题以及无法下载TXT文件格式而不被支持。</i>
          <br />
          <br />
          进入网页选择法律法规文件后，点击右上角下载按钮，选择「纯文本」去掉勾选「保留字段信息」以及「保留正文中的法宝联想」，下载后不要修改文件名称，请保持原有名称以便提取该文书完整名称。
          <br />
          目前支持
          <b>「法律、法规、司法解释」</b>
          的导入，其他指导性文件、意见暂不支持。
        </Explain>
      </div>
      <Dialog
        for="ImportFileDialogVisible"
        class="btn btn-xs ml-3 modal-button"
        slot_class="modal-box w-[668px] max-w-5xl"
        label="选择文件"
      >
        <!-- <ImportFile /> -->
      </Dialog>
    </PreferencesItem>

    <PreferencesItem>
      <div class="flex items-center">
        <p class="font-bold">行政区划地址信息</p>
        <Explain>
          <b>更新时间：{{ pca_Update_Time() }}</b>
          <br />
          地域范围为国家统计局开展统计调查的全国31个省、自治区、直辖市，
          <br />
          未包括我国台湾省、香港特别行政区、澳门特别行政区。
          <br />
          项目更新地址：
          <a
            class="text-lime-500 underline font-bold cursor-pointer hover:text-lime-500/75 after:content-['_↗']"
            @click="Copy_Url(pca_url)"
          >
            {{ pca_url }}
          </a>
          <br />
          下载pca.json文件引入即可
        </Explain>
      </div>
      <button class="btn btn-xs" @click="Import_pcafile()">选择文件并更新</button>
    </PreferencesItem>
  </div>
</template>

<script setup lang="ts">
// import { nextTick, reactive, ref } from 'vue';
import { STORE_Setting } from '/store/modules/setting';
import { STORE_System } from '/store/modules/system';
import { Scan_Lawfiles } from '/scripts/utils/scanfolder';
import { Load_Local_Files } from '/scripts/utils/handlefiles';
// import { Msg } from '/scripts/utils/message';

import ImportFile from '/components/utils/ImportFile.vue';
import Msg from '@/scripts/utils/message';

const STORE_setting_instance = STORE_Setting();
const STORE_system_instance = STORE_System();

const pca_url = ref('https://github.com/modood/Administrative-divisions-of-China');
const law_url = ref('http://gov.pkulaw.cn/');

const ImportFileDialogVisible = ref(false);
const isReloadLawfilesList = ref(true);

//法律法规文件管理
const tableData = reactive({
  list: STORE_setting_instance.lawfilelist,
});

const Copy_Url = (url: string) => {
  window.clipboard.writeText(url);
  Msg('已复制', 'success', 3000);
};

const Refresh_lawfiles = () => {
  tableData.list = Scan_Lawfiles();
  // Msg('刷新成功！', 'success');
};

//删除引入的法律法规
const Delete_Lawfile = (index: number) => {
  const del_name = STORE_Setting().lawfilelist[index].name;
  const del_path = `${STORE_System().CacheFile_Path}/lawfiles/${del_name}.json`;
  window.Remove(del_path);
  STORE_setting_instance.Del_lawfile(index);

  //刷新表格
  isReloadLawfilesList.value = false;
  nextTick(() => {
    isReloadLawfilesList.value = true;
    Msg('删除成功！', 'success', 3000);
  });
};

//行政区划信息更新
const pca_Update_Time = () => {
  const data = window.fs.statSync(STORE_system_instance.CacheFile_Path + '/divisions/pca.json');
  return data.ctime.toLocaleDateString();
};

/** 导入行政区划信息 */
const Import_pcafile = async () => {
  const File_Result = await Load_Local_Files();
  if (File_Result) {
    const bool = JSON.parse(File_Result)['北京市'] != undefined ? true : false; //校验文件
    if (bool) {
      window.fs.writeFileSync(
        STORE_system_instance.CacheFile_Path + '/divisions/pca.json',
        File_Result
      );
    }

    // Msg(bool ? '已成功导入行政区划文件' : '导入失败，请校验文件！', bool ? 'success' : 'error');
  }
};
</script>
