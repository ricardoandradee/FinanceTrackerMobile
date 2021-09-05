import React from 'react';

import { 
  NavigationContainer, 
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme
} from '@react-navigation/native';

import { 
  Provider as PaperProvider, 
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme 
} from 'react-native-paper';

import Routes from './routes/main.routes';

import TimeZoneService from './services/timezone.service';
let timeZoneService = TimeZoneService.getInstance();
import CurrencyService from './services/currency.service';
let currencyService = CurrencyService.getInstance();

import { AuthProvider } from './contexts/auth.context.js';
import { AuthContext } from './contexts/auth.context';

const App = () => {
  const { state } = React.useContext(AuthContext);
  const [isDarkTheme, setIsDarkTheme] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      background: '#ffffff',
      text: '#333333'
    }
  }
  
  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      background: '#333333',
      text: '#ffffff'
    }
  }

  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;

  React.useEffect(() => { 
    timeZoneService.populateTimezones();
    currencyService.populateCurrencies();
  }, []);

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer theme={theme}>
          <Routes />
      </NavigationContainer>
    </PaperProvider>
  );
}

export default () => {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
};