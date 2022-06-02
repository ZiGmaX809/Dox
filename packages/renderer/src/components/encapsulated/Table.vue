<template>
  <div class="rounded-lg overflow-hidden border border-base-content/10">
    <table class="min-w-full text-sm table-fixed">
      <thead>
        <tr
          class="bg-base-content/5 divide-x divide-base-content/5 border-b border-b-base-content/5"
        >
          <th class="p-2" :style="{ width: item.width }" v-for="item in table_head">
            {{ item.title }}
          </th>
        </tr>
      </thead>
    </table>
    <div
      ref="tbody_ref"
      class="w-full h-[calc(100vh_-_180px)] scrollbar-thin scrollbar-thumb-rounded hover:scrollbar-thumb-base-300"
    >
      <table class="min-w-full text-sm table-fixed">
        <tbody>
          <tr
            class="divide-x divide-base-content/5"
            v-for="(item, index) in show_list.list"
            :class="{
              'border-b border-b-base-content/5': index + 1 !== currentPage * currentPagesize,
            }"
          >
            <td class="p-2 text-center" :style="{ width: table_head[0].width }">
              {{ index + 1 + (currentPage - 1) * currentPagesize }}
            </td>
            <td
              class="p-2 text-center"
              :style="{ width: table_head[1].width }"
              @click="test = !test"
            >
              <!-- <Explain
                iconName="down"
                z_class="w-[850px]"
                :direction="currentPagesize - index < 5 ? 'top' : 'bottom'"
                :width="list_width[index]"
              >
                
              </Explain> -->
            </td>
            <td class="p-2 text-info cursor-pointer" :style="{ width: table_head[2].width }">
              {{ item.ah }}
            </td>
            <td class="p-2 text-center" :style="{ width: table_head[3].width }">
              {{ item.qx }}
            </td>
            <td class="p-2" :style="{ width: table_head[4].width }">
              {{ item.ayms }}
            </td>
            <td class="p-2" :style="{ width: table_head[5].width }">
              {{ item.dsr }}
            </td>
          </tr>
          <tr></tr>
        </tbody>
      </table>
    </div>
  </div>
  <div class="flex w-full mt-5 justify-center">
    <Pagination
      @change-page="changePage"
      @change-page-size="changePageSize"
      :total="total_item"
      :page="currentPage"
      :currentpagesize="currentPagesize"
      :pagesize="pagesize"
    />
  </div>
</template>

<script setup lang="ts">
const list_json = JSON.parse(localStorage.getItem('RequestInfo')!);
const case_list = list_json.MyCaseList?.data;
const currentPage = ref(1);
const total_item = ref(case_list.length);
const pagesize = [30, 50, 100];
const currentPagesize = ref(pagesize[0]);
const tbody_ref = ref();
const test = ref(false);

interface Case {
  [key: string]: any;
}
const show_list: Case = reactive({
  list: [],
});

const table_head = [
  {
    title: '序号',
    key: 'index',
    width: '60px',
  },
  {
    title: '详情',
    key: 'detail',
    width: '60px',
  },
  {
    title: '案号',
    key: 'ah',
    width: '200px',
  },
  {
    title: '审限',
    key: 'qx',
    width: '60px',
  },
  {
    title: '案由',
    key: 'ayms',
    width: '200px',
  },
  {
    title: '当事人信息',
    key: 'dsr',
    width: '',
  },
];

const changePage = (page: number) => {
  show_list.list = [];
  currentPage.value = page;
  // 分页显示
  for (let i = 0; i < case_list.length; i++) {
    if (i >= (page - 1) * currentPagesize.value && i < page * currentPagesize.value) {
      show_list.list.push(case_list[i]);
    }
  }
  // console.log(tbody_ref.value.scrollHeight, tbody_ref.value.clientHeight);
};

const changePageSize = (page_size: number) => {
  currentPagesize.value = page_size;
  changePage(1);
};

onMounted(() => {
  changePage(1);
  // console.log(tbody_ref.value.scrollHeight, tbody_ref.value.clientHeight);
});
</script>
