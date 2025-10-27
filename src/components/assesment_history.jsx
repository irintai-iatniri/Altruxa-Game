import React from 'react';

// Assessment History Component
export const AssessmentHistory = ({ assessmentHistory, darkMode }) => {
  if (assessmentHistory.length === 0) {
    return (
      <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} p-8 rounded-xl text-center`}>
        <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>No assessment history yet. Complete the moral assessment to track your growth over time.</p>
      </div>
    );
  }

  const dimensions = ['goodEvil', 'selfishSelfless', 'scrupulousUnscrupulous', 'couragePrudence'];
  const dimensionNames = {
    goodEvil: 'Good vs Evil',
    selfishSelfless: 'Selfless vs Selfish',
    scrupulousUnscrupulous: 'Scrupulous vs Unscrupulous',
    couragePrudence: 'Courageous vs Prudent'
  };

  // Calculate changes from first to latest
  const firstAssessment = assessmentHistory[0];
  const latestAssessment = assessmentHistory[assessmentHistory.length - 1];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Summary Card */}
      <div className={`p-6 rounded-xl ${darkMode ? 'bg-gradient-to-r from-purple-900/40 to-blue-900/40' : 'bg-gradient-to-r from-purple-100 to-blue-100'}`}>
        <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'} mb-3`}>📊 Your Moral Journey</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Total Assessments</div>
            <div className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{assessmentHistory.length}</div>
          </div>
          <div>
            <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Journey Started</div>
            <div className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              {new Date(firstAssessment.timestamp).toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>

      {/* Growth Indicators */}
      {assessmentHistory.length > 1 && (
        <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} border-2 ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-800'} mb-4`}>🌱 Growth Indicators</h3>
          <div className="space-y-4">
            {dimensions.map(dim => {
              const firstScore = firstAssessment.scores[dim] || 0;
              const latestScore = latestAssessment.scores[dim] || 0;
              const change = latestScore - firstScore;
              const changePercent = ((change / 20) * 100).toFixed(0); // Scale is -10 to +10 (range of 20)

              return (
                <div key={dim}>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>{dimensionNames[dim]}</span>
                    <div className="flex items-center gap-2">
                      <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {firstScore} → {latestScore}
                      </span>
                      {change !== 0 && (
                        <span className={`text-sm font-bold ${
                          change > 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {change > 0 ? '↑' : '↓'} {Math.abs(change)}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className={`h-3 rounded-full overflow-hidden ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                    <div
                      className={`h-full transition-all ${
                        change > 0 ? 'bg-green-500' : change < 0 ? 'bg-red-500' : 'bg-gray-400'
                      }`}
                      style={{ width: `${Math.min(100, Math.abs(changePercent))}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <div className={`mt-4 p-3 rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {assessmentHistory.length > 1
                ? "Growth is a journey, not a destination. Each assessment captures a moment in your moral development."
                : "Take another assessment to begin tracking your moral growth over time."}
            </p>
          </div>
        </div>
      )}

      {/* Assessment Timeline */}
      <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} border-2 ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-800'} mb-4`}>📅 Assessment Timeline</h3>
        <div className="space-y-3">
          {assessmentHistory.slice().reverse().map((assessment, index) => {
            const actualIndex = assessmentHistory.length - 1 - index;
            const date = new Date(assessment.timestamp);
            const isLatest = actualIndex === assessmentHistory.length - 1;

            return (
              <div
                key={assessment.timestamp}
                className={`p-4 rounded-lg ${
                  darkMode
                    ? isLatest ? 'bg-purple-900/40 border-2 border-purple-500' : 'bg-gray-700'
                    : isLatest ? 'bg-purple-50 border-2 border-purple-400' : 'bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                      Assessment #{actualIndex + 1} {isLatest && '(Current)'}
                    </div>
                    <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {date.toLocaleDateString()} at {date.toLocaleTimeString()}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>Avg Score</div>
                    <div className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                      {(
                        (assessment.scores.goodEvil +
                         assessment.scores.selfishSelfless +
                         assessment.scores.scrupulousUnscrupulous +
                         assessment.scores.couragePrudence) / 4
                      ).toFixed(1)}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Insights */}
      {assessmentHistory.length > 1 && (
        <div className={`p-6 rounded-xl ${darkMode ? 'bg-gradient-to-r from-green-900/20 to-teal-900/20' : 'bg-gradient-to-r from-green-50 to-teal-50'}`}>
          <h3 className={`text-lg font-bold ${darkMode ? 'text-green-300' : 'text-green-800'} mb-3`}>💡 Insights</h3>
          <p className={`${darkMode ? 'text-gray-200' : 'text-gray-700'} leading-relaxed`}>
            You've completed {assessmentHistory.length} assessments on your journey. The Altruxan path recognizes that moral development is not linear—we grow through practice, reflection, and the courage to examine ourselves honestly. Each assessment is a snapshot of your current values, not a judgment of your worth.
          </p>
        </div>
      )}
    </div>
  );
};
