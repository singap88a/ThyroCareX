/** Matches backend `planType` to display name (same as pricing page). */
export const PLAN_NAMES_BY_TYPE = {
  1: 'Starter',
  2: 'Professional',
  3: 'Enterprise',
};

/**
 * Map a single plan from GET /Plan into the shape used by pricing & home.
 * @param {Record<string, unknown>} p Raw plan from API
 */
export function mapPlanFromApi(p) {
  const planNames = PLAN_NAMES_BY_TYPE;
  const priceNum = Number(p.price);
  const safePrice = Number.isFinite(priceNum) ? priceNum : 0;
  const displayName = planNames[p.planType] || 'Standard Plan';

  return {
    id: p.id,
    planType: p.planType,
    name: displayName,
    description: p.description || '',
    durationInDays: p.durationInDays || 30,
    monthlyPrice: p.price,
    yearlyPrice: Math.floor(safePrice * 0.8),
    features: Array.isArray(p.features) ? p.features : [],
    cta: safePrice === 0 ? 'Get Started' : 'Subscribe Now',
    popular: displayName.toLowerCase().includes('pro'),
  };
}

/**
 * @param {unknown[]} rawPlans
 */
export function mapPlansFromApiResponse(rawPlans) {
  if (!Array.isArray(rawPlans)) return [];
  return rawPlans.map(mapPlanFromApi);
}
