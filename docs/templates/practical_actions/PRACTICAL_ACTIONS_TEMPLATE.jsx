// ============================================================================
// PRACTICAL ACTIONS TEMPLATE
// Standard format for all Altruxa practical action guides
// ============================================================================

const [MODULE_NAME] = {
  // ----------------------------------------------------------------------------
  // HEADER (Required)
  // ----------------------------------------------------------------------------
  title: "🎯 [Clear Title]: [Context]",
  subtitle: "[One-line description of what this guide helps with]",
  
  // ----------------------------------------------------------------------------
  // INTRODUCTION (Required)
  // ----------------------------------------------------------------------------
  introduction: {
    text: "[2-3 sentences explaining the scope and purpose. Start with the problem/context, then explain the Altruxan approach]",
    
    // Optional but recommended
    altruxanFramework: "[How Altruxa specifically applies to this domain]",
    
    // Optional - use when there are critical truths to establish upfront
    criticalTruths: [
      "[Fundamental truth 1]",
      "[Fundamental truth 2]",
      "[Fundamental truth 3]"
    ],
    
    // Optional - helps users know if this guide is for them
    whenToUseThis: [
      "[Situation 1]",
      "[Situation 2]",
      "[Situation 3]"
    ],
    
    // Optional - use only when absolutely critical (crisis situations)
    coreQuestion: "[The fundamental question this guide helps answer]"
  },

  // ----------------------------------------------------------------------------
  // IMMEDIATE ACTIONS (Use for urgent/crisis situations)
  // ----------------------------------------------------------------------------
  immediateActions: [
    {
      situation: "[Description of urgent situation]",
      urgency: "[CRITICAL/HIGH/URGENT - timeframe]",
      
      // Use firstSteps for sequential actions
      firstSteps: [
        {
          action: "[What to do]",
          detail: "[Why and how]",
          why: "[Justification]",
          
          // Optional: Add specifics, format, lookUp, questions, etc. as needed
          specifics: [
            "[Specific item 1]",
            "[Specific item 2]"
          ]
        }
      ],
      
      // Optional sections
      commonMistakes: [
        {
          mistake: "[What people commonly do wrong]",
          why: "[Why this is problematic]",
          reality: "[What actually happens]"
        }
      ],
      
      timeframe: "[Expected timeline for these actions]"
    }
  ],

  // ----------------------------------------------------------------------------
  // IMMEDIATE RESOURCES (Use for crisis/urgent help)
  // ----------------------------------------------------------------------------
  immediateResources: [
    {
      crisis: "[Type of crisis]",
      urgency: "[🚨 CRITICAL/URGENT - description]",
      resources: [
        "[Phone number/resource 1]",
        "[Phone number/resource 2]",
        "[Website/resource 3]"
      ],
      immediate: "[What to do right now]",
      
      // Optional context sections
      ifYouAreInImminentDanger: "[Specific guidance for immediate danger]",
      afterImmediateCrisis: "[Follow-up actions]",
      whatYouNeedToKnow: [
        "[Key fact 1]",
        "[Key fact 2]"
      ]
    }
  ],

  // ----------------------------------------------------------------------------
  // DAILY PRACTICES (Use for habit-building guides)
  // ----------------------------------------------------------------------------
  dailyPractices: [
    {
      name: "[Practice Name]",
      tagline: "[Catchy one-liner]",
      description: "[2-3 sentences explaining what this practice does and why it matters]",
      
      steps: [
        {
          step: "[Step name/number]",
          detail: "[Description]",
          
          // Optional: Add questions, core principles, notes
          questions: [
            "[Guiding question 1]",
            "[Guiding question 2]"
          ],
          
          core: "[Core principle or key insight]",
          note: "[Additional context or caveat]"
        }
      ],

      timeCommitment: "[How long this takes]",
      difficulty: "[Difficulty assessment]",
      frequency: "[How often to practice]",

      // Always include examples - these make practices concrete
      examples: [
        {
          scenario: "[Specific situation]",
          dimensional_analysis: {
            "0D": "[Self/individual impact]",
            "1D": "[Direct relationships impact]",
            "2D": "[Community/institutional impact]",
            "3D": "[Systems/structural impact]",
            temporal: "[Time dimension analysis]",
            intent: "[Question about motivation]"
          },
          altruxan_choice: "[What the Altruxan approach suggests and why]"
        }
      ],

      // Common obstacles help users troubleshoot
      obstacles: [
        {
          obstacle: "[Common challenge]",
          response: "[How to address it]"
        }
      ],

      // Optional: How to deepen practice over time
      deepening: "[How this practice evolves with experience]"
    }
  ],

  // ----------------------------------------------------------------------------
  // SITUATIONAL GUIDANCE (Use for specific scenarios)
  // ----------------------------------------------------------------------------
  situationalGuidance: [
    {
      scenario: "[Type of situation]",
      context: "[When this applies]",
      
      // Choose structure based on situation type
      framework: "[Conceptual framework for approaching this]",
      
      steps: [
        {
          step: "[What to do]",
          how: "[How to do it]",
          why: "[Why this matters]",
          
          // Optional sub-elements
          scripts: [
            "[Example phrase 1]",
            "[Example phrase 2]"
          ],
          
          questions: [
            "[Guiding question]"
          ]
        }
      ],
      
      // Optional specialized sections
      whatItLooksLike: [
        "[Observable sign 1]",
        "[Observable sign 2]"
      ],
      
      differentApproaches: {
        "[Approach Type 1]": {
          when: "[When to use]",
          how: "[How to implement]",
          example: "[Concrete example]"
        }
      }
    }
  ],

  // ----------------------------------------------------------------------------
  // COMMUNICATION TEMPLATES (Use when verbal/written communication is key)
  // ----------------------------------------------------------------------------
  communicationTemplates: {
    "[Template Name]": {
      purpose: "[What this template is for]",
      when: "[When to use it]",
      structure: `[Template text with [PLACEHOLDERS] for customization]`,
      
      // Optional
      variations: [
        {
          context: "[When to use this variation]",
          template: `[Alternative template]`
        }
      ],
      
      tips: [
        "[Communication tip 1]",
        "[Communication tip 2]"
      ]
    }
  },

  // ----------------------------------------------------------------------------
  // DECISION FRAMEWORKS (Use for complex decision-making)
  // ----------------------------------------------------------------------------
  decisionFrameworks: [
    {
      name: "[Framework Name]",
      purpose: "[What decisions this helps with]",
      
      questions: [
        {
          question: "[Key question]",
          considerations: [
            "[Factor to consider]",
            "[Factor to consider]"
          ]
        }
      ],
      
      // Optional
      redFlags: [
        "[Warning sign 1]",
        "[Warning sign 2]"
      ],
      
      greenLights: [
        "[Positive indicator 1]",
        "[Positive indicator 2]"
      ]
    }
  ],

  // ----------------------------------------------------------------------------
  // WEEKLY/MONTHLY PRACTICES (Use for reflection and recalibration)
  // ----------------------------------------------------------------------------
  weeklyPractice: {
    name: "[Practice Name]",
    frequency: "[How often]",
    timeCommitment: "[How long]",
    
    process: [
      {
        step: "[What to do]",
        questions: [
          "[Reflection question]"
        ]
      }
    ]
  },

  monthlyDeepDive: {
    title: "[Title of monthly practice]",
    instructions: "[Overview of what this involves]",
    
    questions: [
      {
        question: "[Main question]",
        lookFor: "[What to assess or notice]"
      }
    ],
    
    recalibration: "[How to adjust based on findings]"
  },

  // ----------------------------------------------------------------------------
  // REFLECTION PROMPTS (Use for journaling/processing)
  // ----------------------------------------------------------------------------
  reflectionPrompts: [
    "[Reflection question 1]",
    "[Reflection question 2]",
    "[Reflection question 3]",
    // Aim for 5-10 prompts that cover different angles
  ],

  // ----------------------------------------------------------------------------
  // TROUBLESHOOTING (Required - address common problems)
  // ----------------------------------------------------------------------------
  troubleshooting: {
    "[Common Problem Statement]": {
      response: "[Main response addressing the concern]",
      
      // Optional sub-sections
      check: "[Reality check or diagnostic question]",
      practice: "[Practical suggestion]",
      reframe: "[Alternative way to think about it]",
      minimum: "[Minimum viable approach if overwhelmed]"
    }
  },

  // ----------------------------------------------------------------------------
  // SELF-CARE REMINDERS (Use when work is difficult/traumatic)
  // ----------------------------------------------------------------------------
  selfCareReminders: [
    {
      reminder: "[Topic]",
      truth: "[Why this matters]",
      practice: [
        "[Specific practice 1]",
        "[Specific practice 2]"
      ]
    }
  ],

  // ----------------------------------------------------------------------------
  // RESOURCES (Include when external support is relevant)
  // ----------------------------------------------------------------------------
  resources: {
    "[Category Name]": [
      {
        org: "[Organization name]",
        url: "[website]",
        what: "[What they provide]",
        
        // Optional
        how: "[How to access]",
        note: "[Important caveat or note]"
      }
    ]
  },

  // ----------------------------------------------------------------------------
  // CLOSING THOUGHTS (Required - end with integration)
  // ----------------------------------------------------------------------------
  closingThoughts: {
    title: "[Final section title]",
    text: `[2-4 paragraphs that:
    1. Acknowledge the difficulty
    2. Reinforce the Altruxan framework
    3. Offer realistic hope and direction
    4. End with core principle or key question
    
    Usually ends with: "When we do for the other, it is the most good."]`
  }
};

export default [MODULE_NAME];

// ============================================================================
// USAGE NOTES
// ============================================================================
/*

PRINCIPLES:
1. Practicality over philosophy - every section should be actionable
2. Honesty over comfort - address hard truths directly
3. Compassion with courage - balance care with challenge
4. Examples make concepts concrete - always include them
5. Troubleshooting prevents abandonment - address obstacles proactively

STRUCTURE DECISIONS:
- Use immediateActions/immediateResources for crisis/urgent situations
- Use dailyPractices for habit-building guides
- Use situationalGuidance for scenario-specific advice
- Mix and match sections as needed - not every guide needs every section

VOICE:
- Direct but compassionate
- No toxic positivity or false reassurance
- Acknowledge difficulty while providing tools
- Use "you" to speak directly to reader
- Short paragraphs, clear language, minimal jargon

FORMATTING:
- Clear section headers with separators
- Consistent indentation
- Optional elements clearly marked
- Examples follow explanations
- Questions drive reflection

ALTRUXAN INTEGRATION:
- Always tie back to reducing suffering
- Use dimensional framework where relevant
- Address both individual and systemic levels
- Balance self-care with service
- End with "When we do for the other, it is the most good."

*/
