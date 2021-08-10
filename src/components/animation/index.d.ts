import {AnimateCssChilrenType} from '../../utils/animateCssData';

export interface AnimateChilrenType extends AnimateCssChilrenType {}

export interface AddAnimateListProps extends AnimateCssChilrenType {
  animationInfo: {
    duration: number;
    count: number;
    delay: number;
  };
}
