import React, { useState } from 'react';
import { Heart, Brain, Users, Sparkles, RotateCcw, Check, Home, ChevronLeft, ChevronRight } from 'lucide-react';

const AltruxaPathGame = () => {
  const [currentScene, setCurrentScene] = useState('loading');
  const [score, setScore] = useState({ empathy: 0, wisdom: 0, compassion: 0, courage: 0 });
  const [choices, setChoices] = useState([]);
  const [showReflection, setShowReflection] = useState(false);
  const [assessmentAnswers, setAssessmentAnswers] = useState({});
  const [assessmentScores, setAssessmentScores] = useState(null);
  const [hasCompletedAssessment, setHasCompletedAssessment] = useState(false);
  const [storyChoices, setStoryChoices] = useState([]);
  const [navigationHistory, setNavigationHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // Load stored data on mount
  React.useEffect(() => {
    const storedScores = localStorage.getItem('altruxaAssessment');
    if (storedScores) {
      setAssessmentScores(JSON.parse(storedScores));
      setHasCompletedAssessment(true);
      setCurrentScene('menu');
    } else {
      setCurrentScene('intro');
    }
  }, []);

  const saveAssessmentToStorage = (scores) => {
    localStorage.setItem('altruxaAssessment', JSON.stringify(scores));
    setHasCompletedAssessment(true);
  };

  const clearAssessment = () => {
    localStorage.removeItem('altruxaAssessment');
    setAssessmentScores(null);
    setAssessmentAnswers({});
    setHasCompletedAssessment(false);
  };

  const navigateToScene = (sceneName, addToHistory = true) => {
    if (addToHistory) {
      // Add current scene to history if moving forward
      const newHistory = navigationHistory.slice(0, historyIndex + 1);
      newHistory.push(currentScene);
      setNavigationHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
    }
    setCurrentScene(sceneName);
  };

  const goBack = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setCurrentScene(navigationHistory[historyIndex - 1]);
    }
  };

  const goForward = () => {
    if (historyIndex < navigationHistory.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setCurrentScene(navigationHistory[historyIndex + 1]);
    }
  };

  const goToMenu = () => {
    navigateToScene('menu', true);
  };

  const assessmentQuestions = [
    {
      id: 1,
      question: "You find a wallet with $500 and ID inside. No one is around.",
      options: [
        { text: "Keep the money, dispose of the wallet", scores: { goodEvil: -3, selfishSelfless: -2 } },
        { text: "Keep the money, mail the wallet back anonymously", scores: { goodEvil: -2, selfishSelfless: -1, scrupulousUnscrupulous: -1 } },
        { text: "Turn it in to lost and found", scores: { goodEvil: 1, selfishSelfless: 1, scrupulousUnscrupulous: 1 } },
        { text: "Use the ID to return it directly to the owner", scores: { goodEvil: 2, selfishSelfless: 2, scrupulousUnscrupulous: 2, couragePrudence: 1 } }
      ]
    },
    {
      id: 2,
      question: "You witness your boss discriminating against a colleague. Speaking up could cost you your job.",
      options: [
        { text: "Stay silent to protect yourself", scores: { goodEvil: -1, selfishSelfless: -2, couragePrudence: -2 } },
        { text: "Anonymously report it", scores: { goodEvil: 1, selfishSelfless: 1, scrupulousUnscrupulous: 1 } },
        { text: "Speak up directly in the moment", scores: { goodEvil: 2, selfishSelfless: 2, couragePrudence: 2, scrupulousUnscrupulous: 1 } },
        { text: "Document and build a case before acting", scores: { goodEvil: 2, selfishSelfless: 1, scrupulousUnscrupulous: 2, couragePrudence: 1 } }
      ]
    },
    {
      id: 3,
      question: "You have one hour of free time. How do you spend it?",
      options: [
        { text: "Doing something purely for my own enjoyment", scores: { selfishSelfless: -1 } },
        { text: "Resting so I can be more helpful later", scores: { selfishSelfless: 0, goodEvil: 0 } },
        { text: "Volunteering or helping someone in need", scores: { selfishSelfless: 2, goodEvil: 1 } },
        { text: "Working on a project that benefits my community", scores: { selfishSelfless: 2, goodEvil: 2 } }
      ]
    },
    {
      id: 4,
      question: "You're offered a high-paying job at a company with questionable ethics.",
      options: [
        { text: "Take it—everyone has to make a living", scores: { goodEvil: -2, selfishSelfless: -1, scrupulousUnscrupulous: -2 } },
        { text: "Take it and try to change things from inside", scores: { goodEvil: 0, selfishSelfless: 0, couragePrudence: 1 } },
        { text: "Decline and look for ethical alternatives", scores: { goodEvil: 2, selfishSelfless: 1, scrupulousUnscrupulous: 2 } },
        { text: "Decline and actively warn others about the company", scores: { goodEvil: 2, selfishSelfless: 2, scrupulousUnscrupulous: 2, couragePrudence: 2 } }
      ]
    },
    {
      id: 5,
      question: "A friend asks you to lie to cover for their infidelity.",
      options: [
        { text: "Agree to help them", scores: { goodEvil: -2, scrupulousUnscrupulous: -3 } },
        { text: "Stay neutral and uninvolved", scores: { goodEvil: -1, selfishSelfless: -1 } },
        { text: "Refuse but don't tell their partner", scores: { goodEvil: 0, scrupulousUnscrupulous: 1 } },
        { text: "Refuse and encourage them to tell the truth", scores: { goodEvil: 1, selfishSelfless: 1, scrupulousUnscrupulous: 2, couragePrudence: 1 } },
        { text: "Refuse, help them understand the harm they're causing, and support them in coming clean with compassion", scores: { goodEvil: 2, selfishSelfless: 2, scrupulousUnscrupulous: 2, couragePrudence: 1, empathy: 1 } }
      ]
    },
    {
      id: 6,
      question: "You can save 10 people by sacrificing one person. No one would ever know your choice.",
      options: [
        { text: "Refuse to choose—let fate decide", scores: { goodEvil: -1, couragePrudence: -1 } },
        { text: "Save the 10, accept the burden", scores: { goodEvil: 1, selfishSelfless: 1, couragePrudence: 2 } },
        { text: "Take the harm yourself instead, if it's reversible or temporary", scores: { goodEvil: 3, selfishSelfless: 3, couragePrudence: 2, scrupulousUnscrupulous: 2 } },
        { text: "Can't make that choice—it's not mine to make", scores: { goodEvil: 0, scrupulousUnscrupulous: 1 } },
        { text: "Find a third option that saves everyone", scores: { goodEvil: 2, selfishSelfless: 2, couragePrudence: 1 } }
      ]
    },
    {
      id: 7,
      question: "You discover your company is polluting but fixing it would cost your job and many others.",
      options: [
        { text: "Keep quiet—too many livelihoods at stake", scores: { goodEvil: -2, selfishSelfless: -1, scrupulousUnscrupulous: -2 } },
        { text: "Raise concerns internally only", scores: { goodEvil: 0, scrupulousUnscrupulous: 1 } },
        { text: "Report it publicly despite consequences", scores: { goodEvil: 2, selfishSelfless: 2, couragePrudence: 2, scrupulousUnscrupulous: 2 } },
        { text: "Build coalition for reform while keeping jobs", scores: { goodEvil: 2, selfishSelfless: 1, couragePrudence: 1, scrupulousUnscrupulous: 1 } }
      ]
    },
    {
      id: 8,
      question: "Someone vulnerable asks for help, but helping them would significantly inconvenience you.",
      options: [
        { text: "Politely decline—I have my own priorities", scores: { selfishSelfless: -2, goodEvil: -1 } },
        { text: "Offer minimal help to ease my conscience", scores: { selfishSelfless: -1, goodEvil: 0 } },
        { text: "Help despite the inconvenience", scores: { selfishSelfless: 2, goodEvil: 1, couragePrudence: 1 } },
        { text: "Help and find sustainable solutions", scores: { selfishSelfless: 2, goodEvil: 2, couragePrudence: 1 } }
      ]
    }
  ];

  const calculateAssessment = () => {
    const totals = {
      goodEvil: 0,
      selfishSelfless: 0,
      scrupulousUnscrupulous: 0,
      couragePrudence: 0
    };

    // assessmentAnswers now stores questionId -> optionIndex
    Object.entries(assessmentAnswers).forEach(([questionId, optionIndex]) => {
      const question = assessmentQuestions.find(q => q.id === parseInt(questionId));
      if (question) {
        const selectedOption = question.options[optionIndex];
        if (selectedOption && selectedOption.scores) {
          Object.entries(selectedOption.scores).forEach(([key, value]) => {
            totals[key] += value;
          });
        }
      }
    });

    // Normalize to -10 to +10 scale
    const maxPossible = assessmentQuestions.length * 2;
    const normalized = {
      goodEvil: Math.round((totals.goodEvil / maxPossible) * 10),
      selfishSelfless: Math.round((totals.selfishSelfless / maxPossible) * 10),
      scrupulousUnscrupulous: Math.round((totals.scrupulousUnscrupulous / maxPossible) * 10),
      couragePrudence: Math.round((totals.couragePrudence / maxPossible) * 10)
    };

    setAssessmentScores(normalized);
    saveAssessmentToStorage(normalized);
    setCurrentScene('assessment_results');
  };

  const handleAssessmentAnswer = (questionId, optionIndex) => {
    setAssessmentAnswers({
      ...assessmentAnswers,
      [questionId]: optionIndex
    });
  };

  const scenarios = {
    intro: {
      title: "Welcome to the Path of Altruxa",
      text: "Before you begin your journey, let us understand where you currently stand on the moral spectrum.",
      image: "🌅",
      choices: [
        { text: "Take the Moral Assessment", next: "assessment", values: {} }
      ]
    },

    menu: {
      title: "The Altruxan Path",
      text: "Choose your next step on the journey.",
      image: "🧭",
      isMenu: true,
      choices: [
        { text: "View My Moral Compass", next: "view_compass", values: {} },
        { text: "Learn Altruxan Philosophy", next: "values_intro", values: {} },
        { text: "Retake Assessment", next: "retake_assessment", values: {} },
        { text: "Begin Maya's Story", next: "story_intro", values: {} }
      ]
    },

    view_compass: {
      title: "Your Moral Compass",
      text: "",
      image: "🎯",
      isAssessmentResults: true,
      choices: [
        { text: "Return to Menu", next: "menu", values: {} }
      ]
    },

    retake_assessment: {
      title: "Retake Assessment",
      text: "You can retake the assessment at any time. Your previous answers will be cleared.",
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
      choices: [] // Will be handled by special logic
    },

    assessment_results: {
      title: "Your Moral Profile",
      text: "",
      image: "🎯",
      isAssessmentResults: true,
      isFirstTime: true,
      choices: [
        { text: "Continue to Menu", next: "menu", values: {} }
      ]
    },

    values_intro: {
      title: "Altruxan Philosophy: A Foundation",
      text: "",
      image: "⭐",
      isValuesPage: true,
      choices: [
        { text: "Return to Menu", next: "menu", values: {} }
      ]
    },

    story_intro: {
      title: "Maya's Journey",
      text: "You are Maya, a software engineer at TechCorp. Over the next few weeks, you'll face a series of interconnected moral choices. Each decision will shape not only your path, but the lives of those around you. Your choices will be remembered.",
      image: "👤",
      choices: [
        { text: "Begin the story", next: "story_1", values: {} }
      ]
    },

    story_1: {
      title: "Day 1: The Discovery",
      text: "You discover that your company's algorithm is systematically rejecting loan applications from certain neighborhoods, effectively discriminating by race. You have evidence. Your manager knows you found it. What do you do first?",
      image: "💻",
      isStoryChoice: true,
      choices: [
        {
          text: "Delete the evidence and pretend you never saw it",
          next: "story_1a",
          consequence: "Protected yourself but allowed systemic harm to continue",
          alignment: "Malidox - Evil",
          storyData: { choice: "delete_evidence", moral: -3 }
        },
        {
          text: "Raise it in your next 1-on-1 with your manager",
          next: "story_1b",
          consequence: "Attempted internal resolution through proper channels",
          alignment: "Neutral - following protocol without urgency",
          storyData: { choice: "manager_discussion", moral: 0 }
        },
        {
          text: "Document everything and send anonymous report to senior leadership",
          next: "story_1c",
          consequence: "Escalated the issue while protecting yourself",
          alignment: "Neutral Good - some risk, addresses harm",
          storyData: { choice: "anonymous_escalation", moral: 1 }
        },
        {
          text: "Document everything and prepare to go public if internal channels fail",
          next: "story_1d",
          consequence: "Committed to ensuring the harm stops, accepting personal risk",
          alignment: "Good - prioritizes ending discrimination over personal safety",
          storyData: { choice: "prepared_accountability", moral: 2 }
        }
      ]
    },

    story_1a: {
      title: "Day 7: The Weight of Silence",
      text: "A week passes. You deleted the evidence, but you can't delete your knowledge. You see a news article about a family denied a loan - same neighborhood pattern. Your coworker Jordan approaches you: 'Hey, I found something weird in the algorithm. Have you seen anything like this?' Jordan has partial evidence.",
      image: "😰",
      isStoryChoice: true,
      choices: [
        {
          text: "Lie and say you haven't seen anything",
          next: "story_2_path_a",
          consequence: "Compounded initial wrong with active deception",
          alignment: "Evil - doubled down on complicity",
          storyData: { choice: "lie_to_jordan", moral: -2 }
        },
        {
          text: "Admit what you found and destroyed, and help Jordan now",
          next: "story_2_path_b",
          consequence: "Took accountability for past mistake and chose to help",
          alignment: "Neutral Good - redemptive action",
          storyData: { choice: "confess_and_help", moral: 1 }
        },
        {
          text: "Discourage Jordan from pursuing it - 'It's not worth the trouble'",
          next: "story_2_path_a",
          consequence: "Attempted to stop others from doing what's right",
          alignment: "Neutral Evil - protecting self at others' expense",
          storyData: { choice: "discourage_jordan", moral: -1 }
        }
      ]
    },

    story_1b: {
      title: "Day 5: The Manager's Response",
      text: "Your manager listens, then says: 'This is above my pay grade. I'll mention it upward, but honestly? This algorithm makes us money. Don't make waves.' Then adds: 'Your performance review is coming up.' The threat is subtle but clear.",
      image: "👔",
      isStoryChoice: true,
      choices: [
        {
          text: "Drop it and focus on your career",
          next: "story_2_path_a",
          consequence: "Chose career safety over addressing discrimination",
          alignment: "Neutral Evil - complicity after awareness",
          storyData: { choice: "drop_for_career", moral: -1 }
        },
        {
          text: "Escalate to senior leadership despite the implied threat",
          next: "story_2_path_c",
          consequence: "Persisted despite pressure, escalated appropriately",
          alignment: "Neutral Good - courage with some personal risk",
          storyData: { choice: "escalate_anyway", moral: 1 }
        },
        {
          text: "Begin documenting everything including manager's response, prepare external options",
          next: "story_2_path_d",
          consequence: "Strategic preparation for accountability with evidence",
          alignment: "Good - thorough approach to ensure justice",
          storyData: { choice: "document_retaliation", moral: 2 }
        }
      ]
    },

    story_1c: {
      title: "Day 10: The Anonymous Report",
      text: "Your anonymous report reached senior leadership. They launched an 'investigation' but you've heard through the grapevine they're more focused on finding the whistleblower than fixing the algorithm. Someone leaked your identity - they know it was you.",
      image: "🔍",
      isStoryChoice: true,
      choices: [
        {
          text: "Deny it was you, try to deflect suspicion",
          next: "story_2_path_a",
          consequence: "Retreated when your identity was exposed",
          alignment: "Neutral - self-protection after initial courage",
          storyData: { choice: "deny_report", moral: 0 }
        },
        {
          text: "Stand by your report, insist on real investigation",
          next: "story_2_path_d",
          consequence: "Maintained commitment to justice despite exposure",
          alignment: "Good - courage under pressure",
          storyData: { choice: "stand_firm", moral: 2 }
        },
        {
          text: "Contact a journalist with your evidence before the company can bury it",
          next: "story_2_path_e",
          consequence: "Ensured accountability by going public",
          alignment: "Good - maximum harm reduction, maximum personal risk",
          storyData: { choice: "contact_press", moral: 2 }
        }
      ]
    },

    story_1d: {
      title: "Day 8: Preparing for Battle",
      text: "You've been careful. You have comprehensive documentation. You've researched whistleblower protections. But before going further, your partner at home says: 'If you do this, we might lose everything - the house, healthcare for the kids. Can't someone else fight this fight?'",
      image: "⚔️",
      isStoryChoice: true,
      choices: [
        {
          text: "Your family comes first. Find a way to leak it without personal risk.",
          next: "story_2_path_c",
          consequence: "Balanced personal responsibility with family protection",
          alignment: "Neutral Good - addresses harm while protecting loved ones",
          storyData: { choice: "leak_safely", moral: 1 }
        },
        {
          text: "Explain to your partner why you have to do this, then proceed with full transparency",
          next: "story_2_path_e",
          consequence: "Chose moral duty with family understanding",
          alignment: "Good - complete integrity despite cost",
          storyData: { choice: "proceed_with_integrity", moral: 2 }
        },
        {
          text: "Step back and pass your documentation to a civil rights organization",
          next: "story_2_path_d",
          consequence: "Ensured action while sharing the burden",
          alignment: "Good - strategic delegation for harm reduction",
          storyData: { choice: "civil_rights_org", moral: 2 }
        }
      ]
    },

    story_2_path_a: {
      title: "Three Months Later: The Consequences of Silence",
      text: "The discriminatory algorithm is still running. You've been promoted - your manager rewarded your loyalty. But an investigative journalist has now exposed it. Your name appears in leaked documents as someone who knew. A reporter calls you.",
      image: "📞",
      isStoryChoice: true,
      choices: [
        {
          text: "Lie to the reporter - claim you didn't know",
          next: "story_ending",
          consequence: "Compounded harm with public deception",
          alignment: "Evil - active cover-up participation",
          storyData: { choice: "lie_to_press", moral: -3 }
        },
        {
          text: "Tell the truth about what you knew and when, accepting consequences",
          next: "story_ending",
          consequence: "Late accountability - truth after damage was done",
          alignment: "Neutral - redemption attempt but timing matters",
          storyData: { choice: "late_truth", moral: 0 }
        }
      ]
    },

    story_2_path_b: {
      title: "Two Weeks Later: Jordan's Courage",
      text: "You and Jordan have been working together, gathering evidence. Jordan wants to go to the press immediately. You're hesitant - you're worried about retaliation for both of you. Jordan says: 'Every day we wait, more families are denied. What are we waiting for?'",
      image: "🤝",
      isStoryChoice: true,
      choices: [
        {
          text: "Convince Jordan to wait while you try internal channels first",
          next: "story_ending",
          consequence: "Slowed down justice out of fear",
          alignment: "Neutral - caution that may cost others",
          storyData: { choice: "delay_action", moral: 0 }
        },
        {
          text: "Support Jordan's decision and go to the press together",
          next: "story_ending",
          consequence: "Acted with urgency to stop ongoing harm",
          alignment: "Good - prioritized victims over personal safety",
          storyData: { choice: "press_together", moral: 2 }
        }
      ]
    },

    story_2_path_c: {
      title: "One Month Later: Internal Politics",
      text: "Leadership is investigating but moving slowly. You hear they're planning a quiet algorithm 'update' without admitting fault. Meanwhile, a class-action lawsuit has been filed by affected families. A lawyer contacts you asking for testimony.",
      image: "⚖️",
      isStoryChoice: true,
      choices: [
        {
          text: "Decline to testify - you've done enough",
          next: "story_ending",
          consequence: "Started well but didn't follow through to justice",
          alignment: "Neutral - incomplete courage",
          storyData: { choice: "decline_testimony", moral: 0 }
        },
        {
          text: "Agree to testify, provide all your documentation",
          next: "story_ending",
          consequence: "Saw it through to accountability",
          alignment: "Good - complete commitment to justice",
          storyData: { choice: "testify", moral: 2 }
        }
      ]
    },

    story_2_path_d: {
      title: "Three Weeks Later: The Investigation",
      text: "Your actions triggered a serious investigation. The company is scrambling. They offer you a settlement: a year's salary, glowing recommendation, NDA. Or you can proceed with full whistleblower disclosure. The civil rights org says they don't need you to proceed - they have enough.",
      image: "💼",
      isStoryChoice: true,
      choices: [
        {
          text: "Take the settlement - you've done your part",
          next: "story_ending",
          consequence: "Achieved partial justice with personal protection",
          alignment: "Neutral Good - balanced outcome",
          storyData: { choice: "take_settlement", moral: 1 }
        },
        {
          text: "Reject the settlement, proceed with full public disclosure",
          next: "story_ending",
          consequence: "Chose maximum accountability over personal gain",
          alignment: "Good - integrity over comfort",
          storyData: { choice: "full_disclosure", moral: 2 }
        },
        {
          text: "Negotiate: take settlement but donate it to affected families",
          next: "story_ending",
          consequence: "Found creative way to help victims directly",
          alignment: "Good - selfless use of personal gain",
          storyData: { choice: "donate_settlement", moral: 3 }
        }
      ]
    },

    story_2_path_e: {
      title: "Ten Days Later: Going Public",
      text: "Your story is front page news. The algorithm has been suspended. But you've been fired, and your family is struggling. A tech executive from another company privately contacts you: 'What you did took guts. I want to hire you, but I need to know - would you do the same thing to us?'",
      image: "📰",
      isStoryChoice: true,
      choices: [
        {
          text: "Tell them what they want to hear to get the job",
          next: "story_ending",
          consequence: "Compromised principles after sacrifice",
          alignment: "Neutral - courage followed by expedience",
          storyData: { choice: "compromise_for_job", moral: 0 }
        },
        {
          text: "Be honest: 'Yes, if you were harming people, I would.'",
          next: "story_ending",
          consequence: "Maintained integrity even at further cost",
          alignment: "Good - unwavering principle",
          storyData: { choice: "honest_answer", moral: 2 }
        }
      ]
    },

    story_ending: {
      title: "Maya's Journey Complete",
      text: "",
      image: "🌟",
      isStoryEnding: true,
      choices: [
        { text: "Continue to Final Scenarios", next: "scene1", values: {} }
      ]
    },
    
    scene1: {
      title: "The Struggling Friend",
      text: "Your friend Alex has been borrowing money frequently and hasn't paid you back. Today they ask for another loan, saying they're desperate. You notice they just bought new expensive headphones. What do you do?",
      image: "💭",
      choices: [
        {
          text: "Give them the money without question",
          next: "scene1_a",
          values: { compassion: 1 },
          analysis: "You showed immediate compassion, but missed deeper dimensions. Sometimes enabling harmful patterns isn't true kindness."
        },
        {
          text: "Refuse and tell them to be more responsible",
          next: "scene1_b",
          values: {},
          analysis: "You focused on surface-level responsibility, but didn't explore why they're struggling or what they truly need."
        },
        {
          text: "Lecture them about financial planning and how they should budget better",
          next: "scene1_d",
          values: {},
          analysis: "You assumed you understood their situation and imposed your framework. This adds shame without addressing root causes."
        },
        {
          text: "Offer to talk about what's really going on, and explore options together",
          next: "scene1_c",
          values: { empathy: 2, wisdom: 1 },
          analysis: "Altruxan approach! You looked beyond the immediate request to understand root causes and find solutions that address real suffering."
        },
        {
          text: "Give a smaller amount and say it's all you can afford right now",
          next: "scene1_e",
          values: { compassion: 1, wisdom: 1 },
          analysis: "Practical compromise! You balanced compassion with boundaries. Not perfect, but shows dimensional thinking about both their needs and yours."
        }
      ]
    },

    scene1_a: {
      title: "Unintended Consequences",
      text: "You gave Alex the money. Three weeks later, they haven't paid you back and are asking again. You later learn they have a shopping addiction they've been hiding. Your immediate kindness may have enabled harm.",
      image: "😔",
      reflection: "Objective Morality asks: What reduces suffering long-term? Sometimes the most compassionate act requires difficult conversations and boundaries.",
      choices: [
        { text: "Continue to scene 2", next: "scene2", values: {} }
      ]
    },

    scene1_b: {
      title: "Hidden Depths",
      text: "Alex walks away hurt. Later, you learn they were struggling with medical bills they were too ashamed to mention. Your judgment about the headphones (a gift) caused deeper isolation.",
      image: "💔",
      reflection: "Altruxa teaches: Before judging, seek to understand. The visible surface rarely reveals the full dimensional depth of someone's struggle.",
      choices: [
        { text: "Continue to scene 2", next: "scene2", values: {} }
      ]
    },

    scene1_c: {
      title: "Opening Doors",
      text: "Through honest conversation, Alex reveals they're struggling with anxiety and using shopping as a coping mechanism. Together, you explore resources for mental health support and create a plan. They feel seen, not judged.",
      image: "🌟",
      reflection: "This is Altruxan practice: Empathy reveals root causes. Wisdom guides toward solutions that reduce actual suffering. Compassion holds space without enabling harm.",
      choices: [
        { text: "Continue to scene 2", next: "scene2", values: {} }
      ]
    },

    scene1_d: {
      title: "The Lesson Unheard",
      text: "Alex nods along to your financial advice but you can see them shutting down. They leave feeling judged and more alone. The headphones, you later learn, were a gift from their parent who just died—one of the last things they have to remember them by.",
      image: "😞",
      reflection: "Altruxa warns against imposing our frameworks without understanding context. We saw surface behavior and judged it, missing the grief and pain underneath. Wisdom requires curiosity before conclusion.",
      choices: [
        { text: "Continue to scene 2", next: "scene2", values: {} }
      ]
    },

    scene1_e: {
      title: "A Bridge, Not a Wall",
      text: "Alex accepts gratefully. It doesn't solve everything, but it keeps communication open. Later, when they're ready, they come back and you have the deeper conversation about what's really happening. Your boundary was kind, not cutting.",
      image: "🌉",
      reflection: "Sometimes the Altruxan path is imperfect but workable. You protected yourself while maintaining connection. Not every situation requires the perfect answer—sometimes 'good enough with care' reduces more suffering than perfection.",
      choices: [
        { text: "Continue to scene 2", next: "scene2", values: {} }
      ]
    },

    scene2: {
      title: "The Online Debate",
      text: "You see someone posting harmful misinformation online that's genuinely hurting people. They're being aggressively wrong, and others are arguing with them. How do you engage?",
      image: "💬",
      choices: [
        {
          text: "Send a thoughtful private message addressing the harm and offering better information",
          next: "scene2_c",
          values: { empathy: 1, wisdom: 2 },
          analysis: "Altruxan wisdom! You targeted harm reduction without adding to suffering, and offered dignity that might actually change minds."
        },
        {
          text: "Join the pile-on to shame them into stopping",
          next: "scene2_a",
          values: {},
          analysis: "While the intention might be protective, public shaming often entrenches beliefs and creates more suffering."
        },
        {
          text: "Ignore it - not your problem",
          next: "scene2_b",
          values: {},
          analysis: "Sometimes disengagement is wise, but total detachment when you could reduce harm isn't the Altruxan path."
        },
        {
          text: "Post correct information publicly without engaging them directly",
          next: "scene2_d",
          values: { wisdom: 1 },
          analysis: "Strategic! You provided truth without feeding conflict. This can work, though direct engagement might have been more effective."
        },
        {
          text: "Report the post to moderators and move on",
          next: "scene2_e",
          values: { wisdom: 1 },
          analysis: "You used systemic tools appropriately, but the immediate harm continues while the report is reviewed. Sometimes we need both systemic and personal action."
        }
      ]
    },

    scene2_a: {
      title: "Digging In",
      text: "The person doubles down, shares even more misinformation, and gains supporters who see them as a victim of 'cancel culture.' The harm multiplied.",
      image: "📢",
      reflection: "Objective Morality measures outcomes: Did suffering decrease? Public shaming often triggers defensive reactions rather than growth. Consider dimensional thinking—what caused their beliefs?",
      choices: [
        { text: "Continue to scene 3", next: "scene3", values: {} }
      ]
    },

    scene2_b: {
      title: "Ripples Unseen",
      text: "The misinformation spreads. Someone makes a harmful health decision based on it. You wonder if your voice could have mattered.",
      image: "🌊",
      reflection: "Altruxa isn't passive. When you can reduce suffering without causing more harm, inaction becomes a choice with consequences.",
      choices: [
        { text: "Continue to scene 3", next: "scene3", values: {} }
      ]
    },

    scene2_c: {
      title: "Seeds Planted",
      text: "The person doesn't immediately change their mind, but they read your message. Two weeks later, they quietly remove the harmful post. Sometimes patience and dignity work where force fails.",
      image: "🌱",
      reflection: "This embodies Altruxan practice: Address root causes with compassion, allow dignity, focus on harm reduction rather than punishment. Change takes time.",
      choices: [
        { text: "Continue to scene 3", next: "scene3", values: {} }
      ]
    },

    scene2_d: {
      title: "Parallel Truth",
      text: "Your post gets some engagement. A few people thank you for the clarification. The original poster never engages, but others stop sharing their misinformation. You reduced harm without creating conflict.",
      image: "💡",
      reflection: "Altruxan paths can be indirect. Sometimes speaking truth to the community reduces harm more effectively than trying to change one person. You understood the dimensional impact of your action.",
      choices: [
        { text: "Continue to scene 3", next: "scene3", values: {} }
      ]
    },

    scene2_e: {
      title: "Systemic Delay",
      text: "Three days later, the post is removed. But it had already spread widely. You relied on systems that work slowly. The harm was real and immediate; the response was delayed.",
      image: "⏱️",
      reflection: "Altruxa recognizes that systems matter, but timing matters too. Sometimes we need multiple strategies—systemic change AND immediate intervention. No single approach handles every situation.",
      choices: [
        { text: "Continue to scene 3", next: "scene3", values: {} }
      ]
    },

    scene3: {
      title: "The Difficult Boss",
      text: "Your boss is treating your coworker terribly—constant criticism, impossible demands. Your coworker is breaking down. You have a meeting with your boss today. What do you do?",
      image: "🏢",
      choices: [
        {
          text: "Stay quiet to protect your own position",
          next: "scene3_a",
          values: {},
          analysis: "Fear is understandable, but objective morality weighs suffering: Your coworker's harm is real and immediate."
        },
        {
          text: "Angrily confront your boss about their behavior",
          next: "scene3_b",
          values: { compassion: 1 },
          analysis: "Brave, but righteousness without strategy rarely reduces suffering. You may escalate harm for both of you."
        },
        {
          text: "Document the behavior, support your coworker, and strategically raise concerns through proper channels",
          next: "scene3_c",
          values: { empathy: 2, wisdom: 2, compassion: 1 },
          analysis: "Altruxan excellence! You balanced courage with wisdom, empathy with effectiveness. This path maximizes harm reduction."
        },
        {
          text: "Privately tell your boss you've noticed tension and ask if there's anything going on",
          next: "scene3_d",
          values: { empathy: 1 },
          analysis: "Interesting approach—you sought understanding. But you may have missed that your coworker's immediate suffering needed more direct protection."
        },
        {
          text: "Help your coworker document everything and look for a new job",
          next: "scene3_e",
          values: { compassion: 2 },
          analysis: "You protected the victim, which matters. But sometimes addressing systemic problems prevents future victims too."
        }
      ]
    },

    scene3_a: {
      title: "The Weight of Silence",
      text: "Your coworker quits suddenly. You later learn they had a breakdown. The boss continues the pattern with the next hire. Your silence protected you but permitted ongoing harm.",
      image: "😶",
      reflection: "Objective Morality asks: When we have power to reduce suffering, what's our responsibility? Altruxa isn't about martyrdom, but it does call us beyond pure self-interest.",
      choices: [
        { text: "Continue to scene 4", next: "scene4", values: {} }
      ]
    },

    scene3_b: {
      title: "Noble but Costly",
      text: "Your boss retaliates, making both your lives harder. You showed courage, but without strategy, you increased suffering rather than reducing it. Your coworker eventually leaves anyway.",
      image: "⚔️",
      reflection: "Altruxa honors your compassion but asks for wisdom too. Righteous anger needs to be paired with dimensional thinking—what approach actually reduces harm?",
      choices: [
        { text: "Continue to scene 4", next: "scene4", values: {} }
      ]
    },

    scene3_c: {
      title: "Systems Change",
      text: "HR investigates based on your documentation. Your coworker feels supported and stays. The boss either changes or moves on. You protected yourself while reducing suffering systematically.",
      image: "⚖️",
      reflection: "This is mature Altruxan practice: See the full dimensional picture, act with both empathy and strategy, focus on actual harm reduction rather than just feeling righteous.",
      choices: [
        { text: "Continue to scene 4", next: "scene4", values: {} }
      ]
    },

    scene3_d: {
      title: "Missing the Mark",
      text: "Your boss opens up—they're under enormous pressure from above. You empathize. But your coworker quits two days later. Your curiosity about the boss's experience overshadowed the urgent need to protect someone actively being harmed.",
      image: "⚖️",
      reflection: "Altruxa values understanding all perspectives, but not at the cost of immediate suffering. Sometimes we must act to protect first, understand second. Dimensional thinking includes recognizing when harm is urgent.",
      choices: [
        { text: "Continue to scene 4", next: "scene4", values: {} }
      ]
    },

    scene3_e: {
      title: "One Safe, Others at Risk",
      text: "Your coworker finds a better job and leaves gratefully. But the boss continues the pattern with the next hire, and the next. You saved one person but didn't address the root problem.",
      image: "🚪",
      reflection: "Altruxan compassion is beautiful, but paired with wisdom it becomes more powerful. Sometimes we must choose between saving one person and changing the system. The most Altruxan path often tries to do both.",
      choices: [
        { text: "Continue to scene 4", next: "scene4", values: {} }
      ]
    },

    scene4: {
      title: "Family Boundaries",
      text: "Your sibling calls in crisis—again. They've been in and out of recovery for years, and each time they ask for help, it derails your life for weeks. They're asking to stay with you 'just for a few days' but you have young children and this has happened five times before. What do you do?",
      image: "🏠",
      choices: [
        {
          text: "Let them stay—family is family, and they need you",
          next: "scene4_a",
          values: { compassion: 1 },
          analysis: "Your loyalty is admirable, but you may be sacrificing your children's stability and enabling a pattern that prevents your sibling from getting real help."
        },
        {
          text: "Say no firmly—you have to protect your family",
          next: "scene4_b",
          values: { wisdom: 1 },
          analysis: "Boundaries matter, but delivered without offering alternatives, this may abandon someone in genuine crisis. Altruxa seeks the path that reduces total suffering."
        },
        {
          text: "Tell them they need to prove they're serious about recovery first",
          next: "scene4_c",
          values: {},
          analysis: "You're imposing conditions from a place of frustration. People in crisis rarely have the capacity to 'prove themselves' before receiving support."
        },
        {
          text: "Offer to help them get into a treatment facility or transitional housing instead, and commit to supporting that process",
          next: "scene4_d",
          values: { empathy: 2, wisdom: 2, compassion: 1 },
          analysis: "Altruxan maturity! You acknowledged the real need, protected your family, and offered genuine help that addresses root causes rather than temporary fixes."
        },
        {
          text: "Let them stay but set strict conditions and timeline",
          next: "scene4_e",
          values: { compassion: 1, wisdom: 1 },
          analysis: "A compromise that may work. You're trying to balance compassion with protection, though the pattern suggests this might not address the deeper issues."
        }
      ]
    },

    scene4_a: {
      title: "The Familiar Cycle",
      text: "Three days turns into three weeks. Your children are anxious. Your sibling relapses in your home. The crisis you tried to prevent happened anyway, but now it's affecting your whole family. Love without wisdom can multiply suffering.",
      image: "😟",
      reflection: "Altruxa asks: Who benefits from this choice? Sometimes our compassion serves our need to feel like a good person more than it serves the one we're helping. Dimensional thinking means seeing all the suffering our choices create or prevent.",
      choices: [
        { text: "Continue to scene 5", next: "scene5", values: {} }
      ]
    },

    scene4_b: {
      title: "The Door Closed",
      text: "Your sibling leaves angry. Two weeks later, a mutual friend tells you they're sleeping rough and their condition is deteriorating. You protected your family but your sibling had nowhere to turn. The weight sits heavy.",
      image: "🚪",
      reflection: "Boundaries are valid, but Altruxa challenges us: Was there truly no third path? Sometimes the hardest work is finding solutions that don't force us to choose between people we love.",
      choices: [
        { text: "Continue to scene 5", next: "scene5", values: {} }
      ]
    },

    scene4_c: {
      title: "The Impossible Test",
      text: "Your sibling can't meet your conditions—they're in crisis precisely because they don't have stability. They stop calling. You hear later they ended up in the ER. Your conditions protected you from manipulation, but may have closed the door when they genuinely needed help.",
      image: "📋",
      reflection: "Altruxa warns against making crisis the test. People drowning can't swim perfectly before we throw them a rope. The question isn't 'have they earned help' but 'what actually reduces suffering?'",
      choices: [
        { text: "Continue to scene 5", next: "scene5", values: {} }
      ]
    },

    scene4_d: {
      title: "The Harder Path",
      text: "It takes work—phone calls, research, advocating. But you find a treatment program with an opening. Your sibling is scared but goes. It's not certain they'll succeed, but you've given them a real chance while keeping your family safe. This is what love with wisdom looks like.",
      image: "🌟",
      reflection: "This is Altruxan practice at its most challenging: refusing the false choice between abandonment and enabling, doing the difficult work to find real solutions. You saw the dimensional complexity and acted to reduce suffering for everyone.",
      choices: [
        { text: "Continue to scene 5", next: "scene5", values: {} }
      ]
    },

    scene4_e: {
      title: "Walking the Tightrope",
      text: "The week is tense but your sibling respects most boundaries. It doesn't fix everything, but it prevents immediate crisis and keeps connection alive. Sometimes the Altruxan path isn't perfect—it's just better than the alternatives you could see.",
      image: "🤝",
      reflection: "Altruxa recognizes that real life rarely offers perfect solutions. You made a choice that reduced immediate suffering while maintaining boundaries. Imperfect compassion is still compassion.",
      choices: [
        { text: "Continue to scene 5", next: "scene5", values: {} }
      ]
    },

    scene5: {
      title: "The Company's Dark Secret",
      text: "You discover your company is quietly exploiting contract workers in another country—terrible conditions, poverty wages. You need this job; you have student loans and your family depends on your income. HR insists everything is 'legal.' What do you do?",
      image: "🏭",
      choices: [
        {
          text: "Keep your head down—you can't afford to lose this job",
          next: "scene5_a",
          values: {},
          analysis: "Your fear is valid, but Altruxa asks: At what point does complicity become participation? Sometimes our comfort costs others their dignity."
        },
        {
          text: "Quit immediately on principle",
          next: "scene5_b",
          values: { compassion: 1 },
          analysis: "Principled, but possibly impractical. You removed yourself from the problem, but didn't reduce the suffering of the workers."
        },
        {
          text: "Anonymously leak information to the media",
          next: "scene5_c",
          values: { courage: 1, wisdom: 1 },
          analysis: "Bold action that might create change, but anonymity protects you while workers face the consequences. Consider whether there's a path with more shared accountability."
        },
        {
          text: "Ignore it—it's 'legal' so it's not your responsibility",
          next: "scene5_d",
          values: {},
          analysis: "Legal doesn't mean moral. Altruxa teaches that we can't outsource our ethical responsibility to systems that themselves cause harm."
        },
        {
          text: "Document everything, build a coalition of coworkers, and push for change from inside while preparing for possible consequences",
          next: "scene5_e",
          values: { empathy: 2, wisdom: 2, compassion: 2 },
          analysis: "Altruxan courage! You're taking real risk to address real suffering, using strategy to maximize impact. You recognized that individual action works better when it becomes collective action."
        }
      ]
    },

    scene5_a: {
      title: "The Weight You Carry",
      text: "Months pass. The exploitation continues. You're financially stable but you can't shake the knowledge of what your comfort costs. You avoid conversations about your work. The complicity feels heavier each day.",
      image: "⚖️",
      reflection: "Altruxa understands survival instincts, but asks: Can we survive well while others suffer for our survival? Sometimes the harm we allow becomes the harm we embody. There are degrees of complicity.",
      choices: [
        { text: "Continue to scene 6", next: "scene6", values: {} }
      ]
    },

    scene5_b: {
      title: "Pure but Alone",
      text: "You quit. Your financial situation becomes desperate. The workers overseas see no change—the company just hires someone else to fill your role. Your conscience is clear but you're struggling, and the suffering you tried to protest continues unchanged.",
      image: "🚶",
      reflection: "Altruxa honors your integrity but asks: Did your choice reduce suffering? Sometimes purity and effectiveness are in tension. The dimensional view requires us to measure actual outcomes, not just intentions.",
      choices: [
        { text: "Continue to scene 6", next: "scene6", values: {} }
      ]
    },

    scene5_c: {
      title: "Exposure and Aftermath",
      text: "The story breaks. There's brief outrage, but the company pivots messaging and weathers it. Some improvements happen, but workers report retaliation. You remain safe and anonymous. Change occurred, but incompletely, and you shared none of the cost.",
      image: "📰",
      reflection: "Altruxa sees complexity here: You created some change, which matters. But there's an ethical dimension to who bears the cost of resistance. Sometimes full moral action requires shared vulnerability.",
      choices: [
        { text: "Continue to scene 6", next: "scene6", values: {} }
      ]
    },

    scene5_d: {
      title: "Willful Blindness",
      text: "You convince yourself it's not your problem. Years later, when conditions are finally exposed, you realize you were part of a system of knowing participants. Legal protection doesn't protect you from the knowing. The suffering you witnessed continues to echo.",
      image: "🙈",
      reflection: "Altruxa warns: Systems of harm rely on good people convincing themselves it's not their responsibility. When we know and do nothing, we become the mechanism by which harm perpetuates.",
      choices: [
        { text: "Continue to scene 6", next: "scene6", values: {} }
      ]
    },

    scene5_e: {
      title: "The Long Fight",
      text: "It takes months. Some coworkers join you; others stay silent. You face pressure and veiled threats. But the coalition forces real negotiations. Conditions improve significantly. You may lose your job, but workers are better off. And you're not alone in the struggle.",
      image: "✊",
      reflection: "This is Altruxan practice at its most demanding: You saw suffering, assessed your power to act, accepted risk, and built collective strength. Not everyone can do this, but those who can, must. Dimensional morality sometimes requires sacrifice.",
      choices: [
        { text: "Continue to scene 6", next: "scene6", values: {} }
      ]
    },

    scene6: {
      title: "The Painful Truth",
      text: "Your best friend's partner is cheating on them. You have proof. Your friend is about to make a major life decision based on this relationship—moving across the country, turning down a dream job. The partner has asked you to stay quiet. What do you do?",
      image: "💔",
      choices: [
        {
          text: "Stay quiet—it's not your place to interfere in their relationship",
          next: "scene6_a",
          values: {},
          analysis: "You avoided conflict, but your friend is making life-altering decisions based on false information. Sometimes protecting relationships means having difficult conversations."
        },
        {
          text: "Tell your friend directly and privately what you know",
          next: "scene6_b",
          values: { empathy: 2, wisdom: 1, compassion: 1 },
          analysis: "Altruxan integrity! You chose temporary pain over ongoing deception. You gave your friend the information they need to make real choices about their life."
        },
        {
          text: "Confront the partner first and demand they tell the truth",
          next: "scene6_c",
          values: { wisdom: 1 },
          analysis: "You tried to avoid being the messenger, but you're still inserting yourself into their dynamic. This rarely works and may give the partner time to control the narrative."
        },
        {
          text: "Tell your friend you have concerns about the relationship without revealing what you know",
          next: "scene6_d",
          values: {},
          analysis: "You're trying to help without full honesty. Vague warnings often confuse more than they help, and may damage trust when the full truth emerges."
        },
        {
          text: "Tell your friend you've learned something difficult, ask if they want to know, and respect their choice",
          next: "scene6_e",
          values: { empathy: 1, wisdom: 2 },
          analysis: "Interesting approach—you're honoring their autonomy while signaling the seriousness. Some situations warrant this, though Altruxan practice often favors giving people truth they need, even when hard."
        }
      ]
    },

    scene6_a: {
      title: "The Unraveling",
      text: "Your friend moves across the country. Six months later, they discover the cheating. They've lost their job opportunity, their support network, and now their relationship. They ask why you didn't say something when you knew. You have no good answer.",
      image: "😞",
      reflection: "Altruxa teaches: Some truths are ours to tell because the cost of silence is someone else's suffering. Your discomfort with conflict cost your friend months of their life and opportunities they can't get back.",
      choices: [
        { text: "See your reflection", next: "ending", values: {} }
      ]
    },

    scene6_b: {
      title: "The Gift of Truth",
      text: "Your friend is devastated. They rage, cry, then thank you. It's painful, but they cancel the move, process the betrayal, and ultimately find clarity. A year later, they tell you that knowing the truth, however painful, was the kindness. They're rebuilding on solid ground.",
      image: "🌟",
      reflection: "This is Altruxan love: choosing their wellbeing over their temporary comfort, over your comfort, over ease. Truth-telling in service of another's autonomy, delivered with compassion, reduces suffering even when it hurts.",
      choices: [
        { text: "See your reflection", next: "ending", values: {} }
      ]
    },

    scene6_c: {
      title: "The Controlled Narrative",
      text: "The partner gets defensive, then tells your friend a twisted version where you're the problem. Your friend is confused and hurt by the drama. The truth eventually comes out, but your relationship is damaged by how it unfolded. Your friend needed to hear it from you, directly.",
      image: "🌀",
      reflection: "Altruxa warns: When we have difficult information, delegating its delivery rarely works. Sometimes the hard path is the only honest one. Your attempt to avoid discomfort created more chaos.",
      choices: [
        { text: "See your reflection", next: "ending", values: {} }
      ]
    },

    scene6_d: {
      title: "The Incomplete Warning",
      text: "Your friend doesn't understand your vague concerns and moves forward anyway. When the truth emerges, they feel you were cryptic when they needed clarity. Vague kindness often serves our discomfort more than it serves the person who needs to know.",
      image: "❓",
      reflection: "Altruxa asks: Who did your vagueness serve? If you're going to speak up, speak clearly. Half-truths often multiply confusion and delay necessary clarity without reducing suffering.",
      choices: [
        { text: "See your reflection", next: "ending", values: {} }
      ]
    },

    scene6_e: {
      title: "Autonomy Honored",
      text: "Your friend says yes, they want to know. You tell them. They're grateful you asked first—it let them prepare emotionally. They make a different choice about the move. The relationship ends, but on their terms. You honored both truth and their agency.",
      image: "🤝",
      reflection: "Altruxa recognizes: This path balanced truth-telling with respect for autonomy. Not every situation allows for this, but when it does, giving people choice about difficult information honors their capacity for wisdom.",
      choices: [
        { text: "See your reflection", next: "ending", values: {} }
      ]
    },

    ending: {
      title: "Your Journey on the Altruxan Path",
      text: "Every moment offers a choice: Will you look deeper? Will you choose what reduces suffering? Will you act with both empathy and wisdom?",
      image: "🌟",
      isEnding: true,
      choices: [
        { text: "Return to Menu", next: "menu", values: {} }
      ]
    }
  };

  const scene = scenarios[currentScene];

  // Handle loading state
  if (currentScene === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-4">
        <div className="text-center">
          <Sparkles className="w-16 h-16 mx-auto mb-4 text-purple-500 animate-pulse" />
          <p className="text-xl text-gray-700">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect to menu if user has completed assessment and is at intro
  if (currentScene === 'intro' && hasCompletedAssessment) {
    setCurrentScene('menu');
    return null;
  }

  const makeChoice = (choice) => {
    // Handle retaking assessment
    if (choice.isRetake) {
      clearAssessment();
    }

    // Track story choices with consequences
    if (choice.storyData) {
      setStoryChoices([...storyChoices, {
        scene: currentScene,
        text: choice.text,
        consequence: choice.consequence,
        alignment: choice.alignment,
        moral: choice.storyData.moral
      }]);
    }

    setChoices([...choices, { scene: currentScene, choice: choice.text }]);
    
    if (choice.values) {
      setScore({
        empathy: score.empathy + (choice.values.empathy || 0),
        wisdom: score.wisdom + (choice.values.wisdom || 0),
        compassion: score.compassion + (choice.values.compassion || 0),
        courage: score.courage + (choice.values.courage || 0)
      });
    }

    if (choice.analysis) {
      setShowReflection(true);
      setTimeout(() => {
        setShowReflection(false);
        navigateToScene(choice.next);
      }, 6000);
    } else {
      navigateToScene(choice.next);
    }
  };

  const resetGame = () => {
    setCurrentScene(hasCompletedAssessment ? 'menu' : 'intro');
    setScore({ empathy: 0, wisdom: 0, compassion: 0, courage: 0 });
    setChoices([]);
    setStoryChoices([]);
    setShowReflection(false);
    // Keep assessment data when resetting the journey
  };

  const getScoreColor = (value) => {
    if (value >= 4) return 'text-green-600';
    if (value >= 2) return 'text-yellow-600';
    return 'text-gray-600';
  };

  if (showReflection) {
    const currentChoice = scene.choices.find(c => choices[choices.length - 1]?.choice === c.text);
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center">
            <Sparkles className="w-16 h-16 mx-auto mb-4 text-purple-500" />
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Reflection</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              {currentChoice?.analysis}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-gray-800">The Altruxan Path</h1>
            {(currentScene !== 'intro' && currentScene !== 'menu' && currentScene !== 'assessment' && currentScene !== 'assessment_results' && currentScene !== 'view_compass' && currentScene !== 'retake_assessment' && currentScene !== 'values_intro') && (
              <button
                onClick={resetGame}
                className="flex items-center gap-2 px-4 py-2 bg-purple-100 hover:bg-purple-200 rounded-lg transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                Return to Menu
              </button>
            )}
          </div>

          {/* Score Display */}
          <div className="grid grid-cols-4 gap-4">
            <div className="flex items-center gap-2">
              <Heart className={`w-5 h-5 ${getScoreColor(score.empathy)}`} />
              <div>
                <div className="text-xs text-gray-500">Empathy</div>
                <div className={`font-bold ${getScoreColor(score.empathy)}`}>{score.empathy}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Brain className={`w-5 h-5 ${getScoreColor(score.wisdom)}`} />
              <div>
                <div className="text-xs text-gray-500">Wisdom</div>
                <div className={`font-bold ${getScoreColor(score.wisdom)}`}>{score.wisdom}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Users className={`w-5 h-5 ${getScoreColor(score.compassion)}`} />
              <div>
                <div className="text-xs text-gray-500">Compassion</div>
                <div className={`font-bold ${getScoreColor(score.compassion)}`}>{score.compassion}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className={`w-5 h-5 ${getScoreColor(score.courage)}`} />
              <div>
                <div className="text-xs text-gray-500">Courage</div>
                <div className={`font-bold ${getScoreColor(score.courage)}`}>{score.courage}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scene Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="text-6xl text-center mb-6">{scene.image}</div>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            {scene.title}
          </h2>
          
          {scene.isAssessment ? (
            <div className="space-y-6 max-w-3xl mx-auto">
              <p className="text-center text-gray-700 mb-6">{scene.text}</p>
              
              {/* Progress Indicator */}
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-700">Progress</span>
                  <span className="text-sm font-semibold text-purple-600">
                    {Object.keys(assessmentAnswers).length} / {assessmentQuestions.length}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-purple-500 to-blue-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${(Object.keys(assessmentAnswers).length / assessmentQuestions.length) * 100}%` }}
                  />
                </div>
              </div>

              {assessmentQuestions.map((q, idx) => {
                const selectedIndex = assessmentAnswers[q.id];
                const isAnswered = selectedIndex !== undefined;
                return (
                  <div key={q.id} className={`bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-xl transition-all ${
                    isAnswered ? 'ring-2 ring-green-400' : ''
                  }`}>
                    <div className="flex items-start gap-3 mb-4">
                      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                        isAnswered 
                          ? 'bg-green-500 text-white' 
                          : 'bg-white text-gray-600 border-2 border-gray-300'
                      }`}>
                        {isAnswered ? <Check className="w-5 h-5" /> : idx + 1}
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-800">
                          {q.question}
                        </div>
                        {isAnswered && (
                          <div className="mt-2 inline-flex items-center gap-2 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                            <Check className="w-4 h-4" />
                            Selected: Option {selectedIndex + 1}
                          </div>
                        )}
                      </div>
                    </div>
                  <div className="space-y-3">
                    {q.options.map((option, optIdx) => {
                      const isSelected = selectedIndex === optIdx;
                      return (
                        <button
                          key={optIdx}
                          onClick={() => handleAssessmentAnswer(q.id, optIdx)}
                          className={`w-full text-left p-4 rounded-lg transition-all relative ${
                            isSelected
                              ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white border-2 border-purple-700 shadow-xl ring-2 ring-purple-300'
                              : 'bg-white hover:bg-purple-50 border-2 border-gray-200 hover:border-purple-300 hover:shadow-md'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div className={`flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold ${
                              isSelected 
                                ? 'bg-white border-white text-purple-600' 
                                : 'border-gray-400 text-gray-500'
                            }`}>
                              {isSelected ? <Check className="w-5 h-5" /> : optIdx + 1}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-start justify-between gap-3">
                                <span className={`block ${isSelected ? 'font-bold text-lg' : ''}`}>
                                  {option.text}
                                </span>
                                {isSelected && (
                                  <span className="flex-shrink-0 bg-white text-purple-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                                    ✓ Selected
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
              })}

              <div className="text-center mt-8">
                <button
                  onClick={calculateAssessment}
                  disabled={Object.keys(assessmentAnswers).length < assessmentQuestions.length}
                  className={`px-8 py-4 rounded-xl font-bold text-lg transition-all ${
                    Object.keys(assessmentAnswers).length < assessmentQuestions.length
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600 transform hover:scale-105 shadow-lg hover:shadow-xl'
                  }`}
                >
                  {Object.keys(assessmentAnswers).length < assessmentQuestions.length
                    ? `Answer All Questions (${Object.keys(assessmentAnswers).length}/${assessmentQuestions.length})`
                    : `See My Results ✨`
                  }
                </button>
                {Object.keys(assessmentAnswers).length === assessmentQuestions.length && (
                  <p className="text-sm text-green-600 mt-3 font-semibold animate-pulse">
                    All questions answered! Ready to see your moral compass.
                  </p>
                )}
              </div>
            </div>
          ) : scene.isMenu ? (
            <div className="space-y-4 max-w-2xl mx-auto">
              <p className="text-center text-gray-700 mb-8 text-lg">{scene.text}</p>
              {scene.choices.map((choice, index) => (
                <button
                  key={index}
                  onClick={() => makeChoice(choice)}
                  className="w-full p-6 bg-gradient-to-r from-purple-50 to-blue-50 hover:from-purple-100 hover:to-blue-100 rounded-xl transition-all transform hover:scale-[1.02] border-2 border-transparent hover:border-purple-200 text-left"
                >
                  <span className="text-xl font-bold text-gray-800 block mb-2">
                    {choice.text}
                  </span>
                  <span className="text-gray-600 text-sm">
                    {choice.text === "View My Moral Compass" && assessmentScores && "See your current position on the four moral dimensions"}
                    {choice.text === "Learn Altruxan Philosophy" && "Review the Five Pillars, core values, and moral framework"}
                    {choice.text === "Retake Assessment" && "Update your moral profile with a fresh assessment"}
                    {choice.text === "Begin Maya's Story" && "Experience moral scenarios through a branching narrative"}
                  </span>
                </button>
              ))}
            </div>
          ) : scene.isRetakeConfirm ? (
            <div className="space-y-6 max-w-2xl mx-auto">
              <p className="text-center text-gray-700 mb-6 text-lg">{scene.text}</p>
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
                <p className="text-gray-700">
                  <strong>Note:</strong> Retaking the assessment will clear your previous answers. Your current compass scores will be replaced with new results.
                </p>
              </div>
            </div>
          ) : scene.isAssessmentResults ? (
            <div className="space-y-6 max-w-3xl mx-auto">
              <p className="text-center text-gray-700 mb-6">
                Here's where you currently stand on the four dimensions of moral character:
              </p>

              {/* Good vs Evil Axis */}
              <div className="bg-gradient-to-r from-red-50 to-green-50 p-6 rounded-xl">
                <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">Evil ↔ Good</h3>
                <div className="relative h-12 bg-gradient-to-r from-red-500 via-gray-300 to-green-500 rounded-full">
                  <div 
                    className="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 w-6 h-6 bg-white border-4 border-gray-800 rounded-full shadow-lg"
                    style={{ left: `${5 + ((assessmentScores?.goodEvil || 0) + 10) * 4.5}%` }}
                  />
                </div>
                <div className="flex justify-between mt-2 text-sm">
                  <span className="text-red-700 font-semibold">Evil (-10)</span>
                  <span className="text-gray-600">Neutral (0)</span>
                  <span className="text-green-700 font-semibold">Good (+10)</span>
                </div>
                <p className="text-center mt-3 font-bold text-gray-800">
                  Your score: {assessmentScores?.goodEvil || 0}
                </p>
                <p className="text-center mt-2 text-gray-600 text-sm">
                  {assessmentScores?.goodEvil >= 5 ? "You consistently choose actions that benefit others and reduce harm." :
                   assessmentScores?.goodEvil >= 0 ? "You balance personal needs with concern for others." :
                   "Consider how your choices impact others' wellbeing."}
                </p>
              </div>

              {/* Selfless vs Selfish Axis */}
              <div className="bg-gradient-to-r from-orange-50 to-blue-50 p-6 rounded-xl">
                <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">Selfish ↔ Selfless</h3>
                <div className="relative h-12 bg-gradient-to-r from-orange-500 via-gray-300 to-blue-500 rounded-full">
                  <div 
                    className="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 w-6 h-6 bg-white border-4 border-gray-800 rounded-full shadow-lg"
                    style={{ left: `${5 + ((assessmentScores?.selfishSelfless || 0) + 10) * 4.5}%` }}
                  />
                </div>
                <div className="flex justify-between mt-2 text-sm">
                  <span className="text-orange-700 font-semibold">Selfish (-10)</span>
                  <span className="text-gray-600">Balanced (0)</span>
                  <span className="text-blue-700 font-semibold">Selfless (+10)</span>
                </div>
                <p className="text-center mt-3 font-bold text-gray-800">
                  Your score: {assessmentScores?.selfishSelfless || 0}
                </p>
                <p className="text-center mt-2 text-gray-600 text-sm">
                  {assessmentScores?.selfishSelfless >= 5 ? "You prioritize others' needs and act with genuine selflessness." :
                   assessmentScores?.selfishSelfless >= 0 ? "You balance self-care with consideration for others." :
                   "Remember: when we do for the other, it is the most good."}
                </p>
              </div>

              {/* Scrupulous vs Unscrupulous Axis */}
              <div className="bg-gradient-to-r from-purple-50 to-yellow-50 p-6 rounded-xl">
                <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">Unscrupulous ↔ Scrupulous</h3>
                <div className="relative h-12 bg-gradient-to-r from-purple-500 via-gray-300 to-yellow-500 rounded-full">
                  <div 
                    className="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 w-6 h-6 bg-white border-4 border-gray-800 rounded-full shadow-lg"
                    style={{ left: `${5 + ((assessmentScores?.scrupulousUnscrupulous || 0) + 10) * 4.5}%` }}
                  />
                </div>
                <div className="flex justify-between mt-2 text-sm">
                  <span className="text-purple-700 font-semibold">Unscrupulous (-10)</span>
                  <span className="text-gray-600">Flexible (0)</span>
                  <span className="text-yellow-700 font-semibold">Scrupulous (+10)</span>
                </div>
                <p className="text-center mt-3 font-bold text-gray-800">
                  Your score: {assessmentScores?.scrupulousUnscrupulous || 0}
                </p>
                <p className="text-center mt-2 text-gray-600 text-sm">
                  {assessmentScores?.scrupulousUnscrupulous >= 5 ? "You maintain strong ethical principles even when difficult." :
                   assessmentScores?.scrupulousUnscrupulous >= 0 ? "You generally follow ethical principles with some flexibility." :
                   "Integrity means aligning actions with values, even when costly."}
                </p>
              </div>

              {/* Courage vs Prudence Axis */}
              <div className="bg-gradient-to-r from-teal-50 to-rose-50 p-6 rounded-xl">
                <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">Prudent ↔ Courageous</h3>
                <div className="relative h-12 bg-gradient-to-r from-teal-500 via-gray-300 to-rose-500 rounded-full">
                  <div 
                    className="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 w-6 h-6 bg-white border-4 border-gray-800 rounded-full shadow-lg"
                    style={{ left: `${5 + ((assessmentScores?.couragePrudence || 0) + 10) * 4.5}%` }}
                  />
                </div>
                <div className="flex justify-between mt-2 text-sm">
                  <span className="text-teal-700 font-semibold">Prudent (-10)</span>
                  <span className="text-gray-600">Balanced (0)</span>
                  <span className="text-rose-700 font-semibold">Courageous (+10)</span>
                </div>
                <p className="text-center mt-3 font-bold text-gray-800">
                  Your score: {assessmentScores?.couragePrudence || 0}
                </p>
                <p className="text-center mt-2 text-gray-600 text-sm">
                  {assessmentScores?.couragePrudence >= 5 ? "You take meaningful risks to reduce suffering and stand for what's right." :
                   assessmentScores?.couragePrudence >= 0 ? "You balance thoughtful caution with willingness to act." :
                   "Sometimes reducing suffering requires accepting personal risk."}
                </p>
              </div>

              <div className="bg-gradient-to-r from-purple-100 to-blue-100 p-6 rounded-xl mt-6">
                <h3 className="text-lg font-bold text-gray-800 mb-3 text-center">Understanding Your Profile</h3>
                <p className="text-gray-700 leading-relaxed">
                  This assessment shows your current moral tendencies, not your fixed identity. The Altruxan path is about growth—moving toward actions that benefit all and harm none, choosing the other over the self, maintaining integrity even when difficult, and finding the courage to reduce suffering even at personal cost.
                </p>
                <p className="text-gray-700 leading-relaxed mt-3">
                  {scene.isFirstTime 
                    ? "As you journey through the scenarios ahead, reflect on how your choices align with these dimensions. Each moment is an opportunity to practice moving up the moral spectrum."
                    : "You can return to view your compass at any time from the menu. Consider how your choices in the journey reflect these dimensions."}
                </p>
              </div>
            </div>
          ) : scene.isValuesPage ? (
            <div className="space-y-6 max-w-3xl mx-auto">
              {/* Five Pillars */}
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <span>🏛️</span> The Five Pillars of Altruxa
                </h3>
                <div className="space-y-3 text-gray-700">
                  <div>
                    <strong>1. Empathy:</strong> The capacity to understand and feel the experiences of others across all dimensions of consciousness.
                  </div>
                  <div>
                    <strong>2. Wisdom:</strong> Strategic understanding of how to reduce suffering effectively, considering consequences across time and systems.
                  </div>
                  <div>
                    <strong>3. Compassion:</strong> Active care for the wellbeing of all conscious beings, manifested through concrete action.
                  </div>
                  <div>
                    <strong>4. Courage:</strong> Willingness to accept risk and discomfort to reduce suffering, even when it costs us personally.
                  </div>
                  <div>
                    <strong>5. Integrity:</strong> Alignment between values and actions; living in accordance with what reduces suffering rather than what serves ego.
                  </div>
                </div>
              </div>

              {/* Core Values */}
              <div className="bg-gradient-to-r from-green-50 to-teal-50 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <span>💎</span> Core Altruxan Values
                </h3>
                <div className="space-y-2 text-gray-700">
                  <div>• <strong>Harm Reduction:</strong> The primary metric of morality is reduction of suffering</div>
                  <div>• <strong>Dimensional Awareness:</strong> See beyond surface appearances to root causes</div>
                  <div>• <strong>Temporal Responsibility:</strong> Consider consequences across past, present, and future</div>
                  <div>• <strong>Universal Consideration:</strong> All conscious beings matter in moral calculation</div>
                  <div>• <strong>Systemic Thinking:</strong> Address patterns and structures, not just individual acts</div>
                  <div>• <strong>Honest Compassion:</strong> Truth-telling in service of wellbeing, not comfort</div>
                </div>
              </div>

              {/* Definitions of Good, Neutral, Evil */}
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <span>⚖️</span> Objective Moral Spectrum
                </h3>
                
                {/* Intent Section */}
                <div className="mb-4 p-4 bg-white rounded-lg border-l-4 border-yellow-500">
                  <div className="font-bold text-gray-800 mb-2">The Role of Intent:</div>
                  <div className="text-gray-700 space-y-2">
                    <div>Intent is a defining variable in moral action. <strong>When we do for the other, it is the most good.</strong> When we do for ourselves, it is the least good.</div>
                    <div className="italic">Optimal Altruxa: We do for the other, and through the help they receive, they lift both those who helped and those who need help—creating an upward spiral of mutual aid.</div>
                  </div>
                </div>

                {/* Moral Spectrum */}
                <div className="space-y-3 text-gray-700">
                  <div>
                    <div className="font-bold text-green-700 flex items-center gap-2">
                      <span className="text-2xl">✨</span> Good
                    </div>
                    <div className="ml-4 mt-1 bg-green-50 p-3 rounded">
                      <strong>Benefit all, harm none.</strong> Actions that create universal wellbeing without causing suffering to any conscious being. The highest moral achievement.
                    </div>
                  </div>
                  
                  <div>
                    <div className="font-bold text-green-600 flex items-center gap-2">
                      <span className="text-2xl">🌟</span> Neutral Good
                    </div>
                    <div className="ml-4 mt-1 bg-green-50 p-3 rounded">
                      <strong>Benefit most, harm none.</strong> Actions that create widespread wellbeing without causing harm, though not everyone may benefit.
                    </div>
                  </div>
                  
                  <div>
                    <div className="font-bold text-gray-600 flex items-center gap-2">
                      <span className="text-2xl">⚖️</span> Neutral
                    </div>
                    <div className="ml-4 mt-1 bg-gray-50 p-3 rounded">
                      <strong>Benefit some and harm some.</strong> Actions with mixed outcomes where benefits and harms are balanced. The midpoint where good and evil are in equilibrium.
                    </div>
                  </div>
                  
                  <div>
                    <div className="font-bold text-orange-600 flex items-center gap-2">
                      <span className="text-2xl">⚠️</span> Neutral Evil
                    </div>
                    <div className="ml-4 mt-1 bg-orange-50 p-3 rounded">
                      <strong>Benefit some or one and harm some.</strong> Actions where the harm begins to outweigh benefits, or where narrow benefits come at the cost of others' suffering.
                    </div>
                  </div>
                  
                  <div>
                    <div className="font-bold text-red-700 flex items-center gap-2">
                      <span className="text-2xl">💀</span> Evil (Malidox)
                    </div>
                    <div className="ml-4 mt-1 bg-red-50 p-3 rounded">
                      <strong>Benefit few or one and harm all others.</strong> Actions that serve narrow self-interest while causing widespread suffering. The concentration of benefit paired with distributed harm is the essence of Malidox.
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-4 bg-white rounded-lg border-l-4 border-purple-500">
                  <div className="font-semibold text-gray-800">Critical Understanding:</div>
                  <div className="mt-2 text-gray-700">Any action that does not benefit all and harm none is <strong>at best neutral</strong>. The Altruxan path constantly seeks to move actions up this spectrum—from evil toward neutral, from neutral toward good—by expanding the circle of who benefits and reducing the harm caused.</div>
                </div>
              </div>

              {/* Temporal Scales of Harm Mitigation */}
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <span>⏳</span> Harm Mitigation Across Temporal Scales
                </h3>
                <div className="space-y-3 text-gray-700">
                  <div>
                    <div className="font-semibold text-purple-700">Immediate (Present Moment):</div>
                    <div className="ml-4 mt-1">Address urgent suffering that requires immediate intervention. Sometimes immediate action prevents cascading harm.</div>
                  </div>
                  <div>
                    <div className="font-semibold text-purple-700">Short-term (Days to Months):</div>
                    <div className="ml-4 mt-1">Consider how choices create patterns and habits that compound over weeks and months. Quick fixes may enable long-term harm.</div>
                  </div>
                  <div>
                    <div className="font-semibold text-purple-700">Medium-term (Months to Years):</div>
                    <div className="ml-4 mt-1">Evaluate systemic impacts and relationship dynamics. Changes to structures and systems prevent recurring suffering.</div>
                  </div>
                  <div>
                    <div className="font-semibold text-purple-700">Long-term (Years to Generations):</div>
                    <div className="ml-4 mt-1">Consider ripple effects across communities and time. Cultural and institutional changes affect countless future beings.</div>
                  </div>
                  <div className="mt-4 p-4 bg-white rounded-lg border-l-4 border-purple-500">
                    <div className="font-semibold">The Altruxan Challenge:</div>
                    <div className="mt-2">True wisdom requires holding all temporal scales simultaneously—acting with urgency when needed while considering long-term consequences. Sometimes the most compassionate immediate action differs from long-term harm reduction. Our task is to find paths that reduce suffering across all scales.</div>
                  </div>
                </div>
              </div>

              {/* Core Teaching */}
              <div className="bg-gradient-to-r from-rose-50 to-pink-50 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <span>🌟</span> Remember
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Altruxa is not about perfection—it's about practice. Every moment offers an opportunity to reduce suffering. Some situations have no perfect answer, only better and worse choices. The path forward emerges through empathy (understanding), wisdom (strategy), compassion (care), courage (action), and integrity (alignment).
                </p>
              </div>
            </div>
          ) : scene.isStoryChoice ? (
            <div className="space-y-6 max-w-3xl mx-auto">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                {scene.text}
              </p>
              
              <div className="space-y-4">
                {scene.choices.map((choice, index) => (
                  <button
                    key={index}
                    onClick={() => makeChoice(choice)}
                    className="w-full text-left p-5 bg-gradient-to-r from-purple-50 to-blue-50 hover:from-purple-100 hover:to-blue-100 rounded-xl transition-all transform hover:scale-[1.01] border-2 border-transparent hover:border-purple-300 shadow-sm hover:shadow-md"
                  >
                    <div className="font-semibold text-gray-800 mb-2">
                      {choice.text}
                    </div>
                    <div className="text-sm text-gray-600 italic">
                      → {choice.consequence}
                    </div>
                    <div className="text-xs mt-2 font-medium text-purple-700">
                      Alignment: {choice.alignment}
                    </div>
                  </button>
                ))}
              </div>
              
              {storyChoices.length > 0 && (
                <div className="mt-8 p-4 bg-white rounded-xl border-2 border-gray-200">
                  <div className="text-sm font-semibold text-gray-700 mb-2">
                    Your choices so far: {storyChoices.length}
                  </div>
                  <div className="text-xs text-gray-500">
                    Each decision shapes Maya's path and the consequences that follow.
                  </div>
                </div>
              )}
            </div>
          ) : scene.isStoryEnding ? (
            <div className="space-y-6 max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-gray-800 mb-4">Maya's Journey: A Reflection</h3>
                <p className="text-lg text-gray-600">
                  Here are the choices you made and their consequences. Each decision revealed your values in action.
                </p>
              </div>

              {/* Story Choices Summary */}
              <div className="space-y-4">
                {storyChoices.map((choice, index) => {
                  const moralValue = choice.moral;
                  let bgClass, borderClass, textClass, badgeClass;
                  
                  if (moralValue >= 2) {
                    bgClass = 'bg-gradient-to-r from-green-50 to-green-100';
                    borderClass = 'border-green-500';
                    textClass = 'text-green-700';
                    badgeClass = 'bg-green-200 text-green-800';
                  } else if (moralValue >= 1) {
                    bgClass = 'bg-gradient-to-r from-blue-50 to-blue-100';
                    borderClass = 'border-blue-500';
                    textClass = 'text-blue-700';
                    badgeClass = 'bg-blue-200 text-blue-800';
                  } else if (moralValue === 0) {
                    bgClass = 'bg-gradient-to-r from-gray-50 to-gray-100';
                    borderClass = 'border-gray-500';
                    textClass = 'text-gray-700';
                    badgeClass = 'bg-gray-200 text-gray-800';
                  } else if (moralValue >= -1) {
                    bgClass = 'bg-gradient-to-r from-orange-50 to-orange-100';
                    borderClass = 'border-orange-500';
                    textClass = 'text-orange-700';
                    badgeClass = 'bg-orange-200 text-orange-800';
                  } else {
                    bgClass = 'bg-gradient-to-r from-red-50 to-red-100';
                    borderClass = 'border-red-500';
                    textClass = 'text-red-700';
                    badgeClass = 'bg-red-200 text-red-800';
                  }
                  
                  return (
                    <div key={index} className={`${bgClass} p-5 rounded-xl border-l-4 ${borderClass}`}>
                      <div className="flex items-start gap-4">
                        <div className={`flex-shrink-0 w-10 h-10 rounded-full ${borderClass.replace('border', 'bg')} text-white flex items-center justify-center font-bold`}>
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <div className="font-bold text-gray-800 mb-2">
                            {choice.text}
                          </div>
                          <div className="text-sm text-gray-700 mb-2">
                            <strong>Consequence:</strong> {choice.consequence}
                          </div>
                          <div className="flex items-center gap-4 text-xs">
                            <span className={`font-semibold ${textClass}`}>
                              {choice.alignment}
                            </span>
                            <span className={`px-3 py-1 rounded-full ${badgeClass} font-medium`}>
                              Moral Score: {moralValue > 0 ? '+' : ''}{moralValue}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Overall Analysis */}
              <div className="bg-gradient-to-r from-purple-100 to-blue-100 p-6 rounded-xl mt-8">
                <h4 className="text-xl font-bold text-gray-800 mb-4">Overall Moral Trajectory</h4>
                <div className="space-y-3">
                  <div>
                    <strong>Total Moral Score:</strong>{' '}
                    <span className={`text-2xl font-bold ${
                      storyChoices.reduce((sum, c) => sum + c.moral, 0) >= 4 ? 'text-green-600' :
                      storyChoices.reduce((sum, c) => sum + c.moral, 0) >= 0 ? 'text-blue-600' :
                      'text-red-600'
                    }`}>
                      {storyChoices.reduce((sum, c) => sum + c.moral, 0) > 0 ? '+' : ''}
                      {storyChoices.reduce((sum, c) => sum + c.moral, 0)}
                    </span>
                  </div>
                  <div className="text-gray-700 leading-relaxed">
                    {storyChoices.reduce((sum, c) => sum + c.moral, 0) >= 4 
                      ? "You demonstrated exceptional Altruxan practice. You consistently chose to reduce suffering even at personal cost, showing that true good requires both courage and wisdom."
                      : storyChoices.reduce((sum, c) => sum + c.moral, 0) >= 2
                      ? "You made several strong Altruxan choices. You showed willingness to act on your values, though there were moments where fear or expedience influenced your decisions."
                      : storyChoices.reduce((sum, c) => sum + c.moral, 0) >= 0
                      ? "Your path was mixed. You faced difficult choices and sometimes chose self-protection over harm reduction. Altruxa recognizes that courage is difficult to sustain."
                      : storyChoices.reduce((sum, c) => sum + c.moral, 0) >= -2
                      ? "Many of your choices prioritized self-interest over others' wellbeing. Consider: what would it take to choose differently? What fears held you back?"
                      : "Your path aligned more with Malidox than Altruxa. You chose complicity and self-preservation over justice. Reflection: Is this who you want to be?"}
                  </div>
                </div>
              </div>

              {/* Key Lessons */}
              <div className="bg-white p-6 rounded-xl border-2 border-gray-200">
                <h4 className="text-xl font-bold text-gray-800 mb-4">Key Altruxan Lessons</h4>
                <div className="space-y-3 text-gray-700">
                  <div>• <strong>Benefit All, Harm None:</strong> The highest good requires creative solutions that don't sacrifice anyone.</div>
                  <div>• <strong>Temporal Responsibility:</strong> Delay in action is itself a choice with consequences.</div>
                  <div>• <strong>Systemic Thinking:</strong> Individual integrity must confront systemic harm.</div>
                  <div>• <strong>Courage Over Comfort:</strong> The Altruxan path often requires personal risk.</div>
                  <div>• <strong>Intent Matters:</strong> Doing for others elevates the moral weight of our actions.</div>
                </div>
              </div>
            </div>
          ) : (
            <>
              <p className="text-lg text-gray-700 leading-relaxed mb-6 text-center max-w-2xl mx-auto">
                {scene.text}
              </p>

              {scene.reflection && (
                <div className="bg-purple-50 border-l-4 border-purple-500 p-4 mb-6 rounded">
                  <p className="text-gray-700 italic">{scene.reflection}</p>
                </div>
              )}
            </>
          )}

          {/* Choices */}
          <div className="space-y-3">
            {scene.choices.map((choice, index) => (
              <button
                key={index}
                onClick={() => makeChoice(choice)}
                className="w-full text-left p-4 bg-gradient-to-r from-purple-50 to-blue-50 hover:from-purple-100 hover:to-blue-100 rounded-xl transition-all transform hover:scale-[1.02] border-2 border-transparent hover:border-purple-200"
              >
                <span className="text-gray-800 font-medium">{choice.text}</span>
              </button>
            ))}
          </div>

          {/* Ending Summary */}
          {scene.isEnding && (
            <div className="mt-8 p-6 bg-gradient-to-r from-purple-100 to-blue-100 rounded-xl">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Your Altruxan Development</h3>
              <div className="space-y-3 text-gray-700">
                <p>
                  <strong>Empathy ({score.empathy}):</strong> {score.empathy >= 3 ? "You consistently sought to understand deeper dimensions of each situation." : "Growing your ability to see beyond surface appearances will strengthen your practice."}
                </p>
                <p>
                  <strong>Wisdom ({score.wisdom}):</strong> {score.wisdom >= 3 ? "You demonstrated strategic thinking about how to reduce suffering effectively." : "Consider not just what feels right, but what actually reduces harm."}
                </p>
                <p>
                  <strong>Compassion ({score.compassion}):</strong> {score.compassion >= 2 ? "Your care for others' wellbeing guided your choices." : "Remember: Altruxa asks us to care deeply about reducing suffering."}
                </p>
                <p>
                  <strong>Courage ({score.courage}):</strong> {score.courage >= 2 ? "You showed willingness to take meaningful risks to reduce suffering." : "Sometimes Altruxan practice requires standing in difficult spaces between what's easy and what's right."}
                </p>
              </div>
              <div className="mt-6 p-4 bg-white rounded-lg">
                <p className="text-gray-800 font-medium">Core Teaching:</p>
                <p className="text-gray-700 mt-2">
                  Objective Morality isn't about following rules—it's about developing the capacity to see situations dimensionally, understand root causes of suffering, and act with both empathy and wisdom to reduce harm. Each moment is practice.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer Info */}
        <div className="mt-6 text-center text-gray-600 text-sm">
          <p>Based on Cosmological Recursion Theory and Altruxan Philosophy</p>
          <p className="mt-2">Each choice matters. Each moment is an opportunity to reduce suffering.</p>
        </div>
      </div>
    </div>
  );
};

export default AltruxaPathGame;
