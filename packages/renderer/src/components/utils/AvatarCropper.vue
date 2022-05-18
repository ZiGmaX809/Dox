<template>
  <div class="flex flex-row h-[500px]">
    <div class="w-[500px] h-[500px]">
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
    <div class="flex flex-col ml-5 space-y-2">
      <label class="btn btn-sm btn-primary" @click="select_pic">打开图片</label>
      <label class="btn btn-sm btn-secondary" :class="isdisabled" @click="clear_pic">清除</label>
      <label for="my-modal" class="btn btn-sm btn-accent" :class="isdisabled" @click="save_pic">保存</label>
      <label for="my-modal" class="btn btn-sm">关闭</label>
      <p class="w-[100px] text-xs text-neutral-400 mt-3">
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
import { STORE_System } from '/store/modules/system';
import Msg from '/scripts/utils/message';
import { Load_Image_To_Base64, Select_FileOrFolder } from '/scripts/utils/handlefiles';


/* vue-cropper DOM */
const cropper = ref();
const save_disabled = ref(true);
const isdisabled = ref('btn-disabled')
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
  const select_image_path = await Select_FileOrFolder(['openFile'], filter);
  if (select_image_path) {
    Load_Image_To_Base64(select_image_path).then(res => {
      options.img = res;
      isdisabled.value = ''
    });
  }
};

const clear_pic = () => {
  options.img = '';
  isdisabled.value = 'btn-disabled'
};

const save_pic = () => {
  if (cropper.value) {
    cropper.value!.getCropBlob((blob: any) => {
      const custom_avatar_path = `${STORE_System().CacheFile_Path}/images/useravatar.jpg`;
      window.Export_File(blob, custom_avatar_path);
      // Msg('保存成功!', 'success');
      // Msg({ text: '保存成功', type: 'error' });
      setTimeout(() => {
        avatar_src();
      }, 500);
    });
  }
};
</script>
