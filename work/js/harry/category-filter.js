document.addEventListener('DOMContentLoaded', function () {
  // 获取DOM元素
  const categoryItems = document.querySelectorAll('.category-nav-item');
  const tagItems = document.querySelectorAll('.tag-nav-item');
  const yearItems = document.querySelectorAll('.year-nav-item');
  const postContainer = document.querySelector('#recent-posts');
  const posts = document.querySelectorAll('.recent-post-item');
  const postsPerLoad = 8000000;

  // 初始化变量
  const originalPosts = Array.from(posts);
  let filteredPosts = originalPosts;
  let currentLoadIndex = postsPerLoad;
  let isLoading = false;
  let currentCategory = 'all';
  let currentTag = 'all';
  let currentYear = 'all';

  // 隐藏原有分页
  const pagination = document.querySelector('.pagination');
  if (pagination) {
    pagination.style.display = 'none';
  }

  // 添加加载动画元素
  const loadingElement = document.createElement('div');
  loadingElement.className = 'loading-more';
  loadingElement.style.cssText = 'text-align: center; padding: 20px; display: none;';
  loadingElement.innerHTML = '加载中...';
  postContainer.parentNode.insertBefore(loadingElement, postContainer.nextSibling);

  // 重置函数
  function resetCategoryActive() {
    categoryItems.forEach(cat => cat.classList.remove('active'));
    categoryItems[0].classList.add('active');
    currentCategory = 'all';
  }

  function resetTagActive() {
    tagItems.forEach(tag => tag.classList.remove('active'));
    tagItems[0].classList.add('active');
    currentTag = 'all';
  }

  function resetYearActive() {
    yearItems.forEach(year => year.classList.remove('active'));
    yearItems[0].classList.add('active');
    currentYear = 'all';
  }

  // 筛选函数
  // 在 filterPosts 函数中修改年份匹配逻辑
  function filterPosts() {
    return originalPosts.filter(post => {
      // 分类匹配
      const categoryMatch = currentCategory === 'all' ||
        Array.from(post.querySelectorAll('.article-meta__categories'))
          .some(link => link.textContent.trim() === currentCategory);

      // 标签匹配
      const tagMatch = currentTag === 'all' ||
        Array.from(post.querySelectorAll('.article-meta__tags'))
          .some(link => link.textContent.trim() === currentTag);

      // 年份匹配 - 修改这部分逻辑
      const dateText = post.querySelector('.post-meta-date')?.textContent || '';
      const yearMatch = currentYear === 'all' || dateText.includes(currentYear);

      return categoryMatch && tagMatch && yearMatch;
    });
  }

  // 显示更多项目 
  function showMorePosts() {
    if (isLoading) return;

    isLoading = true;
    loadingElement.style.display = 'block';

    setTimeout(() => {
      const fragment = document.createDocumentFragment();

      for (let i = currentLoadIndex - postsPerLoad; i < currentLoadIndex && i < filteredPosts.length; i++) {
        // 移除 cloneNode，直接使用原始节点
        fragment.appendChild(filteredPosts[i]);
      }

      postContainer.appendChild(fragment);

      currentLoadIndex += postsPerLoad;
      isLoading = false;

      loadingElement.style.display =
        currentLoadIndex >= filteredPosts.length ? 'none' : 'block';
    }, 300);
  }

  // 更新项目列表
  function updatePosts() {
    currentLoadIndex = postsPerLoad;
    filteredPosts = filterPosts();

    postContainer.innerHTML = '';

    if (filteredPosts.length === 0) {
      const noPostsMessage = document.createElement('div');
      noPostsMessage.className = 'no-posts-message';
      noPostsMessage.textContent = '没有找到相关项目';
      postContainer.appendChild(noPostsMessage);
      loadingElement.style.display = 'none';
    } else {
      showMorePosts();
    }
  }
 

  // 绑定分类点击事件
  categoryItems.forEach(item => {
    item.addEventListener('click', function () {
      categoryItems.forEach(cat => cat.classList.remove('active'));
      this.classList.add('active');
      currentCategory = this.dataset.category;

      resetTagActive();
      resetYearActive();

      updatePosts();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  // 绑定标签点击事件
  tagItems.forEach(item => {
    item.addEventListener('click', function () {
      tagItems.forEach(tag => tag.classList.remove('active'));
      this.classList.add('active');
      currentTag = this.dataset.tag;

      resetCategoryActive();
      resetYearActive();

      updatePosts();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  // 绑定年份点击事件
  // 年份点击事件 - 添加调试信息
  yearItems.forEach(item => {
    item.addEventListener('click', function () {

      yearItems.forEach(year => year.classList.remove('active'));
      this.classList.add('active');
      currentYear = this.dataset.year;

      resetCategoryActive();
      resetTagActive();
      updatePosts();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });
});


