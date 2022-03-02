<template>
  <!-- Top -->
  <!-- 导航栏 -->
  <div class="topbars">
    <!-- 路径 -->
    <div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">我的案件</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 右上角功能区 -->
    <div class="topbars-right">
      <el-button :icon="Refresh" size="small" @click="refresh_caselist"
        >刷新</el-button
      >
    </div>
  </div>
  <!-- 主功能区 -->
  <el-table
    :data="
      tableData.slice((currentPage - 1) * pagesize, currentPage * pagesize)
    "
    border
    height="255"
    stripe
    style="position: relative; top: 10px; height: calc(100% - 80px) !important"
  >
    <!-- <template slot="empty">
      <span>No Data</span>
    </template> -->
    <!-- <el-empty description="description"></el-empty> -->
    <el-table-column label="序号" width="60" align="center">
      <template v-slot="scope">
        {{ scope.$index + (currentPage - 1) * pagesize + 1 }}
      </template>
    </el-table-column>
    <el-table-column label="详情" width="60" align="center" type="expand">
      <template #default="props">
        <el-descriptions class="margin-top" :column="3" border>
          <el-descriptions-item>
            <template #label> 案号代码 </template>
            {{ props.row.ahdm }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label> 状态 </template>
            <el-tag type="success" size="small">{{ props.row.ajztmc }}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label> 审判组织形式 </template>
            <el-tag size="small">{{ props.row.spzzxs }}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label> 立案日期 </template>
            {{ props.row.larq }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label> 收案日期 </template>
            {{ props.row.sarq }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label> 审限届满日期 </template>
            {{ props.row.sxjmrqr }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label> 承办人 </template>
            {{ props.row.cbr }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label> 审判长 </template>
            {{ props.row.spz }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label> 合议庭成员 </template>
            {{ props.row.hycy }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label> 法官助理 </template>
            {{ props.row.fgzl }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label> 书记员 </template>
            {{ props.row.sjy }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label> 收案人 </template>
            {{ props.row.sar }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label> 承办部门 </template>
            {{ props.row.cbbm1 }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label> 原审案号 </template>
            {{ props.row.ysah }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label> 原审法院 </template>
            {{ props.row.ysfydm }}
          </el-descriptions-item>
        </el-descriptions>
      </template>
    </el-table-column>
    <el-table-column prop="ah" label="案号" width="200px">
      <template v-slot="scope">
        <div class="ah_s">
          <router-link
            :to="{
              name: 'Casezone',
              hash: '#' + scope.row.ah,
              params: { caseid: scope.row.ahdm, prev_fy: scope.row.ysfydm },
            }"
            >{{ scope.row.ah }}</router-link
          >
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="qx" label="审限" width="70px" align="center" />
    <el-table-column prop="ayms" label="案由" width="200" />
    <el-table-column prop="dsr" label="当事人信息" />
  </el-table>
  <el-pagination
    @current-change="handleCurrentChange"
    @size-change="handleSizeChange"
    :current-page="currentPage"
    :page-sizes="[20, 50, 100]"
    :page-size="pagesize"
    layout="total,prev,pager,next,sizes"
    :total="total"
    :pager-count="5"
    small
  >
  </el-pagination>
</template>

<script setup lang="ts">
import { ref, inject, reactive } from "vue";
import { Refresh } from "@element-plus/icons-vue";
import { REQUEST_get_caselist } from "../script/request/caselist";
import { check_login_info } from "../script/utils/checklogin";
import { STORE_caseinfo } from "../store/modules/caseinfo";

const STORE_caseinfo_instance = STORE_caseinfo();

const reload: any = inject("reload");

const d = reactive(STORE_caseinfo_instance.my_caselist);

const currentPage = ref(1);
const pagesize = ref(20);
const total = d ? d.total : 0;
const tableData = d ? d.data : [];

const refresh_caselist = async () => {
  if (check_login_info()) {
    await REQUEST_get_caselist();
    reload.reload();
  }
};

const handleCurrentChange = (val: number) => {
  currentPage.value = val;
};

const handleSizeChange = (val: number) => {
  pagesize.value = val;
};
</script>

<style lang="scss">
.el-breadcrumb {
  user-select: none;
}

.el-descriptions {
  text-align: center;
  width: calc(100% - 20px);
  height: 100%;
  position: relative;
  left: 10px;
  right: 10px;
}

.el-pagination {
  justify-content: center;
  text-align: center;
  position: absolute;
  bottom: 20px;
  left: 0;
  right: 0;
}

.el-table__empty-block {
  width: 100%;
  min-height: 600px !important;
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABACAMAAADbASJGAAABPlBMVEUAAADX19fa2trZ2dna2trZ2dn19fX19fXt7e319fX19fX19fXb29vZ2dnZ2dn29vb19fX29vb8/PzY2NjZ2dn29vb19fX19fXZ2dnZ2dnZ2dnZ2dn19fXa2tra2tr4+Pja2tr19fXZ2dn29vbb29vZ2dn19fX29vb19fXZ2dn19fX19fXZ2dn29vb29vbX19f29vbi4uLZ2dnj4+Ph4eHZ2dnZ2dnZ2dn29vb09PTZ2dn19fXa2trZ2dn19fXZ2dn19fX19fX29vb19fXZ2dn09PTY2Nj19fXa2tr39/fX19fd3d3Z2dnY2Nj19fXZ2dn29vbh4eH09PT29vbY2NjZ2dnZ2dn09PTY2NjZ2dn09PT19fXX19f6+vr19fXZ2dnp6eni4uLo6Ojg4ODk5OTx8fHt7e3r6+v4+Pjd3d2+WHiwAAAAXXRSTlMAQL+/74DlRhnp1bf85qKLfmMRBvv18KGHamFQTEszLh/89dzc186+sq2ZlV1XUjc2KCUR9OzSzMfBtLCpmpGOgHpxbmdfVT06Hgz84NPFxLGwqKeYk3h2dnFdSi2FEAZaAAACXElEQVRYw+3U11LjQBCF4WMbW3LC2YAxxuScc1xy2JyzuiUHDO//AqsLahEYSyNpuKH4rlXzV7V6Bk6WA46q8GdgjAWsl+BDhbtLAUd9YzwAz/5yCCKWhnkZHq3wW4jJMefgzXAeopY5CU9GWYWwAIfgwQcOwIUSf4Nru3wCV8LcB5d6+RVc6na7yH08BddCXIEL/RyEe7lRrkJYJf8OXlTzYznhS5hMrsCTBfEpb+Qv4FG/6L5s8yw8O+HvELDHv+BDmEsiH/XClz0ecL4gX+HTdteC04+bgl/qxnrVdgXXgq/hWyUZsjuli9vsOq7abJDbhOwihv7QKoed3sWE8ZBDRGvTGF6CjQtuaG1cR5r2O93LTQkRLdFtO62EJiNiBGEjaEiJNNZgo6smJaLzGTr6yU0pkes3yX50cMarmpSI1kxwsANONCVFNNKNDlqkeY+Ie4k8h0hQViT8EnmJPNvI0qisyKdLPCY7vx+juqxIjcZT5SzuW9yPkklixBRNDeLO3CSZpEdMPcptYjBO9FQRM3MJ02mB/jNupDSuLRGKngIKWdT4WkaEWCeLc8TJ4oqvZETMY8hiBhNkVa/LiNTrZDWNObJqccN/o8EtsioDM2RV45uG7kvthnW6Py3T7yhZ6Ab7ZLTIIjZ/e1FSEXoiscPs3cN1/J6ewEQmh3uUdLxIEhV3DhU85vzHRymDi+wcL8KOWk5P+ihFJtNlFUJUJXPQMzEyRMIKsXjPQUZR4Z66+Gcuc5ROTX+Ob22Ox0Yi0WJhaKhQjEZGYuObW/Ev06n0UWZeGczCzj/Kd2oUicxurAAAAABJRU5ErkJggg==");
  background-repeat: no-repeat;
  background-position: center;
  user-select: none;
  span {
    position: relative;
    top: 50px;
  }
}
</style>
