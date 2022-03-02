<template>
  <el-space direction="vertical">
    <el-card v-for="dsritem in dsrlist" class="box-card">
      <template #header>
        <div class="card-header">
          <span style="font-weight: bold; font-size: 20px">{{
            dsritem.mc
          }}</span>
        </div>
      </template>
      <el-descriptions :column="3" border>
        <!-- <template #title>
          <span>当事人信息</span>
        </template> -->
        <el-descriptions-item label="诉讼地位" label-align="right">{{
          dsritem.ssdw2mc
        }}</el-descriptions-item>
        <el-descriptions-item label="一审诉讼地位" label-align="right">{{
          dsritem.ssdw1mc
        }}</el-descriptions-item>
        <el-descriptions-item label="类别" label-align="right">
          <el-tag size="small">{{ dsritem.lxMc }}</el-tag></el-descriptions-item
        >
        <div v-if="dsritem.lx === '15_000004-1'">
          <el-descriptions-item label="性别" label-align="right">
            {{ dsritem.xbMc }}
          </el-descriptions-item>
          <el-descriptions-item label="出生日期" label-align="right">{{
            transbrithday(dsritem.csrq)
          }}</el-descriptions-item>
          <el-descriptions-item label="民族" label-align="right">{{
            dsritem.mzMc
          }}</el-descriptions-item>
          <el-descriptions-item
            label="户籍所在地"
            label-align="right"
            :span="span_num"
            >{{ dsritem.hjszd }}</el-descriptions-item
          >
        </div>
        <div v-else>
          <el-descriptions-item label="法定代表人" label-align="right">
            {{ dsritem.fddbr }}
          </el-descriptions-item>
        </div>
        <el-descriptions-item label="国家或地区" label-align="right">{{
          dsritem.gjMc
        }}</el-descriptions-item>
        <el-descriptions-item label="联系电话" label-align="right">{{
          dsritem.sjhm
        }}</el-descriptions-item>
        <div v-if="dsritem.lx === '15_000004-1'">
          <el-descriptions-item label="居民身份证号码" label-align="right">{{
            dsritem.sfzhm
          }}</el-descriptions-item>
        </div>
        <div v-else>
          <el-descriptions-item label="组织机构代码" label-align="right">{{
            dsritem.zzjgdm
          }}</el-descriptions-item>
        </div>
        <el-descriptions-item
          label="现住址"
          label-align="right"
          :span="span_num"
          >{{ dsritem.dz }}</el-descriptions-item
        >
        <div v-for="dlritem in final_dlr(dsritem.xh)">
          <el-descriptions-item label="诉讼委托代理人" label-align="right">
            {{ dlritem[0] }}
          </el-descriptions-item>
          <el-descriptions-item label="联系电话" label-align="right">
            {{ dlritem[1] }}
          </el-descriptions-item>
          <el-descriptions-item label="所在单位" label-align="right">
            {{ dlritem[2] }}
          </el-descriptions-item>
        </div>
      </el-descriptions>
    </el-card>
  </el-space>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { STORE_editor } from "../../store/modules/editor";
import { STORE_caseinfo } from "../../store/modules/caseinfo";

const STORE_editor_instance = STORE_editor();
const STORE_caseinfo_instance = STORE_caseinfo();

const caseInfo = STORE_caseinfo_instance.this_caseinfo;
const dsrlist = caseInfo?.entry?.dsrList;
const dlrlist = caseInfo?.entry?.dlrList;

const span_num = ref(3);

/*
 * 扩展预设文本数组
 * 当事人名称+一审法院+案号
 */
const add_presettext = () => {
  const prev_fy =  STORE_editor_instance.prev_fy;
  const prev_ah = caseInfo.entry.yaxxEOList[0].ah;
  const ay = caseInfo.entry.ajjbxx.ayms;
  const arr_prepare_text = [];

  for (let i = dsrlist.length - 1; i > -1; i--) {
    arr_prepare_text.push({
      ItemName: "【" + dsrlist[i].ssdw2mc + "】" + dsrlist[i].mc,
    });
  }

  arr_prepare_text.push(
    {
      ItemName: "【原审法院】" + prev_fy,
    },
    {
      ItemName: "【原审案号】" + prev_ah,
    },
    {
      ItemName: "【案由】" + ay,
    }
  );

   STORE_editor_instance.Add_presetText(arr_prepare_text);
};

const transbrithday = (data: string) => {
  if (data != null) {
    return data.replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3");
  }
};

const final_dlr = (dsrxh: string) => {
  const dlr_arr: any[] = [];
  dlrlist.forEach((element: any) => {
    if (element.dsrxh == dsrxh) {
      dlr_arr.push([element.mc, element.lxdh, element.szdw]);
    }
  });
  return dlr_arr;
};

add_presettext();
</script>

<style>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.el-space {
  display: block !important;
}

.tag1 {
  margin-left: 0px;
}

.tag2 {
  margin-left: 10px;
}
</style>
