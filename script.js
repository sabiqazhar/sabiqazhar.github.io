const basePath = window.location.pathname.endsWith('/')
  ? window.location.pathname
  : window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/') + 1);

function navigate(e) {
  e.preventDefault();
  const href = e.currentTarget.getAttribute('href');
  history.pushState(null, '', href);
  handleRoute();
}

function handleRoute() {
  const path = window.location.pathname.replace(basePath, '').replace(/\/$/, '');

  if (!path || path === 'home') {
    renderHome();
  } else if (path === 'blog') {
    renderBlogList();
  } else if (path.startsWith('blog/')) {
    const slug = path.split('/')[1];
    renderPost(slug);
  } else {
    renderHome();
  }
}

async function renderHome() {
  const html = marked.parse(`
# Hello World!
Selamat datang di blog retro saya. Silakan cek [Blog List](/blog) untuk baca tulisan lama.
  `);
  document.getElementById('content-area').innerHTML = html;
}

async function renderBlogList() {
  const container = document.getElementById('content-area');
  container.innerHTML = '<p>Loading post list...</p>';

  try {
    const res = await fetch(basePath + 'blog/index.json');
    if (!res.ok) throw new Error('Failed to load index.json');

    const data = await res.json();

    let html = '<h2>Blog Archive</h2><ul class="blog-list">';
    data.posts.forEach(post => {
      html += `
            <li class="post-item">
                <div class="post-date">${post.date}</div>
                <a href="/blog/${post.slug}" onclick="navigate(event)" class="post-title">${post.title}</a>
                <p class="post-excerpt">${post.excerpt}</p>
                <a href="/blog/${post.slug}" onclick="navigate(event)">[Read More...]</a>
                <hr>
            </li>`;
    });
    html += '</ul>';
    container.innerHTML = html;

  } catch (err) {
    container.innerHTML = `<p style="color:red">Error loading blog list: ${err.message}</p>`;
  }
}

async function renderPost(slug) {
  const container = document.getElementById('content-area');
  container.innerHTML = '<p>Loading post...</p>';

  try {
    const res = await fetch(basePath + `blog/${slug}.md`);
    if (!res.ok) throw new Error('Post not found');

    const text = await res.text();
    const backBtn = `<p><a href="/blog" onclick="navigate(event)">&larr; Back to Blog List</a></p>`;
    container.innerHTML = backBtn + marked.parse(text);

  } catch (err) {
    container.innerHTML = `<p style="color:red">Error: ${err.message}</p>`;
  }
}

window.addEventListener('popstate', handleRoute);
window.addEventListener('load', () => {
  document.getElementById('year').textContent = new Date().getFullYear();

  const params = new URLSearchParams(window.location.search);
  const redirectPath = params.get('path');
  if (redirectPath) {
    history.replaceState(null, '', redirectPath);
  }
  handleRoute();
});
