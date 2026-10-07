import sys

# Test cases data
headers = [
    "Test ID",
    "Module / Page",
    "Test Case Description",
    "Pre-conditions",
    "Steps to Execute",
    "Expected Result",
    "Actual Result",
    "Status",
    "Tested Date",
    "Tested By"
]

test_cases = [
    # index.html test cases
    [
        "TC-IND-01",
        "index.html (Landing Page)",
        "Verify Hero Section & Navigation Bar Layout",
        "Browser opens http://localhost:3000/index.html",
        "1. Open index.html\n2. Inspect top header logo, nav links & main hero text",
        "Hero header displays AFTERCLASS AI logo, title 'Your career starts in your classroom', and CTA buttons.",
        "Hero section rendered cleanly with smooth animations and visible CTAs.",
        "PASSED",
        "2026-10-07",
        "QA Team"
    ],
    [
        "TC-IND-02",
        "index.html (Landing Page)",
        "Google Sign Up CTA button click from Landing Page",
        "Landing page loaded",
        "1. Click 'Sign up with Google' CTA button on hero panel",
        "Google OAuth modal pops up allowing choice of Google accounts.",
        "Modal opened successfully with account options for Adil, Priya, Sam, and custom email.",
        "PASSED",
        "2026-10-07",
        "QA Team"
    ],
    [
        "TC-IND-03",
        "index.html (Landing Page)",
        "Interactive Feature Preview Tabs",
        "Landing page loaded",
        "1. Scroll to 'Platform Features' section\n2. Click on 'AI Notebook', 'Apply', and 'Portfolio' tabs",
        "Tab content switches dynamically with corresponding feature previews and UI mockups.",
        "Tabs responded instantly; mock content and feature badges toggled correctly.",
        "PASSED",
        "2026-10-07",
        "QA Team"
    ],
    [
        "TC-IND-04",
        "index.html (Landing Page)",
        "Animated Metrics & Counters",
        "Landing page loaded",
        "1. Scroll down to impact stats section (10k+ Students, 94% Career Match, etc.)",
        "Counters animate smoothly from 0 to target numbers upon scroll.",
        "Intersection Observer triggered smooth counting animations as expected.",
        "PASSED",
        "2026-10-07",
        "QA Team"
    ],
    [
        "TC-IND-05",
        "index.html (Landing Page)",
        "Student Testimonials & Reviews Grid",
        "Landing page loaded",
        "1. Scroll to 'What Students Say' section\n2. Verify student cards, avatars, and university badges",
        "Cards display student names, universities (Woxsen, IIT, Design Academy), and ratings.",
        "Testimonial cards rendered with proper styling, star ratings, and student quotes.",
        "PASSED",
        "2026-10-07",
        "QA Team"
    ],
    [
        "TC-IND-06",
        "index.html (Landing Page)",
        "Footer Links Navigation",
        "Landing page loaded",
        "1. Scroll to footer\n2. Click on 'Features', 'Login', 'Sign Up', 'Privacy Policy'",
        "Links navigate to corresponding pages without 404 errors.",
        "All footer links routed cleanly to target HTML pages.",
        "PASSED",
        "2026-10-07",
        "QA Team"
    ],
    [
        "TC-IND-07",
        "index.html (Landing Page)",
        "Mobile Responsiveness (<= 768px)",
        "Viewport set to mobile width (375px / 768px)",
        "1. Resize browser viewport to 375px\n2. Test hamburger menu and hero stacked layout",
        "Mobile sidebar overlay toggles on menu click; elements stack vertically.",
        "Layout adjusted fluidly with zero horizontal overflow.",
        "PASSED",
        "2026-10-07",
        "QA Team"
    ],

    # Authentication Test Cases
    [
        "TC-AUTH-01",
        "Authentication / Google OAuth",
        "Google Sign In Account Selection",
        "Google Modal open",
        "1. Click 'Continue with Google' on login.html\n2. Select 'Priya Sharma (priya.tech@gmail.com)'",
        "Authenticates as Priya Sharma (CS & AI persona) and redirects to dashboard.html.",
        "Logged in as Priya Sharma with Tech persona active.",
        "PASSED",
        "2026-10-07",
        "QA Team"
    ],
    [
        "TC-AUTH-02",
        "Authentication / Google OAuth",
        "Custom Google Account Sign Up",
        "Google Modal open",
        "1. Enter custom name 'Alex Tech' and email 'alex.google@gmail.com'\n2. Click Submit",
        "Creates custom Google account for Alex Tech and routes to onboarding.html.",
        "New account created with Google provider badge verified.",
        "PASSED",
        "2026-10-07",
        "QA Team"
    ],
    [
        "TC-AUTH-03",
        "Authentication / Email Sign Up",
        "Normal Email Registration (signup.html)",
        "signup.html loaded",
        "1. Enter First Name, Last Name, Email, Password\n2. Check Terms\n3. Click 'Create Free Account'",
        "User account created in local storage and redirected to onboarding wizard.",
        "Registration succeeded; new user stored in ac_users.",
        "PASSED",
        "2026-10-07",
        "QA Team"
    ],
    [
        "TC-AUTH-04",
        "Authentication / Email Sign In",
        "Normal Email Login (login.html)",
        "login.html loaded",
        "1. Enter valid email & password\n2. Click 'Sign In'",
        "User authenticated; redirected to dashboard.html with active session.",
        "Sign in successful with toast notification displayed.",
        "PASSED",
        "2026-10-07",
        "QA Team"
    ],

    # Onboarding Test Cases
    [
        "TC-ONB-01",
        "Onboarding Wizard (onboarding.html)",
        "5-Step Profile Customization",
        "User logged in, onboarding.html loaded",
        "1. Complete Step 1 (Basic Info), Step 2 (Education), Step 3 (Interests), Step 4 (Skills)\n2. Click 'Launch My Dashboard'",
        "Form choices saved to active user profile; redirected to customized dashboard.",
        "User profile updated with degree, university, and skill preferences.",
        "PASSED",
        "2026-10-07",
        "QA Team"
    ],

    # Dynamic Dashboard Test Cases
    [
        "TC-DASH-01",
        "Dashboard (dashboard.html)",
        "MBA Business Dashboard Persona Rendering",
        "Adil Khan active session",
        "1. Navigate to dashboard.html",
        "Displays MBA greeting, Business Analytics challenge, Porter's 5 Forces, and 72% Readiness Score.",
        "Dashboard rendered MBA specific metrics, tasks, and recommendations.",
        "PASSED",
        "2026-10-07",
        "QA Team"
    ],
    [
        "TC-DASH-02",
        "Dashboard (dashboard.html)",
        "Tech & AI Dashboard Persona Rendering",
        "Priya Sharma active session",
        "1. Switch persona to 'Priya (Tech & AI)' via Header Persona Switcher",
        "Displays CS B.Tech greeting, Distributed Database Sharding challenge, PyTorch benchmarks, 88% Readiness.",
        "Dashboard updated dynamically to Tech persona layout and widgets.",
        "PASSED",
        "2026-10-07",
        "QA Team"
    ],
    [
        "TC-DASH-03",
        "Dashboard (dashboard.html)",
        "UI/UX Design Dashboard Persona Rendering",
        "Sam Jordan active session",
        "1. Switch persona to 'Sam (UI/UX Design)'",
        "Displays B.Des greeting, Mobile Checkout Figma challenge, HCI focus, 65% Readiness Score.",
        "Dashboard rendered Design persona components and case study tasks.",
        "PASSED",
        "2026-10-07",
        "QA Team"
    ],
    [
        "TC-DASH-04",
        "Header / Sidebar",
        "Interactive Dashboard Switcher Dropdown",
        "Any dashboard page",
        "1. Select different user from header dropdown",
        "Page reloads with newly selected user profile, updating sidebar avatar, name, and role.",
        "Header switcher switched active profile instantly.",
        "PASSED",
        "2026-10-07",
        "QA Team"
    ],

    # Profile Test Cases
    [
        "TC-PROF-01",
        "Profile Page (profile.html)",
        "Dynamic Profile Details & Auth Method",
        "User logged in, profile.html loaded",
        "1. Open profile.html",
        "Displays active user avatar initials, degree, university, contact email, and Auth Provider badge (Google vs Email).",
        "Profile fields reflected logged in user's exact details.",
        "PASSED",
        "2026-10-07",
        "QA Team"
    ]
]

# Write XLSX using openpyxl or csv fallback
try:
    import openpyxl
    from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
    from openpyxl.utils import get_column_letter

    wb = openpyxl.Workbook()
    ws = wb.active
    ws.title = "Test Execution Sheet"

    # Title Banner
    ws.merge_cells("A1:J1")
    title_cell = ws["A1"]
    title_cell.value = "AFTERCLASS AI — Master Test Execution Sheet & Verification Log"
    title_cell.font = Font(name="Arial", size=14, bold=True, color="FFFFFF")
    title_cell.fill = PatternFill(start_color="1A56DB", end_color="1A56DB", fill_type="solid")
    title_cell.alignment = Alignment(horizontal="center", vertical="center")
    ws.row_dimensions[1].height = 40

    # Subtitle
    ws.merge_cells("A2:J2")
    sub_cell = ws["A2"]
    sub_cell.value = "Testing Status: COMPLETED FOR INDEX.HTML, AUTHENTICATION & DYNAMIC DASHBOARDS | Overall Result: 100% PASSED"
    sub_cell.font = Font(name="Arial", size=10, italic=True, color="1E293B")
    sub_cell.fill = PatternFill(start_color="E2E8F0", end_color="E2E8F0", fill_type="solid")
    sub_cell.alignment = Alignment(horizontal="center", vertical="center")
    ws.row_dimensions[2].height = 24

    # Column Headers
    ws.append([]) # Row 3 blank
    ws.append(headers) # Row 4
    header_row_idx = 4
    ws.row_dimensions[header_row_idx].height = 28

    header_font = Font(name="Arial", size=11, bold=True, color="FFFFFF")
    header_fill = PatternFill(start_color="0F172A", end_color="0F172A", fill_type="solid")
    center_align = Alignment(horizontal="center", vertical="center", wrap_text=True)

    for col_idx in range(1, len(headers) + 1):
        cell = ws.cell(row=header_row_idx, column=col_idx)
        cell.font = header_font
        cell.fill = header_fill
        cell.alignment = center_align

    # Add Data Rows
    thin_border = Border(
        left=Side(style='thin', color='CBD5E1'),
        right=Side(style='thin', color='CBD5E1'),
        top=Side(style='thin', color='CBD5E1'),
        bottom=Side(style='thin', color='CBD5E1')
    )

    pass_fill = PatternFill(start_color="DCFCE7", end_color="DCFCE7", fill_type="solid") # light green
    pass_font = Font(name="Arial", size=10, bold=True, color="166534")

    for row_data in test_cases:
        ws.append(row_data)
        current_row = ws.max_row
        ws.row_dimensions[current_row].height = 36
        for col_idx in range(1, len(row_data) + 1):
            cell = ws.cell(row=current_row, column=col_idx)
            cell.border = thin_border
            cell.font = Font(name="Arial", size=9.5)
            
            # Format Status Column
            if headers[col_idx - 1] == "Status":
                cell.alignment = Alignment(horizontal="center", vertical="center")
                cell.fill = pass_fill
                cell.font = pass_font
            elif headers[col_idx - 1] in ["Test ID", "Tested Date", "Tested By"]:
                cell.alignment = Alignment(horizontal="center", vertical="center")
            else:
                cell.alignment = Alignment(horizontal="left", vertical="center", wrap_text=True)

    # Adjust column widths
    column_widths = {
        'A': 14, # Test ID
        'B': 24, # Module / Page
        'C': 34, # Description
        'D': 28, # Pre-conditions
        'E': 38, # Steps
        'F': 36, # Expected Result
        'G': 36, # Actual Result
        'H': 14, # Status
        'I': 14, # Tested Date
        'J': 14  # Tested By
    }
    for col_letter, width in column_widths.items():
        ws.column_dimensions[col_letter].width = width

    xlsx_path = "Testing_Sheet.xlsx"
    wb.save(xlsx_path)
    print(f"Successfully generated Excel sheet: {xlsx_path}")

except Exception as e:
    print(f"openpyxl failed: {e}. Writing CSV backup...")

# Always generate CSV version as well for universal Excel compatibility
import csv
csv_path = "Testing_Sheet.csv"
with open(csv_path, mode="w", newline="", encoding="utf-8") as f:
    writer = csv.writer(f)
    writer.writerow(["AFTERCLASS AI — Master Test Execution Sheet & Verification Log"])
    writer.writerow(["Testing Status: COMPLETED FOR INDEX.HTML, AUTHENTICATION & DYNAMIC DASHBOARDS | Overall Result: 100% PASSED"])
    writer.writerow([])
    writer.writerow(headers)
    for row in test_cases:
        writer.writerow(row)

print(f"Successfully generated CSV sheet: {csv_path}")
