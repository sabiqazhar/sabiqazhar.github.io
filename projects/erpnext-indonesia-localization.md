# ERPNext Indonesia Localization

## Overview

One of our clients relied on ERPNext as their primary ERP system to manage daily business operations, including sales, invoicing, and accounting. With the introduction of Indonesia's Coretax system, they faced a major challenge: ERPNext did not natively support generating XML files in the format required by Coretax for tax reporting.

To bridge this gap, we developed **ERPNext Indonesia Localization**, an open-source localization module that extends ERPNext with Indonesia-specific tax features. The application transforms transaction data stored in ERPNext into Coretax-compatible XML files, enabling businesses to comply with Indonesian tax regulations without changing their existing ERP workflow.

Beyond XML generation, the project also introduces localization features tailored for Indonesian companies, making ERPNext more practical for businesses operating under local tax requirements.

---

## Problem

The client needed to:

* Continue using ERPNext as the source of truth for all business transactions.
* Generate Coretax-compliant XML directly from ERPNext data.
* Eliminate manual data entry and spreadsheet-based tax reporting.
* Reduce reporting errors and speed up tax submission.

Since these capabilities were not available out of the box, a custom localization solution was required.

---

## Solution

ERPNext Indonesia Localization extends ERPNext by introducing tax-specific workflows and utilities designed for the Indonesian market.

Key capabilities include:

* Generate Coretax-compatible XML from ERPNext transactions.
* Import and synchronize tax-related information.
* Support Indonesian VAT (PPN) business processes.
* Manage company and branch tax identities (NITKU).
* Batch export tax documents for large transaction volumes.
* Seamlessly integrate into existing ERPNext workflows.

---

## Technical Stack

* Python
* Frappe Framework
* ERPNext
* MariaDB
* JavaScript

---

## My Contributions

* Designed and implemented ERPNext customizations using the Frappe Framework.
* Developed business logic for transforming ERPNext transaction data into Coretax-compatible XML.
* Built custom DocTypes, backend services, and client-side features.
* Automated tax reporting workflows to reduce manual processing.
* Enhanced ERPNext to better support Indonesian taxation and business regulations.

---

## Impact

The project significantly reduced manual tax reporting effort by allowing finance teams to generate compliant Coretax XML directly from ERPNext. It improved reporting accuracy, streamlined operational workflows, and enabled the client to meet Indonesian tax compliance requirements without migrating away from their existing ERP system.
