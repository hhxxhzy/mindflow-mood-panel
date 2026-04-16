import React, { useEffect } from 'react'
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Provider as PaperProvider } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

// 导入屏幕
import HomeScreen from './src/screens/HomeScreen'
import DashboardScreen from './src/screens/DashboardScreen'
import ReportScreen from './src/screens/ReportScreen'
import SettingsScreen from './src/screens/SettingsScreen'

// 导入 store
import { useMoodStore } from './src/store/moodStore'

// 主题配置
const theme = {
  colors: {
    primary: '#667eea',
    secondary: '#ec4899',
    background: '#f8fafc',
    surface: '#ffffff',
    text: '#1f2937',
    disabled: '#9ca3af',
    placeholder: '#6b7280',
    backdrop: 'rgba(0, 0, 0, 0.5)',
  },
  roundness: 12,
}

const Tab = createBottomTabNavigator()

// 主应用组件
function AppContent() {
  const { loadHistory } = useMoodStore()

  // 应用启动时加载数据
  useEffect(() => {
    loadHistory()
  }, [loadHistory])

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string

          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline'
              break
            case 'Dashboard':
              iconName = focused ? 'chart-bar' : 'chart-bar-stacked'
              break
            case 'Reports':
              iconName = focused ? 'file-document' : 'file-document-outline'
              break
            case 'Settings':
              iconName = focused ? 'cog' : 'cog-outline'
              break
            default:
              iconName = 'circle'
          }

          return <Icon name={iconName} size={size} color={color} />
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.disabled,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopWidth: 1,
          borderTopColor: '#e5e7eb',
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
        headerStyle: {
          backgroundColor: theme.colors.surface,
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTintColor: theme.colors.text,
        headerTitleStyle: {
          fontWeight: '600',
          fontSize: 18,
        },
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{ title: '心绪看板' }}
      />
      <Tab.Screen 
        name="Dashboard" 
        component={DashboardScreen}
        options={{ title: '数据分析' }}
      />
      <Tab.Screen 
        name="Reports" 
        component={ReportScreen}
        options={{ title: '周报' }}
      />
      <Tab.Screen 
        name="Settings" 
        component={SettingsScreen}
        options={{ title: '设置' }}
      />
    </Tab.Navigator>
  )
}

// 应用入口
export default function App() {
  return (
    <PaperProvider theme={theme}>
      <SafeAreaView style={styles.container}>
        <StatusBar 
          barStyle="dark-content" 
          backgroundColor={theme.colors.surface}
        />
        <NavigationContainer>
          <AppContent />
        </NavigationContainer>
      </SafeAreaView>
    </PaperProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
})