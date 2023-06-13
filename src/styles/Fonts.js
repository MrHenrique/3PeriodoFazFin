import { scale, verticalScale } from "react-native-size-matters";

export const Title = {
  fontSize: scale(35),
  textAlign: "center",
  fontWeight: "bold",
  alignSelf: "center",
};

export const txtSmall = {
  fontSize: scale(12),
  alignSelf: "center",
};
export const txtSmallBold = {
  ...txtSmall,
  fontWeight: "bold",
};
export const txtMedium = {
  fontSize: scale(14),
  textAlign: "center",
  alignSelf: "center",
};
export const txtLarge = {
  fontSize: scale(20),
  textAlign: "center",
};
export const txtXLarge = {
  fontSize: scale(25),
  textAlign: "center",
};
export const txtLargeBold = {
  ...txtLarge,
  fontWeight: "bold",
};
export const txtXLargeBold = {
  ...txtXLarge,
  fontWeight: "bold",
};
export const txtMediumBold = {
  ...txtMedium,
  fontWeight: "bold",
};
