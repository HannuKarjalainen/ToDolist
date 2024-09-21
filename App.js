import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, Text, TextInput, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Task from './components/Task';  

export default function App() {
  const [task, setTask] = useState('');
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    loadTasks();
  }, []);

  const saveTasks = async (tasks) => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
    } catch (e) {
      console.error('Tehtävien tallentaminen meni häneksi', e);
    }
  };

  const loadTasks = async () => {
    try {
      const savedTasks = await AsyncStorage.getItem('tasks');
      if (savedTasks) {
        setTaskList(JSON.parse(savedTasks));
      }
    } catch (e) {
      console.error('Tehtävien lataaminen meni häneksi', e);
    }
  };

  const addTask = () => {
    if (task.length > 0) {
      const newTask = { id: Date.now().toString(), text: task, done: false };
      const updatedTasks = [...taskList, newTask];
      setTaskList(updatedTasks);
      saveTasks(updatedTasks);
      setTask('');
    }
  };

  const toggleTaskDone = (id) => {
    const updatedTasks = taskList.map((item) =>
      item.id === id ? { ...item, done: !item.done } : item
    );
    setTaskList(updatedTasks);
    saveTasks(updatedTasks);
  };

  const removeDoneTasks = () => {
    const updatedTasks = taskList.filter((item) => !item.done);
    setTaskList(updatedTasks);
    saveTasks(updatedTasks);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Todo List</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={task}
          onChangeText={setTask}
          placeholder="Enter task"
        />
        <TouchableOpacity onPress={addTask} style={styles.button}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={taskList}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => toggleTaskDone(item.id)}>
            <Task text={item.text} done={item.done} />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />
      <TouchableOpacity onPress={removeDoneTasks} style={styles.removeButton}>
        <Text style={styles.buttonText}>Poista tehdyt tehtävät</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 24.
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',  // Keskitetään teksti
  },
  inputContainer: {
    flexDirection: 'row', // Asetetaan sisäkkäiset komponentit riviksi
    alignItems: 'center', // Keskitetään pystysuunnassa
  },
  input: {
    padding: 10,
    marginRight: 10, // Lisää väli nappiin
    flex: 1, // Tekstikenttä vie kaiken tilan
  },
  button: {
    padding: 10,
    backgroundColor: 'transparent', // Tausta ei ole
  },
  buttonText: {
    color: 'blue', // Tekstin väri sininen
    textAlign: 'center', // Keskitetään nappiteksti
  },
  removeButton: {
    marginTop: 10, // Lisää yläreunaan tilaa
  },
});
