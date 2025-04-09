import { useState, useEffect } from 'react'
import { supabase } from './src/lib/supabase'
import Auth from './src/components/Auth'
import Account from './src/components/Account'
import { View } from 'react-native'
import { useUserStore } from './src/store/useUserStore'
import MainTabs from './src/navigation/mainTabs'
import { NavigationContainer } from '@react-navigation/native'

export default function App() {
  const user = useUserStore((state) => state.user) // Obtener el usuario del store
  const setUser = useUserStore((state) => state.setUser) // Setter del usuario

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user || null) // Guardar el usuario en el store
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null) // Actualizar el usuario en el store
    })
  }, [])

  return (
    <NavigationContainer>
      {user ? <MainTabs /> : <Auth />}
    </NavigationContainer>
  )
}