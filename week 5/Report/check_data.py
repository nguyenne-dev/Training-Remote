from pathlib import Path
import pandas as pd

current_dir = Path(__file__).parent
excel_file = current_dir / "sample.xlsx"

df = pd.read_excel(excel_file)

df = df.dropna(subset=["Subject"])


def categorize(subject):
    subject = str(subject).upper()

    if "ENROLL" in subject:
        return "Enrollment Issue"

    if "DROPOUT" in subject:
        return "Dropout Issue"

    if "MAIL" in subject or "OUTLOOK" in subject:
        return "Email Issue"

    if "ECOUNT" in subject or "TÀI KHOẢN" in subject:
        return "Account Access Issue"

    if "PAYMENT" in subject:
        return "Payment Issue"

    if "ĐỔI TÊN" in subject:
        return "Student Name Change"

    if "CRM" in subject:
        return "CRM Issue"

    return "Other"


# ====================
# Category Report
# ====================

df["Category"] = df["Subject"].apply(categorize)

category_report = (
    df["Category"]
    .value_counts()
    .reset_index()
)

category_report.columns = [
    "Category",
    "Count"
]

category_report["Percent"] = (
    category_report["Count"]
    / category_report["Count"].sum()
    * 100
).round(2)


# ====================
# Priority Report
# ====================

priority_report = (
    df["Priority"]
    .fillna("Unknown")
    .value_counts()
    .reset_index()
)

priority_report.columns = [
    "Priority",
    "Count"
]


# ====================
# State Report
# ====================

state_report = (
    df["Kanban State"]
    .fillna("Unknown")
    .value_counts()
    .reset_index()
)

state_report.columns = [
    "State",
    "Count"
]


# ====================
# Export Excel
# ====================

with pd.ExcelWriter(
    current_dir / "report.xlsx"
) as writer:

    category_report.to_excel(
        writer,
        sheet_name="Category Report",
        index=False
    )

    priority_report.to_excel(
        writer,
        sheet_name="Priority Report",
        index=False
    )

    state_report.to_excel(
        writer,
        sheet_name="State Report",
        index=False
    )

print("Đã tạo report.xlsx")

print("\n=== Category Report ===")
print(category_report)

print("\n=== Priority Report ===")
print(priority_report)

print("\n=== State Report ===")
print(state_report)