<template>
  <div style="display: flex; flex-direction: row; height: 500px">
    <div class="content" style="width: 500px; height: 500px">
      <vue-cropper
        autoCrop
        :img="options.img"
        ref="cropper"
        centerBox
        fixed
        :auto-crop-width="options.autoCropWidth"
        :auto-crop-height="options.autoCropHeight"
        :fixedBox="options.fixedBox"
        :fixedNumber="options.fixedNumber"
        :maxImgSize="options.maxImgSize"
      />
    </div>
    <div style="display: flex; flex-direction: column; margin-left: 20px">
      <el-button size="small" style="width: 100px" @click="select_pic">打开图片</el-button>
      <el-button size="small" style="width: 100px" type="success" @click="save_pic">保存</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import 'vue-cropper/dist/index.css';
import { VueCropper } from 'vue-cropper';
import { inject, reactive, Ref, ref } from 'vue';
import { ipcMsg_Get_Image } from '../script/utils/ipcmessage';
import { STORE_System } from '../store/modules/system';
import { Save_File_From_Blob } from '../script/utils/savefile';
import { Msg } from '../script/utils/message';

/* vue-cropper DOM */
const cropper = ref();
const dialogTableVisible: Ref<boolean> = inject('dialogTableVisible')!;

interface cropperInter {
  img: any;
  [propname: string]: any;
}

/* vue-cropper 配置项 */
const options: cropperInter = reactive({
  img: '',
  size: 1,
  full: false,
  outputType: 'png',
  canMove: false,
  fixedBox: false,
  original: false,
  canMoveBox: true,
  autoCrop: true,
  autoCropWidth: 500,
  autoCropHeight: 500,
  centerBox: true,
  high: true,
  maxImgSize: 2000,
  fixed: true,
  outputSize: 1,
  fixedNumber: [1, 1],
  colorRange: '150',
});

const select_pic = async () => {
  const img = await ipcMsg_Get_Image([
    {
      name: '图片',
      extensions: ['jpeg', 'jpg', 'png'],
    },
  ]);
  options.img = img;
};

const save_pic = () => {
  if (cropper.value) {
    cropper.value!.getCropBlob(async (blob: any) => {
      const custom_avatar_path = `${STORE_System().CacheFile_Path}/images/`;
      const result: string[] = await Save_File_From_Blob(
        blob,
        custom_avatar_path,
        'useravatar.png'
      );
      Msg('保存' + result[1], result[0]);
      dialogTableVisible.value = false;
    });
  }
};
</script>

<style scoped>
.el-button + .el-button {
  margin-top: 10px;
  margin-left: 0px !important;
}
</style>
