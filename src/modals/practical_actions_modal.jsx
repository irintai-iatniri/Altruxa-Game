// components/PracticalActionsModal.jsx
import React, { useState } from 'react';
import { X, Check, ChevronRight, Download, BookOpen } from 'lucide-react';

const PracticalActionsModal = ({ 
  actionSet, 
  onClose, 
  darkMode,
  onSaveActions 
}) => {
  const [expandedSections, setExpandedSections] = useState(new Set(['dailyPractices']));
  const [savedActions, setSavedActions] = useState(new Set());

  const toggleSection = (section) => {
    setExpandedSections(prev => {
      const next = new Set(prev);
      if (next.has(section)) {
        next.delete(section);
      } else {
        next.add(section);
      }
      return next;
    });
  };

  const toggleSaved = (actionId) => {
    setSavedActions(prev => {
      const next = new Set(prev);
      if (next.has(actionId)) {
        next.delete(actionId);
      } else {
        next.add(actionId);
      }
      return next;
    });
  };

  const exportActions = () => {
    const selectedActions = Array.from(savedActions).map(id => {
      // Find the action in the actionSet
      return { id, checked: true };
    });

    const content = `My Altruxan Practice Plan
Generated: ${new Date().toLocaleDateString()}

${actionSet.title}
${actionSet.subtitle}

=== MY SELECTED PRACTICES ===

${Array.from(savedActions).map(id => `☐ ${id}`).join('\n')}

=== NOTES & REFLECTIONS ===

[Space for your reflections]

---
Based on Cosmological Recursion Theory and Altruxan Philosophy
Each choice matters. Each moment is an opportunity to reduce suffering.
`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `altruxa-practice-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto`}>
        {/* Header */}
        <div className={`sticky top-0 ${darkMode ? 'bg-gray-800' : 'bg-white'} border-b-2 ${darkMode ? 'border-gray-700' : 'border-gray-200'} p-6 flex items-center justify-between z-10`}>
          <div>
            <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'} mb-1`}>
              {actionSet.title}
            </h2>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {actionSet.subtitle}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={exportActions}
              disabled={savedActions.size === 0}
              className={`p-2 rounded-lg transition-colors ${
                savedActions.size === 0
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-green-600 hover:bg-green-700 text-white'
              }`}
              title="Export selected actions"
            >
              <Download className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className={`p-2 rounded-lg transition-colors ${
                darkMode
                  ? 'bg-gray-700 hover:bg-gray-600 text-gray-200'
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Introduction */}
          {actionSet.introduction && (
            <div className={`p-5 rounded-xl ${darkMode ? 'bg-gradient-to-r from-purple-900/30 to-blue-900/30 border-2 border-purple-700' : 'bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-200'}`}>
              <p className={`${darkMode ? 'text-gray-200' : 'text-gray-700'} leading-relaxed`}>
                {actionSet.introduction.text || actionSet.introduction}
              </p>
              {actionSet.introduction.coreQuestion && (
                <div className={`mt-4 p-3 rounded ${darkMode ? 'bg-black/30' : 'bg-white/50'} border-l-4 border-purple-500`}>
                  <p className={`font-semibold ${darkMode ? 'text-purple-300' : 'text-purple-900'}`}>
                    {actionSet.introduction.coreQuestion}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Daily Practices */}
          {actionSet.dailyPractices && (
            <Section
              title="🌅 Daily Practices"
              isExpanded={expandedSections.has('dailyPractices')}
              onToggle={() => toggleSection('dailyPractices')}
              darkMode={darkMode}
            >
              {actionSet.dailyPractices.map((practice, idx) => (
                <PracticeCard
                  key={idx}
                  practice={practice}
                  isEnabled={savedActions.has(`daily-${idx}`)}
                  onToggle={() => toggleSaved(`daily-${idx}`)}
                  darkMode={darkMode}
                />
              ))}
            </Section>
          )}

          {/* Weekly Commitments */}
          {actionSet.weeklyCommitments && (
            <Section
              title="📅 Weekly Commitments"
              isExpanded={expandedSections.has('weekly')}
              onToggle={() => toggleSection('weekly')}
              darkMode={darkMode}
            >
              {actionSet.weeklyCommitments.map((commitment, idx) => (
                <CommitmentCard
                  key={idx}
                  commitment={commitment}
                  isEnabled={savedActions.has(`weekly-${idx}`)}
                  onToggle={() => toggleSaved(`weekly-${idx}`)}
                  darkMode={darkMode}
                />
              ))}
            </Section>
          )}

          {/* Immediate Actions */}
          {actionSet.immediateActions && (
            <Section
              title="🚨 Immediate Actions"
              isExpanded={expandedSections.has('immediate')}
              onToggle={() => toggleSection('immediate')}
              darkMode={darkMode}
            >
              {actionSet.immediateActions.map((action, idx) => (
                <ImmediateActionCard
                  key={idx}
                  action={action}
                  darkMode={darkMode}
                />
              ))}
            </Section>
          )}

          {/* Immediate Resources (for crisis support) */}
          {actionSet.immediateResources && (
            <Section
              title="🆘 Immediate Resources"
              isExpanded={expandedSections.has('immediateResources')}
              onToggle={() => toggleSection('immediateResources')}
              darkMode={darkMode}
            >
              {actionSet.immediateResources.map((action, idx) => (
                <ImmediateActionCard
                  key={idx}
                  action={action}
                  darkMode={darkMode}
                />
              ))}
            </Section>
          )}

          {/* Coping Skills (for crisis support) */}
          {actionSet.copingSkills && (
            <Section
              title="🧘 Coping Skills"
              isExpanded={expandedSections.has('copingSkills')}
              onToggle={() => toggleSection('copingSkills')}
              darkMode={darkMode}
            >
              <div className={`p-4 rounded-lg ${darkMode ? 'bg-purple-900/20' : 'bg-purple-50'} mb-4`}>
                {actionSet.copingSkills.introduction && (
                  <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                    {actionSet.copingSkills.introduction}
                  </p>
                )}
                {actionSet.copingSkills.whenToUse && (
                  <p className={`text-sm ${darkMode ? 'text-purple-300' : 'text-purple-900'} font-semibold`}>
                    {actionSet.copingSkills.whenToUse}
                  </p>
                )}
              </div>

              {/* Render each skill category */}
              {Object.entries(actionSet.copingSkills)
                .filter(([key]) => Array.isArray(actionSet.copingSkills[key]))
                .map(([category, skills], catIdx) => (
                  <div key={catIdx} className="mb-6">
                    <h4 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-800'} mb-3 capitalize`}>
                      {category.replace(/([A-Z])/g, ' $1').trim()}
                    </h4>
                    <div className="space-y-3">
                      {skills.map((skill, skillIdx) => (
                        <div key={skillIdx} className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-white border border-gray-200'}`}>
                          <p className={`font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-800'} mb-2`}>
                            {skill.skill}
                          </p>
                          {skill.how && (
                            <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                              <span className="font-medium">How:</span> {Array.isArray(skill.how) ? skill.how.join(', ') : skill.how}
                            </p>
                          )}
                          {skill.why && (
                            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>
                              <span className="font-medium">Why:</span> {skill.why}
                            </p>
                          )}
                          {skill.when && (
                            <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'} italic`}>
                              When to use: {skill.when}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
            </Section>
          )}

          {/* Resource List (for crisis support) */}
          {actionSet.resourceList && (
            <Section
              title="📋 Complete Resource List"
              isExpanded={expandedSections.has('resourceList')}
              onToggle={() => toggleSection('resourceList')}
              darkMode={darkMode}
            >
              <div className="space-y-5">
                {actionSet.resourceList.map((category, idx) => (
                  <div key={idx} className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <h4 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-800'} mb-3`}>
                      {category.category}
                    </h4>
                    <ul className="space-y-2">
                      {category.resources.map((resource, resIdx) => (
                        <li key={resIdx} className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          • {resource}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Section>
          )}

          {/* Communication Templates */}
          {actionSet.communicationTemplates && (
            <Section
              title="💬 Communication Templates"
              isExpanded={expandedSections.has('templates')}
              onToggle={() => toggleSection('templates')}
              darkMode={darkMode}
            >
              {actionSet.communicationTemplates.map((template, idx) => (
                <TemplateCard
                  key={idx}
                  template={template}
                  darkMode={darkMode}
                />
              ))}
            </Section>
          )}

          {/* Reflection Prompts */}
          {actionSet.reflectionPrompts && (
            <Section
              title="🤔 Reflection Prompts"
              isExpanded={expandedSections.has('reflection')}
              onToggle={() => toggleSection('reflection')}
              darkMode={darkMode}
            >
              <div className="space-y-3">
                {actionSet.reflectionPrompts.map((prompt, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-lg ${
                      darkMode ? 'bg-gray-700' : 'bg-gray-50'
                    }`}
                  >
                    <p className={`${darkMode ? 'text-gray-200' : 'text-gray-700'} italic`}>
                      "{prompt}"
                    </p>
                  </div>
                ))}
              </div>
            </Section>
          )}

          {/* Resources */}
          {actionSet.resources && (
            <Section
              title="📚 Resources"
              isExpanded={expandedSections.has('resources')}
              onToggle={() => toggleSection('resources')}
              darkMode={darkMode}
            >
              <ResourcesList resources={actionSet.resources} darkMode={darkMode} />
            </Section>
          )}

          {/* Self-Care Reminders */}
          {actionSet.selfCareReminders && (
            <Section
              title="💚 Self-Care Reminders"
              isExpanded={expandedSections.has('selfCare')}
              onToggle={() => toggleSection('selfCare')}
              darkMode={darkMode}
            >
              <div className="space-y-4">
                {actionSet.selfCareReminders.map((reminder, idx) => (
                  <div key={idx} className={`p-4 rounded-lg ${darkMode ? 'bg-green-900/20 border-l-4 border-green-500' : 'bg-green-50 border-l-4 border-green-500'}`}>
                    <h4 className={`font-semibold ${darkMode ? 'text-green-300' : 'text-green-900'} mb-2`}>
                      {reminder.reminder}
                    </h4>
                    <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                      {reminder.truth}
                    </p>
                    {reminder.practice && (
                      <ul className="space-y-1 mt-2">
                        {reminder.practice.map((item, i) => (
                          <li key={i} className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            • {item}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </Section>
          )}

          {/* Strategic Guidance */}
          {actionSet.strategicGuidance && (
            <Section
              title="🎯 Strategic Guidance"
              isExpanded={expandedSections.has('strategic')}
              onToggle={() => toggleSection('strategic')}
              darkMode={darkMode}
            >
              <div className="space-y-5">
                {actionSet.strategicGuidance.map((guide, idx) => (
                  <div key={idx} className={`p-5 rounded-lg ${darkMode ? 'bg-blue-900/20 border-2 border-blue-700' : 'bg-blue-50 border-2 border-blue-200'}`}>
                    <h4 className={`font-bold text-lg ${darkMode ? 'text-blue-300' : 'text-blue-900'} mb-2`}>
                      {guide.principle}
                    </h4>
                    <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-4 italic`}>
                      {guide.why}
                    </p>
                    
                    {/* Render all possible nested content */}
                    {guide.what_to_document && (
                      <div className={`mt-3 p-3 rounded ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                        <p className={`text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                          What to Document:
                        </p>
                        <ul className="space-y-1">
                          {guide.what_to_document.map((item, i) => (
                            <li key={i} className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                              • {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {guide.how_to_organize && (
                      <div className={`mt-3 space-y-2`}>
                        <p className={`text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          How to Organize:
                        </p>
                        {guide.how_to_organize.map((step, i) => (
                          <div key={i} className={`p-3 rounded ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                            <p className={`text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                              {step.step}
                            </p>
                            {step.who && (
                              <ul className="mt-2 space-y-1">
                                {step.who.map((w, j) => (
                                  <li key={j} className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                    • {w}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {guide.leverage_points && (
                      <div className={`mt-3 space-y-2`}>
                        <p className={`text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          Leverage Points:
                        </p>
                        {guide.leverage_points.map((point, i) => (
                          <div key={i} className={`p-3 rounded ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                            <p className={`text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                              {point.point}
                            </p>
                            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mt-1`}>
                              {point.how}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {guide.self_protection && (
                      <div className={`mt-3 space-y-2`}>
                        {guide.self_protection.map((area, i) => (
                          <div key={i} className={`p-3 rounded ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                            <p className={`text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                              {area.area}
                            </p>
                            <ul className="mt-2 space-y-1">
                              {area.actions.map((action, j) => (
                                <li key={j} className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                  • {action}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {guide.examples && Array.isArray(guide.examples) && (
                      <div className={`mt-3 p-3 rounded ${darkMode ? 'bg-purple-900/30' : 'bg-purple-50'}`}>
                        <p className={`text-sm font-semibold ${darkMode ? 'text-purple-300' : 'text-purple-900'} mb-2`}>
                          Examples:
                        </p>
                        {guide.examples.map((ex, i) => (
                          <p key={i} className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                            • {typeof ex === 'string' ? ex : ex.scenario}
                          </p>
                        ))}
                      </div>
                    )}
                    
                    {guide.warning && (
                      <div className={`mt-3 p-3 rounded ${darkMode ? 'bg-yellow-900/30' : 'bg-yellow-50'} border-l-4 border-yellow-500`}>
                        <p className={`text-sm ${darkMode ? 'text-yellow-300' : 'text-yellow-900'}`}>
                          ⚠️ {guide.warning}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Section>
          )}

          {/* Monthly Deep Dive */}
          {actionSet.monthlyDeepDive && (
            <Section
              title="🔍 Monthly Deep Dive"
              isExpanded={expandedSections.has('monthly')}
              onToggle={() => toggleSection('monthly')}
              darkMode={darkMode}
            >
              <div className={`p-5 rounded-lg ${darkMode ? 'bg-indigo-900/20 border-2 border-indigo-700' : 'bg-indigo-50 border-2 border-indigo-200'}`}>
                <h4 className={`font-bold ${darkMode ? 'text-indigo-300' : 'text-indigo-900'} mb-2`}>
                  {actionSet.monthlyDeepDive.title}
                </h4>
                <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-4`}>
                  {actionSet.monthlyDeepDive.instructions}
                </p>
                {actionSet.monthlyDeepDive.questions && (
                  <div className="space-y-3">
                    {actionSet.monthlyDeepDive.questions.map((q, idx) => (
                      <div key={idx} className={`p-3 rounded ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                        <p className={`font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-800'} mb-1`}>
                          {q.question}
                        </p>
                        {q.lookFor && (
                          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            {q.lookFor}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Section>
          )}

          {/* Troubleshooting */}
          {actionSet.troubleshooting && (
            <Section
              title="🔧 Troubleshooting"
              isExpanded={expandedSections.has('troubleshooting')}
              onToggle={() => toggleSection('troubleshooting')}
              darkMode={darkMode}
            >
              <div className="space-y-4">
                {Object.entries(actionSet.troubleshooting).map(([issue, solution], idx) => (
                  <div key={idx} className={`p-4 rounded-lg ${darkMode ? 'bg-orange-900/20 border-l-4 border-orange-500' : 'bg-orange-50 border-l-4 border-orange-500'}`}>
                    <h4 className={`font-semibold ${darkMode ? 'text-orange-300' : 'text-orange-900'} mb-2`}>
                      "{issue}"
                    </h4>
                    <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {solution.response || solution}
                    </p>
                    {solution.check && (
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mt-2 italic`}>
                        {solution.check}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </Section>
          )}

          {/* Closing Thoughts */}
          {actionSet.closingThoughts && (
            <div className={`p-6 rounded-xl ${darkMode ? 'bg-gradient-to-r from-purple-900/30 to-pink-900/30 border-2 border-purple-700' : 'bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200'}`}>
              <h3 className={`text-xl font-bold ${darkMode ? 'text-purple-300' : 'text-purple-900'} mb-3`}>
                {actionSet.closingThoughts.title}
              </h3>
              <div className={`${darkMode ? 'text-gray-200' : 'text-gray-700'} whitespace-pre-line leading-relaxed`}>
                {actionSet.closingThoughts.text}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className={`border-t-2 ${darkMode ? 'border-gray-700' : 'border-gray-200'} p-6`}>
          <div className={`text-center ${darkMode ? 'text-gray-400' : 'text-gray-600'} text-sm space-y-1`}>
            <p>💡 Tip: Check the practices you want to commit to, then export them as a text file</p>
            <p className="text-xs">Based on Cosmological Recursion Theory and Altruxan Philosophy</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Sub-components
const Section = ({ title, children, isExpanded, onToggle, darkMode }) => (
  <div className={`rounded-xl border-2 ${darkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'} overflow-hidden`}>
    <button
      onClick={onToggle}
      className={`w-full p-4 flex items-center justify-between transition-colors ${
        darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
      }`}
    >
      <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
        {title}
      </h3>
      <ChevronRight
        className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-90' : ''} ${
          darkMode ? 'text-gray-400' : 'text-gray-600'
        }`}
      />
    </button>
    {isExpanded && (
      <div className="p-4 space-y-4">
        {children}
      </div>
    )}
  </div>
);

const PracticeCard = ({ practice, isEnabled, onToggle, darkMode }) => (
  <div className={`p-5 rounded-lg border-2 ${
    isEnabled
      ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
      : darkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-300 bg-white'
  }`}>
    <div className="flex items-start gap-3">
      <button
        onClick={onToggle}
        className={`flex-shrink-0 w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${
          isEnabled
            ? 'bg-purple-600 border-purple-600'
            : darkMode ? 'border-gray-500 hover:border-purple-500' : 'border-gray-400 hover:border-purple-500'
        }`}
      >
        {isEnabled && <Check className="w-4 h-4 text-white" />}
      </button>
      <div className="flex-1">
        <div className="flex items-start justify-between gap-4 mb-2">
          <h4 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            {practice.name}
          </h4>
          <div className="flex gap-2 flex-shrink-0">
            <span className={`text-xs px-2 py-1 rounded-full ${
              darkMode ? 'bg-gray-600 text-gray-300' : 'bg-gray-200 text-gray-700'
            }`}>
              {practice.timeCommitment}
            </span>
            <span className={`text-xs px-2 py-1 rounded-full ${
              practice.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
              practice.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {practice.difficulty}
            </span>
          </div>
        </div>
        <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-3`}>
          {practice.description}
        </p>
        <ol className="space-y-2">
          {practice.steps && practice.steps.map((step, idx) => (
            <li key={idx} className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} pl-4`}>
              {idx + 1}. {typeof step === 'string' ? step : step.step || step.detail || JSON.stringify(step)}
            </li>
          ))}
        </ol>
        {practice.example && (
          <div className={`mt-3 p-3 rounded ${darkMode ? 'bg-gray-800' : 'bg-gray-50'} border-l-4 border-purple-500`}>
            <p className={`text-xs font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>
              Example:
            </p>
            <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {practice.example}
            </p>
          </div>
        )}
      </div>
    </div>
  </div>
);

const CommitmentCard = ({ commitment, isEnabled, onToggle, darkMode }) => (
  <div className={`p-4 rounded-lg border-2 ${
    isEnabled
      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
      : darkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-300 bg-white'
  }`}>
    <div className="flex items-start gap-3">
      <button
        onClick={onToggle}
        className={`flex-shrink-0 w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${
          isEnabled
            ? 'bg-blue-600 border-blue-600'
            : darkMode ? 'border-gray-500 hover:border-blue-500' : 'border-gray-400 hover:border-blue-500'
        }`}
      >
        {isEnabled && <Check className="w-4 h-4 text-white" />}
      </button>
      <div className="flex-1">
        <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'} mb-1`}>
          {commitment.action}
        </h4>
        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          {commitment.detail}
        </p>
      </div>
    </div>
  </div>
);

const ImmediateActionCard = ({ action, darkMode }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Handle both workplace_ethics structure (situation/firstSteps) and personal_crisis structure (crisis/resources)
  const title = action.situation || action.crisis;
  const urgency = action.urgency;

  // Check if this is a complex personal_crisis item (has deeply nested resources/guidance)
  const isComplexCrisis = action.resources && Array.isArray(action.resources) &&
                          (action.immediateGuidance || action.safetyPlanning);

  return (
    <div className={`p-5 rounded-lg ${darkMode ? 'bg-red-900/20 border-2 border-red-800' : 'bg-red-50 border-2 border-red-200'}`}>
      <div className="mb-2">
        <div className="flex items-start justify-between gap-3">
          <h4 className={`font-bold ${darkMode ? 'text-red-300' : 'text-red-900'} flex-1`}>
            {title}
          </h4>
          {isComplexCrisis && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className={`text-xs px-3 py-1 rounded ${
                darkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
              }`}
            >
              {isExpanded ? 'Show Less' : 'Show More'}
            </button>
          )}
        </div>
        {urgency && (
          <span className={`inline-block mt-2 text-xs px-2 py-1 rounded ${darkMode ? 'bg-red-800 text-red-200' : 'bg-red-100 text-red-800'}`}>
            {urgency}
          </span>
        )}
      </div>

      {/* Handle complex personal_crisis structure with resources array */}
      {isComplexCrisis && action.resources && (
        <div className={`mt-4 space-y-3 ${!isExpanded ? 'max-h-48 overflow-hidden' : ''}`}>
          {action.resources.map((resource, idx) => (
            <div key={idx} className={`p-3 rounded ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <p className={`font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                {resource.name}
              </p>
              {resource.contact && (
                <p className={`text-sm ${darkMode ? 'text-blue-400' : 'text-blue-600'} mt-1 font-medium`}>
                  📞 {resource.contact}
                </p>
              )}
              {resource.available && (
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'} mt-1`}>
                  ⏰ {resource.available}
                </p>
              )}
              {resource.what && (
                <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'} mt-1`}>
                  {resource.what}
                </p>
              )}
            </div>
          ))}

          {/* Show collapsed state indicator */}
          {!isExpanded && (
            <div className={`text-center pt-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'} text-sm`}>
              Click "Show More" to see additional guidance...
            </div>
          )}
        </div>
      )}

      {/* Handle firstSteps from workplace_ethics */}
      {action.firstSteps && (
        <div className="space-y-3 mt-4">
          {action.firstSteps.map((step, idx) => (
            <div key={idx} className={`p-3 rounded ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <p className={`font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-800'} mb-1`}>
                {step.action}
              </p>
              {step.detail && (
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-2`}>
                  {step.detail}
                </p>
              )}
              {step.specifics && (
                <ul className="space-y-1 ml-4">
                  {step.specifics.map((item, i) => (
                    <li key={i} className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      • {item}
                    </li>
                  ))}
                </ul>
              )}
              {step.questions && (
                <ul className="space-y-1 ml-4">
                  {step.questions.map((q, i) => (
                    <li key={i} className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      • {q}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Handle immediateResponse from workplace_ethics */}
      {action.immediateResponse && (
        <div className="space-y-3 mt-4">
          {action.immediateResponse.map((step, idx) => (
            <div key={idx} className={`p-3 rounded ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <p className={`font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-800'} mb-1`}>
                {step.action}
              </p>
              {step.detail && (
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {step.detail}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Handle resources from personal_crisis */}
      {action.resources && (
        <div className={`mt-4 p-3 rounded ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <p className={`text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
            Resources:
          </p>
          <ul className="space-y-1">
            {action.resources.map((resource, idx) => (
              <li key={idx} className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                • {resource}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Handle immediate field from personal_crisis */}
      {action.immediate && (
        <div className={`mt-3 p-3 rounded ${darkMode ? 'bg-purple-900/30' : 'bg-purple-50'} border-l-4 border-purple-500`}>
          <p className={`text-sm ${darkMode ? 'text-purple-200' : 'text-purple-900'}`}>
            💜 {action.immediate}
          </p>
        </div>
      )}

      {/* Handle commonMistakes from workplace_ethics */}
      {action.commonMistakes && (
        <div className={`mt-4 p-3 rounded ${darkMode ? 'bg-yellow-900/30' : 'bg-yellow-50'}`}>
          <p className={`text-sm font-semibold ${darkMode ? 'text-yellow-300' : 'text-yellow-900'} mb-2`}>
            ⚠️ Common Mistakes to Avoid:
          </p>
          <ul className="space-y-2">
            {action.commonMistakes.map((mistake, idx) => (
              <li key={idx} className={`text-sm ${darkMode ? 'text-yellow-200' : 'text-yellow-900'}`}>
                • <strong>{mistake.mistake}:</strong> {mistake.why || mistake.reality}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Generic warning field */}
      {action.warning && (
        <div className={`mt-3 p-3 rounded ${darkMode ? 'bg-yellow-900/30' : 'bg-yellow-50'} border-l-4 border-yellow-500`}>
          <p className={`text-sm ${darkMode ? 'text-yellow-300' : 'text-yellow-900'}`}>
            ⚠️ {action.warning}
          </p>
        </div>
      )}

      {/* Timeframe from workplace_ethics */}
      {action.timeframe && (
        <div className={`mt-3 p-2 rounded ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
          <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            ⏱️ {action.timeframe}
          </p>
        </div>
      )}
    </div>
  );
};

const TemplateCard = ({ template, darkMode }) => {
  const [copied, setCopied] = useState(false);

  const copyTemplate = () => {
    navigator.clipboard.writeText(template.template);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-white border-2 border-gray-200'}`}>
      <div className="flex items-start justify-between gap-4 mb-3">
        <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          {template.title}
        </h4>
        <button
          onClick={copyTemplate}
          className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
            copied
              ? 'bg-green-600 text-white'
              : darkMode
              ? 'bg-gray-600 hover:bg-gray-500 text-gray-200'
              : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
          }`}
        >
          {copied ? '✓ Copied' : 'Copy'}
        </button>
      </div>
      <pre className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'} whitespace-pre-wrap font-sans`}>
        {template.template}
      </pre>
    </div>
  );
};

const ResourcesList = ({ resources, darkMode }) => (
  <div className="space-y-4">
    {Object.entries(resources).map(([category, items]) => (
      <div key={category}>
        <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'} mb-3 capitalize`}>
          {category.replace(/([A-Z_])/g, ' $1').trim().replace(/_/g, ' ')}
        </h4>
        <div className="space-y-2">
          {items.map((item, idx) => {
            // Handle string resources
            if (typeof item === 'string') {
              return (
                <div key={idx} className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  • {item}
                </div>
              );
            }
            
            // Handle object resources with org/url/what structure
            if (item.org || item.resource) {
              return (
                <div key={idx} className={`p-3 rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <div className={`font-medium ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                    {item.org || item.resource}
                  </div>
                  {item.url && (
                    <div className={`text-sm ${darkMode ? 'text-blue-400' : 'text-blue-600'} mt-1`}>
                      🔗 {item.url}
                    </div>
                  )}
                  {item.what && (
                    <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mt-1`}>
                      {item.what}
                    </div>
                  )}
                  {item.how && (
                    <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mt-1`}>
                      {item.how}
                    </div>
                  )}
                  {item.resources && (
                    <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mt-1`}>
                      {item.resources}
                    </div>
                  )}
                </div>
              );
            }
            
            // Fallback for any other structure
            return (
              <div key={idx} className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                • {JSON.stringify(item)}
              </div>
            );
          })}
        </div>
      </div>
    ))}
  </div>
);

export default PracticalActionsModal;