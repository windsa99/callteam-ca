"""Read-only HTTP audit of the rendered guide's unique destinations."""
import concurrent.futures
import json
import sys
import urllib.error
import urllib.request

urls = json.load(open(sys.argv[1]))

def check(url):
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0", "Range": "bytes=0-8191"})
    try:
        with urllib.request.urlopen(req, timeout=25) as response:
            body = response.read(8192)
            return {"url": url, "status": response.status, "final": response.url, "bytes": len(body)}
    except urllib.error.HTTPError as error:
        return {"url": url, "status": error.code, "final": error.url}
    except Exception as error:
        return {"url": url, "status": "transport-error", "error": str(error)}

with concurrent.futures.ThreadPoolExecutor(max_workers=8) as pool:
    results = list(pool.map(check, urls))
with open(sys.argv[2], "w") as output:
    json.dump(results, output, indent=2)
bad = [row for row in results if not isinstance(row["status"], int) or row["status"] >= 400]
print(json.dumps({"destinations": len(results), "successful": len(results)-len(bad), "needs_review": bad}, indent=2))
