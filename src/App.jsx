import React, { useState } from 'react'
import { ChevronRight, Plus, Check, Zap, Target, Eye, Sparkles } from 'lucide-react'

export default function ManifestAI() {
  const [screen, setScreen] = useState('home')
  const [goals, setGoals] = useState([])
  const [newGoal, setNewGoal] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Money')
  const [dailyCompletions, setDailyCompletions] = useState({})
  const [streak, setStreak] = useState(0)
  const [visionText, setVisionText] = useState('')
  const [showVision, setShowVision] = useState(false)

  const categories = [
    { name: 'Looks', icon: '✨', color: 'from-purple-500 to-pink-500' },
    { name: 'Self Confidence', icon: '💪', color: 'from-orange-500 to-red-500' },
    { name: 'Dating', icon: '❤️', color: 'from-pink-500 to-rose-500' },
    { name: 'Money', icon: '💰', color: 'from-green-500 to-emerald-500' },
    { name: 'Peace', icon: '🧘', color: 'from-blue-500 to-cyan-500' },
    { name: 'Spirituality', icon: '✨', color: 'from-indigo-500 to-purple-500' },
  ]

  const addGoal = () => {
    if (newGoal.trim()) {
      setGoals([...goals, { id: Date.now(), text: newGoal, category: selectedCategory, completed: false }])
      setNewGoal('')
    }
  }

  const toggleGoalCompletion = (id) => {
    setGoals(goals.map(g => g.id === id ? { ...g, completed: !g.completed } : g))
  }

  const deleteGoal = (id) => {
    setGoals(goals.filter(g => g.id !== id))
  }

  const generateDailyActions = () => {
    const actions = {
      'Money': ['Spend 30 mins learning a high-income skill', 'Reach out to one person about collaboration', 'Track every dollar you spend today', 'Read about investing for 20 mins', 'Apply for one opportunity'],
      'Looks': ['Do a 20 min workout', 'Take a cold shower', 'Spend 10 mins on skincare', 'Wear something that makes you feel confident', 'Stand tall - practice good posture all day'],
      'Self Confidence': ['Say one affirmation in the mirror', 'Do one thing that scares you slightly', 'Journal about your wins this week', 'Compliment yourself on something', 'Practice making eye contact today'],
      'Dating': ['Start one genuine conversation', 'Improve one aspect of your appearance', 'Work on your listening skills', 'Do something that makes you interesting', 'Build genuine confidence in yourself first'],
      'Peace': ['Meditate for 10 minutes', 'Spend time in nature', 'Journaling session - 15 mins', 'Limit social media to 1 hour', 'Practice deep breathing - 5 mins'],
      'Spirituality': ['Meditation or prayer - 15 mins', 'Reflect on your purpose', 'Read something inspirational', 'Practice gratitude - list 5 things', 'Connect with something bigger than yourself'],
    }
    return actions[selectedCategory] || []
  }

  const handleDailyCompletion = (action) => {
    const key = `${selectedCategory}-${action}`
    setDailyCompletions({ ...dailyCompletions, [key]: !dailyCompletions[key] })
    if (!dailyCompletions[key]) setStreak(streak + 1)
  }

  const getVisionAffirmation = () => {
    const affirmations = {
      'Money': ["I am building wealth through smart decisions and consistent action.", "Money flows to me through my unique value and talents.", "I deserve financial freedom and I'm taking steps to achieve it.", "Every day brings me closer to my financial goals.", "I am a powerful manifester of abundance."],
      'Looks': ["My body is a reflection of my commitment to myself.", "I am becoming more attractive through discipline and care.", "I feel powerful in my own skin.", "Every action I take improves my appearance and confidence.", "I am sculpting the version of myself I dream of."],
      'Self Confidence': ["I am worthy of success and respect.", "My confidence grows stronger every single day.", "I believe in my abilities and my potential.", "I am powerful and capable of achieving great things.", "I trust myself to handle whatever comes."],
      'Dating': ["I am attractive, interesting, and valuable.", "I draw the right people into my life naturally.", "I am confident in who I am and what I offer.", "I deserve deep, meaningful connections.", "My authentic self is magnetic to the right people."],
      'Peace': ["I am calm and centered no matter what happens.", "Peace flows through me naturally.", "I choose tranquility and let go of what I can't control.", "I am at ease with who I am and where I'm going.", "Stillness and clarity are my natural state."],
      'Spirituality': ["I am connected to something greater than myself.", "My spirit is guiding me toward my purpose.", "I trust the universe and my intuition.", "I am exactly where I need to be.", "My higher self is leading me to greatness."],
    }
    const categoryAffirmations = affirmations[selectedCategory] || affirmations['Money']
    return categoryAffirmations[Math.floor(Math.random() * categoryAffirmations.length)]
  }

  const dailyActions = generateDailyActions()
  const completedActionsToday = dailyActions.filter(action => dailyCompletions[`${selectedCategory}-${action}`]).length

  if (screen === 'home') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-6">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8 mt-4">
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Manifest AI</h1>
            <p className="text-gray-300">Turn your dreams into daily reality</p>
          </div>

          <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-6 mb-6 text-center">
            <p className="text-sm text-orange-100 mb-1">Current Streak</p>
            <p className="text-5xl font-bold">{streak}</p>
            <p className="text-orange-100 text-sm mt-1">days of momentum</p>
          </div>

          <div className="space-y-4 mb-8">
            <button onClick={() => setScreen('goals')} className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-xl p-4 flex items-center justify-between group">
              <div className="flex items-center gap-3"><Target size={24} /><div className="text-left"><p className="font-semibold">My Goals</p><p className="text-sm text-blue-200">{goals.length} goals set</p></div></div>
              <ChevronRight className="group-hover:translate-x-1 transition" />
            </button>

            <button onClick={() => setScreen('dailyActions')} className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 rounded-xl p-4 flex items-center justify-between group">
              <div className="flex items-center gap-3"><Zap size={24} /><div className="text-left"><p className="font-semibold">Today's Actions</p><p className="text-sm text-green-200">{completedActionsToday}/{dailyActions.length} completed</p></div></div>
              <ChevronRight className="group-hover:translate-x-1 transition" />
            </button>

            <button onClick={() => setScreen('vision')} className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-xl p-4 flex items-center justify-between group">
              <div className="flex items-center gap-3"><Eye size={24} /><div className="text-left"><p className="font-semibold">Your Vision</p><p className="text-sm text-purple-200">See your future self</p></div></div>
              <ChevronRight className="group-hover:translate-x-1 transition" />
            </button>

            <button onClick={() => setScreen('progress')} className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 rounded-xl p-4 flex items-center justify-between group">
              <div className="flex items-center gap-3"><Sparkles size={24} /><div className="text-left"><p className="font-semibold">Progress</p><p className="text-sm text-indigo-200">Track your journey</p></div></div>
              <ChevronRight className="group-hover:translate-x-1 transition" />
            </button>
          </div>

          <div className="mb-6">
            <p className="text-gray-400 text-sm mb-3 font-semibold">Focus Area</p>
            <div className="grid grid-cols-2 gap-2">
              {categories.map(cat => (
                <button key={cat.name} onClick={() => setSelectedCategory(cat.name)} className={`p-3 rounded-lg text-sm font-semibold transition ${selectedCategory === cat.name ? `bg-gradient-to-br ${cat.color} text-white` : 'bg-slate-700 text-gray-300 hover:bg-slate-600'}`}>
                  <span className="text-lg mr-1">{cat.icon}</span>{cat.name}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-slate-800 rounded-xl p-4 border border-purple-500/30">
            <p className="text-sm text-gray-400 mb-2">Today's Affirmation</p>
            <p className="text-lg font-semibold italic text-purple-300">"{getVisionAffirmation()}"</p>
          </div>
        </div>
      </div>
    )
  }

  if (screen === 'goals') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-6">
        <div className="max-w-md mx-auto">
          <button onClick={() => setScreen('home')} className="text-purple-400 hover:text-purple-300 mb-4 text-sm font-semibold">← Back</button>
          <h2 className="text-3xl font-bold mb-6">My Goals in {selectedCategory}</h2>

          <div className="bg-slate-800 rounded-xl p-4 mb-6 border border-slate-700">
            <input type="text" placeholder="Write your goal..." value={newGoal} onChange={(e) => setNewGoal(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && addGoal()} className="w-full bg-slate-700 text-white placeholder-gray-500 rounded-lg p-3 mb-3 focus:outline-none focus:ring-2 focus:ring-purple-500" />
            <button onClick={addGoal} className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2"><Plus size={20} /> Add Goal</button>
          </div>

          <div className="space-y-3">
            {goals.filter(g => g.category === selectedCategory).length === 0 ? <div className="text-center py-8 text-gray-400"><p>No goals yet. Add one to get started!</p></div> : goals.filter(g => g.category === selectedCategory).map(goal => (
              <div key={goal.id} className="bg-slate-800 rounded-lg p-4 flex items-center gap-3 border border-slate-700 hover:border-purple-500/50 transition">
                <button onClick={() => toggleGoalCompletion(goal.id)} className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition ${goal.completed ? 'bg-green-500 border-green-500' : 'border-gray-500 hover:border-green-500'}`}>{goal.completed && <Check size={16} />}</button>
                <p className={`flex-1 ${goal.completed ? 'text-gray-500 line-through' : 'text-white'}`}>{goal.text}</p>
                <button onClick={() => deleteGoal(goal.id)} className="text-red-400 hover:text-red-300 text-sm">✕</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (screen === 'dailyActions') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-6">
        <div className="max-w-md mx-auto">
          <button onClick={() => setScreen('home')} className="text-purple-400 hover:text-purple-300 mb-4 text-sm font-semibold">← Back</button>
          <h2 className="text-3xl font-bold mb-2">Today's Actions</h2>
          <p className="text-gray-400 mb-6">{selectedCategory}</p>

          <div className="bg-slate-800 rounded-xl p-4 mb-6">
            <div className="flex items-center justify-between mb-2"><p className="text-sm font-semibold">Daily Progress</p><p className="text-lg font-bold text-green-400">{completedActionsToday}/{dailyActions.length}</p></div>
            <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden"><div className="bg-gradient-to-r from-green-500 to-emerald-500 h-full transition-all duration-300" style={{ width: `${dailyActions.length === 0 ? 0 : (completedActionsToday / dailyActions.length) * 100}%` }} /></div>
          </div>

          <div className="space-y-3">
            {dailyActions.map((action, idx) => {
              const key = `${selectedCategory}-${action}`
              const isCompleted = dailyCompletions[key]
              return (
                <button key={idx} onClick={() => handleDailyCompletion(action)} className={`w-full p-4 rounded-lg text-left transition border-2 ${isCompleted ? 'bg-green-900/30 border-green-500 text-green-300' : 'bg-slate-800 border-slate-700 text-white hover:border-green-500'}`}>
                  <div className="flex items-center gap-3"><div className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition ${isCompleted ? 'bg-green-500 border-green-500' : 'border-gray-500 hover:border-green-500'}`}>{isCompleted && <Check size={16} className="text-white" />}</div><p className={isCompleted ? 'line-through' : ''}>{action}</p></div>
                </button>
              )
            })}
          </div>

          {completedActionsToday === dailyActions.length && dailyActions.length > 0 && <div className="mt-6 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl p-4 text-center"><p className="text-xl font-bold">🔥 You crushed today!</p><p className="text-sm mt-2">Your future self thanks you</p></div>}
        </div>
      </div>
    )
  }

  if (screen === 'vision') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-6">
        <div className="max-w-md mx-auto">
          <button onClick={() => setScreen('home')} className="text-purple-400 hover:text-purple-300 mb-4 text-sm font-semibold">← Back</button>
          <h2 className="text-3xl font-bold mb-6">Your Vision</h2>

          {!showVision ? (
            <div className="space-y-4">
              <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <p className="text-gray-400 text-sm mb-3">Describe your ideal future self in {selectedCategory}:</p>
                <textarea placeholder="Write a vivid description of who you want to become..." value={visionText} onChange={(e) => setVisionText(e.target.value)} className="w-full bg-slate-700 text-white placeholder-gray-500 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500 h-32 resize-none" />
              </div>
              <button onClick={() => setShowVision(true)} disabled={!visionText.trim()} className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 text-white font-semibold py-3 rounded-lg">Visualize</button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 border-2 border-purple-500/50 rounded-2xl p-8 text-center min-h-96 flex flex-col items-center justify-center">
                <div className="text-5xl mb-4">✨</div>
                <h3 className="text-2xl font-bold mb-4">Your Future Self</h3>
                <p className="text-lg text-purple-200 italic mb-6">{visionText}</p>
                <p className="text-sm text-purple-300">See yourself as already complete</p>
              </div>
              <div className="bg-slate-800 rounded-xl p-4 border border-purple-500/30">
                <p className="text-sm text-gray-400 mb-3">Your Power Statement</p>
                <p className="text-lg font-semibold text-purple-300 italic">"{getVisionAffirmation()}"</p>
              </div>
              <button onClick={() => setShowVision(false)} className="w-full bg-slate-700 hover:bg-slate-600 text-white font-semibold py-2 rounded-lg">Edit Vision</button>
            </div>
          )}
        </div>
      </div>
    )
  }

  if (screen === 'progress') {
    const totalGoals = goals.length
    const completedGoals = goals.filter(g => g.completed).length
    const progressPercent = totalGoals === 0 ? 0 : Math.round((completedGoals / totalGoals) * 100)

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-6">
        <div className="max-w-md mx-auto">
          <button onClick={() => setScreen('home')} className="text-purple-400 hover:text-purple-300 mb-4 text-sm font-semibold">← Back</button>
          <h2 className="text-3xl font-bold mb-6">Your Progress</h2>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-4">
              <p className="text-sm text-blue-200 mb-1">Total Goals</p>
              <p className="text-3xl font-bold">{totalGoals}</p>
            </div>
            <div className="bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl p-4">
              <p className="text-sm text-green-200 mb-1">Completed</p>
              <p className="text-3xl font-bold">{completedGoals}</p>
            </div>
          </div>

          <div className="bg-slate-800 rounded-xl p-6 mb-6 border border-slate-700">
            <div className="flex items-center justify-between mb-3"><p className="font-semibold">Overall Progress</p><p className="text-2xl font-bold text-purple-400">{progressPercent}%</p></div>
            <div className="w-full bg-slate-700 rounded-full h-4 overflow-hidden"><div className="bg-gradient-to-r from-purple-500 to-pink-500 h-full transition-all duration-500" style={{ width: `${progressPercent}%` }} /></div>
          </div>

          <div className="mb-6">
            <p className="font-semibold mb-3">Goals by Category</p>
            <div className="space-y-2">
              {categories.map(cat => {
                const catGoals = goals.filter(g => g.category === cat.name)
                const catCompleted = catGoals.filter(g => g.completed).length
                return (
                  <div key={cat.name} className="bg-slate-800 rounded-lg p-3 border border-slate-700">
                    <div className="flex items-center justify-between mb-2"><span>{cat.icon} {cat.name}</span><span className="text-sm font-semibold text-gray-400">{catCompleted}/{catGoals.length}</span></div>
                    <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden"><div className={`bg-gradient-to-r ${cat.color} h-full transition-all`} style={{ width: catGoals.length === 0 ? '0%' : `${(catCompleted / catGoals.length) * 100}%` }} /></div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-xl p-4 text-center">
            <p className="text-sm text-orange-200 mb-1">Current Streak</p>
            <p className="text-4xl font-bold">{streak}</p>
            <p className="text-sm text-orange-200 mt-1">Days of momentum</p>
          </div>
        </div>
      </div>
    )
  }
}
