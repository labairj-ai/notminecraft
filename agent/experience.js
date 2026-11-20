export const activities = ['exploration', 'gathering', 'crafting', 'construction', 'mining'];
const historyLimit = 12;

export function initializeExperience(state) {
  state.experience ??= {
    interests: Object.fromEntries(activities.map(activity => [activity, 50])),
    competence: Object.fromEntries([...activities, 'navigation'].map(activity => [activity, { success: 0, failure: 0 }])),
    selected: {},
    recentChoices: [],
    recentChanges: [],
    recentOutcomes: {}
  };
  return state.experience;
}

export function objectiveActivity(option) {
  switch (option.kind) {
    case 'explore': return 'exploration';
    case 'gather':
    case 'revisit': return option.activity ?? 'gathering';
    case 'craft':
    case 'supplies': return 'crafting';
    case 'shelter': return 'construction';
    default: return option.kind;
  }
}

export function recordChoice(state, option) {
  const experience = initializeExperience(state);
  const activity = objectiveActivity(option);
  experience.selected[activity] = (experience.selected[activity] ?? 0) + 1;
  experience.recentChoices = [...experience.recentChoices, activity].slice(-historyLimit);
}

export function recordExperience(state, activity, result, key, reason, attempt = true) {
  const experience = initializeExperience(state);
  if (attempt) experience.competence[activity][result]++;
  if (!activities.includes(activity)) return;

  const outcomes = experience.recentOutcomes[activity] ?? [];
  const repeats = outcomes.filter(entry => entry.key === key && entry.result === result).length;
  const reward = result === 'success' ? Math.max(0, 3 - repeats) : repeats ? 0 : -1;
  experience.recentOutcomes[activity] = [...outcomes, { key, result }].slice(-8);
  const before = experience.interests[activity];
  const after = Math.max(0, Math.min(100, before + reward));
  if (after === before) return;
  experience.interests[activity] = after;
  experience.recentChanges = [...experience.recentChanges, {
    activity, delta: after - before, score: after, reason, tick: state.tick
  }].slice(-historyLimit);
}

export function experienceContext(state) {
  const { interests, competence, recentChoices, recentChanges } = initializeExperience(state);
  return {
    interests: { ...interests },
    competence: Object.fromEntries(Object.entries(competence).map(([activity, { success, failure }]) => [
      activity, { success, failure, rate: success + failure ? Math.round(100 * success / (success + failure)) : null }
    ])),
    recentChoices: recentChoices.slice(-6),
    recentChanges: recentChanges.slice(-3)
  };
}

export function preference(context, option) {
  const activity = objectiveActivity(option);
  const { interests, competence, recentChoices } = context;
  const attempts = competence[activity];
  const reliability = attempts?.rate == null ? 0 : (attempts.rate / 100 - 0.5) * Math.min(1, (attempts.success + attempts.failure) / 5);
  const repeats = recentChoices.slice(-3).filter(choice => choice === activity).length;
  const inclination = Math.max(-4, Math.min(4, ((interests[activity] ?? 50) - 50) / 4));
  return inclination + reliability - 1.5 * repeats;
}
