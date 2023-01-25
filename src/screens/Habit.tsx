import { Alert, ScrollView, Text, View } from 'react-native';
import { useRoute } from '@react-navigation/native'
import { useEffect, useState } from 'react';
import dayjs from 'dayjs'
import clsx from 'clsx';

import { generateProgressPercentage } from '../utils/generate-progress-percentage'
import { api } from '../lib/axios';

import { HabitsEmpty } from '../components/HabitsEmpty';
import { ProgressBar } from '../components/ProgressBar';
import { BackButton } from '../components/BackButton';
import { Checkbox } from '../components/Checkbox';
import { Loading } from '../components/Loading';

interface Params {
  date: string;
}

interface DayInfoProps {
  possibleHabits: Array<{
    id: string;
    title: string;
    created_at: string;
  }>,
  completedHabits: String[];
}

export function Habit() {
  const route = useRoute()
  const [loading, SetLoading] = useState(true)
  const [dayInfo, setDayInfo] = useState<DayInfoProps | null>(null)
  const [completedHabits, setCompletedHabits] = useState<string[]>([]) 

  const { date } = route.params as Params

  const parsedDate = dayjs(date)
  const dayOfWeek = parsedDate.format('dddd')
  const dayAndMonth = parsedDate.format('MM/DD')
  const isDateInPast = parsedDate.endOf('day').isBefore(new Date())

  
  const progressBar = dayInfo?.possibleHabits.length 
  ? generateProgressPercentage(dayInfo.possibleHabits.length, completedHabits.length) : 0 


  async function habitList() {
    try {
      SetLoading(true)

      const response = await api.get('/day', {
        params: { date }
      })
      setDayInfo(response.data)
      setCompletedHabits(response.data.completedHabits)
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Loading error!!')
    }
    finally {
      SetLoading(false)
    }
  }

  async function HandleToggleHabit(habitId: string) {
    try {
      await api.patch(`/habits/${habitId}/toggle`)
      if (completedHabits.includes(habitId)) {
        setCompletedHabits(prevState => prevState.filter(habit => habit !== habitId))
      } else {
        setCompletedHabits(prevState => [...prevState, habitId])
      }      
    } catch (error) {
      console.log(error);
      Alert.alert('Unable to update status of habit!!')
    }
  }

  useEffect(() => {
    habitList()
  }, [])
  
  if (loading) {
    return (
      <Loading/>
    )
  }

  return(
    <View className='flex-1 bg-background px-8 pt-16'>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <BackButton/>

        <Text className='mt-6 text-zinc-400 font-semibold text-base lowercase'>
          {dayOfWeek}
        </Text>
        <Text className='text-white font-extrabold text-3xl'>
          {dayAndMonth}
        </Text>
        
        <ProgressBar progress={progressBar}/>

        <View className={clsx('mt-6', {
          ['opacity-40']: isDateInPast
        })}>
          {
            dayInfo?.possibleHabits.length ? 
              dayInfo?.possibleHabits.map((habit, index) => (
                <Checkbox 
                key={index}
                title={habit.title}
                checked={completedHabits.includes(habit.id)}
                disabled={isDateInPast}
                onPress={() => HandleToggleHabit(habit.id)}
                />
              )) 
              : <HabitsEmpty />
            }
          </View>
          {
            isDateInPast && (
              <Text className='text-white mt-10 text-center'>
                You cannot edit habits from a past date!!
              </Text>
            )
          }
      </ScrollView>
    </View>
  )
}