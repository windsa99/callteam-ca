"""Validate the delivered ZIP/PDF/CSV and native XLSX structures without modifying them."""
import csv,io,json,zipfile,xml.etree.ElementTree as ET
from pathlib import Path
from pypdf import PdfReader
root=Path(__file__).resolve().parents[1]
assets=root/'src/assets/downloads'; stem='CallTeam-B2B-Cold-Calling-Starter-Kit'
ns={'s':'http://schemas.openxmlformats.org/spreadsheetml/2006/main'}
with zipfile.ZipFile(assets/(stem+'.xlsx')) as x:
    assert x.testzip() is None
    assert not any('vbaProject' in n or '/externalLinks/' in n for n in x.namelist())
    book=ET.fromstring(x.read('xl/workbook.xml'))
    assert [s.attrib['name'] for s in book.findall('s:sheets/s:sheet',ns)]==['Campaign Brief','Script Worksheet','Call Tracker','Worked Example']
    tracker=ET.fromstring(x.read('xl/worksheets/sheet3.xml'))
    formulas={c.attrib['r']:c.find('s:f',ns).text for c in tracker.findall('.//s:c',ns) if c.find('s:f',ns) is not None}
    assert formulas=={'B6':'COUNTA(G11:G210)','E6':'COUNTIF(G11:G210,"Meeting booked")','H6':'COUNTIF(G11:G210,"Callback agreed")','K6':'COUNTIF(G11:G210,"Do not contact")'}
    validation=tracker.find('s:dataValidations/s:dataValidation',ns)
    assert validation.attrib['sqref']=='G11:G210' and validation.attrib['type']=='list'
    assert 'Do not contact' in validation.find('s:formula1',ns).text
    pane=tracker.find('s:sheetViews/s:sheetView/s:pane',ns)
    assert pane.attrib['ySplit']=='10'
    for cell in tracker.findall('.//s:c',ns):
        row=int(''.join(filter(str.isdigit,cell.attrib['r'])))
        if row>=11: assert cell.find('s:v',ns) is None and cell.find('s:is',ns) is None,'Tracker input data was not cleared'
    assert not tracker.findall('.//s:c[@t="e"]',ns)
    for sheet,first,last in [(1,7,15),(2,7,14)]:
        doc=ET.fromstring(x.read(f'xl/worksheets/sheet{sheet}.xml'))
        for row in range(first,last+1):
            node=doc.find(f'.//s:c[@r="B{row}"]',ns)
            assert node is None or (node.find('s:v',ns) is None and node.find('s:is',ns) is None)
pdf=PdfReader(assets/(stem+'.pdf'))
assert len(pdf.pages)==3
text=' '.join(page.extract_text() for page in pdf.pages)
for value in ['Campaign Brief','Script Worksheet','Call Tracker','Worked Example','fictional','200','Contact ID','Harj Singh']:
    assert value.lower() in text.lower()
for page in pdf.pages:
    assert float(page.mediabox.width)==612 and float(page.mediabox.height)==792
    assert len(page.extract_text())>600
rows=list(csv.reader(io.StringIO((assets/'CallTeam-Cold-Call-Tracker.csv').read_text())))
assert len(rows)==1 and len(rows[0])==11 and rows[0][1]=='Contact ID'
with zipfile.ZipFile(assets/(stem+'.zip')) as z:
    assert z.testzip() is None
    assert sorted(z.namelist())==sorted([stem+'.xlsx',stem+'.pdf','CallTeam-Cold-Call-Tracker.csv','README.txt'])
    for name in [stem+'.xlsx',stem+'.pdf','CallTeam-Cold-Call-Tracker.csv']:assert z.read(name)==(assets/name).read_bytes()
    assert b'fictional' in z.read('README.txt')
print(json.dumps({'passed':True,'workbookSheets':4,'blankTrackerRows':200,'summaryFormulas':4,'outcomeDropdown':True,'frozenTrackerHeaders':True,'pdfPages':3,'csvColumns':11,'zipContentsMatchDownloads':True,'macrosOrExternalWorkbookLinks':False},indent=2))
