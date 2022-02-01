export enum BaoColors {
  ACTION = 'action',
  PRIMARY = 'primary',
  PRIMARY_REVERSED = 'primary-reversed',
  SECONDARY = 'secondary',
  TERTIARY = 'tertiary',
  INFORMATIVE = 'informative',
  NEGATIVE = 'negative',
  POSITIVE = 'positive',
  WARNING = 'warning',
}

export function baoColorToHex(baoColor: BaoColors): string {
  switch (baoColor) {
    case BaoColors.ACTION:
      return '#097D6C';
    case BaoColors.PRIMARY:
      return '#FFFFFF';
    case BaoColors.PRIMARY_REVERSED:
      return '#000000';
    case BaoColors.SECONDARY:
      return '#637381';
    case BaoColors.TERTIARY:
      return '#ADB5BD';
    case BaoColors.INFORMATIVE:
      return '#0079C4';
    case BaoColors.NEGATIVE:
      return '#D3310A';
    case BaoColors.POSITIVE:
      return '#0DA566';
    case BaoColors.WARNING:
      return '#FFB833';
    default:
      return '#097D6C';
  }
}
