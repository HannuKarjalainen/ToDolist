import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const Task = ({ text, done }) => {
  return (
    <View style={styles.taskContainer}>
      <Text style={done ? styles.doneText : styles.taskText}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  taskContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  taskText: {
    fontSize: 18,
    color: '#333',
  },
  doneText: {
    fontSize: 18,
    color: '#888',
    textDecorationLine: 'line-through',
  },
});

export default Task;
