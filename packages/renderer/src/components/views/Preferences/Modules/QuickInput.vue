<template>
  <b class="text-2xl mt-10">快捷输入</b>
  <el-divider />
  <div class="space-y-3">
    <div>
      <div class="flex justify-between h-8">
        <p class="font-bold">已引入的法律法规文件</p>
        <el-button size="small" @click="Refresh_lawfiles">刷新</el-button>
      </div>
      <el-table
        :data="tableData.list"
        border
        stripe
        height="400"
        style="width: 100%; height: 400px"
        v-if="isReloadLawfilesList"
      >
        <el-table-column prop="fullname" label="引入文件名称" />
        <el-table-column prop="name" label="索引缩写" width="200" />
        <el-table-column align="center" label="操作" width="80">
          <template #default="scope">
            <!-- <div
              class="flex w-9 h-6 m-auto bg-red-500 justify-center rounded hover:bg-red-400 hover:cursor-pointer"
            >
              <svg-icon name="ashbin" color="#fff" class="w-6 h-6"></svg-icon>
            </div> -->

            <el-popconfirm
              confirm-button-text="确认"
              cancel-button-text="取消"
              title="确认删除该文件？"
              @confirm="Delete_Lawfile(scope.$index)"
            >
              <template #reference>
                <el-button size="small" type="danger" class="w-9">
                  <svg-icon name="ashbin" class="w-5 h-5 text-white"></svg-icon>
                </el-button>
                <!-- <div
                  class="flex w-9 h-6 m-auto bg-red-500 justify-center rounded hover:bg-red-400 hover:cursor-pointer"
                >
                  <svg-icon name="ashbin" color="#fff" class="w-6 h-6"></svg-icon>
                </div> -->
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div>
      <div class="flex justify-between h-8">
        <p class="font-bold">引入新的法律法规文件</p>
        <el-button size="small" @click="ImportFileDialogVisible = true">引入</el-button>
        <el-dialog v-model="ImportFileDialogVisible" title="引入新法律法规文件">
          <ImportFile />
        </el-dialog>
      </div>
      <p class="text-xs text-neutral-400">
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
      </p>
    </div>

    <div>
      <div class="flex justify-between h-8">
        <p class="font-bold">行政区划地址信息（更新时间：{{ pca_Update_Time() }}）</p>
        <el-button size="small" @click="Import_pcafile()">选择文件并更新</el-button>
      </div>
      <p class="text-xs text-neutral-400">
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
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { nextTick, reactive, ref } from 'vue';
import { STORE_Setting } from '/store/modules/setting';
import { STORE_System } from '/store/modules/system';
import { Scan_Lawfiles } from '/scripts/utils/scanfolder';
import { Load_Local_Files } from '/scripts/utils/handlefiles';
import { Msg } from '/scripts/utils/message';

import ImportFile from '/components/utils/ImportFile.vue';

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
  Msg('已复制', 'success');
};

const Refresh_lawfiles = () => {
  tableData.list = Scan_Lawfiles();
  Msg('刷新成功！', 'success');
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
    Msg('删除成功！', 'success');
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

    Msg(bool ? '已成功导入行政区划文件' : '导入失败，请校验文件！', bool ? 'success' : 'error');
  }
};
</script>
