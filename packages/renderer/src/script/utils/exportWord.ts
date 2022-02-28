/**
 * @param exportRow  导出数据{}
 * @param template  模板位置
 * @param outputFilename  输出文件名
 */

import docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import JSZipUtils from "jszip-utils";
import { saveAs } from "file-saver";

interface error {
  message: string;
  name: string;
  stack: any;
  properties: any;
}

export function exportWord(
  template: string,
  exportRow: any,
  outputFilename: string
) {
  JSZipUtils.getBinaryContent(template, (error: error, content: string) => {
    if (error) {
      console.error(error, "error");
      return;
    }
    var opts: any = {};
    opts.centered = false;

    var zip = new PizZip(content);
    var doc = new docxtemplater().loadZip(zip).compile();

    for (let key in exportRow) {
      const lines = exportRow[key].split("\n");
      if (lines.length > 2) {
        const pre = "<w:p><w:r><w:t>";
        const post = "</w:t></w:r></w:p>";
        const lineBreak = "<w:br/>";
        exportRow[key] = pre + lines.join(lineBreak) + post;
      }
    }

    doc
      .resolveData(exportRow)
      .then(() => {
        doc.render();
        var out = doc.getZip().generate({
          type: "blob",
          mimeType:
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        });
        saveAs(out, outputFilename + ".docx");
      })
      .catch((error) => {
        const e = {
          message: error.message,
          name: error.name,
          stack: error.stack,
          properties: error.properties,
        };
        console.log(error);
        throw error; // 抛出异常
      });
  });
}
