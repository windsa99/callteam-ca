# LinkedIn automation comparison research B

Verified 8 November 2026. Primary vendor pages only. USD figures below are before tax; annual equivalents require the stated upfront term. Sender totals are arithmetic, not measured capacity. These are research notes for the site owner.

## Recommended monthly comparison rows

| Named configuration | 1 active sender | 3 active senders | 5 active senders | Material boundary |
|---|---:|---:|---:|---|
| Linked Helper Standard, Local storage | $15 | $45 | $75 | Complete LinkedIn sequences and lead CSV export. CRM/webhook sends capped at 20 profiles/day; message-history export requires Pro. [LH2] |
| Linked Helper Pro, Local storage — alternative | $45 | $135 | $225 | Removes the product's advanced-action caps and adds message-history export; desktop/VPS operating cost remains. [LH1–3] |
| STACKED local, Fixed Seats | $55 | $165 | $275 | Desktop execution; shared Team Campaigns available from two fixed seats. [D1,D4] |
| STACKED cloud, Fixed Seats — alternative | $99 | $297 | $495 | Managed cloud execution. [D1,D2] |
| Meet Alfred Multi-Channel | $69 | $207 | $345 | Sender seats with sequences, import/export and integrations; central team controls require Agency. [A1] |
| Meet Alfred Agency — team alternative | $237 minimum | $237 | $395 | Three-seat minimum, including when only one sender is active; collaborative inbox, roles and native HubSpot/Salesforce. [A1,A7] |

Keep PhantomBuster in a separate workspace row: **Start $69/month, Grow $159/month, Scale $439/month**. Shared runtime/slots/credits determine workload. Do not turn its unlimited-user pricing into promised 1/3/5-sender capacity. [P1,P2]

## Linked Helper

### Prices and billing

| Plan/storage | 1-month license | 12-month effective/month | 12-month upfront |
|---|---:|---:|---:|
| Standard Local | $15 | $8.25 | $99 |
| Pro Local | $45 | $24.75 | $297 |
| Standard Cloud storage | $29.90 | $16.50 | $198 |
| Pro Cloud storage | $59.90 | $33 | $396 |

Three- and six-month terms also exist. One license runs one LinkedIn account at a time; it can be reassigned. Managers do not require another sender license. Volume discounts begin at ten licenses, so none applies to the 1/3/5 examples. Auto-renewal is optional and off by default. Standard cannot be upgraded to Pro mid-term. [LH1–3]

### Operation and handoff

- Both storage versions execute on the user's computer or own VPS; that machine must stay on with the app running. The LinkedIn session remains there. Cloud storage adds shared data, automatic backups and incoming webhooks. Local storage requires manual transfers between devices/accounts. Existing workspaces cannot currently switch storage types. [LH1]
- Standard includes unlimited campaigns, multistep messages, reply detection, CSV profile export and native CRM integrations. Its advanced actions, including CRM and webhook sends, are capped at 20/day. Pro adds message-history export and higher credit allowances. LinkedIn account limits still apply to either plan. [LH2]
- Reply handling is configurable: the Check for replies action polls every three hours by default, minimum one hour. A detected reply ends that lead's campaign path. Message actions can check before sending; a final Check for replies step is needed to keep checking after the last message. [LH4]
- Duplicate protection works within a campaign for matching profile IDs. List Manager removes intersections across campaigns; local cross-account prevention requires audience splitting or exchanged exclusion lists. Different LinkedIn IDs for one person can defeat matching. [LH5]
- Workspaces provide role-based account access, client viewers and central license ownership. Cloud storage supplies cross-account lead movement and synchronized CRM/inbox data. Native integrations include HubSpot, Salesforce, Pipedrive, Zoho and Close. Email outreach uses integrations such as Snov.io/Instantly/Apollo. [LH3,LH6]
- Sales Navigator is optional; regular LinkedIn is supported. A separately purchased VPS/proxy or email-outreach service is an additional operating cost when used. [LH1,LH3]

### Credits and practical verdict

One-month Standard/Pro licenses include 620/3,100 Data credits; twelve-month terms include 7,320/36,600. Extra Data packs: 1,000/$15, 5,000/$49, 10,000/$89, 50,000/$284. Data credits do not expire. [LH2,LH1]

AI allowances are issued per license term, not every month: one-month licenses supply 250/500 and twelve-month licenses 1,500/3,000. Extra packs: 2,000/$6, 4,000/$11, 6,000/$15. Purchased AI credits persist; included credits expire with the license. [LH7]

**Assessment:** Standard Local is the strongest low-cost shortlist entry for an operator willing to maintain the runtime. Pro earns its premium when message exports or frequent CRM handoff matter. Cloud storage improves collaboration but still leaves infrastructure with the buyer.

### Sources / short evidence

- **LH1** https://www.linkedhelper.com/pricing — execution, storage, licenses, renewal, feature gates. Excerpt: “Linked Helper is desktop software: it runs on your own computer, or on a VPS you control.” Ref `turn238view0` / `turn268view1`.
- **LH2** https://support.linkedhelper.com/hc/en-us/articles/360016768020-Licensing-Standard-and-PRO-licenses-Pricing-and-discounts — local prices, limits, Data packs. Excerpt: “Messaging history on a Standard license cannot be exported into a CSV file”. Ref `turn237search0` / `turn253search0`. Its opening no-subscription wording is older than the current pricing FAQ, which explicitly permits optional auto-renewal.
- **LH3** https://www.linkedhelper.com/ai-info — official October 12 overview and all four price variants. Excerpt: “One license covers one LinkedIn account.” Ref `turn242view0`. USD explicitly confirmed by the vendor's matching table: https://www.linkedhelper.com/es/ai-info (`turn262search9`).
- **LH4** https://support.linkedhelper.com/hc/en-us/articles/360017905660-Check-for-replies — updated October 5. Excerpt: “By default, Check for profiles action is activated every 3 hours.” Ref `turn266view0`.
- **LH5** https://support.linkedhelper.com/hc/en-us/articles/360015588519-How-to-avoid-duplicates — updated September 27. Excerpt: “Sometimes Linked Helper can collect duplicates”. Ref `turn251search2`.
- **LH6** https://www.linkedhelper.com/features/workspaces — access roles and Cloud DB sharing. Excerpt: “Separate business administration from daily operations.” Ref `turn266view1`.
- **LH7** https://support.linkedhelper.com/hc/en-us/articles/35911233008914-Linked-Helper-AI-credits — allowance/pack details. Excerpt: “credits included with a paid license expire when the license expires.” Ref `turn274view2`.

## STACKED, powered by Dux-Soup

### Current product and costs

The current product has local and cloud deployments. The old Dux-Soup Pro, Turbo and Cloud Chrome extensions are deprecated; the old $14.99 Pro offer should not be the comparison's entry price. Both current deployments use a Windows/macOS desktop application. Local automation needs an awake computer; cloud automation continues on Dux-Soup infrastructure after the computer is off. [D2]

Fixed Seats start at one seat. For 1–10 seats, local is **$55/month or $495/seat/year** ($41.25 effective/month); cloud is **$99/month or $890/seat/year** (displayed as $74.17/month). Use the exact $890 annual invoice, not $74.17 × 12. Canadian buyers fall under the published USD region. Annual 1/3/5 totals: local $495/$1,485/$2,475; cloud $890/$2,670/$4,450. [D1]

Flexible Seats have monthly billing and a prepaid minimum: local ten seats/$412.50; cloud five seats/$371. Additional seats are prorated and billed next invoice at $41.25 local/$74.25 cloud. The cloud table prints $371 for five, so preserve that published package price rather than replacing it with $371.25 arithmetic. The prepaid minimum is owed even when fewer accounts are active. [D3]

### Operation and handoff

- Both deployments include unlimited concurrent drip campaigns, up to twelve campaign actions, delays, reply-stop, CSV export and integrations. Supported platforms include standard LinkedIn, Sales Navigator and Recruiter. CRM/workflow integrations include Salesforce, HubSpot, Pipedrive, Zapier and Make. [D0]
- A paid seat is required for each LinkedIn user; admin-only users and subscription owners can manage without consuming one. [D5]
- Shared Team Campaigns require Fixed plans with at least two seats. They prevent another team member enrolling the same prospect in that Team Campaign. An optional rejection rule extends this check to other team campaigns. All licensed team users can edit/rename shared campaigns; deletion is reserved to admins. [D4]
- Unified Messaging lets administrators read conversation history and send manual replies across selected sessions. The campaign API documentation confirms that a detected LinkedIn reply pauses the prospect's sequence. [D6,D7]
- Address Finder charges one lookup credit per successfully found email for second/third-degree prospects; extra credits are purchased in the STACKED Store. No current public dollar pack price was verified. First-degree emails can be captured when available. [D8]
- Cancellation requires contacting support by email; uninstalling does not cancel. Terms say subscriptions renew automatically, access continues through the paid period, and refunds require both cancellation and a request within 31 days of purchase. [D9,D10]

**Assessment:** Strong choice for teams that need shared LinkedIn campaigns, explicit duplicate controls and CRM handoff. Local costs less but adds runtime maintenance. Cloud removes that dependency at a significant seat premium. Five-account agencies should compare the Flexible cloud package with Fixed billing; shared Team Campaign eligibility is documented specifically for Fixed plans.

### Sources / short evidence

- **D0** https://www.dux-soup.com/pricing — current features. Excerpt: “Detect responses and pause campaigns”. Ref `turn238view1`.
- **D1** https://support.dux-soup.com/article/736-fixed-seat-plans-pricing — updated October 15. Excerpt: “Fixed Seat plans start from just 1 seat”. Ref `turn274view1`.
- **D2** https://support.dux-soup.com/article/702-meet-stacked-the-new-dux-soup-experience — updated September 23. Excerpt: “The previous Dux-Soup Pro, Turbo, and Cloud Chrome extensions have been deprecated.” Ref `turn266view2`.
- **D3** https://support.dux-soup.com/article/835-flexible-seat-plans-pricing — minimum commitments, actual package figures. Excerpt: “Your minimum number of seats is paid for upfront each month.” Ref `turn246search4`.
- **D4** https://support.dux-soup.com/article/242-shared-team-campaigns-for-monthly-and-annual-turbo-team-license-holders — current STACKED content despite legacy URL. Excerpt: “Team Campaigns are available on Fixed (pre-pay) plans with 2 or more seats.” Ref `turn258search2`.
- **D5** https://support.dux-soup.com/article/797-team-seats-admin-access-and-subscription-owners-explained — seat roles. Excerpt: “Admin access is free of charge and does not consume a paid seat.” Ref `turn258search1`.
- **D6** https://support.dux-soup.com/article/748-manage-linkedin-conversations-with-unified-messaging — current admin inbox. Excerpt: “send a manual reply directly from the Admin Dashboard”. Ref `turn268search2`.
- **D7** https://support.dux-soup.com/article/601-campaign-management-api — reply-stop. Excerpt: “pauses the automated campaign sequence for that profile”. Ref `turn253search4`.
- **D8** https://support.dux-soup.com/article/775-can-stacked-find-email-addresses-for-linkedin-prospects — email lookup credits. Excerpt: “One email lookup credit is charged for one successfully found email address.” Ref `turn258search0`.
- **D9** https://support.dux-soup.com/article/12-how-to-cancel — updated September 23. Excerpt: “Uninstalling the app or removing the browser extension will not cancel your subscription.” Ref `turn253search1`.
- **D10** https://support.dux-soup.com/article/189-terms-conditions — renewal and refund terms. Excerpt: “request a refund within 31 days of purchase.” Ref `turn253search3`.

## Meet Alfred

### Current rates and feature gates

| Plan | Monthly per seat | Quarterly effective/month | Annual effective/month | Annual per seat |
|---|---:|---:|---:|---:|
| LinkedIn Only | $59 | $49 | $39 | $468 |
| Multi-Channel | $69 | $59 | $49 | $588 |
| Agency, minimum three seats | $79 | $69 | $59 | $708 |
| Unlimited | Quote | Quote | Quote | Quote |

Each seat covers one user and one connected LinkedIn account; seats cannot be shared. Annual Multi-Channel totals for 1/3/5 senders: $588/$1,764/$2,940. Agency annual minimum is $2,124; five seats cost $3,540. [A1]

LinkedIn Only includes full sequences and smart inbox but excludes Sales Navigator, InMail, email, CSV campaigns, import/export and integrations. Multi-Channel adds those; Agency adds roles, team campaigns, collaborative inbox, native Salesforce/HubSpot, white label and reporting. Lead Finder result caps are 1,000/5,000/10,000 respectively. [A1,A2]

**One buyer note for the page:** Meet Alfred's pricing page still contains older annual amounts and labels. The recently updated pricing help page provides the current $59/$69/$79 monthly rates and Agency's three-seat minimum; use those and confirm the checkout total before an annual purchase. [A1,A2]

### Operation and handoff

- Campaigns execute in Meet Alfred's cloud. A detected reply pauses that contact's sequence; the inbox supports manual responses and returning a contact to a campaign. Chained LinkedIn messages are an exception: a reply during a two-to-four-message chain does not stop the remainder of that step. [A3,A4,A5]
- Bulk lead exclusion is documented. The team permission to share leads permits multiple members to target duplicate leads. An unconditional cross-account duplicate blocker was not established; do not promise one. [A6]
- Native HubSpot handoff on Agency supports selected-lead and bulk exports of contact fields. Its guide describes contact export, so do not imply complete message-history synchronization. [A7]
- Sales Navigator remains a separate LinkedIn subscription. Paid InMail use requires a compatible Sales Navigator subscription and consumes the account's LinkedIn credits; that switch is off by default. No separately priced Alfred enrichment pack was verified. [A8]
- Payments after upgrade are non-refundable. Cancellation ends access at the paid period's end; the billing guide says account deletion then occurs on renewal date. Permanent deletion loses the information without backup recovery. Export first. A subscription can be paused once for 30/60/90/120 days with automatic restart. [A9,A10]

**Assessment:** Multi-Channel is a practical individual plan when LinkedIn and email must share a sequence. Agency makes sense when a manager needs shared conversations and control over several accounts. The three-seat minimum and export/integration gates make the entry price a poor proxy for a team setup. The documentation's X campaign page still labels Twitter campaigns “Under Maintenance”; treat X availability as a check-before-buy feature. [A11]

### Sources / short evidence

- **A1** https://help.meetalfred.com/en/articles/14665160-meet-alfred-help-center-pricing-plan-and-features — opened twice; “Updated this week”; exact current name/URL. Excerpt: “Each seat covers one user and one connected LinkedIn account. Seats can’t be shared.” Ref `turn271view0`.
- **A2** https://meetalfred.com/pricing — feature matrix and stale annual amounts. Excerpt: “Lead Import & Export”. Ref `turn242view1` / `turn268view2`.
- **A3** https://help.meetalfred.com/en/articles/3426173-how-meet-alfred-s-automation-works — cloud execution. Excerpt: “all campaigns run through Meet Alfred’s secure cloud-based infrastructure”. Ref `turn248search8`.
- **A4** https://help.meetalfred.com/en/articles/5615170-tracking-replies-and-managing-conversations-in-meet-alfred — reply pause/inbox. Excerpt: “pause the campaign for that specific contact”. Ref `turn256search3`.
- **A5** https://help.meetalfred.com/en/articles/12293897-chained-linkedin-message-step — chain exception. Excerpt: “Replies aren’t detected mid-chain”. Ref `turn248search3`.
- **A6** https://help.meetalfred.com/en/articles/8392603-how-to-view-and-manage-leads-in-meet-alfred — bulk exclusions, ref `turn271search1`; and https://help.meetalfred.com/en/articles/6556518-team-permissions — excerpt: “target duplicate leads across various member campaigns”, ref `turn258search6`.
- **A7** https://help.meetalfred.com/en/articles/14495322-how-to-connect-the-native-hubspot-integration-on-meet-alfred — current guide, available on Teams/Agency/Enterprise. Excerpt: “Export selected leads individually”. Ref `turn274view0`.
- **A8** https://help.meetalfred.com/en/articles/13671668-using-linkedin-inmail-credits-for-inmail-campaigns — October 2. Excerpt: “The toggle is disabled by default”. Ref `turn272view2`.
- **A9** https://help.meetalfred.com/en/articles/5277100-manage-your-subscription-plan-billing-page — cancellation/pause. Excerpt: “deletion takes place on the renewal date.” Ref `turn248search7`; non-refund policy: https://help.meetalfred.com/en/articles/3338757-refund-policy (`turn248search6`).
- **A10** https://help.meetalfred.com/en/articles/3754366-delete-your-account — excerpt: “this data cannot be recovered, as we do not keep any backups.” Ref `turn248search9`.
- **A11** https://help.meetalfred.com/en/articles/3321266-campaign-types-how-to-launch-them-in-meet-alfred — excerpt: “Twitter Campaigns (Under Maintenance)”. Ref `turn249search8`.

## PhantomBuster

### Workspace pricing

| Current plan | Monthly USD | Annual equivalent | Annual upfront | Slots | Runtime/month | Email credits/month |
|---|---:|---:|---:|---:|---:|---:|
| Start | $69 | $56 | $672 | 5 | 20 hours | 500 |
| Grow | $159 | $128 | $1,536 | 15 | 80 hours | 2,500 |
| Scale | $439 | $352 | $4,224 | 50 | 300 hours | 10,000 |

AI credits: 10k/30k/90k; URL lookup credits: 1k/10k/20k; cloud storage: 1/10/50 GB. These resources are shared across the workspace and reset per billing cycle. Each separate workspace has its own subscription. Public pricing says unlimited users; help documentation currently specifies up to 100 members per workspace. Neither is an unlimited-sender throughput promise. USD applies outside Europe; EUR is also offered. [P1,P2]

### Operation and handoff

- Runs on PhantomBuster servers; the browser can close. Paid plans include full CSV/JSON exports, API and integrations. Trial/free exports stop at ten rows. When runtime runs out, automation pauses until reset or upgrade, with no automatic overage bill. [P1,P2,P3]
- The LinkedIn Outreach workflow uses two slots, sends connection invitations plus up to three follow-ups, and checks for replies before continuing. Existing connections are skipped; messaging those requires a different Phantom. Its scheduling offers two sending-window patterns rather than arbitrary launch timing. [P4]
- Workflows do not share state. Overlapping audiences can receive duplicate/conflicting messages. Replies or a manual message sent before the next follow-up stop the remaining follow-ups. Reply handling is workflow logic; a collaborative sales inbox was not verified. [P5]
- Up to 100 LinkedIn accounts can be connected to a workspace. The documented four-account-per-automation option applies only to four extraction Phantoms, not LinkedIn Outreach. Do not use it as sender-rotation evidence. [P6]
- Owners/admins control member invites and contributor connection links; external contributors can connect an account without workspace access. Regular LinkedIn is sufficient for many workflows. Sales Navigator is optional and separately subscribed. HubSpot, Salesforce and Pipedrive handoff are documented; further tools use Zapier/Make/n8n. [P3,P7]
- Upgrading buys more shared resources; the retrieved pricing guidance does not establish standalone runtime top-ups. Larger custom plans are offered. [P2,P8]
- Cancel through Billing; paid access lasts to period end, then the workspace reverts to Free with data preserved, scheduled runs paused and ten-row exports. Subscription pausing is unavailable. Monthly refunds require a request within 14 days and no resources used; annual refunds within 30 days deduct one standard monthly charge if resources were used. [P9,P10]

**Assessment:** Best shortlist fit when the job includes sourcing, enrichment and moving data through a wider stack. It needs an operator who budgets runtime, slots and overlapping audiences. For a sales team whose core job is shared reply handling, the more integrated outreach products are easier to evaluate. Choose a plan from measured workflow use; five workspace users alone cannot establish five-sender capacity.

### Sources / short evidence

- **P1** https://phantombuster.com/pricing — current names, annual invoice totals, cloud execution, runtime exhaustion. Excerpt: “No overage charges are applied automatically.” Ref `turn238view3` / `turn271view1`.
- **P2** https://support.phantombuster.com/hc/en-us/articles/4494623647250-What-Each-PhantomBuster-Plan-Includes-Features-Limits-and-Pricing — updated October 23. Excerpt: “Resources are shared across all workspace members”. Ref `turn242view2` / `turn261search0`.
- **P3** https://support.phantombuster.com/hc/en-us/articles/22306827153810-What-is-PhantomBuster-and-What-Can-You-Automate — updated October 2. Excerpt: “PhantomBuster runs them on its servers.” Ref `turn254search2`.
- **P4** https://support.phantombuster.com/hc/en-us/articles/26971043420050-How-to-Use-the-LinkedIn-Outreach — October 1; two slots, up to three follow-ups. Excerpt: “Messages are only sent if the person accepts your connection and hasn’t replied.” Ref `turn246search7`.
- **P5** https://support.phantombuster.com/hc/en-us/articles/25970708553746-What-Are-Workflows-in-PhantomBuster-and-How-Do-They-Work — overlap and reply logic. Excerpt: “Workflows operate independently and don't share state with each other”. Ref `turn246search8`.
- **P6** https://support.phantombuster.com/hc/en-us/articles/27232517304338-How-to-Use-Multiple-LinkedIn-Accounts-in-One-PhantomBuster-Automation — connected-account ceiling and extraction-only multi-account scope. Excerpt: “You can connect up to 100 LinkedIn accounts per Workspace.” Ref `turn254search0`.
- **P7** https://support.phantombuster.com/hc/en-us/articles/24572365472786-How-to-Connect-Your-LinkedIn-Account-to-PhantomBuster — account controls. Excerpt: “Only workspace Owners and Admins can add users.” Ref `turn272search0`.
- **P8** https://support.phantombuster.com/hc/en-us/articles/4414979330450-How-to-Upgrade-Downgrade-or-Change-your-PhantomBuster-Plan — updated November 3. Excerpt: “To get more resources right away, upgrade to a higher plan.” Ref `turn254search3`.
- **P9** https://support.phantombuster.com/hc/en-us/articles/4415010437650-How-to-Cancel-your-PhantomBuster-Subscription — updated October 2. Excerpt: “Your Workspace, automations, and saved data are preserved on the Free plan.” Ref `turn272view0`.
- **P10** https://support.phantombuster.com/hc/en-us/articles/14947032957842-PhantomBuster-Refund-Policy — May 29. Excerpt: “No resources have been used during the current billing period”. Ref `turn272view1`.

## Copy boundaries

Use the named configuration beside every price. Keep feature availability separate from LinkedIn action limits. Avoid guaranteed-safety, ban-proof, unlimited-outreach or measured-conversion claims. These notes establish published product behavior and prices; no account-level test was performed. Keep provider claims about detection or account safety out of the ranking.
