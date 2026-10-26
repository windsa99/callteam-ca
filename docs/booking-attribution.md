# Calendly booking attribution

The sandbox adds one deferred script after existing page-specific scripts. It labels only the existing HTTPS Calendly event at /hello-callteam/new-meeting. It does not intercept navigation, make external tracking requests, create meetings, change scheduling options, or modify site copy and styles.

## Attribution fields

- utm_source: the supplied campaign source, an observed referring source, or direct_or_unknown.
- utm_medium: the supplied medium or the observed source category.
- utm_campaign: the incoming campaign, falling back to website_booking.
- utm_term: an incoming term, when supplied.
- utm_content: a compact ct1 label containing entry page, booking page and button position. Existing campaign content is retained within this field, up to its documented field limit.

Page labels use home, service:, article:, script: and case: prefixes. Very long labels use a readable prefix and stable hash so they remain distinguishable. The review manifest maps the full website paths to their labels. Every newly generated UTM value stays within Calendly's 255-character limit. Existing author-supplied source, medium, campaign, term, scheduling options, fragments and prefilled values on a booking link take precedence and are preserved.

## Visit context

The entry path and available campaign/referral information are held in sessionStorage for the browser tab's visit. The context expires after 30 minutes without page activity. A new external arrival or changed campaign starts a new context. Page identity excludes query strings and fragments. The full referrer URL and organic search query are not stored. An observed search-engine referrer is classified as organic unless a supported ad click identifier is visible; untagged campaigns may remain ambiguous.

If browser storage is unavailable, the current page can still label its booking links. Earlier entry information may be unavailable. If JavaScript or supported browser features are unavailable, the original HTML booking links continue to work.

## Link compatibility

The tracker runs after existing page tool scripts, preserving their click listeners, including tools that initially select the exact original booking URL. New or changed booking anchors are handled through a MutationObserver and capture listeners. Listeners never cancel or redirect a click. Other Calendly events, other external links, internal links, email links and forms are untouched.

## Verification

Run npm run test:attribution and npm run build. Compare the resulting output to the immutable baseline with node scripts/verify-booking-attribution-release.js BASELINE_DIRECTORY REPORT_JSON. The comparison requires all pre-existing HTML to remain identical after removing the one new script include, and all existing assets, forms, metadata, sitemap and link targets to remain unchanged.

Review files under _site/__review__ are sandbox-only and must not be included in a deployment. Rebuild from a clean _site directory before any future release. Reapply the small change to the then-current production commit and repeat the comparison and browser checks to preserve work published after this sandbox was prepared.

Opening an attributed Calendly scheduling page verifies the destination and scheduling UI. A controlled completed booking and readback of its tracking fields are needed to verify Calendly's saved booking record. Sandbox/model checks alone do not establish that final provider boundary.

References: https://calendly.com/help/how-to-track-conversions-with-utm-parameters and https://calendly.com/help/tracking-and-reporting.
