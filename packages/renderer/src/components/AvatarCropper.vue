<template>
  <div style="display: flex; flex-direction: row; height: 500px">
    <div class="content" style="width: 500px; height: 500px">
      <vue-cropper
        ref="cropper"
        :img="options.img"
        :autoCrop="options.autoCrop"
        :outputSize="options.outputsize"
        :auto-crop-width="options.autoCropWidth"
        :auto-crop-height="options.autoCropHeight"
        :centerBox="options.centerBox"
        :fixed="options.fixed"
        :fixedBox="options.fixedBox"
        :fixedNumber="options.fixedNumber"
        :original="options.original"
        :enlarge="options.enlarge"
      />
    </div>
    <div style="display: flex; flex-direction: column; margin-left: 20px">
      <el-button size="small" style="width: 100px" @click="select_pic">打开图片</el-button>
      <el-button
        size="small"
        style="width: 100px"
        type="danger"
        :disabled="save_disabled"
        @click="clear_pic"
      >
        清除
      </el-button>
      <el-button
        size="small"
        style="width: 100px"
        type="success"
        @click="save_pic"
        :disabled="save_disabled"
      >
        保存
      </el-button>
      <p style="width: 100px; font-size: 12px; color: #909090">
        Tips:
        <br />
        可在选框外拖动图片；
        <br />
        裁剪框固定为正方形;
        <br />
        可用滚轮放大缩小图片。
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import 'vue-cropper/dist/index.css';
import { VueCropper } from 'vue-cropper';
import { inject, reactive, ref } from 'vue';
import { STORE_System } from '../store/modules/system';
import { Load_Image_To_Base64, Save_File_From_Blob } from '../script/utils/handlefiles';
import { Msg } from '../script/utils/message';
import { ipcMsg_Select_FileOrFolder } from '../script/utils/ipcmessage';

/* vue-cropper DOM */
const cropper = ref();
const save_disabled = ref(true);
const avatar_src: () => void = inject('avatar_src')!;

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
  autoCropWidth: 500,
  autoCropHeight: 500,
  centerBox: true,
  high: true,
  maxImgSize: 1500,
  fixed: true,
  outputSize: 1,
  fixedNumber: [1, 1],
  colorRange: '150',
  enlarge: 0.9999,
});

const select_pic = async () => {
  const filter = [
    {
      name: '图片',
      extensions: ['jpeg', 'jpg', 'png'],
    },
  ];
  const select_image_path = await ipcMsg_Select_FileOrFolder(['openFile'], filter);
  if (select_image_path) {
    Load_Image_To_Base64(select_image_path[0]).then(res => {
      options.img = res;
      save_disabled.value = false;
    });
  }
};

const clear_pic = () => {
  options.img = '';
  save_disabled.value = true;
};

const emit = defineEmits(['dialog_close']);

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
      emit('dialog_close');
      setTimeout(() => {
        avatar_src();
      }, 500);
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
