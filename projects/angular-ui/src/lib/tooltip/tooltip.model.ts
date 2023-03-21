const textAlignValues = ['left','right','center'] as const
export type BaoTooltipTextAlign = typeof textAlignValues[number];
export const isTextAlign= (x: any): x is BaoTooltipTextAlign => textAlignValues.includes(x);

const placementValues = ['top','right','left','bottom'] as const
export type BaoTooltipPlacement = typeof placementValues[number];
export const isPlacement= (x: any): x is BaoTooltipPlacement => placementValues.includes(x);