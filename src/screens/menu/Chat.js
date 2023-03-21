// @ts-nocheck
// import React, { useState, useCallback, useEffect } from 'react'
// import { GiftedChat } from 'react-native-gifted-chat'

// export function Chat() {
//     const [messages, setMessages] = useState([]);

//     useEffect(() => {
//         setMessages([
//             {
//                 _id: 1,
//                 text: 'Hello developer',
//                 createdAt: new Date(),
//                 user: {
//                     _id: 2,
//                     name: 'React Native',
//                     avatar: 'https://placeimg.com/140/140/any',
//                 },
//             },
//         ])
//     }, [])

//     const onSend = useCallback((messages = []) => {
//         setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
//     }, [])

//     return (
//         <GiftedChat
//             messages={messages}
//             onSend={messages => onSend(messages)}
//             user={{
//                 _id: 1,
//             }}
//         />
//     )
// }


import React, { useState, useEffect, useCallback } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, ScrollView, TextInput } from "react-native";
import { GiftedChat } from 'react-native-gifted-chat'
import {
    responsiveFontSize,
    responsiveHeight,
    responsiveScreenFontSize,
    responsiveWidth,
    responsiveScreenWidth,
    responsiveScreenHeight
} from 'react-native-responsive-dimensions';
export function Chat() {
    const [messages, setMessages] = useState([]);
    const [a, b] = useState('');
    useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: 'Hello developer',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'React Native',
                    avatar: 'https://placeimg.com/140/140/any',
                },
            },
        ])
    }, [])

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    }, [])
    const [modalVisible, setModalVisible] = useState(false);
    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                statusBarTranslucent

                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}
            >

                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <ScrollView
                            keyboardShouldPersistTaps="handled"
                            showsVerticalScrollIndicator={false}
                            style={{ height:responsiveScreenHeight(70) }}>
                                <View style={{height:responsiveScreenFontSize(70), width:'100%', backgroundColor:'grey', justifyContent:'center', }}>
                                {/* <TextInput 
                                style={{width:'100%', height: 100}}
                                value={a}
                                placeholder="TEXT"
                                onChangeText={(e)=> b(e)}
                                /> */}
                                <GiftedChat
                                messages={messages}
                                // messagesContainerStyle={{width:'100%'}}
                                onSend={messages => onSend(messages)}
                                user={{
                                    _id: 1,
                                }}
                            />
                                </View>
                            {/* <GiftedChat
                                messages={messages}
                                // messagesContainerStyle={{width:'100%'}}
                                onSend={messages => onSend(messages)}
                                user={{
                                    _id: 1,
                                }}
                            /> */}
                        </ScrollView>
                    </View>
                </View>
            </Modal>
            <Pressable
                style={[styles.button, styles.buttonOpen]}
                onPress={() => setModalVisible(true)}
            >
                <Text style={styles.textStyle}>Show Modal</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        // flex: 1,
        justifyContent: "center",
        alignItems: "center",
        // marginTop: 22
    },
    modalView: {
        width: responsiveScreenWidth(90),
        // height: responsiveScreenHeight(70),
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        // padding: 35,
        // alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        // backgroundColor:'red'
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});

