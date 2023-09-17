import React, { useEffect, useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Modal,
} from "react-native";
import axios from 'axios';
import { Dropdown } from 'react-native-element-dropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../../constants/Colors'
import FontSize from '../../constants/FontSize'
import Spacing from '../../constants/Spacing';
import { Checkbox } from 'react-native-paper';

const ApiList = ({ navigation }) => {

    const [list, setList] = useState([]);
    const [visible, setVisible] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("");
    const [hideId, setHideId] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const [checked, setChecked] = useState([]);

    const renderLabel = () => {
        if (status || isFocus) {
            return (
                <Text style={[styles.label, isFocus && { color: 'blue' }]}>
                    Choose status
                </Text>
            );
        }
        return null;
    };
    const data = [
        { label: 'Incomplete', value: 'incomplete' },
        { label: 'In Progress', value: 'inProgress' },
        { label: 'Completed', value: 'completed' }
    ];

    const logout = ({ navigation }) => {
        AsyncStorage.removeItem("token").then(() => {
            navigation.replace('Home')
        })
    }

    useEffect(() => {
        getList()
    }, [])

    const getList = () => {
        axios({
            url: "http://10.0.2.2:5000/api/tasks",
            method: "GET"
        }).then((res) => {
            console.log(res)
            setList(res.data)
        })
    }

    const handelDetete = (task) => {
        axios({
            url: `http://10.0.2.2:5000/api/task/delete/${task._id}`,
            method: "DELETE"
        }).then(() => {
            getList();
            
        })
    }

    const handelSave = () => {
        if (hideId == null) {
            var data = {
                "title": title,
                "description": description,
                "status": status
            }
            axios({
                url: "http://10.0.2.2:5000/api/task",
                method: "POST",
                data: data,
            }).then((res) => {
                getList();
                setTitle("")
                setDescription("")
                setStatus("")
                setVisible(false)
            }).catch(error => console.log(error));
        } else {
            var data = {
                "title": title,
                "description": description,
                "status": status,
            }
            axios({
                url: `http://10.0.2.2:5000/api/task/update/${hideId}`,
                method: "PUT",
                data: data
            }).then((res) => {
                getList();
                setTitle("")
                setDescription("")
                setStatus('')
                setVisible(false)
            })
        }

    }

    const handleEdit = (item) => {
        setVisible(true)
        setHideId(item._id)
        setTitle(item.title)
        setDescription(item.description)
        setStatus(item.status)
    }

    const handleVisibleModal = () => {
        setVisible(!visible)
        setHideId(null)
    }

    const onChangeName = (value) => {
        setTitle(value)
    }

    const handleStatus = async (value, index) => {

        const newCheckedItem = [...checked];
        newCheckedItem[index] = !newCheckedItem[index]
        setChecked(newCheckedItem)

        const check = checked[index]

        await axios({
            url: `http://10.0.2.2:5000/api/task/mark/${value._id}`,
            method: 'PUT',
            data: { check }
        })

        getList()
    }

    const onChangeDescription = (value) => {
        setDescription(value)
    }

    const onChangeStatus = (value) => {
        setIsFocus(false)
        setStatus(value.value)
    }

    return (
        <KeyboardAwareScrollView>
            <SafeAreaView>
                <TouchableOpacity style={styles.signoutbtn} onPress={() => logout({ navigation })}>
                    <Text
                        style={{ color: Colors.onPrimary, fontWeight: "bold", fontSize: FontSize.medium }}
                    >Signout</Text>
                </TouchableOpacity>
                <View style={styles.header_container}>
                    <Text style={styles.txt_main}>Task {list.length}</Text>
                    <TouchableOpacity
                        onPress={handleVisibleModal}
                        style={styles.btnNewContainer}
                    >
                        <Text style={styles.textButton}>New Task</Text>
                    </TouchableOpacity>
                </View>
                <Modal
                    animationType="slide"
                    visible={visible}
                >
                    <SafeAreaView>
                        <View style={styles.form}>
                            <TouchableOpacity
                                onPress={handleVisibleModal}
                            >
                                <Text style={styles.txtClose}>
                                    Close
                                </Text>
                            </TouchableOpacity>
                            <TextInput
                                value={title}
                                style={styles.text_input}
                                placeholder="Title"
                                onChangeText={onChangeName}
                            />
                            <TextInput
                                value={description}
                                style={styles.text_input}
                                placeholder="Description"
                                onChangeText={onChangeDescription}
                            />
                            <View style={styles.container}>
                                {renderLabel()}
                                <Dropdown
                                    style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                                    placeholderStyle={styles.placeholderStyle}
                                    selectedTextStyle={styles.selectedTextStyle}
                                    inputSearchStyle={styles.inputSearchStyle}
                                    iconStyle={styles.iconStyle}
                                    data={data}
                                    search
                                    maxHeight={300}
                                    labelField="label"
                                    valueField="value"
                                    placeholder={!isFocus ? 'Select item' : '...'}
                                    searchPlaceholder="Search..."
                                    value={status}
                                    onFocus={() => setIsFocus(true)}
                                    onBlur={() => setIsFocus(false)}
                                    onChange={onChangeStatus}
                                />
                            </View>

                            <TouchableOpacity
                                onPress={handelSave}
                                style={styles.btnContainer}
                            >
                                <Text style={styles.textButton}>
                                    {hideId == null ? "Save" : "Update"}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </SafeAreaView>
                </Modal>

                <ScrollView>
                    {list.map((item, index) => {
                        return (
                            <View style={styles.item_task} key={index}>
                                <View>
                                    <Text style={styles.txt_name}>{index + 1}. {item.title}</Text>
                                    <Text> {item.description}</Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                                        <Checkbox
                                            status={item.status === 'completed' ? 'checked' : 'unchecked'}
                                            onPress={() => handleStatus(item, index)}
                                            disabled={item.status === 'completed' && true}
                                        />
                                        <Text style={styles.listText}>{item.status}</Text>
                                    </View>
                                </View>

                                <View>
                                    <TouchableOpacity
                                        onPress={() => handelDetete(item)}
                                    >
                                        <Text style={styles.txt_del}>Delete</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => handleEdit(item)}
                                    >
                                        <Text style={styles.txt_edit}>Edit</Text>
                                    </TouchableOpacity>

                                </View>
                            </View>
                        )
                    })}
                </ScrollView>

            </SafeAreaView>
        </KeyboardAwareScrollView>
    )
}

export default ApiList;

const styles = StyleSheet.create({

    form: {
        padding: 15,
        marginTop: 10
    },

    txtClose: {
        fontSize: 18,
        fontWeight: "bold",
        marginVertical: 10,
        textAlign: "right"
    },
    text_input: {
        padding: 10,
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 10,
        marginTop: 10
    },
    header_container: {
        padding: 15,
        backgroundColor: "#eeeeee",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    txt_main: {
        fontSize: 22,
        fontWeight: "bold"
    },
    item_task: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#e2e2e2",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    txt_name: {
        fontSize: 18,
        marginTop: 5,
        fontWeight: "bold"
    },
    txt_item: {
        fontSize: 14,
        marginTop: 5
    },
    txt_enabled: {
        fontSize: 14,
        marginTop: 5,
        color: "green",
        fontWeight: "bold"
    },
    txt_disabled: {
        fontSize: 14,
        marginTop: 5,
        color: "green",
        fontWeight: "bold"
    },
    txt_del: {
        fontSize: 14,
        marginTop: 5,
        color: "red",
        fontWeight: "bold"
    },
    txt_edit: {
        fontSize: 14,
        marginTop: 5,
        color: "blue",
        fontWeight: "bold"
    },
    btnContainer: {
        display: 'flex',
        padding: 15,
        backgroundColor: "#000",
        marginTop: 20,

    },
    btnNewContainer: {
        padding: 10,
        backgroundColor: "#000",
    },
    textButton: {
        textAlign: "center",
        color: "#FFF"
    },
    listText: {
        color: Colors.primary,
        fontSize: FontSize.medium,
        fontWeight: "800",
    },
    signoutbtn: {
        backgroundColor: Colors.primary,
        borderRadius: Spacing,
        paddingVertical: Spacing * 1,
        marginTop: Spacing * 1,
        alignItems: 'center',
        marginHorizontal: Spacing * 2
    }, container: {
        backgroundColor: 'white',
        padding: 16,
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
})