import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const MenuModal = ({ isOpen, onClose, title, children }) => {
    return (
        <Modal visible={isOpen} transparent={true} animationType="slide" onRequestClose={onClose}>
            <View style={styles.overlay}>
                <View style={styles.modalContent}>
                    <View style={styles.header}>
                        <Text style={styles.title}>{title}</Text>
                        <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
                            <Text style={styles.closeText}>X</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.body}>
                        {children}
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '85%',
        maxHeight: '80%',
        backgroundColor: '#fcd86d',
        borderRadius: 15,
        borderWidth: 3,
        borderColor: '#332211',
        overflow: 'hidden',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#e6a43a',
        borderBottomWidth: 3,
        borderBottomColor: '#332211',
    },
    title: {
        fontSize: 20,
        fontWeight: '900',
        color: '#fff',
        textShadowColor: '#000',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 1,
    },
    closeBtn: {
        padding: 5,
    },
    closeText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#332211',
    },
    body: {
        padding: 15,
    }
});

export default MenuModal;
