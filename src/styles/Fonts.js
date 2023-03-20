import { scale, verticalScale } from "react-native-size-matters";

export const Title = {
  fontSize: verticalScale(35),
  textAlign: "center",
  fontWeight: "bold",
  alignSelf: "center",
};

export const txtSmall = {
  fontSize: verticalScale(12),
  alignSelf: "center",
};
export const txtSmallBold = {
  ...txtSmall,
  fontWeight: "bold",
};
export const txtMedium = {
  fontSize: verticalScale(14),
  textAlign: "center",
  alignSelf: "center",
};
export const txtLarge = {
  fontSize: verticalScale(20),
  textAlign: "center",
};
export const txtXLarge = {
  fontSize: verticalScale(25),
  textAlign: "center",
};
export const txtLargeBold = {
  ...txtLarge,
  fontWeight: "bold",
};
export const txtMediumBold = {
  ...txtMedium,
  fontweight: "bold",
};
