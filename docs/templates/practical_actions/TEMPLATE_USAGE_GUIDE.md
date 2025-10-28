# Practical Actions Template - Usage Guide

## Overview

This template standardizes the format for all Altruxa practical action guides. It ensures consistency while allowing flexibility for different types of content.

## Core Sections (Always Include)

### 1. Header
```javascript
{
  title: "🎯 Clear Title: Context",
  subtitle: "One-line description"
}
```
- **Title**: Use emoji + clear topic + specific context
- **Subtitle**: Single sentence explaining the guide's purpose

### 2. Introduction
```javascript
introduction: {
  text: "2-3 sentences explaining scope and purpose"
}
```
- Start with the problem/need
- Explain the Altruxan approach
- Optional subsections: `altruxanFramework`, `criticalTruths`, `whenToUseThis`

### 3. Main Content
Choose ONE primary structure:
- **immediateActions** - For crisis/urgent situations
- **immediateResources** - For crisis help resources  
- **dailyPractices** - For habit-building guides
- **situationalGuidance** - For scenario-specific advice

### 4. Troubleshooting
```javascript
troubleshooting: {
  "Problem statement": {
    response: "Main response",
    check: "Reality check",
    practice: "Practical suggestion"
  }
}
```
- Address 3-6 common obstacles
- Be honest about difficulties
- Provide concrete solutions

### 5. Closing Thoughts
```javascript
closingThoughts: {
  title: "Final section title",
  text: `2-4 paragraphs that acknowledge difficulty, 
         reinforce framework, offer hope, end with principle`
}
```
- Always end with: "When we do for the other, it is the most good."

## Content Structures by Type

### Crisis/Urgent Guides
```
introduction
  → immediateResources (or immediateActions)
  → situationalGuidance (optional)
  → communicationTemplates (if relevant)
  → selfCareReminders
  → resources
  → troubleshooting
  → closingThoughts
```

**Example**: personal_crisis.jsx

**Key features**:
- Clear urgency markers (🚨 CRITICAL)
- Phone numbers and resources upfront
- Simple, direct instructions
- Safety-focused

### Practice/Habit Guides
```
introduction
  → dailyPractices
  → examples (within practices)
  → obstacles (within practices)
  → weeklyPractice
  → monthlyDeepDive
  → reflectionPrompts
  → troubleshooting
  → closingThoughts
```

**Example**: altruxan_foundations.jsx

**Key features**:
- Step-by-step instructions
- Multiple concrete examples
- Time commitments stated
- Difficulty levels noted
- Deepening paths provided

### Domain-Specific Action Guides
```
introduction
  → situationalGuidance
  → communicationTemplates
  → decisionFrameworks
  → examples
  → troubleshooting
  → resources
  → closingThoughts
```

**Example**: workplace_ethics.jsx

**Key features**:
- Context-specific scenarios
- Ready-to-use templates
- Strategic frameworks
- Legal/practical resources

## Section Details

### immediateActions vs immediateResources

**Use immediateActions when**:
- User needs to DO something specific
- Sequential steps are required
- Strategy and planning matter
- Example: "Document discrimination incident"

**Use immediateResources when**:
- User needs HELP from others
- Crisis requires immediate support
- Phone numbers/services are critical
- Example: "Suicide crisis support"

### Examples Are Critical

Every practice/framework should include **concrete examples**:

```javascript
examples: [
  {
    scenario: "Specific, realistic situation",
    dimensional_analysis: {
      "0D": "Self impact",
      "1D": "Relationship impact", 
      "2D": "Community impact",
      "3D": "System impact",
      temporal: "Time analysis",
      intent: "Motivation question"
    },
    altruxan_choice: "What to do and why"
  }
]
```

Examples should:
- Be realistic and relatable
- Show the framework in action
- Acknowledge complexity
- Avoid perfectionism

### Communication Templates

Format for verbal/written communication:

```javascript
communicationTemplates: {
  "Template Name": {
    purpose: "What this is for",
    when: "When to use it",
    structure: `Template with [PLACEHOLDERS]`,
    tips: ["Tip 1", "Tip 2"]
  }
}
```

Include:
- Email templates
- Conversation scripts  
- Reporting formats
- Boundary-setting language

### Troubleshooting

Address real obstacles users will face:

```javascript
troubleshooting: {
  "I don't have time for this": {
    response: "Main response addressing the concern",
    minimum: "Minimum viable version if overwhelmed",
    reframe: "Different way to think about it"
  }
}
```

Common troubleshooting themes:
- Time constraints
- Feeling overwhelmed
- Feeling hypocritical
- Fear of consequences
- Burnout concerns
- Structural barriers

### Resources

When to include:
- Legal resources (employment, discrimination, etc.)
- Crisis support services
- Organizing tools
- Educational materials

Format:
```javascript
resources: {
  legal: [
    {
      org: "Organization Name",
      url: "website.org",
      what: "What they provide"
    }
  ]
}
```

## Voice and Tone

### DO:
- Use direct, clear language
- Address reader as "you"
- Acknowledge difficulty honestly
- Provide concrete actions
- Show compassion without condescension
- Use short paragraphs
- Balance hope with realism

### DON'T:
- Use academic jargon
- Offer toxic positivity
- Promise easy solutions
- Moralize or shame
- Use passive voice excessively
- Write walls of text
- Ignore structural barriers

## Altruxan Integration

Every guide should:

1. **Tie to suffering reduction**
   - How does this practice/action reduce harm?
   - What suffering does it address?

2. **Use dimensional framework**
   - 0D (Self) → 1D (Relationships) → 2D (Community) → 3D (Systems)
   - Include temporal dimension when relevant

3. **Balance individual and systemic**
   - Address both personal practice and collective action
   - Don't individualize systemic problems

4. **Include "for the other" principle**
   - "When we do for the other, it is the most good."
   - Check intent: serving self or serving others?

5. **Integrate compassion and courage**
   - Care for self AND challenge systems
   - Sustainability AND resistance

## Quality Checklist

Before finalizing a guide, verify:

- [ ] Clear title and subtitle
- [ ] Introduction explains scope and Altruxan approach
- [ ] At least 3 concrete examples
- [ ] Troubleshooting addresses real obstacles  
- [ ] Actions are specific and achievable
- [ ] Voice is direct but compassionate
- [ ] Structural barriers acknowledged
- [ ] Self-care integrated (not just added at end)
- [ ] Resources included when relevant
- [ ] Closing thoughts inspire without false hope
- [ ] Ends with core Altruxan principle

## Common Mistakes to Avoid

1. **Too abstract**: Every concept needs concrete examples
2. **Too individualistic**: Must address systemic dimensions
3. **Toxic positivity**: Acknowledge real difficulties
4. **Performative**: Focus on actual harm reduction, not virtue signaling
5. **Overwhelming**: Break complex actions into manageable steps
6. **Missing obstacles**: Anticipate what will prevent practice
7. **No troubleshooting**: Users WILL face problems
8. **Preachy tone**: Compassion, not judgment
9. **False simplicity**: Acknowledge complexity while providing direction
10. **Missing examples**: Templates without examples are confusing

## Adaptation Guidelines

**For shorter guides** (e.g., single practice):
- Keep: introduction, main content, troubleshooting, closingThoughts
- Optional: resources, monthly practices

**For crisis guides**:
- Prioritize: immediateResources, safety planning, followup
- Include: clear urgency markers, contact information
- Keep sections short and scannable

**For skill-building guides**:
- Prioritize: dailyPractices with examples, obstacles, deepening
- Include: weekly/monthly reflection practices
- Show progression over time

**For domain-specific guides**:
- Prioritize: situationalGuidance, communicationTemplates
- Include: decision frameworks, resources
- Focus on strategic navigation

## File Naming Convention

Format: `{topic}_{scope}.jsx`

Examples:
- `altruxan_foundations.jsx` (core practices)
- `workplace_ethics.jsx` (domain-specific)
- `personal_crisis.jsx` (urgent/crisis)
- `interpersonal_ethics.jsx` (relationship focus)
- `moral_repair.jsx` (specific process)

## Version Control

When updating existing guides:
1. Review against current template
2. Add missing sections if relevant
3. Ensure examples are current and diverse
4. Update resources (check URLs)
5. Refresh troubleshooting for new obstacles
6. Maintain consistent voice across updates

## Testing Your Guide

Before publishing, ask:

1. **Clarity**: Could someone unfamiliar with Altruxa follow this?
2. **Actionability**: Are there concrete next steps?
3. **Completeness**: Did I address likely obstacles?
4. **Balance**: Does this integrate personal and systemic?
5. **Honesty**: Did I acknowledge real difficulties?
6. **Compassion**: Is the tone supportive without being patronizing?
7. **Practicality**: Can someone actually DO this with their constraints?

## Getting Help

If unsure about:
- **Structure**: Review similar existing guides
- **Voice**: Read altruxan_foundations.jsx for tone reference
- **Completeness**: Use the Quality Checklist above
- **Altruxan integration**: Ensure dimensional framework and "for the other" principle are present

---

**Remember**: The template serves the content, not vice versa. Adapt as needed for your specific guide while maintaining consistency in core elements (header, introduction, troubleshooting, closing).

**Core principle**: Make ethical action concrete, achievable, and sustainable.
