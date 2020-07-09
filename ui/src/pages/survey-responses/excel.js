import Excel from 'exceljs/dist/es5/exceljs.browser';
import { saveAs } from 'file-saver'

const saveFile = async (fileName, workbook) => {
    const xls64 = await workbook.xlsx.writeBuffer({ base64: true })
    saveAs(
      new Blob([xls64], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }),
      fileName
    )
};

const writeXlsx = (data) => {
	const workbook = new Excel.Workbook();
    const worksheet = workbook.addWorksheet('Responses');
	worksheet.columns = data.headers;
	worksheet.getRow(1).font = { bold: true };

	worksheet.addRows(data.rows);

    saveFile(`${data.surveyName}.xlsx` || 'data.xlsx', workbook);
};

export { writeXlsx };