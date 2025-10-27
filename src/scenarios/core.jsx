// Core game scenes (UI, menus, assessment, etc.)
const coreScenes = {
  loading: {
    title: "Loading...",
    text: "Preparing your journey...",
    image: "⏳",
    choices: []
  },

  profile_select: {
    title: "Profile Selection",
    text: "Create or select a profile to begin your journey.",
    image: "👤",
    choices: []
  },

  intro: {
    title: "Welcome to The Altruxa Path",
    text: "This is an interactive journey exploring moral philosophy through Cosmological Recursion Theory (CRT) and Altruxan principles.\n\nYou'll face real moral dilemmas, make choices, and see how your decisions shape your character development across four dimensions: Empathy, Wisdom, Compassion, and Courage.",
    image: "🌟",
    choices: [
      { text: "Take Moral Assessment", next: "assessment", values: {} }
    ]
  },

  menu: {
    title: "Main Menu",
    text: "Choose your path forward:",
    image: "🏠",
    choices: [
      { text: "Learn Altruxan Philosophy", next: "values_intro", values: {} },
      { text: "Begin Maya's Story", next: "story_intro", values: {} },
      { text: "⚖️ The Bridge Choice (Hard)", next: "story_bridge_intro", values: {} },
      { text: "📊 View Assessment History", next: "assessment_history_view", values: {} },
      { text: "📔 View Reflection Journal", next: "journal_view", values: {} },
      { text: "🔄 Retake Assessment", next: "retake_assessment", values: {} }
    ]
  },

  assessment_history_view: {
    title: "Your Moral Growth Journey",
    text: "",
    image: "📈",
    isHistoryView: true,
    choices: [
      { text: "Return to Menu", next: "menu", values: {} }
    ]
  },

  journal_view: {
    title: "Your Reflection Journal",
    text: "",
    image: "📔",
    isJournalView: true,
    choices: []
  },

  retake_assessment: {
    title: "Retake Assessment",
    text: "You can retake the assessment at any time to track your moral growth. Your assessment history will be preserved so you can see your development over time.",
    image: "📊",
    isRetakeConfirm: true,
    choices: [
      { text: "Start New Assessment", next: "assessment", values: {}, isRetake: true },
      { text: "Cancel", next: "menu", values: {} }
    ]
  },

  assessment: {
    title: "Moral Assessment",
    text: "Answer these questions honestly to see where you fall on four key moral dimensions.",
    image: "📊",
    isAssessment: true,
    choices: []
  },

  assessment_results: {
    title: "Your Moral Profile",
    text: "",
    image: "🎯",
    isAssessmentResults: true,
    isFirstTime: true,
    choices: []
  },

  values_intro: {
    title: "Altruxan Philosophy: A Foundation",
    text: "Altruxa, derived from Cosmological Recursion Theory (CRT), represents an objective approach to morality based on reducing suffering and increasing wellbeing across all dimensions of existence.\n\nUnlike relativistic ethics, Altruxa proposes that morality can be understood through dimensional analysis - examining how actions create or reduce suffering across time, scale, and consequence.\n\nThe four key dimensions we track are:\n\n**Empathy**: The capacity to understand and feel what others experience, to see situations from multiple perspectives.\n\n**Wisdom**: The ability to understand root causes, think systemically, and recognize long-term consequences.\n\n**Compassion**: Active concern for reducing suffering and increasing wellbeing, translated into care and action.\n\n**Courage**: Willingness to act on moral understanding even when it costs you personally.\n\nAltruxa isn't about following rules - it's about developing the capacity to see clearly, understand deeply, care genuinely, and act bravely in service of reducing harm.",
    image: "⭐",
    isValuesPage: true,
    choices: [
      { text: "Return to Menu", next: "menu", values: {} }
    ]
  }
};

export default coreScenes;
