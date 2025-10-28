export const assessmentQuestions = [
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

// Factory function that creates assessment handlers with access to state setters
export const createAssessmentHandlers = (
  assessmentAnswers,
  setAssessmentAnswers,
  setScore,
  setAssessmentScores,
  saveAssessmentToStorage,
  setCurrentScene
) => {
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

    // Convert assessment scores to initial character stats (0-10 scale)
    const initialStats = {
      empathy: Math.max(0, Math.round((normalized.goodEvil + normalized.selfishSelfless) / 2) + 5),
      wisdom: Math.max(0, Math.round((normalized.scrupulousUnscrupulous + normalized.goodEvil) / 2) + 5),
      compassion: Math.max(0, Math.round((normalized.selfishSelfless + normalized.goodEvil) / 2) + 5),
      courage: Math.max(0, Math.round((normalized.couragePrudence + normalized.scrupulousUnscrupulous) / 2) + 5)
    };

    setScore(initialStats);
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

  return {
    calculateAssessment,
    handleAssessmentAnswer
  };
};
