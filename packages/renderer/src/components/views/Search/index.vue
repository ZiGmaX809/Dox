<template>
  <div
    class="flex px-4 py-3 w-1/2 bg-sky-50 text-blue-500 items-center rounded border border-blue-100 select-none"
  >
    <span class="text-blue-400">
      <svg fill="currentColor" viewBox="0 0 24 24" class="h-4 w-4">
        <path
          fill="currentColor"
          d="M12,0A12,12,0,1,0,24,12,12.013,12.013,0,0,0,12,0Zm.25,5a1.5,1.5,0,1,1-1.5,1.5A1.5,1.5,0,0,1,12.25,5ZM14.5,18.5h-4a1,1,0,0,1,0-2h.75a.25.25,0,0,0,.25-.25v-4.5a.25.25,0,0,0-.25-.25H10.5a1,1,0,0,1,0-2h1a2,2,0,0,1,2,2v4.75a.25.25,0,0,0,.25.25h.75a1,1,0,1,1,0,2Z"
        ></path>
      </svg>
    </span>
    <span class="pl-3 text-sm">Infomation A new software update is available.</span>
  </div>

  <div
    class="flex px-4 py-3 w-1/2 bg-green-50 text-green-600 items-center rounded border border-emerald-200 select-none mt-5"
  >
    <span class="text-green-500">
      <svg fill="currentColor" viewBox="0 0 24 24" class="h-4 w-4">
        <path
          fill="currentColor"
          d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
        ></path>
      </svg>
    </span>
    <span class="pl-3 text-sm">Success A new software update is available.</span>
  </div>

  <div
    class="flex px-4 py-3 w-1/2 bg-red-50 text-red-500 items-center rounded border border-red-100 select-none mt-5"
  >
    <span class="text-red-400">
      <svg fill="currentColor" viewBox="0 0 24 24" class="h-4 w-4">
        <path
          fill="currentColor"
          d="M11.983,0a12.206,12.206,0,0,0-8.51,3.653A11.8,11.8,0,0,0,0,12.207,11.779,11.779,0,0,0,11.8,24h.214A12.111,12.111,0,0,0,24,11.791h0A11.766,11.766,0,0,0,11.983,0ZM10.5,16.542a1.476,1.476,0,0,1,1.449-1.53h.027a1.527,1.527,0,0,1,1.523,1.47,1.475,1.475,0,0,1-1.449,1.53h-.027A1.529,1.529,0,0,1,10.5,16.542ZM11,12.5v-6a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Z"
        ></path>
      </svg>
    </span>
    <span class="pl-3 text-sm">Error A new software update is available.</span>
  </div>

  <div
    class="flex px-4 py-3 w-1/2 bg-amber-50 text-yellow-600 items-center rounded border border-yellow-200 select-none mt-5"
  >
    <span class="text-yellow-500">
      <svg fill="currentColor" viewBox="0 0 24 24" class="h-4 w-4">
        <path
          fill="currentColor"
          d="M23.119,20,13.772,2.15h0a2,2,0,0,0-3.543,0L.881,20a2,2,0,0,0,1.772,2.928H21.347A2,2,0,0,0,23.119,20ZM11,8.423a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Zm1.05,11.51h-.028a1.528,1.528,0,0,1-1.522-1.47,1.476,1.476,0,0,1,1.448-1.53h.028A1.527,1.527,0,0,1,13.5,18.4,1.475,1.475,0,0,1,12.05,19.933Z"
        ></path>
      </svg>
    </span>
    <span class="pl-3 text-sm">Warning A new software update is available.</span>
  </div>
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

const handle_num = (val: Event) => {
  console.log(val);
};
</script>
