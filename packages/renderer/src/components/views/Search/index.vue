<template>
  <input
    type="text"
    placeholder="Custom focus style"
    class="h-auto rounded-sm outline outline-1 outline-zinc-200 focus:outline-none focus:ring-2 focus:border-blue-400"
    @input="(val:Event) => handle_num(val)"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { genFileId } from 'element-plus';
import type { UploadInstance, UploadProps, UploadRawFile } from 'element-plus';

const upload = ref<UploadInstance>();

const handleExceed: UploadProps['onExceed'] = files => {
  upload.value!.clearFiles();
  const file = files[0] as UploadRawFile;
  file.uid = genFileId();
  upload.value!.handleStart(file);
};

const submitUpload = () => {
  upload.value!.submit();
};

const handle_num = (val:Event) => {
  console.log(val)
}
</script>
