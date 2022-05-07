<template>
  <div id="PreferMainView" class="w-full h-full">
    <el-scrollbar>
      <div id="PreferContentView" class="flex flex-col w-3/5 h-auto m-auto select-none">
        <Customzie />
        <Edit />
        <Export />
        <QuickInput />
        <Advanced />
        <Others />
        <p class="font-barlow mt-10 text-center">MADE BY ZiGma</p>
        <p class="font-barlow text-sm text-center">v0.0.3 Alpha</p>
      </div>
    </el-scrollbar>
  </div>
</template>
