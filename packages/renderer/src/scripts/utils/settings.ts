import { STORE_Setting } from '../../store/modules/setting';

//设置剪贴板相关设置的上限
export const handleChange_num = (val: String, max: number) => {
  const _str = val.replace(/[^0-9.]/g, '');
  const final_num = Number(_str) > max ? max : Number(_str);
  switch (max) {
    case 200:
      STORE_Setting().Change_clipboard_num(final_num);
      break;
    case 600:
      STORE_Setting().Change_clipboard_textlength(final_num);
      break;
    case 9999:
      STORE_Setting().Change_org_code(final_num);
      break;
  }
};

export const handleChange_Text = (val: string) => {
  const _str = val.replace(/[^\u4e00-\u9fa5]/g, '');
  return _str;
};
