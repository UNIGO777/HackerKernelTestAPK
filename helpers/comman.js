import { Dimensions } from "react-native"

// Get the width and height of the device's window
const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

// Function to calculate height in pixels based on a percentage of the device height
export const hp = percentage => {
        return (percentage * deviceHeight) / 100; // Returns the height in pixels
}

// Function to calculate width in pixels based on a percentage of the device width
export const wp = percentage => {
        return (percentage * deviceWidth) / 100; // Returns the width in pixels
}