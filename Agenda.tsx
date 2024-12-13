import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button, FlatList, TouchableOpacity, Alert } from "react-native";
import { Calendar, DateData } from "react-native-calendars";

type EventType = { id: string; title: string; date: string };

export function Agenda() {
  const [event, setEvent] = useState<string>("");
  const [events, setEvents] = useState<EventType[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>("");

  const addEvent = () => {
    if (event.trim() && selectedDate) {
      setEvents((prevEvents) => [
        ...prevEvents,
        { id: Date.now().toString(), title: event, date: selectedDate },
      ]);
      setEvent("");
    } else {
      Alert.alert("Error", "Selecciona una fecha y escribe un evento.");
    }
  };

  const deleteEvent = (id: string) => {
    setEvents((prevEvents) => prevEvents.filter((item) => item.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¡Agenda tus eventos en compañia de tu mascota!</Text>

      {/* Calendario en Español */}
      <Calendar
        onDayPress={(day: DateData) => setSelectedDate(day.dateString)}
        monthFormat={"MMMM yyyy"} // Formato del mes
        enableSwipeMonths={true}
        markedDates={{
          [selectedDate]: { selected: true, selectedColor: "#F1AC20" },
          ...events.reduce((acc, event) => {
            acc[event.date] = { marked: true, dotColor: "#007bff" };
            return acc;
          }, {} as Record<string, any>),
        }}
        // Configura los textos del calendario
        firstDay={1} // Inicia el calendario en Lunes
        hideExtraDays={true}
        dayNamesShort={["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"]}
        monthNames={[
          "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
          "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
        ]}
      />

      {/* Input para agregar evento */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Escribe tu evento canino..."
          value={event}
          onChangeText={setEvent}
        />
        <Button title="Agregar" onPress={addEvent} color="#F1AC20" />
      </View>

      {/* Lista de eventos */}
      <FlatList
        data={events.filter((e) => e.date === selectedDate)}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.eventItem}>
            <Text style={styles.eventText}>{item.title}</Text>
            <TouchableOpacity onPress={() => deleteEvent(item.id)}>
              <Text style={styles.deleteButton}>❌</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No hay eventos para esta fecha.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9f9f9", padding: 20, paddingTop: 40 },
  title: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 10, color: "#800020" },
  inputContainer: { flexDirection: "row", marginTop: 10, marginBottom: 10, gap: 10 },
  input: { flex: 1, borderWidth: 1, borderColor: "#ddd", padding: 10, borderRadius: 5, backgroundColor: "#fff" },
  eventItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    marginVertical: 5,
    borderRadius: 5,
    backgroundColor: "#f1f1f1",
  },
  eventText: { fontSize: 16 },
  deleteButton: { fontSize: 18, color: "#d9534f" },
  emptyText: { textAlign: "center", fontSize: 16, marginTop: 20, color: "#888" },
});
