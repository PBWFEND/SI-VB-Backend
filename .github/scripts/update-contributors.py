#!/usr/bin/env python3
"""Generate blok ALL-CONTRIBUTORS (avatar + nama + NIM) dari API GitHub + git log."""
import json
import os
import re
import subprocess
import sys
import urllib.request

REPO = "PBWFEND/SI-VB-Backend"
README = "README.md"
START = "<!-- ALL-CONTRIBUTORS-LIST:START -->"
END = "<!-- ALL-CONTRIBUTORS-LIST:END -->"
MAINTAINERS = {"yysofiyan"}
NIM_RE = re.compile(r"2401\d{7,}")


def gh(path):
    url = f"https://api.github.com/{path}"
    req = urllib.request.Request(url, headers={
        "Accept": "application/vnd.github+json",
        "Authorization": f"Bearer {os.environ['GH_TOKEN']}",
        "User-Agent": "contrib-regen",
    })
    with urllib.request.urlopen(req) as r:
        return json.load(r)


def git_authors(args):
    try:
        return subprocess.run(
            ["git", "log", *args, "--name-only", "--pretty=format:", "-n", "500"],
            capture_output=True, text=True).stdout
    except Exception:
        return ""


def nim_from(refs):
    for r in refs:
        m = NIM_RE.search(r or "")
        if m:
            return m.group(0)
    return None


def nim_of(login, name, pr_refs):
    if login in MAINTAINERS:
        return None
    return (nim_from([login])
            or nim_from(git_authors(["--author", login]))
            or nim_from(pr_refs.get(login, []))
            or nim_from(git_authors(["--author", name or ""])))


def cell(c, name, nim):
    login = c["login"]
    role = "Dosen" if login in MAINTAINERS else (nim or "Mahasiswa")
    return f"""    <td align="center">
      <a href="{c["html_url"]}">
        <img src="{c["avatar_url"]}&s=200" width="100px;" alt="{login}"/><br>
        <sub><b>{name or login}</b></sub>
      </a><br>
      <sub>{role}</sub>
    </td>"""


def user_profile(login):
    try:
        u = gh(f"users/{login}")
        return {"login": u["login"], "html_url": u["html_url"], "avatar_url": u["avatar_url"]}
    except Exception:
        return None


def main():
    cs = gh(f"repos/{REPO}/contributors?per_page=100")
    prs = gh(f"repos/{REPO}/pulls?state=all&per_page=100")
    pr_refs = {}
    for p in prs:
        pr_refs.setdefault(p["user"]["login"], []).append(p["head"]["ref"])

    # union: contributors API + author PR merged + author commit lokal
    known = {c["login"] for c in cs}
    for login in pr_refs:
        if login not in known:
            c = user_profile(login)
            if c:
                cs.append(c)
                known.add(login)

    try:
        raw = subprocess.run(
            ["git", "log", "--pretty=format:%an|%ae"], capture_output=True, text=True, check=True).stdout
    except Exception:
        raw = ""
    for line in raw.splitlines():
        if "|" not in line:
            continue
        an, ae = line.split("|", 1)
        cand = an.strip()
        if not cand or cand in known or "@" in cand:
            continue
        c = user_profile(cand)
        if c:
            cs.append(c)
            known.add(cand)

    cells = []
    for c in cs:
        login = c["login"]
        try:
            name = gh(f"users/{login}").get("name")
        except Exception:
            name = None
        cells.append(cell(c, name, nim_of(login, name, pr_refs)))

    rows = []
    for i in range(0, len(cells), 3):
        rows.append("  <tr>\n" + "\n".join(cells[i:i + 3]) + "\n  </tr>")
    table = "### 👥 Contributors\n\n<table>\n" + "\n".join(rows) + "\n</table>\n"

    text = open(README, encoding="utf-8").read()
    if START not in text or END not in text:
        print("marker ALL-CONTRIBUTORS tidak ditemukan di README.md", file=sys.stderr)
        sys.exit(1)
    head, rest = text.split(START, 1)
    _, tail = rest.split(END, 1)
    new = head + START + "\n\n" + table + "\n" + END + tail
    if new != text:
        open(README, "w", encoding="utf-8").write(new)
        print("README.md diperbarui")
    else:
        print("tidak ada perubahan")


if __name__ == "__main__":
    main()
