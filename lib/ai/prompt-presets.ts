export type PresetId =
  | "procurement"
  | "newInvestment"
  | "learnings"
  | "revenueGrowth"
  | "promisedVsActual";

export const PROMPT_PRESETS: { id: PresetId; label: string; text: string }[] = [
  {
    id: "procurement",
    label: "Procurement Savings",
    text:
      "I have a few pharma companies in my portfolio and I have information from my portfolio companies on the following:\n" +
      "- Meeting notes (internal and external meetings)\n" +
      "- P&L statements and financial performance over time\n" +
      "- Operational KPIs (cost structures, margins, R&D spend, sales growth, attrition, etc.)\n" +
      "- Details from or about companies about their cost structure, vendors, items to be procured and estimated spend.\n" +
      "\n" +
      "Please go through the data to see all the necessary information. Please analyze this data and give me detailed, actionable recommendations across the portfolio. Specifically:\n" +
      "\n" +
      "## 1. Vendor Consolidation & Bulk Buying\n" +
      "- Identify vendors supplying the same items across multiple companies.\n" +
      "- Recommend which vendors should be unified at portfolio level for bulk buying.\n" +
      "- Estimate cost savings from consolidated negotiations.\n" +
      "\n" +
      "## 2. Vendor Price Benchmarking & Switching\n" +
      "- Compare unit prices for the same material/service across vendors.\n" +
      "- Highlight where one vendor is charging more than another for identical or comparable items.\n" +
      "- Recommend switching opportunities and quantify savings.\n" +
      "\n" +
      "## 3. Standardization Opportunities\n" +
      "- Identify over-specifications (e.g., GSM, foil thickness, carton dimensions).\n" +
      "- Recommend harmonization of specifications across companies to reduce SKU complexity and wastage.\n" +
      "- Quantify potential efficiency and material savings.\n" +
      "\n" +
      "## 4. Logistics & Location Optimization\n" +
      "- Highlight where current vendors are located far from plants, adding unnecessary freight costs.\n" +
      "- Suggest switching to regional vendors or consolidating shipments across companies.\n" +
      "- Estimate savings from optimized logistics.\n" +
      "\n" +
      "## 5. Urgent Purchase Reduction via Forecasting\n" +
      "- Identify categories with frequent urgent purchases (typically 15-20% higher cost).\n" +
      "- Recommend ERP/forecasting-driven procurement planning to reduce premium spend.\n" +
      "\n" +
      "## 6. Portfolio-Wide Vendor Strategy\n" +
      "- Recommend a shortlist of \"preferred vendors\" for key categories (packaging, APIs, excipients, raw materials).\n" +
      "- Suggest which vendors to drop, which to expand, and which to negotiate with across the portfolio.\n" +
      "\n" +
      "## 7. Output Format - Pharma Procurement Optimization\n" +
      "\n" +
      "### Portfolio-Level Strategy (Cross-Company)\n" +
      "Summarize what can be achieved across the portfolio:\n" +
      "- Vendors to unify across companies for bulk savings.\n" +
      "- Vendors charging higher vs. lower for the same item → align to the lowest.\n" +
      "- Packaging/Raw material specs that should be standardized.\n" +
      "- Logistics optimizations (regional vendor switches, consolidated shipments).\n" +
      "- Forecasting/ERP adoption to cut urgent purchase premiums.\n" +
      "- Total Estimated Portfolio Savings (₹ + %).\n" +
      "\n" +
      "### Company-Wise Recommendations\n" +
      "\n" +
      "#### Company A (e.g., Sun Pharma)\n" +
      "**Vendors to Switch/Unify:**\n" +
      "- a. Switch packaging vendor \"X\" (₹12/unit) → vendor \"Y\" (₹10/unit) → Save ₹2 Cr annually.\n" +
      "- b. Unify blister foil vendor with Cipla for bulk contract → estimated 6% reduction.\n" +
      "\n" +
      "**Specs Standardization:** Reduce carton GSM from 350 → 300 (aligned with peers) → Save ₹1 Cr.\n" +
      "\n" +
      "**Logistics:** Current supplier for excipients based in North India → switch to regional vendor in Hyderabad plant → Save freight ~₹50L.\n" +
      "\n" +
      "**Total Estimated Savings for Company A:** ₹3.5 Cr (4.2% of procurement).\n" +
      "\n" +
      "#### Company B (e.g., Cipla)\n" +
      "**Vendors to Switch/Unify:**\n" +
      "- a. Overpaying blister foil vendor \"Z\" (₹14/unit vs ₹10 with Sun Pharma vendor) → shift to vendor \"Y\".\n" +
      "- b. Consolidate carton suppliers with Dr. Reddy's → 5% portfolio-wide savings.\n" +
      "\n" +
      "**Specs Standardization:** Reduce over-engineered foil thickness from 30µ → 25µ.\n" +
      "\n" +
      "**Logistics:** Align delivery schedules → bulk shipments every 2 weeks → cut freight 2%.\n" +
      "\n" +
      "**Total Estimated Savings for Company B:** ₹4 Cr (5.1% of procurement).\n" +
      "\n" +
      "#### Company C (e.g., Dr. Reddy's)\n" +
      "**Vendors to Switch/Unify:**\n" +
      "- a. Align excipient vendors with Cipla for bulk rates → Save ₹1.5 Cr.\n" +
      "\n" +
      "**Specs Standardization:** Align carton dimensions across 10 SKUs → reduce wastage.\n" +
      "\n" +
      "**Forecasting:** ERP adoption → cut urgent purchases (15-20% higher cost).\n" +
      "\n" +
      "**Total Estimated Savings for Company C:** ₹2 Cr (3% of procurement).\n" +
      "\n" +
      "### Final Summary Page:\n" +
      "- Portfolio-wide savings: ₹9.5 Cr (≈4.5% of total spend).\n" +
      "- Vendor base reduced by 25%.\n" +
      "- Packaging specs standardized across 3 companies.\n" +
      "- Freight cost cut by ~2%.\n" +
      "- Future: ERP adoption for demand planning → further 3-4% potential savings.\n" +
      "- Any other savings",
  },
  {
    id: "newInvestment",
    label: "New Investment Evaluation",
    text:
      "## Evaluate New Investment Opportunity Against Portfolio\n" +
      "\n" +
      "I have a new potential investment opportunity: I also have access to my internal portfolio database, which includes:\n" +
      "- Meeting notes & transcripts (strategic direction, competitive landscape, management comments).\n" +
      "- Financials (P&L, margins, revenue growth, burn rate, CAC, LTV, etc.).\n" +
      "- Operational KPIs (churn, attrition, R&D spend, regulatory milestones, procurement costs, distribution reach).\n" +
      "- Product catalogs & pipeline data (therapeutic areas, SKUs, formulations, patents).\n" +
      "- Vendor and procurement data.\n" +
      "- Customer and channel data (CRM notes, market served, sales force strength).\n" +
      "- Past investment memos and IC notes.\n" +
      "\n" +
      "Using this data, please evaluate the new company opportunity in detail:\n" +
      "\n" +
      "## 1. Strategic Fit with Portfolio\n" +
      "- Identify overlap with existing portfolio companies (product, customer segment, geography).\n" +
      "- Highlight potential **synergies** (cross-selling, shared distribution, vendor consolidation, bundled offerings).\n" +
      "- Flag **conflicts or cannibalization risks** (e.g., direct competition with an existing company).\n" +
      "\n" +
      "## 2. Market & Competitive Landscape\n" +
      "- Place this company in the context of **industry trends and TAM/SAM/SOM**.\n" +
      "- Compare against portfolio companies' market strategies (who else serves the same customer or market).\n" +
      "- Highlight differentiation vs. **incumbents + portfolio players**.\n" +
      "\n" +
      "## 3. Financial & KPI Benchmarking\n" +
      "- Compare revenue growth, margins, R&D spend, CAC/LTV, burn, sales productivity with **portfolio averages**.\n" +
      "- Flag areas where this company is **stronger/weaker** than portfolio norms.\n" +
      "- Highlight any **red flags** (e.g., overpromised growth, poor unit economics).\n" +
      "\n" +
      "## 4. Procurement & Cost Synergies\n" +
      "- Check if this company uses **similar vendors, raw materials, or distribution partners** as portfolio companies.\n" +
      "- Identify opportunities for **vendor consolidation / bulk procurement** at a portfolio level.\n" +
      "- Estimate cost savings potential.\n" +
      "\n" +
      "## 5. Revenue Synergies & Go-to-Market Leverage\n" +
      "- Identify where this company's **product can be sold through existing portfolio distribution channels**.\n" +
      "- Highlight **cross-sell / upsell** opportunities between portfolio customers.\n" +
      "- Suggest **joint marketing, collective branding, or salesforce sharing** opportunities.\n" +
      "\n" +
      "## 6. Management Promises vs. Portfolio Benchmarks\n" +
      "- Extract commitments from management (growth, hiring, product launches, margin expansion).\n" +
      "- Compare these against what portfolio companies promised vs. delivered.\n" +
      "- Flag if commitments look **realistic or over-optimistic**.\n" +
      "\n" +
      "## 7. Regulatory, Operational, and Execution Risks\n" +
      "- Compare regulatory environment, compliance track record, and approval timelines with portfolio experiences.\n" +
      "- Highlight operational bottlenecks observed in similar portfolio companies.\n" +
      "- Suggest early warning signals.\n" +
      "\n" +
      "## 8. Exit Pathways & Precedents\n" +
      "- Map possible **exit options** (IPO, M&A, strategic sale) based on portfolio history and market activity.\n" +
      "- Compare valuations and multiples to similar companies in the portfolio.\n" +
      "\n" +
      "## 📑 Output Format\n" +
      "\n" +
      "### Opportunity Evaluation -- [Company Name]\n" +
      "\n" +
      "#### 1. Strategic Fit with Portfolio\n" +
      "- Overlaps: ...\n" +
      "- Synergies: ...\n" +
      "- Conflicts: ...\n" +
      "\n" +
      "#### 2. Market & Competitive Landscape\n" +
      "- TAM/SAM/SOM context: ...\n" +
      "- Differentiation: ...\n" +
      "\n" +
      "#### 3. Financial & KPI Benchmarking\n" +
      "- Revenue Growth: [X% vs Portfolio Avg Y%]\n" +
      "- EBITDA Margin: [X% vs Portfolio Avg Y%]\n" +
      "- CAC/LTV: ...\n" +
      "- Burn Multiple: ...\n" +
      "\n" +
      "#### 4. Procurement & Cost Synergies\n" +
      "- Vendor overlaps: ...\n" +
      "- Bulk procurement savings: ...\n" +
      "\n" +
      "#### 5. Revenue Synergies\n" +
      "- Cross-sell opportunities: ...\n" +
      "- Shared GTM/Marketing: ...\n" +
      "\n" +
      "#### 6. Promises vs Realism\n" +
      "- Key commitments: ...\n" +
      "- Portfolio benchmark comparison: ...\n" +
      "\n" +
      "#### 7. Risks\n" +
      "- Regulatory: ...\n" +
      "- Operational: ...\n" +
      "- Market: ...\n" +
      "\n" +
      "#### 8. Exit Pathways\n" +
      "- Likely options: ...\n" +
      "- Valuation comps: ...\n" +
      "\n" +
      "### Final Recommendation:\n" +
      "- Fit with portfolio: High / Medium / Low\n" +
      "- Investment Risk: High / Medium / Low\n" +
      "- Suggested Next Steps: ...",
  },
  {
    id: "learnings",
    label: "Learnings & Business Improvement",
    text:
      "## Prompt for Learnings & Business Improvement (Case-Based Recommendations)\n" +
      "\n" +
      "I have internal data from my portfolio companies, including:\n" +
      "- Meeting notes (commitments made, challenges discussed)\n" +
      "- P&L statements and financial performance over time\n" +
      "- Operational KPIs (cost structures, margins, R&D spend, sales growth, attrition, etc.)\n" +
      "- Recorded learnings from past interventions (e.g., cost savings, process changes, hiring practices, digital adoption)\n" +
      "\n" +
      "Now, for a new company in my portfolio that is facing certain challenges, I want you to:\n" +
      "\n" +
      "## 1. Identify Similar Past Cases\n" +
      "- Search internal data to find companies that faced **similar problems** (e.g., margin pressure, high attrition, packaging costs, regulatory delays).\n" +
      "- Summarize what actions they took to address the issue.\n" +
      "\n" +
      "## 2. Recommend Actions for the Current Company\n" +
      "- Based on those past learnings, recommend **specific actions** that the current company should implement.\n" +
      "- Clearly link the recommendation to a past successful case (e.g., *\"Dr. Reddy's reduced attrition from 22% to 14% by implementing structured career paths --- apply the same here.\"*).\n" +
      "\n" +
      "## 3. Quantify Benefits\n" +
      "- Estimate the **financial or operational impact** of applying these actions, using numbers derived from past results.\n" +
      "  - Cost reduction (₹ or %).\n" +
      "  - Margin improvement.\n" +
      "  - Revenue growth.\n" +
      "  - Productivity increase.\n" +
      "\n" +
      "## 4. Output Format\n" +
      "\n" +
      "### Portfolio Learnings Applied to Current Company\n" +
      "\n" +
      "- **Problem Area:** [e.g., High Packaging Costs]\n" +
      "- **Similar Past Case(s):** [Company X did Y, achieved Z% savings]\n" +
      "- **Recommended Action:** [What this company should do]\n" +
      "- **Estimated Benefit:** [₹ or % improvement, based on internal benchmarks]\n" +
      "\n" +
      "Provide **3--5 such learning-based recommendations per problem area**.",
  },
  {
    id: "revenueGrowth",
    label: "Revenue Growth",
    text:
      "I have a few pharma companies in my portfolio. I have internal data from my portfolio companies, including: meeting notes (internal and external), P&L statements and financial performance over time, operational KPIs (sales growth, customer segments, market share, churn, etc.), product portfolios and distribution channels, marketing spend and campaign results, and other relevant details about products and customers. Please go through the data to see all necessary information. Please analyze this data and give me detailed, actionable recommendations across the portfolio. Specifically:\n" +
      "\n" +
      "## 1. Cross-Selling & Bundling Opportunities:\n" +
      "- Identify complementary products or services among portfolio companies. For example, if Company A has Product X and Company B has Product Y that serve the same customer, suggest bundling X+Y or cross-selling one company's product to the other company's customer base.\n" +
      "- Highlight overlapping customer segments or accounts across companies. For instance, if both companies sell to hospitals or clinics, recommend sharing leads or cross-promoting products.\n" +
      "- Recommend specific bundle deals or cross-sell campaigns (e.g., offer Product X at a discount when bought with Product Y) and estimate the incremental revenue from each opportunity.\n" +
      "\n" +
      "## 2. Shared Sales Channels & Distribution:\n" +
      "- Identify markets or regions where some companies have strong distribution but others do not. Recommend using one company's sales network to distribute another's products (e.g., Company A sells through retail in North India and Company B in South India; propose using Company A's channel to sell Company B's products in North India).\n" +
      "- Suggest consolidation or sharing of distributor relationships if portfolio companies have similar customer types.\n" +
      "- Estimate additional reach and revenue gained by leveraging shared or extended distribution channels.\n" +
      "\n" +
      "## 3. Joint Marketing & Advertising Campaigns:\n" +
      "- Identify similar target audiences (e.g., chronic disease patients, hospitals, pharmacies) across companies. Propose joint marketing campaigns or co-branded advertising to reduce costs and increase reach.\n" +
      "- Recommend combined events, webinars, or trade shows where multiple companies promote each other's products.\n" +
      "- Estimate the cost savings (e.g., split ad spend) and the expected increase in leads or sales from these joint efforts.\n" +
      "\n" +
      "## 4. Product Portfolio & New Market Expansion:\n" +
      "- Identify products or services that are not currently sold in certain market segments or geographies where other portfolio companies operate. For example, if Company C sells Oncology drugs in West India but Company A has an Ophthalmology product, suggest marketing Ophthalmology products in West India through Company C's network.\n" +
      "- Recommend entering new customer segments by leveraging another company's market presence or customer relationships.\n" +
      "- Estimate potential revenue from each expansion (e.g., additional customers × average product price).\n" +
      "\n" +
      "## 5. Pricing & Promotion Optimization:\n" +
      "- Compare pricing strategies across companies for similar products. Identify if one company can adopt another's pricing model (e.g., volume discounts) to boost sales.\n" +
      "- Recommend promotional strategies like bundled discounts, loyalty programs, or subscription models that could increase average order value across portfolio offerings.\n" +
      "- Estimate the revenue uplift or higher margin contribution from these optimized pricing/promotional strategies.\n" +
      "\n" +
      "## 6. Data & CRM-Driven Upselling:\n" +
      "- Use portfolio-wide sales and customer data to identify upsell or repeat-purchase opportunities. For instance, if customers of Company B often need a product that Company A makes, target them with a tailored offer.\n" +
      "- Recommend integrating customer databases or CRM systems (where possible) to share insights on high-value customers and personalize cross-company offerings.\n" +
      "- Estimate the increase in customer lifetime value or retention rates from such data-driven initiatives.\n" +
      "\n" +
      "## 7. Output Format -- Revenue Growth Strategy:\n" +
      "Structure your findings as follows:\n" +
      "\n" +
      "### Portfolio-Level Strategy (Cross-Company):\n" +
      "Summarize opportunities and actions that span the entire portfolio:\n" +
      "- Cross-selling partnerships (e.g., \"Company A's drug X to be sold through Company B's salesforce in Region Z\" with expected revenue impact).\n" +
      "- Joint marketing initiatives (e.g., combined ad campaigns or events) and projected increase in leads or market awareness.\n" +
      "- Shared distribution or channel expansion (e.g., \"enter 2 new markets using existing networks\" with revenue estimates).\n" +
      "- Pricing or promotional programs to be standardized or aligned (e.g., \"apply volume discount from Company C to Company A's products\").\n" +
      "- Estimated total incremental portfolio revenue (₹ + % of current sales).\n" +
      "\n" +
      "### Company-Wise Recommendations:\n" +
      "For each company, list specific actions and expected gains. For example:\n" +
      "\n" +
      "#### Company A (e.g., Sun Pharma)\n" +
      "- **Cross-Sell/Bundling:** Sell Company B's Product Y through Company A's hospital network → Add ₹X Cr revenue. Offer bundled discount on (A's X + B's Y) → Increase basket size by Y%.\n" +
      "- **Channel Expansion:** Use Company C's distributors in South India to launch Company A's new vitamin line → Projected ₹Z Cr from new market.\n" +
      "- **Marketing:** Join Company B in a co-branded diabetes awareness campaign → Reach additional 10,000 patients.\n" +
      "- **Pricing/Promos:** Introduce a subscription program for Product X (20% lower price per unit for 6-month commitment) → Retain 5% more patients → +₹W Cr.\n" +
      "- **Total Estimated Revenue Gain for Company A:** ₹X Cr (~Y% of current revenue).\n" +
      "\n" +
      "#### Company B (e.g., Cipla)\n" +
      "- **Cross-Sell/Bundling:** Bundle Company A's drug X with Company B's drug Z for oncology clinics → +₹V Cr.\n" +
      "- **Channel Sharing:** Leverage Company A's retail pharmacy network for Company B's over-the-counter products in North India → +₹U Cr.\n" +
      "- **Marketing:** Co-host medical conferences with Company C to introduce combined product line → +N new B2B leads.\n" +
      "- **Pricing/Promos:** Align volume discount on common raw materials with Company C to reduce cost & possibly lower end price → stimulate extra sales.\n" +
      "- **Total Estimated Revenue Gain for Company B:** ₹Y Cr (~Z% of current revenue).\n" +
      "\n" +
      "#### Company C (e.g., Dr. Reddy's)\n" +
      "- **Cross-Sell/Bundling:** Sell Company A's dermatology products through Company C's e-commerce portal → +₹P Cr.\n" +
      "- **Channel Expansion:** Use Company B's presence in smaller towns to introduce Company C's cardiology portfolio → +₹Q Cr.\n" +
      "- **Marketing:** Joint digital marketing with Company A targeting rural clinics (shared content and budget) → 15% increase in brand awareness.\n" +
      "- **Data/CRM:** Integrate loyalty program data with Company B to cross-promote supplements to chronic disease patients → +₹R Cr from upsells.\n" +
      "- **Total Estimated Revenue Gain for Company C:** ₹Z Cr (~W% of current revenue).\n" +
      "\n" +
      "### Final Summary Page:\n" +
      "- Portfolio-wide incremental revenue: ₹T Cr (≈U% of total current sales).\n" +
      "- Number of new cross-selling partnerships established: e.g., 4 agreements.\n" +
      "- Joint marketing campaigns launched: e.g., 3 major campaigns, reaching an additional V target customers.\n" +
      "- New markets entered (geographies or segments): e.g., 2 new states, 1 new customer segment.\n" +
      "- Customer retention/upsell improvement: e.g., loyalty integration increased repeat purchases by X%.\n" +
      "- Any additional strategic initiatives (e.g., digital platform integration for recurring revenue).",
  },
  {
    id: "promisedVsActual",
    label: "Promises vs Delivered",
    text:
      "# Promises vs. Delivered (Accountability Tracker)\n" +
      "\n" +
      "I have several companies in my portfolio. I also have internal data from these companies, including:\n" +
      "- **Meeting notes & transcripts** (commitments made by promoters/management regarding revenue, margins, product launches, hiring, capex, regulatory approvals, cost optimization, etc.)\n" +
      "- **P&L statements and financial performance reports**\n" +
      "- **Operational KPIs** (sales growth, EBITDA, attrition, R&D progress, customer acquisition, etc.)\n" +
      "- **Internal updates** (reasons for variance, market context, competitor activity)\n" +
      "\n" +
      "Please analyze this data and give me a structured comparison of **what was promised vs. what was delivered**.\n" +
      "\n" +
      "## 1. Extract Promises / Commitments\n" +
      "- Parse meeting notes and management discussions.\n" +
      "- Identify **explicit commitments** (with numerical targets) and **implicit commitments** (strategic goals, qualitative promises).\n" +
      "- Examples:\n" +
      "  - \"We will grow revenue by 20% in FY25.\"\n" +
      "  - \"EBITDA margin will expand by 200 bps.\"\n" +
      "  - \"We will launch 3 oncology drugs this year.\"\n" +
      "  - \"We will reduce attrition to below 15%.\"\n" +
      "\n" +
      "## 2. Match Promises to Delivered Results\n" +
      "- Compare each commitment against actual company data (P&L, KPI dashboards, operational reports).\n" +
      "- Classify each commitment as:\n" +
      "  - ✅ **Met / Exceeded**\n" +
      "  - ⚠ **Partially Met**\n" +
      "  - ❌ **Missed**\n" +
      "\n" +
      "## 3. Highlight Gaps & Variances\n" +
      "- For **missed/partially met commitments**, quantify the **variance**:\n" +
      "  - Example: *Promised +20% revenue, delivered +15% → Shortfall -5%.*\n" +
      "- Attribute reasons wherever available (regulatory delays, higher costs, pricing pressure, capex slippage, slower hiring, attrition, etc.).\n" +
      "- Note **time dimension** (if the commitment was met but delayed).\n" +
      "\n" +
      "## 4. Output Format -- Company-Wise Dashboard\n" +
      "\n" +
      "### Promises vs. Delivered -- Company X\n" +
      "\n" +
      "| Commitment (Promise) | Promised Value / Target | Actual Delivered | Status (Met/Partial/Missed) | Variance | Notes / Reasons |\n" +
      "|---------------------|------------------------|------------------|----------------------------|----------|----------------|\n" +
      "| Revenue Growth (FY25) | +20% | +15% | ❌ Missed | -5% | U.S. generics pricing pressure |\n" +
      "| EBITDA Margin | 18% | 19% | ✅ Met | +1% | Cost optimization success |\n" +
      "| New Product Launches | 2 | 1 | ⚠ Partial | -1 | Regulatory approval delay |\n" +
      "| Attrition Reduction | <15% | 18% | ❌ Missed | +3% | High voluntary exits in sales team |\n" +
      "\n" +
      "## 5. Portfolio-Level View\n" +
      "\n" +
      "After analyzing all companies, produce a **consolidated accountability report**:\n" +
      "- % of commitments **Met, Partial, Missed** across portfolio.\n" +
      "- **Top 5 areas of consistent under-delivery** (e.g., revenue over-promise, delayed product launches, attrition control failures).\n" +
      "- **Top 5 areas of consistent over-delivery** (e.g., margin expansion, cost optimization).\n" +
      "- **Lessons learned & recommendations**:\n" +
      "  - Improve realism in financial projections.\n" +
      "  - Align incentives with achievable milestones.\n" +
      "  - Strengthen regulatory tracking for product launches.\n" +
      "  - Invest in retention programs if attrition targets are consistently missed.\n" +
      "\n" +
      "## 6. Final Output Structure\n" +
      "- **Company-Wise Accountability Tables** (Promises vs. Delivered).\n" +
      "- **Portfolio-Level Dashboard** (commitment fulfillment rates, common gaps, learnings).\n" +
      "- **Actionable Recommendations** to improve management accountability and forecasting accuracy.",
  },
];
