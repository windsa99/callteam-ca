"""Build the kit's printable quick-start guide and package the static downloads."""
import csv
import io
import json
from pathlib import Path
import sys
import zipfile
from xml.sax.saxutils import escape
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_LEFT
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak, Table, TableStyle, KeepTogether
from reportlab.lib.utils import ImageReader
from reportlab import rl_config

# Keep compressed PDF streams binary rather than wrapping them in ASCII85.
rl_config.useA85 = False

repo=Path(sys.argv[1]); qa=Path(sys.argv[2])
kit=json.loads((qa/'kit-data.json').read_text())
directory=repo/'src/assets/downloads'
stem='CallTeam-B2B-Cold-Calling-Starter-Kit'
pdf=directory/(stem+'.pdf')
orange=colors.HexColor('#FF5A1F'); ink=colors.HexColor('#111111'); paper=colors.HexColor('#F5F4F2'); muted=colors.HexColor('#55534E')
styles=getSampleStyleSheet()
styles.add(ParagraphStyle(name='CTTitle',fontName='Helvetica-Bold',fontSize=28,leading=31,textColor=ink,spaceAfter=16))
styles.add(ParagraphStyle(name='CTHeading',fontName='Helvetica-Bold',fontSize=15,leading=19,textColor=ink,spaceBefore=17,spaceAfter=9))
styles.add(ParagraphStyle(name='CTBody',fontName='Helvetica',fontSize=10,leading=15,textColor=ink,spaceAfter=9))
styles.add(ParagraphStyle(name='CTSmall',fontName='Helvetica',fontSize=8.5,leading=12,textColor=muted,spaceAfter=7))
styles.add(ParagraphStyle(name='CTLabel',fontName='Helvetica-Bold',fontSize=8,leading=12,textColor=muted,spaceAfter=9))
styles.add(ParagraphStyle(name='CTQuote',fontName='Helvetica',fontSize=12,leading=19,textColor=ink,spaceAfter=0))
def p(text,style='CTBody'): return Paragraph(text,styles[style])
def plain(text,style='CTBody'): return p(escape(text),style)
def link(label,url): return '<link href="'+url+'" color="#111111"><u>'+label+'</u></link>'
def header(canvas,doc):
    canvas.saveState()
    canvas.drawImage(ImageReader(str(repo/'src/assets/images/callteam-logo.png')),48,738,width=125,height=25.63,mask='auto')
    canvas.setStrokeColor(orange); canvas.setLineWidth(1.4);canvas.line(48,725,564,725)
    canvas.setFont('Helvetica',8);canvas.setFillColor(muted)
    canvas.drawString(48,31,'CallTeam | Free B2B Cold Calling Starter Kit | October 2026')
    canvas.drawRightString(564,31,str(doc.page));canvas.restoreState()
doc=SimpleDocTemplate(str(pdf),pagesize=(612,792),rightMargin=48,leftMargin=48,topMargin=83,bottomMargin=52,title='CallTeam B2B Cold Calling Starter Kit',author='Harj Singh, CallTeam')
story=[]
story += [p('FREE B2B COLD CALLING STARTER KIT','CTLabel'),p('Prepare the campaign.<br/>Keep the next action clear.','CTTitle'),p('Use the workbook to agree your target buyer, prepare the conversation and record follow-up. The working sheets start blank. A separate fictional example shows how to complete them.')]
for title,body in [
('Campaign Brief','Complete the nine fields before calling. Agree the offer, companies, buyer roles, evidence, exclusions, meeting standard and sales handoff.'),
('Script Worksheet','Draft the eight conversation prompts. Use a relevant library script as a starting point, then practise the wording and likely responses.'),
('Call Tracker','Log each call attempt. Choose an outcome, set the next action and name its owner. Keep the same Contact ID when calling that person again.'),
('Worked Example','Follow the fictional ERP campaign on the next page. Replace its offer, buyer and assumptions with your own approved information.')]:
    story += [p(title,'CTHeading'),p(body)]
story += [Spacer(1,14),p('Choose the file that fits your workflow.','CTHeading'),p('<b>XLSX:</b> four working sheets, outcome dropdowns and summary counts.<br/><b>CSV:</b> a plain call log with the same eleven columns.<br/><b>PDF:</b> these short instructions and the completed example.'),p('Prepared by Harj Singh. '+link('Meet the writer and sales practitioner','https://www.callteam.ca/authors/harj-singh/')+'.','CTSmall')]
story += [PageBreak(),p('COMPLETED EXAMPLE / FICTIONAL ERP CAMPAIGN','CTLabel'),p('A conversation about<br/>the reporting workflow.','CTTitle'),plain('Buyer: '+kit['example']['buyer']),plain('Offer: '+kit['example']['offer']),plain(kit['example']['hypothesis'])]
box=Table([[plain(kit['example']['opening'],'CTQuote')]],colWidths=[516])
box.setStyle(TableStyle([('BACKGROUND',(0,0),(-1,-1),paper),('LEFTPADDING',(0,0),(-1,-1),17),('RIGHTPADDING',(0,0),(-1,-1),17),('TOPPADDING',(0,0),(-1,-1),15),('BOTTOMPADDING',(0,0),(-1,-1),15),('LINEBEFORE',(0,0),(0,-1),2.2,orange)]))
story += [Spacer(1,6),box,p('Explore the answer','CTHeading'),plain(kit['example']['question']),p('If the buyer already has an ERP','CTHeading'),plain(kit['example']['response']),p('Propose a focused next conversation','CTHeading'),plain(kit['example']['meeting']),plain(kit['example']['handoff'],'CTSmall'),p('Use a closer starting point','CTHeading'),p(link('ERP cold-call script','https://www.callteam.ca/resources/cold-call-scripts/erp-modernization-cold-call-script-for-cfos/')+'<br/>'+link('ERP outbound sales playbook','https://www.callteam.ca/articles/erp-lead-generation-outbound-sales-playbook/'),'CTSmall')]
story += [PageBreak(),p('CALL TRACKER / RECORDKEEPING','CTLabel'),p('Make every follow-up<br/>easy to find.','CTTitle'),p('Enter one row per call attempt. Reuse the Contact ID across attempts so the history stays connected. Choose the most specific outcome, then record the next action, due date and owner.')]
explanations=[('Call date','The date you made the attempt.'),('Contact ID','Your stable identifier for the person.'),('Company, name and role','The account and person you tried to reach.'),('Phone','The number dialled. Keep phone values as text.'),('Outcome','Choose one of the seven defined outcomes.'),('Next action','The specific task agreed or planned.'),('Due date and owner','When the next action belongs and who owns it.'),('Notes','Useful context from the call, including any contact preference.')]
table=Table([[plain(a,'CTSmall'),plain(b,'CTSmall')] for a,b in explanations],colWidths=[142,374])
table.setStyle(TableStyle([('VALIGN',(0,0),(-1,-1),'TOP'),('LEFTPADDING',(0,0),(-1,-1),0),('RIGHTPADDING',(0,0),(-1,-1),12),('TOPPADDING',(0,0),(-1,-1),7),('BOTTOMPADDING',(0,0),(-1,-1),5),('LINEBELOW',(0,0),(-1,-1),.4,colors.HexColor('#DEDAD3'))]))
story += [table,p('Keep the outcome choices consistent','CTHeading'),plain(', '.join(kit['outcomes'])+'.'),p('The summary counts outcome entries in the 200 prepared rows, not unique prospects. Calls logged counts rows with an outcome. The other totals count Meeting booked, Callback agreed and Do not contact. Extend the summary ranges if you add rows.','CTSmall'),p('Open the XLSX in Excel. For Google Sheets, import the workbook and check the dropdowns and summary counts. The CSV contains no formulas or dropdowns.','CTSmall'),p(link('Explore all 100 free scripts','https://www.callteam.ca/resources/cold-call-scripts/')+' | '+link('Discuss a calling campaign','https://calendly.com/hello-callteam/new-meeting'),'CTSmall')]
doc.build(story,onFirstPage=header,onLaterPages=header)
buffer=io.StringIO(newline='');writer=csv.writer(buffer,lineterminator='\n');writer.writerow(kit['trackerHeaders'])
csv_path=directory/'CallTeam-Cold-Call-Tracker.csv';csv_path.write_text(buffer.getvalue())
readme='''CALLTEAM B2B COLD CALLING STARTER KIT

Start in Campaign Brief, then complete Script Worksheet. Log each call attempt in Call Tracker. Worked Example is fictional and illustrates how to complete the documents.

The workbook has 200 prepared log rows. Summary formulas count outcome entries, not unique prospects. Extend the formula ranges when adding rows. Use the same Contact ID for repeat calls. Honour contact preferences.

XLSX: editable workbook, dropdowns and summary counts.
PDF: three-page quick-start guide and fictional example.
CSV: blank call log without formulas or dropdowns.

The 100 full scripts are online: https://www.callteam.ca/resources/cold-call-scripts/
Campaign Preview: https://www.callteam.ca/b2b-outbound-campaign-planner/
Script Checker: https://www.callteam.ca/cold-call-script-checker/
Book a strategy call: https://calendly.com/hello-callteam/new-meeting

Free to use and adapt for your business. Version: 2026-10-25.
'''
with zipfile.ZipFile(directory/(stem+'.zip'),'w',compression=zipfile.ZIP_DEFLATED) as z:
    for filename in [stem+'.xlsx',stem+'.pdf',csv_path.name]: z.write(directory/filename,arcname=filename)
    z.writestr('README.txt',readme)
print(json.dumps({'pdf':str(pdf),'zip':str(directory/(stem+'.zip')),'csv':str(csv_path)}))
