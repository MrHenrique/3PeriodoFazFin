import { scale, verticalScale } from "react-native-size-matters";

export const rounded = {
  borderRadius: 10,
};
export const btnLarge = {
  width: scale(300),
  height: verticalScale(40),
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
