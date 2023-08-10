<template>
  <b class="text-2xl mt-10">其他</b>
  <Divider />
  <div class="text-base-content">
    <PreferencesItem>
      <p class="font-bold">导出配置及缓存数据</p>
      <button class="btn btn-xs" @click="export_localstorage()">导出</button>
    </PreferencesItem>

    <PreferencesItem>
      <p class="font-bold">导入配置及缓存数据</p>
      <button class="btn btn-xs" @click="import_localstorage()">选择文件并导入</button>
    </PreferencesItem>

    <PreferencesItem>
      <p class="font-bold">重置应用</p>
      <button class="btn btn-error btn-xs" @click="reset_program()">重置</button>
    </PreferencesItem>
  </div>
</template>

<script setup lang="ts">
import { STORE_System } from '@/store/modules/system';
import { ipcRenderer } from 'electron';
import fs from 'fs';
// import { ElMessageBox } from 'element-plus';
import { Load_Local_Files } from '/scripts/utils/handlefiles';
// import { Msg } from '/scripts/utils/message';

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

  const downloads_path = STORE_System().Download_Path;

  if (downloads_path) {
    const file_fullpath = `${downloads_path}/export_${now.getTime()}.json`;
    fs.writeFileSync(file_fullpath, JSON.stringify(final_json));

    // Msg(`已导出至 ${file_fullpath} `, 'success');
  }
};

const import_localstorage = async () => {
  const File_Result = await Load_Local_Files();
  if (File_Result) {
    const json_ = JSON.parse(File_Result);
    for (let key in json_) {
      window.localStorage.setItem(key, json_[key]);
    }

    // Msg('成功导入缓存文件，应用将在3秒内重启', 'success');

    setTimeout(() => {
      ipcRenderer.send('Restart');
    }, 3000);
  }
};

const reset_program = () => {
  //注意：重置应用将删除所有与本工具相关文件与配置，包括已导入的法律法规文件、模板、行政区划文件，该操作不可逆，请谨慎操作！
  // ElMessageBox.confirm('确认重置应用？', '警告', {
  //   confirmButtonText: '确认',
  //   cancelButtonText: '取消',
  //   type: 'warning',
  // }).then(() => {
  //   Msg('重置成功，应用将在3秒内重启！', 'success');
  // });
};
</script>
