/* eslint-disable prettier/prettier */
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Alert,
  RefreshControl,
  ActivityIndicator,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import colors from '../../../constants/Colors';
import {registerUserForDrive} from '../../../redux/upcomingDrives/actions';
import {upcomingDrivesSearch} from '../../../redux/upcomingDrives/actions';
import UpcomingDrivesCard from '../../../components/UpcomingDrivesCard';

const UpcomingDrives = ({navigation, route}) => {
  const authState = useSelector((state) => state.authState);
  const upcomingDrivesState = useSelector((state) => state.upcomingDrivesState);
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(
    (driveId) => {
      setRefreshing(true);
      dispatch(
        upcomingDrivesSearch(authState.userToken, route.params.searchData),
      );
      if (!upcomingDrivesState.loading) {
        setRefreshing(false);
      }
    },
    [
      authState.userToken,
      dispatch,
      route.params.searchData,
      upcomingDrivesState.loading,
    ],
  );
  return (
    <View style={styles.container}>
      {upcomingDrivesState.loading ? (
        <View style={styles.indicatorView}>
          <ActivityIndicator
            visible={upcomingDrivesState.loading}
            textContent={'Loading...'}
            textStyle={styles.spinnerTextStyle}
            animating={true}
            color={colors.primary}
            size="large"
          />
        </View>
      ) : upcomingDrivesState.gotData &&
        upcomingDrivesState.upcomingDrivesList.length === 0 ? (
        <View style={styles.suchEmpty}>
          <Image
            style={styles.suchEmptyImg}
            source={require('../../../assets/images/empty.png')}
          />
          <Text style={styles.emptyInfo}>
            No drives found with your specified search filters! Try again.
          </Text>
        </View>
      ) : (
        <View style={styles.scroll}>
          {upcomingDrivesState.gotData &&
          upcomingDrivesState.upcomingDrivesList.length === 0 ? (
            <View style={styles.suchEmpty}>
              <Image
                style={styles.suchEmptyImg}
                source={require('../../../assets/images/empty.png')}
              />
              <Text style={styles.emptyInfo}>
                No drives found with your specified search filters! Try again.
              </Text>
            </View>
          ) : (
            <FlatList
              style={styles.scroll}
              data={upcomingDrivesState.upcomingDrivesList}
              renderItem={({item}) => (
                <UpcomingDrivesCard
                  item={item}
                  registerUserForDrive={registerUserForDrive}
                  userToken={authState.userToken}
                />
              )}
              keyExtractor={(item) => item.driveId}
              refreshControl={
                <RefreshControl
                  colors={[colors.primary, colors.secondary]}
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                />
              }
            />
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    paddingVertical: 20,
  },
  indicatorView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageBoard: {
    alignItems: 'center',
    marginBottom: 10,
    width: '100%',
  },

  suchEmpty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.additional2,
  },
  suchEmptyImg: {
    height: 150,
    width: 150,
  },
  emptyInfo: {
    color: colors.primary,
    fontSize: 10,
  },
  scroll: {
    paddingHorizontal: 5,
  },
});

export default UpcomingDrives;
