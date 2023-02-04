import { Button, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getArduinoData } from '../../infra/fetch/fetch.infra';
import { useEffect } from 'react';
import type { FC } from 'react';
import type { StackNavigation } from 'models/arduino/native-stack/stack-param-list.model';

const styles = StyleSheet.create({
  button: {
    marginVertical: 8,
    textAlign: 'center',
    width: '100%'
  },
  buttonText: {
    color: '#f3f3f3',
    fontSize: 16,
    paddingVertical: 12
  },
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
  heading: {
    paddingBottom: 24
  },
  headingTitle: {
    color: '#f3f3f3',
    fontSize: 28,
    textAlign: 'center'
  },
  touchableOpacity: {
    backgroundColor: '#005CA9',
    borderRadius: 4,
    flex: 1,
    margin: 8,
    minWidth: 65,
    padding: 16
  },
  touchableOpacityText: {
    color: '#f3f3f3',
    fontSize: 16,
    textAlign: 'center'
  },
  twinButtons: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  }
});

export interface HomeScreenProps {
  navigation: StackNavigation;
}

export const HomeScreen: FC<HomeScreenProps> = ({ navigation }) => {
  const handleGetArduinoData = async (): Promise<void> => {
    try {
      const data = await getArduinoData();

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <Button onPress={handleGetArduinoData} title={'Click here'} />
    });
  }, [navigation]);

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.heading}>
            <Text style={styles.headingTitle}>Automação Residencial</Text>
          </View>

          <View style={styles.content}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Garagem</Text>

              <View style={styles.twinButtons}>
                <TouchableOpacity disabled={true} style={styles.touchableOpacity}>
                  <Text style={styles.touchableOpacityText}>L12</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.touchableOpacity}>
                  <Text style={styles.touchableOpacityText}>L13</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.touchableOpacity}>
                  <Text style={styles.touchableOpacityText}>L14</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.touchableOpacity}>
                  <Text style={styles.touchableOpacityText}>L15</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.button}>
              <Text style={styles.buttonText}>Corredor Externo</Text>

              <View style={styles.twinButtons}>
                <TouchableOpacity style={styles.touchableOpacity}>
                  <Text style={styles.touchableOpacityText}>L16</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.touchableOpacity}>
                  <Text style={styles.touchableOpacityText}>L17</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.touchableOpacity}>
                  <Text style={styles.touchableOpacityText}>L18</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.button}>
              <Text style={styles.buttonText}>Corredor Interno</Text>

              <View style={styles.twinButtons}>
                <TouchableOpacity style={styles.touchableOpacity}>
                  <Text style={styles.touchableOpacityText}>L4</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.touchableOpacity}>
                  <Text style={styles.touchableOpacityText}>L6</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.touchableOpacity}>
                  <Text style={styles.touchableOpacityText}>L8</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.touchableOpacity}>
                  <Text style={styles.touchableOpacityText}>L10</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.button}>
              <Text style={styles.buttonText}>Sala de Estar</Text>

              <View style={styles.twinButtons}>
                <TouchableOpacity style={styles.touchableOpacity}>
                  <Text style={styles.touchableOpacityText}>L11</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.button}>
              <Text style={styles.buttonText}>Banheiro</Text>

              <View style={styles.twinButtons}>
                <TouchableOpacity style={styles.touchableOpacity}>
                  <Text style={styles.touchableOpacityText}>L09</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.button}>
              <Text style={styles.buttonText}>Cozinha</Text>

              <View style={styles.twinButtons}>
                <TouchableOpacity style={styles.touchableOpacity}>
                  <Text style={styles.touchableOpacityText}>L07</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.button}>
              <Text style={styles.buttonText}>Quarto</Text>

              <View style={styles.twinButtons}>
                <TouchableOpacity style={styles.touchableOpacity}>
                  <Text style={styles.touchableOpacityText}>L05</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.button}>
              <Text style={styles.buttonText}>Banheiro Suíte</Text>

              <View style={styles.twinButtons}>
                <TouchableOpacity style={styles.touchableOpacity}>
                  <Text style={styles.touchableOpacityText}>L03</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.button}>
              <Text style={styles.buttonText}>Quarto Suíte</Text>

              <View style={styles.twinButtons}>
                <TouchableOpacity style={styles.touchableOpacity}>
                  <Text style={styles.touchableOpacityText}>L01</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.touchableOpacity}>
                  <Text style={styles.touchableOpacityText}>L02</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
