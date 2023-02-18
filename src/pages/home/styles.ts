import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingBottom: 72,
    paddingHorizontal: 20
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'wrap'
  },
  flexButtons: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  headingTitle: {
    color: '#f3f3f3',
    fontSize: 28,
    textAlign: 'center'
  },
  offTouchableOpacity: {
    backgroundColor: '#F3F5F9',
    borderRadius: 4,
    flex: 1,
    margin: 8,
    minWidth: 65,
    opacity: 0.3,
    padding: 16
  },
  onTouchableOpacity: {
    backgroundColor: '#005CA9',
    borderRadius: 4,
    flex: 1,
    margin: 8,
    minWidth: 65,
    padding: 16
  },
  sectionText: {
    color: '#f3f3f3',
    fontSize: 18,
    paddingVertical: 12
  },
  session: {
    marginVertical: 8,
    textAlign: 'center',
    width: '100%'
  },
  touchableOpacityText: {
    color: '#f3f3f3',
    fontSize: 16,
    textAlign: 'center'
  }
});
