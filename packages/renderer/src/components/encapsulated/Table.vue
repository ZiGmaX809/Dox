<template>
  <div class="border border-base-content/5 rounded-lg overflow-hidden">
    <table class="min-w-full text-sm divide-y divide-base-content/5">
      <thead>
        <tr class="grid grid-cols-20 divide-x divide-base-content/5 bg-base-200/50 font-medium">
          <th class="p-2">序号</th>
          <th class="p-2">详情</th>
          <th class="p-2 col-span-4">案号</th>
          <th class="p-2">审限</th>
          <th class="p-2 col-span-4">案由</th>
          <th class="p-2 col-span-9">当事人信息</th>
        </tr>
      </thead>
      <tbody
        class="flex flex-col h-[calc(100vh_-_180px)] scrollbar-thin scrollbar-thumb-rounded hover:scrollbar-thumb-base-300"
      >
        <tr
          class="grid grid-cols-20 divide-x divide-base-content/5 border-base-content/5"
          v-for="(item, index) in show_list.list"
          :class="{
            'border-b': index + 1 !== currentPage * currentPagesize, // 当前页的最后一条数据不显示下边框
          }"
        >
          <td class="flex justify-center items-center p-2 font-medium text-center">
            {{ index + 1 + (currentPage - 1) * currentPagesize }}
          </td>
          <td class="flex p-2 items-center">
            <Explain
              iconName="down"
              z_class="w-[850px]"
              :direction="currentPagesize - index < 5 ? 'top' : 'bottom'"
            >
              <div class="flex flex-row">
                <p class="w-1/6">
                  <b>案号代码</b>
                  <br />
                  <b>审判组织形式</b>
                  <br />
                  <b>审限届满日期</b>
                  <br />
                  <b>原审法院</b>
                  <br />
                  <b>原审案号</b>
                </p>
                <p class="w-1/3">
                  {{ item.ahdm }}
                  <br />
                  {{ item.spzzxs }}
                  <br />
                  {{ item.sxjmrqr }}
                  <br />
                  {{ item.ysfydm }}
                  <br />
                  {{ item.ysah }}
                </p>
                <p class="w-1/6">
                  <b>状态</b>
                  <br />
                  <b>立案日期</b>
                  <br />
                  <b>收案日期</b>
                  <br />
                  <b>收案人</b>
                  <br />
                  <b>承办部门</b>
                </p>
                <p class="w-1/6">
                  {{ item.ajztmc }}
                  <br />
                  {{ item.larq }}
                  <br />
                  {{ item.sarq }}
                  <br />
                  {{ item.sar }}
                  <br />
                  {{ item.cbbm1 }}
                </p>
                <p class="w-1/6">
                  <b>承办人</b>
                  <br />
                  <b>审判长</b>
                  <br />
                  <b>合议庭成员</b>
                  <br />
                  <b>法官助理</b>
                  <br />
                  <b>书记员</b>
                </p>
                <p class="w-1/6">
                  {{ item.cbr }}
                  <br />
                  {{ item.spz }}
                  <br />
                  {{ item.hycy }}
                  <br />
                  {{ item.fgzl }}
                  <br />
                  {{ item.sjy }}
                </p>
              </div>
            </Explain>
          </td>
          <td class="flex items-center col-span-4 p-2 text-info cursor-pointer">
            {{ item.ah }}
          </td>
          <td class="flex justify-center items-center p-2">
            {{ item.qx }}
          </td>
          <td class="flex items-center col-span-4 p-2">
            {{ item.ayms }}
          </td>
          <td class="flex items-center col-span-9 p-2">
            {{ item.dsr }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="flex w-full mt-5 justify-center">
    <Pagination
      @change-page="changePage"
      @change-page-size="changePageSize"
      :total="total_item"
      :page="currentPage"
      :pagesize="currentPagesize"
    />
  </div>
</template>

<script setup lang="ts">
const list_json = JSON.parse(localStorage.getItem('RequestInfo')!);
const case_list = list_json.MyCaseList?.data;
const currentPage = ref(1);
const currentPagesize = ref(30);
const total_item = ref(case_list.length);

interface Case {
  [key: string]: any;
}
const show_list: Case = reactive({
  list: [],
});

const changePage = (page: number) => {
  show_list.list = [];
  currentPage.value = page;
  for (let i = 0; i < case_list.length; i++) {
    if (i >= (page - 1) * currentPagesize.value && i < page * currentPagesize.value) {
      show_list.list.push(case_list[i]);
    }
  }
};

const changePageSize = (page_size: number) => {
  currentPagesize.value = page_size;
  changePage(1);
};

onMounted(() => {
  changePage(1);
});
</script>
