<template>
  <h2 class="pref_h2">其他</h2>
  <el-divider />
  <div class="pref_div">
    <p class="pref_p">导出配置及缓存数据</p>
    <el-button size="small" @click="export_localstorage()">导出</el-button>
  </div>
  <div class="pref_div">
    <p class="pref_p">导入配置及缓存数据</p>
    <el-button size="small" @click="import_localstorage()">选择文件并导入</el-button>
  </div>
  <div class="pref_div">
    <p class="pref_p">重置应用</p>
    <el-button size="small" type="danger" @click="reset_program()">重置</el-button>
  </div>
  <p class="pref_desc_p">
    <b style="color: #f56c6c">
      &#10059;&nbsp;注意：重置应用将删除所有与本工具相关文件与配置，包括已导入的法律法规文件、模板、行政区划文件，该操作不可逆！
    </b>
    <br />
  </p>
</template>

<script setup lang="ts">
import { ElMessageBox } from 'element-plus';
import { ipcMsg_Select_File, ipcMsg_Get_Path } from '../../script/utils/ipcmessage';
import { Msg } from '../../script/utils/message';

//导出&导入缓存
const export_localstorage = async () => {
  const now = new Date();
  const arr_text = [];
  for (var i = 0; i < window.localStorage.length; i++) {
    const key: string | null = window.localStorage.key(i); //获取本地存储的Key
    if (key != null) {
      arr_text.push([key, window.localStorage.getItem(key)]);
    }
  }
  const final_json = Object.fromEntries(arr_text);

  const downloads_path = await ipcMsg_Get_Path('downloads');

  if (downloads_path) {
    const file_fullpath = `${downloads_path}/export_${now.getTime()}.json`;
    window.fs.writeFileSync(file_fullpath, JSON.stringify(final_json));

    Msg(`已导出至 ${file_fullpath} `, 'success');
  }
};

const import_localstorage = async () => {
  const File_Result = await ipcMsg_Select_File(
    [
      {
        name: 'JSON',
        extensions: ['json'],
      },
    ],
    { encoding: 'utf-8' }
  );
  if (File_Result) {
    const json_ = JSON.parse(File_Result);
    for (let key in json_) {
      window.localStorage.setItem(key, json_[key]);
    }

    Msg('成功导入缓存文件，应用将在3秒内重启', 'success');

    setTimeout(() => {
      window.ipcRenderer.send('Restart');
    }, 3000);
  }
};

const reset_program = () => {
  ElMessageBox.confirm('确认重置应用？', '警告', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    Msg('重置成功，应用将在3秒内重启！', 'success');
  });
};
</script>
