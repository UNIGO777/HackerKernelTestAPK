import React, { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from '../constants/theme';
import { hp } from '../helpers/comman';
import Toast from 'react-native-toast-message';
import { FlatList } from 'react-native';

interface ScreenWrapperProps {
    children: ReactNode;
}

const ScreenWrapper: React.FC<ScreenWrapperProps> = ({ children }) => {
    const paddingTop = 0;

    return (
        <FlatList
            data={[]}
            renderItem={null}
            ListHeaderComponent={
                <View style={{  backgroundColor: theme.colors.background}}>
                    {children}
                    <Toast />
                </View>
            }
        />
    );
}

const styles = StyleSheet.create({})

export default ScreenWrapper;