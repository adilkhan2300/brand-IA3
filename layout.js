// ============================================================
// AFTERCLASS AI — Shared Layout Components (injected)
// ============================================================

function renderSidebar(activePage = '') {
  const user = (typeof userData !== 'undefined' && userData.getCurrentUser) 
    ? userData.getCurrentUser() 
    : { initials: 'AK', name: 'Adil Khan', degree: 'MBA', university: 'Woxsen University' };

  return `
  <nav class="sidebar" id="sidebar">
    <div class="sidebar-logo">
      <div class="sidebar-logo-icon">AC</div>
      <div>
        <div class="sidebar-logo-text">AFTER<span>CLASS</span></div>
        <div class="sidebar-logo-sub">AI Platform</div>
      </div>
    </div>

    <div class="sidebar-nav">
      <div class="sidebar-section-label">Overview</div>
      <a class="sidebar-link ${activePage==='dashboard'?'active':''}" href="dashboard.html" data-page="dashboard">
        <span class="sidebar-link-icon">⊞</span> Dashboard
      </a>

      <div class="sidebar-section-label">Learn</div>
      <a class="sidebar-link ${activePage==='notebook'?'active':''}" href="notebook.html" data-page="notebook">
        <span class="sidebar-link-icon">📓</span> AI Notebook
      </a>
      <a class="sidebar-link ${activePage==='focus'?'active':''}" href="focus.html" data-page="focus">
        <span class="sidebar-link-icon">⏱</span> Focus
      </a>
      <a class="sidebar-link ${activePage==='tasks'?'active':''}" href="tasks.html" data-page="tasks">
        <span class="sidebar-link-icon">✓</span> Tasks
        <span class="sidebar-badge">${user.tasksRemaining || 3}</span>
      </a>

      <div class="sidebar-section-label">Apply & Build</div>
      <a class="sidebar-link ${activePage==='apply'?'active':''}" href="apply.html" data-page="apply">
        <span class="sidebar-link-icon">⚡</span> Apply
      </a>
      <a class="sidebar-link ${activePage==='portfolio'?'active':''}" href="portfolio.html" data-page="portfolio">
        <span class="sidebar-link-icon">◈</span> Portfolio
      </a>
      <a class="sidebar-link ${activePage==='cv'?'active':''}" href="cv.html" data-page="cv">
        <span class="sidebar-link-icon">📄</span> CV Builder
      </a>

      <div class="sidebar-section-label">Career</div>
      <a class="sidebar-link ${activePage==='career'?'active':''}" href="career.html" data-page="career">
        <span class="sidebar-link-icon">🎯</span> Career
      </a>
      <a class="sidebar-link ${activePage==='jobs'?'active':''}" href="jobs.html" data-page="jobs">
        <span class="sidebar-link-icon">💼</span> Jobs
      </a>
      <a class="sidebar-link ${activePage==='interview'?'active':''}" href="interview.html" data-page="interview">
        <span class="sidebar-link-icon">🎤</span> Interview Prep
      </a>

      <div class="sidebar-section-label">Account</div>
      <a class="sidebar-link ${activePage==='profile'?'active':''}" href="profile.html" data-page="profile">
        <span class="sidebar-link-icon">◉</span> Profile
      </a>
      <a class="sidebar-link" href="javascript:void(0)" onclick="if(confirm('Sign out of AFTERCLASS AI?')) authManager.signOut()">
        <span class="sidebar-link-icon">↳</span> Sign Out
      </a>
    </div>

    <div class="sidebar-footer">
      <div class="sidebar-user" style="display:flex;align-items:center;justify-content:space-between;width:100%">
        <div style="display:flex;align-items:center;gap:10px;cursor:pointer" onclick="window.location.href='profile.html'">
          <div class="sidebar-user-avatar">${user.initials || 'AK'}</div>
          <div style="overflow:hidden">
            <div class="sidebar-user-name" style="text-overflow:ellipsis;white-space:nowrap;overflow:hidden">${user.name || 'Student'}</div>
            <div class="sidebar-user-role" style="text-overflow:ellipsis;white-space:nowrap;overflow:hidden">${user.degree || 'Degree'} · ${user.specialization || user.university || 'University'}</div>
          </div>
        </div>
        <button onclick="if(confirm('Sign out of AFTERCLASS AI?')) authManager.signOut()" style="background:none;border:none;color:var(--gray-400);cursor:pointer;font-size:16px;padding:4px" data-tooltip="Sign Out">↳</button>
      </div>
    </div>
  </nav>
  <div class="sidebar-overlay" id="sidebarOverlay"></div>
  `;
}

function renderHeader(title = '') {
  const user = (typeof userData !== 'undefined' && userData.getCurrentUser) 
    ? userData.getCurrentUser() 
    : { initials: 'AK', name: 'Adil Khan', id: 'user_adil' };

  return `
  <header class="top-header">
    <button class="hamburger" id="hamburger">☰</button>
    ${title ? `<h1 style="font-size:16px;font-weight:700;color:var(--gray-800);white-space:nowrap">${title}</h1>` : ''}
    <div class="header-search">
      <span class="header-search-icon">🔍</span>
      <input type="text" id="headerSearch" placeholder="Search anything…" />
    </div>

    <div style="display:flex; align-items:center; gap:8px; background:var(--gray-100); padding:4px 10px; border-radius:8px; border:1px solid var(--gray-200); font-size:12px; margin-left:auto">
      <span style="color:var(--gray-500); font-weight:600">👤 Switch Dashboard:</span>
      <select onchange="authManager.switchPersona(this.value)" style="background:none; border:none; font-weight:700; color:var(--brand-primary); font-size:12px; cursor:pointer; outline:none">
        <option value="user_adil" ${user.id==='user_adil'?'selected':''}>Adil (MBA · Business)</option>
        <option value="user_priya" ${user.id==='user_priya'?'selected':''}>Priya (Tech & AI)</option>
        <option value="user_sam" ${user.id==='user_sam'?'selected':''}>Sam (UI/UX Design)</option>
      </select>
    </div>

    <div class="header-actions">
      <button class="header-btn" data-tooltip="Notifications" onclick="showToast('No new notifications','info')">
        🔔
        <span class="header-btn-badge"></span>
      </button>
      <div class="header-avatar" onclick="window.location.href='profile.html'" data-tooltip="Profile">${user.initials || 'AK'}</div>
      <button class="btn btn-ghost btn-sm" onclick="if(confirm('Sign out of AFTERCLASS AI?')) authManager.signOut()" style="font-size:12.5px;color:var(--gray-600);padding:4px 8px" data-tooltip="Sign Out">Sign Out ↳</button>
    </div>
  </header>
  `;
}

function renderAIFab() {
  return `
  <div class="ai-fab">
    <button class="ai-fab-btn" id="aiFab" data-tooltip="Ask AFTERCLASS AI">
      ✦
      <div class="ai-fab-pulse"></div>
    </button>
  </div>

  <div class="ai-chat-panel" id="aiChatPanel">
    <div class="ai-chat-header">
      <div style="display:flex;align-items:center;justify-content:space-between">
        <div>
          <div class="ai-chat-header-title">✦ AFTERCLASS AI</div>
          <div class="ai-chat-header-sub">Your AI learning & career assistant</div>
        </div>
        <button id="aiChatClose" style="background:rgba(255,255,255,0.2);border:none;color:white;width:28px;height:28px;border-radius:50%;cursor:pointer;font-size:16px;display:flex;align-items:center;justify-content:center">✕</button>
      </div>
    </div>
    <div class="ai-chat-messages" id="aiChatMessages">
      <div class="chat-msg ai">
        <div class="chat-msg-avatar">✦</div>
        <div class="chat-bubble">Hi Adil! 👋 I'm your AFTERCLASS AI assistant. I can help you study, apply concepts, build your portfolio, and prepare for interviews. What would you like to do today?</div>
      </div>
      <div style="display:flex;gap:6px;flex-wrap:wrap;padding:0 8px">
        <button onclick="document.getElementById('aiChatInput').value='What should I study today?';document.getElementById('aiChatInput').focus()" style="font-size:11.5px;padding:5px 10px;background:var(--gray-100);border:1px solid var(--gray-200);border-radius:20px;cursor:pointer;color:var(--gray-700)">📚 What to study?</button>
        <button onclick="document.getElementById('aiChatInput').value='How do I improve my Business Analyst profile?';document.getElementById('aiChatInput').focus()" style="font-size:11.5px;padding:5px 10px;background:var(--gray-100);border:1px solid var(--gray-200);border-radius:20px;cursor:pointer;color:var(--gray-700)">💼 Career tips</button>
        <button onclick="document.getElementById('aiChatInput').value='Find gaps in my CV';document.getElementById('aiChatInput').focus()" style="font-size:11.5px;padding:5px 10px;background:var(--gray-100);border:1px solid var(--gray-200);border-radius:20px;cursor:pointer;color:var(--gray-700)">📄 Analyze CV</button>
      </div>
    </div>
    <div class="ai-chat-input">
      <input type="text" id="aiChatInput" placeholder="Ask anything…" />
      <button class="ai-chat-send" id="aiChatSend">➤</button>
    </div>
  </div>
  `;
}

function renderMobileNav(activePage = '') {
  const items = [
    { page: 'dashboard', icon: '⊞', label: 'Home', href: 'dashboard.html' },
    { page: 'notebook', icon: '📓', label: 'Learn', href: 'notebook.html' },
    { page: 'apply', icon: '⚡', label: 'Apply', href: 'apply.html' },
    { page: 'career', icon: '🎯', label: 'Career', href: 'career.html' },
    { page: 'profile', icon: '◉', label: 'Profile', href: 'profile.html' },
  ];
  return `
  <nav class="mobile-nav">
    <div class="mobile-nav-inner">
      ${items.map(i => `
        <a href="${i.href}" class="mobile-nav-item ${activePage===i.page?'active':''}">
          <span>${i.icon}</span>${i.label}
        </a>
      `).join('')}
    </div>
  </nav>
  `;
}

// Inject layout into page
function mountLayout(activePage, headerTitle) {
  const sidebarSlot = document.getElementById('sidebar-slot');
  const headerSlot = document.getElementById('header-slot');
  const fabSlot = document.getElementById('fab-slot');
  const mobileSlot = document.getElementById('mobile-nav-slot');

  if (sidebarSlot) sidebarSlot.innerHTML = renderSidebar(activePage);
  if (headerSlot) headerSlot.innerHTML = renderHeader(headerTitle);
  if (fabSlot) fabSlot.innerHTML = renderAIFab();
  if (mobileSlot) mobileSlot.innerHTML = renderMobileNav(activePage);
}
