// data-driven sections: work + experiments from local json, writing from github readme.
(function () {
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }
  function lower(s) { return String(s == null ? '' : s).toLowerCase(); }

  function getJSON(url) {
    return fetch(url).then(function (r) {
      if (!r.ok) throw new Error('http ' + r.status);
      return r.json();
    });
  }

  // --- selected work <- projects/index.json ---
  var workRows = document.getElementById('work-rows');
  if (workRows) {
    getJSON('projects/index.json').then(function (d) {
      var posts = (d && d.posts) || [];
      if (!posts.length) throw new Error('empty');
      workRows.innerHTML = posts.map(function (p) {
        var href = p.page ? 'projects/' + p.page : p.repo;
        var extra = p.page && p.repo
          ? ' <a href="' + esc(p.repo) + '">repo</a>'
          : '';
        return '<tr>' +
          '<td class="d">' + esc(p.date || '') + '</td>' +
          '<td class="t"><a href="' + esc(href) + '">' + esc(lower(p.title)) + '</a>' +
          (p.excerpt ? '<br><span class="snip">' + esc(lower(p.excerpt)) + extra + '</span>' : extra) +
          '</td>' +
          '<td class="c">' + esc(lower(p.tag || '')) + '</td>' +
          '</tr>';
      }).join('');
    }).catch(function () {
      workRows.innerHTML = '<tr><td><span class="err">could not load work list.</span> ' +
        'see <a href="https://github.com/sabiqazhar?tab=repositories">github</a>.</td></tr>';
    });
  }

  // --- experiments <- projects/experiments.json ---
  var expList = document.getElementById('exp-list');
  if (expList) {
    getJSON('projects/experiments.json').then(function (d) {
      var items = (d && d.experiments) || [];
      if (!items.length) throw new Error('empty');
      expList.innerHTML = items.map(function (e) {
        return '<li><a href="' + esc(e.url) + '">' + esc(lower(e.name)) + '</a>' +
          (e.desc ? ' — ' + esc(lower(e.desc)) : '') +
          (e.tag ? ' <span class="muted">(' + esc(lower(e.tag)) + ')</span>' : '') +
          '</li>';
      }).join('');
    }).catch(function () {
      expList.innerHTML = '<li><span class="err">could not load experiments.</span> ' +
        'see <a href="https://github.com/sabiqazhar?tab=repositories">github</a>.</li>';
    });
  }

  // --- writing <- github profile readme (BLOG-POST-LIST block) ---
  var writingRows = document.getElementById('writing-rows');
  var FALLBACK_WRITING = [
    { title: 'Handle Race Condition Dengan Locking Database',
      url: 'https://medium.com/@sabiqaz/handle-race-condition-dengan-locking-database-e5cc3a14afbb' },
    { title: 'Race Condition, Mau update aja kok rebutan.',
      url: 'https://medium.com/@sabiqaz/race-condition-mau-update-aja-kok-rebutan-d903b3b23619' }
  ];
  function renderWriting(posts) {
    writingRows.innerHTML = posts.map(function (p) {
      return '<tr>' +
        '<td class="t"><a href="' + esc(p.url) + '">' + esc(lower(p.title)) + '</a></td>' +
        '<td class="c">medium</td>' +
        '</tr>';
    }).join('');
  }
  if (writingRows) {
    fetch('https://raw.githubusercontent.com/sabiqazhar/sabiqazhar/master/README.md')
      .then(function (r) {
        if (!r.ok) throw new Error('http ' + r.status);
        return r.text();
      })
      .then(function (md) {
        var block = md.split('BLOG-POST-LIST:START')[1] || '';
        block = block.split('BLOG-POST-LIST:END')[0] || '';
        var re = /-\s*\[(.+?)\]\((.+?)\)/g, m, posts = [];
        while ((m = re.exec(block))) posts.push({ title: m[1].trim(), url: m[2].trim() });
        if (!posts.length) throw new Error('no posts found');
        renderWriting(posts);
      })
      .catch(function () {
        // readme unreachable (offline / rate limited) — fall back to last known list
        renderWriting(FALLBACK_WRITING);
      });
  }
})();
