import { scale, verticalScale } from "react-native-size-matters";

export const rounded = {
  borderRadius: 10,
};
export const btnLarge = {
  height: verticalScale(40),
  width: scale(300),
  alignItems: "center",
  justifyContent: "center",
  alignSelf: "center",
};
export const btnLargeRounded = {
  ...btnLarge,
  borderRadius: 20,
};
export const btnSmall = {
  width: scale(100),
  height: verticalScale(40),
};
export const btnMedium = {
  width: scale(140),
  height: verticalScale(40),
};
export const btnSmallRounded = {
  ...btnSmall,
  borderRadius: 20,
};
export const btnMediumLessRounded ={
  ...btnMedium,
  borderRadius: 10,
};
