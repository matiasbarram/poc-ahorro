// Define the enum for bank names
export enum BankEnum {
    BANCO_ESTADO = 'bancoEstado',
    BICE = 'bice',
    SANTANDER = 'santander'
  }
  
  // Define the type for Banks based on the enum
  export type Banks = `${BankEnum}`;
  
  // Define the interface for bank data
  export interface BankData {
    fileTypes: string[];
  }
  
  // Create a function to generate BANK_FILE_TYPES
  function generateBankFileTypes(): Record<Banks, BankData> {
    return Object.values(BankEnum).reduce((acc, bank) => {
      acc[bank] = {
        fileTypes: bank === BankEnum.BANCO_ESTADO ? ['spreadsheetml'] : ['']
      };
      return acc;
    }, {} as Record<Banks, BankData>);
  }
  
  // Generate BANK_FILE_TYPES
  export const BANK_FILE_TYPES: Record<Banks, BankData> = generateBankFileTypes();
  
  // Generate BANKS array
  export const BANKS: Banks[] = Object.values(BankEnum) as Banks[];
  
  // Type guard function to check if a string is a valid bank
  export function isValidBank(bank: string): bank is Banks {
    return Object.values(BankEnum).includes(bank as BankEnum);
  }