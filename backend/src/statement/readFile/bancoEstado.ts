import { read, utils } from "xlsx";


// TODO: Define a reusable format for handling transactions.
// Each bank may have different formats for these fields, so the goal is to establish a unified structure.
// All bank-specific formats should be parsed and mapped to this common structure.
export function extractBancoEstadoTransactions(file: Express.Multer.File) {
    const workbook = read(file.buffer, { type: 'buffer' });

    // Assuming "Detalles de movimientos" is in the first sheet
    const sheetName = workbook.SheetNames[0];
    const worksheet = utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1 });
    // Find the index where "Detalle de Movimientos" starts
    const headerIndex = worksheet.findIndex((row: any[]) => row.includes('Detalle de Movimientos'));

    let movimientos: any[] = [];

    if (headerIndex !== -1) {
      // Extract the row with headers (next row after "Detalle de Movimientos")
      const headers = worksheet[headerIndex + 1] as string[];

      // Extract the rows starting from the next row after headers
      movimientos = worksheet.slice(headerIndex + 2).filter((row: any[]) => row.length && row[0] !== 'Notas:');

      // Format the movimientos as objects with headers as keys
      return movimientos.map((row: any[]) => {
        return headers.reduce((obj, header, index) => {
          obj[header] = row[index] || null; // Handle empty cells as null
          if ( obj[header] && header === 'Saldo' ) {
            obj[header] = parseInt(obj[header].replace('.', ''))
          }
          // TODO parse date
          return obj;
        }, {});
      });
    }
}