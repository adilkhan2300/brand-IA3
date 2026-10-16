// ============================================================
// AFTERCLASS AI — Shared App Logic
// ============================================================

// ---- Navigation Router ----
const pages = {
  'dashboard':  'dashboard.html',
  'features':   'features.html',
  'notebook':   'notebook.html',
  'focus':      'focus.html',
  'tasks':      'tasks.html',
  'apply':      'apply.html',
  'portfolio':  'portfolio.html',
  'career':     'career.html',
  'jobs':       'jobs.html',
  'interview':  'interview.html',
  'cv':         'cv.html',
  'profile':    'profile.html',
  'login':      'login.html',
  'signup':     'signup.html',
  'onboarding': 'onboarding.html',
  'landing':    'index.html',
};

function navigateTo(page) {
  const url = pages[page];
  if (url) window.location.href = url;
}

// ---- Current Page Detection ----
function getCurrentPage() {
  const path = window.location.pathname;
  const file = path.split('/').pop() || 'index.html';
  for (const [key, val] of Object.entries(pages)) {
    if (val === file) return key;
  }
  return 'dashboard';
}

// ---- Set Active Sidebar Link ----
function setActiveSidebarLink() {
  const current = getCurrentPage();
  document.querySelectorAll('.sidebar-link').forEach(link => {
    const page = link.dataset.page;
    if (page === current) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// ---- Sidebar Toggle (Mobile) ----
function initSidebarToggle() {
  const hamburger = document.getElementById('hamburger');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebarOverlay');

  if (!hamburger || !sidebar) return;

  hamburger.addEventListener('click', () => {
    sidebar.classList.toggle('mobile-open');
    if (overlay) overlay.classList.toggle('visible');
  });

  if (overlay) {
    overlay.addEventListener('click', () => {
      sidebar.classList.remove('mobile-open');
      overlay.classList.remove('visible');
    });
  }
}

// ---- Toast Notifications ----
function showToast(message, type = 'default', duration = 3000) {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const icons = { success: '✓', error: '✕', info: 'ℹ', default: '●' };
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span>${icons[type] || icons.default}</span> ${message}`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'slideOutRight 0.3s ease forwards';
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

// ---- AI Chat Panel ----
function initAIChat() {
  const fab = document.getElementById('aiFab');
  const panel = document.getElementById('aiChatPanel');
  const closeBtn = document.getElementById('aiChatClose');
  const input = document.getElementById('aiChatInput');
  const sendBtn = document.getElementById('aiChatSend');
  const messages = document.getElementById('aiChatMessages');

  if (!fab || !panel) return;

  fab.addEventListener('click', () => {
    panel.classList.toggle('open');
  });

  if (closeBtn) closeBtn.addEventListener('click', () => panel.classList.remove('open'));

  const aiResponses = {
    'study': 'Based on your schedule and upcoming assignments, I recommend focusing on **Business Analytics** today — specifically Descriptive Analytics. You have an assignment due tomorrow!',
    'business analyst': 'To strengthen your Business Analyst profile, focus on: \n1. SQL fundamentals (currently a gap)\n2. Requirements gathering practice\n3. Adding a BA case study to your portfolio\n\nYour Power BI and Excel skills are already strong! 💪',
    'porter': "**Porter's Five Forces** is a framework for analyzing industry competitiveness. The 5 forces are:\n1. Competitive Rivalry\n2. Threat of New Entrants\n3. Bargaining Power of Suppliers\n4. Bargaining Power of Buyers\n5. Threat of Substitutes",
    'cv': "I've analyzed your CV. Key gaps vs your target Business Analyst role:\n• Missing: SQL experience\n• Missing: Requirements documentation\n• Suggestion: Add your Power BI dashboard project\n• Suggestion: Quantify your analytics achievements",
    'default': "Great question! Based on your profile as an MBA student targeting Business Analyst roles, I'd recommend:\n\n1. Complete today's Business Analytics focus session\n2. Work on the Porter's Forces challenge in Apply\n3. Add your latest project to Portfolio\n\nShall I create a study plan for you? 📚"
  };

  function getAIResponse(msg) {
    const lower = msg.toLowerCase();
    for (const [key, resp] of Object.entries(aiResponses)) {
      if (lower.includes(key)) return resp;
    }
    return aiResponses.default;
  }

  function addMessage(text, isUser = false) {
    const msg = document.createElement('div');
    msg.className = `chat-msg ${isUser ? 'user' : 'ai'}`;
    msg.innerHTML = `
      <div class="chat-msg-avatar">${isUser ? 'AK' : '✦'}</div>
      <div class="chat-bubble">${text.replace(/\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</div>
    `;
    messages.appendChild(msg);
    messages.scrollTop = messages.scrollHeight;
  }

  function sendMessage() {
    const text = input.value.trim();
    if (!text) return;
    addMessage(text, true);
    input.value = '';

    setTimeout(() => {
      addMessage(getAIResponse(text));
    }, 800);
  }

  if (sendBtn) sendBtn.addEventListener('click', sendMessage);
  if (input) {
    input.addEventListener('keypress', e => {
      if (e.key === 'Enter') sendMessage();
    });
  }
}

// ---- Animated Progress Bars ----
function animateProgressBars() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const width = bar.dataset.width || '0';
        bar.style.width = width + '%';
        observer.unobserve(bar);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.progress-bar-fill[data-width]').forEach(bar => {
    bar.style.width = '0%';
    observer.observe(bar);
  });
}

// ---- Circular Progress Rings ----
function initCircularProgress() {
  document.querySelectorAll('.circular-progress[data-value]').forEach(el => {
    const value = parseInt(el.dataset.value) || 0;
    const size = parseInt(el.dataset.size) || 100;
    const stroke = parseInt(el.dataset.stroke) || 8;
    const color = el.dataset.color || 'var(--brand-primary)';
    const radius = (size - stroke) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (value / 100) * circumference;

    el.innerHTML = `
      <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
        <circle class="circular-progress-track" cx="${size/2}" cy="${size/2}" r="${radius}" stroke-width="${stroke}"/>
        <circle class="circular-progress-fill" cx="${size/2}" cy="${size/2}" r="${radius}" 
                stroke-width="${stroke}" stroke="${color}"
                stroke-dasharray="${circumference}" stroke-dashoffset="${circumference}"
                style="transition: stroke-dashoffset 1s cubic-bezier(0.4,0,0.2,1)"/>
      </svg>
      <div class="circular-progress-text" style="font-size: ${size*0.2}px">${value}%</div>
    `;

    setTimeout(() => {
      const fill = el.querySelector('.circular-progress-fill');
      if (fill) fill.style.strokeDashoffset = offset;
    }, 300);
  });
}

// ---- Sidebar Navigation Clicks ----
function initNavigation() {
  document.querySelectorAll('[data-page]').forEach(el => {
    el.addEventListener('click', () => {
      const page = el.dataset.page;
      if (pages[page]) window.location.href = pages[page];
    });
  });
}

// ---- Search Functionality ----
function initSearch() {
  const searchInput = document.getElementById('headerSearch');
  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.trim();
    if (query.length > 2) {
      // Mock search — in production, would query real data
      console.log('Searching:', query);
    }
  });
}

// ---- Number Counter Animation ----
function animateCounters() {
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = parseInt(el.dataset.count);
    const duration = 1200;
    const start = Date.now();

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        const tick = () => {
          const elapsed = Date.now() - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.round(target * eased);
          if (progress < 1) requestAnimationFrame(tick);
        };
        tick();
        observer.unobserve(el);
      }
    });
    observer.observe(el);
  });
}

// ---- Tab Navigation ----
function initTabs() {
  document.querySelectorAll('.tab-nav').forEach(nav => {
    const buttons = nav.querySelectorAll('.tab-btn');
    const panelGroup = nav.dataset.panels;

    buttons.forEach((btn, i) => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        if (panelGroup) {
          document.querySelectorAll(`[data-panel-group="${panelGroup}"]`).forEach((panel, j) => {
            panel.classList.toggle('hidden', j !== i);
          });
        }
      });
    });
  });
}

// ---- Tooltip ----
function initTooltips() {
  document.querySelectorAll('[data-tooltip]').forEach(el => {
    let tooltip;
    el.addEventListener('mouseenter', () => {
      tooltip = document.createElement('div');
      tooltip.style.cssText = `
        position: fixed; background: var(--gray-900); color: white;
        padding: 6px 10px; border-radius: 6px; font-size: 12px;
        font-family: Inter, sans-serif; z-index: 9999; pointer-events: none;
        white-space: nowrap; box-shadow: 0 4px 12px rgba(0,0,0,0.2);
      `;
      tooltip.textContent = el.dataset.tooltip;
      document.body.appendChild(tooltip);
      const rect = el.getBoundingClientRect();
      tooltip.style.left = rect.left + rect.width/2 - tooltip.offsetWidth/2 + 'px';
      tooltip.style.top = rect.top - tooltip.offsetHeight - 8 + 'px';
    });
    el.addEventListener('mouseleave', () => {
      if (tooltip) { tooltip.remove(); tooltip = null; }
    });
  });
}

// ---- User Personas & Multi-User Storage System ----
const PRESET_USERS = {
  'user_adil': {
    id: 'user_adil',
    name: 'Adil Khan',
    firstName: 'Adil',
    lastName: 'Khan',
    email: 'adil@woxsen.edu.in',
    authProvider: 'Email',
    persona: 'business',
    initials: 'AK',
    university: 'Woxsen University',
    degree: 'MBA',
    specialization: 'General Management',
    year: '2nd Year',
    careerInterests: ['Business Analyst', 'Data Analyst', 'Product Analyst'],
    targetRole: 'Business Analyst',
    skills: ['Excel', 'Power BI', 'Python', 'SQL', 'Business Analysis', 'Figma'],
    subjects: [
      { name: 'Business Analytics', progress: 72, color: 'var(--brand-primary)' },
      { name: 'Brand Management', progress: 58, color: 'var(--brand-accent)' },
      { name: 'Corporate Finance', progress: 45, color: 'var(--warning)' },
      { name: 'Managerial Economics', progress: 38, color: 'var(--success)' }
    ],
    readinessScore: 72,
    learningProgress: 68,
    projects: 7,
    tasksRemaining: 3,
    streak: 5,
    focusMinutes: 45,
    dashboardData: {
      greetingSub: "Let's turn your MBA learning into a Business Analyst career.",
      recTitle: "Complete your Business Analytics real-world challenge",
      recLink: "apply.html",
      recBadge: "BUSINESS ANALYTICS",
      journeyStage: 4,
      journeyStageName: "Apply",
      aiInsight: "You've been studying <strong>Power BI</strong> frequently this week. Consider adding a Business Analytics dashboard project to your portfolio — it'll increase your Business Analyst match score from <strong>86%</strong> to an estimated <strong>91%</strong>.",
      readinessBreakdown: [
        { label: 'Knowledge', val: 82, color: 'var(--brand-primary)' },
        { label: 'Practical Skills', val: 68, color: 'var(--brand-accent)' },
        { label: 'Portfolio', val: 71, color: 'var(--success)' },
        { label: 'CV Match', val: 88, color: 'var(--warning)' },
        { label: 'Interview Prep', val: 61, color: '#ec4899' }
      ],
      recentActivity: [
        { icon: '📓', title: 'Uploaded: Descriptive Analytics Notes', sub: 'AI Summary + 12 flashcards generated', time: '2h ago', bg: 'var(--brand-primary-light)' },
        { icon: '✓', title: "Completed Challenge: Porter's Five Forces", sub: 'Score: 84% · Added to Portfolio', time: 'Yesterday', bg: 'var(--success-light)' },
        { icon: '⏱', title: 'Focus Session: Business Analytics', sub: '42 minutes completed', time: 'Yesterday', bg: 'var(--warning-light)' },
        { icon: '💼', title: 'Job Analyzed: Business Analyst Intern', sub: '72% profile match · 2 gaps found', time: '2 days ago', bg: '#ede9fe' }
      ],
      upcomingTasks: [
        { title: 'Business Analytics Assignment', date: 'Tomorrow', badge: 'Urgent', badgeClass: 'badge-error', dotColor: 'var(--error)' },
        { title: 'Brand Management Presentation', date: 'In 3 days', badge: 'Soon', badgeClass: 'badge-warning', dotColor: 'var(--warning)' },
        { title: 'Interview Prep — Mock Session', date: 'Friday', badge: 'Planned', badgeClass: 'badge-primary', dotColor: 'var(--brand-primary)' }
      ]
    }
  },

  'user_priya': {
    id: 'user_priya',
    name: 'Priya Sharma',
    firstName: 'Priya',
    lastName: 'Sharma',
    email: 'priya.tech@gmail.com',
    authProvider: 'Google',
    persona: 'tech',
    initials: 'PS',
    university: 'IIT Hyderabad',
    degree: 'B.Tech',
    specialization: 'Computer Science & AI',
    year: '4th Year',
    careerInterests: ['Software Engineer', 'Data Engineer', 'AI Developer'],
    targetRole: 'Data Engineer',
    skills: ['Python', 'SQL', 'PyTorch', 'Git', 'Docker', 'PostgreSQL', 'FastAPI'],
    subjects: [
      { name: 'Distributed Systems', progress: 88, color: 'var(--brand-primary)' },
      { name: 'Database Optimization', progress: 92, color: 'var(--brand-accent)' },
      { name: 'Machine Learning', progress: 79, color: 'var(--success)' },
      { name: 'Algorithms & Data Struct', progress: 84, color: 'var(--warning)' }
    ],
    readinessScore: 88,
    learningProgress: 85,
    projects: 12,
    tasksRemaining: 2,
    streak: 14,
    focusMinutes: 90,
    dashboardData: {
      greetingSub: "Ready to optimize data pipelines & crack tech system architecture?",
      recTitle: "Complete the Distributed Database Sharding Challenge",
      recLink: "apply.html",
      recBadge: "DATA PIPELINES",
      journeyStage: 6,
      journeyStageName: "Build",
      aiInsight: "Your <strong>PyTorch & Distributed SQL</strong> benchmarks are top tier. Adding a real-time Kafka streaming project will elevate your Data Engineer readiness to <strong>94%</strong>!",
      readinessBreakdown: [
        { label: 'System Design', val: 90, color: 'var(--brand-primary)' },
        { label: 'Algorithms', val: 86, color: 'var(--brand-accent)' },
        { label: 'SQL & DB', val: 94, color: 'var(--success)' },
        { label: 'Code Quality', val: 82, color: 'var(--warning)' },
        { label: 'Tech Interview', val: 88, color: '#ec4899' }
      ],
      recentActivity: [
        { icon: '💻', title: 'Submitted Code: Redis Caching Layer', sub: 'Automated test suite passed 100%', time: '1h ago', bg: 'var(--brand-primary-light)' },
        { icon: '⚡', title: 'Completed: LeetCode Hard SQL Challenge', sub: 'Optimization score: 96%', time: 'Yesterday', bg: 'var(--success-light)' },
        { icon: '⏱', title: 'Focus Session: PyTorch Model Fine-Tuning', sub: '90 minutes completed', time: 'Yesterday', bg: 'var(--warning-light)' }
      ],
      upcomingTasks: [
        { title: 'Docker Compose Cluster Setup', date: 'Today', badge: 'Urgent', badgeClass: 'badge-error', dotColor: 'var(--error)' },
        { title: 'FastAPI Backend Code Review', date: 'Tomorrow', badge: 'Soon', badgeClass: 'badge-warning', dotColor: 'var(--warning)' }
      ]
    }
  },

  'user_sam': {
    id: 'user_sam',
    name: 'Sam Jordan',
    firstName: 'Sam',
    lastName: 'Jordan',
    email: 'sam.design@university.edu',
    authProvider: 'Google',
    persona: 'design',
    initials: 'SJ',
    university: 'Design Academy',
    degree: 'B.Des',
    specialization: 'User Experience & Product',
    year: '3rd Year',
    careerInterests: ['UI/UX Designer', 'Product Manager', 'Design System Lead'],
    targetRole: 'UI/UX Designer',
    skills: ['Figma', 'Prototyping', 'User Research', 'Design Systems', 'HTML/CSS', 'Usability Testing'],
    subjects: [
      { name: 'Human-Computer Interaction', progress: 78, color: 'var(--brand-primary)' },
      { name: 'Design Systems', progress: 65, color: 'var(--brand-accent)' },
      { name: 'User Research', progress: 70, color: 'var(--success)' },
      { name: 'Interactive Wireframing', progress: 58, color: 'var(--warning)' }
    ],
    readinessScore: 65,
    learningProgress: 62,
    projects: 5,
    tasksRemaining: 4,
    streak: 3,
    focusMinutes: 30,
    dashboardData: {
      greetingSub: "Craft intuitive interfaces & build a world-class UI/UX portfolio.",
      recTitle: "Redesign the Mobile Checkout Experience (Figma Challenge)",
      recLink: "apply.html",
      recBadge: "UI/UX DESIGN",
      journeyStage: 3,
      journeyStageName: "Plan",
      aiInsight: "Your <strong>Figma Component Libraries</strong> look super clean. Conducting 3 more user interviews will strengthen your Product Case Study!",
      readinessBreakdown: [
        { label: 'UI Aesthetics', val: 80, color: 'var(--brand-primary)' },
        { label: 'User Research', val: 62, color: 'var(--brand-accent)' },
        { label: 'Figma Systems', val: 75, color: 'var(--success)' },
        { label: 'Portfolio Case', val: 58, color: 'var(--warning)' },
        { label: 'Design Critique', val: 50, color: '#ec4899' }
      ],
      recentActivity: [
        { icon: '🎨', title: 'Exported Figma Design Tokens', sub: 'Updated AFTERCLASS Design System', time: '3h ago', bg: 'var(--brand-primary-light)' },
        { icon: '👥', title: 'User Interview Notes Uploaded', sub: 'Summarized 4 user feedback sessions', time: 'Yesterday', bg: 'var(--success-light)' }
      ],
      upcomingTasks: [
        { title: 'Publish Mobile Checkout Prototype', date: 'Tomorrow', badge: 'Urgent', badgeClass: 'badge-error', dotColor: 'var(--error)' },
        { title: 'Usability Heuristic Audit', date: 'In 2 days', badge: 'Soon', badgeClass: 'badge-warning', dotColor: 'var(--warning)' }
      ]
    }
  }
};

const userData = {
  getUsers: function() {
    const stored = localStorage.getItem('ac_users');
    if (!stored) {
      localStorage.setItem('ac_users', JSON.stringify(PRESET_USERS));
      return PRESET_USERS;
    }
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error('Failed to parse stored users:', e);
      return PRESET_USERS;
    }
  },
  
  saveUsers: function(usersMap) {
    try {
      localStorage.setItem('ac_users', JSON.stringify(usersMap));
    } catch (e) {
      console.error('Failed to persist users:', e);
    }
  },

  getCurrentUser: function() {
    const currentId = localStorage.getItem('ac_current_user_id') || sessionStorage.getItem('ac_current_user_id');
    const users = this.getUsers();
    if (currentId && users[currentId]) {
      return users[currentId];
    }
    // If logged in flag is set but current user ID was missing or invalid, default to first user or preset
    if (authManager.isLoggedIn()) {
      const keys = Object.keys(users);
      if (keys.length > 0) return users[keys[0]];
    }
    // Safe default for demo/public view without corrupting states
    return users['user_adil'] || PRESET_USERS['user_adil'];
  },

  setCurrentUser: function(userObj) {
    if (!userObj || !userObj.id) return;
    const users = this.getUsers();
    users[userObj.id] = userObj;
    this.saveUsers(users);
    localStorage.setItem('ac_current_user_id', userObj.id);
    sessionStorage.setItem('ac_current_user_id', userObj.id);
    localStorage.setItem('ac_logged_in', 'true');
  },

  initCleanUser: function(data = {}) {
    const timestamp = Date.now();
    const randStr = Math.random().toString(36).substring(2, 7);
    const newId = `user_${timestamp}_${randStr}`;

    const fName = (data.firstName || 'Student').trim();
    const lName = (data.lastName || '').trim();
    const fullName = (fName + ' ' + lName).trim();
    const initials = ((fName[0] || 'S') + (lName[0] || '')).toUpperCase();

    return {
      id: newId,
      name: fullName,
      firstName: fName,
      lastName: lName,
      email: data.email || `student_${timestamp}@university.edu`,
      authProvider: data.authProvider || 'Email',
      persona: 'custom',
      initials: initials,
      university: data.university || '',
      degree: data.degree || '',
      specialization: data.specialization || '',
      year: data.year || '1st Year',
      careerInterests: data.careerInterests || [],
      targetRole: data.targetRole || '',
      skills: data.skills || [],
      subjects: data.subjects || [],
      // Pure, uncompromised fresh metrics for every new user
      readinessScore: 0,
      learningProgress: 0,
      projects: 0,
      tasksRemaining: 0,
      streak: 0,
      focusMinutes: 0,
      onboardingComplete: false,
      tutorialComplete: false,
      tutorialProgress: 0,
      createdAt: new Date().toISOString(),
      tasks: [],
      recentActivity: [],
      notes: [],
      portfolioItems: [],
      dashboardData: {
        greetingSub: `Welcome to AFTERCLASS AI, ${fName}! Let's build your learning-to-career journey.`,
        recTitle: "Complete your onboarding setup to unlock AI study tools",
        recLink: "onboarding.html",
        recBadge: "GET STARTED",
        journeyStage: 1,
        journeyStageName: "Onboard",
        aiInsight: `Hi ${fName}! Welcome to your personal workspace. Once you add your course subjects and upload lecture notes, I'll generate personalized insights, interactive flashcards, quizzes, and career skill gap analysis.`,
        readinessBreakdown: [],
        recentActivity: [],
        upcomingTasks: []
      }
    };
  },

  updateUser: function(userId, updates = {}) {
    const users = this.getUsers();
    if (users[userId]) {
      users[userId] = { ...users[userId], ...updates };
      this.saveUsers(users);
      return users[userId];
    }
    return null;
  },

  createBlankProfile: function() {
    const blankUser = this.initCleanUser({
      firstName: 'New',
      lastName: 'Student',
      email: `student_${Date.now()}@university.edu`,
      authProvider: 'Email'
    });
    this.setCurrentUser(blankUser);
    showToast('Clean workspace initialized! Directing to onboarding...', 'success');
    setTimeout(() => { window.location.href = 'onboarding.html'; }, 700);
  },

  // Scoped user tasks
  getTasks: function(userId) {
    const user = this.getUsers()[userId] || this.getCurrentUser();
    return user.tasks || [];
  },

  addTask: function(userId, taskObj) {
    const users = this.getUsers();
    const user = users[userId];
    if (!user) return null;

    if (!user.tasks) user.tasks = [];
    const newTask = {
      id: 'task_' + Date.now(),
      title: taskObj.title || 'New Task',
      subject: taskObj.subject || 'General',
      priority: taskObj.priority || 'medium',
      date: taskObj.date || 'Today',
      time: taskObj.time || '30 min',
      completed: false,
      createdAt: new Date().toISOString()
    };
    user.tasks.unshift(newTask);
    user.tasksRemaining = user.tasks.filter(t => !t.completed).length;

    // Update upcomingTasks on dashboardData
    if (!user.dashboardData) user.dashboardData = {};
    user.dashboardData.upcomingTasks = user.tasks.filter(t => !t.completed).slice(0, 3).map(t => ({
      title: t.title,
      date: t.date,
      badge: t.priority.toUpperCase(),
      badgeClass: t.priority === 'high' ? 'badge-error' : (t.priority === 'medium' ? 'badge-warning' : 'badge-primary'),
      dotColor: t.priority === 'high' ? 'var(--error)' : (t.priority === 'medium' ? 'var(--warning)' : 'var(--brand-primary)')
    }));

    this.saveUsers(users);
    return newTask;
  },

  toggleTask: function(userId, taskId) {
    const users = this.getUsers();
    const user = users[userId];
    if (!user || !user.tasks) return;

    const task = user.tasks.find(t => t.id === taskId);
    if (task) {
      task.completed = !task.completed;
      user.tasksRemaining = user.tasks.filter(t => !t.completed).length;

      if (task.completed) {
        this.addActivity(userId, {
          icon: '✓',
          title: `Completed Task: ${task.title}`,
          sub: `${task.subject} · Priority ${task.priority}`,
          time: 'Just now',
          bg: 'var(--success-light)'
        });
      }

      if (!user.dashboardData) user.dashboardData = {};
      user.dashboardData.upcomingTasks = user.tasks.filter(t => !t.completed).slice(0, 3).map(t => ({
        title: t.title,
        date: t.date,
        badge: t.priority.toUpperCase(),
        badgeClass: t.priority === 'high' ? 'badge-error' : (t.priority === 'medium' ? 'badge-warning' : 'badge-primary'),
        dotColor: t.priority === 'high' ? 'var(--error)' : (t.priority === 'medium' ? 'var(--warning)' : 'var(--brand-primary)')
      }));

      this.saveUsers(users);
    }
  },

  deleteTask: function(userId, taskId) {
    const users = this.getUsers();
    const user = users[userId];
    if (!user || !user.tasks) return;

    user.tasks = user.tasks.filter(t => t.id !== taskId);
    user.tasksRemaining = user.tasks.filter(t => !t.completed).length;
    if (!user.dashboardData) user.dashboardData = {};
    user.dashboardData.upcomingTasks = user.tasks.filter(t => !t.completed).slice(0, 3).map(t => ({
      title: t.title,
      date: t.date,
      badge: t.priority.toUpperCase(),
      badgeClass: t.priority === 'high' ? 'badge-error' : 'badge-warning',
      dotColor: t.priority === 'high' ? 'var(--error)' : 'var(--brand-primary)'
    }));
    this.saveUsers(users);
  },

  addActivity: function(userId, activityItem) {
    const users = this.getUsers();
    const user = users[userId];
    if (!user) return;

    if (!user.recentActivity) user.recentActivity = [];
    user.recentActivity.unshift(activityItem);
    if (user.recentActivity.length > 20) user.recentActivity.pop();

    if (!user.dashboardData) user.dashboardData = {};
    user.dashboardData.recentActivity = user.recentActivity.slice(0, 5);
    this.saveUsers(users);
  },

  saveFocusSession: function(userId, minutes, subject) {
    const users = this.getUsers();
    const user = users[userId];
    if (!user) return;

    user.focusMinutes = (user.focusMinutes || 0) + minutes;
    if (user.streak === 0) user.streak = 1;
    this.saveUsers(users);

    this.addActivity(userId, {
      icon: '⏱',
      title: `Focus Session: ${subject || 'Deep Study'}`,
      sub: `${minutes} minutes completed`,
      time: 'Just now',
      bg: 'var(--warning-light)'
    });
  }
};

// ---- Authentication & Session Manager ----
const authManager = {
  isLoggedIn: function() {
    return localStorage.getItem('ac_logged_in') === 'true';
  },

  signIn: function(email, password, redirectUrl = 'dashboard.html') {
    const users = userData.getUsers();
    const normalizedEmail = (email || '').trim().toLowerCase();
    let matchedUser = Object.values(users).find(u => (u.email || '').toLowerCase() === normalizedEmail);

    if (!matchedUser) {
      // Create user on the fly for demo flexibility with clean state
      const nameParts = (email || '').split('@')[0].split('.');
      const fName = nameParts[0] ? nameParts[0].charAt(0).toUpperCase() + nameParts[0].slice(1) : 'Student';
      const lName = nameParts[1] ? nameParts[1].charAt(0).toUpperCase() + nameParts[1].slice(1) : '';

      matchedUser = userData.initCleanUser({
        firstName: fName,
        lastName: lName,
        email: email,
        authProvider: 'Email'
      });
      // New account routes to onboarding first
      redirectUrl = 'onboarding.html';
    }

    userData.setCurrentUser(matchedUser);
    showToast(`Welcome back, ${matchedUser.name}!`, 'success');
    setTimeout(() => { window.location.href = redirectUrl; }, 800);
    return matchedUser;
  },

  signUp: function(data, redirectUrl = 'onboarding.html') {
    const users = userData.getUsers();
    const normalizedEmail = (data.email || '').trim().toLowerCase();
    const existing = Object.values(users).find(u => (u.email || '').toLowerCase() === normalizedEmail);
    
    if (existing) {
      showToast(`Account already exists with this email!`, 'info');
      return null;
    }

    // Initialize completely clean workspace for every new user
    const newUser = userData.initCleanUser({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      authProvider: data.authProvider || 'Email',
      university: data.university,
      degree: data.degree,
      specialization: data.specialization
    });

    userData.setCurrentUser(newUser);
    showToast(`Account created for ${newUser.name}! Starting setup...`, 'success');
    setTimeout(() => { window.location.href = redirectUrl; }, 800);
    return newUser;
  },

  signOut: function() {
    localStorage.removeItem('ac_logged_in');
    localStorage.removeItem('ac_current_user_id');
    sessionStorage.removeItem('ac_current_user_id');
    showToast('Signed out of AFTERCLASS AI', 'info');
    setTimeout(() => { window.location.href = 'login.html'; }, 600);
  },

  switchPersona: function(id, redirectUrl = null) {
    const users = userData.getUsers();
    if (users[id]) {
      userData.setCurrentUser(users[id]);
      showToast(`Switched view to profile: ${users[id].name} (${users[id].degree || 'Student'})`, 'success');
      setTimeout(() => {
        if (redirectUrl) window.location.href = redirectUrl;
        else window.location.reload();
      }, 400);
    }
  },

  checkAuth: function() {
    const current = getCurrentPage();
    const publicPages = ['login', 'signup', 'landing'];
    if (!publicPages.includes(current) && !this.isLoggedIn()) {
      showToast('Please sign in to access AFTERCLASS AI', 'info');
      setTimeout(() => { window.location.href = 'login.html'; }, 500);
    }
  },

  // ---- Google OAuth Modal Simulation ----
  openGoogleModal: function(redirectUrl = 'dashboard.html') {
    let existingModal = document.getElementById('googleAuthModal');
    if (existingModal) existingModal.remove();

    const modal = document.createElement('div');
    modal.id = 'googleAuthModal';
    modal.style.cssText = `
      position: fixed; inset: 0; z-index: 10000;
      background: rgba(15, 23, 42, 0.65); backdrop-filter: blur(6px);
      display: flex; align-items: center; justify-content: center; padding: 20px;
      animation: fadeIn 0.2s ease;
    `;

    const defaultAccounts = [
      { name: 'Adil Khan', email: 'adil@woxsen.edu.in', sub: 'MBA · Woxsen University (Business & Analytics)', id: 'user_adil', avatar: 'AK', color: '#1a56db' },
      { name: 'Priya Sharma', email: 'priya.tech@gmail.com', sub: 'B.Tech · IIT Hyderabad (Computer Science & AI)', id: 'user_priya', avatar: 'PS', color: '#0ea5e9' },
      { name: 'Sam Jordan', email: 'sam.design@university.edu', sub: 'B.Des · Design Academy (UI/UX & Product)', id: 'user_sam', avatar: 'SJ', color: '#8b5cf6' }
    ];

    modal.innerHTML = `
      <div style="background:white; border-radius:20px; max-width:440px; width:100%; box-shadow:0 25px 50px -12px rgba(0,0,0,0.25); overflow:hidden; border:1px solid #e2e8f0; animation: scaleUp 0.25s cubic-bezier(0.16,1,0.3,1);">
        <div style="padding:28px 28px 20px; text-align:center; border-bottom:1px solid #f1f5f9; position:relative">
          <button onclick="document.getElementById('googleAuthModal').remove()" style="position:absolute; right:16px; top:16px; background:none; border:none; font-size:18px; color:#64748b; cursor:pointer; width:32px; height:32px; border-radius:50%; display:flex; align-items:center; justify-content:center">✕</button>
          
          <div style="width:44px; height:44px; margin:0 auto 12px; display:flex; align-items:center; justify-content:center; background:#f8fafc; border-radius:50%; border:1px solid #e2e8f0">
            <svg width="24" height="24" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
          </div>
          <h3 style="font-size:18px; font-weight:800; color:#0f172a; margin:0 0 4px">Sign in with Google</h3>
          <p style="font-size:13px; color:#64748b; margin:0">Choose a Google Account to continue to <strong>AFTERCLASS AI</strong></p>
        </div>

        <div style="padding:16px 24px 24px; max-height:360px; overflow-y:auto">
          <div style="font-size:11px; font-weight:700; text-transform:uppercase; color:#94a3b8; letter-spacing:0.5px; margin-bottom:10px">Existing Google Accounts</div>
          
          <div style="display:flex; flex-direction:column; gap:8px">
            ${defaultAccounts.map(acc => `
              <div onclick="authManager.selectGoogleAccount('${acc.id}', '${redirectUrl}')" 
                   style="display:flex; align-items:center; gap:12px; padding:12px 14px; border:1px solid #e2e8f0; border-radius:12px; cursor:pointer; transition:all 0.15s ease; background:white;"
                   onmouseover="this.style.background='#f8fafc';this.style.borderColor='#cbd5e1'"
                   onmouseout="this.style.background='white';this.style.borderColor='#e2e8f0'">
                <div style="width:38px; height:38px; border-radius:50%; background:${acc.color}; color:white; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:14px; flex-shrink:0">
                  ${acc.avatar}
                </div>
                <div style="flex:1; overflow:hidden">
                  <div style="font-size:14px; font-weight:700; color:#0f172a">${acc.name}</div>
                  <div style="font-size:12px; color:#64748b">${acc.email}</div>
                  <div style="font-size:11px; color:#94a3b8">${acc.sub}</div>
                </div>
                <div style="font-size:16px; color:#94a3b8">→</div>
              </div>
            `).join('')}
          </div>

          <div style="margin:16px 0; display:flex; align-items:center; gap:10px; color:#cbd5e1">
            <div style="flex:1; height:1px; background:#e2e8f0"></div>
            <span style="font-size:11px; color:#94a3b8; font-weight:600">OR USE CUSTOM GOOGLE EMAIL</span>
            <div style="flex:1; height:1px; background:#e2e8f0"></div>
          </div>

          <form onsubmit="authManager.submitCustomGoogle(event, '${redirectUrl}')" style="display:flex; flex-direction:column; gap:10px">
            <input type="text" id="gCustomName" placeholder="Full Name (e.g. Alex Tech)" required style="padding:10px 14px; border:1px solid #cbd5e1; border-radius:8px; font-size:13px" />
            <input type="email" id="gCustomEmail" placeholder="Google Email (e.g. alex.google@gmail.com)" required style="padding:10px 14px; border:1px solid #cbd5e1; border-radius:8px; font-size:13px" />
            <button type="submit" style="background:#1a56db; color:white; border:none; padding:10px; border-radius:8px; font-weight:600; font-size:13px; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:8px">
              Continue with Custom Google Account →
            </button>
          </form>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
  },

  selectGoogleAccount: function(userId, redirectUrl) {
    const modal = document.getElementById('googleAuthModal');
    if (modal) {
      modal.firstElementChild.innerHTML = `
        <div style="padding:40px 20px; text-align:center">
          <div style="width:40px; height:40px; border:3px solid #1a56db; border-top-color:transparent; border-radius:50%; animation:spin 0.6s linear infinite; margin:0 auto 16px"></div>
          <div style="font-size:16px; font-weight:700; color:#0f172a">Authenticating with Google OAuth...</div>
          <div style="font-size:13px; color:#64748b; margin-top:4px">Connecting profile data to AFTERCLASS AI</div>
        </div>
      `;
    }

    setTimeout(() => {
      if (modal) modal.remove();
      this.switchPersona(userId, redirectUrl);
    }, 900);
  },

  submitCustomGoogle: function(e, redirectUrl) {
    e.preventDefault();
    const name = document.getElementById('gCustomName').value;
    const email = document.getElementById('gCustomEmail').value;
    const parts = name.split(' ');
    const fName = parts[0] || 'User';
    const lName = parts.slice(1).join(' ') || '';

    const modal = document.getElementById('googleAuthModal');
    if (modal) modal.remove();

    this.signUp({
      firstName: fName,
      lastName: lName,
      email: email,
      authProvider: 'Google'
    }, redirectUrl);
  }
};

// ============================================================
// INTERACTIVE GUIDED TUTORIAL SYSTEM
// ============================================================
const appTutorial = {
  currentStep: 0,
  steps: [
    {
      type: 'modal',
      title: "Welcome to your new workspace! 👋",
      subtitle: "Let's explore how to use your AI-powered learning-to-career platform.",
      desc: "AFTERCLASS AI helps you transform classroom learning into real-world proof of work, verifiable skill scores, dynamic student portfolios, and targeted career matches.",
      bullets: [
        "📓 AI Notebook: Turn lecture notes into bullet summaries, flashcards & quizzes",
        "⚡ Apply & Build: Real-world business & tech challenges with automated AI evaluation",
        "◈ Portfolio & CV: Turn verified scores into ATS-ready proof of work",
        "🎯 Career Match: Spot skill gaps for your dream internships and roles"
      ],
      isWelcome: true
    },
    {
      target: '#headerAvatar, .header-avatar, .sidebar-user',
      title: "Your Student Profile & Settings",
      desc: "This is your personal workspace. Manage your degree, university, specialization, and target career roles. Your profile customizes all AI insights and challenge recommendations across the platform.",
      tip: "Click your avatar or Profile in the sidebar anytime to update your details."
    },
    {
      target: 'a[data-page="notebook"], .sidebar-link[data-page="notebook"]',
      title: "AI Notebook, Focus & Tasks",
      desc: "Upload your class syllabi, lecture slides, or study notes. AFTERCLASS AI instantly generates bullet summaries, study flashcards, and practice quizzes. Use the Focus timer for deep work sessions and track your assignments in Tasks.",
      tip: "Your study hours and quiz scores feed directly into your Career Readiness metrics."
    },
    {
      target: '#dashRingWrapper, .greeting-score, .greeting-section',
      title: "Career Readiness & Dashboard",
      desc: "Your live Career Readiness Score benchmarks your preparation across Knowledge, Practical Skills, Portfolio, and CV Match. As a new user, your workspace begins clean at 0% and grows with every study session and challenge you complete.",
      tip: "No fake stats — every percentage point is earned through verified proof."
    },
    {
      target: 'a[data-page="apply"], .sidebar-link[data-page="apply"]',
      title: "Apply Concepts & Build Proof",
      desc: "Theory meets industry reality. Solve real-world case challenges in Business Analytics, Tech, or Design. AI evaluates your submissions, highlights gaps, and adds passing challenges directly to your Portfolio.",
      tip: "Turn classroom theory into tangible projects recruiters actually care about."
    },
    {
      target: '#aiFab, .ai-fab',
      title: "Career Tools & 24/7 AI Assistant",
      desc: "Analyze job descriptions to uncover exact skill gaps, tailor your CV for ATS screening, and practice mock interviews. Whenever you're stuck, click the floating ✦ AI button to ask questions.",
      tip: "Ask 'What should I study today?' or 'Find gaps in my CV' anytime!"
    },
    {
      type: 'modal',
      title: "You're All Set! 🎉",
      subtitle: "Your personal workspace is ready for action.",
      desc: "Start by completing your profile setup, uploading your first course notes in the AI Notebook, or exploring real-world challenges.",
      isFinish: true
    }
  ],

  start: function(force = false) {
    const user = userData.getCurrentUser();
    if (!force && user && user.tutorialComplete) return;
    this.currentStep = 0;
    this.render();
  },

  replay: function() {
    this.currentStep = 0;
    this.render();
  },

  next: function() {
    if (this.currentStep < this.steps.length - 1) {
      this.currentStep++;
      this.render();
    } else {
      this.finish();
    }
  },

  prev: function() {
    if (this.currentStep > 0) {
      this.currentStep--;
      this.render();
    }
  },

  skip: function() {
    this.cleanup();
    const user = userData.getCurrentUser();
    if (user && user.id) {
      userData.updateUser(user.id, { tutorialComplete: true });
    }
    showToast('Tutorial skipped. You can replay it anytime using 🎓 Tutorial in the top bar!', 'info');
  },

  finish: function() {
    this.cleanup();
    const user = userData.getCurrentUser();
    if (user && user.id) {
      userData.updateUser(user.id, { tutorialComplete: true });
    }
    showToast('Tutorial completed! Welcome to AFTERCLASS AI 🚀', 'success');
  },

  cleanup: function() {
    document.querySelectorAll('.tutorial-welcome-modal, .tutorial-backdrop, .tutorial-spotlight-box, .tutorial-popover').forEach(el => el.remove());
    if (this._handleKey) {
      document.removeEventListener('keydown', this._handleKey);
      this._handleKey = null;
    }
  },

  render: function() {
    this.cleanup();
    const step = this.steps[this.currentStep];
    if (!step) return;

    this._handleKey = (e) => {
      if (e.key === 'Escape') this.skip();
      else if (e.key === 'ArrowRight' || e.key === 'Enter') this.next();
      else if (e.key === 'ArrowLeft') this.prev();
    };
    document.addEventListener('keydown', this._handleKey);

    if (step.type === 'modal') {
      this.renderModal(step);
    } else {
      this.renderSpotlight(step);
    }
  },

  renderModal: function(step) {
    const user = userData.getCurrentUser();
    const isWelcome = step.isWelcome;
    const modal = document.createElement('div');
    modal.className = 'tutorial-welcome-modal';
    modal.innerHTML = `
      <div class="tutorial-welcome-card">
        <div class="tutorial-welcome-banner">
          <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:var(--brand-accent);margin-bottom:6px">
            ${isWelcome ? '✦ FIRST-TIME WORKSPACE SETUP' : '✦ SETUP COMPLETE'}
          </div>
          <h2 style="font-size:24px;font-weight:800;letter-spacing:-0.5px;margin:0 0 6px">
            ${step.title.replace('[First Name]', (user && user.firstName) ? user.firstName : 'Student')}
          </h2>
          <p style="font-size:14px;color:rgba(255,255,255,0.7);margin:0">
            ${step.subtitle}
          </p>
        </div>
        <div class="tutorial-welcome-body">
          <p style="font-size:14px;color:var(--gray-600);line-height:1.6;margin:0">
            ${step.desc}
          </p>

          ${step.bullets ? `
            <div class="tutorial-feature-list">
              ${step.bullets.map(b => `
                <div class="tutorial-feature-item">
                  <span>${b.slice(0, 2)}</span>
                  <div>${b.slice(3)}</div>
                </div>
              `).join('')}
            </div>
          ` : ''}

          <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;margin-top:8px">
            ${isWelcome ? `
              <button class="btn btn-ghost" onclick="appTutorial.skip()" style="color:var(--gray-500)">
                Skip for Now
              </button>
              <button class="btn btn-primary btn-lg" onclick="appTutorial.next()" style="gap:8px">
                Start Guided Tour →
              </button>
            ` : `
              <button class="btn btn-secondary" onclick="appTutorial.finish()">
                Explore Dashboard
              </button>
              <div style="display:flex;gap:8px">
                <a href="notebook.html" class="btn btn-outline" onclick="appTutorial.finish()">📓 Open Notebook</a>
                <a href="profile.html" class="btn btn-primary" onclick="appTutorial.finish()">◉ View Profile</a>
              </div>
            `}
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  },

  renderSpotlight: function(step) {
    const targetEl = document.querySelector(step.target);
    const rect = targetEl ? targetEl.getBoundingClientRect() : { top: 120, left: 120, width: 220, height: 60 };

    // Backdrop
    const backdrop = document.createElement('div');
    backdrop.className = 'tutorial-backdrop active';
    backdrop.onclick = () => this.next();
    document.body.appendChild(backdrop);

    // Spotlight cutout box
    const spotlight = document.createElement('div');
    spotlight.className = 'tutorial-spotlight-box';
    const pad = 6;
    spotlight.style.top = Math.max(0, rect.top - pad) + 'px';
    spotlight.style.left = Math.max(0, rect.left - pad) + 'px';
    spotlight.style.width = (rect.width + pad * 2) + 'px';
    spotlight.style.height = (rect.height + pad * 2) + 'px';
    document.body.appendChild(spotlight);

    // Popover
    const popover = document.createElement('div');
    popover.className = 'tutorial-popover';

    const dotsHtml = this.steps.map((s, idx) => `
      <div class="tutorial-dot ${idx === this.currentStep ? 'active' : (idx < this.currentStep ? 'done' : '')}"></div>
    `).join('');

    popover.innerHTML = `
      <div class="tutorial-header">
        <span class="tutorial-step-badge">Step ${this.currentStep} of ${this.steps.length - 2}</span>
        <button class="tutorial-close-btn" onclick="appTutorial.skip()" title="Skip Tutorial">✕</button>
      </div>
      <div class="tutorial-title">${step.title}</div>
      <div class="tutorial-desc">${step.desc}</div>
      ${step.tip ? `<div class="tutorial-tip">💡 <div>${step.tip}</div></div>` : ''}
      <div class="tutorial-footer">
        <div class="tutorial-dots">${dotsHtml}</div>
        <div class="tutorial-actions">
          <button class="btn btn-ghost btn-sm" onclick="appTutorial.prev()" ${this.currentStep <= 1 ? 'style="display:none"' : ''}>← Back</button>
          <button class="btn btn-primary btn-sm" onclick="appTutorial.next()">
            ${this.currentStep === this.steps.length - 2 ? 'Finish Tour ✓' : 'Next →'}
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(popover);

    // Calculate positioning with collision detection
    const pRect = popover.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    let pTop = rect.bottom + 14;
    let pLeft = rect.left;

    if (pTop + pRect.height > vh - 20) {
      pTop = Math.max(20, rect.top - pRect.height - 14);
    }
    if (pLeft + pRect.width > vw - 20) {
      pLeft = Math.max(20, vw - pRect.width - 20);
    }
    if (vw < 500) {
      pLeft = (vw - pRect.width) / 2;
    }

    popover.style.top = Math.max(10, pTop) + 'px';
    popover.style.left = Math.max(10, pLeft) + 'px';

    if (targetEl && targetEl.scrollIntoView) {
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }
};

// ---- Initialize ----
document.addEventListener('DOMContentLoaded', () => {
  authManager.checkAuth();
  setActiveSidebarLink();
  initSidebarToggle();
  initAIChat();
  initNavigation();
  initSearch();
  initTabs();
  initTooltips();

  requestAnimationFrame(() => {
    animateProgressBars();
    initCircularProgress();
    animateCounters();
  });

  // Page entrance animation
  const content = document.querySelector('.page-content');
  if (content) content.classList.add('page-enter');
});

