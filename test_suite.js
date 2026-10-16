// test_suite.js - Comprehensive Verification Suite for AFTERCLASS AI
// Tests Scenarios A through G

const fs = require('fs');
const path = require('path');

// Mock localStorage & sessionStorage
class StorageMock {
  constructor() {
    this.store = {};
  }
  getItem(key) {
    return this.store[key] || null;
  }
  setItem(key, value) {
    this.store[key] = String(value);
  }
  removeItem(key) {
    delete this.store[key];
  }
  clear() {
    this.store = {};
  }
}

const mockLocalStorage = new StorageMock();
const mockSessionStorage = new StorageMock();

// Mock Browser Environment
global.localStorage = mockLocalStorage;
global.sessionStorage = mockSessionStorage;
global.window = {
  location: { href: '' },
  innerWidth: 1200
};
global.requestAnimationFrame = (cb) => {};
global.document = {
  createElement: () => ({
    appendChild: () => {},
    classList: { add: () => {}, remove: () => {} },
    style: {},
    setAttribute: () => {},
    addEventListener: () => {}
  }),
  body: { appendChild: () => {} },
  getElementById: (id) => null,
  querySelector: () => null,
  querySelectorAll: () => [],
  addEventListener: () => {}
};

// Global toasts helper
global.showToast = (msg, type) => {};

// Load app.js into context
const appJsPath = path.join(__dirname, 'app.js');
const appJsContent = fs.readFileSync(appJsPath, 'utf8') + '\nglobal.userData = userData;\nglobal.authManager = authManager;\nglobal.appTutorial = appTutorial;\n';

// Evaluate in global context
eval(appJsContent);

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function assert(condition, message) {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  ✓ PASS: ${message}`);
  } else {
    failedTests++;
    console.error(`  ✕ FAIL: ${message}`);
  }
}

console.log('=====================================================');
console.log('RUNNING AFTERCLASS AI E2E VERIFICATION SUITE');
console.log('=====================================================\n');

// ----------------------------------------------------
// SCENARIO E: PRESET USERS & DATA PRESERVATION
// ----------------------------------------------------
console.log('--- SCENARIO E: Existing Users & Data Preservation ---');
const initialUsers = userData.getUsers();
assert(initialUsers['user_adil'] !== undefined, 'Preset user_adil exists');
assert(initialUsers['user_adil'].readinessScore === 72, 'Adil retains 72% readiness score');
assert(initialUsers['user_adil'].projects === 7, 'Adil retains 7 projects');
assert(initialUsers['user_priya'] !== undefined, 'Preset user_priya exists');
assert(initialUsers['user_priya'].readinessScore === 88, 'Priya retains 88% readiness score');
assert(initialUsers['user_sam'] !== undefined, 'Preset user_sam exists');
assert(initialUsers['user_sam'].readinessScore === 65, 'Sam retains 65% readiness score');
console.log('');

// ----------------------------------------------------
// SCENARIO A: FIRST-TIME USER ONBOARDING & FRESH WORKSPACE
// ----------------------------------------------------
console.log('--- SCENARIO A: First-Time User Registration & Fresh Workspace ---');
const newUserEmail = 'alex.morgan@stanford.edu';
const signupRes = authManager.signUp({
  firstName: 'Alex',
  lastName: 'Morgan',
  email: newUserEmail,
  authProvider: 'Email'
});

assert(signupRes && signupRes.id, 'New user successfully registered');
const newUserId = signupRes.id;
const freshUser = userData.getUsers()[newUserId];

assert(freshUser.name === 'Alex Morgan', 'Full name correctly initialized');
assert(freshUser.initials === 'AM', 'Initials correctly computed');
assert(freshUser.email === newUserEmail, 'Email matches registration input');
assert(freshUser.readinessScore === 0, 'Clean state: readinessScore is 0%');
assert(freshUser.learningProgress === 0, 'Clean state: learningProgress is 0%');
assert(freshUser.projects === 0, 'Clean state: projects count is 0');
assert(freshUser.streak === 0, 'Clean state: streak is 0');
assert(freshUser.focusMinutes === 0, 'Clean state: focusMinutes is 0');
assert(Array.isArray(freshUser.tasks) && freshUser.tasks.length === 0, 'Clean state: tasks collection is empty');
assert(Array.isArray(freshUser.recentActivity) && freshUser.recentActivity.length === 0, 'Clean state: recentActivity is empty');
assert(freshUser.tutorialComplete === false, 'Tutorial status is incomplete');
assert(freshUser.onboardingComplete === false, 'Onboarding status is incomplete');

// Simulate Onboarding Step Completion
const onboardingUpdates = {
  university: 'Stanford University',
  degree: 'M.S.',
  specialization: 'Artificial Intelligence',
  year: '1st Year',
  targetRole: 'AI Research Engineer',
  careerInterests: ['AI Research Engineer', 'Machine Learning Engineer'],
  skills: ['Python', 'PyTorch', 'Data Structures', 'Linear Algebra'],
  subjects: [
    { name: 'Deep Learning', progress: 0, color: 'var(--brand-primary)' },
    { name: 'Reinforcement Learning', progress: 0, color: 'var(--brand-accent)' }
  ],
  readinessScore: 28,
  onboardingComplete: true
};

userData.updateUser(newUserId, onboardingUpdates);
const onboardedUser = userData.getUsers()[newUserId];
assert(onboardedUser.university === 'Stanford University', 'Onboarding persists university');
assert(onboardedUser.skills.length === 4, 'Onboarding persists 4 selected skills');
assert(onboardedUser.readinessScore === 28, 'Baseline readiness score set to 28%');
assert(onboardedUser.onboardingComplete === true, 'Onboarding marked as complete');

// Simulate Tutorial Completion
userData.updateUser(newUserId, { tutorialComplete: true });
assert(userData.getUsers()[newUserId].tutorialComplete === true, 'Tutorial marked as complete');
console.log('');

// ----------------------------------------------------
// SCENARIO B: RETURNING USER SESSIONS & RETENTION
// ----------------------------------------------------
console.log('--- SCENARIO B: Returning User & Session Resumption ---');
authManager.signOut();
assert(localStorage.getItem('ac_current_user_id') === null, 'Sign out clears active session pointer');
assert(localStorage.getItem('ac_logged_in') === null, 'Sign out clears logged in flag');

// Sign back in with Alex's account
const signinRes = authManager.signIn(newUserEmail, 'password123');
assert(signinRes && signinRes.id === newUserId, 'Alex successfully signs back into the same account');

const activeAlex = userData.getCurrentUser();
assert(activeAlex.id === newUserId, 'Active session retrieves Alex correctly');
assert(activeAlex.university === 'Stanford University', 'Alex university data intact');
assert(activeAlex.readinessScore === 28, 'Alex readiness score intact');
assert(activeAlex.tutorialComplete === true, 'Alex tutorial does not restart automatically');
console.log('');

// ----------------------------------------------------
// SCENARIO C: TWO DIFFERENT USERS (DATA ISOLATION)
// ----------------------------------------------------
console.log('--- SCENARIO C: Two Different Users (Full Isolation) ---');
// User A: Alice
const userA = authManager.signUp({
  firstName: 'Alice',
  lastName: 'Walker',
  email: 'alice@mit.edu',
  authProvider: 'Email'
});

// User B: Bob
const userB = authManager.signUp({
  firstName: 'Bob',
  lastName: 'Taylor',
  email: 'bob@berkeley.edu',
  authProvider: 'Email'
});

assert(userA.id !== userB.id, 'User A and User B have distinct unique IDs');

// User A adds tasks and study sessions
userData.addTask(userA.id, {
  title: 'Alice Machine Learning Lab',
  subject: 'Deep Learning',
  priority: 'high'
});
userData.saveFocusSession(userA.id, 45, 'Deep Learning');

// User B adds tasks and study sessions
userData.addTask(userB.id, {
  title: 'Bob UI Design Sprint',
  subject: 'Human Computer Interaction',
  priority: 'medium'
});
userData.saveFocusSession(userB.id, 30, 'Design Systems');

const dataA = userData.getUsers()[userA.id];
const dataB = userData.getUsers()[userB.id];

assert(dataA.tasks.length === 1 && dataA.tasks[0].title === 'Alice Machine Learning Lab', 'User A has only User A tasks');
assert(dataB.tasks.length === 1 && dataB.tasks[0].title === 'Bob UI Design Sprint', 'User B has only User B tasks');
assert(dataA.focusMinutes === 45, 'User A logged 45 focus minutes');
assert(dataB.focusMinutes === 30, 'User B logged 30 focus minutes');
assert(dataA.recentActivity.some(a => a.title.includes('Deep Learning')), 'User A activity scoped to Deep Learning');
assert(!dataA.recentActivity.some(a => a.title.includes('Design Systems')), 'User A has no User B activity bleed');
assert(dataB.recentActivity.some(a => a.title.includes('Design Systems')), 'User B activity scoped to Design Systems');
assert(!dataB.recentActivity.some(a => a.title.includes('Deep Learning')), 'User B has no User A activity bleed');

// Test Switcher scoping
userData.setCurrentUser(dataA);
assert(userData.getCurrentUser().id === userA.id, 'Current user correctly set to User A');
userData.setCurrentUser(dataB);
assert(userData.getCurrentUser().id === userB.id, 'Current user correctly set to User B');
console.log('');

// ----------------------------------------------------
// SCENARIO D: INCOMPLETE ONBOARDING PROGRESS
// ----------------------------------------------------
console.log('--- SCENARIO D: Incomplete Onboarding Progress ---');
const userD = authManager.signUp({
  firstName: 'David',
  lastName: 'Miller',
  email: 'david@cmu.edu',
  authProvider: 'Email'
});

// User completes step 1 only
userData.updateUser(userD.id, {
  university: 'Carnegie Mellon',
  degree: 'B.S.',
  specialization: 'Information Systems',
  onboardingDraftStep: 2
});

const refreshedUser = userData.getUsers()[userD.id];
assert(refreshedUser.onboardingComplete === false, 'User D is still marked onboardingComplete: false');
assert(refreshedUser.onboardingDraftStep === 2, 'User D saved progress step 2 is preserved');
assert(refreshedUser.university === 'Carnegie Mellon', 'User D university is preserved');
console.log('');

// ----------------------------------------------------
// SCENARIO F: FAILURE HANDLING & VALIDATION
// ----------------------------------------------------
console.log('--- SCENARIO F: Failure Handling & Validation ---');
// Duplicate email test
const duplicateRes = authManager.signUp({
  firstName: 'Imposter',
  lastName: 'Alex',
  email: newUserEmail // already used by alex.morgan@stanford.edu
});

assert(duplicateRes === null, 'System prevents duplicate email registration');

// Safe fallback for null/missing properties
const emptyUser = userData.initCleanUser();
assert(emptyUser.firstName === 'Student', 'Safe fallback for missing firstName');
assert(emptyUser.readinessScore === 0, 'Safe zero value for readinessScore');
assert(Array.isArray(emptyUser.tasks), 'Safe empty array for tasks');
console.log('');

// ----------------------------------------------------
// SCENARIO G: TUTORIAL STEPS & WORKSPACE SWITCHER
// ----------------------------------------------------
console.log('--- SCENARIO G: Tutorial Definition & Navigation Integrity ---');
assert(typeof appTutorial !== 'undefined', 'appTutorial is defined in app.js');
assert(Array.isArray(appTutorial.steps) && appTutorial.steps.length === 7, 'Guided tutorial contains 7 structured steps');

appTutorial.steps.forEach((step, idx) => {
  if (idx === 0) {
    assert(step.type === 'modal' && step.isWelcome === true, 'Step 1 is Welcome Modal');
  } else if (idx === 6) {
    assert(step.type === 'modal' && step.isFinish === true, 'Step 7 is Completion Modal');
  } else {
    assert(typeof step.target === 'string' && step.target.length > 0, `Step ${idx + 1} spotlight target defined: ${step.target}`);
  }
});
console.log('');

// ----------------------------------------------------
// VERIFICATION SUMMARY
// ----------------------------------------------------
console.log('=====================================================');
console.log(`TEST RESULTS: ${passedTests}/${totalTests} PASSED (${failedTests} FAILED)`);
console.log('=====================================================');

if (failedTests > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
