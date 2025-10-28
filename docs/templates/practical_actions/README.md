# Altruxa Practical Actions Template System

**Complete standardization system for practical action guides**

## What This Is

This template system provides a consistent, high-quality structure for all Altruxa practical action guides. It ensures that guides are:
- **Actionable**: Every concept leads to concrete steps
- **Accessible**: Clear language, scannable structure
- **Compassionate**: Honest about difficulty without toxic positivity
- **Complete**: Anticipates obstacles and provides troubleshooting
- **Altruxan**: Integrated with dimensional framework and core principles

## Files in This System

### 📋 PRACTICAL_ACTIONS_TEMPLATE.jsx
**The master template file**
- Complete JavaScript/JSX template with all possible sections
- Inline documentation for each section
- Usage notes at bottom
- Copy this file to start a new guide

**Use when**: Creating any new practical action guide

---

### 📖 TEMPLATE_USAGE_GUIDE.md
**Comprehensive documentation**
- Detailed explanation of every section
- When to use each structure type
- Content guidelines by guide type
- Voice and tone instructions
- Quality checklist
- Common mistakes to avoid

**Use when**: 
- Writing your first guide
- Uncertain about section usage
- Need detailed guidance on structure
- Want to understand template philosophy

---

### ⚡ TEMPLATE_QUICK_REFERENCE.md
**Fast lookup and decision support**
- Visual structure diagram
- Quick decision trees
- Essential checklists
- Size guidelines
- Common patterns
- Red flags to avoid
- 65-minute quick start guide

**Use when**:
- Need quick answers
- Want to check structure at a glance
- Starting a guide and need step-by-step
- Doing a quick quality check

---

### ✅ TEMPLATE_VALIDATION_CHECKLIST.md
**Quality assurance tool**
- Comprehensive validation checklist
- Section-by-section review criteria
- Scoring rubric
- Pass/fail quick check
- Revision tracking
- Feedback template

**Use when**:
- Reviewing your own work before submission
- Peer reviewing another guide
- Auditing existing guides for compliance
- Ensuring quality before publication

---

## Quick Start Guide

### For Your First Guide (65 minutes)

1. **Copy the template** (2 min)
   - Copy `PRACTICAL_ACTIONS_TEMPLATE.jsx`
   - Rename to your topic: `{topic}_{scope}.jsx`

2. **Open Quick Reference** (3 min)
   - Use the decision tree to determine guide type
   - Note which sections are essential vs optional

3. **Fill Header + Introduction** (10 min)
   - Write clear title with emoji
   - Write 2-3 sentence introduction
   - Add any critical truths or when-to-use

4. **Choose primary structure** (5 min)
   - Crisis help → immediateResources
   - Practice building → dailyPractices  
   - Scenario navigation → situationalGuidance

5. **Write 3 examples** (20 min)
   - Make them realistic and specific
   - Show dimensional analysis
   - Include altruxan_choice

6. **Add troubleshooting** (15 min)
   - List 5 obstacles people will face
   - Write honest, practical responses
   - Include "minimum viable" versions

7. **Write closing** (10 min)
   - 2-4 paragraphs
   - Acknowledge difficulty
   - End with: "When we do for the other, it is the most good."

8. **Self-review** (5 min)
   - Use Quick Pass/Fail checklist
   - Verify examples are concrete
   - Check tone is compassionate

9. **Iterate** (ongoing)
   - Add supporting sections as needed
   - Refine examples
   - Get feedback using validation checklist

---

## Guide Type Reference

### Type 1: Crisis/Urgent Guides
**Examples**: personal_crisis.jsx
**Structure**: 
- immediateResources or immediateActions
- Clear urgency markers (🚨)
- Phone numbers/help resources upfront
- Safety planning
- Simple, direct instructions

**Use for**:
- Mental health crises
- Safety emergencies
- Urgent ethical dilemmas
- Time-sensitive harm

---

### Type 2: Practice/Habit Guides
**Examples**: altruxan_foundations.jsx
**Structure**:
- dailyPractices with detailed steps
- Multiple concrete examples per practice
- Weekly/monthly reflection practices
- Obstacles and deepening paths
- Time commitments and difficulty levels

**Use for**:
- Building ethical habits
- Developing capacities (empathy, courage)
- Daily/weekly practices
- Skill progression over time

---

### Type 3: Domain Action Guides
**Examples**: workplace_ethics.jsx
**Structure**:
- situationalGuidance for specific scenarios
- communicationTemplates (emails, scripts)
- decisionFrameworks
- Domain-specific resources
- Strategic navigation

**Use for**:
- Workplace ethics
- Relationship navigation
- Community organizing
- Specific contexts (medical, legal, etc.)

---

## Core Principles

### 1. Practicality Over Philosophy
Every section must lead to concrete action. Theory serves practice, not vice versa.

### 2. Honesty Over Comfort  
Acknowledge real difficulties. No toxic positivity. Tell the truth compassionately.

### 3. Examples Make It Real
Abstract concepts need concrete scenarios. Show, don't just tell.

### 4. Anticipate Obstacles
People will face barriers. Address them proactively with troubleshooting.

### 5. Balance Individual and Systemic
Never reduce systemic problems to individual solutions. Address both levels.

### 6. Sustainable Ethics
Burnout helps no one. Integrate self-care, not just add it at the end.

### 7. Compassion With Courage
Care for people AND challenge systems. Both are essential.

---

## Required Elements

Every guide MUST include:

✅ **Header**
- title (with emoji)
- subtitle

✅ **Introduction**
- text (2-3 sentences minimum)

✅ **Main Content**
- At least one primary structure (immediateActions/Resources, dailyPractices, or situationalGuidance)
- Minimum 3 concrete examples

✅ **Troubleshooting**
- At least 3 common obstacles addressed
- Practical responses

✅ **Closing Thoughts**
- 2-4 paragraphs
- Ends with: "When we do for the other, it is the most good."

---

## Quality Standards

### Pass Criteria
- All required elements present
- 3+ concrete examples
- 3+ obstacles addressed
- Compassionate but honest tone
- Actionable next steps
- Valid JavaScript/JSX
- Altruxan principles integrated

### Common Failures
- Too abstract (no examples)
- Toxic positivity (no honesty about difficulty)
- Missing troubleshooting
- No clear next steps
- Preachy or moralizing tone
- Individualistic (no systemic dimension)

---

## Workflow

### Creating New Guides

```
1. Copy template
     ↓
2. Read Quick Reference → Choose guide type
     ↓
3. Fill required sections (header, intro, main, troubleshooting, closing)
     ↓
4. Add 3+ examples
     ↓
5. Self-review with Quick Pass/Fail checklist
     ↓
6. Iterate and refine
     ↓
7. Full validation with checklist
     ↓
8. Submit for review
```

### Reviewing Existing Guides

```
1. Open guide + validation checklist
     ↓
2. Check all required elements present
     ↓
3. Review examples (quality, quantity, diversity)
     ↓
4. Check troubleshooting (3-6 obstacles)
     ↓
5. Verify tone (compassionate, honest, direct)
     ↓
6. Check Altruxan integration
     ↓
7. Complete scoring rubric
     ↓
8. Document required/suggested changes
     ↓
9. Return to author or approve
```

---

## Integration with Index

All guides export a default constant that gets imported into `index.jsx`:

```javascript
// In your guide file
export default GUIDE_NAME;

// In index.jsx
import GUIDE_NAME from './guide_name.jsx';

const PRACTICAL_ACTIONS = {
  guide_name: GUIDE_NAME,
  // ... other guides
};
```

Key must match the conceptual name (use underscore_case).

---

## Tips for Success

### Before You Start
1. Read 2-3 existing guides to internalize voice/tone
2. Decide on guide type (crisis/practice/domain)
3. List out 5+ concrete examples before writing
4. Note 5+ obstacles people will face

### While Writing
1. One section at a time - don't try to complete everything at once
2. Examples first, then framework - concrete before abstract
3. Read your work aloud - if it sounds preachy, revise
4. Ask: "Could someone actually DO this?" - if no, add detail

### Before Submitting
1. Run through Quick Pass/Fail checklist
2. Check every example is realistic and specific
3. Verify troubleshooting addresses real obstacles
4. Confirm tone is compassionate not condescending
5. Make sure it ends with core principle

---

## Common Questions

**Q: Can I deviate from the template?**
A: Yes, if it serves the content. Template is a tool, not a constraint. But keep core elements (header, intro, examples, troubleshooting, closing).

**Q: How long should my guide be?**
A: Varies by type. Crisis guides: shorter and focused. Practice guides: more comprehensive. Use length needed to be useful, no more.

**Q: What if my guide doesn't fit any type?**
A: Review existing guides to see if one is similar. If truly unique, use situationalGuidance as base and adapt as needed. Document your reasoning.

**Q: How many examples is enough?**
A: Minimum 3. More is better for complex topics. Aim for diversity in scenarios and difficulty levels.

**Q: Should I include resources?**
A: If domain-specific resources exist (legal, organizing, support services), absolutely. If not, skip this section.

**Q: How do I handle conflicting advice?**
A: Acknowledge complexity. "In X situation, consider Y. In Z situation, consider W." Provide framework for user to decide.

---

## File Naming Convention

Format: `{topic}_{scope}.jsx`

Examples:
- `altruxan_foundations.jsx`
- `workplace_ethics.jsx`
- `personal_crisis.jsx`
- `community_organizing.jsx`
- `difficult_conversations.jsx`

Use lowercase with underscores. Be specific but concise.

---

## Maintenance

### Regular Review
- Quarterly: Check all URLs in resources still work
- Annually: Update examples to stay current
- As needed: Add new troubleshooting for emerging obstacles

### Version Control
When making significant changes:
1. Review against current template
2. Note changes in guide comments
3. Update any cross-references
4. Validate with checklist

---

## Getting Help

**Need structure guidance?**
→ Read TEMPLATE_USAGE_GUIDE.md

**Need quick answers?**
→ Use TEMPLATE_QUICK_REFERENCE.md

**Need to validate quality?**
→ Use TEMPLATE_VALIDATION_CHECKLIST.md

**Need inspiration?**
→ Read altruxan_foundations.jsx and workplace_ethics.jsx

**Still stuck?**
→ Review this README's Quick Start section

---

## Template Philosophy

These templates exist to:
1. **Ensure consistency** - Users know what to expect
2. **Maintain quality** - Standards prevent low-quality guides
3. **Save time** - Don't reinvent structure for each guide
4. **Scale effectively** - Multiple authors can contribute
5. **Stay Altruxan** - Framework integration is systematic

But remember:
- **Content over format** - If template constrains good content, adapt it
- **Flexibility within structure** - Not every guide needs every section
- **User needs first** - Template serves users, not vice versa

---

## Success Metrics

A guide succeeds when:
- ✅ Users can take concrete action after reading
- ✅ Obstacles are anticipated and addressed
- ✅ Examples make concepts immediately clear
- ✅ Tone is compassionate without being patronizing
- ✅ Both individual and systemic dimensions addressed
- ✅ Users feel empowered, not overwhelmed or judged

---

## Contact & Contribution

When contributing new guides:
1. Follow this template system
2. Use validation checklist for self-review
3. Submit with completed checklist
4. Be open to feedback and revision

When suggesting template improvements:
1. Document specific pain points
2. Propose concrete changes
3. Show how changes improve guides
4. Consider impact on existing guides

---

## Version

**Template System Version**: 1.0
**Last Updated**: 2025
**Status**: Active

---

**Remember**: These templates help you create practical, compassionate, actionable guides that actually help people reduce suffering. That's the only metric that matters.

**When we do for the other, it is the most good.**
