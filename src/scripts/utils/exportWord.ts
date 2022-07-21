import {
  AlignmentType,
  DocumentGridType,
  Document,
  HeadingLevel,
  Packer,
  Paragraph,
  TextRun,
  PageNumber,
  NumberFormat,
  convertMillimetersToTwip,
  Footer,
} from 'docx';
import { STORE_Setting } from '/store/modules/setting';
import { isFileExisted_And_Export, mkdirsSync } from './handlefiles';
import Msg from './message';

/**
 *
 * @param lx 文书类型：（民事、刑事、行政）判决书、裁定书
 * @param ah 案号
 * @param zw 主文
 * @param hytrq 合议庭
 * @param fgzl 法官助理及书记员
 */

export const exportWord = async (
  lx: string,
  ah: string,
  zw: string,
  hytrq: string,
  fgzl: string
) => {
  const doc = new Document({
    creator: 'ZiGma',
    title: 'Export Document',
    description: 'A docx export from DOX',
    styles: {
      paragraphStyles: [
        {
          id: 'Heading1',
          name: 'Heading 1',
          basedOn: 'Normal',
          next: 'Normal',
          quickFormat: true,
          run: {
            size: 44,
            font: { eastAsia: '方正小标宋简体' },
          },
          paragraph: {
            spacing: {
              line: 1 * 240,
            },
            alignment: AlignmentType.DISTRIBUTE,
          },
        },
        {
          id: 'Heading2',
          name: 'Heading 2',
          basedOn: 'Normal',
          next: 'Normal',
          quickFormat: true,
          run: {
            size: 52,
            font: {
              ascii: '华文中宋',
              eastAsia: '华文中宋',
            },
            bold: true,
            characterSpacing: 120,
          },
          paragraph: {
            spacing: {
              line: 1 * 240,
            },
            alignment: AlignmentType.CENTER,
          },
        },
        {
          id: 'righttext',
          name: 'righttext',
          basedOn: 'Normal',
          next: 'Normal',
          run: {
            size: 32,
            font: {
              ascii: '仿宋_GB2312',
              eastAsia: '仿宋_GB2312',
              cs: '仿宋_GB2312',
              hAnsi: '仿宋_GB2312',
            },
          },
          paragraph: {
            spacing: {
              line: 1 * 240,
            },
            alignment: AlignmentType.RIGHT,
          },
        },
        {
          id: 'maintext',
          name: 'maintext',
          basedOn: 'Normal',
          next: 'Normal',
          run: {
            size: 32,
            font: {
              ascii: '仿宋_GB2312',
              eastAsia: '仿宋_GB2312',
              cs: '仿宋_GB2312',
              hAnsi: '仿宋_GB2312',
            },
          },
          paragraph: {
            indent: {
              firstLine: 640,
            },
            spacing: {
              line: 1 * 240,
            },
            alignment: AlignmentType.JUSTIFIED,
          },
        },
        {
          id: 'indent0text',
          name: 'indent0text',
          basedOn: 'Normal',
          next: 'Normal',
          run: {
            size: 32,
            font: {
              ascii: '仿宋_GB2312',
              eastAsia: '仿宋_GB2312',
              cs: '仿宋_GB2312',
              hAnsi: '仿宋_GB2312',
            },
          },
          paragraph: {
            spacing: {
              line: 1 * 240,
            },
            alignment: AlignmentType.LEFT,
          },
        },
        {
          id: 'pagenumber',
          name: 'pagenumber',
          basedOn: 'Normal',
          next: 'Normal',
          run: {
            size: 18,
            font: {
              ascii: '仿宋_GB2312',
              eastAsia: '仿宋_GB2312',
              cs: '仿宋_GB2312',
              hAnsi: '仿宋_GB2312',
            },
          },
        },
      ],
    },
    sections: [
      {
        properties: {
          page: {
            //页边距
            margin: {
              top: convert_mm2twip(25.4),
              bottom: convert_mm2twip(25.4),
              left: convert_mm2twip(31.8),
              right: convert_mm2twip(31.8),
            },
            //页码
            pageNumbers: {
              start: 1,
              formatType: NumberFormat.DECIMAL,
            },
          },
          //行距网格
          grid: {
            linePitch: 312,
            type: DocumentGridType.LINES,
          },
        },
        footers: {
          default: new Footer({
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                style: 'pagenumber',
                children: [
                  new TextRun({
                    children: [PageNumber.CURRENT],
                  }),
                ],
              }),
            ],
          }),
        },
        children: [
          new Paragraph({
            text: '浙江省杭州市中级人民法院',
            heading: HeadingLevel.HEADING_1,
          }),
        ],
      },
    ],
  });

  //添加类型以及空格
  const f_lx = lx.split('').join('  ').toString();

  doc.Document.View.Body.addChildElement(
    new Paragraph({
      text: f_lx,
      heading: HeadingLevel.HEADING_2,
    })
  );

  doc.Document.View.Body.addChildElement(
    new Paragraph({
      text: '',
      style: 'maintext',
    })
  );

  //添加案号
  doc.Document.View.Body.addChildElement(
    new Paragraph({
      text: ah,
      style: 'righttext',
    })
  );

  //添加主文
  const arr_zw = zw.split('\n');
  arr_zw.forEach(text => {
    doc.Document.View.Body.addChildElement(
      new Paragraph({
        text: text,
        style: 'maintext',
      })
    );
  });

  //添加合议庭+日期
  const arr_hytrq = hytrq.split('\n');
  arr_hytrq.forEach(text => {
    doc.Document.View.Body.addChildElement(
      new Paragraph({
        text: text,
        style: 'righttext',
      })
    );
  });

  //添加核对信息
  const arr_hd = ['本件与原本核对无异', ''];
  arr_hd.forEach(text => {
    doc.Document.View.Body.addChildElement(
      new Paragraph({
        text: text,
        style: 'indent0text',
      })
    );
  });

  //添加法官助理、书记员信息
  const arr_fgzl = fgzl.split('\n');
  arr_fgzl.forEach(text => {
    doc.Document.View.Body.addChildElement(
      new Paragraph({
        text: text,
        style: 'righttext',
      })
    );
  });

  Packer.toBlob(doc).then(async blob => {
    let Path = STORE_Setting().exportfile_path;
    let Name = `${ah}.${STORE_Setting().export_format}`;

    //判断是否需要按年度、案号分类
    const year_bool = STORE_Setting().class_year_bool;
    const caseid_bool = STORE_Setting().class_caseid_bool;

    if (year_bool || caseid_bool) {
      //年度文件夹路径节点
      const now_year = new Date().getFullYear();
      const ah_year = ah.match(/(?<=（)\d{4}(?=）)/g);
      const final_year =
        (STORE_Setting().class_year_type == '案号年度' ? ah_year : now_year) + '年案件';
      const y_path = year_bool ? '/' + final_year : '';

      //案件文件夹路径节点
      const c_path = caseid_bool ? '/' + ah : '';

      Path = Path + y_path + c_path + '/';
      mkdirsSync(Path);
    }

    const result: string[] | undefined = await isFileExisted_And_Export(blob, Path, Name);

    if (result) {
      Msg(Name + '导出' + result[1], result[0]);
    }
  });
};

function convert_mm2twip(mm: number) {
  return convertMillimetersToTwip(mm);
}
