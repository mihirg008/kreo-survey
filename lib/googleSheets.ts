import { GoogleSpreadsheet } from "google-spreadsheet"

const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_ID
const CLIENT_EMAIL = process.env.GOOGLE_SHEETS_CLIENT_EMAIL
const PRIVATE_KEY = process.env.GOOGLE_SHEETS_PRIVATE_KEY

let doc: GoogleSpreadsheet

async function getDoc() {
  if (!doc) {
    doc = new GoogleSpreadsheet(SPREADSHEET_ID!)
    doc.useServiceAccountAuth({
      client_email: CLIENT_EMAIL!,
      private_key: PRIVATE_KEY!.replace(/\\n/g, "\n"),
    })
    await doc.loadInfo()
  }
  return doc
}

export async function saveSectionData(email: string, sectionName: string, data: any) {
  const doc = await getDoc()
  const sheet = doc.sheetsByTitle["Survey Responses"]
  if (!sheet) {
    throw new Error("Survey Responses sheet not found")
  }

  const timestamp = new Date().toISOString()
  const rowData = {
    Email: email,
    Section: sectionName,
    Timestamp: timestamp,
    Data: JSON.stringify(data),
  }

  await sheet.addRow(rowData)
}

export async function getRows(sheetName: string) {
  const doc = await getDoc()
  const sheet = doc.sheetsByTitle[sheetName]
  if (!sheet) {
    throw new Error(`Sheet "${sheetName}" not found`)
  }
  const rows = await sheet.getRows()
  return rows
}

