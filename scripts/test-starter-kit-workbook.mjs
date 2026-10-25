// Import the exported workbook and verify edit/recalculation behaviour.
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { FileBlob, SpreadsheetFile } from '@oai/artifact-tool';
const root=process.argv[2], pass=process.argv[3] || '1';
const wb=await SpreadsheetFile.importXlsx(await FileBlob.load(path.join(root,'src/assets/downloads/CallTeam-B2B-Cold-Calling-Starter-Kit.xlsx')));
const tracker=wb.worksheets.getItem('Call Tracker');
const positions=['B6','E6','H6','K6'];
const values=()=>positions.map(cell=>Number(tracker.getRange(cell).values[0][0]));
const results=[];
for(const [name,items,expected] of [
 ['Blank',[],[0,0,0,0]],
 ['Unanswered call',[[11,'No answer','P001']],[1,0,0,0]],
 ['Repeated contact',[[11,'No answer','P001'],[12,'Callback agreed','P001'],[13,'Meeting booked','P001']],[3,1,1,0]],
 ['Stop request',[[11,'Do not contact','P002'],[12,'Not a fit','P003']],[2,0,0,1]],
 ['Last supported row',[[210,'Meeting booked','P200']],[1,1,0,0]]
]) {
 tracker.getRange('A11:K210').clear({applyTo:'contents'});
 for(const [row,outcome,id] of items) {
   tracker.getRange(`B${row}`).values=[[id]];
   tracker.getRange(`G${row}`).values=[[outcome]];
 }
 wb.recalculate();assert.deepEqual(values(),expected,name);
 results.push({name,actual:values(),passed:true});
}
console.log(JSON.stringify({passed:true,pass,exportedWorkbookReimported:true,scenarios:results,deliveredFileUnmodified:true,engine:'Artifact Tool; native Excel and Google Sheets not exercised'},null,2));
