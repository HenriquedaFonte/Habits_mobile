import { useState } from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons'
import colors from 'tailwindcss/colors';

import { BackButton } from '../components/BackButton';
import { Checkbox } from '../components/Checkbox';

const availableWeekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

export function NewHabit() {
  const [weekDays, setWeekDays] = useState<number[]>([])

  function handleToggleWeekDay(weekDayIndex: number) {
    if(weekDays.includes(weekDayIndex)){
      setWeekDays(prevState => prevState.filter(weekDay => weekDay !== weekDayIndex))
    } else {
      setWeekDays(prevState => [...prevState, weekDayIndex])
    }
  }

  return(
    <View className='flex-1 bg-background px-8 pt-16'>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 }}
      >
        <BackButton/>
        <Text className='mt-6 text-white font-extrabold text-3xl'>
          New Habit
        </Text>
        <Text className='mt-6 text-white font-semibold text-base'>
          what is your commitment?
        </Text>
        <TextInput
          placeholder='ex.: Exercise, drink water, etc...'
          placeholderTextColor={colors.zinc[400]}
          className='h-12 pl-4 rounded-lg mt-3 bg-zinc-900 text-white border-2 border-zinc-800 focus:border-2 focus:border-green-400 '
        />
        <Text className='mt-4 mb-3 text-white font-semibold text-base'>
          What is the recurrence?
        </Text>
        {
          availableWeekDays.map((weekDay, i) => (
            <Checkbox 
            key={weekDay}
            title={weekDay}
            checked={weekDays.includes(i)}
            onPress={() => handleToggleWeekDay(i)}
            />
          ))
        }
        <TouchableOpacity
          className='w-full h-14 flex-row items-center justify-center bg-green-600 rounded-md mt-6'
          activeOpacity={0.7}
        >
          <Feather
            name='check'
            size={20}
            color={colors.white}
          />
          <Text className='font-semibold text-base text-white ml-2'>
            Confirm
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}