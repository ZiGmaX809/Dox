import { STORE_Setting } from '/store/modules/setting';

//设置剪贴板相关设置的上限
export const handleChange_num = (val: number, max: number) => {
  const input_num = Number(val.toString().replace(/[^\d]/g, ''));
  const result_num = input_num > max ? max : input_num ;
  return result_num;
};

export const handleChange_Text = (val: string) => {
  const _str = val.replace(/[^\u4e00-\u9fa5]/g, '');
  return _str;
};
