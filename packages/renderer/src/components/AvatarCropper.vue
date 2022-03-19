<template>
  <div style="display: flex; flex-direction: row; height: 500px">
    <div class="content" style="width: 500px; height: 500px">
      <vue-cropper
        autoCrop
        :img="options.img"
        ref="cropper"
        centerBox
        fixed
        :autoCrop="options.autoCrop"
        :outputSize="options.outputsize"
        :auto-crop-width="options.autoCropWidth"
        :auto-crop-height="options.autoCropHeight"
        :fixedBox="options.fixedBox"
        :fixedNumber="options.fixedNumber"
        :maxImgSize="options.maxImgSize"
        :original="options.original"
        :enlarge="options.enlarge"
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
import { STORE_System } from '../store/modules/system';
import { Load_Image_To_Base64, Save_File_From_Blob } from '../script/utils/handlefiles';
import { Msg } from '../script/utils/message';
import { ipcMsg_Select_File } from '../script/utils/ipcmessage';

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
  full: false,
  outputType: 'png',
  canMove: false,
  fixedBox: false,
  original: true,
  canMoveBox: true,
  autoCrop: true,
  autoCropWidth: 200,
  autoCropHeight: 200,
  centerBox: true,
  high: true,
  maxImgSize: 1500,
  fixed: true,
  outputSize: 1,
  fixedNumber: [1, 1],
  colorRange: '150',
  enlarge: 0.99999,
});

const select_pic = async () => {
  const filter = [
    {
      name: '图片',
      extensions: ['jpeg', 'jpg', 'png'],
    },
  ];
  const select_image_path = await ipcMsg_Select_File(filter);
  options.img = Load_Image_To_Base64(select_image_path[0]);
};

const save_pic = () => {
  if (cropper.value) {
    cropper.value!.getCropBlob(async (blob: any) => {
      const custom_avatar_path = `${STORE_System().CacheFile_Path}/images/`;
      const result: string[] = await Save_File_From_Blob(
        blob,
        custom_avatar_path,
        'useravatar.jpg'
      );
      Msg('保存' + result[1], result[0]);
      // dialogTableVisible.value = false;
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
