import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
  } from 'react-native';
  import React, {useState} from 'react';
  import Cards from './Card';
  import {
    responsiveFontSize,
    responsiveHeight,
  } from 'react-native-responsive-dimensions';
  import EditIcon from 'react-native-vector-icons/AntDesign';
  import EditPreferenceModal from './EditPreferenceModal';
  
  const {width} = Dimensions.get('window');
  
  const PreferenceCard = () => {
    const [selectedTimezone, setSelectedTimezone] = useState('');
    const [selectedWeekDay, setSelectedWeekDay] = useState('');
    const [isShowEditPrefModal, setIsShowEditPrefModal] = useState(false);
    const updatePreferenceData = (tz,day)=>{
      setSelectedTimezone("");
      setSelectedWeekDay(day)
    }
    return (
      <>
        <Cards
          title="Preferences"
          rightIcon={
            <TouchableOpacity onPress={() => setIsShowEditPrefModal(true)}>
              <EditIcon name="edit" size={responsiveFontSize(2)} />
            </TouchableOpacity>
          }>
          <View style={styles.preferencesCont}>
            <Text>Time Zone</Text>
            <Text>{!selectedTimezone ? 'Not Set' : selectedTimezone}</Text>
          </View>
          <View style={styles.preferencesCont}>
            <Text>First Day Of The Week</Text>
            <Text>{!selectedWeekDay ? 'Not Set' : selectedWeekDay}</Text>
          </View>
        </Cards>
        {isShowEditPrefModal && (
          <EditPreferenceModal
            isModalVisible={isShowEditPrefModal}
            closeModal={() => setIsShowEditPrefModal(false)}
            onSave={updatePreferenceData}
          />
        )}
      </>
    );
  };
  
  export default PreferenceCard;
  
  const styles = StyleSheet.create({
    preferencesCont: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: responsiveHeight(1),
    },
  });
  