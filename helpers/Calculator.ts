export async function calc (dependents: number, isDiscount: Boolean) {
  const individualCost = 1000;
  const dependentCost = 500;
  const payPeriods = 26;
  const discountRate = .9;
  let benefitCost;
  if(isDiscount){
    benefitCost = ((dependentCost*dependents+individualCost)/payPeriods)*discountRate;
  } else {
      benefitCost = (dependentCost*dependents+individualCost)/payPeriods;
  }
  return benefitCost;
}