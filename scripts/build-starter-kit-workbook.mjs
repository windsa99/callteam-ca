// Run from an OS temp directory linked to the Codex primary runtime modules.
import fs from 'node:fs/promises';
import path from 'node:path';
import { createRequire } from 'node:module';
import assert from 'node:assert/strict';
import { Workbook, SpreadsheetFile } from '@oai/artifact-tool';
const require = createRequire(import.meta.url);
const root = process.argv[2], output = process.argv[3];
assert(path.isAbsolute(root) && path.isAbsolute(output));
const kit = require(path.join(root, 'src/_data/starterKit.js'));
await fs.mkdir(output, {recursive:true});
const wb = Workbook.create();
const orange='#FF5A1F', paper='#F5F4F2', line='#DEDAD3', ink='#111111', muted='#56534E';

function base(name, title, note, columns) {
  const s=wb.worksheets.add(name);
  s.showGridLines=false; s.tabColor=orange;
  const area=s.getRange(columns===11?'A1:K210':'A1:C20');
  area.format.font={name:'Arial',size:11,color:ink};
  area.format.verticalAlignment='center';
  s.getRange('A1').values=[['CALLTEAM']];
  s.getRange('A1').format.font={name:'Arial',size:10,bold:true,color:orange};
  s.getRange('A2').values=[[title]];
  s.getRange('A2').format.font={name:'Arial',size:16,bold:true,color:ink};
  s.getRange('A2:C2').format.rowHeight=30;
  s.getRange('A3').values=[[note]];
  s.getRange('A3').format.font={name:'Arial',size:10,italic:true,color:muted};
  s.getRange(columns===11?'A4:K4':'A4:C4').format.borders={bottom:{style:'medium',color:orange}};
  return s;
}
function form(name,title,note,fields) {
  const s=base(name,title,note,3);
  s.getRange('A1:A20').format.columnWidth=28;
  s.getRange('B1:B20').format.columnWidth=70;
  s.getRange('C1:C20').format.columnWidth=63;
  s.getRange('A6:C6').values=[['Field','Your input','Prompt']];
  s.getRange('A6:C6').format={fill:ink,font:{name:'Arial',size:11,bold:true,color:'#FFFFFF'},horizontalAlignment:'center',rowHeight:29};
  fields.forEach(([label,prompt],i)=>{
    const row=i+7;
    s.getRange(`A${row}:C${row}`).values=[[label,null,prompt]];
    s.getRange(`A${row}:C${row}`).format={rowHeight:58,wrapText:true,verticalAlignment:'center'};
    s.getRange(`A${row}`).format.font={name:'Arial',size:11,bold:true,color:ink};
    s.getRange(`B${row}`).format.fill=paper;
    s.getRange(`C${row}`).format.font={name:'Arial',size:10,color:muted};
    s.getRange(`A${row}:C${row}`).format.borders={bottom:{style:'thin',color:line}};
  });
  return s;
}
form('Campaign Brief','Campaign Brief','Fill the shaded cells before preparing your calling list.',kit.brief);
form('Script Worksheet','Script Worksheet','Draft the conversation, then practise it with your team.',kit.worksheet);
const tracker=base('Call Tracker','Call Tracker','One row per call attempt. Reuse the Contact ID for repeat calls.',11);
const widths=[15,17,26,23,22,22,23,36,15,20,45];
widths.forEach((width,i)=>tracker.getRangeByIndexes(0,i,210,1).format.columnWidth=width);
for (const [labelCell,label,valueCell,formula] of [
  ['A6','Calls logged','B6','=COUNTA(G11:G210)'],
  ['D6','Meetings booked','E6','=COUNTIF(G11:G210,"Meeting booked")'],
  ['G6','Callbacks agreed','H6','=COUNTIF(G11:G210,"Callback agreed")'],
  ['J6','Do not contact','K6','=COUNTIF(G11:G210,"Do not contact")']
]) {
  tracker.getRange(labelCell).values=[[label]];
  tracker.getRange(labelCell).format.font={name:'Arial',size:11,bold:true,color:ink};
  tracker.getRange(valueCell).formulas=[[formula]];
  tracker.getRange(valueCell).format={fill:paper,numberFormat:'0',font:{name:'Arial',size:14,bold:true,color:ink},horizontalAlignment:'right',rowHeight:32};
}
tracker.getRange('A8').values=[['Counts outcome entries in rows 11 to 210, not unique prospects. Select the most specific outcome for each attempt.']];
tracker.getRange('A9').values=[['Extend the summary ranges if you add rows. Honour contact preferences and stop further outreach when requested.']];
tracker.getRange('A8:A9').format.font={name:'Arial',size:10,color:muted};
tracker.getRange('A10:K10').values=[kit.trackerHeaders];
tracker.getRange('A10:K10').format={fill:ink,font:{name:'Arial',size:11,bold:true,color:'#FFFFFF'},horizontalAlignment:'center',rowHeight:35,wrapText:true};
tracker.getRange('A11:K210').format={rowHeight:31,verticalAlignment:'center',wrapText:true};
tracker.getRange('A11:A210').setNumberFormat('yyyy-mm-dd');
tracker.getRange('I11:I210').setNumberFormat('yyyy-mm-dd');
tracker.getRange('B11:B210').setNumberFormat('@');
tracker.getRange('F11:F210').setNumberFormat('@');
tracker.getRange('G11:G210').dataValidation={rule:{type:'list',values:kit.outcomes}};
tracker.tables.add('A10:K210',true,'CallingLog').style='TableStyleLight1';
tracker.freezePanes.freezeRows(10);
const example=base('Worked Example','Worked Example','Fictional ERP campaign. Illustrates the documents, not campaign performance.',3);
example.tabColor=ink;
example.getRange('A1:A20').format.columnWidth=28;
example.getRange('B1:B20').format.columnWidth=70;
example.getRange('C1:C20').format.columnWidth=63;
example.getRange('A6:C6').values=[['Field','Completed example','How to adapt it']];
example.getRange('A6:C6').format={fill:ink,font:{name:'Arial',size:11,bold:true,color:'#FFFFFF'},horizontalAlignment:'center',rowHeight:30};
kit.example.rows.forEach((row,i)=>{
  const n=i+7;
  example.getRange(`A${n}:C${n}`).values=[row];
  example.getRange(`A${n}:C${n}`).format={rowHeight:n===11?110:68,wrapText:true,verticalAlignment:'center',borders:{bottom:{style:'thin',color:line}}};
  example.getRange(`A${n}`).format.font={name:'Arial',size:11,bold:true,color:ink};
  example.getRange(`B${n}`).format.fill=paper;
  example.getRange(`C${n}`).format.font={name:'Arial',size:10,color:muted};
});
example.getRange('A19').values=[['Source resources: CallTeam ERP guide and ERP cold-call script.']];
example.getRange('A20').values=[['https://www.callteam.ca/resources/cold-call-scripts/erp-modernization-cold-call-script-for-cfos/']];
example.getRange('A19:A20').format.font={name:'Arial',size:10,color:muted};

// Exercise input changes, including blank rows and the final supported row.
const checkCells=['B6','E6','H6','K6'];
function counters(){return checkCells.map(cell=>Number(tracker.getRange(cell).values[0][0]));}
const results=[];
function scenario(name,items,expected){
  tracker.getRange('A11:K210').clear({applyTo:'contents'});
  for(const [row,outcome,id] of items) {
    tracker.getRange(`A${row}`).values=[[new Date('2026-10-25T12:00:00Z')]];
    tracker.getRange(`B${row}`).values=[[id]];
    tracker.getRange(`G${row}`).values=[[outcome]];
  }
  wb.recalculate();
  assert.deepEqual(counters(),expected,name);
  results.push({name,expected,actual:counters(),passed:true});
}
scenario('Blank tracker',[],[0,0,0,0]);
scenario('Unanswered call',[[11,'No answer','P001']],[1,0,0,0]);
scenario('Repeat calls retain the contact ID',[[11,'No answer','P001'],[12,'Callback agreed','P001'],[13,'Meeting booked','P001']],[3,1,1,0]);
scenario('Stop request is counted separately',[[11,'Do not contact','P002'],[12,'Not a fit','P003']],[2,0,0,1]);
scenario('Final prepared row is included',[[210,'Meeting booked','P200']],[1,1,0,0]);
tracker.getRange('A11:K210').clear({applyTo:'contents'});
wb.recalculate();
assert.deepEqual(counters(),[0,0,0,0]);
const scan=await wb.inspect({kind:'match',searchTerm:'#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A|#NUM!|#NULL!|#SPILL!|#CALC!',options:{useRegex:true,maxResults:20},summary:'Final formula error scan',maxChars:2000});
await fs.writeFile(path.join(output,'formula-scan.ndjson'),scan.ndjson);
for(const [sheetName,range,filename] of [
 ['Campaign Brief','A1:C15','campaign-brief.png'],
 ['Script Worksheet','A1:C14','script-worksheet.png'],
 ['Call Tracker','A1:K15','call-tracker.png'],
 ['Worked Example','A1:C16','worked-example.png'],
 ['Worked Example','A6:B11','website-preview.png']
]) {
  const blob=await wb.render({sheetName,range,scale:1.5,format:'png'});
  await fs.writeFile(path.join(output,filename),new Uint8Array(await blob.arrayBuffer()));
}
const exported=await SpreadsheetFile.exportXlsx(wb);
await exported.save(path.join(root,'src/assets/downloads/CallTeam-B2B-Cold-Calling-Starter-Kit.xlsx'));
const sidecar=path.join(root,'src/assets/downloads/CallTeam-B2B-Cold-Calling-Starter-Kit.xlsx.inspect.ndjson');
try { await fs.rename(sidecar,path.join(output,'workbook-export-inspect.ndjson')); } catch(error) { if(error.code!=='ENOENT') throw error; }
await fs.copyFile(path.join(output,'website-preview.png'),path.join(root,'src/assets/images/cold-calling-starter-kit-preview.png'));
await fs.writeFile(path.join(output,'workbook-validation.json'),JSON.stringify({passed:true,scenarios:results,deliveredTrackerBlank:true,summaryCounts:[0,0,0,0]},null,2));
await fs.writeFile(path.join(output,'kit-data.json'),JSON.stringify(kit,null,2));
console.log(JSON.stringify({created:true,sheets:4,trackerRows:200,scenarios:results.length,restoredBlank:true,output}));
