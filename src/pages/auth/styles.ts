import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-start',
    paddingBottom: 56,
    paddingHorizontal: 20,
    paddingTop: 72
  },
  errorText: {
    color: '#CE3036',
    fontSize: 12,
    paddingTop: 12
  },
  form: {
    alignItems: 'flex-start',
    alignSelf: 'stretch',
    justifyContent: 'center',
    marginTop: 56
  },
  safeAreaView: {
    flex: 1
  },
  subtitle: {
    color: '#f3f3f3',
    fontSize: 16,
    lineHeight: 25,
    marginTop: 32,
    textAlign: 'center'
  },
  text: {
    color: '#f3f3f3',
    fontSize: 18,
    paddingVertical: 24
  },
  textInput: {
    alignSelf: 'stretch',
    backgroundColor: '#313136',
    color: '#f3f3f3',
    fontSize: 18,
    padding: 16,
    textShadowColor: 'white'
  },
  title: {
    color: '#f3f3f3',
    fontSize: 26,
    textAlign: 'center',
    width: '100%'
  },
  touchableOpacity: {
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: '#005CA9',
    borderRadius: 4,
    fontSize: 16,
    marginVertical: 56,
    padding: 16
  },
  touchableOpacityText: {
    color: '#f3f3f3',
    fontSize: 16,
    textAlign: 'center',
    textTransform: 'uppercase'
  }
});
