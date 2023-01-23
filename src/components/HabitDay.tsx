import { TouchableOpacity, Dimensions, TouchableOpacityProps } from "react-native";

const weekDays = 7
const screenHorizontalPadding = (32 * 2) / 5

export const dayMarginBetween = 8
export const daySize = (Dimensions.get('screen').width / weekDays) - (screenHorizontalPadding + 5)


interface props extends TouchableOpacityProps {}
export function HabitDay({...rest}: props) {
  return (
    <TouchableOpacity
      className='bg-zinc-900 rounded-lg border-2 border-zinc-800 m-1'
      style={{ width: daySize, height: daySize }}
      activeOpacity={0.7}
      {...rest}
    />
  )
}