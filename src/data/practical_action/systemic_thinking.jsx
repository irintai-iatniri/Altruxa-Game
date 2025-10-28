const SYSTEMIC_THINKING = {
  title: "🌍 From Individual to Systemic Change",
  subtitle: "Addressing root causes, not just symptoms",
  
  introduction: {
    text: "Individual ethical action matters—and it's not enough. If you spend your life helping people escape a burning building without asking who's setting the fires, you're participating in harm reduction but not harm prevention. Systemic thinking traces suffering to its roots: policies, power structures, economic arrangements, cultural norms. It asks not just 'How do I act ethically?' but 'How do I change the conditions that make ethical action necessary?' This is harder, slower, and absolutely essential. Individual and systemic action aren't either/or—they're both/and. You can't change systems without individuals committed to change. You can't sustain individual ethics in systems designed to extract and exploit. This guide helps you see systems, understand leverage points, and act collectively for change that lasts.",
    
    coreQuestion: "Am I treating symptoms or addressing root causes? Am I acting alone or building power collectively?",
    
    systemicPrinciples: [
      "Systems create behaviors—individuals don't operate in vacuum",
      "Symptoms are visible, causes are often hidden—dig deeper",
      "Leverage points exist—small interventions can shift whole systems",
      "Power concentrates and protects itself—change requires disrupting power",
      "Individual action + collective organizing = systemic change",
      "Change is slow, then suddenly fast—trust the cumulative effect",
      "The goal isn't purity—it's reduction of structural harm"
    ]
  },

  dailyPractices: [
    {
      name: "The 'Why?' Chain (Root Cause Analysis)",
      tagline: "Every problem has a history—trace it",
      description: "Most people stop at surface problems. 'Why are people homeless?' 'Because they don't have money.' That's not root cause—that's one level down. This practice trains you to dig until you hit structural causes.",
      
      steps: [
        {
          step: "Identify the problem you're trying to understand",
          detail: "Be specific. Not 'poverty exists' but 'Why do minimum wage workers in this city need 3 jobs to afford rent?'"
        },
        {
          step: "Ask 'Why?' and answer",
          detail: "Why do they need 3 jobs? Because minimum wage doesn't cover cost of living."
        },
        {
          step: "Ask 'Why?' about that answer",
          detail: "Why doesn't minimum wage cover cost of living? Because it hasn't kept pace with housing costs and inflation."
        },
        {
          step: "Ask 'Why?' again",
          detail: "Why hasn't it kept pace? Because wage policy is set by legislators influenced by corporate lobbying against wage increases."
        },
        {
          step: "Ask 'Why?' again",
          detail: "Why do corporations have that much influence? Because campaign finance laws allow unlimited money in politics."
        },
        {
          step: "Ask 'Why?' one more time",
          detail: "Why do those laws exist? Because power protects itself—those with wealth shape rules to maintain wealth concentration."
        },
        {
          step: "Identify the systemic issue",
          detail: "Root cause isn't 'lazy people'—it's wealth concentration + policy capture + power imbalance. Now you know where to intervene."
        }
      ],

      timeCommitment: "10-15 minutes per issue",
      difficulty: "Medium (requires intellectual honesty)",
      frequency: "Weekly—pick one problem you're frustrated by",

      examples: [
        {
          problem: "Why do students go into massive debt for college?",
          chain: [
            "Because tuition is expensive",
            "Because universities charge more",
            "Because state funding for higher ed has collapsed (down 60% since 1980s)",
            "Because tax cuts and austerity politics defunded public goods",
            "Because anti-tax ideology + wealth protection has shaped policy for decades",
            "Because economic elites benefit from educated but indebted workforce—debt is control mechanism"
          ],
          root_cause: "Deliberate defunding of public education + financialization of everything",
          intervention_points: [
            "Reinstate state funding (policy change)",
            "Free college advocacy (system redesign)",
            "Student debt cancellation (immediate relief)",
            "Challenge austerity ideology (cultural shift)"
          ]
        },
        {
          problem: "Why do people work jobs they hate?",
          chain: [
            "Because they need money to survive",
            "Because healthcare, housing, food are commodified",
            "Because we tie survival to employment",
            "Because capitalism requires wage labor",
            "Because power structures benefit from coerced labor—desperate workers accept worse conditions"
          ],
          root_cause: "Economic system that requires commodifying survival needs",
          intervention_points: [
            "Decouple healthcare from employment (policy)",
            "Universal basic income experiments (system change)",
            "Worker cooperatives (alternative models)",
            "Strong unions (power redistribution)",
            "Housing as right not commodity (paradigm shift)"
          ]
        }
      ],

      obstacles: [
        {
          obstacle: "I get stuck at level 2—don't know what's deeper",
          response: "Research. When you hit your knowledge limit, that's your cue to learn more. Read about the issue. Find people who've traced it further. Systemic analysis requires learning history and structure, not just theorizing."
        },
        {
          obstacle: "The root causes feel too big to change",
          response: "They are big—that's why systemic change is hard and slow. But 'big' doesn't mean impossible. Every system that exists now was built by people. Different people can build different systems. Also: even incremental improvement reduces suffering. Don't let perfect be enemy of good."
        },
        {
          obstacle: "I end up blaming 'capitalism' or 'the system' for everything",
          response: "That's lazy analysis. Capitalism IS a root cause of many problems—but it's not the only system. Patriarchy, white supremacy, colonialism, ableism are also systems creating harm. Get specific: which system, which mechanism, which leverage point? 'Blame capitalism' doesn't tell you what to DO about it."
        }
      ],

      deepening: "Advanced: (1) Trace multiple causal chains for same problem—complex issues have multiple root causes. (2) Identify feedback loops—how does the problem reinforce itself? (3) Map power—who benefits from current system and will resist change? That's your real opposition."
    },

    {
      name: "Systems Mapping: Who Benefits?",
      tagline: "Follow the money and power—that's where the system is",
      description: "Systems persist because someone benefits from them. Until you identify who gains from current arrangements and how they protect those gains, you can't effectively challenge the system.",
      
      steps: [
        {
          step: "Pick a system or policy you want to understand",
          detail: "Example: Healthcare system, policing, education policy, food system, housing market"
        },
        {
          step: "Map the beneficiaries",
          detail: "Who makes money from this system? Who gains power? Who gets security or privilege? Be specific about entities, not vague groups."
        },
        {
          step: "Quantify their benefit",
          detail: "How much money? How much power? What would they lose if system changed? This tells you how hard they'll fight to preserve it."
        },
        {
          step: "Map how they protect their gains",
          detail: "Lobbying? Campaign donations? Control of media narratives? Regulatory capture? Violence? Identify mechanisms of power protection."
        },
        {
          step: "Identify who DOESN'T benefit",
          detail: "Who bears the costs? Who suffers? This is your coalition—but they may not know it yet."
        },
        {
          step: "Find the leverage points",
          detail: "Where is the system vulnerable? Where can you interrupt the flow of resources or power? Where can you build countervailing power?"
        }
      ],

      timeCommitment: "1-2 hours initially, ongoing refinement",
      difficulty: "Hard (requires research and honesty about power)",
      frequency: "Monthly—deep dive on one system",

      examples: [
        {
          system: "US Healthcare",
          beneficiaries: {
            insurance_companies: "Billions in profits from premiums, denials, administrative complexity",
            pharmaceutical_companies: "Price-setting power, patent protection, massive profits",
            hospital_corporations: "Growing consolidation = pricing power",
            medical_device_makers: "Protected markets, high margins",
            politicians: "Campaign contributions from above groups"
          },
          protection_mechanisms: [
            "$500M+ annual lobbying to prevent reform",
            "Revolving door between industry and regulatory agencies",
            "Funding think tanks that oppose public healthcare",
            "Media narratives about 'socialism' and 'waiting times'",
            "Complex system makes alternatives hard to imagine"
          ],
          who_suffers: [
            "Patients with medical debt, denied coverage, rationed care",
            "Healthcare workers burned out by administrative burden",
            "Small businesses crushed by insurance costs",
            "People who skip care because they can't afford it"
          ],
          leverage_points: [
            "Electoral: Support candidates who take no pharma/insurance money",
            "Policy: Medicare for All eliminates private insurance profit motive",
            "Direct action: Debt abolition campaigns, mutual aid clinics",
            "Cultural: Normalize healthcare as right, not commodity",
            "Legal: Challenge patent abuse, price-fixing"
          ]
        },
        {
          system: "Mass Incarceration",
          beneficiaries: {
            private_prisons: "Profit from bed-filling, guaranteed occupancy contracts",
            prison_labor_exploiters: "Pay $0.23/hour for work worth $20/hour",
            police_unions: "Funding, power, protection from accountability",
            politicians: "Use 'tough on crime' for campaigns, backed by prison industry",
            rural_communities: "Prisons as economic development (perverse incentive)",
            prison_vendors: "Phone companies, commissaries charge extreme markups"
          },
          protection_mechanisms: [
            "Lobbying against sentencing reform",
            "Alec drafting template legislation for longer sentences",
            "Police unions blocking accountability measures",
            "Media narratives about 'super-predators' and fear",
            "Counting incarcerated people in census for rural districts"
          ],
          who_suffers: [
            "Incarcerated people and their families",
            "Communities over-policed and destabilized",
            "Taxpayers funding $80B+ annual system",
            "Victims of crime not getting actual support"
          ],
          leverage_points: [
            "Policy: Sentencing reform, end cash bail, close private prisons",
            "Funding: Divest from prison bonds and contracts",
            "Organizing: Incarcerated people organizing inside, families outside",
            "Cultural: Abolition framework—imagine alternatives to carceral response",
            "Electoral: DA races matter more than most realize"
          ]
        }
      ],

      obstacles: [
        {
          obstacle: "This is so depressing—everything is corrupt",
          response: "Power does concentrate and protect itself. That's not depression—that's clarity. Once you see how systems work, you can intervene intelligently instead of spinning wheels on ineffective strategies. Also: systems are made of people. People can unmake them and build different ones."
        },
        {
          obstacle: "I don't know how to research this stuff",
          response: "Start with: (1) Follow the money—public disclosures, investigative journalism, (2) Who funds this org/policy? Who lobbies for it? (3) Who writes analysis you trust? Read them. (4) Talk to people who work inside or are harmed by the system—they see what data doesn't show."
        }
      ],

      deepening: "Expert mode: Map the system's feedback loops—how does it reinforce itself? Example: Police get funding for arrests → incentivized to arrest more → arrest quotas → over-policing of poor/Black communities → those communities destabilized → more crime → justifies more police → cycle continues. Breaking feedback loops is leverage."
    },

    {
      name: "Intervention Point Identification",
      tagline: "Where can a small push shift the whole system?",
      description: "Not all actions have equal impact. Systems have leverage points—places where relatively small interventions can create large change. This practice trains you to find them instead of pushing where systems are most resistant.",
      
      steps: [
        {
          step: "Identify the system you want to change",
          detail: "Be specific about what system and what outcome you want"
        },
        {
          step: "Map the system's structure",
          detail: "What are the key components? How do they interact? Where does power flow?"
        },
        {
          step: "Find the bottlenecks",
          detail: "Where does everything flow through one point? That's leverage. Example: All legislation goes through committee chairs—committee chairs are leverage points."
        },
        {
          step: "Identify the pressure points",
          detail: "Where is the system brittle? Where do contradictions exist? Where are people already resisting? Those are weak points."
        },
        {
          step: "Assess your resources",
          detail: "What can you actually access/influence? No point identifying leverage points you can't reach."
        },
        {
          step: "Design intervention",
          detail: "How can you apply pressure at this point? What would shift it?"
        }
      ],

      timeCommitment: "2-3 hours of analysis, ongoing action",
      difficulty: "Very Hard (requires systemic understanding + strategic thinking)",
      frequency: "When planning campaign or organizing effort",

      examples: [
        {
          goal: "Reduce police violence in your city",
          analysis: "Direct confrontation with police department = high resistance, low success. But police funding goes through city council budget process.",
          leverage_point: "City budget hearings—councilmembers are elected and responsive to pressure",
          intervention: [
            "Organize coalition to pack budget hearings",
            "Demand specific cuts and reallocations",
            "Identify friendly councilmembers who need political cover",
            "Create political cost for voting with police",
            "Coordinate with movement elsewhere for national attention"
          ],
          why_this_works: "Councilmembers face re-election. Organized constituents are leverage. Budget is concrete, not abstract. Each year is new intervention point.",
          examples_of_success: "Austin, Portland, LA all cut police budgets through this strategy in 2020-2021"
        },
        {
          goal: "Stop Amazon warehouse opening in your neighborhood",
          analysis: "Amazon has infinite money—can't outspend them. But they need: (1) Tax incentives from city, (2) Zoning approval, (3) Infrastructure (roads, etc.), (4) Workers",
          leverage_points: [
            "Tax incentive vote in city council",
            "Zoning board approval",
            "Public opinion about subsidizing billionaires",
            "Organizing workers to demand union before opening"
          ],
          intervention: [
            "Pack city council meetings",
            "Educate public about costs of incentives vs. benefits",
            "Alliance with fiscal conservatives opposed to subsidies",
            "National groups can pressure Amazon at vulnerability point",
            "Make political cost of approval higher than benefit"
          ],
          result: "Multiple cities have blocked Amazon warehouses this way. It works when organized."
        }
      ],

      obstacles: [
        {
          obstacle: "I don't know enough about the system to find leverage points",
          response: "You're right—you need to learn the system. Talk to people who work in it, research its structure, find who knows it well. Systemic change requires homework. That's why organizing isn't just protesting—it's learning power maps."
        },
        {
          obstacle: "The leverage points I identify are still too hard to reach",
          response: "Maybe you need to build more power first. Leverage points aren't just where to push—they're where you HAVE leverage. If you don't have it yet, your job is building it: more people, more resources, more relationships."
        }
      ],

      deepening: "Study successful campaigns: How did they identify leverage? What did they push on? Why did it work? Learn from: civil rights movement, labor organizing, tenant unions, environmental campaigns. Strategic thinking is learnable."
    },

    {
      name: "Collective Action Mapping",
      tagline: "Individual ethics + collective power = systemic change",
      description: "You can't change systems alone. This practice identifies who your natural allies are, what shared interests unite you, and how to build collective power for change.",
      
      steps: [
        {
          step: "Identify the change you want",
          detail: "Specific, systemic change—not vague goals"
        },
        {
          step: "Map who else wants this or adjacent change",
          detail: "Don't just think of obvious allies. Who benefits from this change even if they don't know it yet?"
        },
        {
          step: "Identify shared interests",
          detail: "What connects these groups? Not identity—shared interest. Renters and homeowners both lose when housing becomes unaffordable—frame it that way."
        },
        {
          step: "Assess capacity of each group",
          detail: "Who has: numbers, money, expertise, legitimacy, disruptive capacity? Different groups bring different resources."
        },
        {
          step: "Map the ask for each group",
          detail: "What can each group actually do? Unions can strike. Nonprofits can provide cover. Residents can testify. Match ask to capacity."
        },
        {
          step: "Identify coalition structure",
          detail: "Who needs to lead this? Who needs to be at the table? How are decisions made? Coalition-building is itself a practice."
        }
      ],

      timeCommitment: "Ongoing—organizing is continuous work",
      difficulty: "Very Hard (requires relationship-building and political skill)",
      frequency: "When launching or joining campaign",

      examples: [
        {
          goal: "Stop gentrifying development in neighborhood",
          potential_allies: {
            "Long-term residents": "Facing displacement",
            "Tenants": "Facing rent increases",
            "Local small businesses": "Priced out by rising rents",
            "Unions": "Opposed to non-union construction",
            "Environmental groups": "Car-centric development",
            "Affordable housing advocates": "Loss of affordable units",
            "Faith communities": "Serve displaced populations"
          },
          shared_interest: "Preserving community, opposing displacement, demanding affordability",
          strategy: "Different groups testify at hearings, union provides funding and bodies for protests, residents are face of campaign, nonprofits provide research and legitimacy, faith communities provide moral framing",
          why_coalition: "Developer can dismiss residents as NIMBYs. Can't dismiss coalition of residents + unions + faith groups + housing advocates. Coalition has legitimacy, breadth, and power."
        }
      ],

      obstacles: [
        {
          obstacle: "I'm not an organizer—I don't know how to build coalition",
          response: "Neither was anyone until they did it. Organizing is learned by organizing. Start: (1) Join existing organization doing this work, (2) Learn from them, (3) Build skills, (4) Eventually help build new coalitions. Also: read organizing literature—there's centuries of wisdom."
        },
        {
          obstacle: "Coalitions fall apart over disagreements",
          response: "Yes. That's normal. Shared interest ≠ identical ideology. Coalitions work when: (1) Shared goal is clear and specific, (2) Each group maintains autonomy, (3) Disagreements are handled openly, (4) Success is shared. Coalitions don't have to be permanent—sometimes they're for one campaign."
        }
      ],

      deepening: "Study successful coalition campaigns: How did they hold together? How did they handle disagreements? What was their theory of change? Examples: Fight for $15, Occupy Wall Street (studied as failure—why did it fracture?), Civil Rights coalitions."
    }
  ],

  weeklyCommitments: [
    {
      action: "Trace one problem you encounter to its systemic root",
      detail: "Something frustrates you this week—dig deeper. Use the 'Why?' chain. Don't stop at individual explanations. Find the structure.",
      why: "Training systemic lens. Most people see only surface. You need to see structure.",
      examples: [
        "Why is healthcare appointment 3 months out? (Not 'doctor is busy'—what systemic factors create shortage?)",
        "Why can't you afford rent on your wage? (Not 'I should make more'—what structural causes create wage/housing gap?)",
        "Why is public transit broken in your city? (Not 'incompetence'—what funding, political, structural issues?)"
      ],
      time: "30 minutes of thinking/research"
    },
    {
      action: "Read one piece of systemic analysis",
      detail: "Choose issue you care about. Find deep analysis—not news, but structural explanation. Blogs, books, long-form journalism, academic work.",
      why: "You can't think systemically without learning how systems work. This builds knowledge base.",
      sources: [
        "Jacobin, Current Affairs (left economic analysis)",
        "ProPublica (investigative journalism)",
        "Academic articles on systems you care about",
        "Books on specific systems (mass incarceration, healthcare, education, etc.)",
        "Movement publications (organizations doing this work write about it)"
      ],
      time: "1 hour reading"
    },
    {
      action: "Have one conversation about systems, not individuals",
      detail: "When people complain about problems, redirect conversation to structure. 'Why does the system work this way? Who benefits? How could it be different?'",
      why: "Cultural change happens through changed conversation. If everyone only talks about individual responsibility, system stays invisible. You're making it visible.",
      example: "Friend complains about student debt. Don't just sympathize—talk about why college costs this much, who benefits, what policy change could address it. You're politicizing the personal—that's how movements build.",
      time: "Duration of conversation"
    },
    {
      action: "Support one organization doing systemic work",
      detail: "Find group working on systemic change on issue you care about. Give money, volunteer, show up, share their work. Individual action is necessary but not sufficient—organized collective action changes systems.",
      why: "Systems change requires power. Organizations build power. Your participation strengthens them.",
      how_to_find: [
        "Search '[issue] + [your city] + organizing'",
        "Ask people doing this work who else they recommend",
        "Look for groups led by people most affected by the issue",
        "Assess: Do they have analysis? Strategy? Wins? Sustainability?"
      ],
      time: "2 hours/week or monthly donation"
    }
  ],

  strategicGuidance: [
    {
      principle: "Reformist Reforms vs. Revolutionary Reforms",
      why: "Not all reforms are created equal. Some strengthen the system by slightly ameliorating harm. Others build toward larger transformation. Strategic systemic change knows the difference.",
      
      reformist_reform: {
        definition: "Changes that reduce immediate harm BUT reinforce underlying system",
        examples: [
          "Diversity training without changing hiring/promotion practices",
          "Body cameras on police without accountability mechanisms",
          "Charity that addresses symptoms but not causes",
          "Green capitalism (profit from 'sustainable' consumption without challenging consumption)",
          "Better conditions in prisons without questioning mass incarceration"
        ],
        characteristics: "Makes system more palatable. Releases pressure. Prevents deeper change. Ultimately preserves power structure.",
        altruxan_assessment: "Sometimes necessary for harm reduction. Never sufficient for systemic change. Don't mistake reform for transformation."
      },
      
      revolutionary_reform: {
        definition: "Changes that reduce harm AND build capacity for larger transformation",
        examples: [
          "Union organizing (immediate wage gains + builds worker power for more)",
          "Community land trusts (affordable housing + decommodifies land over time)",
          "Participatory budgeting (distributes resources + democratizes decision-making)",
          "Worker cooperatives (better jobs + models alternative to capitalism)",
          "Defund police and invest in community (reduces police violence + builds alternative infrastructure)"
        ],
        characteristics: "Addresses immediate suffering AND shifts power. Creates infrastructure for deeper change. Expands what's imaginable.",
        how_to_identify: "Ask: Does this reduce harm right now? Does it redistribute power? Does it build capacity for further transformation? Does it challenge core logic of system? If yes to multiple, it's transformative."
      },
      
      strategic_application: "You can't only demand revolution—people are suffering now and need relief. But you can't only pursue reforms that strengthen the system. The goal: Immediate relief + long-term transformation. Win reforms that build power and imagination for bigger change."
    },

    {
      principle: "Short-Term vs. Long-Term Strategy",
      why: "Systemic change is slow. If you only think short-term, you burn out or become cynical. If you only think long-term, people suffer needlessly. Strategic organizing holds both.",
      
      short_term: {
        timeframe: "Weeks to months",
        goals: "Win tangible improvements in people's lives",
        examples: "Stop this eviction. Win this contract. Block this harmful policy.",
        tactics: "Direct action, pressure campaigns, rapid response",
        wins: "Visible, energizing, build momentum and morale",
        risks: "Can become reactive. Can lose sight of larger vision. Can accept small wins that foreclose bigger change."
      },
      
      medium_term: {
        timeframe: "1-3 years",
        goals: "Build organizational capacity and power",
        examples: "Establish union. Build coalition. Shift public narrative. Pass local policy.",
        tactics: "Organizing drives, coalition-building, legislative campaigns",
        wins: "Create infrastructure for sustained work. Develop leadership. Establish power base.",
        risks: "Can get stuck in 'inside game.' Can become bureaucratic. Can lose grassroots energy."
      },
      
      long_term: {
        timeframe: "5-20+ years",
        goals: "Transform systems and structures",
        examples: "Abolish system. Build alternative. Shift paradigm. Redistribute power fundamentally.",
        tactics: "Sustained campaigns, movement-building, political education, alternative institution-building",
        wins: "Actual transformation. Different world possible.",
        risks: "Can feel distant and demobilizing. Can become utopian without tangible action. People need wins now."
      },
      
      integration: "Strong organizing links all three: Fight immediate battles (short-term wins). Build organization and power (medium-term capacity). Orient toward transformation (long-term vision). Example: Fight to stop eviction (short) + build tenant union (medium) + campaign for housing as human right + decommodify housing (long). Each level strengthens others."
    },

    {
      principle: "Prefigurative Politics: Build the World You Want Now",
      why: "You can't use authoritarian means to create democratic society. The how matters, not just the what. Prefigurative politics embeds your values in your organizing—you model the future now.",
      
      what_it_means: "Your organization/movement operates by principles of world you're building. If you want democratic society, practice democracy now. If you want mutual aid, do mutual aid now. If you want liberation, embody liberation in how you organize.",
      
      examples: [
        {
          practice: "Consensus decision-making in organizing",
          prefigures: "Democratic participation and power-sharing",
          tension: "Can be slow, can privilege those with time/energy. Must balance participation with effectiveness."
        },
        {
          practice: "Mutual aid networks",
          prefigures: "Society based on care and reciprocity, not exchange and profit",
          power: "Demonstrates that alternatives work. Builds relationships. Creates infrastructure outside market."
        },
        {
          practice: "Cooperatives and collective ownership",
          prefigures: "Economic democracy and shared power over production",
          expansion: "Each coop is proof of concept. Networked coops challenge capitalist hegemony."
        },
        {
          practice: "Restorative justice in movements",
          prefigures: "Accountability without punishment, healing without carceral logic",
          difficulty: "Hard to do well. Requires skill and commitment. But models what transformative justice looks like."
        }
      ],
      
      why_it_matters: "People need to experience alternative before they can imagine it at scale. Prefigurative politics is both strategy and embodiment—you're not just demanding different future, you're living it now where possible.",
      
      limitations: "You can't fully prefigure in oppressive system. Capitalism constrains what's possible. Scarcity shapes behavior. Don't demand purity—demand direction. Prefigurative politics is aspiration + practice, knowing we can't be outside system we're trying to change."
    },

    {
      principle: "Power Analysis: Understand It to Shift It",
      why: "Power is not distributed equally. Systemic change means shifting power—from concentrated to distributed, from extractive to generative. You need to understand power before you can change it.",
      
      types_of_power: [
        {
          type: "Coercive Power",
          definition: "Force, violence, threat of harm",
          who_has_it: "State (police, military), bosses (firing), landlords (eviction), abusive partners",
          how_it_works: "Compliance through fear",
          how_to_counter: "Build collective capacity to resist. Legal protections. Alternative institutions that reduce dependence."
        },
        {
          type: "Economic Power",
          definition: "Control of resources and livelihood",
          who_has_it: "Capital owners, employers, creditors, landlords",
          how_it_works: "Control through economic dependence",
          how_to_counter: "Unions (collective withholding of labor). Strikes. Boycotts. Alternative economies. Policies that redistribute."
        },
        {
          type: "Political Power",
          definition: "Control of decision-making and rule-setting",
          who_has_it: "Elected officials, bureaucrats, those who influence them",
          how_it_works: "Set rules that benefit some and constrain others",
          how_to_counter: "Electoral organizing. Lobbying and advocacy. Direct democracy mechanisms. Build political will for change."
        },
        {
          type: "Social/Cultural Power",
          definition: "Control of narrative, legitimacy, common sense",
          who_has_it: "Media, academia, influencers, institutions that shape culture",
          how_it_works: "Shapes what's imaginable, acceptable, 'realistic'",
          how_to_counter: "Counter-narrative. Political education. Cultural production. Shift Overton window."
        },
        {
          type: "Organized People Power",
          definition: "Collective capacity to disrupt, demand, create",
          who_has_it: "Movements, unions, organized communities",
          how_it_works: "Numbers + coordination + willingness to act",
          how_to_build: "Organizing. This is the power you're building. It's the only power that consistently wins against concentrated power."
        }
      ],
      
      strategic_implication: "Different forms of power require different tactics. Capital won't give up economic power because you ask nicely—you need countervailing power. Politicians respond to organized voters and donors—that's where to apply pressure. Cultural power shifts slowly through education and narrative—that's long game. Map which power you're confronting, build power to match it."
    }
  ],

  reflectionPrompts: [
    "What problem frustrates you most? Have you traced it to systemic roots, or are you stuck at individual explanations?",
    
    "What system have you learned about this month? What leverage points did you identify?",
    
    "Where are you treating symptoms vs. addressing root causes? What would root cause work look like?",
    
    "What organization doing systemic change have you supported this month? How can you deepen that support?",
    
    "Where are you acting individually when you need to be acting collectively? Who are your natural allies?",
    
    "What would you do differently if you understood that systems create individual behaviors, not the other way around?",
    
    "What reform are you supporting that might actually reinforce the system? What transformative alternative exists?",
    
    "How does your individual ethical action connect to larger systemic change? Are you building toward transformation or just mitigating harm?",
    
    "What system do you participate in that you know is harmful? What would exit or transformation look like?",
    
    "Where have you seen collective organizing win change? What did you learn from that?",
    
    "What's your role in systemic change? Organizer? Funder? Researcher? Follower? Amplifier? All are needed—what's yours?",
    
    "If the goal is reducing suffering at structural level, what are you building toward?"
  ],

  monthlyDeepDive: {
    title: "Monthly Systems Audit: From Individual to Collective",
    instructions: "Once monthly, spend 60-90 minutes assessing your systemic engagement. This isn't about guilt—it's about alignment between values and action at structural level.",
    
    questions: [
      {
        question: "What systemic issue did I learn about this month?",
        lookFor: "Are you deepening understanding of how systems work? Or staying at surface? Knowledge is prerequisite for strategic action.",
        growth: "Track what you didn't know last month that you know now. That's progress."
      },
      {
        question: "Where did I connect individual suffering to systemic cause?",
        lookFor: "Are you making these connections in conversations? In your own thinking? This is how personal becomes political.",
        application: "When you see system, do you share that analysis? Political education is organizing."
      },
      {
        question: "What collective action did I participate in or support?",
        lookFor: "Donations, volunteer time, showing up at actions, amplifying campaigns. Systemic change requires participation.",
        assess: "Is this consistent or sporadic? Building power requires sustained engagement."
      },
      {
        question: "What leverage point did I identify or act on?",
        lookFor: "Are you learning to see where systems are vulnerable? Are you acting on that knowledge?",
        strategic: "Random action is exhausting. Strategic action accumulates."
      },
      {
        question: "Where am I building relationships for organizing?",
        lookFor: "Systemic change is relational. Who are you building trust with? Who would you organize with?",
        reality: "Can't build power alone. Are you cultivating coalition relationships?"
      },
      {
        question: "Am I pursuing reformist or transformative change?",
        lookFor: "Are your wins deepening system or building alternatives? Both may be necessary—but know which you're doing.",
        honesty: "Sometimes we accept reformist wins because transformative seems too hard. That's okay—just be honest about it."
      },
      {
        question: "What would I do differently if I thought generationally, not just personally?",
        lookFor: "Are you thinking beyond your lifetime? Systemic change is multi-generational project.",
        reframe: "Your job isn't finishing—it's pushing in right direction and passing it on."
      }
    ],

    recalibration: "Based on audit: Maybe deepen learning on one system. Maybe connect with an organization. Maybe shift from individual to collective action. Maybe identify leverage point and design intervention. This audit should generate next actions."
  },

  resources: {
    foundational_texts: [
      "Thinking in Systems: A Primer - Donella Meadows (systems thinking basics)",
      "We Do This 'Til We Free Us - Mariame Kaba (abolition and transformative organizing)",
      "Emergent Strategy - adrienne maree brown (principles of systems change)",
      "The Shock Doctrine - Naomi Klein (how capitalism exploits crisis)",
      "Pedagogy of the Oppressed - Paulo Freire (consciousness and organizing)",
      "Rules for Revolutionaries - Organizing Manual - Becky Bond & Zack Exley"
    ],
    
    organizations: [
      "Local organizing groups in your area doing systemic work on issues you care about",
      "Labor unions (your workplace or sector union)",
      "Tenant unions and housing organizing",
      "Abolition and transformative justice networks",
      "Environmental justice organizations",
      "Economic justice and anti-poverty orgs"
    ],
    
    learning: [
      "Training: Midwest Academy, Wellstone, local organizing trainings",
      "Analysis: Jacobin, Current Affairs, movement publications",
      "History: Study successful movements—what worked, what didn't, why"
    ]
  },

  troubleshooting: {
    "This all feels too big—I'm one person": {
      response: "Correct—you're one person. That's why systemic change requires organizing. Your job isn't changing systems alone. Your job is: (1) Understanding systems, (2) Joining with others, (3) Building collective power, (4) Acting strategically together. You're not too small—you're part of something bigger. Find it or help build it.",
      action: "This week: Join one organization doing systemic work. Show up. Learn. Contribute. You're now part of collective capacity."
    },
    
    "I don't have time for organizing": {
      response: "Valid. Survival takes precedence. But also: The system you don't have time to challenge is stealing your time. Working multiple jobs to afford rent? That's systemic theft of your time. Sick but can't afford doctor? System's stealing your health and time. You're already paying the cost of not organizing—it's just diffuse and invisible. Organizing is investment: short-term cost for long-term transformation that gives you time back.",
      minimum: "If truly no time: Donate money to organizations doing the work. Not ideal but it's participation. When capacity increases, deepen engagement."
    },
    
    "My organizing is failing—nothing's changing": {
      response: "Systemic change is slow, then suddenly fast. Are you losing or just not winning yet? Big question. If tactics aren't working, change tactics. If strategy is flawed, revisit strategy. If you're not building power, figure out why. Sometimes you lose—that's data. Learn from it. Sometimes you're pushing on wrong leverage point. Sometimes you need more time and people. Ask: What's working? What's not? What do we need to shift?",
      community: "Organizers need organizers. Connect with others doing this work. Learn from their experience. Don't carry it alone."
    },
    
    "The people I'm trying to help don't want my help": {
      response: "Stop 'helping.' Start organizing WITH, not FOR. Charity mindset vs. solidarity mindset. Are you centering their leadership and analysis, or imposing yours? Are you accountable to community, or acting on assumptions? Most 'help' is paternalistic and reinforces power imbalance. Authentic organizing means following leadership of those most affected.",
      check: "If 'the people' don't want it, you're probably doing it wrong. Listen to why. Adjust. Defer to their knowledge of what they need."
    },
    
    "I'm burned out from organizing": {
      response: "Organizer burnout is real and common. Caused by: overwork, no boundaries, trauma from fighting systems, lack of care infrastructure. Solution isn't quit—it's sustainable organizing: (1) Collective care as organizing principle, (2) Boundaries and rest as strategy not weakness, (3) Sharing labor not hero organizing, (4) Therapy/support, (5) Celebrate small wins, (6) Remember this is marathon not sprint. Sometimes you need to step back—that's okay. Movement needs long-term organizers, not martyrs.",
      reality: "Systems want you burned out—you're easier to neutralize exhausted than energized. Self-care is resistance."
    },
    
    "My politics are more radical than people around me": {
      response: "Meet people where they are. Most people haven't spent time developing systemic analysis—not because they're dumb, but because capitalism deliberately obscures its own operation. Your job isn't converting them to your analysis—it's making connections between their lived experience and systemic causes. Start with shared experience of suffering. Build from there. Radicalization happens through experience and relationship, not lecture.",
      patience: "You didn't arrive at your politics overnight. Neither will they. Organizing is political education in practice."
    }
  },

  closingThoughts: {
    title: "Systems Change and Individual Practice",
    text: `Individual ethical action and systemic change aren't opposed—they're both necessary. You can't change systems without individuals committed to change. You can't sustain individual ethics in systems designed to extract and exploit.

The Altruxan path holds both: Do what you can individually to reduce suffering now. AND organize collectively to change the structures that create suffering.

You don't have to be an organizer to engage systemically. You can:
- Learn how systems work and share that analysis
- Support organizations doing systemic work
- Participate in collective action when you can
- Make choices that build alternatives where possible
- Use whatever position you're in to shift systems however slightly

Systemic change is slow. This is not failure—it's the nature of changing structures. Capitalism took centuries to build. It won't fall in your lifetime. But it can be weakened, challenged, transformed incrementally toward something better.

Your job isn't finishing the work. It's pushing in the right direction. Building power. Creating cracks in the system. Supporting others doing the same. Passing it on.

The transformation won't happen through individual consumer choices or personal virtue. It will happen through organized people building collective power to demand and create different arrangements.

This is the work of generations. You're part of that lineage—learning from those who came before, teaching those who come after, acting now on the problems of now.

When we do for the other—not as charity but as solidarity, not as saviors but as comrades—it is the most good. And when we organize collectively to change the systems that create suffering, we participate in liberation.

That's the systemic practice: See systems. Understand power. Build collectively. Act strategically. Trust the cumulative effect.`
  }
};

export default SYSTEMIC_THINKING;
