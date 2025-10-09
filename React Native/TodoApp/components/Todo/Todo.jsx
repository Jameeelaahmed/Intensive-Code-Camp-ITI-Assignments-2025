import { View, Text, FlatList, StyleSheet, Modal, TextInput } from 'react-native';
import { useState } from 'react';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';

const Todo = () => {
    const [items, setItems] = useState([]);
    const [text, setText] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [deletedItems, setDeletedItems] = useState([]);

    function handleAddItem() {
        if (text.trim()) {
            setItems([...items, { text: text, completed: false }]);
            setText('');
            setModalVisible(false);
        }
    }

    const toggleComplete = (index) => {
        const newItems = [...items];
        newItems[index].completed = !newItems[index].completed;
        setItems(newItems);
    };

    function handleDelete(itemToDelete) {
        const newItems = items.filter(item => item !== itemToDelete);
        setItems(newItems);
        setDeletedItems([...deletedItems, itemToDelete]);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Todo List ✨</Text>

            <Pressable
                style={styles.addButton}
                onPress={() => setModalVisible(true)}
                android_ripple={{ color: '#ffb8cb', borderless: false }}
            >
                <Text style={styles.addButtonText}>+ Add New Task</Text>
            </Pressable>

            <View style={styles.statsContainer}>
                <View style={styles.statPill}>
                    <Text style={styles.statNumber}>{items.length > 0 ? items.filter(item => item.completed).length : 0}</Text>
                    <Text style={styles.statLabel}>Done</Text>
                </View>
                <View style={styles.statPill}>
                    <Text style={styles.statNumber}>{deletedItems.length}</Text>
                    <Text style={styles.statLabel}>Deleted</Text>
                </View>
            </View>

            <FlatList
                data={items}
                renderItem={({ item, index }) => (
                    <View style={[styles.todoItem, styles.itemShadow]}>
                        <Pressable
                            onPress={() => toggleComplete(index)}
                            style={[styles.checkbox, item.completed && styles.checked]}
                        >
                            {item.completed && <Text style={styles.checkmark}>✓</Text>}
                        </Pressable>
                        <Text style={[styles.todoText, item.completed && styles.completedText]}>
                            {item.text}
                        </Text>
                        <Pressable
                            onPress={() => handleDelete(item)}
                            style={styles.deleteButton}
                        >
                            <Text style={styles.deleteIcon}>✕</Text>
                        </Pressable>
                    </View>
                )}
                keyExtractor={(item, idx) => idx.toString()}
                contentContainerStyle={styles.listContainer}
                ListEmptyComponent={
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyText}>No tasks yet! Add something cute to do 💖</Text>
                    </View>
                }
            />

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <Pressable
                    style={styles.modalBackdrop}
                    onPress={() => setModalVisible(false)}
                >
                    <View style={styles.centeredView}>
                        <Pressable>
                            <View style={[styles.modalView, styles.modalShadow]}>
                                <Text style={styles.modalTitle}>Add New Task 💕</Text>
                                <TextInput
                                    onChangeText={setText}
                                    value={text}
                                    style={styles.inputContainer}
                                    placeholder="What do you want to do?"
                                    placeholderTextColor="#d8a8b9"
                                    autoFocus={true}
                                />
                                <View style={styles.buttonsContainer}>
                                    <Pressable
                                        style={[styles.button, styles.closeButton]}
                                        onPress={() => setModalVisible(false)}
                                    >
                                        <Text style={styles.buttonText}>Cancel</Text>
                                    </Pressable>
                                    <Pressable
                                        style={[styles.button, styles.addButtonModal]}
                                        onPress={handleAddItem}
                                    >
                                        <Text style={styles.buttonText}>Add</Text>
                                    </Pressable>
                                </View>
                            </View>
                        </Pressable>
                    </View>
                </Pressable>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 40,
        backgroundColor: '#fff9fb',
    },
    header: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#ff7aa2',
        marginBottom: 25,
        textAlign: 'center',
        fontFamily: 'Pacifico-Regular',
        textShadowColor: 'rgba(255, 122, 162, 0.2)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 4,
        letterSpacing: 0.5,
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 20,
        marginBottom: 20,
    },
    statPill: {
        backgroundColor: '#ffecf1',
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ffd4e1',
    },
    statNumber: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ff7aa2',
        fontFamily: 'DancingScript-Bold',
    },
    statLabel: {
        fontSize: 14,
        color: '#c98da5',
        fontFamily: 'DancingScript-Regular',
    },
    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 30,
        backgroundColor: '#fff0f5',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#ffdae4',
        borderStyle: 'dashed',
    },
    emptyText: {
        fontSize: 16,
        color: '#d99eb2',
        textAlign: 'center',
        fontFamily: 'DancingScript-Regular',
    },
    listContainer: {
        paddingBottom: 20,
    },
    todoItem: {
        backgroundColor: '#fff',
        padding: 18,
        borderRadius: 18,
        marginVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        borderLeftWidth: 5,
        borderLeftColor: '#ffb6c1',
    },
    itemShadow: {
        shadowColor: '#ffdae4',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 5,
    },
    checkbox: {
        width: 26,
        height: 26,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: '#ffb6c1',
        marginRight: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checked: {
        backgroundColor: '#ff9eb5',
        borderColor: '#ff7aa2',
    },
    checkmark: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    todoText: {
        fontSize: 17,
        color: '#7a5c6c',
        flex: 1,
        fontFamily: 'DancingScript-Regular',
    },
    completedText: {
        textDecorationLine: 'line-through',
        color: '#c5a8b0',
    },
    deleteButton: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#ffeef2',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ffd4e1',
    },
    deleteIcon: {
        color: '#ff7aa2',
        fontSize: 18,
        fontWeight: 'bold',
    },
    addButton: {
        backgroundColor: '#ff9eb5',
        borderRadius: 28,
        paddingVertical: 16,
        marginBottom: 25,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#ffb8cb',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
        borderWidth: 1,
        borderColor: '#ffc2d1',
    },
    addButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        letterSpacing: 0.8,
        fontFamily: 'DancingScript-Bold',
        textShadowColor: 'rgba(0, 0, 0, 0.1)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 2,
    },
    modalBackdrop: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.15)',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        width: '85%',
        backgroundColor: '#fff9fb',
        borderRadius: 28,
        padding: 30,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ffe5ee',
    },
    modalShadow: {
        shadowColor: '#ff9eb5',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.25,
        shadowRadius: 15,
        elevation: 15,
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 25,
        color: '#ff7aa2',
        textAlign: 'center',
        fontFamily: 'Pacifico-Regular',
        letterSpacing: 0.5,
    },
    inputContainer: {
        backgroundColor: '#fff',
        width: '100%',
        borderColor: "#ffc2d1",
        borderWidth: 2,
        padding: 18,
        borderRadius: 16,
        marginVertical: 10,
        fontSize: 17,
        color: '#7a5c6c',
        fontFamily: 'DancingScript-Regular',
    },
    buttonsContainer: {
        flexDirection: 'row',
        gap: 20,
        marginTop: 15,
    },
    button: {
        borderRadius: 22,
        paddingVertical: 14,
        paddingHorizontal: 28,
        elevation: 4,
        minWidth: 100,
        alignItems: 'center',
        shadowColor: '#d8a8b9',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
    },
    closeButton: {
        backgroundColor: '#f8e4eb',
    },
    addButtonModal: {
        backgroundColor: '#ff9eb5',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 17,
        fontFamily: 'DancingScript-Bold',
        letterSpacing: 0.5,
    },
});

export default Todo;