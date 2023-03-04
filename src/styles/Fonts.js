import { scale, verticalScale } from "react-native-size-matters";


export const Title = {
    fontSize: verticalScale(35),
    textAlign: "center",
    fontWeight: "bold",
    alignSelf: "center",
}

export const txtLarge = {
    fontSize: verticalScale(20),
    textAlign: "center",
}

export const txtMedium = {
    fontSize: verticalScale(14),
    textAlign: "center",
}
export const txtMediumBold = {
    ...txtMedium,
    fontweight: 'bold',
}
