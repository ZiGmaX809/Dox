import { defineStore } from 'pinia';
import { obj } from '../index';
import { STORE_Request } from './request';
import { STORE_System } from './system';

export const STORE_Editor = defineStore({
  id: 'editor',
  state: () => {
    return {
      lawfileCache: '',
      presetText: [] as obj,
      prev_fy: '',
      editor_isChanged: false,
      case_id: '',
    };
  },
  getters: {
    getText(state) {
      return state.presetText;
    },
    Get_PresetText(state) {
      return state.presetText;
    },
    Get_CaseInfo(state) {
      return state.presetText[0].Items;
    },
  },
  actions: {
    Set_prev_fy(data: string) {
      this.prev_fy = data;
    },
    Set_case_id(id: string) {
      this.case_id = id;
    },
    Set_editor_isChanged() {
      this.editor_isChanged = true;
    },
    Reset_editor_isChanged() {
      this.editor_isChanged = false;
    },
    async Add_presetText() {
      const prev_fy = this.prev_fy;
      const prev_ah = await STORE_Request().CaseDetail.entry.yaxxEOList[0].ah;
      const ay = await STORE_Request().CaseDetail.entry.ajjbxx.ayms;
      const dsrlist = await STORE_Request().CaseDetail.entry?.dsrList;
      const arr_prepare_text = [];

      for (let i = dsrlist.length - 1; i > -1; i--) {
        arr_prepare_text.push({
          ItemName: '【' + dsrlist[i].ssdw2mc + '】' + dsrlist[i].mc,
        });
      }

      arr_prepare_text.push(
        {
          ItemName: '【原审法院】' + prev_fy,
        },
        {
          ItemName: '【原审案号】' + prev_ah,
        },
        {
          ItemName: '【案由】' + ay,
        }
      );

      this.presetText[0].Items = arr_prepare_text;
    },
    Set_presetText() {
      //启动程序时即加载
      const presetText = window.fs.readFileSync(
        `${STORE_System().CacheFile_Path}/presettext/EditStrings.json`,
        'utf8'
      );
      this.presetText = JSON.parse(presetText).Template;
    },
  },
});
